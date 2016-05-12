function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    require("alloy/controllers/pandaNav").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "briefList";
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
    $.__views.briefsView = Ti.UI.createView({
        top: 0,
        left: 0,
        width: Ti.Platform.displayCaps.platformWidth,
        height: "100%",
        orientationModes: [ Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT, Ti.UI.PORTRAIT ],
        id: "briefsView"
    });
    $.__views.briefsView && $.addTopLevelView($.__views.briefsView);
    $.__views.__alloyId63 = Ti.UI.createView({
        top: 0,
        width: Ti.Platform.displayCaps.platformWidth,
        backgroundColor: "transparent",
        height: "40",
        id: "__alloyId63"
    });
    $.__views.briefsView.add($.__views.__alloyId63);
    $.__views.backButton = Ti.UI.createButton({
        left: "20",
        width: "40",
        height: "40",
        backgroundColor: "transparent",
        backgroundImage: "back.png",
        selectedBackgroundImage: "back-pressed.png",
        id: "backButton"
    });
    $.__views.__alloyId63.add($.__views.backButton);
    backClicked ? $.addListener($.__views.backButton, "click", backClicked) : __defers["$.__views.backButton!click!backClicked"] = true;
    $.__views.headerLabel = Ti.UI.createLabel({
        backgroundColor: "transparent",
        color: Alloy.Globals.TikklrGreen,
        font: {
            fontSize: "20pt",
            fontFamily: "Substance-ExtraBold"
        },
        height: 35,
        zIndex: 1e3,
        id: "headerLabel",
        text: "BRIEFS"
    });
    $.__views.__alloyId63.add($.__views.headerLabel);
    $.__views.__alloyId64 = Ti.UI.createView({
        backgroundColor: Alloy.Globals.TikklrBlack,
        width: Ti.UI.FILL,
        height: "50",
        top: "40",
        id: "__alloyId64"
    });
    $.__views.briefsView.add($.__views.__alloyId64);
    $.__views.briefBB = Ti.UI.createView({
        color: Alloy.Globals.TikklrGreen,
        left: 0,
        top: 0,
        width: Ti.UI.FILL,
        backgroundColor: "black",
        height: Alloy.Globals.buttonBarHeight,
        layout: "horizontal",
        id: "briefBB"
    });
    $.__views.__alloyId64.add($.__views.briefBB);
    $.__views.latestBt = Ti.UI.createButton({
        width: "106",
        height: Alloy.Globals.buttonBarHeight,
        font: {
            fontFamily: "Substance-ExtraBold",
            fontSize: "15pt"
        },
        color: Alloy.Globals.TikklrGreen,
        left: "0",
        textAlign: "center",
        id: "latestBt",
        title: "LATEST"
    });
    $.__views.briefBB.add($.__views.latestBt);
    $.__views.favesBtn = Ti.UI.createButton({
        width: "106",
        height: Alloy.Globals.buttonBarHeight,
        font: {
            fontFamily: "Substance-ExtraBold",
            fontSize: "15pt"
        },
        color: Alloy.Globals.TikklrGreen,
        left: "0",
        textAlign: "center",
        id: "favesBtn",
        title: "FAVES"
    });
    $.__views.briefBB.add($.__views.favesBtn);
    $.__views.endingBtn = Ti.UI.createButton({
        width: "106",
        height: Alloy.Globals.buttonBarHeight,
        font: {
            fontFamily: "Substance-ExtraBold",
            fontSize: "15pt"
        },
        color: Alloy.Globals.TikklrGreen,
        left: "0",
        textAlign: "center",
        id: "endingBtn",
        title: "ENDING"
    });
    $.__views.briefBB.add($.__views.endingBtn);
    var __alloyId65 = [];
    $.__views.latest = Ti.UI.createView({
        id: "latest"
    });
    __alloyId65.push($.__views.latest);
    $.__views.__alloyId66 = Alloy.createController("brief", {
        LoadGallery: true,
        id: "__alloyId66",
        __parentSymbol: $.__views.latest
    });
    $.__views.__alloyId66.setParent($.__views.latest);
    $.__views.faves = Ti.UI.createView({
        id: "faves"
    });
    __alloyId65.push($.__views.faves);
    $.__views.__alloyId67 = Alloy.createController("brief", {
        loadGallery: false,
        id: "__alloyId67",
        __parentSymbol: $.__views.faves
    });
    $.__views.__alloyId67.setParent($.__views.faves);
    $.__views.ending = Ti.UI.createView({
        id: "ending"
    });
    __alloyId65.push($.__views.ending);
    $.__views.__alloyId68 = Alloy.createController("brief", {
        loadGallery: false,
        id: "__alloyId68",
        __parentSymbol: $.__views.ending
    });
    $.__views.__alloyId68.setParent($.__views.ending);
    $.__views.briefsWindow = Ti.UI.createScrollableView({
        top: "80",
        height: Ti.UI.FILL,
        left: 0,
        orientationModes: [ Ti.UI.PORTRAIT ],
        backgroundColor: "transparent",
        scrollingEnabled: "false",
        showPagingControl: "false",
        views: __alloyId65,
        id: "briefsWindow"
    });
    $.__views.briefsView.add($.__views.briefsWindow);
    exports.destroy = function() {};
    _.extend($, $.__views);
    exports.baseController = "pandaNav";
    $.latestBtn;
    $.setNavigationBar($.briefBB, $.briefsWindow);
    var args = arguments[0] || null;
    if (null != args && "undefined" != typeof args) {
        "undefined" != typeof args.headerTitle && ($.headerLabel.text = args.headerTitle);
        args.showBack || $.backButton.hide();
    }
    exports.clean = function() {
        $.destroy();
        $.off();
    };
    __defers["$.__views.backButton!click!backClicked"] && $.addListener($.__views.backButton, "click", backClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;