function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function __alloyId223(e) {
        if (e && e.fromAdapter) return;
        __alloyId223.opts || {};
        var models = __alloyId222.models;
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId157 = models[i];
            __alloyId157.__transform = rewardTransform(__alloyId157);
            var __alloyId159 = Ti.UI.createTableViewRow({
                layout: "vertical",
                backgroundColor: Alloy.Globals.TikklrRewardOrange,
                selectionStyle: "none",
                nodeId: _.template("{m.nid}", {
                    m: __alloyId157.__transform
                }, {
                    interpolate: /\{([\s\S]+?)\}/g
                })
            });
            rows.push(__alloyId159);
            var __alloyId161 = Ti.UI.createView({
                top: 0,
                left: 0,
                width: Ti.Platform.displayCaps.platformWidth,
                layout: "absolute",
                height: Ti.UI.SIZE,
                zIndex: 50,
                backgroundColor: Alloy.Globals.TikklrBlack
            });
            __alloyId159.add(__alloyId161);
            var __alloyId163 = Ti.UI.createView({
                top: 0,
                left: 0,
                width: Ti.UI.FILL,
                height: "180",
                backgroundColor: _.template("{m.rewardBackgroundColor}", {
                    m: __alloyId157.__transform
                }, {
                    interpolate: /\{([\s\S]+?)\}/g
                })
            });
            __alloyId161.add(__alloyId163);
            var __alloyId165 = Ti.UI.createView({
                top: 0,
                opacity: .7,
                height: Ti.UI.SIZE,
                width: Ti.UI.FILL,
                backgroundColor: Alloy.Globals.TikklrWhite
            });
            __alloyId161.add(__alloyId165);
            var __alloyId167 = Ti.UI.createLabel({
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
                    m: __alloyId157.__transform
                }, {
                    interpolate: /\{([\s\S]+?)\}/g
                })
            });
            __alloyId165.add(__alloyId167);
            var __alloyId169 = Ti.UI.createView({
                top: "0",
                left: Ti.Platform.displayCaps.platformWidth,
                width: Ti.Platform.displayCaps.platformWidth,
                backgroundColor: Alloy.Globals.TikklrBlack,
                height: "40",
                layout: "horizontal"
            });
            __alloyId161.add(__alloyId169);
            var __alloyId170 = Ti.UI.createView({
                top: 0,
                left: 0,
                width: "40",
                height: "40",
                backgroundImage: "cancel-white.png",
                backgroundColor: Alloy.Globals.TikklrRed
            });
            __alloyId169.add(__alloyId170);
            handleCloseClicked ? $.addListener(__alloyId170, "click", handleCloseClicked) : __defers["__alloyId170!click!handleCloseClicked"] = true;
            var __alloyId171 = Ti.UI.createView({
                left: "30",
                width: "40",
                height: "40",
                backgroundImage: "facebook.png"
            });
            __alloyId169.add(__alloyId171);
            shareClicked ? $.addListener(__alloyId171, "click", shareClicked) : __defers["__alloyId171!click!shareClicked"] = true;
            var __alloyId172 = Ti.UI.createView({
                left: "30",
                width: "40",
                height: "40",
                backgroundImage: "twitter.png"
            });
            __alloyId169.add(__alloyId172);
            shareClicked ? $.addListener(__alloyId172, "click", shareClicked) : __defers["__alloyId172!click!shareClicked"] = true;
            var __alloyId173 = Ti.UI.createView({
                left: "30",
                width: "40",
                height: "40",
                backgroundImage: "linkedIn.png"
            });
            __alloyId169.add(__alloyId173);
            shareClicked ? $.addListener(__alloyId173, "click", shareClicked) : __defers["__alloyId173!click!shareClicked"] = true;
            var __alloyId174 = Ti.UI.createView({
                top: 0,
                left: "30",
                width: "40",
                height: "40",
                backgroundImage: "approve-red.png",
                backgroundColor: Alloy.Globals.TikklrWhite
            });
            __alloyId169.add(__alloyId174);
            handleCloseClicked ? $.addListener(__alloyId174, "click", handleCloseClicked) : __defers["__alloyId174!click!handleCloseClicked"] = true;
            var __alloyId176 = Ti.UI.createView({
                top: "40",
                height: Ti.UI.SIZE,
                layout: "vertical",
                backgroundColor: "transparent",
                width: "100%"
            });
            __alloyId161.add(__alloyId176);
            var __alloyId178 = Ti.UI.createView({
                top: "0",
                height: Ti.UI.SIZE,
                layout: "horizontal",
                backgroundColor: "transparent",
                width: "100%"
            });
            __alloyId176.add(__alloyId178);
            var __alloyId179 = Ti.UI.createView({
                width: "90",
                height: "70",
                top: "5",
                left: "10",
                backgroundImage: _.template("{m.thumb}", {
                    m: __alloyId157.__transform
                }, {
                    interpolate: /\{([\s\S]+?)\}/g
                })
            });
            __alloyId178.add(__alloyId179);
            var __alloyId181 = Ti.UI.createLabel({
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
                    m: __alloyId157.__transform
                }, {
                    interpolate: /\{([\s\S]+?)\}/g
                })
            });
            __alloyId178.add(__alloyId181);
            var __alloyId183 = Ti.UI.createView({
                top: "0",
                height: Ti.UI.SIZE,
                layout: "horizontal",
                backgroundColor: "transparent",
                width: "100%"
            });
            __alloyId176.add(__alloyId183);
            var __alloyId184 = Alloy.createWidget("com.baboonmedia.remoteimage", "widget", {
                left: "10",
                top: "0",
                width: "50",
                height: "50",
                image: _.template("{m.brandImage}", {
                    m: __alloyId157.__transform
                }, {
                    interpolate: /\{([\s\S]+?)\}/g
                }),
                $model: __alloyId157,
                __parentSymbol: __alloyId183
            });
            __alloyId184.setParent(__alloyId183);
            var __alloyId186 = Ti.UI.createLabel({
                left: "5",
                bottom: "0",
                font: {
                    fontSize: "12pt",
                    fontFamily: "Substance-ExtraBold"
                },
                color: Alloy.Globals.TikklrWhite,
                text: _.template("{m.reward_brand_name}", {
                    m: __alloyId157.__transform
                }, {
                    interpolate: /\{([\s\S]+?)\}/g
                })
            });
            __alloyId183.add(__alloyId186);
            var __alloyId188 = Ti.UI.createLabel({
                right: "0",
                bottom: "0",
                font: {
                    fontSize: "12pt",
                    fontFamily: "Substance-ExtraBold"
                },
                color: Alloy.Globals.TikklrWhite,
                text: "EXP:"
            });
            __alloyId183.add(__alloyId188);
            var __alloyId190 = Ti.UI.createLabel({
                left: "2",
                right: "5",
                bottom: "0",
                font: {
                    fontSize: "12pt",
                    fontFamily: "Substance-ExtraBold"
                },
                color: Alloy.Globals.TikklrWhite,
                text: _.template("{m.expirationDate}", {
                    m: __alloyId157.__transform
                }, {
                    interpolate: /\{([\s\S]+?)\}/g
                })
            });
            __alloyId183.add(__alloyId190);
            var __alloyId191 = Alloy.createWidget("com.baboonmedia.remoteimage", "widget", {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10,
                image: _.template("{m.qr_image}", {
                    m: __alloyId157.__transform
                }, {
                    interpolate: /\{([\s\S]+?)\}/g
                }),
                $model: __alloyId157,
                __parentSymbol: __alloyId159
            });
            __alloyId191.setParent(__alloyId159);
            var __alloyId192 = Ti.UI.createView({
                top: "-40",
                left: Ti.Platform.displayCaps.platformWidth,
                width: Ti.Platform.displayCaps.platformWidth,
                backgroundColor: Alloy.Globals.TikklrBlack,
                height: "40",
                layout: "horizontal"
            });
            __alloyId159.add(__alloyId192);
            var __alloyId193 = Ti.UI.createView({
                top: 0,
                left: 0,
                width: "40",
                height: "40",
                backgroundImage: "cancel-white.png",
                backgroundColor: Alloy.Globals.TikklrRed
            });
            __alloyId192.add(__alloyId193);
            closeShareBox ? $.addListener(__alloyId193, "click", closeShareBox) : __defers["__alloyId193!click!closeShareBox"] = true;
            var __alloyId194 = Ti.UI.createView({
                left: "30",
                width: "40",
                height: "40",
                backgroundImage: "facebook.png"
            });
            __alloyId192.add(__alloyId194);
            shareClicked ? $.addListener(__alloyId194, "click", shareClicked) : __defers["__alloyId194!click!shareClicked"] = true;
            var __alloyId195 = Ti.UI.createView({
                left: "30",
                width: "40",
                height: "40",
                backgroundImage: "twitter.png"
            });
            __alloyId192.add(__alloyId195);
            shareClicked ? $.addListener(__alloyId195, "click", shareClicked) : __defers["__alloyId195!click!shareClicked"] = true;
            var __alloyId196 = Ti.UI.createView({
                left: "30",
                width: "40",
                height: "40",
                backgroundImage: "linkedIn.png"
            });
            __alloyId192.add(__alloyId196);
            shareClicked ? $.addListener(__alloyId196, "click", shareClicked) : __defers["__alloyId196!click!shareClicked"] = true;
            var __alloyId197 = Ti.UI.createView({
                top: 0,
                left: "30",
                width: "40",
                height: "40",
                backgroundImage: "approve-red.png",
                backgroundColor: Alloy.Globals.TikklrWhite
            });
            __alloyId192.add(__alloyId197);
            closeShareBox ? $.addListener(__alloyId197, "click", closeShareBox) : __defers["__alloyId197!click!closeShareBox"] = true;
            var __alloyId199 = Ti.UI.createView({
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
            __alloyId159.add(__alloyId199);
            var __alloyId201 = Ti.UI.createLabel({
                backgroundColor: Alloy.Globals.TikklrRewardsDarkOrange,
                color: Alloy.Globals.TikklrWhite,
                font: {
                    fontSize: "15pt",
                    fontFamily: "Substance-ExtraBold"
                },
                text: "YOU REAP WHAT YOU SOW"
            });
            __alloyId199.add(__alloyId201);
            var __alloyId203 = Ti.UI.createLabel({
                backgroundColor: Alloy.Globals.TikklrRewardsDarkOrange,
                color: Alloy.Globals.TikklrWhite,
                font: {
                    fontSize: "14pt",
                    fontFamily: "Substance-Regular"
                },
                text: _.template("{m.reward_description}", {
                    m: __alloyId157.__transform
                }, {
                    interpolate: /\{([\s\S]+?)\}/g
                })
            });
            __alloyId199.add(__alloyId203);
            var __alloyId205 = Ti.UI.createView({
                top: "5",
                height: "95",
                left: "5",
                right: "5",
                backgroundColor: Alloy.Globals.TikklrRewardsRed
            });
            __alloyId159.add(__alloyId205);
            var __alloyId207 = Ti.UI.createView({
                backgroundImage: "hourglass-green.png",
                left: "5",
                width: "50",
                height: "50"
            });
            __alloyId205.add(__alloyId207);
            var __alloyId209 = Ti.UI.createLabel({
                right: "5",
                backgroundColor: Alloy.Globals.TikklrRewardsRed,
                color: Alloy.Globals.TikklrWhite,
                font: {
                    fontSize: "15pt",
                    fontFamily: "Substance-Regular"
                },
                text: _.template("{m.endDate}", {
                    m: __alloyId157.__transform
                }, {
                    interpolate: /\{([\s\S]+?)\}/g
                })
            });
            __alloyId205.add(__alloyId209);
            var __alloyId211 = Ti.UI.createView({
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
            __alloyId159.add(__alloyId211);
            var __alloyId213 = Ti.UI.createLabel({
                backgroundColor: Alloy.Globals.TikklrRewardsDarkOrange,
                color: Alloy.Globals.TikklrWhite,
                font: {
                    fontSize: "15pt",
                    fontFamily: "Substance-ExtraBold"
                },
                text: "WHAT DO I DO NOW?"
            });
            __alloyId211.add(__alloyId213);
            var __alloyId215 = Ti.UI.createLabel({
                backgroundColor: Alloy.Globals.TikklrRewardsDarkOrange,
                color: Alloy.Globals.TikklrWhite,
                font: {
                    fontSize: "14pt",
                    fontFamily: "Substance-Regular"
                },
                text: "Swipe this reward to the right to redeem it!"
            });
            __alloyId211.add(__alloyId215);
            var __alloyId217 = Ti.UI.createView({
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
            __alloyId159.add(__alloyId217);
            var __alloyId219 = Ti.UI.createLabel({
                backgroundColor: Alloy.Globals.TikklrRewardsDarkOrange,
                color: Alloy.Globals.TikklrWhite,
                font: {
                    fontSize: "15pt",
                    fontFamily: "Substance-ExtraBold"
                },
                text: "TERMS & CONDITIONS"
            });
            __alloyId217.add(__alloyId219);
            var __alloyId221 = Ti.UI.createLabel({
                backgroundColor: Alloy.Globals.TikklrRewardsDarkOrange,
                color: Alloy.Globals.TikklrWhite,
                font: {
                    fontSize: "14pt",
                    fontFamily: "Substance-Regular"
                },
                text: _.template("{m.terms_and_conditions}", {
                    m: __alloyId157.__transform
                }, {
                    interpolate: /\{([\s\S]+?)\}/g
                })
            });
            __alloyId217.add(__alloyId221);
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
    require("alloy/controllers/tikkGallery").apply(this, Array.prototype.slice.call(arguments));
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
    $.__views.__alloyId154 = Ti.UI.createView({
        top: 0,
        width: Ti.Platform.displayCaps.platformWidth,
        backgroundColor: Alloy.Globals.TikklrBlack,
        height: "40",
        id: "__alloyId154"
    });
    $.__views.rewardDetailsView.add($.__views.__alloyId154);
    $.__views.__alloyId155 = Ti.UI.createButton({
        left: "20",
        width: "40",
        height: "40",
        backgroundColor: "transparent",
        backgroundImage: "back.png",
        selectedBackgroundImage: "back-pressed.png",
        id: "__alloyId155"
    });
    $.__views.__alloyId154.add($.__views.__alloyId155);
    backClicked ? $.addListener($.__views.__alloyId155, "click", backClicked) : __defers["$.__views.__alloyId155!click!backClicked"] = true;
    $.__views.__alloyId156 = Ti.UI.createLabel({
        backgroundColor: "transparent",
        color: Alloy.Globals.TikklrGreen,
        font: {
            fontSize: "20pt",
            fontFamily: "Substance-ExtraBold"
        },
        height: 35,
        zIndex: 1e3,
        text: "REWARDS",
        id: "__alloyId156"
    });
    $.__views.__alloyId154.add($.__views.__alloyId156);
    $.__views.justForScroll = Ti.UI.createTableView({
        layout: "vertical",
        backgroundColor: Alloy.Globals.TikklrRewardOrange,
        bottom: "0",
        id: "justForScroll"
    });
    $.__views.rewardDetailsView.add($.__views.justForScroll);
    var __alloyId222 = Alloy.Collections["currentNodeList"] || currentNodeList;
    __alloyId222.on("fetch destroy change add remove reset", __alloyId223);
    exports.destroy = function() {
        __alloyId222 && __alloyId222.off("fetch destroy change add remove reset", __alloyId223);
    };
    _.extend($, $.__views);
    exports.baseController = "tikkGallery";
    require("alloy/animation");
    arguments[0] || null;
    0 == Alloy.Collections.currentNodeList.length && Alloy.Collections.currentNodeList.add(Alloy.Models.currentNode);
    exports.clean = function() {
        $.destroy();
        Alloy.Collections.currentNodeList.reset();
        $.off();
    };
    __defers["$.__views.__alloyId155!click!backClicked"] && $.addListener($.__views.__alloyId155, "click", backClicked);
    __defers["__alloyId170!click!handleCloseClicked"] && $.addListener(__alloyId170, "click", handleCloseClicked);
    __defers["__alloyId171!click!shareClicked"] && $.addListener(__alloyId171, "click", shareClicked);
    __defers["__alloyId172!click!shareClicked"] && $.addListener(__alloyId172, "click", shareClicked);
    __defers["__alloyId173!click!shareClicked"] && $.addListener(__alloyId173, "click", shareClicked);
    __defers["__alloyId174!click!handleCloseClicked"] && $.addListener(__alloyId174, "click", handleCloseClicked);
    __defers["__alloyId193!click!closeShareBox"] && $.addListener(__alloyId193, "click", closeShareBox);
    __defers["__alloyId194!click!shareClicked"] && $.addListener(__alloyId194, "click", shareClicked);
    __defers["__alloyId195!click!shareClicked"] && $.addListener(__alloyId195, "click", shareClicked);
    __defers["__alloyId196!click!shareClicked"] && $.addListener(__alloyId196, "click", shareClicked);
    __defers["__alloyId197!click!closeShareBox"] && $.addListener(__alloyId197, "click", closeShareBox);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;