var machineIotPID;
var mSensorIotPID;
var mSensorIotDataTYP;
var mSensorWebName;
var mSensorIotTYP;

$("#return").click(function() {

	history.back();
});

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
var log_num = 0;
machineIotPID = request("machineIotPID");
mSensorIotPID = request("mSensorIotPID");
mSensorIotDataTYP = request("mSensorIotDataTYP");
mSensorWebName = decodeURIComponent(request("mSensorWebName"));
mSensorIotTYP = request("mSensorIotTYP");

$("#mSensorWebName").html(mSensorWebName);
$("#mSensorIotDataTYP").html(mSensorIotDataTYP);
$("#mSensorIotTYP").html(mSensorIotTYP);

if(mSensorIotDataTYP == "value") {

	var valueData = [0];
	var dateTime = [0];

	$("#value").css("display", "block");
	var tempChart = echarts.init(document.getElementById('value'));

	tempOption = {

		tooltip: {
			trigger: 'axis',
			position: function(pt) {
				return [pt[0], '10%'];
			}
		},

		toolbox: {
			feature: {

				//restore: {},
				//saveAsImage: {}
			}
		},
		xAxis: {
			type: 'category',
			boundaryGap: false,
			data: dateTime,
			axisLabel: {
				show: true,
				textStyle: {
					color: '#000'
				}
			}
		},
		yAxis: {
			type: 'value',
			boundaryGap: [0, '50%'],
			axisLabel: {
				show: true,
				textStyle: {
					color: '#000'
				}
			}
		},

		series: [{
			name: '温度',
			type: 'line',
			smooth: true,
			symbol: 'none',
			sampling: 'average',
			itemStyle: {
				normal: {
					color: 'rgb(255, 70, 131)'
				}
			},
			areaStyle: {
				normal: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
						offset: 0,
						color: 'rgb(255, 158, 68)'
					}, {
						offset: 1,
						color: 'rgb(255, 70, 131)'
					}])
				}
			},
			data: valueData
		}]
	};

	// 使用刚指定的配置项和数据显示图表。
	tempChart.setOption(tempOption);

	var getTemp = function() {

		var message = {
			"LINK": "m",
			"ISTR": "inq",
			"CONT": "ms-d-latest",
			"MID": machineIotPID,
			"MSID": mSensorIotPID,

		};

		$.ajax({

			type: "GET",
			url: "https://api.celerstar.com/IOT/index.php",
			data: message,
			timeout: 3000,
			dataType: 'JSONP',
			jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)

			success: function(data) {
				log_num++;
				$("#changeNum").html(log_num);
				messageTime = data["LIST"]["messageTime"];
				messageInfo = data["LIST"]["messageInfo"];

				$("#changeTime").html(messageTime);

				dateTime.push(messageTime);
				valueData.push(messageInfo);

				if(dateTime.length > 50) {
					dateTime.shift();
					valueData.shift();

				}

				tempChart.setOption(tempOption, true);
			},

			error: function() {

			}

		});
	}

	setInterval(getTemp, 2000);
}

if(mSensorIotDataTYP == "text") {
	$("#text").css("display", "block");
	var getTemp = function() {

		var message = {
			"LINK": "m",
			"ISTR": "inq",
			"CONT": "ms-d-latest",
			"MID": machineIotPID,
			"MSID": mSensorIotPID,

		};

		$.ajax({

			type: "GET",
			url: "https://api.celerstar.com/IOT/index.php",
			data: message,
			timeout: 3000,
			dataType: 'JSONP',
			jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)

			success: function(data) {
				log_num++;
				$("#changeNum").html(log_num);
				messageTime = data["LIST"]["messageTime"];
				messageInfo = data["LIST"]["messageInfo"];

				$("#changeTime").html(messageTime);

                lastInfo =  $("#textInfo").html();
                $("#textInfo").html(messageInfo  + "\n" + lastInfo);
			},

			error: function() {

			}

		});
	}

	setInterval(getTemp, 2000);
}

if(mSensorIotDataTYP == "switch") {
	$("#switch").css("display", "block");

	var getTemp = function() {

		var message = {
			"LINK": "m",
			"ISTR": "inq",
			"CONT": "ms-d-latest",
			"MID": machineIotPID,
			"MSID": mSensorIotPID,

		};

		$.ajax({

			type: "GET",
			url: "https://api.celerstar.com/IOT/index.php",
			data: message,
			timeout: 3000,
			dataType: 'JSONP',
			jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)

			success: function(data) {
				log_num++;
				$("#changeNum").html(log_num);
				messageTime = data["LIST"]["messageTime"];
				messageInfo = data["LIST"]["messageInfo"];

				$("#changeTime").html(messageTime);

				if(messageInfo == "ON") {
					$("#state").addClass("mui-active");
				} else {
					$("#state").removeClass("mui-active");
				}
			},

			error: function() {

			}

		});
	}

	setInterval(getTemp, 2000);

}

if(mSensorIotDataTYP == "gps") {
	$("#gps").css("display", "block");
	var map = new BMap.Map("gps");
	var point = new BMap.Point(120.2, 30.3);
	var mk = new BMap.Marker(point);

	var getTemp = function() {

		var message = {
			"LINK": "m",
			"ISTR": "inq",
			"CONT": "ms-d-latest",
			"MID": machineIotPID,
			"MSID": mSensorIotPID,

		};

		$.ajax({

			type: "GET",
			url: "https://api.celerstar.com/IOT/index.php",
			data: message,
			timeout: 3000,
			dataType: 'JSONP',
			jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)

			success: function(data) {
				log_num++;
				$("#changeNum").html(log_num);
				messageTime = data["LIST"]["messageTime"];
				messageInfo = data["LIST"]["messageInfo"];

				$("#changeTime").html(messageTime);

				var mPosition = messageInfo.split(",");

				x = mPosition[0];
				y = mPosition[1];

				point = new BMap.Point(x, y);
				if(log_num == 1) {
					map.centerAndZoom(point, 13);
				}

				mk = new BMap.Marker(point);
				map.addOverlay(mk);
				//mk.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画

				var label = new BMap.Label(messageInfo, { offset: new BMap.Size(20, -10) });
				mk.setLabel(label);
			},

			error: function() {

			}

		});
	}

	setInterval(getTemp, 2000);

}