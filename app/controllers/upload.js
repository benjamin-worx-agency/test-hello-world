var givenTags = '';
var title = '';
var type = '';
var category = '';
var rewardId = '';

args = arguments[0];

//Gets argumets for upload page
if(args != null && typeof args != 'undefined') {
	if(typeof args['type'] != 'undefined') {
		type = args['type']; //Gets the type of the upload page (capture or library)	
	}
	
	if(typeof args['tags'] != 'undefined') {
		givenTags = args['tags']; //Gets the tags of the upload page
	}
	
	if(typeof args['title'] != 'undefined') {
		title = args['title']; //Gets the title of the upload page
	}
	
	if(typeof args['category'] != 'undefined') {
		category = args['category']; //Gets the title of the upload page
	}
	
	if(typeof args['rewardId'] != 'undefined') {
		rewardId = args['rewardId']; //Gets the title of the upload page
	}
}

function changeKalturaBind(e){
	//TODO: fix progress bar issues.
	$.progressBar.setVisible(Alloy.Models.Kaltura.get("uploadInProgress"));
	var progress = Alloy.Models.Kaltura.get('uploadProgress');
	$.progressBar.setWidth(progress * 300 + 10);
}

Alloy.Models.Kaltura.on("change", changeKalturaBind);

//Init Kaltura fields
Alloy.Models.Kaltura.set({"uploadInProgress": 0,
	"uploadProgress": 0,
	"uploadNotInProgress": 1,
	"uploadProgressFor620px": "0",
	"drupalCategoryId": null
}, {'silent': true});

$.Kaltura = Alloy.Models.Kaltura;

//Manual changes to the view instead of the bindings
function setViewData() {
	$.progressBar.setVisible(Alloy.Models.Kaltura.get("uploadInProgress"));
	var progress = Alloy.Models.Kaltura.get('uploadProgress');
	$.progressBar.setWidth(progress * 300 + 10 );
	
	uploadBlur(); //upadte the upload status according to view.
}

setViewData();

//Init categories from Drupal
var categoriesParams = {"parameters[type]": "category"};
$.Categories.config.headers['X-CSRF-TOKEN'] = Titanium.App.Properties.getString(Alloy.Globals.Properties.Token);
$.Categories.config.headers['Cookie'] = Titanium.App.Properties.getString(Alloy.Globals.Properties.Session);
$.Categories.fetch({success: function() {
		return;
	},
	'urlparams': categoriesParams
});

var tools = ['kAFEffects', 'kAFOrientation', 'kAFBrightness', 'kAFContrast', 'kAFSharpness'];

//Obtain aviary module
// if (Alloy.Globals.Aviary == null || typeof Alloy.Globals.Aviary == 'undefined') {
	// Alloy.Globals.Aviary = require('com.ghkim.aviary');
// }
// 
// var aviary = Alloy.Globals.Aviary;

//The item to upload
var item = null;

$.categoryPicker.hide();

/**
 * Aviary editor event listener
 */
var aviaryFinished = function(ev) {
	$.imageContainer.backgroundImage = ev.image;
	item = ev.image; //Sets the aviary image	
};

/**
 * Aviary editor canceled event listener
 */
var aviaryCanceled = function(ev) {
	backClicked();
};

// aviary.addEventListener('avEditorFinished', aviaryFinished);
// aviary.addEventListener('avEditorCancel', aviaryCanceled);

/**
 * Returns the list of tags
 */
function getTags(){
	var newTags = '';
	
	for (var i in $.tags.children) {
		newTags += $.tags.children[i].children[0].text;
		newTags += ", ";
	}
	
	newTags = newTags.substr(0, newTags.length - 2); //Remove the last ", "
	
	return newTags;
}

/**
 * Upload to Kaltura function (will also update drupal) 
 */
