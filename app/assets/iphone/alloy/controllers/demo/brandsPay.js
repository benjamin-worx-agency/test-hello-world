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
    this.__controllerPath = "demo/brandsPay";
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
    $.__views.__alloyId346 = Ti.UI.createView({
        height: "200",
        backgroundColor: "transparent",
        layout: "vertical",
        zIndex: 100,
        id: "__alloyId346"
    });
    $.__views.demoYou.add($.__views.__alloyId346);
    $.__views.__alloyId347 = Ti.UI.createView({
        top: "5",
        width: "156",
        height: "159",
        backgroundImage: "brandsPayDemo.png",
        id: "__alloyId347"
    });
    $.__views.__alloyId346.add($.__views.__alloyId347);
    $.__views.__alloyId348 = Ti.UI.createView({
        height: 60,
        backgroundColor: "transparent",
        layout: "vertical",
        zIndex: 100,
        top: -20,
        id: "__alloyId348"
    });
    $.__views.demoYou.add($.__views.__alloyId348);
    $.__views.__alloyId349 = Ti.UI.createLabel({
        font: {
            fontSize: "14pt",
            fontFamiliy: "Substance-Medium"
        },
        color: Alloy.Globals.TikklrGreen,
        textAlign: "center",
        text: "Get rewarded instantly with\ncash, discount, and free stuff\nfrom your favorite brands",
        id: "__alloyId349"
    });
    $.__views.__alloyId348.add($.__views.__alloyId349);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;