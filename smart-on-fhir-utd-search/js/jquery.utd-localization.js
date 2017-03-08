(function($){

	// Extend the UTD object to include the Enterprise Manager object
	$.extend($.utd, {

		localization: {
			locale: 'en',
			latinLang: 'en,fr,de,it,es,pt',	// Latin based languages
			layout: null,
			autoCompleteLength: '',
			currentLanguage: null,
			providerTranslationURL: '',
			
			eleJALang: null,		// $("#japaneseLang")
			eleENLang: null,		// $("#englishLang")
			eleSubmitLang: null,	// $("#submitLang")
			eleSearchText: null,	// $("#searchbox_dd_type_name")
			eleRateTrans: null,		// $("#rateTrans")
			eleRateTransLink: null,	// $("#rateTransLink")
			eleProviderLink: null,  // $("#providerLink")
			eleCloseRT: null,		// $(".closeRT")
			eleEtacLang: null,		// $("#etacLanguage")
			elePrintEtacLang: null,	// $("#printControls #etacLanguage")
			
			init: function(){
				//addTiming("utd-localization: init() IN");
			
				$$.localization.setElements();
				$$.localization.initLocale();
				$$.localization.setEvents();
				$$.localization.handleBrowserQuirks();
				if ($("#setLanguageContainer").length) {
					$$.localization.setCurrentLanguage();
				}
				//addTiming("utd-localization: init() OUT");
			},
			
			// Setup jQuery selectors for object
			setElements: function(){
				this.eleJALang = $("#japaneseLang");
				this.eleENLang = $("#englishLang");
				this.eleSubmitLang = $("#submitLang");
				this.eleSearchText = $("#searchbox_dd_type_name");
				this.eleRateTrans = $("#rateTrans");
				this.eleRateTransLink = $("#rateTransLink");
				this.eleProviderLink = $("#providerLink");
				this.eleCloseRT = $(".closeRT");
				this.eleEtacLang = $("#etacLanguage");
				this.elePrintEtacLang = $("#printControls #etacLanguage");
				
				this.locale = ($$.settings.locale || this.locale);
			},
			
			// Perform primary object initialization
			initLocale: function(){
				// If current language is not english...
				if ($$.localization.locale !== 'en'){
					$$.layout.eleBody.addClass('non_eng');
					if ($$.localization.latinLang.indexOf($$.localization.locale) === -1){
						$$.layout.eleBody.addClass('lang_ja');
					}
					
					if ($$.localization.eleRateTrans.hasClass('google') || $('#bottomRateTrans').hasClass('google')){
						$$.localization.eleProviderLink.attr("href", $$.localization.providerTranslationURL);
					}					
					else {
						// Hide and disable the link
						$$.localization.eleProviderLink.css("cursor", "default").bind('click',function(e){e.preventDefault();});
					}
				}
				else {
					$$.layout.eleBody.removeClass('lang_ja');
					$$.layout.eleBody.addClass('localization');
				}
				
				if ($$.localization.locale === 'ja'){
					$$.layout.eleBody.addClass('ja');
				}
				
				// Disable the submit button if the current language is selected
				var enableSubmit = function(){
					$$.localization.eleSubmitLang.prop("disabled", false);
				};
				var disableSubmit = function(){
					$$.localization.eleSubmitLang.prop("disabled", true);
				};

				if ($('#englishLang:checked').length){
					$$.localization.eleJALang.bind('click', enableSubmit);
					$$.localization.eleENLang.bind('click', disableSubmit);
				}
				else{
					$$.localization.eleJALang.bind('click', disableSubmit);
					$$.localization.eleENLang.bind('click', enableSubmit);					
				}
			},
			
			// Setup object handlers
			setEvents: function(){
				// US47 > Wire up ETAC language selector
				$$.localization.onChangeEtacLanguage();
				
				// Bind the language selection dropdown in the Print Topic window to
				// the method that displays the topic in the selected language
				$$.localization.elePrintEtacLang.bind('change', function(e){
					e.preventDefault();
					$$.localization.changePrintLanguage(e);
				});

				// Setup events if current locale is not English				
				if ($$.localization.locale !== 'en'){
					// Wireup rate this translation link handler
					$$.localization.eleRateTransLink.bind('click', function(){
						$$.localization.eleRateTrans.show();
					});
					$$.localization.eleCloseRT.bind('click', function(){
						$$.localization.eleRateTrans.hide().removeClass('adjustRateTransSubmit');
					});
					
					// If the user clicks outside of the box then hide it
					$$.layout.eleDocument.bind('click',function(e){	
						var target = $(e.target);
						if (!$(e.target).is("#rateTrans *") && !$(e.target).is("#rateTransLink")) {    
							$$.localization.eleRateTrans.hide().removeClass('adjustRateTransSubmit');
						}  
					});
					
					$('#incorrectTrans').bind('click', function(){
						$$.localization.eleRateTrans.addClass('rateSuggestions');
					});
					
					$('#correctTrans').bind('click', function(){
						$$.localization.eleRateTrans.removeClass('rateSuggestions');
					});
					
					$('#rateTransSubmit').bind('click',$$.localization.sendTranslationFeedback);
				}
			},
			
			// Perform any browser specific hacks
			handleBrowserQuirks: function(){
				// IE8 acts weird in Quirks mode with non-English letters. Doing some special handling to prevent that.
				if ($$.utility.isIE8() && ($$.localization.latinLang.indexOf($$.localization.locale) === -1) && $$.localization.layout){
					$('#headerLinks a').bind('mouseover',function(event){
						event.preventDefault();
						$('#headerLinks a').css('font-size','10px');
					});
					
					if ($$.localization.eleSearchText.length){
						$$.localization.eleSearchText.bind('mouseover', function(event){
							event.preventDefault();
							$$.localization.eleSearchText.css('font-size', '10px');
						});
					}
				}
			},
		
			// This is the "Is this translation correct?" on the search results page
			sendTranslationFeedback: function (event){
				var result = $('input[name="rateOptions"]:checked').val();
				var term = $('#txtSearch').val();
				var translation = $('#translation').val();
				var suggestions = $('#suggestionsTA').val();
				
				if (result === "correct"){
					suggestions = "";
				}
				
				var options = $("#options");				
				if (options.length){
					var optionsId = options[0].innerText;
					start = optionsId.indexOf(':')+2;
					options = optionsId.substring(start);
				}
				else{
					options = '';
				}
				
			    // result: true = yes, false = no
			    // term: search term
			    var params = {
			        requestType: "translation_feedback", 
			        answer: result, 
			        searchTerm: term,
			        translation: translation,
			        suggestions: suggestions,
			        options: options
				};
				
			    var url = $$.utility.makeUrl('/services/Feedback', params);
			    $.ajax(url, {cache: false});
				
			    var rateTrans = $('#rateTrans');
			    rateTrans.addClass("adjustRateTransSubmit");
			    $('#suggestionsTA').val('');
			    $('#correctTrans').prop("checked", true);
			    rateTrans.removeClass('rateSuggestions');
			    rateTrans.hide();
			    
				return false;
			},
			
			// Setup handler for when user changes ETAC language
			onChangeEtacLanguage: function(){
				if ($$.localization.eleEtacLang.length) {
					var path = location.pathname;
					var langVal = "en-US";	//set this as default since it's not shown in the URL
					
					// When user changes language dropdown on ETAC form,
					// then change the topic title displayed above the form.
					$$.localization.eleEtacLang.bind('change', function(event){
						var sLngCde = event.target.value;
						var sTtlSel = "#title-"+sLngCde;
						
						if ($(sTtlSel).length){
							if ($("td#topicTitle b").length){
								$("td#topicTitle b").html( $(sTtlSel).val() );
							}
						}
						
						return false;
					});
					
					// This is for the print view of the topic to make
					// sure we set the correct language selector
					if ($('#printControls').length){												
						$("option",$$.localization.eleEtacLang).each(function(){
							var op = $(this).val();
							if (path.indexOf(op) > 0){
								langVal = op;								
							}							
						});
						$$.localization.eleEtacLang.val(langVal);
					}
				}
			},
			
			changePrintLanguage: function(event) {
				var lang = event.target.value;
				var href = window.location.href;
				var newUrl = '/contents/';
				var index = href.indexOf('/image');
				
				if (index > 0) {
					substr = href.substring(index, href.length);
					if (lang !== 'en-US') {
						newUrl = newUrl + lang + substr;
					}
					else {
						newUrl = newUrl + substr.substr(1, substr.length-1);
					}
				}
				else {
					var segments = href.split('/');
					
					if (lang !== 'en-US') {
						newUrl = newUrl + lang + '/' + segments[segments.length-1];
					}
					else {
						newUrl = newUrl + segments[segments.length-1];
					}
				}
				
				var url = $$.utility.makeUrl(newUrl);
				window.location.href = url;
	
				return false;
			},
			
			setLanguage: function(event) {
				event.preventDefault();
				var locationValue = null;
				
				if ($('#setLanguageSubmit').attr('source') === "headerLanguage") {
					locationValue = "DROP_DOWN_HEADER";
				}
				else {
					locationValue = "SEARCH_BOX";
				}
				
				var params = {
					requestType: 'setLocale',
					language: $('#supported_languages ul li.active').attr('id'),
					location: locationValue
				};
				
				var url = $$.utility.makeUrl('/services/Localization', params);
				$.ajax(url,{
					dataType: 'json', 
					success: $$.localization.reloadPage,
					error: $$.localization.init,
					cache: false
				});								
			},

			setLanguageClose: function(event) {
				$("#setLanguageContent ul li").removeClass("active");
				var oinp = $("#" + $$.localization.currentLanguage);
				oinp.addClass("active");
				return false;
			},

			setCurrentLanguage: function() {
				$$.localization.currentLanguage = $('#supported_languages ul li.active').attr('id');
			},
			
			getLanguageCode: function(){
				// First, see if 'language' URL parameter exists. If so, return that.
				var langCode = $$.utility.getUrlParam("language");
				if (langCode === "null"){
					// If not, then if 1st URL path is 'contents', check if 2nd URL path
					// matches list of existing language codes. If so, return that.
					var langPattern = new RegExp("\/contents\/([a-zA-Z0-9\\-]+)\/");
					var results = langPattern.exec(window.location);
				    if (results === null) {
						langCode = 'en-US';
					}
					else {
						langCode = results[1];
					}
				}
				return langCode;
			},
			
			reloadPage: function(){
				var query = location.search;
				var translation, trans;
				var params = query.split("&");
				var param, href;
				var found = false;
				var newHref = window.location.href;
				
				// This tests to see if the sample topic bar is being displayed.
				if ($$.layout.eleBody.hasClass('showSample')) {
					$('.sample_container').removeClass('showSample'); 
					$('#sample_' + $$.localization.locale).addClass('showSample');
				}
				
				// Determine if we are possibly on the search results page
				if (query.indexOf("search=") > -1){
					
					//get the search query parameter
					for (x in params){
						param = params[x];
						if (param.indexOf("search=") > -1){
							trans = $('#translation');
							if (trans.anyMatches()){
								translation = trans.val();
								//Validates we are on the search results page in another language because the translation value has been set
								if (translation != null && translation.length){
									found = true;
									translation = "search=" + translation;
									if (param.indexOf("?") > -1){
										translation = "?" + translation;
									}							
									//refresh the page with the translation pulled from the page
									href = window.location.href.replace(param, translation);
									window.location.href = href;
								}
							}
							break;
						}						
					}		
					
					if(!found){
						window.location.reload();
					}
				}
				else{			
					//this is to prevent a message forcing the user to "resend" the data on post and is done instead of window.location.reload();
					window.location.href = newHref;
				}
			}
		},

		// language selector dialog object
		languageSelector: {
			// Initialize language selector qTip2 tooltip
			init: function(){
				//addTiming("utd-languageSelector: init() IN");

				// Wire up modal controls
				$$.languageSelector.wireupControls();

				// Wireup qTip modal dialog
				$("a.setFBLanguage").qtip({
					content:{
						text:$("#setLanguageContainer"),	// Get content from this element
						button:'close'						// ...add in qTip close button
					},
					position:$$.messaging.QTIP_POSITION_MODAL,
					show:$$.messaging.QTIP_SHOWCLICK_MODAL,
			        hide: $$.messaging.QTIP_HIDECLICK_MODAL,
					style: $$.messaging.QTIP_STYLE_MODAL,
					events:{
						render: function(event, api){
							if ($$.utility.isIE6()){ // HACKHACKHACKHACK
								$("#qtip-overlay").hide();
								$("html").css({'overflow-y':'hidden'});
								$("body").append('<div id="TheRealDeal" style="position:absolute;top:0;left:0;height:'+$$.layout.windowHeight+'px;width:100%;background-color:black;z-index:14800;filter:alpha(opacity=50);">');
							}
						},
			            show: function(event, api){
                        	// Make sure to close "Find in Topic" dialog...
                        	$(".qtip-close",$$.findInPage.fipDlg).trigger("click");

			                // Check if tooltip has modal content, if not move it in
			                if ($('#setLanguageContainer', api.elements.content).length == 0){
			                    $(api.elements.content).append( $("#setLanguageContainer") );
			                }
			            },
			            hidden: function(event, api){
			            	// Move modal content back into hidden container
			                $("#hdnLangCont").append( api.get('content.text') );
			                if ($$.utility.isIE6()){ // HACKHACKHACKHACK
				                $("html").css({'overflow-y':'scroll'});
				                $("#TheRealDeal").remove();
			                }
			            }
					}
				});
				//addTiming("utd-languageSelector: init() OUT");
			},

			// Function to wireup language selector tooltip controls
			wireupControls: function(){
				$('#setLanguageSubmit').bind('click',$$.localization.setLanguage);
				
                $$.layout.eleBody.delegate('#setLanguageCancel', 'click',function(e){
                    e.preventDefault();
                    $("a.setFBLanguage").qtip('hide');
                    $$.localization.setLanguageClose();
                    return false;
                });

				$("#setLanguageContent ul li a").click(function(e){e.preventDefault();});
				$("#setLanguageContent ul li").click(function() {
					$("#setLanguageContent ul li").removeClass("active");
					$(this).closest("ul li").addClass("active");
				});				
			}
		}
	});

	// Create shortcuts
	$.utdLocale = $.utd.localization;
	$.utdLanguage = $.utd.languageSelector;

	// Register the init method
	$$.debug("REG localization.init()",$$.DEBUG_LEVEL_FULL);
	$$.registerInit( $.utdLocale.init, "$.utd.localization" );
	
	$$.debug("REG languageSelector.init()",$$.DEBUG_LEVEL_FULL);
	$$.registerInit( $.utdLanguage.init, "$.utd.languageSelector" );

})( jQuery );
