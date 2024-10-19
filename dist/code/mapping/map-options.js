"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapOptions = void 0;
const parse_arrow_function_1 = require("./parse-arrow-function");
class MapOptions {
    constructor(sourceInfo) {
        this.sourceInfo = sourceInfo;
    }
    ;
    mapFrom(targetProperty) {
        this.targetInfo = (0, parse_arrow_function_1.parseArrowFunction)(targetProperty);
        return this;
    }
    reverse() {
        var r = new MapOptions(this.targetInfo);
        r.targetInfo = this.sourceInfo;
        return r;
    }
}
exports.MapOptions = MapOptions;
//# sourceMappingURL=map-options.js.map