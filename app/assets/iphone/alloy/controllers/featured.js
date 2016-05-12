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
        if ("undefined" != typeof $.featuredGalleryTable.data && "undefined" != typeof $.featuredGalleryTable.data[0] && "undefined" != typeof $.featuredGalleryTable.data[0].rows) {
            var numOfRows = $.featuredGalleryTable.data[0].rows.length;
            if (numOfRows > $.FeaturedVideos.length) {
                $.featuredGalleryTable.setData([]);
                currentNodes = [];
            }
        }
        for (var i = 0; i < $.FeaturedVideos.length; i++) if ("-1" == currentNodes.indexOf($.FeaturedVideos.models[i].id)) {
            $.FeaturedVideos.models[i].set(nodeTransform($.FeaturedVideos.models[i]), {
                silent: true
            });
            var args = {
                model: $.FeaturedVideos.models[i]
            };
            $.featuredGalleryTable.appendRow(Alloy.createController("featuredListItem", args).getView());
            currentNodes.push($.FeaturedVideos.models[i].id);
        }
    }
    require("alloy/controllers/pandaGallery").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "featured";
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
    $.__views.featuredView = Ti.UI.createView({
        id: "featuredView",
        layout: "vertical"
    });
    $.__views.featuredView && $.addTopLevelView($.__views.featuredView);
    $.__views.__alloyId87 = Ti.UI.createView({
        layout: "absolute",
        id: "__alloyId87"
    });
    $.__views.featuredView.add($.__views.__alloyId87);
    $.__views.tableView = Ti.UI.createView({
        id: "tableView"
    });
    $.__views.__alloyId87.add($.__views.tableView);
    $.__views.tableHeader = Alloy.createController("partials/tableHeader", {
        id: "tableHeader",
        __parentSymbol: __parentSymbol
    });
    $.__views.featuredGalleryTable = Ti.UI.createTableView({
        rowHeight: Ti.UI.SIZE,
        separatorColor: "transparent",
        separatorStyle: Titanium.UI.iPhone.TableViewSeparatorStyle.NONE,
        headerPullView: $.__views.tableHeader.getViewEx({
            recurse: true
        }),
        id: "featuredGalleryTable",
        dataTransform: "nodeTransform"
    });
    $.__views.tableView.add($.__views.featuredGalleryTable);
    galleryDragEnd ? $.addListener($.__views.featuredGalleryTable, "dragEnd", galleryDragEnd) : __defers["$.__views.featuredGalleryTable!dragEnd!galleryDragEnd"] = true;
    tableScrollEnd ? $.addListener($.__views.featuredGalleryTable, "scrollend", tableScrollEnd) : __defers["$.__views.featuredGalleryTable!scrollend!tableScrollEnd"] = true;
    tableScroll ? $.addListener($.__views.featuredGalleryTable, "scroll", tableScroll) : __defers["$.__views.featuredGalleryTable!scroll!tableScroll"] = true;
    rowClicked ? $.addListener($.__views.featuredGalleryTable, "singletap", rowClicked) : __defers["$.__views.featuredGalleryTable!singletap!rowClicked"] = true;
    showDescription ? $.addListener($.__views.featuredGalleryTable, "swipe", showDescription) : __defers["$.__views.featuredGalleryTable!swipe!showDescription"] = true;
    $.__views.noResults = Ti.UI.createView({
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        backgroundColor: Alloy.Globals.TikklrGray,
        id: "noResults",
        visible: false
    });
    $.__views.__alloyId87.add($.__views.noResults);
    $.__views.__alloyId89 = Ti.UI.createLabel({
        color: Alloy.Globals.TikklrGreen,
        font: {
            fontFamily: "Substance-ExtraBold",
            fontSize: "20pt",
            fontWeight: "bold"
        },
        text: "NO RESULTS FOUND",
        id: "__alloyId89"
    });
    $.__views.noResults.add($.__views.__alloyId89);
    exports.destroy = function() {};
    _.extend($, $.__views);
    exports.baseController = "pandaGallery";
    require("alloy/animation");
    var params = {
        "parameters[type]": "video",
        "parameters[promote]": 1,
        sort: "created",
        direction: "DESC",
        pagesize: 10,
        "parameters[status]": 1
    };
    $.FeaturedVideos = Alloy.createCollection("Node");
    var args = arguments[0] || null;
    var isLoadGallery = args.loadGallery || "true";
    null != args && "undefined" != typeof args && null != args.params && "undefined" != typeof args.params && (params = args.params);
    var handleGalleryLoadedEvent = function(e) {
        $.tableView.show();
        $.noResults.hide();
        if ("undefined" != typeof $.getView() && "undefined" != typeof $.getView().getParent() && $.getView().getParent().id == e.id) {
            if ("popular" == e.id) {
                params["direction"] = "DESC";
                delete params["parameters[og_group_ref]"];
                delete params["parameters[promote]"];
            }
            $.loadGallery($.FeaturedVideos, params, null, null);
        }
    };
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
    if (null != params) "true" == isLoadGallery && $.loadGallery($.FeaturedVideos, params, null, null); else {
        "undefined" != typeof $.featuredView ? $.featuredView.remove($.featuredView.children[0]) : $.backButton.hide();
        "true" == isLoadGallery && $.loadGallery($.FeaturedVideos, null, null, null);
    }
    var currentNodes = [];
    $.FeaturedVideos.on("change fetch", handleTableViewItems);
    exports.clean = function() {
        $.destroy();
        Ti.App.removeEventListener("galleryLoaded", handleGalleryLoadedEvent);
        Ti.App.removeEventListener("noResults", handleNoResultsEvent);
        $.off();
        $.FeaturedVideos.off(null, null, $);
    };
    __defers["$.__views.featuredGalleryTable!dragEnd!galleryDragEnd"] && $.addListener($.__views.featuredGalleryTable, "dragEnd", galleryDragEnd);
    __defers["$.__views.featuredGalleryTable!scrollend!tableScrollEnd"] && $.addListener($.__views.featuredGalleryTable, "scrollend", tableScrollEnd);
    __defers["$.__views.featuredGalleryTable!scroll!tableScroll"] && $.addListener($.__views.featuredGalleryTable, "scroll", tableScroll);
    __defers["$.__views.featuredGalleryTable!singletap!rowClicked"] && $.addListener($.__views.featuredGalleryTable, "singletap", rowClicked);
    __defers["$.__views.featuredGalleryTable!swipe!showDescription"] && $.addListener($.__views.featuredGalleryTable, "swipe", showDescription);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;