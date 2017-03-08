// jQuery UTD Plugin Utility extension
// Utility methods/function used by UTD website
// IMM - 06.14.12 - v1.00
// 07.30.12: Added validateEmail, getUrlParam
(function($){

	// Extend the UTD object to include utility methods
	$.extend($.utd, {

		utility : {
			urlVars: [],
			userAgent : navigator.userAgent.toLowerCase(),
			formPostBack: null,	 	// $("form.postBack")
			formPleaseWait: null,	// $("form.pleaseWait")
			
			init : function() {
				//addTiming("utd-utility: init() IN");
				
				$$.utility.formPostBack = $("form.postBack");
				$$.utility.formPleaseWait = $("form.pleaseWait");
				$(".histBack").bind('click', $$.utility.windowBack);
				
				// Assign URL hash values
				var hashes = window.location.search.substring(1).split('&');
				for(var i = 0; i < hashes.length; i++){
					var hash = hashes[i].split('=');
					$$.utility.urlVars.push(hash[0]);
					$$.utility.urlVars[hash[0]] = hash[1];
				}
				//addTiming("utd-utility: init() OUT");
			},
			
			padStrLeft: function( padTmp, srcStr ){
				var strRes = "" + srcStr;	// Convert to string
				return padTmp.substring(0, padTmp.length - strRes.length) + strRes;
			},
			
			validateEmail: function(email){
				var re =  /^([a-zA-Z0-9_\-\.\+]+)@[a-zA-Z0-9\-]+(\.([a-zA-Z0-9]{1,6}))+$/;
				return re.test(email);
			},
			
			validatePhone: function(phone){
				var re =  /^1[0-9]{10}$/;
				return re.test(phone);
			},
			
			validateUserName: function(username){
				var re = /^([a-zA-Z0-9_\\\-!\.@#$*(+)=]{6,50})+$/;
				return re.test(username);
			},
			
			addUrlParam: function(url, arg, val){
				// Function which adds url agrument/value pair into passed url
				// NOTE: Replaces $$.utd.addUtdPopup()
				var anchor = url.indexOf("#");
				return (anchor > -1 ? url.substring(0, anchor) : url) + (url.indexOf("?")>-1 ? "&" : "?") + arg + "=" + val + (anchor > -1 ? url.substring(anchor) : "");
			},
			
			getUrlParam: function(name, url){
				if (typeof url != "undefined"){
					return decodeURIComponent((url.match(RegExp("[?|&]"+name+'=(.+?)(&|$)'))||[,null])[1]);
				}
				else {
					return decodeURIComponent((location.search.match(RegExp("[?|&]"+name+'=(.+?)(&|$)'))||[,null])[1]);
				}
			},
			
			getAllUrlParams: function( url ){
				var oUrl = {
					hostPath: '',
					anchor: '',
					params: [],
					paramString: ''
				};
				// If no url was passed, use current location URL
				if (typeof url == "undefined"){					
					url = window.location.href;
				}
				// Start by splitting on anchor, if there is one
				var aAnc = url.split('#'), aUrlSec, aNVPs, iPrmOff = -1, pString = '';
				if (aAnc.length > 1){
					oUrl.anchor = aAnc[aAnc.length - 1];
					iPrmOff = -2;
				}
				// Next process all URL name/value pairs into array
				aUrlSec = aAnc[aAnc.length + iPrmOff].split('?');
				oUrl.hostPath = aUrlSec[0];
				if (aUrlSec.length > 1){ // ...there are params
					aNVPs = aUrlSec[1].split('&');
					for (var iNvp = 0; iNvp < aNVPs.length; iNvp++){
						var aNvp = aNVPs[iNvp].split('=');
						oUrl.params[oUrl.params.length] = {
							'name': aNvp[0],
							'value': aNvp[1]
						};
						pString += (pString.length>0?"&":"") + aNvp[0] + '=' + aNvp[1]; 
					}
					oUrl.paramString = pString;
				}
				return oUrl;
			},
			
			decimalRound: function( value, decimal ){
				if (isNaN(value)){
					return isNaN;
				}
				else
					return Number(Math.round(value+'e'+decimal)+'e-'+decimal);
			},
			
			findUrlSegment: function(segment){
				// Function returns true if current url contains segment, false otherwise
				var segments = window.location.href.split('/');
				for(var i = 0; i < segments.length; i++){
					if(segments[i] == segment) {
						return true;
					}
				}
				return false;
			},
			
			windowLocation: function(url){
				window.location.href = url;
			},
			
			windowOpen: function(url, title, params){
				var newWin;
				if (typeof params == "undefined"){
					newWin = window.open(url, title);
				}
				else {
					newWin = window.open(url, title, params);
				}
				return newWin;
			},
			
			windowPrint: function() {
				window.print();
				return false;
			},
			
			windowBack: function() {
				window.history.back();			
				return false;
			},
			
			buttonRelocate: function(btn, url){
				// When button is presssed that should cause browser
				// to change location, this handler will disable the
				// button, change the text of the button to the passed
				// "msg", then set the new window location to "url".
				if (btn){
					var sOrgLbl = btn.val();
					btn.attr("disabled","disabled").attr("origLabel",sOrgLbl).val($$.settings.pleaseWaitMessage);
					if (typeof url != "undefined"){
						window.location = url;
					}
				}
			},

			disableButton: function(submit){
				var bRet = false;
				if (!submit.hasClass("disabled")){
					submit.addClass("disabled");
					bRet = true;
				}
				return bRet;
			},

			setupFormPleaseWait: function(){
				//addTiming("utd-utility: setupFormPleaseWait() IN");
				// When user submits the form, display "Please wait" message on submit button
				$$.utility.formPleaseWait.submit(function(evt){
					var oBtn = $(this).data('button') || $(evt.target).find('input[type="submit"]');
					$$.utility.buttonRelocate( oBtn );
					// Disable all submission controls...
					$("input[type='submit'],input[type='button'],button").attr("disabled","disabled");
					return true;
				});
				//addTiming("utd-utility: setupFormPleaseWait() OUT");
			},
			
			setupFormPostBacks: function(){
				//addTiming("utd-utility: setupFormPostBacks() IN");
				// When any submit button for a .postBack form is clicked... 
				$("input[type='submit'],input[type='button'],input[type='image']",$$.utility.formPostBack).click(function(){
					$(this).addClass("submitClicked");
				});
				
				// If class "postBack" exists, bind all submit buttons to handler
				$$.utility.formPostBack.submit(function(event){
					var eleOrgBtn = $(".submitClicked");
					var srcEventName = "";
					var srcEventArg = "";
					
					if (eleOrgBtn.length){
						srcEventName = eleOrgBtn.attr("x-pbeventname");
						srcEventArg = eleOrgBtn.attr("x-pbeventarg");
						eleOrgBtn.removeClass("submitClicked");
					}
					
					var pstEventName = $("#_EVENTNAME");
					var pstEventArg = $("#_EVENTARG");
					var pstPostBack = $("#_POSTBACK");
					var pstDestination = $("#_DESTINATION");

					if (pstEventName.length && pstEventArg.length){
						pstEventName.val(srcEventName);
						pstEventArg.val(srcEventArg);
					}
					
					pstPostBack.val("true");
					
					if (pstDestination.length){
						var destVal = $.trim(pstDestination.val()); 
						if (destVal != ''){
							$(this).attr("action", destVal);
						}
					}

					return true;
				});
				//addTiming("utd-utility: setupFormPostBacks() OUT");
			},
			
			makeUrl: function(url, params) {
				// Adds the context path as a prefix to the specified relative URL and 
				// returns the new URL. This is equivalent to using the Struts html:link 
				// tag (with the page attribute) within a JSP.
				var u = $$.settings.contextPath + url;
				if (params) {
					u = u + (url.indexOf('?') > -1 ? "&" : "?") + $.param(params);			
				}
				return u;
			},
			
			makeTimeStamp : function() {
				var oDate = new Date();
				return Date.UTC(oDate.getFullYear(),oDate.getMonth(),oDate.getDate(),oDate.getHours(),oDate.getMinutes(),oDate.getSeconds(),oDate.getMilliseconds());
			},
			
			sendSimpleEvent: function(eventUrl, eventParams){
				// Utility method which handles submitting of an
				// event to the server
				var url = this.makeUrl(eventUrl, eventParams);
				$.ajax(url, {cache: false});
				return true;
			},
			
			updateUserSetting: function( settingCode, settingValue ){
				var url = this.makeUrl('/services/UpdateUserSetting', {
					sc: settingCode,
					val: settingValue
				});
				$.ajax(url);
			},
			
			centerWithinFrame : function( outer, inner, recurseInner ){
				// This function will attempt to return the top and left coordinates
				// that will center the 'inner' element within the 'outer' frame.
				// The 'recurseInner' parameter can be set which will attempt to 
				// determine the 'inner' dimensions by parsing the width and height
				// of all of the 'inner' child elements.
				// IMM080112#1.0
				var vOutW = $(outer).width();
				var vOutH = $(outer).height();
				var vInrW = (recurseInner ? $.utdUtils.getCombinedWidth(inner) : $(inner).width());
				var vInrH = (recurseInner ? $.utdUtils.getMinimumHeight(inner) : $(inner).height());

				var pTop = Math.floor(vOutH / 2) - Math.floor(vInrH / 2);
				var pLft = Math.floor(vOutW / 2) - Math.floor(vInrW / 2);

				return { 'top': pTop, 'left': pLft };
			},
			
			getCombinedWidth : function( ele ) {
				// Function which attempts to retrieve the combined width 
				// of all child elements contained within passed element.
				// IMM080112#1.0
				var iWdt = 0;
				$(ele).children().each(function(){
					iWdt += $(this).width();
				});
				return iWdt;
			},
			
			getMinimumHeight : function( ele ) {
				// Function which attempts to determine the minimum height
				// of all child elements contained within passed element.
				// IMM080112#1.0
				var iHgt = 0;
				$(ele).children().each(function(){
					var vHgt = $(this).height();
					if (vHgt > iHgt){
						iHgt = vHgt;
					}
				});
				return iHgt;
			},
			
			stripActionExtensions: function(){
				//addTiming("utd-utility: stripActionExtensions() IN");
				// Utility support method to strip struts ".do" extensions from action urls
				var aUrls = ['search.do',
				             '/cme',
				             '/account',
				             'store.do',
				             'agreement.do',
				             'drug-disclaimer.do',
				             'email.do',
				             'login.do',
				             'register.do',
				             'letter.do',
				             'survey.do',
				             'change-password.do'];
 
				// Process each form tag found on page
				$('form').each(function(){
					// Attempt to retrieve action attribute of form tag
					var aAction = $(this).attr("action");
					if(aAction !== undefined && aAction.length){
						// Store whether action string contains '.do'
						var actionHasDo = aAction.indexOf('.do');
						// Iterate through all URL match segments
						for (var seekIdx = 0; seekIdx < aUrls.length; seekIdx++){
							var seekStr = aUrls[seekIdx];
							// Does current URL match string contain '.do'
							var seekHasDo = seekStr.indexOf('.do');
							// See if action string contains current URL match,
							// and if URL match does not contain '.do', then 
							// make sure current action does before stripping...
							if ((aAction.indexOf(seekStr) > -1) &&
								((seekHasDo > -1) || ((seekHasDo === -1) && (actionHasDo > -1)))){
								$(this).attr("action", aAction.replace(".do",""));
							}
						}
					}
				});
				//addTiming("utd-utility: stripActionExtensions() OUT");
			},
			
			recordUiClickEvent: function(event) {
				var thiz = $(this);
				var href = thiz.attr('href');
				var target = thiz.attr('target');
				
				var isInPopup = false;
				$.each($$.topic.popMap, function(key, value) {
					if(thiz.hasClass(key)){
						isInPopup = true;
						return;
					}
				});
				 
				var preventDefault = target !== 'undefined' && target !== "_blank" && !isInPopup;
				
				if (preventDefault){
					event.preventDefault();
				}
				//try to get the current elements ids, if it's  
				// not found go up the chain until we find one
				var id = thiz.attr('id');
				if(id === undefined){
					id = thiz.parents().filter(
						function(index) { 
							return $(this).attr('id') != null;
							}
						).attr('id');
				}
				var params = {
					eventType: "UiClickEvent",
					referringUrl: $(location).attr('href'),
					targetUrl: href,
					uiElementName : id 
				};
				
				var url = $$.utility.makeUrl('/services/EventLog', params);
				$.ajax(url).done(function() {
					if (preventDefault){
						window.location = href;
					}
				});
				
				return (target === 'undefined' || target === "_blank" || isInPopup);
			},
			

			// Utility method to display number of characters remaining
			// For this to work correctly, the text box must have a unique ID, 
			// the span tag for the counter must have an ID of the format:
			// "counter_{TEXTBOX_ID}", and the span tag for the counter must
			// also have an attribute named "data-charlimit" with a numerical value.
			limitCharsInField: function(){
				var fid = $(this).attr("id");
				var oMsg = $("#counter_"+fid);
				if (typeof oMsg != "undefined"){
					var curStr = $(this).val();
					var maxLen = parseInt(oMsg.attr("data-charlimit"));
					if (!isNaN(maxLen)){
						if (curStr.length > maxLen){
							curStr = curStr.substr(0, maxLen);
							$(this).val(curStr);
						}
						oMsg.html(maxLen - curStr.length + "&nbsp;" + $$.settings.charRemainingMessage);
					}
				}
			},
			
			openNativeApp: function(){
				var url = $$.settings.nativeAppUrl
				if ($$.settings.mobileToken) {
					url += encodeURIComponent($$.settings.mobileToken);
				}
				window.location = url;
			},
			
			isIE : function() {
				return ((/msie/.test(this.userAgent.toLowerCase())) || (/trident\//.test(this.userAgent.toLowerCase())));
			},
			
			isIE6 : function() {
				return ($$.settings.appType === 'IE_6');
			},
			
			isIE7 : function() {
				return ($$.settings.appType === 'IE_7');
			},
			
			isIE8 : function() {
				return ($$.settings.appType === 'IE_8');
			},
			
			isIE9 : function() {
				return ($$.settings.appType === 'IE_9');
			},
			
			isIE10 : function() {
				return ($$.settings.appType === 'IE_10');
			},

			isIE11 : function() {
				return ($$.settings.appType === 'IE_11');
			},
			
			isIELessThan8 : function(){
				return (($$.utility.isIE6()) ||
						 ($$.utility.isIE7()));
			},
			
			isIELessThan9 : function(){
				return (($$.utility.isIE6()) ||
						 ($$.utility.isIE7()) ||
						 ($$.utility.isIE8()));
			},
			
			isChrome : function() {
				return /chrome/.test(this.userAgent);
			},
			
			isOpera : function() {
				return /opera/.test(this.userAgent);
			},
			
			isSafari : function() {
				return /safari/.test(this.userAgent) && !this.isChrome();
			},
			
			isFirefox : function() {
				return /firefox/.test(this.userAgent);
			}	
		},

		//account/usage report. Add change handler then submit the form to refresh it
		usageReport:{ 
			init: function(){
				$('#startDate').bind('change', $$.usageReport.refresh);
				$('#endDate').bind('change', $$.usageReport.refresh);
				$('#usagePrintIcon').bind('click', $$.usageReport.printPage);
				$('#usagePrintLink').bind('click', $$.usageReport.printPage);
			},
			
			refresh: function(){
				$('#usageForm').submit();
			},

			printPage: function(){
				var startDate = $('#startDate').val();
				var endDate = $('#endDate').val();
				var href = $(this).attr('href');
				$(this).attr('href', href + "&startDate=" + startDate + "&endDate=" + endDate);
			}
		}
	});

	// Create shortcut
	$.utdUtils = $.utd.utility;

	// Register the init method
	$$.debug("REG utility.init()",$$.DEBUG_LEVEL_FULL);
	$$.registerInit( $.utdUtils.init, "$.utd.utility" );

})( jQuery );

