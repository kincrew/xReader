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

(function(g,m,d,u,f,h,q,z){
g.xReader = function(a,b,c,o) {
	var t,i="_"+(new Date()).getTime()+m.floor(m.random()*100),e=d.getElementsByTagName('head')[0];
	b=((typeof b=="function")&&((c&&(o=c)&&(c=b))||(c=b)))?z:b;
	a='USE "'+h+'kincrew.github.com/xReader/yql/xReader.xml" AS x; SELECT * FROM x WHERE url="'+a+q;
	xReader[i]=function(r){
		clearTimeout(t);
		(r.error)?o?o(r.error):c(r):c(r.query.results&&r.query.results.resources);
		e.removeChild(d.getElementById(i));
		delete xReader[i];
	}
	var s=d.createElement('script');
	s[u]("charset","utf-8");
	s[u]("id",i);
	s[u]("src",h+"query.yahooapis.com/v1/public/yql?q="+encodeURIComponent(b?a+' and css="'+b+q:a)+"&format=json&callback=xReader."+i);
	e.appendChild(s);
	t=setTimeout(function(){g[i]({err:{descrption:"timeout"}})}, g.xReader.timeout||10000)
}
})(this,Math,document,"setAttribute","callback=","http://",'"');