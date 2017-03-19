$("#return").click(function() {

	history.back();
});

$("#add").click(function() {

	if(selectState == "creat") {
		location.href = "machine-add.html";
	} else {
		location.href = "machine-bind.html";
	}
});

var selectState = "creat";

var getCreatMachine = function() {

	var message = {
		"LINK": "m",
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
				$("#machine_list").empty();
				for(var p in data["LIST"]) {
					var machineWebName = data["LIST"][p].machineWebName;
					var machineIotPID = data["LIST"][p].machineIotPID;
					var machineIotPWD = data["LIST"][p].machineIotPWD;

					var machineIotState = data["LIST"][p].machineIotState;
					var machineIotBindState = data["LIST"][p].machineIotBindState;
					var businessIotBID = data["LIST"][p].businessIotBID;
					var peopleWebName = data["LIST"][p].peopleWebName;

					var stateButtonClass;

					console.log(machineIotBindState);
					if(machineIotBindState == "true") {
						machineIotBindHtml = '';
					} else {
						machineIotBindHtml = '<a type="button" class="mui-btn mui-btn-success" onclick=\'binMachine("' + machineIotPID + '","' + machineIotPWD + '") \'>绑定</a>&nbsp;&nbsp;';
					}

					if(machineIotState == "ON") {
						stateButtonClass = "mui-active";
					} else {
						stateButtonClass = "";
					}

					$("#machine_list").append('<li class="mui-table-view-cell mui-collapse mui-table-view-cell mui-collapse "><a class="mui-navigate-right">' + machineWebName + '</a><ul class="mui-table-view mui-table-view-chevron"><li class="mui-table-view-cell"><a class="">通讯ID <span  style="color: #FF0000;">' + machineIotPID + '</span></a></li><li class="mui-table-view-cell"><a class="">应用ID <span  style="color: #FF0000;">' + businessIotBID + '</span></a></li><li class="mui-table-view-cell"><a class="">在线状态</a><div id="M_Toggle"class="mui-switch ' + stateButtonClass + '"data-switch="1"><div class="mui-switch-handle"></div></div></li><li class="mui-table-view-cell"><a class="">通讯密码 <span  style="color: #FF0000;">' + machineIotPWD + '</span></a></li><li class="mui-table-view-cell"><div class="mui-button-row">' + machineIotBindHtml + '<a type="button"class="mui-btn mui-btn-primary">修改</a>&nbsp;&nbsp;<a type="button"class="mui-btn mui-btn-danger" onclick=\'delMachine("' + machineIotPID + '") \' >删除</a></div></li></ul></li>');

				}

				$('#machine_list>li').click(function(e) {

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
			alert("错误");
		}

	});

	return false;
}

var getBindMachine = function() {

	var message = {
		"LINK": "m",
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
				$("#machine_list").empty();
				for(var p in data["LIST"]) {
					var machineWebName = data["LIST"][p].machineWebName;
					var machineIotPID = data["LIST"][p].machineIotPID;
					var machineIotPWD = data["LIST"][p].machineIotPWD;
					var machineIotState = data["LIST"][p].machineIotState;
					var businessIotBID = data["LIST"][p].businessIotBID;
					var peopleWebName = data["LIST"][p].peopleWebName;

					var stateButtonClass;

					if(machineIotState == "ON") {
						stateButtonClass = "mui-active";
					} else {
						stateButtonClass = "";
					}

					$("#machine_list").append('<li class="mui-table-view-cell mui-collapse mui-table-view-cell mui-collapse "><a class="mui-navigate-right">' + machineWebName + '</a><ul class="mui-table-view mui-table-view-chevron"><li class="mui-table-view-cell"><a class="">通讯ID <span  style="color: #FF0000;">' + machineIotPID + '</span></a></li><li class="mui-table-view-cell"><a class="">应用ID <span  style="color: #FF0000;">' + businessIotBID + '</span></a></li><li class="mui-table-view-cell"><a class="">在线状态</a><div id="M_Toggle"class="mui-switch ' + stateButtonClass + '"data-switch="1"><div class="mui-switch-handle"></div></div></li><li class="mui-table-view-cell"><a class="">通讯密码 <span  style="color: #FF0000;">' + machineIotPWD + '</span></a></li><li class="mui-table-view-cell"><a class="">创建账户 <span  style="color: #FF0000;">' + peopleWebName + '</span></a></li><li class="mui-table-view-cell"><div class="mui-button-row"><a type="button"class="mui-btn mui-btn-primary" href="sensor-list.html?machineIotPID=' + machineIotPID + '">查看</a>&nbsp;&nbsp;<a type="button"class="mui-btn mui-btn-danger"  onclick=\'relMachine("' + machineIotPID + '") \' >解绑</a>&nbsp;&nbsp;<a type="button" href="machine-send.html?machineIotPID=' + machineIotPID + '" class="mui-btn mui-btn-success" >推送</a></div></li></ul></li>');

				}

				$('#machine_list>li').click(function(e) {

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
			alert("错误");
		}

	});

	return false;
}

if(selectState == "creat") {
	getCreatMachine();
}

if(selectState == "bind") {
	getBindMachine();
}

$("#creatBtn").click(function() {
	selectState = "creat";
	$("#creatBtn").addClass("mui-active");
	$("#bindBtn").removeClass("mui-active");
	getCreatMachine();

});

$("#bindBtn").click(function() {
	selectState = "bind";
	$("#bindBtn").addClass("mui-active");
	$("#creatBtn").removeClass("mui-active");
	getBindMachine();
});

var binMachine = function(machineIotPID, machineIotPWD) {

	var message = {

		"LINK": "m",
		"ISTR": "bin",
		"CONT": "m",
		"MID": machineIotPID,
		"PWD": machineIotPWD,

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

				if(selectState == "creat") {
					getCreatMachine();
				}

				if(selectState == "bind") {
					getBindMachine();
				}
			}
		},

		error: function() {}

	});

}

var delMachine = function(machineIotPID) {

	var message = {

		"LINK": "m",
		"ISTR": "del",
		"CONT": "m",
		"MID": machineIotPID,
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

				if(selectState == "creat") {
					getCreatMachine();
				}

				if(selectState == "bind") {
					getBindMachine();
				}
			}
		},

		error: function() {}

	});

}

var relMachine = function(machineIotPID) {

	var message = {

		"LINK": "m",
		"ISTR": "rel",
		"CONT": "m",
		"MID": machineIotPID,
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

				if(selectState == "creat") {
					getCreatMachine();
				}

				if(selectState == "bind") {
					getBindMachine();
				}
			}
		},

		error: function() {}

	});

}