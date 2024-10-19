"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapOptions = void 0;
const parse_arrow_function_1 = require("./parse-arrow-function");
class MapOptions {
    constructor(targetInfo) {
        this.targetInfo = targetInfo;
    }
    ;
    mapFrom(sourceProperty) {
        this.sourceInfo = (0, parse_arrow_function_1.parseArrowFunction)(sourceProperty);
        return this;
    }
    reverse() {
        var r = new MapOptions(this.sourceInfo);
        r.sourceInfo = this.targetInfo;
        return r;
    }
}
exports.MapOptions = MapOptions;
//# sourceMappingURL=map-options.js.map