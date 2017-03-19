var ws;
var jsondeal = true;

$("#return").click(function() {

	history.back();
});

$("#wsconnect").click(function() {

	var wsAdress = $("#wsAddress").val();
	var wsPort = $("#wsPort").val();

	connect(wsAdress, wsPort);

});

$("#wsclose").click(function() {

	ws.close();

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
	sendMsg(sendmsg);
});

function connect(ip, port) {
	ws = new WebSocket("ws://" + ip + ":" + port + "");
	ws.onopen = onopen;
	ws.onmessage = onmessage;
	ws.onclose = function() {

		alert("连接已断开！");
	};
	ws.onerror = function() {

		alert("谁知道哪里错误！");
	};
}

function sendMsg(msg) {
	ws.send(msg);
}

function onopen() {

	//mui.alert("成功进入IOT世界！");
}

function onmessage(e) {

	var data = eval("(" + e.data + ")");
	//	alert(JSON.stringify(data));

	if(jsondeal == true) {
		$("#receivetext").val($("#receivetext").val() + formatJson(JSON.stringify(data)));
	} else {
		$("#receivetext").val($("#receivetext").val() + JSON.stringify(data));
	}

	var scrollTop = $("#receivetext")[0].scrollHeight;
	$("#receivetext").scrollTop(scrollTop);
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