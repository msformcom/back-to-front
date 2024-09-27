import { Observable } from "rxjs";
import { CacheEntry } from "./cache-entry";
import { ManagedService } from "./managed-service";

export interface CollectionOptions {
    url?: string;
    cacheCleanUp?:Observable<any>;
    cache?:{[url:string]:CacheEntry<any>},
    service?:ManagedService
  }