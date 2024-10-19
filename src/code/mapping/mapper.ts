import { Mapping } from "./mapping";
import { Transformation } from "./transformation";
export class Mapper {
  maps: { [key: string]: Mapping<any, any> } = {};

  createMap<TTarget, TSource>(name: string) {
    if (name.indexOf("=>") == -1) {
      throw new Error("Map name must contain =>");
    }
    var newMap = new Mapping<TTarget, TSource>(this, name);
    this.maps[name] = newMap;
    return newMap;
  }
  createTypedMap<TTarget, TSource>(
    ctorSource: { new (...args: any[]): TTarget },
    ctorTarget: { new (...args: any[]): TSource }
  ) {
    var newMap = this.createMap<TTarget, TSource>(
      ctorSource.name + "|" + ctorTarget.name
    );
  }
  map<TTarget>(mapName: string, source: any): TTarget;
  map<TTarget, TSource>(target: TTarget, source: TSource): TTarget;
  map<TTarget, TSource>(
    ctorTarget: { new (...arg: any[]): TTarget },
    source: TSource
  ): TTarget;

  map(name: any, obj: any) {
    let mapping: string;
    if (typeof name == "string") {
      mapping = name;
    } else if (name.call) {
      mapping = name.name + "|" + obj.constructor.name;
    } else {
      mapping = name.constructor.name + "|" + obj.constructor.name;
    }
    var map = this.maps[mapping];
    return map.targetFromSource(obj);
  }

  static DateTransform = new Transformation<string, Date>(
    (v) => new Date(v),
    (v) => v.toDateString()
  );
  static JSONTransform<TObject>() {
    var r= new Transformation<string |undefined, TObject|undefined>(
      (v) => v? JSON.parse(v) as any as TObject : undefined,
      (v) => v? JSON.stringify(v) : undefined
    );
    return r;
  }

}
