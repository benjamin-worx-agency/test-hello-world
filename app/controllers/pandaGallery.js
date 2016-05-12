var Animation = require('alloy/animation');
var animationDuration = 300;
var flag_name = Alloy.Globals.FollowFlag;

var numOfItems = 10;

var loadMore = true;
var loading = false;

var urlParams = {
	"parameters[type]" : "briefs",
	"sort" : "created",
	"direction" : "DESC",
	"pagesize" : numOfItems
};
//default value for the gallery
var tablePullHeight = -60;
var pulling = false;
var reloading = false;
var offset = 0;
var page = 1;
var adding = false;
var collection;
var galleryCenter = null;

/**
 * Months to weekdays
 */
var weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

/**
 * Months to names
 */
var months = new Array(7);
months[0] = "January";
months[1] = "February";
months[2] = "March";
months[3] = "April";
months[4] = "May";
months[5] = "June";
months[6] = "July";
months[7] = "August";
months[8] = "September";
months[9] = "October";
months[10] = "November";
months[11] = "December";

/**
 * Cateogries by ids
 */
var categoriesByIds = {
	128 : "category-arts.png",
	130 : "category-motors.png",
	131 : "category-makeup.png",
	'Days Out' : "category-travel.png", //TODO: need fixing
	133 : "category-drinks.png",
	'Entertainment' : "category-drinks", //TODO: need fixing
	135 : "category-fashion-men.png",
	136 : "category-fashion-women.png",
	137 : "category-dining.png",
	138 : "category-home.png",
	139 : "category-baby.png",
	134 : "category-music.png",
	141 : "category-sports.png",
	142 : "category-toys.png",
	132 : "category-travel.png",
	274 : "category-technology.png",
	143 : "category-travel.png"
};

/**
 * Cateogries by name
 */
var categories = {
	'Arts' : "category-arts.png",
	'Automotive' : "category-motors.png",
	'Beauty' : "category-makeup.png",
	'Days Out' : "category-makeup.png", //TODO: need fixing
	'Drink' : "category-drinks.png",
	'Entertainment' : "category-drinks", //TODO: need fixing
	'Fashion (Mens)' : "category-fashion-men.png",
	'Fashion (Womens)' : "category-fashion-women.png",
	'Food' : "category-dining.png",
	'Homes and Gardens' : "category-home.png",
	"Mum's" : "category-baby.png",
	'Music' : "category-music.png",
	'Sports' : "category-sports.png",
	'Toys' : "category-toys.png",
	'Travel' : "category-travel.png",
	'Technology' : "category-technology.png"
};

/**
 * Transforms the video node and set all UI fields
 */
nodeTransform = function(model) {
	Ti.API.info("In gallery Video transform: " + JSON.stringify(model));
	// Need to convert the model to a JSON object
	var transform = model.toJSON();

	// Example of creating a custom attribute, reference in the view using {custom}
	transform.isOwner = Alloy.Models.User.get('uid') == transform.author.id ? 1 : 0;
	transform.titleUpperCase = transform.title.toUpperCase();
	transform.thumb = 'http://video.tikklr.com/p/' + Alloy.Globals.partnerId + '/thumbnail/entry_id/' + transform.uploader + '/width/' + Ti.Platform.displayCaps.platformWidth * 2 + '/type/1/quality/80';

	if ( typeof transform.views != 'undefined') {
		var views = "";//Math.floor((Math.random() * 10000) + 1);
		transform.views = views;// + ' views';
		// TODO: take entry views
	}

	transform.categoryImage = '';
	//Set default image

	if ( typeof transform.og_group_ref != 'undefined' && typeof transform.og_group_ref[0] != 'undefined') {
		var categoryId = transform.og_group_ref[0].id;

		var categoryImage = categoriesByIds[categoryId];
		if ( typeof categoryImage != 'undefined') {
			transform.categoryImage = categoryImage;
		}
	}

	if (transform.type == "video") {
		transform.isVideo = true;
		transform.isThumb = false;
	} else {
		transform.isVideo = false;
		transform.isThumb = true;
	}

	return transform;
};

profileNodeTransform = function(model) {
	var transform = nodeTransform(model);
	transform.thumb = 'http://video.tikklr.com/p/' + Alloy.Globals.partnerId + '/thumbnail/entry_id/' + transform.uploader + '/width/' + Ti.Platform.displayCaps.platformWidth * 2 + '/height/165/type/3/quality/80';

	return transform;
};

