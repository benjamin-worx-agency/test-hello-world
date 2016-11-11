exports.baseController = "tikkGallery";

var Animation = require('alloy/animation');
var animationDuration = 300;

var entryId = arguments[0]; //Gets the entryID of the tik details page 

$.currentNode = Alloy.Models.currentNode;
$.HisVideos = Alloy.createCollection("Node");
var currentVideos = [];

var userId = Alloy.Models.currentNode.get('author').id;

var galleryCenter = "400";
$.currentNodeUser.set('uid', userId);

function setViewData() {
	var title = $.currentNode.get("title_field");
	$.featuredTitleLabel.setText(title.toUpperCase());
	$.featuredTitleViews.setText($.currentNode.get("views"));
	$.tagsText.setText($.currentNode.get("kaltura_tags"));
	
	$.userThumb.applyProperties({
	    autoload: true,
	    image: $.currentNode.get("thumb")
	});
	
	$.image.visible = true;
	
	//Disable follow for myself
	if($.currentNodeUser.get('uid') == Alloy.Models.User.get('uid')) {
		$.followButton.visible = false;
		$.followingUserButton.visible = false;
	}
}

function setUserViewData() {
	$.pictureUrl.applyProperties({
	    autoload: true,
	    image: $.currentNodeUser.get("pictureUrl")
	});
	
	$.userNameLabel.setText($.currentNodeUser.get("realname"));
	$.userMailLabel.setText($.currentNodeUser.get("mail"));
	
	if($.currentNodeUser.get('uid') == Alloy.Models.User.get('uid')) {
		$.followButton.visible = false;
		$.followingUserButton.visible = false;
	} else {
		$.followButton.uid = $.currentNodeUser.get('uid');
		$.followButton.visible = $.currentNodeUser.get('isNotFollowed');
		$.followingUserButton.uid = $.currentNodeUser.get('uid');
		$.followingUserButton.visible = $.currentNodeUser.get('isFollowed');
	}
}

setViewData();

function videosListLoaded(e) {
	// Ti.API.info("list loaded with: " + JSON.stringify(array));
	//Clear table view if we get less items than we had
	
	if(typeof $.hisVideosTable.data != 'undefined' && 
	   typeof $.hisVideosTable.data[0] != 'undefined' &&
	   typeof $.hisVideosTable.data[0].rows != 'undefined') {
		var numOfRows = $.hisVideosTable.data[0].rows.length;
		if(numOfRows > $.HisVideos.length) { 
			$.hisVideosTable.setData([]);
			currentVideos = [];
		}
	}
	
	//Add new items from the end of the current set of rows.
	for (var i = 0; i < $.HisVideos.length; i++) {
		
		if(currentVideos.indexOf($.HisVideos.models[i].id) == '-1') {
			$.HisVideos.models[i].set(profileNodeTransform($.HisVideos.models[i]), {"silent": true});
			// Ti.API.info("processing... " + JSON.stringify(Alloy.Collections['Following'].models[i]));
			
			var args = {
				model: $.HisVideos.models[i],
			};
			
			$.hisVideosTable.appendRow(Alloy.createController("videosListItem", args).getView());
			currentVideos.push($.HisVideos.models[i].id);	
		}
		
	}
}

$.HisVideos.on("change fetch", videosListLoaded);

$.currentNodeUser.fetch({"success": function(e){
	//Set data on the model to support new bindings
	properties = userTransform($.currentNodeUser);
	$.currentNodeUser.set(properties, {"silent": true});
	
	Ti.API.info("Got user: " + JSON.stringify(e));
	
	setUserViewData();
	setViewData();
		
	//Check if content is flagged by the user
	var flag = Alloy.createModel('Flag');
	var flag_name = Alloy.Globals.FlagFlag;
		
	flag.isFlagged(flag_name, Alloy.Models.currentNode.id, Alloy.Models.User.uid, contentIsFlaggedCallback);

	var params = {"parameters[type]":"video", "parameters[author]": userId, "sort": "created", "direction":"DESC", "pagesize": 10, "parameters[status]": 1 };
	$.loadGallery($.HisVideos, params, galleryCenter, null);
}});

