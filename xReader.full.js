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


(function(g){

var headElement = document.getElementsByTagName("head")[0];
g.xReader = function() {
	var option = {
		id     :  "_" + (new Date()).getTime() + Math.floor(Math.random()*100)
	}
	for (var i=0; i < arguments.length; i++) {
		var argument = arguments[i];
		switch (typeof argument) {
			case "string" :
				if (option.url) option.css = argument;
				else option.url = argument;
				break;
			case "function" :
				if (option.callback) option.error = argument;
				else option.callback = argument;
				break;
			case "object" :
				for (var i in argument) option[i] = argument[i];
				break;
		}
	}
	option.format = option.format || "string";  
	option.table  = (option.table === false) ? "" : option.table || "http://kincrew.github.com/xReader/yql/xReader.xml";
	option.ua     = (option.ua == "current") ? navigator.userAgent : option.ua;
	option.status = "init";
	g[option.id]  = function(data) {
		option.result = data;
		if (option.problem) data.error = option.problem;
		if (data.error) option.problem = data.error;
		excute(data, option);
		remove(option.id);
	}
	YQL(option);
	option.timerId = setTimeout(function(){
		option.status = "error";
		option.result = option.problem = {lang:"en-US", description:"timeout"};
		excute(option.problem, option);
	}, option.timeout || xReader.timeout || 10000); //option.timeout || xReader.timeout 
}
var query = function(option, encode) {
	var statement = "";
	statement = (option.table) ? "USE '" + option.table + "' AS xReader;" : "";
	if (option.query) {
		statement = option.query + statement;
		return option.statement = (encode) ? encodeURIComponent(statement) : statement;
	}
	statement += option.query || "SELECT * FROM xReader WHERE url='" + option.url + "'";
	if (option.authorization)   statement += " AND authorization='" + option.authorization + "'";
	if (option.charset)         statement += " AND charset='" + option.charset + "'";
	if (option.cookie)          statement += " AND cookie='" + oJSON(option.cookie) + "'";
	if (option.content)         statement += ' AND content="' + option.content + '"';
	if (option.contentType)     statement += ' AND contentType="' + option.contentType + '"';
	if (option.css)             statement += " AND css='" + option.css + "'";
	if (option.fallbackCharset) statement += ' AND fallbackCharset="' + option.fallbackCharset + '"';
	if (option.foreceCharset)   statement += ' AND foreceCharset="' + option.foreceCharset + '"';
	if (option.headers)         statement += " AND headers='" + oJSON(option.headers) + "'";
	if (option.method)          statement += " AND method='" + option.method + "'";
	if (option.param)           statement += " AND param='" + oJSON(option.param) + "'";
	if (option.referer)         statement += " AND referer='" + option.referer + "'";
	if (option.tidy)            statement += " AND tidy='1'";
	if (option.timeout)         statement += ' AND timeout="' + option.timeout + '"';
	if (option.type)            statement += " AND type='" + option.type + "'";
	if (option.ua)              statement += " AND ua='" + option.ua + "'";
	if (option.xpath)           statement += ' AND xpath="' + option.xpath + '"';
	option.query = statement;
	return option.statement = (encode) ? encodeURIComponent(statement) : statement;
}

/* oJSON */
var oJSON = function(target) {
	if (typeof target != "string") {
		if (oJSON.ecma5) return JSON.stringify(target);
		var result = '', check;
		for (var key in target) {
			if (!check) check = true;
			else result += ',';
			result += '"'+key+ '" : "' + target[key] +  '" ';
		}
		return '{ ' + result + ' }';
	} else {
		return (oJSON.ecma5) ? JSON.parse(target) : eval('('+target+')');
	}
};
if (window.JSON) oJSON.ecma5 = true;

var YQL = function(option){
	var script = option.script = document.createElement('script');
	var src = "query.yahooapis.com/v1/public/yql?q=" + query(option, true) + "&format=json&callback="+ option.id;
	if (option.format == "json" || option.format == "jsonp") src+="&jsonCompat=new";
	src = (option.ssl) ? "http://" + src : "https://" + src;
	script.setAttribute("charset", "utf-8");
	script.setAttribute("type", "text/javascript");
	script.setAttribute("id", "xR" + option.id);
	script.setAttribute("src", src);
	headElement.appendChild(script);
}

var excute = function(data, option) {
	clear(option);
	var cbData, callback;
	var data    = (option.problem) ? undefined : data.query.results && data.query.results.resources;
	var content = (option.problem) ? undefined : data && data.content;
	option.status = (option.problem) ?  "error" : "finish"; 

	if (content && !option.tidy) {
		try {
			switch (option.format) {
				case "json" :
					if (!(/[^,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]/.test(content.replace(/"(\\.|[^"\\])*"/g, '')))) {
						data.content = oJSON(content);
					}
					else {
						content = content.substring(content.indexOf("(")+1, content.lastIndexOf(")"));
						data.content  = eval('('+content+')');
						option.format = "jsonp"; 
					}
					break;
				case "dom"  :
					data.content = strToDom(content);
					break;
				case "dom2" :
					data.content = strToDom(content, true);
					break;
				default :
					option.format = "string";
					data.content  = content;
					break;
			}			
		} catch (err) {
			option.status = "error";
			data.error = option.problem = {lang:"en-US", description:"parse error" };
		}
	}
	callback = (option.problem&&option.error) ? option.error : option.callback;
	cbReturn = callback(data, option);
	if (cbReturn && option.target) appendDom(option.target, cbReturn);
}

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

var clear = function(option) {
	if (option.timerId) clearTimeout(option.timerId);
	headElement.removeChild(option.script);
}

var remove = function(id) {
	try {delete window[id]} catch (err){window[id]=undefined}
}

})(window);