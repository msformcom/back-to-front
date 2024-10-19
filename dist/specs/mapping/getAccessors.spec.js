"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jasmine");
const parse_arrow_function_1 = require("../../code/mapping/parse-arrow-function");
describe("getAccessorsTest", () => {
    it("should set", () => {
        var obj = { a: 34, b: "toto", c: [{ a: 34, b: "toto" }] };
        var accessor = (0, parse_arrow_function_1.parseArrowFunction)(u => u.c[0].a);
        var v = accessor.get(obj);
        expect(v).toBe(34);
        accessor.set(obj, 35);
        v = accessor.get(obj);
        expect(v).toBe(35);
    });
});
//# sourceMappingURL=getAccessors.spec.js.map