(function($){
	$.utd = {
		/* 
		+-----------------------------------------------------------------------+ 
		| > > > > > NOTE: debugLevel MUST be set to 0 for production! < < < < < |
		+-----------------------------------------------------------------------+ 
		*/
		DEBUG_LEVEL_TEMP: 1,
		DEBUG_LEVEL_EVENTS: 2,
		DEBUG_LEVEL_FULL: 3,
		DEBUG_TO_CONSOLE: true,	// Send debug output to console, or false for debug window
		
		// 0 = Debugging messages off - SET TO THIS BEFORE PROMOTING
		// 1 = Temp debugging messages
		// 2 = Event debug messages
		// 3 = Full debug messages
		debugLevel: 0,		
		
		COOKIE_DEBUG_PANEL_POSITION: "utdDbgPnlTL",
		COOKIE_DEBUG_PANEL_DIMENSION: "utdDbgPnlWH",
		
		contextPath: '',				// Used by $.utdUtility.makeUrl() to correctly form URLs.
		pageType: '',					// This is for versionDetails and devDetails
		isPrintView: false,				// A flag indicating whether we are in the print view or not.
		isShowSurvey : false,			// A flag indicating whether the current user is eligible to see surveys, based on his surveyProgramAccess
		isUserEngagement : false,		// For user engagement
		smartSearchUIEnabled : false,	// True when smart search UI

		// Value to contain settings for plugin
		settings : {},

		listInitFunc: [],			// Array of functions to execute when init is called

		// Used for shortcut to debug panel
		dbgPnl: null,
		
		// Private methods
		init : function( options ) {
			//addTiming("utd-core: init() IN");
			$(document).ready(function(){
				//addTiming("utd-core: init() document.ready IN");
	
				// Setup default settings
				$$.settings = $.extend({
					contextPath: '',
					topicType: '',
					topicClass: '',
					topicKey: '',
					topicLanguage: '',
					pageType: '',
					imageKey: '',
					imageTitle: '',
					searchTerm: '',
					isPrintView: false,
					isHomePage: false,
					isLayout: "true",
					tabId: '',
					onReadyUrl: '/services/AutoComplete',
					isIndividualSubscribeBtn: true,
					locale: 'en',
					chooseLanguage: false,
					newSearch: 'New Search',
					removeTxt: 'Remove',			 	
					acceptUrl: '/services/AgreementWebService?type=sla',
					declineUrl: '/account/contact-us',
					licenseUrl: '',
					appType: 'BROWSER_DEFAULT',
					nativeAppUrl: 'uptodate://?ssoToken=',
					mobileToken: '',
					isFromMobileApp: false
				}, options);
	
				// Setup any polyfills we might be using
				$$.addPolyfills();
				
				// Execute list of initialization methods
				if (($$.listInitFunc) && ($$.listInitFunc.length)) {
					do {
						var oFunc = $$.listInitFunc.shift();
						//addTiming("utd-core: execInit("+oFunc.fName+")");
						(oFunc.fObj)();
					} while ($$.listInitFunc.length);
				}
				
				// Handle post init actions, in a timeout
				setTimeout(function(){
					$$.utility.setupFormPleaseWait();		// Setup global form "Please wait" handler
					$$.utility.setupFormPostBacks();		// Setup post back handler
					$$.utility.stripActionExtensions();		// Remove '.do' from some form methods
					$$.wireupExternalLinkHandler();			// Wireup links with .external to open in new windows
					$$.wireupGlobalClickReporting();		// Wireup global click event reporting
				},200);

				// Setup timeout to display timings 
//				setTimeout(function(){
//					dumpTimings();
//				},1000);
				
				//addTiming("utd-core: init() document.ready OUT");
			});
		},
		
		debug : function( out, lvl, clr ) {
			// IMM050114 Added 'lvl' argument, if not passed defaults to 1
			// $$.debugLevel values...
			if ($$.debugLevel > 0){
				if (!lvl){
					lvl = 1
				}
				if ($$.debugLevel >= lvl){
					if (this.DEBUG_TO_CONSOLE) {
						console.log(out);
					}
					else {
						this.dbgPnl = $("#debugPanel");
						var sSrc = new String(out);
						// If debug window is not present, create it.
						if (this.dbgPnl.length == 0){
							this.dbgPnl = this.createDebugPanel();
						}
						if (this.dbgPnl.length){
							var dbgCnt = $("#debugPanel #debugCnt");
							if (clr){
								dbgCnt.html("");
							}
							var sCur = dbgCnt.html();
							// Replace \n with <br/>...
							sCur += (sCur.length ? '<br/>' : '')+sSrc.replace(/\n/g,"<br/>");
							dbgCnt.html(sCur);
						}
					}
				}
			}
		},
		
		createDebugPanel: function(){
			$("body").append('<div id="debugPanel"><div class="ui-widget-header">Debug Panel - <a id="dbgClr">Clear</a></div><div id="debugCnt" style="width:100%;height:95%;overflow-x:hidden;overflow-y:auto;"></div><div id="debugHdl" class="ui-resizable-handle ui-resizable-sw"></div></div>');
			var dbgPnl = $("#debugPanel");
			var udpTL = $.cookie($$.COOKIE_DEBUG_PANEL_POSITION);
			var udpWH = $.cookie($$.COOKIE_DEBUG_PANEL_DIMENSION);
			var dTop = (udpTL === null ? 280 : udpTL.split('|')[0]);
			var dLft = (udpTL === null ? 280 : udpTL.split('|')[1]);
			var dWdt = (udpWH === null ? 280 : udpWH.split('|')[0]);
			var dHgt = (udpWH === null ? 280 : udpWH.split('|')[1]);
			
			if (dTop - $(window).scrollTop() < 0) {
				dTop = 280;
			}
			dbgPnl.css({
				"position":"fixed",
				"top":dTop+"px",
				"left":dLft+"px",
				"width":dWdt+"px",
				"height":dHgt+"px",
				"z-index":10,
				"font-family":"Lucida Console,Courier New",
				"font-size":"11px",
				"background-color":"#FFFDDF",
				"color":"#333",
				"border":"4px solid #dedede",
				"padding":"4px"
			});
			dbgPnl.resizable({
				stop: function( evt, ui ){
					dbgPnl.css({"position":"fixed"});
					$.cookie($$.COOKIE_DEBUG_PANEL_DIMENSION,dbgPnl.width()+"|"+dbgPnl.height(),{expires:365,path:'/'});
				}
			});
			dbgPnl.draggable({
				stop: function( evt, ui ){
					$.cookie($$.COOKIE_DEBUG_PANEL_POSITION,dbgPnl.position().top+"|"+dbgPnl.position().left,{expires:365,path:'/'});
				}
			});
			$("#debugPanel #dbgClr").click(function(){
				$("#debugPanel #debugCnt").html("");
			});
			return dbgPnl;
		},

		showOptions : function() {
			var sDbg = "";
			for( var prop in this.settings )
			{
				if (this.settings.hasOwnProperty(prop)){
					sDbg += prop + "=["+this.settings[prop]+"]\n";
				}
			}
			this.debug(sDbg);
		},
		
		wireupExternalLinkHandler: function(){
			//addTiming("utd-core: wireupExternalLinkHandler() IN");
			$("a.external").bind('click',function(e){
				var href = $(this).attr("href");
				e.preventDefault();
				$$.utility.windowOpen(href, "_new", "");
				return false;
			});
			//addTiming("utd-core: wireupExternalLinkHandler() OUT");
		},
		
		wireupGlobalClickReporting: function(){
			//addTiming("utd-core: wireupGlobalClickReporting() IN");
			var currentURL = $(location).attr('pathname').split("/").pop();
			if(currentURL && !(currentURL == "the-basics" && $$.utility.isIELessThan9())) {
				$.each($$.settings.uiClickEventUrls.split(","), function(index, url) {
					$links = $("a").filter(function(){
				         return $(this).attr('href');
				    });
					$links.filter(function() {
						var ret = $(this).attr('href').match(url);
					    return ret;
					}).bind('click', $$.utility.recordUiClickEvent);
				});
			}
			//addTiming("utd-core: wireupGlobalClickReporting() OUT");
		},

		registerInit: function( fInit, fName ) {
			//addTiming("utd-core: registerInit("+(typeof fName != "undefined" ? fName : "")+")");
			// Method to register initialization method to be run when main init is run.
			// Methods will run in order they are added to the array (first-in, first-out).
			if (typeof(fInit)=="function") {
				this.listInitFunc.push({'fName':fName, 'fObj': fInit});
			}
		},

		// Function which adds in any needed polyfills
		addPolyfills: function(){
			//addTiming("utd-core: addPolyfills() IN");
			this.debug("->core.addPolyfills()",$$.DEBUG_LEVEL_FULL);
			this.polyfillArrayMap();
			//addTiming("utd-core: addPolyfills() OUT");
		},

		// Function to polyfill Array.prototype.map() as needed
		// NOTE: Required by $$.topic.openEmailPopup()
		polyfillArrayMap: function(){
			//addTiming("utd-core: polyfillArrayMap() IN");
			if (!Array.prototype.map) {
				this.debug("> Polyfill: Array.prototype.map",2);
				Array.prototype.map = function(fun /*, thisArg */) {
					"use strict";

					if (this === void 0 || this === null)
						throw new TypeError();

					var t = Object(this);
					var len = t.length >>> 0;
					if (typeof fun !== "function")
						throw new TypeError();

					var res = new Array(len);
					var thisArg = arguments.length >= 2 ? arguments[1] : void 0;

					for (var i = 0; i < len; i++) {
						// NOTE: Absolute correctness would demand Object.defineProperty
						//       be used.  But this method is fairly new, and failure is
						//       possible only if Object.prototype or Array.prototype
						//       has a property |i| (very unlikely), so use a less-correct
						//       but more portable alternative.
						if (i in t)
							res[i] = fun.call(thisArg, t[i], i, t);
					}

					return res;
				};
			}
			//addTiming("utd-core: polyfillArrayMap() OUT");
		}
	}; // End of utd

	// Create shortcut ($$ == $.utd)
	window.$$ = $.utd;

	// Our anyMatches jQuery plug-in.  Returns true if the jQuery selector 
	// returns any matches and false otherwise.  
	$.fn.anyMatches = function() {
		var e = false;
		this.each(function() {
			e = true;
			return false;  // breaks out of the each loop
		});
		return e;
	};

	/**
	 * Our htmlOuter jQuery plug-in.  This is similar to the jQuery html() method except that
	 * it performs an "outer" HTML, returning the HTML of the first element itself wrapped around 
	 * its "inner" HTML. 
	 */
	$.fn.htmlOuter = function() {
	  return $('<div>').append(this.first().clone()).html();
	};

	/**
	 * Our offsetViewport jQuery plug-in.  This is similar to the jQuery offset() method except that
	 * it calculates left and top from the element's position relative to the viewport, not the
	 * document.  
	 */
	$.fn.offsetViewport = function() {
	  var offset = $(this).offset();  
	  return {
	    left: offset.left - $(window).scrollLeft(),
	    top: offset.top - $(window).scrollTop()
	  };
	};
})(jQuery);

