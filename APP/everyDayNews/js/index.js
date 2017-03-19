var newsClass = "all";

var Page = 1;
var PerPageNum = 20;

$("#return").click(function() {

	history.back();
});

function getColorByBaiFenBi(bili) {
	//var 百分之一 = (单色值范围) / 50;  单颜色的变化范围只在50%之内  
	var one = (255 + 255) / 100;
	var r = 0;
	var g = 0;
	var b = 0;

	if(bili < 50) {
		// 比例小于50的时候红色是越来越多的,直到红色为255时(红+绿)变为黄色.  
		r = one * bili;
		g = 255;
	}
	if(bili >= 50) {
		// 比例大于50的时候绿色是越来越少的,直到0 变为纯红  
		g = 255 - ((bili - 50) * one);
		r = 255;
	}
	r = parseInt(r); // 取整  
	g = parseInt(g); // 取整  
	b = parseInt(b); // 取整  

	//console.log("#"+r.toString(16,2)+g.toString(16,2)+b.toString(16,2));  
	//return "#"+r.toString(16,2)+g.toString(16,2)+b.toString(16,2);  
	//console.log("rgb("+r+","+g+","+b+")" );  
	return "rgb(" + r + "," + g + "," + b + ")";

}

function colorRGBToHex(color) {　　
	var regexpRGB = /^(rgb|RGB)([0-9]{1,3},s?[0-9]{1,3},s?[0-9]{1,3})$/; //RGB  
	　　
	if(regexpRGB.test(color)) {　　　　
		color = color.replace(/((|)|rgb|RGB)*/g, "").split(",");　　　　
		var colorHex = "#";　　　　
		for(var i = 0; i < color.length; i++) {　　　　　　
			var hex = Number(color[i]).toString(16);　　　　　　
			if(hex.length == 1) hex = "0" + hex;　　　　　　
			colorHex += hex;　　　　
		}　　　　
		return colorHex;　　
	} else {　　　　
		return color;　　
	}
}

var ajax_str = function(string) {

	$.ajax({
		type: "GET",
		url: "https://api.celerstar.com/EveryDayNews/index.php",
		timeout: 3000, //超时时间：30秒
		data: string,
		dataType: 'jsonp',
		jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)

		success: function(data) {
			console.log(data);

			if(data["INFO"] == "true") {

				for(var p in data["LIST"]) {
					var peopleWebName = data["LIST"][p].peopleWebName;
					var everydayNewsTitle = data["LIST"][p].everydayNewsTitle;
					var everydayNewsViewCount = data["LIST"][p].everydayNewsViewCount;
					var newsId = data["LIST"][p].newsId;
					var everydayNewsURL = encodeURIComponent(data["LIST"][p].everydayNewsURL);

					var tempWareHotNum = 0;

					if(everydayNewsViewCount > 256) {
						tempWareHotNum = 256;
					} else {
						tempWareHotNum = everydayNewsViewCount;
					}

					var baifen = tempWareHotNum / 256 * 100;

					var colorRgb = getColorByBaiFenBi(baifen);
					var color16 = colorRGBToHex(colorRgb);

					$("#lingji-cont").append('<li class="mui-table-view-cell mui-media"><a href="' + "newsView.html" + "?url=" + everydayNewsURL + "&newsId=" + newsId + '" class=""><div class="mui-media-body mui-ellipsis">' + everydayNewsTitle + '<p class="mui-ellipsis cont">' + peopleWebName + '</p></div></a><span class="mui-badge " style=" margin-top: 12px;color: #FFFFFF; background: ' + color16 + ';">' + everydayNewsViewCount + '</span></li>');

				}

			}
			console.log(JSON.stringify(data));

		},

		error: function() {

		},
		　　complete: function(XMLHttpRequest, status) {　　　　
			if(status == 'timeout') {
				alert("服务器跑外星去了吗?");
			}　　
		}

	});

	return false;
}

var refresh = function() {
	var message = {
		"LINK": "everydaynews",
		"ISTR": "inq",
		"CONT": "todayTopList",
		"newsClass": newsClass,
		"Page": Page,
		"PerPageNum": PerPageNum,
	};

	ajax_str(message);
}

$(window).scroll(function() {
	if($(document).scrollTop() <= 0) {
		//alert("滚动条已经到达顶部为0");
	}
	if($(document).scrollTop() >= $(document).height() - $(window).height()) {
		Page = Page + 1;

		refresh();
	}
});

refresh();