function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function setIconsInCircle() {
        var degDiff = 360 / numOfElements;
        var r = (parseInt(circleSize) - 2 * marginXToMiddleOfCircle) / 2;
        var wheelPositionX = parseInt(circleSize) / 2;
        var wheelPositionY = parseInt(circleSize) / 2;
        for (i in $.iconsContainer.children) {
            var icon = $.iconsContainer.children[i];
            currentAngle -= degDiff;
            currentAngle %= 360;
            var X = wheelPositionX + r * Math.sin(currentAngle * Math.PI / 180);
            var Y = wheelPositionY + r * Math.cos(currentAngle * Math.PI / 180);
            var p = {
                x: X,
                y: Y
            };
            icon.setCenter({
                x: p.x / 2,
                y: p.y / 2
            });
            icon.anchorPoint = animationType[animationTypePointer].anchorPoint;
        }
    }
    function fixLabelsPosition(e, degrees, isAnimate) {
        var labelMatrix = Ti.UI.create2DMatrix().rotate(-1 * degrees);
        var labelAnim = Ti.UI.createAnimation({
            transform: labelMatrix,
            duration: Alloy.Globals.animationDuration
        });
        for (var i = 0; i < labels.length; i++) isAnimate ? labels[i].animate(labelAnim) : labels[i].transform = labelMatrix;
    }
    function actionMenuTouchStart(e) {
        Ti.API.info("On touch Start " + JSON.stringify(e));
        var conv = e.source.convertPointToView({
            x: e.x,
            y: e.y
        }, $.parent);
        var wheelPositionX = Ti.Platform.displayCaps.platformWidth;
        var wheelPositionY = Ti.Platform.displayCaps.platformHeight / 2;
        var newAngle = Math.atan2(conv.y - wheelPositionY, wheelPositionX - conv.x) * -(180 / Math.PI);
        diff = newAngle - old;
        oldAngle = newAngle;
        e.bubbles = false;
        e.cancelBubble = true;
    }
    function actionMenuTouchMoved(e) {
        Ti.API.info("On touch move " + JSON.stringify(e));
        var conv = e.source.convertPointToView({
            x: e.x,
            y: e.y
        }, $.parent.parent);
        var wheelPositionX = Ti.Platform.displayCaps.platformWidth;
        var wheelPositionY = Ti.Platform.displayCaps.platformHeight / 2;
        var newAngle = Math.atan2(conv.y - wheelPositionY, wheelPositionX - conv.x) * -(180 / Math.PI);
        current += newAngle - oldAngle;
        oldAngle = newAngle;
        var t = Ti.UI.create2DMatrix().rotate(current);
        $.tikklrActionMenu.transform = t;
        fixLabelsPosition(e, current, 0);
        e.bubbles = false;
        e.cancelBubble = true;
    }
    function getClosestLabel(angle) {
        var labelAngle = 360 / labels.length;
        var labelPosition = Math.round(angle / labelAngle);
        var roundedAngle = labelAngle * labelPosition;
        Ti.API.info("rounded " + roundedAngle);
        return roundedAngle;
    }
    function moveToSelected(e) {
        var conv = e.source.convertPointToView({
            x: e.x,
            y: e.y
        }, $.parent.parent);
        var wheelPositionX = Ti.Platform.displayCaps.platformWidth;
        var wheelPositionY = Ti.Platform.displayCaps.platformHeight / 2;
        var newAngle = Math.atan2(conv.y - wheelPositionY, wheelPositionX - conv.x) * -(180 / Math.PI);
        var newAngle = getClosestLabel(newAngle);
        Ti.API.info("newAngle: " + newAngle);
        Ti.API.info("current: " + current);
        current -= newAngle;
        var t = Ti.UI.create2DMatrix().rotate(current);
        var animation = Ti.UI.createAnimation({
            transform: t,
            duration: Alloy.Globals.animationDuration
        });
        animation.addEventListener("complete", function(e) {
            fixLabelsPosition(e, current, 1);
        });
        $.tikklrActionMenu.animate(animation);
        old = current;
    }
    function changeToActive(e) {
        if (e.source != activeIcon) {
            var currentImage = e.source.getBackgroundImage();
            currentImage = currentImage.substring(0, currentImage.length - 4);
            e.source.setBackgroundImage(currentImage + "Live.png");
            if (activeIcon) {
                var currentLiveImage = activeIcon.getBackgroundImage();
                currentLiveImage = currentLiveImage.substring(0, currentLiveImage.length - 8);
                activeIcon.setBackgroundImage(currentLiveImage + ".png");
            }
        }
        activeIcon = e.source;
    }
    function labelClick(e) {
        Ti.API.info("icon clicked" + JSON.stringify(e));
        var conv = e.source.convertPointToView({
            x: e.x,
            y: e.y
        }, $.parent.parent);
        var wheelPositionX = Ti.Platform.displayCaps.platformWidth;
        var wheelPositionY = Ti.Platform.displayCaps.platformHeight / 2;
        var newAngle = Math.atan2(conv.y - wheelPositionY, wheelPositionX - conv.x) * -(180 / Math.PI);
        newAngle = getClosestLabel(newAngle);
        currentAngle = newAngle;
        changeToActive(e);
        moveToSelected(e);
        setTimeout(function() {
            closeActionMenu();
            Ti.App.fireEvent("attachWindow", {
                page: e.source.page
            });
        }, Alloy.Globals.animationDuration);
        e.bubbles = false;
        e.cancelBubble = true;
        return false;
    }
    function onActionMenuTouchEnd(e) {
        Ti.API.info("Swipe End");
        Ti.API.info("current " + current);
        current = getClosestLabel(current);
        Ti.API.info("New angle " + current);
        var t = Ti.UI.create2DMatrix().rotate(current);
        var animation = Ti.UI.createAnimation({
            transform: t,
            duration: Alloy.Globals.animationDuration
        });
        $.tikklrActionMenu.animate(animation);
        fixLabelsPosition(e, current, 1);
        old = current;
        e.bubbles = false;
        e.cancelBubble = true;
    }
    function closeActionMenu() {
        var hideIconsAnimation = Ti.UI.createAnimation({
            opacity: 0,
            duration: Alloy.Globals.animationDuration
        });
        hideIconsAnimation.addEventListener("complete", function() {
            var animation = Ti.UI.createAnimation({
                width: "38",
                height: "38",
                opacity: .1,
                duration: Alloy.Globals.animationDuration
            });
            animation.addEventListener("complete", function() {
                $.tikklrActionMenuButton.show();
                $.tikklrActionMenu.hide();
                $.tikklrActionMenu.visible = false;
                $.tikklrActionMenuBlocker.visible = false;
                $.actionMenuView.width = "50";
                $.actionMenuView.height = "60";
            });
            $.tikklrActionMenu.animate(animation);
        });
        $.iconsContainer.animate(hideIconsAnimation);
        $.tikklrActionMenuButton.toggle = false;
    }
    function openActionMenu() {
        var animation = Ti.UI.createAnimation({
            width: "207",
            height: "207",
            opacity: 1,
            duration: Alloy.Globals.animationDuration
        });
        animation.addEventListener("complete", function() {
            Ti.API.log("Animation Completed");
            var showIconsAnimation = Ti.UI.createAnimation({
                opacity: 1,
                duration: Alloy.Globals.animationDuration
            });
            showIconsAnimation.addEventListener("complete", function() {
                Ti.API.log("Animation 2 Completed");
            });
            showIconsAnimation.addEventListener("start", function() {
                Ti.API.log("Animation 2 start");
            });
            $.iconsContainer.animate(showIconsAnimation);
            $.tikklrActionMenu.borderRadius = "52";
        });
        animation.addEventListener("start", function() {
            Ti.API.log("Animation starts");
            $.tikklrActionMenuButton.hide();
            $.tikklrActionMenuButton.visible = false;
        });
        $.actionMenuView.width = "245";
        $.actionMenuView.height = "245";
        $.tikklrActionMenu.visible = true;
        $.tikklrActionMenuBlocker.visible = true;
        $.tikklrActionMenu.animate(animation);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "actionMenu";
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
    $.__views.actionMenuView = Ti.UI.createView({
        backgroundColor: "transparent",
        height: "60",
        width: "50",
        center: {
            x: "100%",
            y: "50%"
        },
        zIndex: 100,
        id: "actionMenuView"
    });
    $.__views.actionMenuView && $.addTopLevelView($.__views.actionMenuView);
    $.__views.tikklrActionMenu = Ti.UI.createView({
        backgroundImage: "wheelLarge.png",
        width: "77",
        height: "77",
        borderWidth: 0,
        opacity: .8,
        zIndex: 2e3,
        visible: false,
        id: "tikklrActionMenu"
    });
    $.__views.actionMenuView.add($.__views.tikklrActionMenu);
    onActionMenuTouchEnd ? $.addListener($.__views.tikklrActionMenu, "touchend", onActionMenuTouchEnd) : __defers["$.__views.tikklrActionMenu!touchend!onActionMenuTouchEnd"] = true;
    actionMenuTouchMoved ? $.addListener($.__views.tikklrActionMenu, "touchmove", actionMenuTouchMoved) : __defers["$.__views.tikklrActionMenu!touchmove!actionMenuTouchMoved"] = true;
    actionMenuTouchStart ? $.addListener($.__views.tikklrActionMenu, "touchstart", actionMenuTouchStart) : __defers["$.__views.tikklrActionMenu!touchstart!actionMenuTouchStart"] = true;
    $.__views.iconsContainer = Ti.UI.createView({
        id: "iconsContainer",
        zIndex: 2e3,
        opacity: 0,
        width: 207,
        height: 207,
        top: 0,
        left: 0
    });
    $.__views.tikklrActionMenu.add($.__views.iconsContainer);
    $.__views.profileBtn = Ti.UI.createView({
        width: "42",
        height: "42",
        zIndex: 2500,
        backgroundImage: "wheelProfile.png",
        id: "profileBtn",
        page: "profile"
    });
    $.__views.iconsContainer.add($.__views.profileBtn);
    $.__views.createBtn = Ti.UI.createView({
        width: "42",
        height: "42",
        zIndex: 2500,
        backgroundImage: "wheelCreate.png",
        id: "createBtn",
        page: "create"
    });
    $.__views.iconsContainer.add($.__views.createBtn);
    $.__views.searchBtn = Ti.UI.createView({
        width: "42",
        height: "42",
        zIndex: 2500,
        backgroundImage: "wheelSearch.png",
        id: "searchBtn",
        page: "search"
    });
    $.__views.iconsContainer.add($.__views.searchBtn);
    $.__views.settingsBtn = Ti.UI.createView({
        width: "42",
        height: "42",
        zIndex: 2500,
        backgroundImage: "wheelSettings.png",
        id: "settingsBtn",
        page: "settings"
    });
    $.__views.iconsContainer.add($.__views.settingsBtn);
    $.__views.rewardsBtn = Ti.UI.createView({
        width: "42",
        height: "42",
        zIndex: 2500,
        backgroundImage: "wheelRewards.png",
        id: "rewardsBtn",
        page: "rewards"
    });
    $.__views.iconsContainer.add($.__views.rewardsBtn);
    $.__views.briefBtn = Ti.UI.createView({
        width: "42",
        height: "42",
        zIndex: 2500,
        backgroundImage: "wheelBrief.png",
        id: "briefBtn",
        page: "briefList"
    });
    $.__views.iconsContainer.add($.__views.briefBtn);
    $.__views.playsBtn = Ti.UI.createView({
        width: "42",
        height: "42",
        zIndex: 2500,
        backgroundImage: "wheelDiscover.png",
        id: "playsBtn",
        page: "plays"
    });
    $.__views.iconsContainer.add($.__views.playsBtn);
    $.__views.tikklrActionMenuButton = Ti.UI.createView({
        backgroundImage: "wheelSmall.png",
        width: "77",
        height: "77",
        borderRadius: "19",
        opacity: .4,
        id: "tikklrActionMenuButton",
        zIndex: 2500
    });
    $.__views.actionMenuView.add($.__views.tikklrActionMenuButton);
    $.__views.tikklrActionMenuBlocker = Ti.UI.createView({
        backgroundColor: "transparent",
        width: "92",
        height: "92",
        borderRadius: "23",
        visible: false,
        id: "tikklrActionMenuBlocker",
        zIndex: 2500
    });
    $.__views.actionMenuView.add($.__views.tikklrActionMenuBlocker);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var numOfElements = $.iconsContainer.children.length;
    var marginXToMiddleOfCircle = 60;
    var animationType = [ {
        name: "Top Left",
        anchorPoint: {
            x: 0,
            y: 0
        }
    }, {
        name: "Top Right",
        anchorPoint: {
            x: 1,
            y: 0
        }
    }, {
        name: "Bottom Left",
        anchorPoint: {
            x: 0,
            y: 1
        }
    }, {
        name: "Bottom Right",
        anchorPoint: {
            x: 1,
            y: 1
        }
    }, {
        name: "Center",
        anchorPoint: {
            x: .5,
            y: .5
        }
    } ];
    var animationTypePointer = 4;
    var currentAngle = 270;
    var circleSize = 415;
    var buttonTransform = Ti.UI.create2DMatrix();
    var labels = $.iconsContainer.getChildren();
    var old = 0;
    var diff = 0;
    var current = 0;
    var activeIcon = null;
    setIconsInCircle();
    $.tikklrActionMenu.transform = buttonTransform;
    var tikklrActionMenuButtonClicked = function(e) {
        Ti.API.info("actionMenuButton clicked");
        if (true == e.source.toggle) {
            closeActionMenu();
            e.source.toggle = false;
        } else {
            openActionMenu();
            e.source.toggle = true;
        }
        e.bubbles = false;
        e.cancelBubble = true;
        return false;
    };
    var actionMenuClicked = function(e) {
        Ti.API.info("actionMenu clicked");
        e.bubbles = false;
        e.cancelBubble = true;
        return false;
    };
    Ti.App.addEventListener("hideActionMenu", function() {
        $.actionMenuView.visible = false;
    });
    Ti.App.addEventListener("showActionMenu", function() {
        $.actionMenuView.visible = true;
    });
    $.iconsContainer.addEventListener("click", actionMenuClicked);
    $.tikklrActionMenuButton.addEventListener("click", tikklrActionMenuButtonClicked);
    $.createBtn.addEventListener("click", labelClick);
    $.profileBtn.addEventListener("click", labelClick);
    $.searchBtn.addEventListener("click", labelClick);
    $.settingsBtn.addEventListener("click", labelClick);
    $.rewardsBtn.addEventListener("click", labelClick);
    $.briefBtn.addEventListener("click", labelClick);
    $.playsBtn.addEventListener("click", labelClick);
    exports.isOpen = function() {
        return true == $.tikklrActionMenuButton.toggle;
    };
    exports.openMenu = function() {
        openActionMenu();
        $.tikklrActionMenuButton.toggle = false;
    };
    exports.closeMenu = function() {
        closeActionMenu();
        $.tikklrActionMenuButton.toggle = false;
    };
    __defers["$.__views.tikklrActionMenu!touchend!onActionMenuTouchEnd"] && $.addListener($.__views.tikklrActionMenu, "touchend", onActionMenuTouchEnd);
    __defers["$.__views.tikklrActionMenu!touchmove!actionMenuTouchMoved"] && $.addListener($.__views.tikklrActionMenu, "touchmove", actionMenuTouchMoved);
    __defers["$.__views.tikklrActionMenu!touchstart!actionMenuTouchStart"] && $.addListener($.__views.tikklrActionMenu, "touchstart", actionMenuTouchStart);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;