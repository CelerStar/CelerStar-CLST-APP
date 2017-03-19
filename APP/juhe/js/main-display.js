$("#return").click(function() {

	history.back();
});
var sortType = "hot";

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

var wareID = decodeURIComponent(request("wareID"));

var page = 1;

var wareTogetherType = "web";

var getWareInfo = function() {

	var message = {
		"LINK": "together",
		"ISTR": "inq",
		"CONT": "wareInfo",
		"wareID": wareID,

	};

	$.ajax({
		type: "GET",
		url: "http://api.celerstar.com/together/index.php",
		timeout: 3000, //超时时间：30秒
		data: message,
		dataType: 'jsonp',
		jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)

		success: function(data) {
			console.log(data["NOTE"].wareWebName);

			if(data["INFO"] == "true") {
				$("#wareWebName").html(data["NOTE"].wareWebName);
				$("#title").html(data["NOTE"].wareWebName);
				$("#wareSynopsis").html(data["NOTE"].wareSynopsis);
				//$("#indexUrl").html(data["NOTE"].wareIndexUrl);
				$("#indexUrl").attr("href", "View.html?url=" + encodeURIComponent(data["NOTE"].wareIndexUrl));

				if(data["NOTE"].wareSiteMaster != "") {
					$("#wareSiteMaster").html(data["NOTE"].wareSiteMaster);
				}

				$("#wareImage").html('<div class="mui-card-header mui-card-media"  style="height:40vw;background-image:url(' + data["NOTE"].wareImage + ')"></div>');

			}

		},

		error: function() {

		},
		　　complete: function(XMLHttpRequest, status) {　　　　
			if(status == 'timeout') {}　　
		}

	});

	return false;
}

var relwareHotNum = function() {

	var message = {
		"LINK": "together",
		"ISTR": "rev",
		"CONT": "wareHotNum",
		"wareID": wareID,

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

var ajax_str = function(string) {

	$.ajax({
		type: "GET",
		url: "http://api.celerstar.com/together/index.php",
		timeout: 3000, //超时时间：30秒
		data: string,
		dataType: 'jsonp',
		jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)

		success: function(data) {
			if(data["INFO"] == "true") {

				page = data["Page"];
				$("#List").empty();
				var size = 0;
				for(var p in data["LIST"]) {
					size++;
					var wareTogetherTitle = data["LIST"][p].wareTogetherTitle;
					var wareTogetherURL = data["LIST"][p].wareTogetherURL;
					var wareTogetherHotNum = data["LIST"][p].wareTogetherHotNum;
					var wareTogetherId = data["LIST"][p].wareTogetherId;

					$("#List").append('<li class="mui-table-view-cell"><a class="mui-ellipsis" href="' + "View.html" + "?url=" + wareTogetherURL + "&wareTogetherId=" + wareTogetherId + '" >' + wareTogetherTitle + '</a><span style="margin-right: -12px; margin-top: -10px;" class="mui-badge mui-badge-primary">' + wareTogetherHotNum + '</span></li>');

				}

				if(size == 0) {

					$("#List").append('<li class="mui-table-view-cell"><a style="color: #FF0000;">无数据</a></li>');

				}

			}
		},

		error: function() {

		},
		　　complete: function(XMLHttpRequest, status) {　　　　
			if(status == 'timeout') {}　　
		}

	});

	return false;
}

var refresh = function(Page) {
	var message = {
		"LINK": "together",
		"ISTR": "inq",
		"CONT": "List",
		"wareID": wareID,
		"sortType": sortType,
		"wareTogetherType": wareTogetherType,
		"Page": Page,
		"PerPageNum": 20,
	};

	ajax_str(message);
}

getWareInfo();
relwareHotNum();
refresh(0);

$("#top").click(function() {
	refresh(1);
});

$("#next").click(function() {
	page = page + 1;
	refresh(page);
});

$("#web").click(function() {
	wareTogetherType = "web";
	refresh(1);
});

$("#tutorial").click(function() {
	wareTogetherType = "tutorial";
	refresh(1);
});

$("#document").click(function() {
	wareTogetherType = "document";
	refresh(1);
});
$("#book").click(function() {
	wareTogetherType = "book";
	refresh(1);
});
$("#video").click(function() {
	wareTogetherType = "video";
	refresh(1);
});
$("#ppt").click(function() {
	wareTogetherType = "ppt";
	refresh(1);
});
$("#file").click(function() {
	wareTogetherType = "file";
	refresh(1);
});
$("#other").click(function() {
	wareTogetherType = "other";
	refresh(1);
});