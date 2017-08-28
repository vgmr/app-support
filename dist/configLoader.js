var handlers = [];
// Add Listner
export var listenConfiguration = function (cb) {
    handlers.push(cb);
};
export var loadConfiguration = function (configFile) {
    return new Promise(function (res, rej) {
        fetch(configFile).then(function (k) { return k.json(); }).then(function (config) {
            handlers.forEach(function (p) { return p(config); });
            res(config);
        }).catch(function (err) {
            // Will use empty object for configuration
            // Default values will be used.
            handlers.forEach(function (p) { return p({}); });
            res({});
        });
    });
};
//# sourceMappingURL=configLoader.js.map