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
    this.__controllerPath = "loading";
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
    $.__views.loginLoading = Ti.UI.createView({
        top: 100,
        layout: "vertical",
        width: "100%",
        height: "100%",
        id: "loginLoading"
    });
    $.__views.loginLoading && $.addTopLevelView($.__views.loginLoading);
    $.__views.__alloyId118 = Ti.UI.createView({
        height: "200",
        backgroundColor: "transparent",
        layout: "vertical",
        zIndex: 100,
        id: "__alloyId118"
    });
    $.__views.loginLoading.add($.__views.__alloyId118);
    $.__views.__alloyId119 = Ti.UI.createView({
        top: "5",
        width: "125",
        height: "182",
        backgroundImage: "youShotBrandsPay.png",
        id: "__alloyId119"
    });
    $.__views.__alloyId118.add($.__views.__alloyId119);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;