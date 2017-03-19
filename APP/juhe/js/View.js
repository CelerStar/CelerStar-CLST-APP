$("#return").click(function() {

	history.back();
});
var changeHeight = function() {
	var vheight = $(window).height();
	$("#newsIframe").height(vheight);
	$("#vnewsIframe").height(vheight);

}

var relwareTogetherTHotNum = function() {

	var message = {
		"LINK": "together",
		"ISTR": "rev",
		"CONT": "wareTogetherHotNum",
		"wareTogetherId": wareTogetherId,

	};

	$.ajax({
		type: "GET",
		url: "http://api.celerstar.com/together/index.php",
		timeout: 3000, //超时时间：30秒
		data: message,
		dataType: 'jsonp',
		jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)

		success: function(data) {
			console.log(JSON.stringify(data));
		},

		error: function() {},
		　　complete: function(XMLHttpRequest, status) {}

	});

	return false;
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

var wareTogetherId = decodeURIComponent(request("wareTogetherId"));
var urlAdress = decodeURIComponent(request("url"));
relwareTogetherTHotNum();
$("#newsIframe").attr("src", urlAdress);
changeHeight();