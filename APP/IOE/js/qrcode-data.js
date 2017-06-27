var qrcodeIotPID;
var PageNum = 1;
var MaxPerPage = 10;
var qrcodeDeleteAllowed = "false";

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

qrcodeIotPID = request("qrcodeIotPID");

$("#promptBtn").click(function() {
	$("#liuyan").show();
});

$("#add").click(function() {

	qrcodeInfo = $("#qrcodeInfo").val();

	var message = {
		"LINK": "qrcode",
		"ISTR": "add",
		"CONT": "public-qrcodeDataInfo",
		"qrcodeIotPID": qrcodeIotPID,
		"qrcodeInfo": qrcodeInfo
	};

	$.ajax({

		type: "GET",
		url: "https://api.celerstar.com/IOT/index.php",
		data: message,
		timeout: 3000,
		dataType: 'JSONP',
		jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)

		success: function(data) {

			if(data["INFO"] == "true") {

				$("#qrcodeInfo").val("");
				$("#liuyan").hide();
				getQrcodeInfoLatest();
			}

		},

		error: function() {
			//getQrcodeInfo();
		}

	});
});

$("#cancel").click(function() {
	$("#liuyan").hide();

});

var arr = ["#33CC99", "#FF6666", "#0099CC", "#99CC33"];

var delQrcodeInfo = function(qrcodeInfoId) {

	var message = {
		"LINK": "qrcode",
		"ISTR": "del",
		"CONT": "public-qrcodeDataInfo",
		"qrcodeIotPID": qrcodeIotPID,
		"qrcodeInfoId": qrcodeInfoId
	};

	$.ajax({

		type: "GET",
		url: "https://api.celerstar.com/IOT/index.php",
		data: message,
		timeout: 3000,
		dataType: 'JSONP',
		jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)

		success: function(data) {
			//alert(JSON.stringify(data));
			if(data["INFO"] == "true") {
				$("#qrcodeInfoId_list").empty();
				getQrcodeInfo();
			}

		},

		error: function() {
			//getQrcodeInfo();
		}

	});
}

var getPublicQrcodeMessage = function() {

	var message = {
		"LINK": "qrcode",
		"ISTR": "inq",
		"CONT": "public-qrcodeMessage",
		"qrcodeIotPID": qrcodeIotPID
	};

	$.ajax({

		type: "GET",
		url: "https://api.celerstar.com/IOT/index.php",
		async: false,
		data: message,
		timeout: 3000,
		dataType: 'JSONP',
		jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)

		success: function(data) {

			if(data["INFO"] == "true") {
				//$("#machine_list").empty();

				//var qrcodeIotPID = data["LIST"].qrcodeIotPID;
				var qrcodeWebName = data["LIST"].qrcodeWebName;
				qrcodeDeleteAllowed = data["LIST"].qrcodeDeleteAllowed;
				
				//alert(qrcodeDeleteAllowed);
				document.title = qrcodeWebName;
                getQrcodeInfo();
			}

		},

		error: function() {
			getQrcodeInfo();
		}

	});
}

var getQrcodeInfoLatest = function() {

	var message = {
		"LINK": "qrcode",
		"ISTR": "inq",
		"CONT": "public-qrcode-d-latest",
		"qrcodeIotPID": qrcodeIotPID
	};

	$.ajax({

		type: "GET",
		url: "https://api.celerstar.com/IOT/index.php",
		data: message,
		timeout: 3000,
		dataType: 'JSONP',
		jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)

		success: function(data) {

			if(data["INFO"] == "true") {
				//$("#machine_list").empty();

				var qrcodeInfo = data["LIST"].qrcodeInfo;
				var messageTime = data["LIST"].messageTime;
				var qrcodeInfoId = data["LIST"].qrcodeInfoId;
				var index = arr[Math.floor(Math.random() * arr.length)];

				if(qrcodeDeleteAllowed == "true") {
					$("#qrcodeInfoId_list").prepend('<div id="qrcodeInfoId_list"><div class="mui-card" style="background:' + index + ';"><div class="mui-card-content"><div class="mui-card-content-inner"><p style="color:#FFFFFF">' + qrcodeInfo + '</p></div></div><div class="mui-card-footer"><a class="mui-card-link" style="color: #FFFFFF;">' + messageTime + '</a><a class="mui-card-link" style="color: #FFFFFF;" onclick="delQrcodeInfo(' + qrcodeInfoId + ')" >删除</a></div></div></div>');

				} else {
					$("#qrcodeInfoId_list").prepend('<div id="qrcodeInfoId_list"><div class="mui-card" style="background:' + index + ';"><div class="mui-card-content"><div class="mui-card-content-inner"><p style="color:#FFFFFF">' + qrcodeInfo + '</p></div></div><div class="mui-card-footer"><a class="mui-card-link" style="color: #FFFFFF;">' + messageTime + '</a><a class="mui-card-link" style="color: #FFFFFF;" onclick="delQrcodeInfo(' + qrcodeInfoId + ')" ></a></div></div></div>');

				}

			}

		},

		error: function() {
			//getQrcodeInfo();
		}

	});
}

var getQrcodeInfo = function() {

	var message = {
		"LINK": "qrcode",
		"ISTR": "inq",
		"CONT": "public-qrcode-d-page",
		"qrcodeIotPID": qrcodeIotPID,
		"PageNum": PageNum,
		"MaxPerPage": MaxPerPage
	};

	$.ajax({

		type: "GET",
		url: "https://api.celerstar.com/IOT/index.php",
		data: message,
		timeout: 3000,
		dataType: 'JSONP',
		jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)

		success: function(data) {

			if(data["INFO"] == "true") {

				if(data["LIST"] != null) {

					for(var p in data["LIST"]) {
						var qrcodeInfo = data["LIST"][p].qrcodeInfo;
						var messageTime = data["LIST"][p].messageTime;
						var qrcodeInfoId = data["LIST"][p].qrcodeInfoId;
						var index = arr[Math.floor(Math.random() * arr.length)];

						if(qrcodeDeleteAllowed == "true") {
							
							
							$("#qrcodeInfoId_list").append('<div id="qrcodeInfoId_list"><div class="mui-card" style="background:' + index + ';"><div class="mui-card-content"><div class="mui-card-content-inner"><p style="color:#FFFFFF">' + qrcodeInfo + '</p></div></div><div class="mui-card-footer"><a class="mui-card-link" style="color: #FFFFFF;">' + messageTime + '</a><a class="mui-card-link" style="color: #FFFFFF;" onclick="delQrcodeInfo(' + qrcodeInfoId + ')" >删除</a></div></div></div>');

						} else {
							$("#qrcodeInfoId_list").append('<div id="qrcodeInfoId_list"><div class="mui-card" style="background:' + index + ';"><div class="mui-card-content"><div class="mui-card-content-inner"><p style="color:#FFFFFF">' + qrcodeInfo + '</p></div></div><div class="mui-card-footer"><a class="mui-card-link" style="color: #FFFFFF;">' + messageTime + '</a><a class="mui-card-link" style="color: #FFFFFF;" onclick="delQrcodeInfo(' + qrcodeInfoId + ')" ></a></div></div></div>');

						}
					}
				} else {

				}

			}

		},

		error: function() {
			getQrcodeInfo();
		}

	});
}

getPublicQrcodeMessage();

$(window).scroll(function() {
	if($(document).scrollTop() <= 0) {}
	if($(document).scrollTop() >= $(document).height() - $(window).height()) {
		PageNum = PageNum + 1;
		getQrcodeInfo();
	}
});