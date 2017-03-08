/* Want to work for us? Drop a typo-free email to jobs at webklipper dot com */
var webengage = {};
var _weq = _weq || {};
(function (webengage) {
	var LZString={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",_f:String.fromCharCode,compressToBase64:function(c){if(c==null){return""}var a="";var k,h,f,j,g,e,d;var b=0;c=LZString.compress(c);while(b<c.length*2){if(b%2==0){k=c.charCodeAt(b/2)>>8;h=c.charCodeAt(b/2)&255;if(b/2+1<c.length){f=c.charCodeAt(b/2+1)>>8}else{f=NaN}}else{k=c.charCodeAt((b-1)/2)&255;if((b+1)/2<c.length){h=c.charCodeAt((b+1)/2)>>8;f=c.charCodeAt((b+1)/2)&255}else{h=f=NaN}}b+=3;j=k>>2;g=((k&3)<<4)|(h>>4);e=((h&15)<<2)|(f>>6);d=f&63;if(isNaN(h)){e=d=64}else{if(isNaN(f)){d=64}}a=a+LZString._keyStr.charAt(j)+LZString._keyStr.charAt(g)+LZString._keyStr.charAt(e)+LZString._keyStr.charAt(d)}return a},decompressFromBase64:function(g){if(g==null){return""}var a="",d=0,e,o,m,k,n,l,j,h,b=0,c=LZString._f;g=g.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(b<g.length){n=LZString._keyStr.indexOf(g.charAt(b++));l=LZString._keyStr.indexOf(g.charAt(b++));j=LZString._keyStr.indexOf(g.charAt(b++));h=LZString._keyStr.indexOf(g.charAt(b++));o=(n<<2)|(l>>4);m=((l&15)<<4)|(j>>2);k=((j&3)<<6)|h;if(d%2==0){e=o<<8;if(j!=64){a+=c(e|m)}if(h!=64){e=k<<8}}else{a=a+c(e|o);if(j!=64){e=m<<8}if(h!=64){a+=c(e|k)}}d+=3}return LZString.decompress(a)},compress:function(e){if(e==null){return""}var h,l,n={},m={},o="",c="",r="",d=2,g=3,b=2,q="",a=0,j=0,p,k=LZString._f;for(p=0;p<e.length;p+=1){o=e.charAt(p);if(!Object.prototype.hasOwnProperty.call(n,o)){n[o]=g++;m[o]=true}c=r+o;if(Object.prototype.hasOwnProperty.call(n,c)){r=c}else{if(Object.prototype.hasOwnProperty.call(m,r)){if(r.charCodeAt(0)<256){for(h=0;h<b;h++){a=(a<<1);if(j==15){j=0;q+=k(a);a=0}else{j++}}l=r.charCodeAt(0);for(h=0;h<8;h++){a=(a<<1)|(l&1);if(j==15){j=0;q+=k(a);a=0}else{j++}l=l>>1}}else{l=1;for(h=0;h<b;h++){a=(a<<1)|l;if(j==15){j=0;q+=k(a);a=0}else{j++}l=0}l=r.charCodeAt(0);for(h=0;h<16;h++){a=(a<<1)|(l&1);if(j==15){j=0;q+=k(a);a=0}else{j++}l=l>>1}}d--;if(d==0){d=Math.pow(2,b);b++}delete m[r]}else{l=n[r];for(h=0;h<b;h++){a=(a<<1)|(l&1);if(j==15){j=0;q+=k(a);a=0}else{j++}l=l>>1}}d--;if(d==0){d=Math.pow(2,b);b++}n[c]=g++;r=String(o)}}if(r!==""){if(Object.prototype.hasOwnProperty.call(m,r)){if(r.charCodeAt(0)<256){for(h=0;h<b;h++){a=(a<<1);if(j==15){j=0;q+=k(a);a=0}else{j++}}l=r.charCodeAt(0);for(h=0;h<8;h++){a=(a<<1)|(l&1);if(j==15){j=0;q+=k(a);a=0}else{j++}l=l>>1}}else{l=1;for(h=0;h<b;h++){a=(a<<1)|l;if(j==15){j=0;q+=k(a);a=0}else{j++}l=0}l=r.charCodeAt(0);for(h=0;h<16;h++){a=(a<<1)|(l&1);if(j==15){j=0;q+=k(a);a=0}else{j++}l=l>>1}}d--;if(d==0){d=Math.pow(2,b);b++}delete m[r]}else{l=n[r];for(h=0;h<b;h++){a=(a<<1)|(l&1);if(j==15){j=0;q+=k(a);a=0}else{j++}l=l>>1}}d--;if(d==0){d=Math.pow(2,b);b++}}l=2;for(h=0;h<b;h++){a=(a<<1)|(l&1);if(j==15){j=0;q+=k(a);a=0}else{j++}l=l>>1}while(true){a=(a<<1);if(j==15){q+=k(a);break}else{j++}}return q},decompress:function(k){if(k==null){return""}if(k==""){return null}var o=[],j,d=4,l=4,h=3,q="",t="",g,p,r,s,a,b,n,m=LZString._f,e={string:k,val:k.charCodeAt(0),position:32768,index:1};for(g=0;g<3;g+=1){o[g]=g}r=0;a=Math.pow(2,2);b=1;while(b!=a){s=e.val&e.position;e.position>>=1;if(e.position==0){e.position=32768;e.val=e.string.charCodeAt(e.index++)}r|=(s>0?1:0)*b;b<<=1}switch(j=r){case 0:r=0;a=Math.pow(2,8);b=1;while(b!=a){s=e.val&e.position;e.position>>=1;if(e.position==0){e.position=32768;e.val=e.string.charCodeAt(e.index++)}r|=(s>0?1:0)*b;b<<=1}n=m(r);break;case 1:r=0;a=Math.pow(2,16);b=1;while(b!=a){s=e.val&e.position;e.position>>=1;if(e.position==0){e.position=32768;e.val=e.string.charCodeAt(e.index++)}r|=(s>0?1:0)*b;b<<=1}n=m(r);break;case 2:return""}o[3]=n;p=t=n;while(true){if(e.index>e.string.length){return""}r=0;a=Math.pow(2,h);b=1;while(b!=a){s=e.val&e.position;e.position>>=1;if(e.position==0){e.position=32768;e.val=e.string.charCodeAt(e.index++)}r|=(s>0?1:0)*b;b<<=1}switch(n=r){case 0:r=0;a=Math.pow(2,8);b=1;while(b!=a){s=e.val&e.position;e.position>>=1;if(e.position==0){e.position=32768;e.val=e.string.charCodeAt(e.index++)}r|=(s>0?1:0)*b;b<<=1}o[l++]=m(r);n=l-1;d--;break;case 1:r=0;a=Math.pow(2,16);b=1;while(b!=a){s=e.val&e.position;e.position>>=1;if(e.position==0){e.position=32768;e.val=e.string.charCodeAt(e.index++)}r|=(s>0?1:0)*b;b<<=1}o[l++]=m(r);n=l-1;d--;break;case 2:return t}if(d==0){d=Math.pow(2,h);h++}if(o[n]){q=o[n]}else{if(n===l){q=p+p.charAt(0)}else{return null}}t+=q;o[l++]=p+q.charAt(0);d--;p=q;if(d==0){d=Math.pow(2,h);h++}}}};
	webengage.LZString = LZString;
})(webengage);


// Polyfil for Array.prototype.indexOf copied from https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function(searchElement, fromIndex) {

		var k;

		// 1. Let O be the result of calling ToObject passing
		//    the this value as the argument.
		if (this == null) {
			throw new TypeError('"this" is null or not defined');
		}

		var O = Object(this);

		// 2. Let lenValue be the result of calling the Get
		//    internal method of O with the argument "length".
		// 3. Let len be ToUint32(lenValue).
		var len = O.length >>> 0;

		// 4. If len is 0, return -1.
		if (len === 0) {
			return -1;
		}

		// 5. If argument fromIndex was passed let n be
		//    ToInteger(fromIndex); else let n be 0.
		var n = +fromIndex || 0;

		if (Math.abs(n) === Infinity) {
			n = 0;
		}

		// 6. If n >= len, return -1.
		if (n >= len) {
			return -1;
		}

		// 7. If n >= 0, then Let k be n.
		// 8. Else, n<0, Let k be len - abs(n).
		//    If k is less than 0, then let k be 0.
		k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

		// 9. Repeat, while k < len
		while (k < len) {
			// a. Let Pk be ToString(k).
			//   This is implicit for LHS operands of the in operator
			// b. Let kPresent be the result of calling the
			//    HasProperty internal method of O with argument Pk.
			//   This step can be combined with c
			// c. If kPresent is true, then
			//    i.  Let elementK be the result of calling the Get
			//        internal method of O with the argument ToString(k).
			//   ii.  Let same be the result of applying the
			//        Strict Equality Comparison Algorithm to
			//        searchElement and elementK.
			//  iii.  If same is true, return k.
			if (k in O && O[k] === searchElement) {
				return k;
			}
			k++;
		}
		return -1;
	};
};

// Polyfil for Date.prototype.toISOString https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString
if (!Date.prototype.toISOString) {
	(function() {
		function pad(number) {
			if (number < 10) {
				return '0' + number;
			}
			return number;
		}

		Date.prototype.toISOString = function() {
			return this.getUTCFullYear() +
				'-' + pad(this.getUTCMonth() + 1) +
				'-' + pad(this.getUTCDate()) +
				'T' + pad(this.getUTCHours()) +
				':' + pad(this.getUTCMinutes()) +
				':' + pad(this.getUTCSeconds()) +
				'.' + (this.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5) +
				'Z';
		};
	}());
};

