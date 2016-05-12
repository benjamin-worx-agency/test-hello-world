
var numOfElements = $.iconsContainer.children.length;
var marginXToMiddleOfCircle = 60; //margin X in PX
var marginYToMiddleOfCircle = 60; //margin Y in PX

var animationType = [
  { name: 'Top Left', anchorPoint: {x:0, y:0} },
  { name: 'Top Right', anchorPoint: {x:1, y:0} },
  { name: 'Bottom Left', anchorPoint: {x:0, y:1} },
  { name: 'Bottom Right', anchorPoint: {x:1, y:1} },
  { name: 'Center', anchorPoint: {x:0.5, y:0.5} }
];
var animationTypePointer = 4;

var currentAngle = 270; 
var circleSize = 415;
var buttonTransform = Ti.UI.create2DMatrix();
var labels = $.iconsContainer.getChildren();

var old = 0;
var diff = 0;
var current = 0;

var activeIcon = null;

setIconsInCircle();

/**
 * Sets the icons in a circle
 */
function setIconsInCircle() {

	var degDiff = 360 / numOfElements;
	var r = (parseInt(circleSize) - (marginXToMiddleOfCircle * 2)) / 2;
	
	var wheelPositionX = parseInt(circleSize) / 2;
	var wheelPositionY = parseInt(circleSize) / 2;
	
	for(i in $.iconsContainer.children) {
		var icon = $.iconsContainer.children[i];
		
		currentAngle -= degDiff;
		currentAngle = currentAngle % 360;
		
		var X = wheelPositionX + (r * Math.sin(currentAngle * Math.PI / 180));
		var Y = wheelPositionY + (r * Math.cos(currentAngle * Math.PI / 180));

		var p = {'x': X, 'y': Y};
		
 		icon.setCenter({'x': p.x / 2, 'y': p.y / 2});
 		icon.anchorPoint = animationType[animationTypePointer].anchorPoint;
 		
	}
}

$.tikklrActionMenu.transform = buttonTransform;

//Aniamtes the labels / icons so they stay stright on the wheel
function fixLabelsPosition(e, degrees, isAnimate){
	
	var labelMatrix = Ti.UI.create2DMatrix().rotate(-1 * degrees);
	var labelAnim = Ti.UI.createAnimation({
		transform: labelMatrix,
		duration : Alloy.Globals.animationDuration
	});
	
	for(var i = 0; i < labels.length; i++) {
		if(isAnimate) {
			labels[i].animate(labelAnim);
		} else {
			labels[i].transform = labelMatrix;
		}
	}
}

function actionMenuTouchStart(e){
	Ti.API.info("On touch Start " + JSON.stringify(e));
	var conv = e.source.convertPointToView({x: e.x, y:e.y}, $.parent);
	
	var wheelPositionX = Ti.Platform.displayCaps.platformWidth;
	var wheelPositionY = Ti.Platform.displayCaps.platformHeight / 2;
		
	var newAngle = Math.atan2(conv.y - wheelPositionY, wheelPositionX - conv.x) *  - (180 / Math.PI);
	diff = (newAngle - old);
	
	oldAngle = newAngle;
	e.bubbles = false;
	e.cancelBubble = true;
}

function actionMenuTouchMoved(e) {
	Ti.API.info("On touch move " + JSON.stringify(e));	
	var conv = e.source.convertPointToView({x: e.x, y: e.y}, $.parent.parent);
	var wheelPositionX = Ti.Platform.displayCaps.platformWidth;
	var wheelPositionY = Ti.Platform.displayCaps.platformHeight / 2;
	
	var newAngle = Math.atan2(conv.y - wheelPositionY, wheelPositionX - conv.x) * - (180 / Math.PI);
	
	current += (newAngle - oldAngle);
	oldAngle = newAngle;
	
	var t = Ti.UI.create2DMatrix().rotate(current);						
	$.tikklrActionMenu.transform = t;
	
	fixLabelsPosition(e, current, 0);
	e.bubbles = false;
	e.cancelBubble = true;
}

