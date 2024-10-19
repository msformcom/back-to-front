"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transformation = void 0;
class Transformation {
    constructor(targetFromSource, back) {
        this.targetFromSource = targetFromSource;
        this.back = back;
    }
    pipe(transform) {
        let t = new Transformation(v => transform.targetFromSource(this.targetFromSource(v)), v => this.back(transform.back(v)));
        return t;
    }
}
exports.Transformation = Transformation;
//# sourceMappingURL=transform-interface.js.map