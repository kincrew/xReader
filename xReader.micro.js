/*
xReader.js [SD05] 2012-11-14
Copyright © 2012 oneiroi@outlook.com
MIT License http://kincrew.github.com/xReader
*/
(function(g,m,d,h,q,x,o,n,v,A,z){g[x]=function(a,b,c,i,w,s,t,e,r){e=g[d].getElementsByTagName('head')[0];function i(r){clearTimeout(t);(c||b)(r.error?r:(a=r.query)&&(a=a.results)&&a.resources);e.removeChild(w)}w=g[d][n]('iframe');e[A](w);r=w[o][d];r.write("<html><body></body></html>");w[o].e=i;s=r[n]('script');s.charset="utf-8";s.src=h+"query.yahooapis.com/v1/public/yql?q="+encodeURIComponent('USE "'+h+'kincrew.github.com/'+x+'/'+x+'.xml?s='+g[d].domain+'" AS x;SELECT * FROM x WHERE url="'+a+'" and css="'+(c?b:"")+'"')+"&format=json&callback=e";t=setTimeout(function(){i({error:{description:v}})},g[x][v]||10000);r.body[A](s)}})(this,Math,"document","http://",'"',"xReader","contentWindow","createElement","timeout","appendChild")