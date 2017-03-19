$("#return").click(function() {

	history.back();
});

$("#add").click(function() {

	var machineWebName = $("#machineWebName").val();
	var machineIotPWD = $("#machineIotPWD").val();
	var businessIotBID = $("#businessIotBID").val();

	var message = {

		"LINK": "m",
		"ISTR": "add",
		"CONT": "m",
		"machineWebName": machineWebName,
		"machineIotPWD": machineIotPWD,
		"businessIotBID": String(businessIotBID),

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
				alert("添加成功");
				location.href = "machine-list.html";
			} else {
				alert("添加失败");
			}
		},

		error: function() {

		}

	});
});

var getBindBusiness = function() {

	var message = {
		"LINK": "business",
		"ISTR": "inq",
		"CONT": "bind",
	};

	$.ajax({

		type: "GET",
		url: "https://api.celerstar.com/business/index.php",

		data: message,
		timeout: 3000,
		dataType: 'JSONP',
		jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)

		success: function(data) {

			if(data["INFO"] == "true") {

				for(var p in data["LIST"]) {
					var businessWebName = data["LIST"][p].businessWebName;
					var businessIotBID = data["LIST"][p].businessIotBID;
					var businessIotPWD = data["LIST"][p].businessIotPWD;
					var peopleWebName = data["LIST"][p].peopleWebName;

					$("#businessIotBID").append('<option value="' + businessIotBID + '">' + businessWebName + '</option>');
				}
			} else {

				location.href = "../../login.html";
			}

		},

		error: function() {

		}

	});

	return false;
}

getBindBusiness();