function contentIsFlaggedCallback(isFlagged){
	if(isFlagged && isFlagged.isFollowing && isFlagged.isFollowing.length > 0) {
		var isFlaggedVal = isFlagged.isFollowing[0];
		
		if(isFlaggedVal == true) { //Content is flagged already 
			flagVideo();
		} else {
			unFlagVideo();
		}
	} else {
		unFlagVideo();
	}
}

/**
 * Player full screen event
 */
function onPlayerFullscreen(e) {
	//TODO: handle player changes from fullscreen to not fullscreen
}

/**
 * The play video call back
 */
var playVideoFunction = function(e) {
	var entryId = e.entryId;
	var manifestUrl = 'http://video.tikklr.com/p/'  + Alloy.Globals.partnerId + '/sp/' + Alloy.Globals.partnerId + '00/playManifest/entryId/' + entryId +  '/format/http/protocol/http/';
	var client = Ti.Network.createHTTPClient({
		onload: function(e) {
			if(typeof $.image != 'undefined' && typeof $.player != 'undefined') {
				var xml = this.responseText;
				if(xml) {
					var xmldata=Ti.XML.parseString(xml);
					var mediaItems = xmldata.documentElement.getElementsByTagName("media");
					var url = mediaItems.item(0).attributes.getNamedItem("url").nodeValue;
					$.player.show();
					$.player.url = url;
					$.image.hide();
					
				} else {
					$.image.show();
					$.image.image = 'http://video.tikklr.com/p/'  + Alloy.Globals.partnerId + "/sp/"+Alloy.Globals.partnerId + "00/thumbnail/entry_id/" + entryId + "/width/600/quality/80";
					$.player.hide();
				}
			}
		}
	});
	client.open("GET", manifestUrl);
	client.send();
};
 
/**
 * Play video event listener
 */
Ti.App.addEventListener('playVideo', playVideoFunction);

Ti.App.fireEvent('playVideo', {'entryId': entryId});
exports.clean = function() {
	if(typeof $.player != 'undefined') {
		$.player.stop();	
	}
	
	$.HisVideos.off(null, null, $);
	$.hisVideosTable.setData([]);
	Ti.App.removeEventListener("playVideo", playVideoFunction);
	Ti.Gesture.removeEventListener("changeorientation", orientationChange);
	$.destroy();
	$.off();
};

var orientationChange = function(e) {
	if(e.orientation == Ti.UI.LANDSCAPE_LEFT || e.orientation == Ti.UI.LANDSCAPE_RIGHT) { //If we are on landscape we play the video full screen
		$.player.fullscreen = true; //Make player fullscreen
		
		//TODO: Make image fullscreen on rotate
		// $.fullImageView.show();
		// $.tikDetailsView.hide();
	} else {
		$.player.fullscreen = false;
		
		//TODO: Make image not fullscreen if player is on
		// $.fullImageView.hide();
		// $.tikDetailsView.show();
	}
};

Ti.Gesture.addEventListener('orientationchange', orientationChange);

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
    shareFacebook();
  } else if(source.id == 'twitter') {
    source.backgroundImage = "twitter-fill.png";
    shareTwitter();
  } else if(source.id == 'linkedIn') {
    source.backgroundImage = "linkedIn-fill.png";
    shareLinkedIn();
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
  }
};


var tikkTitle = Alloy.Models.currentNode.get('title');

var brandName = Alloy.Models.currentNode.get('brandName');
var briefTitle = Alloy.Models.currentNode.get('title');
var briefSummary = Alloy.Models.currentNode.get('briefSummary');
var briefImage = Alloy.Models.currentNode.get('thumb');
var link = "http://go.tikklr.com";

function shareFacebook() {
  Ti.API.info('-----facebookshare-----');
  var fb = require('facebook');
  fb.presentShareDialog({
      link: link,
      title: briefTitle,
      description: briefSummary,
      // title: "Hey, check out the latest brief from " + brandName + ".",
      // description: briefTitle + '\r\n' + briefSummary,
      picture: briefImage
  });
}