webengage.eLog = function (e, type, data, event, et, eid) {
	if (e instanceof Error) {
		data = e.stack || e.description;
		data = (data.length > 900 ? data.substring(0, 900) : data);
		event = e.message || data.substring(0, 50);
		type = 'exception';
	}
	if(type){
		if(eid && et) {
			var dataJson = "{'version':'" + webengage.getWidgetVersion() + "','text':'"+ data + "', 'et':'"+ et + "', 'eid':'"+ eid + "'}";
		} else {
			var dataJson = "{'version':'" + webengage.getWidgetVersion() + "','text':'"+ data + "'}";
		}
		var baseUrl = (type === 'error' ? '//c.webengage.com/e.jpg' : '//c.webengage.com/e.jpg' );
		// skipping script error logging (when type='error') when beforeunload is already triggered
		if (webengage.winUnloading && type === 'error') {
			return;
		}
		var im = new Image();
		im.src = baseUrl + '?' + 'event=' + encodeURIComponent(event) + '&category=' + _weq['webengage.licenseCode'] + '&type=' + type + '&data=' + encodeURIComponent(dataJson) + '&ts=' + (new Date()).getTime();
	}
};
// WebEngage error wrapper function
// params - 1. func - function object 2. args - arguments to be passed to the function 3. throwError - boolean weather to throw error ?
webengage.withELog = function (func, args, blockError) {
	if (typeof func === 'function') {
		try {
			// hack to make func.apply work in IE
			// -- instance of args has to be an array
			if (!(args instanceof Array)) {
				args = [];
			}
			return func.apply(undefined, args);
		} catch(e) {
			webengage.eLog(e);
			if (!blockError)
				throw e;
		}
	} else {
		throw new Error("WithELog : first argument not a function");
	}
};
// WebEngage setTimeout wrapper, setTimeout called with withELog
webengage.setTimeout = function (func, timeout) {
	return setTimeout(function (){
		webengage.withELog(func);
	}, timeout);
};
webengage.setInterval = function (func, interval) {
	return setInterval(function (){
		webengage.withELog(func);
	}, interval);
};
webengage.setTimeout(function(){
	(function (window, document, _weq, webengage, undefined) {
		var _webengageWidgetInit = function () {
			var _licenseCode = null,
				_copy = function (to, from, override) {
					var _override = (typeof(override) === 'boolean' ? override : true);
					for (var key in from) {
						if (to[key] === undefined || _override) {
							to[key] = from[key];
						}
					}
					return to;
				}, _weCookies = {}, _onReadyFns = [], _readyDone = false;

			_copy(webengage, {
				'util': {
					copy: function (to, from, override) {
						return _copy(to, from, override);
					},
					loadScript: function (url, callBack, callBackArgs, errorCallBack) {
						// don't use load script from iframes because document is not the same
						var script = document.createElement("script");
						script.type = "text/javascript";
						script.charset = "UTF-8";
						script.async = true;
						script.src = url;
						script.callBack = callBack;
						script.callBackArgs = callBackArgs || [];
						script.errorCallBack = errorCallBack;
						this.appendChild(script);

						if (webengage.BrowserDetect.ie() && webengage.BrowserDetect.version() < 11 && script.readyState) {
							if (typeof callBack === 'function') {
								var onReadyStateChange = function () {
									if (script.readyState == "loaded" || script.readyState == "complete") {
										webengage.withELog(callBack, callBackArgs);
									}
								};
								// IE needs this to be specified for absence of "document.write"
								// in the response so that it can continue parsing the response
								script.defer = true;
								script.onreadystatechange = onReadyStateChange;
							}
						} else {
							webengage.util.addListener(script, 'load', function (e) {
								webengage.withELog(callBack, callBackArgs);
							});
							webengage.util.addListener(script, 'error', function (e) {
								if (webengage.getWidgetVersion() !== "3.0") {
									webengage.eLog(null, 'error', 'could not load - '+ url, 'script loading error');
								}
								if (typeof errorCallBack === 'function') {
									webengage.withELog(errorCallBack, [e]);
								}
							});
						}
					},
					createObj: function (objStr) {
						var parent = webengage,
							arr = objStr ? objStr.split('.') : [];
						for (var g = 0; g < arr.length; g++) {
							var str = arr[g],
								obj = parent[str];
							if (!obj) {
								obj = {};
								parent[str] = obj;
							}
							parent = obj;
						}
						return parent;
					},
					extend: function (obj, proerties) {
						return webengage.util.copy((typeof obj == 'string' ? webengage.util.createObj(obj) : obj), proerties);
					},
					isJqueryPresent: function () {
						return (window.jQuery !== undefined && parseFloat("." + window.jQuery().jquery.replace(/\./g, "")) >= 0.130);
					},
					applyCss: function (elem, css) {
						try {
							for (var key in css) {
								if (typeof css[key] == "function") {
									elem.style[key] = css[key]();
								} else {
									elem.style[key] = css[key];
								}
							}
						} catch (e) {}
						return elem;
					},
					isArray: function (obj) {
						return (obj && obj.constructor == Array);
					},
					inArray: function (arr, needle) {
						for (var i = 0; i < arr.length; i++) {
							if (arr[i] == needle) {
								return true;
							}
						}
						return false;
					},
					getMaxZIndex: function () {
						if(this.maxZIndex === undefined) {this.maxZIndex = 16776271;}
						return this.maxZIndex++;
					},
					alignCenter: function (elem, container, buttonAlignment) {
						var whichSide = (buttonAlignment == "left") ? "right" : "left";
						elem.style.top = ((parseInt(webengage.util.getElementHeight(container), 10) - parseInt(webengage.util.getElementHeight(elem), 10)) / 2 - (/Firefox/i.test(navigator.userAgent) ? 7 : 0)) + "px";
						elem.style[whichSide] = (parseInt(webengage.util.getElementWidth(container), 10) - parseInt(webengage.util.getElementWidth(elem), 10)) / 2 + 10 + "px";
					},
					getElementWidth: function (elem) {
						if (elem.clip !== undefined) {
							return elem.clip.width;
						} else {
							if (elem.style.pixelWidth) {
								return elem.style.pixelWidth;
							} else {
								return elem.offsetWidth;
							}
						}
					},
					getElementHeight: function (elem) {
						if (elem.clip !== undefined) {
							return elem.clip.height;
						} else {
							if (elem.style.pixelHeight) {
								return elem.style.pixelHeight;
							} else {
								return elem.offsetHeight;
							}
						}
					},
					isSupportsLocalStorage : function(readOnly) {
						try {
							var _localStorageFlag = (typeof(Storage)!=="undefined" && 'localStorage' in window && window['localStorage'] !== null);
							if(!readOnly && _localStorageFlag) { // For IOS tablet. Though it supports localStorage it throughs QuotaExceedError.
								window['localStorage']['_we_dm_ios_sup_f_'] = 'true';
								window['localStorage'].removeItem('_we_dm_ios_sup_f_');
							}
							return _localStorageFlag;
						} catch (e) {
							return false;
						}
					},
					getWindowHeight: function () {
						return "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
					},
					getWindowWidth: function () {
						return "innerWidth" in window ? window.innerWidth : document.documentElement.offsetWidth;
					},
					getDocumentHeight: function () {
						var body = document.body,
							html = document.documentElement;

						return Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
					},
					getDocumentWidth: function () {
						var body = document.body,
							html = document.documentElement;

						return Math.max( body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth);
					},
					getInitParamValue: function (parameterMap, paramName, defaultValue, masterSet) {
						var paramVal = defaultValue !== undefined ? defaultValue : null;
						if (parameterMap && parameterMap[paramName]) {
							var paramValue = parameterMap[paramName];
							if (masterSet) {
								if (webengage.util.inArray(masterSet, paramValue)) {
									paramVal = paramValue;
								}
							} else {
								paramVal = paramValue;
							}
						}
						return paramVal;
					},
					getInitParamValueAsArray: function (parameterMap, paramName, defaultArray, masterSet) {
						var paramVal = webengage.util.getInitParamValue(parameterMap, paramName, defaultArray);
						if (paramVal && typeof (paramVal) != "object") {
							paramVal = paramVal.split(/\s*,\s*/);
						}
						if (masterSet && typeof (masterSet) == "object") {
							var finalArray = [];
							for (var i = 0; i < paramVal.length; i++) {
								if (webengage.util.inArray(masterSet, paramVal[i])) {
									finalArray[finalArray.length] = paramVal[i];
								}
							}
							paramVal = finalArray;
						}
						return paramVal;
					},
					setCookie: function (name, value, expires, path, domain, secure, setInDomCookie) {
						if(webengage.util.isSupportsLocalStorage() && !setInDomCookie) {
							try {
								window['localStorage'][name]=value;
								return "ls"; // localStorage
							} catch (e) {
								window['localStorage'].removeItem(name);
								return webengage.util.setCookie(name, value, expires, path, domain, secure, true);
							}
						} else {
							if (webengage.util.isSupportsLocalStorage(true) && !setInDomCookie) {
								window['localStorage'].removeItem(name);
							}
							// set time, it's in milliseconds
							var today = new Date();
							today.setTime(today.getTime());
							/*
							 * if the expires variable is set, make the correct
							 * expires time, the current script below will set it
							 * for x number of days, to make it for hours, delete *
							 * 24, for minutes, delete * 60 * 24
							 */
							if (expires) {
								expires = expires * 1000 * 60 * 60 * 24;
							}
							var expires_date = new Date(today.getTime() + (expires));

							document.cookie = name + "=" + encodeURIComponent(value) + ((expires) ? ";expires=" + expires_date.toGMTString() : "") + ((path) ? ";path=" + path : "") + ((domain) ? ";domain=" + domain : "") + ((secure) ? ";secure" : "");
							return "ck"; // cookie
						}
					},
					getCookie: function (check_name, setInDomCookie) {
						if(webengage.util.isSupportsLocalStorage(true) && !setInDomCookie) {
							return (window['localStorage'][check_name] ?
								window['localStorage'][check_name] : webengage.util.getCookie(check_name, true));
						} else {

							// first we'll split this cookie up into name/value
							// pairs
							// note: document.cookie only returns name=value, not
							// the other components
							var a_all_cookies = document.cookie.split(';');
							var a_temp_cookie = '';
							var cookie_name = '';
							var cookie_value = '';
							var b_cookie_found = false; // set boolean t/f default f
							for (i = 0; i < a_all_cookies.length; i++) {
								// now we'll split apart each name=value pair
								a_temp_cookie = a_all_cookies[i].split('=');

								// and trim left/right whitespace while we're at it
								cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');

								// if the extracted name matches passed check_name
								if (cookie_name == check_name) {
									b_cookie_found = true;
									// we need to handle case where cookie has no
									// value but exists (no = sign, that is):
									if (a_temp_cookie.length > 1) {
										cookie_value = decodeURIComponent(a_temp_cookie[1].replace(/^\s+|\s+$/g, ''));
									}
									return cookie_value === null ? '' : cookie_value;
								}
								a_temp_cookie = null;
								cookie_name = '';
							}
							if (!b_cookie_found) {
								return null;
							}
						}
					},
					addListener: function(element, event, callback) {
						if (element.addEventListener) element.addEventListener(event, callback, false);
						else if (element.attachEvent) element.attachEvent('on' + event, callback);
					},
					removeListener: function(element, event, callback) {
						if (element.removeEventListener) element.removeEventListener(event, callback);
						else if (element.detachEvent) element.detachEvent("on"+event, callback);
					},
					bindEvent: function(event, callback){
						webengage.util.addListener(window, event, callback);
					},
					unbindEvent: function(event, callback){
						webengage.util.removeListener(window, event, callback);
					},
					getCurrentTime: function (timezoneOffset) {
						var d = new Date();
						// convert to msec since Jan 1 1970
						var time = d.getTime();
						if (timezoneOffset !== undefined) {
							// obtain local UTC offset in minutes and convert to
							// msec
							var localOffset = d.getTimezoneOffset() * 60000;
							// obtain UTC time in msec
							var utc = time + localOffset;
							// obtain and add destination's UTC time offset
							time = utc + (1000 * timezoneOffset);
						}
						return time;
					},
					getCurrentWeekDay: function (timezoneOffset) {
						var currTime = _weUtil.getCurrentTime();

						var d = new Date(currTime);
						// convert to msec since Jan 1 1970
						return d.getDay();
					},
					setWebengageCookie: function (cookieValObj) {
						var luid = (function() {
							var S4 = function (){
								return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
							};
							return ((new Date().getTime())+S4()+S4()+S4()+S4());
						})();

						var _cookieValObj = cookieValObj || {};
						var defaultCookieVal = {
							time: (new Date()).getTime()
							,'luid':luid
						};
						_cookieValObj = this.copy(_cookieValObj, defaultCookieVal, false);
						var cookieVal = this.stringify(_cookieValObj);
						_weCookies['_we_wk_ls_'] = _cookieValObj;
						this.setCookie('_we_wk_ls_', webengage.LZString.compressToBase64(cookieVal), 99999, '/', '', '');
						if(this.firstTimeUser === undefined)this.firstTimeUser = true;
						return _cookieValObj;
					},
					getWebengageCookie: function () {
						var webEngageCookie = _weCookies['_we_wk_ls_'];
						if (!webEngageCookie) {
							var webEngageCookieValue = this.getCookie('_we_wk_ls_') || this.getCookie('_we_wk_ls_', true);
							if (webEngageCookieValue) {
								// Checking if the coookie value is compressed or not
								if(webEngageCookieValue.charAt(0) !== '{') {
									webEngageCookieValue = webengage.LZString.decompressFromBase64(webEngageCookieValue);
								}
								// webEngageCookie = this.getCookie('_we_wk_ls_');
								// If the webengageCookie is already set in the dom and if the loaclStorage is available then check if the cookie value is
								// actualy coming from the localStorage. if the cookie is not coming from the localStorage mark cooiek as null.
								if(this.isSupportsLocalStorage() && this.getCookie('_we_wk_ls_', true)) {
									this.setCookie('_we_wk_ls_', webEngageCookieValue, -1, '/', '', '', true);
									this.setCookie('_we_wk_ls_', webEngageCookieValue, 99999, '/', '', '');
								}
								webEngageCookie = _weCookies['_we_wk_ls_'] = new Function('return ' + webEngageCookieValue)() || null;
							} else {
								webEngageCookie = this.setWebengageCookie();
							}
						}
						return webEngageCookie;
					},
					setSessionCookie: function (sessionCookieObj, updateSessionCount) {
						var _defaultSessionCookieObj = {
							referrer: document.referrer,
							isFirstTime: this.isFirstTimeUser(),
							sst: (new Date()).getTime(), //Session Start Time
							pvc:0, //Page View Count, setting it to 0 since it gets update in updateSessionCookieOnWidgetLoad
							suid:(new Date().getTime()), // Session userID
							landingPage : window.location.href
						};

						var _sessionCookieObj = sessionCookieObj || {};
						_sessionCookieObj = this.copy(_sessionCookieObj, _defaultSessionCookieObj, false);
						if(!this.isSupportsLocalStorage() && _sessionCookieObj['landingPage']) { delete _sessionCookieObj['landingPage'];}
						var sessionCookieValue = this.stringify(_sessionCookieObj);
						_weCookies['_we_wk_ss_'] = _sessionCookieObj;
						var flag = this.setCookie('_we_wk_ss_', webengage.LZString.compressToBase64(sessionCookieValue), '', '/', '', '');

						if(this.isSupportsLocalStorage()) {
							if (flag === 'ls') {
								this.setCookie('_we_wk_ss_lsf_', true, '', '/', '', '', true);
							} else {
								this.setCookie('_we_wk_ss_lsf_', false, '', '/', '', '', true);
							}
						}
						if(typeof updateSessionCount === 'boolean' && true) {
							this.updateTSC();
						}
						return _sessionCookieObj;
					},
					getSessionCookie: function () {
						var sessionCookieObj = _weCookies['_we_wk_ss_'];
						if(!sessionCookieObj) {
							var sessionCookieValue = this.getCookie('_we_wk_ss_') || this.getCookie('_we_wk_ss_', true);
							if (sessionCookieValue) {
								try {
									// Checking if the coookie value is compressed or not
									if(sessionCookieValue.charAt(0) !== '{') {
										sessionCookieValue = webengage.LZString.decompressFromBase64(sessionCookieValue);
									}
									// If the sessionCookie value is present and browser supports localStorage then there has to be a sessionCookieLocalStorageFlag
									// set into DomCookie. If the flag not present then we have to check if the cookie value is coming from DOMCookie. If yes then
									//  creset it into localStorage and set a sessionCookieLocalStorageFlag in DomCookie else throw error to reset the cookie.
									if(this.isSupportsLocalStorage()) {
										var sessionCookieLocalStorageFlag = this.getCookie('_we_wk_ss_lsf_', true);
										if(!sessionCookieLocalStorageFlag || sessionCookieLocalStorageFlag === 'false') {
											var sessionCookieValueFromDomCookie = this.getCookie('_we_wk_ss_', true);
											if(sessionCookieValueFromDomCookie) {
												this.setCookie('_we_wk_ss_', sessionCookieValue, -1, '/', '', '', true);// Removing existing session cookie from DOM
												this.setSessionCookie(sessionCookieValueFromDomCookie);
											} else {
												throw new Error();
											}
										}
									}
									sessionCookieObj = _weCookies['_we_wk_ss_'] = (new Function('return ' + sessionCookieValue)()) || null;
								} catch (e) {
									sessionCookieObj = this.setSessionCookie(null, true);
								}
							} else {
								sessionCookieObj = this.setSessionCookie(null, true);
							}
						}
						return sessionCookieObj;
					},
					updateSessionCookie: function (sessionCookieValue) {
						var _sessionCookieValue = this.getSessionCookie();
						if (_sessionCookieValue) {
							this.copy(_sessionCookieValue, (sessionCookieValue || {}));
							this.setSessionCookie(_sessionCookieValue);
						} else {
							_sessionCookieValue = this.setSessionCookie(null, true);
						}
						return _sessionCookieValue;
					},
					updateTSC: function () { // Update total sessions count
						var webEngageCookie = this.getWebengageCookie();
						webEngageCookie.sc = webEngageCookie.sc || 0;
						webEngageCookie.sc++;
						return this.setWebengageCookie(webEngageCookie);
					},
					updateTPVC: function () { //  Update total page view count across sessions
						var webEngageCookie = this.getWebengageCookie();
						webEngageCookie.tpvc = webEngageCookie.tpvc || 0;
						webEngageCookie.tpvc++;
						return  this.setWebengageCookie(webEngageCookie);
					},
					setLST: function () { //Set Last session Time
						var webEngageCookie = this.getWebengageCookie();
						webEngageCookie.lst = (new Date()).getTime();
						return this.setWebengageCookie(webEngageCookie);
					},
					setGZIPFlag: function (GZIPFlag) { //Set Last session Time
						var webEngageCookie = this.getWebengageCookie();
						webEngageCookie.isGzip = GZIPFlag || false;
						return this.setWebengageCookie(webEngageCookie);
					},
					setVTD : function () { //Visitor Tracking done flag
						var sessionCookie = this.getSessionCookie();
						sessionCookie.vtd = 1;
						return this.updateSessionCookie(sessionCookie);
					},
					updateSessionCookieGeoData: function () {
						var sessionCookieGeoData = {
							country: webengage.GEO.country(),
							region: webengage.GEO.region(),
							city: webengage.GEO.city(),
							ip: webengage.GEO.ip(),
							tsD: (webengage.GEO.serverTimeStamp() && !isNaN(webengage.GEO.serverTimeStamp()) ? ((new Date()).getTime() - parseInt(webengage.GEO.serverTimeStamp(),10)) : 0)
						}
						return this.updateSessionCookie(sessionCookieGeoData);
					},
					getClientPageUrl: function () {
						return window.location.href;
					},
					getClientPageHost: function () {
						return window.location.host;
					},
					escapeScopeChars: function (scope) {
						return (scope + '').replace(/([,#[\]\\])/g, "\$1");
					},
					escapeForRegExp: function (text) {
						return (text + '').replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
					},
					isFirstTimeUser: function () {
						return (this.firstTimeUser !== undefined) ? this.firstTimeUser : false;
					},
					escapeNewLine : function (string) {
						return string.replace(/[\\]/g, '\\\\')
							.replace(/[\"]/g, '\\\"')
							.replace(/[\/]/g, '\\/')
							.replace(/[\b]/g, '\\b')
							.replace(/[\f]/g, '\\f')
							.replace(/[\n]/g, '\\n')
							.replace(/[\r]/g, '\\r')
							.replace(/[\t]/g, '\\t');
					},
					// implement JSON.stringify serialization
					stringify: function (obj) {
						if (typeof JSON !== 'undefined' && typeof JSON.stringify === 'function') {
							return JSON.stringify(obj);
						} else {
							var type = typeof (obj);
							if(type !== 'undefined') {
								if (type != "object" || obj === null) {
									// simple data type
									if (type == "string") obj = '"' + this.escapeNewLine(obj) + '"';
									return String(obj);
								} else {
									// recurse array or object
									var json = [],
										arr = (obj && obj.constructor == Array),
										dt = (obj && obj instanceof Date);
									if (arr) {
										for (var i = 0; i < obj.length; i++) {
											var val = this.stringify(obj[i]);
											if(typeof val !== 'undefined') json.push(val);
										}
									} else if (dt) {
										return dt.toString();
									} else {
										for (var n in obj) {
											var val = this.stringify(obj[n]);
											if(typeof val !== 'undefined') json.push('"' + n + '":' + val);
										}
									}
									return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
								}
							}
						}
					},
					trimStr : function (str) {
						if (typeof str.trim === 'function') {
							return str.trim();
						} else if (typeof str === 'string'){
							return str.replace(/^\s+|\s+$/g,"");
						}
						return str;
					},
					clientDataString : function (clientData) {
						// if object value is function the first evaluate
						var getClientData = function (obj) {
							var returnValue = obj;
							if (typeof obj === 'function') {
								try {
									returnValue = obj();
								} catch (e) {
									returnValue = null;
								}
							}
							return returnValue;
						};
						if (typeof clientData === 'object') {
							for(var key in clientData) {
								var value = clientData[key];
								if (value === undefined || (typeof value !== 'boolean' && value !== 0 && !value)) {
									delete clientData[key];
									continue;
								}
								if(!(value instanceof Array)) {
									// creating an array of values if value is not already an array
									clientData[key] = new Array ();
									var newValue = getClientData(value);
									if (newValue === undefined || (typeof newValue !== 'boolean' && newValue !== 0 && !newValue)) {
										delete clientData[key];
									} else {
										clientData[key].push(newValue);
									}
								} else {
									// TODO - isReallyEmpty array util function required
									var newArray = [];
									for (var i = 0; i < value.length; i++) {
										value[i] = getClientData(value[i]);
										if (!(value[i] === undefined || (typeof value[i] !== 'boolean' && value[i] !== 0 && !value[i]))) {
											newArray.push(value[i]);
										}
									}
									// get rid off the arry if empty
									if (newArray.length > 0) {
										clientData[key] = newArray;
									} else {
										delete clientData[key];
									}
								}
							}
						}
						return webengage.util.stringify(clientData);
					},
					isColorTooLight: function (hexColor) {
						hexColor = hexColor.indexOf("#") === 0 ? hexColor.substr(1, hexColor.length) : hexColor;
						var r = parseInt(hexColor.substr(0, 2), 16);
						var g = parseInt(hexColor.substr(2, 2), 16);
						var b = parseInt(hexColor.substr(4, 2), 16);
						var yiq = ((r * 299) + (g * 299) + (b * 299)) / 1000;
						return yiq >= 128;
					},
					isEmptyObject: function (obj) {
						for (var prop in obj) {
							if (obj.hasOwnProperty(prop)) {
								return false;
							}
						}
						return true;
					},
					parseJSON: function (jsonString) {
						return new Function('return ' + jsonString + ';')();
					},
					bind: function (eventTypes, fn) {
						var currentInstance = this;
						var _callbacks = currentInstance.callbacks || {};
						if (eventTypes !== undefined && typeof (fn) === 'function') {
							var origFn = fn;
							fn = function () {
								return origFn.apply(this, arguments);
							};
							// Attaching an identifier to remove it later on by passing the fn
							// object
							fn.cbid = (origFn.cbid = currentInstance.cbid++);
							// Handle multiple events separated by a space
							// currentInstance.bind("close submit", fn);
							eventTypes = (eventTypes || "").match(/\S+/g) || [""];
							var t = eventTypes.length;
							while (t--) {
								var eventType = eventTypes[t];
								/*
								 * var tmp = (/^([^.]*)(?:\.(.+)|)$/).exec( types[t] ) || [];
								 * namespace = ( tmp[2] || "" ); if(namespace){ fn.cbid = (
								 * origFn.cbid = namespace ); }
								 */
								var eventTypeCallbacks = _callbacks[eventType] || {};
								eventTypeCallbacks[fn.cbid] = fn;
								_callbacks[eventType] = eventTypeCallbacks;
							}
							currentInstance.callbacks = _callbacks;
						};
						return currentInstance;
					},
					unbind: function (eventType, fn) {
						var currentInstance = this;
						if (eventType !== undefined) {
							if (typeof (currentInstance.callbacks) === "object" && typeof (currentInstance.callbacks[eventType]) === "object") {
								if (typeof (fn) === 'function' && fn.cbid) {
									delete currentInstance.callbacks[eventType][fn.cbid];
								} else {
									delete currentInstance.callbacks[eventType];
								}
							}
						}
						return currentInstance;
					},
					executeCallbacks: function () {
						var currentInstance = this;
						if(typeof currentInstance.enableCallbacks === 'boolean' && currentInstance.enableCallbacks) {
							var eventName = arguments[0];
							if (eventName !== undefined && typeof currentInstance.callbacks === 'object' && typeof currentInstance.callbacks[eventName] === 'object') {
								for (var i in currentInstance.callbacks[eventName]) {
									if (typeof currentInstance.callbacks[eventName][i] === 'function') {
										var returnVal = currentInstance.callbacks[eventName][i].apply(this, Array.prototype.slice.call(arguments, 1));
										if (typeof returnVal === 'boolean' && !returnVal) {
											return false;
										}
									}
								}
							}
						}
					},
					markSurveyAsClosed: function (surveyEId, currentInstance) {
						if (surveyEId) {
							try {
								// Setting the survey as closed in webengage short_session cookie
								var sessionCookieVal = webengage.util.getSessionCookie();
								if (sessionCookieVal.closedSurveys === undefined || !sessionCookieVal.closedSurveys) {
									sessionCookieVal.closedSurveys = '';
								}
								if (sessionCookieVal.closedSurveys.indexOf('##' + surveyEId) < 0) {
									sessionCookieVal.closedSurveys += '##' + surveyEId;
								}
								webengage.util.updateSessionCookie(sessionCookieVal);
								if(currentInstance && typeof currentInstance.dump === 'function') {
									currentInstance.dump('close');
								}
							} catch (e) {}
						}
					},
					markSurveyAsTaken: function (surveyEId, currentInstance, dumpData) {
						if (surveyEId) {
							try {
								// Setting the survey as taken in webengage long_session cookie
								var surveyAlreadySubmitted = true;
								var webEngageCookie = webengage.util.getWebengageCookie();
								if (webEngageCookie.takenSurveys === undefined || !webEngageCookie.takenSurveys) {
									webEngageCookie.takenSurveys = '';
								}
								if (webEngageCookie.takenSurveys.indexOf('##' + surveyEId) < 0) {
									webEngageCookie.takenSurveys += '##' + surveyEId;
									surveyAlreadySubmitted = false;
								}
								webengage.util.setWebengageCookie(webEngageCookie);
								if(currentInstance && typeof currentInstance.dump === 'function' && dumpData && typeof dumpData === 'boolean' && dumpData) {
									currentInstance.event  = currentInstance.event || 'submit';
									if(currentInstance.event === 'submit' && !surveyAlreadySubmitted) {
										currentInstance.dump(currentInstance.event);
									} else if(currentInstance.event === 'complete') {
										currentInstance.dump(currentInstance.event);
									}


								}
							} catch (e) {}
						}
					},
					markEntityAsShown: function (entityEId, entityType, currentInstance, inAbsence) {
						if (entityEId && entityType) {
							var timesShown = 1, timesShownSC = 1;
							try {
								var longTermCookieVal = webengage.util.getWebengageCookie(), sessionCookieVal = webengage.util.getSessionCookie(),
									whatToLookInLC = (("notification" === entityType) ? (inAbsence && inAbsence === true ? 'anids' : 'seenNIds') : (("survey" === entityType) ? (inAbsence && inAbsence === true ? 'asids' : 'seenSIds')  : null));
								whatToLookInSC = (("notification" === entityType) ? (inAbsence && inAbsence === true ? 'anids' : 'snids') : (("survey" === entityType) ? (inAbsence && inAbsence === true ? 'asids' : 'ssids')  : null));
								if(whatToLookInLC && whatToLookInSC) {
									longTermCookieVal[whatToLookInLC] = longTermCookieVal[whatToLookInLC] && longTermCookieVal[whatToLookInLC] !== undefined ? longTermCookieVal[whatToLookInLC] : '';
									if (longTermCookieVal[whatToLookInLC].indexOf('##' + entityEId) < 0) {
										longTermCookieVal[whatToLookInLC] += '##' + entityEId + "=" + timesShown;
									} else {
										var regExp = new RegExp("##" + entityEId + "=(\\d+)", "g");
										longTermCookieVal[whatToLookInLC] = longTermCookieVal[whatToLookInLC].replace(regExp, function (match, group) {
											timesShown = (+group + 1);
											return '##' + entityEId + "=" + timesShown;
										});
									}

									sessionCookieVal[whatToLookInSC] = sessionCookieVal[whatToLookInSC] && sessionCookieVal[whatToLookInSC] !== undefined ? sessionCookieVal[whatToLookInSC] : '';
									if (sessionCookieVal[whatToLookInSC].indexOf('##' + entityEId) < 0) {
										sessionCookieVal[whatToLookInSC] += '##' + entityEId + "=" + timesShownSC;
									} else {
										var regExp = new RegExp("##" + entityEId + "=(\\d+)", "g");
										sessionCookieVal[whatToLookInSC] = sessionCookieVal[whatToLookInSC].replace(regExp, function (match, group) {
											timesShownSC = (+group + 1);
											return '##' + entityEId + "=" + timesShownSC;
										});
									}

									webengage.util.updateSessionCookie(sessionCookieVal);
									webengage.util.setWebengageCookie(longTermCookieVal);
								}
							} catch (e) {}
						};
					},
					markNotificationAsClicked: function (notificationEId, actionId, currentInstance) {
						if (notificationEId) {
							try {
								// TODO merge both the seen and taken cookie together
								var longTermCookieVal = webengage.util.getWebengageCookie();
								longTermCookieVal.takenNIds = longTermCookieVal.takenNIds && longTermCookieVal.takenNIds !== undefined ? longTermCookieVal.takenNIds : '';
								if (longTermCookieVal.takenNIds.indexOf('##' + notificationEId) < 0) {
									longTermCookieVal.takenNIds += '##' + notificationEId;
								}
								webengage.util.setWebengageCookie(longTermCookieVal);
								if(currentInstance && typeof currentInstance.dump === 'function') {
									currentInstance.dump('click');
								}
							} catch (e) {}
						}
					},
					markNotificationAsClosed: function (notificationEId, currentInstance) {
						if (notificationEId) {
							try {
								// Setting the notification as closed in session cookie
								var sessionCookieVal = webengage.util.getSessionCookie();
								if (sessionCookieVal.closedNIds === undefined || !sessionCookieVal.closedNIds) {
									sessionCookieVal.closedNIds = '';
								}
								if (sessionCookieVal.closedNIds.indexOf('##' + notificationEId) < 0) {
									sessionCookieVal.closedNIds += '##' + notificationEId;
								}
								webengage.util.updateSessionCookie(sessionCookieVal);
								//_weUtil.tsTracking('/n.jpg', ('id=' + notificationEId +'&licenseCode=' + _weq['webengage.licenseCode'] + '&cl=1&tzo='+webengage_fs_configurationMap.tzo));
								if(currentInstance && typeof currentInstance.dump === 'function') {
									currentInstance.dump('close');
								}
							} catch (e) {}
						}
					},
					setMinimizedState: function (entity, entityId, state) {
						var entityCookieKey = (entity === 'notification' ? 'minNIds' : 'minSIds');
						if (entityId) {
							try {
								// Setting the entity as minimized in the session cookie
								var sessionCookieVal = webengage.util.getSessionCookie();
								if (sessionCookieVal[entityCookieKey] === undefined || !sessionCookieVal[entityCookieKey]) {
									sessionCookieVal[entityCookieKey] = '';
								}
								if (state) {
									if (sessionCookieVal[entityCookieKey].indexOf('##' + entityId) < 0) {
										sessionCookieVal[entityCookieKey] += '##' + entityId;
									}
								} else {
									sessionCookieVal[entityCookieKey] = sessionCookieVal[entityCookieKey].replace('##' + entityId, "");
								}
								webengage.util.updateSessionCookie(sessionCookieVal);
							} catch (e) {}
						}
					},
					getMinimizedState: function (entity, entityId) {
						var entityCookieKey = (entity === 'notification' ? 'minNIds' : 'minSIds');
						var state = false;
						if (entityId) {
							try {
								// Setting the entity as minimized in the session cookie
								var sessionCookieVal = webengage.util.getSessionCookie();
								if (sessionCookieVal[entityCookieKey] !== undefined) {
									if (0 <= sessionCookieVal[entityCookieKey].indexOf('##' + entityId)) {
										state = true;
									}
								}
							} catch (e) {}
						}
						return state;
					},
					getVersion: function () {
						return _weProperties.widgetVersion;
					},
					usckwl : function (domain){ // updateSessionCookieOnWidgetLoad method
						// Setting the notification as closed in session cookie
						var sessionCookieVal = webengage.util.getSessionCookie();
						sessionCookieVal.pvc = (sessionCookieVal.pvc ? sessionCookieVal.pvc+1 : 1);
						//Update referrer value in session cookie if the referrer value is not yet set OR
						// if the current referrer is different from the existing session referrer and
						// not from the regestered domain and its subdomain.
						if(domain && document.referrer && (!sessionCookieVal.referrer || sessionCookieVal.referrer !== document.referrer)) {
							var _referrerDomain = document.referrer.match(/:\/\/(.[^\/]+)/)[1];
							if(!_referrerDomain.match(new RegExp(webengage.util.escapeForRegExp(domain)+"$", 'gi'))) {
								sessionCookieVal.referrer = document.referrer;
							}
						}
						webengage.util.updateSessionCookie(sessionCookieVal);
					},
					getHashCode: function(luid) {
						var _hash = 0, i, _char, _luid = luid || "";
						if (_luid.length == 0) return _hash;
						for (i = 0, l = _luid.length; i < l; i++) {
							_char  = _luid.charCodeAt(i);
							_hash  = ((_hash<<5)-_hash)+_char;
							_hash |= 0; // Convert to 32bit integer
						}
						return _hash;
					},
					getTotalTimesShown: function (entityEId, entityType, lookInSession, inAbsence) {
						var timesShown = 0;
						if (entityEId && entityType) {
							var whereToLook=null, whatToLook=null;
							if(lookInSession) {
								whereToLook = _weUtil.getSessionCookie();
								whatToLook = (("notification" === entityType) ? (inAbsence && inAbsence === true ? 'anids' : 'snids') : (("survey" === entityType) ? (inAbsence && inAbsence === true ? 'asids' : 'ssids')  : null));
							} else {
								whereToLook = _weUtil.getWebengageCookie();
								whatToLook = (("notification" === entityType) ? (inAbsence && inAbsence === true ? 'anids' : 'seenNIds') : (("survey" === entityType) ? (inAbsence && inAbsence === true ? 'asids' : 'seenSIds')  : null));
							}
							if(whereToLook && whatToLook && whereToLook[whatToLook]) {
								try {
									var regExp = new RegExp("##" + entityEId + "=(\\d+)");
									var match = whereToLook[whatToLook].match(regExp);
									if (match instanceof Array && match.length > 1) {
										timesShown = parseInt(match[1], 10);
									}
								} catch (e) {}
							}
						}
						return timesShown;
					},
					attachEventListners : function (product, instance) {
						var _internalCallbacks = (product === 'survey' ? webengage.survey.callbacks :
							(product === 'feedback' ? webengage.feedback.callbacks : webengage.notification.callbacks));
						if (typeof _internalCallbacks !== undefined && _internalCallbacks) {
							for (eventName in _internalCallbacks) {
								var _callbacksArray = _internalCallbacks[eventName];
								if (typeof callbacks != undefined && _callbacksArray) {
									for (_cbid in _callbacksArray) {
										this.bind.apply(instance, [eventName, _callbacksArray[_cbid]]);
									}
								}
							}
						}
					},
					// http://stackoverflow.com/a/5493614
					hasSVG : function () {
						return !!document.createElementNS && !!document.createElementNS('http://www.w3.org/2000/svg', "svg").createSVGRect;
					},
					// https://github.com/jquery/jquery/blob/1.3.2/src/event.js#L620
					onDocReady : function (callback) {
						if (typeof callback === 'function') {
							if (document.body) {
								// document is already ready to go
								webengage.withELog(function () {
									callback();
								});
								return;
							}
							// Mozilla, Opera and webkit nightlies currently support this event
							if ( document.addEventListener ) {
								// Use the handy event callback
								document.addEventListener( "DOMContentLoaded", function(){
									webengage.withELog(function () {
										document.removeEventListener( "DOMContentLoaded", arguments.callee, false );
										callback();
									});
								}, false );

								// If IE event model is used
							} else if ( document.attachEvent ) {
								// ensure firing before onload,
								// maybe late but safe also for iframes
								document.attachEvent("onreadystatechange", function(){
									webengage.withELog(function () {
										if ( document.readyState === "complete" ) {
											document.detachEvent( "onreadystatechange", arguments.callee );
											callback();
										}
									});
								});

								// If IE and not an iframe
								// continually check to see if the document is ready
								if ( document.documentElement.doScroll && window == window.top ) (function(){
									webengage.withELog(function () {
										try {
											// If IE is used, use the trick by Diego Perini
											// http://javascript.nwbox.com/IEContentLoaded/
											document.documentElement.doScroll("left");
										} catch( error ) {
											setTimeout( arguments.callee, 0 );
											return;
										}
										// and execute any waiting functions
										callback();
									});
								})();
							}
						}
					},
					//Abort all WebEngage Feedback/Survey/Notification instances
					abortAllInstances : function(instances) {
						webengage.withELog(function () {
							if(instances.length > 0 ) {
								for(var i = 0; i < instances.length; i++) {
									if(typeof instances[i].abort === 'function') {
										instances[i].abort();
									}
								}
							}
						});
					},
					abortInstance : function(instance) {
						webengage.withELog(function () {
							if(instance) {
								if(typeof instance.close === 'function') {
									instance.close();
								} else {
									instance.onLoad(function(){
										this.close();
									});
								}
							}
						});
					},
					// Update Widget Access TimeStamp
					uwats : function (){
						if (!_weq['webengage.isDemoMode']) {
							if(!webengage_fs_configurationMap.lastWidgetCheckDate || Math.floor((Math.random() * 100) + 1) <= 10) {
								var DayInMs = 1000 * 60 * 60 * 24;
								var expiredDate = new Date().getTime() - (7*DayInMs);
								if(webengage_fs_configurationMap.lastWidgetCheckDate){
									var lastAccessDate = new Date(webengage_fs_configurationMap.lastWidgetCheckDate);
									if(lastAccessDate < expiredDate){
										webengage.eLog(null, 'info', lastAccessDate.getTime(), 'widget-verified');
									}
								}else{
									webengage.eLog(null, 'info', "no-check-date", 'widget-verified');
								}

							}
						}
					},
					isSmallScreen : function () {
						var minWidth = 480, availWidth = window.screen.availWidth;
						return (availWidth <= minWidth ? true : false);
					},
					// https://code.google.com/p/chromium/issues/detail?id=102816
					webklitWorkAround : function (notificationFrameDoc) {
						var offset = document.body.scrollTop || 0;
						if (document.location.toString().match(/#(top)?$/)) {
							// Force a scroll on the iframe to make scrolling work again
							notificationFrameDoc.body.scrollTop = 0;
							// Scroll back to the original scroll position as document.close will have scrolled to the bottom
							document.body.scrollTop = offset;
						}
					},
					getWeDataContainer : function () {
						return _weProperties.weDataContainer;
					},
					withWeJquery : function (callback) {
						webengage.jQSt = webengage.jQSt || 0;
						switch (webengage.jQSt) {
							case 1 :
								// loading jquery
								setTimeout(function () {
									webengage.util.withWeJquery(callback);
								}, 100);
								break;
							case 2 :
								// loding done
								if (typeof callback === 'function') {
									callback();
								}
								break;
							default :
								// load jquery
								webengage.jQSt = 1;
								webengage.util.loadScript.apply(_weProperties.widgetContainer, [_weProperties.weJquery, function () {
									$weJQuery = jQuery.noConflict(true);
									webengage.jQSt = 2;
									if (typeof callback === 'function') {
										callback();
									}
								}]);
								break;
						}
					},
					tsTracking : function(uri, paramString) {
						if(uri) {
							var im = new Image();
							im.src = "//"+_weProperties.tstbu+uri+(paramString?'?'+paramString:'');
						}
					},
					isElementExists : function(elem){
						var _isElementExists = (elem);
						if(_isElementExists && elem.nodeType && elem.nodeType === 1) { // All the HTML nodes have nodeType as 1
							_isElementExists = (elem.style && ((elem.style.display && elem.style.display === 'none') || (elem.style.visibility && elem.style.visibility === 'hidden'))) ? false : true;
						}
						return _isElementExists;
					},
					onReady : function(onReadyFn) {
						if (typeof onReadyFn === 'function') {
							if(_readyDone) onReadyFn();
							else _onReadyFns[_onReadyFns.length] = onReadyFn;
						}
					},
					getServerTimeStamp : function() {
						var sessionCookie = _weUtil.getSessionCookie();
						return ((new Date()).getTime() + (sessionCookie && sessionCookie.tsD && !isNaN(sessionCookie.tsD) ? parseInt(sessionCookie.tsD, 10) : 0));
					},
					transitConvert : function(data){
						var seenObjects = [];
						function _convert(data) {
							if (data === null) {
								return null;
							} else if (Object.prototype.toString.call(data) === '[object String]') {
								if (data.charAt(0) == '~') {
									return "~" + data;
								} else {
									return data;
								}
							} else if (Object.prototype.toString.call(data) === '[object Date]') {
								return "~t" + data.toISOString();
							} else if (Object.prototype.toString.call(data) === '[object Array]') {
								var length = data.length;
								for (var i = 0; i < length; i++) {
									data[i] = _convert(data[i]);
								}
								return data
							} else if (Object.prototype.toString.call(data) === '[object Object]') {
								if (seenObjects.indexOf(data) == -1) {
									seenObjects.push(data);
									for (var property in data) {
										if (data.hasOwnProperty(property)) {
											data[property] = _convert(data[property]);
										}
									}
									return data;
								} else {
									throw new Error("There is some circular references while converting data into transit format");
								}
							} else {
								return data;
							}
						};
						return _convert(data);
					}
				}
			}, true);

			_copy(webengage, {
				'getWidgetVersion' : function () {
					return _weq['webengage.widgetVersion'] || "4.0";
				}
			}, true);

			var _weUtil = webengage.util;

			var _weProperties = {
				widgetVersion: "4",
				weJquery: "//d3701cc9l7v9a6.cloudfront.net/js/jquery/jquery-1.3.2.min.js",
				baseWebEngageUrl: "//webengage.com",
				feedbackAppHost: "feedback.webengage.com",
				surveyAppHost: "survey.webengage.com",
				widgetDomain: "//d3701cc9l7v9a6.cloudfront.net",
				baseStaticUrl: "//d3701cc9l7v9a6.cloudfront.net",
				loadSurveyWidgetUrl: function (layoutEId) {
					// hardcoding ~483819f layoutEId in case of old v3 files
					return "/js/widget/we-survey-widget-"+(layoutEId ? layoutEId : "~483819f")+"-v-4.0.js?v=468.0";
				},
				loadSurveyWidgetUrlv3: "/js/widget/we-survey-widget.js?v=468.0",
				notificationWidgetScriptUrl: "/js/widget/we-notification-widget-v-4.1.js?v=468.0",
				findAllTakenSurveysUrl: function(){ return "//survey.webengage.com/publisher-widget-loader.html?action=findAllTakenSurveys&licenseCode="+_weq['webengage.licenseCode']+"&url=" + encodeURIComponent(_weUtil.getClientPageUrl());},
				widgetContainerId: "webklipper-publisher-widget-container",
				feedbackImageBaseUrl: "//s3-ap-southeast-1.amazonaws.com/wk-static-files/webengage/feedbacktab/",
				loadFeedbackWidgetUrl: "/js/widget/we-feedback-widget-v-4.0.js?v=468.0",
				loadFeedbackWidgetUrlv3: "/js/widget/we-feedback-widget.js?v=468.0",
				gaCallbacksScriptUrl : "//d3701cc9l7v9a6.cloudfront.net/js/widget/ga-callbacks-helper.js?v=468.0",
				tstbu : "c.webengage.com",
				csUrl : "//d3701cc9l7v9a6.cloudfront.net/js/widget/we-conversion-helper-min-v-1.0.js?v=468.0"
			};

			// local variable to store the v3 configuration for feedback, survey
			// and notification
			var _widgetConfiguration = {};

			_weUtil.extend("logger", (function () {
				var _properties = {
						containerCss: {
							position: function () {
								return webengage.BrowserDetect.is_this_the_worlds_most_annoying_browser() ? "absolute" : "fixed";
							},
							cursor: "default",
							margin: 0,
							zIndex: (_weUtil.getMaxZIndex() + 1),
							backgroundColor: "red",
							right: "0px",
							bottom: "0px",
							display: "block",
							padding: "10px",
							maxWidth: "500px",
							textAlign: "left",
							lineHeight: "17px",
							background: "none repeat scroll 0 0 #ff9",
							border: "1px solid #fc6",
							borderBottomWidth: "0px",
							borderRightWidth: "0px",
							borderTopLeftRadius: "5px",
							MozBorderRadiusTopleft: "5px",
							WebkitBorderTopLeftRadius: "5px",
							boxShadow: "0 1px 0 0 rgba(255, 255, 255, 0.6) inset, 0 1px 1px rgba(0, 0, 0, 0.1)",
							MozBoxShadow: "0 1px 0 0 rgba(255, 255, 255, 0.6) inset, 0 1px 1px rgba(0, 0, 0, 0.1)",
							WebkitBoxShadow: "0 1px 0 0 rgba(255, 255, 255, 0.6) inset, 0 1px 1px rgba(0, 0, 0, 0.1)",
							fontFamily: "Arial, sans-serif",
							fontSize: "13px"
						},
						dataDivCss: {
							margin: "0px",
							padding: "0px",
							color: "#000",
							textShadow: "1px 1px #f1f1f1",
							textDecoration: "none",
							fontFamily: "inherit",
							fontSize: "inherit"
						},
						dataDivLinkCss: {
							color: "#039",
							textDecoration: "underline",
							textShadow: "1px 1px #f1f1f1",
							fontFamily: "inherit",
							fontSize: "inherit"
						},
						closeButtonCss: {
							color: "#039",
							textDecoration: "underline",
							textShadow: "1px 1px #f1f1f1",
							cursor: "pointer",
							cssFloat: "right",
							styleFloat: "right",
							marginRight: "5px",
							marginLeft: "30px"
						}
					},
					_renderLogMessage = function (message, type) {
						var _existing = document.getElementById("webengage-error-messages");
						if (_existing) {
							_existing.parentNode.removeChild(_existing);
						}
						var _logMessageContainer = document.createElement("div");
						_logMessageContainer.setAttribute("id", "webengage-error-messages");
						_logMessageContainer = _weUtil.applyCss(_logMessageContainer, _properties.containerCss);
						document.body.insertBefore(_logMessageContainer, null);
						var closeElem = document.createElement("div");
						closeElem = _weUtil.applyCss(closeElem, _properties.closeButtonCss);
						closeElem.innerHTML = "x";
						_logMessageContainer.appendChild(closeElem);
						closeElem.onclick = function () {
							this.parentNode.parentNode.removeChild(this.parentNode);
						};
						var messageElem = document.createElement("div");
						messageElem = _weUtil.applyCss(messageElem, _properties.dataDivCss);
						_logMessageContainer.appendChild(messageElem);
						messageElem.innerHTML = message;
						var linksInMessage = messageElem.getElementsByTagName("a");
						if (linksInMessage && linksInMessage.length > 0) {
							for (var i = 0; i < linksInMessage.length; i++) {
								_weUtil.applyCss(linksInMessage[i], _properties.dataDivLinkCss);
								var currHref = linksInMessage[i].getAttribute("href");
								var arrHref = currHref.split("#");
								var newHref = arrHref[0];
								newHref = newHref.indexOf("?") < 0 ? (newHref + "?") : newHref;
								newHref = newHref + "&ref=widget-message";
								newHref = arrHref.length == 2 ? (newHref + "#" + arrHref[1]) : newHref;
								linksInMessage[i].setAttribute("href", newHref);
							}
						}
						webengage.eLog(null, type, message, message);
						setTimeout(function () {
							_logMessageContainer.remove();
						}, 5000);
						return _logMessageContainer;
					};
				return {
					success: function (message) {
						return _renderLogMessage(message, "success");
					},
					warn: function (message) {
						return _renderLogMessage(message, "warn");
					},
					error: function (message) {
						return _renderLogMessage(message, "error");
					}
				};
			})());

			_weUtil.extend("GEO", {
				country: function () {
					return this._country || '';
				},
				country_code: function () {
					return this._country_code || '';
				},
				region: function () {
					return this._region || '';
				},
				city: function () {
					return this._city || '';
				},
				latitude: function () {
					return this._latitude || '';
				},
				longitude: function () {
					return this._longitude || '';
				},
				serverTimeStamp:function () {
					return this._serverTimeStamp;
				},
				ip: function () {
					return this._ip || '';
				},
				setGeoData: function (data) {
					var that = this,
						_data = data || {};
					that._country = _data['geoplugin_countryName'] || '';
					that._country_code = _data['geoplugin_country_code'] || '';
					that._region = _data['geoplugin_region'] || '';
					that._city = _data['geoplugin_city'] || '';
					that._latitude = _data['geoplugin_latitude'] || '';
					that._longitude = _data['geoplugin_longitude'] || '';
					that._serverTimeStamp = _data['serverTimeStamp'];
					that._ip = _data['clientIp'];
					webengage.getUser().country = that._country;
					webengage.getUser().city = that._city;
					webengage.getUser().ip = that._ip;
				},
				isGeoLoaded: function() {
					return this._isLoaded ? this._isLoaded :  _weUtil.getSessionCookie().tsD ? true : false;
				},
				load: function (onSuccess, onFailure) {
					var that = this;
					if (!this.isGeoLoaded()) {
						var geoIpUrl = "//geoservice.webengage.com/geoip/?jsoncallback=" + encodeURI('webengage.GEO.setGeoData') + (_weq['webengage.aip'] === true ? '&aip=1' : '');
						_weUtil.loadScript.apply(_weProperties.widgetContainer, [geoIpUrl, function () {
							_weUtil.updateSessionCookieGeoData();
							that._isLoaded = true;
							if(typeof onSuccess === 'function') {
								onSuccess();
							}
						}, null, function () {
							if(typeof onFailure === 'function') {
								onFailure();
							}
						}]);
					} else {
						that._isLoaded = true;
						if(typeof onSuccess === 'function') {
							onSuccess();
						}
					}
				}
			});

			_weUtil.extend('BrowserDetect', (function () {
				var _browser, _version, _os, _dataBrowser = [{
						string: navigator.userAgent,
						subString: "Chrome",
						identity: "Chrome"
					}, {
						string: navigator.userAgent,
						subString: "OmniWeb",
						versionSearch: "OmniWeb/",
						identity: "OmniWeb"
					}, {
						string: navigator.vendor,
						subString: "Apple",
						identity: "Safari",
						versionSearch: "Version"
					}, {
						prop: window.opera,
						identity: "Opera"
					}, {
						string: navigator.vendor,
						subString: "iCab",
						identity: "iCab"
					}, {
						string: navigator.vendor,
						subString: "KDE",
						identity: "Konqueror"
					}, {
						string: navigator.userAgent,
						subString: "Firefox",
						identity: "Firefox"
					}, {
						string: navigator.vendor,
						subString: "Camino",
						identity: "Camino"
					}, { // for newer Netscapes (6+)
						string: navigator.userAgent,
						subString: "Netscape",
						identity: "Netscape"
					}, {
						string: navigator.userAgent,
						subString: "MSIE",
						identity: "Explorer",
						versionSearch: "MSIE"
					}, { // for IE11 and above
						string: navigator.userAgent,
						subString: "Windows,Trident",
						identity: "Explorer",
						versionSearch: "rv"
					}, {
						string: navigator.userAgent,
						subString: "Gecko",
						identity: "Mozilla",
						versionSearch: "rv"
					}, { // for older Netscapes (4-)
						string: navigator.userAgent,
						subString: "Mozilla",
						identity: "Netscape",
						versionSearch: "Mozilla"
					}],
					_dataOS = [{
						string: navigator.userAgent,
						subString: "iPhone",
						identity: "iOS"
					}, {
						string: navigator.userAgent,
						subString: "iPad",
						identity: "iOS"
					}, {
						string: navigator.userAgent,
						subString: "Android",
						identity: "Android"
					}, {
						string: navigator.userAgent,
						subString: "Windows Phone",
						identity: "Windows Phone"
					}, {
						string: navigator.platform,
						subString: "Win",
						identity: "Windows"
					}, {
						string: navigator.platform,
						subString: "Mac",
						identity: "Mac"
					}, {
						string: navigator.platform,
						subString: "Linux",
						identity: "Linux"
					}, {
						string: navigator.userAgent,
						subString: "Mobile",
						identity: "Mobile"
					}],
					_dataDevice = [{
						string: navigator.userAgent,
						subString: "iPhone",
						identity: "Mobile"
					}, {
						string: navigator.userAgent,
						subString: "iPod",
						identity: "Mobile"
					}, {
						string: navigator.userAgent,
						subString: "Android,Mobile",
						identity: "Mobile"
					}, {
						string: navigator.userAgent,
						subString: "Windows Phone",
						identity: "Mobile"
					}, {
						string: navigator.userAgent,
						subString: "BlackBerry,Mobile",
						identity: "Mobile"
					}, {
						string: navigator.userAgent,
						subString: "BB10,Mobile",
						identity: "Mobile"
					}, {
						string: navigator.userAgent,
						subString: "Android",
						identity: "Tablet"
					}, {
						string: navigator.userAgent,
						subString: "iPad",
						identity: "Tablet"
					}, {
						string: navigator.userAgent,
						subString: "Windows,Tablet",
						identity: "Tablet"
					}],
					_searchString = function (data) {
						for (var i = 0; i < data.length; i++) {
							var dataString = data[i].string;
							var dataProp = data[i].prop;
							this._versionSearchString = data[i].versionSearch || data[i].identity;
							if (dataString) {
								var subStrings = data[i].subString.split(',');
								var matchFound = false;
								for(var j=0; j < subStrings.length; j++) {
									if (dataString.indexOf(subStrings[j]) == -1) {matchFound = false; break;};
									matchFound = true;
								}
								if(matchFound) {
									return data[i].identity;
								}
							} else if (dataProp) return data[i].identity;
						}
					},
					_searchVersion = function (dataString) {
						var index = dataString.indexOf(this._versionSearchString);
						if (index == -1) return;
						var ver = parseFloat(dataString.substring(index + this._versionSearchString.length + 1));
						// In case of IE 8/9/10 is running in compatibility mode.
						// We are using 'Trident/(4/5/6)' token in the
						// userAgent to figure out the actual browser
						// version.
						if (_browser == 'Explorer' && 7.0 <= ver) {
							if (dataString.indexOf('Trident/4') != -1) {
								ver = 8.0;
							} else if (dataString.indexOf('Trident/5') != -1) {
								ver = 9.0;
							} else if (dataString.indexOf('Trident/6') != -1) {
								ver = 10.0;
							}
						}
						return ver;
					},
					_init = function () {
						if (_browser && _version && _os) {
							return;
						}
						_browser = _searchString(_dataBrowser) || "An unknown browser";
						_version = _searchVersion(navigator.userAgent) || _searchVersion(navigator.appVersion) || "an unknown version";
						_os = _searchString(_dataOS) || "an unknown OS";
						_device = _searchString(_dataDevice) || (_weUtil.isSmallScreen()  ? "Mobile" : "Desktop");
					};
				return {
					browser: function () {
						return _init() || _browser;
					},
					version: function () {
						return _init() || _version;
					},
					os: function () {
						return _init() || _os;
					},
					device: function () {
						return _init() || _device;
					},
					is_this_the_worlds_most_annoying_browser: function () {
						return (typeof document.all !== 'undefined' && !window.opera && !window.XMLHttpRequest);
					},
					ie: function () {
						return _init() || _browser == 'Explorer'; //(navigator.appName == 'Microsoft Internet Explorer')
					},
					isMobile: function () {
						var thisOs = this.os(), isMobile = false, osStrings=["iOS", "Android", "Windows Phone", "Mobile"];
						for (var i=0; i < osStrings.length; i++) {
							if (thisOs == osStrings[i]) {
								isMobile = true;
								break;
							}
						}
						return isMobile;
					}
				};
			})());

			var _instanceMethods = {
				onRun: function (fn) {
					return this.bind("run", fn);
				},
				onLoad: function (fn) {
					return this.bind("load", fn);
				},
				onOpen: function (fn) {
					return this.bind("open", fn);
				},
				onView : function (fn) {
					return this.bind("view", fn);
				},
				onSubmit: function (fn) {
					return this.bind("submit", fn);
				},
				onClick : function (fn) {
					return this.bind("click", fn);
				},
				onComplete: function (fn) {
					return this.bind("complete", fn);
				},
				onClose: function (fn) {
					return this.bind("close", fn);
				},
				onDump: function (fn) {
					return this.bind("dump", fn);
				},
				bind: function () {
					return _weUtil.bind.apply(this, arguments);
				},
				unbind: function () {
					return _weUtil.unbind.apply(this, arguments);
				},
				executeCallbacks: function () {
					return _weUtil.executeCallbacks.apply(this, arguments);
				}
			};




			/* -- DUMP API -- */
			_weUtil.extend("", (function () {
				var getBaseData = function() {
						var weCookieObj = _weUtil.getWebengageCookie(),
							sessionCookieObj = _weUtil.getSessionCookie(),
							_baseData = {
								license_code:_licenseCode,
								suid : sessionCookieObj['suid'], // Page view count in a session'
								luid : weCookieObj['luid'] // User Id
							},
							_systemData = {
								wv :_weUtil.getVersion(),
								tzo:(_widgetConfiguration.configurationMap.tzo || 0),
								ust : weCookieObj['time'] && !isNaN(weCookieObj['time']) ? new Date(parseInt(weCookieObj['time'], 10)) : null, // User Start Time
								lst : weCookieObj['lst'] && !isNaN(weCookieObj['lst'])? new Date(parseInt(weCookieObj['lst'], 10)) : null, // Last session time
								sc : weCookieObj['sc'], // Session count
								tpvc : weCookieObj['tpvc'], // Session count
								ref : sessionCookieObj['referrer'],
								sst : sessionCookieObj['sst'] && !isNaN(sessionCookieObj['sst']) ? new Date(parseInt(sessionCookieObj['sst'], 10)) : null, // Session Start Time
								pvcs : sessionCookieObj['pvc'], // Page view count in a session
								pageTitle : document.title,
								pageURL : window.location.href,
								viewportHeight : _weUtil.getWindowHeight(),
								viewportWidth : _weUtil.getWindowWidth(),
								ver : 2
							};
						if(sessionCookieObj['landingPage']) {_systemData['lp'] = sessionCookieObj['landingPage'];} // Landing Page
						_baseData['system_data'] = _systemData;
						return _baseData;
					},
					doXHR = function(uri, params, resHandler) {
						var url = "//c.webengage.com" + uri;
						try {
							if (webengage.BrowserDetect.ie()) {
								throw new Error("This browser does not support XMLHttpRequest.");
							}
							//throw new Error("This browser does not support XMLHttpRequest.");
							var _XMLHttpRequest = window.XMLHttpRequest;
							if (typeof _XMLHttpRequest === "undefined") {
								_XMLHttpRequest = function () {
									try { return new ActiveXObject("Msxml2.XMLHTTP.6.0"); }
									catch (e) {}
									try { return new ActiveXObject("Msxml2.XMLHTTP.3.0"); }
									catch (e) {}
									try { return new ActiveXObject("Microsoft.XMLHTTP"); }
									catch (e) {}
									throw new Error("This browser does not support XMLHttpRequest.");
								};
							}
							var req = new _XMLHttpRequest();
							var reqType = params ? "POST" : "GET";
							req.open(reqType, url, true);
							req.onreadystatechange = function() {
								if (req.readyState == 4){
									if (req.status == 200){
										if(resHandler && typeof resHandler === 'function') {
											resHandler();
										}
									}
								}
							};
							//Send the proper header information along with the request
							//req.setRequestHeader('User-Agent','XMLHTTP/1.0');
							req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							var paramsStr = Object.keys(params).map(function(key){
								return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
							}).join('&');
							req.send(paramsStr);
						} catch (e) {
							try {
								// Add the iframe with a unique name
								var iframe = document.createElement("iframe");
								var uniqueString = "WE_XHR_POST_IFRM";
								document.body.appendChild(iframe);
								iframe.style.display = "none";
								iframe.contentWindow.name = uniqueString;
								// construct a form with hidden inputs, targeting the iframe
								var form = document.createElement("form");
								form.target = uniqueString;
								form.action = url;
								form.method = "POST";
								for(var key in params) {
									var input = document.createElement("input");
									input.type = "hidden";
									input.name = key;
									input.value = params[key];
									form.appendChild(input);
								}
								document.body.appendChild(form);
								form.submit();
								iframe.onload = function(){
									if (iframe.parentNode) {
										iframe.parentNode.removeChild(iframe);
									}
								};
							}catch(e) {}
						}
					}
					;
				return {
					dump : function(eventName, eventData, systemData) {
						var _data = getBaseData();
						_data['system_data'] = _weUtil.copy(_data['system_data'] || {}, systemData || {}, true);
						_data['event_data'] = _weUtil.copy({}, (eventData || {}), true);
						_data['category'] = systemData ? "system" : "application";
						_data['event_name'] = (eventName || "unknown");
						if (_weq['webengage.aip'] === true) {
							_data['system_data']['aip'] = 1;
						}
						_data = _weUtil.transitConvert(_data);
						var _dataString = _weUtil.stringify(_data);
						_dataString = webengage.LZString.compressToBase64(_dataString);
						doXHR('/l3.jpg', {data:_dataString});
					}
				};
			})());
			/* -- DUMP API Ends -- */



			/* -- Feedback API -- */
			_weUtil.extend("feedback", (function () {
				var _feedbackInstances = [];
				return {
					cbid : 1, // cbid is used for the attachEventListners
					getMobileLoadingDiv : function(id) {
						var loadingDiv = document.createElement("div");
						loadingDiv.id = id || _weProperties.widgetContainerId + "-loading";
						loadingDiv = webengage.util.applyCss(loadingDiv, {
							"position" : "fixed",
							"left" : (webengage.util.getWindowWidth() * .05) + "px",
							"width" : (webengage.util.getWindowWidth() * .9)+ "px",
							"opacity" : "1",
							"background" : "#f9f9f9",
							"color" : "#666",
							"z-index": webengage.util.getMaxZIndex(),
							"textAlign":"center",
							"padding-top" : "20px",
							"padding-bottom" : "20px",
							"fontFamily":"Arial, sans-serif",
							"fontSize":"10px",
							"display" : "none"
						});
						return loadingDiv;
					},
					getLoadingDiv : function (id) {
						var loadingDiv = document.createElement("div");
						loadingDiv.id = id || _weProperties.widgetContainerId + "-loading";
						loadingDiv = webengage.util.applyCss(loadingDiv, {
							"fontFamily":"Arial, sans-serif",
							"fontSize":"10px",
							"color":"#666",
							"textDecoration":"none",
							"position":"absolute",
							"textAlign":"center"
						});
						return loadingDiv;
					},
					getLightBoxBaseDiv : function () {
						var feedbackBaseDiv = document.createElement("div");
						webengage.util.applyCss(feedbackBaseDiv, {
							"display": "block",
							"margin" : "0",
							"padding" : "0",
							"z-index": webengage.util.getMaxZIndex(),
							"position": "absolute",
							"overflow" : "hidden",
							"top": "0",
							"left": "0",
							"height": document.body["scrollHeight"] + "px",
							"width": "100%",
							"background-color": "rgba(0, 0, 0, .85)"
						});
						feedbackBaseDiv.id = _weProperties.widgetContainerId + "-base";
						return feedbackBaseDiv;
					},
					getLightBoxContainerDiv : function () {
						var lightboxcontainer = document.createElement("div");
						webengage.util.applyCss(lightboxcontainer, {
							"display": "block",
							"top":"0",
							"left":"0",
							"width":"100%",
							"height": webengage.util.getWindowHeight() + "px",
							"position":"absolute",
							"outline" : "none !important",
							"-webkit-backface-visibility":"hidden",
							"margin" : "0",
							"padding" : "0",
							"z-index": webengage.util.getMaxZIndex(),
							"-webkit-overflow-scrolling" : "touch"
						});
						lightboxcontainer.setAttribute("tabIndex", -1);
						lightboxcontainer.id = _weProperties.widgetContainerId + "-light-box-container";
						var ligntboxContaierContent = document.createElement("div");
						webengage.util.applyCss(ligntboxContaierContent, {
							"display": "block",
							"text-align":"center",
							"position":"absolute",
							"width":"100%",
							"height": "100%",
							"left":"0",
							"top":"0",
							"outline" : "none !important",
							"-webkit-box-sizing":"border-box",
							"-moz-box-sizing":"border-box",
							"box-sizing":"border-box",
							"padding":"0 8px",
							"margin" : "0",
							"overflow-y" : "auto",
							"overflow-x" : "hidden"
						});
						ligntboxContaierContent.id = _weProperties.widgetContainerId + "-light-box-content";
						lightboxcontainer.appendChild(ligntboxContaierContent);
						return lightboxcontainer;
					},
					render: function (feedbackOptions) {
						return webengage.withELog(function () {
							return (new function () {
								webengage.feedback.clear();
								var currentInstance = this;
								currentInstance.cbid = 1;
								_feedbackInstances[_feedbackInstances.length] = currentInstance;
								// Adding abort to instance
								currentInstance.abort = function() {
									_weUtil.abortInstance(this);
								};

								currentInstance._feedbackOptions = {
									launchType: _weq['webengage.feedback.launchType'] || '',
									externalLinkId: _weq['webengage.feedback.externalLinkId'] || '',
									alignment: _weq['webengage.feedback.alignment'] || '',
									borderColor: _weq['webengage.feedback.borderColor'] || '',
									backgroundColor: _weq['webengage.feedback.backgroundColor'] || '',
									snapshotEnabled: _weq['webengage.feedback.snapshotEnabled'] || '',
									defaultCategory: _weq['webengage.feedback.defaultCategory'] || '',
									showAllCategories: (typeof _weq['webengage.feedback.showAllCategories'] === 'boolean' && !_weq['webengage.feedback.showAllCategories'])? false : true,
									showForm: _weq['webengage.feedback.showForm'] || false,
									isDemoMode: _weq['webengage.feedback.isDemoMode'] || _weq['webengage.isDemoMode'] || false,
									customData: _weq['webengage.feedback.customData'] || _weq['webengage.customData'] || {},
									formData: _weq['webengage.feedback.formData'] || _weq['webengage.formData'] || [],
									enableCallbacks: _weq['webengage.feedback.enableCallbacks'] || _weq['webengage.enableCallbacks'] || false,
									language: _weq['webengage.language'] || ''
								};

								// providing back support for the old
								// feedbackOptions
								// first checking if user has sent formData field in
								// 'data' json if yes then populating them in
								// formData
								if (feedbackOptions !== undefined && feedbackOptions.data !== undefined && feedbackOptions.data) {
									var data = feedbackOptions.data;
									if (data.name !== undefined && data.name) {
										currentInstance._feedbackOptions.formData.push({
											'name': 'name',
											'value': data.name
										});
									}
									if (data.email !== undefined && data.email) {
										currentInstance._feedbackOptions.formData.push({
											'name': 'email',
											'value': data.email
										});
									}
									if (data.category !== undefined && data.category) {
										currentInstance._feedbackOptions.formData.push({
											'name': 'category',
											'value': data.category
										});
									}
								}

								var feedbckOptionsTransform = {
									'feedbackLaunchType': 'launchType',
									'feedbackExternalLinkId': 'externalLinkId',
									'feedbackButtonAlignment': 'alignment',
									'feedbackButtonBorderColor': 'borderColor',
									'feedbackButtonBackgroundColor': 'backgroundColor',
									'defaultFeedbackCategory': 'defaultCategory',
									'showAllFeedbackCategories': 'showAllCategories',
									'showFeedbackForm': 'showForm',
									'data': 'customData',
									'demo': 'isDemoMode'
								};

								// TODO - transform default-category and
								// showAllCategory to from-data element if someone
								// has specified
								if (feedbackOptions !== undefined && !_weUtil.isEmptyObject(feedbackOptions)) {
									for (var feedbackOption in feedbackOptions) {
										var transformName = feedbckOptionsTransform[feedbackOption];
										if (transformName !== undefined && transformName) {
											feedbackOptions[transformName] = feedbackOptions[feedbackOption];
											delete feedbackOptions[feedbackOption];
										}
									}
								}

								// making sure custom/rule data in _weq is not overWritten by feedbackoptions custom/rule data
								if (feedbackOptions && feedbackOptions.customData) {
									currentInstance._feedbackOptions.customData = _weUtil.copy(currentInstance._feedbackOptions.customData, feedbackOptions.customData, true);
									delete feedbackOptions['customData'];
								}
								if (feedbackOptions && feedbackOptions.ruleData) {
									currentInstance._feedbackOptions.ruleData = _weUtil.copy(currentInstance._feedbackOptions.ruleData, feedbackOptions.ruleData, true);
									delete feedbackOptions['ruleData'];
								}

								// Overriding the _feedbackOptions object with the
								// feedbackOptions argument passed to render method
								currentInstance._feedbackOptions = _weUtil.copy(currentInstance._feedbackOptions, (feedbackOptions ? feedbackOptions : {}), true);
								currentInstance.enableCallbacks = (typeof currentInstance._feedbackOptions.enableCallbacks === 'boolean' ? currentInstance._feedbackOptions.enableCallbacks : false);

								// Assigning _instanceMethods methods to the current
								// instance
								_weUtil.copy(currentInstance, _instanceMethods, true);
								// Binding event callbacks passed through API
								currentInstance.onLoad((currentInstance._feedbackOptions.onLoad || _weq['webengage.feedback.onLoad']));
								currentInstance.onSubmit((currentInstance._feedbackOptions.onSubmit || _weq['webengage.feedback.onSubmit']));
								currentInstance.onClose((currentInstance._feedbackOptions.onClose || _weq['webengage.feedback.onClose']));
								currentInstance.onOpen((currentInstance._feedbackOptions.onOpen || _weq['webengage.feedback.onOpen']));
								// Binding evetn callbacks attached using attachEventListner
								_weUtil.attachEventListners('feedback', currentInstance);
								var isM = (webengage.BrowserDetect.isMobile() || _weUtil.isSmallScreen());
								var showMobile = ((typeof (_widgetConfiguration.feedback.config.showMobile) == 'undefined') ?  true:  _widgetConfiguration.feedback.config.showMobile);
								if ((_widgetConfiguration.feedback && (_widgetConfiguration.feedback.isEnabled || currentInstance._feedbackOptions.isDemoMode) && (document.location.protocol == 'http:' || (document.location.protocol == 'https:' && _widgetConfiguration.sslEnabled)) && !_widgetConfiguration.isFQuotaOver) && ((isM && showMobile) || !isM)) {
									var _feedbackConfigDto = _widgetConfiguration.feedback.config,
										_properties = {
											alignment: ["right", "left"],
											launchTypes: ["feedbackButton", "externalLink"],
											containerCss: {
												"margin": 0,
												"padding": 0,
												"position": (webengage.BrowserDetect.is_this_the_worlds_most_annoying_browser() ? "absolute" : "fixed"),
												"border": "5px solid #ccc",
												"backgroundColor": "#f9f9f9",
												"borderWidth": "1px",
												"borderStyle": "solid"
											},
											containerRightCss: {
												"right": "0px",
												"borderRightWidth": "0px"
											},
											containerLeftCss: {
												"left": "0px",
												"borderLeftWidth": "0px"
											},
											commonCss: {
												"margin": 0,
												"padding": 0,
												"cursor": "pointer",
												"backgroundColor": "transparent",
												"backgroundRepeat": "no-repeat",
												"backgroundPosition": "center 0",
												"display": "block",
												"paddingBottom": "7px",
												"paddingLeft": "3px",
												"paddingRight": "3px",
												"paddingTop": "7px"
											},
											tabCssWithIcon: {
												"backgroundPosition": "center bottom",
												"paddingBottom": "33px"
											},
											closeCommonCss: {
												"height": "22px",
												"width": "22px",
												"cursor": "pointer",
												"backgroundRepeat": "no-repeat",
												"backgroundPosition": "0 0",
												"position": "absolute",
												"top": "-14px",
												"backgroundImage": "url('" + _weProperties.baseStaticUrl + "/images/icons/feedback-widget-close.png" + "')",
												"backgroundColor": "transparent",
												"display": "none"
											},
											leftCloseCss: {
												"right": "-14px"
											},
											rightCloseCss: {
												"left": "-14px"
											},
											feedbackBgImageForDarkBackground: _weProperties.baseStaticUrl + "/images/webengage/icons/feedback-tab-bg-dark.png",
											feedbackBgImageForLightBackground: _weProperties.baseStaticUrl + "/images/webengage/icons/feedback-tab-bg-light.png",
											feedbackTextImage: _weProperties.feedbackImageBaseUrl + _feedbackConfigDto.imgPath,
											sizeCss: {
												"height": _feedbackConfigDto.imgHeight + "px",
												"width": _feedbackConfigDto.imgWidth + "px"
											},
											leftCss: {
												"cssFloat": "right",
												"styleFloat": "right"
											},
											rightCss: {
												"cssFloat": "left",
												"styleFloat": "left"
											},
											loadingCss: {
												"fontFamily": "Arial, sans-serif",
												"fontSize": "10px",
												"color": "#666",
												"textDecoration": "none",
												"position": "absolute",
												"textAlign": "center"
											},
											maxWidth: "450px",
											maxHeight: (webengage.BrowserDetect.ie() ? "349px" : "345px")
										},
										_feedbackUtil = {
											getButtonCssBasedOnConfig: function (buttonAlignment, showWEIcon) {
												var finalCss = {};
												finalCss = _weUtil.copy(finalCss, _properties.sizeCss);
												if (buttonAlignment == "left") {
													finalCss = _weUtil.copy(finalCss, _properties.leftCss);
												} else {
													finalCss = _weUtil.copy(finalCss, _properties.rightCss);
												}
												if (showWEIcon) {
													finalCss = _weUtil.copy(finalCss, _properties.tabCssWithIcon);
												}
												return finalCss;
											},
											getContainerCssBasedOnConfig: function (buttonAlignment) {
												var finalCss = {};
												finalCss = _weUtil.copy(finalCss, _properties.containerCss);
												if (buttonAlignment == "right") {
													finalCss = _weUtil.copy(finalCss, _properties.containerRightCss);
												} else {
													finalCss = _weUtil.copy(finalCss, _properties.containerLeftCss);
												}
												return finalCss;
											},
											getCloseCssBasedOnConfig: function (buttonAlignment) {
												var finalCss = {};
												if (buttonAlignment == "right") {
													finalCss = _weUtil.copy(finalCss, _properties.rightCloseCss);
												} else {
													finalCss = _weUtil.copy(finalCss, _properties.leftCloseCss);
												}
												return finalCss;
											},
											getButtonCssBasedOnBackgroundColor: function (buttonBackgroundColor) {
												var finalCss = {};
												if (_weUtil.isColorTooLight(buttonBackgroundColor)) {
													finalCss = _weUtil.copy(finalCss, {
														backgroundImage: ("url('" + _properties.feedbackBgImageForLightBackground + "')")
													});
												} else {
													finalCss = _weUtil.copy(finalCss, {
														backgroundImage: ("url('" + _properties.feedbackBgImageForDarkBackground + "')")
													});
												}
												return finalCss;
											},
											getCustomTextImageCss: function () {
												var finalCss = {};
												finalCss = _weUtil.copy(finalCss, {
													backgroundImage: ("url('" + _properties.feedbackTextImage + "')")
												});
												return finalCss;
											}
										},
										_feedbackCloseImage = (_feedbackConfigDto.closeImg === undefined || _feedbackConfigDto.closeImg === null || _feedbackConfigDto.closeImg === '') ? (_weProperties.baseStaticUrl + "/images/icons/feedback-widget-close.png") : ('//s3-ap-southeast-1.amazonaws.com/' + _feedbackConfigDto.closeImg),
										buttonAlignment = _weUtil.getInitParamValue(currentInstance._feedbackOptions, "alignment", _feedbackConfigDto.alignment, _properties.alignment),
										launchTypes = _weUtil.getInitParamValueAsArray(currentInstance._feedbackOptions, "launchType", _feedbackConfigDto.launchType, _properties.launchTypes),
										externalLinkIds = _weUtil.getInitParamValueAsArray(currentInstance._feedbackOptions, "externalLinkId", _feedbackConfigDto.externalLinkId),
										buttonBackgroundColor = _weUtil.getInitParamValue(currentInstance._feedbackOptions, "backgroundColor", _feedbackConfigDto.backgroundColor),
										buttonBorderColor = _weUtil.getInitParamValue(currentInstance._feedbackOptions, "borderColor", _feedbackConfigDto.borderColor),
										snapshotEnabled = _weUtil.getInitParamValue(currentInstance._feedbackOptions, "snapshotEnabled", ((_feedbackConfigDto.snapshotEnabled === undefined) ? true : _feedbackConfigDto.snapshotEnabled)),
										showFeedbackButton = _weUtil.inArray(launchTypes, _properties.launchTypes[0]),
										minWidth = _feedbackConfigDto.imgWidth,
										minHeight = _feedbackConfigDto.imgHeight,
										showWebEngageIconInFeedbackTab = _feedbackConfigDto.showWeIcon;

									buttonBackgroundColor = buttonBackgroundColor.indexOf("#") === 0 ? buttonBackgroundColor : ("#" + buttonBackgroundColor);
									buttonBorderColor = buttonBorderColor.indexOf("#") === 0 ? buttonBorderColor : ("#" + buttonBorderColor);

									var fixedFrameContainer = document.createElement('div');
									_weProperties.widgetContainer.appendChild(fixedFrameContainer);
									fixedFrameContainer.setAttribute('id', _weProperties.widgetContainerId + '-content');

									var ffcStyle = fixedFrameContainer.style;
									ffcStyle.borderColor = buttonBorderColor;
									fixedFrameContainer = _weUtil.applyCss(fixedFrameContainer, _properties.containerCss);
									fixedFrameContainer = _weUtil.applyCss(fixedFrameContainer, _feedbackUtil.getContainerCssBasedOnConfig(buttonAlignment));
									var mobileTab = _weq['webengage.feedback.tab'] || 'bubble';
									if ((mobileTab === 'bubble') && (webengage.BrowserDetect.isMobile() || _weUtil.isSmallScreen())) {

										var docToScreenRatio = document.body.clientWidth / window.screen.availWidth;

										ffcStyle.background = 'transparent';
										ffcStyle.border = "0px";
										if (docToScreenRatio > 2) {
											ffcStyle.width = "130px";
											ffcStyle.height = "130px";
											ffcStyle.bottom = '30px';
											if(buttonAlignment === "right"){
												ffcStyle.right = '30px';
											}else{
												ffcStyle.left = '30px';
											}
										}else{
											ffcStyle.width = "58px";
											ffcStyle.height = "58px";
											ffcStyle.bottom = '15px';
											if(buttonAlignment === "right"){
												ffcStyle.right = '15px';
											}else{
												ffcStyle.left = '15px';
											}
										}
										ffcStyle.boxSizing = "border-box";
									} else {
										fixedFrameContainer.style.width = (parseInt(minWidth) + 3 + 3) + "px";
										var completeFeedbackTabHeight = (parseInt(minHeight) + 7 + 7 + (showWebEngageIconInFeedbackTab ? (3 + 26) : 0)) + "px";
										ffcStyle.top = (("innerHeight" in window ? window.innerHeight : document.documentElement.clientHeight) - parseInt(minHeight)) / 2 + "px";
									}
									ffcStyle.zIndex = (_weUtil.getMaxZIndex() + 1);

									var closeContainer = document.createElement("div");
									fixedFrameContainer.appendChild(closeContainer);
									closeContainer.id = _weProperties.widgetContainerId + "-close-div";
									closeContainer = _weUtil.applyCss(closeContainer, _properties.closeCommonCss);
									closeContainer = _weUtil.applyCss(closeContainer, _feedbackUtil.getCloseCssBasedOnConfig(buttonAlignment));
									closeContainer.style.backgroundImage = "url('" + _feedbackCloseImage + "')";
									if (webengage.BrowserDetect.is_this_the_worlds_most_annoying_browser()) {
										closeContainer.style.backgroundImage = "";
										closeContainer.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod=crop src='" + _feedbackCloseImage + "')";
									}

									var expandCollapse = document.createElement('div');
									fixedFrameContainer.appendChild(expandCollapse);
									expandCollapse.setAttribute("id", _weProperties.widgetContainerId + "-content-expand-collapse");
									var ecStyle = expandCollapse.style;
									expandCollapse = _weUtil.applyCss(expandCollapse, _properties.commonCss);
									expandCollapse = _weUtil.applyCss(expandCollapse, _feedbackUtil.getButtonCssBasedOnConfig(buttonAlignment, showWebEngageIconInFeedbackTab));
									if ((mobileTab === 'bubble') && (webengage.BrowserDetect.isMobile() || _weUtil.isSmallScreen())) {


										mobileTabSVGStyle = (docToScreenRatio > 2) ? 'viewBox="0 0 80 80" style="padding:15px 20px;"' : 'viewBox="0 0 180 180" style="padding:7px;"';

										var svgImg = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" width="40px" height="40px" '+mobileTabSVGStyle+' version="1.1">'+
											'<title>180 - iPhone 6 Plus</title>'+
											'<desc>Created with Sketch.</desc>'+
											'<defs/>'+
											'<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">'+
											'<g id="180---iPhone-6-Plus" sketch:type="MSArtboardGroup" fill="#1A1918">'+
											'<g id="Imported-Layers" sketch:type="MSLayerGroup" transform="translate(11.000000, 17.000000)">'+
											'<path d="M137.853,52.283 C135.333462,22.50325 102.805731,0.973875 65.1838846,4.134375 C27.5620385,7.319375 -0.917307692,34.012125 1.57776923,63.76125 C3.29619231,84.2065 19.1839615,100.7685 41.1687692,108.100125 C38.7042692,115.156125 34.185,122.518375 26.1555,129.24975 C26.1555,129.24975 55.5582692,128.2575 72.8892692,111.934375 C73.3418077,111.90375 73.7882308,111.916 74.253,111.87925 C111.880962,108.71875 140.348077,82.032125 137.853,52.283" id="Fill-1" sketch:type="MSShapeGroup"/>'+
											'<path d="M157.373308,102.74075 C158.296731,90.993 152.621654,79.98025 143.136692,72.415875 C135.266192,96.10125 111.434538,114.457875 81.4875,119.308875 C88.5874615,127.932875 99.7235769,134.015 112.596462,135.20325 C118.491692,135.74225 124.172885,135.20325 129.407654,133.77 C139.400192,139.307 151.312962,145.19925 151.312962,145.19925 C147.215654,141.42625 143.864423,131.8835 142.213269,127.89 C150.799269,122.01 156.578308,113.12875 157.373308,102.74075" id="Fill-2" sketch:type="MSShapeGroup"/>'+
											'</g></g></g></svg>';
										// do nothing

										expandCollapse.innerHTML = svgImg;
										ecStyle.height = "100%";
										ecStyle.width = "100%";

										ecStyle.borderRadius = "75px";
										ecStyle.background= "#fff";
										ecStyle.border= "1px solid #ccc";
										ecStyle.mozBoxShadow = "1px 1px 8px #888888";
										ecStyle.webkitBoxShadow = "1px 1px 8px #888888";
										ecStyle.boxShadow = "1px 1px 8px #888888";
										ecStyle.padding = "0";
										ecStyle.boxSizing = "border-box";
										if (docToScreenRatio > 2) {
											ecStyle.fontSize = (docToScreenRatio * 13) + 'px';
											ecStyle.lineHeight = "1.5em";
										}else{
											ecStyle.textAlign = "center";
										}
									} else {
										expandCollapse = _weUtil.applyCss(expandCollapse, _feedbackUtil.getButtonCssBasedOnBackgroundColor(buttonBackgroundColor));
										if (webengage.BrowserDetect.is_this_the_worlds_most_annoying_browser()) {
											ecStyle.backgroundImage = "";
											var bgImagePath = (_weUtil.isColorTooLight(buttonBackgroundColor) ? _properties.feedbackBgImageForLightBackground : _properties.feedbackBgImageForDarkBackground);
											ecStyle.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod=crop src='" + bgImagePath + "')";
										}
										ecStyle.backgroundColor = buttonBackgroundColor;
									}

									ecStyle.zIndex = _weUtil.getMaxZIndex() + 1;
									if (!showFeedbackButton) {
										fixedFrameContainer.style.display = 'none';
									}

									var customTextImageTab = document.createElement('div');
									expandCollapse.appendChild(customTextImageTab);
									customTextImageTab.style.margin = "0px";
									customTextImageTab.style.padding = "0px";

									if ((mobileTab === 'bubble') && (webengage.BrowserDetect.isMobile() || _weUtil.isSmallScreen())) {
										customTextImageTab.style.width = "20%";
										customTextImageTab.style.width = "20%";
										if (webengage.BrowserDetect.is_this_the_worlds_most_annoying_browser()) {
											customTextImageTab.style.backgroundImage = "";
											ecStyle.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod=crop src='" + _properties.feedbackTextImage + "')";
										}
									} else {
										customTextImageTab.style.width = parseInt(minWidth) + "px";
										customTextImageTab.style.height = parseInt(minHeight) + "px";
										customTextImageTab = _weUtil.applyCss(customTextImageTab, _feedbackUtil.getCustomTextImageCss());
										if (webengage.BrowserDetect.is_this_the_worlds_most_annoying_browser()) {
											customTextImageTab.style.backgroundImage = "";
											ecStyle.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod=crop src='" + _properties.feedbackTextImage + "')";
										}
									}

									closeContainer.style.zIndex = _weUtil.getMaxZIndex() + 1;

									currentInstance.close = function () {
										try {
											fixedFrameContainer.removeChild(document.getElementById(_weProperties.widgetContainerId + "-loading"));
										} catch (e) {}
										try {
											fixedFrameContainer.removeChild(document.getElementById(_weProperties.widgetContainerId + "-content"));
										} catch (e) {}
										try {
											document.getElementById(_weProperties.widgetContainerId + "-content-expand-collapse").isCurrentlyOpen = false;
										} catch (e) {}
										closeContainer.style.display = "none";
										fixedFrameContainer.style.width = (parseInt(minWidth) + 3 + 3) + "px";
										if (!showFeedbackButton) {
											expandCollapse.style.display = 'none';
										}
										// currentInstance.executeCallbacks("close");
									};

									closeContainer.onclick = function () {
										webengage.withELog(function () {
											currentInstance.close();
										});
									};

									function _open() {
										if (_weq['webengage.feedback.custom']) {
											fixedFrameContainer.style.display = 'block';
											fixedFrameContainer.style.border = 'none';
											fixedFrameContainer.style['background-color'] = 'transparent';
											fixedFrameContainer.style.position = 'static';
											fixedFrameContainer.style.overflow = 'visible';
											fixedFrameContainer.style.width= '0px';
											fixedFrameContainer.style.height= '0px';
										} else if (webengage.BrowserDetect.isMobile() || _weUtil.isSmallScreen()) {
											fixedFrameContainer.style.display = 'block';
											var feedbackBaseDiv = webengage.feedback.getLightBoxBaseDiv();
											// in case of mobile appeding div in the webengagedata tag
											_weProperties.weDataContainer.appendChild(feedbackBaseDiv);
											var feedbackContainerDiv = webengage.feedback.getLightBoxContainerDiv();
											_weProperties.weDataContainer.appendChild(feedbackContainerDiv);
											var loadingDiv = webengage.feedback.getMobileLoadingDiv();
											loadingDiv.innerHTML = "Loading<br/>please wait ...";
											_weProperties.weDataContainer.appendChild(loadingDiv);
											var loadingDivHeight = webengage.util.getElementHeight(loadingDiv);
											var windowHeight = webengage.util.getWindowHeight();
											loadingDiv.style.top = (windowHeight - loadingDivHeight) / 2 + "px";
											loadingDiv.style.display = "block";
										} else {
											fixedFrameContainer.style.display = 'block';
											fixedFrameContainer.style.width = "300px";
											var loadingDiv = webengage.feedback.getLoadingDiv();
											loadingDiv = _weUtil.applyCss(loadingDiv, _properties.loadingCss);
											loadingDiv.innerHTML = "Loading<br/>please wait ...";
											fixedFrameContainer.appendChild(loadingDiv);
											_weUtil.alignCenter(loadingDiv, fixedFrameContainer, buttonAlignment);
											closeContainer.style.display = "block";
										}
										currentInstance.feedbackLoadStartTime = new Date();
										var widgetScriptUrl = _weProperties.widgetDomain
											+ (webengage.BrowserDetect.is_this_the_worlds_most_annoying_browser() ? _weProperties.loadFeedbackWidgetUrlv3 : _weProperties.loadFeedbackWidgetUrl);
										webengage.feedbackLoadStartTime = new Date();
										_weUtil.withWeJquery(function () {
											var widgetScript = document.createElement("script");
											widgetScript.type = "text/javascript";
											widgetScript.src = widgetScriptUrl;
											_weProperties.widgetContainer.appendChild(widgetScript);
										});
									};

									expandCollapse.onclick = function () {
										webengage.withELog(function () {
											_open();
										});
									};

									if (externalLinkIds && externalLinkIds.length > 0) {
										(function () {
											for (var t = 0; t < externalLinkIds.length; t++) {
												var externalLinkId = externalLinkIds[t];
												var theExtLink = document.getElementById(externalLinkId);
												if (theExtLink) {
													theExtLink.onclick = function (evt) {
														var e = evt || window.event;
														e.cancelBubble = true;
														if (e.stopPropagation) {
															e.stopPropagation();
														}
														if (e.preventDefault) {
															e.preventDefault();
														} else {
															e.returnValue = false;
														}
														expandCollapse.onclick();
														return false;
													};
												}
											}
										})();
									}

									document.$FeedbackWidgetInitializer = {
										containerId: _weProperties.widgetContainerId,
										licenseCode: _licenseCode,
										appHost: _weProperties.feedbackAppHost,
										minWidth: (parseInt(minWidth) + 3 + 3) + "px",
										maxWidth: _properties.maxWidth,
										minHeight: completeFeedbackTabHeight,
										maxHeight: _properties.maxHeight,
										showFeedbackButton: showFeedbackButton,
										buttonAlignment: buttonAlignment,
										borderColor: buttonBorderColor.substring(1),
										snapshotEnabled: snapshotEnabled,
										currentInstance: currentInstance,
										mobileLBEnabled: (webengage.BrowserDetect.isMobile() || _weUtil.isSmallScreen()),
										widgetLanguage: currentInstance._feedbackOptions.language
									};

									if (currentInstance._feedbackOptions.showForm == true) {
										expandCollapse.onclick();
									}
								} else {
									if (_widgetConfiguration.feedback && _widgetConfiguration.feedback.isEnabled && document.location.protocol == 'https:' && !_widgetConfiguration.sslEnabled) {
										/*
										 * webengage.logger.error("The WebEngage
										 * widget is turned off for SSL encrypted
										 * page on this site. " + "Please go to <a
										 * href='http://webengage.com/'
										 * target='_new'>WebEngage.com</a> to
										 * upgrade.");
										 */
										webengage.eLog(null, 'error', 'Feedback - Widget turned off for SSL encrypted page', 'Feedback - Widget turned off for SSL encrypted page');
									}
								}
							});
						});
					},
					clear: function () {
						webengage.withELog(function () {
							try {
								_weProperties.widgetContainer.removeChild(document.getElementById(_weProperties.widgetContainerId + '-content'));
							} catch (e) {}
							_feedbackInstances = [];
							document.$FeedbackWidgetInitializer = null;
						});
					},
					abort: function () {
						_weUtil.abortAllInstances(_feedbackInstances);
					},
					attachEventListner : function () {
						var that = this, _arguments = arguments;
						webengage.withELog(function () {
							_weUtil.bind.apply(that, _arguments);
							if(_feedbackInstances.length > 0 ) {
								for(var i = 0; i < _feedbackInstances.length; i++) {
									_feedbackInstances[i].enableCallbacks = true;
									_weUtil.bind.apply(_feedbackInstances[i], _arguments);
								}
							}
						});
					}
				};
			})()); /* -- Feedback API ends -- */


			/* -- RuleExecuter Object -- */

			_weUtil.extend("ruleExecutor.constants", {
				SEARCH_ENGINE_REGEXP: {
					google: {
						pattern: "^(?:http(s)?://)?(www\\.)?google\\..*/.*$",
						queryParam: "q"
					},
					yahoo: {
						pattern: "^(?:http(s)?://)?(?:([a-z]{2})\\.)?search\\.yahoo\\.com/.*$",
						queryParam: "p"
					},
					bing: {
						pattern: "^(?:http(s)?://)?((?:www|[a-z]{2})\\.)?bing\\.com/search\\?.*$",
						queryParam: "q"
					},
					ask: {
						pattern: "^(?:http(s)?://)?www\\.ask\\.com/.*$",
						queryParam: "q"
					},
					baidu: {
						pattern: "^(?:http(s)?://)?www\\.baidu\\.com/.*$",
						queryParam: "wd"
					},
					yandex: {
						pattern: "^(?:http(s)?://)?www\\.yandex\\.com/.*$",
						queryParam: "text"
					},
					duckduckgo: {
						pattern: "^(?:http(s)?://)?www\\.duckduckgo\\.com/.*$",
						queryParam: "q"
					}
				},
				SOCIAL_MEDIA_REGEX: "^(?:http(s)?://)?(.*.)?(facebook|twitter|t|pinterest)\\.(com|co)/.*$",
				XPATH_PLUGIN_FILE: "//d3701cc9l7v9a6.cloudfront.net/js/jquery/wgxpath.install.js"
			});

			// On Error make sure the callback is called, irrespective, so that the execution of other notifications/survey do not stop
			_weUtil.extend("ruleExecutor.dependencies", {
				XPATH: function(data, onSuccess, onError) {
					webengage.XPATH.util.loadXPath(onSuccess, onError);
				},
				GEO: function(data, onSuccess, onError) {
					webengage.GEO.load(onSuccess, onError);
				}
			});

			_weUtil.extend("XPATH.util", (function(){
				return {
					loadXPath : function(onSuccess, onError) {
						if ((webengage.BrowserDetect.browser() === "Explorer") && (!document.evaluate)) {
							var xPathUrl = "//d3701cc9l7v9a6.cloudfront.net/js/jquery/wgxpath.install.js";
							_weUtil.loadScript.apply(_weProperties.widgetContainer, [xPathUrl,
								function() {
									wgxpath.install();
									if (typeof onSuccess === 'function') {
										onSuccess();
									}
								}, null, function() {
									if (typeof onError === 'function') {
										onError(); // failed case
									}
								}]);
						} else {
							if (typeof onSuccess === 'function') {
								onSuccess();
							}
						}
					},
					isXpathLoaded : function() {
						return (document.evaluate ? true : false);
					},
					getXPathElement :  function (query) {
						var result = null;
						if (query && query.indexOf('|') > -1) {
							var queryParts = query.split('|');
							query = queryParts[0] + '/@' + queryParts[1];
						}
						try {
							xpathResult = document.evaluate(query, document, null,
								XPathResult.FIRST_ORDERED_NODE_TYPE, null);
							result = (xpathResult && xpathResult.singleNodeValue && webengage.util.isElementExists(xpathResult.singleNodeValue)) ? xpathResult.singleNodeValue : null;
						} catch (e) {}
						return  result;
					},
					evaluateXPathQuery :  function(query) {
						var element = webengage.XPATH.util.getXPathElement(query);
						if (element) {
							return element.textContent;
						} else {
							return null;
						}
					}
				}
			})());

			_weUtil.extend("ruleExecutor.dependency.util", {
				xPathExists: function() {
					if (webengage.XPATH.util.isXpathLoaded()) {
						return true;
					} else {
						var errObj = {};
						errObj['type'] = 'XPATH';
						throw errObj;
					}
				},
				geoDataExists: function() {
					if (webengage.GEO.isGeoLoaded()) {
						return true;
					} else {
						var errObj = {};
						errObj['type'] = 'GEO';
						throw errObj;
					}
				}
			});

			_weUtil.extend("ruleExecutor.util", (function (_constants) {
				return {
					isMatches: function (valuesToMatch, regExpsToMatchWith) {
						if (valuesToMatch) {
							if (valuesToMatch instanceof Array) {
								for (var i = 0; i < valuesToMatch.length; i++) {
									if (webengage.ruleExecutor.util.isMatches(valuesToMatch[i], regExpsToMatchWith)) {
										return true;
									}
								}
							} else {
								if (regExpsToMatchWith instanceof Array) {
									for (var k = 0; k < regExpsToMatchWith.length; k++) {
										if (valuesToMatch.match(new RegExp(regExpsToMatchWith[k], 'mgi'))) {
											return true;
										}
									}
								} else if (valuesToMatch.match(new RegExp(regExpsToMatchWith, 'mgi'))) {
									return true;
								}
							}
						}
						return false;
					},
					getCurrentTimeInSec: function (timeInMiliSecs) {
						var now = new Date(timeInMiliSecs);
						var hour = now.getHours();
						var minute = now.getMinutes();
						var second = now.getSeconds();
						return (hour * 60 * 60 + minute * 60 + second);
					},
					getClientTime: function () {
						var timeInMiliSecs = _weUtil.getCurrentTime();
						return webengage.ruleExecutor.util.getCurrentTimeInSec(timeInMiliSecs);
					},
					getClientDayOfWeek: function () {
						return _weUtil.getCurrentWeekDay();
					},
					getPublisherTime: function () {
						var timeInMiliSecs = _weUtil.getCurrentTime(_weProperties.publisherTimeZoneOffset);
						return webengage.ruleExecutor.util.getCurrentTimeInSec(timeInMiliSecs);
					},
					isContainsSearchTerms: function (fnToGetValuesToMatchWith, valuesToMatch) {
						var result = false;
						if(typeof fnToGetValuesToMatchWith !== 'function' || !valuesToMatch || !(valuesToMatch instanceof Array) || valuesToMatch.length <=0) {
							return false;
						}
						var _valuesToMatchWith = fnToGetValuesToMatchWith();
						if(typeof _valuesToMatchWith !== undefined && _valuesToMatchWith) {
							for(var i=0; i<valuesToMatch.length; i++) {
								result = webengage.ruleExecutor.util.isContains(_valuesToMatchWith, webengage.ruleExecutor.util.jsTokenizer(valuesToMatch[i], ' '), 'contains_all');
								if(typeof result === 'boolean' && result) {
									break;
								}
							}
						}
						return result;
					},
					isContains: function (valuesToMatchWith, valuesToMatch, operator) {
						var _valuesToMatchWith = valuesToMatchWith;
						if (typeof (valuesToMatchWith) === 'function') {
							_valuesToMatchWith = valuesToMatchWith();
						}
						var _isContainsFlag = false;
						var _operator = operator || 'contains_any';

						if (_valuesToMatchWith !== undefined && _valuesToMatchWith) {
							var map = [];
							if (_valuesToMatchWith instanceof Array) {
								for (var i=0; i < _valuesToMatchWith.length; i++) {
									map[_valuesToMatchWith[i].toLowerCase()] = true;
								}
							} else {
								map[_valuesToMatchWith] = true;
							}
							if (valuesToMatch !== undefined && valuesToMatch) {
								if (valuesToMatch instanceof Array) {
									if (_operator == 'contains_all') {
										for (var j=0; j < valuesToMatch.length; j++) {
											if (map[valuesToMatch[j].toLowerCase()] == true) {
												_isContainsFlag = true;
												continue;
											}
											_isContainsFlag = false;
											break;
										}
									} else {
										for (var k=0; k < valuesToMatch.length; k++) {
											if (map[valuesToMatch[k].toLowerCase()] == true) {
												_isContainsFlag = true;
												break;
											}
										}
									}
								} else {
									_isContainsFlag = map[valuesToMatch.toLowerCase()] == true;
								}
							}
						}
						return _isContainsFlag;
					},
					getReferrers: function () {
						var referrerUrls = [];
						if(document.referrer) {
							referrerUrls[referrerUrls.length] = document.referrer.toLowerCase();
						}
						var sessionCookieVal = _weUtil.getSessionCookie();
						if (sessionCookieVal && sessionCookieVal.referrer  && (!document.referrer || sessionCookieVal.referrer != document.referrer)) {
							referrerUrls[referrerUrls.length] = sessionCookieVal.referrer.toLowerCase();
						}
						return referrerUrls;
					},
					getCountry: function () {
						if (webengage.ruleExecutor.dependency.util.geoDataExists()) {
							return _weUtil.getSessionCookie().country || null;
						}
					},
					getRegion: function () {
						if (webengage.ruleExecutor.dependency.util.geoDataExists()) {
							return _weUtil.getSessionCookie().region || null;
						}
					},
					getCity: function () {
						if (webengage.ruleExecutor.dependency.util.geoDataExists()) {
							return _weUtil.getSessionCookie().city || null;
						}
					},
					getSearchEngineMatchResult: function () {
						var referrer = webengage.ruleExecutor.util.getReferrers();
						var matchedResult = {
							isSER: false
						};
						for (var key in _constants.SEARCH_ENGINE_REGEXP) {
							for(var i=0; i < referrer.length ; i++) {
								if (webengage.ruleExecutor.util.isMatches(referrer[i], _constants.SEARCH_ENGINE_REGEXP[key].pattern) != false) {
									matchedResult.isSER = true;
									matchedResult.url = referrer[i];
									matchedResult.queryParam = _constants.SEARCH_ENGINE_REGEXP[key].queryParam;
									break;
								}
							}
							if(matchedResult.isSER === true) {
								break;
							}
						}
						return matchedResult;
					},
					isSearchEngineReference: function () {
						return (webengage.ruleExecutor.util.getSearchEngineMatchResult()).isSER;
					},
					isSocialMediaReference: function () {
						return webengage.ruleExecutor.util.isMatches(webengage.ruleExecutor.util.getReferrers(), _constants.SOCIAL_MEDIA_REGEX);
					},
					isFirstTime: function () {
						var sessionCookieVal = _weUtil.getSessionCookie();
						return (sessionCookieVal && (typeof sessionCookieVal.isFirstTime === 'boolean' && sessionCookieVal.isFirstTime)) ? true : false;
					},
					getSearchTerms: function () {
						var searchTerms = null;
						var matchedResult = webengage.ruleExecutor.util.getSearchEngineMatchResult();
						if (matchedResult.isSER) {
							var paramVal = decodeURI(webengage.ruleExecutor.util.getParamValue(matchedResult.url, matchedResult.queryParam));
							if(paramVal) {
								searchTerms = webengage.ruleExecutor.util.jsTokenizer(paramVal, ' ');
							}
						}
						return searchTerms;
					},
					jsTokenizer: function (value, delimiters) {
						var tokens = [];
						if (value !== undefined && value) {
							var _delimiters = _weUtil.escapeForRegExp(',\r\n');
							if (delimiters !== undefined && delimiters) {
								if (delimiters instanceof Array) {
									_delimiters = _weUtil.escapeForRegExp(delimiters.join(''));
								} else {
									_delimiters = _weUtil.escapeForRegExp(delimiters);
								}
							}
							value = value.replace(new RegExp("[" + _delimiters + "]", "g"), "\n");
							var arr = value.split(/\n/g);
							for (var i = 0; i < arr.length; i++) {
								if (arr[i] != "") {
									tokens[tokens.length] = arr[i];
								}
							}
						}
						return tokens;
					},
					getParamValue: function (url, paramName) {
						var paramValue = '';
						var regex = new RegExp("[\\?&]" + paramName + "=([^&#]*)");
						var qs = regex.exec(url);
						if (qs !== null) {
							paramValue = qs[1];
						}
						return paramValue;
					},
					escapeForRegExp: function (text) {
						return _weUtil.escapeForRegExp(text);
					},
					getTotalPageView : function(){
						var sessionCookieVal = _weUtil.getSessionCookie();
						return (sessionCookieVal && sessionCookieVal.pvc) ? sessionCookieVal.pvc : 1;
					},
					sampling: function(entityId) {
						var _entityId = this.entityId || entityId;
						if(_entityId) {
							var longTermWebEngageCookie = _weUtil.getWebengageCookie()
								, samplingHash = _weUtil.getHashCode(_entityId+longTermWebEngageCookie.luid);
							return Math.abs(samplingHash % 100);
						}
						return 0;
					},
					getSessionCookieReferer: function() {
						var sessionCookieVal = _weUtil.getSessionCookie();
						var referrer = sessionCookieVal.referrer;
						if(!referrer){
							return null;
						}
						return referrer;
					},
					getXpathStringResult : function(query) {
						if (webengage.ruleExecutor.dependency.util.xPathExists()) {
							return webengage.XPATH.util.evaluateXPathQuery(query);
						}
					},
					getXpathIntegerResult : function(query) {
						if (webengage.ruleExecutor.dependency.util.xPathExists()) {
							var value = webengage.XPATH.util.evaluateXPathQuery(query);
							if (value) {
								return parseFloat(value);
							} else {
								return null;
							}
						}
					},
					loadDependency: function (dependType, data, onSuccess, onError) {
						var dependentFunc = webengage.ruleExecutor.dependencies[dependType];
						if (dependentFunc && (typeof dependentFunc === 'function')) {
							dependentFunc(data, onSuccess, onError);
						} else {
							if (onError && typeof onError == 'function') {
								onError();
							}
						}
					}
				};
			})(webengage.ruleExecutor.constants));

			_weUtil.extend("ruleExecutor", (function (_ruleUtil, _constants) {
				var _operands = {};
				var _loadOperands = function() {
					_operands = {
						referer: _ruleUtil.getReferrers,
						url: _weUtil.getClientPageUrl(),
						cookie: function (x) { return _weUtil.getCookie(x, true); },
						country: _ruleUtil.getCountry,
						region: _ruleUtil.getRegion,
						city: _ruleUtil.getCity,
						time: '',
						isFirstTime: _ruleUtil.isFirstTime,
						isSER: _ruleUtil.isSearchEngineReference,
						isSMR: _ruleUtil.isSocialMediaReference,
						searchTerms: _ruleUtil.getSearchTerms,
						os: webengage.BrowserDetect.os,
						device: webengage.BrowserDetect.device,
						browser: webengage.BrowserDetect.browser,
						browser_version: webengage.BrowserDetect.version,
						endUserTime: _ruleUtil.getClientTime,
						publisherTime: _ruleUtil.getPublisherTime,
						totalPageView: _ruleUtil.getTotalPageView,
						sampling: _ruleUtil.sampling,
						contentXPathString : _ruleUtil.getXpathStringResult,
						contentXPathInteger : _ruleUtil.getXpathIntegerResult,
						contentXPathNode: _ruleUtil.getXpathStringResult,
						isDirectVisitor: _ruleUtil.getSessionCookieReferer,
						dayOfWeek: _ruleUtil.getClientDayOfWeek
					};
					var newOperands = {};
					for(var key in _operands) {
						if (_operands.hasOwnProperty(key)) {
							newOperands["we_wk_"+key] = _operands[key];
						}
					}
					_weUtil.copy(_operands, newOperands);
				};
				_loadOperands();

				return {
					execute: function (entityId, executableRuleCode, operands) {
						var _localOperands = _weUtil.copy({}, _operands);
						_localOperands = _weUtil.copy(_localOperands, (operands ? operands : {}), true);
						_localOperands.entityId = entityId;
						executableRuleCode = (executableRuleCode !== undefined) ? executableRuleCode : true;
						return (new Function('_weUtil', '_ruleUtil', '_constants', 'operands','return (' + executableRuleCode + ');')(_weUtil, _ruleUtil, _constants, _localOperands));
					},
					loadOperands : function(){
						_loadOperands();
					}
				};
			})(webengage.ruleExecutor.util, webengage.ruleExecutor.constants));

			/* -- RuleExecuter Object Ends -- */


			/* -- Survey API -- */
			_weUtil.extend("survey", (function () {
				var _surveyInstances = [],
					_runSurvey = function (surveyEId, showOnExit) {
						if (surveyEId !== undefined && surveyEId) {
							var currentInstance = this,
								surveyConfigDto = _widgetConfiguration.survey.config,
								theme = surveyConfigDto.theme || '',
								width = "320px",
								height = "1px",
								surveyContainer = document.createElement('div');
							if(currentInstance._surveyOptions.width) {
								var _width = parseInt(currentInstance._surveyOptions.width, 10);
								if(!isNaN(_width)) {
									width = _width+"px";
								}
							}
							currentInstance.height = height;
							currentInstance.width = width;
							currentInstance.surveyConfigDto = surveyConfigDto;
							currentInstance.theme = theme;
							currentInstance.surveyEId = surveyEId;
							currentInstance._weProperties = _weProperties;
							currentInstance.showOnExit = (typeof showOnExit === 'boolean' ? showOnExit : false);
							currentInstance.isMobileSurvey = (typeof isMobileSurvey == 'boolean' ? isMobileSurvey : false);
							var _scopeObjForSurvey = currentInstance._surveyOptions.scope[surveyEId] || currentInstance._surveyOptions.scope['all'] || null;
							if(_scopeObjForSurvey) {
								currentInstance.scope = (_scopeObjForSurvey.scope ? _scopeObjForSurvey.scope : "");
								currentInstance.scopeType = (_scopeObjForSurvey.scopeType ? _scopeObjForSurvey.scopeType : "");
							}

							_weProperties.widgetContainer.appendChild(surveyContainer);
							surveyContainer.setAttribute('id', _weProperties.widgetContainerId + '-survey-content');

							document.$SurveyWidgetInitializer = {
								currentInstance: currentInstance,
								containerId: _weProperties.widgetContainerId,
								licenseCode: _licenseCode,
								appHost: _weProperties.surveyAppHost,
								width:parseInt(width, 10)
							};
							var widgetScriptSrc = _weProperties.widgetDomain + (webengage.BrowserDetect.is_this_the_worlds_most_annoying_browser() ? _weProperties.loadSurveyWidgetUrlv3 : _weProperties.loadSurveyWidgetUrl(currentInstance.layoutAttributes['id']));
							_weUtil.withWeJquery(function () {
								var widgetScript = document.createElement("script");
								widgetScript.type = "text/javascript";
								widgetScript.src = widgetScriptSrc;
								_weProperties.widgetContainer.appendChild(widgetScript);
							});
						};
					},
					_prepareSurveyIdScopeMap = function (scopeObj, eScopeType, scopeMapToPopulate) {
						if(scopeObj !== undefined && scopeObj) {
							if(typeof scopeObj === 'object') {
								if(scopeObj instanceof Array) {
									for(var i=0; i < scopeObj.length; i++) {
										_prepareSurveyIdScopeMap(scopeObj[i], eScopeType, scopeMapToPopulate);
									}
								} else {
									var scope = scopeObj['scope'];
									if(scope) {
										var surveyIds = scopeObj['surveyIds'];
										if(surveyIds !== undefined && surveyIds instanceof Array && surveyIds.length > 0) {
											for(j = 0; j< surveyIds.length ; j++) {
												scopeMapToPopulate[surveyIds[j]] = {'scope':scope, 'scopeType': (scopeObj['scopeType'] || "")};
											}
										} else {
											scopeMapToPopulate['all'] = {'scope':scope, 'scopeType':(scopeObj['scopeType'] || "")};
										}
									}
								}
							} else {
								scopeMapToPopulate['all'] = {'scope':scopeObj, 'scopeType':(eScopeType || "")};
							}
						}
					},
					_surveyExecutor = function (surveyOrderedList, surveyRuleMap, currentInstance) {
						if (surveyOrderedList && surveyOrderedList.length > 0) {
							var _surveyOrderedList = (new Array()).concat(surveyOrderedList);
							var key = _surveyOrderedList[0],
								sessionCookie = _weUtil.getSessionCookie(),
								webEngageCookie = _weUtil.getWebengageCookie(),
								topLevelAlignment = _weUtil.getInitParamValue(currentInstance._surveyOptions, "alignment", _widgetConfiguration.survey.config.alignment, ['left', 'right']),
								surveyEncId = key,
								ruleCode = surveyRuleMap[surveyEncId].ruleCode,
								layoutAttributes = _weUtil.copy({}, surveyRuleMap[surveyEncId]['la']),
								startTimestamp = surveyRuleMap[surveyEncId].startTimestamp,
								endTimestamp = surveyRuleMap[surveyEncId].endTimestamp,
								showOnExit = (!currentInstance._surveyOptions.skipRules && typeof surveyRuleMap[surveyEncId].showOnExit === 'boolean') ? surveyRuleMap[surveyEncId].showOnExit : false,
								totalTimespent = ((currentInstance._surveyOptions.skipRules || showOnExit) ? 0 : (surveyRuleMap[surveyEncId].totalTimeOnSite ? surveyRuleMap[surveyEncId].totalTimeOnSite - ((new Date()).getTime() - (sessionCookie.sst || 0)) : 0)),
								timespent = ((currentInstance._surveyOptions.skipRules || showOnExit) ? 0 : ((parseInt(currentInstance._surveyOptions.delay,10) >= 0) ? parseInt(currentInstance._surveyOptions.delay,10):  Math.max(totalTimespent, surveyRuleMap[surveyEncId].timeSpent))),
								maxTimesPerUser = surveyRuleMap[surveyEncId].maxTimesPerUser,
								scopeObj = currentInstance._surveyOptions.scope[surveyEncId] || currentInstance._surveyOptions.scope['all'] || null,
								scopedSurveyEncIdVal = surveyEncId + (scopeObj && scopeObj.scope && (scopeObj.scopeType+'').toUpperCase() != 'GLOBAL' ? '[' + _weUtil.escapeScopeChars(scopeObj.scope) +']':''),
								regexpEscapedScopedSurveyEncIdVal = _weUtil.escapeForRegExp(scopedSurveyEncIdVal),
								isMobileSurvey =  surveyRuleMap[surveyEncId].mobile,
								sampling =  surveyRuleMap[surveyEncId].sampling || 100;
							if (!currentInstance._surveyOptions.isDemoMode) {

								// finding if survey is only mobile-specific
								// and device is mobile as well
								if (typeof isMobileSurvey !== 'undefined' && isMobileSurvey && !webengage.BrowserDetect.isMobile()) {
									surveyOrderedList.splice(0,1);
									return _surveyExecutor(surveyOrderedList, surveyRuleMap, currentInstance);
								}

								// Finding out if this survey has
								// already been taken or closed by
								// the user. If no then its a
								// valid survey to execute.
								if (!currentInstance._surveyOptions.forcedRender
									&& (
										(sessionCookie && sessionCookie.closedSurveys !== undefined && (sessionCookie.closedSurveys.match('##' + regexpEscapedScopedSurveyEncIdVal+'##') || sessionCookie.closedSurveys.match('##' + regexpEscapedScopedSurveyEncIdVal+'$')))
										|| (webEngageCookie && webEngageCookie.takenSurveys !== undefined && (webEngageCookie.takenSurveys.match('##' +regexpEscapedScopedSurveyEncIdVal+'##') || webEngageCookie.takenSurveys.match('##' +regexpEscapedScopedSurveyEncIdVal+'$')))
									)) {

									_surveyOrderedList.splice(0, 1);
									return _surveyExecutor(_surveyOrderedList, surveyRuleMap, currentInstance);
								}

								// Finding the totalTimes shown of
								// the notification
								var totalTimesShown = webengage.util.getTotalTimesShown(surveyEncId, "survey");
								if (!currentInstance._surveyOptions.forcedRender && maxTimesPerUser !== undefined) {
									if (maxTimesPerUser <= totalTimesShown) {
										_surveyOrderedList.splice(0, 1);
										return _surveyExecutor(_surveyOrderedList, surveyRuleMap, currentInstance);
									}
								}

								var surveyData = {'timeSpent' : timespent, "showOnExit" : showOnExit, "maxTimesPerUser":maxTimesPerUser, 'startTimestamp': startTimestamp, 'endTimestamp': endTimestamp, 'ruleCode' : ruleCode, 'layoutAttributes' : layoutAttributes, 'sampling' : sampling };
								_ruleExecution(surveyEncId, surveyData, currentInstance, function () {
									_surveyOrderedList.splice(0, 1);
									return _surveyExecutor(_surveyOrderedList, surveyRuleMap, currentInstance);
								});
							} else {
								var surveyData = {'timeSpent' : timespent, "showOnExit" : showOnExit, "maxTimesPerUser":maxTimesPerUser, 'startTimestamp': startTimestamp, 'endTimestamp': endTimestamp, 'ruleCode' : ruleCode, 'layoutAttributes' : layoutAttributes, 'sampling' : sampling };
								if (!currentInstance.surveysToExecuteData) {
									currentInstance.surveysToExecuteData = {};
								}
								currentInstance.surveysToExecuteData[surveyEncId] = surveyData;

								_surveyOrderedList.splice(0, 1);
								return _surveyExecutor(_surveyOrderedList, surveyRuleMap, currentInstance);
							}
						} else if (currentInstance.surveysToExecuteData) {
							var minTimespentVal = null;
							var surveyIdsToExecuteClient = [];
							for (var key in currentInstance.surveysToExecuteData) {
								var surveyEId = key;
								surveyIdsToExecuteClient[surveyIdsToExecuteClient.length] = surveyEId;
								minTimespentVal = ((minTimespentVal == null || minTimespentVal > currentInstance.surveysToExecuteData[surveyEId]['timeSpent']) ? currentInstance.surveysToExecuteData[surveyEId]['timeSpent'] : minTimespentVal);
							}
							var dependencyRunTime = currentInstance.startExecutionTime ? (new Date()).getTime() - currentInstance.startExecutionTime : 0;
							currentInstance.totalTimeElapsed =  currentInstance.totalTimeElapsed + dependencyRunTime;
							currentInstance.minTimespentVal = (minTimespentVal - dependencyRunTime < 0) ? 0 : minTimespentVal - dependencyRunTime;
							return _preRunSurveyCheck(surveyIdsToExecuteClient, currentInstance.surveysToExecuteData, currentInstance);
						}
					},
					_ruleExecution = function(surveyEncId, surveyData, currentInstance, callback) {
						try {
							if (surveyData.startTimestamp || surveyData.endTimestamp) {
								if (webengage.ruleExecutor.dependency.util.geoDataExists()) {
									var servertimestamp = _weUtil.getServerTimeStamp(),
										startTimestamp = surveyData.startTimestamp,
										endTimestamp = surveyData.endTimestamp;
									if (endTimestamp < servertimestamp || servertimestamp < startTimestamp) {
										return callback();
									}
								}
							}

							if ((currentInstance._surveyOptions.skipRules) || (!surveyData.ruleCode) || (webengage.ruleExecutor.execute(surveyEncId, surveyData.ruleCode, currentInstance._surveyOptions.ruleData))) {
								if (!currentInstance.surveysToExecuteData) {
									currentInstance.surveysToExecuteData = {};
								}
								currentInstance.surveysToExecuteData[surveyEncId] = surveyData;
							}
							return callback();
						} catch(err) {
							if (err && err['type']) {
								webengage.ruleExecutor.util.loadDependency(err['type'], surveyData,
									function() {
										_ruleExecution(surveyEncId, surveyData, currentInstance, callback);
									}, callback);
							} else {
								webengage.eLog(err);
								callback();
							}
						}
					},
					_runSurveyWrapper = function (surveyIdToExecute, surveyTimeSpent, showOnExit, maxTimesPerUser, currentInstance) {
						totlatTimeElapsed = 0
						timespent = 0;
						if(!showOnExit) {
							if (arguments && arguments[0]) {
								timespent = surveyTimeSpent || 0;
							}

							// Overiding the surveyTimeSpent
							// mentioned while
							// building the rules by the
							// time delay passed through
							// survey API
							//if (parseInt(currentInstance._surveyOptions.delay, 10) >= 0) {
							//	timespent = parseInt(currentInstance._surveyOptions.delay, 10);
							//}
							totlatTimeElapsed = currentInstance.totalTimeElapsed + currentInstance.minTimespentVal;
						}
						webengage.setTimeout(function () {

							_runSurvey.apply(currentInstance, [surveyIdToExecute, showOnExit]);
						}, ((timespent - totlatTimeElapsed) < 0 ? 0 : (timespent - totlatTimeElapsed)));
					},
					_sampleOutTheSurveyToRun = function(surveysToExecute, surveyTimeSpentMap) {
						var currentInstance = this;
						for(var i = 0; i < surveysToExecute.length; i++) {
							var surveyEId = surveysToExecute[i];
							var _sampling = surveyTimeSpentMap[surveyEId].sampling || 100;
							var _BSampling = webengage.ruleExecutor.util.sampling(surveyEId);
							if(_sampling >= _BSampling) {
								return surveyEId;
							} else {
								webengage.util.markEntityAsShown(surveyEId, "survey", currentInstance, true);
								webengage.setTimeout(function () {
									currentInstance.dump('abs_view', {id : surveyEId});
								}, 10);
							}
						}
					},
					_preRunSurveyCheck = function (surveyIdsToExecuteClient, surveyTimeSpentMap, currentInstance) {
						webengage.setTimeout(function () {
							if (!currentInstance._surveyOptions.forcedRender) {
								var arr = [];
								for (var u = 0; u < surveyIdsToExecuteClient.length; u++) {
									if (u > 0) {
										arr[arr.length] = "&";
									}
									arr[arr.length] = 'surveyIds=' + surveyIdsToExecuteClient[u];
								}
								var findAllTakenSurveysUrl = _weProperties.findAllTakenSurveysUrl()
									+ '&' + arr.join('')
									+ ( currentInstance._surveyOptions.scope ? '&scope=' + encodeURIComponent(_weUtil.stringify(currentInstance._surveyOptions.scope)) : "" );
								_weUtil.loadScript.apply(_weProperties.widgetContainer, [findAllTakenSurveysUrl, function (surveyTimeSpentMap, surveyIdsToExecuteClient, totalTimeElapsed) {
									var surveysToExecute = [],
										surveysNotToExecuteObj = {};
									if (typeof we_notToExecuteSurveyIdsMap != 'undefined') {
										if (we_notToExecuteSurveyIdsMap.takenSurveyIds !== undefined && we_notToExecuteSurveyIdsMap.takenSurveyIds.length > 0) {
											// Marking all the surveys already took by the user as taken in the long term cookie
											for (var p = 0; p < we_notToExecuteSurveyIdsMap.takenSurveyIds.length; p++) {
												var _scopeObjForSurvey = currentInstance._surveyOptions.scope[we_notToExecuteSurveyIdsMap.takenSurveyIds[p]] || currentInstance._surveyOptions.scope['all'] || null;
												var scope = (_scopeObjForSurvey && _scopeObjForSurvey.scope ? _scopeObjForSurvey.scope : "");
												var scopeType = (_scopeObjForSurvey && _scopeObjForSurvey.scopeType ? _scopeObjForSurvey.scopeType : "");
												surveysNotToExecuteObj[we_notToExecuteSurveyIdsMap.takenSurveyIds[p]] = true;
												_weUtil.markSurveyAsTaken((we_notToExecuteSurveyIdsMap.takenSurveyIds[p]+(scope && (scopeType+'').toUpperCase() != 'GLOBAL' ? '[' + _weUtil.escapeScopeChars(scope) +']':'')));
											}
										}
										// Collection of all inactive
										// surveys
										if (we_notToExecuteSurveyIdsMap.inactiveSurveyIds !== undefined && we_notToExecuteSurveyIdsMap.inactiveSurveyIds.length > 0) {
											for (var z = 0; z < we_notToExecuteSurveyIdsMap.inactiveSurveyIds.length; z++) {
												surveysNotToExecuteObj[we_notToExecuteSurveyIdsMap.inactiveSurveyIds[z]] = true;
											}
										}
									}

									// Iterating through client list
									// to find out all the surveys
									// which can be execute
									for (var t = 0; t < surveyIdsToExecuteClient.length; t++) {
										if (!surveysNotToExecuteObj[surveyIdsToExecuteClient[t]]) {
											surveysToExecute[surveysToExecute.length] = surveyIdsToExecuteClient[t];
										}
									}

									if (surveysToExecute.length > 0) {
										// Run the first survey in
										// surveysToExecute list

										var surveyEId = _sampleOutTheSurveyToRun.apply(currentInstance, [surveysToExecute, surveyTimeSpentMap]);
										if(surveyEId) {
											currentInstance.layoutAttributes = surveyTimeSpentMap[surveyEId]['layoutAttributes'];
											_runSurveyWrapper(surveyEId, (surveyTimeSpentMap[surveyEId]['timeSpent'] || 0), surveyTimeSpentMap[surveyEId]['showOnExit'], surveyTimeSpentMap[surveyEId]['maxTimesPerUser'], currentInstance);
										}
									}
								}, [surveyTimeSpentMap, surveyIdsToExecuteClient, currentInstance.totalTimeElapsed]]);
							} else {
								// Run the first survey in
								// surveyIdsToExecuteClient list
								var surveyEId = _sampleOutTheSurveyToRun.apply(currentInstance, [surveyIdsToExecuteClient, surveyTimeSpentMap]);
								currentInstance.layoutAttributes = surveyTimeSpentMap[surveyEId]['layoutAttributes'];
								_runSurveyWrapper(surveyEId, (surveyTimeSpentMap[surveyEId]['timespent'] || 0), surveyTimeSpentMap[surveyEId]['showOnExit'], surveyTimeSpentMap[surveyEId]['maxTimesPerUser'], currentInstance);
							}}, currentInstance.minTimespentVal);
					};
				return {
					cbid : 1, // cbid is used for the attachEventListners
					render: function (surveyOptions) {
						return webengage.withELog(function () {
							return (new function () {
								webengage.survey.clear();
								var currentInstance = this;
								currentInstance.cbid = 1;
								_surveyInstances[_surveyInstances.length] = currentInstance;
								//Adding abort to instance
								currentInstance.abort = function() {
									_weUtil.abortInstance(this);
								};
								var _surveyOptions = {
									surveyId: _weq['webengage.survey.surveyId'] || '',
									skipRules: _weq['webengage.survey.skipRules'] || false,
									forcedRender: _weq['webengage.survey.forcedRender'] || false,
									delay: _weq['webengage.survey.delay'] || -1,
									customData: _weUtil.copy({}, _weq['webengage.survey.customData'] || _weq['webengage.customData'] || {}),
									ruleData: _weUtil.copy({}, _weq['webengage.survey.ruleData'] || _weq['webengage.ruleData'] || {}),
									isDemoMode: _weq['webengage.survey.isDemoMode'] || _weq['webengage.isDemoMode'] || false,
									alignment: _weq['webengage.survey.alignment'] || "",
									scope: _weq['webengage.survey.scope'] || _weq['webengage.scope']|| "",
									scopeType:_weq['webengage.survey.scopeType'] || _weq['webengage.scopeType']|| "",
									enableCallbacks: _weq['webengage.survey.enableCallbacks'] || _weq['webengage.enableCallbacks'] || false,
									width: _weq['webengage.survey.width']
								};
								// providing back support for the old surveyOptions
								var surveyOptionsTransform = {
									'showAllClosedAndTakenSurveys': 'forcedRender',
									'data': 'customData',
									'demo': 'isDemoMode'
								};

								if (surveyOptions !== undefined && !_weUtil.isEmptyObject(surveyOptions)) {
									for (var surveyOption in surveyOptions) {
										var transformName = surveyOptionsTransform[surveyOption];
										if (transformName !== undefined && transformName) {
											surveyOptions[transformName] = surveyOptions[surveyOption];
											delete surveyOptions[surveyOption];
										}
									}
								}
								// making sure custom/rule data in _weq is not overWritten by surveyoptions custom/rule data
								if (surveyOptions && surveyOptions.customData) {
									_surveyOptions.customData = _weUtil.copy(_surveyOptions.customData, surveyOptions.customData, true);
									delete surveyOptions['customData'];
								}
								if (surveyOptions && surveyOptions.ruleData) {
									_surveyOptions.ruleData = _weUtil.copy(_surveyOptions.ruleData, surveyOptions.ruleData, true);
									delete surveyOptions['ruleData'];
								}

								currentInstance._surveyOptions = _weUtil.copy(_surveyOptions, (surveyOptions ? surveyOptions : {}), true);
								// Overriding the scope value if the forcedRender flag is set tot true
								currentInstance._surveyOptions.forcedRender = typeof currentInstance._surveyOptions.forcedRender === 'boolean' ? currentInstance._surveyOptions.forcedRender : false;
								if(currentInstance._surveyOptions.forcedRender) {
									currentInstance._surveyOptions.scope = (new Date()).getTime();
									currentInstance._surveyOptions.scopeType = "session";
								}
								var _surveyIdScopeMap = {};
								_prepareSurveyIdScopeMap(currentInstance._surveyOptions.scope, currentInstance._surveyOptions.scopeType, _surveyIdScopeMap);
								currentInstance._surveyOptions.scope = _surveyIdScopeMap || "";
								currentInstance.enableCallbacks = (typeof currentInstance._surveyOptions.enableCallbacks === 'boolean' ? currentInstance._surveyOptions.enableCallbacks : false);
								if (_widgetConfiguration.survey && (_widgetConfiguration.survey.isEnabled || currentInstance._surveyOptions.isDemoMode)  && !_weUtil.isEmptyObject(_widgetConfiguration.survey.ruleMap) && (document.location.protocol == 'http:' || (document.location.protocol == 'https:' && _widgetConfiguration.sslEnabled)) && !_widgetConfiguration.isSRQuotaOver) {
									// Assigning util to the current instance
									_weUtil.copy(currentInstance, _instanceMethods, true);
									// Binding event callbacks passed through API
									currentInstance.onLoad((currentInstance._surveyOptions.onLoad || _weq['webengage.survey.onLoad']));
									currentInstance.onSubmit((currentInstance._surveyOptions.onSubmit || _weq['webengage.survey.onSubmit']));
									currentInstance.onClose((currentInstance._surveyOptions.onClose || _weq['webengage.survey.onClose']));
									currentInstance.onOpen((currentInstance._surveyOptions.onOpen || _weq['webengage.survey.onOpen']));
									currentInstance.onComplete((currentInstance._surveyOptions.onComplete || _weq['webengage.survey.onComplete']));
									// Dump instance method to dump data when event occur
									currentInstance.dump = function(dumpEvent, dumpData) {
										var _currentInstance = this;
										var _systemData = {
											id : _currentInstance.surveyEId,
											layoutId : _currentInstance.layout
										}, _eventData = {};
										_weUtil.copy(_systemData, (dumpData || {}), true);

										_systemData['tvc'] = _weUtil.getTotalTimesShown(_systemData.id, 'survey', false, (dumpEvent === 'abs_view' ? true : false));
										_systemData['tvcs'] = _weUtil.getTotalTimesShown(_systemData.id, 'survey', true, (dumpEvent === 'abs_view' ? true : false));
										//if(!_weUtil.isEmptyObject(_currentInstance.layoutAttributes)) _systemData['layoutAttrs'] = _currentInstance.layoutAttributes;
										//if(_currentInstance.theme) _systemData['theme'] = _currentInstance.theme;
										if(_currentInstance.showOnExit) _systemData['showOnExit'] = _currentInstance.showOnExit;
										//if(!_weUtil.isEmptyObject(_currentInstance._surveyOptions.tokens)) _dumpData['tokens'] = _weUtil.copy({}, _currentInstance._surveyOptions.tokens);
										if(!_weUtil.isEmptyObject(_currentInstance._surveyOptions.ruleData)) {
											_systemData['ruleData'] = _currentInstance._surveyOptions.ruleData;
										}
										if(!_weUtil.isEmptyObject(_currentInstance._surveyOptions.customData)) {
											_eventData = _currentInstance._surveyOptions.customData;
										}
										this.executeCallbacks("dump", _systemData, dumpEvent);
										webengage.dump('survey_'+dumpEvent, _eventData, _systemData);
									};
									// Binding evetn callbacks attached using attachEventListner
									_weUtil.attachEventListners('survey', currentInstance);

									currentInstance.totalTimeElapsed = 0;
									var surveyRuleMap = _widgetConfiguration.survey.ruleMap,
										surveyOrderedList = _widgetConfiguration.survey.order,
										surveyId = currentInstance._surveyOptions.surveyId;

									if (surveyId && surveyRuleMap[surveyId]) {
										var array1 = [];
										array1[0] = surveyId;
										surveyOrderedList = array1;
									}

									currentInstance.startExecutionTime = (new Date()).getTime();
									_surveyExecutor(surveyOrderedList, surveyRuleMap, currentInstance);
								} else {
									if (
										_widgetConfiguration.survey && _widgetConfiguration.survey.isEnabled && document.location.protocol == 'https:' && !_widgetConfiguration.sslEnabled) {
										/*
										 * webengage.logger.error("The WebEngage
										 * widget is turned off for SSL encrypted
										 * page on this site. " + "Please go to <a
										 * href='http://webengage.com/'
										 * target='_new'>WebEngage.com</a> to
										 * upgrade.");
										 */
										webengage.eLog(null, 'error', 'Survey - Widget turned off for SSL encrypted page', 'Survey - Widget turned off for SSL encrypted page');
									}
								}
							});
						});
					},
					clear: function () {
						webengage.withELog(function () {
							try {

								if (document.getElementById(_weProperties.widgetContainerId + '-base')) {
									var webengageData = document.getElementsByTagName('webengagedata')[0];
								} else {
									_weProperties.widgetContainer.removeChild(document.getElementById(_weProperties.widgetContainerId + '-survey-content'));
								}
							} catch (e) {}
							document.$SurveyWidgetInitializer = null;
							_surveyInstances = [];
						});
					},
					abort: function () {
						_weUtil.abortAllInstances(_surveyInstances);
					},
					attachEventListner : function () {
						var that = this, _arguments = arguments;
						webengage.withELog(function () {
							_weUtil.bind.apply(that, _arguments);
							if(_surveyInstances.length > 0 ) {
								for(var i = 0; i < _surveyInstances.length; i++) {
									_surveyInstances[i].enableCallbacks = true;
									_weUtil.bind.apply(_surveyInstances[i], _arguments);
								}
							}
						});
					}
				};
			})()); /* -- Survey API ends -- */


			_weUtil.extend("IFRAMES", (function () {
				var _frames = [];
				return {
					create: function (frameName, frameContainer, frameOptions) {
						this.remove(frameName);
						var _frameOptions = frameOptions || {};
						var ifrm;

						// http://stackoverflow.com/a/875657 : in IE iframe form
						// submission opening in new window issue
						try {
							ifrm = document.createElement("<iframe name=\"" + frameName + "\">");
						} catch (e) {
							ifrm = document.createElement("iframe");
							ifrm.name = frameName;
						}
						ifrm.id = frameName;
						if(webengage.BrowserDetect.is_this_the_worlds_most_annoying_browser()){
							ifrm.src = "javascript:void(0);";
						}

						ifrm.frameBorder = _frameOptions['frameBorder'] || "0";
						ifrm.marginHeight = _frameOptions['marginHeight'] || "0";
						ifrm.marginWidth = _frameOptions['marginWidth'] || "0";
						ifrm.allowTransparency = _frameOptions['allowTransparency'] || "true";

						var nfStyle = ifrm.style;
						nfStyle.zIndex = (_weUtil.getMaxZIndex() + 1);
						nfStyle.position = "absolute";
						nfStyle.backgroundColor = _frameOptions['backgroundColor'] || "transparent";
						nfStyle.bottom = _frameOptions['bottom'] || '0px';
						nfStyle.right = _frameOptions['right'] || '0px';
						nfStyle.border = _frameOptions['border'] || 'none';
						nfStyle.overflow = _frameOptions['overflow'] || 'hidden';
						nfStyle.visibility = _frameOptions['visibility'] || "hidden";

						var _frameContainer = frameContainer || _weProperties.widgetContainer;
						_frameContainer.appendChild(ifrm);
						_frames[frameName] = ifrm;
						try {
							ifrm.contentWindow.name
						} catch (e) {
							webengage.eLog(e);
							ifrm.src = 'javascript:(function () {document.open();document.domain="'+document.domain+'";document.close();})();';
						}
						if (typeof (_frameOptions['onload']) === 'function') {
							_weUtil.addListener(ifrm, 'load', _frameOptions.onload);
						}
						return ifrm;
					},
					get: function (frameName) {
						return _frames[frameName];
					},
					resize: function (frameName, height, width) {
						var frame = webengage.IFRAMES.get(frameName);
						frame.style.height = height + "px";
						// frame.style.width = width + "px";
					},
					remove: function (frameName) {
						var frame = webengage.IFRAMES.get(frameName);
						if (frame) {
							if (frame.parentNode) {
								frame.parentNode.removeChild(frame);
							}
						}
						if (window.frames[frameName]) {
							delete window.frames[frameName];
						}
						delete _frames[frameName];
					},
					creatCallbackFrame: function (widgetCallBackFrameName, frameContainer, widgetCallBackFrameSrc, callbackFn) {
						var _frameOptions = {};
						if (typeof (callbackFn) === 'function') {
							_frameOptions['onload'] = function () {
								webengage.withELog(function () {
									var widgetCallbackFrame = _frames[widgetCallBackFrameName];
									if (!widgetCallbackFrame.widgetCallBackStatus || widgetCallbackFrame.widgetCallBackStatus === 0) {
										widgetCallbackFrame.widgetCallBackStatus = 1;
									} else if (widgetCallbackFrame.widgetCallBackStatus === 1) {
										widgetCallbackFrame.contentWindow.location = "about:blank";
										widgetCallbackFrame.widgetCallBackStatus = 2;
									} else if (widgetCallbackFrame.widgetCallBackStatus === 2) {
										var _fn = (new Date()).getTime()+"CB";
										if(!webengage.IFRAMES.CB) {
											webengage.IFRAMES.CB = {}
										}

										webengage.IFRAMES.CB[_fn] = function(json){
											setTimeout(function(){
												if (json !== undefined && json !== "") {
													try{
														var jsonObj = _weUtil.parseJSON(json);
														if (jsonObj !== null) {
															if (jsonObj.eventName !== undefined) {
																callbackFn(jsonObj.eventName, jsonObj.data);
															}
														}
													}catch(e){webengage.eLog(e);}
												}
												// initialising the frame again
												widgetCallbackFrame.widgetCallBackStatus = 0;
												webengage.IFRAMES.remove(widgetCallBackFrameName);
												widgetCallbackFrame = webengage.IFRAMES.creatCallbackFrame(widgetCallBackFrameName, frameContainer, widgetCallBackFrameSrc, callbackFn);
											}, 10);
										}

										try {
											var json = widgetCallbackFrame.contentWindow.name;
											webengage.IFRAMES.CB[_fn](json);
										} catch(e){
											webengage.eLog(e);
											widgetCallbackFrame.src = 'javascript:(function () {document.write(\'<sc' + 'ript>var _data=window.name;document.domain="'+document.domain+'";setTimeout(function(){window.parent.webengage.IFRAMES.CB["'+_fn+'"](_data);}, 10);</sc' + 'ript>\')})();';
										}
									}
								});
							};
						}
						var widgetCallbackFrame = webengage.IFRAMES.create(widgetCallBackFrameName, frameContainer, _frameOptions);
						var widgetCallbackFrameStyle = widgetCallbackFrame.style;
						widgetCallbackFrameStyle.height = 0;
						widgetCallbackFrameStyle.width = 0;
						if (widgetCallBackFrameSrc) {
							widgetCallbackFrame.src = widgetCallBackFrameSrc;
						}
						return widgetCallbackFrame;
					}
				};

			})());

			/* -- Notification API -- */
			_weUtil.extend("notification", (function () {
				var _notificationInstances = [],
					_runNotification = function (notificationEId, layout, notificationVersion, showOnExit) {
						var currentInstance = this;
						if (notificationEId || currentInstance._notificationOptions.previewJson !== undefined) {
							currentInstance.notificationId = currentInstance.notificationEId = notificationEId;
							currentInstance.showOnExit = showOnExit;
							currentInstance.layout = layout || (currentInstance._notificationOptions.previewJson && currentInstance._notificationOptions.previewJson.layout ? currentInstance._notificationOptions.previewJson.layout : "");
							var onRunRes = currentInstance.executeCallbacks("run", currentInstance);
							if(typeof onRunRes === 'boolean' && !onRunRes) {
								return;
							}
							var ifrm = webengage.IFRAMES.create(_weProperties.widgetContainerId + '-notification-frame', _weProperties.widgetContainer);
							ifrm.style.top = "-1000px";
							ifrm.style.left = "-1000px";
							var sessionCookieVal = _weUtil.getSessionCookie();
							var iDoc = null;
							if (ifrm.contentDocument) {
								iDoc = ifrm.contentDocument;
							} else if (ifrm.contentWindow) {
								iDoc = ifrm.contentWindow.document;
							} else if (ifrm.document) {
								iDoc = ifrm.document;
							}
							iDoc.open();
							var notificationBaseCss = (currentInstance.layout === "" ? 'notification-base.css' : currentInstance.layout + '-notification-base.css');
							var ie7ScriptNStyle = (webengage.BrowserDetect.ie() && webengage.BrowserDetect.version() < 8) ?
							'<link rel="stylesheet" type="text/css" href="//d3701cc9l7v9a6.cloudfront.net/css/responsive/assets/css/font/webengage/widget-font-ie7/ie7.css?v=468.0" media="screen"/><sc'+'ript type="text/javascript" src="//d3701cc9l7v9a6.cloudfront.net/css/responsive/assets/css/font/webengage/widget-font-ie7/ie7.js?v=468.0"></sc'+'ript><style type="text/css">.icon-large{font-size:1.3333333333333333em;margin-top:-4px;padding-top:3px;margin-bottom:-4px;padding-bottom:3px;vertical-align:middle;}.icon-extra-large{font-size:2em;margin-top:-4px;padding-top:3px;margin-bottom:-4px;padding-bottom:3px;vertical-align:middle;}</style>' : '';
							var ie8Styles = (webengage.BrowserDetect.ie() && webengage.BrowserDetect.version() === 8) ?
								'<style type="text/css">.icon-large{font-size:1.3333333333333333em;margin-top:-4px;padding-top:3px;margin-bottom:-4px;padding-bottom:3px;vertical-align:middle;}.icon-extra-large{font-size:2em;margin-top:-4px;padding-top:3px;margin-bottom:-4px;padding-bottom:3px;vertical-align:middle;}</style>' : '';
							iDoc.write('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html><head>'
								+ '<meta http-equiv="cache-control" content="max-age=0" /><meta http-equiv="cache-control" content="no-cache" />'
								+ '<meta http-equiv="pragma" content="no-cache" /><meta http-equiv="content-type" content="text/html; charset=utf-8"/>'
								+ '<link id="widget-font-id" rel="stylesheet" type="text/css" href="//d3701cc9l7v9a6.cloudfront.net/css/responsive/assets/css/font/webengage/widget-font.css?v=468.0" media="screen"/>'
								+ '<link rel="stylesheet" type="text/css" href="//d3701cc9l7v9a6.cloudfront.net/css/webengage/notification/'+notificationBaseCss+'?v=468.0" media="screen"/>'
								+ ie7ScriptNStyle
								+ ie8Styles
								+ '<sc'+'ript type="text/javascript">try{window.parent.window.name}catch(e){alert("test"); document.domain="'+document.domain+'";};</sc'+'ript>'
								+ '<sc'+'ript type="text/javascript" src="//d3701cc9l7v9a6.cloudfront.net/js/jquery/jquery-1.3.2.min.js"></sc'+'ript>'
								+ '</head><body class="notification-body"><sc'+'ript type="text/javascript">window.onload = function () { '
								+ '(function(d){ var _script = d.createElement("script"); _script.type = "text/javascript"; _script.src = "'
								+ _weProperties.widgetDomain + _weProperties.notificationWidgetScriptUrl+'"; d.body.appendChild(_script); })(document);};'
								+ '</sc'+'ript></body></html>');


							iDoc.close();

							webengage.setTimeout(function(){
								if (currentInstance._notificationOptions.previewJson !== undefined) {
									iDoc.$NotificationWidgetInitializer = {
										currentInstance: currentInstance,
										notificationVersion: notificationVersion,
										containerId: _weProperties.widgetContainerId,
										licenseCode: _licenseCode,
										appHost: _weProperties.baseWebEngageUrl,
										widgetDomain: _weProperties.widgetDomain,
										previewJson : currentInstance._notificationOptions.previewJson
									};
								} else {
									iDoc.$NotificationWidgetInitializer = {
										currentInstance: currentInstance,
										notificationVersion: notificationVersion,
										containerId: _weProperties.widgetContainerId,
										licenseCode: _licenseCode,
										appHost: _weProperties.baseWebEngageUrl,
										widgetDomain: _weProperties.widgetDomain,
										browser: webengage.BrowserDetect.browser(),
										browserVersion: webengage.BrowserDetect.version(),
										os: webengage.BrowserDetect.os(),
										country: sessionCookieVal.country || '',
										city: sessionCookieVal.city || '',
										region: sessionCookieVal.region || '',
										pageTitle: document.title,
										ip:sessionCookieVal.ip,
										referrer: document.referrer
									};
								}
							}, 0);

						}
					},
					_notificationExecutor = function(notificationOrderedList, notificationRuleMap, currentInstance) {
						if (notificationOrderedList && notificationOrderedList.length > 0) {
							var _notificationOrderedList = (new Array()).concat(notificationOrderedList);
							var key = _notificationOrderedList[0],
								webEngageCookie = _weUtil.getWebengageCookie(),
								sessionCookie = _weUtil.getSessionCookie(),
								notificationEId = key,
								layout = notificationRuleMap[notificationEId].layout,
								version = (webengage_fs_configurationMap.config.notificationConfig.wl ? 'W':'N') +  notificationRuleMap[notificationEId].version,
								ruleCode = notificationRuleMap[notificationEId].ruleCode,
								showOnExit = (!currentInstance._notificationOptions.skipRules && typeof notificationRuleMap[notificationEId].showOnExit === 'boolean' ? notificationRuleMap[notificationEId].showOnExit : false),
								totalTimespent = ((currentInstance._notificationOptions.skipRules || showOnExit) ? 0 : ((notificationRuleMap[notificationEId].totalTimeOnSite ? notificationRuleMap[notificationEId].totalTimeOnSite - ((new Date()).getTime() - (sessionCookie.sst || 0)) : 0))),
								timespent = ((currentInstance._notificationOptions.skipRules || showOnExit) ? 0 :  ((parseInt(currentInstance._notificationOptions.delay,10) >= 0) ? parseInt(currentInstance._notificationOptions.delay,10) : Math.max(totalTimespent, notificationRuleMap[notificationEId].timespent))),
								skipTargetPage = notificationRuleMap[notificationEId].skipTargetPage,
								actionLinks = notificationRuleMap[notificationEId].actionLinks,
								maxTimesPerUser = notificationRuleMap[notificationEId].maxTimesPerUser,
								isMobileNotification =  notificationRuleMap[notificationEId].mobile;

							if (!currentInstance._notificationOptions.isDemoMode) {
								// finding if notification is only mobile-specific
								// and device is mobile as well
								if (typeof isMobileNotification !== 'undefined' && isMobileNotification && !webengage.BrowserDetect.isMobile()) {
									_notificationOrderedList.splice(0,1);
									return _notificationExecutor(_notificationOrderedList, notificationRuleMap, currentInstance);
								}

								// Finding out if this
								// notification has already been
								// taken or closed by the user. If
								// no then its a valid
								// notification.
								if (!currentInstance._notificationOptions.forcedRender &&
									((sessionCookie && sessionCookie.closedNIds !== undefined && sessionCookie.closedNIds.indexOf('##' + notificationEId) >= 0)
									|| (webEngageCookie && webEngageCookie.takenNIds !== undefined && webEngageCookie.takenNIds.indexOf('##' + notificationEId) >= 0))) {
									_notificationOrderedList.splice(0,1);
									return _notificationExecutor(_notificationOrderedList, notificationRuleMap, currentInstance);
								}

								// Dont show notifictions on
								// target page if
								// <code>skipTargetPage</code> is
								// <code>true</code>
								if (skipTargetPage && actionLinks instanceof Array && actionLinks.length > 0) {
									for (var i in actionLinks) {
										var dummyAnchorElem = document.createElement("a");
										dummyAnchorElem.href = actionLinks[i];
										actionLinks[i] = "^" + _weUtil.escapeForRegExp(dummyAnchorElem.href) + "$";
										dummyAnchorElem = null;
									}
									if (webengage.ruleExecutor.util.isMatches(_weUtil.getClientPageUrl(), actionLinks)) {
										_notificationOrderedList.splice(0,1);
										return _notificationExecutor(_notificationOrderedList, notificationRuleMap, currentInstance);
									}
								}

								// Finding the totalTimes shown of
								// the notification
								var totalTimesShown = webengage.util.getTotalTimesShown(notificationEId, "notification");
								if (!currentInstance._notificationOptions.isDemoMode && !currentInstance._notificationOptions.forcedRender && maxTimesPerUser !== undefined) {
									if (maxTimesPerUser <= totalTimesShown) {
										_notificationOrderedList.splice(0,1);
										return _notificationExecutor(_notificationOrderedList, notificationRuleMap, currentInstance);
									}
								}

								notificationRuleMap[notificationEId]['timeSpent'] = timespent;
								notificationRuleMap[notificationEId]['showOnExit'] = showOnExit;
								_ruleExecution(notificationEId, notificationRuleMap[notificationEId], currentInstance, function() {
									_notificationOrderedList.splice(0,1);
									return _notificationExecutor(_notificationOrderedList, notificationRuleMap, currentInstance);
								});

							} else {
								notificationRuleMap[notificationEId]['timeSpent'] = timespent;
								notificationRuleMap[notificationEId]['showOnExit'] = showOnExit;
								_runNotificationWrapper(notificationEId, notificationRuleMap[notificationEId], currentInstance);
							}
						}
					},
					_ruleExecution = function(notificationEId, notificationData, currentInstance, callback) {
						try {
							if (notificationData.startTimestamp || notificationData.endTimestamp) {
								if (webengage.ruleExecutor.dependency.util.geoDataExists()) {
									var servertimestamp = _weUtil.getServerTimeStamp(),
										startTimestamp = notificationData.startTimestamp,
										endTimestamp = notificationData.endTimestamp;
									if (endTimestamp < servertimestamp || servertimestamp < startTimestamp) {
										return callback();
									}
								}
							}

							if ((currentInstance._notificationOptions.skipRules) || (!notificationData.ruleCode) || (webengage.ruleExecutor.execute(notificationEId, notificationData.ruleCode, currentInstance._notificationOptions.ruleData))) {
								var dependencyRunTime = currentInstance.startExecutionTime ? (new Date()).getTime() - currentInstance.startExecutionTime : 0;
								currentInstance.totalTimeElapsed =  currentInstance.totalTimeElapsed + dependencyRunTime;
								var _sampling = notificationData.sampling || 100;
								var _BSampling = webengage.ruleExecutor.util.sampling(notificationEId);
								if(_sampling >= _BSampling) {
									return _runNotificationWrapper(notificationEId, notificationData, currentInstance);
								} else {
									webengage.util.markEntityAsShown(notificationEId, "notification", currentInstance, true);
									webengage.setTimeout(function () {
										currentInstance.dump('abs_view', {id : notificationEId});
									}, 10);
									return callback();
								}
							} else {
								return callback();
							}

						} catch(err) {
							if (err && err['type']) {
								webengage.ruleExecutor.util.loadDependency(err['type'], notificationData,
									function() {
										_ruleExecution(notificationEId, notificationData, currentInstance, callback);
									}, callback);
							} else {
								webengage.eLog(err);
								callback();
							}
						}
					},
					_runNotificationWrapper = function(notificationEId, notificationMap, currentInstance) {
						var timespent = notificationMap['timeSpent'] || 0;
						//if (parseInt(currentInstance._notificationOptions.delay, 10) >= 0) {
						//	timespent = parseInt(currentInstance._notificationOptions.delay, 10);
						//}
						function _runNotificaitonOnGeoLoad() {
							_weUtil.withWeJquery(function () {
								webengage.setTimeout(function () {
									_runNotification.apply(currentInstance, [notificationEId, notificationMap['layout'], notificationMap['version'], notificationMap['showOnExit']]);
								}, (notificationMap['showOnExit'] ? 0 : ((timespent - currentInstance.totalTimeElapsed) < 0 ? 0 : (timespent - currentInstance.totalTimeElapsed))));
							});
						}
						// Geo neeeded beforing showing Notification for GEO tracking
						webengage.GEO.load(_runNotificaitonOnGeoLoad ,_runNotificaitonOnGeoLoad);
					};
				return {
					cbid : 1, // cbid is used for the attachEventListners
					render: function (notificationOptions) {
						return webengage.withELog(function () {
							return (new function () {
								webengage.notification.clear();
								var currentInstance = this;
								currentInstance.cbid = 1;
								_notificationInstances[_notificationInstances.length] = currentInstance;
								currentInstance.abort = function() {
									_weUtil.abortInstance(this);
								};
								var _notificationOptions = {
									notificationId: _weq['webengage.notification.notificationId'] || '',
									skipRules: _weq['webengage.notification.skipRules'] || false,
									delay: _weq['webengage.notification.delay'] || -1,
									isDemoMode: _weq['webengage.notification.isDemoMode'] || _weq['webengage.isDemoMode'] || false,
									customData: _weUtil.copy({}, _weq['webengage.notification.customData'] || _weq['webengage.customData'] || {}),
									ruleData: _weUtil.copy({}, _weq['webengage.notification.ruleData'] || _weq['webengage.ruleData'] || {}),
									tokens: _weq['webengage.notification.tokens'] || _weq['webengage.tokens'] || {},
									previewJson: _weq['webengage.notification.previewJson'],
									forcedRender: _weq['webengage.notification.forcedRender'] || false,
									enableCallbacks:_weq['webengage.notification.enableCallbacks'] || _weq['webengage.enableCallbacks'] || false
								};
								// providing back support for the old
								// notificationOptions
								var notificationOptionsTransform = {
									'data': 'customData',
									'demo': 'isDemoMode'
								};
								if (notificationOptions !== undefined && !_weUtil.isEmptyObject(notificationOptions)) {
									for (var notificationOption in notificationOptions) {
										var transformName = notificationOptionsTransform[notificationOption];
										if (transformName !== undefined && transformName) {
											notificationOptions[transformName] = notificationOptions[notificationOption];
											delete notificationOptions[notificationOption];
										}
									}
								}
								// making sure custom/rule data in _weq is not overWritten by surveyoptions custom/rule data
								if (notificationOptions && notificationOptions.customData) {
									_notificationOptions.customData = _weUtil.copy(_notificationOptions.customData, notificationOptions.customData, true);
									delete notificationOptions['customData'];
								}
								if (notificationOptions && notificationOptions.ruleData) {
									_notificationOptions.ruleData = _weUtil.copy(_notificationOptions.ruleData, notificationOptions.ruleData, true);
									delete notificationOptions['ruleData'];
								}
								currentInstance._notificationOptions = _weUtil.copy(_notificationOptions, (notificationOptions ? notificationOptions : {}), true);
								currentInstance.enableCallbacks = (typeof currentInstance._notificationOptions.enableCallbacks === 'boolean' ? currentInstance._notificationOptions.enableCallbacks : false);
								// Assigning _instanceMethods to the current
								// instance
								_weUtil.copy(currentInstance, _instanceMethods, true);
								// Binding event callbacks passed through API
								currentInstance.onRun((currentInstance._notificationOptions.onRun || _weq['webengage.notification.onRun']));
								currentInstance.onLoad((currentInstance._notificationOptions.onLoad || _weq['webengage.notification.onLoad']));
								currentInstance.onClick((currentInstance._notificationOptions.onClick || _weq['webengage.notification.onClick']));
								currentInstance.onClose((currentInstance._notificationOptions.onClose || _weq['webengage.notification.onClose']));
								currentInstance.onOpen((currentInstance._notificationOptions.onOpen || _weq['webengage.notification.onOpen']));
								// Binding evetn callbacks attached using attachEventListner
								_weUtil.attachEventListners('notification', currentInstance);
								// Dump instance method to dump data when event occur
								currentInstance.dump = function(dumpEvent, dumpData) {
									var _currentInstance = this;
									var _systemData = {
										id : _currentInstance.notificationId,
										layoutId : _currentInstance.layout
									}, _eventData = {};
									_weUtil.copy(_systemData, dumpData || {}, true);
									_systemData['tvc'] = _weUtil.getTotalTimesShown(_systemData.id, 'notification', false, (dumpEvent === 'abs_view' ? true : false));
									_systemData['tvcs'] = _weUtil.getTotalTimesShown(_systemData.id, 'notification', true, (dumpEvent === 'abs_view' ? true : false));
									//if(!_weUtil.isEmptyObject(_currentInstance.layoutAttributes)) _systemData['layoutAttrs'] = _currentInstance.layoutAttributes;
									//if(!_weUtil.isEmptyObject(_currentInstance.config)) _systemData['theme'] = _currentInstance.config;
									if(!_weUtil.isEmptyObject(_currentInstance._notificationOptions.tokens)) _systemData['tokens'] = _weUtil.copy({}, _currentInstance._notificationOptions.tokens);
									if(!_weUtil.isEmptyObject(_currentInstance._notificationOptions.ruleData)) {
										_systemData['ruleData'] = _currentInstance._notificationOptions.ruleData;}
									if(_currentInstance.clickedCTA) _systemData['cta'] = _currentInstance.clickedCTA;
									this.executeCallbacks("dump", _systemData, dumpEvent);

									if(!_weUtil.isEmptyObject(_currentInstance._notificationOptions.customData)) {
										_eventData =  _currentInstance._notificationOptions.customData;
									}
									webengage.dump('notification_'+dumpEvent, _eventData, _systemData);
								};

//	              if(!(("//" + _weUtil.getClientPageHost()).match(new RegExp(_weUtil.escapeForRegExp(_weProperties.baseWebEngageUrl)+"$", 'gi')))) {
//	            	  currentInstance._notificationOptions.previewJson = undefined;
//	              }
								if (currentInstance._notificationOptions.previewJson !== undefined) {
									_weUtil.withWeJquery(function () {
										_runNotification.apply(currentInstance);
									});
								} else {
									if (_widgetConfiguration.notification && (_widgetConfiguration.notification.isEnabled || currentInstance._notificationOptions.isDemoMode) && (document.location.protocol == 'http:' || (document.location.protocol == 'https:' && _widgetConfiguration.sslEnabled)) && !_widgetConfiguration.isNQuotaOver) {
										var notificationOrderedList = _widgetConfiguration.notification.order,
											notificationRuleMap = _widgetConfiguration.notification.ruleMap;
										currentInstance.totalTimeElapsed = 0;
										var notificationId = currentInstance._notificationOptions.notificationId;
										if (notificationId && notificationRuleMap[notificationId]) {
											var array2 = [];
											array2[0] = notificationId;
											notificationOrderedList = array2;
										}

										currentInstance.startExecutionTime = (new Date()).getTime();
										_notificationExecutor(notificationOrderedList, notificationRuleMap, currentInstance);
									} else {
										if (
											_widgetConfiguration.notification && _widgetConfiguration.notification.isEnabled && document.location.protocol == 'https:' && !_widgetConfiguration.sslEnabled) {
											/*
											 * webengage.logger.error("The WebEngage
											 * widget is turned off for SSL encrypted
											 * page on this site. " + "Please go to <a
											 * href='http://webengage.com/'
											 * target='_new'>WebEngage.com</a> to
											 * upgrade.");
											 */
											webengage.eLog(null, 'error', 'Notification - Widget turned off for SSL encrypted page', 'Notification - Widget turned off for SSL encrypted page');
										}
									}
								}
							});
						});
					},
					getNotificationFrame:function () {
						return document.getElementById(_weProperties.widgetContainerId + '-notification-frame');
					},
					resize: function (cssObj) {
						var nFrame = document.getElementById(_weProperties.widgetContainerId + '-notification-frame');
						nFrame.height = cssObj.height || nFrame.contentWindow.document.body.scrollHeight;
						nFrame.width = cssObj.width || nFrame.contentWindow.document.body.scrollWidth;
						var nfStyle = nFrame.style;
						nfStyle.visibility = "visible";
						nfStyle.height = parseInt(cssObj.height || nFrame.contentWindow.document.body.scrollHeight) + "px";
						nfStyle.width = parseInt(cssObj.width || nFrame.contentWindow.document.body.scrollWidth) + "px";
						nfStyle.top = 'auto';
						nfStyle.bottom = '0px';
						nfStyle.left = 'auto';
						if ("right" == cssObj.launchType) {
							nfStyle.right = '0px';
						} else {
							nfStyle.left = '0px';
						}
					},
					clear: function () {
						var that = this;
						webengage.withELog(function () {
							try {
								webengage.IFRAMES.remove(_weProperties.widgetContainerId + '-notification-frame');
							} catch (e) {}
							_notificationInstances = [];
						});
					},
					abort: function () {
						_weUtil.abortAllInstances(_notificationInstances);
					},
					attachEventListner : function () {
						var that = this, _arguments = arguments;
						webengage.withELog(function () {
							_weUtil.bind.apply(that, _arguments);
							if(_notificationInstances.length > 0 ) {
								for(var i = 0; i < _notificationInstances.length; i++) {
									_notificationInstances[i].enableCallbacks=true;
									_weUtil.bind.apply(_notificationInstances[i], _arguments);
								}
							}
						});
					}
				};
			})()); /* -- Notification API ends -- */

			_weUtil.extend('',  {abort:function () {
				webengage.withELog(function () {
					webengage.feedback.abort();
					webengage.survey.abort();
					webengage.notification.abort();
				});
			}
			});

			/* -- Proxy init and ready starts (for the old widget code) -- */
			_weUtil.extend('', {
				init: function (_webengageWdigetOptions) {
					var setIn_weq = function (property) {
						if (_webengageWdigetOptions[property] !== undefined && _webengageWdigetOptions[property]) {
							_weq['webengage.' + property] = _webengageWdigetOptions[property];
						}
					};
					setIn_weq('licenseCode');
					setIn_weq('language');
					setIn_weq('isDemoMode');
					setIn_weq('delay');
					_weq['webengage.widgetVersion'] = "3.0";
					// making sure that the licenseCode is present before calling _init
					if (_weq['webengage.licenseCode'] !== undefined && _weq['webengage.licenseCode']) {
						_weUtil.onDocReady(_preInit);
					}
					return webengage;
				}
			});

			_weUtil.extend('', {
				onReady: function (_webengageOnReadyCallback) {
					if (_webengageOnReadyCallback !== undefined && typeof _webengageOnReadyCallback === 'function') {
						_weq['webengage.oldOnReady'] = _webengageOnReadyCallback;
					}
				}
			});

			_weUtil.extend('', {
				render: function (renderOptions) {
					if (renderOptions) {
						if (renderOptions.showFeedbackByDefault !== undefined && !renderOptions.showFeedbackByDefault) {
							_weq['webengage.feedback.defaultRender'] = false;
						}
						if (renderOptions.showSurveyByDefault !== undefined && !renderOptions.showSurveyByDefault) {
							_weq['webengage.survey.defaultRender'] = false;
						}
						if (renderOptions.showNotificationByDefault !== undefined && !renderOptions.showNotificationByDefault) {
							_weq['webengage.notification.defaultRender'] = false;
						}
					}
					_render();
				}
			}); /* -- Proxy init and ready ends -- */

			var _preInit = function () {
				_licenseCode = _weq['webengage.licenseCode'];
				var _weDataContainer = document.createElement("webengagedata");
				document.body.insertBefore(_weDataContainer, null);
				_weProperties.weDataContainer = _weDataContainer;
				// Inline css to override any inherited styles
				try {
					var theStyle = document.createElement('style');
					var weCSSRules = document.createTextNode('#webklipper-publisher-widget-container, #webklipper-publisher-widget-container * {overflow:visible; -webkit-box-sizing: content-box; -moz-box-sizing: content-box;  box-sizing: content-box;}'); // + '#webklipper-publisher-widget-container-survey-content, #webklipper-publisher-widget-container-survey-content #webklipper-publisher-widget-container-survey-frame {max-height: 450px; max-width: 100%}'
					theStyle.type = 'text/css';
					if (theStyle.styleSheet) {
						theStyle.styleSheet.cssText = weCSSRules.nodeValue;
					} else {
						theStyle.appendChild(weCSSRules);
					}
					_weProperties.weDataContainer.appendChild(theStyle);
				} catch (e) {}
				var container = document.createElement('div');
				container.setAttribute('id', _weProperties.widgetContainerId);
				_weProperties.weDataContainer.appendChild(container);

				_weProperties.widgetContainer = container;
				// Setting the Long term cookie if not exist
				var webengageCookeLT = _weUtil.getWebengageCookie();
				if (!webengageCookeLT) {
					webengageCookeLT = _weUtil.setWebengageCookie();
				} else {
					if (!webengageCookeLT['luid']) {
						webengageCookeLT = _weUtil.setWebengageCookie(webengageCookeLT);
					}
				}

				// Setting webengage session cookie if not exist
				var sessionCookie = _weUtil.getSessionCookie();
				if (!sessionCookie || !sessionCookie['suid']) {
					sessionCookie = _weUtil.setSessionCookie(sessionCookie, true);
					webengageCookeLT = _weUtil.updateTSC();
				}
				webengageCookeLT = _weUtil.updateTPVC();
				if (typeof webengageCookeLT['isGzip'] === 'undefined' || !webengageCookeLT['isGzip']) {
					// -----------
					_weUtil.loadScript.apply(_weProperties.widgetContainer, [ '//z.webengage.com/gz.js', function () {
						webengageCookeLT = _weUtil.setGZIPFlag((typeof _weq['isGzip'] != 'undefined' && _weq['isGzip'] ? true : false));
						_init(webengageCookeLT['isGzip'], webengageCookeLT['luid'], sessionCookie['suid']);
					}]);
				} else {
					_init(webengageCookeLT['isGzip'], webengageCookeLT['luid'], sessionCookie['suid']);
				}
			};

			var _init = function (isGzip, luid, suid) {
					window.webengage.setTimeout(function () {
						var parentFolder = (isGzip ? 'webengage-zfiles' : 'webengage-files');
						var configUrl = '//s3.amazonaws.com/' + parentFolder + '/webengage/' + _licenseCode + '/v3.js?r=' + Math.floor((new Date()).getTime()/60000)+'&u='+luid+'|'+suid;
						_weUtil.loadScript.apply(_weProperties.widgetContainer, [configUrl, function () {
							var v3LoadInterval = webengage.setInterval(function () {
								if (typeof webengage_fs_configurationMap !== 'undefined' && webengage_fs_configurationMap.config) {
									clearInterval(v3LoadInterval);
									if (((webengage_fs_configurationMap.sites !== undefined && webengage_fs_configurationMap.sites)
										|| (webengage_fs_configurationMap.domain !== undefined && webengage_fs_configurationMap.domain))
										&& !_weq['webengage.isDemoMode']) {
										var flag = false;
										var _weClientPageHost = _weUtil.getClientPageHost(), _weClientPageHostPort;
										if(_weClientPageHost.match(/\:[\d]*$/)) {
											_weClientPageHostPort = _weClientPageHost.substring(_weClientPageHost.indexOf(':')+1, _weClientPageHost.length);
											_weClientPageHost = _weClientPageHost.substring(0, _weClientPageHost.indexOf(':'));
										}
										var domains = [];
										var regexps = [];
										if(webengage_fs_configurationMap.sites === undefined || !webengage_fs_configurationMap.sites){
											webengage_fs_configurationMap.sites = {};
											webengage_fs_configurationMap.sites[webengage_fs_configurationMap.domain] = 'DOMAIN';
										}
										for(var key in webengage_fs_configurationMap.sites){
											var _publisherDomain = key, _publisherDomainPort;
											if(webengage_fs_configurationMap.sites[key] == 'DOMAIN'){
												domains[domains.length] = _publisherDomain;
												if(_publisherDomain.match(/^www\./i)) {
													_publisherDomain = _publisherDomain.substring(4, _publisherDomain.length);
												}
												if(_publisherDomain.match(/\:[\d]*$/)) {
													_publisherDomainPort = _publisherDomain.substring(_publisherDomain.indexOf(':')+1, _publisherDomain.length);
													_publisherDomain = _publisherDomain.substring(0, _publisherDomain.indexOf(':'));
												}
												if((_weClientPageHost.match(new RegExp(_weUtil.escapeForRegExp(_publisherDomain)+"$", 'gi')) && (!_publisherDomainPort || _publisherDomainPort == _weClientPageHostPort))){
													flag = true;
													break;
												}
											}else if(webengage_fs_configurationMap.sites[key] == 'REGEXP'){
												var  matcherExp = _publisherDomain;
												regexps[regexps.length] = _publisherDomain;
												if((_weUtil.getClientPageUrl().match(matcherExp))){
													flag = true;
													break;
												}
											}
										}
										flag = (_weq['webengage.notification.previewJson'] ? true : flag);
										if(!flag){
											var errorMessage = "The <a style=\"color: #00f;\" href=\"http://webengage.com/\" target=\"_blank\">WebEngage (Survey, Feedback &amp; Notification)</a> widget on this page is incorrectly configured. It is meant for use only on ";

											if(domains.length > 0){
												errorMessage += "<b>" + domains.join(", ") + "</b>";
											}
											if(regexps.length > 0){
												if(domains.length > 0){
													errorMessage += (" and ");
												}
												errorMessage += ("pages with URLs that matches following regular expression(s) <b>"+regexps.join(", ")+"</b>");
											}
											webengage.logger.error(errorMessage+".");
											return;
										}
									}

									_weProperties.publisherTimeZoneOffset = webengage_fs_configurationMap.tzo;

									_weUtil.copy(_widgetConfiguration, (function (_webengage_fs_configurationMap) {
										return {
											configurationMap: _webengage_fs_configurationMap ? _webengage_fs_configurationMap : {}
										};
									})(webengage_fs_configurationMap));
									//webengage.dump('widget', 'widget-load');
									var sessionCookie = _weUtil.getSessionCookie(), webengageCookie = _weUtil.getWebengageCookie();
									// Tracking visitor total visits, newVisits, newVisitor, RepeatVisitor, repeatVisits, UniqueVisits
									if(!_weq['webengage.isDemoMode'] && !sessionCookie['vtd']) {
										//_weUtil.tsTracking('/v.jpg', ('licenseCode=' + _weq['webengage.licenseCode'] + '&nvst=' + webengage.util.isFirstTimeUser() + '&tzo='+webengage_fs_configurationMap.tzo+'&lvt='+lvt));
										webengage.dump('visitor_new_session', null, {'lp':document.location.href});
										_weUtil.setVTD();
										_weUtil.setLST();
									}
									_executeCustomWidgetCodeAndStartExecution(parentFolder);
								}
							}, 1);
						},
							null, function () {
								/*
								 * webengage.logger.error("The WebEngage widget in use on
								 * this page is currently not active. " + "If you have
								 * just signed up, please check your mailbox for an
								 * activation link, otherwise go to WebEngage " + "<a
								 * href='http://webengage.com/publisher/dashboard'
								 * target='_new'>dashboard</a> to activate.");
								 */
							}]);
					}, (_weq['webengage.delay'] && parseInt(_weq['webengage.delay']) > 0 ? parseInt(_weq['webengage.delay']) : 0));
				},
				_runNextCustomWidgetCode = function (parentFolder, customWidgetCodeIdsToExecute, currentCustomWidgetCodeIdIndex, customWidgetCodeIdsToExecuteTimestamps) {
					var fullPath = '//s3.amazonaws.com/' + parentFolder + "/webengage/" + _licenseCode + "/" + customWidgetCodeIdsToExecute[currentCustomWidgetCodeIdIndex] + ".js?r=" + customWidgetCodeIdsToExecuteTimestamps[currentCustomWidgetCodeIdIndex];

					_weUtil.loadScript.apply(_weProperties.widgetContainer, [fullPath, function(){
						if(currentCustomWidgetCodeIdIndex == (customWidgetCodeIdsToExecute.length - 1)) {
							_ready();
						} else {
							_runNextCustomWidgetCode.apply(this, [parentFolder, customWidgetCodeIdsToExecute, (currentCustomWidgetCodeIdIndex + 1), customWidgetCodeIdsToExecuteTimestamps]);
						}
					}]);
				},
				_customWidgetCodeGeoLoadCallback = function(parentFolder){
					var ruleData = _weq['webengage.customWidgetCode.ruleData'] || _weq['webengage.ruleData'] || {};
					customWidgetCodeIdsToExecuteClient = [];
					customWidgetCodeIdsToExecuteClientTimestamps = [];
					if (webengage_fs_configurationMap.cwcRuleList) {
						var cwcRuleList = webengage_fs_configurationMap.cwcRuleList;
						for (var i = 0; i < cwcRuleList.length; i++) {
							var ruleCode = cwcRuleList[i].ruleCode;

							if (ruleCode) {
								if (!webengage.ruleExecutor.execute(cwcRuleList[i].cwcEncId, ruleCode, ruleData)) {
									continue;
								}
							}

							var nextIndex = customWidgetCodeIdsToExecuteClient.length;
							customWidgetCodeIdsToExecuteClient[nextIndex] = cwcRuleList[i].cwcEncId;
							customWidgetCodeIdsToExecuteClientTimestamps[nextIndex] = cwcRuleList[i].lastModifiedTimestamp;
						}
					}

					if (customWidgetCodeIdsToExecuteClient.length > 0) {
						_runNextCustomWidgetCode.apply(this, [parentFolder, customWidgetCodeIdsToExecuteClient, 0, customWidgetCodeIdsToExecuteClientTimestamps]);
					} else {
						_ready();
					}
				},
				_executeCustomWidgetCodeAndStartExecution = function(parentFolder) {
					if ((document.location.protocol == 'http:' || (document.location.protocol == 'https:' && webengage_fs_configurationMap.sslEnabled))) {
						_weUtil.usckwl(webengage_fs_configurationMap.domain);
						if(webengage_fs_configurationMap.cwcRuleList && webengage_fs_configurationMap.cwcRuleList.length > 0) {
							_customWidgetCodeGeoLoadCallback(parentFolder);
						} else {
							_ready();
						}
					} else {
						if (document.location.protocol == 'https:' && !_widgetConfiguration.sslEnabled) {
							webengage.eLog(null, 'error', 'Widget turned off for SSL encrypted page', 'CustomWidgetCode - Widget turned off for SSL encrypted page');
						}
					}
				},
				_ready = function () {
					(function (_webengage_fs_configurationMap) {
						_weUtil.extend('widgetConfiguration', {});
						if (_webengage_fs_configurationMap && _webengage_fs_configurationMap.config) {
							_weUtil.copy(_widgetConfiguration, {
								feedback: {
									isEnabled: (typeof _webengage_fs_configurationMap.config.enableFeedback == 'boolean' && _webengage_fs_configurationMap.config.enableFeedback),
									config: _webengage_fs_configurationMap.config.feedbackConfig ? _webengage_fs_configurationMap.config.feedbackConfig : {}
								}
							}, true);

							_weUtil.copy(_widgetConfiguration, {
								survey: {
									isEnabled: (typeof _webengage_fs_configurationMap.config.enableSurvey == 'boolean' && _webengage_fs_configurationMap.config.enableSurvey),
									config: _webengage_fs_configurationMap.config.surveyConfig ? _webengage_fs_configurationMap.config.surveyConfig : {},
									order : [],
									ruleMap: {}
								}
							}, true);

							(function (survey) {
								if (_webengage_fs_configurationMap.surveyRuleList) {
									var surveyRuleList = _webengage_fs_configurationMap.surveyRuleList;
									for (var i = 0; i < surveyRuleList.length; i++) {
										survey.order[i] = surveyRuleList[i].surveyEncId;
										survey.ruleMap[surveyRuleList[i].surveyEncId] = surveyRuleList[i];
									}
								}
							})(_widgetConfiguration.survey);

							_weUtil.copy(_widgetConfiguration, {
								notification: {
									isEnabled: (typeof _webengage_fs_configurationMap.config.enableNotification == 'boolean' && _webengage_fs_configurationMap.config.enableNotification),
									order : [],
									ruleMap: {}
								}
							}, true);

							(function (notification) {
								if (_webengage_fs_configurationMap.notificationRuleList) {
									var notificationRuleList = _webengage_fs_configurationMap.notificationRuleList;
									for (var i = 0; i < notificationRuleList.length; i++) {
										notification.order[i] = notificationRuleList[i].notificationEncId;
										notification.ruleMap[notificationRuleList[i].notificationEncId] = {
											ruleCode: notificationRuleList[i].ruleCode,
											timespent: parseInt(notificationRuleList[i].timeSpent) != 'NaN' ? parseInt(notificationRuleList[i].timeSpent) : 0,
											totalTimeOnSite: parseInt(notificationRuleList[i].totalTimeOnSite) != 'NaN' ? parseInt(notificationRuleList[i].totalTimeOnSite) : 0,
											actionLinks: notificationRuleList[i].actionLinks || [],
											skipTargetPage: typeof (notificationRuleList[i].skipTargetPage) == 'boolean' ? notificationRuleList[i].skipTargetPage : false,
											maxTimesPerUser: notificationRuleList[i].maxTimesPerUser,
											startTimestamp: notificationRuleList[i].startTimestamp,
											endTimestamp: notificationRuleList[i].endTimestamp,
											layout : notificationRuleList[i].layout,
											version: ((typeof notificationRuleList[i].v != 'undefined') ? notificationRuleList[i].v : 0),
											showOnExit : notificationRuleList[i].showOnExit,
											mobile : notificationRuleList[i].mobile,
											sampling : notificationRuleList[i].sampling
										};
									}
								}
							})(_widgetConfiguration.notification);

							_weUtil.copy(_widgetConfiguration, {
								sslEnabled: (_webengage_fs_configurationMap.sslEnabled ? _webengage_fs_configurationMap.sslEnabled : false),
								isSRQuotaOver: (_webengage_fs_configurationMap.isSRQ ? _webengage_fs_configurationMap.isSRQ : false),
								isNQuotaOver: (_webengage_fs_configurationMap.isNQ ? _webengage_fs_configurationMap.isNQ : false),
								isFQuotaOver: (_webengage_fs_configurationMap.isFQ ? _webengage_fs_configurationMap.isFQ : false)
							}, true);

							// Updating the last widget Access timestamp

							_weUtil.uwats(_webengage_fs_configurationMap.lastWidgetCheckDate);
						}

						function _invokeRender () {
							var _fnsToRun = []; _readyDone = true;
							if (_weq['webengage.oldOnReady'] !== undefined && typeof _weq['webengage.oldOnReady'] === 'function') {
								_fnsToRun[_fnsToRun.length] = _weq['webengage.oldOnReady'];
								_fnsToRun[_fnsToRun.length] = _onReadyFns;
							} else {
								if (_weq['webengage.onReady'] !== undefined && typeof _weq['webengage.onReady'] === 'function') {
									_fnsToRun[_fnsToRun.length] = _weq['webengage.onReady'];
								}
								_fnsToRun[_fnsToRun.length] = _onReadyFns;
								_fnsToRun[_fnsToRun.length] = _render;
							};
							var runFns = function(fnsToRun) {
								for ( var i= 0, l = fnsToRun.length; i<l; i++) {
									if(typeof fnsToRun[i] === 'function') {
										webengage.withELog(function() {
											fnsToRun[i].call(webengage);
										}, null, true);
									} else if(_weUtil.isArray(fnsToRun[i])) {
										runFns(fnsToRun[i]);
									}
								}
							};
							runFns(_fnsToRun);
							if (webengage.BrowserDetect.ie() && webengage.BrowserDetect.version() < 11 && window.attachEvent) {
								window.attachEvent("onbeforeunload", function () {
									webengage.withELog(function () {
										webengage.winUnloading = true; // setting winUnloading flag so that we stop logging script logging errors in this case
										// TODO why we updating the session and long term cookie here
										_weUtil.setWebengageCookie(_weUtil.getWebengageCookie());
										_weUtil.updateSessionCookie(_weUtil.getSessionCookie());
									});
								});
							}
						}
						// Loading Conversion helper
						if (_webengage_fs_configurationMap && _webengage_fs_configurationMap.goals !== undefined && _webengage_fs_configurationMap.goals instanceof Array) {
							_weUtil.loadScript.apply(_weProperties.widgetContainer, [_weProperties.csUrl, function () {
								if(webengage.goals && typeof webengage.goals.init === 'function') {
									webengage.goals.init(_webengage_fs_configurationMap);
								}
							}]);
						}

						// Loading GA Callback helper
						if (_webengage_fs_configurationMap && _webengage_fs_configurationMap.GAEnabled) {
							if((_weq['GA.universalAnalyticsFunction'] && typeof window[_weq['GA.universalAnalyticsFunction']] === 'function')
								|| typeof window['ga'] === 'function'
								|| window['_gaq']) {
								_weUtil.loadScript.apply(_weProperties.widgetContainer, [_weProperties.gaCallbacksScriptUrl, _invokeRender, null, _invokeRender]);
							} else {
								webengage.eLog(_weq['webengage.licenseCode'], 'error', '_gaq/ga undefined - not loading ga-callback-helper', '_gaq/ga undefined');
								_invokeRender();
							}
						} else {
							_invokeRender();
						}

					})(_widgetConfiguration.configurationMap);

				},
				_render = function () {

					var shouldRnder = function (widgetType) {
						var renderFlag = typeof _weq['webengage.' + widgetType + '.defaultRender'] === 'boolean' ? _weq['webengage.' + widgetType + '.defaultRender'] : _weq['webengage.defaultRender'];
						return (typeof renderFlag === 'boolean' ? renderFlag : true);
					};


					if (shouldRnder('feedback')) {
						setTimeout(function () {
							webengage.feedback.render();
						}, 1);
					}
					if (shouldRnder('survey')) {
						setTimeout(function () {
							webengage.survey.render();
						}, 1);
					}
					if (shouldRnder('notification')) {
						setTimeout(function () {
							webengage.notification.render();
						}, 1);
					}
				};
			if (window.webengageWidgetInit !== undefined && typeof window.webengageWidgetInit === "function") {
				window.webengageWidgetInit();
			} else {
				// in case of v2 widget-code reading licenseCode and language from
				// the webengage-tag
				var _webengageTag = document.getElementsByTagName('webengage')[0];
				if (_webengageTag && _webengageTag.attributes) {
					var attributes = _webengageTag.attributes;
					_weq['webengage.licenseCode'] = attributes.license.value;
					_weq['webengage.language'] = (attributes.language ? attributes.language.value : '');
					if (attributes.feedbackButtonAlignment) {
						_weq['webengage.feedback.alignment'] = attributes.feedbackButtonAlignment.value;
					}
					if (attributes.feedbackExternalLinkId) {
						_weq['webengage.feedback.externalLinkId'] = attributes.feedbackExternalLinkId.value;
					}
				}
				// making sure that the licenseCode is present before calling
				// _init
				if (_weq['webengage.licenseCode'] !== undefined && _weq['webengage.licenseCode']) {
					_weUtil.onDocReady(_preInit);
				}
			}

			var readFromSessionStore = function (key) {
				try {
					return sessionStorage.getItem(key);
				} catch (e) {
					return null;
				}
			};
			var setInSessionStore = function (key, value) {
				try {
					sessionStorage.setItem(key, value);
				} catch (e) {}
			};
			if (location.search.indexOf('libraryScript') > -1 || readFromSessionStore('webengage-library') == 'true') {
				var regex = new RegExp("[\\?&]" + 'libraryScript' + "=([^&#]*)");
				var results = regex.exec(location.search);
				var scriptName;
				if (results != null) {
					scriptName = decodeURIComponent(results[1]);
					setInSessionStore('webengage-library-script', scriptName);
				} else if (readFromSessionStore('webengage-library-script')) {
					scriptName = readFromSessionStore('webengage-library-script');
				}
				setInSessionStore("webengage-library", 'true');
				if (scriptName) {
					webengage.util.withWeJquery(function() {
						webengage.util.loadScript.apply(_weProperties.widgetContainer, ["//d3701cc9l7v9a6.cloudfront.net/js/library/" + scriptName + ".js?v=468.0", function() {
							webengage.feedback.abort();
							webengage.survey.abort();
							webengage.notification.abort();
							setInSessionStore("webengage-library", 'true');
						}]);
					});
				}
			}
		};

		if (navigator.appName == 'Microsoft Internet Explorer') {
			if (document.body && (document.body.readyState == 'loaded' || document.body.readyState == 'complete')) {
				_webengageWidgetInit();
			} else {
				if (window.addEventListener) {
					window.addEventListener("load", function () {
						_webengageWidgetInit();
					}, false);
				} else if (window.attachEvent) {
					window.attachEvent('onload', function () {
						_webengageWidgetInit();
					});
				}
			}
		} else {
			_webengageWidgetInit();
		}

		webengage.getUser = function() {
			var sessionCookie = webengage.util.getSessionCookie();
			return {
				"pageUrl":window.location.href,
				"pageTitle":document.title,
				"referrer":(document.referrer || ""),
				"browser":webengage.BrowserDetect.browser(),
				"browserVersion":webengage.BrowserDetect.version(),
				"platform":webengage.BrowserDetect.os(),
				"ip" : (sessionCookie ? sessionCookie.ip : ""),
				"city" : (sessionCookie ? sessionCookie.city : ""),
				"country" : (sessionCookie ? sessionCookie.country : "")
			};
		};
		webengage.reload = function () {
			webengage.feedback.clear();
			webengage.survey.clear();
			webengage.notification.clear();
			var _weData = document.getElementsByTagName("webengagedata")[0];
			if(_weData){
				_weData.parentNode.removeChild(_weData);
			}
			(function(d){
				var _we = d.createElement('script');
				_we.type = 'text/javascript';
				_we.async = true;
				_we.src = (d.location.protocol == 'https:' ? "https://ssl.widgets.webengage.com" : "http://cdn.widgets.webengage.com") + "/js/widget/webengage-min-v-4.0.js";
				var _sNode = d.getElementById('_webengage_script_tag');
				_sNode.parentNode.insertBefore(_we, _sNode);
			})(document);
		};
	})(window, document, _weq, webengage);
}, 10);