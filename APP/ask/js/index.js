var qrcodeIotPID;
var PageNum = 1;
var MaxPerPage = 20;
var qrcodeDeleteAllowed = "false";
var peopleWebName = "";

var qrcodeDataIda;
var qrcodeDatasIda;

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

qrcodeIotPID = request("qrcodeIotPID");


//获取最大标题
var getPublicQrcodeMessage = function() {

	var message = {
		"LINK": "qrcode",
		"ISTR": "inq",
		"CONT": "public-qrcodeMessage",
		"qrcodeIotPID": qrcodeIotPID
	};

	$.ajax({

		type: "GET",
		url: "https://api.celerstar.com/IOT/index.php",
		async: false,
		data: message,
		dataType: 'JSONP',
		jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)

		success: function(data) {

			if(data["INFO"] == "true") {
				//$("#machine_list").empty();

				//var qrcodeIotPID = data["LIST"].qrcodeIotPID;
				var qrcodeWebName = data["LIST"].qrcodeWebName;

				//alert(qrcodeWebName);
				qrcodeDeleteAllowed = data["LIST"].qrcodeDeleteAllowed;

				//alert(qrcodeDeleteAllowed);
				document.title = qrcodeWebName;

				$("#NavName").html(qrcodeWebName);
				getQrcodeInfo();
			}

		},

		error: function() {
			getQrcodeInfo();
		}

	});
}

var getpublicqrcodedsid = function(qrcodeDatasId) {

	var message = {
		"LINK": "qrcode",
		"ISTR": "inq",
		"CONT": "public-qrcode-ds-id",
		"qrcodeDatasId": qrcodeDatasId
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

				var qrcodeInfoId = data["LIST"].qrcodeInfoId;
				var qrcodeDatasId = data["LIST"].qrcodeDatasId;
				var qrcodeInfo = data["LIST"].qrcodeInfo;

				var qrcodeTitle = data["LIST"].qrcodeTitle;
				var qrcodeType = data["LIST"].qrcodeType;
				var messageTime = data["LIST"].messageTime;
				var peopleWebName = data["LIST"].peopleWebName;





				$("#askType").html(qrcodeType);
				
				if(qrcodeType == null || qrcodeType == "")
				{
					$("#askType").hide();
					
				}
				
				$("#askTitle").html(qrcodeTitle);
				$("#askName").html(peopleWebName);

			}

		},

		error: function() {

		}

	});

}


$("#promptBtn").click(function() {
		$("#main").show();
	    $("#askCon").hide();
	    $("#ask").hide();
	    
	   $("#askType").show();
});






$("#exitBtn").click(function() {
	exit();
});


$("#navMainBtn").click(function() {
		if($("#navMainNav").hasClass('active')) {
		$("#navMainNav").removeClass("active");
	} else {
		$("#navMainNav").addClass("active");
	}
});





$("#askBtn").click(function() {

	if(peopleWebName == "") {
		location.href = "https://www.celerstar.com/MVC/Views/Authenticate/page_login.php";
	}

	$("#main").hide();
	$("#askCon").hide();
	$("#ask").show();

});


$("#publish_submit").click(function() {

	if(peopleWebName == "") {
		location.href = "https://www.celerstar.com/MVC/Views/Authenticate/page_login.php";
	}else
	{
	
	
		qrcodeTitle = $("#qrcodeTitle").val();
	     qrcodeType = $("#qrcodeType").val();
	     
		var message = {
			"LINK": "qrcode",
			"ISTR": "add",
			"CONT": "public-qrcodeDatasInfo",
			"qrcodeDataId": qrcodeDataIda,
			"qrcodeTitle": qrcodeTitle,
			"qrcodeType": qrcodeType
		};
		
		if(qrcodeTitle != "")
		{
			$.ajax({
		
				type: "GET",
				url: "https://api.celerstar.com/IOT/index.php",
				data: message,
				dataType: 'JSONP',
				jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
		
				success: function(data) {
		
					if(data["INFO"] == "true") {
						
						$("#qrcodeTitle").val("");
						 $("#qrcodeType").val("");
						 
						 
						 	$("#main").show();
	                        $("#askCon").hide();
	                        $("#ask").hide();
	                        
	                        	$("#qrcodeDatasInfo_list").empty();
	                        getQrcodeDatasInfo(qrcodeDataIda);
	                        
					}
		
				},
		
				error: function() {
					//getQrcodeInfo();
				}
		
			});
		}else
		{
			alert("问题禁止为空");
		}


	}

});




