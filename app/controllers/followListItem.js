exports.baseController = "pandaGallery";
var user = [];
var uid = "";

function setViewData(user) {
	this.user = user;
	this.uid = user.get("uid");
	Ti.API.info("follow cell loaded with argument: " + JSON.stringify(arguments));
	
	//visible="{$.item.isNotFollowed}"text="{$.item.mail}"text="{$.item.realname}"image="{$.item.pictureUrl}" nodeId="{$.item.uid}"
	$.followUserImage.applyProperties({
		    	autoload: true,
		    	image: user.get("pictureUrl").replace("/styles/50x50/public", "")
			});
	$.followingNodeLabel.setText(user.get("realname"));
	$.followingNodeUser.setText(user.get("mail"));
	$.followButton.uid = user.get("uid");
	$.followButton.setVisible(user.get("isNotFollowed"));
	$.followingUserButton.uid = user.get("uid");
	$.followingUserButton.setVisible(user.get("isFollowed")); 
}

setViewData(arguments[0].model);

exports.clean = function() {
	//Clean this controller in it's parent
	$.destroy();
	$.off();
};