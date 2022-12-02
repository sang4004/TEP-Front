import { AnyAction } from "redux";
import {
    GET_ADDRESSBOOK,
    EDIT_GROUP,
    GET_EDMS_ADDRESSBOOK,
    GET_EDMS_GROUP,
    GET_EDMS_MAIL_ADDRESS,
} from "../action";

export type orgState = {
    addressbook: [];
    edms_address: [];
    group_list: [];
    company_list: [];
    edms_group: [];
    edms_mail_address: [];
};

const initialState: orgState = {
    addressbook: [],
    edms_address: [],
    group_list: [],
    company_list: [],
    edms_group: [],
    edms_mail_address: [],
};

export const organization = (state: orgState = initialState, { type, payload }: AnyAction) => {
    switch (type) {
        case GET_ADDRESSBOOK:
            return {
                ...state,
                addressbook: payload.data.addressbook,
                group_list: payload.data.group,
                company_list: payload.data.company,
            };
        case EDIT_GROUP:
            return {
                ...state,
            };
        case GET_EDMS_ADDRESSBOOK:
            return {
                ...state,
                edms_address: payload.data,
            };
        case GET_EDMS_GROUP:
            return {
                ...state,
                edms_group: payload.data,
            };
        case GET_EDMS_MAIL_ADDRESS:
            return {
                ...state,
                edms_mail_address: payload.data,
            };
        default:
            return state;
    }
};
