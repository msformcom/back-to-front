export interface CacheEntry<T>{
    timeStamp:number;
    value:any;
    keep? : ((item:T)=> boolean) | boolean
}