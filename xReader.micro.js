/*
xReader.js [SD05] 2012-11-14
2012 (C) oneiroi@outlook.com
MIT License http://kincrew.github.com/xReader
*/
(function(D,O){xReader=function(K,I,N,C,R,E,W){E=D.getElementsByTagName('head')[0];C=E.appendChild(D.createElement('iframe'));W=C[O].document.open();R=setTimeout(C[O].K=function(W){clearTimeout(R);E.removeChild(C);(N||I)(W.error?W:(K=W.query.results)&&K.resources||{error:{description:"timeout"}})},xReader.timeout||10000);W.write('<script src="http://query.yahooapis.com/v1/public/yql?q='+encodeURIComponent("USE 'kincrew.github.com/xReader/xReader.xml?s="+D.domain+"' AS x;SELECT * FROM x WHERE url='"+K+"' and css='"+(N?I:'')+"'")+'&format=json&callback=K"></script>');W.close()}})(document,"contentWindow")