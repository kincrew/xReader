$(document).ready(function(){
	$("#exDemo1").click(function(){
		var elem = $(this);
		if (elem.hasClass('load')) {
			alert('Wait,plz');
			return false;
		}
		elem.addClass('load');
		elem.html("Loading...");
		xReader("http://www.yahoo.com/", function(data) {		
			elem.removeClass('load');
			elem.html("RUN");
			if (data.error) alert("ERROR! : " + data.error.description)
			else alert(data.content); 
		});
	});
	$("#exDemo2").click(function(){
		var elem = $(this);
		if (elem.hasClass('load')) {
			alert('Wait,plz');
			return false;
		}
		elem.addClass('load');
		elem.html("Loading...");
		xReader("wsj.com", "#main_content h2 a/text()", function(data) {		
			elem.removeClass('load');
			elem.html("RUN");
			if (data.error) alert("ERROR! : " + data.error.description)
			else alert(data.content); 
		});
	});
	$("#exDemo4").click(function(){
		var url = "http://api.flickr.com/services/feeds/photos_public.gne?"; 
		url += "tags=cat&tagmode=any&format=json&jsoncallback=temp"; 
		var elem = $(this);
		if (elem.hasClass('load')) {
			alert('Wait,plz');
			return false;
		}
		elem.addClass('load');
		elem.html("Loading...");
		var target = document.getElementById("exDemoResult4");
		target.innerHTML = "";
		xReader(url, function(data) {		
			elem.removeClass('load');
			elem.html("RUN");
			var result = data.content;
			result = result.substring(result.indexOf("("), result.lastIndexOf(")")+1);
			result = eval(result);
			var items = result.items;
			var html = "";
			for (var i=0; items.length > i ;i++ ) html += "<div>" + items[i].description + "</div>";
			target.innerHTML = html + '<div class="clear"></div>';
		});
	});
	$("#exDemo5").click(function(){
		var elem = $(this);
		if (elem.hasClass('load')) {
			alert('Wait,plz');
			return false;
		}
		elem.addClass('load');
		elem.html("Loading...");
		var target = document.getElementById("exDemoResult5");
		target.innerHTML = "";
		xReader("http://www.nytimes.com/services/xml/rss/nyt/HomePage.xml", "channel", function(data) {
			elem.removeClass('load');
			elem.html("RUN");
			alert(data.content)
			var target = document.getElementById("exDemoResult5");
			var html = "<ul>" + data.content.replace(/title/gi, "li") + "</ul>" ;
			target.innerHTML = html;
		});
	});

});