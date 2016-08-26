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
	
	Ti.API.info('---$---');
	Ti.API.info(JSON.stringify($));
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
      // title: "Hey, check out the latest brief from " + brandName,
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
  // twitter.authorize();
  twitter.share({
      message : "Message to Share",
      success : function() {
         alert("Tweeted Successfully");
      },
      error : function() {
         alert("Error while tweet");
      }
  });
  
  twitter.shareImage({
      message : messageContent,
      image : (Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, "KS_nav_ui.png")).read(),
      success : function() {
         alert("Tweeted Successfully");
      },
      error : function() {
         alert("Error while tweet");
      }
  });
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
          "comment" : "Hey, check out the latest brief from " + brandName,
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
	//alert("TODO: video was starred");
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
