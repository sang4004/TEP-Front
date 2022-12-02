import { AnyAction } from "redux";
import { GET_MODEL_FILE_LIST, GET_MODEL_ELEMENT_LIST, UPLOAD_MODEL_FILE } from "../action";

export type modelFileState = {
    model_file_list: any[];
    imodel_elements: any[];
    upload_model_file_data?: any[];
};

const initialState: modelFileState = {
    model_file_list: [],
    imodel_elements: [],
    upload_model_file_data: undefined,
};

export const modelfile = (state: modelFileState = initialState, { type, payload }: AnyAction) => {
    switch (type) {
        case GET_MODEL_FILE_LIST + "_LOADING":
            return {
                ...state,
                upload_model_file_data: undefined,
                model_file_list: [],
            };
        case GET_MODEL_FILE_LIST:
            return {
                ...state,
                model_file_list: payload.data,
            };
        case GET_MODEL_ELEMENT_LIST:
            return {
                ...state,
                imodel_elements: payload.data.elements,
            };
        case UPLOAD_MODEL_FILE:
            return {
                ...state,
                upload_model_file_data: payload.data,
            };
        default:
            return state;
    }
};
