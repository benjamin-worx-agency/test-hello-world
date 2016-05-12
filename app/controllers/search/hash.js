exports.baseController = "pandaGallery";

var Animation = require('alloy/animation');
var animationDuration = 300;

var args = arguments[0] || null;

var params = {
	"parameters[type]":"video",
	"sort": "created",
	"direction":"DESC",
	"pagesize": 10,
	 "parameters[kaltura_tags]": $.search.value + "%"
	 };

var isLoadGallery = args.loadGallery || "true";

var searchText = '';

//Gets argumets for upload page
if(args != null && typeof args != 'undefined') {
	if(args.search != null && typeof args.search != 'undefined') {
		$.search.value = args.search;
	}
	 if(args.params != null && typeof args.params != 'undefined') {
		params = args.params; 
	}
	 if(isLoadGallery == true) {
	 	search();	
	 }
}

/**
 * Happens when onBlur is called on search text box
 * @param {Object} e
 */
function search() {
	if($.search.value != '') {
		$.enableLoadMore();
		$.noResults.hide();
		$.tableView.show();

		params = {
			"parameters[type]":"video",
			"sort": "created",
			"direction":"DESC",
			"pagesize": 10,
			"parameters[kaltura_tags]": $.search.value + "%"
			};
		$.loadGallery($.SearchVideos, params, null, null);
	}
}

var handleGalleryLoadedEvent = function(e){
	$.noResults.hide();
	$.tableView.show();
	
	if(typeof $.getView().getParent() != 'undefined') {
		if($.getView().getParent().id == e.id) {
			if($.search.value != '') {
				$.loadGallery($.SearchVideos, params, null, null); //We don't load the gallery on first load
			}
		}
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

exports.clean = function() {
//	$.featuredView = null;
	Ti.App.removeEventListener('galleryLoaded', handleGalleryLoadedEvent);
	Ti.App.removeEventListener('noResults', handleNoResultsEvent);
	$.destroy();
	$.off();
};
