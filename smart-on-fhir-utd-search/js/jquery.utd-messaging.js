// jQuery UTD Plugin Messaging extension
// UI methods related to messaging / notification
// --------------------------------------------
// DEPENDENCIES:
// jquery.utd-core.js
// jquery.utd-utilitiy.js
// jquery.utd-layout.js
// jquery.utd-localization.js
// --------------------------------------------
// 03.25.14: Created
// 04.25.14: Incorporated new qTip2 messaging elements
// 04.28.14: Added supportTag object
(function($){

	// Extend the UTD object to include the Messaging object
	// --------------------------------------------------
	// Functionality handled by this object
	$.extend($.utd, {

		messaging: {
			// Define possible dialog button types
			MESSAGE_BUTTONS: {
				'OK': { text: 'Ok' },
				'EXIT': { text: 'Close' },
				'CLOSE': { text: 'Close' },
				'RENEW_LATER': { text: 'Close' },
				'CANCEL': { text: 'Cancel' },
				'ACCEPT_LICENSE':{
					text: 'Accept',
					postthis: 'messaging',
					postfunc: 'recordAgreement'
				},
				'DECLINE_LICENSE':{
					text: 'Decline',
					postthis: 'messaging',
					postfunc: 'decline'
				},
				'VIEW_LICENSE':{
					text: 'View License',
					postthis: 'messaging',
					postfunc: 'viewLicense'
				},
				'MARKETO_LAUNCHER':{
					text: 'Ok',
					postthis: 'messaging',
					postfunc: 'launchMarketo'
				},
				'CANCEL_COMPLIANCE':{
					text: 'Cancel',
					postthis: 'messaging',
					postfunc: 'cancelCompliance'
				},
				'RENEW_NOW': {
					text: 'Renew',
					postthis: 'utility',
					postfunc: 'windowLocation',
					postargs: '/store'
				},
				'SUBSCRIBE_NOW': {
					text: 'Subscribe Now',
					postthis: 'utility',
					postfunc: 'windowLocation',
					postargs: '/store'
				},
				'ERA_LEARN':{
					text: 'Learn more',
					postthis: 'utility',
					postfunc: 'windowOpen',
					postargs: 'http://learn.uptodate.com/verify'					
				}
			},
			
			// Definitions of commonly used qTip configuration objects
			QTIP_POSITION_MODAL:{
				my:'center', at: 'center',	// Center...
				target: $(window)			// ...in window
			},
			QTIP_SHOWREADY_MODAL: {
				ready: true,				// Display modal tooltip as soon as bound
				delay: 0,					// Show immediately, no delay
				modal: {
					on: true,				// This tooltip is a modal dialog
					blur: false				// Tooltip not dismissed by clicking on dimmed overlay
				}
			},
			QTIP_SHOWCLICK_MODAL: {
				event: 'click ',			// Display modal tooltip when target selector clicked
				modal: {
					on: true,				// This tooltip is a modal dialog
					blur: false				// Tooltip not dismissed by clicking on dimmed overlay
				}
			},
			QTIP_SHOWREADYTNOESCAPE_MODAL: {
				ready:true,					// Display modal tooltip when document.ready
				delay: 0,					// Show immediately, no delay
				modal: {
					on: true,				// This tooltip is a modal dialog
					blur: false,			// Tooltip not dismissed by clicking on dimmed overlay
					escape: false			// Do not dismiss dialog when escape key pressed
				}
			},
			QTIP_HIDECLICK_MODAL: {
	            event:'click ',
	            fixed: true,         // Do not dismiss tooltip when mouse hovered over tooltip
	            leave: false         // Do not dismiss tooltip when mouseleave of {selector} 
	        },
	        QTIP_HIDENOESCAPE_MODAL:{
	            event: '',	  		  // Do not hide when mouse is clicked over dialog
	            fixed: true,         // Do not dismiss tooltip when mouse hovered over tooltip
	            leave: false         // Do not dismiss tooltip when mouseleave of {selector} 
	        },
	        QTIP_STYLE_MODAL: {
				classes: 'qtip-light qtip-shadow qtip-dialogue utdModalQtip utdModalInherit utdModalClose'
			},
	        QTIP_STYLE_GRAPHICS: {
				classes: 'qtip-light qtip-shadow qtip-dialogue utdModalQtip utdModalInherit utdModalClose utdModalGraphic'
			},
			QTIP_STYLE_UTDTIP: {
				classes:'qtip-shadow qtip-rounded',
				tip:{
					width:10
				}
			},

			init: function() {
				//addTiming("utd-messaging: init() IN");
				if ($(".json-message").length) {
					$(document).ready(function(){
						var sJson = $(".json-message").text();
						$(".json-message").remove();
						$$.messaging.open(sJson);
					});
				}
				//addTiming("utd-messaging: init() OUT");
			},
			
			open: function(message){
				if (typeof (message) == 'string') {
					message = JSON.parse(message);
				}
				// IMM051112 > Proceed only if we haven't yet displayed this message
				if ($.cookie(escape(message.timestamp))==null) {
					var locale = $$.localization.locale.toLowerCase();
					
					var dtMsgTtl = $('<dt />', {id: 'messageTitle', html: message.title});
					var ddMsgBdy = $('<dd />', {id: 'messageBody', html: message.message});
					var ddMsgCon = $('<dd />', {id: 'messageControls', 'class': 'center'});
					var dlMsgCnt = $('<dl />', {id: 'messageWrapper'});
					
					// Construct any buttons from passed data
					for (btn = 0; btn < message.actions.length; btn++) {
						// Determine localized label for button
						var oBtnObj = message.actions[btn];
						var sBtnLbl = "";
						var jBtnSrc = null;
						if (typeof oBtnObj.name !== "undefined"){
							var sActNme = oBtnObj.name;
							var aBtnLbl = oBtnObj[sActNme];
							jBtnSrc = $$.messaging.MESSAGE_BUTTONS[oBtnObj.name];
							sBtnLbl = jBtnSrc.text;	// Set default button label 
							if (typeof aBtnLbl[locale] !== "undefined"){
								sBtnLbl = aBtnLbl[locale];
							}
						}
						else {
							sBtnLbl = oBtnObj.text;
							jBtnSrc = oBtnObj;
						}
						 
						var oBtnHtm = $('<button />', {
							text: sBtnLbl
						});
						if ((typeof jBtnSrc.postthis != "undefined") && (typeof jBtnSrc.postfunc != "undefined")){
							oBtnHtm.attr('postthis',jBtnSrc.postthis).attr('postfunc',jBtnSrc.postfunc);
							if (typeof jBtnSrc.postargs != "undefined"){
								oBtnHtm.attr('postargs',jBtnSrc.postargs);
							}
						}
						ddMsgCon.append(oBtnHtm);
					}
					// >>> IMM120114#DE6290 - Conditional to handle patient SLA

					dlMsgCnt.append(dtMsgTtl).append(ddMsgBdy).append(ddMsgCon);
					var oDlgCnt = {}, sDlgCss;
					sDlgCss = "dialogue utdModalButtonsQtip";

					oDlgCnt.text = dlMsgCnt;
					
					$$.messaging.makeDialog(oDlgCnt, sDlgCss);
					
					// Set session cookie to indicate we should not display this message again
					$.cookie(escape(message.timestamp),message.title);
				}
			},
			
			dispatch: function(obj, fn, args) {
			    return window.$$[obj][fn].apply(this, args || []);
			},
			
			// IMM042214 > US6820#TA22183 > Function to generate modal dialog, requires jquery.qtip.min.js (http://qtip2.com)
			makeDialog:function(oDlgCnt, sDlgCss){
				$('<div />').qtip({
			        content: oDlgCnt,
			        position: $$.messaging.QTIP_POSITION_MODAL,
			        show: $$.messaging.QTIP_SHOWREADYTNOESCAPE_MODAL,
			        hide: $$.messaging.QTIP_HIDENOESCAPE_MODAL,
			        style: (typeof sDlsCss != "undefined" ? sDlgCss : "dialogue utdModalButtonsQtip"),
			        events: {
			            render: function(event, api) {
			                $('button', api.elements.content).click(function(e) {
			                	var bClsDlg = true;
			                	// Check if post action function specified, if so then execute with optional arguments 
			                	if ((typeof this.attributes.postthis != "undefined") && (typeof this.attributes.postfunc != "undefined")){
			                		var obj = this.attributes.postthis.value;
			                		var fn = this.attributes.postfunc.value;
			                		var args = undefined;
			                		// TODO: This needs to be refactored to handle actual array arguments...
			                		if (typeof this.attributes.postargs != "undefined"){
			                			var args = new Array();
			                			args.push(this.attributes.postargs.value);
			                		}
			                		bClsDlg = $$.messaging.dispatch( obj, fn, args );
			                		// If no return type defined, default back to true
			                		if (typeof bClsDlg == "undefined"){
			                			bClsDlg = true;	
			                		}
			                	}
			                	// Default behavior is to dismiss the dialog
			                	// unless the "dispatch" function returns false
			                	if (bClsDlg){
			                		api.hide(e);
			                	}
			                });
			            },
			            hidden: function(event, api) { 
			            	$$.messaging.purgeQtips(); 
			            }
			        }
				});
			},
			
			// IMM041614 > US6820#TA22183 > Function to cleanup any lingering qTip markup, requires jquery.qtip.min.js (http://qtip2.com)
			purgeQtips:function(){
				$('[id^="qtip-"]').each(function(){
					_qtip2 = $(this).data("qtip"); //access the data where destroy() exist.

				    //if it's a proper qtip2 object then call the destroy method.
				    if(_qtip2 != undefined){ 
				        // the "true" is for immediate destroy
				        _qtip2.destroy(true);
				    } else if ($(this).attr("id") == "qtip-overlay"){
				    	$(this).remove();
				    }
				});
			},

			// Function to open new email related popup window
			// Originally: $$.utd.emailPopup.open()
			openEmailPopup: function(){
				var a = $(this);
				var params = {
					destination: a.data().dest, 
					referer: window.location.href,
					imageKey: a.data().imageKey
				};
				
				['source','topicKey','topicLanguage'].map( function(item) {
					var s = a.data()[item];
					if (s) {
						params[item] = s;
					}
				});
								
				var url = $$.utility.makeUrl($$.utility.addUrlParam('/feedback/letter','utdPopup','true'), params);
				window.open(url, 'contact_us', 'toolbar=no,menubar=no,resizable=no,height=523,width=500').focus();
				return false;
			},
			
			recordAgreement: function(e){
				// Record the acceptance of the SLA in AgreementWebService
				$$.utility.sendSimpleEvent($$.settings.acceptUrl, {});
			},
			decline: function(e){
				//Send them to the contact us page
				$$.utility.windowLocation($$.settings.declineUrl);
			},
			
			viewLicense: function(){
				var winAttrs = ($$.utility.isIE() ? "menubar=yes,status=yes,toolbar=yes,titlebar=yes,resizable=yes,scrollbars=yes" : undefined);
				$$.utility.windowOpen($$.settings.licenseUrl,"ViewLicense",winAttrs);
				return false;	// Returning false so that dialog will not be closed
			},
			launchMarketo: function(){
				var winAttrs = ($$.utility.isIE() ? "menubar=yes,status=yes,toolbar=yes,titlebar=yes,resizable=yes,scrollbars=yes" : undefined);
				$$.utility.windowOpen($$.settings.marketoUrl,"Compliance",winAttrs);
			},
			cancelCompliance: function(){				
				$$.utility.sendSimpleEvent($$.settings.cancelComplianceUrl, {});
			}                 

		},
		
		// IMM041414 > US6820#TA22183 > Functions for support tag tooltip (qTip2)
		supportTag:{
			eventSubmit: function(){
				var tktNum = $.trim($("#ticketNumber").val());
				$("#btnEmailSupport").prop("disabled", (tktNum.length ? false : true));
			},
		
			// Setup qTip tooltip for support tag
			init: function(){
				//addTiming("utd-supportTag: init() IN");
				$("#sinfo_footer").each(function(){
					var elem = $(this);
					elem.qtip({
						id:'utdSptTagTip',
						content:{
							text:elem.next('div'),
							button:'close'
						},
						position:{
							my:'bottom center',
							at: 'top center',
							viewport: $(window)
						},
						show:{
							target: false,
							event: 'click '
						},
						hide:{
							event: 'unfocus click ',
							target: false,
							inactive: false,
							leave: false
						},
						events:{
							visible: function(event, api){
								$$.supportTag.initForm();
							},
						    hide :  function(event, api){
						    	$('#serviceEmailInput #msgSupportResponse').html("").removeClass("error").removeClass("success");
							}
						},
						style: {
							classes: 'qtip-offwhite qtip-shadow qtip-rounded ',
							def:true, 
							widget:false,
							tip: {
								corner:true,
								border: 1, 
								width: 15, 
								height: 10, 
								offset: 0 
							}
						}
					});
				});
				//addTiming("utd-supportTag: init() OUT");
			},
			
			initForm: function(){
				$("#btnEmailSupport").prop("disabled", true);
				$("#ticketNumber").val("");
				$("#ticketNumber").blur();
		
				// US6298 - clear reference number validation message 
				$('#serviceEmailInput #msgSupportResponse').html("").removeClass("error").removeClass("success");
				$("#ticketNumber").prop("disabled", false);
				
				$("#ticketNumber").focus();
		
				$("#ticketNumber").keyup(function(){ $$.supportTag.eventSubmit(); });
				$("#ticketNumber").focus(function(e){ $$.supportTag.eventSubmit(); });
				
				// US6298 - trigger button click if user presses Enter 
				$("#ticketNumber").keypress(function(e) {
					if(e.which == 13) {
						$("#btnEmailSupport").trigger("click");
					}
				});						
		
				// US6298 - prevent form from being submitted, submit after validation 
				$('#frmEmlSpt').submit(function(e) { e.preventDefault(); });
		
				$("#btnEmailSupport").bind("click",function(e){ $$.supportTag.submitForm(); });
				
				$("#frmEmlSpt label.infield").inFieldLabels();
				
				$$.utility.sendSimpleEvent('/services/EventLog',{
					eventType: "UiClickEvent",
					referringUrl: $(location).attr('href'),
					targetUrl: $('#sinfo_footer').attr('href'),
					uiElementName : 'sinfo_footer' 
				});
			},

			submitForm: function(){
				var tktNum = $.trim($("#ticketNumber").val());
				var params = {
						requestType: "email_support",
						ticketNumber : tktNum,
						locale:$$.localization.locale
					};
				var url = $$.utility.makeUrl('/services/Feedback', params);
				var hRspCnt = $('#serviceEmailInput #msgSupportResponse');

				// US6298 - display reference number validation message 
				$.ajax(url, {
					cache: false,
					dataType: 'json',
					success: function (response) {
						var showError = false;
						if (response){
							if (response.error){
								hRspCnt.html(response.errorMessage).addClass("error");
							} else if (response.success) {
								$("#btnEmailSupport").prop("disabled", true);
								$("#ticketNumber").prop("disabled", true);
								hRspCnt.html(response.success).addClass("success");
							} else {
								showError = true;
							}
						} else {
							showError = true;
						}
						if (showError){
							hRspCnt.html('An error has prevented your support ticket from being sent, please contact support directly.').addClass("error");
						}

						$("#sinfo_footer").qtip('reposition');
					},
					error: function(jqXHR, textStatus, errorThrown){
						if (jqXHR.status !== 0){
							hRspCnt.html("Error:"+jqXHR.status+" - "+errorThrown+", please try again later. Contact support if this error continues.").addClass("error");
						}
					}
				});
				
				$$.utility.sendSimpleEvent('/services/EventLog',{
					eventType: "UiClickEvent",
					referringUrl: $(location).attr('href'),
					targetUrl: $("#btnEmailSupport").attr('href'),	
					uiElementName : 'btnEmailSupport' 
				});
				
				// US6298 - submit the form
				$('#frmEmlSpt').submit();  //do we need this?
				
				return false;
			}
		},
		
		// Object to handle displaying of various SLA messaging elements
		license: {
			checkUrl: null,
			eleSlaMsg: null,		// $('#slaMessage')
			eleSlaTrigger: null,
			eleSlaContent: null,
			
			init: function(){
				//addTiming("utd-license: init() IN");
				if ($("#slaCheckUrl").length){
					$$.license.checkUrl = $("#slaCheckUrl").attr("data-url");
					$$.license.checkDisplaySla();
				}
				//addTiming("utd-license: init() OUT");
			},
			
			// Formerly: jquery.utd.js -> showSLAMessage.init()
			checkDisplaySla: function(){
				// We need to check if the sessionBean has flipped the need to view the sla message
				// because the user may have clicked the back button and we don't want to show it twice.
				$.ajax($$.license.checkUrl, {
					cache: false,
					dataType: 'json',
					success:function(data){
						$$.license.setupSlaPanel(data);
						//After we show the message, send info to then accept it in the session
						var url = $$.license.checkUrl + '&type=accept';
						$.ajax(url,{cache: false});
					},
					error:function(){
						//if there's some kind of error show it again as a fail safe
						$$.license.setupSlaPanel(true);
					}
				});
			},
			
			// Formerly: jquery.utd.js -> showSLAMessage.initMessage()
			setupSlaPanel: function(data){	
				$$.license.eleSlaMsg = $("#slaMessage");
				
				var agreements = data.agreements;
				if(agreements.length){
					$('#main, #left, #content, #slaMessageContainer #closeMessage, #txtSearch').bind('click',$$.license.closeSlaPanel);
					$$.layout.eleBody.bind('scroll',$$.license.closeSlaPanel);
					
					for(var i=0; i<agreements.length;i++){
						$$.license.eleSlaMsg.addClass(agreements[i].agreement);
					}
					
					if ($$.license.eleSlaMsg.hasClass('lexi')){
						$$.license.setupDisplayDrugDisclaimerOverlay();
					}	
					else if($$.license.eleSlaMsg.hasClass('mcdex')){
						$$.license.setupDisplayMcDexDisclaimerOverlay();
					}
					
					if ($$.license.eleSlaMsg.hasClass("sla")){
						$$.license.setupDisplaySlaOverlay();
					}
					else {
						$$.license.eleSlaMsg.hide();
						$('#drugDisclaimMessage').addClass('drugOnly');
					}
					
					$("body").delegate('.closeSLABtn', 'click',function(e){
	                    e.preventDefault();
	                    $$.license.eleSlaTrigger.qtip('hide');
	                    return false;
	                });
					
					setTimeout("$(window).bind('scroll',$$.license.closeSlaPanel)",1000);
					
					$('#slaMessageContainer').animate({bottom: '0px'}, 1000);
				}
				else{
					$('#slaMessageContainer').hide();
				}				
			},
			
			// Formerly: jquery.utd.js -> showSLAMessage.close()
			closeSlaPanel: function(event) {
				if(event.type === "click" && event.currentTarget.id === 'closeMessage'){
					event.preventDefault();
					$$.utility.sendSimpleEvent('/services/EventLog',{ eventType: "SLACloseButtonClickEvent" });
				}
				$('#slaMessageContainer').animate({opacity: '0'}, 1000, function(){
					$('#slaMessageContainer').hide();
				});
				$('#main, #left, #content, #slaMessageContainer #closeMessage, #txtSearch').unbind('click',$$.license.closeSlaPanel);
				$$.layout.eleWindow.unbind('scroll',$$.license.closeSlaPanel);
				$$.layout.eleBody.unbind('scroll',$$.license.closeSlaPanel);
			},
			
			// Formerly: jquery.utd.js -> showSLAMessage.initSLAMsg()
			setupDisplaySlaOverlay: function(){
				// IMM042114 > US6820#TA22183 > Replaced with qTip...
				$("#sla_message").qtip({
					content:{
						text:$("#slaDialog")	 	// Get content from this element
					},
					position:$$.messaging.QTIP_POSITION_MODAL,
					show:$$.messaging.QTIP_SHOWCLICK_MODAL,
			        hide: $$.messaging.QTIP_HIDECLICK_MODAL,
					style: {
						classes: 'qtip-light qtip-dialogue utdModalQtip '
					},
					events:{
			            show: function(event, api){
			                // Check if tooltip has modal content, if not move it in
			                if ($("#slaDialog", api.elements.content).length == 0){
			                    $(api.elements.content).append( $("#slaDialog") );
			                }
			                $$.license.eleSlaTrigger = $("#sla_message");
			                $$.license.logSLALinkEvent();
			                $("#slaDialog").addClass("standard");
			            },
			            hidden: function(event, api){
			            	// Move modal content back into hidden container
			                $("#hdnSLADialog").append( api.get('content.text') );
			                $("#slaDialog").removeClass("standard");
			            }
					}					
				}).bind('click', function(e) { e.preventDefault(); return false; });
			},
			
			setupDisplayDrugDisclaimerOverlay: function(){
				$("#drug_message").qtip({
					content:{
						text:$("#drugDisclaimDialog")	 	// Get content from this element
					},
					position:$$.messaging.QTIP_POSITION_MODAL,
					show:$$.messaging.QTIP_SHOWCLICK_MODAL,
			        hide: $$.messaging.QTIP_HIDECLICK_MODAL,
					style: {
						classes: 'qtip-light qtip-dialogue utdModalQtip '
					},
					events:{
			            show: function(event, api){
			                // Check if tooltip has modal content, if not move it in
			                if ($("#drugDisclaimDialog", api.elements.content).length == 0){
			                    $(api.elements.content).append( $("#drugDisclaimDialog") );
			                }
			                $$.license.eleSlaTrigger = $("#drug_message");
			                $$.license.logSLALinkEvent();
			            },
			            hidden: function(event, api){
			            	// Move modal content back into hidden container
			                $("#hdnDrugDisclaim").append( api.get('content.text') );
			            }
					}					
				});
			},

			setupDisplayMcDexDisclaimerOverlay: function(){
				$("#drug_message").qtip({
					content:{
						text:$("#mcDexDialog")	 	// Get content from this element
					},
					position:$$.messaging.QTIP_POSITION_MODAL,
					show:$$.messaging.QTIP_SHOWCLICK_MODAL,
			        hide: $$.messaging.QTIP_HIDECLICK_MODAL,
					style: {
						classes: 'qtip-light qtip-dialogue utdModalQtip '
					},
					events:{
			            show: function(event, api){
			                // Check if tooltip has modal content, if not move it in
			                if ($("#mcDexDialog", api.elements.content).length == 0){
			                    $(api.elements.content).append( $("#mcDexDialog") );
			                }
			                $$.license.eleSlaTrigger = $("#drug_message");
			                $$.license.logSLALinkEvent();
			                $("#mcDexDialog").addClass("standard");			                
			            },
			            hidden: function(event, api){
			            	// Move modal content back into hidden container
			                $("#hdnMcDex").append( api.get('content.text') );
			                $("#mcDexDialog").removeClass("standard");
			            }
					}					
				});
			},

			logSLALinkEvent: function(event) {
				var a = $(this);
				$$.utility.sendSimpleEvent('/services/EventLog',{
					eventType: "SLAClickEvent",
					type: a[0].id 
				});
				return true;
			}
		}
	});

	// Create shortcut
	$.utdMessage = $.utd.messaging;
	$.utdSupport = $.utd.supportTag;
	$.utdLicense = $.utd.license;

	// Register the init method
	$$.debug("REG messaging.init()", $$.DEBUG_LEVEL_FULL);
	$$.registerInit( $.utdMessage.init, "$.utd.messaging" );
	
	$$.debug("REG supportTag.init()", $$.DEBUG_LEVEL_FULL);
	$$.registerInit( $.utdSupport.init, "$.utd.supportTag" );

	$$.debug("REG license.init()", $$.DEBUG_LEVEL_FULL);
	$$.registerInit( $.utdLicense.init, "$.utd.license" );
})( jQuery );
