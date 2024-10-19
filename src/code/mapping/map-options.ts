import { ArrowFunctionInfo, parseArrowFunction } from "./parse-arrow-function";

export class MapOptions<TSource,TPropertyTarget>{
    constructor(public sourceInfo: ArrowFunctionInfo){};
    targetInfo!:ArrowFunctionInfo;
    mapFrom(targetProperty:(source:TSource)=>TPropertyTarget){
        this.targetInfo=parseArrowFunction(targetProperty);
        return this as any as Omit<typeof this,"mapFrom">;
    }

    reverse(){
        var r= new MapOptions(this.targetInfo);
        r.targetInfo=this.sourceInfo;
        return r;
    }



    //private then(transform:)
}