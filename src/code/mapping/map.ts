import { MapOptions } from "./map-options";
import { ArrowFunctionInfo, parseArrowFunction } from "./parse-arrow-function";

export class Map<TSource,TTarget>{
    mappings :MapOptions<any,any>[]=[];
    ctorSource:{new(...args:any[]):TSource}=Object as any;
    ctorTarget:{new(...args:any[]):TTarget}=Object as any;
    forMember<TPropertyTarget>(f:(item:TSource)=>TPropertyTarget,optionsBuilder:(options:MapOptions<TTarget,TPropertyTarget>)=>void){

        var options=new MapOptions(parseArrowFunction(f));
        optionsBuilder(options as any);
        this.mappings.push(options);
        return this
    }
    reverse(){
        var r=new Map();
        r.ctorSource=this.ctorTarget;
        r.ctorTarget=this.ctorSource;
        r.mappings=this.mappings.map(m=>m.reverse());

    }



    map(obj:TTarget){
        let o=new this.ctorSource();

        for(let m of this.mappings){
            if(m.sourceInfo.set){
                let value=m.targetInfo.get(obj);
                m.sourceInfo.set(o,value);                
            }

        }
        return o;
    }
}