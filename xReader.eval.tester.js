var str ="xReader=function(contentWindow,Element,description,script,timeout,error,Child){error=document.getElementsByTagName('head')[0];script=error.appendChild(document.createElement('iframe'));Child=script.contentWindow.document.open();timeout=setTimeout(script.contentWindow.contentWindow=function(encodeURIComponent){clearTimeout(timeout);(description||Element)(encodeURIComponent?encodeURIComponent.error?encodeURIComponent:(encodeURIComponent=encodeURIComponent.query.results)&&encodeURIComponent.resources:{error:{description:'timeout'}});error.removeChild(script)},xReader.timeout||5000);Child.write('<script src=\"http://query.yahooapis.com/v1/public/yql?q='+encodeURIComponent(\"USE 'kincrew.github.com/xReader/xReader.xml?s=\"+document.domain+\"' AS x;SELECT * FROM x WHERE url=\'\"+contentWindow+\"\' and css=\'\"+(description?Element:'')+\"'\")+\'&format=json&callback=contentWindow\"></script>\');Child.close();}";
eval(str);


console.log("#########################################");
console.log("#             PACK TESTER               #");
console.log("#########################################");

var _test="";

// \" = 6
_test += "######################|";
_test += "encodeURIxReader|Component|.com/|error|Child|xReader|function|";
_test += "html|query|Com|Timeout|.create|.append|create|append|.remove|remove|removeChild|iframe|createElement|";
_test += "######################|";
_test += ";html|remove|append|removeChild|Child|timeout|Timeout|body|Com|";
_test += "######################|";
_test += ");|')|('|?q='+|='|'+|+'|";
_test += "######################|";
_test += "');|\"'+|)}|)+|';|&&|;(|://|()|({|){|))|";
_test += "######################";


// \" * 10 10 3 = 7
// \'  * 5

var REPLACE = "2=12(8,5,de7ion,7,t6,3,11){3=4.get5sByTagName('head')[0];7=3.append11(4.create5('iframe'));11=7.8.4.open();t6=setT6(7.8.8=12(9){clearT6(t6);(de7ion||5)(9?9.3?9:(9=9.query.results)&&9.resources:{3:{de7ion:'t6'}});3.remove11(7)},2.t6||10000);11.write('<7 src=\"http://query.yahooapis.com/v1/public/yql?q='+9(\"USE 'kincrew.github.com/2/2.xml?s=\"+4.domain+\"' AS x;SELECT * FROM x WHERE url=\'\"+8+\"\' and css=\'\"+(de7ion?5:'')+\"'\")+\'&format=json&callback=8\"></7>\')}";



// 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27
var _ = function(key, string) {
	var strs = string || str;
	var split = (strs).split(key); var join = (split).join("^");
	var oLength = strs.length; var rLength = join.length;
	var count   = split.length - 1;
	var diff    = oLength - rLength;
	var shrink  = diff - (key.length + 1);
	var shrink2 = diff - (count + key.length + 1);
	var result = { 
		input  : key, //result : join,
		count  : count,
		diff    : diff,
		shrink  : shrink,
		shrink2 : shrink2,
		keyLength : key.length,
		l: shrink - shrink2
	}
	return result;
}
var tester = function(list) {
	var result = [];
	var list   = list.split("|");
	for (var i=0; i < list.length ; i++){
		var result = _(list[i],REPLACE);
		console.log("### " + list[i]+ " ("+result.count+") "+result.shrink + ", "+ result.shrink2+", "+ result.l);
	}
}


tester(_test);

console.log(str.length);
console.log(REPLACE.length);
console.log(1 - REPLACE.length/str.length);
REPLACE = REPLACE.split("12").join('function'); // '"' 
REPLACE = REPLACE.split("11").join('Child'); // '"' 
REPLACE = REPLACE.split("9").join('encodeURIComponent'); // '"' 
REPLACE = REPLACE.split("8").join('contentWindow'); // '"' 
REPLACE = REPLACE.split("7").join('script'); // '"' 
REPLACE = REPLACE.split("6").join('imeout'); // '"' 
REPLACE = REPLACE.split("5").join('Element'); // '"' 
REPLACE = REPLACE.split("4").join('document'); // '"' 
REPLACE = REPLACE.split("3").join('error'); // '"' 
REPLACE = REPLACE.split("2").join('xReader'); // '"' 
eval(REPLACE);

eval(function(a,b,c){
	while(c) {
		a=a.split(a).join(a[--i]);
	}
	return a;
})("2=12(8,5,de7ion,7,t6,3,11){3=4.get5sByTagName('head')[0];7=3.append11(4.create5('iframe'));11=7.8.4.open();t6=setT6(7.8.8=12(9){clearT6(t6);(de7ion||5)(9?9.3?9:(9=9.query.results)&&9.resources:{3:{de7ion:'t6'}});3.remove11(7)},2.t6||10000);11.write('<7 src=\"http://query.yahooapis.com/v1/public/yql?q='+9(\"USE 'kincrew.github.com/2/2.xml?s=\"+4.domain+\"' AS x;SELECT * FROM x WHERE url=\'\"+8+\"\' and css=\'\"+(de7ion?5:'')+\"'\")+\'&format=json&callback=8\"></7>\')}","1|xReader|error|document|Element|imeout|script|contentWindow|encodeURIComponent|Child|function|".split("|",12))