function shareTwitter() {
  var social = require('/lib/social');
  var twitter = social.create({
      consumerSecret : Ti.App.Properties.getString("TWITTER_CONSUMER_SECRET"),
      consumerKey : Ti.App.Properties.getString("TWITTER_CONSUMER_KEY")
  });
  // twitter.deauthorize();
  twitter.share({
      // message : "Hey, check out the latest brief from " + brandName + ". Title: " + briefTitle + " Summary: " + briefSummary,
      message : "Hey, check out the latest brief from " + brandName + ". " + link,
      success : function() {
         alert("Tweeted Successfully");
      },
      error : function() {
         alert("Error while tweet");
      }
  });
  
  // twitter.shareImage({
      // message : "Hey, check out the latest brief from " + brandName + ". Title: " + briefTitle + " Summary: " + briefSummary,
      // image : briefImage,
      // success : function() {
         // alert("Tweeted Successfully");
      // },
      // error : function() {
         // alert("Error while tweet");
      // }
  // });
}

function shareLinkedIn() {
  var social = require('/lib/social');
  var linkedin = social.create({
      consumerKey : Ti.App.Properties.getString("LINKEDIN_CONSUMER_KEY"),
      consumerSecret : Ti.App.Properties.getString("LINKEDIN_CONSUMER_SECRET"),
      site: 'linkedin'
  });
  // linkedin.authorize();
  messageContent = {
          "comment" : "Hey, check out the latest brief from " + brandName + ".",
          "content" : {
              "title" : briefTitle,
              "submitted_url" : link,
              "submitted_image_url" : briefImage,
              "description" : briefSummary
          },
      "visibility" : {
          "code" : "anyone"
      }
  };
  linkedin.shareToLinkedin({
      message : messageContent,
      success : function() {
         alert("Linkedin Posted Successfully");
      },
      error : function() {
         alert("Error while posting");
      }
  });
}


function shareThisVideo(e) {
	openShareBox();
}

function starThisVideo(e) {
	alert("TODO: video was stared");	
}

function flagVideo() {
	$.featuredFlag.backgroundImage = "tikklrFlagRed.png";
	$.featuredFlag.toggle = true;
	$.featuredFlag.removeEventListener('click', flagThisVideo); //Remove click event after submission
}

function unFlagVideo() {
	$.featuredFlag.backgroundImage = "tikklrFlagGreen.png";
	$.featuredFlag.toggle = false;	
}

function flagThisVideo(e) {
	
	var dialog = Ti.UI.createAlertDialog({
    	cancel: 1,
    	buttonNames: ['Yes', 'No'],
    	message: 'Would you like to flag this content?',
    	title: 'Flag'
  	});
  	
	dialog.addEventListener('click', function(e) {
	  if (e.index === e.source.cancel) {
	  
	  } else { //Flag approve
	  	var flag = Alloy.createModel('Flag');
		var flag_name = Alloy.Globals.FlagFlag;
		var entity_id = Alloy.Models.currentNode.id;
		var content_id = Alloy.Models.currentNode.id;
		var action = 'flag';
		var uid = Alloy.Models.User.get('uid');
	
		if($.featuredFlag.toggle == false || typeof $.featuredFlag.toggle == 'undefined') { //Change the icon to be red - flag on
			flagVideo();
			action = 'flag';
			$.featuredFlag.toggle = true;
		} else { //We toggle off
			unFlagVideo();
			action = 'unflag';
		}
	
		flag.flag(action, flag_name, entity_id, content_id, uid);
		Ti.API.info("Flagging: " + action + " " + flag_name + " " + entity_id + " " + content_id + " " + uid);
		Ti.App.fireEvent("triggerSuccess", {"message": "Report accepted"});
	  }

	  dialog.hide();
	});
	  
	dialog.show();
  	$.tikDetailsView.add(dialog);		
}
