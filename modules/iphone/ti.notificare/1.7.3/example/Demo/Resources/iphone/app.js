function receivePush(e) {
    setTimeout(function() {
        notificare.openNotification(e.data);
    }, 0);
}

function deviceTokenSuccess(e) {
    setTimeout(function() {
        Ti.API.info(e.deviceToken);
        notificare.registerDevice(e.deviceToken);
    }, 0);
}

function deviceTokenError(e) {
    setTimeout(function() {
        alert("Failed to register for push notifications! " + e.error);
    }, 0);
}

var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

var notificare = require("ti.notificare");

Ti.API.info("module is => " + notificare);

Alloy.Globals.notificare = notificare;

var deviceToken = null;

notificare.addEventListener("ready", function() {
    if (parseInt(Ti.Platform.version.split(".")[0]) >= 8) {
        Ti.App.iOS.addEventListener("usernotificationsettings", function registerForPush() {
            Ti.App.iOS.removeEventListener("usernotificationsettings", registerForPush);
            Ti.Network.registerForPushNotifications({
                success: deviceTokenSuccess,
                error: deviceTokenError,
                callback: receivePush
            });
        });
        notificare.registerUserNotifications();
    } else Ti.Network.registerForPushNotifications({
        types: [ Ti.Network.NOTIFICATION_TYPE_BADGE, Ti.Network.NOTIFICATION_TYPE_ALERT, Ti.Network.NOTIFICATION_TYPE_SOUND ],
        success: deviceTokenSuccess,
        error: deviceTokenError,
        callback: receivePush
    });
});

notificare.addEventListener("registered", function(e) {
    notificare.startLocationUpdates(e);
});

notificare.addEventListener("action", function(e) {
    e.target && Ti.API.info(e.target);
});

notificare.addEventListener("tags", function(e) {
    e && e.tags && e.tags.length > 0 && e.tags.forEach(function(tag) {
        Ti.API.info("Device Tag: " + tag);
    });
});

Ti.App.iOS.addEventListener("remotenotificationaction", function(e) {
    notificare.handleAction({
        notification: e.data,
        identifier: e.identifier
    }, function(e) {
        Ti.API.info(e.success ? e.success.message : e.error.message);
    });
});

notificare.addEventListener("range", function(e) {
    e && e.beacons && e.beacons.length > 0 && e.beacons.forEach(function() {});
});

Alloy.createController("index");