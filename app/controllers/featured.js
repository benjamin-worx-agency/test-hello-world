exports.baseController = "tikkGallery"; 

var Animation = require('alloy/animation');
var animationDuration = 300;
var params = {"parameters[type]":"video", "parameters[promote]": 1, "sort": "created", "direction":"DESC", "pagesize": 10, "parameters[status]": 1 };

$.FeaturedVideos = Alloy.createCollection("Node");

var args = arguments[0] || null;

var isLoadGallery = args.loadGallery || "true";

if (args != null && typeof args != 'undefined') {
	if (args.params != null && typeof args.params != 'undefined') {
		params = args.params;
		// $.headerLabel.text = args.headerTitle; //TOOD: make caps
		// $.backButton.show();
	}
}

var handleGalleryLoadedEvent = function(e) {
	$.tableView.show();
	$.noResults.hide();

	if(typeof $.getView() != 'undefined' && typeof $.getView().getParent() != 'undefined') {
		if($.getView().getParent().id == e.id) {
			if(e.id == 'popular') { //Set different filter for popular
				params['direction'] = "DESC";
				delete params['parameters[og_group_ref]'];
				delete params["parameters[promote]"];
			}
			
			$.loadGallery($.FeaturedVideos, params, null, null);
		}
	}
};

Ti.App.addEventListener('galleryLoaded', function(e) {
	handleGalleryLoadedEvent(e);
});

var handleNoResultsEvent = function(e) {
	$.noResults.show();
	$.noResults.visible = true;
	$.tableView.hide();
};

Ti.App.addEventListener('noResults', function(e) {
	handleNoResultsEvent(e);
});

if(params != null) {
	if (isLoadGallery == "true") {
		$.loadGallery($.FeaturedVideos, params, null, null);	
	}
} else {
	if (typeof $.featuredView != 'undefined') {
		$.featuredView.remove($.featuredView.children[0]);
	} else {
		$.backButton.hide();
	}
	
	if (isLoadGallery == "true") {
		$.loadGallery($.FeaturedVideos, null, null, null);
	}
}


var currentNodes = [];
	
function handleTableViewItems(e) {
	
	//Clear table view if we get less items than we had
	if(typeof $.featuredGalleryTable.data != 'undefined' && 
	   typeof $.featuredGalleryTable.data[0] != 'undefined' &&
	   typeof $.featuredGalleryTable.data[0].rows != 'undefined') {
		var numOfRows = $.featuredGalleryTable.data[0].rows.length;
		if(numOfRows > $.FeaturedVideos.length) { 
			$.featuredGalleryTable.setData([]);
			currentNodes = []; //Clear current node list
		}
	}
	
	//Add new items from the end of the current set of rows.
	for (var i = 0; i < $.FeaturedVideos.length; i++) {
		
		if(currentNodes.indexOf($.FeaturedVideos.models[i].id) == '-1') {
			$.FeaturedVideos.models[i].set(nodeTransform($.FeaturedVideos.models[i]), {"silent": true});
			 
			var args = {
				model: $.FeaturedVideos.models[i]
			};
			
			$.featuredGalleryTable.appendRow(Alloy.createController("featuredListItem", args).getView());
			currentNodes.push($.FeaturedVideos.models[i].id);	
		}
	}
}

$.FeaturedVideos.on("change fetch", handleTableViewItems);

/**
 * Cleans the controller
 */
exports.clean = function() {
	// $.featuredView = null;
	$.destroy();
	Ti.App.removeEventListener('galleryLoaded', handleGalleryLoadedEvent);
	Ti.App.removeEventListener('noResults', handleNoResultsEvent);
	$.off();
	$.FeaturedVideos.off(null, null, $);
};
