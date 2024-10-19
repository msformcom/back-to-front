import { ArrowFunctionInfo, parseArrowFunction } from "./parse-arrow-function";
import { Transformation } from "./transformation";

export class MapOptions<TTarget,TTargetProperty, TSource,TSourceProperty>{
    constructor(public targetInfo: ArrowFunctionInfo<TTarget,TTargetProperty>){};
    sourceInfo!:ArrowFunctionInfo<TSource,TSourceProperty>;
    transform?:Transformation<TSourceProperty,TTargetProperty>;
    mapFrom<TSourceProperty>(sourceProperty:(source:TSource)=>TSourceProperty){
        this.sourceInfo=parseArrowFunction(sourceProperty) as any;
        return this as any as MapOptions<TTarget,TTargetProperty,TSource,TSourceProperty>;
    }

    clone(){
        var r=new MapOptions<TTarget,TTargetProperty, TSource,TSourceProperty>(this.targetInfo);
        r.sourceInfo=this.sourceInfo;
        r.transform=this.transform;

    }
    reverse(){
        var r= new MapOptions< TSource,TSourceProperty,TTarget,TTargetProperty>(this.sourceInfo);
        r.sourceInfo=this.targetInfo;
        if(this.transform){
              r.transform=new Transformation(this.transform.back,this.transform.targetFromSource);
        }
        
        return r;
    }


    useTransform(transform:Transformation<TSourceProperty,TTargetProperty>){
        //if(!this.transform){
            this.transform=transform;
        // }
        // else{
        //     this.transform={
        //         targetToSource:(v:any)=>transform.targetToSource(this.transform?.targetToSource(v)),
        //         back:(v:any)=>this.transform?.back(transform.back(v))
        //     }
        // }
        return this;
    }




    //private then(transform:)
}