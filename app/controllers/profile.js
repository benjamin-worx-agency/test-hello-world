exports.baseController = "pandaGallery";

//Views url is set when loaded
$.MyVideos = Alloy.createCollection("Node");
$.Followers = Alloy.createCollection("DrupalView");
$.Followers.viewName = 'commons_follow_user_followers'; 
$.TotalCount.viewName = 'total_nodes';

/**
 * AVIARY TOOL INTEGRATION
 */
// if(Alloy.Globals.Aviary == null || typeof Alloy.Globals.Aviary == 'undefined') {
	// Alloy.Globals.Aviary = require('com.ghkim.aviary');
// }
// 
// var aviary = Alloy.Globals.Aviary;
// var tools = ['kAFEffects', 'kAFOrientation', 'kAFBrightness', 'kAFContrast', 'kAFSharpness'];

var currentVideos = [];
var currentFollowing = [];
var currentFollowers = [];

/**
 * Aviary editor event listener
 */
var aviaryFinished = function(ev) {
	//TODO fix this as now we are using the new image caching library and need an actual file path.
	return;
	$.profileImage.backgroundImage = ev.image;
	var encodedImage = Ti.Utils.base64encode(ev.image);
	var timestamp = new Date().getTime();
	
	//TODO Fix saving user image into Drupal
	var fileName = "image.png";
	var file = Alloy.createModel('File', {'file' : {
			file: encodedImage.toString(),
			filename: fileName,
			filepath: "public://pictures/" + fileName + timestamp,
			uid: user.get('uid'),
		}
	});
	
	file.save(file, {success: function(e) {
		file.fetch({ success: function(e1){
			//Ti.API.info(JSON.stringify(e1));
			var fileSize = e1.get('size');
			var mime = e1.get('mime');
			var url = e1.get('url');
			var uri = e1.get('uri');
			var name = e1.get('name');
			
			var newPic = {
	            fid: e1.id,
	            filemime: mime,
	            filename: name,
	            filesize: fileSize,
	            uid: user.get('uid'),
	            uri: uri,
	            url: url,
			};
			
			user.set('group_access', null, {'silent': true});
			user.set('picture', newPic, {'silent': true});
			user.save(newPic, {'picture': newPic});
		}});
	}});
};

var aviaryCanceled = function(e) {
	
};

// aviary.addEventListener('avEditorFinished', aviaryFinished);
// aviary.addEventListener('avEditorCancel', aviaryCanceled);

/**
 * AVIARY TOOL INTEGRATION
 */

args = arguments[0];

var galleryCenter = "375";
var flag_name = Alloy.Globals.FollowFlag;
var user = Alloy.Models.User; // The user in the profile page default to the local user
Alloy.Models.User = user;
$.User = user;

var selectedButton = $.tikksButton;
var currentTable = $.profileTable;
var Animation = require('alloy/animation');
var animationDuration = 300;
//The item to upload
var item = null;

if(args != null && typeof args != 'undefined' && typeof args['uid'] != 'undefined' && args['uid'] != Alloy.Models.User.get('uid')) { //If we pass a uid parameter we load the new user
	if(typeof args['uid'] != 'undefined') {
		var uid = args['uid']; 

		$.User.set('uid', uid, {'silent': true});
		disableOwnUserFucntionality();
	}
	
} else { //enable own user functionality
	enableOwnUserFucntionality();
}

fetchUser();

/**
 * Fetches the given user for the profile page
 */
