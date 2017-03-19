var getHardNews = function() {

	var message = {
		"LINK": "everydaynews",
		"ISTR": "inq",
		"CONT": "todayTopList",
		"newsClass": "H-all",
		"Page": "1",
		"PerPageNum": "1",
	};

	$.ajax({
		type: "GET",
		url: "https://api.celerstar.com/EveryDayNews/index.php",
		timeout: 3000, //超时时间：30秒
		data: message,
		dataType: 'jsonp',
		jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)

		success: function(data) {
			console.log(data);

			if(data["INFO"] == "true") {

				var peopleWebName = data["LIST"][0].peopleWebName;
				var everydayNewsTitle = data["LIST"][0].everydayNewsTitle;
				var everydayNewsViewCount = data["LIST"][0].everydayNewsViewCount;
				var newsId = data["LIST"][0].newsId;
				var everydayNewsURL = encodeURIComponent(data["LIST"][0].everydayNewsURL);
				var everydayNewsImageURL = data["LIST"][0].everydayNewsImageURL;
				var everydayNewsSendTime = data["LIST"][0].everydayNewsSendTime;
				var everydayNewsSynopsis = data["LIST"][0].everydayNewsSynopsis.substring(0, 64) + "...";

				$("#hardNews").append('<div class="mui-card-header mui-card-media" style="height:40vw;background-image:url(' + everydayNewsImageURL + ')"></div><div class="mui-card-header" style="background: #22aaaa; color: #ffffff;">' + everydayNewsTitle + '</div><div class="mui-card-content"><div class="mui-card-content-inner"><p>' + everydayNewsSendTime + ' 浏览量:' + everydayNewsViewCount + '</p><p style="color:#333">' + everydayNewsSynopsis + '</p></div></div><div class="mui-card-footer"><a class="mui-card-link" style="color: #22aaaa;">' + peopleWebName + '</a> <a class="mui-card-link" style="color: #22aaaa;" href="' + "APP/everyDayNews/newsView.html" + "?url=" + everydayNewsURL + "&newsId=" + newsId + '">查看详情</a></div>');
			}
			//console.log(JSON.stringify(data));

		},

		error: function() {

		}

	});
}

var getSoftNews = function() {

	var message = {
		"LINK": "everydaynews",
		"ISTR": "inq",
		"CONT": "todayTopList",
		"newsClass": "S-all",
		"Page": "1",
		"PerPageNum": "1",
	};

	$.ajax({
		type: "GET",
		url: "https://api.celerstar.com/EveryDayNews/index.php",
		timeout: 3000, //超时时间：30秒
		data: message,
		dataType: 'jsonp',
		jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)

		success: function(data) {
			console.log(data);

			if(data["INFO"] == "true") {

				var peopleWebName = data["LIST"][0].peopleWebName;
				var everydayNewsTitle = data["LIST"][0].everydayNewsTitle;
				var everydayNewsViewCount = data["LIST"][0].everydayNewsViewCount;
				var newsId = data["LIST"][0].newsId;
				var everydayNewsURL = encodeURIComponent(data["LIST"][0].everydayNewsURL);
				var everydayNewsImageURL = data["LIST"][0].everydayNewsImageURL;
				var everydayNewsSendTime = data["LIST"][0].everydayNewsSendTime;
				var everydayNewsSynopsis = data["LIST"][0].everydayNewsSynopsis.substring(0, 64) + "...";

				$("#softNews").append('<div class="mui-card-header mui-card-media" style="height:40vw;background-image:url(' + everydayNewsImageURL + ')"></div><div class="mui-card-header" style="background: #22aaaa; color: #ffffff;">' + everydayNewsTitle + '</div><div class="mui-card-content"><div class="mui-card-content-inner"><p>' + everydayNewsSendTime + ' 浏览量:' + everydayNewsViewCount + '</p><p style="color:#333">' + everydayNewsSynopsis + '</p></div></div><div class="mui-card-footer"><a class="mui-card-link" style="color: #22aaaa;">' + peopleWebName + '</a> <a class="mui-card-link"  style="color: #22aaaa;" href="' + "APP/everyDayNews/newsView.html" + "?url=" + everydayNewsURL + "&newsId=" + newsId + '">查看详情</a></div>');
			}
			//console.log(JSON.stringify(data));

		},

		error: function() {

		}

	});
}

