exports.baseController = "tikkGallery";

var Animation = require('alloy/animation');
var animationDuration = 300;

var entryId = arguments[0]; //Gets the entryID of the tik details page 

var args = arguments[0] || null;

if(Alloy.Collections.currentNodeList.length == 0) {
	Alloy.Collections.currentNodeList.add(Alloy.Models.currentNode);	
}

var removeIcons = function() {
	if(Alloy.Models.currentNode.isSelfie != 'true') { //if we have a selfie selected
		$.selfie.setImage("selfie-gray.png");		
	} else {
		$.selfie.setImage("selfie-dead.png");
	}
	
	if(Alloy.Models.currentNode.isThumbAllowed) { //if we have a video selected
		$.gallery.setImage("photo-gray.png");
	} else {
		$.gallery.setImage("photo-dead.png");
	}
	
	if(Alloy.Models.currentNode.isVideo) { //if we have a photo selected
		$.capture.setImage("video-gray.png");
	} else {
		$.capture.setImage("video-dead.png");
	}
};

function seeCurrentTiks(e) {
	var title = Alloy.Models.currentNode.get('title');
	args = {
		search: title,
		loadGallery: true,
		searchBy: "kaltura_tags"
	};
	
	Ti.App.fireEvent('attachWindow', {'page': 'search/hash', arguments: args});
}

function openShareBox() {
	var animation = Ti.UI.createAnimation({
		left: 0
	});
	
	$.shareRow.animate(animation);
	$.shareRow.toggle = true;	
};

function closeShareBox() {
	var animation = Ti.UI.createAnimation({
		left: Ti.Platform.displayCaps.platformWidth
	});
	
	$.shareRow.animate(animation);
	$.shareRow.toggle = false;

};

function makeShareActive(source) {
	if(source.id == 'facebook') {
		source.backgroundImage = "facebook-fill.png";	
	} else if(source.id == 'twitter') {
		source.backgroundImage = "twitter-fill.png";
	} else if(source.id == 'linkedIn') {
		source.backgroundImage = "linkedIn-fill.png";
	}
}

function makeShareNonActive(source) {
	if(source.id == 'facebook') {
		source.backgroundImage = "facebook.png";	
	} else if(source.id == 'twitter') {
		source.backgroundImage = "twitter.png";
	} else if(source.id == 'linkedIn') {
		source.backgroundImage = "linkedIn.png";
	}
}
		
function shareClicked(e) {
	if(e.source.toggle == false || typeof e.source.toggle == 'undefined') { //Change the icon to be full - toggle on
		makeShareActive(e.source);
			
		e.source.toggle = true;
	} else { //We toggle off
		makeShareNonActive(e.source);
		
		e.source.toggle = false;
	}
	
	//alert("TODO: share the video");	
};

function shareThisVideo(e) {
	openShareBox();
}

function starThisVideo(e) {
	//alert("TODO: video was stared");	
}

/**
 * Handles the click event on the different camera buttons 
 * @param {Object} e
 */
function handleClick(e) {
	
	var rewardId = '';
	if(typeof Alloy.Models.currentNode.get('reward') != 'undefined') {
		rewardId = Alloy.Models.currentNode.get('reward').id;
	}
	
	args = {
		type: e.source.type,
		title: '',
		tags: Alloy.Models.currentNode.get('title'),
		category: Alloy.Models.currentNode.get('category'),
		rewardId: rewardId
	};
	
	Ti.App.fireEvent('attachWindow', {page: "create", arguments: args});
}

exports.clean = function(){
	Alloy.Collections.currentNodeList.reset();
	$.destroy();
	$.off();
};
