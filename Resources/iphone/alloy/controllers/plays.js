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
    this.__controllerPath = "plays";
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
    $.__views.playsView = Ti.UI.createView({
        top: 0,
        left: 0,
        width: Ti.Platform.displayCaps.platformWidth,
        height: "100%",
        orientationModes: [ Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT, Ti.UI.PORTRAIT ],
        id: "playsView"
    });
    $.__views.playsView && $.addTopLevelView($.__views.playsView);
    $.__views.__alloyId138 = Ti.UI.createView({
        top: 0,
        width: Ti.Platform.displayCaps.platformWidth,
        backgroundColor: "transparent",
        height: "40",
        id: "__alloyId138"
    });
    $.__views.playsView.add($.__views.__alloyId138);
    $.__views.__alloyId139 = Ti.UI.createButton({
        left: "20",
        width: "40",
        height: "40",
        backgroundColor: "transparent",
        backgroundImage: "back.png",
        selectedBackgroundImage: "back-pressed.png",
        id: "__alloyId139"
    });
    $.__views.__alloyId138.add($.__views.__alloyId139);
    backClicked ? $.addListener($.__views.__alloyId139, "click", backClicked) : __defers["$.__views.__alloyId139!click!backClicked"] = true;
    $.__views.__alloyId140 = Ti.UI.createLabel({
        backgroundColor: "transparent",
        color: Alloy.Globals.TikklrGreen,
        font: {
            fontSize: "20pt",
            fontFamily: "Substance-ExtraBold"
        },
        height: 35,
        zIndex: 1e3,
        text: "DISCOVER",
        id: "__alloyId140"
    });
    $.__views.__alloyId138.add($.__views.__alloyId140);
    $.__views.__alloyId141 = Ti.UI.createView({
        backgroundColor: Alloy.Globals.TikklrBlack,
        width: Ti.UI.FILL,
        height: "50",
        top: "40",
        id: "__alloyId141"
    });
    $.__views.playsView.add($.__views.__alloyId141);
    $.__views.playsBB = Ti.UI.createView({
        color: Alloy.Globals.TikklrGreen,
        left: 0,
        top: 0,
        width: Ti.UI.FILL,
        backgroundColor: "black",
        height: Alloy.Globals.buttonBarHeight,
        layout: "horizontal",
        id: "playsBB"
    });
    $.__views.__alloyId141.add($.__views.playsBB);
    $.__views.featuredBtn = Ti.UI.createButton({
        width: "106",
        height: Alloy.Globals.buttonBarHeight,
        font: {
            fontFamily: "Substance-ExtraBold",
            fontSize: "15pt"
        },
        color: Alloy.Globals.TikklrGreen,
        left: "0",
        textAlign: "center",
        id: "featuredBtn",
        title: "FEATURED"
    });
    $.__views.playsBB.add($.__views.featuredBtn);
    $.__views.popularBtn = Ti.UI.createButton({
        width: "106",
        height: Alloy.Globals.buttonBarHeight,
        font: {
            fontFamily: "Substance-ExtraBold",
            fontSize: "15pt"
        },
        color: Alloy.Globals.TikklrGreen,
        left: "0",
        textAlign: "center",
        id: "popularBtn",
        title: "LATEST"
    });
    $.__views.playsBB.add($.__views.popularBtn);
    $.__views.browseBtn = Ti.UI.createButton({
        width: "106",
        height: Alloy.Globals.buttonBarHeight,
        font: {
            fontFamily: "Substance-ExtraBold",
            fontSize: "15pt"
        },
        color: Alloy.Globals.TikklrGreen,
        left: "0",
        textAlign: "center",
        id: "browseBtn",
        title: "BROWSE"
    });
    $.__views.playsBB.add($.__views.browseBtn);
    var __alloyId142 = [];
    $.__views.featured = Ti.UI.createView({
        id: "featured"
    });
    __alloyId142.push($.__views.featured);
    $.__views.__alloyId143 = Alloy.createController("featured", {
        loadGallery: true,
        id: "__alloyId143",
        __parentSymbol: $.__views.featured
    });
    $.__views.__alloyId143.setParent($.__views.featured);
    $.__views.popular = Ti.UI.createView({
        id: "popular"
    });
    __alloyId142.push($.__views.popular);
    $.__views.__alloyId144 = Alloy.createController("featured", {
        loadGallery: false,
        id: "__alloyId144",
        __parentSymbol: $.__views.popular
    });
    $.__views.__alloyId144.setParent($.__views.popular);
    $.__views.browse = Ti.UI.createView({
        id: "browse"
    });
    __alloyId142.push($.__views.browse);
    $.__views.__alloyId145 = Alloy.createController("browse", {
        id: "__alloyId145",
        __parentSymbol: $.__views.browse
    });
    $.__views.__alloyId145.setParent($.__views.browse);
    $.__views.playsWindow = Ti.UI.createScrollableView({
        top: "80",
        height: Ti.UI.FILL,
        left: 0,
        orientationModes: [ Ti.UI.PORTRAIT ],
        backgroundColor: "transparent",
        scrollingEnabled: "false",
        showPagingControl: "false",
        views: __alloyId142,
        id: "playsWindow"
    });
    $.__views.playsView.add($.__views.playsWindow);
    exports.destroy = function() {};
    _.extend($, $.__views);
    exports.baseController = "pandaNav";
    $.featuredBtn;
    $.setNavigationBar($.playsBB, $.playsWindow);
    exports.clean = function() {
        $.destroy();
        $.off();
    };
    __defers["$.__views.__alloyId139!click!backClicked"] && $.addListener($.__views.__alloyId139, "click", backClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;