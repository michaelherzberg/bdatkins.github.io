// jQuery UTD Plugin Layout extension
// UI properties and methods used by all other
// objects to control general layout of web app.
// --------------------------------------------
// DEPENDENCIES:
// jquery.utd-core.js
// jquery.utd-utilitiy.js
// --------------------------------------------
(function($){

	// Extend the UTD object to include the Layout object
	$.extend($.utd, {

		layout: {
			eleDocument: null,			// $(document)
			eleWindow: null, 			// $(window)
			eleBody: null,				// $("body")
			eleHeader: null,			// $("#header")
			eleOuter: null,				// $("#main")
			eleLeftPanel: null,			// $("#left")
			eleRightPanel: null,		// $("#content")
			eleSidebar: null,			// $("#sidebar")
			eleHeaderTier1: null,		// $("#hTier1")
			eleHeaderTier2: null,		// $("#hTier2")
			eleHeaderTier3: null,		// $("#hTier3")
			eleHeaderTier4: null,		// $("#hTier4")
			eleHeaderShadow: null,		// $("#headerShadow")
			eleCobrandLogo: null,		// $("#cobrandingLogo")
			eleCobrandImg: null,		// $("#cobrandingLogo img")
			eleFooter: null, 			// $("#footer")
			eleFooterTier1: null,		// $("#fTier1")
			eleFooterTier2: null, 		// $("#fTier2")
			eleFooterTier3: null,		// $("#fTier3")
			eleProsFtrT1: null,			// $("#fpNav")
			eleOverflowMenu: null, 		// $("#overflowMenu")
			eleOverflowDropdown: null, 	// $("#overflowDropdown")

			isHeaderFixed: false,			// Is header fixed?
			isFooterFixed: false, 			// Is footer fixed?
			hasFooter: true,				// Does footer have content?
			isProspect: false,				// Is Prospect?
			isPreview: false,				// Is Preview?
			isSample: false,				// Is Sample?
			isToc: false,					// Is Table of Contents?
			isLegacyLayout: false,			// Is legacy layout
			isSimple: false,				// Is simple layout (simple header no footer)
			documentHeight:	0,				// Document Height
			lastWinHeight: 0,				// Tracks last window height
			lastWinWidth: 0,				// Tracks last window width
			windowHeight: 0,				// Window Height
			windowWidth: 0,					// Window width
			bodyHeight: 0,					// Body Height
			windowScrollY:	0,				// Window Scroll-Y
			windowScrollX: 0,				// Window Scroll-X
			headerHeight: 0,				// Current height of visible header tiers
			headerBaseHeight: 0,			// Total height of all header tiers
			headerThreshhold: 0,			// Header threshhold
			headerVisiblePixels: 0,			// How much of the header is visible in pixels?
			headerBottomPosY: 0,			// Bottom pixel value of header
			headerLastTierVisible: null,	// Last visible header tier
			headerFixedHeight: 0,			// Total pixel height of header when "fixed"
			scrollPercentage: 0,			// Percentage of vertical scroll down the page
			contentHeight: 0,				// Content Height
			footerHeight: 0,				// Footer height
			footerThreshhold: 0,			// Footer threshhold
			footerVisiblePixels: 0,			// How much of the footer is visible in pixels?
			contentVisiblePixels: 0,		// Number of pixels visible in viewport,
											// between bottom of header and top of footer

			ghHeaderShadowTO: null,

			timeoutSetOverflows: undefined,	// Timeout hook for set overflows
			eventType: 0,
			
			EVENT_LOAD: 1,
			EVENT_SCROLL: 2,
			EVENT_RESIZE: 4,
			
			listUpdateFunc: [],				// Contains list of functions for updateDOM()
			
			init: function(){
				//addTiming("utd-layout: init() IN");
				$$.layout.setElements();
				if (!$$.layout.isSimple){
					// Calling updateDOM() here first, otherwise panel layout
					// can appear to "snap" during loading process.
					$$.layout.updateDOM();
					$$.layout.setEvents();
					
					// Once layout is setup, display the footer
					$$.layout.eleFooter.css({"visibility":"visible"});				
				}
				//addTiming("utd-layout: init() OUT");
			},

			// Method to setup shortcuts to commonly accessed DOM elements
			setElements: function(){
				//addTiming("utd-layout: setElements() IN");
				this.eleDocument = $(document);
				this.eleWindow = $(window);
				this.eleBody = $("body");
				this.eleHeader = $("header");
				this.eleHeaderTier4 = $("#hTier4");
				this.eleOuter = $("#main");
				this.eleLeftPanel = $("#left");
				this.eleRightPanel = $("#content");
				this.eleSidebar = $("#sidebar");
				this.eleFooter = $("footer");
				this.eleProsFtrT1 = $("#fpNav");
				
				this.isProspect = ($("body.prospect").length);
				this.isPreview = ($("body.preview").length);
				this.isSample = ($("body.sample2").length || $("body.profPros").length);
				this.isToc = ($("body.isToc").length);
				this.isLegacyLayout = ($("body.legacyLayout").length);
				this.isLegacyIe6 = $$.utility.isIE6();
				this.isLegacyIe7 = $$.utility.isIE7();
				this.isSimple = ($("body.shnf").length);

				this.eleCobrandLogo = $("#cobrandingLogo");
				this.eleCobrandImg = $("#cobrandingLogo img");
				this.hasFooter = ($.trim(this.eleFooter.html()).length);
				
				// Get current window width and height
				this.lastWinHeight = this.eleWindow.height();
				this.lastWinWidth = this.eleWindow.width();
				
				// Initialize base header height
				this.headerBaseHeight = this.eleHeader.height();
				
				if ((!$$.layout.isPreview) && (!$$.layout.isSample)) {
					this.eleHeaderTier1 = $("#hTier1");
					this.eleHeaderTier2 = $("#hTier2");
					this.eleHeaderTier3 = $("#hTier3");
					this.eleHeaderShadow = $("#headerShadow");
					this.eleFooterTier1 = $("#fTier1");
					this.eleFooterTier2 = $("#fTier2");
					this.eleFooterTier3 = $("#fTier3");
					this.eleOverflowMenu = $("#overflowMenu");
					this.eleOverflowDropdown = $("#overflowDropdown");

					this.headerLastTierVisible = (this.eleHeaderTier4.length ? this.eleHeaderTier4 : this.eleHeaderTier3);
					this.headerThreshhold = this.eleHeaderTier1.outerHeight() + this.eleHeaderTier2.outerHeight();
					this.headerFixedHeight = this.headerBaseHeight - this.headerThreshhold;
					
					// Initialize overflow menu
					if (!this.isLegacyIe6){
						this.setupNavOverflowMenu();
					}
				}
				
				if ($$.layout.isSample) {
					this.headerLastTierVisible = this.eleHeaderTier4;
				}
				
				//addTiming("utd-layout: setElements() OUT");
			},

			// Function which collects all browser visual dimensions needed for rendering
			getDims: function(){
				//addTiming("utd-layout: getDims() IN");
				this.isHeaderFixed = ($(".fxdHdr").length);
				this.isFooterFixed = ($(".fxdFtr").length);
				this.documentHeight = this.eleDocument.height();
				this.windowHeight = this.eleWindow.height();
				this.windowWidth = this.eleWindow.width();
				this.bodyHeight = this.eleBody.height();

				this.windowScrollY = this.eleWindow.scrollTop();
				this.windowScrollX = this.eleWindow.scrollLeft();
				
				// Recalculate vertical scroll percentage
				this.scrollPercentage = this.windowScrollY / this.documentHeight;
				
				this.headerHeight = this.eleHeader.outerHeight();
				this.headerBottomPosY = (this.isHeaderFixed ? this.headerLastTierVisible.outerHeight() : this.headerHeight);

				if (this.isSample) {
					this.headerVisiblePixels = this.headerHeight;
				} else {
					this.headerVisiblePixels = (this.isHeaderFixed ? this.headerBaseHeight - this.headerHeight : this.headerHeight - this.windowScrollY);					
				}
				if (this.headerVisiblePixels < 0){
					this.headerVisiblePixels = 0; // We only want to know what amount is visible
				}

				this.footerHeight = this.eleFooter.outerHeight();
				this.footerThreshhold = this.documentHeight - this.footerHeight;
				this.footerVisiblePixels = ((this.windowScrollY + this.windowHeight) - this.footerThreshhold);
				if (this.footerVisiblePixels < 0){
					this.footerVisiblePixels = 0; // We only want to know what amount is visible
				}
				
				this.contentVisiblePixels = this.windowHeight - this.headerVisiblePixels - this.footerVisiblePixels;
				//addTiming("utd-layout: getDims() OUT");
			},

			setEvents: function(){
				//addTiming("utd-layout: setEvents() IN");
				this.eleWindow.load(function(){
					//addTiming("utd-layout: eleWindow.load() IN");
					$$.layout.updateDOM();
					if (!$$.layout.isProspect) {
						$$.layout.timeoutOverflows();
					}
					//addTiming("utd-layout: eleWindow.load() OUT");
				});
				
				if (!$$.layout.isLegacyIe6) {
					this.eleWindow.scroll(function(){
						//addTiming("utd-layout: eleWindow.scroll() IN");
						$$.layout.eventType = $$.layout.EVENT_SCROLL;
						$$.layout.updateDOM();
						$$.layout.eventType = 0;
						//addTiming("utd-layout: eleWindow.scroll() IN");
					});
				}

				this.eleWindow.resize(function(){
					//addTiming("utd-layout: eleWindow.resize() IN");
					// Confirm window was actually resized (legacy browser hack)
					if ($$.layout.eleWindow.width() != $$.layout.lastWinWidth ||
					    $$.layout.eleWindow.height() != $$.layout.lastWinHeight){
						// Store new window dimensions
						$$.layout.lastWinHeight = $$.layout.eleWindow.height();
						$$.layout.lastWinWidth = $$.layout.eleWindow.width();
						
						$$.layout.updateDOM();
						if (!$$.layout.isProspect) {
							$$.layout.timeoutOverflows();
						}
					}
					//addTiming("utd-layout: eleWindow.resize() OUT");
				});
				//addTiming("utd-layout: setEvents() OUT");
			},
			
			// Function to register a function to be executed
			// at the end of the "updateDOM" function
			registerUpdate: function( fUpd ) {
				if (typeof(fUpd)=="function") {
					this.listUpdateFunc.push(fUpd);
				}
			},
			
			// Function which determines if header should be fixed based on how much the page is vertically scrolled
			checkHeaderFixed: function( bUpdDim ){
				//addTiming("utd-layout: checkHeaderFixed() IN");
				if (this.windowScrollY >= this.headerThreshhold){
					this.eleBody.addClass("fxdHdr");
					// We need to set top padding of right panel when header is fixed
					this.eleRightPanel.css({'padding-top':this.headerFixedHeight-1+'px'});
					// Display header shadow
					if (!$$.layout.isLegacyIe6 && $$.layout.eleHeaderShadow && $$.layout.eleHeader.is(":visible")){
						clearTimeout($$.layout.ghHeaderShadowTO);
						$$.layout.ghHeaderShadowTO = setTimeout(function(){
							$$.layout.eleHeaderShadow.stop().css({'top':$$.layout.headerVisiblePixels+'px'}).animate({opacity:1}, 200);						
						},300);
					}
					bUpdDim = true;
				} else {
					this.eleBody.removeClass("fxdHdr");
					//$$.debug(" ==> checkHeaderFixed removeClass fxdHdr");
					// Remove extra top padding of right panel when header is no longer fixed
					this.eleRightPanel.css({'padding-top':'0px'});
					// Hide header shadow
					if (!$$.layout.isLegacyIe6){
						clearTimeout($$.layout.ghHeaderShadowTO); 
						this.eleHeaderShadow.stop().css({opacity:0});
					}
					bUpdDim = true;
				}
				//addTiming("utd-layout: checkHeaderFixed() OUT");
				return bUpdDim;
			},

			// Function which determines if footer should be positioned absolutely to the bottom 
			// of the browser, or positioned static against the bottom of the content. Based
			// upon whether there is enough content to fill the available browser window.
			checkFooterAbsolute: function( bUpdDim ){
				//addTiming("utd-layout: checkFooterAbsolute() IN");
				if (this.hasFooter){
					var ftrT1Hgt = (this.eleFooterTier1 ? this.eleFooterTier1.height() : (this.eleProsFtrT1.length ? this.eleProsFtrT1.height() : 0));
					var bFxdFtr = (this.windowHeight - (this.bodyHeight + (this.isProspect && !$$.layout.isLegacyLayout ? this.headerHeight : 0)) >= (this.isProspect ? this.footerHeight : ftrT1Hgt));					

					if (bFxdFtr){
						this.eleBody.addClass("fxdFtr");
						$$.layout.eleFooter.css({"bottom":""});
	
						var ftrBtm = $$.layout.eleFooter.css("bottom");
						
						// Push footer down for professional views where 
						// content does not fill vertical viewport...
						if ((ftrBtm === "auto") || (parseInt($$.layout.eleFooter.css("bottom")) == 0) && !$$.layout.isProspect && $$.layout.eleFooterTier1) {
							$$.layout.eleFooter.css("bottom",$$.layout.eleFooterTier1.outerHeight() - $$.layout.footerHeight + 1 + 'px');
						}
	
						bUpdDim = true;
					} else {
						this.eleBody.removeClass("fxdFtr");
						$$.layout.eleFooter.css("bottom",'auto');
						bUpdDim = true;
					}
				}
				//addTiming("utd-layout: checkFooterAbsolute() OUT");
				return bUpdDim;
			},

			// Function which sets the top and bottom position of the left panel
			setLeftPanel: function(){
				//addTiming("utd-layout: setLeftPanel() IN");
				if ((this.eleLeftPanel.length) && (this.eleLeftPanel.is(":visible")) && (!$$.layout.isProspect || $$.layout.isSample || $$.layout.isToc)) {
					this.eleLeftPanel.css({
						"top":($$.layout.isToc ? 0 : $$.layout.headerBottomPosY)+'px',
						"height":($$.layout.isLegacyIe6 ? $$.layout.footerThreshhold - $$.layout.headerBottomPosY : $$.layout.contentVisiblePixels+'px')
					});
				}
				//addTiming("utd-layout: setLeftPanel() OUT");
			},

			// Primary function to handle updating DOM element positions
			updateDOM: function(){
				//addTiming("utd-layout: updateDOM() IN");
				var bUpdDim = false;

				// Refresh current property values
				$$.layout.getDims();

				if (!$$.layout.isSample) {
					// Determine if bottom of header should be fixed
					if (!$$.layout.isLegacyIe6 && !$$.layout.isProspect) {
						bUpdDim = $$.layout.checkHeaderFixed(bUpdDim);
					}

					// Determine if footer should be absolute or static
					// Do not bother if current event is just scrolling...
					if ($$.layout.eventType != $$.layout.EVENT_SCROLL) {
						bUpdDim = $$.layout.checkFooterAbsolute(bUpdDim);
					}
	
					// Recalc dimensions if needed
					//$$.debug("->layout.updateDOM() bUpdDim=["+bUpdDim+"]",$$.DEBUG_LEVEL_FULL);
					if (bUpdDim){
						$$.layout.getDims();
					}
				}
				
				// Update header & footer to keep it flush left when scrolling horizontally
				if (($$.layout.hasFooter) && (!$$.layout.isProspect)){
					if ($$.layout.windowScrollX > 0) {
						$$.layout.eleHeader.css({
							position: "relative",
							left: $$.layout.windowScrollX + "px"
						});
						$$.layout.eleFooter.css({
							left: $$.layout.windowScrollX + "px",
							right: "-" + $$.layout.windowScrollX + "px"
						});
					} else if ($$.layout.windowScrollX === 0 && $$.layout.eleHeader.css("left") !== "0px") {
						$$.layout.eleHeader.css({
							position: "static",
							left: "0px"
						});
						$$.layout.eleFooter.css({
							left: "0px",
							right: "0px"
						});
					}
				}

				// Update left navigation panel top and bottom positions
				$$.layout.setLeftPanel();
				if (!$$.layout.isSample && !$$.layout.isProspect && !$$.layout.isLegacyIe6) {
					// Check header 3rd tier menu overflows
					$$.layout.setOverflows();
				}
				
				// Execute list of any registered updateDOM methods
				//$$.debug("->layout.updateDOM()->listUpdateFunc.length=["+this.listUpdateFunc.length+"]",$$.DEBUG_LEVEL_FULL);
				if ((this.listUpdateFunc) && (this.listUpdateFunc.length)) {
					for (var fIdx = 0; fIdx < this.listUpdateFunc.length; fIdx++){
						//$$.debug("-->layout.updateDOM() ==>listUpdateFunc["+fIdx+"]()",$$.DEBUG_LEVEL_EVENTS);
						(this.listUpdateFunc[fIdx])();
					}
				}
				//addTiming("utd-layout: updateDOM() OUT");
			},

			// Function used to call setOverflows after 1 second
			timeoutOverflows: function(){
				// Set timeout to recheck menu overflows 1 second after window resized
				// This is done because position().top on the 3rd tier menu navigation
				// does not correctly get calculated initially in certain cases.
				if (typeof $$.layout.timeoutSetOverflows == "undefined"){
					$$.layout.timeoutSetOverflows = setTimeout( $$.layout.setOverflows, 1000 );
				}
			},

			// Function which moves 3rd tier header entries into overflow menu as determined by browser width 
			// ORIGINAL NAME: findOverflows()
			setOverflows: function(){
				//addTiming("utd-layout: setOverflows() IN");
				$("#hTier3 nav ul li:not('#overflowMenu')").each(function(){
					if ($(this).position().top > 20) {
						$(this).addClass("overflowed");
					} else {
						$(this).removeClass("overflowed");
					}
				});
				if ($(".overflowed").length) {
					$$.layout.eleOverflowMenu.addClass("overflowOn");
				} else {
					$$.layout.eleOverflowMenu.removeClass("overflowOn");
				}
				$(".firstnav").removeClass("firstnav");
				$("#hTier3 nav ul li:not('.overflowed'):last").addClass("firstnav");
				$("#hTier3 nav ul #overflowMenu").next().find("a").css("padding-right","0px");
				$$.layout.timeoutSetOverflows = undefined;
				//addTiming("utd-layout: setOverflows() OUT");
			},

			// Function which sets up the 3rd tier header navigation overflow menu container, and handler to activate
			setupNavOverflowMenu: function(){
				$$.layout.eleOverflowMenu.click(function(){
					if ($$.layout.eleOverflowDropdown.is(":visible")) {
						$$.layout.eleOverflowDropdown.fadeOut('slow');
					} else {
						$("#overflowDropdown ul").empty();
						$(".overflowed").clone().removeClass("overflowed").appendTo("#overflowDropdown ul");
						$$.layout.eleOverflowDropdown.css({"top":$$.layout.eleHeaderTier3.position().top + $$.layout.eleHeaderTier3.height() - $$.layout.eleWindow.scrollTop() - 4+"px"});
						$$.layout.eleOverflowDropdown.fadeIn('fast');
					}	
				});
			}
		} // End layout{}
	});

	// Create shortcut
	$.utdLayout = $.utd.layout;

	// Register the init method
	//$$.debug("REG layout.init()",$$.DEBUG_LEVEL_FULL);
	$$.registerInit( $.utdLayout.init, "$.utd.layout" );

})( jQuery );