function uploadToKalturaBtnClick() {
	var valid = uploadIsValid();
	if(item != null && valid)
	{
		if (Titanium.Network.networkType == Titanium.Network.NETWORK_WIFI) {
			startUploadToKaltura();		
		} else if (Titanium.Network.online) {
			var dialog = Ti.UI.createAlertDialog({
				cancel : 1,
				buttonNames : ['Yes', 'No'],
				message : 'Uploading content via a cellular network might take longer than usual. We recommend uploading via a WiFi network for best results. Are you sure you want to proceed?',
				title : 'Upload'
			});
	
			dialog.addEventListener('click', function(e) {
				if (e.index === dialog.cancel) {
	
				} else {//Flag approve
					startUploadToKaltura();
				}
				dialog.hide();
			});
	
			dialog.show();
		}
	}
};

function startUploadToKaltura() {
	$.backButton.visible = false;
	Ti.App.fireEvent('hideActionMenu');
	Alloy.Models.Kaltura.set('title', $.title.value, {'silent': true});
	var tags = getTags();
	var drupalCategoryId = getDrupalCategoryId();
	
	Alloy.Models.Kaltura.set("drupalCategoryId", drupalCategoryId, {'silent': true});
	Alloy.Models.Kaltura.set('tags', tags, {'silent': true});
	Alloy.Models.Kaltura.set('category', $.category.value, {'silent': true});
	Alloy.Models.Kaltura.set('rewardId', rewardId, {'silent': true});
	
	Alloy.Models.Kaltura.title = $.title.value;
	Alloy.Models.Kaltura.tags = tags;
	Alloy.Models.Kaltura.category = $.category.value;
	Alloy.Models.Kaltura.rewardId = rewardId;
	
	Alloy.Models.Kaltura.drupalCategoryId = drupalCategoryId;
	
	item.name = $.title.value;
	Alloy.Models.Kaltura.uploadToKaltura(item);
	disableUpload();
};

Ti.App.addEventListener('uploadFailed', function () {
  $.backButton.visible = true;
  Ti.App.fireEvent('showActionMenu');
});

function getDrupalCategoryId() {
	var id = null;
	
	for(var i in $.Categories.models) {
		if($.Categories.models[i].get('title') == $.category.value) {
			id = $.Categories.models[i].id;
		}
	}
	
	return id;
}

/**
 * Opens the device media gallery
 */
function openMediaGallery(e) {
	//Show camera on page load.
	Titanium.Media.openPhotoGallery({
	    success: function(e) {
	    	var cropRect = e.cropRect;
	        // called when media returned from the camera
	        
	        if(e.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
	        	Ti.API.log("e is: " + JSON.stringify(e));
	        	$.imageContainer.backgroundImage = e.media;
	        	$.imageContainer.setBackgroundImage(e.media);
	        	item = e.media; // We save the item in case Aviary is not opening.
	        	
	        	Ti.API.log("selected item is: " + JSON.stringify(item));
	        	
	        	// setTimeout(function() {
	        		// aviary.newImageEditor(item, tools);
    				// aviary.displayEditor();
	        	// } , 100);
	        } else {
	        	var player = Titanium.Media.createVideoPlayer({media: e.media, autoplay: 0});
	        	player.requestThumbnailImagesAtTimes([0.1], Titanium.Media.VIDEO_TIME_OPTION_NEAREST_KEYFRAME, 
	        		function (e) {
	        			Ti.API.info("Thumbnail callback called, success = " + e.success);
             			var image = e.image;
             			$.imageContainer.backgroundImage = image;
             		});
	       		
	            item = e.media;
	        }
	        
	    },
	    cancel:function(e) {
	        // We go back if the user cancels the operation
	        backClicked();
	    },
	    error:function(error) {
	        // called when there's an error
	        var a = Titanium.UI.createAlertDialog({title:'Camera'});
	        
	        if (error.code == Titanium.Media.NO_CAMERA) {
	        	a.setMessage('Please run this test on device');
	        } else {
	            a.setMessage('Unexpected error: ' + error.code);
	        }
	        a.show();
	    },
	    saveToPhotoGallery: false, //We don't need to save the chossen photo
	    videoMaximumDuration: Alloy.Globals.VideoTimeLimit,
		videoQuality: Alloy.Globals.VideoQuality,
	    mediaTypes:[Titanium.Media.MEDIA_TYPE_PHOTO, Titanium.Media.MEDIA_TYPE_VIDEO]
	});
};

/**
 * Open the capture from camera iOS screen
 */
