/*
* xReader.full.js [SD05]
* 2012-11-03

Copyright (c) <2012> <oneiroi@outlook.com, http://bootleg.egloos.com>

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

*/


;(function(U,R,a,G,e,n,i,u,s) { // U'r a Genius ! 
	a = {
		version : "0.0.78a",
		table   : "http://kincrew.github.com/xReader/xReader.xml?u=" + document.domain + "&v=0.0.5",
		maxAge  : {
		           id : s,    duration : s
		},
		setup   : ( 
				"authorization charset cookie contentType css fallbackCharset foreceCharset" + 
				"format headers method param referer tidy timeout type xpath"
		).split(' ')
	}
	var cache = {};
	U.xReader = function() {

		/* INIT : OPTION & RESULT */
		var r = result = {
			id       : nonce("_"), source   : s,
			url      : s,          headers  : s,
			content  : s,          type     : s,
			format   : "text",
			YQL      : {
					   query   : s,             source  : s,
					   table   : a.table,       link    : s,
					   version : s
			},
			xReader  : {
					   version   : a.version
			},
			original : s,          error    : s,
			option   : {},         status   : s,
			phase    : "init",     state    : "init"
		}

		var o = r.option = {
			cacheBurst : false,    url     : s, 
			query      : "",       table   : s,
			source     : "",       ssl     : false,
			callback   : s,        format  : "text",
			link       : "auto"
		}

		/* SET : OPTION BY ARGUMENTS */	
		for (var i=0; i < arguments.length; i++) {
			var argument = arguments[i], type = typeof argument;
			(type == "string")   ? o.url && (o.css = argument) || (o.url = url = argument) :
			(type == "function") ? o.callback = argument :
			(type == "object")   ? eval("for(var i in argument) o[i] = argument[i]") : s ;
		}
		o.ua         = (o.ua == "current") && navigator.userAgent || s;
		r.source     = o.url;
		if (o.cacheBurst) {
			o.cacheBurst = Boolean(o.cacheBurst);
			o.url += ((o.url.indexOf("?") > -1) ? "&" : "?")  + "rand=" + r.id;
		}
		r.YQL.table  = o.table || r.YQL.table;
		if (o.maxAgeGlobal == "reset" || o.maxAgeGlobal || (!a.maxAge.id) && o.maxAge) {
			cache = {};
			a.maxAge.id  = r.id;
			if (o.maxAgeGlobal) a.maxAge.duration = o.maxAgeGlobal;
			if (o.maxAgeGlobal == "reset") a.maxAge.duration = s;
			a.table = r.YQL.table = (r.YQL.table).split("&m=")[0] += "&m=" + a.maxAge.id;
		}
		if (o.maxAge) cache[o.url] = o.maxAge
		r.maxAge     =  cache[o.url] || o.maxAge || a.maxAge.duration;
		r.phase      = "set option";

		/* PREPARE : QUERY, SOURCE  */
		r.YQL.query  = o.query   = YQL.query(r);
		r.YQL.source = YQL.source(r);
		r.phase      = "set query";

		/* PREPARE : CALLBACK FUNCTION  */
		var AJAX, SCRIPT;
		r.excute = U.xReader[r.id] = function(data, error) {		
			clearTimeout(timerId);
			if (SCRIPT) R.removeChild(SCRIPT);
			delete xReader[r.id];
			if (AJAX) AJAX.abort();
			r.original = data && (data.query || data.error && data) || undefined ; 
			r.error    = error || data.error;
			excute(r);
		}
		r.phase = "prepare function";

		var timerId = setTimeout(function() {
			U.xReader[r.id](s, {lang:"en-US", description : "[ERROR] Timeout"});
		}, o.timeout || xReader.timeout || 10000);

		/* CONNECT & LOAD : YQL SERVER  */
		if (o.link == "auto") {
			AJAX = YQL.AJAX(r);
			if (!AJAX) o.script = YQL.SCRIPT(r);
		} 
		else if (o.link == "jsonp") SCRIPT = YQL.SCRIPT(r);
		else  AJAX = YQL.AJAX(r);
		r.phase = "loading";
	}

	/*  YQL UTILS BY OPTION : 2012-11-13, SD05 */
	var YQL = {
		query   : function(r) {
			var o = r.option;
			var statement = (r.YQL.table) ? "USE '" + r.YQL.table + "' AS xReader;" : "";
			if (o.query) return statement + query;
			statement += "SELECT * FROM xReader WHERE url='" + o.url + "'";
			var OPT = a.setup;
			for (var i=0; i < OPT.length; i++)
			var key = OPT[i], 
				value = o[key], 
				value = (typeof value == "object") ? oJSON(value) : value,
				statement = statement + (value && (" AND " +  key + "='" + value + "'") || "");
			return statement;
		},
		source  : function(r) {
			var o = r.option;
			var _source = (o.ssl) ? "https://" :  "http://" ;
			_source += "query.yahooapis.com/v1/public/yql?q=" + encodeURIComponent(o.query) + "&format=json";
			if (o.diagnostics) _source += "&diagnostics=true";
			if (o.format == "json") _source +="&jsonCompat=new";
			if (r.maxAge) _source +="&_maxage=" + r.maxAge;
			return _source;
		},
		AJAX   : function(r) {
			var o = r.option;
			if(!window.XMLHttpRequest) return s;
			var AJAX = new XMLHttpRequest();
			if("withCredentials" in AJAX) r.YQL.link = "XHR"; 
			else if (XDomainRequest) {
				AJAX = new XDomainRequest();
				r.YQL.link = "XDR";
			} else return s;
			AJAX.open("get", r.YQL.source);
			AJAX.onload  = function() {
				if (AJAX.getAllResponseHeaders) r.YQL.headers = AJAX.getAllResponseHeaders();
			   r.excute(oJSON(AJAX.responseText));
			}
			AJAX.onerror = function() {
			   r.excute(s, {lang:"en-US", description : "[ERROR] xReader can't connect YQL by AJAX."});
			}
			AJAX.send();
			return AJAX;
		},
		SCRIPT : function(r) {
			r.YQL.link = "JSONP";
			var f = document.createElement('iframe');
			f.style.cssText = "display:block";
			R.appendChild(f);
			f.contentWindow.document.write('<html><head></head><body></body></html>'); 
			f.contentWindow.document.close();
			f.contentWindow.x = r.excute;
			f.contentWindow.onerror = function() {
				r.excute(s, {lang : "en-US", description : "[ERROR] YQL-PARSE-ERROR"});
				return true;
			}
			var s = f.contentWindow.document.createElement('script');
			r.YQL.source += "&callback=x";
			s.setAttribute("charset", "utf-8");   s.setAttribute("type", "text/javascript");
			s.setAttribute("src", r.YQL.source);
			s.onerror = function() {
			   r.excute(s, {lang:"en-US", description : "[ERROR] CONNET-SCRIPT-ERROR"});
			}
			f.contentWindow.document.body.appendChild(s);
			return f;
		}
	}
	/* local utils */
	var excute = function(r) {
		var o            = r.option;
		var source       = r.original;
		var resource     = (source && source.results && source.results.resources) || s;
		var content      = r.content = (resource && resource.content) || s;
		if (o.diagnostics) {
			r.diagnostics = source.diagnostics || (data.error && data.error.diagnostics) ;
		}
		if (resource) {
			r.url         = resource.url;
			r.YQL.version = resource.version;
			r.headers     = resource.headers;
			r.time        = (r.headers && r.headers.Date && new Date(r.headers.Date))
							|| (source && source.created && fromISOString(source.created)) || s;
			r.redirect    = resource.redirect;
			r.status      = resource.status;
		}
		if (content && !o.tidy) {
			try {
				switch (o.format) {
					case "json" :
						if (!(/[^,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]/.test(content.replace(/"(\\.|[^"\\])*"/g, '')))) {
							r.content = oJSON(content);
						} else {
							content = content.substring(content.indexOf("(")+1, content.lastIndexOf(")"));
							r.content  = eval('('+content+')');
						}
						break;
					case "dom"  :
						r.content = strToDom(content);
						break;
					case "dom2" :
						r.content = strToDom(content, true);
						break;
					default :
						r.content  = content;
						break;
				}			
			} catch (err) {
				r.state = "error";
				r.error = {lang:"en-US", description:"[ERROR] CONVERT-ERROR"};
			}
		}
		r.format = o.format;
		r.phase  = (r.error && r.phase) || "complete";
		r.state  = (r.error && "error") || "complete";

		var cbReturn = o.callback(r);
		if (cbReturn && o.target) appendDom(o.target, cbReturn);
	}
	var oJSON = function(target) {
		if (typeof target != "string") {
			if (oJSON.ecma5) return JSON.stringify(target);
			var result = [];
			for (var key in target) result.push('"'+key+ '" : "' + target[key] +  '" ');
			return '{ ' + result.join(",") + ' }';
		} else return (oJSON.ecma5) ? JSON.parse(target) : eval('('+target+')');
	}
	if (U.JSON) oJSON.ecma5 = true;
	var strToDom = function(str, type) {
		var container = document.createElement("div");
		container.innerHTML = str;
		return (type) ? container.childNodes : container.children ; 
	}
	var appendDom = function(target, child) {
		if (typeof child == "string") target.innerHTML = child;
		else target.parentNode.replaceChild(child, target);
		return target;
	}
	var nonce = function(str) {
		return (str || "") + (new Date()).getTime() + Math.floor(Math.random()*100);
	}
	var fromISOString = function(str) {
		if (Date.prototype.toISOString) return new Date(str);
		var _EXP = "([0-9]{4})(-([0-9]{2})(-([0-9]{2})(T([0-9]{2}):([0-9]{2})(:([0-9]{2})(\.([0-9]+))?)?" +
			"(Z|(([-+])([0-9]{2}):([0-9]{2})))?)?)?)?";
		var d = str.match(new RegExp(_EXP));
		var offset = 0;
		var date = new Date(d[1], 0, 1);
		d[3]  && date.setMonth(d[3]-1);  d[5]  && date.setDate(d[5]);
		d[7]  && date.setHours(d[7]);    d[8]  && date.setMinutes(d[8]);
		d[10] && date.setSeconds(d[10]); d[12] && date.setMilliseconds(Number("0." + d[12]) * 1000);
		d[14] && (offset = ((Number(d[16]) * 60) + Number(d[17])) * ((d[15] == '-') ? 1 : -1));
		date.setTime(Number(date)+(offset - date.getTimezoneOffset())*60*1000); 
		return date;
	}
	xReader.maxAge = a.maxAge;
})(window, document.getElementsByTagName("head")[0], undefined);
