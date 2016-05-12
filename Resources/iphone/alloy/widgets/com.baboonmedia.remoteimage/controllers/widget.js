function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.baboonmedia.remoteimage/" + s : s.substring(0, index) + "/com.baboonmedia.remoteimage/" + s.substring(index + 1);
    return path;
}

function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function isValidUrl(url) {
        if ("string" == typeof url && (-1 != url.indexOf("http://") || -1 != url.indexOf("https://"))) return true;
        return false;
    }
    function load() {
        var url = getImageURL(args.image);
        var isUrl = isValidUrl(url);
        Ti.API.info("In widget.js load - url [" + url + "] isUrl [" + isUrl + "] args.image [" + args.image + "]");
        if (!isUrl || isLoaded) return;
        activity && activity.show();
        isUrl ? FileLoader.download(url).then(_display).fail(_error).done() : "undefined" != typeof url && _display(url);
    }
    function _retry() {
        return;
    }
    function _error(error) {
        if (destroyed) return;
        activity && activity.hide();
        Ti.API.error(error);
        _.has(args, "loadingerror") && $.RemoteImage.add(args.loadingerror);
        onError && onError(error);
    }
    function _display(file) {
        if (destroyed) return;
        activity && activity.hide();
        Ti.API.info("In widget.js _display - file [" + file + "]");
        if (_.isObject(file) && file.exists()) {
            Ti.API.info("In widget.js _display - In fileExists");
            $.ImageContainer.image = file.getFile();
            $.ImageContainer.opacity = 1;
            isLoaded = true;
            onDone && onDone(this);
        } else if ("undefined" != typeof $.ImageContainer) {
            Ti.API.info("In widget.js _display - In typeof $.ImageContainer != 'undefined'");
            $.ImageContainer.image = file;
            $.ImageContainer.opacity = 1;
            isLoaded = true;
            onDone && onDone(this);
        }
        Ti.API.info("In widget.js _display - After all finished");
        isLoaded || _error("Unable to find image");
    }
    function applyProperties(properties) {
        properties = properties || {};
        if (_.has(properties, "onDone") && _.isFunction(properties.onDone)) {
            onDone = properties.onDone;
            delete args.onDone;
        }
        if (_.has(properties, "onError") && _.isFunction(properties.onError)) {
            onError = properties.onError;
            delete args.onError;
        }
        var newImage = false;
        _.has(properties, "image") && properties.image != args.image && (newImage = true);
        args = _.extend(args, properties);
        _applyOuterProperties(args);
        if (args.autoload && "false" != args.autoload) {
            load();
            isLoaded = false;
        } else !newImage && args.autoload && onDone && _.delay(onDone, 1e3);
    }
    function _applyOuterProperties(properties) {
        var apply = _.pick(properties, "width", "height", "top", "right", "bottom", "left", "center", "backgroundColor", "backgroundGradient", "backgroundImage", "backgroundLeftCap", "backgroundTopCap", "backgroundRepeat", "borderColor", "borderWidth", "borderRadius", "opacity", "visible", "bubbleParent", "zIndex");
        _.size(apply) && $.RemoteImage.applyProperties(apply);
    }
    function getImage() {
        return args.image;
    }
    function setImage(image) {
        if (args.image != image && true == isLoaded) {
            args.image = image;
            isLoaded = false;
            load();
        }
    }
    function getImageURL(url) {
        if (!args.gethires) return url;
        var image = url;
        var basename = image.replace(/\\/g, "/").replace(/.*\//, "");
        var segment = basename.split(".");
        return image.replace(basename, segment[0] + "@2x." + segment[1]);
    }
    function gc() {
        FileLoader.gc();
    }
    function wipeCache() {
        FileLoader.gc(true);
    }
    function clean() {
        destroyed = true;
        _.has(args, "loadingerror") && args.loadingerror.removeEventListener("singletap", _retry);
        activity.hide();
        $.destroy();
    }
    new (require("alloy/widget"))("com.baboonmedia.remoteimage");
    this.__widgetId = "com.baboonmedia.remoteimage";
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "widget";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.RemoteImage = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "RemoteImage"
    });
    $.__views.RemoteImage && $.addTopLevelView($.__views.RemoteImage);
    $.__views.ImageContainer = Ti.UI.createImageView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        top: 0,
        left: 0,
        opacity: 0,
        id: "ImageContainer"
    });
    $.__views.RemoteImage.add($.__views.ImageContainer);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var FileLoader = require(WPATH("file_loader"));
    var args = arguments[0] || {}, onError = null, onDone = null, isLoaded = false, activity = null, destroyed = false;
    args = _.extend({
        autoload: true,
        gethires: false
    }, args);
    args.children && _.each(args.children, function(child) {
        if (!child) return;
        var role = child.role;
        role && (args[role] = child);
    });
    delete args.id;
    delete args.__parentSymbol;
    delete args.children;
    applyProperties(args);
    args.autoload && "false" != args.autoload && load();
    if (_.has(args, "activityindicator") && args.activityindicator) {
        activity = args.activityindicator;
        $.RemoteImage.add(args.activity);
    }
    gc();
    Object.defineProperty($, "image", {
        get: getImage,
        set: setImage
    });
    exports.setImage = setImage;
    exports.getImage = getImage;
    exports.applyProperties = applyProperties;
    exports.load = load;
    exports.gc = gc;
    exports.wipeCache = wipeCache;
    exports.clean = clean;
    exports.on = exports.addEventListener = function(name, callback) {
        return $.RemoteImage.addEventListener(name, callback);
    };
    exports.off = exports.removeEventListener = function(name, callback) {
        return $.RemoteImage.removeEventListener(name, callback);
    };
    exports.trigger = exports.fireEvent = function(name, e) {
        return $.RemoteImage.fireEvent(name, e);
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;