function fetchUser() {
	$.User.fetch({
		"success": function() {
			properties = userTransform($.User);
			$.User.set(properties, {'silent': true});
		
			//Set View data with values to fix binding issues.
			$.profileImage.applyProperties({
			    autoload: true,
		    	image: $.User.get("pictureUrl")
			});
			
			$.profileUserName.setText($.User.get('@realname'));
			$.profileUserBio.setText($.User.get('bio'));
			
			//Get user total node Count
			var totalCountParams = {"args":  Alloy.Models.User.get('uid'), 'display_id':'services_1'};
			$.TotalCount.fetch({
				"success": function(e){
				//Ti.API.info("Getting user total node count: " + JSON.stringify(e));
				
					if(typeof e.models != 'undefined' && typeof e.models[0] != 'undefined')
						user.videoCount = e.models[0].get('nid');
						user.set('videoCount', e.models[0].get('nid'), {'silent': true});
						$.videoCount.setText(e.models[0].get('nid'));		
					},
				"urlparams": totalCountParams
			});

			//Get user flags (following / followers)
			var flag = Alloy.createModel('Flag');
			flag.countAll(flag_name, 'uid', user.get('uid')); //Following
			
			var flag2 = Alloy.createModel('Flag', true);
			flag2.countAll(flag_name, 'entity_id', user.get('uid')); //Followers
		
			var params = {"parameters[type]":"video", "parameters[author]":user.get('uid'), "sort": "created", "direction":"DESC", "pagesize": 10, "parameters[status]": 1 };
			
			Alloy.Models.User = user;
		
			$.loadGallery($.MyVideos, params, galleryCenter, null); //Loads the gallery with a given URL
				}
	});
}

var countFlagFinishedHandler = function(e) {
	Ti.API.info("Count flag finished with: " + JSON.stringify(e));
	if(e.nameToCount == flag_name) {
		if(e.callType == 'uid') {
			user.following = e.count;
			user.set('following', e.count, {'silent': true});
			$.followingCount.setText($.User.get('following'));
		} else {
			user.followers = e.count;
			user.set('followers', e.count, {'silent': true});	
			$.followersCount.setText($.User.get('followers'));
		}
	}
};

Ti.App.addEventListener('countFlagFinished', countFlagFinishedHandler);

/**
 * Image clicked event to change user picture
 */
var imageClicked = function(e) {
	if(user == Alloy.Models.User) {
		// openMediaGallery();
		alert("To edit your profile picture, please visit http://www.tikklr.com");
	}
};

var refreshFollow = function () {
	//Get user flags (following / followers)
	var flag = Alloy.createModel('Flag');
	flag.countAll(flag_name, 'uid', user.get('uid')); //Following
	
	var flag2 = Alloy.createModel('Flag', true);
	flag2.countAll(flag_name, 'entity_id', user.get('uid')); //Followers
};

$.profileImage.addEventListener('click', imageClicked);
Ti.App.addEventListener('flagFinished', refreshFollow);

/**
 * Handles the ratings / tikks / following / followers click event
 */
function buttonClicked(e){
	var numOfChild = selectedButton.children.length;
	
	if(selectedButton != $.ratingButton) {
		selectedButton.backgroundColor = Alloy.Globals.TikklrDarkGray; // Revert old button to gray
		
	} else {
		selectedButton.backgroundColor = Alloy.Globals.TikklrBronze; // Revert old button to Bronze
	}
	
	selectedButton.children[numOfChild - 1].color = Alloy.Globals.TikklrWhite; // Revert old text to white
	
	e.source.backgroundColor = Alloy.Globals.TikklrWhite; //Make selected selected
	selectedButton = e.source; //Save new selected
	numOfChild = selectedButton.children.length;
	
	selectedButton.children[numOfChild - 1].color = Alloy.Globals.TikklrBlack; // make selected label to color Black
	
	if(currentTable) {
		currentTable.hide(); //Make old table unvisible
	}
	
	$.enableLoadMore();
	if(selectedButton == $.followersButton) {
		params = {"args": Alloy.Models.User.get('uid'), 'display_id':'services_1', 'pagesize': 10};
		$.followersTable.setData([]);
		currentFollowers = [];
		$.loadGallery($.Followers, params, galleryCenter, null); //Loads the gallery with a given URL
		switchTables($.followersTable, 'FOLLOWERS');
	} else if(selectedButton == $.followingButton) {
		params = {"args": Alloy.Models.User.get('uid'), 'display_id':'services_1', 'pagesize': 10};
		$.followingTable.setData([]);
		currentFollowing = [];
		$.loadGallery(Alloy.Collections['Following'], params, galleryCenter, null); //Loads the gallery
		switchTables($.followingTable, 'FOLLOWING');
	} else if(selectedButton == $.tikksButton) {
		var params = {"parameters[type]":"video", "parameters[author]":user.get('uid'), "sort": "created", "direction":"DESC", "pagesize": 10, "parameters[status]": 1 };
		$.loadGallery($.MyVideos, params, galleryCenter, null);
		switchTables($.profileTable, 'MY TIKKS');
	} else if(selectedButton == $.ratingButton) {
		switchTables($.profileTable, 'RATING');
	}
}

