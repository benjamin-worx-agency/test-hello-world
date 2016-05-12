var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        adapter: {
            type: "restapi",
            collection_name: "Node",
            idAttribute: "nid"
        },
        headers: {
            Accept: "application/json, text/plain, */*",
            "X-CSRF-TOKEN": Ti.App.Properties.getString("token"),
            Cookie: Ti.App.Properties.getString("session")
        },
        model: "Node",
        debug: 0
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {
            transform: function() {
                Ti.API.info("in Node model transform:" + JSON.stringify(this));
                var model = this;
                model["title"] = this.get("title");
                model["description"] = this.get("description");
                if ("video" == this.get("type")) {
                    model["thumb"] = "http://video.tikklr.com/p/" + Alloy.Globals.partnerId + "/thumbnail/entry_id/" + this.get("uploader") + "/height/800/type/1/quality/100";
                    model["tags"] = this.get("kaltura_tags");
                    model["kaltura_tags"] = this.get("kaltura_tags");
                    model["entryId"] = this.get("uploader");
                    model["views"] = "130,000 views";
                    model["categoryImage"] = "star.png";
                    model["followers"] = "12,365 followers";
                    model["isVideo"] = true;
                    model["isThumb"] = false;
                }
                "reward" == this.get("type") && (model["terms_and_conditions"] = this.get("terms_and_conditions"));
                if ("briefs" == this.get("type")) {
                    model["thumb"] = "brandsPayDemo.png";
                    this.get("image") && this.get("image").file && this.get("image").file.fileUrl && (model["thumb"] = this.get("image").file.fileUrl);
                    Ti.API.info("model['thumb']" + model["thumb"]);
                    var body = this.get("body");
                    if ("undefined" != typeof body) {
                        model["body"] = this.get("body").value;
                        model["summary"] = this.get("body").summary;
                        model["description"] = model["summary"];
                    }
                    model.isSelfie = this.get("selfie_tikk") ? true : false;
                    model.isVideo = this.get("video_tikk") ? true : false;
                    model.isThumbAllowed = this.get("tikk_options") ? true : false;
                    model["selfieImage"] = model.isSelfie ? "selfie-gray.png" : "selfie-dead.png";
                    model["isVideoImage"] = model.isVideo ? "video-gray.png" : "video-dead.png";
                    model["thumbAllowedImage"] = model.isThumbAllowed ? "photo-gray.png" : "photo-dead.png";
                }
                Ti.API.info("Model in the end is: " + JSON.stringify(model));
                return model;
            },
            url: function() {
                return Alloy.Globals.drupalApiUrl + "entity_node";
            }
        });
        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {
            transform: function() {
                Ti.API.info("in Node collection transform:" + JSON.stringify(this));
                var model = this;
                model["title"] = this.get("title");
                model["description"] = this.get("description");
                if ("video" == this.get("type")) {
                    model["thumb"] = "http://video.tikklr.com/p/" + Alloy.Globals.partnerId + "/thumbnail/entry_id/" + this.get("uploader") + "/height/800/type/1/quality/100";
                    model["tags"] = this.get("kaltura_tags");
                    model["kaltura_tags"] = this.get("kaltura_tags");
                    model["entryId"] = this.get("uploader");
                    model["views"] = "130,000 views";
                    model["categoryImage"] = "star.png";
                    model["followers"] = "12,365 followers";
                }
                if ("briefs" == this.get("type")) {
                    model["thumb"] = "brandsPayDemo.png";
                    this.get("image") && this.get("image").file && this.get("image").file.fileUrl && (model["thumb"] = this.get("image").file.fileUrl);
                    Ti.API.info("model['thumb']" + model["thumb"]);
                    var body = this.get("body");
                    if ("undefined" != typeof body) {
                        model["body"] = this.get("body").value;
                        model["summary"] = this.get("body").summary;
                        model["description"] = model["summary"];
                    }
                    model.isSelfie = this.get("selfie_tikk") ? true : false;
                    model.isVideo = this.get("video_tikk") ? true : false;
                    model.isThumbAllowed = this.get("tikk_options") ? true : false;
                    model["selfieImage"] = model.isSelfie ? "selfie-gray.png" : "selfie-dead.png";
                    model["isVideoImage"] = model.isVideo ? "video-gray.png" : "video-dead.png";
                    model["thumbAllowedImage"] = model.isThumbAllowed ? "photo-gray.png" : "photo-dead.png";
                }
                if ("video" == this.get("type")) {
                    model["isVideo"] = true;
                    model["isThumb"] = false;
                }
                Ti.API.info("Model in the end is: " + JSON.stringify(model));
                return model;
            },
            url: function() {
                return Alloy.Globals.drupalApiUrl + "entity_node";
            }
        });
        return Collection;
    }
};

model = Alloy.M("Node", exports.definition, []);

collection = Alloy.C("Node", exports.definition, model);

exports.Model = model;

exports.Collection = collection;