var machineIotPID;
var jsondeal = true;

$("#return").click(function() {

	history.back();
});

$("#jsoncontrol").click(function() {
	if(jsondeal == true) {
		$("#jsoncontrol").removeClass("mui-active");
		jsondeal = false;
	} else {
		$("#jsoncontrol").addClass("mui-active");
		jsondeal = true;
	}
});

$("#clearrec").click(function() {
	$("#receivetext").val("");
});

$("#clearsend").click(function() {
	$("#sendtext").val("");
});

$("#sendmsg").click(function() {
	var sendmsg = $("#sendtext").val();

	var message = {
		"LINK": "p2m",
		"ISTR": "tm",
		"MID": machineIotPID,
		"MSG": sendmsg,
	};

	$.ajax({

		type: "GET",
		url: "https://api.celerstar.com/IOT/index.php",
		data: message,
		timeout: 3000,
		dataType: 'JSONP',
		jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)

		success: function(data) {

			if(jsondeal == true) {
				$("#receivetext").val($("#receivetext").val() + formatJson(JSON.stringify(data)));
			} else {
				$("#receivetext").val($("#receivetext").val() + JSON.stringify(data));
			}

			var scrollTop = $("#receivetext")[0].scrollHeight;
			$("#receivetext").scrollTop(scrollTop);

		},

		error: function() {

		}

	});
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

var formatJson = function(json, options) {
	var reg = null,
		formatted = '',
		pad = 0,
		PADDING = '    '; // one can also use '\t' or a different number of spaces

	// optional settings
	options = options || {};
	// remove newline where '{' or '[' follows ':'
	options.newlineAfterColonIfBeforeBraceOrBracket = (options.newlineAfterColonIfBeforeBraceOrBracket === true) ? true : false;
	// use a space after a colon
	options.spaceAfterColon = (options.spaceAfterColon === false) ? false : true;

	// begin formatting...
	if(typeof json !== 'string') {
		// make sure we start with the JSON as a string
		json = JSON.stringify(json);
	} else {
		// is already a string, so parse and re-stringify in order to remove extra whitespace
		json = JSON.parse(json);
		json = JSON.stringify(json);
	}

	// add newline before and after curly braces
	reg = /([\{\}])/g;
	json = json.replace(reg, '\r\n$1\r\n');

	// add newline before and after square brackets
	reg = /([\[\]])/g;
	json = json.replace(reg, '\r\n$1\r\n');

	// add newline after comma
	reg = /(\,)/g;
	json = json.replace(reg, '$1\r\n');

	// remove multiple newlines
	reg = /(\r\n\r\n)/g;
	json = json.replace(reg, '\r\n');

	// remove newlines before commas
	reg = /\r\n\,/g;
	json = json.replace(reg, ',');

	// optional formatting...
	if(!options.newlineAfterColonIfBeforeBraceOrBracket) {
		reg = /\:\r\n\{/g;
		json = json.replace(reg, ':{');
		reg = /\:\r\n\[/g;
		json = json.replace(reg, ':[');
	}
	if(options.spaceAfterColon) {
		reg = /\:/g;
		json = json.replace(reg, ': ');
	}

	$.each(json.split('\r\n'), function(index, node) {
		var i = 0,
			indent = 0,
			padding = '';

		if(node.match(/\{$/) || node.match(/\[$/)) {
			indent = 1;
		} else if(node.match(/\}/) || node.match(/\]/)) {
			if(pad !== 0) {
				pad -= 1;
			}
		} else {
			indent = 0;
		}

		for(i = 0; i < pad; i++) {
			padding += PADDING;
		}

		formatted += padding + node + '\r\n';
		pad += indent;
	});

	return formatted;
};

machineIotPID = request("machineIotPID");