function videosListLoaded(e) {
	// Ti.API.info("list loaded with: " + JSON.stringify(array));
	//Clear table view if we get less items than we had
	
	if(typeof $.profileTable.data != 'undefined' && 
	   typeof $.profileTable.data[0] != 'undefined' &&
	   typeof $.profileTable.data[0].rows != 'undefined') {
		var numOfRows = $.profileTable.data[0].rows.length;
		if(numOfRows > $.MyVideos.length) { 
			$.profileTable.setData([]);
			currentVideos = [];
		}
	}
	
	//Add new items from the end of the current set of rows.
	for (var i = 0; i < $.MyVideos.length; i++) {
		
		if(currentVideos.indexOf($.MyVideos.models[i].id) == '-1') {
			$.MyVideos.models[i].set(profileNodeTransform($.MyVideos.models[i]), {"silent": true});
			// Ti.API.info("processing... " + JSON.stringify(Alloy.Collections['Following'].models[i]));
			
			var args = {
				model: $.MyVideos.models[i],
			};
			
			$.profileTable.appendRow(Alloy.createController("videosListItem", args).getView());
			currentVideos.push($.MyVideos.models[i].id);	
		}
		
	}
}

$.MyVideos.on("change fetch", videosListLoaded);

function followersListLoaded(e) {
	// Ti.API.info("list loaded with: " + JSON.stringify(e));
	//Clear table view if we get less items than we had
	if(typeof $.followersTable.data != 'undefined' && 
	   typeof $.followersTable.data[0] != 'undefined' &&
	   typeof $.followersTable.data[0].rows != 'undefined') {
		var numOfRows = $.followersTable.data[0].rows.length;
		if(numOfRows > $.Followers.length) { 
			$.followersTable.setData([]);
			currentFollowers = [];
		}
	}
	
	//Add new items from the end of the current set of rows.
	for (var i = 0; i < $.Followers.length; i++) {
		
		if(currentFollowers.indexOf($.Followers.models[i].id) == '-1') {
			$.Followers.models[i].set(userTransform($.Followers.models[i]), {"silent": true});
			// Ti.API.info("processing... " + JSON.stringify($.Followers.models[i]));
			
			var args = {
				model: $.Followers.models[i]
			};
			
			$.followersTable.appendRow(Alloy.createController("followListItem", args).getView());
			currentFollowers.push($.Followers.models[i].id);	
		}
	}
}

$.Followers.on("change fetch", followersListLoaded);

function followingListLoaded(e) {
	// Ti.API.info("list loaded with: " + JSON.stringify(array));
	//Clear table view if we get less items than we had
	
	if(typeof $.followingTable.data != 'undefined' && 
	   typeof $.followingTable.data[0] != 'undefined' &&
	   typeof $.followingTable.data[0].rows != 'undefined') {
		var numOfRows = $.followingTable.data[0].rows.length;
		if(numOfRows > Alloy.Collections['Following'].length) { 
			$.followingTable.setData([]);
			currentFollowing = [];
		}
	}
	
	//Add new items from the end of the current set of rows.
	for (var i = 0; i < Alloy.Collections['Following'].length; i++) {
		
		if(currentFollowing.indexOf(Alloy.Collections['Following'].models[i].id) == '-1') {
			Alloy.Collections['Following'].models[i].set(userTransform(Alloy.Collections['Following'].models[i]), {"silent": true});
			// Ti.API.info("processing... " + JSON.stringify(Alloy.Collections['Following'].models[i]));
			
			var args = {
				model: Alloy.Collections['Following'].models[i],
			};
			
			$.followingTable.appendRow(Alloy.createController("followListItem", args).getView());
			currentFollowing.push(Alloy.Collections['Following'].models[i].id);	
		}
		
	}
}