/**
 * Transforms the breif node and set all UI fields
 */
briefTransform = function(model) {
	Ti.API.info("In gallery Brief transform: " + JSON.stringify(model));
	// Need to convert the model to a JSON object
	var transform = model.toJSON();

	transform.summary = "";
	transform.description = "";

	if ( typeof transform.body != 'undefined') {
		transform.summary = transform.body.summary;
		transform.description = transform.body.value;
	}

	// Example of creating a custom attribute, reference in the view using {custom}
	transform.isOwner = Alloy.Models.User.get('uid') == transform.author.id ? 1 : 0;
	transform.titleUpperCase = transform.title.toUpperCase();

	transform.thumb = "star.png";

	if ( typeof transform != 'undefined' && typeof transform.image != 'undefined' && transform.image.file && transform.image.file) {
		transform.thumb = transform.image.file.fileUrl;
	}

	var categoryName = transform.category;
	transform.categoryImage = categories[categoryName];

	if ( typeof transform.date != 'undefined') {
		var endDate = new Date(transform.date.value2 * 1000);
		var endMinutes = Number(endDate.getMinutes());
		if (endMinutes < 10) {
			endMinutes = "0" + endMinutes;
		}
		transform.endDate = weekday[endDate.getDay()] + " " + endDate.getDate() + "th " + " " + months[endDate.getMonth()] + " " + endDate.getFullYear() + " " + endDate.getHours() + ":" + endMinutes;
	}

	transform.isSelfie = transform.selfie_tikk ? true : false;

	if (transform.isSelfie) {
		transform.selfieImage = "selfie-gray.png";
	} else {
		transform.selfieImage = "selfie-dead.png";
	}

	transform.isVideo = transform.video_tikk ? true : false;

	if (transform.isVideo) {
		transform.isVideoImage = "video-gray.png";
	} else {
		transform.isVideoImage = "video-dead.png";
	}
	
	transform.isThumb = transform.tikk_options ? true : false;
	
	if (transform.isThumb) {
		transform.thumbAllowedImage = "photo-gray.png";
	} else {
		transform.thumbAllowedImage = "photo-dead.png";
	}

	transform.notIsSelfie = transform.selfie_tikk ? false : true;
	transform.notIsVideo = transform.video_tikk ? false : true;
	transform.notIsThumb = transform.tikk_options ? false : true;
	
	if (transform.voucher_type == 'Points') {
		transform.voucher_image = "pound.png";
	} else if (transform.voucher_type == 'Ticket') {
		transform.voucher_image = "tik-ticket.png";
		transform.voucher_value = "VIP";
	} else if (transform.voucher_type == 'Discount' || transform.voucher_type == 'Voucher') {
		transform.voucher_image = "percent-voucher.png";
	} else if (transform.voucher_type == 'Gift') {
		transform.voucher_image = "gift.png";
		transform.voucher_value = "FREE";
	}

	return transform;
};

var savedSuccessCallback = null;
/**
 * Transforms the reward node and set all UI fields
 */
rewardTransform = function(model) {

	Ti.API.info("In gallery Reward transform: " + JSON.stringify(model));
	// Need to convert the model to a JSON object
	var transform = model.toJSON();

	// Example of creating a custom attribute, reference in the view using {custom}
	transform.isOwner = Alloy.Models.User.get('uid') == transform.author.id ? 1 : 0;
	transform.titleUpperCase = transform.title.toUpperCase();

	var endDateString = '';

	if ( typeof transform.expiration_date != 'undefined') {
		var endDate = new Date(transform.expiration_date * 1000);
		var month = endDate.getMonth() + 1;
		var day = endDate.getDate();
		var year = endDate.getFullYear();
		var year = year.toString().substr(2, 2);

		endDateString = day + "." + month + ". " + year;
	}

	transform.expirationDate = endDateString;

	if (transform && transform.brand_logo && transform.brand_logo.file && transform.brand_logo.file) {
		transform.brandImage = transform.brand_logo.file.fileUrl;
	}

	//Default color for rewards
	transform.rewardBackgroundColor = Alloy.Globals.TikklrRewardBlue;
	transform.thumb = "pounds-white.png";

	if (transform.reward_type == 'Cash') {
		transform.thumb = "pounds-white.png";
		transform.rewardBackgroundColor = Alloy.Globals.TikklrRewardBlue;
	} else if (transform.reward_type == 'Ticket') {
		transform.thumb = "tikket-white.png";
		transform.rewardBackgroundColor = Alloy.Globals.TikklrRewardGreen;
	} else if (transform.reward_type == 'Discount') {
		transform.thumb = "gift-white.png";
		transform.rewardBackgroundColor = Alloy.Globals.TikklrRewardOrange;
	}

	if (transform && transform.image && transform.image.file && transform.image.file) {
		transform.thumb = transform.image.file.fileUrl;
	}

	if ( typeof transform.og_group_ref != 'undefined' && typeof transform.og_group_ref[0] != 'undefined') {
		var categoryImage = categoriesByIds[categoryId];

		if ( typeof categoryImage != 'undefined') {
			transform.categoryImage = categoryImage;
		} else {
			transform.categoryImage = '';
		}
	}

	return transform;
};

