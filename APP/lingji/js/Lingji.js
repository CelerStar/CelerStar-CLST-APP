var Page = 1;
var PerPageNum = 20;

$("#return").click(function() {

	history.back();
});

$("#msg-send").click(function() {

	var weiboContent = $("#msg-text").val();

	var message = {
		"LINK": "lingji",
		"ISTR": "add",
		"CONT": "info",
		"weiboContent": weiboContent,

	};

	//console.log(weiboContent);
	ajaxsend(message);
	$("#lingji-cont").empty();
	$("#msg-text").val("");

});

var ajax_str = function(string) {

	$.ajax({
		type: "GET",
		url: "https://api.celerstar.com/Lingji/index.php",
		timeout: 3000, //超时时间：30秒
		data: string,
		dataType: 'jsonp',
		jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)

		success: function(data) {
			console.log(data["INFO"]);

			if(data["INFO"] == "true") {

				for(var p in data["LIST"]) {
					var peopleWebName = data["LIST"][p].peopleWebName;
					var weiboContent = data["LIST"][p].weiboContent;
					var weiboSendTime = data["LIST"][p].weiboSendTime;

					$("#lingji-cont").append('<li class="mui-table-view-cell mui-media"><a href="javascript:;" class=""><div class="mui-media-body">' + peopleWebName + '<p class="mui-ellipsis cont">' + weiboContent + '</p></div></a></li>');

				}

			}
			//console.log(JSON.stringify(data));

		},

		error: function() {

		},
		　　complete: function(XMLHttpRequest, status) {　　　　
			if(status == 'timeout') {
				mui.alert("服务器跑外星去了吗?");
			}　　
		}

	});

	return false;
}

var ajaxsend = function(string) {

	$.ajax({
		type: "GET",
		url: "http://api.celerstar.com/Lingji/index.php",
		timeout: 3000, //超时时间：30秒
		data: string,
		dataType: 'jsonp',
		jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)

		success: function(data) {

			if(data["INFO"] == "true") {
				refresh();
			} else {
				location.href = "../../login.html";
			}
			//console.log(JSON.stringify(data));

		},

		error: function(XMLHttpRequest, textStatus, errorThrown) {

			alert("服务器被外星人带走了？");
		}

	});

	return false;
}

var refresh = function() {
	var message = {
		"LINK": "lingji",
		"ISTR": "inq",
		"CONT": "List",
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