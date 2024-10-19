"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mapper = void 0;
const map_1 = require("./map");
class Mapper {
    createMap(name) {
        if (name.indexOf("|") > -1) {
            throw new Error("Map name cannot contains |");
        }
        return new map_1.Map();
    }
    createTypedMap(ctorSource, ctorTarget) {
        return this.createMap(ctorSource.name + '|' + ctorTarget.name);
    }
}
exports.Mapper = Mapper;
//# sourceMappingURL=mapper.js.map