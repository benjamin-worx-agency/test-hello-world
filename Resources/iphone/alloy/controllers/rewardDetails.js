function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function __alloyId228(e) {
        if (e && e.fromAdapter) return;
        __alloyId228.opts || {};
        var models = __alloyId227.models;
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId162 = models[i];
            __alloyId162.__transform = rewardTransform(__alloyId162);
            var __alloyId164 = Ti.UI.createTableViewRow({
                layout: "vertical",
                backgroundColor: Alloy.Globals.TikklrRewardOrange,
                selectionStyle: "none",
                nodeId: _.template("{m.nid}", {
                    m: __alloyId162.__transform
                }, {
                    interpolate: /\{([\s\S]+?)\}/g
                })
            });
            rows.push(__alloyId164);
            var __alloyId166 = Ti.UI.createView({
                top: 0,
                left: 0,
                width: Ti.Platform.displayCaps.platformWidth,
                layout: "absolute",
                height: Ti.UI.SIZE,
                zIndex: 50,
                backgroundColor: Alloy.Globals.TikklrBlack
            });
            __alloyId164.add(__alloyId166);
            var __alloyId168 = Ti.UI.createView({
                top: 0,
                left: 0,
                width: Ti.UI.FILL,
                height: "180",
                backgroundColor: _.template("{m.rewardBackgroundColor}", {
                    m: __alloyId162.__transform
                }, {
                    interpolate: /\{([\s\S]+?)\}/g
                })
            });
            __alloyId166.add(__alloyId168);
            var __alloyId170 = Ti.UI.createView({
                top: 0,
                opacity: .7,
                height: Ti.UI.SIZE,
                width: Ti.UI.FILL,
                backgroundColor: Alloy.Globals.TikklrWhite
            });
            __alloyId166.add(__alloyId170);
            var __alloyId172 = Ti.UI.createLabel({
                color: Alloy.Globals.TikklrGreen,
                left: "10",
                top: "7",
                height: "25",
                right: "90",
                font: {
                    fontSize: "15pt",
                    fontFamily: "Substance-ExtraBold"
                },
                text: _.template("{m.titleUpperCase}", {
                    m: __alloyId162.__transform
                }, {
                    interpolate: /\{([\s\S]+?)\}/g
                })
            });
            __alloyId170.add(__alloyId172);
            var __alloyId174 = Ti.UI.createView({
                top: "0",
                left: Ti.Platform.displayCaps.platformWidth,
                width: Ti.Platform.displayCaps.platformWidth,
                backgroundColor: Alloy.Globals.TikklrBlack,
                height: "40",
                layout: "horizontal"
            });
            __alloyId166.add(__alloyId174);
            var __alloyId175 = Ti.UI.createView({
                top: 0,
                left: 0,
                width: "40",
                height: "40",
                backgroundImage: "cancel-white.png",
                backgroundColor: Alloy.Globals.TikklrRed
            });
            __alloyId174.add(__alloyId175);
            handleCloseClicked ? $.addListener(__alloyId175, "click", handleCloseClicked) : __defers["__alloyId175!click!handleCloseClicked"] = true;
            var __alloyId176 = Ti.UI.createView({
                left: "30",
                width: "40",
                height: "40",
                backgroundImage: "facebook.png"
            });
            __alloyId174.add(__alloyId176);
            shareClicked ? $.addListener(__alloyId176, "click", shareClicked) : __defers["__alloyId176!click!shareClicked"] = true;
            var __alloyId177 = Ti.UI.createView({
                left: "30",
                width: "40",
                height: "40",
                backgroundImage: "twitter.png"
            });
            __alloyId174.add(__alloyId177);
            shareClicked ? $.addListener(__alloyId177, "click", shareClicked) : __defers["__alloyId177!click!shareClicked"] = true;
            var __alloyId178 = Ti.UI.createView({
                left: "30",
                width: "40",
                height: "40",
                backgroundImage: "linkedIn.png"
            });
            __alloyId174.add(__alloyId178);
            shareClicked ? $.addListener(__alloyId178, "click", shareClicked) : __defers["__alloyId178!click!shareClicked"] = true;
            var __alloyId179 = Ti.UI.createView({
                top: 0,
                left: "30",
                width: "40",
                height: "40",
                backgroundImage: "approve-red.png",
                backgroundColor: Alloy.Globals.TikklrWhite
            });
            __alloyId174.add(__alloyId179);
            handleCloseClicked ? $.addListener(__alloyId179, "click", handleCloseClicked) : __defers["__alloyId179!click!handleCloseClicked"] = true;
            var __alloyId181 = Ti.UI.createView({
                top: "40",
                height: Ti.UI.SIZE,
                layout: "vertical",
                backgroundColor: "transparent",
                width: "100%"
            });
            __alloyId166.add(__alloyId181);
            var __alloyId183 = Ti.UI.createView({
                top: "0",
                height: Ti.UI.SIZE,
                layout: "horizontal",
                backgroundColor: "transparent",
                width: "100%"
            });
            __alloyId181.add(__alloyId183);
            var __alloyId184 = Ti.UI.createView({
                width: "90",
                height: "70",
                top: "5",
                left: "10",
                backgroundImage: _.template("{m.thumb}", {
                    m: __alloyId162.__transform
                }, {
                    interpolate: /\{([\s\S]+?)\}/g
                })
            });
            __alloyId183.add(__alloyId184);
            var __alloyId186 = Ti.UI.createLabel({
                left: "2",
                top: "0",
                width: Ti.UI.FILL,
                height: "75",
                font: {
                    fontSize: "22pt",
                    fontFamily: "Substance-ExtraBold"
                },
                color: Alloy.Globals.TikklrWhite,
                text: _.template("{m.reward_description}", {
                    m: __alloyId162.__transform
                }, {
                    interpolate: /\{([\s\S]+?)\}/g
                })
            });
            __alloyId183.add(__alloyId186);
            var __alloyId188 = Ti.UI.createView({
                top: "0",
                height: Ti.UI.SIZE,
                layout: "horizontal",
                backgroundColor: "transparent",
                width: "100%"
            });
            __alloyId181.add(__alloyId188);
            var __alloyId189 = Alloy.createWidget("com.baboonmedia.remoteimage", "widget", {
                left: "10",
                top: "0",
                width: "50",
                height: "50",
                image: _.template("{m.brandImage}", {
                    m: __alloyId162.__transform
                }, {
                    interpolate: /\{([\s\S]+?)\}/g
                }),
                $model: __alloyId162,
                __parentSymbol: __alloyId188
            });
            __alloyId189.setParent(__alloyId188);
            var __alloyId191 = Ti.UI.createLabel({
                left: "5",
                bottom: "0",
                font: {
                    fontSize: "12pt",
                    fontFamily: "Substance-ExtraBold"
                },
                color: Alloy.Globals.TikklrWhite,
                text: _.template("{m.reward_brand_name}", {
                    m: __alloyId162.__transform
                }, {
                    interpolate: /\{([\s\S]+?)\}/g
                })
            });
            __alloyId188.add(__alloyId191);
            var __alloyId193 = Ti.UI.createLabel({
                right: "0",
                bottom: "0",
                font: {
                    fontSize: "12pt",
                    fontFamily: "Substance-ExtraBold"
                },
                color: Alloy.Globals.TikklrWhite,
                text: "EXP:"
            });
            __alloyId188.add(__alloyId193);
            var __alloyId195 = Ti.UI.createLabel({
                left: "2",
                right: "5",
                bottom: "0",
                font: {
                    fontSize: "12pt",
                    fontFamily: "Substance-ExtraBold"
                },
                color: Alloy.Globals.TikklrWhite,
                text: _.template("{m.expirationDate}", {
                    m: __alloyId162.__transform
                }, {
                    interpolate: /\{([\s\S]+?)\}/g
                })
            });
            __alloyId188.add(__alloyId195);
            var __alloyId196 = Alloy.createWidget("com.baboonmedia.remoteimage", "widget", {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10,
                image: _.template("{m.qr_image}", {
                    m: __alloyId162.__transform
                }, {
                    interpolate: /\{([\s\S]+?)\}/g
                }),
                $model: __alloyId162,
                __parentSymbol: __alloyId164
            });
            __alloyId196.setParent(__alloyId164);
            var __alloyId197 = Ti.UI.createView({
                top: "-40",
                left: Ti.Platform.displayCaps.platformWidth,
                width: Ti.Platform.displayCaps.platformWidth,
                backgroundColor: Alloy.Globals.TikklrBlack,
                height: "40",
                layout: "horizontal"
            });
            __alloyId164.add(__alloyId197);
            var __alloyId198 = Ti.UI.createView({
                top: 0,
                left: 0,
                width: "40",
                height: "40",
                backgroundImage: "cancel-white.png",
                backgroundColor: Alloy.Globals.TikklrRed
            });
            __alloyId197.add(__alloyId198);
            closeShareBox ? $.addListener(__alloyId198, "click", closeShareBox) : __defers["__alloyId198!click!closeShareBox"] = true;
            var __alloyId199 = Ti.UI.createView({
                left: "30",
                width: "40",
                height: "40",
                backgroundImage: "facebook.png"
            });
            __alloyId197.add(__alloyId199);
            shareClicked ? $.addListener(__alloyId199, "click", shareClicked) : __defers["__alloyId199!click!shareClicked"] = true;
            var __alloyId200 = Ti.UI.createView({
                left: "30",
                width: "40",
                height: "40",
                backgroundImage: "twitter.png"
            });
            __alloyId197.add(__alloyId200);
            shareClicked ? $.addListener(__alloyId200, "click", shareClicked) : __defers["__alloyId200!click!shareClicked"] = true;
            var __alloyId201 = Ti.UI.createView({
                left: "30",
                width: "40",
                height: "40",
                backgroundImage: "linkedIn.png"
            });
            __alloyId197.add(__alloyId201);
            shareClicked ? $.addListener(__alloyId201, "click", shareClicked) : __defers["__alloyId201!click!shareClicked"] = true;
            var __alloyId202 = Ti.UI.createView({
                top: 0,
                left: "30",
                width: "40",
                height: "40",
                backgroundImage: "approve-red.png",
                backgroundColor: Alloy.Globals.TikklrWhite
            });
            __alloyId197.add(__alloyId202);
            closeShareBox ? $.addListener(__alloyId202, "click", closeShareBox) : __defers["__alloyId202!click!closeShareBox"] = true;
            var __alloyId204 = Ti.UI.createView({
                layout: "vertical",
                top: "5",
                height: Ti.UI.SIZE,
                left: "5",
                right: "5",
                backgroundColor: Alloy.Globals.TikklrRewardDarkOrange,
                color: Alloy.Globals.TikklrWhite,
                font: {
                    fontSize: "15pt",
                    fontFamily: "Substance-Regular"
                }
            });
            __alloyId164.add(__alloyId204);
            var __alloyId206 = Ti.UI.createLabel({
                backgroundColor: Alloy.Globals.TikklrRewardsDarkOrange,
                color: Alloy.Globals.TikklrWhite,
                font: {
                    fontSize: "15pt",
                    fontFamily: "Substance-ExtraBold"
                },
                text: "YOU REAP WHAT YOU SOW"
            });
            __alloyId204.add(__alloyId206);
            var __alloyId208 = Ti.UI.createLabel({
                backgroundColor: Alloy.Globals.TikklrRewardsDarkOrange,
                color: Alloy.Globals.TikklrWhite,
                font: {
                    fontSize: "14pt",
                    fontFamily: "Substance-Regular"
                },
                text: _.template("{m.reward_description}", {
                    m: __alloyId162.__transform
                }, {
                    interpolate: /\{([\s\S]+?)\}/g
                })
            });
            __alloyId204.add(__alloyId208);
            var __alloyId210 = Ti.UI.createView({
                top: "5",
                height: "95",
                left: "5",
                right: "5",
                backgroundColor: Alloy.Globals.TikklrRewardsRed
            });
            __alloyId164.add(__alloyId210);
            var __alloyId212 = Ti.UI.createView({
                backgroundImage: "hourglass-green.png",
                left: "5",
                width: "50",
                height: "50"
            });
            __alloyId210.add(__alloyId212);
            var __alloyId214 = Ti.UI.createLabel({
                right: "5",
                backgroundColor: Alloy.Globals.TikklrRewardsRed,
                color: Alloy.Globals.TikklrWhite,
                font: {
                    fontSize: "15pt",
                    fontFamily: "Substance-Regular"
                },
                text: _.template("{m.endDate}", {
                    m: __alloyId162.__transform
                }, {
                    interpolate: /\{([\s\S]+?)\}/g
                })
            });
            __alloyId210.add(__alloyId214);
            var __alloyId216 = Ti.UI.createView({
                layout: "vertical",
                top: "5",
                height: Ti.UI.SIZE,
                left: "5",
                right: "5",
                backgroundColor: Alloy.Globals.TikklrRewardDarkOrange,
                color: Alloy.Globals.TikklrWhite,
                font: {
                    fontSize: "15pt",
                    fontFamily: "Substance-Regular"
                }
            });
            __alloyId164.add(__alloyId216);
            var __alloyId218 = Ti.UI.createLabel({
                backgroundColor: Alloy.Globals.TikklrRewardsDarkOrange,
                color: Alloy.Globals.TikklrWhite,
                font: {
                    fontSize: "15pt",
                    fontFamily: "Substance-ExtraBold"
                },
                text: "WHAT DO I DO NOW?"
            });
            __alloyId216.add(__alloyId218);
            var __alloyId220 = Ti.UI.createLabel({
                backgroundColor: Alloy.Globals.TikklrRewardsDarkOrange,
                color: Alloy.Globals.TikklrWhite,
                font: {
                    fontSize: "14pt",
                    fontFamily: "Substance-Regular"
                },
                text: "Swipe this reward to the right to redeem it!"
            });
            __alloyId216.add(__alloyId220);
            var __alloyId222 = Ti.UI.createView({
                layout: "vertical",
                top: "5",
                height: Ti.UI.SIZE,
                left: "5",
                right: "5",
                backgroundColor: Alloy.Globals.TikklrRewardDarkOrange,
                color: Alloy.Globals.TikklrWhite,
                font: {
                    fontSize: "15pt",
                    fontFamily: "Substance-Regular"
                }
            });
            __alloyId164.add(__alloyId222);
            var __alloyId224 = Ti.UI.createLabel({
                backgroundColor: Alloy.Globals.TikklrRewardsDarkOrange,
                color: Alloy.Globals.TikklrWhite,
                font: {
                    fontSize: "15pt",
                    fontFamily: "Substance-ExtraBold"
                },
                text: "TERMS & CONDITIONS"
            });
            __alloyId222.add(__alloyId224);
            var __alloyId226 = Ti.UI.createLabel({
                backgroundColor: Alloy.Globals.TikklrRewardsDarkOrange,
                color: Alloy.Globals.TikklrWhite,
                font: {
                    fontSize: "14pt",
                    fontFamily: "Substance-Regular"
                },
                text: _.template("{m.terms_and_conditions}", {
                    m: __alloyId162.__transform
                }, {
                    interpolate: /\{([\s\S]+?)\}/g
                })
            });
            __alloyId222.add(__alloyId226);
        }
        $.__views.justForScroll.setData(rows);
    }
    function closeShareBox() {
        var animation = Ti.UI.createAnimation({
            left: Ti.Platform.displayCaps.platformWidth
        });
        $.shareRow.animate(animation);
        $.shareRow.toggle = false;
    }
    function makeShareActive(source) {
        "facebook" == source.id ? source.backgroundImage = "facebook-fill.png" : "twitter" == source.id ? source.backgroundImage = "twitter-fill.png" : "linkedIn" == source.id && (source.backgroundImage = "linkedIn-fill.png");
    }
    function makeShareNonActive(source) {
        "facebook" == source.id ? source.backgroundImage = "facebook.png" : "twitter" == source.id ? source.backgroundImage = "twitter.png" : "linkedIn" == source.id && (source.backgroundImage = "linkedIn.png");
    }
    function shareClicked(e) {
        if (false == e.source.toggle || "undefined" == typeof e.source.toggle) {
            makeShareActive(e.source);
            e.source.toggle = true;
        } else {
            makeShareNonActive(e.source);
            e.source.toggle = false;
        }
    }
    require("alloy/controllers/pandaGallery").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "rewardDetails";
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
    var __defers = {};
    $.currentNode = Alloy.createModel("Node");
    $.currentNodeList = Alloy.createCollection("Node");
    $.__views.rewardDetailsView = Ti.UI.createView({
        layout: "vertical",
        backgroundColor: Alloy.Globals.TikklrRewardOrange,
        id: "rewardDetailsView"
    });
    $.__views.rewardDetailsView && $.addTopLevelView($.__views.rewardDetailsView);
    $.__views.__alloyId159 = Ti.UI.createView({
        top: 0,
        width: Ti.Platform.displayCaps.platformWidth,
        backgroundColor: Alloy.Globals.TikklrBlack,
        height: "40",
        id: "__alloyId159"
    });
    $.__views.rewardDetailsView.add($.__views.__alloyId159);
    $.__views.__alloyId160 = Ti.UI.createButton({
        left: "20",
        width: "40",
        height: "40",
        backgroundColor: "transparent",
        backgroundImage: "back.png",
        selectedBackgroundImage: "back-pressed.png",
        id: "__alloyId160"
    });
    $.__views.__alloyId159.add($.__views.__alloyId160);
    backClicked ? $.addListener($.__views.__alloyId160, "click", backClicked) : __defers["$.__views.__alloyId160!click!backClicked"] = true;
    $.__views.__alloyId161 = Ti.UI.createLabel({
        backgroundColor: "transparent",
        color: Alloy.Globals.TikklrGreen,
        font: {
            fontSize: "20pt",
            fontFamily: "Substance-ExtraBold"
        },
        height: 35,
        zIndex: 1e3,
        text: "REWARDS",
        id: "__alloyId161"
    });
    $.__views.__alloyId159.add($.__views.__alloyId161);
    $.__views.justForScroll = Ti.UI.createTableView({
        layout: "vertical",
        backgroundColor: Alloy.Globals.TikklrRewardOrange,
        bottom: "0",
        id: "justForScroll"
    });
    $.__views.rewardDetailsView.add($.__views.justForScroll);
    var __alloyId227 = Alloy.Collections["currentNodeList"] || currentNodeList;
    __alloyId227.on("fetch destroy change add remove reset", __alloyId228);
    exports.destroy = function() {
        __alloyId227 && __alloyId227.off("fetch destroy change add remove reset", __alloyId228);
    };
    _.extend($, $.__views);
    exports.baseController = "pandaGallery";
    require("alloy/animation");
    arguments[0] || null;
    0 == Alloy.Collections.currentNodeList.length && Alloy.Collections.currentNodeList.add(Alloy.Models.currentNode);
    exports.clean = function() {
        $.destroy();
        Alloy.Collections.currentNodeList.reset();
        $.off();
    };
    __defers["$.__views.__alloyId160!click!backClicked"] && $.addListener($.__views.__alloyId160, "click", backClicked);
    __defers["__alloyId175!click!handleCloseClicked"] && $.addListener(__alloyId175, "click", handleCloseClicked);
    __defers["__alloyId176!click!shareClicked"] && $.addListener(__alloyId176, "click", shareClicked);
    __defers["__alloyId177!click!shareClicked"] && $.addListener(__alloyId177, "click", shareClicked);
    __defers["__alloyId178!click!shareClicked"] && $.addListener(__alloyId178, "click", shareClicked);
    __defers["__alloyId179!click!handleCloseClicked"] && $.addListener(__alloyId179, "click", handleCloseClicked);
    __defers["__alloyId198!click!closeShareBox"] && $.addListener(__alloyId198, "click", closeShareBox);
    __defers["__alloyId199!click!shareClicked"] && $.addListener(__alloyId199, "click", shareClicked);
    __defers["__alloyId200!click!shareClicked"] && $.addListener(__alloyId200, "click", shareClicked);
    __defers["__alloyId201!click!shareClicked"] && $.addListener(__alloyId201, "click", shareClicked);
    __defers["__alloyId202!click!closeShareBox"] && $.addListener(__alloyId202, "click", closeShareBox);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;