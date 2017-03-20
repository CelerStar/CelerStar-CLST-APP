$("#return").click(function() {

	history.back();
});

$("#add").click(function() {

	if(localStorage.selectState == "creat") {
		location.href = "channel-add.html";
	} else {
		location.href = "channel-bind.html";
	}
});

if(localStorage.selectState == null) {
	localStorage.selectState = "creat";
}

var getCreatChannel = function() {

	var message = {
		"LINK": "y",
		"ISTR": "inq",
		"CONT": "self",
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
				$("#channel_list").empty();
				for(var p in data["LIST"]) {
					var channelWebName = data["LIST"][p].channelWebName;
					var channelIotPID = data["LIST"][p].channelIotPID;
					var channelIotPWD = data["LIST"][p].channelIotPWD;
					var channelIotBindState = data["LIST"][p].channelIotBindState;
					var businessIotBID = data["LIST"][p].businessIotBID;
					var peopleWebName = data["LIST"][p].peopleWebName;

					if(channelIotBindState == "true") {
						channelIotBindHtml = '';
					} else {
						channelIotBindHtml = '<a type="button"class="mui-btn mui-btn-success"  onclick=\'binChannel("' + channelIotPID + '","' + channelIotPWD + '") \' >绑定</a>&nbsp;&nbsp;';
					}

					$("#channel_list").append('<li class="mui-table-view-cell mui-collapse mui-table-view-cell mui-collapse "><a class="mui-navigate-right">' + channelWebName + '</a><ul class="mui-table-view mui-table-view-chevron"><li class="mui-table-view-cell"><a class="">通讯ID <span  style="color: #FF0000;">' + channelIotPID + '</span></a></li><li class="mui-table-view-cell"><a class="">应用ID <span  style="color: #FF0000;">' + businessIotBID + '</span></a></li><li class="mui-table-view-cell"><a class="">通讯密码 <span  style="color: #FF0000;">' + channelIotPWD + '</span></a></li><li class="mui-table-view-cell"><div class="mui-button-row">' + channelIotBindHtml + '<a type="button"class="mui-btn mui-btn-danger"  onclick=\'delChannel("' + channelIotPID + '") \'>删除</a></div></li></ul></li>');

				}

				$('#channel_list>li').click(function(e) {

					if($(this).hasClass('mui-active')) {
						$(this).removeClass("mui-active");
					} else {
						$(this).addClass("mui-active").siblings("li").removeClass("mui-active");
					}
					$(this).children("ul").click(function(e) {
						e.stopPropagation();
					});
				});

			} else {

				location.href = "../../login.html";
			}

		},

		error: function() {

		}

	});

	return false;
}

var getBindChannel = function() {

	var message = {
		"LINK": "y",
		"ISTR": "inq",
		"CONT": "bind",
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
				$("#channel_list").empty();
				for(var p in data["LIST"]) {
					var channelWebName = data["LIST"][p].channelWebName;
					var channelIotPID = data["LIST"][p].channelIotPID;
					var channelIotPWD = data["LIST"][p].channelIotPWD;
					var channelIotBindState = data["LIST"][p].channelIotBindState;
					var businessIotBID = data["LIST"][p].businessIotBID;
					var peopleWebName = data["LIST"][p].peopleWebName;

					$("#channel_list").append('<li class="mui-table-view-cell mui-collapse mui-table-view-cell mui-collapse "><a class="mui-navigate-right">' + channelWebName + '</a><ul class="mui-table-view mui-table-view-chevron"><li class="mui-table-view-cell"><a class="">通讯ID <span  style="color: #FF0000;">' + channelIotPID + '</span></a></li><li class="mui-table-view-cell"><a class="">应用ID <span  style="color: #FF0000;">' + businessIotBID + '</span></a></li><li class="mui-table-view-cell"><a class="">通讯密码 <span  style="color: #FF0000;">' + channelIotPWD + '</span></a></li><li class="mui-table-view-cell"><div class="mui-button-row"><a type="button"class="mui-btn mui-btn-danger" onclick=\'relChannel("' + channelIotPID + '") \' >解绑</a></div></li></ul></li>');

				}

				$('#channel_list>li').click(function(e) {

					if($(this).hasClass('mui-active')) {
						$(this).removeClass("mui-active");
					} else {
						$(this).addClass("mui-active").siblings("li").removeClass("mui-active");
					}
					$(this).children("ul").click(function(e) {
						e.stopPropagation();
					});
				});

			} else {

				location.href = "../../login.html";
			}

		},

		error: function() {

		}

	});

	return false;
}

if(localStorage.selectState == "creat") {
	$("#creatBtn").addClass("mui-active");
	$("#bindBtn").removeClass("mui-active");
	getCreatChannel();
}

if(localStorage.selectState == "bind") {
	$("#bindBtn").addClass("mui-active");
	$("#creatBtn").removeClass("mui-active");
	getBindChannel();
}

$("#creatBtn").click(function() {
	localStorage.selectState = "creat";
	$("#creatBtn").addClass("mui-active");
	$("#bindBtn").removeClass("mui-active");
	getCreatChannel();

});

$("#bindBtn").click(function() {
	localStorage.selectState = "bind";
	$("#bindBtn").addClass("mui-active");
	$("#creatBtn").removeClass("mui-active");
	getBindChannel();
});

var binChannel = function(channelIotPID, channelIotPWD) {

	var message = {
		"LINK": "y",
		"ISTR": "bin",
		"CONT": "y",
		"YID": channelIotPID,
		"PWD": channelIotPWD,

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
				alert("绑定成功");

				if(localStorage.selectState == "creat") {
					getCreatChannel();
				}

				if(localStorage.selectState == "bind") {
					getBindChannel();
				}
			}
		},

		error: function() {}

	});

}

var delChannel = function(channelIotPID) {

	var message = {
		"LINK": "y",
		"ISTR": "del",
		"CONT": "y",
		"YID": channelIotPID,

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
				alert("删除成功");

				if(localStorage.selectState == "creat") {
					getCreatChannel();
				}

				if(localStorage.selectState == "bind") {
					getBindChannel();
				}
			}
		},

		error: function() {}

	});

}

var relChannel = function(channelIotPID) {

	var message = {
		"LINK": "y",
		"ISTR": "rel",
		"CONT": "y",
		"YID": channelIotPID,

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
				alert("解绑成功");

				if(localStorage.selectState == "creat") {
					getCreatChannel();
				}

				if(localStorage.selectState == "bind") {
					getBindChannel();
				}
			}
		},

		error: function() {}

	});

}