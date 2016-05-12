function saveMetaData() {
    Ti.App.Properties.setObject(CACHE_METADATA_PROPERTY, metadata);
}

function File(id) {
    this.id = id;
    var cache_data = metadata[this.id];
    this.file_path = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, CACHE_PATH_PREFIX, this.id);
    if (cache_data) {
        this.is_cached = this.exists();
        this.last_used_at = cache_data.last_used_at;
        this.md5 = cache_data.md5;
    } else {
        this.is_cached = false;
        this.last_used_at = 0;
        this.md5 = null;
    }
}

function extendObj(newObj, otherObj) {
    for (var name in otherObj) otherObj.hasOwnProperty(name) && (newObj[name] = otherObj[name]);
    return newObj;
}

function requestDispatch() {
    var waitForDispatch = Promise.defer();
    pending_tasks.request_count < MAX_ASYNC_TASKS ? waitForDispatch.resolve() : pending_tasks.dispatch_queue.push(waitForDispatch);
    pending_tasks.request_count++;
    return waitForDispatch.promise;
}

function dispatchNextTask() {
    var task;
    pending_tasks.request_count--;
    task = pending_tasks.dispatch_queue.shift();
    if (!task) return;
    task.resolve ? task.resolve() : asap(task);
}

function promisedHTTPClient(url, options) {
    var waitForHttp = Promise.defer();
    var httpClientOptions = {
        timeout: HTTP_TIMEOUT
    };
    extendObj(httpClientOptions, options);
    extendObj(httpClientOptions, {
        onload: waitForHttp.resolve,
        onerror: waitForHttp.reject,
        ondatastream: waitForHttp.notify
    });
    var http = Ti.Network.createHTTPClient(httpClientOptions);
    http.open("GET", url);
    http.send();
    return waitForHttp.promise;
}

function debug(msg) {
    DEBUG && Ti.API.debug(msg);
}

function Promise(fn) {
    function handle(deferred) {
        if (null === state) {
            deferreds.push(deferred);
            return;
        }
        asap(function() {
            var cb = state ? deferred.onFulfilled : deferred.onRejected;
            if (null === cb) {
                (state ? deferred.resolve : deferred.reject)(value);
                return;
            }
            var ret;
            try {
                ret = cb(value);
            } catch (e) {
                deferred.reject(e);
                return;
            }
            deferred.resolve(ret);
        });
    }
    function resolve(newValue) {
        try {
            if (newValue === self) throw new TypeError("A promise cannot be resolved with itself.");
            if (newValue && ("object" == typeof newValue || "function" == typeof newValue)) {
                var then = newValue.then;
                if ("function" == typeof then) {
                    doResolve(polyBind(then, newValue), resolve, reject);
                    return;
                }
            }
            state = true;
            value = newValue;
            finale();
        } catch (e) {
            reject(e);
        }
    }
    function reject(newValue) {
        state = false;
        value = newValue;
        finale();
    }
    function finale() {
        for (var i = 0, len = deferreds.length; len > i; i++) handle(deferreds[i]);
        deferreds = null;
    }
    if (!(this instanceof Promise)) return new Promise(fn);
    if ("function" != typeof fn) throw new TypeError("not a function");
    var state = null;
    var value = null;
    var deferreds = [];
    var self = this;
    this.then = function(onFulfilled, onRejected) {
        return new Promise(function(resolve, reject) {
            handle(new Handler(onFulfilled, onRejected, resolve, reject));
        });
    };
    doResolve(fn, resolve, reject);
}

function Handler(onFulfilled, onRejected, resolve, reject) {
    this.onFulfilled = "function" == typeof onFulfilled ? onFulfilled : null;
    this.onRejected = "function" == typeof onRejected ? onRejected : null;
    this.resolve = resolve;
    this.reject = reject;
}

function doResolve(fn, onFulfilled, onRejected) {
    var done = false;
    try {
        fn(function(value) {
            if (done) return;
            done = true;
            onFulfilled(value);
        }, function(reason) {
            if (done) return;
            done = true;
            onRejected(reason);
        });
    } catch (ex) {
        if (done) return;
        done = true;
        onRejected(ex);
    }
}

function asap(fn) {
    setTimeout(fn, 0);
}

function polyBind(fn, ctx) {
    return function() {
        return fn.apply(ctx, Array.prototype.slice.call(arguments));
    };
}

var HTTP_TIMEOUT, CACHE_METADATA_PROPERTY, EXPIRATION_TIME, CACHE_PATH_PREFIX, MAX_ASYNC_TASKS, DEBUG;

!function(global) {
    function loadConfig(name) {
        if (have_alloy && null != Alloy.CFG[name]) return Alloy.CFG[name];
        if (null != global[name]) return global[name];
    }
    var have_alloy = "undefined" != typeof Alloy && null !== Alloy && Alloy.CFG;
    HTTP_TIMEOUT = loadConfig("remoteimage_timeout") || 12e4;
    CACHE_METADATA_PROPERTY = loadConfig("remoteimage_property_key") || "RemoteImage";
    CACHE_PATH_PREFIX = loadConfig("remoteimage_directory") || "RemoteImageCache";
    EXPIRATION_TIME = loadConfig("remoteimage_expiration") || 864e4;
    MAX_ASYNC_TASKS = loadConfig("remoteimage_requests") || 20;
    DEBUG = loadConfig("remoteimage_debug") || 0;
}(Ti.App);

