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

				var appStartImageUrl = data["NOTE"]["appStartImageUrl"];
				var appStartTitle = data["NOTE"]["appStartTitle"];

				localStorage.appStartImageUrl = appStartImageUrl;
				localStorage.appStartTitle = appStartTitle;

			} else {}

		},

		error: function() {}

	});

	return false;
}

if( localStorage.appStartImageUrl != null) {

	$("#start").append('<div class="item-logo " style=" background-position:50% 50%; background-image: url(' + localStorage.appStartImageUrl + '); background-size: cover;background-repeat: no-repeat; background-attachment: fixed;">	<div class="animate guide-show"><h2 class="animated bounceInDown" >' + localStorage.appStartTitle + '</h2>	</div></div>');
} else {

	$("#start").append('<div class="item-logo " style=" background-position:50% 50%; background-image: url(images/start.jpg); background-size: cover;background-repeat: no-repeat; background-attachment: fixed;">	<div class="animate guide-show"><h2 class="animated bounceInDown" >开放 分享 艺术 创造</h2>	</div></div>');
}

inqappInfo();

function jumpurl() {

	location = 'index.html';
}

setTimeout('jumpurl()', 3000);

//提交测试