/**
 * Handles parsing of the user model into the right properties
 */
userTransform = function(model) {
	Ti.API.info("In gallery user transform: " + JSON.stringify(model));

	// Need to convert the model to a JSON object
	var transform = model.toJSON();

	transform.pictureUrl = "profile.png";

	//Set user picture URL - from drupal or build it or default
	if (model.get("picture") && model.get("picture") != null && model.get("picture") != 0) {//If we have a picture object

		var picture = model.get("picture");

		if ( typeof picture.url != 'undefined') {
			transform.pictureUrl = model.get("picture").url;
		} else if ( typeof picture.filename != 'undefined') {
			transform.pictureUrl = Alloy.Globals.drupalPublicImageUrlBase + picture.filename;
		}
	}

	transform.pictureUrl = transform.pictureUrl.replace('styles/254x175', "styles/50x50");

	transform.realname = model.get("realname");
	transform['@realname'] = "@" + model.get('realname');

	if (!transform.realname || !transform['@realname']) {//Names not set changing to other names.
		transform.realname = model.get("name");
		transform['@realname'] = "@" + model.get('name');
	}

	transform.name = model.get("name");
	transform.mail = model.get("mail");
	transform.uid = model.get("uid");
	transform.id = model.get("id");
	transform.mail = model.get("mail");

	transform.firstName = model.getDrupalFieldValue('field_name_first');
	transform.lastName = model.getDrupalFieldValue('field_name_last');
	transform.bio = model.getDrupalFieldValue('field_bio');

	transform.isFollowed = false;
	transform.isNotFollowed = true;

	if (transform.uid != Alloy.Models.User.uid) {//Check if user is already followed by current User
		if ( typeof Alloy.Collections['Following'].get(transform.uid) != 'undefined') {
			transform.isFollowed = true;
			transform.isNotFollowed = false;
		}
	} else {//User is ourselves no need to show follow / following flags
		transform.isNotFollowed = false;
	}

	transform.videoCount = '';
	transform.following = '';
	transform.followers = '';

	return transform;
};

/**
 * Handles parsing of the user model into the right properties
 */
user2Transform = function(model) {
	return userTransform(model);
};

/**
 * Handles the message transform to the list
 */
messageTransform = function(model) {
	Ti.API.info("In gallery message transform: " + JSON.stringify(model));

	// Need to convert the model to a JSON object
	var transform = model.toJSON();

	var messageText = model.get('text');
	messageText = cleanMessageText(messageText);

	//Add css to webview and add the message
	var head = "<head><link rel='stylesheet' type='text/css' href='css/message.css'/></head>";
	transform['html'] = head + '<body style="font-size: 15px;">' + messageText + '</body>';
	//Added body and head as the HTML of the message
	transform['text'] = messageText;
	//The message text

	return transform;
};

/**
 * Cleans the message text and returns the truncated message
 */
function cleanMessageText(text) {
	var index = text.indexOf('\n');
	var textArray = text.split('\n', 2);

	var newText = textArray.join("");

	return newText;
}

/**
 * Handles table scroll
 */
tableScroll = function(e) {
	offset = e.contentOffset.y;

	if (pulling && !reloading && offset > tablePullHeight && offset < 0) {
		pulling = false;
		var unrotate = Ti.UI.create2DMatrix();
		$.tableHeader.imageArrow.animate({
			transform : unrotate,
			duration : 180
		});
		$.tableHeader.labelStatus.text = 'Pull down to refresh...';
	} else if (!pulling && !reloading && offset < tablePullHeight) {
		pulling = true;
		var rotate = Ti.UI.create2DMatrix().rotate(180);
		$.tableHeader.imageArrow.animate({
			transform : rotate,
			duration : 180
		});
		$.tableHeader.labelStatus.text = 'Release to refresh...';
	}
};

