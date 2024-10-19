export interface POCOInterface    { 
    a:number, 
    b:string, 
    c:Date,
    d?:[{ a:number,  b:string, c?:Date}],
    e?:POCOInterface

}
