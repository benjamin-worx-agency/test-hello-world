var Animation = require('alloy/animation');
var animationDuration = 300;

var currentDate = new Date();
var currentFormattedDate = currentDate.getFullYear() + '-' + ( currentDate.getMonth() + 1) + '-' + currentDate.getDate(); //Currently supports dates and not hours

var params = {"parameters[type]":"rewards",
			  "parameters[author]":Alloy.Models.User.get('uid'),
			  "parameters[expiration_date][value][value]":currentFormattedDate, "parameters[expiration_date][value][operator]": ">=", //Start time is less than current time
			  "sort": "created", "direction":"DESC", "pagesize": 10, "parameters[status]": 1 }; //Sorting and pagination

exports.baseController = "tikkGallery";

var args = arguments[0] || null;

var isLoadGallery = "true";
 
if(args != null && typeof args != 'undefined') {
	isLoadGallery = args.loadGallery || "true";
	
	if(args.params != null && typeof args.params != 'undefined') {
		params = args.params;
		$.headerLabel.text = args.headerTitle; //TOOD: make caps
		$.backButton.show(); 
	}
}

var handleGalleryLoadedEvent = function(e){
	//TODO: fix this!!! 
	if($.getView().getParent() && $.getView().getParent().id == e.id) {
		$.loadGallery($.Rewards, params, null, null);
	}
};

Ti.App.addEventListener('galleryLoaded', function(e) {
	handleGalleryLoadedEvent(e);
});

var handleNoResultsEvent = function(e){
	$.noResults.show();
	$.noResults.visible = true;
	$.tableView.hide();
};

Ti.App.addEventListener('noResults', function(e) {
	handleNoResultsEvent(e);
});


if(params != null) {
	if (isLoadGallery == "true") {
		$.loadGallery($.Rewards, params, null, null);	
	}
} else {
	if(typeof $.rewardsView != 'undefined') {
		$.rewardsView.remove($.rewardsView.children[0]);
	} else {
		$.backButton.hide();
	}
	
	if (isLoadGallery == "true") {
		$.loadGallery($.Rewards, null, null, null);
	}
}

/**
 * Cleans the controller
 */
exports.clean = function() {
	// $.rewardsView = null;
	Ti.App.removeEventListener('galleryLoaded', handleGalleryLoadedEvent);
	Ti.App.removeEventListener('noResults', handleGalleryLoadedEvent);
	$.destroy();
	$.off();
};
