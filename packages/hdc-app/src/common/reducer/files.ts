import { AnyAction } from "redux";
import {
    COLLECT_FILE,
    COLLECT_FILE_EXCEL,
    GET_FILE_LIST,
    CREATE_FILE,
    COLLECT_FILE_BUILD,
    COLLECT_FILE_BUILD_CLEAR,
    COLLECT_FILE_BUILD_DCL,
    COLLECT_FILE_BUILD_VP,
    COLLECT_FILE_BUILD_VPIS,
    COLLECT_FILE_BUILD_PLANT,
    // SELECT_FILES_DELECT,
    GET_EXFILE,
    GET_EXFILE_DCL,
    GET_EXFILE_VP,
    GET_EXFILE_VPIS,
    GET_EXFILE_PLANT,
    GET_FILE_HISTORY,
    NEW_VERSION_FILE,
    GET_NEW_FILE_CODE,
    GET_FILE_DETAIL,
    GET_FILES_HISTORY,
    GET_FILES_LIST,
    REVIEW_COMMENT_FILE,
    GET_REVIEW_EXFILE,
    SET_BUILD_RESULT_CLEAR,
    GET_COUNT_UPLOAD_EDMS,
    GET_NATIVE_FILE_LIST,
    GET_EDMS_OTHER_FILE_LIST,
} from "../action";

export interface fileBuildResultType {
    resultList: string[];
    resultMessages: string[];
    files: any[];
    isConfirm: boolean;
}

export type edmsFilesState = {
    collect_files: string[];
    collect_file_ex: string;
    file_list: any[];
    create_file_data?: any;
    file_build_result?: fileBuildResultType;
    file_build_result_dcl?: string[];
    file_build_result_vp?: string[];
    file_build_result_plant?: string[];
    select_files_delect: any;
    exfile_list?: any[];
    exfile_list_dcl?: any[];
    exfile_list_vp?: any[];
    exfile_list_vpis?: any[];
    exfile_list_plant?: any[];
    file_histories?: any[];
    new_version_file?: any;
    new_file_code: string;
    file_detail?: any;
    files_histories?: any[];
    files_list?: any[];
    review_comment_file: any;
    review_comment_list: any[];
    count_upload: { id: number; total: number; count: number }[];
    native_files: any[];
    other_file_list: any[];
    ext_list: any[];
};

const initialState: edmsFilesState = {
    collect_files: [],
    collect_file_ex: "",
    file_list: [],
    create_file_data: undefined,
    file_build_result: undefined,
    file_build_result_dcl: undefined,
    file_build_result_vp: undefined,
    file_build_result_plant: undefined,
    select_files_delect: undefined,
    exfile_list: undefined,
    exfile_list_dcl: undefined,
    exfile_list_vp: undefined,
    exfile_list_vpis: undefined,
    exfile_list_plant: undefined,
    file_histories: [],
    new_version_file: undefined,
    new_file_code: "",
    file_detail: undefined,
    files_histories: [],
    files_list: [],
    review_comment_file: undefined,
    review_comment_list: [],
    count_upload: [],
    native_files: [],
    other_file_list: [],
    ext_list: [],
};

export const files = (state: edmsFilesState = initialState, { type, payload }: AnyAction): any => {
    switch (type) {
        case NEW_VERSION_FILE + "_LOADING":
            return {
                ...state,
                new_version_file: undefined,
            };
        case COLLECT_FILE:
            return {
                ...state,
                collect_files: payload.data.files,
            };
        case COLLECT_FILE_EXCEL:
            return {
                ...state,
                collect_file_ex: payload.data.exFile,
            };
        case COLLECT_FILE_BUILD + "_LOADING":
            return {
                ...state,
                file_build_result: undefined,
            };
        case COLLECT_FILE_BUILD:
            return {
                ...state,
                file_build_result: { ...payload.data },
            };
        case COLLECT_FILE_BUILD_CLEAR:
            return {
                ...state,
                file_build_result: undefined,
            };
        case COLLECT_FILE_BUILD_DCL:
            return {
                ...state,
                file_build_result_dcl: payload.data,
                count_upload: payload.data
                    ? [...state.count_upload, { id: payload.data.dcl_id, total: 0, count: 0 }]
                    : state.count_upload,
                collect_file_ex: "",
            };
        case COLLECT_FILE_BUILD_VP:
        case COLLECT_FILE_BUILD_VPIS:
            return {
                ...state,
                file_build_result_vp: payload.data,
                count_upload: payload.data
                    ? [...state.count_upload, { id: payload.data.dcl_id, total: 0, count: 0 }]
                    : state.count_upload,
                collect_file_ex: "",
            };
        case COLLECT_FILE_BUILD_PLANT:
            return {
                ...state,
                file_build_result_plant: payload.data,
                count_upload: payload.data
                    ? [...state.count_upload, { id: payload.data.dcl_id, total: 0, count: 0 }]
                    : state.count_upload,
                collect_file_ex: "",
            };
        case GET_FILE_LIST:
            return {
                ...state,
                file_list: payload.data,
                new_version_file: undefined,
                create_file_data: undefined,
            };
        case CREATE_FILE:
            return {
                ...state,
                create_file_data: payload.data,
            };
        case GET_FILE_HISTORY:
            return {
                ...state,
                file_histories: payload.data,
            };
        case NEW_VERSION_FILE:
            return {
                ...state,
                new_version_file: payload.data.new_file,
            };
        case GET_EXFILE:
            return {
                ...state,
                exfile_list: payload.data,
                file_build_result: undefined,
            };
        case GET_EXFILE_DCL:
            return {
                ...state,
                exfile_list_dcl: payload.data,
            };
        case GET_EXFILE_VP:
            return {
                ...state,
                exfile_list_vp: payload.data,
            };
        case GET_EXFILE_VPIS:
            return {
                ...state,
                exfile_list_vpis: payload.data,
            };
        case GET_EXFILE_PLANT:
            return {
                ...state,
                exfile_list_plant: payload.data,
            };
        case GET_NEW_FILE_CODE:
            return {
                ...state,
                new_file_code: payload.data,
            };
        case GET_FILE_DETAIL:
            return {
                ...state,
                file_detail: payload.data,
            };
        case GET_FILES_HISTORY:
            return {
                ...state,
                files_histories: payload.data,
            };
        case GET_FILES_LIST:
            return {
                ...state,
                files_list: payload.data,
            };
        case REVIEW_COMMENT_FILE:
            if (payload.data.files)
                return {
                    ...state,
                    review_comment_file: [...payload.data.files],
                };
            return {
                ...state,
            };
        case GET_REVIEW_EXFILE:
            return {
                ...state,
                review_comment_list: payload.data,
            };
        case SET_BUILD_RESULT_CLEAR:
            return {
                ...state,
                file_build_result: undefined,
                collect_files: [],
            };
        case GET_COUNT_UPLOAD_EDMS:
            return {
                ...state,
                count_upload: [...payload.data],
            };
        case GET_NATIVE_FILE_LIST:
            return {
                ...state,
                native_file_list: payload.data,
            };
        case GET_EDMS_OTHER_FILE_LIST:
            return {
                ...state,
                other_file_list: payload.data.other_file_list,
                ext_list: payload.data.ext_list,
            };
        default:
            return state;
    }
};
