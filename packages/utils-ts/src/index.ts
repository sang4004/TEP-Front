export * from "./network";
export * from "./constants";
export * from "./converter";
export * from "./jwtdecode";

export const sliceText = (text : string, leng : number, isDot : boolean)=>{
    return text.length > leng ? 
                isDot ? 
                    text.slice(0, leng) + "..." 
                    : text.slice(0,leng) 
                : text; 
}