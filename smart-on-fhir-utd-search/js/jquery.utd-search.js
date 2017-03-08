// jQuery UTD Plugin Search extension
// UI methods used by the Search control
// --------------------------------------------
// DEPENDENCIES:
// jquery.utd-core.js
// jquery.utd-utilitiy.js
// jquery.utd-layout.js
// jquery.utd-localization.js
// --------------------------------------------
// 03.01.14: Migrated from main jQuery utd file
(function($){

	// Extend the UTD object to include the Search object
	// --------------------------------------------------
	// Functionality handled by this object
	// > Setup of custom "Search Type" drop down control
	// > Setup of auto complete for search box
	// > Handle events for:
	//		- displaying custom "Search Type" drop down when clicked
	// 		- sending auto complete requests
	//		- resizing width of search box elements when browser resized
	// 		- submitting search when:
	//			> search button pressed
	//			> enter key hit when search box has focus and is not empty
	//			> auto complete entry is selected
	$.extend($.utd, {

		search: {
			eleFrm: null,	// $("form[name=SearchForm]")
			eleNew: null,	// $("#new_search")
			eleSrc: null,	// $("#txtSearch") 
			eleCms: null,	// $("#cmsTxtBox")
			eleCSB: null,	// $("#cmsSearchBox")
			eleBtn: null,	// $("#submitBtn")
			eleClr: null,	// $("#searchBox #clearBtn")
			eleSPI: null,	// $("#spinput")

			eleHST: null,	// $("#searchType")
			eleSml: null,	// $("#smallSearchBox")
			eleDDL: null,	// $("#smallSearchBox #dropDwnLink")
			eleDDC: null,	// $("#searchbox_dd")
			eleTyp: null,	// $("#searchbox_dd_type")
			eleNme: null,	// $("#searchbox_dd_type_name")
			eleSub: null,	// $("#searchbox_dd_submit")
			eleSDD: null,	// $("#searchbox_dd_dropdown")
			eleSLI: null,	// $("#searchbox_dd_dropdown li")
			eleTrm: null,	// $("#searchbox_dd_searchterm")
			eleACL: null,	// $("#autoCompleteList")
			footerLogo: null, //$("#footerLogo");

			searchMessage: "Please wait",
			searchBoxName:'main_search',
			acSearchDone: false,
			acLength: 1,

			init: function(){
				//addTiming("utd-search: init() IN");
				$$.search.setElements();
				$$.search.eleSrc.focus();
				
				if ($$.search.eleSrc.length) {
					$$.search.initSearchBox();
					$$.search.initAutoComplete();
					$$.search.initModernizr();
					$$.search.setEvents();
					$$.search.handleBrowserQuirks();
				}
				//addTiming("utd-search: init() OUT");
			},

			setElements: function(){
				this.eleSrc = $("#txtSearch");
				this.eleCms = $("#cmsTxtBox");
				this.eleCSB = $("#cmsSearchBox");
				this.eleBtn = $("#submitBtn");
				this.eleClr = $("#searchBox #clearBtn");
				this.eleSPI = $("#spinput");
				this.eleHST = $("#searchType");
				this.eleFrm = $("form[name=SearchForm]");
				this.eleNew = $("#new_search");
				this.eleSml = $("#smallSearchBox");
				this.eleDDL = $("#smallSearchBox #dropDwnLink");
				
				this.eleDDC = $("#searchbox_dd");
				this.eleTyp = $("#searchbox_dd_type");
				this.eleNme = $("#searchbox_dd_type_name");
				this.eleSub = $("#searchbox_dd_submit");
				this.eleSDD = $("#searchbox_dd_dropdown");
				this.eleSLI = $("#searchbox_dd_dropdown li");
				this.eleTrm = $("#searchbox_dd_searchterm");
				this.footerLogo = $("#footerLogo");
				
				this.eleACL = $("#autoCompleteList");
			},

			// Function to initialize search box elements
			initSearchBox: function(){
				// Move search type drop down content to just inside of the body
				$$.layout.eleBody.append($$.search.eleSDD);

				// Ensure submit button is enabled on load
				if ($$.search.eleBtn.length){
					$$.search.eleBtn.prop('disabled', false);
				}

				// Some css tweaks...
				if ($$.search.eleSml.anyMatches()){	
					$$.search.eleClr.css("visibility", "hidden");					
				} else {
					if ($('#home_searchBox').anyMatches()){
						$$.search.eleClr.css("visibility", "hidden");	
					} else {
						$$.search.eleBtn.val("Go");
					}
				}

				// Initialize width of search type selector
				$$.search.setSearchTypeWidth();

				// Initialize width of search box
				$$.search.setSearchBoxWidth();
			},

			// Function to initialize auto complete elements
			initAutoComplete: function(){
				// If in prospect view, change search box and containers
				if ($$.search.eleCms.length){
					$$.search.eleSrc = $$.search.eleCms;
					$$.search.eleDDC = $$.search.eleCSB;
					$$.search.searchBoxName = "cms_search";
				} // else searchBoxName defaults to "main_search"								

				var acLengths = $.parseJSON($$.settings.autoCompleteLength);
				$$.search.acLength = acLengths.latinLength; //latin language length

				if ($$.localization.latinLang.indexOf($$.localization.locale) === -1){
					$$.search.acLength = acLengths.nonLatinLength;
				}

				// Initialize auto complete location
				var searchBoxOffset = $$.search.eleDDC.offset();

				$$.search.setAutoCompletePos($$.search.eleDDC, 
											 $$.search.getAutoCompleteTop(), 
											 searchBoxOffset.left - $$.layout.eleWindow.scrollLeft(), 
											 $$.search.eleDDC.width());
			},
			
			initModernizr: function(){
				if (typeof Modernizr != "undefined"){
					if(!Modernizr.input.placeholder){
						$('[placeholder]').focus(function() {
						  var input = $(this);
						  if (input.val() == input.attr('placeholder')) {
							input.val('');
							input.removeClass('placeholder');
						  }
						}).blur(function() {
						  var input = $(this);
						  if (input.val() == '' || input.val() == input.attr('placeholder')) {
							input.addClass('placeholder');
							input.val(input.attr('placeholder'));
						  }
						}).blur();
						$('[placeholder]').parents('form').submit(function() {
						  $(this).find('[placeholder]').each(function() {
							var input = $(this);					
							//Make sure that we never submit the placeholder text
							var value = input.val();
							value = value.replace(input.attr('placeholder'), '');
							input.val(value);
						  })
						});
					}
				}
			},

			// Method to setup event bindings for search control
			setEvents: function(){
				// Setup form submission events
				$$.search.eleFrm.bind('submit', $$.search.onSubmitSearch);
				$$.search.eleSub.bind('click', function(){
					$$.search.eleFrm.submit();
				});

				if (!$$.search.eleSml.anyMatches()){	
					$$.search.eleSrc.bind('keyup',function(event){
						if (event.keyCode !== 13) {							
							$$.search.showHelpBox();
						}
					});
					$('#clearBtn').bind('click', function(){
						txtSearch.val(" ").focus();
					});
				}

				$$.search.setSearchTypeEvents();
				$$.search.setSearchAutoCompleteEvents();

				// Wire up window resize and scroll events to respective handlers
				$$.layout.eleWindow.bind('resize', $$.search.onWindowResize);
				$$.layout.eleWindow.bind('scroll', $$.search.onWindowScroll);

				// Make sure search button does not show spinner
				$$.layout.eleWindow.bind('unload', function(){
                    
                    $$.search.eleNew.removeClass("searching");
				});
			},
			
			setSearchTypeEvents: function(){
				// Wire up display of search type drop down
				$$.search.eleTyp.bind('click', function(event){
					$$.search.onShowSearchTypeDropdown($(this));
					event.stopPropagation();
				});

				// Wire up user clicking on search type entry from drop down
				$$.search.eleSLI.bind('click', function(){
					$$.search.onSearchTypeClick($(this));
				});

				// Prevent event bubbling when search type drop down clicked
				$$.search.eleSDD.click(function(e){ e.stopPropagation(); });

				// If main body area is clicked, close the search type dropdown
				$$.layout.eleBody.bind('click', $$.search.onHideSearchTypeDropdown);				
			},
			
			setSearchAutoCompleteEvents: function(){
				// Wire up auto complete keyup & keydown handlers
				$$.search.eleSrc.bind('keyup', function(e){ $$.search.onSearchBoxKeyUp(e, this); });
				$$.search.eleSrc.bind('keydown', function(e){ $$.search.onSearchBoxKeyDown(e, this); });

				// Wire up remaining auto complete related handlers
				$$.search.eleACL.bind('mouseenter', function(){ $("#autoCompleteList li.active").removeClass("active"); });
				try {
					$(".autoCompleteOpen").live('click', function() { $$.search.hideAutoComplete(); });
				
					$("#autoCompleteList li").live('click', function() {
						$$.search.eleSrc.val($(this).children("span").text());
						$$.search.onAutoCompleteSubmitSearch($(this).children("a").length);
					});
					$("#autoCompleteList li a").live('click', function(event) {
						event.stopPropagation();
						$$.utility.sendSimpleEvent('/services/HistoryEntryRemove',{entry: $(this).parent().children("span").text()});
						$(this).parent().remove();
					});
				} catch (err) {}
			},

			// Function to contain all browser specific setup/hacks
			handleBrowserQuirks: function(){
				if ($$.utility.isIE8()){
					if ($$.search.eleDDL.anyMatches()){
						$$.search.eleDDL.css("margin-top","2px");
					}
					$$.search.eleDDL.append("&nbsp;&nbsp;&nbsp;");
					$$.layout.eleFooterTier3.addClass("ie8Legacy");
				}
				 
				// ie7 and ie8 do not support css3 background-size style so use a reduced version of the logo
				if ($$.utility.isIE7() || $$.utility.isIE8()){//background-size: 147px;		
					$$.search.footerLogo.addClass("ieSmallerFooterImg");
				}

				// Adjust top search bar left position as needed
				if ($$.layout.eleCobrandImg.length) {
					$$.layout.eleCobrandImg.bind('load', $$.search.setTopSearchBarLeft);	// Chrome
					$$.layout.eleCobrandImg.bind('ready', $$.search.setTopSearchBarLeft);	// IE's
				}

				// Firefox doesn't fire the keyup event when using a IME language processor
				if ($$.localization.currentLanguage == 'ja' && $.browser.mozilla){
					var val = $$.search.eleSrc.val();
					// Call this every 100ms to see if we should execute autocomplete
					self.setInterval(function(){
						val = $$.search.checkForCharacter($$.search.eleSrc, val);
					}, 100);
				}

				// IE10 is stupid and doesn't clean up box-shadows correctly, so removing them
				if ($$.utility.isIE10()){
					$$.search.eleACL.addClass("noBoxShadow");
				}
			},

			// Function to test length of current input against passed input
			checkForCharacter: function(txtSearch, search){
				var val = txtSearch.val();				
				if (val.length && val !== search){
					txtSearch.trigger('keyup');
				}
				return val;
			},

			// Adjusts left position of top search bar element 
			// Used when coBrandingLogo images exists for certain browsers
			setTopSearchBarLeft: function(){
				if ($("#cobrandingLogo").anyMatches()){
					var left = $("#cobrandingLogo img").offset().left + $("#cobrandingLogo img").width() + 10;
					$("#topSearchBar").css("left", left + "px");
				}
			},

			// Adjust width of search textbox to fit available container
			// ORIGINAL NAME: resizeSearchboxWidth
			setSearchBoxWidth: function(){
				var sbDDWdt = $$.search.eleDDC.outerWidth();
				var sbTypWdt = $$.search.eleTyp.outerWidth() + 11;
				var sbSubWdt = 35;	// 27+8
				
				var tiWdt = 252;
				var tiMod = 8;
					
				if ($("#topSearchBar #new_search").length){
					// Search box in header
					tiWdt = $(window).width()-650;
					if (tiWdt > 400){
						tiWdt = 400;
					} else if (tiWdt < 175){
						tiWdt = 175;
					}
					tiWdt -= sbTypWdt - sbSubWdt;
				} else {
					tiWdt = sbDDWdt + tiMod - sbTypWdt - sbSubWdt;
				}

				$$.search.eleSrc.css({"width":tiWdt+"px"});
				$$.search.eleDDC.css({"width":tiWdt+sbTypWdt+sbSubWdt-tiMod+'px'});
			},

			// Adjust width of container around search type control
			// ORIGINAL NAME: setSearchboxType
			setSearchTypeWidth: function(){
				$$.search.eleTrm.removeAttr("style");
				$$.search.eleNme.text($("#searchbox_dd_dropdown li.active").text());
				if ($$.search.eleNme.text() === ""){
					$$.search.eleNme.text($("#searchbox_dd_dropdown li:first").text());
				}
				var totalWidth = $$.search.eleDDC.width();
				var items = $$.search.eleSub.width() + $$.search.eleTyp.width();
				var padding = 40;
				var inputWidth = totalWidth - items - padding;
				$$.search.eleTrm.width(inputWidth);
			},

			// Returns true if search form should submit, false otherwise
			initSubmitSearch: function(){
				var txtSrc = $$.search.eleSrc;
				if (!txtSrc.length){
					txtSrc = $$.search.eleCms;
				}
				if(txtSrc.val() === ''){
					return false;
				}

				$$.search.eleACL.hide();
				$$.search.eleNew.addClass("searching");
				var id = $("#searchbox_dd_dropdown li.active").attr("id");
				$$.search.eleHST.val("PLAIN_TEXT");
				switch(id){
					case 'searchoption_topic_all':
						$$.search.eleSPI.val("0");
						break;
					case 'searchoption_topic_adult':
						$$.search.eleSPI.val("1");
						break;
					case 'searchoption_topic_pediatric':
						$$.search.eleSPI.val("2");
						break;
					case 'searchoption_topic_patient':
						$$.search.eleSPI.val("3");
						break;
					case 'searchoption_graphics':
						$$.search.eleSPI.val("0");
						$$.search.eleHST.val("GRAPHICS");
						break;
				}

				if($$.search.eleBtn.length){
					$$.search.eleBtn.val($$.search.searchMessage).prop("disabled", true);
				}
				return true;
			},

			// Method to handle submitting of search form
			// ORIGINAL NAME: submitSearch
			onSubmitSearch: function(){
				var activeAC = $("#autoCompleteList li.active");
				if (activeAC.anyMatches() && 
					(activeAC.text() === $$.search.eleSrc.val() || 
					 activeAC.text() === $$.search.eleCms.val())){
					$$.search.eleFrm.append('<input name="autoComplete" type="hidden" value="true" />');
				}
				return $$.search.initSubmitSearch();
			},

			// Method which handles submitting form from auto complete
			// ORIGINAL NAME: autoCompleteSubmitSearch
			onAutoCompleteSubmitSearch: function(history){
				$$.search.initSubmitSearch();
				if (history){
					$("input#source").val("HISTORY");
				} else {
					$$.search.eleFrm.append('<input name="autoComplete" type="hidden"value="true" />');
				}
				$$.search.eleFrm.submit();
				return false;
			},			

			// Method to display custom search type dropdown control
			onShowSearchTypeDropdown: function(oThis){
				if ($$.search.eleNme.hasClass("open")){
					$$.search.onHideSearchTypeDropdown();
				} else {
					var position = oThis.offset();
					var top = position.top - $$.layout.eleWindow.scrollTop() + oThis.height();
					if ($("#topSearchBar #searchbox_dd").anyMatches()){
						top = $("#topSearchBar").offset().top - $$.layout.eleWindow.scrollTop() + oThis.height() + 1;
					} else if($('#searchpanel #new_search').anyMatches()){
						top = $$.search.eleDDC.position().top + $('#searchpanel').height() - 5;
						if($('#dec-layout').anyMatches()){
							if($.browser.msie){
								top -= 5;
							}else{
								top += 3;
							}
						}else if($$.utility.isIE6() || $$.utility.isIE7()){
							top += 3;								
						}
					}
					var left = position.left - $$.layout.eleWindow.scrollLeft();
					$$.search.eleNme.addClass("open");
					$$.search.eleSDD.css({"left":left+"px","top":top+"px"}).addClass("dropdown");
				}
			},

			// Method to hide custom search type dropdown control
			onHideSearchTypeDropdown: function(){
				$$.search.eleNme.removeClass("open");
				$(".dropdown").removeClass("dropdown");
			},

			// Function to handle when user clicks on specific search type entry
			onSearchTypeClick: function(oThis){
				$$.search.eleSLI.removeClass("active");
				oThis.addClass("active");
				$$.search.setSearchTypeWidth();
				$$.search.eleNme.removeClass("open");
				$(".dropdown").removeClass("dropdown");
				var id = oThis.attr("id");
				var facetValue;
				switch (id) {
					case 'searchoption_topic_all':
						facetValue = "ALL_TOPICS";
						break;
					case 'searchoption_topic_adult':
						facetValue = "ADULT";
						break;
					case 'searchoption_topic_pediatric':
						facetValue = "PEDIATRIC";
						break;
					case 'searchoption_topic_patient':
						facetValue = "PATIENT";
						break;
					case 'searchoption_graphics':
						facetValue = "GRAPHICS";
						break;
				}
				$$.search.setSearchBoxWidth(); // <-- DE1616
				$$.utility.sendSimpleEvent('/services/EventLog', {
					eventType: "SearchFacetChange",
					facetValue: facetValue,
					facetPosition: $("#searchControl").val()
				});
			},

			// Function to display help box on main search page
			showHelpBox: function() {
				var objHelp = $('#divSearchHelp');
				if (objHelp.anyMatches()) {
					objHelp.css("visibility","visible");
				}
			},

			// Sets the position of the auto complete list
			// ORIGINAL NAME: setACPosition
			setAutoCompletePos: function(searchBox, top, left, width, sClsNme){
				if(searchBox.selector !== "#cmsSearchBox"){
					// DE3564 - (Smart Search only) add offset to adjust size of autoCompleteList due to new padding on li
					var aclOffset = 0;
					$$.search.eleACL.css({"top":top,"left":left, "width":width-aclOffset});
					if ((typeof sClsNme != "undefined") && (!$$.search.eleACL.hasClass(sClsNme)))
						$$.search.eleACL.addClass(sClsNme);
				}
			},
			
			// Returns the top position of where the auto complete list should appear
			// ORIGINAL NAME: getACTopPosition
			getAutoCompleteTop: function(){
				var searchBox = $$.search.eleDDC;
				if (searchBox.length) {
					if(!$$.search.eleDDC.length){
						searchBox = $$.search.eleCSB;
					}
					var acTop = searchBox.offset().top + searchBox.height() - $$.layout.eleDocument.scrollTop() + 1;
					if ($$.utility.isIE6()){
						acTop += 3;
					}
					return acTop;
				}
				return 0;
			},

			// Function to return label for active auto complete entry
			// ORIGINAL NAME: fGetACEntryLabel
			getAutoCompleteEntryLabel: function(){
				if ($("#autoCompleteList li.active span").hasClass("acHistory")){
					return $("#autoCompleteList li.active span.acHistory").text();
				} else {
					return $("#autoCompleteList li.active").text();
				}
			},

			// Function to update location and dimensions of auto complete list
			// ORIGINAL NAME: fRepositionSearchAC
			repositionAutoComplete: function(){
				var searchBoxPosition = $$.search.eleDDC.offset();
				if(searchBoxPosition){
					$$.search.setAutoCompletePos($$.search.eleDDC, 
												 $$.search.getAutoCompleteTop(), 
												 searchBoxPosition.left - $$.layout.eleWindow.scrollLeft(), 
												 $$.search.eleDDC.width());
				}
				$$.search.setSearchBoxWidth();
			},

			// Function to hide auto complete list
			// ORIGINAL NAME: hideSearchAC
			hideAutoComplete: function(){
				$$.layout.eleBody.removeClass("autoCompleteOpen");
				$$.search.eleACL.hide();
				$("#autoCompleteList li").remove();
			},

			// Function which executes auto complete call and handles result
			runAutoComplete: function(term){
				$.getJSON($$.settings.onReadyUrl,{prefix : term},
					function(data) {
						if (data === null){
							return false; // break if response fails or is invalid
						}
						
						if ((data.historyList && data.historyList !== "") || 
							(data.termList && data.termList !== "")){
							$("#autoCompleteList li").remove();
							$("#autoCompleteList li").hover(
									function () { $(this).addClass("active"); }, 
									function () { $(this).removeClass("active"); }
							);
							$("*").scroll(function(){ $$.search.hideAutoComplete(); });
							
							var results = data.historyList;
							if ($(data.historyList).length) {
								$$.layout.eleBody.addClass("autoCompleteOpen");
								$.each(results, function(i, result) {
									var resultHighlighted = result.term.replace(term,"<span class='ac_highlight'>" + term + "</span>");
									var matchTerm = result.term.replace("'","&apos;");
									$$.search.eleACL.append("<li term='"+ matchTerm + "'><span class=\"acHistory\">" + resultHighlighted 
											+ "</span> <a href=\"#\">"
											+ $$.settings.removeTxt 
											+ "</a></li>");
								});
								
							}
							results = data.termList;
							if ($(data.termList).length) {
								$$.layout.eleBody.addClass("autoCompleteOpen");
								
								$.each(results, function(i, result) {
									var resultHighlighted = result.term.replace(term,"<span class='ac_highlight'>" + term + "</span>");
									var matchTerm = result.term.replace("'","&apos;");
									if ($("#autoCompleteList li[term='" + matchTerm + "']").length == 0) {
										$$.search.eleACL.append("<li term='"+ matchTerm +"'><span>" + resultHighlighted + "</span></li>");
									}
								});
							}
							if ($("#autoCompleteList li").length){
								$$.search.eleACL.show();
							} else {
								$$.search.eleACL.hide();
							}
						} else {
							$$.search.hideAutoComplete();
						}
						return true;
					});
			},

			onSearchBoxKeyUp: function(oEvt, oThis){
				if (oEvt.keyCode !== 13 && oEvt.keyCode !== 35 && oEvt.keyCode !== 36 && oEvt.keyCode !== 37 && oEvt.keyCode !== 38 && oEvt.keyCode !== 39 && oEvt.keyCode !== 40) {
					if (window.ac_timeout) {
		                clearTimeout(ac_timeout);
					}

					var searchBox = $$.search.eleDDC;
					var sACClass = "autoRgt";
					if(!searchBox.length){
						searchBox = $$.search.eleCSB;
						sACClass = undefined;
					}
					searchBoxPosition = searchBox.offset();
					$$.search.setAutoCompletePos(searchBox, 
												 $$.search.getAutoCompleteTop(), 
												 searchBoxPosition.left - $$.layout.eleWindow.scrollLeft(), 
												 $$.search.eleDDC.width(), 
												 sACClass);
					
					if (oThis.value.length >= $$.search.acLength) {	
						var $this = oThis;
						ac_timeout = setTimeout(function() {
							ac_timeout = undefined;
							$$.search.runAutoComplete($this.value);
						}, 150); // Keypress Timeout
						
						// Check if autocomplete event can be logged
						if (searchBox.length >= 1 && !$$.search.acSearchDone) {
							$$.utility.sendSimpleEvent('/services/EventLog', {
								eventType: 'AutoCompleteBegin',
								referringSearchBox: $$.search.searchBoxName
							});
							$$.search.acSearchDone = true;
						}	
					} else {
						$$.search.hideAutoComplete();
					}
				}
			},

			onSearchBoxKeyDown: function(oEvt, oThis){
			  	var autoCompleteListActive = $("#autoCompleteList li.active");
			  	var acIndex = autoCompleteListActive.index();
				if (oEvt.keyCode === 40) { // down arrow
					if (acIndex > -1){
						if (acIndex >= ($("#autoCompleteList li").length - 1)){
							autoCompleteListActive.removeClass("active");
							$("#autoCompleteList li:first").addClass("active");
						} else {
							autoCompleteListActive.removeClass("active").next().addClass("active");								
						}
					} else {
						$("#autoCompleteList li:first").addClass("active");
					}
					oThis.value = $$.search.getAutoCompleteEntryLabel();
				} else if (oEvt.keyCode === 38) { // up arrow
					if (acIndex > -1){
						if (acIndex > 0) {
							autoCompleteListActive.removeClass("active").prev().addClass("active");
						} else {
							autoCompleteListActive.removeClass("active");
							$("#autoCompleteList li:last").addClass("active");
						}
					} else {
						$("#autoCompleteList li:last").addClass("active");
					}
					oThis.value = $$.search.getAutoCompleteEntryLabel();
				}
			},

			// Method to handle window scroll events for search control
			onWindowScroll: function(){
				if (!$$.utility.isIE6()){
					$$.search.onHideSearchTypeDropdown();
				}

				// Reposition auto complete
				$$.search.repositionAutoComplete();
			},

			// Method to handle window resize events for search control
			onWindowResize: function(){
				if (!$$.utility.isIE6()){
					$$.search.onHideSearchTypeDropdown();
				}

				// Reposition auto complete
				$$.search.repositionAutoComplete();
				setTimeout(function(){//DE3229
					$$.search.repositionAutoComplete();
				},100);
			}
		}
	});

	// Create shortcut
	$.utdSearch = $.utd.search;

	// Register the init method
	$$.debug("REG search.init()",$$.DEBUG_LEVEL_FULL);
	$$.registerInit( $.utdSearch.init );

})( jQuery );
