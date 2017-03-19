var register = function(string) {

	$.ajax({

		type: "GET",
		url: "https://api.celerstar.com/IOT/index.php",

		data: string,
		timeout: 3000, //超时时间：30秒
		dataType: 'JSONP',
		jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)

		success: function(data) {
			if(data["INFO"] == "true") {
				var peopleWebName = $("#peopleWebName").val();
				location.href = "register-check.html?peopleWebName=" + peopleWebName;
			} else {
			     alert("注册失败！请重新注册或者找回密码");
				location.href = "login.html";
			}

		},

		error: function() {
			mui.alert("服务器被外星人带走了？");
		}

	});

	return false;
}

$("#reg").click(function() {

	var peopleWebName = $("#peopleWebName").val();
	var peopleWebPWD = $("#peopleWebPWD").val();
	//var peopleWebEmail = $("#peopleWebEmail").val();
	var peopleWebEmail;
	var peoplePhoneNum = $("#peoplePhoneNum").val();

	var message = {
		"LINK": "p",
		"ISTR": "add",
		"CONT": "p",
		"TYPE": "sms",
		"PID": peopleWebName,
		"PWD": peopleWebPWD,
		"EMAIL": peopleWebEmail,
		"PHONE": peoplePhoneNum,
	};

	register(message);
});