function getClosestLabel(angle){
	var labelAngle = 360 / labels.length;
	var labelPosition = Math.round(angle / labelAngle);
	
	var roundedAngle = labelAngle * labelPosition;
	
	Ti.API.info("rounded " + roundedAngle);
	
	return roundedAngle;
}

function moveToSelected(e) {
	var conv = e.source.convertPointToView({x: e.x, y:e.y}, $.parent.parent);
	
	var wheelPositionX = Ti.Platform.displayCaps.platformWidth;
	var wheelPositionY = Ti.Platform.displayCaps.platformHeight / 2;
	
	var newAngle = Math.atan2(conv.y - wheelPositionY, wheelPositionX - conv.x) * - (180 / Math.PI);
	var newAngle = getClosestLabel(newAngle);

	Ti.API.info("newAngle: " + newAngle);
	Ti.API.info("current: " + current);
		
	current = current - newAngle;
	
	var t = Ti.UI.create2DMatrix().rotate(current);
	var animation = Ti.UI.createAnimation({
    	transform : t,
    	duration : Alloy.Globals.animationDuration
  	});
  						
  	animation.addEventListener('complete', function(e) {
  		fixLabelsPosition(e, current, 1);	
  	});
	
	$.tikklrActionMenu.animate(animation);
		
	old = current;
}

function changeToActive(e) {
	if(e.source != activeIcon) { //New icon to make active
		// iconName = e.getClass();
		var currentImage = e.source.getBackgroundImage(); 
		currentImage = currentImage.substring(0, currentImage.length - 4); //We remove .png or .jpg
		
		e.source.setBackgroundImage(currentImage + "Live.png"); 
		
		if(activeIcon) {
			var currentLiveImage = activeIcon.getBackgroundImage(); 
			currentLiveImage = currentLiveImage.substring(0, currentLiveImage.length - 8); //We remove Live.png
		
			activeIcon.setBackgroundImage(currentLiveImage + ".png");
		}
	}
	activeIcon = e.source;
}

function labelClick(e){
	Ti.API.info('icon clicked' + JSON.stringify(e));
	var conv = e.source.convertPointToView({x: e.x, y:e.y}, $.parent.parent);
	var wheelPositionX = Ti.Platform.displayCaps.platformWidth;
	var wheelPositionY = Ti.Platform.displayCaps.platformHeight / 2;
	
	var newAngle = Math.atan2(conv.y - wheelPositionY, wheelPositionX - conv.x) *  - (180 / Math.PI);
	
	newAngle = getClosestLabel(newAngle);
	currentAngle = newAngle;
	
	changeToActive(e);
	moveToSelected(e);
	setTimeout( function() {
			closeActionMenu();
			Ti.App.fireEvent('attachWindow', {page: e.source.page});
		}, Alloy.Globals.animationDuration );
	
	e.bubbles = false;
	e.cancelBubble = true;
	return false;
}

function onActionMenuTouchEnd(e) {
	Ti.API.info("Swipe End");
	Ti.API.info("current " + current);
	//Animate to closest label
	current = getClosestLabel(current);
	
	Ti.API.info("New angle " + current);
	
	var t = Ti.UI.create2DMatrix().rotate(current);
	var animation = Ti.UI.createAnimation({
    	transform : t,
    	duration : Alloy.Globals.animationDuration
  	});
  							
	$.tikklrActionMenu.animate(animation);
	
	fixLabelsPosition(e, current, 1);
	
	old = current;
	
	e.bubbles = false;
	e.cancelBubble = true;
}

