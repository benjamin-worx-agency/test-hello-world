exports.baseController = "pandaGallery";

var video = [];
/**
 * Cateogries by ids 
 */
var categoriesByIds = {
	128 : "category-arts.png",
	130 : "category-motors.png",
	131 : "category-makeup.png",
	132 : "category-travel.png",
	133 : "category-drinks.png", 
	134 : "category-music.png",
	135 : "category-fashion-men.png",
	136 : "category-fashion-women.png",
	137 : "category-dining.png",
	138 : "category-home.png",
	139 : "category-baby.png",
	141 : "category-sports.png",
	142 : "category-toys.png",
	273 : "category-motors.png", 
	274 : "category-technology.png",
	143 : "category-travel.png"
};

//Set view data
function setViewData(model) {
	// Ti.API.info("got featured video: " + JSON.stringify(model));
	this.video = model;

	$.tableViewRow.nodeId = this.video.get('nid');
	
	$.nodeThumb.applyProperties({
	    autoload: true,
	    image: this.video.get("thumb")
	});
	
	var categoryImage = ''; //Set default image
	
	if(typeof this.video.get('og_group_ref') != 'undefined' && typeof this.video.get('og_group_ref')[0] != 'undefined') {
		var categoryId = this.video.get('og_group_ref')[0].id;
		categoryImage = categoriesByIds[categoryId];
		if(typeof categoryImage != 'undefined') {
			this.video.set('categoryImage', categoryImage, {'silent': true});
					
			//Load the category image
			$.infoCategoryIcon.applyProperties({
		    	autoload: true,
		    	image: categoryImage
			});
		}	
	}
	
	$.infoTag.setText(this.video.get('kaltura_tags'));
	
	$.followingNodeUser.setText(this.video.get('followers'));
	
	$.featuredNodeLabel.setText(this.video.get('titleUpperCase'));
	$.featuredNodeViews.setText(this.video.get('views'));
	
	$.followButton.uid = this.video.get("author").id;
	$.followingUserButton.uid = this.video.get("author").id;
	
	findNodeAuthor(this.video.get("author"));
}

setViewData(arguments[0].model);

function findNodeAuthor(author) {
	for(var i=0,j=Alloy.Collections['Following'].length; i<j; i++){
	  if (author.id == Alloy.Collections['Following'].models[i].get("uid")) {
	  	setNodeUser(Alloy.Collections['Following'].models[i]);
	  	return;
	  }
	};
	$.currentNodeUser.set('uid', author.id);
	$.currentNodeUser.fetch({"success": function(e){
		setNodeUser($.currentNodeUser);
	}});
}

function setNodeUser(user) {
	user.set(userTransform(user), {"silent": true});
	// Ti.API.info("user : " + JSON.stringify(user));
	$.featuredUserThumb.applyProperties({
    	autoload: true,
    	image: user.get("pictureUrl").replace("/styles/50x50/public", "")
	});
	$.followButton.setVisible(user.get("isNotFollowed"));
	$.followingUserButton.setVisible(user.get("isFollowed"));
	$.followingNodeLabel.setText(user.get('realname'));
}

exports.clean = function() {
	//Clean this controller in it's parent
	this.video = null;
	$.destroy();
	$.off();
};