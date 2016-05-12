exports.baseController = "pandaGallery";

var Animation = require('alloy/animation');
var animationDuration = 300;

var currentDate = new Date();
var currentFormattedDate = currentDate.getFullYear() + '-' + ( currentDate.getMonth() + 1) + '-' + currentDate.getDate(); //Currently supports dates and not hours

var params = {"parameters[type]":"briefs",
			  "parameters[date][value][value]":currentFormattedDate, "parameters[date][value][operator]": "<=", //Start time is less than current time
			  "parameters[date][value2][value]":currentFormattedDate, "parameters[date][value2][operator]": ">=", //End time is larger than current time
			  "parameters[available][value][value]": 0, "parameters[available][value][operator]": "!=",
			  "parameters[status]": 1,
			  "sort": "date", "direction":"DESC", "pagesize": 10 }; //Sorting and pagination

$.BriefsNodes = Alloy.createCollection("Node");

var args = arguments[0] || null;

var isLoadGallery = args.loadGallery || "true";

var handleGalleryLoadedEvent = function(e) {
    $.tableView.show();
    $.noResults.hide();

    if(typeof $.getView() != 'undefined' && typeof $.getView().getParent() != 'undefined') {
        if($.getView().getParent().id == e.id) {
            if(e.id == 'faves') {
            	params['parameters[promote]'] = 1;
				params['direction'] = "DESC";
			} else if (e.id == 'ending') {
				params['direction'] = "ASC"; //campaigns that end first - appear first
				params['sort'] = 'date,1';
			}
			
			if(isLoadGallery) {
				$.loadGallery($.BriefsNodes, params, null);	
			}
		}
	}
};

function ImageLoaded(widget) {
	var x = widget;
}

var currentNodes = [];
	
function handleTableViewItems(e) {
	
	//Clear table view if we get less items than we had
	if(typeof $.briefsTableView.data != 'undefined' && 
	   typeof $.briefsTableView.data[0] != 'undefined' &&
	   typeof $.briefsTableView.data[0].rows != 'undefined') {
		var numOfRows = $.briefsTableView.data[0].rows.length;
		if(numOfRows > $.BriefsNodes.length) { 
			$.briefsTableView.setData([]);
			currentNodes = []; //Clear current node list
		}
	}

	//Add new items from the end of the current set of rows.
	for (var i = 0; i < $.BriefsNodes.length; i++) {
		
		if(currentNodes.indexOf($.BriefsNodes.models[i].id) == '-1') {
			$.BriefsNodes.models[i].set(briefTransform($.BriefsNodes.models[i]), {"silent": true});
			 
			var args = {
				model: $.BriefsNodes.models[i]
			};
			
			$.briefsTableView.appendRow(Alloy.createController("briefListItem", args).getView());
			currentNodes.push($.BriefsNodes.models[i].id);
		}
	}
}

$.BriefsNodes.on("change fetch", handleTableViewItems);

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

if(params != null) { //If params != null then we load the gallery
	if (isLoadGallery == "true") {
		$.loadGallery($.BriefsNodes, params, null);	
	}
} else { //If not params were passed
	if(typeof $.briefView != 'undefined') { //If we already set the brief
		$.briefView.remove($.briefView.children[0]);
	} else {
		$.backButton.hide();
	}
	
	if (isLoadGallery == "true") {
		$.loadGallery($.BriefsNodes, null);
	}
}

/**
 * Cleans the controller
 */
exports.clean = function() {
	$.briefView = null;
	$.BriefsNodes.off(null, null, $);
	$.briefsTableView.setData([]);
	Ti.App.removeEventListener('galleryLoaded', handleGalleryLoadedEvent);
	Ti.App.removeEventListener('noResults', handleNoResultsEvent);
	$.off();
	$.destroy();	
};
