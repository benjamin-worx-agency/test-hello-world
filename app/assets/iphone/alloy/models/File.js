var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        URL: "http://www.tikklr.com/api/entity_file",
        adapter: {
            type: "restapi",
            collection_name: "File",
            idAttribute: "fid"
        },
        headers: {
            Accept: "application/json, text/plain, */*",
            "X-CSRF-TOKEN": Ti.App.Properties.getString("token"),
            Cookie: Ti.App.Properties.getString("session")
        },
        model: "File"
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {
            transform: function() {
                Ti.API.info("in File model transform:" + JSON.stringify(this));
                var model = this;
                return model;
            }
        });
        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {
            transform: function() {
                Ti.API.info("in Node collection transform:" + JSON.stringify(this));
                var model = this;
                return model;
            }
        });
        return Collection;
    }
};

model = Alloy.M("File", exports.definition, []);

collection = Alloy.C("File", exports.definition, model);

exports.Model = model;

exports.Collection = collection;