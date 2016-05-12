var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

var notificare = require("ti.notificare");

Ti.API.info("module is => " + notificare);

Alloy.Globals.notificare = notificare;

notificare.addEventListener("ready", function() {
    Ti.API.info("Notificare ready");
    notificare.enableNotifications();
});

Ti.API.info("add listener for registration events");

notificare.addEventListener("registration", function(e) {
    Ti.API.info("device registered to push");
    notificare.userID = "TestAlloyUser";
    notificare.registerDevice(e.device);
    Ti.API.info(notificare.userID);
});

notificare.addEventListener("registered", function() {
    Ti.API.info("device registered to Notificare");
    notificare.enableLocationUpdates(function(e) {
        e.success && notificare.enableLocationUpdates();
    });
});

Ti.API.info("add listener for notification events");

notificare.addEventListener("notification", function(e) {
    Ti.API.info("notification opened: " + e.alert);
    notificare.openNotification(e.notification);
});

notificare.addEventListener("action", function(e) {
    e.target && Ti.API.info(e.target);
});

notificare.addEventListener("tags", function(e) {
    e && e.tags && e.tags.length > 0 && e.tags.forEach(function(tag) {
        Ti.API.info("Device Tag: " + tag);
    });
});

notificare.addEventListener("range", function(e) {
    e && e.beacons && e.beacons.length > 0 && e.beacons.forEach(function() {});
});

Alloy.createController("index");