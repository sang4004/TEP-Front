import constants from "./constants.json";

export const getConstants = ( key : string ) : any=>{
    const idx = Object.keys(constants).indexOf(key);
    if(idx != -1){
        return Object.values(constants)[idx];
    }
    return "";
}