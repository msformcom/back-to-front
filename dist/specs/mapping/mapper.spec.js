"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jasmine");
const mapper_1 = require("../../code/mapping/mapper");
describe("mapperTest", () => {
    var mapper;
    var obj1 = { a: 34, b: "toto", c: new Date(1968, 8, 11), d: [{ a: 34, b: "toto" }] };
    beforeAll(() => {
        mapper = new mapper_1.Mapper();
        mapper.createMap("Type1|Type2")
            .forMember(c => c.a, o => { o.mapFrom(s => s.a); })
            .forMember(c => c.b, o => { o.mapFrom(s => s.b); });
    });
    it("should create", () => {
    });
});
//# sourceMappingURL=mapper.spec.js.map