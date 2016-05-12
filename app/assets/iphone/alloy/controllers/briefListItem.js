function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function setViewData(model) {
        this.item = model;
        this.item && this.item.get("brand_logo") && this.item.get("brand_logo").file && $.featuredUserThumb.applyProperties({
            autoload: true,
            image: this.item.get("brand_logo").file.fileUrl
        });
        $.tableViewRow.nodeId = this.item.id;
        $.nodeThumb.applyProperties({
            autoload: true,
            image: this.item.get("thumb")
        });
        $.followingNodeLabel.setText(this.item.get("titleUpperCase"));
        $.followingNodeUser.setText(this.item.get("followers"));
        $.featuerdNodeLabel.setText(this.item.get("titleUpperCase"));
    }
    require("alloy/controllers/pandaGallery").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "briefListItem";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.tableViewRow = Ti.UI.createTableViewRow({
        height: Ti.UI.SIZE,
        selectionStyle: "NONE",
        id: "tableViewRow",
        nodeType: "brief",
        backgroundImage: "finger-background.png"
    });
    $.__views.tableViewRow && $.addTopLevelView($.__views.tableViewRow);
    $.__views.__alloyId69 = Ti.UI.createView({
        top: "40",
        zIndex: 100,
        left: Ti.Platform.displayCaps.platformWidth,
        width: Ti.Platform.displayCaps.platformWidth,
        height: Ti.UI.SIZE,
        backgroundColor: Alloy.Globals.TikklrBlack,
        opacity: .9,
        layout: "vertical",
        id: "__alloyId69"
    });
    $.__views.tableViewRow.add($.__views.__alloyId69);
    $.__views.__alloyId70 = Ti.UI.createView({
        top: "0",
        left: "0",
        width: "40",
        height: "40",
        defaultImage: "star.png",
        id: "__alloyId70"
    });
    $.__views.__alloyId69.add($.__views.__alloyId70);
    $.__views.__alloyId71 = Ti.UI.createLabel({
        font: {
            fontSize: "12pt",
            fontFamily: "Substance-Medium"
        },
        color: Alloy.Globals.TikklrGreen,
        top: "0",
        left: "10",
        right: "10",
        height: "20",
        text: "Tags:",
        id: "__alloyId71"
    });
    $.__views.__alloyId69.add($.__views.__alloyId71);
    $.__views.__alloyId72 = Ti.UI.createView({
        top: "0",
        left: "10",
        right: "10",
        height: "25",
        id: "__alloyId72"
    });
    $.__views.__alloyId69.add($.__views.__alloyId72);
    $.__views.__alloyId73 = Ti.UI.createLabel({
        top: "0",
        left: "0",
        color: Alloy.Globals.TikklrGreen,
        font: {
            fontSize: "14pt",
            fontFamily: "Substance-ExtraBold"
        },
        text: "Information on the brief",
        id: "__alloyId73"
    });
    $.__views.__alloyId72.add($.__views.__alloyId73);
    $.__views.__alloyId74 = Ti.UI.createView({
        top: "0",
        height: Ti.UI.SIZE,
        layout: "horizontal",
        backgroundColor: "transparent",
        width: "100%",
        id: "__alloyId74"
    });
    $.__views.__alloyId69.add($.__views.__alloyId74);
    $.__views.__alloyId75 = Ti.UI.createView({
        top: 5,
        left: 5,
        right: 5,
        height: Ti.UI.SIZE,
        backgroundColor: "transparent",
        id: "__alloyId75"
    });
    $.__views.__alloyId74.add($.__views.__alloyId75);
    $.__views.featuredUserThumb = Alloy.createWidget("com.baboonmedia.remoteimage", "widget", {
        left: "2",
        top: "2",
        width: "60",
        height: "50",
        id: "featuredUserThumb",
        __parentSymbol: $.__views.__alloyId75
    });
    $.__views.featuredUserThumb.setParent($.__views.__alloyId75);
    $.__views.__alloyId76 = Ti.UI.createView({
        top: 0,
        height: Ti.UI.SIZE,
        left: 60,
        width: 170,
        layout: "vertical",
        id: "__alloyId76"
    });
    $.__views.__alloyId75.add($.__views.__alloyId76);
    $.__views.followingNodeLabel = Ti.UI.createLabel({
        left: 5,
        top: 0,
        font: {
            fontSize: "12pt",
            fontFamily: "Substance-ExtraBold"
        },
        color: Alloy.Globals.TikklrGreen,
        id: "followingNodeLabel"
    });
    $.__views.__alloyId76.add($.__views.followingNodeLabel);
    $.__views.followingNodeUser = Ti.UI.createLabel({
        left: 5,
        font: {
            fontSize: "10pt",
            fontFamily: "Substance-ExtraBold"
        },
        color: Alloy.Globals.TikklrGreen,
        id: "followingNodeUser"
    });
    $.__views.__alloyId76.add($.__views.followingNodeUser);
    $.__views.followButton = Ti.UI.createButton({
        right: "5",
        top: "5",
        bottom: "5",
        width: "62",
        height: "42",
        backgroundImage: "follow.png",
        backgroundColor: "transparent",
        id: "followButton"
    });
    $.__views.__alloyId75.add($.__views.followButton);
    disableClick ? $.addListener($.__views.followButton, "singletap", disableClick) : __defers["$.__views.followButton!singletap!disableClick"] = true;
    followClicked ? $.addListener($.__views.followButton, "click", followClicked) : __defers["$.__views.followButton!click!followClicked"] = true;
    $.__views.followingUserButton = Ti.UI.createButton({
        right: "5",
        top: "5",
        bottom: "5",
        width: "62",
        height: "42",
        backgroundImage: "following.png",
        backgroundColor: Alloy.Globals.TikklrGreen,
        visible: "false",
        id: "followingUserButton"
    });
    $.__views.__alloyId75.add($.__views.followingUserButton);
    disableClick ? $.addListener($.__views.followingUserButton, "singletap", disableClick) : __defers["$.__views.followingUserButton!singletap!disableClick"] = true;
    followersClicked ? $.addListener($.__views.followingUserButton, "click", followersClicked) : __defers["$.__views.followingUserButton!click!followersClicked"] = true;
    $.__views.__alloyId77 = Ti.UI.createView({
        top: 0,
        left: 0,
        width: Ti.Platform.displayCaps.platformWidth,
        layout: "absolute",
        height: Ti.UI.SIZE,
        zIndex: 50,
        backgroundColor: Alloy.Globals.TikklrBlack,
        id: "__alloyId77"
    });
    $.__views.tableViewRow.add($.__views.__alloyId77);
    $.__views.nodeThumb = Alloy.createWidget("com.baboonmedia.remoteimage", "widget", {
        left: 0,
        top: 0,
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "nodeThumb",
        __parentSymbol: $.__views.__alloyId77
    });
    $.__views.nodeThumb.setParent($.__views.__alloyId77);
    $.__views.__alloyId78 = Ti.UI.createView({
        top: 0,
        opacity: .7,
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        backgroundColor: Alloy.Globals.TikklrWhite,
        id: "__alloyId78"
    });
    $.__views.__alloyId77.add($.__views.__alloyId78);
    $.__views.featuerdNodeLabel = Ti.UI.createLabel({
        color: Alloy.Globals.TikklrGreen,
        left: "10",
        top: "0",
        height: "25",
        right: "90",
        font: {
            fontSize: "15pt",
            fontFamily: "Substance-ExtraBold"
        },
        id: "featuerdNodeLabel"
    });
    $.__views.__alloyId78.add($.__views.featuerdNodeLabel);
    $.__views.__alloyId79 = Ti.UI.createView({
        backgroundImage: "molecule.png",
        width: "40",
        height: "40",
        right: "50",
        visible: false,
        id: "__alloyId79"
    });
    $.__views.__alloyId78.add($.__views.__alloyId79);
    shareVideo ? $.addListener($.__views.__alloyId79, "click", shareVideo) : __defers["$.__views.__alloyId79!click!shareVideo"] = true;
    $.__views.__alloyId80 = Ti.UI.createView({
        backgroundImage: "star.png",
        width: "40",
        height: "40",
        right: "5",
        visible: false,
        id: "__alloyId80"
    });
    $.__views.__alloyId78.add($.__views.__alloyId80);
    starVideo ? $.addListener($.__views.__alloyId80, "click", starVideo) : __defers["$.__views.__alloyId80!click!starVideo"] = true;
    $.__views.__alloyId81 = Ti.UI.createView({
        top: "0",
        left: Ti.Platform.displayCaps.platformWidth,
        width: Ti.Platform.displayCaps.platformWidth,
        backgroundColor: Alloy.Globals.TikklrBlack,
        height: "40",
        layout: "horizontal",
        id: "__alloyId81"
    });
    $.__views.__alloyId77.add($.__views.__alloyId81);
    $.__views.closeShare = Ti.UI.createView({
        top: 0,
        left: 0,
        width: "40",
        height: "40",
        backgroundImage: "cancel-white.png",
        backgroundColor: Alloy.Globals.TikklrRed,
        id: "closeShare"
    });
    $.__views.__alloyId81.add($.__views.closeShare);
    handleCloseClicked ? $.addListener($.__views.closeShare, "click", handleCloseClicked) : __defers["$.__views.closeShare!click!handleCloseClicked"] = true;
    $.__views.facebook = Ti.UI.createView({
        left: "30",
        width: "40",
        height: "40",
        backgroundImage: "facebook.png",
        id: "facebook"
    });
    $.__views.__alloyId81.add($.__views.facebook);
    shareClicked ? $.addListener($.__views.facebook, "click", shareClicked) : __defers["$.__views.facebook!click!shareClicked"] = true;
    $.__views.twitter = Ti.UI.createView({
        left: "30",
        width: "40",
        height: "40",
        backgroundImage: "twitter.png",
        id: "twitter"
    });
    $.__views.__alloyId81.add($.__views.twitter);
    shareClicked ? $.addListener($.__views.twitter, "click", shareClicked) : __defers["$.__views.twitter!click!shareClicked"] = true;
    $.__views.linkedIn = Ti.UI.createView({
        left: "30",
        width: "40",
        height: "40",
        backgroundImage: "linkedIn.png",
        id: "linkedIn"
    });
    $.__views.__alloyId81.add($.__views.linkedIn);
    shareClicked ? $.addListener($.__views.linkedIn, "click", shareClicked) : __defers["$.__views.linkedIn!click!shareClicked"] = true;
    $.__views.approveShare = Ti.UI.createView({
        top: 0,
        left: "30",
        width: "40",
        height: "40",
        backgroundImage: "approve-red.png",
        backgroundColor: Alloy.Globals.TikklrWhite,
        id: "approveShare"
    });
    $.__views.__alloyId81.add($.__views.approveShare);
    handleCloseClicked ? $.addListener($.__views.approveShare, "click", handleCloseClicked) : __defers["$.__views.approveShare!click!handleCloseClicked"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    exports.baseController = "pandaGallery";
    setViewData(arguments[0].model);
    __defers["$.__views.followButton!singletap!disableClick"] && $.addListener($.__views.followButton, "singletap", disableClick);
    __defers["$.__views.followButton!click!followClicked"] && $.addListener($.__views.followButton, "click", followClicked);
    __defers["$.__views.followingUserButton!singletap!disableClick"] && $.addListener($.__views.followingUserButton, "singletap", disableClick);
    __defers["$.__views.followingUserButton!click!followersClicked"] && $.addListener($.__views.followingUserButton, "click", followersClicked);
    __defers["$.__views.__alloyId79!click!shareVideo"] && $.addListener($.__views.__alloyId79, "click", shareVideo);
    __defers["$.__views.__alloyId80!click!starVideo"] && $.addListener($.__views.__alloyId80, "click", starVideo);
    __defers["$.__views.closeShare!click!handleCloseClicked"] && $.addListener($.__views.closeShare, "click", handleCloseClicked);
    __defers["$.__views.facebook!click!shareClicked"] && $.addListener($.__views.facebook, "click", shareClicked);
    __defers["$.__views.twitter!click!shareClicked"] && $.addListener($.__views.twitter, "click", shareClicked);
    __defers["$.__views.linkedIn!click!shareClicked"] && $.addListener($.__views.linkedIn, "click", shareClicked);
    __defers["$.__views.approveShare!click!handleCloseClicked"] && $.addListener($.__views.approveShare, "click", handleCloseClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;