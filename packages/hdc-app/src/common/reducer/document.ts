import { AnyAction } from "redux";
import {
    GET_EDMS_DOCU_MASTER_LIST,
    CREATE_DOCUMENT,
    GET_DOCUMENT_LIST,
    GET_DOCUMENT_DETAIL,
    // GET_FILE_BY_DOCUMENT,
    EDIT_DOCUMENT,
    DELETE_DOCUMENT,
    GET_DOCUMENT_MANAGER,
    GET_MAIN_MIDDLE,
    GET_MAIN_BOTTOM,
    GET_STAGE_CODES,
    GET_EXCEL_FILE_UPLOAD_FORM,
    GET_DOCU_COMPARISON,
    GET_DOCU_STAGE_DATA,
    GET_STAGE_TYPE,
} from "../action";

export type edmsDocumentState = {
    edms_doc_master_list: any[];
    create_document_data?: any;
    edit_document_data?: any;
    delete_document_data?: any;
    document_list?: any[];
    document_detail?: any;
    docu_manager_list?: any[];
    edms_main_middle?: any[];
    edms_main_bottom?: any[];
    stage_code_list?: any[];
    docu_comparison?: string;
    docu_stage_list: any[];
    stage_type_list: any[];
};

const initialState: edmsDocumentState = {
    edms_doc_master_list: [],
    create_document_data: undefined,
    edit_document_data: undefined,
    delete_document_data: undefined,
    document_list: undefined,
    document_detail: undefined,
    docu_manager_list: undefined,
    edms_main_middle: undefined,
    edms_main_bottom: undefined,
    stage_code_list: [],
    docu_comparison: undefined,
    docu_stage_list: [],
    stage_type_list: [],
};

export const document = (state: edmsDocumentState = initialState, { type, payload }: AnyAction) => {
    switch (type) {
        case GET_EXCEL_FILE_UPLOAD_FORM:
            return {
                ...state,
            };
        case GET_STAGE_CODES:
            return {
                ...state,
                stage_code_list: payload.data,
            };
        case GET_EDMS_DOCU_MASTER_LIST:
            return {
                ...state,
                edit_document_data: undefined,
                create_document_data: undefined,
                edms_doc_master_list: payload.data,
                docu_comparison: undefined,
            };
        case CREATE_DOCUMENT:
            return {
                ...state,
                create_document_data: payload.data,
            };
        case EDIT_DOCUMENT:
            return {
                ...state,
                edit_document_data: payload.data,
            };
        case DELETE_DOCUMENT:
            return {
                ...state,
                delete_document_data: payload.data,
            };
        case GET_DOCUMENT_LIST:
            return {
                ...state,
                document_list: payload.data,
                docu_comparison: undefined,
                document_detail: undefined,
            };
        case GET_DOCUMENT_DETAIL:
            return {
                ...state,
                docu_comparison: undefined,
                document_detail: payload.data,
            };
        case GET_DOCUMENT_MANAGER:
            return {
                ...state,
                docu_manager_list: payload.data,
            };
        case GET_MAIN_MIDDLE:
            return {
                ...state,
                edms_main_middle: payload.data,
            };
        case GET_MAIN_BOTTOM:
            return {
                ...state,
                edms_main_bottom: payload.data,
            };
        case GET_DOCU_COMPARISON:
            return {
                ...state,
                docu_comparison: payload.data,
            };
        case GET_DOCU_STAGE_DATA:
            return {
                ...state,
                docu_stage_list: payload.data,
            };
        case GET_STAGE_TYPE:
            return {
                ...state,
                stage_type_list: payload.data,
            };
        default:
            return state;
    }
};
