var newsId = 0;
$("#return").click(function() {

	history.back();
});

var changeHeight = function() {
	var vheight = $(window).height();
	//$("#wnewsIframe").height(vheight);
	$("#newsIframe").height(vheight);
	$("#vnewsIframe").height(vheight);


}

function request(paras) {
	var url = location.href;
	var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
	var paraObj = {}
	for(i = 0; j = paraString[i]; i++) {
		paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
	}
	var returnValue = paraObj[paras.toLowerCase()];
	if(typeof(returnValue) == "undefined") {
		return "";
	} else {
		return returnValue;
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

			if(data["INFO"] == "true") {}

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

var everydayNewsViewCount = function() {
	var message = {
		"LINK": "everydaynews",
		"ISTR": "rev",
		"CONT": "everydayNewsViewCount",
		"newsId": newsId,

	};

	ajax_str(message);
}

var urlAdress = decodeURIComponent(request("url"));
newsId = decodeURIComponent(request("newsId"));

everydayNewsViewCount();
$("#newsIframe").attr("src", urlAdress);
changeHeight();