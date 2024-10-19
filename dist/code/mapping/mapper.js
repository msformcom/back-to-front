"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mapper = void 0;
const mapping_1 = require("./mapping");
const transformation_1 = require("./transformation");
class Mapper {
    constructor() {
        this.maps = {};
    }
    createMap(name) {
        if (name.indexOf("=>") == -1) {
            throw new Error("Map name must contain =>");
        }
        var newMap = new mapping_1.Mapping(this, name);
        this.maps[name] = newMap;
        return newMap;
    }
    createTypedMap(ctorSource, ctorTarget) {
        var newMap = this.createMap(ctorSource.name + "|" + ctorTarget.name);
    }
    map(name, obj) {
        let mapping;
        if (typeof name == "string") {
            mapping = name;
        }
        else if (name.call) {
            mapping = name.name + "|" + obj.constructor.name;
        }
        else {
            mapping = name.constructor.name + "|" + obj.constructor.name;
        }
        var map = this.maps[mapping];
        return map.targetFromSource(obj);
    }
    static JSONTransform() {
        var r = new transformation_1.Transformation((v) => v ? JSON.parse(v) : undefined, (v) => v ? JSON.stringify(v) : undefined);
        return r;
    }
}
exports.Mapper = Mapper;
Mapper.DateTransform = new transformation_1.Transformation((v) => new Date(v), (v) => v.toDateString());
//# sourceMappingURL=mapper.js.map