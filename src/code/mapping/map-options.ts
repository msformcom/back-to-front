import { ArrowFunctionInfo, parseArrowFunction } from "./parse-arrow-function";

export class MapOptions<TTarget,TPropertySource>{
    constructor(public targetInfo: ArrowFunctionInfo){};
    sourceInfo!:ArrowFunctionInfo;
    mapFrom(sourceProperty:(source:TTarget)=>TPropertySource){
        this.sourceInfo=parseArrowFunction(sourceProperty);
        return this as any as Omit<typeof this,"mapFrom">;
    }

    reverse(){
        var r= new MapOptions(this.sourceInfo);
        r.sourceInfo=this.targetInfo;
        return r;
    }



    //private then(transform:)
}