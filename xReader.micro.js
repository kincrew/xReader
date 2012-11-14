/*
xReader.js [SD05] 2012-11-14
2012 (C) oneiroi@outlook.com
MIT License http://kincrew.github.com/xReader
*/
(function(g,d,x,o,n,v,A){g[x]=function(a,b,c,i,w,s,t,e,r){e=d.getElementsByTagName('head')[0];function i(r){clearTimeout(t);(c||b)(r.error?r:(a=r.query)&&(a=a.results)&&a.resources);e.removeChild(w)}e[A](w=d[n]('iframe'));r=w[o].document;r.write("<html><body></body></html>");r.close();w[o].e=i;s=r[n]('script');s.charset="utf-8";s.src="http://query.yahooapis.com/v1/public/yql?q="+encodeURIComponent('USE "http://kincrew.github.com/'+x+'/'+x+'.xml?s='+d.domain+'" AS x;SELECT * FROM x WHERE url="'+a+'" and css="'+(c?b:"")+'"')+"&format=json&callback=e";t=setTimeout(function(){i({error:{description:v}})},g[x][v]||10000);r.body[A](s)}})(this,document,"xReader","contentWindow","createElement","timeout","appendChild")