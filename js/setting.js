var exit = function() {

	var message = {
		"LINK": "p2c",
		"ISTR": "exi",
		"CONT": "p",
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
				alert("退出成功");
				location.reload();
			}

		},

		error: function() {
			mui.alert("退出失败");
		}

	});

	return false;
}

var inquser = function() {

	var message = {
		"LINK": "p",
		"ISTR": "inq",
		"CONT": "userinfo",
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

				var peopleWebName = data["LIST"]["peopleWebName"];

				$("#peopleWebName").html(peopleWebName);

				$("#userinfo").removeClass("display");
				$("#exit").removeClass("display");
				$("#login").addClass("display");

			} else {
				$("#userinfo").addClass("display");
				$("#exit").addClass("display");
				$("#login").removeClass("display");

			}

		},

		error: function() {
			mui.alert("退出失败");
		}

	});

	return false;
}

var inqappInfo = function() {

	var message = {
		"LINK": "app",
		"ISTR": "inq",
		"CONT": "appInfo",
		"appIotAID": "0000000100000001",
	};

	$.ajax({

		type: "GET",
		url: "https://api.celerstar.com/APP/index.php",

		data: message,
		timeout: 3000,
		dataType: 'JSONP',
		jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)

		success: function(data) {

			if(data["INFO"] == "true") {
				//	alert(JSON.stringify(data));
				var appWebName = data["NOTE"]["appWebName"];
				var appIotAID = data["NOTE"]["appIotAID"];
				var businessIotBID = data["NOTE"]["businessIotBID"];
				var appVersionNum = data["NOTE"]["appVersionNum"];
				var appVersionString = data["NOTE"]["appVersionString"];
				var appIndexImageUrl = data["NOTE"]["appIndexImageUrl"];
				var appIndexTitle = data["NOTE"]["appIndexTitle"];
				var appViewCount = data["NOTE"]["appViewCount"];
				var appUpdateInfo = data["NOTE"]["appUpdateInfo"];
				var appUpdateUrl = data["NOTE"]["appUpdateUrl"];
				var appUpdateEnable = data["NOTE"]["appUpdateEnable"];

				if(appVersionNum > 1 && appUpdateEnable == "ON") {
					$("#appVersionString").html(appVersionString);
					$("#appUpdateUrl").attr('href',appUpdateUrl); 
					$("#updateBtn").removeClass("display");
				}

			} else {}

		},

		error: function() {}

	});

	return false;
}

$("#return").click(function() {

	history.back();
});

$("#tologin").click(function() {

	location.href = "login.html";
});

$("#exit").click(function() {
	exit();
});

inquser();
inqappInfo();