tableScrollEnd = function(e) {
	if (!loadMore || loading) {
		return;		
	}
	// the end of the list get more item
	if (!adding && e.contentOffset.y + e.size.height >= e.contentSize.height) {
		//Load more items
		var pageSize = numOfItems * page++;

		urlParams.pagesize = pageSize;

		Ti.App.fireEvent('loading', {
			"top" : galleryCenter
		});

		if ( typeof collection != 'undefined') {
			loading = true;
			collection.fetch({
				"success" : function(e) {
					if ( typeof savedSuccessCallback != 'undefined' && savedSuccessCallback != null) {
						savedSuccessCallback(e);
					}
					loading = false;
					collection = e;

					//Ti.API.info("Success fetching gallery" + JSON.stringify(e));
					Ti.App.fireEvent('stopLoading');
					if (e.length < pageSize) {
						Ti.API.log('No more entries');
						loadMore = false;
					}
				},
				"error" : apiErrorHandler,
				"urlparams" : urlParams
			});

			adding = true;

			setTimeout(function() {//disable adding for 3 seconds
				adding = false;
			}, 3000);
		}
	}
};

function resetPullHeader(table) {
	reloading = false;
	// actInd.hide();
	$.tableHeader.imageArrow.transform = Ti.UI.create2DMatrix();
	$.tableHeader.imageArrow.show();
	$.tableHeader.labelStatus.text = 'Pull down to refresh...';
	table.setContentInsets({
		top : 0
	}, {
		animated : true
	});
}

galleryDragEnd = function(e) {
	if (pulling && !reloading && offset < tablePullHeight && !loading) {
		pulling = false;
		reloading = true;
		loadMore = true;
		$.tableHeader.labelStatus.text = 'Updating...';
		$.tableHeader.imageArrow.hide();

		page = 1;
		//Refresh the table
		var pageSize = numOfItems * page++;
		urlParams.pagesize = pageSize;

		Ti.App.fireEvent('loading', {
			"top" : galleryCenter
		});
		loading = true;
		collection.fetch({
			"success" : function(e) {
				if ( typeof savedSuccessCallback != 'undefined' && savedSuccessCallback != null) {
					savedSuccessCallback(e);
				}

				//Ti.API.info("Success fetching gallery" + JSON.stringify(e));
				Ti.App.fireEvent('stopLoading');
				loading = false;
				if (e.length < pageSize) {
					Ti.API.log('No more entries');
					loadMore = false;
				}
			},
			"error" : apiErrorHandler,
			"urlparams" : urlParams
		});

		resetPullHeader(e.source);
	}
};

/**
 * Handles the API error calbacks
 */
function apiErrorHandler(responseJSON, responseText) {
	loading = false;
	loadMore = false;
	Ti.App.fireEvent('noResults');
	Ti.App.fireEvent('stopLoading');
	if (responseText) {
		try {
			var text = JSON.parse(responseText);

			if (text && typeof text[0] != "undefined") {
				Ti.App.fireEvent('triggerError', {
					"message" : text[0]
				});
			} else {
				Ti.App.fireEvent('triggerError', {
					"message" : responseText
				});
			}
		} catch (e) {
			Ti.App.fireEvent('triggerError', {
				"message" : responseText
			});
		}
	}
}

/**
 * Loads the gallery for the given collection and params
 * @param {Object} collection
 * @param {Object} params
 */
$.loadGallery = function(collectionToShow, params, center, successCallback) {
	if (!loadMore || loading) {
		return;		
	}
	
	Ti.API.log('Loading the gallery');
	var pageSize = numOfItems * page++;
	collection = collectionToShow;
	//or model
	savedSuccessCallback = successCallback;

	if ( typeof center != 'undefined') {
		galleryCenter = center;
	}

	if (params) {
		urlParams = params;
	}

	collection.config.headers['X-CSRF-TOKEN'] = Titanium.App.Properties.getString(Alloy.Globals.Properties.Token);
	collection.config.headers['Cookie'] = Titanium.App.Properties.getString(Alloy.Globals.Properties.Session);
	// ,"XDEBUG_SESSION=PHPSTORM"

	Ti.App.fireEvent('loading', {
		"top" : galleryCenter
	});

	loading = true;
	collection.fetch({
		"success" : function(e) {
			loading = false;
			Ti.API.info("Success fetching gallery " + JSON.stringify(e));
						
			if ( typeof savedSuccessCallback != 'undefined' && savedSuccessCallback != null) {
				Ti.API.info("Firing up callback method");
				savedSuccessCallback(e);
			}
			Ti.App.fireEvent('stopLoading');
			if (e.length < pageSize) {
				Ti.API.log('No more entries');
				loadMore = false;
			}
		},
		"error" : apiErrorHandler,
		"urlparams" : urlParams
	});
};

