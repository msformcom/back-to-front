"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityTransform = void 0;
const parse_arrow_function_1 = require("./mapping/parse-arrow-function");
class EntityTransform {
    constructor(service, targetctor) {
        this.service = service;
        this.targetctor = targetctor;
        this.transforms = [];
    }
    addTransform(f) {
        this.transforms.push(f);
    }
    mapAll() {
        this.addTransform((s, t) => {
            for (let p in s) {
                t[p] = s[p];
            }
        });
        return this;
    }
    asDate(sourceproperty, targetProperty) {
        this.addTransform((s, t) => {
            var p = (0, parse_arrow_function_1.getPropertyName)(targetProperty);
            t[p] = new Date(sourceproperty(s));
        });
        return this;
    }
    addNavigationProperty(p, f) {
        let name = (0, parse_arrow_function_1.getPropertyName)(p);
        // let getter=()=>{
        //   return self.lots.getMany<ListItem,ListItem>({url:l.id+"/Reservations" });
        // }
        this.addTransform((s, t) => {
            Object.defineProperty(t, name, {
                get: () => f(s, t),
            });
        });
        return this;
    }
    get() {
        return (source) => {
            var target = this.targetctor ? new this.targetctor() : {};
            for (let f of this.transforms) {
                f(source, target);
            }
            return target;
        };
    }
}
exports.EntityTransform = EntityTransform;
//# sourceMappingURL=entity-transform.js.map