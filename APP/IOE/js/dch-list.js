$("#return").click(function() {

	history.back();
});

$("#add").click(function() {

	if(localStorage.selectState == "creat") {
		location.href = "dch-add.html";
	} else {
		location.href = "dch-bind.html";
	}
});

if(localStorage.selectState == null) {
	localStorage.selectState = "creat";
}

var getCreatDch = function() {

	var message = {
		"LINK": "t",
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
				$("#dch_list").empty();
				for(var p in data["LIST"]) {
					var dchGroupWebName = data["LIST"][p].dchGroupWebName;
					var dchGroupIotPID = data["LIST"][p].dchGroupIotPID;
					var dchGroupIotPWD = data["LIST"][p].dchGroupIotPWD;
					var dchGroupIotBindState = data["LIST"][p].dchGroupIotBindState;
					var dchGroupIotCount = data["LIST"][p].dchGroupIotCount;
					var businessIotBID = data["LIST"][p].businessIotBID;
					var peopleWebName = data["LIST"][p].peopleWebName;

					if(dchGroupIotBindState == "true") {
						dchIotBindHtml = '';
					} else {
						dchIotBindHtml = '<a type="button"class="mui-btn mui-btn-success"  onclick=\'binDch("' + dchGroupIotPID + '","' + dchGroupIotPWD + '") \' >绑定</a>&nbsp;&nbsp;';
					}

					$("#dch_list").append('<li class="mui-table-view-cell mui-collapse mui-table-view-cell mui-collapse "><a class="mui-navigate-right">' + dchGroupWebName + '</a><ul class="mui-table-view mui-table-view-chevron"><li class="mui-table-view-cell"><a class="">通讯ID <span  style="color: #FF0000;">' + dchGroupIotPID + '</span></a></li><li class="mui-table-view-cell"><a class="">应用ID <span  style="color: #FF0000;">' + businessIotBID + '</span></a></li><li class="mui-table-view-cell"><a class="">在线数量</a><span class="mui-badge mui-badge-success">' + dchGroupIotCount + '</span></li><li class="mui-table-view-cell"><a class="">通讯密码 <span  style="color: #FF0000;">' + dchGroupIotPWD + '</span></a></li><li class="mui-table-view-cell"><div class="mui-button-row">' + dchIotBindHtml + '<a type="button"class="mui-btn mui-btn-danger"  onclick=\'delDch("' + dchGroupIotPID + '") \'>删除</a></div></li></ul></li>');

				}

				$('#dch_list>li').click(function(e) {

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

var getBindDch = function() {

	var message = {
		"LINK": "t",
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
				$("#dch_list").empty();
				for(var p in data["LIST"]) {
					var dchGroupWebName = data["LIST"][p].dchGroupWebName;
					var dchGroupIotPID = data["LIST"][p].dchGroupIotPID;
					var dchGroupIotPWD = data["LIST"][p].dchGroupIotPWD;
					var dchGroupIotBindState = data["LIST"][p].dchGroupIotBindState;
					var dchGroupIotCount = data["LIST"][p].dchGroupIotCount;
					var businessIotBID = data["LIST"][p].businessIotBID;
					var peopleWebName = data["LIST"][p].peopleWebName;

					$("#dch_list").append('<li class="mui-table-view-cell mui-collapse mui-table-view-cell mui-collapse "><a class="mui-navigate-right">' + dchGroupWebName + '</a><ul class="mui-table-view mui-table-view-chevron"><li class="mui-table-view-cell"><a class="">通讯ID <span  style="color: #FF0000;">' + dchGroupIotPID + '</span></a></li><li class="mui-table-view-cell"><a class="">应用ID <span  style="color: #FF0000;">' + businessIotBID + '</span></a></li><li class="mui-table-view-cell"><a class="">在线数量</a><span class="mui-badge mui-badge-success">' + dchGroupIotCount + '</span></li><li class="mui-table-view-cell"><a class="">通讯密码 <span  style="color: #FF0000;">' + dchGroupIotPWD + '</span></a></li><li class="mui-table-view-cell"><div class="mui-button-row"><a type="button"class="mui-btn mui-btn-danger" onclick=\'relDch("' + dchGroupIotPID + '") \' >解绑</a></div></li></ul></li>');

				}

				$('#dch_list>li').click(function(e) {

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

if(localStorage.selectState == "creat") {
	$("#creatBtn").addClass("mui-active");
	$("#bindBtn").removeClass("mui-active");
	getCreatDch();
}

if(localStorage.selectState == "bind") {
	$("#bindBtn").addClass("mui-active");
	$("#creatBtn").removeClass("mui-active");
	getBindDch();
}

$("#creatBtn").click(function() {
	localStorage.selectState = "creat";
	$("#creatBtn").addClass("mui-active");
	$("#bindBtn").removeClass("mui-active");
	getCreatDch();

});

$("#bindBtn").click(function() {
	localStorage.selectState = "bind";
	$("#bindBtn").addClass("mui-active");
	$("#creatBtn").removeClass("mui-active");
	getBindDch();
});

var binDch = function(dchGroupIotPID, dchGroupIotPWD) {

	var message = {
		"LINK": "t",
		"ISTR": "bin",
		"CONT": "t",
		"TID": dchGroupIotPID,
		"PWD": dchGroupIotPWD,

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
					getCreatDch();
				}

				if(localStorage.selectState == "bind") {
					getBindDch();
				}
			}
		},

		error: function() {}

	});

}

var delDch = function(dchGroupIotPID) {

	var message = {
		"LINK": "t",
		"ISTR": "del",
		"CONT": "t",
		"TID": dchGroupIotPID,

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
					getCreatDch();
				}

				if(localStorage.selectState == "bind") {
					getBindDch();
				}
			}
		},

		error: function() {}

	});

}

var relDch = function(dchGroupIotPID) {

	var message = {
		"LINK": "t",
		"ISTR": "rel",
		"CONT": "t",
		"TID": dchGroupIotPID,

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
					getCreatDch();
				}

				if(localStorage.selectState == "bind") {
					getBindDch();
				}
			}
		},

		error: function() {}

	});

}