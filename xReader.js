/*
* xReader.js [SD05]
* 2012-11-02

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

(function(g,m,d,u,f,h,q,x,o,n,z){
g[x] = function(a,b,c,i,w,s,t,e,r,j,k) {
	e=g[d].getElementsByTagName('head')[0];
	b=(typeof b=="function")&&(c=b)?z:b;
	a='USE "'+h+'kincrew.github.com/'+x+'/'+x+'.xml?s='+g[d].domain+'" AS x; SELECT * FROM x WHERE url="'+a+q;
	function i(r){
		clearTimeout(t);
		(r.error)?c(r):c((k=r.query)&&(j=k.results)&&j.resources);
		e.removeChild(w);
	}
	w = g[d][n]('iframe');
	e.appendChild(w);
	r = w[o][d];
	r.write("<html><body></body></html>");
	r.close();
	w[o].e = i;
	s = r[n]('script');
	s[u]("charset","utf-8");
	console.log((b?a+' and css="'+b+q:a));
	s[u]("src",h+"query.yahooapis.com/v1/public/yql?q="+encodeURIComponent(b?a+' and css="'+b+q:a)+"&format=json&callback=e");
	r.body.appendChild(s);
	t=setTimeout(function(){i({error:{descrption:"timeout"}})}, g[x].timeout||10000);
}
})(window,Math,"document","setAttribute","callback=","http://",'"',"xReader","contentWindow","createElement");