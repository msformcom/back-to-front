export function getPropertyName<T>(f:(item:T)=>any){
    return f.toString().match("([a-zA-Z]+)$")![0];
}