
import {  Signal } from '@angular/core';

import { CollectionOptions } from './collection-options';
import { ManagedService } from './managed-service';
import { RequestOptions } from './request-options';
import { CacheEntry } from './cache-entry';









export class ManagedCollection<
  TExtensions extends { [key: string]: (...args: any[]) => any }
> {
  constructor(private options: CollectionOptions, public service: ManagedService) {

    if(!options.url){
      options.url="";
    }
    this.cache=  this.options.cache ?? {}

  }

  cache: { [url: string]: CacheEntry<any> };
  addFunctions<T extends { [key: string]: (...args: any[]) => any }>(
    functions: (c: ManagedCollection<TExtensions>) => T
  ) {
    var added = functions(this);
    for (let p in added) {
      (this as any)[p] = added[p];
    }
    return this as any as ManagedCollection<TExtensions & T> & T;
  }

  getOne<TDTO, TPOCO>(options?: RequestOptions<TDTO, TPOCO>) {
    if(!options){
      options  ={url:""};
    }
    if(!options.url){
      options.url="";
    }
    if(options.keep==undefined){
      options.keep=true;
    }
    let finalUrl = this.options.url;
    if (options.url) {
      if (options.url[0] == '/') {
        finalUrl = options.url;
      } else {
        finalUrl += options.url;
      }
    }
    if (this.cache[finalUrl!] && !options.latest) {
      return this.cache[finalUrl!].value as Signal<TPOCO | undefined | null>;
    }


    let result= this.service.getOne({
      url:finalUrl,
      transform:options.transform
    });

     this.cache[finalUrl!]={timeStamp:Date.now(),
                              value:result,
                              keep:options.keep
                            };

    

    return result;
  }

  getMany<TDTO,TPOCO>(options?: RequestOptions<TDTO,TPOCO>) {
    if(!options){
      options={}
    }
    let o2: RequestOptions<TDTO[],TPOCO[]> = {
      ...options,
      ...{ transform: options.transform ? (c:TDTO[])=>c.map(options.transform!) :undefined } as any,
    };
    return this.getOne(o2);
  }
}

