function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function __alloyId116(e) {
        if (e && e.fromAdapter) return;
        __alloyId116.opts || {};
        var models = __alloyId115.models;
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId108 = models[i];
            __alloyId108.__transform = messageTransform(__alloyId108);
            var __alloyId110 = Ti.UI.createTableViewRow({
                layout: "absolute",
                height: Ti.UI.SIZE,
                nodeId: _.template("{m.nid}", {
                    m: __alloyId108.__transform
                }, {
                    interpolate: /\{([\s\S]+?)\}/g
                })
            });
            rows.push(__alloyId110);
            var __alloyId112 = Ti.UI.createView({
                top: 0,
                left: 0,
                width: Ti.Platform.displayCaps.platformWidth,
                layout: "absolute",
                height: Ti.UI.SIZE,
                zIndex: 50,
                backgroundColor: Alloy.Globals.TikklrBlack
            });
            __alloyId110.add(__alloyId112);
            var __alloyId114 = Ti.UI.createWebView({
                color: Alloy.Globals.TikklrGreen,
                height: "75",
                width: Ti.UI.FILL,
                scalesPageToFit: false,
                layout: "absolute",
                html: _.template("{m.html}", {
                    m: __alloyId108.__transform
                }, {
                    interpolate: /\{([\s\S]+?)\}/g
                })
            });
            __alloyId112.add(__alloyId114);
        }
        $.__views.__alloyId106.setData(rows);
    }
    require("alloy/controllers/tikkGallery").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "inbox";
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
    $.Messages = Alloy.createCollection("Message");
    $.__views.inboxView = Ti.UI.createView({
        top: 0,
        left: 0,
        width: Ti.Platform.displayCaps.platformWidth,
        height: "100%",
        orientationModes: [ Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT, Ti.UI.PORTRAIT ],
        id: "inboxView"
    });
    $.__views.inboxView && $.addTopLevelView($.__views.inboxView);
    $.__views.__alloyId103 = Ti.UI.createView({
        top: 0,
        width: Ti.Platform.displayCaps.platformWidth,
        backgroundColor: "transparent",
        height: "40",
        id: "__alloyId103"
    });
    $.__views.inboxView.add($.__views.__alloyId103);
    $.__views.__alloyId104 = Ti.UI.createButton({
        left: "20",
        width: "40",
        height: "40",
        backgroundColor: "transparent",
        backgroundImage: "back.png",
        selectedBackgroundImage: "back-pressed.png",
        id: "__alloyId104"
    });
    $.__views.__alloyId103.add($.__views.__alloyId104);
    backClicked ? $.addListener($.__views.__alloyId104, "click", backClicked) : __defers["$.__views.__alloyId104!click!backClicked"] = true;
    $.__views.__alloyId105 = Ti.UI.createLabel({
        backgroundColor: "transparent",
        color: Alloy.Globals.TikklrGreen,
        font: {
            fontSize: "20pt",
            fontFamily: "Substance-ExtraBold"
        },
        height: 35,
        zIndex: 1e3,
        text: "INBOX",
        id: "__alloyId105"
    });
    $.__views.__alloyId103.add($.__views.__alloyId105);
    $.__views.tableView = Ti.UI.createView({
        top: "40",
        id: "tableView"
    });
    $.__views.inboxView.add($.__views.tableView);
    $.__views.tableHeader = Alloy.createController("partials/tableHeader", {
        id: "tableHeader",
        __parentSymbol: __parentSymbol
    });
    $.__views.__alloyId106 = Ti.UI.createTableView({
        rowHeight: Ti.UI.SIZE,
        separatorColor: "transparent",
        separatorStyle: Titanium.UI.iPhone.TableViewSeparatorStyle.NONE,
        headerPullView: $.__views.tableHeader.getViewEx({
            recurse: true
        }),
        id: "__alloyId106"
    });
    $.__views.tableView.add($.__views.__alloyId106);
    var __alloyId115 = Alloy.Collections["$.Messages"] || $.Messages;
    __alloyId115.on("fetch destroy change add remove reset", __alloyId116);
    galleryDragEnd ? $.addListener($.__views.__alloyId106, "dragEnd", galleryDragEnd) : __defers["$.__views.__alloyId106!dragEnd!galleryDragEnd"] = true;
    tableScrollEnd ? $.addListener($.__views.__alloyId106, "scrollend", tableScrollEnd) : __defers["$.__views.__alloyId106!scrollend!tableScrollEnd"] = true;
    tableScroll ? $.addListener($.__views.__alloyId106, "scroll", tableScroll) : __defers["$.__views.__alloyId106!scroll!tableScroll"] = true;
    exports.destroy = function() {
        __alloyId115 && __alloyId115.off("fetch destroy change add remove reset", __alloyId116);
    };
    _.extend($, $.__views);
    exports.baseController = "tikkGallery";
    var params = {
        "parameters[user]": Alloy.Models.User.get("uid"),
        pagesize: 10,
        "parameters[type]": "commons_activity_streams_node_created"
    };
    $.loadGallery($.Messages, params, null, null);
    __defers["$.__views.__alloyId104!click!backClicked"] && $.addListener($.__views.__alloyId104, "click", backClicked);
    __defers["$.__views.__alloyId106!dragEnd!galleryDragEnd"] && $.addListener($.__views.__alloyId106, "dragEnd", galleryDragEnd);
    __defers["$.__views.__alloyId106!scrollend!tableScrollEnd"] && $.addListener($.__views.__alloyId106, "scrollend", tableScrollEnd);
    __defers["$.__views.__alloyId106!scroll!tableScroll"] && $.addListener($.__views.__alloyId106, "scroll", tableScroll);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;