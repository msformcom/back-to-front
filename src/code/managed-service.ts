import { signal } from "@angular/core";

import { lastValueFrom } from "rxjs";
import { CollectionOptions } from "./collection-options";
import { ManagedCollection } from "./managed-collection";
import { ServiceOptions } from "./service-options";
import { RequestOptions } from "./request-options";
import { getPropertyName } from "./mapping/parse-arrow-function";
import { EntityTransform } from "./entity-transform";

export class ManagedService {
    constructor(public options: ServiceOptions) {}
    
    getOne<TDTO,TPOCO>(options: RequestOptions<TDTO, TPOCO>) {
      let finalUrl = this.options.baseUrl;
      if (options.url) {
        if (options.url[0] == '/') {
          finalUrl = options.url;
        } else {
          finalUrl += options.url;
        }
      }
      let transform = options.transform ? options.transform : (c: any) => c;
  
      console.log('Executing : ' + finalUrl);
      var sr = signal<TPOCO | undefined | null>(undefined);
  
      lastValueFrom(this.options.httpClient.get<TDTO>(finalUrl)).then((r) => {
        let newValue = transform(r);
        sr.set(newValue);
      });
      return sr;
    }
  
    getMany<TDTO,TPOCO>(options: RequestOptions<TDTO,TPOCO>) {
      let o2: RequestOptions<TDTO[],TPOCO[]> = {
        ...options,
        ...{ transform: options.transform ? (c:TDTO[]) => c.map(options.transform !):undefined } as any,
      };
      return this.getOne(o2);
    }
    addNavigationProperty<T>(o : T, p:(o:T)=>any,f:any){
      let name=getPropertyName(p);
      // let getter=()=>{
  
      //   return self.lots.getMany<ListItem,ListItem>({url:l.id+"/Reservations" });
      // }
  
      Object.defineProperty(o,name,{
        get: f
      })
    }
    addCollection(options: CollectionOptions) {



      return new ManagedCollection(options,this);;
    }

    transform<TSource,TTarget>(targetctor?:{ new (): TTarget }){
        return new EntityTransform<TSource,TTarget>(this,targetctor);
    }


  }