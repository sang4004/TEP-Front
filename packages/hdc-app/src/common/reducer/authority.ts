import { AnyAction } from "redux";
import {
    GET_DOCU_AUTHORITY,
    GET_AUTH_LIST,
    DELETE_AUTH,
    EDIT_AUTH,
} from "../action";

export type authorityState = {
    docu_authority: any[];
    auth_list: any;
    edit_auth: any;
    delete_auth: any;
};

const initialState: authorityState = {
    docu_authority: [],
    auth_list: null,
    edit_auth: null,
    delete_auth: null,
};

export const authority = (state: authorityState = initialState, { type, payload }: AnyAction) => {
    switch (type) {
        case GET_DOCU_AUTHORITY:
            return {
                ...state,
                docu_authority: payload.data,
            };
        case GET_AUTH_LIST:
            return {
                ...state,
                auth_list: payload.data,
                edit_auth: undefined,
                delete_auth: undefined,
            };
        case EDIT_AUTH:
            return {
                ...state,
                edit_auth: payload.data,
            };
        case DELETE_AUTH:
            return {
                ...state,
                delete_auth: payload.data,
            };
        default:
            return state;
    }
};
