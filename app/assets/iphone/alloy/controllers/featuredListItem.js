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
        this.video = model;
        $.tableViewRow.nodeId = this.video.get("nid");
        $.nodeThumb.applyProperties({
            autoload: true,
            image: this.video.get("thumb")
        });
        var categoryImage = "";
        if ("undefined" != typeof this.video.get("og_group_ref") && "undefined" != typeof this.video.get("og_group_ref")[0]) {
            var categoryId = this.video.get("og_group_ref")[0].id;
            categoryImage = categoriesByIds[categoryId];
            if ("undefined" != typeof categoryImage) {
                this.video.set("categoryImage", categoryImage, {
                    silent: true
                });
                $.infoCategoryIcon.applyProperties({
                    autoload: true,
                    image: categoryImage
                });
            }
        }
        $.infoTag.setText(this.video.get("kaltura_tags"));
        $.followingNodeUser.setText(this.video.get("followers"));
        $.featuredNodeLabel.setText(this.video.get("titleUpperCase"));
        $.featuredNodeViews.setText(this.video.get("views"));
        $.followButton.uid = this.video.get("author").id;
        $.followingUserButton.uid = this.video.get("author").id;
        findNodeAuthor(this.video.get("author"));
    }
    function findNodeAuthor(author) {
        for (var i = 0, j = Alloy.Collections["Following"].length; j > i; i++) if (author.id == Alloy.Collections["Following"].models[i].get("uid")) {
            setNodeUser(Alloy.Collections["Following"].models[i]);
            return;
        }
        $.currentNodeUser.set("uid", author.id);
        $.currentNodeUser.fetch({
            success: function() {
                setNodeUser($.currentNodeUser);
            }
        });
    }
    function setNodeUser(user) {
        user.set(userTransform(user), {
            silent: true
        });
        $.featuredUserThumb.applyProperties({
            autoload: true,
            image: user.get("pictureUrl").replace("/styles/50x50/public", "")
        });
        $.followButton.setVisible(user.get("isNotFollowed"));
        $.followingUserButton.setVisible(user.get("isFollowed"));
        $.followingNodeLabel.setText(user.get("realname"));
    }
    require("alloy/controllers/tikkGallery").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "featuredListItem";
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
    $.currentNodeUser = Alloy.createModel("User");
    $.__views.tableViewRow = Ti.UI.createTableViewRow({
        height: Ti.UI.SIZE,
        selectionStyle: "NONE",
        id: "tableViewRow",
        nodeType: "video",
        backgroundImage: "finger-background.png"
    });
    $.__views.tableViewRow && $.addTopLevelView($.__views.tableViewRow);
    $.__views.__alloyId90 = Ti.UI.createView({
        top: "40",
        zIndex: 100,
        left: Ti.Platform.displayCaps.platformWidth,
        width: Ti.Platform.displayCaps.platformWidth,
        height: Ti.UI.SIZE,
        backgroundColor: Alloy.Globals.TikklrBlack,
        opacity: .9,
        layout: "vertical",
        id: "__alloyId90"
    });
    $.__views.tableViewRow.add($.__views.__alloyId90);
    $.__views.infoCategoryIcon = Alloy.createWidget("com.baboonmedia.remoteimage", "widget", {
        top: "0",
        left: "0",
        width: "40",
        height: "40",
        defaultImage: "true",
        id: "infoCategoryIcon",
        __parentSymbol: $.__views.__alloyId90
    });
    $.__views.infoCategoryIcon.setParent($.__views.__alloyId90);
    $.__views.__alloyId91 = Ti.UI.createLabel({
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
        id: "__alloyId91"
    });
    $.__views.__alloyId90.add($.__views.__alloyId91);
    $.__views.__alloyId92 = Ti.UI.createView({
        top: "0",
        left: "10",
        right: "10",
        height: "25",
        id: "__alloyId92"
    });
    $.__views.__alloyId90.add($.__views.__alloyId92);
    $.__views.infoTag = Ti.UI.createLabel({
        top: "0",
        left: "0",
        color: Alloy.Globals.TikklrGreen,
        font: {
            fontSize: "14pt",
            fontFamily: "Substance-ExtraBold"
        },
        id: "infoTag"
    });
    $.__views.__alloyId92.add($.__views.infoTag);
    $.__views.__alloyId93 = Ti.UI.createView({
        top: "0",
        height: Ti.UI.SIZE,
        layout: "horizontal",
        backgroundColor: "transparent",
        width: "100%",
        id: "__alloyId93"
    });
    $.__views.__alloyId90.add($.__views.__alloyId93);
    $.__views.__alloyId94 = Ti.UI.createView({
        top: 5,
        left: 5,
        right: 5,
        height: Ti.UI.SIZE,
        backgroundColor: "transparent",
        id: "__alloyId94"
    });
    $.__views.__alloyId93.add($.__views.__alloyId94);
    $.__views.featuredUserThumb = Alloy.createWidget("com.baboonmedia.remoteimage", "widget", {
        left: "2",
        top: "2",
        width: "60",
        height: "50",
        id: "featuredUserThumb",
        __parentSymbol: $.__views.__alloyId94
    });
    $.__views.featuredUserThumb.setParent($.__views.__alloyId94);
    $.__views.__alloyId95 = Ti.UI.createView({
        top: 0,
        height: Ti.UI.SIZE,
        left: 60,
        width: 170,
        layout: "vertical",
        id: "__alloyId95"
    });
    $.__views.__alloyId94.add($.__views.__alloyId95);
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
    $.__views.__alloyId95.add($.__views.followingNodeLabel);
    $.__views.followingNodeUser = Ti.UI.createLabel({
        left: 5,
        font: {
            fontSize: "10pt",
            fontFamily: "Substance-ExtraBold"
        },
        color: Alloy.Globals.TikklrGreen,
        id: "followingNodeUser"
    });
    $.__views.__alloyId95.add($.__views.followingNodeUser);
    $.__views.followButton = Ti.UI.createView({
        right: "5",
        top: "5",
        bottom: "5",
        width: "62",
        height: "42",
        backgroundImage: "follow.png",
        backgroundColor: "transparent",
        id: "followButton"
    });
    $.__views.__alloyId94.add($.__views.followButton);
    disableClick ? $.addListener($.__views.followButton, "singletap", disableClick) : __defers["$.__views.followButton!singletap!disableClick"] = true;
    followClicked ? $.addListener($.__views.followButton, "click", followClicked) : __defers["$.__views.followButton!click!followClicked"] = true;
    $.__views.followingUserButton = Ti.UI.createView({
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
    $.__views.__alloyId94.add($.__views.followingUserButton);
    disableClick ? $.addListener($.__views.followingUserButton, "singletap", disableClick) : __defers["$.__views.followingUserButton!singletap!disableClick"] = true;
    followersClicked ? $.addListener($.__views.followingUserButton, "click", followersClicked) : __defers["$.__views.followingUserButton!click!followersClicked"] = true;
    $.__views.__alloyId96 = Ti.UI.createView({
        top: 0,
        left: 0,
        width: Ti.Platform.displayCaps.platformWidth,
        layout: "absolute",
        height: Ti.UI.SIZE,
        zIndex: 50,
        backgroundColor: Alloy.Globals.TikklrBlack,
        id: "__alloyId96"
    });
    $.__views.tableViewRow.add($.__views.__alloyId96);
    $.__views.nodeThumb = Alloy.createWidget("com.baboonmedia.remoteimage", "widget", {
        left: 0,
        top: 0,
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "nodeThumb",
        __parentSymbol: $.__views.__alloyId96
    });
    $.__views.nodeThumb.setParent($.__views.__alloyId96);
    $.__views.__alloyId97 = Ti.UI.createView({
        top: 0,
        opacity: .7,
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        backgroundColor: Alloy.Globals.TikklrWhite,
        id: "__alloyId97"
    });
    $.__views.__alloyId96.add($.__views.__alloyId97);
    $.__views.featuredNodeLabel = Ti.UI.createLabel({
        color: Alloy.Globals.TikklrGreen,
        left: "10",
        top: "0",
        height: "25",
        right: "90",
        font: {
            fontSize: "15pt",
            fontFamily: "Substance-ExtraBold"
        },
        id: "featuredNodeLabel"
    });
    $.__views.__alloyId97.add($.__views.featuredNodeLabel);
    $.__views.featuredNodeViews = Ti.UI.createLabel({
        color: Alloy.Globals.TikklrBlack,
        left: "10",
        top: "25",
        right: "90",
        font: {
            fontSize: "10pt",
            fontFamily: "Substance-ExtraBold"
        },
        id: "featuredNodeViews"
    });
    $.__views.__alloyId97.add($.__views.featuredNodeViews);
    $.__views.__alloyId98 = Ti.UI.createView({
        backgroundImage: "molecule.png",
        width: "40",
        height: "40",
        right: "50",
        defaultImage: "true",
        visible: false,
        id: "__alloyId98"
    });
    $.__views.__alloyId97.add($.__views.__alloyId98);
    shareVideo ? $.addListener($.__views.__alloyId98, "click", shareVideo) : __defers["$.__views.__alloyId98!click!shareVideo"] = true;
    $.__views.__alloyId99 = Ti.UI.createView({
        backgroundImage: "star.png",
        width: "40",
        height: "40",
        right: "5",
        defaultImage: "true",
        visible: false,
        id: "__alloyId99"
    });
    $.__views.__alloyId97.add($.__views.__alloyId99);
    starVideo ? $.addListener($.__views.__alloyId99, "click", starVideo) : __defers["$.__views.__alloyId99!click!starVideo"] = true;
    $.__views.__alloyId100 = Ti.UI.createView({
        top: "0",
        left: Ti.Platform.displayCaps.platformWidth,
        width: Ti.Platform.displayCaps.platformWidth,
        backgroundColor: Alloy.Globals.TikklrBlack,
        height: "40",
        layout: "horizontal",
        id: "__alloyId100"
    });
    $.__views.__alloyId96.add($.__views.__alloyId100);
    $.__views.closeShare = Ti.UI.createView({
        top: 0,
        left: 0,
        width: "40",
        height: "40",
        backgroundImage: "cancel-white.png",
        backgroundColor: Alloy.Globals.TikklrRed,
        id: "closeShare"
    });
    $.__views.__alloyId100.add($.__views.closeShare);
    handleCloseClicked ? $.addListener($.__views.closeShare, "click", handleCloseClicked) : __defers["$.__views.closeShare!click!handleCloseClicked"] = true;
    $.__views.facebook = Ti.UI.createView({
        left: "30",
        width: "40",
        height: "40",
        backgroundImage: "facebook.png",
        id: "facebook"
    });
    $.__views.__alloyId100.add($.__views.facebook);
    shareClicked ? $.addListener($.__views.facebook, "click", shareClicked) : __defers["$.__views.facebook!click!shareClicked"] = true;
    $.__views.twitter = Ti.UI.createView({
        left: "30",
        width: "40",
        height: "40",
        backgroundImage: "twitter.png",
        id: "twitter"
    });
    $.__views.__alloyId100.add($.__views.twitter);
    shareClicked ? $.addListener($.__views.twitter, "click", shareClicked) : __defers["$.__views.twitter!click!shareClicked"] = true;
    $.__views.linkedIn = Ti.UI.createView({
        left: "30",
        width: "40",
        height: "40",
        backgroundImage: "linkedIn.png",
        id: "linkedIn"
    });
    $.__views.__alloyId100.add($.__views.linkedIn);
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
    $.__views.__alloyId100.add($.__views.approveShare);
    handleCloseClicked ? $.addListener($.__views.approveShare, "click", handleCloseClicked) : __defers["$.__views.approveShare!click!handleCloseClicked"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    exports.baseController = "tikkGallery";
    var categoriesByIds = {
        128: "category-arts.png",
        130: "category-motors.png",
        131: "category-makeup.png",
        132: "category-travel.png",
        133: "category-drinks.png",
        134: "category-music.png",
        135: "category-fashion-men.png",
        136: "category-fashion-women.png",
        137: "category-dining.png",
        138: "category-home.png",
        139: "category-baby.png",
        141: "category-sports.png",
        142: "category-toys.png",
        273: "category-motors.png",
        274: "category-technology.png",
        143: "category-travel.png"
    };
    setViewData(arguments[0].model);
    exports.clean = function() {
        this.video = null;
        $.destroy();
        $.off();
    };
    __defers["$.__views.followButton!singletap!disableClick"] && $.addListener($.__views.followButton, "singletap", disableClick);
    __defers["$.__views.followButton!click!followClicked"] && $.addListener($.__views.followButton, "click", followClicked);
    __defers["$.__views.followingUserButton!singletap!disableClick"] && $.addListener($.__views.followingUserButton, "singletap", disableClick);
    __defers["$.__views.followingUserButton!click!followersClicked"] && $.addListener($.__views.followingUserButton, "click", followersClicked);
    __defers["$.__views.__alloyId98!click!shareVideo"] && $.addListener($.__views.__alloyId98, "click", shareVideo);
    __defers["$.__views.__alloyId99!click!starVideo"] && $.addListener($.__views.__alloyId99, "click", starVideo);
    __defers["$.__views.closeShare!click!handleCloseClicked"] && $.addListener($.__views.closeShare, "click", handleCloseClicked);
    __defers["$.__views.facebook!click!shareClicked"] && $.addListener($.__views.facebook, "click", shareClicked);
    __defers["$.__views.twitter!click!shareClicked"] && $.addListener($.__views.twitter, "click", shareClicked);
    __defers["$.__views.linkedIn!click!shareClicked"] && $.addListener($.__views.linkedIn, "click", shareClicked);
    __defers["$.__views.approveShare!click!handleCloseClicked"] && $.addListener($.__views.approveShare, "click", handleCloseClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;