var getOpenTimeHard = function() {
	var message = {
		"LINK": "juhe",
		"ISTR": "inq",
		"CONT": "List",
		"wareType": "hard",
		"wareClass": "all",
		"sortType": "time",
		"Page": "1",
		"PerPageNum": "3",
	};

	$.ajax({
		type: "GET",
		url: "https://api.celerstar.com/JUHE/index.php",
		timeout: 3000, //超时时间：30秒
		data: message,
		dataType: 'jsonp',
		jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)

		success: function(data) {

			if(data["INFO"] == "true") {

				for(var p in data["LIST"]) {
					var wareWebName = data["LIST"][p].wareWebName;
					var wareID = data["LIST"][p].wareID;
					var wareIndexUrl = data["LIST"][p].wareIndexUrl;
					var wareImage = data["LIST"][p].wareImage;
					var wareSynopsis = data["LIST"][p].wareSynopsis;
					var wareHotNum = data["LIST"][p].wareHotNum;
					$("#openTimeHard").append('<li class="mui-table-view-cell mui-media mui-col-xs-4"><a href="' + "APP/juhe/main-display.html" + "?wareID=" + wareID + '"><img class="mui-media-object" style="height: 25vw;"  src="' + wareImage + '"><div class="mui-media-body" style="color: #22aaaa;">' + wareWebName + '</div></a></li>');
				}

			}
			//console.log(JSON.stringify(data));

		},

		error: function() {

		}

	});
}

var getOpenHotHard = function() {
	var message = {
		"LINK": "juhe",
		"ISTR": "inq",
		"CONT": "List",
		"wareType": "hard",
		"wareClass": "all",
		"sortType": "hot",
		"Page": "1",
		"PerPageNum": "3",
	};

	$.ajax({
		type: "GET",
		url: "https://api.celerstar.com/JUHE/index.php",
		timeout: 3000, //超时时间：30秒
		data: message,
		dataType: 'jsonp',
		jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)

		success: function(data) {

			if(data["INFO"] == "true") {

				for(var p in data["LIST"]) {
					var wareWebName = data["LIST"][p].wareWebName;
					var wareID = data["LIST"][p].wareID;
					var wareIndexUrl = data["LIST"][p].wareIndexUrl;
					var wareImage = data["LIST"][p].wareImage;
					var wareSynopsis = data["LIST"][p].wareSynopsis;
					var wareHotNum = data["LIST"][p].wareHotNum;
					$("#openHotHard").append('<li class="mui-table-view-cell mui-media mui-col-xs-4"><a href="' + "APP/juhe/main-display.html" + "?wareID=" + wareID + '"><img class="mui-media-object" style="height: 25vw;"  src="' + wareImage + '"><div class="mui-media-body" style="color: #22aaaa;">' + wareWebName + '</div></a></li>');
				}

			}
			//console.log(JSON.stringify(data));

		},

		error: function() {

		}

	});
}

var getOpenTimeSoft = function() {
	var message = {
		"LINK": "juhe",
		"ISTR": "inq",
		"CONT": "List",
		"wareType": "soft",
		"wareClass": "all",
		"sortType": "time",
		"Page": "1",
		"PerPageNum": "3",
	};

	$.ajax({
		type: "GET",
		url: "https://api.celerstar.com/JUHE/index.php",
		timeout: 3000, //超时时间：30秒
		data: message,
		dataType: 'jsonp',
		jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)

		success: function(data) {

			if(data["INFO"] == "true") {

				for(var p in data["LIST"]) {
					var wareWebName = data["LIST"][p].wareWebName;
					var wareID = data["LIST"][p].wareID;
					var wareIndexUrl = data["LIST"][p].wareIndexUrl;
					var wareImage = data["LIST"][p].wareImage;
					var wareSynopsis = data["LIST"][p].wareSynopsis;
					var wareHotNum = data["LIST"][p].wareHotNum;
					$("#openTimeSoft").append('<li class="mui-table-view-cell mui-media mui-col-xs-4"><a href="' + "APP/juhe/main-display.html" + "?wareID=" + wareID + '"><img class="mui-media-object" style="height: 25vw;"  src="' + wareImage + '"><div class="mui-media-body" style="color: #22aaaa;">' + wareWebName + '</div></a></li>');
				}

			}
			//console.log(JSON.stringify(data));

		},

		error: function() {

		}

	});
}

