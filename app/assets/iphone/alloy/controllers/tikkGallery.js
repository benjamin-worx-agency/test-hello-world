function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function cleanMessageText(text) {
        text.indexOf("\n");
        var textArray = text.split("\n", 2);
        var newText = textArray.join("");
        return newText;
    }
    function resetPullHeader(table) {
        reloading = false;
        $.tableHeader.imageArrow.transform = Ti.UI.create2DMatrix();
        $.tableHeader.imageArrow.show();
        $.tableHeader.labelStatus.text = "Pull down to refresh...";
        table.setContentInsets({
            top: 0
        }, {
            animated: true
        });
    }
    function apiErrorHandler(responseJSON, responseText) {
        loading = false;
        loadMore = false;
        Ti.App.fireEvent("noResults");
        Ti.App.fireEvent("stopLoading");
        if (responseText) try {
            var text = JSON.parse(responseText);
            text && "undefined" != typeof text[0] ? Ti.App.fireEvent("triggerError", {
                message: text[0]
            }) : Ti.App.fireEvent("triggerError", {
                message: responseText
            });
        } catch (e) {
            Ti.App.fireEvent("triggerError", {
                message: responseText
            });
        }
    }
    function setVideoData() {
        Alloy.Models.currentNode.categoryImage = "";
        if ("undefined" != typeof Alloy.Models.currentNode.og_group_ref && "undefined" != typeof Alloy.Models.currentNode.og_group_ref[0]) {
            var categoryId = Alloy.Models.currentNode.og_group_ref[0].id;
            var categoryImage = categoriesByIds[categoryId];
            if ("undefined" != typeof categoryImage) {
                Alloy.Models.currentNode.categoryImage = categoryImage;
                Alloy.Models.currentNode.set("categoryImage", categoryImage, {
                    silent: true
                });
            }
        }
        var properties = nodeTransform(Alloy.Models.currentNode);
        Alloy.Models.currentNode.set(properties, {
            silent: true
        });
    }
    function setRewardData() {
        var reward_type = Alloy.Models.currentNode.get("reward_type");
        var title = Alloy.Models.currentNode.get("title");
        var rewardBackgroundColor = Alloy.Globals.TikklrRewardBlue;
        var thumb = "pounds-white.png";
        if ("Cash" == reward_type) {
            thumb = "pounds-white.png";
            rewardBackgroundColor = Alloy.Globals.TikklrRewardBlue;
        } else if ("Ticket" == reward_type) {
            thumb = "tikket-white.png";
            rewardBackgroundColor = Alloy.Globals.TikklrRewardGreen;
        } else if ("Discount" == reward_type) {
            thumb = "gift-white.png";
            rewardBackgroundColor = Alloy.Globals.TikklrRewardOrange;
        } else {
            thumb = "gift-white.png";
            rewardBackgroundColor = Alloy.Globals.TikklrRewardOrange;
        }
        var titleUpperCase = title.toUpperCase();
        Alloy.Models.currentNode.get("og_group_ref");
        var reward_link = Alloy.Models.currentNode.get("reward_link");
        var value = Alloy.Models.currentNode.get("value");
        var reward_description = Alloy.Models.currentNode.get("reward_description");
        var expiration_date = Alloy.Models.currentNode.get("expiration_date");
        var endDate = new Date(1e3 * expiration_date);
        endDateString = weekday[endDate.getDay()] + " " + endDate.getDate() + "th  " + months[endDate.getMonth()] + " " + endDate.getFullYear();
        var qr_image = "";
        var qr_imageObject = Alloy.Models.currentNode.get("qr_image");
        qr_imageObject && qr_imageObject.file && qr_imageObject.file.fileUrl && (qr_image = qr_imageObject.file.fileUrl);
        var terms_and_conditions = Alloy.Models.currentNode.get("terms_and_conditions");
        Alloy.Models.currentNode.set({
            terms_and_conditions: terms_and_conditions,
            qr_image: qr_image,
            titleUpperCase: titleUpperCase,
            rewardBackgroundColor: rewardBackgroundColor,
            thumb: thumb,
            title: title,
            reward_link: reward_link,
            value: value,
            reward_type: reward_type,
            reward_description: reward_description,
            expiration_date: expiration_date,
            endDate: endDateString,
            reward_link: reward_link
        }, {
            silent: true
        });
    }
    function setBriefData() {
        var image = Alloy.Models.currentNode.get("image");
        var imageUri = "";
        void 0 != image && void 0 != image.file && void 0 != image.file.fileUrl && (imageUri = image.file.fileUrl);
        var brandLogo = Alloy.Models.currentNode.get("brand_logo");
        var brandLogoUri = "";
        void 0 != brandLogo && void 0 != brandLogo.file && void 0 != brandLogo.file.fileUrl && (brandLogoUri = brandLogo.file.fileUrl);
        var selfieImage = "selfie-dead.png";
        Alloy.Models.currentNode.get("isSelfie") && (selfieImage = "selfie-gray.png");
        var thumbAllowedImage = "photo-dead.png";
        Alloy.Models.currentNode.get("isThumbAllowed") && (thumbAllowedImage = "photo-gray.png");
        var isVideoImage = "video-dead.png";
        Alloy.Models.currentNode.get("isVideo") && (isVideoImage = "video-gray.png");
        var categoryName = Alloy.Models.currentNode.get("category");
        var date = Alloy.Models.currentNode.get("date").value2;
        var endDate = new Date(1e3 * date);
        endDateString = weekday[endDate.getDay()] + " " + endDate.getDate() + "th  " + months[endDate.getMonth()] + " " + endDate.getFullYear();
        Alloy.Models.currentNode.set({
            isSelfie: Alloy.Models.currentNode.get("selfie_tikk") ? true : false,
            isVideo: Alloy.Models.currentNode.get("video_tikk") ? true : false,
            isThumbAllowed: Alloy.Models.currentNode.get("tikk_options") ? true : false,
            notIsSelfie: Alloy.Models.currentNode.get("selfie_tikk") ? false : true,
            notIsVideo: Alloy.Models.currentNode.get("video_tikk") ? false : true,
            notIsThumbAllowed: Alloy.Models.currentNode.get("tikk_options") ? false : true,
            brandLogoUrl: brandLogoUri,
            voucherPercent: Alloy.Models.currentNode.get("voucher_value"),
            brandName: Alloy.Models.currentNode.get("brand_name"),
            briefSummary: Alloy.Models.currentNode.get("brief_summary"),
            briefFull: Alloy.Models.currentNode.get("brief_full"),
            followers: 1500,
            selfieImage: selfieImage,
            endDate: endDateString,
            categoryImage: categories[categoryName],
            isVideoImage: isVideoImage,
            thumbAllowedImage: thumbAllowedImage
        }, {
            silent: true
        });
    }
    function openShareBox(shareRow) {
        if ("undefined" != typeof shareRow) {
            var animation = Ti.UI.createAnimation({
                left: 0
            });
            shareRow.animate(animation);
            shareRow.toggle = true;
        }
    }
    function closeShareBox(shareRow) {
        if ("undefined" != typeof shareRow) {
            var animation = Ti.UI.createAnimation({
                left: Ti.Platform.displayCaps.platformWidth
            });
            shareRow.animate(animation);
            shareRow.toggle = false;
        }
    }
    function makeShareActive(source) {
        "facebook.png" == source.backgroundImage ? source.backgroundImage = "facebook-fill.png" : "twitter.png" == source.backgroundImage ? source.backgroundImage = "twitter-fill.png" : "linkedIn.png" == source.backgroundImage && (source.backgroundImage = "linkedIn-fill.png");
    }
    function makeShareNonActive(source) {
        "facebook-fill.png" == source.backgroundImage ? source.backgroundImage = "facebook.png" : "twitter-fill.png" == source.backgroundImage ? source.backgroundImage = "twitter.png" : "linkedIn-fill.png" == source.backgroundImage && (source.backgroundImage = "linkedIn.png");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "tikkGallery";
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
    exports.destroy = function() {};
    _.extend($, $.__views);
    var Animation = require("alloy/animation");
    var animationDuration = 300;
    var flag_name = Alloy.Globals.FollowFlag;
    var numOfItems = 10;
    var loadMore = true;
    var loading = false;
    var urlParams = {
        "parameters[type]": "briefs",
        sort: "created",
        direction: "DESC",
        pagesize: numOfItems
    };
    var tablePullHeight = -60;
    var pulling = false;
    var reloading = false;
    var offset = 0;
    var page = 1;
    var adding = false;
    var collection;
    var galleryCenter = null;
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    var months = new Array(7);
    months[0] = "January";
    months[1] = "February";
    months[2] = "March";
    months[3] = "April";
    months[4] = "May";
    months[5] = "June";
    months[6] = "July";
    months[7] = "August";
    months[8] = "September";
    months[9] = "October";
    months[10] = "November";
    months[11] = "December";
    var categoriesByIds = {
        128: "category-arts.png",
        130: "category-motors.png",
        131: "category-makeup.png",
        "Days Out": "category-travel.png",
        133: "category-drinks.png",
        Entertainment: "category-drinks",
        135: "category-fashion-men.png",
        136: "category-fashion-women.png",
        137: "category-dining.png",
        138: "category-home.png",
        139: "category-baby.png",
        134: "category-music.png",
        141: "category-sports.png",
        142: "category-toys.png",
        132: "category-travel.png",
        274: "category-technology.png",
        143: "category-travel.png"
    };
    var categories = {
        Arts: "category-arts.png",
        Automotive: "category-motors.png",
        Beauty: "category-makeup.png",
        "Days Out": "category-makeup.png",
        Drink: "category-drinks.png",
        Entertainment: "category-drinks",
        "Fashion (Mens)": "category-fashion-men.png",
        "Fashion (Womens)": "category-fashion-women.png",
        Food: "category-dining.png",
        "Homes and Gardens": "category-home.png",
        "Mum's": "category-baby.png",
        Music: "category-music.png",
        Sports: "category-sports.png",
        Toys: "category-toys.png",
        Travel: "category-travel.png",
        Technology: "category-technology.png"
    };
    nodeTransform = function(model) {
        Ti.API.info("In gallery Video transform: " + JSON.stringify(model));
        var transform = model.toJSON();
        transform.isOwner = Alloy.Models.User.get("uid") == transform.author.id ? 1 : 0;
        transform.titleUpperCase = transform.title.toUpperCase();
        transform.thumb = "http://video.tikklr.com/p/" + Alloy.Globals.partnerId + "/thumbnail/entry_id/" + transform.uploader + "/width/" + 2 * Ti.Platform.displayCaps.platformWidth + "/type/1/quality/80";
        if ("undefined" != typeof transform.views) {
            var views = "";
            transform.views = views;
        }
        transform.categoryImage = "";
        if ("undefined" != typeof transform.og_group_ref && "undefined" != typeof transform.og_group_ref[0]) {
            var categoryId = transform.og_group_ref[0].id;
            var categoryImage = categoriesByIds[categoryId];
            "undefined" != typeof categoryImage && (transform.categoryImage = categoryImage);
        }
        if ("video" == transform.type) {
            transform.isVideo = true;
            transform.isThumb = false;
        } else {
            transform.isVideo = false;
            transform.isThumb = true;
        }
        return transform;
    };
    profileNodeTransform = function(model) {
        var transform = nodeTransform(model);
        transform.thumb = "http://video.tikklr.com/p/" + Alloy.Globals.partnerId + "/thumbnail/entry_id/" + transform.uploader + "/width/" + 2 * Ti.Platform.displayCaps.platformWidth + "/height/165/type/3/quality/80";
        return transform;
    };
    briefTransform = function(model) {
        Ti.API.info("In gallery Brief transform: " + JSON.stringify(model));
        var transform = model.toJSON();
        transform.summary = "";
        transform.description = "";
        if ("undefined" != typeof transform.body) {
            transform.summary = transform.body.summary;
            transform.description = transform.body.value;
        }
        transform.isOwner = Alloy.Models.User.get("uid") == transform.author.id ? 1 : 0;
        transform.titleUpperCase = transform.title.toUpperCase();
        transform.thumb = "star.png";
        "undefined" != typeof transform && "undefined" != typeof transform.image && transform.image.file && transform.image.file && (transform.thumb = transform.image.file.fileUrl);
        var categoryName = transform.category;
        transform.categoryImage = categories[categoryName];
        if ("undefined" != typeof transform.date) {
            var endDate = new Date(1e3 * transform.date.value2);
            var endMinutes = Number(endDate.getMinutes());
            10 > endMinutes && (endMinutes = "0" + endMinutes);
            transform.endDate = weekday[endDate.getDay()] + " " + endDate.getDate() + "th  " + months[endDate.getMonth()] + " " + endDate.getFullYear() + " " + endDate.getHours() + ":" + endMinutes;
        }
        transform.isSelfie = transform.selfie_tikk ? true : false;
        transform.selfieImage = transform.isSelfie ? "selfie-gray.png" : "selfie-dead.png";
        transform.isVideo = transform.video_tikk ? true : false;
        transform.isVideoImage = transform.isVideo ? "video-gray.png" : "video-dead.png";
        transform.isThumb = transform.tikk_options ? true : false;
        transform.thumbAllowedImage = transform.isThumb ? "photo-gray.png" : "photo-dead.png";
        transform.notIsSelfie = transform.selfie_tikk ? false : true;
        transform.notIsVideo = transform.video_tikk ? false : true;
        transform.notIsThumb = transform.tikk_options ? false : true;
        if ("Points" == transform.voucher_type) transform.voucher_image = "pound.png"; else if ("Ticket" == transform.voucher_type) {
            transform.voucher_image = "tik-ticket.png";
            transform.voucher_value = "VIP";
        } else if ("Discount" == transform.voucher_type || "Voucher" == transform.voucher_type) transform.voucher_image = "percent-voucher.png"; else if ("Gift" == transform.voucher_type) {
            transform.voucher_image = "gift.png";
            transform.voucher_value = "FREE";
        }
        return transform;
    };
    var savedSuccessCallback = null;
    rewardTransform = function(model) {
        Ti.API.info("In gallery Reward transform: " + JSON.stringify(model));
        var transform = model.toJSON();
        transform.isOwner = Alloy.Models.User.get("uid") == transform.author.id ? 1 : 0;
        transform.titleUpperCase = transform.title.toUpperCase();
        var endDateString = "";
        if ("undefined" != typeof transform.expiration_date) {
            var endDate = new Date(1e3 * transform.expiration_date);
            var month = endDate.getMonth() + 1;
            var day = endDate.getDate();
            var year = endDate.getFullYear();
            var year = year.toString().substr(2, 2);
            endDateString = day + "." + month + ". " + year;
        }
        transform.expirationDate = endDateString;
        transform && transform.brand_logo && transform.brand_logo.file && transform.brand_logo.file && (transform.brandImage = transform.brand_logo.file.fileUrl);
        transform.rewardBackgroundColor = Alloy.Globals.TikklrRewardBlue;
        transform.thumb = "pounds-white.png";
        if ("Cash" == transform.reward_type) {
            transform.thumb = "pounds-white.png";
            transform.rewardBackgroundColor = Alloy.Globals.TikklrRewardBlue;
        } else if ("Ticket" == transform.reward_type) {
            transform.thumb = "tikket-white.png";
            transform.rewardBackgroundColor = Alloy.Globals.TikklrRewardGreen;
        } else if ("Discount" == transform.reward_type) {
            transform.thumb = "gift-white.png";
            transform.rewardBackgroundColor = Alloy.Globals.TikklrRewardOrange;
        }
        transform && transform.image && transform.image.file && transform.image.file && (transform.thumb = transform.image.file.fileUrl);
        if ("undefined" != typeof transform.og_group_ref && "undefined" != typeof transform.og_group_ref[0]) {
            var categoryImage = categoriesByIds[categoryId];
            transform.categoryImage = "undefined" != typeof categoryImage ? categoryImage : "";
        }
        return transform;
    };
    userTransform = function(model) {
        Ti.API.info("In gallery user transform: " + JSON.stringify(model));
        var transform = model.toJSON();
        transform.pictureUrl = "profile.png";
        if (model.get("picture") && null != model.get("picture") && 0 != model.get("picture")) {
            var picture = model.get("picture");
            "undefined" != typeof picture.url ? transform.pictureUrl = model.get("picture").url : "undefined" != typeof picture.filename && (transform.pictureUrl = Alloy.Globals.drupalPublicImageUrlBase + picture.filename);
        }
        transform.pictureUrl = transform.pictureUrl.replace("styles/254x175", "styles/50x50");
        transform.realname = model.get("realname");
        transform["@realname"] = "@" + model.get("realname");
        if (!transform.realname || !transform["@realname"]) {
            transform.realname = model.get("name");
            transform["@realname"] = "@" + model.get("name");
        }
        transform.name = model.get("name");
        transform.mail = model.get("mail");
        transform.uid = model.get("uid");
        transform.id = model.get("id");
        transform.mail = model.get("mail");
        transform.firstName = model.getDrupalFieldValue("field_name_first");
        transform.lastName = model.getDrupalFieldValue("field_name_last");
        transform.bio = model.getDrupalFieldValue("field_bio");
        transform.isFollowed = false;
        transform.isNotFollowed = true;
        if (transform.uid != Alloy.Models.User.uid) {
            if ("undefined" != typeof Alloy.Collections["Following"].get(transform.uid)) {
                transform.isFollowed = true;
                transform.isNotFollowed = false;
            }
        } else transform.isNotFollowed = false;
        transform.videoCount = "";
        transform.following = "";
        transform.followers = "";
        return transform;
    };
    user2Transform = function(model) {
        return userTransform(model);
    };
    messageTransform = function(model) {
        Ti.API.info("In gallery message transform: " + JSON.stringify(model));
        var transform = model.toJSON();
        var messageText = model.get("text");
        messageText = cleanMessageText(messageText);
        var head = "<head><link rel='stylesheet' type='text/css' href='css/message.css'/></head>";
        transform["html"] = head + '<body style="font-size: 15px;">' + messageText + "</body>";
        transform["text"] = messageText;
        return transform;
    };
    tableScroll = function(e) {
        offset = e.contentOffset.y;
        if (pulling && !reloading && offset > tablePullHeight && 0 > offset) {
            pulling = false;
            var unrotate = Ti.UI.create2DMatrix();
            $.tableHeader.imageArrow.animate({
                transform: unrotate,
                duration: 180
            });
            $.tableHeader.labelStatus.text = "Pull down to refresh...";
        } else if (!pulling && !reloading && tablePullHeight > offset) {
            pulling = true;
            var rotate = Ti.UI.create2DMatrix().rotate(180);
            $.tableHeader.imageArrow.animate({
                transform: rotate,
                duration: 180
            });
            $.tableHeader.labelStatus.text = "Release to refresh...";
        }
    };
    tableScrollEnd = function(e) {
        if (!loadMore || loading) return;
        if (!adding && e.contentOffset.y + e.size.height >= e.contentSize.height) {
            var pageSize = numOfItems * page++;
            urlParams.pagesize = pageSize;
            Ti.App.fireEvent("loading", {
                top: galleryCenter
            });
            if ("undefined" != typeof collection) {
                loading = true;
                collection.fetch({
                    success: function(e) {
                        "undefined" != typeof savedSuccessCallback && null != savedSuccessCallback && savedSuccessCallback(e);
                        loading = false;
                        collection = e;
                        Ti.App.fireEvent("stopLoading");
                        if (e.length < pageSize) {
                            Ti.API.log("No more entries");
                            loadMore = false;
                        }
                    },
                    error: apiErrorHandler,
                    urlparams: urlParams
                });
                adding = true;
                setTimeout(function() {
                    adding = false;
                }, 3e3);
            }
        }
    };
    galleryDragEnd = function(e) {
        if (pulling && !reloading && tablePullHeight > offset && !loading) {
            pulling = false;
            reloading = true;
            loadMore = true;
            $.tableHeader.labelStatus.text = "Updating...";
            $.tableHeader.imageArrow.hide();
            page = 1;
            var pageSize = numOfItems * page++;
            urlParams.pagesize = pageSize;
            Ti.App.fireEvent("loading", {
                top: galleryCenter
            });
            loading = true;
            collection.fetch({
                success: function(e) {
                    "undefined" != typeof savedSuccessCallback && null != savedSuccessCallback && savedSuccessCallback(e);
                    Ti.App.fireEvent("stopLoading");
                    loading = false;
                    if (e.length < pageSize) {
                        Ti.API.log("No more entries");
                        loadMore = false;
                    }
                },
                error: apiErrorHandler,
                urlparams: urlParams
            });
            resetPullHeader(e.source);
        }
    };
    $.loadGallery = function(collectionToShow, params, center, successCallback) {
        if (!loadMore || loading) return;
        Ti.API.log("Loading the gallery");
        var pageSize = numOfItems * page++;
        collection = collectionToShow;
        savedSuccessCallback = successCallback;
        "undefined" != typeof center && (galleryCenter = center);
        params && (urlParams = params);
        collection.config.headers["X-CSRF-TOKEN"] = Titanium.App.Properties.getString(Alloy.Globals.Properties.Token);
        collection.config.headers["Cookie"] = Titanium.App.Properties.getString(Alloy.Globals.Properties.Session);
        Ti.App.fireEvent("loading", {
            top: galleryCenter
        });
        loading = true;
        collection.fetch({
            success: function(e) {
                loading = false;
                Ti.API.info("Success fetching gallery " + JSON.stringify(e));
                if ("undefined" != typeof savedSuccessCallback && null != savedSuccessCallback) {
                    Ti.API.info("Firing up callback method");
                    savedSuccessCallback(e);
                }
                Ti.App.fireEvent("stopLoading");
                if (e.length < pageSize) {
                    Ti.API.log("No more entries");
                    loadMore = false;
                }
            },
            error: apiErrorHandler,
            urlparams: urlParams
        });
    };
    $.enableLoadMore = function() {
        loadMore = true;
    };
    playVideo = function(e) {
        if (!e.row.toggle) {
            var entryId = e.source.entryId;
            Ti.API.info("in playVideo: " + entryId);
        }
    };
    disableClick = function(e) {
        e.cancelBubble = true;
        e.bubbles = false;
        return false;
    };
    deleteVideo = function(e) {
        var nodeId = e.row.nodeId;
        var video = collection.get(nodeId);
        video.destroy({
            success: function(model) {
                var a = Titanium.UI.createAlertDialog({
                    title: "Video Deleted"
                });
                a.setMessage("Video " + model.get("title") + " was deleted successfully");
                a.show();
            }
        });
        return disableClick(e);
    };
    rowClicked = function(e) {
        Ti.API.info("e: " + JSON.stringify(e));
        if (e && e.row && null != collection) {
            var nodeId = e.row.nodeId;
            var model = collection.get(nodeId);
            var nodeType = e.row.nodeType;
            var pageToLoad = "tikDetails";
            var args = model.get("uploader");
            Alloy.Models.currentNode = model;
            if ("brief" == nodeType) {
                pageToLoad = "briefDetails";
                args = "";
                setBriefData();
                Alloy.Models.Kaltura.setBrief(Alloy.Models.currentNode);
                "undefined" == typeof Alloy.Collections.currentNodeList && (Alloy.Collections.currentNodeList = Alloy.createCollection("Node"));
            } else if ("video" == nodeType) setVideoData(); else if ("reward" == nodeType) {
                pageToLoad = "rewardDetails";
                args = "";
                setRewardData();
                "undefined" == typeof Alloy.Collections.currentNodeList && (Alloy.Collections.currentNodeList = Alloy.createCollection("Node"));
            }
            Ti.App.fireEvent("attachWindow", {
                page: pageToLoad,
                arguments: args
            });
        }
    };
    redeemReward = function(e) {
        if ("right" == e.direction && "swipe" == e.type) {
            var nodeId = e.row.nodeId;
            Ti.API.info("swiped: " + collection);
            Alloy.Globals.rewardToRedeem = collection.get(nodeId);
            Alloy.Globals.rewardToRedeem.nid = nodeId;
            Alloy.Globals.rewardToRedeem.set("nid", nodeId, {
                silent: true
            });
            var dialog = Ti.UI.createAlertDialog({
                cancel: 1,
                buttonNames: [ "Yes", "No" ],
                message: "Would you like to redeem this reward?",
                title: "Redeem Reward"
            });
            dialog.addEventListener("click", function(e) {
                e.index === e.source.cancel || Alloy.Globals.rewardToRedeem.destroy({
                    success: function(model) {
                        Ti.Platform.openURL(model.get("reward_link").url);
                        Ti.App.fireEvent("attachWindow", {
                            page: "briefList"
                        });
                    }
                });
                dialog.hide();
            });
            dialog.show();
            e.source.add(dialog);
        }
        disableClick(e);
        return false;
    };
    showDescription = function(e) {
        Ti.API.info("In showDescription: " + e.source);
        var infoView = e.row.children[0];
        var nodeView = e.row.children[1];
        if ("undefined" != typeof nodeView) {
            var infoViewMinimumHeight = infoView.toImage().height;
            var nodeViewHeight = nodeView.toImage().height;
            nodeViewHeight - 40 > infoViewMinimumHeight && (infoView.height = nodeViewHeight - 40);
            if (false != e.row.toggle && "undefined" != typeof e.row.toggle || "left" != e.direction && "click" != e.type) {
                if (true == e.row.toggle && ("right" == e.direction || "click" == e.type)) {
                    var slide_right = Ti.UI.createAnimation();
                    slide_right.left = Ti.Platform.displayCaps.platformWidth;
                    slide_right.duration = 300;
                    slide_right.backgroundColor = Alloy.Globals.TikklrBlack;
                    infoView.animate(slide_right);
                    e.row.toggle = false;
                }
            } else {
                var slide_left = Ti.UI.createAnimation();
                slide_left.left = 0;
                slide_left.duration = 300;
                slide_left.backgroundColor = Alloy.Globals.TikklrBlack;
                infoView.animate(slide_left);
                e.row.toggle = true;
            }
        }
        disableClick(e);
        return false;
    };
    starVideo = function(e) {
        alert("TODO: video was stared");
        disableClick(e);
        return false;
    };
    shareVideo = function(e) {
        var shareRow = e.source.parent.parent.children[2];
        if ("undefined" != typeof e.row) {
            var nodeView = e.row.children[1];
            shareRow = nodeView.children[2];
        }
        openShareBox(shareRow);
        disableClick(e);
        return false;
    };
    handleCloseClicked = function(e) {
        var shareRow = e.source.parent.parent.children[2];
        if ("undefined" != typeof e.row) {
            var nodeView = e.row.children[1];
            shareRow = nodeView.children[2];
        }
        closeShareBox(shareRow);
        disableClick(e);
        return false;
    };
    followersClicked = function(e) {
        var numOfChildren = e.source.parent.children.length;
        var followButton = e.source.parent.children[numOfChildren - 2];
        followButton.opacity = 0;
        followButton.visible = true;
        Animation.fadeOut(e.source, animationDuration);
        Animation.fadeIn(followButton, animationDuration);
        var flag = Alloy.createModel("Flag");
        var entity_id = e.source.uid;
        var content_id = e.source.uid;
        var action = "unflag";
        var uid = Alloy.Models.User.get("uid");
        flag.flag(action, flag_name, entity_id, content_id, uid);
        return disableClick(e);
    };
    followClicked = function(e) {
        var numOfChildren = e.source.parent.children.length;
        var followingButton = e.source.parent.children[numOfChildren - 1];
        Animation.fadeOut(e.source, animationDuration);
        followingButton.opacity = 0;
        followingButton.visible = true;
        Animation.fadeIn(followingButton, animationDuration);
        var flag = Alloy.createModel("Flag");
        var entity_id = e.source.uid;
        var content_id = e.source.uid;
        var action = "flag";
        var uid = Alloy.Models.User.get("uid");
        Ti.API.info("following: " + action + " " + entity_id + " " + content_id + " " + uid);
        flag.flag(action, flag_name, entity_id, content_id, uid);
        return disableClick(e);
    };
    flagFinished = function(e) {
        Alloy.Collections["Following"].fetch(Alloy.Globals.followingParams, {
            silent: true
        });
        var user = Alloy.Models.User;
        var currentFollowing = user.get("following");
        Ti.API.info("Flag finished with: " + JSON.stringify(e));
        if (e.flag_name == flag_name) {
            "undefined" == typeof currentFollowing && (currentFollowing = user.following);
            if ("flag" == e.flag_type) if (currentFollowing > 0) {
                user.set("following", currentFollowing + 1, {
                    silent: true
                });
                user.following = currentFollowing + 1;
            } else {
                user.set("following", 1, {
                    silent: true
                });
                user.following = 1;
            } else if (currentFollowing > 0) {
                user.set("following", currentFollowing - 1, {
                    silent: true
                });
                user.following = currentFollowing - 1;
            } else {
                user.set("following", 0, {
                    silent: true
                });
                user.following = 0;
            }
            "undefined" != typeof $.followingCount && $.followingCount.setText($.User.get("following"));
        }
    };
    shareClicked = function(e) {
        if (false == e.source.toggle || "undefined" == typeof e.source.toggle) {
            makeShareActive(e.source);
            e.source.toggle = true;
        } else {
            makeShareNonActive(e.source);
            e.source.toggle = false;
        }
        disableClick(e);
        return false;
    };
    exports.clean = function() {
        $.destroy();
        $.off();
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;