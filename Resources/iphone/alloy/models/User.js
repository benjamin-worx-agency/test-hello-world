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
        model: "User",
        debug: 0
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {
            url: function() {
                return Alloy.Globals.drupalApiUrl + "user";
            },
            transform: function() {
                var model = this;
                Ti.API.log("user model is: " + JSON.stringify(model));
                model["pictureUrl"] = this.get("picture") && null != this.get("picture") && 0 != this.get("picture") && void 0 != this.get("picture").url ? this.get("picture").url : "profile.png";
                model["realname"] = this.get("realname");
                model["@realname"] = "@" + this.get("realname");
                if (!model.realname || !model["@realname"]) {
                    model.realname = this.get("name");
                    model["@realname"] = "@" + this.get("name");
                }
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
            getToken: function() {
                var that = this;
                if (Ti.Network.getOnline()) {
                    var url = Alloy.Globals.drupalApiUrl + "entity_user/token";
                    var client = Ti.Network.createHTTPClient({
                        onload: function() {
                            var response = JSON.parse(this.responseText);
                            Titanium.App.Properties.setString(Alloy.Globals.Properties.Token, response.token);
                            Ti.API.info("Token success, Headers are = " + JSON.stringify(that.config.headers));
                            that.config.headers["X-CSRF-TOKEN"] = response.token;
                            Ti.API.info("Token success, Response is = " + JSON.stringify(response));
                            Ti.App.fireEvent("tokenSuccess");
                        },
                        onerror: function(e) {
                            Ti.API.info("onerror called, this = " + JSON.stringify(this));
                            Ti.API.info("onerror called, this = " + JSON.stringify(this));
                            Ti.API.info("onerror called, this = " + JSON.stringify(e));
                            Ti.App.fireEvent("tokenFailed");
                        },
                        timeout: 2e4
                    });
                    client.open("POST", url);
                    client.setRequestHeader("Content-Type", "application/json");
                    client.setRequestHeader("Accept", "application/json");
                    client.setRequestHeader("Cookie", Titanium.App.Properties.getString(Alloy.Globals.Properties.Session));
                    client.send();
                }
            },
            login: function(username, pass) {
                var that = this;
                if (Ti.Network.getOnline()) {
                    var url = Alloy.Globals.drupalApiUrl + "entity_user/login.json";
                    var client = Ti.Network.createHTTPClient({
                        onload: function() {
                            var response = JSON.parse(this.responseText);
                            var session = response.session_name + "=" + response.sessid;
                            Titanium.App.Properties.setString(Alloy.Globals.Properties.Session, session);
                            that.config.headers["Cookie"] = session;
                            Ti.API.info("Login success, this = " + JSON.stringify(this));
                            Ti.API.info("Login success, session is = " + response.session_name + "=" + response.sessid);
                            Ti.App.fireEvent("loginSuccess", {
                                userId: response.user.uid
                            });
                        },
                        onerror: function(e) {
                            Ti.API.info("login failed, this = " + JSON.stringify(this));
                            Ti.API.info("login failed, e = " + JSON.stringify(e));
                            Ti.App.fireEvent("loginFailed");
                        },
                        timeout: 2e4
                    });
                    client.open("POST", url);
                    client.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    client.setRequestHeader("Accept", "application/json");
                    var data = {
                        username: username,
                        password: pass
                    };
                    Ti.API.info("logging in: " + JSON.stringify(data));
                    client.send(data);
                }
            },
            isLoggedIn: function() {
                var drupalToken = Titanium.App.Properties.getString(Alloy.Globals.Properties.Token);
                var drupalSession = Titanium.App.Properties.getString(Alloy.Globals.Properties.Session);
                var url = Alloy.Globals.drupalApiUrl + "system/connect.json";
                var client = Ti.Network.createHTTPClient({
                    onload: function() {
                        var response = JSON.parse(this.responseText);
                        if (response.user && 0 == response.user.uid) {
                            Ti.App.fireEvent("connectFailed");
                            return false;
                        }
                        Ti.API.info("Connect success, user is = " + JSON.stringify(response.user));
                        Ti.App.fireEvent("connectSuccess", {
                            userId: response.user.uid
                        });
                    },
                    onerror: function() {
                        Ti.API.info("Connect failed called, this = " + JSON.stringify(this));
                        Ti.App.fireEvent("connectFailed");
                    },
                    timeout: 2e4
                });
                client.open("POST", url);
                client.setRequestHeader("Accept", "application/json");
                client.setRequestHeader("Content-Type", "application/json");
                drupalSession && client.setRequestHeader("Cookie", drupalSession);
                drupalToken && client.setRequestHeader("X-CSRF-TOKEN", drupalToken);
                Ti.API.info("Session is: " + drupalSession);
                Ti.API.info("Token is: " + drupalToken);
                client.send();
            },
            logout: function() {
                if (Ti.Network.getOnline()) {
                    var url = Alloy.Globals.drupalApiUrl + "entity_user/logout";
                    var client = Ti.Network.createHTTPClient({
                        onload: function(e) {
                            Ti.App.fireEvent("logoutSuccess");
                            Ti.API.info(JSON.stringify(e));
                            Ti.API.info(JSON.stringify(this));
                        },
                        onerror: function() {
                            Ti.App.fireEvent("logoutFailed");
                            Ti.API.info("logout called, readyState = " + JSON.stringify(this));
                        },
                        timeout: 2e4
                    });
                    client.open("POST", url);
                    client.setRequestHeader("Content-Type", "application/json");
                    var token = Titanium.App.Properties.getString(Alloy.Globals.Properties.Token);
                    var session = Titanium.App.Properties.getString(Alloy.Globals.Properties.Session);
                    session && client.setRequestHeader("Cookie", session);
                    token && client.setRequestHeader("X_CSRF_TOKEN", token);
                    Titanium.App.Properties.setString(Alloy.Globals.Properties.Session, "");
                    Titanium.App.Properties.setString(Alloy.Globals.Properties.Token, "");
                    client.send();
                }
            },
            register: function(username, password) {
                if (Ti.Network.getOnline()) {
                    var url = Alloy.Globals.drupalApiUrl + "entity_user/register";
                    var client = Ti.Network.createHTTPClient({
                        onload: function(e) {
                            Ti.API.info(JSON.stringify(e));
                            Ti.API.info(JSON.stringify(this));
                            Ti.App.fireEvent("registerSuccess", e);
                        },
                        onerror: function() {
                            Ti.App.fireEvent("registerFailed");
                            Ti.App.fireEvent("triggerError", {
                                message: "Drupal Register Error"
                            });
                            Ti.API.info("Error register = " + JSON.stringify(this));
                        },
                        timeout: 2e4
                    });
                    client.open("POST", url);
                    client.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    var data = {
                        username: username,
                        mail: username,
                        password: password,
                        "group_access[und]": 0
                    };
                    client.send(data);
                }
            },
            forgotPassword: function(email) {
                if (Ti.Network.getOnline()) {
                    var url = Alloy.Globals.drupalBaseUrl + "/user/password";
                    var client = Ti.Network.createHTTPClient({
                        onload: function(e) {
                            Ti.API.info(JSON.stringify(e));
                            Ti.API.info(JSON.stringify(this));
                            Ti.App.fireEvent("forgotSuccess");
                        },
                        onerror: function() {
                            Ti.App.fireEvent("forgotFailed");
                            Ti.App.fireEvent("triggerError", {
                                message: "Drupal Register Error"
                            });
                            Ti.API.info("Error register = " + JSON.stringify(this));
                        },
                        timeout: 2e4
                    });
                    client.open("POST", url);
                    client.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    var data = {
                        form_id: "user_pass",
                        name: email,
                        op: "E-mail new password"
                    };
                    client.send(data);
                }
            },
            getFollowers: function() {
                if (Ti.Network.getOnline()) {
                    Ti.API.info("In get Followers " + JSON.stringify(this));
                    var url = Drupal.settings.basePath + "/views/ajax";
                    var client = Ti.Network.createHTTPClient({
                        onload: function(e) {
                            Ti.API.info("get Followers success: " + JSON.stringify(e));
                            Ti.API.info(JSON.stringify(e));
                            Ti.API.info(JSON.stringify(this));
                            Ti.App.fireEvent("followersSuccess");
                        },
                        onerror: function() {
                            Ti.App.fireEvent("followersFailed");
                            Ti.App.fireEvent("triggerError", {
                                message: "Cant get user followers"
                            });
                            Ti.API.info("Error register = " + JSON.stringify(this));
                        },
                        timeout: 2e4
                    });
                    client.open("POST", url);
                    client.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    client.send();
                }
            },
            getDrupalFieldValue: function(fieldName) {
                if (this.get(fieldName) && this.get(fieldName).und && this.get(fieldName).und[0].value) return this.get(fieldName).und[0].value;
                return null;
            },
            setDrupalFieldValue: function(fieldName, fieldValue) {
                var drupalValue = "";
                if (this.get(fieldName) && this.get(fieldName).und && this.get(fieldName).und[0].value) {
                    drupalValue = this.get(fieldName);
                    drupalValue.und[0].value = fieldValue;
                    drupalValue.und[0].safe_value = fieldValue;
                } else drupalValue = {
                    und: [ {
                        value: fieldValue
                    } ]
                };
                return drupalValue;
            }
        });
        return Model;
    }
};

model = Alloy.M("User", exports.definition, []);

collection = Alloy.C("User", exports.definition, model);

exports.Model = model;

exports.Collection = collection;