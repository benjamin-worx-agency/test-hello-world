function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function drupalRegister() {
        var email = $.email.value;
        var emailValid = "" != email && validateEmail(email);
        var termsClicked = 0 != $.termsSwitch.value;
        if (emailValid && termsClicked) {
            Ti.App.fireEvent("showLoginLoading");
            Alloy.Models.User.register(email.toLowerCase(), email.toLowerCase());
        } else {
            var message = "Please make sure to ";
            emailValid || (message += "enter a valid email adress");
            if (!termsClicked) {
                emailValid || (message += " and ");
                message += "accept Tikklr terms of use";
            }
            alert(message);
        }
    }
    function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    function termsClicked() {
        Titanium.Platform.openURL("http://company.tikklr.com/terms");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "login/register";
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
    $.__views.registerView = Ti.UI.createView({
        top: "0",
        layout: "vertical",
        width: "100%",
        height: "100%",
        id: "registerView"
    });
    $.__views.registerView && $.addTopLevelView($.__views.registerView);
    $.__views.message = Ti.UI.createLabel({
        font: {
            fontSize: "12pt",
            fontFamiliy: "Substance-Medium"
        },
        color: Alloy.Globals.TikklrGreen,
        textAlign: "center",
        id: "message",
        text: "create your account"
    });
    $.__views.registerView.add($.__views.message);
    $.__views.__alloyId361 = Ti.UI.createView({
        height: 60,
        backgroundColor: "transparent",
        layout: "horizontal",
        zIndex: 100,
        id: "__alloyId361"
    });
    $.__views.registerView.add($.__views.__alloyId361);
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
        id: "email",
        hintText: "EMAIL"
    });
    $.__views.__alloyId361.add($.__views.email);
    $.__views.__alloyId362 = Ti.UI.createView({
        height: 60,
        backgroundColor: "transparent",
        layout: "horizontal",
        zIndex: 100,
        id: "__alloyId362"
    });
    $.__views.registerView.add($.__views.__alloyId362);
    $.__views.__alloyId363 = Ti.UI.createView({
        left: 25,
        layout: "horizontal",
        id: "__alloyId363"
    });
    $.__views.__alloyId362.add($.__views.__alloyId363);
    $.__views.__alloyId364 = Ti.UI.createLabel({
        font: {
            fontSize: "12pt",
            fontFamiliy: "Substance-Medium"
        },
        color: Alloy.Globals.TikklrGreen,
        textAlign: "center",
        text: "I agree to terms of use",
        id: "__alloyId364"
    });
    $.__views.__alloyId363.add($.__views.__alloyId364);
    termsClicked ? $.addListener($.__views.__alloyId364, "singletap", termsClicked) : __defers["$.__views.__alloyId364!singletap!termsClicked"] = true;
    $.__views.termsSwitch = Ti.UI.createSwitch({
        left: "65",
        onTint: Alloy.Globals.TikklrGreen,
        value: false,
        id: "termsSwitch"
    });
    $.__views.__alloyId363.add($.__views.termsSwitch);
    $.__views.__alloyId365 = Ti.UI.createView({
        height: 100,
        backgroundColor: "transparent",
        layout: "vertical",
        id: "__alloyId365"
    });
    $.__views.registerView.add($.__views.__alloyId365);
    $.__views.loginTerms = Ti.UI.createLabel({
        textAlign: "center",
        width: Titanium.UI.SIZE,
        font: {
            fontSize: "10pt",
            fontFamily: "Substance"
        },
        color: Alloy.Globals.TikklrDarkGray,
        id: "loginTerms",
        text: "By registering with Tikklr.com\nyou are hereby agreeing\nto our"
    });
    $.__views.__alloyId365.add($.__views.loginTerms);
    $.__views.loginTermsLink = Ti.UI.createLabel({
        textAlign: "center",
        width: Titanium.UI.SIZE,
        font: {
            fontSize: "10pt",
            fontFamily: "Substance"
        },
        color: Alloy.Globals.TikklrGreen,
        id: "loginTermsLink",
        text: "Terms and Privacy policy."
    });
    $.__views.__alloyId365.add($.__views.loginTermsLink);
    termsClicked ? $.addListener($.__views.loginTermsLink, "singletap", termsClicked) : __defers["$.__views.loginTermsLink!singletap!termsClicked"] = true;
    $.__views.__alloyId366 = Ti.UI.createView({
        height: 60,
        backgroundColor: "transparent",
        layout: "vertical",
        zIndex: 100,
        top: -15,
        id: "__alloyId366"
    });
    $.__views.registerView.add($.__views.__alloyId366);
    $.__views.registerButton = Ti.UI.createButton({
        font: {
            fontFamily: "Substance-ExtraBold",
            fontSize: "20pt"
        },
        color: Alloy.Globals.TikklrGreen,
        title: "SIGN UP",
        id: "registerButton"
    });
    $.__views.__alloyId366.add($.__views.registerButton);
    drupalRegister ? $.addListener($.__views.registerButton, "singletap", drupalRegister) : __defers["$.__views.registerButton!singletap!drupalRegister"] = true;
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
    __defers["$.__views.__alloyId364!singletap!termsClicked"] && $.addListener($.__views.__alloyId364, "singletap", termsClicked);
    __defers["$.__views.loginTermsLink!singletap!termsClicked"] && $.addListener($.__views.loginTermsLink, "singletap", termsClicked);
    __defers["$.__views.registerButton!singletap!drupalRegister"] && $.addListener($.__views.registerButton, "singletap", drupalRegister);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;