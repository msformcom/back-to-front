
import { Map } from "./map";
export class Mapper{
    maps:{[key:string]:Map<any,any>}={};
    createMap<TSource,TTarget>(name:string){
        if(name.indexOf("|")==-1){
            throw new Error("Map name must contain |");
        }
        var newMap= new Map<TSource,TTarget>(this,name);
        this.maps[name]=newMap;
        return newMap;
    }
    createTypedMap<TSource,TTarget>(ctorSource:{new(...args:any[]):TSource},ctorTarget:{new(...args:any[]):TTarget}){
        var newMap= this.createMap<TSource,TTarget>(ctorSource.name+'|'+ctorTarget.name)
    }
    map(name:string,obj:any){
        var map=this.maps[name];
        return map.map(obj);

    }
}
