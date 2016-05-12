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
    this.__controllerPath = "error";
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
    $.__views.errorView = Ti.UI.createView({
        id: "errorView"
    });
    $.__views.errorView && $.addTopLevelView($.__views.errorView);
    $.__views.errorText = Ti.UI.createLabel({
        id: "errorText",
        text: "unexpected error!"
    });
    $.__views.errorView.add($.__views.errorText);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || null;
    args && args["error"] && $.errorText.setText(args["error"]);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;