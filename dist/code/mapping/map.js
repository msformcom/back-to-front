"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mapping = void 0;
const map_options_1 = require("./map-options");
const parse_arrow_function_1 = require("./parse-arrow-function");
class Mapping {
    constructor(mapper, name) {
        this.mapper = mapper;
        this.name = name;
        this.mappings = [];
        this.ctorTarget = Object;
        this.ctorSource = Object;
    }
    forMember(propertyTarget, optionsBuilder) {
        var propertyTargetInfo = (0, parse_arrow_function_1.parseArrowFunction)(propertyTarget);
        var options = new map_options_1.MapOptions(propertyTargetInfo);
        optionsBuilder(options);
        var existingMapping = this.mappings.find(c => c.targetInfo);
        this.mappings.push(options);
        return this;
    }
    reverse() {
        var name = this.name.split("|").reverse().join("|");
        var r = new Mapping(this.mapper, name);
        r.ctorTarget = this.ctorSource;
        r.ctorSource = this.ctorTarget;
        r.mappings = this.mappings.map(m => m.reverse()).filter(c => c.targetInfo.set);
        this.mapper.maps[name] = r;
        return r;
    }
    map(obj) {
        let o = new this.ctorTarget();
        for (let m of this.mappings) {
            if (m.targetInfo.set) {
                // Valeur de la propriété sur la source
                let value = m.sourceInfo.get(obj);
                if (m.transform) {
                    // Transformation de la propriété
                    value = m.transform.sourceToTarget(value);
                }
                m.targetInfo.set(o, value);
            }
        }
        return o;
    }
}
exports.Mapping = Mapping;
//# sourceMappingURL=map.js.map