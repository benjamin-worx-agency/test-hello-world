function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function setViewData(user) {
        this.user = user;
        this.uid = user.get("uid");
        Ti.API.info("follow cell loaded with argument: " + JSON.stringify(arguments));
        $.followUserImage.applyProperties({
            autoload: true,
            image: user.get("pictureUrl").replace("/styles/50x50/public", "")
        });
        $.followingNodeLabel.setText(user.get("realname"));
        $.followingNodeUser.setText(user.get("mail"));
        $.followButton.uid = user.get("uid");
        $.followButton.setVisible(user.get("isNotFollowed"));
        $.followingUserButton.uid = user.get("uid");
        $.followingUserButton.setVisible(user.get("isFollowed"));
    }
    require("alloy/controllers/pandaGallery").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "followListItem";
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
    $.__views.followListItem = Ti.UI.createTableViewRow({
        height: "60",
        layout: "horizontal",
        backgroundColor: "transparent",
        width: "100%",
        selectionStyle: "none",
        nodeType: "user",
        id: "followListItem"
    });
    $.__views.followListItem && $.addTopLevelView($.__views.followListItem);
    $.__views.__alloyId101 = Ti.UI.createView({
        left: "5",
        right: "5",
        bottom: "5",
        backgroundColor: Alloy.Globals.TikklrWhite,
        id: "__alloyId101"
    });
    $.__views.followListItem.add($.__views.__alloyId101);
    $.__views.followUserImage = Alloy.createWidget("com.baboonmedia.remoteimage", "widget", {
        left: 5,
        top: 5,
        width: 45,
        height: 45,
        id: "followUserImage",
        __parentSymbol: $.__views.__alloyId101
    });
    $.__views.followUserImage.setParent($.__views.__alloyId101);
    $.__views.__alloyId102 = Ti.UI.createView({
        top: 2,
        left: 60,
        width: 170,
        id: "__alloyId102"
    });
    $.__views.__alloyId101.add($.__views.__alloyId102);
    $.__views.followingNodeLabel = Ti.UI.createLabel({
        left: 5,
        top: 0,
        font: {
            fontSize: "12pt",
            fontFamily: "Substance-ExtraBold"
        },
        color: Alloy.Globals.TikklrGreen,
        id: "followingNodeLabel"
    });
    $.__views.__alloyId102.add($.__views.followingNodeLabel);
    $.__views.followingNodeUser = Ti.UI.createLabel({
        left: 5,
        bottom: 7,
        font: {
            fontSize: "10pt",
            fontFamily: "Substance-ExtraBold"
        },
        color: Alloy.Globals.TikklrBlack,
        id: "followingNodeUser"
    });
    $.__views.__alloyId102.add($.__views.followingNodeUser);
    $.__views.followButton = Ti.UI.createButton({
        right: "5",
        top: "5",
        bottom: "5",
        width: "62",
        height: "42",
        backgroundImage: "follow.png",
        backgroundColor: "transparent",
        id: "followButton"
    });
    $.__views.__alloyId101.add($.__views.followButton);
    followClicked ? $.addListener($.__views.followButton, "click", followClicked) : __defers["$.__views.followButton!click!followClicked"] = true;
    $.__views.followingUserButton = Ti.UI.createButton({
        right: "5",
        top: "5",
        bottom: "5",
        width: "62",
        height: "42",
        backgroundImage: "following.png",
        backgroundColor: Alloy.Globals.TikklrGreen,
        visible: "false",
        id: "followingUserButton"
    });
    $.__views.__alloyId101.add($.__views.followingUserButton);
    followersClicked ? $.addListener($.__views.followingUserButton, "click", followersClicked) : __defers["$.__views.followingUserButton!click!followersClicked"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    exports.baseController = "pandaGallery";
    setViewData(arguments[0].model);
    exports.clean = function() {
        $.destroy();
        $.off();
    };
    __defers["$.__views.followButton!click!followClicked"] && $.addListener($.__views.followButton, "click", followClicked);
    __defers["$.__views.followingUserButton!click!followersClicked"] && $.addListener($.__views.followingUserButton, "click", followersClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;