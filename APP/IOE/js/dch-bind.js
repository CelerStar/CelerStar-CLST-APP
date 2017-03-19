$("#return").click(function() {

	history.back();
});

$("#bind").click(function() {

	var dchGroupIotPID = $("#dchGroupIotPID").val();
	var dchGroupIotPWD = $("#dchGroupIotPWD").val();

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
			//alert(JSON.stringify(data));
			if(data["INFO"] == "true") {
				alert("绑定成功");
				location.href= "dch-list.html";
			}else
			{
				alert("无该DCH或者DCH信息错误");
			}
		},

		error: function() {

		}

	});
});