function closeActionMenu() {
	var hideIconsAnimation = Ti.UI.createAnimation({
    	opacity : 0.0,
    	duration : Alloy.Globals.animationDuration
  	});
	
	hideIconsAnimation.addEventListener('complete', function() {
		var animation = Ti.UI.createAnimation({
	    	width : '38',
	    	height : '38',
	    	// borderRadius: '19',
	    	opacity: 0.1,
	    	duration : Alloy.Globals.animationDuration
	  	});
	  	
	  	animation.addEventListener('complete', function() { 
	  		//Show Mini menu
	  		$.tikklrActionMenuButton.show();
	  		
	  		// Close Menu
	  		$.tikklrActionMenu.hide();
	  		$.tikklrActionMenu.visible = false;
	  		$.tikklrActionMenuBlocker.visible = false;
	  		
	  		$.actionMenuView.width = "50";
  			$.actionMenuView.height = "60"; 
	  	});
	  	  	
	  	$.tikklrActionMenu.animate(animation);	
	});
	
	$.iconsContainer.animate(hideIconsAnimation);
	
	$.tikklrActionMenuButton.toggle = false;
}; 

function openActionMenu() {
	var animation = Ti.UI.createAnimation({
    	width : '207',
    	height : '207',
    	opacity: 1,
    	duration : Alloy.Globals.animationDuration
  	});
  	
  	animation.addEventListener('complete', function() {
  		Ti.API.log("Animation Completed");
  		var showIconsAnimation = Ti.UI.createAnimation({
    		opacity : 1,
    		duration : Alloy.Globals.animationDuration
  		});
	
		showIconsAnimation.addEventListener('complete', function(){
			Ti.API.log("Animation 2 Completed");
		});
		
		showIconsAnimation.addEventListener('start', function(){
			Ti.API.log("Animation 2 start");
		});

		$.iconsContainer.animate(showIconsAnimation);
		$.tikklrActionMenu.borderRadius = "52";
	});
  	
  	animation.addEventListener('start', function() {
  		Ti.API.log("Animation starts");
  		
  		//Close Mini menu
  		$.tikklrActionMenuButton.hide();
		$.tikklrActionMenuButton.visible = false;
  	});
  	
  	$.actionMenuView.width = "245";
  	$.actionMenuView.height = "245";
  	
  	// Open Menu
  	$.tikklrActionMenu.visible = true;
  	$.tikklrActionMenuBlocker.visible = true;
  	$.tikklrActionMenu.animate(animation);
};

var tikklrActionMenuButtonClicked = function(e) {
	Ti.API.info('actionMenuButton clicked');
	if(e.source.toggle == true) {
		closeActionMenu();
		e.source.toggle = false;
	} else {
		openActionMenu();
		e.source.toggle = true;
	}
	
	e.bubbles = false;
	e.cancelBubble = true;
	return false;
};

var actionMenuClicked = function(e) {
	Ti.API.info('actionMenu clicked');
	//closeActionMenu();
	e.bubbles = false;
	e.cancelBubble = true;
	return false;
};

Ti.App.addEventListener('hideActionMenu', function () {
  $.actionMenuView.visible = false;
});

Ti.App.addEventListener('showActionMenu', function () {
  $.actionMenuView.visible = true;
});

$.iconsContainer.addEventListener('click', actionMenuClicked);
$.tikklrActionMenuButton.addEventListener('click', tikklrActionMenuButtonClicked);

$.createBtn.addEventListener('click', labelClick);
$.profileBtn.addEventListener('click', labelClick);
$.searchBtn.addEventListener('click', labelClick);
// $.inboxBtn.addEventListener('click', labelClick);
$.settingsBtn.addEventListener('click', labelClick);
$.rewardsBtn.addEventListener('click', labelClick);
$.briefBtn.addEventListener('click', labelClick);
$.playsBtn.addEventListener('click', labelClick);

exports.isOpen = function() {
	return $.tikklrActionMenuButton.toggle == true; 
};

exports.openMenu = function() {
	openActionMenu();
	$.tikklrActionMenuButton.toggle = false;
};

exports.closeMenu = function() {
	closeActionMenu();
	$.tikklrActionMenuButton.toggle = false;
};
