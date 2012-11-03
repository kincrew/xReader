$(document).ready(function(){
	$("#exDemo1").click(function(){
		var elem = $(this);
		if (elem.hasClass('load')) {
			alert('로딩중입니다...\n 기달려 주세용~');
			return false;
		}
		elem.addClass('load');
		elem.html("로딩중...");
		xReader("http://www.yahoo.com/", function(data) {		
			elem.removeClass('load');
			elem.html("실행하기");
			alert(data.content); 
		});
	});
	$("#exDemo2").click(function(){
		var elem = $(this);
		if (elem.hasClass('load')) {
			alert('로딩중입니다...\n 기달려 주세용~');
			return false;
		}
		elem.addClass('load');
		elem.html("로딩중...");
		xReader("news.naver.com", "dl.mtype_head dt a", function(data) {		
			elem.removeClass('load');
			elem.html("실행하기");
			alert(data.content); 
		});
	});
	$("#exDemo4").click(function(){
		var url = "http://api.flickr.com/services/feeds/photos_public.gne?"; 
		url += "tags=cat&tagmode=any&format=json&jsoncallback=temp"; 
		var elem = $(this);
		if (elem.hasClass('load')) {
			alert('로딩중입니다...\n 기달려 주세용~');
			return false;
		}
		elem.addClass('load');
		elem.html("로딩중...");
		var target = document.getElementById("exDemoResult4");
		target.innerHTML = "";
		xReader(url, function(data) {		
			elem.removeClass('load');
			elem.html("실행하기");
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
			alert('로딩중입니다...\n 기달려 주세용~');
			return false;
		}
		elem.addClass('load');
		elem.html("로딩중...");
		var target = document.getElementById("exDemoResult5");
		target.innerHTML = "";
		xReader("www.khan.co.kr/rss/rssdata/total_news.xml", "title", function(data) {
			elem.removeClass('load');
			elem.html("실행하기");
			var target = document.getElementById("exDemoResult5");
			var html = "<ul>" + data.content.replace(/title/gi, "li") + "</ul>" ;
			target.innerHTML = html;
		});
	});
});