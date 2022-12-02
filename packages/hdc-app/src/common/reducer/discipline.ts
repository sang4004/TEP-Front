import { AnyAction } from "redux";
import {
    GET_DISCIPLINE_LIST,
    CREATE_DISCIPLINE,
    EDIT_DISCIPLINE,
    DELETE_DISCIPLINE,
    DEACTIVE_DISCIPLINE_MODAL
} from "../action";

export type edmsDisciplineState = {
    edms_discipline_list: any[];
    create_discipline_data?: any;
    edit_discipline_data?: any;
    delete_discipline_data?: boolean;
};

const initialState: edmsDisciplineState = {
    edms_discipline_list: [],
    create_discipline_data: undefined,
    edit_discipline_data: undefined,
    delete_discipline_data: false,
};

export const discipline = (state: edmsDisciplineState = initialState, { type, payload }: AnyAction) => {
    switch (type) {
        case DEACTIVE_DISCIPLINE_MODAL:
            return {
                ...state,
                create_discipline_data : undefined
            }
        case GET_DISCIPLINE_LIST:
            return {
                ...state,
                edms_discipline_list: payload.data,
            };
        case CREATE_DISCIPLINE:
            return {
                ...state,
                create_discipline_data: payload.data,
            };
        case EDIT_DISCIPLINE:
            return {
                ...state,
                edit_discipline_data: payload.data,
            };
        case DELETE_DISCIPLINE:
            return {
                ...state,
                delete_discipline_data: payload.data,
            };
        default:
            return state;
    }
};
