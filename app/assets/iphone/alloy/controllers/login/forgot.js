function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function drupalForgot() {
        if ("" != $.email.value) {
            Ti.App.fireEvent("showLoginLoading");
            Alloy.Models.User.forgotPassword($.email.value.toLowerCase());
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "login/forgot";
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
    $.__views.forgotView = Ti.UI.createView({
        top: "0",
        layout: "vertical",
        width: "100%",
        height: "100%",
        id: "forgotView"
    });
    $.__views.forgotView && $.addTopLevelView($.__views.forgotView);
    $.__views.message = Ti.UI.createLabel({
        font: {
            fontSize: "12pt",
            fontFamiliy: "Substance-Medium"
        },
        color: Alloy.Globals.TikklrGreen,
        textAlign: "center",
        id: "message",
        text: "Don’t worry,\nwe haven’t forgotten YOU."
    });
    $.__views.forgotView.add($.__views.message);
    $.__views.__alloyId358 = Ti.UI.createView({
        height: 60,
        backgroundColor: "transparent",
        layout: "horizontal",
        zIndex: 100,
        top: 10,
        id: "__alloyId358"
    });
    $.__views.forgotView.add($.__views.__alloyId358);
    $.__views.email = Ti.UI.createTextField({
        height: "32",
        width: "269",
        top: Alloy.Globals.PaddingTop,
        left: Alloy.Globals.PaddingLeft,
        right: Alloy.Globals.PaddingRight,
        bottom: Alloy.Globals.PaddingBottom,
        backgroundColor: Alloy.Globals.TikklrLoginBlack,
        returnKeyType: Titanium.UI.RETURNKEY_DONE,
        font: {
            fontFamily: "Substance-ExtraBold",
            fontSize: "20pt",
            fontWeight: "bold"
        },
        color: Alloy.Globals.TikklrGreen,
        autocapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
        opacity: .7,
        paddingLeft: 10,
        zIndex: 100,
        keyboardType: Titanium.UI.KEYBOARD_EMAIL,
        id: "email",
        hintText: "EMAIL"
    });
    $.__views.__alloyId358.add($.__views.email);
    $.__views.__alloyId359 = Ti.UI.createView({
        height: 100,
        backgroundColor: "transparent",
        layout: "vertical",
        id: "__alloyId359"
    });
    $.__views.forgotView.add($.__views.__alloyId359);
    $.__views.resetButton = Ti.UI.createButton({
        font: {
            fontFamily: "Substance-ExtraBold",
            fontSize: "20pt"
        },
        color: Alloy.Globals.TikklrGreen,
        textAlign: "center",
        width: Titanium.UI.SIZE,
        id: "resetButton",
        title: "I GIVE UP!\nRESET MY PASSWORD"
    });
    $.__views.__alloyId359.add($.__views.resetButton);
    drupalForgot ? $.addListener($.__views.resetButton, "click", drupalForgot) : __defers["$.__views.resetButton!click!drupalForgot"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var text = "EMAIL";
    var attributedText = Titanium.UI.iOS.createAttributedString({
        text: text,
        attributes: [ {
            type: Titanium.UI.iOS.ATTRIBUTE_BACKGROUND_COLOR,
            value: Alloy.Globals.TikklrBlack,
            range: [ 0, text.length ],
            type: Titanium.UI.iOS.ATTRIBUTE_FOREGROUND_COLOR,
            value: Alloy.Globals.TikklrTextBlack,
            range: [ 0, text.length ]
        } ]
    });
    $.email.attributedHintText = attributedText;
    __defers["$.__views.resetButton!click!drupalForgot"] && $.addListener($.__views.resetButton, "click", drupalForgot);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;