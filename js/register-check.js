var registercheck = function(string) {

	$.ajax({

		type: "GET",
		url: "https://api.celerstar.com/IOT/index.php",

		data: string,
		timeout: 3000,
		dataType: 'JSONP',
		jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)

		success: function(data) {

			if(data["INFO"] == "true") {
				mui.alert("激活成功！请登陆");
				location.href = "login.html";
			} else {
				mui.alert("激活失败！请重新注册或者找回密码");
				location.href = "login.html";
			}
		},
		error: function() {
			mui.alert("服务器被外星人带走了？");
		}

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

$("#check").click(function() {

	var peopleWebName = request("peopleWebName");
	var peopleActivateNum = $("#peopleActivateNum").val();

	var message = {
		"LINK": "p",
		"ISTR": "add",
		"CONT": "check",
		"peopleWebName": peopleWebName,
		"peopleActivateNum": peopleActivateNum,
	};

	registercheck(message);
});