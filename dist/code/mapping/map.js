"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Map = void 0;
const map_options_1 = require("./map-options");
const parse_arrow_function_1 = require("./parse-arrow-function");
class Map {
    constructor() {
        this.mappings = [];
        this.ctorSource = Object;
        this.ctorTarget = Object;
    }
    forMember(f, optionsBuilder) {
        var options = new map_options_1.MapOptions((0, parse_arrow_function_1.parseArrowFunction)(f));
        optionsBuilder(options);
        this.mappings.push(options);
        return this;
    }
    reverse() {
        var r = new Map();
        r.ctorSource = this.ctorTarget;
        r.ctorTarget = this.ctorSource;
        r.mappings = this.mappings.map(m => m.reverse());
    }
    map(obj) {
        let o = new this.ctorSource();
        for (let m of this.mappings) {
            if (m.sourceInfo.set) {
                let value = m.targetInfo.get(obj);
                m.sourceInfo.set(o, value);
            }
        }
        return o;
    }
}
exports.Map = Map;
//# sourceMappingURL=map.js.map