import { AnyAction } from "redux";
import { jwtdecode } from "utils_ts/lib";
import {
    ActionType,
    SIGN_UP,
    LOGIN,
    HANDSHAKE,
    LOGOUT,
    SIMPLE_LOGIN
} from '../action';

export type userState = {
    token ?: string;
    id : number | null;
    username ?: string;
    name ?: string;
    handshaking : boolean;
    email : string;
    profile_img : string;
    admin_level : number;
    user_list : object[];
    user_ids : number[];
    login_fail_reason ?: string;
}

const initialState : userState = {
    token : "",
    id : null,
    username : "",
    name : "",
    handshaking : false,
    email : "",
    profile_img : "",
    admin_level : -1,
    user_list : [],
    user_ids : [],
    login_fail_reason : ""
}

export const user = (state:userState=initialState, {type, payload} : AnyAction)=>{
    switch(type){
        case HANDSHAKE :
            return {
                ...state,
                id : payload.id,
                username : payload.username,
                email : payload.email,
                profile_img : payload.profile_img,
                admin_level : payload.admin_level,
                handshaking : false,
            }
        case HANDSHAKE + "_LOADING" :
            return {
                ...state,
                handshaking : true
            }
        case HANDSHAKE + "_ERROR" : 
            return {
                ...state,
                handshaking : false,
                id : null,
                username : "",
                admin_level : -1,
                email : "",
                profile_img : "",
            }
        case SIGN_UP : 
            return {
                ...state,
                id : payload.id,
                username : payload.username
            }
        case LOGIN + "_LOADING" : 
            return {
                ...state,
                login_fail_reason : ""
            }
        case LOGIN + "_ERROR":
            return {
                ...state,
                login_fail_reason : payload.msg
            }
        case SIMPLE_LOGIN :
        case LOGIN : 
            if(payload.data == undefined) return { ...state };
            let _user_ids = state.user_ids;
            let _user_list = state.user_list;
            let username = payload.username;
            
            payload = jwtdecode(payload.data.accessToken);
            if(state.user_ids?.indexOf(payload.data.user.id) == -1){
                _user_ids.push(payload.data.user.id);
                _user_list.push({
                    id : payload.data.user.id,
                    username : username,
                    name : payload.data.user.name,
                    email : "",
                    profile_img : "",
                    admin_level : "",
                    token : payload.token
                });
            }

            return {
                ...state,
                token : payload.token,
                id : payload.data.user.id,
                username : username,
                name : payload.data.user.name,
                email : "",
                profile_img : "",
                admin_level : -1,
                user_ids : [..._user_ids],
                user_list : [..._user_list]
            }
        case LOGOUT:
            return {
                ...state,
                id : null,
                username : null
            }
        default : 
            return state;
    }
}