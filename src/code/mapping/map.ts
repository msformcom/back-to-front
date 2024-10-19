import { MapOptions } from "./map-options";
import { Mapper } from "./mapper";
import { ArrowFunctionInfo, parseArrowFunction } from "./parse-arrow-function";

export class Map<TTarget,TSource>{

    public constructor(public mapper:Mapper,public name:string) {
      
    }

    mappings :MapOptions<any,any>[]=[];
    ctorTarget:{new(...args:any[]):TTarget}=Object as any;
    ctorSource:{new(...args:any[]):TSource}=Object as any;
    forMember<TPropertyTarget>(propertyTarget:(item:TTarget)=>TPropertyTarget,optionsBuilder:(options:MapOptions<TSource,TPropertyTarget>)=>void){
        var propertyTargetInfo=parseArrowFunction(propertyTarget);
        var options=new MapOptions(propertyTargetInfo);
        optionsBuilder(options as any);
        var existingMapping=this.mappings.find(c=>c.targetInfo)
        this.mappings.push(options);
        return this
    }
    reverse(){
        var name=this.name.split("|").reverse().join("|");
        var r=new Map(this.mapper,name);
        r.ctorTarget=this.ctorSource;
        r.ctorSource=this.ctorTarget;
        r.mappings=this.mappings.map(m=>m.reverse()).filter(c=>c.targetInfo.set);

        this.mapper.maps[name]=r;
        return r as  Map<TSource,TTarget>

    }



    map(obj:TSource){
        let o=new this.ctorTarget();

        for(let m of this.mappings){
            if(m.targetInfo.set){
                let value=m.sourceInfo.get(obj);
                m.targetInfo.set(o,value);                
            }

        }
        return o;
    }
}