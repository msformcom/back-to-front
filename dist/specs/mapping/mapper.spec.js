"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jasmine");
const mapper_1 = require("../../code/mapping/mapper");
describe("mapperTest", () => {
    var mapper;
    var poco;
    var dto;
    beforeAll(() => {
        poco = { a: 34, b: "toto", c: new Date(1968, 8, 11), d: [{ a: 34, b: "toto" }], e: { a: 34, b: "toto", c: new Date() } };
        dto = { a: 34, b: "toto", c: new Date(1968, 8, 11).toDateString(), d: [{ a: 34, b: "toto" }], e: '{ a:34, b:"toto"}' };
        mapper = new mapper_1.Mapper();
        mapper.createMap("DTO=>POCO")
            .forMember(c => c.a, o => o.mapFrom(s => s.a))
            .forMember(c => c.b, o => o.mapFrom(s => s.b))
            .forMember(c => c.c, o => o.mapFrom(s => s.c).useTransform(mapper_1.Mapper.DateTransform))
            .forMember(c => c.e, o => o.mapFrom(s => s.e).useTransform(mapper_1.Mapper
            .JSONTransform()
            .pipe(mapper.maps["DTO=>POCO"])));
    });
    it("should map", () => {
        var newPoco = mapper.map("DTP=>POCO", dto);
        expect(newPoco.a).toBe(poco.a);
        expect(newPoco.b).toBe(poco.b);
        expect(newPoco.c).toEqual(poco.c);
        var newDto = mapper.map("POCO=>DTO", newPoco);
        expect(newDto.a).toEqual(dto.a);
        expect(newDto.b).toEqual(dto.b);
        expect(newDto.c).toEqual(dto.c);
    });
});
//# sourceMappingURL=mapper.spec.js.map