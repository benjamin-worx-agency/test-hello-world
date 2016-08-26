var activeView = null;

/**
 * Shows the login loading screen
 */
function showLoginLoading() {
		$.loginScroll.hide();
		$.forgotPassView.hide();
		$.registerView.hide();
		
		$.loginLoading.show();	
}

/**
 * Hides the login loading screen
 */
function hideLoginLoading() {
	$.loginLoading.hide();
	// $.loginScroll.show();
}

function hideLoginScroll() {
	$.loginScroll.hide();
}

function showLoginScroll() {
	$.loginScroll.show();
}

//Logout event
var logoutEventHandler = function() {
	// User has logged out we need to show the login screen
	showLoginLoading();
	
	Alloy.Models.User.logout();
};

Ti.App.addEventListener('logout', logoutEventHandler);

var showLoginLoadingEventHandler = function() {
	// User has logged out we need to show the login screen
	showLoginLoading();
};

Ti.App.addEventListener('showLoginLoading', showLoginLoadingEventHandler);

/**
 * Clears the tokens from the app internal memory
 */
function clearTokens() {
	Alloy.Globals.ks = null;
	Ti.App.Properties.setString(Alloy.Globals.Properties.Session, "");
	Ti.App.Properties.setString(Alloy.Globals.Properties.Token, "");
	Alloy.Models.User.config.headers['X-CSRF-TOKEN'] = null;
	Alloy.Models.User.config.headers['Cookie'] = null;	
}

//logout Success Event
var logoutSuccessEventHandler = function() {
	// Logout was successfull we remove old session and other user data
	clearTokens();
	
	hideLoginLoading();
	showLoginScroll();
};

Ti.App.addEventListener('logoutSuccess', logoutSuccessEventHandler);

//Register Success event
var registerSuccessEventHandler = function(email) {
	//User has logged in we need to get a token
	hideLoginLoading();
	showLoginScroll();
	$.loginScroll.scrollToView(0);
	$.registerView.hide();
	alert("Please check your email for further instructions");
};

Ti.App.addEventListener('registerSuccess', registerSuccessEventHandler);

//Register Failed Event
var registerFailedEventHandler = function() {
	hideLoginLoading();
	showLoginScroll();
	$.loginScroll.scrollToView(0);
	$.registerView.hide();
	alert("Couldn't register new user");
};

Ti.App.addEventListener('registerFailed', registerFailedEventHandler);

//Login Success Event
var loginSuccessEventHandler = function(e) {
	//User has logged in!
	drupalGetToken();
};

Ti.App.addEventListener('loginSuccess', loginSuccessEventHandler);

//Login Failed Event
var loginFailedEventHandler = function() {
	clearTokens();
	hideLoginLoading();
	showLoginScroll();
	alert('Oops, there was a problem logging you in. Please check your credentials and try again');
};

Ti.App.addEventListener('loginFailed', loginFailedEventHandler);

/**
 * Sets the collections configuration after getting the tokens / sessions
 */
function setCollectionModelConfigs() {
	for (var i in Alloy.Collections) {
		if(Alloy.Collections[i] != null && typeof Alloy.Collections[i] == 'object' && typeof Alloy.Collections[i].config != 'undefined' && typeof Alloy.Collections[i].config.headers != 'undefined') {
			Alloy.Collections[i].config.headers['X-CSRF-TOKEN'] = Titanium.App.Properties.getString(Alloy.Globals.Properties.Token);
			Alloy.Collections[i].config.headers['Cookie'] = Titanium.App.Properties.getString(Alloy.Globals.Properties.Session);	
		}
	}
	
	for (var i in Alloy.Models) {
		if(Alloy.Models[i] != null && typeof Alloy.Models[i] == 'object' && typeof Alloy.Models[i].config != 'undefined' && typeof Alloy.Models[i].config.headers != 'undefined') {
			Alloy.Models[i].config.headers['X-CSRF-TOKEN'] = Titanium.App.Properties.getString(Alloy.Globals.Properties.Token);
			Alloy.Models[i].config.headers['Cookie'] = Titanium.App.Properties.getString(Alloy.Globals.Properties.Session);
		}
	}
	
	for (var i in Alloy.Globals) {
		if(Alloy.Globals[i] != null && typeof Alloy.Globals[i] == 'object' && typeof Alloy.Globals[i].config != 'undefined' && typeof Alloy.Globals[i].config.headers != 'undefined') {
			Alloy.Globals[i].config.headers['X-CSRF-TOKEN'] = Titanium.App.Properties.getString(Alloy.Globals.Properties.Token);
			Alloy.Globals[i].config.headers['Cookie'] = Titanium.App.Properties.getString(Alloy.Globals.Properties.Session);
		}
	}
}
 
