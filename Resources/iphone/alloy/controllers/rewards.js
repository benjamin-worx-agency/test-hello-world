function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function __alloyId272(e) {
        if (e && e.fromAdapter) return;
        __alloyId272.opts || {};
        var models = __alloyId271.models;
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId235 = models[i];
            __alloyId235.__transform = rewardTransform(__alloyId235);
            var __alloyId237 = Ti.UI.createTableViewRow({
                height: "180",
                selectionStyle: "NONE",
                nodeId: _.template("{m.nid}", {
                    m: __alloyId235.__transform
                }, {
                    interpolate: /\{([\s\S]+?)\}/g
                }),
                nodeType: "reward"
            });
            rows.push(__alloyId237);
            var __alloyId239 = Ti.UI.createView({
                top: 0,
                left: 0,
                width: Ti.Platform.displayCaps.platformWidth,
                layout: "absolute",
                height: Ti.UI.SIZE,
                zIndex: 50,
                backgroundColor: Alloy.Globals.TikklrBlack
            });
            __alloyId237.add(__alloyId239);
            var __alloyId241 = Ti.UI.createView({
                top: 0,
                left: 0,
                width: Ti.UI.FILL,
                height: "180",
                backgroundColor: _.template("{m.rewardBackgroundColor}", {
                    m: __alloyId235.__transform
                }, {
                    interpolate: /\{([\s\S]+?)\}/g
                })
            });
            __alloyId239.add(__alloyId241);
            var __alloyId243 = Ti.UI.createView({
                top: 0,
                opacity: .7,
                height: Ti.UI.SIZE,
                width: Ti.UI.FILL,
                backgroundColor: Alloy.Globals.TikklrWhite
            });
            __alloyId239.add(__alloyId243);
            var __alloyId245 = Ti.UI.createLabel({
                color: Alloy.Globals.TikklrGreen,
                left: "10",
                top: "7",
                height: "25",
                right: "90",
                font: {
                    fontSize: "15pt",
                    fontFamily: "Substance-ExtraBold"
                },
                text: _.template("{m.titleUpperCase}", {
                    m: __alloyId235.__transform
                }, {
                    interpolate: /\{([\s\S]+?)\}/g
                })
            });
            __alloyId243.add(__alloyId245);
            var __alloyId247 = Ti.UI.createView({
                top: "0",
                left: Ti.Platform.displayCaps.platformWidth,
                width: Ti.Platform.displayCaps.platformWidth,
                backgroundColor: Alloy.Globals.TikklrBlack,
                height: "40",
                layout: "horizontal"
            });
            __alloyId239.add(__alloyId247);
            var __alloyId248 = Ti.UI.createView({
                top: 0,
                left: 0,
                width: "40",
                height: "40",
                backgroundImage: "cancel-white.png",
                backgroundColor: Alloy.Globals.TikklrRed
            });
            __alloyId247.add(__alloyId248);
            handleCloseClicked ? $.addListener(__alloyId248, "click", handleCloseClicked) : __defers["__alloyId248!click!handleCloseClicked"] = true;
            var __alloyId249 = Ti.UI.createView({
                left: "30",
                width: "40",
                height: "40",
                backgroundImage: "facebook.png"
            });
            __alloyId247.add(__alloyId249);
            shareClicked ? $.addListener(__alloyId249, "click", shareClicked) : __defers["__alloyId249!click!shareClicked"] = true;
            var __alloyId250 = Ti.UI.createView({
                left: "30",
                width: "40",
                height: "40",
                backgroundImage: "twitter.png"
            });
            __alloyId247.add(__alloyId250);
            shareClicked ? $.addListener(__alloyId250, "click", shareClicked) : __defers["__alloyId250!click!shareClicked"] = true;
            var __alloyId251 = Ti.UI.createView({
                left: "30",
                width: "40",
                height: "40",
                backgroundImage: "linkedIn.png"
            });
            __alloyId247.add(__alloyId251);
            shareClicked ? $.addListener(__alloyId251, "click", shareClicked) : __defers["__alloyId251!click!shareClicked"] = true;
            var __alloyId252 = Ti.UI.createView({
                top: 0,
                left: "30",
                width: "40",
                height: "40",
                backgroundImage: "approve-red.png",
                backgroundColor: Alloy.Globals.TikklrWhite
            });
            __alloyId247.add(__alloyId252);
            handleCloseClicked ? $.addListener(__alloyId252, "click", handleCloseClicked) : __defers["__alloyId252!click!handleCloseClicked"] = true;
            var __alloyId254 = Ti.UI.createView({
                top: "40",
                height: Ti.UI.SIZE,
                layout: "vertical",
                backgroundColor: "transparent",
                width: "100%"
            });
            __alloyId239.add(__alloyId254);
            var __alloyId256 = Ti.UI.createView({
                top: "0",
                height: Ti.UI.SIZE,
                layout: "horizontal",
                backgroundColor: "transparent",
                width: "100%"
            });
            __alloyId254.add(__alloyId256);
            var __alloyId257 = Ti.UI.createView({
                width: "90",
                height: "70",
                top: "5",
                left: "10",
                backgroundImage: _.template("{m.thumb}", {
                    m: __alloyId235.__transform
                }, {
                    interpolate: /\{([\s\S]+?)\}/g
                })
            });
            __alloyId256.add(__alloyId257);
            var __alloyId259 = Ti.UI.createLabel({
                left: "2",
                top: "0",
                width: Ti.UI.FILL,
                height: "75",
                font: {
                    fontSize: "22pt",
                    fontFamily: "Substance-ExtraBold"
                },
                color: Alloy.Globals.TikklrWhite,
                text: _.template("{m.reward_description}", {
                    m: __alloyId235.__transform
                }, {
                    interpolate: /\{([\s\S]+?)\}/g
                })
            });
            __alloyId256.add(__alloyId259);
            var __alloyId261 = Ti.UI.createView({
                top: "0",
                height: Ti.UI.SIZE,
                layout: "horizontal",
                backgroundColor: "transparent",
                width: "100%"
            });
            __alloyId254.add(__alloyId261);
            var __alloyId262 = Alloy.createWidget("com.baboonmedia.remoteimage", "widget", {
                left: "10",
                top: "0",
                width: "50",
                height: "50",
                image: _.template("{m.brandImage}", {
                    m: __alloyId235.__transform
                }, {
                    interpolate: /\{([\s\S]+?)\}/g
                }),
                $model: __alloyId235,
                __parentSymbol: __alloyId261
            });
            __alloyId262.setParent(__alloyId261);
            var __alloyId264 = Ti.UI.createLabel({
                left: "5",
                bottom: "0",
                font: {
                    fontSize: "12pt",
                    fontFamily: "Substance-ExtraBold"
                },
                color: Alloy.Globals.TikklrWhite,
                text: _.template("{m.reward_brand_name}", {
                    m: __alloyId235.__transform
                }, {
                    interpolate: /\{([\s\S]+?)\}/g
                })
            });
            __alloyId261.add(__alloyId264);
            var __alloyId266 = Ti.UI.createView({
                top: "0",
                height: Ti.UI.SIZE,
                layout: "horizontal",
                backgroundColor: "transparent",
                width: "100%"
            });
            __alloyId254.add(__alloyId266);
            var __alloyId268 = Ti.UI.createLabel({
                left: "20",
                top: "2",
                bottom: "2",
                font: {
                    fontSize: "12pt",
                    fontFamily: "Substance-ExtraBold"
                },
                color: Alloy.Globals.TikklrWhite,
                text: "EXP:"
            });
            __alloyId266.add(__alloyId268);
            var __alloyId270 = Ti.UI.createLabel({
                left: "2",
                bottom: "0",
                font: {
                    fontSize: "12pt",
                    fontFamily: "Substance-ExtraBold"
                },
                color: Alloy.Globals.TikklrWhite,
                text: _.template("{m.expirationDate}", {
                    m: __alloyId235.__transform
                }, {
                    interpolate: /\{([\s\S]+?)\}/g
                })
            });
            __alloyId266.add(__alloyId270);
        }
        $.__views.__alloyId233.setData(rows);
    }
    require("alloy/controllers/pandaGallery").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "rewards";
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
    $.Rewards = Alloy.createCollection("Node");
    $.__views.rewardsView = Ti.UI.createView({
        top: 0,
        left: 0,
        width: Ti.Platform.displayCaps.platformWidth,
        height: "100%",
        orientationModes: [ Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT, Ti.UI.PORTRAIT ],
        id: "rewardsView"
    });
    $.__views.rewardsView && $.addTopLevelView($.__views.rewardsView);
    $.__views.tikklrRewardsHeader = Ti.UI.createView({
        top: 0,
        width: Ti.Platform.displayCaps.platformWidth,
        backgroundColor: "transparent",
        height: "40",
        id: "tikklrRewardsHeader"
    });
    $.__views.rewardsView.add($.__views.tikklrRewardsHeader);
    $.__views.__alloyId229 = Ti.UI.createButton({
        left: "20",
        width: "40",
        height: "40",
        backgroundColor: "transparent",
        backgroundImage: "back.png",
        selectedBackgroundImage: "back-pressed.png",
        id: "__alloyId229"
    });
    $.__views.tikklrRewardsHeader.add($.__views.__alloyId229);
    backClicked ? $.addListener($.__views.__alloyId229, "click", backClicked) : __defers["$.__views.__alloyId229!click!backClicked"] = true;
    $.__views.__alloyId230 = Ti.UI.createLabel({
        backgroundColor: "transparent",
        color: Alloy.Globals.TikklrGreen,
        font: {
            fontSize: "20pt",
            fontFamily: "Substance-ExtraBold"
        },
        height: 35,
        zIndex: 1e3,
        text: "REWARDS",
        id: "__alloyId230"
    });
    $.__views.tikklrRewardsHeader.add($.__views.__alloyId230);
    var __alloyId231 = [];
    $.__views.__alloyId232 = Ti.UI.createView({
        layout: "absolute",
        id: "__alloyId232"
    });
    __alloyId231.push($.__views.__alloyId232);
    $.__views.tableView = Ti.UI.createView({
        id: "tableView"
    });
    $.__views.__alloyId232.add($.__views.tableView);
    $.__views.tableHeader = Alloy.createController("partials/tableHeader", {
        id: "tableHeader",
        __parentSymbol: __parentSymbol
    });
    $.__views.__alloyId233 = Ti.UI.createTableView({
        rowHeight: Ti.UI.SIZE,
        separatorColor: "transparent",
        separatorStyle: Titanium.UI.iPhone.TableViewSeparatorStyle.NONE,
        headerPullView: $.__views.tableHeader.getViewEx({
            recurse: true
        }),
        id: "__alloyId233"
    });
    $.__views.tableView.add($.__views.__alloyId233);
    var __alloyId271 = Alloy.Collections["$.Rewards"] || $.Rewards;
    __alloyId271.on("fetch destroy change add remove reset", __alloyId272);
    galleryDragEnd ? $.addListener($.__views.__alloyId233, "dragEnd", galleryDragEnd) : __defers["$.__views.__alloyId233!dragEnd!galleryDragEnd"] = true;
    tableScrollEnd ? $.addListener($.__views.__alloyId233, "scrollend", tableScrollEnd) : __defers["$.__views.__alloyId233!scrollend!tableScrollEnd"] = true;
    tableScroll ? $.addListener($.__views.__alloyId233, "scroll", tableScroll) : __defers["$.__views.__alloyId233!scroll!tableScroll"] = true;
    rowClicked ? $.addListener($.__views.__alloyId233, "click", rowClicked) : __defers["$.__views.__alloyId233!click!rowClicked"] = true;
    redeemReward ? $.addListener($.__views.__alloyId233, "swipe", redeemReward) : __defers["$.__views.__alloyId233!swipe!redeemReward"] = true;
    $.__views.noResults = Ti.UI.createView({
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        backgroundColor: Alloy.Globals.TikklrGray,
        id: "noResults",
        visible: false
    });
    $.__views.__alloyId232.add($.__views.noResults);
    $.__views.__alloyId273 = Ti.UI.createLabel({
        color: Alloy.Globals.TikklrGreen,
        font: {
            fontFamily: "Substance-ExtraBold",
            fontSize: "20pt",
            fontWeight: "bold"
        },
        text: "NO RESULTS FOUND",
        id: "__alloyId273"
    });
    $.__views.noResults.add($.__views.__alloyId273);
    $.__views.rewardsWindow = Ti.UI.createScrollableView({
        top: "40",
        height: Ti.UI.FILL,
        left: 0,
        orientationModes: [ Ti.UI.PORTRAIT ],
        backgroundColor: "transparent",
        scrollingEnabled: "false",
        showPagingControl: "false",
        views: __alloyId231,
        id: "rewardsWindow"
    });
    $.__views.rewardsView.add($.__views.rewardsWindow);
    exports.destroy = function() {
        __alloyId271 && __alloyId271.off("fetch destroy change add remove reset", __alloyId272);
    };
    _.extend($, $.__views);
    require("alloy/animation");
    var currentDate = new Date();
    var currentFormattedDate = currentDate.getFullYear() + "-" + (currentDate.getMonth() + 1) + "-" + currentDate.getDate();
    var params = {
        "parameters[type]": "rewards",
        "parameters[author]": Alloy.Models.User.get("uid"),
        "parameters[expiration_date][value][value]": currentFormattedDate,
        "parameters[expiration_date][value][operator]": ">=",
        sort: "created",
        direction: "DESC",
        pagesize: 10,
        "parameters[status]": 1
    };
    exports.baseController = "pandaGallery";
    var args = arguments[0] || null;
    var isLoadGallery = "true";
    if (null != args && "undefined" != typeof args) {
        isLoadGallery = args.loadGallery || "true";
        if (null != args.params && "undefined" != typeof args.params) {
            params = args.params;
            $.headerLabel.text = args.headerTitle;
            $.backButton.show();
        }
    }
    var handleGalleryLoadedEvent = function(e) {
        $.getView().getParent() && $.getView().getParent().id == e.id && $.loadGallery($.Rewards, params, null, null);
    };
    Ti.App.addEventListener("galleryLoaded", function(e) {
        handleGalleryLoadedEvent(e);
    });
    var handleNoResultsEvent = function() {
        $.noResults.show();
        $.noResults.visible = true;
        $.tableView.hide();
    };
    Ti.App.addEventListener("noResults", function(e) {
        handleNoResultsEvent(e);
    });
    if (null != params) "true" == isLoadGallery && $.loadGallery($.Rewards, params, null, null); else {
        "undefined" != typeof $.rewardsView ? $.rewardsView.remove($.rewardsView.children[0]) : $.backButton.hide();
        "true" == isLoadGallery && $.loadGallery($.Rewards, null, null, null);
    }
    exports.clean = function() {
        Ti.App.removeEventListener("galleryLoaded", handleGalleryLoadedEvent);
        Ti.App.removeEventListener("noResults", handleGalleryLoadedEvent);
        $.destroy();
        $.off();
    };
    __defers["$.__views.__alloyId229!click!backClicked"] && $.addListener($.__views.__alloyId229, "click", backClicked);
    __defers["__alloyId248!click!handleCloseClicked"] && $.addListener(__alloyId248, "click", handleCloseClicked);
    __defers["__alloyId249!click!shareClicked"] && $.addListener(__alloyId249, "click", shareClicked);
    __defers["__alloyId250!click!shareClicked"] && $.addListener(__alloyId250, "click", shareClicked);
    __defers["__alloyId251!click!shareClicked"] && $.addListener(__alloyId251, "click", shareClicked);
    __defers["__alloyId252!click!handleCloseClicked"] && $.addListener(__alloyId252, "click", handleCloseClicked);
    __defers["$.__views.__alloyId233!dragEnd!galleryDragEnd"] && $.addListener($.__views.__alloyId233, "dragEnd", galleryDragEnd);
    __defers["$.__views.__alloyId233!scrollend!tableScrollEnd"] && $.addListener($.__views.__alloyId233, "scrollend", tableScrollEnd);
    __defers["$.__views.__alloyId233!scroll!tableScroll"] && $.addListener($.__views.__alloyId233, "scroll", tableScroll);
    __defers["$.__views.__alloyId233!click!rowClicked"] && $.addListener($.__views.__alloyId233, "click", rowClicked);
    __defers["$.__views.__alloyId233!swipe!redeemReward"] && $.addListener($.__views.__alloyId233, "swipe", redeemReward);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;