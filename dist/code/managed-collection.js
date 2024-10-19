"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManagedCollection = void 0;
class ManagedCollection {
    constructor(options, service) {
        var _a;
        this.options = options;
        this.service = service;
        if (!options.url) {
            options.url = "";
        }
        this.cache = (_a = this.options.cache) !== null && _a !== void 0 ? _a : {};
    }
    addFunctions(functions) {
        var added = functions(this);
        for (let p in added) {
            this[p] = added[p];
        }
        return this;
    }
    getOne(options) {
        if (!options) {
            options = { url: "" };
        }
        if (!options.url) {
            options.url = "";
        }
        if (options.keep == undefined) {
            options.keep = true;
        }
        let finalUrl = this.options.url;
        if (options.url) {
            if (options.url[0] == '/') {
                finalUrl = options.url;
            }
            else {
                finalUrl += options.url;
            }
        }
        if (this.cache[finalUrl] && !options.latest) {
            return this.cache[finalUrl].value;
        }
        let result = this.service.getOne({
            url: finalUrl,
            transform: options.transform
        });
        this.cache[finalUrl] = { timeStamp: Date.now(),
            value: result,
            keep: options.keep
        };
        return result;
    }
    getMany(options) {
        if (!options) {
            options = {};
        }
        let o2 = Object.assign(Object.assign({}, options), { transform: options.transform ? (c) => c.map(options.transform) : undefined });
        return this.getOne(o2);
    }
}
exports.ManagedCollection = ManagedCollection;
//# sourceMappingURL=managed-collection.js.map