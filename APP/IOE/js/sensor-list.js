var machineIotPID;

$("#return").click(function() {

	history.back();
});

var getMachineMsMrList = function() {

	var message = {
		"LINK": "m",
		"ISTR": "inq",
		"CONT": "ms",
		"MID": machineIotPID,
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
				$("#sensor_list").empty();
				for(var p in data["LIST"]) {
					var mSensorWebName = data["LIST"][p].mSensorWebName;
					var mSensorIotPID = data["LIST"][p].mSensorIotPID;
					var mSensorIotTYP = data["LIST"][p].mSensorIotTYP;
					var mSensorIotDataTYP = data["LIST"][p].mSensorIotDataTYP;
					var machineIotPID = data["LIST"][p].machineIotPID;

					$("#sensor_list").append('<li class="mui-table-view-cell mui-collapse mui-table-view-cell mui-collapse "><a class="mui-navigate-right">' + mSensorWebName + '</a><ul class="mui-table-view mui-table-view-chevron"><li class="mui-table-view-cell"><a class="">节点ID <span  style="color: #FF0000;">' + mSensorIotPID + '</span></a></li><li class="mui-table-view-cell"><a class="">节点类别 <span  style="color: #FF0000;">' + mSensorIotTYP + '</span></a></li><li class="mui-table-view-cell"><a class="">数据类别 <span  style="color: #FF0000;">' + mSensorIotDataTYP + '</span></a></li><li class="mui-table-view-cell"><a class="">所属设备 <span  style="color: #FF0000;">' + machineIotPID + '</span></a></li><li class="mui-table-view-cell"><div class="mui-button-row"><a type="button"class="mui-btn mui-btn-primary" href="sensor-data.html?machineIotPID=' + machineIotPID + '&mSensorIotPID='+mSensorIotPID +'&mSensorIotDataTYP='+mSensorIotDataTYP+'&mSensorWebName='+mSensorWebName+'&mSensorIotTYP='+mSensorIotTYP+'">查看</a></div></li></ul></li>');

				}
				$('#sensor_list>li').click(function(e) {

					if($(this).hasClass('mui-active')) {
						$(this).removeClass("mui-active");
					} else {
						$(this).addClass("mui-active").siblings("li").removeClass("mui-active");
					}
					$(this).children("ul").click(function(e) {
						e.stopPropagation();
					});
				});
			} else {

				location.href = "../../login.html";
			}

		},

		error: function() {
			alert("错误");
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

machineIotPID = request("machineIotPID");
getMachineMsMrList();