function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function __alloyId418(e) {
        if (e && e.fromAdapter) return;
        __alloyId418.opts || {};
        var models = __alloyId417.models;
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId377 = models[i];
            __alloyId377.__transform = briefTransform(__alloyId377);
            var __alloyId378 = Ti.UI.createTableViewRow({
                height: Ti.UI.SIZE,
                selectionStyle: "NONE",
                nodeId: _.template("{m.nid}", {
                    m: __alloyId377.__transform
                }, {
                    interpolate: /\{([\s\S]+?)\}/g
                }),
                nodeType: "brief"
            });
            rows.push(__alloyId378);
            var __alloyId380 = Ti.UI.createView({
                top: "40",
                zIndex: 100,
                left: Ti.Platform.displayCaps.platformWidth,
                width: Ti.Platform.displayCaps.platformWidth,
                height: Ti.UI.SIZE,
                backgroundColor: Alloy.Globals.TikklrBlack,
                opacity: .9,
                layout: "vertical"
            });
            __alloyId378.add(__alloyId380);
            var __alloyId382 = Ti.UI.createView({
                top: "0",
                left: "0",
                width: "40",
                height: "40",
                defaultImage: "true"
            });
            __alloyId380.add(__alloyId382);
            var __alloyId384 = Ti.UI.createLabel({
                font: {
                    fontSize: "12pt",
                    fontFamily: "Substance-Medium"
                },
                color: Alloy.Globals.TikklrGreen,
                top: "0",
                left: "10",
                right: "10",
                height: "20",
                text: "Tags:"
            });
            __alloyId380.add(__alloyId384);
            var __alloyId386 = Ti.UI.createView({
                top: "0",
                left: "10",
                right: "10",
                height: "25"
            });
            __alloyId380.add(__alloyId386);
            var __alloyId388 = Ti.UI.createLabel({
                top: "0",
                left: "0",
                color: Alloy.Globals.TikklrGreen,
                font: {
                    fontSize: "14pt",
                    fontFamily: "Substance-ExtraBold"
                },
                text: "Information on the brief"
            });
            __alloyId386.add(__alloyId388);
            var __alloyId390 = Ti.UI.createView({
                top: "0",
                height: Ti.UI.SIZE,
                layout: "horizontal",
                backgroundColor: "transparent",
                width: "100%"
            });
            __alloyId380.add(__alloyId390);
            var __alloyId392 = Ti.UI.createView({
                top: 5,
                left: 5,
                right: 5,
                height: Ti.UI.SIZE,
                backgroundColor: "transparent"
            });
            __alloyId390.add(__alloyId392);
            var __alloyId393 = Alloy.createWidget("com.baboonmedia.remoteimage", "widget", {
                left: "2",
                top: "2",
                width: "60",
                height: "50",
                image: _.template("{m.brandLogoUrl}", {
                    m: __alloyId377.__transform
                }, {
                    interpolate: /\{([\s\S]+?)\}/g
                }),
                $model: __alloyId377,
                __parentSymbol: __alloyId392
            });
            __alloyId393.setParent(__alloyId392);
            var __alloyId395 = Ti.UI.createView({
                top: 0,
                height: Ti.UI.SIZE,
                left: 60,
                width: 170,
                layout: "vertical"
            });
            __alloyId392.add(__alloyId395);
            var __alloyId396 = Ti.UI.createLabel({
                left: 5,
                top: 0,
                font: {
                    fontSize: "12pt",
                    fontFamily: "Substance-ExtraBold"
                },
                color: Alloy.Globals.TikklrGreen,
                text: _.template("{m.titleUpperCase}", {
                    m: __alloyId377.__transform
                }, {
                    interpolate: /\{([\s\S]+?)\}/g
                })
            });
            __alloyId395.add(__alloyId396);
            var __alloyId397 = Ti.UI.createLabel({
                left: 5,
                font: {
                    fontSize: "10pt",
                    fontFamily: "Substance-ExtraBold"
                },
                color: Alloy.Globals.TikklrGreen,
                text: _.template("{m.followers}", {
                    m: __alloyId377.__transform
                }, {
                    interpolate: /\{([\s\S]+?)\}/g
                })
            });
            __alloyId395.add(__alloyId397);
            var __alloyId398 = Ti.UI.createButton({
                right: "5",
                top: "5",
                bottom: "5",
                width: "62",
                height: "42",
                backgroundImage: "follow.png",
                backgroundColor: "transparent"
            });
            __alloyId392.add(__alloyId398);
            disableClick ? $.addListener(__alloyId398, "singletap", disableClick) : __defers["__alloyId398!singletap!disableClick"] = true;
            followClicked ? $.addListener(__alloyId398, "click", followClicked) : __defers["__alloyId398!click!followClicked"] = true;
            var __alloyId399 = Ti.UI.createButton({
                right: "5",
                top: "5",
                bottom: "5",
                width: "62",
                height: "42",
                backgroundImage: "following.png",
                backgroundColor: Alloy.Globals.TikklrGreen,
                visible: "false"
            });
            __alloyId392.add(__alloyId399);
            disableClick ? $.addListener(__alloyId399, "singletap", disableClick) : __defers["__alloyId399!singletap!disableClick"] = true;
            followersClicked ? $.addListener(__alloyId399, "click", followersClicked) : __defers["__alloyId399!click!followersClicked"] = true;
            var __alloyId401 = Ti.UI.createView({
                top: 0,
                left: 0,
                width: Ti.Platform.displayCaps.platformWidth,
                layout: "absolute",
                height: Ti.UI.SIZE,
                zIndex: 50,
                backgroundColor: Alloy.Globals.TikklrBlack
            });
            __alloyId378.add(__alloyId401);
            var __alloyId402 = Alloy.createWidget("com.baboonmedia.remoteimage", "widget", {
                left: 0,
                top: 0,
                width: Ti.UI.FILL,
                height: Ti.UI.SIZE,
                image: _.template("{m.thumb}", {
                    m: __alloyId377.__transform
                }, {
                    interpolate: /\{([\s\S]+?)\}/g
                }),
                $model: __alloyId377,
                __parentSymbol: __alloyId401
            });
            __alloyId402.setParent(__alloyId401);
            var __alloyId404 = Ti.UI.createView({
                top: 0,
                opacity: .7,
                height: Ti.UI.SIZE,
                width: Ti.UI.FILL,
                backgroundColor: Alloy.Globals.TikklrWhite
            });
            __alloyId401.add(__alloyId404);
            var __alloyId405 = Ti.UI.createLabel({
                color: Alloy.Globals.TikklrGreen,
                left: "10",
                top: "0",
                height: "25",
                right: "90",
                font: {
                    fontSize: "15pt",
                    fontFamily: "Substance-ExtraBold"
                },
                text: _.template("{m.titleUpperCase}", {
                    m: __alloyId377.__transform
                }, {
                    interpolate: /\{([\s\S]+?)\}/g
                })
            });
            __alloyId404.add(__alloyId405);
            var __alloyId407 = Ti.UI.createView({
                backgroundImage: "molecule.png",
                width: "40",
                height: "40",
                right: "50",
                defaultImage: "true",
                visible: false
            });
            __alloyId404.add(__alloyId407);
            shareVideo ? $.addListener(__alloyId407, "click", shareVideo) : __defers["__alloyId407!click!shareVideo"] = true;
            var __alloyId409 = Ti.UI.createView({
                backgroundImage: "star.png",
                width: "40",
                height: "40",
                right: "5",
                defaultImage: "true",
                visible: false
            });
            __alloyId404.add(__alloyId409);
            starVideo ? $.addListener(__alloyId409, "click", starVideo) : __defers["__alloyId409!click!starVideo"] = true;
            var __alloyId411 = Ti.UI.createView({
                top: "0",
                left: Ti.Platform.displayCaps.platformWidth,
                width: Ti.Platform.displayCaps.platformWidth,
                backgroundColor: Alloy.Globals.TikklrBlack,
                height: "40",
                layout: "horizontal"
            });
            __alloyId401.add(__alloyId411);
            var __alloyId412 = Ti.UI.createView({
                top: 0,
                left: 0,
                width: "40",
                height: "40",
                backgroundImage: "cancel-white.png",
                backgroundColor: Alloy.Globals.TikklrRed
            });
            __alloyId411.add(__alloyId412);
            handleCloseClicked ? $.addListener(__alloyId412, "click", handleCloseClicked) : __defers["__alloyId412!click!handleCloseClicked"] = true;
            var __alloyId413 = Ti.UI.createView({
                left: "30",
                width: "40",
                height: "40",
                backgroundImage: "facebook.png"
            });
            __alloyId411.add(__alloyId413);
            shareClicked ? $.addListener(__alloyId413, "click", shareClicked) : __defers["__alloyId413!click!shareClicked"] = true;
            var __alloyId414 = Ti.UI.createView({
                left: "30",
                width: "40",
                height: "40",
                backgroundImage: "twitter.png"
            });
            __alloyId411.add(__alloyId414);
            shareClicked ? $.addListener(__alloyId414, "click", shareClicked) : __defers["__alloyId414!click!shareClicked"] = true;
            var __alloyId415 = Ti.UI.createView({
                left: "30",
                width: "40",
                height: "40",
                backgroundImage: "linkedIn.png"
            });
            __alloyId411.add(__alloyId415);
            shareClicked ? $.addListener(__alloyId415, "click", shareClicked) : __defers["__alloyId415!click!shareClicked"] = true;
            var __alloyId416 = Ti.UI.createView({
                top: 0,
                left: "30",
                width: "40",
                height: "40",
                backgroundImage: "approve-red.png",
                backgroundColor: Alloy.Globals.TikklrWhite
            });
            __alloyId411.add(__alloyId416);
            handleCloseClicked ? $.addListener(__alloyId416, "click", handleCloseClicked) : __defers["__alloyId416!click!handleCloseClicked"] = true;
        }
        $.__views.__alloyId375.setData(rows);
    }
    function search() {
        if ("" != $.search.value) {
            $.enableLoadMore();
            $.noResults.hide();
            $.tableView.show();
            params = {
                "parameters[type]": "briefs",
                "parameters[title]": $.search.value + "%",
                sort: "created",
                direction: "DESC",
                pagesize: 10
            };
            $.loadGallery($.SearchBriefs, params, null, null);
        }
    }
    require("alloy/controllers/pandaGallery").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "search/brief";
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
    $.SearchBriefs = Alloy.createCollection("Node");
    $.__views.hashSearch = Ti.UI.createView({
        top: 0,
        layout: "vertical",
        backgroundColor: "black",
        id: "hashSearch"
    });
    $.__views.hashSearch && $.addTopLevelView($.__views.hashSearch);
    $.__views.__alloyId372 = Ti.UI.createView({
        top: 0,
        height: "85",
        backgroundColor: Alloy.Globals.TikklrGreen,
        id: "__alloyId372"
    });
    $.__views.hashSearch.add($.__views.__alloyId372);
    $.__views.__alloyId373 = Ti.UI.createView({
        left: "5",
        width: "20",
        backgroundImage: "search-hash.png",
        id: "__alloyId373"
    });
    $.__views.search = Ti.UI.createTextField({
        height: "32",
        width: "267",
        backgroundColor: Alloy.Globals.TikklrDarkGreen,
        color: Alloy.Globals.TikklrGreen,
        paddingLeft: "22",
        id: "search",
        hintText: "SEARCH BRIEFS"
    });
    $.__views.__alloyId372.add($.__views.search);
    $.__views.search.add($.__views.__alloyId373);
    search ? $.addListener($.__views.search, "blur", search) : __defers["$.__views.search!blur!search"] = true;
    $.__views.__alloyId373 = Ti.UI.createView({
        left: "5",
        width: "20",
        backgroundImage: "search-hash.png",
        id: "__alloyId373"
    });
    $.__views.search.add($.__views.__alloyId373);
    $.__views.__alloyId374 = Ti.UI.createView({
        layout: "absolute",
        id: "__alloyId374"
    });
    $.__views.hashSearch.add($.__views.__alloyId374);
    $.__views.tableView = Ti.UI.createView({
        id: "tableView"
    });
    $.__views.__alloyId374.add($.__views.tableView);
    $.__views.tableHeader = Alloy.createController("partials/tableHeader", {
        id: "tableHeader",
        __parentSymbol: __parentSymbol
    });
    $.__views.__alloyId375 = Ti.UI.createTableView({
        rowHeight: Ti.UI.SIZE,
        separatorColor: "transparent",
        separatorStyle: Titanium.UI.iPhone.TableViewSeparatorStyle.NONE,
        headerPullView: $.__views.tableHeader.getViewEx({
            recurse: true
        }),
        id: "__alloyId375"
    });
    $.__views.tableView.add($.__views.__alloyId375);
    var __alloyId417 = Alloy.Collections["$.SearchBriefs"] || $.SearchBriefs;
    __alloyId417.on("fetch destroy change add remove reset", __alloyId418);
    galleryDragEnd ? $.addListener($.__views.__alloyId375, "dragEnd", galleryDragEnd) : __defers["$.__views.__alloyId375!dragEnd!galleryDragEnd"] = true;
    tableScrollEnd ? $.addListener($.__views.__alloyId375, "scrollend", tableScrollEnd) : __defers["$.__views.__alloyId375!scrollend!tableScrollEnd"] = true;
    tableScroll ? $.addListener($.__views.__alloyId375, "scroll", tableScroll) : __defers["$.__views.__alloyId375!scroll!tableScroll"] = true;
    rowClicked ? $.addListener($.__views.__alloyId375, "singletap", rowClicked) : __defers["$.__views.__alloyId375!singletap!rowClicked"] = true;
    showDescription ? $.addListener($.__views.__alloyId375, "swipe", showDescription) : __defers["$.__views.__alloyId375!swipe!showDescription"] = true;
    $.__views.noResults = Ti.UI.createView({
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        backgroundColor: Alloy.Globals.TikklrGray,
        id: "noResults",
        visible: false
    });
    $.__views.__alloyId374.add($.__views.noResults);
    $.__views.__alloyId419 = Ti.UI.createLabel({
        color: Alloy.Globals.TikklrGreen,
        font: {
            fontFamily: "Substance-ExtraBold",
            fontSize: "20pt",
            fontWeight: "bold"
        },
        text: "NO RESULTS FOUND",
        id: "__alloyId419"
    });
    $.__views.noResults.add($.__views.__alloyId419);
    exports.destroy = function() {
        __alloyId417 && __alloyId417.off("fetch destroy change add remove reset", __alloyId418);
    };
    _.extend($, $.__views);
    exports.baseController = "pandaGallery";
    require("alloy/animation");
    var params = {
        "parameters[type]": "briefs",
        "parameters[title]": $.search.value + "%",
        sort: "created",
        direction: "DESC",
        pagesize: 10
    };
    var args = arguments[0] || null;
    var isLoadGallery = args.loadGallery || "true";
    if (null != args && "undefined" != typeof args) {
        null != args.search && "undefined" != typeof args.search && ($.search.value = args.search);
        null != args.params && "undefined" != typeof args.params && (params = args.params);
        true == isLoadGallery && search();
    }
    var handleGalleryLoadedEvent = function(e) {
        $.noResults.hide();
        $.tableView.show();
        "undefined" != typeof $.getView().getParent() && $.getView().getParent().id == e.id && "" != $.search.value && $.loadGallery($.SearchBriefs, params, null, null);
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
    exports.clean = function() {
        Ti.App.removeEventListener("galleryLoaded", handleGalleryLoadedEvent);
        Ti.App.removeEventListener("noResults", handleNoResultsEvent);
        $.destroy();
        $.off();
    };
    __defers["$.__views.search!blur!search"] && $.addListener($.__views.search, "blur", search);
    __defers["__alloyId398!singletap!disableClick"] && $.addListener(__alloyId398, "singletap", disableClick);
    __defers["__alloyId398!click!followClicked"] && $.addListener(__alloyId398, "click", followClicked);
    __defers["__alloyId399!singletap!disableClick"] && $.addListener(__alloyId399, "singletap", disableClick);
    __defers["__alloyId399!click!followersClicked"] && $.addListener(__alloyId399, "click", followersClicked);
    __defers["__alloyId407!click!shareVideo"] && $.addListener(__alloyId407, "click", shareVideo);
    __defers["__alloyId409!click!starVideo"] && $.addListener(__alloyId409, "click", starVideo);
    __defers["__alloyId412!click!handleCloseClicked"] && $.addListener(__alloyId412, "click", handleCloseClicked);
    __defers["__alloyId413!click!shareClicked"] && $.addListener(__alloyId413, "click", shareClicked);
    __defers["__alloyId414!click!shareClicked"] && $.addListener(__alloyId414, "click", shareClicked);
    __defers["__alloyId415!click!shareClicked"] && $.addListener(__alloyId415, "click", shareClicked);
    __defers["__alloyId416!click!handleCloseClicked"] && $.addListener(__alloyId416, "click", handleCloseClicked);
    __defers["$.__views.__alloyId375!dragEnd!galleryDragEnd"] && $.addListener($.__views.__alloyId375, "dragEnd", galleryDragEnd);
    __defers["$.__views.__alloyId375!scrollend!tableScrollEnd"] && $.addListener($.__views.__alloyId375, "scrollend", tableScrollEnd);
    __defers["$.__views.__alloyId375!scroll!tableScroll"] && $.addListener($.__views.__alloyId375, "scroll", tableScroll);
    __defers["$.__views.__alloyId375!singletap!rowClicked"] && $.addListener($.__views.__alloyId375, "singletap", rowClicked);
    __defers["$.__views.__alloyId375!swipe!showDescription"] && $.addListener($.__views.__alloyId375, "swipe", showDescription);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;