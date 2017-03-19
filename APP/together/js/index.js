$("#return").click(function() {

	history.back();
});

var ajax_str = function(string) {

	$.ajax({
		type: "GET",
		url: "https://api.celerstar.com/together/index.php",
		timeout: 3000, //超时时间：30秒
		data: string,
		dataType: 'jsonp',
		jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)

		success: function(data) {
			console.log(data["INFO"]);

			if(data["INFO"] == "true") {}
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
		"LINK": "together",
		"ISTR": "inq",
		"CONT": "List",
		"wareID": "00000001",
		"wareTogetherType": "document",
		"Page": 1,
		"PerPageNum": 10,
	};

	ajax_str(message);
}

refresh();