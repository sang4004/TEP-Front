import { FetchApiPost, FetchApiGet } from "utils_ts/lib";
import actions from "./creator";

export const HANDSHAKE = "HANDSHAKE";
export const Handshake = actions(HANDSHAKE, async()=>{
    return await FetchApiPost("/api/v1/auth/handshake");
});

export const SIGN_UP = "SIGN_UP";
export const SignUp = actions(SIGN_UP, async( name : string, pw : string )=>{
    return await FetchApiPost("/api/v1/auth/signup", { name, pw });
});

export const LOGIN = "LOGIN";
export const Login = actions(LOGIN, async( username : string, pw : string )=>{
    return await FetchApiPost("/rest/v1/auth/login", { tenantCode : "primes" ,username, password : pw });
});

export const LOGOUT = "LOGOUT";
export const Logout = actions(LOGOUT, async()=>{
    // return await FetchApiPost("/api/v1/auth/logout");
    return { success : true, data : {}}
});

export const SIMPLE_LOGIN = "SIMPLE_LOGIN";
export const SimpleLogin = actions(SIMPLE_LOGIN, async( username : string, pw : string )=>{
    return await FetchApiPost("/rest/v1/auth/login", { tenantCode : "primes", username, password : pw });
});