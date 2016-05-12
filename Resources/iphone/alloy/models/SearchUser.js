var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        adapter: {
            type: "restapi",
            idAttribute: "uid"
        },
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": Ti.App.Properties.getString("token"),
            Cookie: Ti.App.Properties.getString("session")
        },
        model: "SearchUser",
        debug: 0
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {
            url: function() {
                return Alloy.Globals.drupalApiUrl + "search_user/retrieve.json";
            },
            transform: function() {
                var model = this;
                Ti.API.log("SearchUser model is: " + JSON.stringify(model));
                model["pictureUrl"] = this.get("picture") && null != this.get("picture") && 0 != this.get("picture") && void 0 != this.get("picture").url ? this.get("picture").url : "profile.png";
                model["realname"] = this.get("realname");
                model["@realname"] = "@" + this.get("realname");
                model["name"] = this.get("name");
                model["mail"] = this.get("mail");
                model["uid"] = this.get("uid");
                model["id"] = this.get("id");
                model["mail"] = this.get("mail");
                model["firstName"] = this.getDrupalFieldValue("field_name_first");
                model["lastName"] = this.getDrupalFieldValue("field_name_last");
                model["bio"] = this.getDrupalFieldValue("field_bio");
                model["isFollowed"] = false;
                model["isNotFollowed"] = true;
                if (model["uid"] != Alloy.Models.User.uid && "undefined" != typeof Alloy.Collections.Following.get(model["uid"])) {
                    model["isFollowed"] = true;
                    model["isNotFollowed"] = false;
                }
                this.get("field_tikklr_location") && this.get("field_tikklr_location").und && this.get("field_tikklr_location").und[0].country && (model["location"] = this.get("field_tikklr_location").und[0].country);
                return model;
            },
            getDrupalFieldValue: function(fieldName) {
                if (this.get(fieldName) && this.get(fieldName).und && this.get(fieldName).und[0].value) return this.get(fieldName).und[0].value;
                return null;
            },
            setDrupalFieldValue: function(fieldName, fieldValue) {
                var drupalValue = {
                    und: [ {
                        value: fieldValue
                    } ]
                };
                this.set(fieldName, drupalValue);
            }
        });
        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {
            transform: function() {
                var model = this;
                Ti.API.log("SearchUser model is: " + JSON.stringify(model));
                model["pictureUrl"] = this.get("picture") && null != this.get("picture") && 0 != this.get("picture") && void 0 != this.get("picture").url ? this.get("picture").url : "profile.png";
                model["realname"] = this.get("realname");
                model["@realname"] = "@" + this.get("realname");
                model["name"] = this.get("name");
                model["mail"] = this.get("mail");
                model["uid"] = this.get("uid");
                model["id"] = this.get("id");
                model["mail"] = this.get("mail");
                model["firstName"] = this.getDrupalFieldValue("field_name_first");
                model["lastName"] = this.getDrupalFieldValue("field_name_last");
                model["bio"] = this.getDrupalFieldValue("field_bio");
                model["isFollowed"] = false;
                model["isNotFollowed"] = true;
                if (model["uid"] != Alloy.Models.User.uid && "undefined" != typeof Alloy.Collections.Following.get(model["uid"])) {
                    model["isFollowed"] = true;
                    model["isNotFollowed"] = false;
                }
                this.get("field_tikklr_location") && this.get("field_tikklr_location").und && this.get("field_tikklr_location").und[0].country && (model["location"] = this.get("field_tikklr_location").und[0].country);
                return model;
            },
            getDrupalFieldValue: function(fieldName) {
                if (this.get(fieldName) && this.get(fieldName).und && this.get(fieldName).und[0].value) return this.get(fieldName).und[0].value;
                return null;
            },
            setDrupalFieldValue: function(fieldName, fieldValue) {
                var drupalValue = {
                    und: [ {
                        value: fieldValue
                    } ]
                };
                this.set(fieldName, drupalValue);
            },
            url: function() {
                return Alloy.Globals.drupalApiUrl + "search_user/retrieve.json";
            }
        });
        return Collection;
    }
};

model = Alloy.M("SearchUser", exports.definition, []);

collection = Alloy.C("SearchUser", exports.definition, model);

exports.Model = model;

exports.Collection = collection;