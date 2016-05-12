function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function removeDuplicateViewsFromPrevious(page) {
        var viewToRemove = null;
        for (var i in previousWin) previousWin[i] == page && (viewToRemove = i);
        if (null != viewToRemove) {
            previousWin.splice(viewToRemove, 1);
        }
    }
    function cleanController(controller) {
        "undefined" != typeof controller.clean && controller.clean();
        controller.off();
        controller.destroy();
        controller = null;
    }
    function showSuccess() {
        hideLoading();
        $.successMessageHolder.show();
        $.successMessageHolder.visible = true;
        $.successMessage.show();
    }
    function hideSuccess() {
        $.successMessageHolder.hide();
        $.successMessageHolder.visible = false;
        $.successMessage.hide();
    }
    function hideLoading() {
        $.activityHolder.hide();
        $.activityIndicator.hide();
        $.activityHolder.top = null;
    }
    function showLoading(e) {
        $.activityHolder.top = e.top ? e.top : null;
        $.activityIndicator.message = e.message ? e.message : "Loading...";
        $.activityHolder.visible = true;
        $.activityHolder.show();
        $.activityIndicator.show();
        setTimeout(function() {
            Ti.App.fireEvent("stopLoading");
        }, 5e3);
    }
    function mainWindowClick() {
        Ti.API.info("mainWindowClicked");
        $.actionMenuRequire.isOpen() && $.actionMenuRequire.closeMenu();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
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
    $.__views.mainWindow = Ti.UI.createWindow({
        top: 0,
        height: "100%",
        width: "100%",
        backgroundColor: Alloy.Globals.TikklrGray,
        id: "mainWindow",
        fullscreen: true
    });
    $.__views.mainWindow && $.addTopLevelView($.__views.mainWindow);
    mainWindowClick ? $.addListener($.__views.mainWindow, "click", mainWindowClick) : __defers["$.__views.mainWindow!click!mainWindowClick"] = true;
    $.__views.mainView = Ti.UI.createView({
        top: 0,
        left: 0,
        width: Ti.Platform.displayCaps.platformWidth,
        height: "100%",
        orientationModes: [ Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT, Ti.UI.PORTRAIT ],
        id: "mainView",
        backgroundImage: "tikklrBackground.jpg"
    });
    $.__views.mainWindow.add($.__views.mainView);
    $.__views.actionMenuRequire = Alloy.createController("actionMenu", {
        id: "actionMenuRequire",
        __parentSymbol: $.__views.mainView
    });
    $.__views.actionMenuRequire.setParent($.__views.mainView);
    $.__views.__alloyId117 = Ti.UI.createLabel({
        font: {
            fontSize: "9pt",
            fontFamily: "Substance"
        },
        color: Alloy.Globals.TikklrGreen,
        bottom: "2",
        text: "©Tikklr 2015",
        id: "__alloyId117"
    });
    $.__views.mainView.add($.__views.__alloyId117);
    $.__views.errorMessageHolder = Ti.UI.createView({
        backgroundColor: "black",
        opacity: .9,
        zIndex: 1e3,
        width: Ti.UI.SIZE,
        height: "50",
        borderRadius: "5",
        borderColor: Alloy.Globals.TikklrRed,
        id: "errorMessageHolder",
        visible: false
    });
    $.__views.mainWindow.add($.__views.errorMessageHolder);
    $.__views.errorLabel = Ti.UI.createActivityIndicator({
        color: Alloy.Globals.TikklrRed,
        font: {
            fontSize: "14pt",
            fontFamily: "Substance-ExtraBold"
        },
        width: Ti.UI.SIZE,
        height: "50",
        zIndex: 1e3,
        message: "Oops something went wrong...",
        id: "errorLabel"
    });
    $.__views.errorMessageHolder.add($.__views.errorLabel);
    $.__views.activityHolder = Ti.UI.createView({
        backgroundColor: "black",
        opacity: .9,
        zIndex: 100,
        width: "100",
        height: "75",
        borderRadius: "5",
        borderColor: Alloy.Globals.TikklrGreen,
        id: "activityHolder",
        visible: false
    });
    $.__views.mainWindow.add($.__views.activityHolder);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        color: Alloy.Globals.TikklrGreen,
        font: {
            fontSize: "14pt",
            fontFamily: "Substance-ExtraBold"
        },
        message: "Loading...",
        width: "50",
        height: "50",
        indicatorColor: "red",
        zIndex: 1e3,
        id: "activityIndicator"
    });
    $.__views.activityHolder.add($.__views.activityIndicator);
    $.__views.successMessageHolder = Ti.UI.createView({
        backgroundColor: "black",
        opacity: .9,
        zIndex: 1e3,
        width: "200",
        height: "50",
        borderRadius: "5",
        borderColor: Alloy.Globals.TikklrGreen,
        id: "successMessageHolder",
        visible: false
    });
    $.__views.mainWindow.add($.__views.successMessageHolder);
    $.__views.successMessage = Ti.UI.createActivityIndicator({
        color: Alloy.Globals.TikklrGreen,
        font: {
            fontSize: "14pt",
            fontFamily: "Substance-ExtraBold"
        },
        width: "100",
        height: "50",
        zIndex: 1e3,
        message: "SUCCESS!!!",
        id: "successMessage"
    });
    $.__views.successMessageHolder.add($.__views.successMessage);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Alloy.Models.User = Alloy.Models.instance("User");
    Alloy.Models.Kaltura = Alloy.Models.instance("Kaltura");
    var currentWin;
    var currentPage;
    var currentWinController;
    var previousWin = [];
    Ti.App.addEventListener("back", function() {
        var args = {};
        if (currentWin) {
            $.mainView.remove(currentWin);
            cleanController(currentWinController);
            var win = previousWin.pop();
            winName = win.name;
            args = win.args;
            while (winName == currentPage) {
                win = previousWin.pop();
                winName = win.name;
                args = win.args;
            }
            if (winName) {
                0 == previousWin.length && (args["showBack"] = false);
                "undefined" != typeof args["headerTitle"] && (args["headerTitle"] = "BRIEFS");
                var newWinController = Alloy.createController(winName, args);
                var newWin = newWinController.getView();
                $.mainView.add(newWin);
                currentWin = newWin;
                currentWinController = newWinController;
                currentPage = winName;
                previousWin.push(win);
            }
        }
    });
    Ti.App.addEventListener("attachWindow", function(e) {
        var args = {};
        var headerTitle = "BRIEFS";
        "undefined" != typeof e.arguments && (args = e.arguments);
        if ("undefined" != typeof e.headerTitle) {
            var headerTitle = e.headerTitle;
            args["headerTitle"] = headerTitle;
        }
        0 == previousWin.length && (args["showBack"] = false);
        var menuWinController = Alloy.createController(e.page, args);
        var menuWin = menuWinController.getView();
        removeDuplicateViewsFromPrevious(e.page);
        if (currentWin) {
            $.mainView.remove(currentWin);
            if ("login" != e.page) {
                var win = {};
                win.name = e.page;
                win.args = args;
                previousWin.push(win);
            }
            cleanController(currentWinController);
        }
        $.mainView.add(menuWin);
        currentWin = menuWin;
        currentWinController = menuWinController;
        currentPage = e.page;
    });
    Ti.App.addEventListener("triggerSuccess", function(e) {
        $.successMessage.message = e.message ? e.message : "SUCCESS!!!";
        showSuccess();
        setTimeout(function() {
            hideSuccess();
        }, 1500);
    });
    Ti.App.addEventListener("triggerError", function() {});
    Ti.App.addEventListener("loading", function(e) {
        showLoading(e);
    });
    Ti.App.addEventListener("stopLoading", function() {
        hideLoading();
    });
    backClicked = function() {
        Ti.App.fireEvent("back");
    };
    $.mainWindow.addEventListener("open", function() {
        Ti.App.fireEvent("attachWindow", {
            page: "login"
        });
        Alloy.Models.User.isLoggedIn();
    });
    $.mainWindow.open();
    exports.clean = function() {
        $.destroy();
        $.off();
    };
    __defers["$.__views.mainWindow!click!mainWindowClick"] && $.addListener($.__views.mainWindow, "click", mainWindowClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;