import "jasmine";
import { Mapper } from "../../code/mapping/mapper";
import { Type1 } from "./type1";
import { Type2 } from "./type2";

describe("mapperTest",()=>{
    var mapper:Mapper;
    var obj1:Type1={ a:34, b:"toto", c:new Date(1968,8,11),d:[{ a:34, b:"toto"}]};

    beforeAll(()=>{
        mapper=new Mapper();
        mapper.createMap<Type1,Type2>("Type1|Type2")
            .forMember(c=>c.a,o=>{ o.mapFrom(s=>s.a)})
            .forMember(c=>c.b,o=>{ o.mapFrom(s=>s.b)})
    })
    it("should create",()=>{



    });
})