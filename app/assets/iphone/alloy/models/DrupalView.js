var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        adapter: {
            type: "restapi",
            collection_name: "View",
            idAttribute: "uid"
        },
        headers: {
            Accept: "application/json, text/plain, */*",
            "X-CSRF-TOKEN": Ti.App.Properties.getString("token"),
            Cookie: Ti.App.Properties.getString("session")
        },
        model: "DrupalView",
        debug: 0
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {
            url: function() {
                var url = Alloy.Globals.drupalApiUrl + "views/" + this.viewName;
                Ti.API.info("New View URL: " + url);
                return url;
            },
            transform: function() {
                Ti.API.info("in DrupalView model transform:" + JSON.stringify(this));
                var model = this;
                model["title"] = this.get("title");
                model["description"] = this.get("description");
                if ("video" == this.get("type")) {
                    model["thumb"] = "http://video.tikklr.com/p/" + Alloy.Globals.partnerId + "/thumbnail/entry_id/" + this.get("uploader") + "/height/800/type/1/quality/100";
                    model["tags"] = this.get("kaltura_tags");
                    model["kaltura_tags"] = this.get("kaltura_tags");
                    model["uploader"] = this.get("uploader");
                    model["views"] = "130,000 views";
                    model["categoryImage"] = "star.png";
                    model["followers"] = "12,365 followers";
                }
                if ("briefs" == this.get("type")) {
                    model["thumb"] = this.get("thumb");
                    model["body"] = this.get("body").value;
                    model["summary"] = this.get("body").summary;
                    model["description"] = model["summary"];
                    model["voucher_value"] = this.get("voucher_value");
                }
                if ("video" == this.get("type")) {
                    model["isVideo"] = true;
                    model["isThumb"] = false;
                } else {
                    model["isVideo"] = false;
                    model["isThumb"] = true;
                }
                if ("user" == this.get("entity_type") || "user" == this.get("type")) if ("commons_follow_user_following" == this.viewName) {
                    model["isFollowed"] = true;
                    model["isNotFollowed"] = false;
                } else if ("commons_follow_user_following" == this.viewName && model["uid"] != Alloy.Models.User.uid && "undefined" != typeof Alloy.Collections.Following.get(model["uid"])) {
                    model["isFollowed"] = false;
                    model["isNotFollowed"] = true;
                }
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
            url: function() {
                var url = Alloy.Globals.drupalApiUrl + "views/" + this.viewName;
                Ti.API.info("New View URL: " + url);
                return url;
            },
            transform: function() {
                Ti.API.info("in DrupalView collection transform:" + JSON.stringify(this));
                var model = this;
                model["name"] = this.name;
                model["thumb"] = "http://video.tikklr.com/p/" + Alloy.Globals.partnerId + "/thumbnail/entry_id/" + this.get("uploader") + "/height/800/type/1/quality/100";
                model["title"] = this.get("title");
                model["description"] = this.get("description");
                model["tags"] = this.get("tags");
                return model;
            }
        });
        return Collection;
    }
};

model = Alloy.M("DrupalView", exports.definition, []);

collection = Alloy.C("DrupalView", exports.definition, model);

exports.Model = model;

exports.Collection = collection;