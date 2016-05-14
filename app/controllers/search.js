exports.baseController = "tikkNav";
var oldButton = $.hashBtn;

$.setNavigationBar($.bb1, $.searchWindow);

exports.clean = function() {
	$.destroy();
	$.off();
	$ = null;
};