function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function selectButton(button) {
        oldButton.backgroundColor = "black";
        oldButton.color = Alloy.Globals.TikklrGreen;
        button.backgroundColor = Alloy.Globals.TikklrGreen;
        button.color = "white";
        "hashBtn" == button.id ? $.hashBtnIcon.backgroundImage = "search-eye-white.png" : "peopleBtn" == button.id ? $.peopleBtnIcon.backgroundImage = "search-profile-white.png" : "briefBtn" == button.id && ($.briefBtnIcon.backgroundImage = "search-brief-white.png");
        "hashBtn" == oldButton.id ? $.hashBtnIcon.backgroundImage = "search-eye.png" : "peopleBtn" == oldButton.id ? $.peopleBtnIcon.backgroundImage = "search-profile.png" : "briefBtn" == oldButton.id && ($.briefBtnIcon.backgroundImage = "search-brief.png");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "pandaNav";
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
    exports.destroy = function() {};
    _.extend($, $.__views);
    var scrollableViewObj;
    var navigationBar;
    var childViewsMapping = {};
    $.setNavigationBar = function(nav, scrollableView) {
        nav.addEventListener("click", switchViews);
        scrollableView.addEventListener("scroll", onScroll);
        for (var i = 0; i < nav.children.length; i++) {
            var buttonId = nav.children[i].id;
            childViewsMapping[buttonId] = i;
        }
        scrollableViewObj = scrollableView;
        navigationBar = nav;
        oldButton = nav.children[0];
        oldButton.backgroundColor = Alloy.Globals.TikklrGreen;
        oldButton.color = "white";
    };
    var oldButton;
    switchViews = function(e) {
        if (e.source != oldButton) {
            var pageIndex = childViewsMapping[e.source.id];
            scrollableViewObj.setCurrentPage(pageIndex);
            Ti.App.fireEvent("galleryLoaded", {
                id: scrollableViewObj.views[pageIndex].id
            });
            selectButton(e.source);
            oldButton = e.source;
            Ti.API.log("switchViews called");
        }
    };
    onScroll = function() {};
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;