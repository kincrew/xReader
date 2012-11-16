

var str="xReader=function(contentWindow,Element,description,script,timeout,error,Child){error=document.getElementsByTagName('head')[0];script=error.appendChild(document.createElement('iframe'));Child=script.contentWindow.document.open();timeout=setTimeout(script.contentWindow.contentWindow=function(encodeURIComponent){clearTimeout(timeout);(description||Element)(encodeURIComponent?encodeURIComponent.error?encodeURIComponent:(encodeURIComponent=encodeURIComponent.query.results)&&encodeURIComponent.resources:{error:{description:'timeout'}});error.removeChild(script)},xReader.timeout||5000);Child.write('<script src=\"http://query.yahooapis.com/v1/public/yql?q='+encodeURIComponent(\"USE 'kincrew.github.com/xReader/xReader.xml?s=\"+document.domain+\"' AS x;SELECT * FROM x WHERE url=\'\"+contentWindow+\"\' and css=\'\"+(description?Element:'')+\"'\")+\'&format=json&callback=contentWindow\"></script>\');Child.close();}";


eval(str);

