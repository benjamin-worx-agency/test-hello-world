exports.baseController = "tikkNav";
var oldButton = $.featuredBtn;

$.setNavigationBar($.playsBB, $.playsWindow);

var buttonClicked = function(e) {
	e.source.color = Alloy.Globals.TikklrWhite;
	oldButton.color = Alloy.Globals.TikklrGreen;
};

exports.clean = function() {
	$.destroy();
	$.off();
};