$.enableLoadMore = function() {
	loadMore = true;
};

playVideo = function(e) {
	if (!e.row.toggle) {
		var entryId = e.source.entryId;
		Ti.API.info("in playVideo: " + entryId);
	}
};

disableClick = function(e) {
	e.cancelBubble = true;
	e.bubbles = false;
	return false;
};

deleteVideo = function(e) {
	var nodeId = e.row.nodeId;
	var video = collection.get(nodeId);

	video.destroy({
		success : function(model, response) {
			var a = Titanium.UI.createAlertDialog({
				title : 'Video Deleted'
			});
			a.setMessage("Video " + model.get('title') + " was deleted successfully");
			a.show();
		}
	});

	return disableClick(e);
};

/**
 * Sets the video data for the video (tik) details page
 */
function setVideoData() {

	Alloy.Models.currentNode.categoryImage = '';
	//Set default image

	if ( typeof Alloy.Models.currentNode.og_group_ref != 'undefined' && typeof Alloy.Models.currentNode.og_group_ref[0] != 'undefined') {
		var categoryId = Alloy.Models.currentNode.og_group_ref[0].id;

		var categoryImage = categoriesByIds[categoryId];
		if ( typeof categoryImage != 'undefined') {
			Alloy.Models.currentNode.categoryImage = categoryImage;
			Alloy.Models.currentNode.set('categoryImage', categoryImage, {
				'silent' : true
			});
		}
	}

	var properties = nodeTransform(Alloy.Models.currentNode);
	Alloy.Models.currentNode.set(properties, {
		'silent' : true
	});
}

/**
 * Sets the reward data for the reward details page
 */
function setRewardData() {
	//Default color for rewards
	var reward_type = Alloy.Models.currentNode.get('reward_type');
	var title = Alloy.Models.currentNode.get('title');

	var rewardBackgroundColor = Alloy.Globals.TikklrRewardBlue;
	var thumb = "pounds-white.png";

	if (reward_type == 'Cash') {
		thumb = "pounds-white.png";
		rewardBackgroundColor = Alloy.Globals.TikklrRewardBlue;
	} else if (reward_type == 'Ticket') {
		thumb = "tikket-white.png";
		rewardBackgroundColor = Alloy.Globals.TikklrRewardGreen;
	} else if (reward_type == 'Discount') {
		thumb = "gift-white.png";
		rewardBackgroundColor = Alloy.Globals.TikklrRewardOrange;
	} else {
		thumb = "gift-white.png";
		rewardBackgroundColor = Alloy.Globals.TikklrRewardOrange;
	}

	var titleUpperCase = title.toUpperCase();

	var categories = Alloy.Models.currentNode.get('og_group_ref');

	var reward_link = Alloy.Models.currentNode.get('reward_link');
	var value = Alloy.Models.currentNode.get('value');

	var reward_description = Alloy.Models.currentNode.get('reward_description');
	var expiration_date = Alloy.Models.currentNode.get('expiration_date');
	var endDate = new Date(expiration_date * 1000);
	endDateString = weekday[endDate.getDay()] + " " + endDate.getDate() + "th " + " " + months[endDate.getMonth()] + " " + endDate.getFullYear();

	var qr_image = "";
	var qr_imageObject = Alloy.Models.currentNode.get('qr_image');
	if (qr_imageObject && qr_imageObject.file && qr_imageObject.file.fileUrl) {
		qr_image = qr_imageObject.file.fileUrl;
	}

	var terms_and_conditions = Alloy.Models.currentNode.get('terms_and_conditions');

	Alloy.Models.currentNode.set({
		'terms_and_conditions' : terms_and_conditions,
		'qr_image' : qr_image,
		'titleUpperCase' : titleUpperCase,
		'rewardBackgroundColor' : rewardBackgroundColor,
		'thumb' : thumb,
		'title' : title,
		'reward_link' : reward_link,
		'value' : value,
		'reward_type' : reward_type,
		'reward_description' : reward_description,
		'expiration_date' : expiration_date,
		'endDate' : endDateString,
		'reward_link' : reward_link
		// ,'categoryImage': categoriesByIds[categoryId]
	}, {
		'silent' : true
	});
}