var getOpenTimeTeam = function() {
	var message = {
		"LINK": "juhe",
		"ISTR": "inq",
		"CONT": "List",
		"wareType": "team",
		"wareClass": "all",
		"sortType": "time",
		"Page": "1",
		"PerPageNum": "3",
	};

	$.ajax({
		type: "GET",
		url: "https://api.celerstar.com/JUHE/index.php",
		timeout: 3000, //超时时间：30秒
		data: message,
		dataType: 'jsonp',
		jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)

		success: function(data) {

			if(data["INFO"] == "true") {

				for(var p in data["LIST"]) {
					var wareWebName = data["LIST"][p].wareWebName;
					var wareID = data["LIST"][p].wareID;
					var wareIndexUrl = data["LIST"][p].wareIndexUrl;
					var wareImage = data["LIST"][p].wareImage;
					var wareSynopsis = data["LIST"][p].wareSynopsis;
					var wareHotNum = data["LIST"][p].wareHotNum;
					$("#openTimeTeam").append('<li class="mui-table-view-cell mui-media mui-col-xs-4"><a href="' + "APP/juhe/main-display.html" + "?wareID=" + wareID + '"><img class="mui-media-object" style="height: 25vw;"  src="' + wareImage + '"><div class="mui-media-body" style="color: #22aaaa;">' + wareWebName + '</div></a></li>');
				}

			}
			//console.log(JSON.stringify(data));

		},

		error: function() {

		}

	});
}

var getOpenTimeInfo = function() {
	var message = {
		"LINK": "juhe",
		"ISTR": "inq",
		"CONT": "List",
		"wareType": "industry",
		"wareClass": "all",
		"sortType": "time",
		"Page": "1",
		"PerPageNum": "3",
	};

	$.ajax({
		type: "GET",
		url: "https://api.celerstar.com/JUHE/index.php",
		timeout: 3000, //超时时间：30秒
		data: message,
		dataType: 'jsonp',
		jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)

		success: function(data) {

			if(data["INFO"] == "true") {

				for(var p in data["LIST"]) {
					var wareWebName = data["LIST"][p].wareWebName;
					var wareID = data["LIST"][p].wareID;
					var wareIndexUrl = data["LIST"][p].wareIndexUrl;
					var wareImage = data["LIST"][p].wareImage;
					var wareSynopsis = data["LIST"][p].wareSynopsis;
					var wareHotNum = data["LIST"][p].wareHotNum;
					$("#openTimeInfo").append('<li class="mui-table-view-cell mui-media mui-col-xs-4"><a href="' + "APP/juhe/main-display.html" + "?wareID=" + wareID + '"><img class="mui-media-object" style="height: 25vw;"  src="' + wareImage + '"><div class="mui-media-body" style="color: #22aaaa;">' + wareWebName + '</div></a></li>');
				}

			}
			//console.log(JSON.stringify(data));

		},

		error: function() {

		}

	});
}

var getOpenHotSoft = function() {
	var message = {
		"LINK": "juhe",
		"ISTR": "inq",
		"CONT": "List",
		"wareType": "soft",
		"wareClass": "all",
		"sortType": "hot",
		"Page": "1",
		"PerPageNum": "3",
	};

	$.ajax({
		type: "GET",
		url: "https://api.celerstar.com/JUHE/index.php",
		timeout: 3000, //超时时间：30秒
		data: message,
		dataType: 'jsonp',
		jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)

		success: function(data) {

			if(data["INFO"] == "true") {

				for(var p in data["LIST"]) {
					var wareWebName = data["LIST"][p].wareWebName;
					var wareID = data["LIST"][p].wareID;
					var wareIndexUrl = data["LIST"][p].wareIndexUrl;
					var wareImage = data["LIST"][p].wareImage;
					var wareSynopsis = data["LIST"][p].wareSynopsis;
					var wareHotNum = data["LIST"][p].wareHotNum;
					$("#openHotSoft").append('<li class="mui-table-view-cell mui-media mui-col-xs-4"><a href="' + "APP/juhe/main-display.html" + "?wareID=" + wareID + '"><img class="mui-media-object" style="height: 25vw;"  src="' + wareImage + '"><div class="mui-media-body" style="color: #22aaaa;">' + wareWebName + '</div></a></li>');
				}

			}
			//console.log(JSON.stringify(data));

		},

		error: function() {

		}

	});
}

