function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    require("alloy/controllers/tikkGallery").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "browse";
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
    $.Categories = Alloy.createCollection("Node");
    $.__views.browse = Ti.UI.createView({
        layout: "vertical",
        id: "browse"
    });
    $.__views.browse && $.addTopLevelView($.__views.browse);
    $.__views.grid = Alloy.createWidget("tiflexigrid", "widget", {
        id: "grid",
        __parentSymbol: $.__views.browse
    });
    $.__views.grid.setParent($.__views.browse);
    exports.destroy = function() {};
    _.extend($, $.__views);
    exports.baseController = "tikkGallery";
    var numberOfItems = 15;
    var categoryUrlParams = {
        "parameters[type]": "category",
        sort: "title",
        direction: "ASC",
        pagesize: numberOfItems,
        "parameters[status]": 1
    };
    var categoriesArray = [];
    Ti.App.fireEvent("loading");
    $.Categories.fetch({
        success: function(e) {
            for (i in e.models) {
                var model = e.models[i];
                model.title = model.get("title");
                model.image = null != model.get("local_image") ? model.get("local_image") : "";
                categoriesArray.push(e.models[i]);
            }
            $.grid.createGrid({
                columns: 3,
                space: 0,
                data: categoriesArray,
                layout: "gallery",
                params: {
                    padding: 0,
                    showTitle: false,
                    backgroundColor: "#eee",
                    alternateBackgroundColor: "#eee",
                    gridColor: "#ccc"
                }
            });
        },
        error: function(responseJSON, responseText) {
            Ti.App.fireEvent("triggerError", {
                message: responseText
            });
        },
        urlparams: categoryUrlParams
    });
    categoryTransform = function(model) {
        Ti.API.info("In gallery category transform: " + JSON.stringify(model));
        var transform = model.toJSON();
        return transform;
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;