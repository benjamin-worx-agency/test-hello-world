function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function libraryClicked() {
        $.photo.backgroundColor = Alloy.Globals.TikklrCreateBlack;
        $.photoCircle.backgroundColor = Alloy.Globals.TikklrBlack;
        $.video.backgroundColor = Alloy.Globals.TikklrGreen;
        $.videoCircle.backgroundColor = Alloy.Globals.TikklrWhite;
        setTimeout(function() {
            var args = {
                type: type,
                title: title,
                tags: givenTags,
                category: category,
                rewardId: rewardId
            };
            Ti.App.fireEvent("attachWindow", {
                page: "upload",
                arguments: args
            });
        }, 100);
    }
    function cameraClicked() {
        $.photo.backgroundColor = Alloy.Globals.TikklrGreen;
        $.photoCircle.backgroundColor = Alloy.Globals.TikklrWhite;
        $.video.backgroundColor = Alloy.Globals.TikklrCreateBlack;
        $.videoCircle.backgroundColor = Alloy.Globals.TikklrBlack;
        setTimeout(function() {
            var args = {
                type: "capture",
                title: title,
                tags: givenTags,
                category: category,
                rewardId: rewardId
            };
            Ti.App.fireEvent("attachWindow", {
                page: "upload",
                arguments: args
            });
        }, 100);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "create";
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
    $.__views.createView = Ti.UI.createView({
        id: "createView",
        layout: "vertical"
    });
    $.__views.createView && $.addTopLevelView($.__views.createView);
    $.__views.__alloyId82 = Ti.UI.createView({
        top: 0,
        width: Ti.Platform.displayCaps.platformWidth,
        backgroundColor: "transparent",
        height: "40",
        id: "__alloyId82"
    });
    $.__views.createView.add($.__views.__alloyId82);
    $.__views.__alloyId83 = Ti.UI.createButton({
        left: "20",
        width: "40",
        height: "40",
        backgroundColor: "transparent",
        backgroundImage: "back.png",
        selectedBackgroundImage: "back-pressed.png",
        id: "__alloyId83"
    });
    $.__views.__alloyId82.add($.__views.__alloyId83);
    backClicked ? $.addListener($.__views.__alloyId83, "click", backClicked) : __defers["$.__views.__alloyId83!click!backClicked"] = true;
    $.__views.__alloyId84 = Ti.UI.createLabel({
        backgroundColor: "transparent",
        color: Alloy.Globals.TikklrGreen,
        font: {
            fontSize: "20pt",
            fontFamily: "Substance-ExtraBold"
        },
        height: 35,
        zIndex: 1e3,
        text: "CREATE",
        id: "__alloyId84"
    });
    $.__views.__alloyId82.add($.__views.__alloyId84);
    $.__views.photo = Ti.UI.createView({
        height: "240",
        width: "100%",
        backgroundColor: Alloy.Globals.TikklrCreateBlack,
        opacity: .9,
        id: "photo"
    });
    $.__views.createView.add($.__views.photo);
    cameraClicked ? $.addListener($.__views.photo, "click", cameraClicked) : __defers["$.__views.photo!click!cameraClicked"] = true;
    $.__views.photoCircle = Ti.UI.createView({
        width: "140",
        height: "140",
        borderRadius: "35",
        opacity: 1,
        backgroundColor: Alloy.Globals.TikklrCreateInnerBlack,
        id: "photoCircle"
    });
    $.__views.photo.add($.__views.photoCircle);
    $.__views.__alloyId85 = Ti.UI.createView({
        width: "90",
        height: "90",
        backgroundImage: "camera.png",
        id: "__alloyId85"
    });
    $.__views.photo.add($.__views.__alloyId85);
    $.__views.video = Ti.UI.createView({
        height: "240",
        width: "100%",
        backgroundColor: Alloy.Globals.TikklrCreateBlack,
        opacity: .9,
        id: "video",
        top: 5
    });
    $.__views.createView.add($.__views.video);
    libraryClicked ? $.addListener($.__views.video, "click", libraryClicked) : __defers["$.__views.video!click!libraryClicked"] = true;
    $.__views.videoCircle = Ti.UI.createView({
        width: "140",
        height: "140",
        borderRadius: "35",
        opacity: 1,
        backgroundColor: Alloy.Globals.TikklrCreateInnerBlack,
        id: "videoCircle"
    });
    $.__views.video.add($.__views.videoCircle);
    $.__views.__alloyId86 = Ti.UI.createView({
        width: "90",
        height: "90",
        backgroundImage: "film-roll.png",
        id: "__alloyId86"
    });
    $.__views.video.add($.__views.__alloyId86);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var givenTags = "";
    var title = "";
    var type = "library";
    var category = "";
    var rewardId = "";
    args = arguments[0];
    if (null != args && "undefined" != typeof args) {
        "undefined" != typeof args["type"] && (type = args["type"]);
        "undefined" != typeof args["tags"] && (givenTags = args["tags"]);
        "undefined" != typeof args["title"] && (title = args["title"]);
        "undefined" != typeof args["category"] && (category = args["category"]);
        "undefined" != typeof args["rewardId"] && (rewardId = args["rewardId"]);
    }
    exports.clean = function() {
        $.destroy();
        $.off();
    };
    __defers["$.__views.__alloyId83!click!backClicked"] && $.addListener($.__views.__alloyId83, "click", backClicked);
    __defers["$.__views.photo!click!cameraClicked"] && $.addListener($.__views.photo, "click", cameraClicked);
    __defers["$.__views.video!click!libraryClicked"] && $.addListener($.__views.video, "click", libraryClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;