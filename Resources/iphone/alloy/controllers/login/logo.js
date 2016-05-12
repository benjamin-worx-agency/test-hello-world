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
    this.__controllerPath = "login/logo";
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
    $.__views.logo = Ti.UI.createView({
        height: "32%",
        backgroundColor: "transparent",
        layout: "horizontal",
        zIndex: 100,
        id: "logo"
    });
    $.__views.logo && $.addTopLevelView($.__views.logo);
    $.__views.tikklrLogoView = Ti.UI.createView({
        layout: "vertical",
        id: "tikklrLogoView"
    });
    $.__views.logo.add($.__views.tikklrLogoView);
    $.__views.__alloyId365 = Ti.UI.createView({
        top: "120",
        width: "155",
        height: "50",
        backgroundImage: "logoTikklrTransparent.png",
        id: "__alloyId365"
    });
    $.__views.tikklrLogoView.add($.__views.__alloyId365);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;