/*
xReader.js [SD05] 2012-11-14
MIT License : Copyright (c) <2012> oneiroi@outlook.com
http://kincrew.github.com/xReader/xReader.kor.html
http://bootleg.egloos.com
*/
(function(g,m,d,u,f,h,q,x,o,n,z){g[x]=function(a,b,c,i,w,s,t,e,r){e=g[d].getElementsByTagName('head')[0];b=(typeof b=="function")&&(c=b)?z:b;a='USE "'+h+'kincrew.github.com/xReader/xReader.xml?s='+d.domain+'" AS x; SELECT * FROM x WHERE url="'+a+q;function i(r){clearTimeout(t);(r.error)?c(r):c(r.query.results&&r.query.results.resources);e.removeChild(w);}w=g[d][n]('iframe');e.appendChild(w);r=w[o][d];r.write("<html><body></body></html>");r.close();w[o].e=i;s=r[n]('script');s[u]("charset","utf-8");s[u]("src",h+"query.yahooapis.com/v1/public/yql?q="+encodeURIComponent(b?a+' and css="'+b+q:a)+"&format=json&callback=e");r.body.appendChild(s);t=setTimeout(function(){i({error:{descrption:"timeout"}})},g[x].timeout||10000);};})(window,Math,"document","setAttribute","callback=","http://",'"','xReader','contentWindow','createElement');