$("#replyBtn").click(function() {

	if(peopleWebName == "") {
		location.href = "https://www.celerstar.com/MVC/Views/Authenticate/page_login.php";
	}else
	{
	
	
		qrcodeInfo = $("#replyCont").val();
	    
	     
		var message = {
			"LINK": "qrcode",
			"ISTR": "add",
			"CONT": "public-qrcodeDatassInfo",
			"qrcodeDatasId": qrcodeDatasIda,
			"qrcodeInfo": qrcodeInfo
		};
		
		if(qrcodeInfo != "")
		{
			$.ajax({
		
				type: "GET",
				url: "https://api.celerstar.com/IOT/index.php",
				data: message,
			
				dataType: 'JSONP',
				jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
		
				success: function(data) {
		
					if(data["INFO"] == "true") {
						
						$("#replyCont").val("");

						 	$("#main").hide();
	                        $("#askCon").show();
	                        $("#ask").hide();
	                        
	                        $("#reful_list").empty();
	                        
	                        PageNum = 1;
	                        
	                        getQrcodeDatassInfo(qrcodeDatasIda);
	                        
					}
		
				},
		
				error: function() {
					//getQrcodeInfo();
				}
		
			});
		}else
		{
			alert("问题禁止为空");
		}


	}

});




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
	
		dataType: 'JSONP',
		jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)

		success: function(data) {

			if(data["INFO"] == "true") {

				peopleWebName = data["LIST"]["peopleWebName"];

				$("#logregBtn").hide();
				$("#askBtn").show();
			    $("#usrBtn").show();
			} else {

			}

		},

		error: function() {

		}

	});

	return false;
}

inquser();
//获取问题列表
var getQrcodeDatasInfo = function(qrcodeDataId) {

	var message = {
		"LINK": "qrcode",
		"ISTR": "inq",
		"CONT": "public-qrcode-ds-page",
		"qrcodeDataId": qrcodeDataId,
		"PageNum": PageNum,
		"MaxPerPage": MaxPerPage
	};

	$.ajax({

		type: "GET",
		url: "https://api.celerstar.com/IOT/index.php",
		data: message,
	
		dataType: 'JSONP',
		jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)

		success: function(data) {

			if(data["INFO"] == "true") {

				if(data["LIST"] != null) {

					for(var p in data["LIST"]) {
						var qrcodeInfoId = data["LIST"][p].qrcodeInfoId;
						var qrcodeDatasId = data["LIST"][p].qrcodeDatasId;
						var qrcodeInfo = data["LIST"][p].qrcodeInfo;

						var qrcodeTitle = data["LIST"][p].qrcodeTitle;
						var qrcodeType = data["LIST"][p].qrcodeType;
						var messageTime = data["LIST"][p].messageTime;
						var peopleWebName = data["LIST"][p].peopleWebName;

						$("#qrcodeDatasInfo_list").append('<div class="aw-common-list"><div class="aw-item active" ><a class="aw-user-name hidden-xs"  rel="nofollow"><img src="static/common/avatar-max-img.png"  alt="" /></a><div class="aw-question-content"><h4><a onclick=\'askContFun("' + qrcodeDatasId + '")\' >' + qrcodeTitle + '</a></h4><p><a href="" class="aw-user-name">' + peopleWebName + '</a> <span class="text-color-999">发起了问题  • 回复 • 浏览 • ' + messageTime + '</span><span class="text-color-999 related-topic collapse">相关话题</span></p></div></div></div>');

					}

				} else {

				}

			}

		},

		error: function() {
			getQrcodeInfo();
		}

	});
}

var askContFun = function(qrcodeDatasId) {

	$("#main").hide();
	$("#askCon").show();
	$("#ask").hide();
	$("#reful_list").empty();


    PageNum = 1;
	$("#askType").html();
	qrcodeDatasIda = qrcodeDatasId;
	getpublicqrcodedsid(qrcodeDatasId);
	getQrcodeDatassInfo(qrcodeDatasId);
}

