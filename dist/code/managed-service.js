"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManagedService = void 0;
const core_1 = require("@angular/core");
const rxjs_1 = require("rxjs");
const managed_collection_1 = require("./managed-collection");
const parse_arrow_function_1 = require("./mapping/parse-arrow-function");
const entity_transform_1 = require("./entity-transform");
class ManagedService {
    constructor(options) {
        this.options = options;
    }
    getOne(options) {
        let finalUrl = this.options.baseUrl;
        if (options.url) {
            if (options.url[0] == '/') {
                finalUrl = options.url;
            }
            else {
                finalUrl += options.url;
            }
        }
        let transform = options.transform ? options.transform : (c) => c;
        console.log('Executing : ' + finalUrl);
        var sr = (0, core_1.signal)(undefined);
        (0, rxjs_1.lastValueFrom)(this.options.httpClient.get(finalUrl)).then((r) => {
            let newValue = transform(r);
            sr.set(newValue);
        });
        return sr;
    }
    getMany(options) {
        let o2 = Object.assign(Object.assign({}, options), { transform: options.transform ? (c) => c.map(options.transform) : undefined });
        return this.getOne(o2);
    }
    addNavigationProperty(o, p, f) {
        let name = (0, parse_arrow_function_1.getPropertyName)(p);
        // let getter=()=>{
        //   return self.lots.getMany<ListItem,ListItem>({url:l.id+"/Reservations" });
        // }
        Object.defineProperty(o, name, {
            get: f
        });
    }
    addCollection(options) {
        return new managed_collection_1.ManagedCollection(options, this);
        ;
    }
    transform(targetctor) {
        return new entity_transform_1.EntityTransform(this, targetctor);
    }
}
exports.ManagedService = ManagedService;
//# sourceMappingURL=managed-service.js.map