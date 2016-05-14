function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function setViewData() {
        $.featuredTitleLabel.setText($.currentNode.get("title_field"));
        $.featuredTitleViews.setText($.currentNode.get("views"));
        $.tagsText.setText($.currentNode.get("kaltura_tags"));
        $.userThumb.applyProperties({
            autoload: true,
            image: $.currentNode.get("thumb")
        });
        $.image.visible = true;
        if ($.currentNodeUser.get("uid") == Alloy.Models.User.get("uid")) {
            $.followButton.visible = false;
            $.followingUserButton.visible = false;
        }
    }
    function setUserViewData() {
        $.pictureUrl.applyProperties({
            autoload: true,
            image: $.currentNodeUser.get("pictureUrl")
        });
        $.userNameLabel.setText($.currentNodeUser.get("realname"));
        $.userMailLabel.setText($.currentNodeUser.get("mail"));
        if ($.currentNodeUser.get("uid") == Alloy.Models.User.get("uid")) {
            $.followButton.visible = false;
            $.followingUserButton.visible = false;
        } else {
            $.followButton.uid = $.currentNodeUser.get("uid");
            $.followButton.visible = $.currentNodeUser.get("isNotFollowed");
            $.followingUserButton.uid = $.currentNodeUser.get("uid");
            $.followingUserButton.visible = $.currentNodeUser.get("isFollowed");
        }
    }
    function videosListLoaded() {
        if ("undefined" != typeof $.hisVideosTable.data && "undefined" != typeof $.hisVideosTable.data[0] && "undefined" != typeof $.hisVideosTable.data[0].rows) {
            var numOfRows = $.hisVideosTable.data[0].rows.length;
            if (numOfRows > $.HisVideos.length) {
                $.hisVideosTable.setData([]);
                currentVideos = [];
            }
        }
        for (var i = 0; i < $.HisVideos.length; i++) if ("-1" == currentVideos.indexOf($.HisVideos.models[i].id)) {
            $.HisVideos.models[i].set(profileNodeTransform($.HisVideos.models[i]), {
                silent: true
            });
            var args = {
                model: $.HisVideos.models[i]
            };
            $.hisVideosTable.appendRow(Alloy.createController("videosListItem", args).getView());
            currentVideos.push($.HisVideos.models[i].id);
        }
    }
    function contentIsFlaggedCallback(isFlagged) {
        if (isFlagged && isFlagged.isFollowing && isFlagged.isFollowing.length > 0) {
            var isFlaggedVal = isFlagged.isFollowing[0];
            true == isFlaggedVal ? flagVideo() : unFlagVideo();
        } else unFlagVideo();
    }
    function onPlayerFullscreen() {}
    function openShareBox() {
        var animation = Ti.UI.createAnimation({
            left: 0
        });
        $.shareRow.animate(animation);
        $.shareRow.toggle = true;
    }
    function closeShareBox() {
        var animation = Ti.UI.createAnimation({
            left: Ti.Platform.displayCaps.platformWidth
        });
        $.shareRow.animate(animation);
        $.shareRow.toggle = false;
    }
    function makeShareActive(source) {
        "facebook" == source.id ? source.backgroundImage = "facebook-fill.png" : "twitter" == source.id ? source.backgroundImage = "twitter-fill.png" : "linkedIn" == source.id && (source.backgroundImage = "linkedIn-fill.png");
    }
    function makeShareNonActive(source) {
        "facebook" == source.id ? source.backgroundImage = "facebook.png" : "twitter" == source.id ? source.backgroundImage = "twitter.png" : "linkedIn" == source.id && (source.backgroundImage = "linkedIn.png");
    }
    function shareClicked(e) {
        if (false == e.source.toggle || "undefined" == typeof e.source.toggle) {
            makeShareActive(e.source);
            e.source.toggle = true;
        } else {
            makeShareNonActive(e.source);
            e.source.toggle = false;
        }
        alert("TODO: share the video");
    }
    function shareThisVideo() {
        openShareBox();
    }
    function starThisVideo() {
        alert("TODO: video was stared");
    }
    function flagVideo() {
        $.featuredFlag.backgroundImage = "tikklrFlagRed.png";
        $.featuredFlag.toggle = true;
        $.featuredFlag.removeEventListener("click", flagThisVideo);
    }
    function unFlagVideo() {
        $.featuredFlag.backgroundImage = "tikklrFlagGreen.png";
        $.featuredFlag.toggle = false;
    }
    function flagThisVideo() {
        var dialog = Ti.UI.createAlertDialog({
            cancel: 1,
            buttonNames: [ "Yes", "No" ],
            message: "Would you like to flag this content?",
            title: "Flag"
        });
        dialog.addEventListener("click", function(e) {
            if (e.index === e.source.cancel) ; else {
                var flag = Alloy.createModel("Flag");
                var flag_name = Alloy.Globals.FlagFlag;
                var entity_id = Alloy.Models.currentNode.id;
                var content_id = Alloy.Models.currentNode.id;
                var action = "flag";
                var uid = Alloy.Models.User.get("uid");
                if (false == $.featuredFlag.toggle || "undefined" == typeof $.featuredFlag.toggle) {
                    flagVideo();
                    action = "flag";
                    $.featuredFlag.toggle = true;
                } else {
                    unFlagVideo();
                    action = "unflag";
                }
                flag.flag(action, flag_name, entity_id, content_id, uid);
                Ti.API.info("Flagging: " + action + " " + flag_name + " " + entity_id + " " + content_id + " " + uid);
                Ti.App.fireEvent("triggerSuccess", {
                    message: "Report accepted"
                });
            }
            dialog.hide();
        });
        dialog.show();
        $.tikDetailsView.add(dialog);
    }
    require("alloy/controllers/tikkGallery").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "tikDetails";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        var __parentSymbol = __processArg(arguments[0], "__parentSymbol");
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
    $.currentNode = Alloy.createModel("Node");
    $.__views.tikDetailsView = Ti.UI.createView({
        layout: "vertical",
        id: "tikDetailsView"
    });
    $.__views.tikDetailsView && $.addTopLevelView($.__views.tikDetailsView);
    $.__views.__alloyId313 = Ti.UI.createView({
        top: 0,
        width: Ti.Platform.displayCaps.platformWidth,
        backgroundColor: "transparent",
        height: "40",
        id: "__alloyId313"
    });
    $.__views.tikDetailsView.add($.__views.__alloyId313);
    $.__views.__alloyId314 = Ti.UI.createButton({
        left: "20",
        width: "40",
        height: "40",
        backgroundColor: "transparent",
        backgroundImage: "back.png",
        selectedBackgroundImage: "back-pressed.png",
        id: "__alloyId314"
    });
    $.__views.__alloyId313.add($.__views.__alloyId314);
    backClicked ? $.addListener($.__views.__alloyId314, "click", backClicked) : __defers["$.__views.__alloyId314!click!backClicked"] = true;
    $.__views.__alloyId315 = Ti.UI.createLabel({
        backgroundColor: "transparent",
        color: Alloy.Globals.TikklrGreen,
        font: {
            fontSize: "20pt",
            fontFamily: "Substance-ExtraBold"
        },
        height: 35,
        zIndex: 1e3,
        text: "WATCH",
        id: "__alloyId315"
    });
    $.__views.__alloyId313.add($.__views.__alloyId315);
    $.__views.__alloyId316 = Ti.UI.createView({
        height: "180",
        layout: "absolute",
        id: "__alloyId316"
    });
    $.__views.tikDetailsView.add($.__views.__alloyId316);
    $.__views.image = Ti.UI.createView({
        id: "image"
    });
    $.__views.__alloyId316.add($.__views.image);
    $.__views.userThumb = Alloy.createWidget("com.baboonmedia.remoteimage", "widget", {
        left: 0,
        top: 0,
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "userThumb",
        __parentSymbol: $.__views.image
    });
    $.__views.userThumb.setParent($.__views.image);
    $.__views.player = Ti.Media.createVideoPlayer({
        top: 0,
        width: Ti.UI.FILL,
        height: "180",
        zIndex: 100,
        id: "player"
    });
    $.__views.__alloyId316.add($.__views.player);
    onPlayerFullscreen ? $.addListener($.__views.player, "fullscreen", onPlayerFullscreen) : __defers["$.__views.player!fullscreen!onPlayerFullscreen"] = true;
    $.__views.__alloyId317 = Ti.UI.createView({
        top: 0,
        width: Ti.UI.FILL,
        backgroundColor: Alloy.Globals.TikklrWhite,
        height: Ti.UI.SIZE,
        id: "__alloyId317"
    });
    $.__views.tikDetailsView.add($.__views.__alloyId317);
    $.__views.featuredTitleLabel = Ti.UI.createLabel({
        color: Alloy.Globals.TikklrGreen,
        left: "10",
        top: "0",
        height: "40",
        right: "90",
        font: {
            fontSize: "18pt",
            fontFamily: "Substance-ExtraBold"
        },
        id: "featuredTitleLabel"
    });
    $.__views.__alloyId317.add($.__views.featuredTitleLabel);
    $.__views.featuredTitleViews = Ti.UI.createLabel({
        color: Alloy.Globals.TikklrBlack,
        left: "10",
        top: "40",
        font: {
            fontSize: "10pt",
            fontFamily: "Substance-Medium"
        },
        id: "featuredTitleViews"
    });
    $.__views.__alloyId317.add($.__views.featuredTitleViews);
    $.__views.__alloyId318 = Ti.UI.createView({
        backgroundImage: "molecule.png",
        width: "35",
        height: "35",
        right: "50",
        visible: false,
        id: "__alloyId318"
    });
    $.__views.__alloyId317.add($.__views.__alloyId318);
    shareThisVideo ? $.addListener($.__views.__alloyId318, "click", shareThisVideo) : __defers["$.__views.__alloyId318!click!shareThisVideo"] = true;
    $.__views.__alloyId319 = Ti.UI.createView({
        backgroundImage: "star.png",
        width: "35",
        height: "35",
        right: "5",
        visible: false,
        id: "__alloyId319"
    });
    $.__views.__alloyId317.add($.__views.__alloyId319);
    starThisVideo ? $.addListener($.__views.__alloyId319, "click", starThisVideo) : __defers["$.__views.__alloyId319!click!starThisVideo"] = true;
    $.__views.featuredFlag = Ti.UI.createView({
        backgroundImage: "tikklrFlagGreen.png",
        width: "35",
        height: "35",
        right: "5",
        id: "featuredFlag",
        visible: true
    });
    $.__views.__alloyId317.add($.__views.featuredFlag);
    flagThisVideo ? $.addListener($.__views.featuredFlag, "click", flagThisVideo) : __defers["$.__views.featuredFlag!click!flagThisVideo"] = true;
    $.__views.shareRow = Ti.UI.createView({
        top: "-40",
        left: Ti.Platform.displayCaps.platformWidth,
        width: Ti.Platform.displayCaps.platformWidth,
        backgroundColor: Alloy.Globals.TikklrBlack,
        height: "40",
        layout: "horizontal",
        id: "shareRow"
    });
    $.__views.tikDetailsView.add($.__views.shareRow);
    $.__views.closeShare = Ti.UI.createView({
        top: 0,
        left: 0,
        width: "40",
        height: "40",
        backgroundImage: "cancel-white.png",
        backgroundColor: Alloy.Globals.TikklrRed,
        id: "closeShare"
    });
    $.__views.shareRow.add($.__views.closeShare);
    closeShareBox ? $.addListener($.__views.closeShare, "click", closeShareBox) : __defers["$.__views.closeShare!click!closeShareBox"] = true;
    $.__views.facebook = Ti.UI.createView({
        left: "30",
        width: "40",
        height: "40",
        backgroundImage: "facebook.png",
        id: "facebook"
    });
    $.__views.shareRow.add($.__views.facebook);
    shareClicked ? $.addListener($.__views.facebook, "click", shareClicked) : __defers["$.__views.facebook!click!shareClicked"] = true;
    $.__views.twitter = Ti.UI.createView({
        left: "30",
        width: "40",
        height: "40",
        backgroundImage: "twitter.png",
        id: "twitter"
    });
    $.__views.shareRow.add($.__views.twitter);
    shareClicked ? $.addListener($.__views.twitter, "click", shareClicked) : __defers["$.__views.twitter!click!shareClicked"] = true;
    $.__views.linkedIn = Ti.UI.createView({
        left: "30",
        width: "40",
        height: "40",
        backgroundImage: "linkedIn.png",
        id: "linkedIn"
    });
    $.__views.shareRow.add($.__views.linkedIn);
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
    $.__views.shareRow.add($.__views.approveShare);
    closeShareBox ? $.addListener($.__views.approveShare, "click", closeShareBox) : __defers["$.__views.approveShare!click!closeShareBox"] = true;
    $.__views.__alloyId320 = Ti.UI.createView({
        top: 0,
        width: Ti.UI.FILL,
        backgroundColor: Alloy.Globals.TikklrWhite,
        height: Ti.UI.SIZE,
        layout: "vertical",
        id: "__alloyId320"
    });
    $.__views.tikDetailsView.add($.__views.__alloyId320);
    $.__views.__alloyId321 = Ti.UI.createLabel({
        color: Alloy.Globals.TikklrBlack,
        left: "10",
        top: "5",
        right: "90",
        font: {
            fontSize: "12pt",
            fontFamily: "Substance-Medium"
        },
        text: "Tags:",
        id: "__alloyId321"
    });
    $.__views.__alloyId320.add($.__views.__alloyId321);
    $.__views.tagsText = Ti.UI.createLabel({
        color: Alloy.Globals.TikklrGreen,
        left: "10",
        top: "0",
        right: "90",
        font: {
            fontSize: "14pt",
            fontFamily: "Substance-ExtraBold"
        },
        id: "tagsText"
    });
    $.__views.__alloyId320.add($.__views.tagsText);
    $.__views.__alloyId322 = Ti.UI.createView({
        top: 0,
        width: Ti.UI.FILL,
        backgroundColor: Alloy.Globals.TikklrWhite,
        height: Ti.UI.SIZE,
        id: "__alloyId322"
    });
    $.__views.tikDetailsView.add($.__views.__alloyId322);
    $.__views.__alloyId323 = Ti.UI.createView({
        top: 5,
        left: 5,
        right: 5,
        height: Ti.UI.SIZE,
        backgroundColor: "transparent",
        id: "__alloyId323"
    });
    $.__views.__alloyId322.add($.__views.__alloyId323);
    $.__views.pictureUrl = Alloy.createWidget("com.baboonmedia.remoteimage", "widget", {
        left: 5,
        top: 0,
        width: 50,
        height: 50,
        bottom: 5,
        id: "pictureUrl",
        __parentSymbol: $.__views.__alloyId323
    });
    $.__views.pictureUrl.setParent($.__views.__alloyId323);
    $.__views.__alloyId324 = Ti.UI.createView({
        top: 0,
        height: Ti.UI.SIZE,
        left: 60,
        width: 170,
        layout: "vertical",
        id: "__alloyId324"
    });
    $.__views.__alloyId323.add($.__views.__alloyId324);
    $.__views.userNameLabel = Ti.UI.createLabel({
        left: 5,
        top: 0,
        font: {
            fontSize: "12pt",
            fontFamily: "Substance-ExtraBold"
        },
        color: Alloy.Globals.TikklrGreen,
        id: "userNameLabel"
    });
    $.__views.__alloyId324.add($.__views.userNameLabel);
    $.__views.userMailLabel = Ti.UI.createLabel({
        left: 5,
        font: {
            fontSize: "10pt",
            fontFamily: "Substance-ExtraBold"
        },
        color: Alloy.Globals.TikklrGreen,
        id: "userMailLabel"
    });
    $.__views.__alloyId324.add($.__views.userMailLabel);
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
    $.__views.__alloyId323.add($.__views.followButton);
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
    $.__views.__alloyId323.add($.__views.followingUserButton);
    followersClicked ? $.addListener($.__views.followingUserButton, "click", followersClicked) : __defers["$.__views.followingUserButton!click!followersClicked"] = true;
    $.__views.__alloyId325 = Ti.UI.createView({
        top: 0,
        bottom: 0,
        backgroundColor: Alloy.Globals.TikklrWhite,
        layout: "absolute",
        id: "__alloyId325"
    });
    $.__views.tikDetailsView.add($.__views.__alloyId325);
    $.__views.tableHeader = Alloy.createController("partials/tableHeader", {
        id: "tableHeader",
        __parentSymbol: __parentSymbol
    });
    $.__views.hisVideosTable = Ti.UI.createTableView({
        separatorColor: "transparent",
        top: 0,
        bottom: 0,
        backgroundColor: Alloy.Globals.TikklrWhite,
        headerPullView: $.__views.tableHeader.getViewEx({
            recurse: true
        }),
        id: "hisVideosTable",
        dataTransform: "profileNodeTransform"
    });
    $.__views.__alloyId325.add($.__views.hisVideosTable);
    galleryDragEnd ? $.addListener($.__views.hisVideosTable, "dragEnd", galleryDragEnd) : __defers["$.__views.hisVideosTable!dragEnd!galleryDragEnd"] = true;
    tableScrollEnd ? $.addListener($.__views.hisVideosTable, "scrollend", tableScrollEnd) : __defers["$.__views.hisVideosTable!scrollend!tableScrollEnd"] = true;
    tableScroll ? $.addListener($.__views.hisVideosTable, "scroll", tableScroll) : __defers["$.__views.hisVideosTable!scroll!tableScroll"] = true;
    rowClicked ? $.addListener($.__views.hisVideosTable, "click", rowClicked) : __defers["$.__views.hisVideosTable!click!rowClicked"] = true;
    showDescription ? $.addListener($.__views.hisVideosTable, "swipe", showDescription) : __defers["$.__views.hisVideosTable!swipe!showDescription"] = true;
    var __alloyId327 = function() {
        var transformed = _.isFunction($.currentNode.transform) ? $.currentNode.transform() : $.currentNode.toJSON();
        $.userThumb.image = _.template("{m.thumb}", {
            m: transformed
        }, {
            interpolate: /\{([\s\S]+?)\}/g
        });
        $.featuredTitleLabel.text = _.template("{m.title}", {
            m: transformed
        }, {
            interpolate: /\{([\s\S]+?)\}/g
        });
        $.featuredTitleViews.text = _.template("{m.views}", {
            m: transformed
        }, {
            interpolate: /\{([\s\S]+?)\}/g
        });
        $.tagsText.text = _.template("{m.tags}", {
            m: transformed
        }, {
            interpolate: /\{([\s\S]+?)\}/g
        });
    };
    $.currentNode.on("fetch change destroy", __alloyId327);
    exports.destroy = function() {
        $.currentNode && $.currentNode.off("fetch change destroy", __alloyId327);
    };
    _.extend($, $.__views);
    exports.baseController = "tikkGallery";
    require("alloy/animation");
    var entryId = arguments[0];
    $.currentNode = Alloy.Models.currentNode;
    $.HisVideos = Alloy.createCollection("Node");
    var currentVideos = [];
    var userId = Alloy.Models.currentNode.get("author").id;
    var galleryCenter = "400";
    $.currentNodeUser.set("uid", userId);
    setViewData();
    $.HisVideos.on("change fetch", videosListLoaded);
    $.currentNodeUser.fetch({
        success: function(e) {
            properties = userTransform($.currentNodeUser);
            $.currentNodeUser.set(properties, {
                silent: true
            });
            Ti.API.info("Got user: " + JSON.stringify(e));
            setUserViewData();
            setViewData();
            var flag = Alloy.createModel("Flag");
            var flag_name = Alloy.Globals.FlagFlag;
            flag.isFlagged(flag_name, Alloy.Models.currentNode.id, Alloy.Models.User.uid, contentIsFlaggedCallback);
            var params = {
                "parameters[type]": "video",
                "parameters[author]": userId,
                sort: "created",
                direction: "DESC",
                pagesize: 10,
                "parameters[status]": 1
            };
            $.loadGallery($.HisVideos, params, galleryCenter, null);
        }
    });
    var playVideoFunction = function(e) {
        var entryId = e.entryId;
        var manifestUrl = "http://video.tikklr.com/p/" + Alloy.Globals.partnerId + "/sp/" + Alloy.Globals.partnerId + "00/playManifest/entryId/" + entryId + "/format/http/protocol/http/";
        var client = Ti.Network.createHTTPClient({
            onload: function() {
                if ("undefined" != typeof $.image && "undefined" != typeof $.player) {
                    var xml = this.responseText;
                    if (xml) {
                        var xmldata = Ti.XML.parseString(xml);
                        var mediaItems = xmldata.documentElement.getElementsByTagName("media");
                        var url = mediaItems.item(0).attributes.getNamedItem("url").nodeValue;
                        $.player.show();
                        $.player.url = url;
                        $.image.hide();
                    } else {
                        $.image.show();
                        $.image.image = "http://video.tikklr.com/p/" + Alloy.Globals.partnerId + "/sp/" + Alloy.Globals.partnerId + "00/thumbnail/entry_id/" + entryId + "/width/600/quality/80";
                        $.player.hide();
                    }
                }
            }
        });
        client.open("GET", manifestUrl);
        client.send();
    };
    Ti.App.addEventListener("playVideo", playVideoFunction);
    Ti.App.fireEvent("playVideo", {
        entryId: entryId
    });
    exports.clean = function() {
        "undefined" != typeof $.player && $.player.stop();
        $.HisVideos.off(null, null, $);
        $.hisVideosTable.setData([]);
        Ti.App.removeEventListener("playVideo", playVideoFunction);
        Ti.Gesture.removeEventListener("changeorientation", orientationChange);
        $.destroy();
        $.off();
    };
    var orientationChange = function(e) {
        $.player.fullscreen = e.orientation == Ti.UI.LANDSCAPE_LEFT || e.orientation == Ti.UI.LANDSCAPE_RIGHT ? true : false;
    };
    Ti.Gesture.addEventListener("orientationchange", orientationChange);
    __defers["$.__views.__alloyId314!click!backClicked"] && $.addListener($.__views.__alloyId314, "click", backClicked);
    __defers["$.__views.player!fullscreen!onPlayerFullscreen"] && $.addListener($.__views.player, "fullscreen", onPlayerFullscreen);
    __defers["$.__views.__alloyId318!click!shareThisVideo"] && $.addListener($.__views.__alloyId318, "click", shareThisVideo);
    __defers["$.__views.__alloyId319!click!starThisVideo"] && $.addListener($.__views.__alloyId319, "click", starThisVideo);
    __defers["$.__views.featuredFlag!click!flagThisVideo"] && $.addListener($.__views.featuredFlag, "click", flagThisVideo);
    __defers["$.__views.closeShare!click!closeShareBox"] && $.addListener($.__views.closeShare, "click", closeShareBox);
    __defers["$.__views.facebook!click!shareClicked"] && $.addListener($.__views.facebook, "click", shareClicked);
    __defers["$.__views.twitter!click!shareClicked"] && $.addListener($.__views.twitter, "click", shareClicked);
    __defers["$.__views.linkedIn!click!shareClicked"] && $.addListener($.__views.linkedIn, "click", shareClicked);
    __defers["$.__views.approveShare!click!closeShareBox"] && $.addListener($.__views.approveShare, "click", closeShareBox);
    __defers["$.__views.followButton!click!followClicked"] && $.addListener($.__views.followButton, "click", followClicked);
    __defers["$.__views.followingUserButton!click!followersClicked"] && $.addListener($.__views.followingUserButton, "click", followersClicked);
    __defers["$.__views.hisVideosTable!dragEnd!galleryDragEnd"] && $.addListener($.__views.hisVideosTable, "dragEnd", galleryDragEnd);
    __defers["$.__views.hisVideosTable!scrollend!tableScrollEnd"] && $.addListener($.__views.hisVideosTable, "scrollend", tableScrollEnd);
    __defers["$.__views.hisVideosTable!scroll!tableScroll"] && $.addListener($.__views.hisVideosTable, "scroll", tableScroll);
    __defers["$.__views.hisVideosTable!click!rowClicked"] && $.addListener($.__views.hisVideosTable, "click", rowClicked);
    __defers["$.__views.hisVideosTable!swipe!showDescription"] && $.addListener($.__views.hisVideosTable, "swipe", showDescription);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;