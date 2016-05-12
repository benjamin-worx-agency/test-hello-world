function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "demo/you";
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
    $.__views.demoYou = Ti.UI.createView({
        top: "0",
        layout: "vertical",
        width: "100%",
        height: "100%",
        id: "demoYou"
    });
    $.__views.demoYou && $.addTopLevelView($.__views.demoYou);
    $.__views.__alloyId359 = Ti.UI.createView({
        height: "200",
        backgroundColor: "transparent",
        layout: "vertical",
        zIndex: 100,
        id: "__alloyId359"
    });
    $.__views.demoYou.add($.__views.__alloyId359);
    $.__views.__alloyId360 = Ti.UI.createView({
        top: "5",
        width: "105",
        height: "156",
        backgroundImage: "youDemo.png",
        id: "__alloyId360"
    });
    $.__views.__alloyId359.add($.__views.__alloyId360);
    $.__views.__alloyId361 = Ti.UI.createView({
        height: 60,
        backgroundColor: "transparent",
        layout: "vertical",
        zIndex: 100,
        top: -20,
        id: "__alloyId361"
    });
    $.__views.demoYou.add($.__views.__alloyId361);
    $.__views.__alloyId362 = Ti.UI.createLabel({
        font: {
            fontSize: "14pt",
            fontFamiliy: "Substance-Medium"
        },
        color: Alloy.Globals.TikklrGreen,
        textAlign: "center",
        text: "We all have a story to tell\nabout the brands we love -\nThings that make us smile...",
        id: "__alloyId362"
    });
    $.__views.__alloyId361.add($.__views.__alloyId362);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;