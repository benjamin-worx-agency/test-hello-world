exports.baseController = "pandaGallery";

var Animation = require('alloy/animation');
var animationDuration = 300;

var args = arguments[0] || null;

if(Alloy.Collections.currentNodeList.length == 0) {
	Alloy.Collections.currentNodeList.add(Alloy.Models.currentNode);	
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

exports.clean = function(){
	//TODO: clean the current node list.
	$.destroy();
	Alloy.Collections.currentNodeList.reset();	
	$.off();
};
