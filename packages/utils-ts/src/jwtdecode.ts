import jwt_decode from "jwt-decode";

export const jwtdecode = ( jwtoken : string) : object => {
    let _obj = {token : jwtoken};
    let decoded = jwt_decode( jwtoken );
    if(decoded){
        Object.assign(_obj, decoded);
    }
    return _obj;
}