var getOpenHotTeam = function() {
	var message = {
		"LINK": "juhe",
		"ISTR": "inq",
		"CONT": "List",
		"wareType": "team",
		"wareClass": "all",
		"sortType": "hot",
		"Page": "1",
		"PerPageNum": "3",
	};

	$.ajax({
		type: "GET",
		url: "https://api.celerstar.com/JUHE/index.php",
		timeout: 3000, //超时时间：30秒
		data: message,
		dataType: 'jsonp',
		jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)

		success: function(data) {

			if(data["INFO"] == "true") {

				for(var p in data["LIST"]) {
					var wareWebName = data["LIST"][p].wareWebName;
					var wareID = data["LIST"][p].wareID;
					var wareIndexUrl = data["LIST"][p].wareIndexUrl;
					var wareImage = data["LIST"][p].wareImage;
					var wareSynopsis = data["LIST"][p].wareSynopsis;
					var wareHotNum = data["LIST"][p].wareHotNum;
					$("#openHotTeam").append('<li class="mui-table-view-cell mui-media mui-col-xs-4"><a href="' + "APP/juhe/main-display.html" + "?wareID=" + wareID + '"><img class="mui-media-object" style="height: 25vw;"  src="' + wareImage + '"><div class="mui-media-body" style="color: #22aaaa;">' + wareWebName + '</div></a></li>');
				}

			}
			//console.log(JSON.stringify(data));

		},

		error: function() {

		}

	});
}

var getOpenHotInfo = function() {
	var message = {
		"LINK": "juhe",
		"ISTR": "inq",
		"CONT": "List",
		"wareType": "industry",
		"wareClass": "all",
		"sortType": "hot",
		"Page": "1",
		"PerPageNum": "3",
	};

	$.ajax({
		type: "GET",
		url: "https://api.celerstar.com/JUHE/index.php",
		timeout: 3000, //超时时间：30秒
		data: message,
		dataType: 'jsonp',
		jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)

		success: function(data) {

			if(data["INFO"] == "true") {

				for(var p in data["LIST"]) {
					var wareWebName = data["LIST"][p].wareWebName;
					var wareID = data["LIST"][p].wareID;
					var wareIndexUrl = data["LIST"][p].wareIndexUrl;
					var wareImage = data["LIST"][p].wareImage;
					var wareSynopsis = data["LIST"][p].wareSynopsis;
					var wareHotNum = data["LIST"][p].wareHotNum;
					$("#openHotInfo").append('<li class="mui-table-view-cell mui-media mui-col-xs-4"><a href="' + "APP/juhe/main-display.html" + "?wareID=" + wareID + '"><img class="mui-media-object" style="height: 25vw;"  src="' + wareImage + '"><div class="mui-media-body" style="color: #22aaaa;">' + wareWebName + '</div></a></li>');
				}

			}
			//console.log(JSON.stringify(data));

		},

		error: function() {

		}

	});
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
				localStorage.appIndexImageUrl = appIndexImageUrl;
				localStorage.appIndexTitle = appIndexTitle;

			} else {}

		},

		error: function() {}

	});

	return false;
}

var upAppViewCount = function() {

	var message = {
		"LINK": "app",
		"ISTR": "rev",
		"CONT": "appViewCount",
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

			} else {}

		},

		error: function() {}

	});

	return false;
}

if(localStorage.appIndexImageUrl != null) {

	$("#indexNav").append('<div class="mui-card-header mui-card-media" style="height:50vw;background-image:url(' + localStorage.appIndexImageUrl + ')"></div><div class="mui-card-content"><div class="mui-card-content-inner"><div class="mui-text-center"><h4 >' + localStorage.appIndexTitle + '</h4></div></div></div>');

} else {

	$("#indexNav").append('<div class="mui-card-header mui-card-media" style="height:50vw;background-image:url(images/index.jpg)"></div><div class="mui-card-content"><div class="mui-card-content-inner"><div class="mui-text-center"><h4 >开放 分享 艺术 创造</h4></div></div></div>');

}
inqappInfo();

upAppViewCount();
getHardNews();
getSoftNews();
getOpenTimeHard();
getOpenHotHard();
getOpenTimeSoft();
getOpenHotSoft();
getOpenTimeInfo();
getOpenHotInfo();
getOpenTimeTeam();
getOpenHotTeam();