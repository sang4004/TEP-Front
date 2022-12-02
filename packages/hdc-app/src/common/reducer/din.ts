import { AnyAction } from "redux";
import {
    UPLOAD_DIN_ATTACH_FILES,
    GET_DIN_ATTACH_FILES,
    DELETE_DIN_ATTACH_FILE
} from "../action";

export type edmsDinState = {
    uploaded_attach_files ?: string[];
    get_din_attach_files ?: any[]
};

const initialState: edmsDinState = {
    uploaded_attach_files: undefined,
    get_din_attach_files: undefined,
};

export const din = (state: edmsDinState = initialState, { type, payload }: AnyAction) => {
    switch (type) {
        case GET_DIN_ATTACH_FILES :
            return {
                ...state,
                get_din_attach_files : payload.data
            }
        case UPLOAD_DIN_ATTACH_FILES:
            return {
                ...state,
                uploaded_attach_files: payload.data
            }
        case DELETE_DIN_ATTACH_FILE:
            return {
                ...state,
            }
        default:
            return state;
    }
};
