"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseArrowFunction = parseArrowFunction;
/**
 * Cette fonction génère un objet accessor avec un setter et un getter
 * @param f Arrowfunction giving the property
 * @returns the accessors
 */
function parseArrowFunction(f) {
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
    var setter;
    let propertyName;
    try {
        let p = f.toString().match("([$a-zA-Z][$a-zA-Z0-9]*)$");
        if (p) {
            propertyName = p[0];
        }
        else {
            p = f.toString().match("(\\[[$a-zA-Z][$a-zA-Z0-9]*\\])$");
            if (p) {
                propertyName = p[0];
            }
        }
        if (propertyName) {
            setter = eval("(" + newParameterName + ",value)=>" + setterString);
        }
    }
    catch (error) { }
    var resultat = {
        getterString,
        setterString,
        get: getter,
        set: setter,
        propertyName,
    };
    return resultat;
}
//# sourceMappingURL=parse-arrow-function.js.map