//Connect Success Event
var connectSuccessEventHandler = function(e) {
	//Update all other models and collections with the new token and session
	setCollectionModelConfigs(); 
		
	//User has logged in and has a token, we get the user before opening the app
	Alloy.Models.User.set('uid', e.userId);
	Alloy.Models.User.uid = e.userId;

	Alloy.Models.User.fetch({"success": function(model, response) {
		if(!Alloy.Models.User.get('mail') && !Alloy.Models.User.get('name')) {
			alert('email is not set please set your email on Tikklr site');
			Ti.App.fireEvent('logout');
			return false;
		} else {
			kalturaSessionStart(Alloy.Models.User.get('name')); //Get a KS
			connectToUrban();	
			// hideLoginLoading();
			
			var args = {
				headerTitle: "BRIEFS",
				showBack: false
			};
	
			//Get user following users to compare across the app
			Alloy.Globals.followingParams = {"urlparams": {"args": Alloy.Models.User.get('uid'), 'display_id':'services_1', 'pagesize': 100}};
			Alloy.Collections['Following'] = Alloy.Collections.instance('DrupalView');
			Alloy.Collections['Following'].viewName = 'commons_follow_user_following';
			Alloy.Collections['Following'].fetch(Alloy.Globals.followingParams);
			
			Ti.App.fireEvent('attachWindow', {page: "briefList", arguments: args});
		}
	},
	"error": function(e) {
		Ti.App.fireEvent('logout');
		hideLoginLoading();
		showLoginScroll();
	}});
};

Ti.App.addEventListener('connectSuccess', connectSuccessEventHandler);

//Forgot Success Event
var forgotSuccessEventHandler = function() {
	//User has forgot his password API callback
	hideLoginLoading();
	showLoginScroll();
	alert("Please check your email for further instructions");
	$.loginScroll.scrollToView(0);
};

Ti.App.addEventListener('forgotSuccess', forgotSuccessEventHandler);

//Connect Failed Event
var connectFailedEventHandler = function() {
	clearTokens();
	hideLoginLoading();
	showLoginScroll();
};

Ti.App.addEventListener('connectFailed', connectFailedEventHandler);

//Token Success Event
var tokenSuccessEventHandler = function() {
	isLoggedIn();
};

Ti.App.addEventListener('tokenSuccess', tokenSuccessEventHandler);
//Token Failed Event
var tokenFailedEventHandler = function() {
	clearTokens();
	hideLoginLoading();
	showLoginScroll();
};

Ti.App.addEventListener('tokenFailed',tokenFailedEventHandler );

function drupalGetToken() {
	Ti.API.info('In getToken ');
	Alloy.Models.User.getToken();
}

/**
 * Logins to drupal and starts the login proccess
 */
var drupalLogin = function() {
	Ti.API.info('In drupal Login');
	$.username.blur();
	$.password.blur();
	
	if($.username.value != '' &&  $.password.value != '') {
		showLoginLoading();
		Alloy.Models.User.login($.username.value, $.password.value);	
	}
};

function showRegisterView() {
	//Open register window
	$.username.blur();
	$.password.blur();
	
	demoPagesViews = $.loginScroll.getViews(); 
	$.loginScroll.setViews([$.loginView, $.registerView]);
	$.registerView.show();
	$.loginScroll.scrollToView(1);
}

function isLoggedIn() {
	showLoginLoading();
	//Open register window	
	Alloy.Models.User.isLoggedIn();
}

/*** 
 * Start a new Kaltura session for Tikklr partner
 ***/
function kalturaSessionStart(userId) {
	if(Ti.Network.getOnline())
	{
		var url = Alloy.Models.KalturaAPIUrl + "?service=session&action=start";
		
		var client = Ti.Network.createHTTPClient({
			// function called when the response data is available
			onload: function(e) {
			var xml = this.responseText;
				if(xml) {
					var xmldata= Ti.XML.parseString(xml);
					Alloy.Globals.ks = xmldata.getElementsByTagName('result').item(0).text;
					Ti.API.info(xmldata.getElementsByTagName('result').item(0).text);
				}
			},
			onerror: function(e) {
				// function called in readyState DONE (4)
				Ti.App.fireEvent('triggerError',{message: 'Kaltura Login Error'});
				hideLoginLoading();
				showLoginScroll();
			},
			timeout:5000
		});
		
		// Prepare the connection
		client.open("POST", url);
		client.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
				
		var data =	{
			"secret" : Alloy.Globals.adminSecret,
			"userId": userId,
			"type" : "2",
			"partnerId" : Alloy.Globals.partnerId
		};
	
		// Send the request.
		client.send(data);
	} else {
		alert("Please go online to use Tikklr");
	}
};

var demoPagesViews = [$.loginView, $.demoYou, $.demoShot, $.demoBrandsPay ];

/**
 * Called onScroll - Handles scroll view scroll functionality
 */
