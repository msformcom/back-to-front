
import { Map } from "./map";
export class Mapper{
    
    createMap<TSource,TTarget>(name:string){
        if(name.indexOf("|")>-1){
            throw new Error("Map name cannot contains |");
        }
        return new Map<TSource,TTarget>();
    }
    createTypedMap<TSource,TTarget>(ctorSource:{new(...args:any[]):TSource},ctorTarget:{new(...args:any[]):TTarget}){
        return this.createMap<TSource,TTarget>(ctorSource.name+'|'+ctorTarget.name)
    }
}
