"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mapper = void 0;
const map_1 = require("./map");
class Mapper {
    constructor() {
        this.maps = {};
    }
    createMap(name) {
        if (name.indexOf("|") == -1) {
            throw new Error("Map name cannot contains |");
        }
        var newMap = new map_1.Map();
        this.maps[name] = newMap;
        return newMap;
    }
    createTypedMap(ctorSource, ctorTarget) {
        var newMap = this.createMap(ctorSource.name + '|' + ctorTarget.name);
    }
    map(name, obj) {
        var map = this.maps[name];
        return map.map(obj);
    }
}
exports.Mapper = Mapper;
//# sourceMappingURL=mapper.js.map