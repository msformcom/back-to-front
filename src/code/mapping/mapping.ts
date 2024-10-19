import { MapOptions } from "./map-options";
import { Mapper } from "./mapper";
import { ArrowFunctionInfo, parseArrowFunction } from "./parse-arrow-function";
import { Transformation, TransformationBase } from "./transformation";


/**
 * Mapping :
 * à partir du TSource
 * vers le TTarget
 */
export class Mapping<TSource,TTarget> implements TransformationBase<TSource,TTarget>{

    public constructor(public mapper:Mapper,public name:string) {
      
    }

    mappings :MapOptions<any,any,any,any>[]=[];
    ctorTarget:{new(...args:any[]):TTarget}=Object as any;
    ctorSource:{new(...args:any[]):TSource}=Object as any;
    forMember<TPropertySource,TPropertyTarget>(propertyTarget:(item:TTarget)=>TPropertyTarget,optionsBuilder:(options:MapOptions<TTarget,TPropertyTarget,TSource,any>)=>MapOptions<TTarget,TPropertyTarget,TSource,TPropertySource>){
        var propertyTargetInfo=parseArrowFunction(propertyTarget);
        var options=new MapOptions(propertyTargetInfo);
        optionsBuilder(options as any);
        var existingMapping=this.mappings.find(c=>c.targetInfo)
        this.mappings.push(options);
        return this
    }
    reverse():Mapping<TTarget,TSource>{
        var name=this.name.split("|").reverse().join("|");
        if(this.mapper.maps[name]){
            return this.mapper.maps[name];
        }
        var r=new Mapping(this.mapper,name);
        r.ctorTarget=this.ctorSource;
        r.ctorSource=this.ctorTarget;
        r.mappings=this.mappings.map(m=>m.reverse()).filter(c=>c.targetInfo.set);
        
        this.mapper.maps[name]=r;
        return r as  Mapping<TTarget,TSource>

    }



    back(obj:TTarget){
        return this.reverse().targetFromSource(obj);
    }

    targetFromSource(obj:TSource){
        let o=new this.ctorTarget();

        for(let m of this.mappings){
            if(m.targetInfo.set){
                // Valeur de la propriété sur la source
                let value=m.sourceInfo.get(obj);
                if(m.transform){
                    // Transformation de la propriété
                    value=m.transform.targetFromSource(value);
                }
                m.targetInfo.set(o,value);                
            }

        }
        return o;
    }
}