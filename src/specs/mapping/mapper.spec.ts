import "jasmine";
import { Mapper } from "../../code/mapping/mapper";
import { POCOInterface } from "./poco.interface";
import { DTOInterface } from "./dto.interface";
import { Mapping } from "../../code/mapping/mapping";

describe("mapperTest",()=>{
    var mapper:Mapper;
    var poco:POCOInterface;
    var dto:DTOInterface;


    beforeAll(()=>{
        poco={ a:34, b:"toto", c:new Date(1968,8,11),d:[{ a:34, b:"toto"}],e:{ a:34, b:"toto",c:new Date()}};
        dto={ a:34, b:"toto", c:new Date(1968,8,11).toDateString(),d:[{ a:34, b:"toto"}],e:'{ a:34, b:"toto"}'}
        mapper=new Mapper();

        mapper.createMap<DTOInterface, POCOInterface>("DTO=>POCO")
            .forMember(c=>c.a,o=> o.mapFrom(s=>s.a))
            .forMember(c=>c.b,o=> o.mapFrom(s=>s.b))
            .forMember(c=>c.c,o=> o.mapFrom(s=>s.c).useTransform(Mapper.DateTransform))
            .forMember(c=>c.e,o=> o.mapFrom(s=>s.e).useTransform(Mapper
                                                                    .JSONTransform<DTOInterface>()
                                                                    .pipe(mapper.maps["DTO=>POCO"] as Mapping<DTOInterface |undefined,POCOInterface|undefined>)));
    });
    it("should map",()=>{
        var newPoco=mapper.map<POCOInterface>("DTP=>POCO",dto);

        expect(newPoco.a).toBe(poco.a);
        expect(newPoco.b).toBe(poco.b);
        expect(newPoco.c).toEqual(poco.c);

        var newDto=mapper.map<DTOInterface>("POCO=>DTO",newPoco);
        expect(newDto.a).toEqual(dto.a);
        expect(newDto.b).toEqual(dto.b);
        expect(newDto.c).toEqual(dto.c);
    });
})