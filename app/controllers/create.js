var givenTags = '';
var title = '';
var type = 'library';
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

function libraryClicked(e) {
	$.photo.backgroundColor = Alloy.Globals.TikklrCreateBlack;
	$.photoCircle.backgroundColor = Alloy.Globals.TikklrBlack;
	
	$.video.backgroundColor = Alloy.Globals.TikklrGreen;
	$.videoCircle.backgroundColor = Alloy.Globals.TikklrWhite;
	
	setTimeout( function() {
		var args = {
			type: type,
			title: title,
			tags: givenTags,
			category: category,
			rewardId: rewardId
		};
		Ti.App.fireEvent('attachWindow', {page: "upload", arguments: args});
	}, 100 );
}

function cameraClicked(e) {
	$.photo.backgroundColor = Alloy.Globals.TikklrGreen;
	$.photoCircle.backgroundColor = Alloy.Globals.TikklrWhite;
	
	$.video.backgroundColor = Alloy.Globals.TikklrCreateBlack;
	$.videoCircle.backgroundColor = Alloy.Globals.TikklrBlack;
	
	setTimeout( function() {
		var args = {
			type: "capture",
			title: title,
			tags: givenTags,
			category: category,
			rewardId: rewardId
		};
		
		Ti.App.fireEvent('attachWindow', {page: "upload", arguments: args});
	}, 100 );
}

exports.clean = function(){
	$.destroy();
	$.off();
};
