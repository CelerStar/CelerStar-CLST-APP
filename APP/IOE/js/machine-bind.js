$("#return").click(function() {

	history.back();
});

$("#bind").click(function() {

	var machineIotPID = $("#machineIotPID").val();
	var machineIotPWD = $("#machineIotPWD").val();

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
			//alert(JSON.stringify(data));
			if(data["INFO"] == "true") {
				alert("绑定成功");
				location.href= "machine-list.html";
			}else
			{
				alert("无该设备或者设备信息错误");
			}
		},

		error: function() {

		}

	});
});