/*
* xReader.js [SD05]
* 2012-11-02
*/

(function(g,d,x,o,v,z){
g[x] = function(a,b,c,i,w,s,t,e,r) {
	e=g[d].getElementsByTagName('head')[0];
	w = e.appendChild(g[d].createElement('iframe'));
	r = w[o][d].open();
	t = setTimeout(w[o].a=function(r){
		clearTimeout(t);
		(c||b)(r?r.error?r:(a=r.query)&&(a=a.results)&&a.resources):{error:{description:"timeout"}});
		e.removeChild(w)
	}, 10000);
	r.write('<script src="http://query.yahooapis.com/v1/public/yql?q='+encodeURIComponent("USE 'kincrew.github.com/xReader/xReader.xml?s="+document.domain+"' AS x;SELECT * FROM x WHERE url='"+a+"' and css='"+(c?b:'')+"'")+'&format=json&callback=a"></script>')
	r.close();
}
})(this,"document","xReader","contentWindow","timeout");