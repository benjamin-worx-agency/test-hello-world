function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function handleTableViewItems() {
        if ("undefined" != typeof $.briefsTableView.data && "undefined" != typeof $.briefsTableView.data[0] && "undefined" != typeof $.briefsTableView.data[0].rows) {
            var numOfRows = $.briefsTableView.data[0].rows.length;
            if (numOfRows > $.BriefsNodes.length) {
                $.briefsTableView.setData([]);
                currentNodes = [];
            }
        }
        for (var i = 0; i < $.BriefsNodes.length; i++) if ("-1" == currentNodes.indexOf($.BriefsNodes.models[i].id)) {
            $.BriefsNodes.models[i].set(briefTransform($.BriefsNodes.models[i]), {
                silent: true
            });
            var args = {
                model: $.BriefsNodes.models[i]
            };
            $.briefsTableView.appendRow(Alloy.createController("briefListItem", args).getView());
            currentNodes.push($.BriefsNodes.models[i].id);
        }
    }
    require("alloy/controllers/tikkGallery").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "brief";
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
    $.__views.briefView = Ti.UI.createView({
        top: 0,
        left: 0,
        width: Ti.Platform.displayCaps.platformWidth,
        height: "100%",
        orientationModes: [ Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT, Ti.UI.PORTRAIT ],
        id: "briefView"
    });
    $.__views.briefView && $.addTopLevelView($.__views.briefView);
    $.__views.__alloyId0 = Ti.UI.createView({
        layout: "absolute",
        id: "__alloyId0"
    });
    $.__views.briefView.add($.__views.__alloyId0);
    $.__views.tableView = Ti.UI.createView({
        id: "tableView"
    });
    $.__views.__alloyId0.add($.__views.tableView);
    $.__views.tableHeader = Alloy.createController("partials/tableHeader", {
        id: "tableHeader",
        __parentSymbol: __parentSymbol
    });
    $.__views.briefsTableView = Ti.UI.createTableView({
        rowHeight: Ti.UI.SIZE,
        separatorColor: "transparent",
        separatorStyle: Titanium.UI.iPhone.TableViewSeparatorStyle.NONE,
        headerPullView: $.__views.tableHeader.getViewEx({
            recurse: true
        }),
        id: "briefsTableView",
        dataTransform: "briefTransform"
    });
    $.__views.tableView.add($.__views.briefsTableView);
    galleryDragEnd ? $.addListener($.__views.briefsTableView, "dragEnd", galleryDragEnd) : __defers["$.__views.briefsTableView!dragEnd!galleryDragEnd"] = true;
    tableScrollEnd ? $.addListener($.__views.briefsTableView, "scrollend", tableScrollEnd) : __defers["$.__views.briefsTableView!scrollend!tableScrollEnd"] = true;
    tableScroll ? $.addListener($.__views.briefsTableView, "scroll", tableScroll) : __defers["$.__views.briefsTableView!scroll!tableScroll"] = true;
    rowClicked ? $.addListener($.__views.briefsTableView, "singletap", rowClicked) : __defers["$.__views.briefsTableView!singletap!rowClicked"] = true;
    $.__views.noResults = Ti.UI.createView({
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        backgroundColor: Alloy.Globals.TikklrGray,
        id: "noResults",
        visible: false
    });
    $.__views.__alloyId0.add($.__views.noResults);
    $.__views.__alloyId2 = Ti.UI.createLabel({
        color: Alloy.Globals.TikklrGreen,
        font: {
            fontFamily: "Substance-ExtraBold",
            fontSize: "20pt",
            fontWeight: "bold"
        },
        text: "NO RESULTS FOUND",
        id: "__alloyId2"
    });
    $.__views.noResults.add($.__views.__alloyId2);
    exports.destroy = function() {};
    _.extend($, $.__views);
    exports.baseController = "tikkGallery";
    require("alloy/animation");
    var currentDate = new Date();
    var currentFormattedDate = currentDate.getFullYear() + "-" + (currentDate.getMonth() + 1) + "-" + currentDate.getDate();
    var params = {
        "parameters[type]": "briefs",
        "parameters[date][value][value]": currentFormattedDate,
        "parameters[date][value][operator]": "<=",
        "parameters[date][value2][value]": currentFormattedDate,
        "parameters[date][value2][operator]": ">=",
        "parameters[available][value][value]": 0,
        "parameters[available][value][operator]": "!=",
        "parameters[status]": 1,
        sort: "date",
        direction: "DESC",
        pagesize: 10
    };
    $.BriefsNodes = Alloy.createCollection("Node");
    var args = arguments[0] || null;
    var isLoadGallery = args.loadGallery || "true";
    var handleGalleryLoadedEvent = function(e) {
        $.tableView.show();
        $.noResults.hide();
        if ("undefined" != typeof $.getView() && "undefined" != typeof $.getView().getParent() && $.getView().getParent().id == e.id) {
            if ("faves" == e.id) {
                params["parameters[promote]"] = 1;
                params["direction"] = "DESC";
            } else if ("ending" == e.id) {
                params["direction"] = "ASC";
                params["sort"] = "date,1";
            }
            isLoadGallery && $.loadGallery($.BriefsNodes, params, null);
        }
    };
    var currentNodes = [];
    $.BriefsNodes.on("change fetch", handleTableViewItems);
    Ti.App.addEventListener("galleryLoaded", function(e) {
        handleGalleryLoadedEvent(e);
    });
    var handleNoResultsEvent = function() {
        $.noResults.show();
        $.noResults.visible = true;
        $.tableView.hide();
    };
    Ti.App.addEventListener("noResults", function(e) {
        handleNoResultsEvent(e);
    });
    if (null != params) "true" == isLoadGallery && $.loadGallery($.BriefsNodes, params, null); else {
        "undefined" != typeof $.briefView ? $.briefView.remove($.briefView.children[0]) : $.backButton.hide();
        "true" == isLoadGallery && $.loadGallery($.BriefsNodes, null);
    }
    exports.clean = function() {
        $.briefView = null;
        $.BriefsNodes.off(null, null, $);
        $.briefsTableView.setData([]);
        Ti.App.removeEventListener("galleryLoaded", handleGalleryLoadedEvent);
        Ti.App.removeEventListener("noResults", handleNoResultsEvent);
        $.off();
        $.destroy();
    };
    __defers["$.__views.briefsTableView!dragEnd!galleryDragEnd"] && $.addListener($.__views.briefsTableView, "dragEnd", galleryDragEnd);
    __defers["$.__views.briefsTableView!scrollend!tableScrollEnd"] && $.addListener($.__views.briefsTableView, "scrollend", tableScrollEnd);
    __defers["$.__views.briefsTableView!scroll!tableScroll"] && $.addListener($.__views.briefsTableView, "scroll", tableScroll);
    __defers["$.__views.briefsTableView!singletap!rowClicked"] && $.addListener($.__views.briefsTableView, "singletap", rowClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;