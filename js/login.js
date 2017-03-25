var peopleWebName;
var peopleWebPWD;

$("#peopleWebName").val(localStorage.peopleWebName);
$("#peopleWebPWD").val(localStorage.peopleWebPWD);

var ajax_str = function(string) {

	$.ajax({

		type: "GET",
		url: "https://api.celerstar.com/IOT/index.php",

		data: string,
		timeout: 5000,
		dataType: 'JSONP',
		jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)

		success: function(data) {

			if(data["INFO"] == "true") {

				localStorage.peopleWebName = peopleWebName;
				localStorage.peopleWebPWD = peopleWebPWD;

				location.href = "index.html";
			}else
			{
				alert("没有账户或者信息错误");
			}

		},

		error: function() {

		}

	});

	return false;
}

$("#login").click(function() {
	peopleWebName = $("#peopleWebName").val();
	peopleWebPWD = $("#peopleWebPWD").val();

	var message = {
		"LINK": "p2c",
		"ISTR": "log",
		"CONT": "p",
		"peopleWebName": peopleWebName,
		"peopleWebPWD": peopleWebPWD,
	};

	ajax_str(message);
});

$("#register").click(function() {
	location.href = "register.html";
});