function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function __alloyId341(e) {
        if (e && e.fromAdapter) return;
        __alloyId341.opts || {};
        var models = __alloyId340.models;
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId333 = models[i];
            __alloyId333.__transform = _.isFunction(__alloyId333.transform) ? __alloyId333.transform() : __alloyId333.toJSON();
            var __alloyId335 = Ti.UI.createTableViewRow({
                backgroundColor: Alloy.Globals.TikklrBlack,
                height: "30",
                layout: "absolute"
            });
            rows.push(__alloyId335);
            var __alloyId337 = Ti.UI.createLabel({
                width: Ti.UI.SIZE,
                left: "5",
                color: "white",
                font: {
                    fontSize: "12pt",
                    fontFamily: "Substance-ExtraBold"
                },
                text: _.template("{m.title}", {
                    m: __alloyId333.__transform
                }, {
                    interpolate: /\{([\s\S]+?)\}/g
                })
            });
            __alloyId335.add(__alloyId337);
            var __alloyId339 = Ti.UI.createView({
                right: "5",
                width: "30",
                height: "30",
                backgroundImage: _.template("{m.local_image}", {
                    m: __alloyId333.__transform
                }, {
                    interpolate: /\{([\s\S]+?)\}/g
                })
            });
            __alloyId335.add(__alloyId339);
        }
        $.__views.__alloyId332.setData(rows);
    }
    function changeKalturaBind() {
        $.progressBar.setVisible(Alloy.Models.Kaltura.get("uploadInProgress"));
        var progress = Alloy.Models.Kaltura.get("uploadProgress");
        $.progressBar.setWidth(300 * progress + 10);
    }
    function setViewData() {
        $.progressBar.setVisible(Alloy.Models.Kaltura.get("uploadInProgress"));
        var progress = Alloy.Models.Kaltura.get("uploadProgress");
        $.progressBar.setWidth(300 * progress + 10);
        uploadBlur();
    }
    function getTags() {
        var newTags = "";
        for (var i in $.tags.children) {
            newTags += $.tags.children[i].children[0].text;
            newTags += ", ";
        }
        newTags = newTags.substr(0, newTags.length - 2);
        return newTags;
    }
    function uploadToKalturaBtnClick() {
        var valid = uploadIsValid();
        if (null != item && valid) if (Titanium.Network.networkType == Titanium.Network.NETWORK_WIFI) startUploadToKaltura(); else if (Titanium.Network.online) {
            var dialog = Ti.UI.createAlertDialog({
                cancel: 1,
                buttonNames: [ "Yes", "No" ],
                message: "Uploading content via a cellular network might take longer than usual. We recommend uploading via a WiFi network for best results. Are you sure you want to proceed?",
                title: "Upload"
            });
            dialog.addEventListener("click", function(e) {
                e.index === dialog.cancel || startUploadToKaltura();
                dialog.hide();
            });
            dialog.show();
        }
    }
    function startUploadToKaltura() {
        $.backButton.visible = false;
        Ti.App.fireEvent("hideActionMenu");
        Alloy.Models.Kaltura.set("title", $.title.value, {
            silent: true
        });
        var tags = getTags();
        var drupalCategoryId = getDrupalCategoryId();
        Alloy.Models.Kaltura.set("drupalCategoryId", drupalCategoryId, {
            silent: true
        });
        Alloy.Models.Kaltura.set("tags", tags, {
            silent: true
        });
        Alloy.Models.Kaltura.set("category", $.category.value, {
            silent: true
        });
        Alloy.Models.Kaltura.set("rewardId", rewardId, {
            silent: true
        });
        Alloy.Models.Kaltura.title = $.title.value;
        Alloy.Models.Kaltura.tags = tags;
        Alloy.Models.Kaltura.category = $.category.value;
        Alloy.Models.Kaltura.rewardId = rewardId;
        Alloy.Models.Kaltura.drupalCategoryId = drupalCategoryId;
        item.name = $.title.value;
        Alloy.Models.Kaltura.uploadToKaltura(item);
        disableUpload();
    }
    function getDrupalCategoryId() {
        var id = null;
        for (var i in $.Categories.models) $.Categories.models[i].get("title") == $.category.value && (id = $.Categories.models[i].id);
        return id;
    }
    function openMediaGallery() {
        Titanium.Media.openPhotoGallery({
            success: function(e) {
                e.cropRect;
                if (e.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
                    Ti.API.log("e is: " + JSON.stringify(e));
                    $.imageContainer.backgroundImage = e.media;
                    $.imageContainer.setBackgroundImage(e.media);
                    item = e.media;
                    Ti.API.log("selected item is: " + JSON.stringify(item));
                } else {
                    var player = Titanium.Media.createVideoPlayer({
                        media: e.media,
                        autoplay: 0
                    });
                    player.requestThumbnailImagesAtTimes([ .1 ], Titanium.Media.VIDEO_TIME_OPTION_NEAREST_KEYFRAME, function(e) {
                        Ti.API.info("Thumbnail callback called, success = " + e.success);
                        var image = e.image;
                        $.imageContainer.backgroundImage = image;
                    });
                    item = e.media;
                }
            },
            cancel: function() {
                backClicked();
            },
            error: function(error) {
                var a = Titanium.UI.createAlertDialog({
                    title: "Camera"
                });
                a.setMessage(error.code == Titanium.Media.NO_CAMERA ? "Please run this test on device" : "Unexpected error: " + error.code);
                a.show();
            },
            saveToPhotoGallery: false,
            videoMaximumDuration: Alloy.Globals.VideoTimeLimit,
            videoQuality: Alloy.Globals.VideoQuality,
            mediaTypes: [ Titanium.Media.MEDIA_TYPE_PHOTO, Titanium.Media.MEDIA_TYPE_VIDEO ]
        });
    }
    function openCapture() {
        Titanium.Media.showCamera({
            success: function(e) {
                Ti.API.log("e is: " + JSON.stringify(e));
                e.cropRect;
                $.imageContainer.backgroundImage = e.media;
                $.imageContainer.setBackgroundImage(e.media);
                if (e.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) ; else {
                    var player = Titanium.Media.createVideoPlayer({
                        media: e.media,
                        autoplay: 0
                    });
                    player.requestThumbnailImagesAtTimes([ .1 ], Titanium.Media.VIDEO_TIME_OPTION_NEAREST_KEYFRAME, function(e) {
                        var image = e.image;
                        $.imageContainer.backgroundImage = image;
                    });
                }
                item = e.media;
            },
            cancel: function() {
                backClicked();
            },
            error: function(error) {
                var a = Titanium.UI.createAlertDialog({
                    title: "Camera"
                });
                a.setMessage(error.code == Titanium.Media.NO_CAMERA ? "Please run this test on device" : "Unexpected error: " + error.code);
                a.show();
            },
            saveToPhotoGallery: true,
            videoMaximumDuration: Alloy.Globals.VideoTimeLimit,
            videoQuality: Alloy.Globals.VideoQuality,
            mediaTypes: [ Titanium.Media.MEDIA_TYPE_PHOTO, Titanium.Media.MEDIA_TYPE_VIDEO ]
        });
    }
    function uploadIsValid() {
        var isTitleEmpty = 0 == $.title.value.length;
        var isTagsEmpty = 0 == $.tags.children.length;
        var isCategoryEmpty = 0 == $.category.value.length;
        var isValid = !isCategoryEmpty && !isTagsEmpty && !isTitleEmpty && Alloy.Models.Kaltura.get("uploadNotInProgress") && null != item;
        return isValid;
    }
    function enableUpload() {
        $.uploadButton.color = Alloy.Globals.TikklrGreen;
    }
    function disableUpload() {
        $.uploadButton.color = Alloy.Globals.TikklrUploadGray;
    }
    function uploadBlur() {
        var valid = uploadIsValid();
        valid ? enableUpload() : disableUpload();
    }
    function createTag(tagText) {
        var tagWrapper = Titanium.UI.createView({});
        var tag = Titanium.UI.createLabel({
            text: tagText
        });
        var tagClose = Titanium.UI.createView({});
        tagWrapper.addEventListener("click", function() {});
        tag.addEventListener("click", function(e) {
            var tagWrapper = e.source.parent;
            $.tags.paddingLeft = $.tags.paddingLeft - tagWrapper.toImage().width - parseInt(tagWrapper.left);
            $.tags.remove(tagWrapper);
            tagWrapper = null;
            uploadBlur();
        });
        tagClose.addEventListener("click", function(e) {
            var tagWrapper = e.source.parent;
            $.tags.paddingLeft = $.tags.paddingLeft - tagWrapper.toImage().width - parseInt(tagWrapper.left);
            $.tags.remove(tagWrapper);
            tagWrapper = null;
            uploadBlur();
        });
        $.addClass(tagWrapper, "tagWrapper");
        $.addClass(tag, "tag");
        $.addClass(tagClose, "tagClose");
        tagWrapper.add(tag);
        tagWrapper.add(tagClose);
        $.tags.add(tagWrapper);
        $.tags.value = "";
        $.tags.paddingLeft = $.tags.paddingLeft + tagWrapper.toImage().width + parseInt(tagWrapper.left);
    }
    function tagsBlur(e) {
        if (isFirst) {
            "" != e.value && createTag(e.value);
            e.cancelBubble = true;
            e.bubbles = false;
            uploadBlur();
            isFirst = false;
        } else isFirst = true;
        return e;
    }
    function categoryFocus(e) {
        $.categoryPicker.show();
        e.source.blur();
    }
    function uploadFocus() {}
    function rowClicked(e) {
        $.category.value = e.row.children[0].text;
        $.categoryPicker.hide();
        var valid = uploadIsValid();
        valid ? enableUpload() : disableUpload();
    }
    function createAttributedTexts() {
        var text = "TITLE";
        var attributedText = Titanium.UI.iOS.createAttributedString({
            text: text,
            attributes: [ {
                type: Titanium.UI.iOS.ATTRIBUTE_BACKGROUND_COLOR,
                value: Alloy.Globals.TikklrBlack,
                range: [ 0, text.length ],
                type: Titanium.UI.iOS.ATTRIBUTE_FOREGROUND_COLOR,
                value: Alloy.Globals.TikklrTextBlack,
                range: [ 0, text.length ]
            } ]
        });
        $.title.attributedHintText = attributedText;
        text = "TAGS";
        var tagsAttributedText = Titanium.UI.iOS.createAttributedString({
            text: text,
            attributes: [ {
                type: Titanium.UI.iOS.ATTRIBUTE_BACKGROUND_COLOR,
                value: Alloy.Globals.TikklrBlack,
                range: [ 0, text.length ],
                type: Titanium.UI.iOS.ATTRIBUTE_FOREGROUND_COLOR,
                value: Alloy.Globals.TikklrTextBlack,
                range: [ 0, text.length ]
            } ]
        });
        $.tags.attributedHintText = tagsAttributedText;
        text = "CATEGORY";
        var categoryAttributedText = Titanium.UI.iOS.createAttributedString({
            text: text,
            attributes: [ {
                type: Titanium.UI.iOS.ATTRIBUTE_BACKGROUND_COLOR,
                value: Alloy.Globals.TikklrBlack,
                range: [ 0, text.length ],
                type: Titanium.UI.iOS.ATTRIBUTE_FOREGROUND_COLOR,
                value: Alloy.Globals.TikklrTextBlack,
                range: [ 0, text.length ]
            } ]
        });
        $.category.attributedHintText = categoryAttributedText;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "upload";
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
    $.Categories = Alloy.createCollection("Node");
    $.Kaltura = Alloy.createModel("Kaltura");
    $.__views.uploadView = Ti.UI.createView({
        id: "uploadView"
    });
    $.__views.uploadView && $.addTopLevelView($.__views.uploadView);
    $.__views.tikklrHeader = Ti.UI.createView({
        top: 0,
        width: Ti.Platform.displayCaps.platformWidth,
        backgroundColor: "transparent",
        height: "40",
        id: "tikklrHeader"
    });
    $.__views.uploadView.add($.__views.tikklrHeader);
    $.__views.backButton = Ti.UI.createButton({
        left: "20",
        width: "40",
        height: "40",
        backgroundColor: "transparent",
        backgroundImage: "back.png",
        selectedBackgroundImage: "back-pressed.png",
        id: "backButton"
    });
    $.__views.tikklrHeader.add($.__views.backButton);
    backClicked ? $.addListener($.__views.backButton, "click", backClicked) : __defers["$.__views.backButton!click!backClicked"] = true;
    $.__views.__alloyId328 = Ti.UI.createLabel({
        backgroundColor: "transparent",
        color: Alloy.Globals.TikklrGreen,
        font: {
            fontSize: "20pt",
            fontFamily: "Substance-ExtraBold"
        },
        height: 35,
        zIndex: 1e3,
        text: "UPLOAD",
        id: "__alloyId328"
    });
    $.__views.tikklrHeader.add($.__views.__alloyId328);
    $.__views.imageContainer = Ti.UI.createView({
        left: "5",
        right: "5",
        height: "310",
        layout: "vertical",
        top: "40",
        zIndex: "100",
        id: "imageContainer"
    });
    $.__views.uploadView.add($.__views.imageContainer);
    $.__views.__alloyId329 = Ti.UI.createView({
        height: 60,
        backgroundColor: "transparent",
        layout: "horizontal",
        zIndex: 100,
        top: 10,
        id: "__alloyId329"
    });
    $.__views.imageContainer.add($.__views.__alloyId329);
    $.__views.title = Ti.UI.createTextField({
        height: "32",
        width: "269",
        top: Alloy.Globals.PaddingTop,
        left: 21,
        right: Alloy.Globals.PaddingRight,
        bottom: Alloy.Globals.PaddingBottom,
        backgroundColor: Alloy.Globals.TikklrLoginBlack,
        returnKeyType: Titanium.UI.RETURNKEY_DONE,
        font: {
            fontFamily: "Substance-ExtraBold",
            fontSize: "15pt",
            fontWeight: "bold"
        },
        color: Alloy.Globals.TikklrGreen,
        autocapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
        opacity: .7,
        paddingLeft: 10,
        zIndex: 100,
        id: "title",
        hintText: "TITLE"
    });
    $.__views.__alloyId329.add($.__views.title);
    uploadBlur ? $.addListener($.__views.title, "blur", uploadBlur) : __defers["$.__views.title!blur!uploadBlur"] = true;
    uploadFocus ? $.addListener($.__views.title, "focus", uploadFocus) : __defers["$.__views.title!focus!uploadFocus"] = true;
    $.__views.__alloyId330 = Ti.UI.createView({
        height: 60,
        backgroundColor: "transparent",
        layout: "horizontal",
        zIndex: 100,
        top: -15,
        id: "__alloyId330"
    });
    $.__views.imageContainer.add($.__views.__alloyId330);
    $.__views.tags = Ti.UI.createTextField({
        height: "32",
        width: "269",
        top: Alloy.Globals.PaddingTop,
        left: 21,
        right: Alloy.Globals.PaddingRight,
        bottom: Alloy.Globals.PaddingBottom,
        backgroundColor: Alloy.Globals.TikklrLoginBlack,
        returnKeyType: Titanium.UI.RETURNKEY_DONE,
        font: {
            fontFamily: "Substance-ExtraBold",
            fontSize: "15pt",
            fontWeight: "bold"
        },
        color: Alloy.Globals.TikklrGreen,
        autocapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
        opacity: .7,
        paddingLeft: 10,
        zIndex: 100,
        layout: "horizontal",
        id: "tags",
        hintText: "TAGS"
    });
    $.__views.__alloyId330.add($.__views.tags);
    tagsBlur ? $.addListener($.__views.tags, "blur", tagsBlur) : __defers["$.__views.tags!blur!tagsBlur"] = true;
    uploadFocus ? $.addListener($.__views.tags, "focus", uploadFocus) : __defers["$.__views.tags!focus!uploadFocus"] = true;
    $.__views.__alloyId331 = Ti.UI.createView({
        height: 60,
        backgroundColor: "transparent",
        layout: "horizontal",
        zIndex: 100,
        top: -15,
        id: "__alloyId331"
    });
    $.__views.imageContainer.add($.__views.__alloyId331);
    $.__views.category = Ti.UI.createTextField({
        height: "32",
        width: "269",
        top: Alloy.Globals.PaddingTop,
        left: 21,
        right: Alloy.Globals.PaddingRight,
        bottom: Alloy.Globals.PaddingBottom,
        backgroundColor: Alloy.Globals.TikklrLoginBlack,
        returnKeyType: Titanium.UI.RETURNKEY_DONE,
        font: {
            fontFamily: "Substance-ExtraBold",
            fontSize: "15pt",
            fontWeight: "bold"
        },
        color: Alloy.Globals.TikklrGreen,
        autocapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
        opacity: .7,
        paddingLeft: 10,
        zIndex: 100,
        id: "category",
        hintText: "CATEGORY"
    });
    $.__views.__alloyId331.add($.__views.category);
    uploadBlur ? $.addListener($.__views.category, "blur", uploadBlur) : __defers["$.__views.category!blur!uploadBlur"] = true;
    categoryFocus ? $.addListener($.__views.category, "focus", categoryFocus) : __defers["$.__views.category!focus!categoryFocus"] = true;
    $.__views.categoryPicker = Ti.UI.createView({
        zIndex: 1e3,
        top: "-55",
        left: "135",
        width: "155",
        height: "195",
        visible: false,
        id: "categoryPicker"
    });
    $.__views.imageContainer.add($.__views.categoryPicker);
    rowClicked ? $.addListener($.__views.categoryPicker, "click", rowClicked) : __defers["$.__views.categoryPicker!click!rowClicked"] = true;
    $.__views.__alloyId332 = Ti.UI.createTableView({
        separatorColor: "transparent",
        backgroundColor: Alloy.Globals.TikklrGreen,
        rowHeight: "30",
        id: "__alloyId332"
    });
    $.__views.categoryPicker.add($.__views.__alloyId332);
    var __alloyId340 = Alloy.Collections["$.Categories"] || $.Categories;
    __alloyId340.on("fetch destroy change add remove reset", __alloyId341);
    $.__views.progressBar = Ti.UI.createView({
        top: "350",
        backgroundColor: Alloy.Globals.TikklrGreen,
        left: "5",
        height: "10",
        zIndex: 100,
        id: "progressBar"
    });
    $.__views.uploadView.add($.__views.progressBar);
    $.__views.uploadButton = Ti.UI.createButton({
        top: "360",
        color: Alloy.Globals.TikklrGreen,
        font: {
            fontSize: "20pt",
            fontFamily: "Substance-ExtraBold"
        },
        zIndex: 100,
        id: "uploadButton",
        title: "UPLOAD"
    });
    $.__views.uploadView.add($.__views.uploadButton);
    uploadToKalturaBtnClick ? $.addListener($.__views.uploadButton, "click", uploadToKalturaBtnClick) : __defers["$.__views.uploadButton!click!uploadToKalturaBtnClick"] = true;
    var __alloyId342 = function() {
        var transformed = _.isFunction($.Kaltura.transform) ? $.Kaltura.transform() : $.Kaltura.toJSON();
        $.progressBar.visible = _.template("{m.uploadInProgress}", {
            m: transformed
        }, {
            interpolate: /\{([\s\S]+?)\}/g
        });
        $.progressBar.width = _.template("{m.uploadProgressFor620px}", {
            m: transformed
        }, {
            interpolate: /\{([\s\S]+?)\}/g
        });
    };
    $.Kaltura.on("fetch change destroy", __alloyId342);
    exports.destroy = function() {
        __alloyId340 && __alloyId340.off("fetch destroy change add remove reset", __alloyId341);
        $.Kaltura && $.Kaltura.off("fetch change destroy", __alloyId342);
    };
    _.extend($, $.__views);
    var givenTags = "";
    var title = "";
    var type = "";
    var category = "";
    var rewardId = "";
    args = arguments[0];
    if (null != args && "undefined" != typeof args) {
        "undefined" != typeof args["type"] && (type = args["type"]);
        "undefined" != typeof args["tags"] && (givenTags = args["tags"]);
        "undefined" != typeof args["title"] && (title = args["title"]);
        "undefined" != typeof args["category"] && (category = args["category"]);
        "undefined" != typeof args["rewardId"] && (rewardId = args["rewardId"]);
    }
    Alloy.Models.Kaltura.on("change", changeKalturaBind);
    Alloy.Models.Kaltura.set({
        uploadInProgress: 0,
        uploadProgress: 0,
        uploadNotInProgress: 1,
        uploadProgressFor620px: "0",
        drupalCategoryId: null
    }, {
        silent: true
    });
    $.Kaltura = Alloy.Models.Kaltura;
    setViewData();
    var categoriesParams = {
        "parameters[type]": "category"
    };
    $.Categories.config.headers["X-CSRF-TOKEN"] = Titanium.App.Properties.getString(Alloy.Globals.Properties.Token);
    $.Categories.config.headers["Cookie"] = Titanium.App.Properties.getString(Alloy.Globals.Properties.Session);
    $.Categories.fetch({
        success: function() {
            return;
        },
        urlparams: categoriesParams
    });
    var item = null;
    $.categoryPicker.hide();
    Ti.App.addEventListener("uploadFailed", function() {
        $.backButton.visible = true;
        Ti.App.fireEvent("showActionMenu");
    });
    var isFirst = true;
    "" != type && "library" == type ? openMediaGallery() : "capture" == type ? openCapture() : openMediaGallery();
    "" != givenTags && "undefined" != typeof givenTags && createTag(givenTags);
    "" != title && "undefined" != typeof title && ($.title.value = title);
    "" != category && "undefined" != typeof category && ($.category.value = category);
    createAttributedTexts();
    uploadIsValid() && disableUpload();
    exports.clean = function() {
        $.off();
        Alloy.Models.Kaltura.off(null, null, $);
        $.destroy();
    };
    __defers["$.__views.backButton!click!backClicked"] && $.addListener($.__views.backButton, "click", backClicked);
    __defers["$.__views.title!blur!uploadBlur"] && $.addListener($.__views.title, "blur", uploadBlur);
    __defers["$.__views.title!focus!uploadFocus"] && $.addListener($.__views.title, "focus", uploadFocus);
    __defers["$.__views.tags!blur!tagsBlur"] && $.addListener($.__views.tags, "blur", tagsBlur);
    __defers["$.__views.tags!focus!uploadFocus"] && $.addListener($.__views.tags, "focus", uploadFocus);
    __defers["$.__views.category!blur!uploadBlur"] && $.addListener($.__views.category, "blur", uploadBlur);
    __defers["$.__views.category!focus!categoryFocus"] && $.addListener($.__views.category, "focus", categoryFocus);
    __defers["$.__views.categoryPicker!click!rowClicked"] && $.addListener($.__views.categoryPicker, "click", rowClicked);
    __defers["$.__views.uploadButton!click!uploadToKalturaBtnClick"] && $.addListener($.__views.uploadButton, "click", uploadToKalturaBtnClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;