function openCapture(e){
	//Show camera on page load.
	Titanium.Media.showCamera({
	    success: function(e) {
	    	Ti.API.log("e is: " + JSON.stringify(e));
	    	var cropRect = e.cropRect;
	    	$.imageContainer.backgroundImage = e.media;
        	$.imageContainer.setBackgroundImage(e.media);
	        if(e.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
	        	// setTimeout(function(){
	        		// aviary.newImageEditor(e.media, tools);
    				// aviary.displayEditor();
	        	// }, 100);
	        } else {
	        	var player = Titanium.Media.createVideoPlayer({media: e.media, autoplay: 0});
	       		player.requestThumbnailImagesAtTimes([0.1], Titanium.Media.VIDEO_TIME_OPTION_NEAREST_KEYFRAME, 
	        		function (e) {
             			var image = e.image;
             			$.imageContainer.backgroundImage = image;
             		});
             		
	       		// item = e.media; //Sets the item as the video
	        }
	        item = e.media;
	    },
	    cancel:function(e) {
	       	// We go back if the user cancels the operation
	        backClicked();
	    },
	    error:function(error) {
	        // called when there's an error
	        var a = Titanium.UI.createAlertDialog({title:'Camera'});
	        
	        if (error.code == Titanium.Media.NO_CAMERA) {
	        	a.setMessage('Please run this test on device');
	        } else {
	            a.setMessage('Unexpected error: ' + error.code);
	        }
	        a.show();
	    },
	    saveToPhotoGallery: true, //We don't need to save the chossen photo
	    videoMaximumDuration: Alloy.Globals.VideoTimeLimit,
		videoQuality: Alloy.Globals.VideoQuality,
	    mediaTypes:[Titanium.Media.MEDIA_TYPE_PHOTO, Titanium.Media.MEDIA_TYPE_VIDEO]
	});
};

/**
 * Checks if upload is valid and available
 */
function uploadIsValid() {
	var isTitleEmpty = $.title.value.length == 0;
	var isTagsEmpty = $.tags.children.length == 0;
	var isCategoryEmpty = $.category.value.length == 0;
	
	var isValid = !isCategoryEmpty && !isTagsEmpty && !isTitleEmpty && Alloy.Models.Kaltura.get('uploadNotInProgress') && item != null;
	
	return isValid;
}

/**
 * Enables upload on the page
 */
function enableUpload() {
	$.uploadButton.color = Alloy.Globals.TikklrGreen;
}

/**
 * Disables upload on the page
 */
function disableUpload() {
	$.uploadButton.color = Alloy.Globals.TikklrUploadGray;
}

/**
 * Called when a field is blured to check if upload is valid
 */
function uploadBlur(e) {
	var valid = uploadIsValid();
	
	if(valid) {
		enableUpload();
	} else {
		disableUpload();
	}
}

/**
 * Creates a tag for the given string
 */
function createTag(tagText) {
	var tagWrapper = Titanium.UI.createView({});
	var tag = Titanium.UI.createLabel({text: tagText});
	var tagClose = Titanium.UI.createView({});
		
	tagWrapper.addEventListener('click', function(e){
	});
	
	tag.addEventListener('click', function(e){
		var tagWrapper = e.source.parent;
		$.tags.paddingLeft = $.tags.paddingLeft - tagWrapper.toImage().width - parseInt(tagWrapper.left);
		$.tags.remove(tagWrapper);
		tagWrapper = null;
		uploadBlur();
		
	});
	
	tagClose.addEventListener('click', function(e){
		var tagWrapper = e.source.parent;
		$.tags.paddingLeft = $.tags.paddingLeft - tagWrapper.toImage().width - parseInt(tagWrapper.left);
		$.tags.remove(tagWrapper);
		tagWrapper = null;
		uploadBlur();
	});
	
	$.addClass(tagWrapper, "tagWrapper");
	$.addClass(tag, "tag");
	$.addClass(tagClose, "tagClose");

	tagWrapper.add(tag);
	tagWrapper.add(tagClose);
	$.tags.add(tagWrapper);
	
	$.tags.value = "";
	$.tags.paddingLeft = $.tags.paddingLeft + tagWrapper.toImage().width + parseInt(tagWrapper.left);
}