/**
 * Sets the brief data for the brief details page
 */
function setBriefData() {
	
	var image = Alloy.Models.currentNode.get('image');
	var imageUri = '';
	if (image != undefined && image.file != undefined && image.file.fileUrl != undefined) {
		imageUri = image.file.fileUrl;		
	}
	
	var brandLogo = Alloy.Models.currentNode.get('brand_logo');
	var brandLogoUri = '';
	if (brandLogo  != undefined && brandLogo.file != undefined && brandLogo.file.fileUrl != undefined) {
		brandLogoUri = brandLogo.file.fileUrl;		
	}

	var selfieImage = 'selfie-dead.png';
	//Set selfie / camera / photo images
	if (Alloy.Models.currentNode.get('isSelfie')) {
		selfieImage = "selfie-gray.png";
	}

	var thumbAllowedImage = "photo-dead.png";
	//Set selfie / camera / photo images
	if (Alloy.Models.currentNode.get('isThumbAllowed')) {
		thumbAllowedImage = "photo-gray.png";
	}

	var isVideoImage = "video-dead.png";
	//Set selfie / camera / photo images
	if (Alloy.Models.currentNode.get('isVideo')) {
		isVideoImage = "video-gray.png";
	}

	var categoryName = Alloy.Models.currentNode.get('category');

	var date = Alloy.Models.currentNode.get('date').value2;
	var endDate = new Date(date * 1000);
	endDateString = weekday[endDate.getDay()] + " " + endDate.getDate() + "th " + " " + months[endDate.getMonth()] + " " + endDate.getFullYear();

	//TODO: get followers count
	//
	Alloy.Models.currentNode.set({
		'isSelfie' : Alloy.Models.currentNode.get('selfie_tikk') ? true : false//Sets the isSelfie value on the current node
		,
		'isVideo' : Alloy.Models.currentNode.get('video_tikk') ? true : false//Sets the isVideo value on the current node
		,
		'isThumbAllowed' : Alloy.Models.currentNode.get('tikk_options') ? true : false//Sets the isThumbAllowed value on the current node
		,
		'notIsSelfie' : Alloy.Models.currentNode.get('selfie_tikk') ? false : true//Sets the notIsSelfie value on the current node
		,
		'notIsVideo' : Alloy.Models.currentNode.get('video_tikk') ? false : true//Sets the notIsVideo value on the current node
		,
		'notIsThumbAllowed' : Alloy.Models.currentNode.get('tikk_options') ? false : true//Sets the notIsThumbAllowed value on the current node
		,
		'brandLogoUrl' : brandLogoUri//Sets the brandLogoUrl value on the current node
		,
		'voucherPercent' : Alloy.Models.currentNode.get('voucher_value')//Sets the voucherPercent value on the current node
		,
		'brandName' : Alloy.Models.currentNode.get('brand_name')//Sets the brandName value on the current node
		,
		'briefSummary' : Alloy.Models.currentNode.get('brief_summary')//Sets the briefSummary value on the current node
		,
		'briefFull' : Alloy.Models.currentNode.get('brief_full')//Sets the briefFull value on the current node
		,
		'followers' : 1500,
		'selfieImage' : selfieImage,
		'endDate' : endDateString,
		'categoryImage' : categories[categoryName],
		'isVideoImage' : isVideoImage,
		'thumbAllowedImage' : thumbAllowedImage
	}, {
		'silent' : true
	});
}

/**
 * Row has been clicked
 * @param {Object} e
 */
rowClicked = function(e) {
	Ti.API.info("e: " + JSON.stringify(e));

	if (e && e.row && collection != null) {//(typeof e.row.toggle == 'undefined' || e.row.toggle != 1) Code for only open when not in the toggle mode of the row
		var nodeId = e.row.nodeId;
		var model = collection.get(nodeId);
		var nodeType = e.row.nodeType;
		var pageToLoad = "tikDetails";
		var args = model.get('uploader');

		Alloy.Models.currentNode = model;

		if (nodeType == 'brief') {
			pageToLoad = 'briefDetails';
			args = '';
			setBriefData();
			Alloy.Models.Kaltura.setBrief(Alloy.Models.currentNode);
			if ( typeof Alloy.Collections.currentNodeList == 'undefined') {
				Alloy.Collections.currentNodeList = Alloy.createCollection("Node");
				//Create the new list for the brief page
			}
		} else if (nodeType == 'video') {
			setVideoData();
		} else if (nodeType == 'reward') {
			//Go to url and not open the reward page
			pageToLoad = 'rewardDetails';
			args = '';
			setRewardData();
			if ( typeof Alloy.Collections.currentNodeList == 'undefined') {
				Alloy.Collections.currentNodeList = Alloy.createCollection("Node");
				//Create the new list for the brief page
			}
		}
		Ti.App.fireEvent('attachWindow', {
			page : pageToLoad,
			arguments : args
		});
	}
};

