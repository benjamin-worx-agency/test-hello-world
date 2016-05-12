function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function __alloyId120(e) {
        if (e && e.fromAdapter) return;
        __alloyId120.opts || {};
        var models = __alloyId119.models;
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId112 = models[i];
            __alloyId112.__transform = messageTransform(__alloyId112);
            var __alloyId114 = Ti.UI.createTableViewRow({
                layout: "absolute",
                height: Ti.UI.SIZE,
                nodeId: _.template("{m.nid}", {
                    m: __alloyId112.__transform
                }, {
                    interpolate: /\{([\s\S]+?)\}/g
                })
            });
            rows.push(__alloyId114);
            var __alloyId116 = Ti.UI.createView({
                top: 0,
                left: 0,
                width: Ti.Platform.displayCaps.platformWidth,
                layout: "absolute",
                height: Ti.UI.SIZE,
                zIndex: 50,
                backgroundColor: Alloy.Globals.TikklrBlack
            });
            __alloyId114.add(__alloyId116);
            var __alloyId118 = Ti.UI.createWebView({
                color: Alloy.Globals.TikklrGreen,
                height: "75",
                width: Ti.UI.FILL,
                scalesPageToFit: false,
                layout: "absolute",
                html: _.template("{m.html}", {
                    m: __alloyId112.__transform
                }, {
                    interpolate: /\{([\s\S]+?)\}/g
                })
            });
            __alloyId116.add(__alloyId118);
        }
        $.__views.__alloyId110.setData(rows);
    }
    require("alloy/controllers/pandaGallery").apply(this, Array.prototype.slice.call(arguments));
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
    $.__views.__alloyId107 = Ti.UI.createView({
        top: 0,
        width: Ti.Platform.displayCaps.platformWidth,
        backgroundColor: "transparent",
        height: "40",
        id: "__alloyId107"
    });
    $.__views.inboxView.add($.__views.__alloyId107);
    $.__views.__alloyId108 = Ti.UI.createButton({
        left: "20",
        width: "40",
        height: "40",
        backgroundColor: "transparent",
        backgroundImage: "back.png",
        selectedBackgroundImage: "back-pressed.png",
        id: "__alloyId108"
    });
    $.__views.__alloyId107.add($.__views.__alloyId108);
    backClicked ? $.addListener($.__views.__alloyId108, "click", backClicked) : __defers["$.__views.__alloyId108!click!backClicked"] = true;
    $.__views.__alloyId109 = Ti.UI.createLabel({
        backgroundColor: "transparent",
        color: Alloy.Globals.TikklrGreen,
        font: {
            fontSize: "20pt",
            fontFamily: "Substance-ExtraBold"
        },
        height: 35,
        zIndex: 1e3,
        text: "INBOX",
        id: "__alloyId109"
    });
    $.__views.__alloyId107.add($.__views.__alloyId109);
    $.__views.tableView = Ti.UI.createView({
        top: "40",
        id: "tableView"
    });
    $.__views.inboxView.add($.__views.tableView);
    $.__views.tableHeader = Alloy.createController("partials/tableHeader", {
        id: "tableHeader",
        __parentSymbol: __parentSymbol
    });
    $.__views.__alloyId110 = Ti.UI.createTableView({
        rowHeight: Ti.UI.SIZE,
        separatorColor: "transparent",
        separatorStyle: Titanium.UI.iPhone.TableViewSeparatorStyle.NONE,
        headerPullView: $.__views.tableHeader.getViewEx({
            recurse: true
        }),
        id: "__alloyId110"
    });
    $.__views.tableView.add($.__views.__alloyId110);
    var __alloyId119 = Alloy.Collections["$.Messages"] || $.Messages;
    __alloyId119.on("fetch destroy change add remove reset", __alloyId120);
    galleryDragEnd ? $.addListener($.__views.__alloyId110, "dragEnd", galleryDragEnd) : __defers["$.__views.__alloyId110!dragEnd!galleryDragEnd"] = true;
    tableScrollEnd ? $.addListener($.__views.__alloyId110, "scrollend", tableScrollEnd) : __defers["$.__views.__alloyId110!scrollend!tableScrollEnd"] = true;
    tableScroll ? $.addListener($.__views.__alloyId110, "scroll", tableScroll) : __defers["$.__views.__alloyId110!scroll!tableScroll"] = true;
    exports.destroy = function() {
        __alloyId119 && __alloyId119.off("fetch destroy change add remove reset", __alloyId120);
    };
    _.extend($, $.__views);
    exports.baseController = "pandaGallery";
    var params = {
        "parameters[user]": Alloy.Models.User.get("uid"),
        pagesize: 10,
        "parameters[type]": "commons_activity_streams_node_created"
    };
    $.loadGallery($.Messages, params, null, null);
    __defers["$.__views.__alloyId108!click!backClicked"] && $.addListener($.__views.__alloyId108, "click", backClicked);
    __defers["$.__views.__alloyId110!dragEnd!galleryDragEnd"] && $.addListener($.__views.__alloyId110, "dragEnd", galleryDragEnd);
    __defers["$.__views.__alloyId110!scrollend!tableScrollEnd"] && $.addListener($.__views.__alloyId110, "scrollend", tableScrollEnd);
    __defers["$.__views.__alloyId110!scroll!tableScroll"] && $.addListener($.__views.__alloyId110, "scroll", tableScroll);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;