export interface ArrowFunctionInfo<TParam,TResult> {
  getterString: string;
  setterString: string;
  get: (v: TParam) => TResult;
  set: (v: TParam , value: TResult) => void;
  propertyName?: string;
}
/**
 * Cette fonction génère un objet accessor avec un setter et un getter
 * @param f Arrowfunction giving the property
 * @returns the accessors
 */
export function parseArrowFunction<TParam, TResult>(f: (item: TParam) => TResult) {
  var fString = f.toString();
  var newParameterName = "v";
  var fleche = fString.indexOf("=>");
  var parameterName = fString.substring(0, fleche).trim();
  var expression = fString.substring(fleche + 2);
  var reg = new RegExp(parameterName + "([\\.\\[])", "g");
  var expressionCleaned = expression.replace(reg, newParameterName + "$1");
  var getterString = expressionCleaned;
  var setterString = expressionCleaned + "=value";
  var getter = eval("(" + newParameterName + ")=>" + getterString);
  var setter: any;
  let propertyName: string | undefined;
  try {
    let p=f.toString().match("([$a-zA-Z][$a-zA-Z0-9]*)$");
    if(p){
        propertyName = p[0];
    } else{
        p=f.toString().match("(\\[[$a-zA-Z][$a-zA-Z0-9]*\\])$");
        if(p){
            propertyName = p[0];
        } 
    }
    if(propertyName){
        setter = eval("(" + newParameterName + ",value)=>" + setterString);
    }


  } catch (error) {}


  var resultat: ArrowFunctionInfo<TParam,TResult> = {
    getterString,
    setterString,
    get: getter,
    set: setter,
    propertyName,
  };
  return resultat;
}
