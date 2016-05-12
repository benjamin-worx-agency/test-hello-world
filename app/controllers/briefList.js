exports.baseController = "pandaNav";
var oldButton = $.latestBtn;

$.setNavigationBar($.briefBB, $.briefsWindow);

var args = arguments[0] || null;

if(args != null && typeof args != 'undefined') {
	if(typeof args.headerTitle != 'undefined') {
		$.headerLabel.text = args.headerTitle; //TOOD: make caps	
	}
		
	if(!args.showBack) {
		$.backButton.hide();	
	}
}

var buttonClicked = function(e) {
	e.source.color = Alloy.Globals.TikklrWhite;
	oldButton.color = Alloy.Globals.TikklrGreen;
};

exports.clean = function() {
	$.destroy();
	$.off();
};