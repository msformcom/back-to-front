import "jasmine"
import { parseArrowFunction } from "../../code/mapping/parse-arrow-function";

describe("getAccessorsTest",()=>{
    it("should set",()=>{
        var obj={ a:34, b:"toto", c:[{ a:34, b:"toto"}]};
        var accessor=parseArrowFunction<typeof obj,number>(u=>u.c[0].a);
        var v= accessor.get(obj);
        expect(v).toBe(34)
        accessor.set(obj,35);
        v= accessor.get(obj);
        expect(v).toBe(35)
    });
})