var isFirst = true;
/**
 * Happens when tag is blured (creates a new tag)
 */
function tagsBlur(e) {
	if(isFirst) { //Handles the blur event fires twice.
		if(e.value != "") {
			createTag(e.value);
		}
		
		e.cancelBubble = true;
		e.bubbles = false;
		uploadBlur();
		isFirst = false;	
	} else {
		isFirst = true;
	}
	
	return e;
}

/**
 * Category focus function
 */
function categoryFocus(e){
	$.categoryPicker.show();
	e.source.blur();
}

/**
 * General upload field is focused
 */
function uploadFocus(e) {
	
}

/**
 * Calls when done is clicked on the bottom category picker
 */
function doneClicked() {
	$.category.value = $.picker.getSelectedRow(0).title;
	$.categoryPicker.hide();
	var valid = uploadIsValid();
	
	if(valid) {
		enableUpload();
	} else {
		disableUpload();
	}
}

/**
 * Row is clicked on the category gallery
 */
function rowClicked(e) {
	$.category.value = e.row.children[0].text;
	$.categoryPicker.hide();
	var valid = uploadIsValid();
	
	if(valid) {
		enableUpload();
	} else {
		disableUpload();
	}
}

/**
 * Called when cancel is clicked
 */
function cancelClicked() {
	$.categoryPicker.hide();	
}

/**
 * Creates the attributed texts
 */
function createAttributedTexts()
{
	var text = "TITLE";
	
	var attributedText = Titanium.UI.iOS.createAttributedString({
		text: text,
		attributes: [
			{
	            type: Titanium.UI.iOS.ATTRIBUTE_BACKGROUND_COLOR,
	            value: Alloy.Globals.TikklrBlack,
	            range: [0, text.length],
	            type: Titanium.UI.iOS.ATTRIBUTE_FOREGROUND_COLOR,
	            value: Alloy.Globals.TikklrTextBlack,
	            range: [0, text.length]
	        }
	    ]
	});
	
	$.title.attributedHintText = attributedText;
	
	text = "TAGS";
	 
	 var tagsAttributedText = Titanium.UI.iOS.createAttributedString({
		text: text,
		attributes: [
			{
	            type: Titanium.UI.iOS.ATTRIBUTE_BACKGROUND_COLOR,
	            value: Alloy.Globals.TikklrBlack,
	            range: [0, text.length],
	            type: Titanium.UI.iOS.ATTRIBUTE_FOREGROUND_COLOR,
	            value: Alloy.Globals.TikklrTextBlack,
	            range: [0, text.length]
	        }
	    ]
	});
	
	$.tags.attributedHintText = tagsAttributedText;
	
	
	text = "CATEGORY";
	 
	var categoryAttributedText = Titanium.UI.iOS.createAttributedString({
		text: text,
		attributes: [
			{
	            type: Titanium.UI.iOS.ATTRIBUTE_BACKGROUND_COLOR,
	            value: Alloy.Globals.TikklrBlack,
	            range: [0, text.length],
	            type: Titanium.UI.iOS.ATTRIBUTE_FOREGROUND_COLOR,
	            value: Alloy.Globals.TikklrTextBlack,
	            range: [0, text.length]
	        }
	    ]
	});
	
	$.category.attributedHintText = categoryAttributedText;
}

if(type != "" && type == "library") {
	openMediaGallery();	
} else if (type == "capture"){
	openCapture();
} else { //Default open media gallery
	openMediaGallery();
}

if(givenTags != "" && typeof givenTags != 'undefined') {
	createTag(givenTags);
}

if(title != "" && typeof title != 'undefined') {
	$.title.value = title;
}

if(category != "" && typeof category != 'undefined') {
	$.category.value = category;
}

createAttributedTexts();

if (uploadIsValid()) {
	disableUpload();	
}

exports.clean = function () {
	// aviary.removeEventListener('avEditorFinished', aviaryFinished);
	// aviary.removeEventListener('avEditorCancel', aviaryCanceled);
	$.off();
	Alloy.Models.Kaltura.off(null, null, $);
	// Alloy.Globals.Aviary = null;
	$.destroy();
};

