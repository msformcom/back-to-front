import "jasmine";
import { Mapper } from "../../code/mapping/mapper";
import { Type1 } from "./type1";
import { Type2 } from "./type2";

describe("mapperTest",()=>{
    var mapper:Mapper;
    var obj1:Type1;

    beforeAll(()=>{
        obj1={ a:34, b:"toto", c:new Date(1968,8,11),d:[{ a:34, b:"toto"}]};
        mapper=new Mapper();

        mapper.createMap<Type1,Type2>("Type1|Type2")
            .forMember(c=>c.a,o=>{ o.mapFrom(s=>s.a)})
            .forMember(c=>c.b,o=>{ o.mapFrom(s=>s.b)})
            .forMember(c=>c.c,o=>{ o.mapFrom(s=>new Date(s.c))});
    })
    it("should map",()=>{
        var r=mapper.map("Type1|Type2",obj1);

        expect(r.a).toBe(obj1.a);
        expect(r.b).toBe(obj1.b);
        expect(r.c).toBe(new Date(obj1.c));
    });
})