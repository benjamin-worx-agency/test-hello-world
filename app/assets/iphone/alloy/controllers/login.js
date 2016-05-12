function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function showLoginLoading() {
        $.loginScroll.hide();
        $.forgotPassView.hide();
        $.registerView.hide();
        $.loginLoading.show();
    }
    function hideLoginLoading() {
        $.loginLoading.hide();
    }
    function showLoginScroll() {
        $.loginScroll.show();
    }
    function clearTokens() {
        Alloy.Globals.ks = null;
        Ti.App.Properties.setString(Alloy.Globals.Properties.Session, "");
        Ti.App.Properties.setString(Alloy.Globals.Properties.Token, "");
        Alloy.Models.User.config.headers["X-CSRF-TOKEN"] = null;
        Alloy.Models.User.config.headers["Cookie"] = null;
    }
    function setCollectionModelConfigs() {
        for (var i in Alloy.Collections) if (null != Alloy.Collections[i] && "object" == typeof Alloy.Collections[i] && "undefined" != typeof Alloy.Collections[i].config && "undefined" != typeof Alloy.Collections[i].config.headers) {
            Alloy.Collections[i].config.headers["X-CSRF-TOKEN"] = Titanium.App.Properties.getString(Alloy.Globals.Properties.Token);
            Alloy.Collections[i].config.headers["Cookie"] = Titanium.App.Properties.getString(Alloy.Globals.Properties.Session);
        }
        for (var i in Alloy.Models) if (null != Alloy.Models[i] && "object" == typeof Alloy.Models[i] && "undefined" != typeof Alloy.Models[i].config && "undefined" != typeof Alloy.Models[i].config.headers) {
            Alloy.Models[i].config.headers["X-CSRF-TOKEN"] = Titanium.App.Properties.getString(Alloy.Globals.Properties.Token);
            Alloy.Models[i].config.headers["Cookie"] = Titanium.App.Properties.getString(Alloy.Globals.Properties.Session);
        }
        for (var i in Alloy.Globals) if (null != Alloy.Globals[i] && "object" == typeof Alloy.Globals[i] && "undefined" != typeof Alloy.Globals[i].config && "undefined" != typeof Alloy.Globals[i].config.headers) {
            Alloy.Globals[i].config.headers["X-CSRF-TOKEN"] = Titanium.App.Properties.getString(Alloy.Globals.Properties.Token);
            Alloy.Globals[i].config.headers["Cookie"] = Titanium.App.Properties.getString(Alloy.Globals.Properties.Session);
        }
    }
    function drupalGetToken() {
        Ti.API.info("In getToken ");
        Alloy.Models.User.getToken();
    }
    function showRegisterView() {
        $.username.blur();
        $.password.blur();
        demoPagesViews = $.loginScroll.getViews();
        $.loginScroll.setViews([ $.loginView, $.registerView ]);
        $.registerView.show();
        $.loginScroll.scrollToView(1);
    }
    function isLoggedIn() {
        showLoginLoading();
        Alloy.Models.User.isLoggedIn();
    }
    function kalturaSessionStart(userId) {
        if (Ti.Network.getOnline()) {
            var url = Alloy.Models.KalturaAPIUrl + "?service=session&action=start";
            var client = Ti.Network.createHTTPClient({
                onload: function() {
                    var xml = this.responseText;
                    if (xml) {
                        var xmldata = Ti.XML.parseString(xml);
                        Alloy.Globals.ks = xmldata.getElementsByTagName("result").item(0).text;
                        Ti.API.info(xmldata.getElementsByTagName("result").item(0).text);
                    }
                },
                onerror: function() {
                    Ti.App.fireEvent("triggerError", {
                        message: "Kaltura Login Error"
                    });
                    hideLoginLoading();
                    showLoginScroll();
                },
                timeout: 5e3
            });
            client.open("POST", url);
            client.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            var data = {
                secret: Alloy.Globals.adminSecret,
                userId: userId,
                type: "2",
                partnerId: Alloy.Globals.partnerId
            };
            client.send(data);
        } else alert("Please go online to use Tikklr");
    }
    function scrollEnd(e) {
        if (0 == e.currentPage) {
            $.loginScroll.setViews(demoPagesViews);
            $.forgotPassView.hide();
            $.registerView.hide();
        } else if (true == e.view.last) {
            $.loginScroll.scrollToView(0);
            $.demoBrandsPay.last = false;
        } else 3 == e.currentPage && true != e.view.last ? e.view.last = true : $.demoBrandsPay.last = false;
    }
    function forgotPassword() {
        $.username.blur();
        $.password.blur();
        demoPagesViews = $.loginScroll.getViews();
        $.loginScroll.setViews([ $.loginView, $.forgotPassView ]);
        $.forgotPassView.show();
        $.loginScroll.scrollToView(1);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "login";
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
    $.__views.loginWindow = Ti.UI.createView({
        height: "100%",
        width: "100%",
        backgroundColor: "white",
        id: "loginWindow",
        backgroundImage: "tikklrBackground.jpg",
        navBarHidden: true,
        zIndex: 1500
    });
    $.__views.loginWindow && $.addTopLevelView($.__views.loginWindow);
    $.__views.__alloyId120 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId120"
    });
    $.__views.loginWindow.add($.__views.__alloyId120);
    $.__views.logoMain = Alloy.createController("login/logo", {
        id: "logoMain",
        __parentSymbol: $.__views.__alloyId120
    });
    $.__views.logoMain.setParent($.__views.__alloyId120);
    var __alloyId121 = [];
    $.__views.loginView = Ti.UI.createView({
        top: "0",
        layout: "vertical",
        width: "100%",
        height: "100%",
        id: "loginView"
    });
    __alloyId121.push($.__views.loginView);
    $.__views.__alloyId122 = Ti.UI.createView({
        height: 60,
        backgroundColor: "transparent",
        layout: "horizontal",
        zIndex: 100,
        top: 10,
        id: "__alloyId122"
    });
    $.__views.loginView.add($.__views.__alloyId122);
    $.__views.username = Ti.UI.createTextField({
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
        id: "username",
        hintText: "USERNAME"
    });
    $.__views.__alloyId122.add($.__views.username);
    $.__views.__alloyId123 = Ti.UI.createView({
        height: 60,
        backgroundColor: "transparent",
        layout: "horizontal",
        zIndex: 100,
        top: -20,
        id: "__alloyId123"
    });
    $.__views.loginView.add($.__views.__alloyId123);
    $.__views.password = Ti.UI.createTextField({
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
        id: "password",
        passwordMask: true,
        hintText: "PASSWORD"
    });
    $.__views.__alloyId123.add($.__views.password);
    $.__views.__alloyId124 = Ti.UI.createButton({
        font: {
            fontSize: "12pt",
            fontFamily: "Substance-ExtraBold",
            fontFamiliy: "Substance-Medium"
        },
        top: "1",
        left: "259",
        height: "10",
        color: Alloy.Globals.TikklrGreen,
        title: "forgot?",
        id: "__alloyId124"
    });
    $.__views.__alloyId123.add($.__views.__alloyId124);
    forgotPassword ? $.addListener($.__views.__alloyId124, "click", forgotPassword) : __defers["$.__views.__alloyId124!click!forgotPassword"] = true;
    $.__views.__alloyId125 = Ti.UI.createView({
        height: 60,
        backgroundColor: "transparent",
        layout: "vertical",
        zIndex: 100,
        id: "__alloyId125"
    });
    $.__views.loginView.add($.__views.__alloyId125);
    $.__views.loginButton = Ti.UI.createButton({
        font: {
            fontFamily: "Substance-ExtraBold",
            fontSize: "20pt"
        },
        color: Alloy.Globals.TikklrGreen,
        title: "SIGN IN",
        id: "loginButton"
    });
    $.__views.__alloyId125.add($.__views.loginButton);
    $.__views.__alloyId126 = Ti.UI.createView({
        height: 60,
        backgroundColor: "transparent",
        layout: "vertical",
        zIndex: 100,
        id: "__alloyId126"
    });
    $.__views.loginView.add($.__views.__alloyId126);
    $.__views.registerButton = Ti.UI.createButton({
        font: {
            fontFamily: "Substance-ExtraBold",
            fontSize: "20pt"
        },
        color: Alloy.Globals.TikklrGreen,
        title: "SIGN UP",
        id: "registerButton"
    });
    $.__views.__alloyId126.add($.__views.registerButton);
    showRegisterView ? $.addListener($.__views.registerButton, "click", showRegisterView) : __defers["$.__views.registerButton!click!showRegisterView"] = true;
    $.__views.demoYou = Ti.UI.createView({
        id: "demoYou"
    });
    __alloyId121.push($.__views.demoYou);
    $.__views.__alloyId127 = Alloy.createController("demo/you", {
        id: "__alloyId127",
        __parentSymbol: $.__views.demoYou
    });
    $.__views.__alloyId127.setParent($.__views.demoYou);
    $.__views.demoShot = Ti.UI.createView({
        id: "demoShot"
    });
    __alloyId121.push($.__views.demoShot);
    $.__views.__alloyId128 = Alloy.createController("demo/shot", {
        id: "__alloyId128",
        __parentSymbol: $.__views.demoShot
    });
    $.__views.__alloyId128.setParent($.__views.demoShot);
    $.__views.demoBrandsPay = Ti.UI.createView({
        id: "demoBrandsPay",
        last: true
    });
    __alloyId121.push($.__views.demoBrandsPay);
    $.__views.__alloyId129 = Alloy.createController("demo/brandsPay", {
        id: "__alloyId129",
        __parentSymbol: $.__views.demoBrandsPay
    });
    $.__views.__alloyId129.setParent($.__views.demoBrandsPay);
    $.__views.loginScroll = Ti.UI.createScrollableView({
        pagingControlOnTop: true,
        pagingControlColor: "transparent",
        height: "350",
        showPagingControl: "true",
        tintColor: Alloy.Globals.TikklrGreen,
        views: __alloyId121,
        id: "loginScroll"
    });
    $.__views.__alloyId120.add($.__views.loginScroll);
    scrollEnd ? $.addListener($.__views.loginScroll, "scrollend", scrollEnd) : __defers["$.__views.loginScroll!scrollend!scrollEnd"] = true;
    $.__views.__alloyId130 = Ti.UI.createLabel({
        font: {
            fontSize: "9pt",
            fontFamily: "Substance"
        },
        color: Alloy.Globals.TikklrGreen,
        bottom: "2",
        text: "©Tikklr 2015",
        id: "__alloyId130"
    });
    $.__views.__alloyId120.add($.__views.__alloyId130);
    $.__views.registerView = Ti.UI.createView({
        id: "registerView"
    });
    $.__views.__alloyId120.add($.__views.registerView);
    $.__views.__alloyId131 = Alloy.createController("login/register", {
        id: "__alloyId131",
        __parentSymbol: $.__views.registerView
    });
    $.__views.__alloyId131.setParent($.__views.registerView);
    $.__views.forgotPassView = Ti.UI.createView({
        id: "forgotPassView"
    });
    $.__views.__alloyId120.add($.__views.forgotPassView);
    $.__views.__alloyId132 = Alloy.createController("login/forgot", {
        id: "__alloyId132",
        __parentSymbol: $.__views.forgotPassView
    });
    $.__views.__alloyId132.setParent($.__views.forgotPassView);
    $.__views.loginLoading = Ti.UI.createView({
        top: 100,
        layout: "vertical",
        width: "100%",
        height: "100%",
        zIndex: 100,
        id: "loginLoading"
    });
    $.__views.loginWindow.add($.__views.loginLoading);
    $.__views.__alloyId133 = Alloy.createController("loading", {
        id: "__alloyId133",
        __parentSymbol: $.__views.loginLoading
    });
    $.__views.__alloyId133.setParent($.__views.loginLoading);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var logoutEventHandler = function() {
        showLoginLoading();
        Alloy.Models.User.logout();
    };
    Ti.App.addEventListener("logout", logoutEventHandler);
    var showLoginLoadingEventHandler = function() {
        showLoginLoading();
    };
    Ti.App.addEventListener("showLoginLoading", showLoginLoadingEventHandler);
    var logoutSuccessEventHandler = function() {
        clearTokens();
        hideLoginLoading();
        showLoginScroll();
    };
    Ti.App.addEventListener("logoutSuccess", logoutSuccessEventHandler);
    var registerSuccessEventHandler = function() {
        hideLoginLoading();
        showLoginScroll();
        $.loginScroll.scrollToView(0);
        $.registerView.hide();
        alert("Please check your email for further instructions");
    };
    Ti.App.addEventListener("registerSuccess", registerSuccessEventHandler);
    var registerFailedEventHandler = function() {
        hideLoginLoading();
        showLoginScroll();
        $.loginScroll.scrollToView(0);
        $.registerView.hide();
        alert("Couldn't register new user");
    };
    Ti.App.addEventListener("registerFailed", registerFailedEventHandler);
    var loginSuccessEventHandler = function() {
        drupalGetToken();
    };
    Ti.App.addEventListener("loginSuccess", loginSuccessEventHandler);
    var loginFailedEventHandler = function() {
        clearTokens();
        hideLoginLoading();
        showLoginScroll();
        alert("Oops, there was a problem logging you in. Please check your credentials and try again");
    };
    Ti.App.addEventListener("loginFailed", loginFailedEventHandler);
    var connectSuccessEventHandler = function(e) {
        setCollectionModelConfigs();
        Alloy.Models.User.set("uid", e.userId);
        Alloy.Models.User.uid = e.userId;
        Alloy.Models.User.fetch({
            success: function() {
                if (!Alloy.Models.User.get("mail") && !Alloy.Models.User.get("name")) {
                    alert("email is not set please set your email on Tikklr site");
                    Ti.App.fireEvent("logout");
                    return false;
                }
                kalturaSessionStart(Alloy.Models.User.get("name"));
                connectToUrban();
                var args = {
                    headerTitle: "BRIEFS",
                    showBack: false
                };
                Alloy.Globals.followingParams = {
                    urlparams: {
                        args: Alloy.Models.User.get("uid"),
                        display_id: "services_1",
                        pagesize: 100
                    }
                };
                Alloy.Collections["Following"] = Alloy.Collections.instance("DrupalView");
                Alloy.Collections["Following"].viewName = "commons_follow_user_following";
                Alloy.Collections["Following"].fetch(Alloy.Globals.followingParams);
                Ti.App.fireEvent("attachWindow", {
                    page: "briefList",
                    arguments: args
                });
            },
            error: function() {
                Ti.App.fireEvent("logout");
                hideLoginLoading();
                showLoginScroll();
            }
        });
    };
    Ti.App.addEventListener("connectSuccess", connectSuccessEventHandler);
    var forgotSuccessEventHandler = function() {
        hideLoginLoading();
        showLoginScroll();
        alert("Please check your email for further instructions");
        $.loginScroll.scrollToView(0);
    };
    Ti.App.addEventListener("forgotSuccess", forgotSuccessEventHandler);
    var connectFailedEventHandler = function() {
        clearTokens();
        hideLoginLoading();
        showLoginScroll();
    };
    Ti.App.addEventListener("connectFailed", connectFailedEventHandler);
    var tokenSuccessEventHandler = function() {
        isLoggedIn();
    };
    Ti.App.addEventListener("tokenSuccess", tokenSuccessEventHandler);
    var tokenFailedEventHandler = function() {
        clearTokens();
        hideLoginLoading();
        showLoginScroll();
    };
    Ti.App.addEventListener("tokenFailed", tokenFailedEventHandler);
    var drupalLogin = function() {
        Ti.API.info("In drupal Login");
        $.username.blur();
        $.password.blur();
        if ("" != $.username.value && "" != $.password.value) {
            showLoginLoading();
            Alloy.Models.User.login($.username.value, $.password.value);
        }
    };
    var demoPagesViews = [ $.loginView, $.demoYou, $.demoShot, $.demoBrandsPay ];
    $.loginView.show();
    $.loginLoading.hide();
    $.forgotPassView.hide();
    $.registerView.hide();
    showLoginLoading();
    var connectToUrban = function() {
        if (!Alloy.Models.User.get("mail")) return false;
    };
    exports.clean = function() {
        Ti.API.info("cleaning login controller");
        Ti.App.removeEventListener("logoutSuccess", logoutSuccessEventHandler);
        Ti.App.removeEventListener("connectSuccess", connectSuccessEventHandler);
        Ti.App.removeEventListener("connectFailed", connectFailedEventHandler);
        Ti.App.removeEventListener("registerSuccess", registerSuccessEventHandler);
        Ti.App.removeEventListener("registerFailed", registerFailedEventHandler);
        Ti.App.removeEventListener("tokenSuccess", tokenSuccessEventHandler);
        Ti.App.removeEventListener("tokenFailed", tokenFailedEventHandler);
        Ti.App.removeEventListener("loginSuccess", loginSuccessEventHandler);
        Ti.App.removeEventListener("loginFailed", loginFailedEventHandler);
        Ti.App.removeEventListener("forgotSuccess", forgotSuccessEventHandler);
        Ti.App.removeEventListener("showLoginLoading", showLoginLoadingEventHandler);
        Ti.App.removeEventListener("logoutSuccess", logoutSuccessEventHandler);
        Ti.App.removeEventListener("logoutFailed", logoutSuccessEventHandler);
        $.loginWindow = null;
        $.destroy();
        $.off();
    };
    $.loginButton.addEventListener("click", drupalLogin);
    var text = "USERNAME";
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
    text = "PASSWORD";
    var passwordAttributedText = Titanium.UI.iOS.createAttributedString({
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
    $.username.attributedHintText = attributedText;
    $.password.attributedHintText = passwordAttributedText;
    __defers["$.__views.__alloyId124!click!forgotPassword"] && $.addListener($.__views.__alloyId124, "click", forgotPassword);
    __defers["$.__views.registerButton!click!showRegisterView"] && $.addListener($.__views.registerButton, "click", showRegisterView);
    __defers["$.__views.loginScroll!scrollend!scrollEnd"] && $.addListener($.__views.loginScroll, "scrollend", scrollEnd);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;