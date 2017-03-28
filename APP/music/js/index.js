$("#return").click(function() {

	history.back();
});

if(localStorage.appIndexMusicUrl != null) {
	$("#music").attr("src", localStorage.appIndexMusicUrl);
} else {

	$("#music").attr("src", 'http://music.163.com/outchain/player?type=3&id=16268029&auto=0&height=66');
}