var metadata = Ti.App.Properties.getObject(CACHE_METADATA_PROPERTY) || {};

var cache_path = function() {
    var data_dir = Ti.Filesystem.applicationDataDirectory;
    var cache_dir = Ti.Filesystem.getFile(data_dir, CACHE_PATH_PREFIX);
    cache_dir.exists() || cache_dir.createDirectory();
    return cache_dir;
}();

File.prototype.updateLastUsedAt = function() {
    this.last_used_at = new Date().getTime();
    return this;
};

File.prototype.save = function() {
    metadata[this.id] = {
        last_used_at: this.last_used_at,
        md5: this.md5
    };
    saveMetaData();
    this.is_cached = true;
    return this;
};

File.prototype.write = function(data) {
    this.getFile().write(data);
    return this.exists();
};

File.prototype.exists = function() {
    return this.getFile().exists();
};

File.prototype.expired = function(invalidate) {
    if (invalidate) {
        this.last_used_at = 0;
        this.save();
    }
    return new Date().getTime() - this.last_used_at > EXPIRATION_TIME;
};

File.prototype.expunge = function() {
    this.getFile().deleteFile();
    delete metadata[this.id];
    saveMetaData();
    this.is_cached = false;
};

File.prototype.getPath = function() {
    return this.getFile().resolve();
};

File.prototype.toString = function() {
    return "" + this.id + ": " + (this.is_cached ? "cached" : "new") + " file" + (this.pending ? " (pending)" : "") + (this.downloaded ? " (downloaded)" : "") + (this.expired() ? " (expired)" : "") + (this.last_used_at ? ", Last used: " + this.last_used_at : "") + (this.md5 ? ", MD5: " + this.md5 : "") + " " + this.getPath();
};

File.prototype.getFile = function() {
    return this.file_path;
};

File.getMD5 = function(data) {
    return Ti.Utils.md5HexDigest(data);
};

File.idFromUrl = function(url) {
    return Ti.Utils.md5HexDigest(url);
};

File.fromURL = function(url) {
    return new File(File.idFromUrl(url));
};

var pending_tasks;

var FileLoader = {};

FileLoader.download = function(url, args) {
    function attachCallbacks(promise) {
        if (args.onload || args.onerror || args.ondatastream) return promise.then(args.onload, args.onerror, args.ondatastream);
        return promise;
    }
    args = args || {};
    var file = File.fromURL(url);
    if (pending_tasks[file.id]) {
        debug("Pending " + url + ": " + file);
        return attachCallbacks(pending_tasks[file.id]);
    }
    if (!args.force && file.is_cached && !file.expired()) {
        file.updateLastUsedAt().save();
        waitForPath = Promise.defer();
        waitForPath.resolve(file);
        return attachCallbacks(waitForPath.promise);
    }
    if (!Ti.Network.online && false !== args.offlineCheck) {
        var offlineDefer = Promise.defer();
        offlineDefer.reject("Network offline");
        return attachCallbacks(offlineDefer.promise);
    }
    var waitingForDownload = requestDispatch().then(function() {
        debug("Downloading " + url + ": " + file);
        return promisedHTTPClient(url, args);
    }).get("source").get("responseData").then(function(data) {
        var md5sum = File.getMD5(data);
        debug("Processing " + url + ": " + file);
        if (args.force || md5sum !== file.md5) {
            debug("File contents have changed: " + md5sum + " <=> " + file.md5);
            if (!file.write(data)) throw new Error("Failed to save data from " + url + ": " + file);
            file.downloaded = true;
            file.md5 = md5sum;
        }
        file.updateLastUsedAt().save();
        return file;
    }).fin(function() {
        debug("Finishing: " + file);
        delete pending_tasks[file.id];
        file.pending = false;
        dispatchNextTask();
    });
    file.pending = true;
    pending_tasks[file.id] = waitingForDownload;
    return attachCallbacks(waitingForDownload);
};

FileLoader.pruneStaleCache = FileLoader.gc = function(force) {
    var id, file;
    for (id in metadata) {
        file = new File(id);
        (force || file.expired()) && file.expunge();
    }
};

FileLoader.setupTaskStack = function() {
    pending_tasks = {
        request_count: 0,
        dispatch_queue: []
    };
};

Promise.prototype.progress = function() {
    return this;
};

Promise.prototype.done = function() {
    var self = arguments.length ? this.then.apply(this, arguments) : this;
    self.then(null, function(err) {
        asap(function() {
            throw err;
        });
    });
};

Promise.prototype.fail = function(fn) {
    return this.then(null, fn);
};

Promise.prototype.get = function(prop) {
    return this.then(function(obj) {
        return obj[prop];
    });
};

Promise.prototype.invoke = function(prop) {
    var args = Array.prototype.slice.call(arguments, 1);
    return this.then(function(obj) {
        return obj[prop].apply(obj, args);
    });
};

Promise.prototype.fin = function(onFinished) {
    return this.then(function(x) {
        onFinished(x);
        return x;
    }, function(x) {
        onFinished(x);
    });
};

Promise.defer = function() {
    var defer = {};
    defer.promise = new Promise(function(resolve, reject) {
        defer.resolve = resolve;
        defer.reject = reject;
        defer.notify = function() {};
    });
    return defer;
};

FileLoader.setupTaskStack();

FileLoader.File = File;

FileLoader.Promise = Promise;

module.exports = FileLoader;