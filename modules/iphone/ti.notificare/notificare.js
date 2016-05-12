var Notificare = require("ti.notificare");

Notificare.addEventListener('ready',function(e){
  if (Ti.Platform.name == "iPhone OS"){
	  if (parseInt(Ti.Platform.version.split(".")[0]) >= 8) {
		  // Wait for user settings to be registered before registering for push notifications
		  Ti.App.iOS.addEventListener('usernotificationsettings', function registerForPush() {
			  // Remove event listener once registered for push notifications
			  Ti.App.iOS.removeEventListener('usernotificationsettings', registerForPush);
			  Ti.Network.registerForPushNotifications({
				success: deviceTokenSuccess,
				error: deviceTokenError,
				callback: receivePush
			  });
			  Notificare.registerUserNotifications();
		  });
		  // Register notification types to use
		  Ti.App.iOS.registerUserNotificationSettings({
			  types: [
				Ti.App.iOS.USER_NOTIFICATION_TYPE_ALERT,
				Ti.App.iOS.USER_NOTIFICATION_TYPE_SOUND,
				Ti.App.iOS.USER_NOTIFICATION_TYPE_BADGE
			  ]
		  });
	  }
	  // For iOS 7 and earlier
	  else {
		  Ti.Network.registerForPushNotifications({
			  // Specifies which notifications to receive
			  types: [
				Ti.Network.NOTIFICATION_TYPE_BADGE,
				Ti.Network.NOTIFICATION_TYPE_ALERT,
				Ti.Network.NOTIFICATION_TYPE_SOUND
			  ],
			  success: deviceTokenSuccess,
			  error: deviceTokenError,
			  callback: receivePush
		  });
	  }
  }
});


function deviceTokenSuccess(e) {
	Notificare.registerDevice(e.deviceToken);
}

function deviceTokenSuccess(e) {
  Notificare.userID = 'UserID';
  Notificare.userName = 'Username';
  Notificare.registerDevice(e.deviceToken);
}
