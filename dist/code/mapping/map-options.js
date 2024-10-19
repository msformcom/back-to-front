"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapOptions = void 0;
const parse_arrow_function_1 = require("./parse-arrow-function");
const transformation_1 = require("./transformation");
class MapOptions {
    constructor(targetInfo) {
        this.targetInfo = targetInfo;
    }
    ;
    mapFrom(sourceProperty) {
        this.sourceInfo = (0, parse_arrow_function_1.parseArrowFunction)(sourceProperty);
        return this;
    }
    clone() {
        var r = new MapOptions(this.targetInfo);
        r.sourceInfo = this.sourceInfo;
        r.transform = this.transform;
    }
    reverse() {
        var r = new MapOptions(this.sourceInfo);
        r.sourceInfo = this.targetInfo;
        if (this.transform) {
            r.transform = new transformation_1.Transformation(this.transform.back, this.transform.targetFromSource);
        }
        return r;
    }
    useTransform(transform) {
        //if(!this.transform){
        this.transform = transform;
        // }
        // else{
        //     this.transform={
        //         targetToSource:(v:any)=>transform.targetToSource(this.transform?.targetToSource(v)),
        //         back:(v:any)=>this.transform?.back(transform.back(v))
        //     }
        // }
        return this;
    }
}
exports.MapOptions = MapOptions;
//# sourceMappingURL=map-options.js.map