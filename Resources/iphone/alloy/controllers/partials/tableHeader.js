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
    this.__controllerPath = "partials/tableHeader";
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
    $.__views.tableHeader = Ti.UI.createView({
        height: 80,
        width: 320,
        backgroundColor: "black",
        id: "tableHeader"
    });
    $.__views.tableHeader && $.addTopLevelView($.__views.tableHeader);
    $.__views.imageArrow = Ti.UI.createView({
        id: "imageArrow",
        left: 20,
        bottom: 10,
        width: 23,
        height: 60,
        backgroundImage: "https://github.com/appcelerator/titanium_mobile/raw/master/demos/KitchenSink/Resources/images/whiteArrow.png"
    });
    $.__views.tableHeader.add($.__views.imageArrow);
    $.__views.labelStatus = Ti.UI.createLabel({
        bottom: 10,
        left: 60,
        width: 200,
        height: 100,
        color: Alloy.Globals.TikklrGreen,
        id: "labelStatus",
        text: "Release to refresh"
    });
    $.__views.tableHeader.add($.__views.labelStatus);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;