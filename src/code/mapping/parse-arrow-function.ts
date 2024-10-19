export function getPropertyName<T>(f:(item:T)=>any){
    return f.toString().match("([a-zA-Z]+)$")![0];
}
/**
 * Cette fonction génère un objet accessor avec un setter et un getter
 * @param f Arrowfunction giving the property
 * @returns the accessors
 */
export function parseArrowFunction<T,U>(f:(item:T)=>U){
    var fString=f.toString();
    var newParameterName="v";
    var fleche=fString.indexOf("=>")
    var parameterName=fString.substring(0,fleche).trim();
    var expression=fString.substring(fleche+2);
    var reg=new RegExp(parameterName+'([\\.\\[])','g');
    var expressionCleaned=expression.replace(reg,newParameterName+'$1');
    var getterString=expressionCleaned;
    var setterString=expressionCleaned+"=value";
    var getter=eval("("+newParameterName+")=>"+getterString)
    var setter=eval("("+newParameterName+",value)=>"+setterString);
    var resultat={
        getterString,
        setterString,
        get: getter,
        set:setter
    };
    return resultat;
}