import { ModalInfo } from "components";
import { AnyAction } from "redux";
import {
    APPROVAL_TM,
    CREATE_TM_COMMENT,
    GET_DOCU_REVIEW_LIST,
    GET_DRN_LIST,
    GET_TM_DETAIL_LIST,
    GET_TM_CODE,
    CREATE_TM,
    CREATE_TM_APPROVER,
    GET_TM_CODE_LIST,
    EDIT_TM_CODE,
    TM_REPLY,
    TM_REPLY_APPROVE,
    GET_ORIGINAL_TM_CODE,
    TM_UPLOAD_VERSION_FILE,
    TM_VERSION_FILE_LIST,
    GET_HENC_TM_HTML_DATA,
    GET_TM_ALL_REVIEW,
    TM_REVIEW_REGISTER,
    TM_REVIEW_DELETE,
    GET_REFERENCE_TM_USER,
    TM_CONFIRM_REFER,
    CREATE_REVIEW_EXCEL,
    GET_SHINHAN_TM_HTML_DATA,
    CONFIRM_COMPLETE_REVIEW,
    TR_NO_EXAMINE,
} from "../action/tm";

export type edmsTmState = {
    create_tm_comment?: any;
    approval_tm?: any;
    tm_comment_list: any[];
    tm_assign_list: any[];
    docu_review: any[];
    drn_history: any[];
    drn_review_assign: any[];
    drn_review_file: any[];
    tm_code: any;
    tm_user_id: any;
    create_work_data?: any;
    create_work_tm?: any;
    create_tm_approver?: any;
    tm_code_list: any[];
    edit_tm_code_data?: any;
    tm_reply_data?: any;
    tm_reply_approve_data?: any;
    original_tm_code?: string;
    tm_upload_version_data: any;
    tm_version_file_list: any;
    tm_html_data: any;
    tm_html_data_result: any;
    tm_all_review_list: any;
    tm_review_docu_list: any;
    tm_review_file_list: any;
    tm_review_register: any;
    tm_review_delete: any;
    reference_tm_user: boolean;
    is_confirm_refer: boolean;
    create_review_excel: any;
    tm_project_no?: number;
    original_tm_subject?: string;
    tr_no_examine?: boolean;
    tm_stage_type?: string;
};

const initialState: edmsTmState = {
    create_tm_comment: undefined,
    approval_tm: undefined,
    tm_comment_list: [],
    tm_assign_list: [],
    docu_review: [],
    drn_history: [],
    drn_review_file: [],
    drn_review_assign: [],
    tm_code: undefined,
    tm_user_id: undefined,
    create_work_data: undefined,
    create_work_tm: undefined,
    create_tm_approver: undefined,
    tm_code_list: [],
    edit_tm_code_data: undefined,
    tm_reply_data: undefined,
    tm_reply_approve_data: undefined,
    original_tm_code: undefined,
    tm_upload_version_data: undefined,
    tm_version_file_list: undefined,
    tm_html_data: undefined,
    tm_html_data_result: undefined,
    tm_all_review_list: undefined,
    tm_review_docu_list: undefined,
    tm_review_file_list: undefined,
    tm_review_register: undefined,
    tm_review_delete: undefined,
    reference_tm_user: false,
    is_confirm_refer: false,
    create_review_excel: undefined,
    tm_project_no: undefined,
    original_tm_subject: undefined,
    tr_no_examine: undefined,
    tm_stage_type: undefined,
};

export const tm = (state: edmsTmState = initialState, { type, payload }: AnyAction) => {
    switch (type) {
        case CREATE_TM_COMMENT:
            return {
                ...state,
                create_tm_comment: payload.data.insert_workreview,
                tm_comment_list: payload.data.tm_comment_list,
            };
        case APPROVAL_TM:
            return {
                ...state,
                approval_tm: payload.data.insertWP,
            };
        case GET_TM_DETAIL_LIST:
            return {
                ...state,
                tm_comment_list: payload.data.tm_comment_list,
                tm_assign_list: payload.data.tm_assign_list,
                create_tm_comment: undefined,
                approval_tm: undefined,
                docu_review: [],
                create_review_excel: undefined,
            };
        case GET_DOCU_REVIEW_LIST:
            return {
                ...state,
                docu_review: payload.data,
            };
        case GET_DRN_LIST:
            return {
                ...state,
                drn_history: payload.data.drn_history_list,
                drn_review_assign: payload.data.filtered_assign_list,
                drn_review_file: payload.data.file_attach_list,
            };
        case GET_TM_CODE:
            return {
                ...state,
                tm_user_id: payload.data.tm_user_id,
                tm_code: payload.data.code,
                tm_project_no: payload.data.tm_project_no,
                tm_stage_type: payload.data.stage_type,
            };
        case CREATE_TM:
            return {
                ...state,
                create_work_data: payload.data.insert_work,
                create_work_tm: payload.data.create_tm,
            };
        case CREATE_TM_APPROVER:
            return {
                ...state,
                create_tm_approver: payload.data,
            };
        case GET_TM_CODE_LIST:
            return {
                ...state,
                tm_code_list: payload.data,
                edit_tm_code_data: undefined,
            };
        case EDIT_TM_CODE:
            return {
                ...state,
                edit_tm_code_data: payload.data,
            };
        case TM_REPLY:
            return {
                ...state,
                tm_reply_data: payload.data,
            };
        case TM_REPLY_APPROVE:
            return {
                ...state,
                tm_reply_approve_data: payload.data,
            };
        case GET_ORIGINAL_TM_CODE:
            return {
                ...state,
                original_tm_code: payload.data.original_tm_code,
                original_tm_subject: payload.data.tm_subject,
            };
        case TM_UPLOAD_VERSION_FILE:
            return {
                ...state,
                tm_upload_version_data: payload.data,
            };
        case TM_VERSION_FILE_LIST:
            return {
                ...state,
                tm_version_file_list: payload.data,
            };
        case GET_HENC_TM_HTML_DATA:
        case GET_SHINHAN_TM_HTML_DATA:
            return {
                ...state,
                tm_html_data: payload.data.html,
                tm_html_data_result: payload.data.result,
            };
        case GET_REFERENCE_TM_USER:
            return {
                ...state,
                reference_tm_user: payload.data,
            };
        case TM_CONFIRM_REFER + "_LOADING":
            return {
                ...state,
                is_confirm_refer: false,
            };
        case TM_CONFIRM_REFER:
            return {
                ...state,
                is_confirm_refer: payload.data,
            };
        case GET_TM_ALL_REVIEW:
            return {
                ...state,
                tm_all_review_list: payload.data.review_list,
            };
        case TM_REVIEW_REGISTER:
            return {
                ...state,
                tm_review_register: payload.data,
            };
        case TM_REVIEW_DELETE:
            if (payload.data == 2) ModalInfo("리뷰 삭제는 작성자 본인만 가능합니다.");
            return {
                ...state,
                tm_review_delete: payload.data,
            };
        case CREATE_REVIEW_EXCEL:
            return {
                ...state,
                create_review_excel: payload.data,
            };
        case CONFIRM_COMPLETE_REVIEW:
            return { ...state };
        case TR_NO_EXAMINE + "_LOADING":
            return {
                ...state,
                tr_no_examine: undefined,
            };
        case TR_NO_EXAMINE:
            return {
                ...state,
                tr_no_examine: payload.data,
            };
        default:
            return state;
    }
};
