function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function settingsBlur(e) {
        $.saveButton.setTouchEnabled(true);
        Alloy.Models.User.set(e.source.bind, e.value);
    }
    function logout() {
        Ti.App.fireEvent("attachWindow", {
            page: "login"
        });
        Ti.App.fireEvent("logout");
    }
    function saveUser() {
        Alloy.Models.User.set("group_access", null);
        Ti.App.fireEvent("loading", {
            message: "Saving..."
        });
        var attributes = {};
        attributes["name"] = $.name.value;
        var updatedUser = Alloy.createModel("User", attributes);
        Ti.API.info("saving: " + JSON.stringify(updatedUser));
        Alloy.Models.User.save(attributes, {
            success: function() {
                Ti.API.log("Saving user is a success");
                Alloy.Models.User.fetch({
                    success: function() {
                        Ti.App.fireEvent("stopLoading");
                    }
                });
            }
        });
    }
    function gotoUrl(e) {
        "EDIT PROFILE" == e.source.title && (e.source.url = "http://www.tikklr.com/user/" + Alloy.Models.User.uid + "/edit-profile");
        "undefined" != typeof e.source.url && Ti.Platform.openURL(e.source.url);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "settings";
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
    $.User = Alloy.createModel("User");
    $.__views.menuWin = Ti.UI.createView({
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        orientationModes: [ Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT, Ti.UI.PORTRAIT ],
        backgroundColor: Alloy.Globals.TikklrGray,
        color: "#ffe700",
        navBarHidden: false,
        layout: "vertical",
        id: "menuWin",
        backgroundImage: "tikklrBackgroundLite.png"
    });
    $.__views.menuWin && $.addTopLevelView($.__views.menuWin);
    $.__views.__alloyId281 = Ti.UI.createView({
        height: "40",
        font: {
            fontFamily: "Substance-ExtraBold",
            fontSize: "30pt"
        },
        color: Alloy.Globals.TikklrSettingsText,
        id: "__alloyId281"
    });
    $.__views.menuWin.add($.__views.__alloyId281);
    $.__views.__alloyId282 = Ti.UI.createButton({
        left: "20",
        width: "40",
        height: "40",
        backgroundColor: "transparent",
        backgroundImage: "back.png",
        selectedBackgroundImage: "back-pressed.png",
        id: "__alloyId282"
    });
    $.__views.__alloyId281.add($.__views.__alloyId282);
    backClicked ? $.addListener($.__views.__alloyId282, "click", backClicked) : __defers["$.__views.__alloyId282!click!backClicked"] = true;
    $.__views.__alloyId283 = Ti.UI.createLabel({
        font: {
            fontFamily: "Substance-ExtraBold",
            fontSize: "25pt"
        },
        color: Alloy.Globals.TikklrSettingsText,
        text: "SETTINGS",
        id: "__alloyId283"
    });
    $.__views.__alloyId281.add($.__views.__alloyId283);
    $.__views.saveButton = Ti.UI.createButton({
        top: 0,
        right: "20",
        textAlign: "center",
        width: "50",
        height: "40",
        font: {
            fontFamily: "Substance-ExtraBold",
            fontSize: "10pt"
        },
        backgroundColor: Alloy.Globals.TikklrGreen,
        color: Alloy.Globals.TikklrSettingsText,
        backgroundDisabledColor: Alloy.Globals.TikklrGray,
        id: "saveButton",
        title: "SAVE"
    });
    $.__views.__alloyId281.add($.__views.saveButton);
    saveUser ? $.addListener($.__views.saveButton, "click", saveUser) : __defers["$.__views.saveButton!click!saveUser"] = true;
    var __alloyId285 = [];
    $.__views.__alloyId286 = Ti.UI.createTableViewRow({
        paddingRight: "10",
        right: "10",
        left: "2",
        font: {
            fontFamily: "Substance-Regular",
            fontSize: "15pt"
        },
        backgroundColor: "transparent",
        id: "__alloyId286"
    });
    __alloyId285.push($.__views.__alloyId286);
    $.__views.__alloyId287 = Ti.UI.createLabel({
        color: Alloy.Globals.TikklrGreen,
        font: {
            fontFamily: "Substance-ExtraBold",
            fontSize: "20pt"
        },
        backgroundColor: "transparent",
        text: "ACCOUNT DETAILS",
        id: "__alloyId287"
    });
    $.__views.__alloyId286.add($.__views.__alloyId287);
    $.__views.__alloyId288 = Ti.UI.createTableViewRow({
        paddingRight: "10",
        right: "10",
        left: "2",
        font: {
            fontFamily: "Substance-Regular",
            fontSize: "15pt"
        },
        color: Alloy.Globals.TikklrTextGray,
        backgroundColor: "transparent",
        title: "Username",
        id: "__alloyId288"
    });
    __alloyId285.push($.__views.__alloyId288);
    $.__views.name = Ti.UI.createTextField({
        height: "21",
        width: "175",
        top: Alloy.Globals.PaddingTop,
        left: "100",
        right: Alloy.Globals.PaddingRight,
        bottom: Alloy.Globals.PaddingBottom,
        returnKeyType: Titanium.UI.RETURNKEY_DONE,
        font: {
            fontFamily: "Substance-Bold",
            fontSize: "15pt"
        },
        color: Alloy.Globals.TikklrSettingsText,
        autocapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
        paddingLeft: 10,
        zIndex: 1e3,
        id: "name",
        bind: "name",
        hintText: "add text"
    });
    $.__views.__alloyId288.add($.__views.name);
    settingsBlur ? $.addListener($.__views.name, "blur", settingsBlur) : __defers["$.__views.name!blur!settingsBlur"] = true;
    $.__views.__alloyId289 = Ti.UI.createTableViewRow({
        paddingRight: "10",
        right: "10",
        left: "2",
        font: {
            fontFamily: "Substance-Regular",
            fontSize: "15pt"
        },
        color: Alloy.Globals.TikklrTextGray,
        backgroundColor: "transparent",
        title: "Email",
        id: "__alloyId289"
    });
    __alloyId285.push($.__views.__alloyId289);
    $.__views.mail = Ti.UI.createLabel({
        height: "21",
        width: "175",
        top: Alloy.Globals.PaddingTop,
        left: "100",
        right: Alloy.Globals.PaddingRight,
        bottom: Alloy.Globals.PaddingBottom,
        returnKeyType: Titanium.UI.RETURNKEY_DONE,
        font: {
            fontFamily: "Substance-Bold",
            fontSize: "15pt"
        },
        color: Alloy.Globals.TikklrSettingsText,
        autocapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
        paddingLeft: 10,
        zIndex: 1e3,
        id: "mail",
        bind: "mail"
    });
    $.__views.__alloyId289.add($.__views.mail);
    $.__views.__alloyId290 = Ti.UI.createTableViewRow({
        paddingRight: "10",
        right: "10",
        left: "2",
        font: {
            fontFamily: "Substance-Regular",
            fontSize: "15pt"
        },
        color: Alloy.Globals.TikklrTextGray,
        backgroundColor: "transparent",
        title: "First name",
        id: "__alloyId290"
    });
    __alloyId285.push($.__views.__alloyId290);
    $.__views.firstName = Ti.UI.createLabel({
        height: "21",
        width: "175",
        top: Alloy.Globals.PaddingTop,
        left: "100",
        right: Alloy.Globals.PaddingRight,
        bottom: Alloy.Globals.PaddingBottom,
        returnKeyType: Titanium.UI.RETURNKEY_DONE,
        font: {
            fontFamily: "Substance-Bold",
            fontSize: "15pt"
        },
        color: Alloy.Globals.TikklrSettingsText,
        autocapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
        paddingLeft: 10,
        zIndex: 1e3,
        id: "firstName",
        bind: "field_name_first"
    });
    $.__views.__alloyId290.add($.__views.firstName);
    $.__views.__alloyId291 = Ti.UI.createTableViewRow({
        paddingRight: "10",
        right: "10",
        left: "2",
        font: {
            fontFamily: "Substance-Regular",
            fontSize: "15pt"
        },
        color: Alloy.Globals.TikklrTextGray,
        backgroundColor: "transparent",
        title: "Surname",
        id: "__alloyId291"
    });
    __alloyId285.push($.__views.__alloyId291);
    $.__views.lastName = Ti.UI.createLabel({
        height: "21",
        width: "175",
        top: Alloy.Globals.PaddingTop,
        left: "100",
        right: Alloy.Globals.PaddingRight,
        bottom: Alloy.Globals.PaddingBottom,
        returnKeyType: Titanium.UI.RETURNKEY_DONE,
        font: {
            fontFamily: "Substance-Bold",
            fontSize: "15pt"
        },
        color: Alloy.Globals.TikklrSettingsText,
        autocapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
        paddingLeft: 10,
        zIndex: 1e3,
        id: "lastName",
        bind: "field_name_last"
    });
    $.__views.__alloyId291.add($.__views.lastName);
    $.__views.__alloyId292 = Ti.UI.createTableViewRow({
        paddingRight: "10",
        right: "10",
        left: "2",
        font: {
            fontFamily: "Substance-Regular",
            fontSize: "15pt"
        },
        color: Alloy.Globals.TikklrTextGray,
        backgroundColor: "transparent",
        title: "Location",
        id: "__alloyId292"
    });
    __alloyId285.push($.__views.__alloyId292);
    $.__views.location = Ti.UI.createLabel({
        height: "21",
        width: "175",
        top: Alloy.Globals.PaddingTop,
        left: "100",
        right: Alloy.Globals.PaddingRight,
        bottom: Alloy.Globals.PaddingBottom,
        returnKeyType: Titanium.UI.RETURNKEY_DONE,
        font: {
            fontFamily: "Substance-Bold",
            fontSize: "15pt"
        },
        color: Alloy.Globals.TikklrSettingsText,
        autocapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
        paddingLeft: 10,
        zIndex: 1e3,
        id: "location",
        bind: "field_tikklr_location"
    });
    $.__views.__alloyId292.add($.__views.location);
    $.__views.__alloyId293 = Ti.UI.createTableViewRow({
        paddingRight: "10",
        right: "10",
        left: "2",
        font: {
            fontFamily: "Substance-Regular",
            fontSize: "15pt"
        },
        backgroundColor: "transparent",
        visible: false,
        id: "__alloyId293"
    });
    __alloyId285.push($.__views.__alloyId293);
    $.__views.__alloyId294 = Ti.UI.createLabel({
        color: Alloy.Globals.TikklrGreen,
        font: {
            fontFamily: "Substance-ExtraBold",
            fontSize: "20pt"
        },
        backgroundColor: "transparent",
        text: "",
        id: "__alloyId294"
    });
    $.__views.__alloyId293.add($.__views.__alloyId294);
    $.__views.__alloyId295 = Ti.UI.createTableViewRow({
        id: "__alloyId295"
    });
    __alloyId285.push($.__views.__alloyId295);
    $.__views.__alloyId296 = Ti.UI.createButton({
        width: Ti.UI.FILL,
        height: "50",
        backgroundColor: Alloy.Globals.TikklrDarkGray,
        color: Alloy.Globals.TikklrSettingsText,
        title: "SIGN OUT",
        id: "__alloyId296"
    });
    $.__views.__alloyId295.add($.__views.__alloyId296);
    logout ? $.addListener($.__views.__alloyId296, "click", logout) : __defers["$.__views.__alloyId296!click!logout"] = true;
    $.__views.__alloyId298 = Ti.UI.createView({
        height: "30",
        backgroundColor: "transparent",
        layout: "vertical",
        id: "__alloyId298"
    });
    $.__views.__alloyId299 = Ti.UI.createLabel({
        color: Alloy.Globals.TikklrGreen,
        font: {
            fontFamily: "Substance-ExtraBold",
            fontSize: "20pt"
        },
        backgroundColor: "transparent",
        text: "",
        id: "__alloyId299"
    });
    $.__views.__alloyId298.add($.__views.__alloyId299);
    $.__views.sectionEditProfile = Ti.UI.createTableViewSection({
        headerView: $.__views.__alloyId298,
        id: "sectionEditProfile"
    });
    __alloyId285.push($.__views.sectionEditProfile);
    $.__views.__alloyId300 = Ti.UI.createTableViewRow({
        id: "__alloyId300"
    });
    $.__views.sectionEditProfile.add($.__views.__alloyId300);
    $.__views.__alloyId301 = Ti.UI.createButton({
        width: Ti.UI.FILL,
        height: "50",
        backgroundColor: Alloy.Globals.TikklrGreen,
        color: "white",
        url: "",
        title: "EDIT PROFILE",
        id: "__alloyId301"
    });
    $.__views.__alloyId300.add($.__views.__alloyId301);
    gotoUrl ? $.addListener($.__views.__alloyId301, "click", gotoUrl) : __defers["$.__views.__alloyId301!click!gotoUrl"] = true;
    $.__views.__alloyId303 = Ti.UI.createView({
        height: "30",
        backgroundColor: "transparent",
        layout: "vertical",
        id: "__alloyId303"
    });
    $.__views.__alloyId304 = Ti.UI.createLabel({
        color: Alloy.Globals.TikklrGreen,
        font: {
            fontFamily: "Substance-ExtraBold",
            fontSize: "20pt"
        },
        backgroundColor: "transparent",
        text: "",
        id: "__alloyId304"
    });
    $.__views.__alloyId303.add($.__views.__alloyId304);
    $.__views.sectionDelete = Ti.UI.createTableViewSection({
        headerView: $.__views.__alloyId303,
        id: "sectionDelete"
    });
    __alloyId285.push($.__views.sectionDelete);
    $.__views.__alloyId305 = Ti.UI.createTableViewRow({
        id: "__alloyId305"
    });
    $.__views.sectionDelete.add($.__views.__alloyId305);
    $.__views.__alloyId306 = Ti.UI.createButton({
        width: Ti.UI.FILL,
        height: "50",
        backgroundColor: Alloy.Globals.TikklrGreen,
        color: "white",
        url: "https://tikklr.freshdesk.com",
        title: "GET HELP",
        id: "__alloyId306"
    });
    $.__views.__alloyId305.add($.__views.__alloyId306);
    gotoUrl ? $.addListener($.__views.__alloyId306, "click", gotoUrl) : __defers["$.__views.__alloyId306!click!gotoUrl"] = true;
    $.__views.__alloyId308 = Ti.UI.createView({
        height: "30",
        backgroundColor: "transparent",
        layout: "vertical",
        id: "__alloyId308"
    });
    $.__views.__alloyId309 = Ti.UI.createLabel({
        color: Alloy.Globals.TikklrGreen,
        font: {
            fontFamily: "Substance-ExtraBold",
            fontSize: "20pt"
        },
        backgroundColor: "transparent",
        text: "",
        id: "__alloyId309"
    });
    $.__views.__alloyId308.add($.__views.__alloyId309);
    $.__views.sectionDelete = Ti.UI.createTableViewSection({
        headerView: $.__views.__alloyId308,
        id: "sectionDelete"
    });
    __alloyId285.push($.__views.sectionDelete);
    $.__views.__alloyId310 = Ti.UI.createTableViewRow({
        id: "__alloyId310"
    });
    $.__views.sectionDelete.add($.__views.__alloyId310);
    $.__views.__alloyId311 = Ti.UI.createButton({
        width: Ti.UI.FILL,
        height: "50",
        backgroundColor: Alloy.Globals.TikklrGreen,
        color: "white",
        url: "http://company.tikklr.com/terms/",
        title: "TERMS",
        id: "__alloyId311"
    });
    $.__views.__alloyId310.add($.__views.__alloyId311);
    gotoUrl ? $.addListener($.__views.__alloyId311, "click", gotoUrl) : __defers["$.__views.__alloyId311!click!gotoUrl"] = true;
    $.__views.__alloyId313 = Ti.UI.createView({
        height: "30",
        backgroundColor: "transparent",
        layout: "vertical",
        id: "__alloyId313"
    });
    $.__views.__alloyId314 = Ti.UI.createLabel({
        color: Alloy.Globals.TikklrGreen,
        font: {
            fontFamily: "Substance-ExtraBold",
            fontSize: "20pt"
        },
        backgroundColor: "transparent",
        text: "",
        id: "__alloyId314"
    });
    $.__views.__alloyId313.add($.__views.__alloyId314);
    $.__views.sectionDelete = Ti.UI.createTableViewSection({
        headerView: $.__views.__alloyId313,
        id: "sectionDelete"
    });
    __alloyId285.push($.__views.sectionDelete);
    $.__views.__alloyId315 = Ti.UI.createTableViewRow({
        id: "__alloyId315"
    });
    $.__views.sectionDelete.add($.__views.__alloyId315);
    $.__views.__alloyId316 = Ti.UI.createButton({
        width: Ti.UI.FILL,
        height: "50",
        backgroundColor: Alloy.Globals.TikklrGreen,
        color: "white",
        url: "http://company.tikklr.com/privacy",
        title: "PRIVACY",
        id: "__alloyId316"
    });
    $.__views.__alloyId315.add($.__views.__alloyId316);
    gotoUrl ? $.addListener($.__views.__alloyId316, "click", gotoUrl) : __defers["$.__views.__alloyId316!click!gotoUrl"] = true;
    $.__views.__alloyId284 = Ti.UI.createTableView({
        allowsSelection: false,
        top: Alloy.Globals.PaddingTop,
        left: "10",
        bottom: Alloy.Globals.PaddingBottom,
        paddingRight: "20",
        right: "10",
        showVerticalScrollIndicator: false,
        separatorStyle: "none",
        data: __alloyId285,
        backgroundColor: "white",
        opacity: 1,
        id: "__alloyId284"
    });
    $.__views.menuWin.add($.__views.__alloyId284);
    var __alloyId317 = function() {
        var transformed = _.isFunction($.User.transform) ? $.User.transform() : $.User.toJSON();
        $.name.value = _.template("{m.name}", {
            m: transformed
        }, {
            interpolate: /\{([\s\S]+?)\}/g
        });
        $.mail.text = _.template("{m.mail}", {
            m: transformed
        }, {
            interpolate: /\{([\s\S]+?)\}/g
        });
        $.firstName.text = _.template("{m.firstName}", {
            m: transformed
        }, {
            interpolate: /\{([\s\S]+?)\}/g
        });
        $.lastName.text = _.template("{m.lastName}", {
            m: transformed
        }, {
            interpolate: /\{([\s\S]+?)\}/g
        });
        $.location.text = _.template("{m.location}", {
            m: transformed
        }, {
            interpolate: /\{([\s\S]+?)\}/g
        });
    };
    $.User.on("fetch change destroy", __alloyId317);
    exports.destroy = function() {
        $.User && $.User.off("fetch change destroy", __alloyId317);
    };
    _.extend($, $.__views);
    $.saveButton.setTouchEnabled(true);
    $.name.value = Alloy.Models.User.get("name");
    $.mail.text = Alloy.Models.User.get("mail") ? "   " + Alloy.Models.User.get("mail") : "   " + Alloy.Models.User.get("name");
    $.firstName.text = "   " + Alloy.Models.User.getDrupalFieldValue("field_name_first");
    $.lastName.text = "   " + Alloy.Models.User.getDrupalFieldValue("field_name_last");
    "undefined" != typeof Alloy.Models.User.get("field_tikklr_location") && "undefined" != typeof Alloy.Models.User.get("field_tikklr_location").und && ($.location.text = "   " + Alloy.Models.User.get("field_tikklr_location").und[0].country);
    exports.clean = function() {
        $.destroy();
        $.off();
    };
    __defers["$.__views.__alloyId282!click!backClicked"] && $.addListener($.__views.__alloyId282, "click", backClicked);
    __defers["$.__views.saveButton!click!saveUser"] && $.addListener($.__views.saveButton, "click", saveUser);
    __defers["$.__views.name!blur!settingsBlur"] && $.addListener($.__views.name, "blur", settingsBlur);
    __defers["$.__views.__alloyId296!click!logout"] && $.addListener($.__views.__alloyId296, "click", logout);
    __defers["$.__views.__alloyId301!click!gotoUrl"] && $.addListener($.__views.__alloyId301, "click", gotoUrl);
    __defers["$.__views.__alloyId306!click!gotoUrl"] && $.addListener($.__views.__alloyId306, "click", gotoUrl);
    __defers["$.__views.__alloyId311!click!gotoUrl"] && $.addListener($.__views.__alloyId311, "click", gotoUrl);
    __defers["$.__views.__alloyId316!click!gotoUrl"] && $.addListener($.__views.__alloyId316, "click", gotoUrl);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;