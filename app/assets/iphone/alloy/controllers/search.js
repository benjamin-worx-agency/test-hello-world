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
    this.__controllerPath = "search";
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
    $.__views.searchView = Ti.UI.createView({
        top: 0,
        left: 0,
        width: Ti.Platform.displayCaps.platformWidth,
        height: "100%",
        orientationModes: [ Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT, Ti.UI.PORTRAIT ],
        id: "searchView"
    });
    $.__views.searchView && $.addTopLevelView($.__views.searchView);
    $.__views.__alloyId269 = Ti.UI.createView({
        top: 0,
        width: Ti.Platform.displayCaps.platformWidth,
        backgroundColor: "transparent",
        height: "40",
        id: "__alloyId269"
    });
    $.__views.searchView.add($.__views.__alloyId269);
    $.__views.__alloyId270 = Ti.UI.createButton({
        left: "20",
        width: "40",
        height: "40",
        backgroundColor: "transparent",
        backgroundImage: "back.png",
        selectedBackgroundImage: "back-pressed.png",
        id: "__alloyId270"
    });
    $.__views.__alloyId269.add($.__views.__alloyId270);
    backClicked ? $.addListener($.__views.__alloyId270, "click", backClicked) : __defers["$.__views.__alloyId270!click!backClicked"] = true;
    $.__views.__alloyId271 = Ti.UI.createLabel({
        backgroundColor: "transparent",
        color: Alloy.Globals.TikklrGreen,
        font: {
            fontSize: "20pt",
            fontFamily: "Substance-ExtraBold"
        },
        height: 35,
        zIndex: 1e3,
        text: "SEARCH",
        id: "__alloyId271"
    });
    $.__views.__alloyId269.add($.__views.__alloyId271);
    $.__views.bb1 = Ti.UI.createView({
        color: Alloy.Globals.TikklrGreen,
        left: 0,
        top: "40",
        width: Ti.UI.FILL,
        backgroundColor: "black",
        height: Alloy.Globals.buttonBarHeight,
        layout: "horizontal",
        id: "bb1"
    });
    $.__views.searchView.add($.__views.bb1);
    $.__views.hashBtn = Ti.UI.createButton({
        width: "106",
        height: Alloy.Globals.buttonBarHeight,
        font: {
            fontFamily: "Substance-ExtraBold",
            fontSize: "15pt"
        },
        color: Alloy.Globals.TikklrGreen,
        left: "0",
        textAlign: "center",
        title: "",
        id: "hashBtn"
    });
    $.__views.bb1.add($.__views.hashBtn);
    $.__views.hashBtnIcon = Ti.UI.createView({
        width: "60",
        height: "60",
        id: "hashBtnIcon",
        backgroundImage: "search-eye-white.png"
    });
    $.__views.hashBtn.add($.__views.hashBtnIcon);
    $.__views.peopleBtn = Ti.UI.createButton({
        width: "106",
        height: Alloy.Globals.buttonBarHeight,
        font: {
            fontFamily: "Substance-ExtraBold",
            fontSize: "15pt"
        },
        color: Alloy.Globals.TikklrGreen,
        left: "0",
        textAlign: "center",
        title: "",
        id: "peopleBtn"
    });
    $.__views.bb1.add($.__views.peopleBtn);
    $.__views.peopleBtnIcon = Ti.UI.createView({
        width: "40",
        height: "40",
        id: "peopleBtnIcon",
        backgroundImage: "search-profile.png"
    });
    $.__views.peopleBtn.add($.__views.peopleBtnIcon);
    $.__views.briefBtn = Ti.UI.createButton({
        width: "106",
        height: Alloy.Globals.buttonBarHeight,
        font: {
            fontFamily: "Substance-ExtraBold",
            fontSize: "15pt"
        },
        color: Alloy.Globals.TikklrGreen,
        left: "0",
        textAlign: "center",
        title: "",
        id: "briefBtn"
    });
    $.__views.bb1.add($.__views.briefBtn);
    $.__views.briefBtnIcon = Ti.UI.createView({
        width: "40",
        height: "40",
        id: "briefBtnIcon",
        backgroundImage: "search-brief.png"
    });
    $.__views.briefBtn.add($.__views.briefBtnIcon);
    var __alloyId272 = [];
    $.__views.hashSearch = Ti.UI.createView({
        id: "hashSearch"
    });
    __alloyId272.push($.__views.hashSearch);
    $.__views.__alloyId273 = Alloy.createController("search/hash", {
        id: "__alloyId273",
        __parentSymbol: $.__views.hashSearch
    });
    $.__views.__alloyId273.setParent($.__views.hashSearch);
    $.__views.peopleSearch = Ti.UI.createView({
        id: "peopleSearch"
    });
    __alloyId272.push($.__views.peopleSearch);
    $.__views.__alloyId274 = Alloy.createController("search/people", {
        loadGallery: false,
        id: "__alloyId274",
        __parentSymbol: $.__views.peopleSearch
    });
    $.__views.__alloyId274.setParent($.__views.peopleSearch);
    $.__views.briefsSearch = Ti.UI.createView({
        id: "briefsSearch"
    });
    __alloyId272.push($.__views.briefsSearch);
    $.__views.__alloyId275 = Alloy.createController("search/brief", {
        loadGallery: false,
        id: "__alloyId275",
        __parentSymbol: $.__views.briefsSearch
    });
    $.__views.__alloyId275.setParent($.__views.briefsSearch);
    $.__views.searchWindow = Ti.UI.createScrollableView({
        top: "80",
        height: Ti.UI.FILL,
        left: 0,
        orientationModes: [ Ti.UI.PORTRAIT ],
        backgroundColor: "transparent",
        scrollingEnabled: "false",
        showPagingControl: "false",
        views: __alloyId272,
        id: "searchWindow"
    });
    $.__views.searchView.add($.__views.searchWindow);
    exports.destroy = function() {};
    _.extend($, $.__views);
    exports.baseController = "pandaNav";
    $.hashBtn;
    $.setNavigationBar($.bb1, $.searchWindow);
    exports.clean = function() {
        $.destroy();
        $.off();
        $ = null;
    };
    __defers["$.__views.__alloyId270!click!backClicked"] && $.addListener($.__views.__alloyId270, "click", backClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;