/**
 * Redeems the current swiped reward
 */
redeemReward = function(e) {
	if (e.direction == "right" && e.type == "swipe") {//Only when swiping to the right
		var nodeId = e.row.nodeId;
		Ti.API.info("swiped: " + collection);
		Alloy.Globals.rewardToRedeem = collection.get(nodeId);
		Alloy.Globals.rewardToRedeem.nid = nodeId;
		Alloy.Globals.rewardToRedeem.set('nid', nodeId, {
			'silent' : true
		});

		var dialog = Ti.UI.createAlertDialog({
			cancel : 1,
			buttonNames : ['Yes', 'No'],
			message : 'Would you like to redeem this reward?',
			title : 'Redeem Reward'
		});

		dialog.addEventListener('click', function(e) {
			if (e.index === e.source.cancel) {

			} else {//Flag approve
				//Delete the reward
				Alloy.Globals.rewardToRedeem.destroy({
					success : function(model, response) {
						Ti.Platform.openURL(model.get('reward_link').url);
						Ti.App.fireEvent('attachWindow', {
							page : "briefList"
						});
					}
				});
			}

			dialog.hide();
		});

		dialog.show();
		e.source.add(dialog);
	}

	disableClick(e);
	return false;
};

/**
 * Shows the node description
 * @param {Object} e
 */
showDescription = function(e) {
	Ti.API.info("In showDescription: " + e.source);
	var infoView = e.row.children[0];
	var nodeView = e.row.children[1];

	if ( typeof nodeView != 'undefined') {
		var infoViewMinimumHeight = infoView.toImage().height;
		var nodeViewHeight = nodeView.toImage().height;

		if (infoViewMinimumHeight < nodeViewHeight - 40) {//Only grow infoView
			infoView.height = nodeViewHeight - 40;
			//Removes the 80px title size from the new height
		}

		if ((e.row.toggle == false || typeof e.row.toggle == 'undefined') && (e.direction == "left" || e.type == 'click')) {
			var slide_left = Ti.UI.createAnimation();
			slide_left.left = 0;
			slide_left.duration = 300;
			slide_left.backgroundColor = Alloy.Globals.TikklrBlack;
			infoView.animate(slide_left);
			e.row.toggle = true;
		} else if (e.row.toggle == true && (e.direction == "right" || e.type == 'click')) {
			var slide_right = Ti.UI.createAnimation();
			slide_right.left = Ti.Platform.displayCaps.platformWidth;
			slide_right.duration = 300;
			slide_right.backgroundColor = Alloy.Globals.TikklrBlack;
			infoView.animate(slide_right);
			e.row.toggle = false;
		}
	}

	disableClick(e);
	return false;
};

/**
 * Stars a video
 * @param {Object} e
 */
starVideo = function(e) {
	alert("TODO: video was stared");
	disableClick(e);
	return false;
};

/**
 * Shares a video
 * @param {Object} e
 */
shareVideo = function(e) {
	var shareRow = e.source.parent.parent.children[2];

	if ( typeof e.row != 'undefined') {//Get eleemtns from row instead of from parent
		var nodeView = e.row.children[1];
		shareRow = nodeView.children[2];
	}

	openShareBox(shareRow);

	disableClick(e);
	return false;
};

/**
 * Opens the share box
 * @param {Object} shareRow
 */
function openShareBox(shareRow) {
	if ( typeof shareRow != 'undefined') {
		var animation = Ti.UI.createAnimation({
			left : 0
		});

		shareRow.animate(animation);
		shareRow.toggle = true;
	}
};

/**
 * Handle close clicked
 * @param {Object} e
 */
handleCloseClicked = function(e) {
	var shareRow = e.source.parent.parent.children[2];

	if ( typeof e.row != 'undefined') {//Get eleemtns from row instead of from parent
		var nodeView = e.row.children[1];
		shareRow = nodeView.children[2];
	}

	closeShareBox(shareRow);

	disableClick(e);
	return false;
};