function scrollEnd(e) {
	if(e.currentPage == 0) {
		$.loginScroll.setViews(demoPagesViews);
		$.forgotPassView.hide();
		$.registerView.hide();
	}else if(e.view.last == true) {
		$.loginScroll.scrollToView(0);
		$.demoBrandsPay.last = false;
	} else if (e.currentPage == 3 && e.view.last != true) {
		e.view.last = true;
	}  else {
		$.demoBrandsPay.last = false;
	}
}

$.loginView.show();
$.loginLoading.hide();
$.forgotPassView.hide();
$.registerView.hide();
showLoginLoading();

/**
 * Handles click event on the forgot password link
 */
function forgotPassword() {
	$.username.blur();
	$.password.blur();
	
	demoPagesViews = $.loginScroll.getViews();
	$.loginScroll.setViews([$.loginView, $.forgotPassView]);
	$.forgotPassView.show();
	$.loginScroll.scrollToView(1);
}

/**
 * Shows the given view and hides the active view
 */
function showView(view) {
	view.show();
	
	if(activeView != null){
		activeView.hide();
	}
	
	activeView = view;
}

/**
 * Connects the device into Urban Airship
 */
var connectToUrban = function() {
	
	if(!Alloy.Models.User.get('mail')) {//If we don't have user mail we logout and start again
		return false;
	}
	else {
		// Set UA options
		// Alloy.Globals.UrbanAirship.tags = [ Alloy.Models.User.get('mail'), 'tikklr', 'my-tags' ];
		// Alloy.Globals.UrbanAirship.alias = Alloy.Models.User.get('mail');
		// Alloy.Globals.UrbanAirship.autoBadge = true;
		// Alloy.Globals.UrbanAirship.autoResetBadge = true;
// 		
		/**
		 * Registers the device for push notifications
		 */
		// Ti.Network.registerForPushNotifications({
		    // types:[
		        // Ti.Network.NOTIFICATION_TYPE_BADGE,
		        // Ti.Network.NOTIFICATION_TYPE_ALERT,
		        // Ti.Network.NOTIFICATION_TYPE_SOUND
		    // ],
		    // success: eventSuccess,
		    // error: eventError,
		    // callback: eventCallback
		// });	
	}
};

/**
 * The notification event callback
 * @param {Object} e
 */
function eventCallback(e) {
	// Pass the notification to the module
    Alloy.Globals.UrbanAirship.handleNotification(e.data);
            
     Ti.API.info('Push message received');
     Ti.API.info('Message: ' + e.data.alert);
     Ti.API.info('Payload: ' + e.data.aps);
}

/**
 * The notification event success
 * @param {Object} e
 */
function eventSuccess(e) {
    // *MUST* pass the received token to the module
    // Alloy.Globals.UrbanAirship.registerDevice(e.deviceToken); 
    // alert(e.deviceToken);
    
    // Ti.API.info('Received device token: ' + e.deviceToken);
    // Alloy.Globals.UrbanAirshipToken = e.deviceToken;
}

/**
 * The notification event error
 * @param {Object} e
 */
function eventError(e) {
    Ti.API.info('Error:' + e.error);
    var alert = Ti.UI.createAlertDialog({
        title: 'Error',
        message: e.error
    });
    alert.show();
}

/**
 * Clean function for controller, releases app events.
 */
exports.clean = function() {
	Ti.API.info('cleaning login controller');
	Ti.App.removeEventListener('logoutSuccess', logoutSuccessEventHandler);
	Ti.App.removeEventListener('connectSuccess', connectSuccessEventHandler);
	Ti.App.removeEventListener('connectFailed', connectFailedEventHandler);
	Ti.App.removeEventListener('registerSuccess', registerSuccessEventHandler);
	Ti.App.removeEventListener('registerFailed', registerFailedEventHandler);
	Ti.App.removeEventListener('tokenSuccess', tokenSuccessEventHandler);
	Ti.App.removeEventListener('tokenFailed', tokenFailedEventHandler);
	Ti.App.removeEventListener('loginSuccess', loginSuccessEventHandler);
	Ti.App.removeEventListener('loginFailed', loginFailedEventHandler);
	Ti.App.removeEventListener('forgotSuccess', forgotSuccessEventHandler);
	Ti.App.removeEventListener('showLoginLoading', showLoginLoadingEventHandler);
	// Ti.App.removeEventListener('logout', logoutEventHandler);
	Ti.App.removeEventListener('logoutSuccess', logoutSuccessEventHandler);
	Ti.App.removeEventListener('logoutFailed', logoutSuccessEventHandler);
		
	$.loginWindow = null;
	$.destroy();
	$.off();
};

$.loginButton.addEventListener('click', drupalLogin);

//Attributed hint text for version 3.2
var text = "USERNAME";
 
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

text = "PASSWORD";
 
 var passwordAttributedText = Titanium.UI.iOS.createAttributedString({
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

$.username.attributedHintText = attributedText;
$.password.attributedHintText = passwordAttributedText;
