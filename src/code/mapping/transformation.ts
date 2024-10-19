export interface TransformationBase<TSource, TTarget>{
   targetFromSource: (v: TSource) => TTarget,
   back: (v: TTarget) => TSource

}
export class Transformation<TSource, TTarget> {
  constructor(
    public targetFromSource: (v: TSource) => TTarget,
    public back: (v: TTarget) => TSource
  ) {}
  pipe<TNewTarget>(transform:TransformationBase<TTarget,TNewTarget>){
    let t=new Transformation<TSource,TNewTarget>(
        v=>transform.targetFromSource(this.targetFromSource(v)),
        v=>this.back(transform.back(v))
    );
    return t;
  }
}