/**
 * Close share box
 * @param {Object} shareRow
 */
function closeShareBox(shareRow) {
	if ( typeof shareRow != 'undefined') {
		var animation = Ti.UI.createAnimation({
			left : Ti.Platform.displayCaps.platformWidth
		});

		shareRow.animate(animation);
		shareRow.toggle = false;
	}
}

/**
 * Make share active
 * @param {Object} source
 */
function makeShareActive(source) {
	if (source.backgroundImage == 'facebook.png') {
		source.backgroundImage = "facebook-fill.png";
	} else if (source.backgroundImage == 'twitter.png') {
		source.backgroundImage = "twitter-fill.png";
	} else if (source.backgroundImage == 'linkedIn.png') {
		source.backgroundImage = "linkedIn-fill.png";
	}
}

/**
 * Make share non active
 * @param {Object} source
 */
function makeShareNonActive(source) {
	if (source.backgroundImage == 'facebook-fill.png') {
		source.backgroundImage = "facebook.png";
	} else if (source.backgroundImage == 'twitter-fill.png') {
		source.backgroundImage = "twitter.png";
	} else if (source.backgroundImage == 'linkedIn-fill.png') {
		source.backgroundImage = "linkedIn.png";
	}
}

/**
 * Handles the click event on the followers list
 */
followersClicked = function(e) {
	//Get the last button (the following)
	var numOfChildren = e.source.parent.children.length;
	var followButton = e.source.parent.children[numOfChildren - 2];
	followButton.opacity = 0;
	followButton.visible = true;

	Animation.fadeOut(e.source, animationDuration);
	Animation.fadeIn(followButton, animationDuration);

	var flag = Alloy.createModel('Flag');
	var entity_id = e.source.uid;
	var content_id = e.source.uid;
	var action = 'unflag';
	var uid = Alloy.Models.User.get('uid');
	
	flag.flag(action, flag_name, entity_id, content_id, uid);
	return disableClick(e);
};

/**
 * Handles the follow user click event
 */
followClicked = function(e) {

	//Get the last button (the following)
	var numOfChildren = e.source.parent.children.length;
	var followingButton = e.source.parent.children[numOfChildren - 1];

	Animation.fadeOut(e.source, animationDuration);
	followingButton.opacity = 0;
	followingButton.visible = true;

	Animation.fadeIn(followingButton, animationDuration);

	var flag = Alloy.createModel('Flag');
	var entity_id = e.source.uid;
	var content_id = e.source.uid;
	var action = 'flag';
	var uid = Alloy.Models.User.get('uid');
	
	Ti.API.info("following: " + action + " " + entity_id + " " + content_id + " " + uid);
	flag.flag(action, flag_name, entity_id, content_id, uid);
	return disableClick(e);
};

flagFinished = function(e) {
	Alloy.Collections['Following'].fetch(Alloy.Globals.followingParams, {
		'silent' : true
	});
	var user = Alloy.Models.User;
	var currentFollowing = user.get('following');

	Ti.API.info("Flag finished with: " + JSON.stringify(e));
	if (e.flag_name == flag_name) {
		if ( typeof currentFollowing == 'undefined') {
			currentFollowing = user.following;
		}

		if (e.flag_type == 'flag') {//We follow a new person
			if (currentFollowing > 0) {
				user.set('following', currentFollowing + 1, {
					'silent' : true
				});
				user.following = currentFollowing + 1;
			} else {
				user.set('following', 1, {
					'silent' : true
				});
				user.following = 1;
			}
		} else {//We UNfollow a new person
			if (currentFollowing > 0) {
				user.set('following', currentFollowing - 1, {
					'silent' : true
				});
				user.following = currentFollowing - 1;

			} else {
				user.set('following', 0, {
					'silent' : true
				});
				user.following = 0;
			}
		}

		if ( typeof $.followingCount != 'undefined') {//Especially for the profile page
			$.followingCount.setText($.User.get('following'));
		}
	}
};

/**
 * Share clicked
 * @param {Object} e
 */
shareClicked = function(e) {
	if (e.source.toggle == false || typeof e.source.toggle == 'undefined') {//Change the icon to be full - toggle on
		makeShareActive(e.source);
		e.source.toggle = true;
	} else {//We toggle off
		makeShareNonActive(e.source);
		e.source.toggle = false;
	}

	disableClick(e);
	return false;
	alert("TODO: share the video");
};

exports.clean = function() {
	//Clean this controller in it's parent
	$.destroy();
	$.off();
};
