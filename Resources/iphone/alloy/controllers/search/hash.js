function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function __alloyId464(e) {
        if (e && e.fromAdapter) return;
        __alloyId464.opts || {};
        var models = __alloyId463.models;
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId425 = models[i];
            __alloyId425.__transform = nodeTransform(__alloyId425);
            var __alloyId427 = Ti.UI.createTableViewRow({
                height: Ti.UI.SIZE,
                selectionStyle: "NONE",
                nodeId: _.template("{m.nid}", {
                    m: __alloyId425.__transform
                }, {
                    interpolate: /\{([\s\S]+?)\}/g
                }),
                nodeType: "video"
            });
            rows.push(__alloyId427);
            var __alloyId429 = Ti.UI.createView({
                top: "40",
                zIndex: 100,
                left: Ti.Platform.displayCaps.platformWidth,
                width: Ti.Platform.displayCaps.platformWidth,
                height: Ti.UI.SIZE,
                backgroundColor: Alloy.Globals.TikklrBlack,
                opacity: .9,
                layout: "vertical"
            });
            __alloyId427.add(__alloyId429);
            var __alloyId430 = Alloy.createWidget("com.baboonmedia.remoteimage", "widget", {
                top: "0",
                left: "0",
                width: "40",
                height: "40",
                defaultImage: "true",
                image: _.template("{m.categoryImage}", {
                    m: __alloyId425.__transform
                }, {
                    interpolate: /\{([\s\S]+?)\}/g
                }),
                $model: __alloyId425,
                __parentSymbol: __alloyId429
            });
            __alloyId430.setParent(__alloyId429);
            var __alloyId432 = Ti.UI.createLabel({
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
            __alloyId429.add(__alloyId432);
            var __alloyId434 = Ti.UI.createView({
                top: "0",
                left: "10",
                right: "10",
                height: "25"
            });
            __alloyId429.add(__alloyId434);
            var __alloyId436 = Ti.UI.createLabel({
                top: "0",
                left: "0",
                color: Alloy.Globals.TikklrGreen,
                font: {
                    fontSize: "14pt",
                    fontFamily: "Substance-ExtraBold"
                },
                text: _.template("{m.kaltura_tags}", {
                    m: __alloyId425.__transform
                }, {
                    interpolate: /\{([\s\S]+?)\}/g
                })
            });
            __alloyId434.add(__alloyId436);
            var __alloyId438 = Ti.UI.createView({
                top: "0",
                height: Ti.UI.SIZE,
                layout: "horizontal",
                backgroundColor: "transparent",
                width: "100%"
            });
            __alloyId429.add(__alloyId438);
            var __alloyId440 = Ti.UI.createView({
                top: 5,
                left: 5,
                right: 5,
                height: Ti.UI.SIZE,
                backgroundColor: "transparent"
            });
            __alloyId438.add(__alloyId440);
            var __alloyId441 = Alloy.createWidget("com.baboonmedia.remoteimage", "widget", {
                left: "2",
                top: "2",
                width: "60",
                height: "50",
                image: _.template("{m.thumb}", {
                    m: __alloyId425.__transform
                }, {
                    interpolate: /\{([\s\S]+?)\}/g
                }),
                $model: __alloyId425,
                __parentSymbol: __alloyId440
            });
            __alloyId441.setParent(__alloyId440);
            var __alloyId443 = Ti.UI.createView({
                top: 0,
                height: Ti.UI.SIZE,
                left: 60,
                width: 170,
                layout: "vertical"
            });
            __alloyId440.add(__alloyId443);
            var __alloyId445 = Ti.UI.createLabel({
                left: 5,
                top: 0,
                font: {
                    fontSize: "12pt",
                    fontFamily: "Substance-ExtraBold"
                },
                color: Alloy.Globals.TikklrGreen,
                text: _.template("{m.titleUpperCase}", {
                    m: __alloyId425.__transform
                }, {
                    interpolate: /\{([\s\S]+?)\}/g
                })
            });
            __alloyId443.add(__alloyId445);
            var __alloyId447 = Ti.UI.createLabel({
                left: 5,
                font: {
                    fontSize: "10pt",
                    fontFamily: "Substance-ExtraBold"
                },
                color: Alloy.Globals.TikklrGreen,
                text: _.template("{m.followers}", {
                    m: __alloyId425.__transform
                }, {
                    interpolate: /\{([\s\S]+?)\}/g
                })
            });
            __alloyId443.add(__alloyId447);
            var __alloyId448 = Ti.UI.createView({
                right: "5",
                top: "5",
                bottom: "5",
                width: "62",
                height: "42",
                backgroundImage: "follow.png",
                backgroundColor: "transparent",
                uid: _.template("{m.uid}", {
                    m: __alloyId425.__transform
                }, {
                    interpolate: /\{([\s\S]+?)\}/g
                })
            });
            __alloyId440.add(__alloyId448);
            disableClick ? $.addListener(__alloyId448, "singletap", disableClick) : __defers["__alloyId448!singletap!disableClick"] = true;
            followClicked ? $.addListener(__alloyId448, "click", followClicked) : __defers["__alloyId448!click!followClicked"] = true;
            var __alloyId449 = Ti.UI.createView({
                right: "5",
                top: "5",
                bottom: "5",
                width: "62",
                height: "42",
                backgroundImage: "following.png",
                backgroundColor: Alloy.Globals.TikklrGreen,
                visible: "false",
                uid: _.template("{m.uid}", {
                    m: __alloyId425.__transform
                }, {
                    interpolate: /\{([\s\S]+?)\}/g
                })
            });
            __alloyId440.add(__alloyId449);
            disableClick ? $.addListener(__alloyId449, "singletap", disableClick) : __defers["__alloyId449!singletap!disableClick"] = true;
            followersClicked ? $.addListener(__alloyId449, "click", followersClicked) : __defers["__alloyId449!click!followersClicked"] = true;
            var __alloyId451 = Ti.UI.createView({
                top: 0,
                left: 0,
                width: Ti.Platform.displayCaps.platformWidth,
                layout: "absolute",
                height: Ti.UI.SIZE,
                zIndex: 50,
                backgroundColor: Alloy.Globals.TikklrBlack
            });
            __alloyId427.add(__alloyId451);
            var __alloyId452 = Alloy.createWidget("com.baboonmedia.remoteimage", "widget", {
                left: 0,
                top: 0,
                width: Ti.UI.FILL,
                height: Ti.UI.SIZE,
                image: _.template("{m.thumb}", {
                    m: __alloyId425.__transform
                }, {
                    interpolate: /\{([\s\S]+?)\}/g
                }),
                $model: __alloyId425,
                __parentSymbol: __alloyId451
            });
            __alloyId452.setParent(__alloyId451);
            var __alloyId454 = Ti.UI.createView({
                top: 0,
                opacity: .7,
                height: Ti.UI.SIZE,
                width: Ti.UI.FILL,
                backgroundColor: Alloy.Globals.TikklrWhite
            });
            __alloyId451.add(__alloyId454);
            var __alloyId456 = Ti.UI.createLabel({
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
                    m: __alloyId425.__transform
                }, {
                    interpolate: /\{([\s\S]+?)\}/g
                })
            });
            __alloyId454.add(__alloyId456);
            var __alloyId458 = Ti.UI.createLabel({
                color: Alloy.Globals.TikklrBlack,
                left: "10",
                top: "25",
                right: "90",
                font: {
                    fontSize: "10pt",
                    fontFamily: "Substance-ExtraBold"
                },
                text: _.template("{m.views}", {
                    m: __alloyId425.__transform
                }, {
                    interpolate: /\{([\s\S]+?)\}/g
                })
            });
            __alloyId454.add(__alloyId458);
            var __alloyId460 = Ti.UI.createView({
                backgroundImage: "molecule.png",
                width: "40",
                height: "40",
                right: "50",
                defaultImage: "true",
                visible: false
            });
            __alloyId454.add(__alloyId460);
            shareVideo ? $.addListener(__alloyId460, "singletap", shareVideo) : __defers["__alloyId460!singletap!shareVideo"] = true;
            var __alloyId462 = Ti.UI.createView({
                backgroundImage: "star.png",
                width: "40",
                height: "40",
                right: "5",
                defaultImage: "true",
                visible: false
            });
            __alloyId454.add(__alloyId462);
            starVideo ? $.addListener(__alloyId462, "singletap", starVideo) : __defers["__alloyId462!singletap!starVideo"] = true;
        }
        $.__views.__alloyId423.setData(rows);
    }
    function search() {
        if ("" != $.search.value) {
            $.enableLoadMore();
            $.noResults.hide();
            $.tableView.show();
            params = {
                "parameters[type]": "video",
                sort: "created",
                direction: "DESC",
                pagesize: 10,
                "parameters[kaltura_tags]": $.search.value + "%"
            };
            $.loadGallery($.SearchVideos, params, null, null);
        }
    }
    require("alloy/controllers/pandaGallery").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "search/hash";
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
    $.SearchVideos = Alloy.createCollection("Node");
    $.__views.hashSearch = Ti.UI.createView({
        top: 0,
        layout: "vertical",
        backgroundColor: "black",
        id: "hashSearch"
    });
    $.__views.hashSearch && $.addTopLevelView($.__views.hashSearch);
    $.__views.__alloyId420 = Ti.UI.createView({
        top: 0,
        height: "85",
        backgroundColor: Alloy.Globals.TikklrGreen,
        id: "__alloyId420"
    });
    $.__views.hashSearch.add($.__views.__alloyId420);
    $.__views.__alloyId421 = Ti.UI.createView({
        left: "5",
        width: "20",
        backgroundImage: "search-hash.png",
        id: "__alloyId421"
    });
    $.__views.search = Ti.UI.createTextField({
        height: "32",
        width: "267",
        backgroundColor: Alloy.Globals.TikklrDarkGreen,
        color: Alloy.Globals.TikklrGreen,
        paddingLeft: "22",
        id: "search",
        hintText: "SEARCH TIKKS"
    });
    $.__views.__alloyId420.add($.__views.search);
    $.__views.search.add($.__views.__alloyId421);
    search ? $.addListener($.__views.search, "blur", search) : __defers["$.__views.search!blur!search"] = true;
    $.__views.__alloyId421 = Ti.UI.createView({
        left: "5",
        width: "20",
        backgroundImage: "search-hash.png",
        id: "__alloyId421"
    });
    $.__views.search.add($.__views.__alloyId421);
    $.__views.__alloyId422 = Ti.UI.createView({
        layout: "absolute",
        id: "__alloyId422"
    });
    $.__views.hashSearch.add($.__views.__alloyId422);
    $.__views.tableView = Ti.UI.createView({
        id: "tableView"
    });
    $.__views.__alloyId422.add($.__views.tableView);
    $.__views.tableHeader = Alloy.createController("partials/tableHeader", {
        id: "tableHeader",
        __parentSymbol: __parentSymbol
    });
    $.__views.__alloyId423 = Ti.UI.createTableView({
        rowHeight: Ti.UI.SIZE,
        separatorColor: "transparent",
        separatorStyle: Titanium.UI.iPhone.TableViewSeparatorStyle.NONE,
        headerPullView: $.__views.tableHeader.getViewEx({
            recurse: true
        }),
        id: "__alloyId423"
    });
    $.__views.tableView.add($.__views.__alloyId423);
    var __alloyId463 = Alloy.Collections["$.SearchVideos"] || $.SearchVideos;
    __alloyId463.on("fetch destroy change add remove reset", __alloyId464);
    galleryDragEnd ? $.addListener($.__views.__alloyId423, "dragEnd", galleryDragEnd) : __defers["$.__views.__alloyId423!dragEnd!galleryDragEnd"] = true;
    tableScrollEnd ? $.addListener($.__views.__alloyId423, "scrollend", tableScrollEnd) : __defers["$.__views.__alloyId423!scrollend!tableScrollEnd"] = true;
    tableScroll ? $.addListener($.__views.__alloyId423, "scroll", tableScroll) : __defers["$.__views.__alloyId423!scroll!tableScroll"] = true;
    rowClicked ? $.addListener($.__views.__alloyId423, "singletap", rowClicked) : __defers["$.__views.__alloyId423!singletap!rowClicked"] = true;
    showDescription ? $.addListener($.__views.__alloyId423, "swipe", showDescription) : __defers["$.__views.__alloyId423!swipe!showDescription"] = true;
    $.__views.noResults = Ti.UI.createView({
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        backgroundColor: Alloy.Globals.TikklrGray,
        id: "noResults",
        visible: false
    });
    $.__views.__alloyId422.add($.__views.noResults);
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
    exports.destroy = function() {
        __alloyId463 && __alloyId463.off("fetch destroy change add remove reset", __alloyId464);
    };
    _.extend($, $.__views);
    exports.baseController = "pandaGallery";
    require("alloy/animation");
    var args = arguments[0] || null;
    var params = {
        "parameters[type]": "video",
        sort: "created",
        direction: "DESC",
        pagesize: 10,
        "parameters[kaltura_tags]": $.search.value + "%"
    };
    var isLoadGallery = args.loadGallery || "true";
    if (null != args && "undefined" != typeof args) {
        null != args.search && "undefined" != typeof args.search && ($.search.value = args.search);
        null != args.params && "undefined" != typeof args.params && (params = args.params);
        true == isLoadGallery && search();
    }
    var handleGalleryLoadedEvent = function(e) {
        $.noResults.hide();
        $.tableView.show();
        "undefined" != typeof $.getView().getParent() && $.getView().getParent().id == e.id && "" != $.search.value && $.loadGallery($.SearchVideos, params, null, null);
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
    __defers["__alloyId448!singletap!disableClick"] && $.addListener(__alloyId448, "singletap", disableClick);
    __defers["__alloyId448!click!followClicked"] && $.addListener(__alloyId448, "click", followClicked);
    __defers["__alloyId449!singletap!disableClick"] && $.addListener(__alloyId449, "singletap", disableClick);
    __defers["__alloyId449!click!followersClicked"] && $.addListener(__alloyId449, "click", followersClicked);
    __defers["__alloyId460!singletap!shareVideo"] && $.addListener(__alloyId460, "singletap", shareVideo);
    __defers["__alloyId462!singletap!starVideo"] && $.addListener(__alloyId462, "singletap", starVideo);
    __defers["$.__views.__alloyId423!dragEnd!galleryDragEnd"] && $.addListener($.__views.__alloyId423, "dragEnd", galleryDragEnd);
    __defers["$.__views.__alloyId423!scrollend!tableScrollEnd"] && $.addListener($.__views.__alloyId423, "scrollend", tableScrollEnd);
    __defers["$.__views.__alloyId423!scroll!tableScroll"] && $.addListener($.__views.__alloyId423, "scroll", tableScroll);
    __defers["$.__views.__alloyId423!singletap!rowClicked"] && $.addListener($.__views.__alloyId423, "singletap", rowClicked);
    __defers["$.__views.__alloyId423!swipe!showDescription"] && $.addListener($.__views.__alloyId423, "swipe", showDescription);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;