var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        URL: "http://www.tikklr.com/api/flag",
        adapter: {
            type: "restapi",
            collection_name: "Flag",
            idAttribute: "fid"
        },
        headers: {
            Accept: "application/json, text/plain, */*",
            "X-CSRF-TOKEN": Ti.App.Properties.getString("token"),
            Cookie: Ti.App.Properties.getString("session")
        },
        model: "Flag",
        debug: 0
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {
            url: function() {
                return Alloy.Globals.drupalApiUrl + "flag";
            },
            transform: function() {
                Ti.API.info("in Flag model transform:" + JSON.stringify(this));
                var model = this;
                return model;
            },
            countAll: function(nameToCount, callType, entityId) {
                if (Ti.Network.getOnline()) {
                    var url = Alloy.Globals.drupalApiUrl + "flag/countall";
                    var client = Ti.Network.createHTTPClient({
                        onload: function(e) {
                            Ti.API.info("Count all returned with: " + JSON.stringify(e));
                            var response = JSON.parse(this.responseText);
                            Ti.App.fireEvent("countFlagFinished", {
                                nameToCount: nameToCount,
                                count: response.count,
                                callType: callType
                            });
                            Ti.API.info(this.responseText);
                        },
                        onerror: function(e) {
                            Ti.API.error("onerror called, in countAll readyState = " + this.readyState + "e: " + JSON.stringify(e));
                            Ti.App.fireEvent("countFlagFinished", {
                                nameToCount: nameToCount,
                                count: 0,
                                callType: callType
                            });
                        },
                        timeout: 5e3
                    });
                    client.open("POST", url);
                    client.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    client.setRequestHeader("Cookie", Ti.App.Properties.getString("session"));
                    client.setRequestHeader("X-CSRF-TOKEN", Ti.App.Properties.getString("token"));
                    client.setRequestHeader("Accept", "application/json");
                    if ("uid" == callType) var data = {
                        flag_name: nameToCount,
                        uid: entityId
                    }; else var data = {
                        flag_name: nameToCount,
                        entity_id: entityId
                    };
                    client.send(data);
                } else Ti.App.fireEvent("triggerError", {
                    message: "Please open network connection"
                });
            },
            flag: function(action, flag_name, entity_id, content_id, uid) {
                if (Ti.Network.getOnline()) {
                    var url = Alloy.Globals.drupalApiUrl + "flag/flag";
                    var client = Ti.Network.createHTTPClient({
                        onload: function(e) {
                            Ti.API.info("Flag returned with: " + JSON.stringify(e));
                            JSON.parse(this.responseText);
                            Ti.App.fireEvent("flagFinished", {
                                flag_name: flag_name,
                                entity_id: entity_id,
                                flag_type: action
                            });
                            Ti.API.info(this.responseText);
                        },
                        onerror: function(e) {
                            Ti.API.error("onerror called, in flag readyState = " + this.readyState + "e: " + JSON.stringify(e));
                            Ti.App.fireEvent("flagFinished", {
                                flag_name: flag_name,
                                entity_id: entity_id,
                                flag_type: action
                            });
                        },
                        timeout: 5e3
                    });
                    client.open("POST", url);
                    client.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    client.setRequestHeader("Cookie", Ti.App.Properties.getString("session"));
                    client.setRequestHeader("X-CSRF-TOKEN", Ti.App.Properties.getString("token"));
                    client.setRequestHeader("Accept", "application/json");
                    "" == uid && (uid = Alloy.Models.User.get("uid"));
                    var data = {
                        action: action,
                        flag_name: flag_name,
                        entity_id: entity_id,
                        content_id: entity_id,
                        uid: uid,
                        flaging: "true"
                    };
                    client.send(data);
                } else Ti.App.fireEvent("triggerError", {
                    message: "Please open network connection"
                });
            },
            isFlagged: function(flag_name, entity_id, uid, callback) {
                if (Ti.Network.getOnline()) {
                    var url = Alloy.Globals.drupalApiUrl + "flag/is_flagged";
                    var client = Ti.Network.createHTTPClient({
                        onload: function(e) {
                            Ti.API.info("is_flagged returned with: " + JSON.stringify(e));
                            var response = JSON.parse(this.responseText);
                            Ti.API.info("is_flagged responseText: " + response);
                            Ti.API.info("is_flagged entity_id: " + entity_id);
                            var result = {
                                entity_id: entity_id,
                                isFollowing: response
                            };
                            callback(result);
                        },
                        onerror: function(e) {
                            Ti.API.error("onerror called, in flag readyState = " + this.readyState + "e: " + JSON.stringify(e));
                            callback(false);
                        },
                        timeout: 5e3
                    });
                    client.open("POST", url);
                    client.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    client.setRequestHeader("Cookie", Ti.App.Properties.getString("session"));
                    client.setRequestHeader("X-CSRF-TOKEN", Ti.App.Properties.getString("token"));
                    client.setRequestHeader("Accept", "application/json");
                    "" == uid && (uid = Alloy.Models.User.get("uid"));
                    var data = {
                        flag_name: flag_name,
                        entity_id: entity_id,
                        uid: uid
                    };
                    client.send(data);
                } else Ti.App.fireEvent("triggerError", {
                    message: "Please open network connection"
                });
            }
        });
        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {
            transform: function() {
                Ti.API.info("in Flag collection transform:" + JSON.stringify(this));
                var model = this;
                return model;
            },
            url: function() {
                return Alloy.Globals.drupalApiUrl + "flag";
            }
        });
        return Collection;
    }
};

model = Alloy.M("Flag", exports.definition, []);

collection = Alloy.C("Flag", exports.definition, model);

exports.Model = model;

exports.Collection = collection;