Alloy.Collections['Following'].on("change fetch", followingListLoaded);

/**
 * Switches the tables that are in view
 */
function switchTables(table, title) {
	table.show();
	currentTable = table;
	$.tableLabel.text = title;
}

/**
 * Handles the see all clicked and scales up and down the current Gallery
 * @param {Object} e
 */
function seeAllClicked(e) {
	
	if(typeof e.source.toggle != 'undefined' && e.source.toggle == true) { // Check if toggle is true or false
		e.source.toggle = false;
		$.profileBox.show();
		$.profileTableHeader.show();
		
		var animation = Titanium.UI.createAnimation(); //Animate gallery back to her size
		animation.top = "243";
		animation.duration = animationDuration;
		Animation.fadeIn($.profileBox, animationDuration);
		Animation.fadeIn($.profileTableHeader, animationDuration);
		
		currentTable.animate(animation);
	} else {
		var animation = Titanium.UI.createAnimation();
		animation.top = 0;
		animation.duration = animationDuration;
		currentTable.animate(animation);
		
		Animation.fadeOut($.profileBox, animationDuration);
		Animation.fadeOut($.profileTableHeader, animationDuration);
		
		e.source.toggle = true;
	}
}

function enableOwnUserFucntionality() {
	
}

function disableOwnUserFucntionality() {
	
}

/**
 * Opens the media gallery to upload a new image
 * @param {Object} e
 */
function openMediaGallery(e) {
	//Show camera on page load.
	Titanium.Media.openPhotoGallery({
	    success: function(e) {
	    	var cropRect = e.cropRect;
	    	var media = e.media;
	        // called when media returned from the camera, always a photo is returned
	        item = e.media;
	        
        	// setTimeout(function(){
        		// Alloy.Globals.Aviary.newImageEditor(e.media, tools);
				// Alloy.Globals.Aviary.displayEditor();
        	// }, 100);
	    },
	    cancel: function(e) {
	        // called when user cancels taking a picture
	        var a = Titanium.UI.createAlertDialog({title:'Cancel'});
	        a.setMessage("Video was canceled");
	    },
	    error:function(error) {
	        // called when there's an error
	        var a = Titanium.UI.createAlertDialog({title: "Camera Error"});
	        
	        if (error.code == Titanium.Media.NO_CAMERA) {
	        	a.setMessage('Please run this on a device with a camera');
	        } else {
	        	a.setMessage("We couldn't get the image, please try again");
	            Ti.API.error('Unexpected error: ' + error.code + 'message: ' + error.message);
	        }
	        a.show();
	    },
		videoQuality: Alloy.Globals.VideoQuality,
	    mediaTypes:[Titanium.Media.MEDIA_TYPE_PHOTO]
	});
};

function followersRowClicked(e){
	//TODO: go to the new user profile page
}

function followingRowClicked(e){
	//TODO: go to the new user profile page
}

/**
 * The clean function - releases the events
 */
exports.clean = function() {
	// aviary.removeEventListener('avEditorFinished', aviaryFinished);
	// aviary.removeEventListener('avEditorCancel', aviaryCanceled);
	Ti.App.removeEventListener('countFlagFinished', countFlagFinishedHandler);
	Ti.App.removeEventListener('flagFinished', refreshFollow);
	$.profileImage.removeEventListener('click', imageClicked);
	//clean data models....
	$.MyVideos.off(null, null, $);
	$.Followers.off(null, null, $);
	Alloy.Collections['Following'].off(null, null, $);
	$.profileTable.setData([]);
	$.followersTable.setData([]);
	$.followingTable.setData([]);
	$.off();
	$.destroy();
};
