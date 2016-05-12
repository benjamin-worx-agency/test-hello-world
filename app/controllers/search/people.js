exports.baseController = "pandaGallery";

var Animation = require('alloy/animation');
var animationDuration = 300;
var params = {"keys": "", "parameters[status]": 1};
var flag_name = Alloy.Globals.FollowFlag;

var args = arguments[0] || null;

var isLoadGallery = args.loadGallery || "true";

var searchText = '';

$.SearchUsers = Alloy.createCollection("SearchUser");
var currentSearchUsers = [];
var isNewSearch = true;

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

function searchUsersListLoaded(e) {
	// Ti.API.info("list loaded with: " + JSON.stringify(e));
	//Clear table view if we get less items than we had
	if(typeof $.searchUsersTable.data != 'undefined' && 
	   typeof $.searchUsersTable.data[0] != 'undefined' &&
	   typeof $.searchUsersTable.data[0].rows != 'undefined') {
		var numOfRows = $.searchUsersTable.data[0].rows.length;
		if(numOfRows > $.SearchUsers.length || isNewSearch) {
			isNewSearch = false; 
			$.searchUsersTable.setData([]);
			currentSearchUsers = [];
		}
	}
	
	//Add new items from the end of the current set of rows.
	for (var i = 0; i < $.SearchUsers.length; i++) {
		
		if(currentSearchUsers.indexOf($.SearchUsers.models[i].id) == '-1') {
			$.SearchUsers.models[i].set(userTransform($.SearchUsers.models[i]), {"silent": true});
			// Ti.API.info("processing... " + JSON.stringify($.SearchUsers.models[i]));
			
			var args = {
				model: $.SearchUsers.models[i]
			};
			
			$.searchUsersTable.appendRow(Alloy.createController("followListItem", args).getView());
			currentSearchUsers.push($.SearchUsers.models[i].id);	
		}
	}
}

$.SearchUsers.on("change fetch", searchUsersListLoaded);

/**
 * Happens when onBlur is called on search text box
 * @param {Object} e
 */
function search() {
	if($.search.value != '') {
		isNewSearch = true;
		$.enableLoadMore();
		$.noResults.hide();
		$.tableView.show();

		params = {"keys": $.search.value, "parameters[status]": 1};
		$.loadGallery($.SearchUsers, params, null, null);
	}
}

var handleGalleryLoadedEvent = function(e){
	$.noResults.hide();
	$.tableView.show();
	
	if(typeof $.getView().getParent() != 'undefined') {
		if($.getView().getParent().id == e.id) {
			if($.search.value != '') {
				$.loadGallery($.SearchUsers, params, null, null); //We don't load the gallery on first load
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

Ti.App.addEventListener('flagFinished', flagFinished);

exports.clean = function() {
//	$.featuredView = null;
	Ti.App.removeEventListener('galleryLoaded', handleGalleryLoadedEvent);
	Ti.App.removeEventListener('noResults', handleNoResultsEvent);
	Ti.App.removeEventListener('flagFinished', flagFinished);
	$.SearchUsers.off(null, null, $);
	$.searchUsersTable.setData([]);
	$.destroy();
	$.off();
};
