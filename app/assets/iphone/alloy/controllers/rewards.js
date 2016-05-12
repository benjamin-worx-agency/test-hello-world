function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function __alloyId267(e) {
        if (e && e.fromAdapter) return;
        __alloyId267.opts || {};
        var models = __alloyId266.models;
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId230 = models[i];
            __alloyId230.__transform = rewardTransform(__alloyId230);
            var __alloyId232 = Ti.UI.createTableViewRow({
                height: "180",
                selectionStyle: "NONE",
                nodeId: _.template("{m.nid}", {
                    m: __alloyId230.__transform
                }, {
                    interpolate: /\{([\s\S]+?)\}/g
                }),
                nodeType: "reward"
            });
            rows.push(__alloyId232);
            var __alloyId234 = Ti.UI.createView({
                top: 0,
                left: 0,
                width: Ti.Platform.displayCaps.platformWidth,
                layout: "absolute",
                height: Ti.UI.SIZE,
                zIndex: 50,
                backgroundColor: Alloy.Globals.TikklrBlack
            });
            __alloyId232.add(__alloyId234);
            var __alloyId236 = Ti.UI.createView({
                top: 0,
                left: 0,
                width: Ti.UI.FILL,
                height: "180",
                backgroundColor: _.template("{m.rewardBackgroundColor}", {
                    m: __alloyId230.__transform
                }, {
                    interpolate: /\{([\s\S]+?)\}/g
                })
            });
            __alloyId234.add(__alloyId236);
            var __alloyId238 = Ti.UI.createView({
                top: 0,
                opacity: .7,
                height: Ti.UI.SIZE,
                width: Ti.UI.FILL,
                backgroundColor: Alloy.Globals.TikklrWhite
            });
            __alloyId234.add(__alloyId238);
            var __alloyId240 = Ti.UI.createLabel({
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
                    m: __alloyId230.__transform
                }, {
                    interpolate: /\{([\s\S]+?)\}/g
                })
            });
            __alloyId238.add(__alloyId240);
            var __alloyId242 = Ti.UI.createView({
                top: "0",
                left: Ti.Platform.displayCaps.platformWidth,
                width: Ti.Platform.displayCaps.platformWidth,
                backgroundColor: Alloy.Globals.TikklrBlack,
                height: "40",
                layout: "horizontal"
            });
            __alloyId234.add(__alloyId242);
            var __alloyId243 = Ti.UI.createView({
                top: 0,
                left: 0,
                width: "40",
                height: "40",
                backgroundImage: "cancel-white.png",
                backgroundColor: Alloy.Globals.TikklrRed
            });
            __alloyId242.add(__alloyId243);
            handleCloseClicked ? $.addListener(__alloyId243, "click", handleCloseClicked) : __defers["__alloyId243!click!handleCloseClicked"] = true;
            var __alloyId244 = Ti.UI.createView({
                left: "30",
                width: "40",
                height: "40",
                backgroundImage: "facebook.png"
            });
            __alloyId242.add(__alloyId244);
            shareClicked ? $.addListener(__alloyId244, "click", shareClicked) : __defers["__alloyId244!click!shareClicked"] = true;
            var __alloyId245 = Ti.UI.createView({
                left: "30",
                width: "40",
                height: "40",
                backgroundImage: "twitter.png"
            });
            __alloyId242.add(__alloyId245);
            shareClicked ? $.addListener(__alloyId245, "click", shareClicked) : __defers["__alloyId245!click!shareClicked"] = true;
            var __alloyId246 = Ti.UI.createView({
                left: "30",
                width: "40",
                height: "40",
                backgroundImage: "linkedIn.png"
            });
            __alloyId242.add(__alloyId246);
            shareClicked ? $.addListener(__alloyId246, "click", shareClicked) : __defers["__alloyId246!click!shareClicked"] = true;
            var __alloyId247 = Ti.UI.createView({
                top: 0,
                left: "30",
                width: "40",
                height: "40",
                backgroundImage: "approve-red.png",
                backgroundColor: Alloy.Globals.TikklrWhite
            });
            __alloyId242.add(__alloyId247);
            handleCloseClicked ? $.addListener(__alloyId247, "click", handleCloseClicked) : __defers["__alloyId247!click!handleCloseClicked"] = true;
            var __alloyId249 = Ti.UI.createView({
                top: "40",
                height: Ti.UI.SIZE,
                layout: "vertical",
                backgroundColor: "transparent",
                width: "100%"
            });
            __alloyId234.add(__alloyId249);
            var __alloyId251 = Ti.UI.createView({
                top: "0",
                height: Ti.UI.SIZE,
                layout: "horizontal",
                backgroundColor: "transparent",
                width: "100%"
            });
            __alloyId249.add(__alloyId251);
            var __alloyId252 = Ti.UI.createView({
                width: "90",
                height: "70",
                top: "5",
                left: "10",
                backgroundImage: _.template("{m.thumb}", {
                    m: __alloyId230.__transform
                }, {
                    interpolate: /\{([\s\S]+?)\}/g
                })
            });
            __alloyId251.add(__alloyId252);
            var __alloyId254 = Ti.UI.createLabel({
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
                    m: __alloyId230.__transform
                }, {
                    interpolate: /\{([\s\S]+?)\}/g
                })
            });
            __alloyId251.add(__alloyId254);
            var __alloyId256 = Ti.UI.createView({
                top: "0",
                height: Ti.UI.SIZE,
                layout: "horizontal",
                backgroundColor: "transparent",
                width: "100%"
            });
            __alloyId249.add(__alloyId256);
            var __alloyId257 = Alloy.createWidget("com.baboonmedia.remoteimage", "widget", {
                left: "10",
                top: "0",
                width: "50",
                height: "50",
                image: _.template("{m.brandImage}", {
                    m: __alloyId230.__transform
                }, {
                    interpolate: /\{([\s\S]+?)\}/g
                }),
                $model: __alloyId230,
                __parentSymbol: __alloyId256
            });
            __alloyId257.setParent(__alloyId256);
            var __alloyId259 = Ti.UI.createLabel({
                left: "5",
                bottom: "0",
                font: {
                    fontSize: "12pt",
                    fontFamily: "Substance-ExtraBold"
                },
                color: Alloy.Globals.TikklrWhite,
                text: _.template("{m.reward_brand_name}", {
                    m: __alloyId230.__transform
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
            __alloyId249.add(__alloyId261);
            var __alloyId263 = Ti.UI.createLabel({
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
            __alloyId261.add(__alloyId263);
            var __alloyId265 = Ti.UI.createLabel({
                left: "2",
                bottom: "0",
                font: {
                    fontSize: "12pt",
                    fontFamily: "Substance-ExtraBold"
                },
                color: Alloy.Globals.TikklrWhite,
                text: _.template("{m.expirationDate}", {
                    m: __alloyId230.__transform
                }, {
                    interpolate: /\{([\s\S]+?)\}/g
                })
            });
            __alloyId261.add(__alloyId265);
        }
        $.__views.__alloyId228.setData(rows);
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
    $.__views.__alloyId224 = Ti.UI.createButton({
        left: "20",
        width: "40",
        height: "40",
        backgroundColor: "transparent",
        backgroundImage: "back.png",
        selectedBackgroundImage: "back-pressed.png",
        id: "__alloyId224"
    });
    $.__views.tikklrRewardsHeader.add($.__views.__alloyId224);
    backClicked ? $.addListener($.__views.__alloyId224, "click", backClicked) : __defers["$.__views.__alloyId224!click!backClicked"] = true;
    $.__views.__alloyId225 = Ti.UI.createLabel({
        backgroundColor: "transparent",
        color: Alloy.Globals.TikklrGreen,
        font: {
            fontSize: "20pt",
            fontFamily: "Substance-ExtraBold"
        },
        height: 35,
        zIndex: 1e3,
        text: "REWARDS",
        id: "__alloyId225"
    });
    $.__views.tikklrRewardsHeader.add($.__views.__alloyId225);
    var __alloyId226 = [];
    $.__views.__alloyId227 = Ti.UI.createView({
        layout: "absolute",
        id: "__alloyId227"
    });
    __alloyId226.push($.__views.__alloyId227);
    $.__views.tableView = Ti.UI.createView({
        id: "tableView"
    });
    $.__views.__alloyId227.add($.__views.tableView);
    $.__views.tableHeader = Alloy.createController("partials/tableHeader", {
        id: "tableHeader",
        __parentSymbol: __parentSymbol
    });
    $.__views.__alloyId228 = Ti.UI.createTableView({
        rowHeight: Ti.UI.SIZE,
        separatorColor: "transparent",
        separatorStyle: Titanium.UI.iPhone.TableViewSeparatorStyle.NONE,
        headerPullView: $.__views.tableHeader.getViewEx({
            recurse: true
        }),
        id: "__alloyId228"
    });
    $.__views.tableView.add($.__views.__alloyId228);
    var __alloyId266 = Alloy.Collections["$.Rewards"] || $.Rewards;
    __alloyId266.on("fetch destroy change add remove reset", __alloyId267);
    galleryDragEnd ? $.addListener($.__views.__alloyId228, "dragEnd", galleryDragEnd) : __defers["$.__views.__alloyId228!dragEnd!galleryDragEnd"] = true;
    tableScrollEnd ? $.addListener($.__views.__alloyId228, "scrollend", tableScrollEnd) : __defers["$.__views.__alloyId228!scrollend!tableScrollEnd"] = true;
    tableScroll ? $.addListener($.__views.__alloyId228, "scroll", tableScroll) : __defers["$.__views.__alloyId228!scroll!tableScroll"] = true;
    rowClicked ? $.addListener($.__views.__alloyId228, "click", rowClicked) : __defers["$.__views.__alloyId228!click!rowClicked"] = true;
    redeemReward ? $.addListener($.__views.__alloyId228, "swipe", redeemReward) : __defers["$.__views.__alloyId228!swipe!redeemReward"] = true;
    $.__views.noResults = Ti.UI.createView({
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        backgroundColor: Alloy.Globals.TikklrGray,
        id: "noResults",
        visible: false
    });
    $.__views.__alloyId227.add($.__views.noResults);
    $.__views.__alloyId268 = Ti.UI.createLabel({
        color: Alloy.Globals.TikklrGreen,
        font: {
            fontFamily: "Substance-ExtraBold",
            fontSize: "20pt",
            fontWeight: "bold"
        },
        text: "NO RESULTS FOUND",
        id: "__alloyId268"
    });
    $.__views.noResults.add($.__views.__alloyId268);
    $.__views.rewardsWindow = Ti.UI.createScrollableView({
        top: "40",
        height: Ti.UI.FILL,
        left: 0,
        orientationModes: [ Ti.UI.PORTRAIT ],
        backgroundColor: "transparent",
        scrollingEnabled: "false",
        showPagingControl: "false",
        views: __alloyId226,
        id: "rewardsWindow"
    });
    $.__views.rewardsView.add($.__views.rewardsWindow);
    exports.destroy = function() {
        __alloyId266 && __alloyId266.off("fetch destroy change add remove reset", __alloyId267);
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
    __defers["$.__views.__alloyId224!click!backClicked"] && $.addListener($.__views.__alloyId224, "click", backClicked);
    __defers["__alloyId243!click!handleCloseClicked"] && $.addListener(__alloyId243, "click", handleCloseClicked);
    __defers["__alloyId244!click!shareClicked"] && $.addListener(__alloyId244, "click", shareClicked);
    __defers["__alloyId245!click!shareClicked"] && $.addListener(__alloyId245, "click", shareClicked);
    __defers["__alloyId246!click!shareClicked"] && $.addListener(__alloyId246, "click", shareClicked);
    __defers["__alloyId247!click!handleCloseClicked"] && $.addListener(__alloyId247, "click", handleCloseClicked);
    __defers["$.__views.__alloyId228!dragEnd!galleryDragEnd"] && $.addListener($.__views.__alloyId228, "dragEnd", galleryDragEnd);
    __defers["$.__views.__alloyId228!scrollend!tableScrollEnd"] && $.addListener($.__views.__alloyId228, "scrollend", tableScrollEnd);
    __defers["$.__views.__alloyId228!scroll!tableScroll"] && $.addListener($.__views.__alloyId228, "scroll", tableScroll);
    __defers["$.__views.__alloyId228!click!rowClicked"] && $.addListener($.__views.__alloyId228, "click", rowClicked);
    __defers["$.__views.__alloyId228!swipe!redeemReward"] && $.addListener($.__views.__alloyId228, "swipe", redeemReward);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;