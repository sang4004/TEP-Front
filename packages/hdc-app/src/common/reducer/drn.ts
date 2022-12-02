import { AnyAction } from "redux";
import {
    CREATE_DRN_COMMENT,
    CREATE_DRN_REPLY,
    GET_DRN_COMMENT_LIST,
    UPDATE_DRN_APPROVAL,
    CREATE_TM_DRN,
    
} from "../action";

export type edmsDrnState = {
    create_drn_comment?: any;
    create_drn_reply?: any;
    drn_comment_list: any[];
    update_drn_appvoval?: any[];
    create_tm_drn_data?: any;
};

const initialState: edmsDrnState = {
    create_drn_comment: undefined,
    create_drn_reply: undefined,
    drn_comment_list: [],
    update_drn_appvoval: undefined,
    create_tm_drn_data: undefined,
};

export const drn = (state: edmsDrnState = initialState, { type, payload }: AnyAction) => {
    switch (type) {
        case type + "_LOADING":
            return {
                ...state,
                create_drn_reply: false,
            };
        case CREATE_DRN_COMMENT:
            return {
                ...state,
                create_drn_comment: payload.data,
            };
        case CREATE_DRN_REPLY:
            return {
                ...state,
                create_drn_reply: payload.data,
            };
        case GET_DRN_COMMENT_LIST:
            return {
                ...state,
                drn_comment_list: payload.data,
                create_drn_comment: undefined,
                update_drn_appvoval: undefined,
            };
        case UPDATE_DRN_APPROVAL:
            return {
                ...state,
                update_drn_appvoval: payload.data,
            };
        case CREATE_TM_DRN:
            return {
                ...state,
                create_tm_drn_data: payload.data,
            };
        default:
            return state;
    }
};
