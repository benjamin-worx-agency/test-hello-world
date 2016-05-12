function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function searchUsersListLoaded() {
        if ("undefined" != typeof $.searchUsersTable.data && "undefined" != typeof $.searchUsersTable.data[0] && "undefined" != typeof $.searchUsersTable.data[0].rows) {
            var numOfRows = $.searchUsersTable.data[0].rows.length;
            if (numOfRows > $.SearchUsers.length || isNewSearch) {
                isNewSearch = false;
                $.searchUsersTable.setData([]);
                currentSearchUsers = [];
            }
        }
        for (var i = 0; i < $.SearchUsers.length; i++) if ("-1" == currentSearchUsers.indexOf($.SearchUsers.models[i].id)) {
            $.SearchUsers.models[i].set(userTransform($.SearchUsers.models[i]), {
                silent: true
            });
            var args = {
                model: $.SearchUsers.models[i]
            };
            $.searchUsersTable.appendRow(Alloy.createController("followListItem", args).getView());
            currentSearchUsers.push($.SearchUsers.models[i].id);
        }
    }
    function search() {
        if ("" != $.search.value) {
            isNewSearch = true;
            $.enableLoadMore();
            $.noResults.hide();
            $.tableView.show();
            params = {
                keys: $.search.value,
                "parameters[status]": 1
            };
            $.loadGallery($.SearchUsers, params, null, null);
        }
    }
    require("alloy/controllers/pandaGallery").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "search/people";
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
    $.__views.hashSearch = Ti.UI.createView({
        top: 0,
        layout: "vertical",
        backgroundColor: "black",
        id: "hashSearch"
    });
    $.__views.hashSearch && $.addTopLevelView($.__views.hashSearch);
    $.__views.__alloyId461 = Ti.UI.createView({
        top: 0,
        height: "85",
        backgroundColor: Alloy.Globals.TikklrGreen,
        id: "__alloyId461"
    });
    $.__views.hashSearch.add($.__views.__alloyId461);
    $.__views.__alloyId462 = Ti.UI.createView({
        left: "0",
        width: "30",
        backgroundImage: "search-at.png",
        id: "__alloyId462"
    });
    $.__views.search = Ti.UI.createTextField({
        height: "32",
        width: "267",
        backgroundColor: Alloy.Globals.TikklrDarkGreen,
        color: Alloy.Globals.TikklrGreen,
        paddingLeft: "22",
        id: "search",
        hintText: "SEARCH PEOPLE"
    });
    $.__views.__alloyId461.add($.__views.search);
    $.__views.search.add($.__views.__alloyId462);
    search ? $.addListener($.__views.search, "blur", search) : __defers["$.__views.search!blur!search"] = true;
    $.__views.__alloyId462 = Ti.UI.createView({
        left: "0",
        width: "30",
        backgroundImage: "search-at.png",
        id: "__alloyId462"
    });
    $.__views.search.add($.__views.__alloyId462);
    $.__views.__alloyId463 = Ti.UI.createView({
        layout: "absolute",
        id: "__alloyId463"
    });
    $.__views.hashSearch.add($.__views.__alloyId463);
    $.__views.tableView = Ti.UI.createView({
        id: "tableView"
    });
    $.__views.__alloyId463.add($.__views.tableView);
    $.__views.tableHeader = Alloy.createController("partials/tableHeader", {
        id: "tableHeader",
        __parentSymbol: __parentSymbol
    });
    $.__views.searchUsersTable = Ti.UI.createTableView({
        rowHeight: Ti.UI.SIZE,
        separatorColor: "transparent",
        separatorStyle: Titanium.UI.iPhone.TableViewSeparatorStyle.NONE,
        headerPullView: $.__views.tableHeader.getViewEx({
            recurse: true
        }),
        id: "searchUsersTable",
        dataTransform: "userTransform"
    });
    $.__views.tableView.add($.__views.searchUsersTable);
    galleryDragEnd ? $.addListener($.__views.searchUsersTable, "dragEnd", galleryDragEnd) : __defers["$.__views.searchUsersTable!dragEnd!galleryDragEnd"] = true;
    tableScrollEnd ? $.addListener($.__views.searchUsersTable, "scrollend", tableScrollEnd) : __defers["$.__views.searchUsersTable!scrollend!tableScrollEnd"] = true;
    tableScroll ? $.addListener($.__views.searchUsersTable, "scroll", tableScroll) : __defers["$.__views.searchUsersTable!scroll!tableScroll"] = true;
    $.__views.noResults = Ti.UI.createView({
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        backgroundColor: Alloy.Globals.TikklrGray,
        id: "noResults",
        visible: false
    });
    $.__views.__alloyId463.add($.__views.noResults);
    $.__views.__alloyId465 = Ti.UI.createLabel({
        color: Alloy.Globals.TikklrGreen,
        font: {
            fontFamily: "Substance-ExtraBold",
            fontSize: "20pt",
            fontWeight: "bold"
        },
        text: "NO RESULTS FOUND",
        id: "__alloyId465"
    });
    $.__views.noResults.add($.__views.__alloyId465);
    exports.destroy = function() {};
    _.extend($, $.__views);
    exports.baseController = "pandaGallery";
    require("alloy/animation");
    var params = {
        keys: "",
        "parameters[status]": 1
    };
    Alloy.Globals.FollowFlag;
    var args = arguments[0] || null;
    var isLoadGallery = args.loadGallery || "true";
    $.SearchUsers = Alloy.createCollection("SearchUser");
    var currentSearchUsers = [];
    var isNewSearch = true;
    if (null != args && "undefined" != typeof args) {
        null != args.search && "undefined" != typeof args.search && ($.search.value = args.search);
        null != args.params && "undefined" != typeof args.params && (params = args.params);
        true == isLoadGallery && search();
    }
    $.SearchUsers.on("change fetch", searchUsersListLoaded);
    var handleGalleryLoadedEvent = function(e) {
        $.noResults.hide();
        $.tableView.show();
        "undefined" != typeof $.getView().getParent() && $.getView().getParent().id == e.id && "" != $.search.value && $.loadGallery($.SearchUsers, params, null, null);
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
    Ti.App.addEventListener("flagFinished", flagFinished);
    exports.clean = function() {
        Ti.App.removeEventListener("galleryLoaded", handleGalleryLoadedEvent);
        Ti.App.removeEventListener("noResults", handleNoResultsEvent);
        Ti.App.removeEventListener("flagFinished", flagFinished);
        $.SearchUsers.off(null, null, $);
        $.searchUsersTable.setData([]);
        $.destroy();
        $.off();
    };
    __defers["$.__views.search!blur!search"] && $.addListener($.__views.search, "blur", search);
    __defers["$.__views.searchUsersTable!dragEnd!galleryDragEnd"] && $.addListener($.__views.searchUsersTable, "dragEnd", galleryDragEnd);
    __defers["$.__views.searchUsersTable!scrollend!tableScrollEnd"] && $.addListener($.__views.searchUsersTable, "scrollend", tableScrollEnd);
    __defers["$.__views.searchUsersTable!scroll!tableScroll"] && $.addListener($.__views.searchUsersTable, "scroll", tableScroll);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;