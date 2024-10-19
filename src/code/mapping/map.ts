import { MapOptions } from "./map-options";

export class Map<TSource,TTarget>{
    forMember<TPropertyTarget>(f:(item:TSource)=>TPropertyTarget,options:(options:MapOptions<TTarget,TPropertyTarget>)=>void){
        return this
    }
}