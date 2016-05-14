function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function fetchUser() {
        $.User.fetch({
            success: function() {
                properties = userTransform($.User);
                $.User.set(properties, {
                    silent: true
                });
                $.profileImage.applyProperties({
                    autoload: true,
                    image: $.User.get("pictureUrl")
                });
                $.profileUserName.setText($.User.get("@realname"));
                $.profileUserBio.setText($.User.get("bio"));
                var totalCountParams = {
                    args: Alloy.Models.User.get("uid"),
                    display_id: "services_1"
                };
                $.TotalCount.fetch({
                    success: function(e) {
                        "undefined" != typeof e.models && "undefined" != typeof e.models[0] && (user.videoCount = e.models[0].get("nid"));
                        user.set("videoCount", e.models[0].get("nid"), {
                            silent: true
                        });
                        $.videoCount.setText(e.models[0].get("nid"));
                    },
                    urlparams: totalCountParams
                });
                var flag = Alloy.createModel("Flag");
                flag.countAll(flag_name, "uid", user.get("uid"));
                var flag2 = Alloy.createModel("Flag", true);
                flag2.countAll(flag_name, "entity_id", user.get("uid"));
                var params = {
                    "parameters[type]": "video",
                    "parameters[author]": user.get("uid"),
                    sort: "created",
                    direction: "DESC",
                    pagesize: 10,
                    "parameters[status]": 1
                };
                Alloy.Models.User = user;
                $.loadGallery($.MyVideos, params, galleryCenter, null);
            }
        });
    }
    function buttonClicked(e) {
        var numOfChild = selectedButton.children.length;
        selectedButton.backgroundColor = selectedButton != $.ratingButton ? Alloy.Globals.TikklrDarkGray : Alloy.Globals.TikklrBronze;
        selectedButton.children[numOfChild - 1].color = Alloy.Globals.TikklrWhite;
        e.source.backgroundColor = Alloy.Globals.TikklrWhite;
        selectedButton = e.source;
        numOfChild = selectedButton.children.length;
        selectedButton.children[numOfChild - 1].color = Alloy.Globals.TikklrBlack;
        currentTable && currentTable.hide();
        $.enableLoadMore();
        if (selectedButton == $.followersButton) {
            params = {
                args: Alloy.Models.User.get("uid"),
                display_id: "services_1",
                pagesize: 10
            };
            $.followersTable.setData([]);
            currentFollowers = [];
            $.loadGallery($.Followers, params, galleryCenter, null);
            switchTables($.followersTable, "FOLLOWERS");
        } else if (selectedButton == $.followingButton) {
            params = {
                args: Alloy.Models.User.get("uid"),
                display_id: "services_1",
                pagesize: 10
            };
            $.followingTable.setData([]);
            currentFollowing = [];
            $.loadGallery(Alloy.Collections["Following"], params, galleryCenter, null);
            switchTables($.followingTable, "FOLLOWING");
        } else if (selectedButton == $.tikksButton) {
            var params = {
                "parameters[type]": "video",
                "parameters[author]": user.get("uid"),
                sort: "created",
                direction: "DESC",
                pagesize: 10,
                "parameters[status]": 1
            };
            $.loadGallery($.MyVideos, params, galleryCenter, null);
            switchTables($.profileTable, "MY TIKKS");
        } else selectedButton == $.ratingButton && switchTables($.profileTable, "RATING");
    }
    function videosListLoaded() {
        if ("undefined" != typeof $.profileTable.data && "undefined" != typeof $.profileTable.data[0] && "undefined" != typeof $.profileTable.data[0].rows) {
            var numOfRows = $.profileTable.data[0].rows.length;
            if (numOfRows > $.MyVideos.length) {
                $.profileTable.setData([]);
                currentVideos = [];
            }
        }
        for (var i = 0; i < $.MyVideos.length; i++) if ("-1" == currentVideos.indexOf($.MyVideos.models[i].id)) {
            $.MyVideos.models[i].set(profileNodeTransform($.MyVideos.models[i]), {
                silent: true
            });
            var args = {
                model: $.MyVideos.models[i]
            };
            $.profileTable.appendRow(Alloy.createController("videosListItem", args).getView());
            currentVideos.push($.MyVideos.models[i].id);
        }
    }
    function followersListLoaded() {
        if ("undefined" != typeof $.followersTable.data && "undefined" != typeof $.followersTable.data[0] && "undefined" != typeof $.followersTable.data[0].rows) {
            var numOfRows = $.followersTable.data[0].rows.length;
            if (numOfRows > $.Followers.length) {
                $.followersTable.setData([]);
                currentFollowers = [];
            }
        }
        for (var i = 0; i < $.Followers.length; i++) if ("-1" == currentFollowers.indexOf($.Followers.models[i].id)) {
            $.Followers.models[i].set(userTransform($.Followers.models[i]), {
                silent: true
            });
            var args = {
                model: $.Followers.models[i]
            };
            $.followersTable.appendRow(Alloy.createController("followListItem", args).getView());
            currentFollowers.push($.Followers.models[i].id);
        }
    }
    function followingListLoaded() {
        if ("undefined" != typeof $.followingTable.data && "undefined" != typeof $.followingTable.data[0] && "undefined" != typeof $.followingTable.data[0].rows) {
            var numOfRows = $.followingTable.data[0].rows.length;
            if (numOfRows > Alloy.Collections["Following"].length) {
                $.followingTable.setData([]);
                currentFollowing = [];
            }
        }
        for (var i = 0; i < Alloy.Collections["Following"].length; i++) if ("-1" == currentFollowing.indexOf(Alloy.Collections["Following"].models[i].id)) {
            Alloy.Collections["Following"].models[i].set(userTransform(Alloy.Collections["Following"].models[i]), {
                silent: true
            });
            var args = {
                model: Alloy.Collections["Following"].models[i]
            };
            $.followingTable.appendRow(Alloy.createController("followListItem", args).getView());
            currentFollowing.push(Alloy.Collections["Following"].models[i].id);
        }
    }
    function switchTables(table, title) {
        table.show();
        currentTable = table;
        $.tableLabel.text = title;
    }
    function seeAllClicked(e) {
        if ("undefined" != typeof e.source.toggle && true == e.source.toggle) {
            e.source.toggle = false;
            $.profileBox.show();
            $.profileTableHeader.show();
            var animation = Titanium.UI.createAnimation();
            animation.top = "243";
            animation.duration = animationDuration;
            Animation.fadeIn($.profileBox, animationDuration);
            Animation.fadeIn($.profileTableHeader, animationDuration);
            currentTable.animate(animation);
        } else {
            var animation = Titanium.UI.createAnimation();
            animation.top = 0;
            animation.duration = animationDuration;
            currentTable.animate(animation);
            Animation.fadeOut($.profileBox, animationDuration);
            Animation.fadeOut($.profileTableHeader, animationDuration);
            e.source.toggle = true;
        }
    }
    function enableOwnUserFucntionality() {}
    function disableOwnUserFucntionality() {}
    function followersRowClicked() {}
    require("alloy/controllers/tikkGallery").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "profile";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        var __parentSymbol = __processArg(arguments[0], "__parentSymbol");
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
    $.TotalCount = Alloy.createCollection("DrupalView");
    $.__views.profileView = Ti.UI.createView({
        top: 0,
        left: 0,
        width: Ti.Platform.displayCaps.platformWidth,
        height: "100%",
        orientationModes: [ Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT, Ti.UI.PORTRAIT ],
        id: "profileView"
    });
    $.__views.profileView && $.addTopLevelView($.__views.profileView);
    $.__views.tikklrProfileHeader = Ti.UI.createView({
        top: 0,
        width: Ti.Platform.displayCaps.platformWidth,
        backgroundColor: "transparent",
        height: "40",
        id: "tikklrProfileHeader"
    });
    $.__views.profileView.add($.__views.tikklrProfileHeader);
    $.__views.__alloyId142 = Ti.UI.createButton({
        left: "20",
        width: "40",
        height: "40",
        backgroundColor: "transparent",
        backgroundImage: "back.png",
        selectedBackgroundImage: "back-pressed.png",
        id: "__alloyId142"
    });
    $.__views.tikklrProfileHeader.add($.__views.__alloyId142);
    backClicked ? $.addListener($.__views.__alloyId142, "click", backClicked) : __defers["$.__views.__alloyId142!click!backClicked"] = true;
    $.__views.__alloyId143 = Ti.UI.createLabel({
        backgroundColor: "transparent",
        color: Alloy.Globals.TikklrGreen,
        font: {
            fontSize: "20pt",
            fontFamily: "Substance-ExtraBold"
        },
        height: 35,
        zIndex: 1e3,
        text: "PROFILE",
        id: "__alloyId143"
    });
    $.__views.tikklrProfileHeader.add($.__views.__alloyId143);
    $.__views.__alloyId144 = Ti.UI.createView({
        top: 40,
        id: "__alloyId144"
    });
    $.__views.profileView.add($.__views.__alloyId144);
    $.__views.profileBox = Ti.UI.createView({
        top: 0,
        height: "225",
        left: "10",
        right: "10",
        backgroundColor: Alloy.Globals.TikklrGreen,
        layout: "vertical",
        id: "profileBox"
    });
    $.__views.__alloyId144.add($.__views.profileBox);
    $.__views.profileImage = Alloy.createWidget("com.baboonmedia.remoteimage", "widget", {
        top: Alloy.Globals.PaddingTop,
        width: "30%",
        height: 80,
        id: "profileImage",
        __parentSymbol: $.__views.profileBox
    });
    $.__views.profileImage.setParent($.__views.profileBox);
    $.__views.profileUserName = Ti.UI.createLabel({
        color: Alloy.Globals.TikklrWhite,
        id: "profileUserName"
    });
    $.__views.profileBox.add($.__views.profileUserName);
    $.__views.profileUserBio = Ti.UI.createLabel({
        color: Alloy.Globals.TikklrWhite,
        left: 5,
        right: 5,
        top: 5,
        height: 50,
        id: "profileUserBio"
    });
    $.__views.profileBox.add($.__views.profileUserBio);
    $.__views.__alloyId145 = Ti.UI.createView({
        left: "7",
        layout: "horizontal",
        id: "__alloyId145"
    });
    $.__views.profileBox.add($.__views.__alloyId145);
    $.__views.ratingButton = Ti.UI.createButton({
        width: "65",
        height: "57",
        backgroundColor: Alloy.Globals.TikklrBronze,
        right: "7",
        backgroundImage: "Stars_Tikklr_Bench_Gold.png",
        title: "",
        visible: false,
        id: "ratingButton"
    });
    $.__views.__alloyId145.add($.__views.ratingButton);
    buttonClicked ? $.addListener($.__views.ratingButton, "click", buttonClicked) : __defers["$.__views.ratingButton!click!buttonClicked"] = true;
    $.__views.__alloyId146 = Ti.UI.createLabel({
        left: 5,
        bottom: 5,
        color: Alloy.Globals.TikklrWhite,
        font: {
            fontSize: "9pt",
            fontFamily: "Substance-ExtraBold"
        },
        text: "RATING",
        id: "__alloyId146"
    });
    $.__views.ratingButton.add($.__views.__alloyId146);
    $.__views.tikksButton = Ti.UI.createButton({
        width: "65",
        height: "57",
        backgroundColor: Alloy.Globals.TikklrWhite,
        right: "7",
        title: "",
        id: "tikksButton"
    });
    $.__views.__alloyId145.add($.__views.tikksButton);
    buttonClicked ? $.addListener($.__views.tikksButton, "click", buttonClicked) : __defers["$.__views.tikksButton!click!buttonClicked"] = true;
    $.__views.videoCount = Ti.UI.createLabel({
        left: 5,
        top: 0,
        color: Alloy.Globals.TikklrGreen,
        font: {
            fontSize: "20pt",
            fontFamily: "Substance-ExtraBold"
        },
        id: "videoCount"
    });
    $.__views.tikksButton.add($.__views.videoCount);
    $.__views.__alloyId147 = Ti.UI.createLabel({
        left: 5,
        bottom: 5,
        color: Alloy.Globals.TikklrBlack,
        font: {
            fontSize: "9pt",
            fontFamily: "Substance-ExtraBold"
        },
        text: "TIKKS",
        id: "__alloyId147"
    });
    $.__views.tikksButton.add($.__views.__alloyId147);
    $.__views.followersButton = Ti.UI.createButton({
        width: "65",
        height: "57",
        backgroundColor: Alloy.Globals.TikklrDarkGray,
        right: "7",
        title: "",
        id: "followersButton"
    });
    $.__views.__alloyId145.add($.__views.followersButton);
    buttonClicked ? $.addListener($.__views.followersButton, "click", buttonClicked) : __defers["$.__views.followersButton!click!buttonClicked"] = true;
    $.__views.followersCount = Ti.UI.createLabel({
        left: 5,
        top: 0,
        color: Alloy.Globals.TikklrGreen,
        font: {
            fontSize: "20pt",
            fontFamily: "Substance-ExtraBold"
        },
        id: "followersCount"
    });
    $.__views.followersButton.add($.__views.followersCount);
    $.__views.__alloyId148 = Ti.UI.createLabel({
        left: 5,
        bottom: 5,
        color: Alloy.Globals.TikklrWhite,
        font: {
            fontSize: "9pt",
            fontFamily: "Substance-ExtraBold"
        },
        text: "FOLLOWERS",
        id: "__alloyId148"
    });
    $.__views.followersButton.add($.__views.__alloyId148);
    $.__views.followingButton = Ti.UI.createButton({
        width: "65",
        height: "57",
        backgroundColor: Alloy.Globals.TikklrDarkGray,
        right: "7",
        title: "",
        id: "followingButton"
    });
    $.__views.__alloyId145.add($.__views.followingButton);
    buttonClicked ? $.addListener($.__views.followingButton, "click", buttonClicked) : __defers["$.__views.followingButton!click!buttonClicked"] = true;
    $.__views.followingCount = Ti.UI.createLabel({
        left: 5,
        top: 0,
        color: Alloy.Globals.TikklrGreen,
        font: {
            fontSize: "20pt",
            fontFamily: "Substance-ExtraBold"
        },
        id: "followingCount"
    });
    $.__views.followingButton.add($.__views.followingCount);
    $.__views.__alloyId149 = Ti.UI.createLabel({
        left: 5,
        bottom: 5,
        color: Alloy.Globals.TikklrWhite,
        font: {
            fontSize: "9pt",
            fontFamily: "Substance-ExtraBold"
        },
        text: "FOLLOWING",
        id: "__alloyId149"
    });
    $.__views.followingButton.add($.__views.__alloyId149);
    $.__views.profileTableHeader = Ti.UI.createView({
        layout: "vertical",
        top: 210,
        backgroundColor: "transparent",
        id: "profileTableHeader"
    });
    $.__views.__alloyId144.add($.__views.profileTableHeader);
    $.__views.tableLabel = Ti.UI.createLabel({
        backgroundColor: "transparent",
        color: Alloy.Globals.TikklrGreen,
        textAlign: "center",
        font: {
            fontSize: "15pt",
            fontFamily: "Substance-ExtraBold"
        },
        height: 35,
        top: 5,
        id: "tableLabel",
        text: "MY TIKKS"
    });
    $.__views.profileTableHeader.add($.__views.tableLabel);
    $.__views.tableHeader = Alloy.createController("partials/tableHeader", {
        id: "tableHeader",
        __parentSymbol: __parentSymbol
    });
    $.__views.profileTable = Ti.UI.createTableView({
        separatorColor: "transparent",
        top: 243,
        bottom: 40,
        backgroundColor: Alloy.Globals.TikklrWhite,
        headerPullView: $.__views.tableHeader.getViewEx({
            recurse: true
        }),
        id: "profileTable",
        dataTransform: "profileNodeTransform"
    });
    $.__views.__alloyId144.add($.__views.profileTable);
    galleryDragEnd ? $.addListener($.__views.profileTable, "dragEnd", galleryDragEnd) : __defers["$.__views.profileTable!dragEnd!galleryDragEnd"] = true;
    tableScrollEnd ? $.addListener($.__views.profileTable, "scrollend", tableScrollEnd) : __defers["$.__views.profileTable!scrollend!tableScrollEnd"] = true;
    tableScroll ? $.addListener($.__views.profileTable, "scroll", tableScroll) : __defers["$.__views.profileTable!scroll!tableScroll"] = true;
    rowClicked ? $.addListener($.__views.profileTable, "click", rowClicked) : __defers["$.__views.profileTable!click!rowClicked"] = true;
    $.__views.tableHeader = Alloy.createController("partials/tableHeader", {
        id: "tableHeader",
        __parentSymbol: __parentSymbol
    });
    $.__views.followingTable = Ti.UI.createTableView({
        backgroundColor: "transparent",
        separatorColor: "transparent",
        top: "243",
        bottom: 40,
        headerPullView: $.__views.tableHeader.getViewEx({
            recurse: true
        }),
        visible: false,
        id: "followingTable",
        dataTransform: "userTransform"
    });
    $.__views.__alloyId144.add($.__views.followingTable);
    galleryDragEnd ? $.addListener($.__views.followingTable, "dragEnd", galleryDragEnd) : __defers["$.__views.followingTable!dragEnd!galleryDragEnd"] = true;
    tableScrollEnd ? $.addListener($.__views.followingTable, "scrollend", tableScrollEnd) : __defers["$.__views.followingTable!scrollend!tableScrollEnd"] = true;
    tableScroll ? $.addListener($.__views.followingTable, "scroll", tableScroll) : __defers["$.__views.followingTable!scroll!tableScroll"] = true;
    $.__views.tableHeader = Alloy.createController("partials/tableHeader", {
        id: "tableHeader",
        __parentSymbol: __parentSymbol
    });
    $.__views.followersTable = Ti.UI.createTableView({
        backgroundColor: "transparent",
        separatorColor: "transparent",
        top: "243",
        bottom: 40,
        headerPullView: $.__views.tableHeader.getViewEx({
            recurse: true
        }),
        visible: false,
        id: "followersTable",
        dataTransform: "userTransform"
    });
    $.__views.__alloyId144.add($.__views.followersTable);
    galleryDragEnd ? $.addListener($.__views.followersTable, "dragEnd", galleryDragEnd) : __defers["$.__views.followersTable!dragEnd!galleryDragEnd"] = true;
    tableScrollEnd ? $.addListener($.__views.followersTable, "scrollend", tableScrollEnd) : __defers["$.__views.followersTable!scrollend!tableScrollEnd"] = true;
    tableScroll ? $.addListener($.__views.followersTable, "scroll", tableScroll) : __defers["$.__views.followersTable!scroll!tableScroll"] = true;
    followersRowClicked ? $.addListener($.__views.followersTable, "click", followersRowClicked) : __defers["$.__views.followersTable!click!followersRowClicked"] = true;
    $.__views.seeAll = Ti.UI.createButton({
        bottom: "7",
        font: {
            fontSize: "15pt",
            fontFamily: "Substance-ExtraBold"
        },
        color: Alloy.Globals.TikklrGreen,
        width: "75",
        height: "35",
        id: "seeAll",
        title: "SEE ALL"
    });
    $.__views.__alloyId144.add($.__views.seeAll);
    seeAllClicked ? $.addListener($.__views.seeAll, "click", seeAllClicked) : __defers["$.__views.seeAll!click!seeAllClicked"] = true;
    var __alloyId153 = function() {
        var transformed = _.isFunction($.User.transform) ? $.User.transform() : $.User.toJSON();
        $.profileImage.image = _.template("{m.pictureUrl}", {
            m: transformed
        }, {
            interpolate: /\{([\s\S]+?)\}/g
        });
        $.profileUserName.text = _.template("{m.@realname}", {
            m: transformed
        }, {
            interpolate: /\{([\s\S]+?)\}/g
        });
        $.profileUserBio.text = _.template("{m.bio}", {
            m: transformed
        }, {
            interpolate: /\{([\s\S]+?)\}/g
        });
        $.videoCount.text = _.template("{m.videoCount}", {
            m: transformed
        }, {
            interpolate: /\{([\s\S]+?)\}/g
        });
        $.followersCount.text = _.template("{m.followers}", {
            m: transformed
        }, {
            interpolate: /\{([\s\S]+?)\}/g
        });
        $.followingCount.text = _.template("{m.following}", {
            m: transformed
        }, {
            interpolate: /\{([\s\S]+?)\}/g
        });
    };
    $.User.on("fetch change destroy", __alloyId153);
    exports.destroy = function() {
        $.User && $.User.off("fetch change destroy", __alloyId153);
    };
    _.extend($, $.__views);
    exports.baseController = "tikkGallery";
    $.MyVideos = Alloy.createCollection("Node");
    $.Followers = Alloy.createCollection("DrupalView");
    $.Followers.viewName = "commons_follow_user_followers";
    $.TotalCount.viewName = "total_nodes";
    var currentVideos = [];
    var currentFollowing = [];
    var currentFollowers = [];
    args = arguments[0];
    var galleryCenter = "375";
    var flag_name = Alloy.Globals.FollowFlag;
    var user = Alloy.Models.User;
    Alloy.Models.User = user;
    $.User = user;
    var selectedButton = $.tikksButton;
    var currentTable = $.profileTable;
    var Animation = require("alloy/animation");
    var animationDuration = 300;
    if (null != args && "undefined" != typeof args && "undefined" != typeof args["uid"] && args["uid"] != Alloy.Models.User.get("uid")) {
        if ("undefined" != typeof args["uid"]) {
            var uid = args["uid"];
            $.User.set("uid", uid, {
                silent: true
            });
            disableOwnUserFucntionality();
        }
    } else enableOwnUserFucntionality();
    fetchUser();
    var countFlagFinishedHandler = function(e) {
        Ti.API.info("Count flag finished with: " + JSON.stringify(e));
        if (e.nameToCount == flag_name) if ("uid" == e.callType) {
            user.following = e.count;
            user.set("following", e.count, {
                silent: true
            });
            $.followingCount.setText($.User.get("following"));
        } else {
            user.followers = e.count;
            user.set("followers", e.count, {
                silent: true
            });
            $.followersCount.setText($.User.get("followers"));
        }
    };
    Ti.App.addEventListener("countFlagFinished", countFlagFinishedHandler);
    var imageClicked = function() {
        user == Alloy.Models.User && alert("To edit your profile picture, please visit http://www.tikklr.com");
    };
    var refreshFollow = function() {
        var flag = Alloy.createModel("Flag");
        flag.countAll(flag_name, "uid", user.get("uid"));
        var flag2 = Alloy.createModel("Flag", true);
        flag2.countAll(flag_name, "entity_id", user.get("uid"));
    };
    $.profileImage.addEventListener("click", imageClicked);
    Ti.App.addEventListener("flagFinished", refreshFollow);
    $.MyVideos.on("change fetch", videosListLoaded);
    $.Followers.on("change fetch", followersListLoaded);
    Alloy.Collections["Following"].on("change fetch", followingListLoaded);
    exports.clean = function() {
        Ti.App.removeEventListener("countFlagFinished", countFlagFinishedHandler);
        Ti.App.removeEventListener("flagFinished", refreshFollow);
        $.profileImage.removeEventListener("click", imageClicked);
        $.MyVideos.off(null, null, $);
        $.Followers.off(null, null, $);
        Alloy.Collections["Following"].off(null, null, $);
        $.profileTable.setData([]);
        $.followersTable.setData([]);
        $.followingTable.setData([]);
        $.off();
        $.destroy();
    };
    __defers["$.__views.__alloyId142!click!backClicked"] && $.addListener($.__views.__alloyId142, "click", backClicked);
    __defers["$.__views.ratingButton!click!buttonClicked"] && $.addListener($.__views.ratingButton, "click", buttonClicked);
    __defers["$.__views.tikksButton!click!buttonClicked"] && $.addListener($.__views.tikksButton, "click", buttonClicked);
    __defers["$.__views.followersButton!click!buttonClicked"] && $.addListener($.__views.followersButton, "click", buttonClicked);
    __defers["$.__views.followingButton!click!buttonClicked"] && $.addListener($.__views.followingButton, "click", buttonClicked);
    __defers["$.__views.profileTable!dragEnd!galleryDragEnd"] && $.addListener($.__views.profileTable, "dragEnd", galleryDragEnd);
    __defers["$.__views.profileTable!scrollend!tableScrollEnd"] && $.addListener($.__views.profileTable, "scrollend", tableScrollEnd);
    __defers["$.__views.profileTable!scroll!tableScroll"] && $.addListener($.__views.profileTable, "scroll", tableScroll);
    __defers["$.__views.profileTable!click!rowClicked"] && $.addListener($.__views.profileTable, "click", rowClicked);
    __defers["$.__views.followingTable!dragEnd!galleryDragEnd"] && $.addListener($.__views.followingTable, "dragEnd", galleryDragEnd);
    __defers["$.__views.followingTable!scrollend!tableScrollEnd"] && $.addListener($.__views.followingTable, "scrollend", tableScrollEnd);
    __defers["$.__views.followingTable!scroll!tableScroll"] && $.addListener($.__views.followingTable, "scroll", tableScroll);
    __defers["$.__views.followersTable!dragEnd!galleryDragEnd"] && $.addListener($.__views.followersTable, "dragEnd", galleryDragEnd);
    __defers["$.__views.followersTable!scrollend!tableScrollEnd"] && $.addListener($.__views.followersTable, "scrollend", tableScrollEnd);
    __defers["$.__views.followersTable!scroll!tableScroll"] && $.addListener($.__views.followersTable, "scroll", tableScroll);
    __defers["$.__views.followersTable!click!followersRowClicked"] && $.addListener($.__views.followersTable, "click", followersRowClicked);
    __defers["$.__views.seeAll!click!seeAllClicked"] && $.addListener($.__views.seeAll, "click", seeAllClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;