//获取问题详情
var getQrcodeDatassInfo = function(qrcodeDatasId) {

	var message = {
		"LINK": "qrcode",
		"ISTR": "inq",
		"CONT": "public-qrcode-dss-page",
		"qrcodeDatasId": qrcodeDatasId,
		"PageNum": PageNum,
		"MaxPerPage": MaxPerPage
	};

	$.ajax({

		type: "GET",
		url: "https://api.celerstar.com/IOT/index.php",
		data: message,
		
		dataType: 'JSONP',
		jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)

		success: function(data) {

			if(data["INFO"] == "true") {

				if(data["LIST"] != null) {

					for(var p in data["LIST"]) {
						var qrcodeInfoId = data["LIST"][p].qrcodeInfoId;

						var qrcodeInfo = data["LIST"][p].qrcodeInfo;
						var qrcodeTitle = data["LIST"][p].qrcodeTitle;
						var qrcodeType = data["LIST"][p].qrcodeType;

	
						var messageTime = data["LIST"][p].messageTime;
						var peopleWebName = data["LIST"][p].peopleWebName;

						$("#reful_list").append('<div class="aw-item" ><div class="mod-head"><a class="anchor"></a><a class="aw-user-img aw-border-radius-5" ><img src="static/common/avatar-max-img.png" alt=""></a><div class="title"><p><a class="aw-user-name"  >' + peopleWebName + '</a></p></div></div><div class="mod-body clearfix"><div class="markitup-box" style="min-height: 50px;">' + qrcodeInfo + ' </div></div></div>');

					}

				} else {

				}

			}

		},

		error: function() {
			getQrcodeInfo();
		}

	});
}

var naVclickEvent = function(qrcodeDataId) {
     PageNum=1;
     $("#navMainNav").removeClass("active");
	qrcodeDataIda = qrcodeDataId;
	$("#main").show();
	$("#askCon").hide();
	$("#ask").hide();
	getQrcodeDatasInfo(qrcodeDataId);

}
//获取导航
var getQrcodeInfo = function() {

	var message = {
		"LINK": "qrcode",
		"ISTR": "inq",
		"CONT": "public-qrcode-d-page",
		"qrcodeIotPID": qrcodeIotPID,
		"PageNum": PageNum,
		"MaxPerPage": MaxPerPage
	};

	$.ajax({

		type: "GET",
		url: "https://api.celerstar.com/IOT/index.php",
		data: message,
		
		dataType: 'JSONP',
		jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)

		success: function(data) {

			if(data["INFO"] == "true") {

				if(data["LIST"] != null) {

					for(var p in data["LIST"]) {
						var qrcodeDataId = data["LIST"][p].qrcodeDataId;
						var qrcodeInfoId = data["LIST"][p].qrcodeInfoId;
						var burnAllowed = data["LIST"][p].burnAllowed;

						var qrcodeType = data["LIST"][p].qrcodeType;
						var qrcodeInfo = data["LIST"][p].qrcodeInfo;
						var qrcodeTitle = data["LIST"][p].qrcodeTitle;
						var messageTime = data["LIST"][p].messageTime;
						var peopleWebName = data["LIST"][p].peopleWebName;

						if(qrcodeDeleteAllowed == "true") {

							$("#qrcodeInfoId_list").append('<li><a onclick=\'$("#navTitle").html(" ' + qrcodeTitle + '"); $("#qrcodeDatasInfo_list").empty();  naVclickEvent("' + qrcodeDataId + '")\' class="active"><i class="icon "></i>' + qrcodeTitle + '</a></li>');

						} else {
							//$("#qrcodeInfoId_list").append('<div id="qrcodeInfoId_list"><div class="mui-card" style="background:' + index + ';"><div class="mui-card-content"><div class="mui-card-content-inner"><p style="color:#FFFFFF">' + qrcodeInfo + '</p></div></div><div class="mui-card-footer"><a class="mui-card-link" style="color: #FFFFFF;">' + messageTime + '</a><a class="mui-card-link" style="color: #FFFFFF;" onclick="delQrcodeInfo(' + qrcodeInfoId + ')" ></a></div></div></div>');

						}

					}
                    qrcodeDataIda = qrcodeDataId;
					getQrcodeDatasInfo(qrcodeDataId);
					

					$("#qrcodeDatasInfo_list").empty();
					$("#navTitle").html(" " + qrcodeTitle);
				} else {

				}

			}

		},

		error: function() {
			getQrcodeInfo();
		}

	});
}

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
		
		dataType: 'JSONP',
		jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)

		success: function(data) {

			if(data["INFO"] == "true") {
				
				location.reload();
			}

		},

		error: function() {
			
		}

	});

	return false;
}


$(window).scroll(function() {
	if($(document).scrollTop() <= 0) {
		//alert("滚动条已经到达顶部为0");
	}
	if($(document).scrollTop() >= $(document).height() - $(window).height()) {
		PageNum = PageNum + 1;

		if($("#main").is(":visible")){
			getQrcodeDatasInfo(qrcodeDataIda);
		}
		
		if($("#askCon").is(":visible")){
			getQrcodeDatassInfo(qrcodeDatasIda);
		}
	}
});


getPublicQrcodeMessage();