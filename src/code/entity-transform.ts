import { getPropertyName } from './mapping/parse-arrow-function';
import { ManagedService } from './managed-service';

export class EntityTransform<TSource, TTarget> {
  transforms: ((source: TSource, target: TTarget) => void)[] = [];
  constructor(private service:ManagedService,private targetctor?: { new (): TTarget }) {}

  addTransform(f: (source: TSource, target: TTarget) => void) {
    this.transforms.push(f);
  }
  mapAll() {
    this.addTransform((s, t) => {
      for (let p in s) {
        (t as any)[p] = s[p];
      }
    });
    return this;
  }
  asDate(
    sourceproperty: (o: TSource) => number | string | Date,
    targetProperty: (o: TTarget) => Date
  ) {
    this.addTransform((s, t) => {
      var p = getPropertyName(targetProperty);
      (t as any)[p] = new Date(sourceproperty(s));
    });
    return this;
  }

  addNavigationProperty<TProperty>(
    p: (o: TTarget) => TProperty,
    f: (source: TSource, target: TTarget) => TProperty
  ) {
    let name = getPropertyName(p);
    // let getter=()=>{

    //   return self.lots.getMany<ListItem,ListItem>({url:l.id+"/Reservations" });
    // }
    this.addTransform((s, t) => {
      Object.defineProperty(t, name, {
        get: () => f(s, t),
      });
    });
    return this;
  }

  get() {
    return (source: TSource) => {
      var target = this.targetctor ? new this.targetctor() : ({} as TTarget);
      for (let f of this.transforms) {
        f(source, target);
      }
      return target;
    };
  }
}
