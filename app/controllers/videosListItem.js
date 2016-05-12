exports.baseController = "pandaGallery";
var item = [];

function setViewData(item) {
	this.item = item;
	// $.nodeId = item.get("nid");
	$.videosListItem.nodeId = item.get("nid"); 
	Ti.API.info("videos cell loaded with argument: " + JSON.stringify(arguments));
	
	$.videoImage.applyProperties({
		    	autoload: true,
		    	image: item.get("thumb")
			});
	$.profileInfoNodeLabel.setText(item.get("titleUpperCase"));
	$.infoNodeTags.setText(item.get("kaltura_tags"));
}

setViewData(arguments[0].model);

exports.clean = function() {
	//Clean this controller in it's parent
	$.destroy();
	$.off();
};