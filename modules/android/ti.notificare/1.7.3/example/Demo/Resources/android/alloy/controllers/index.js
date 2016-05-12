function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function createListView(inbox) {
        items = [];
        inbox.forEach(function(item) {
            var time = new Date(item.time);
            var options = {
                weekday: "long",
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            };
            items.push({
                template: item.opened ? "templateInboxOpened" : "templateInbox",
                textMessage: {
                    text: item.message
                },
                textDate: {
                    text: time.toLocaleDateString("nl-NL", options)
                },
                msg: {
                    id: item.id,
                    notification: item.notification,
                    message: item.message,
                    time: item.time
                },
                properties: {
                    canEdit: true,
                    inboxId: item.id
                }
            });
        });
        $.section.setItems(items);
        $.list.addEventListener("itemclick", function(e) {
            var item = $.section.getItemAt(e.itemIndex);
            notificare.openInboxItem(item.msg);
            setTimeout(function() {
                loadInbox();
            }, 2e3);
        });
        $.list.addEventListener("delete", function(e) {
            notificare.removeFromInbox(items[e.itemIndex].msg, function() {
                setTimeout(function() {
                    loadInbox();
                }, 2e3);
            });
        });
    }
    function loadInbox() {
        notificare.fetchInbox(function(e) {
            createListView(e.inbox);
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
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
    var __alloyId0 = [];
    if (!Alloy.isTablet) {
        $.__views.__alloyId1 = Ti.UI.createWindow({
            backgroundColor: "white",
            title: "Inbox",
            id: "__alloyId1"
        });
        var __alloyId2 = {};
        var __alloyId4 = [];
        var __alloyId5 = {
            type: "Ti.UI.View",
            childTemplates: function() {
                var __alloyId6 = [];
                var __alloyId7 = {
                    type: "Ti.UI.Label",
                    bindId: "textDate",
                    properties: {
                        width: "100dp",
                        height: Ti.UI.SIZE,
                        color: "#000",
                        right: "10dp",
                        font: {
                            fontSize: 12
                        },
                        bindId: "textDate"
                    }
                };
                __alloyId6.push(__alloyId7);
                var __alloyId8 = {
                    type: "Ti.UI.Label",
                    bindId: "textMessage",
                    properties: {
                        width: Ti.UI.SIZE,
                        height: Ti.UI.SIZE,
                        color: "#000",
                        left: "10dp",
                        top: "10dp",
                        textAlign: "left",
                        font: {
                            fontSize: 14
                        },
                        bindId: "textMessage"
                    }
                };
                __alloyId6.push(__alloyId8);
                return __alloyId6;
            }(),
            properties: {}
        };
        __alloyId4.push(__alloyId5);
        var __alloyId3 = {
            properties: {
                height: Ti.UI.SIZE,
                name: "templateInbox"
            },
            childTemplates: __alloyId4
        };
        __alloyId2["templateInbox"] = __alloyId3;
        var __alloyId10 = [];
        var __alloyId11 = {
            type: "Ti.UI.View",
            childTemplates: function() {
                var __alloyId12 = [];
                var __alloyId13 = {
                    type: "Ti.UI.Label",
                    bindId: "textDate",
                    properties: {
                        width: "100dp",
                        height: Ti.UI.SIZE,
                        color: "#CCC",
                        right: "10dp",
                        font: {
                            fontSize: 12
                        },
                        bindId: "textDate"
                    }
                };
                __alloyId12.push(__alloyId13);
                var __alloyId14 = {
                    type: "Ti.UI.Label",
                    bindId: "textMessage",
                    properties: {
                        width: Ti.UI.SIZE,
                        height: Ti.UI.SIZE,
                        color: "#CCC",
                        left: "10dp",
                        top: "10dp",
                        textAlign: "left",
                        font: {
                            fontSize: 14
                        },
                        bindId: "textMessage"
                    }
                };
                __alloyId12.push(__alloyId14);
                return __alloyId12;
            }(),
            properties: {}
        };
        __alloyId10.push(__alloyId11);
        var __alloyId9 = {
            properties: {
                height: Ti.UI.SIZE,
                name: "templateInboxOpened"
            },
            childTemplates: __alloyId10
        };
        __alloyId2["templateInboxOpened"] = __alloyId9;
        var __alloyId16 = [];
        $.__views.__alloyId17 = {
            template: "templateInbox",
            properties: {
                id: "__alloyId17"
            }
        };
        __alloyId16.push($.__views.__alloyId17);
        $.__views.section = Ti.UI.createListSection({
            id: "section"
        });
        $.__views.section.items = __alloyId16;
        var __alloyId18 = [];
        __alloyId18.push($.__views.section);
        $.__views.list = Ti.UI.createListView({
            sections: __alloyId18,
            templates: __alloyId2,
            id: "list",
            defaultItemTemplate: "templateInbox"
        });
        $.__views.__alloyId1.add($.__views.list);
    }
    $.__views.tab = Ti.UI.createTab({
        window: $.__views.__alloyId1,
        id: "tab"
    });
    __alloyId0.push($.__views.tab);
    $.__views.index = Ti.UI.createTabGroup({
        tabs: __alloyId0,
        backgroundColor: "white",
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    exports.destroy = function() {};
    _.extend($, $.__views);
    !function() {
        Ti.API.debug("index init");
        Ti.API.info("attach lifecycle activity worker");
        $.index.notificareProxy = Alloy.Globals.notificare.createActivityWorker({
            lifecycleContainer: $.index
        });
        $.index.open();
        loadInbox();
        notificare.addEventListener("badge", function() {
            loadInbox();
        });
    }();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;