import { AnyAction } from "redux";

import {
    GET_WORK_PROC_LIST,
    GET_WORK_DOCU_LIST,
    GET_WORK_SEND_LIST,
    GET_WORK_RECEPTION_LIST,
    CREATE_WORK_PROC,
    DEACTIVE_WORK_MODAL,
    GET_WORK_TMP_BOX_LIST,
    GET_WORK_PROC,
    GET_REVISION_INFO,
    REVISION_PROCESS,
    SET_WORK_ASSIGN,
    REQUEST_WORK_ASSIGN,
    REJECT_WORK_ASSIGN,
    DELETE_TMP_BOX,
    SET_WORK_DEPLOY,
    GET_WORK_CODE,
    APPROVE_WORK_ASSIGN,
    REPLY_WORK_ASSIGN,
    CREATE_MY_DOCUMENT,
    GET_MAIN_MY_TASK_LIST,
    GET_MAIN_CHART_LIST,
    GET_DOCUMENT_AUTH_USER,
    // GET_DIN_WORK_PROC_LIST,
    EDIT_STAGE_CODE,
    WORK_PROC_DETAIL,
    DEPLOY_TM_DRN,
    DEPLOY_TM_DRN_CLEAN,
    GET_ORIGINAL_TM,
    DELETE_MYDOCUMENT_FILES,
    GET_UNREAD_WORKS,
    UPDATE_SEND_RECV_BOX,
    RESTORE_MYDOCUMENT_FILES,
    GET_DELETE_BOX_LIST,
    REFRESH_TAB,
    REQUEST_TM_REFERER,
    GET_DOCU_MANAGER,
    ALL_APPROVE_WORK_ASSIGN,
    GET_WORK_ASSIGN_USER_LIST,
    GET_REVISION_HISOTORY,
    GET_FILE_REVIEW_LIST,
    UPDATE_DUE_DATE,
    UPLOAD_EDMS_WORK_ATTACH_FILE,
    CLEAN_EDMS_WORK_ATTACH_FILE,
    GET_ALL_TR_WORK_LIST,
    UPDATE_TR_DATA,
    CONNECT_PLANT_FILES,
} from "../action";

type tm_proc_detail = {
    wp_idx: number;
    wp_type: string;
    create_by: string;
    send_company: string;
    receive_company: string;
    wp_date: Date;
    due_data: Date;
    explan: string;
    is_response: boolean;
    is_sender: boolean;
    is_cc_confirm: boolean;
    attach_files: any[];
};

export type edmsWorkState = {
    work_proc_list: any[];
    work_proc_list_length: number;
    work_docu_list: any[];
    work_send_list: any[];
    work_recv_list: any[];
    create_my_document_data?: any;
    create_work_data?: any;
    approve_work_assign?: any;
    reply_work_assign?: any;
    work_tmp_box_list: any[];
    work_tmp_box_list_length: number;
    work_proc_data?: any;
    sign_org?: any[];
    work_assign?: any[];
    work_deploy?: any[];
    is_complete_revision: boolean;
    last_revision_number?: number;
    delete_tmp_box_data?: any;
    work_code?: string;
    main_my_task_list: any[];
    main_chart_list: any[];
    document_auth_user?: any;
    // din_work_proc_list?: any[];
    my_assign_list?: any[];
    assign_list?: any[];
    approval_info_list?: any[];
    edit_stage_code: boolean;
    work_proc_detail?: any[];
    work_assign_detail?: any[];
    work_company_id_list?: any[];
    create_deploy: boolean;
    tm_proc_detail?: tm_proc_detail;
    delete_mydocument_files?: any;
    get_unread_works: any;
    update_send_recv_box: any;
    restore_mydocument_file: boolean;
    delete_box_list: any[];
    now_tab?: any;
    request_tm_referer?: any;
    docu_manager_list: any;
    all_approve_work_assign?: boolean;
    work_assign_user_list: any[];
    revision_history: any[];
    file_reviwe_list: any[];
    update_due_date?: any;

    tr_work_docu_list?: any[];
    edms_work_attach_file?: any[];
    tr_proc_data?: any;
    work_tr_data?: any;
    tr_docu_list: any[];
    tm_attach_list: any[];
    mail_user_list: any[];
    tr_assign_list: any[];
    update_tr: boolean;
    is_loading: boolean;
    is_fin_connecting: boolean;
};

const initialState: edmsWorkState = {
    work_proc_list: [],
    work_proc_list_length: 0,
    work_docu_list: [],
    work_send_list: [],
    work_recv_list: [],
    create_my_document_data: undefined,
    create_work_data: undefined,
    approve_work_assign: undefined,
    reply_work_assign: undefined,
    work_tmp_box_list: [],
    work_tmp_box_list_length: 0,
    work_proc_data: undefined,
    sign_org: undefined,
    work_assign: undefined,
    work_deploy: undefined,
    is_complete_revision: false,
    last_revision_number: undefined,
    delete_tmp_box_data: undefined,
    work_code: undefined,
    main_my_task_list: [],
    main_chart_list: [],
    document_auth_user: undefined,
    // din_work_proc_list: [],
    my_assign_list: [],
    assign_list: [],
    approval_info_list: [],
    edit_stage_code: false,
    work_proc_detail: [],
    work_assign_detail: [],
    work_company_id_list: [],
    create_deploy: false,
    tm_proc_detail: undefined,
    delete_mydocument_files: undefined,
    get_unread_works: undefined,
    update_send_recv_box: undefined,
    restore_mydocument_file: false,
    delete_box_list: [],
    now_tab: undefined,
    request_tm_referer: undefined,
    docu_manager_list: [],
    all_approve_work_assign: undefined,
    work_assign_user_list: [],
    revision_history: [],
    file_reviwe_list: [],
    update_due_date: undefined,

    tr_work_docu_list: undefined,
    edms_work_attach_file: [],

    tr_proc_data: undefined,
    work_tr_data: undefined,
    tr_docu_list: [],
    tm_attach_list: [],
    mail_user_list: [],
    tr_assign_list: [],
    update_tr: false,
    is_loading: false,
    is_fin_connecting: false,
};

export const work = (state: edmsWorkState = initialState, { type, payload }: AnyAction) => {
    switch (type) {
        case GET_WORK_PROC_LIST + "_LOADING":
            return {
                ...state,
                create_work_data: undefined,
                work_proc_list: [],
                work_proc_list_length: 0,
                is_loading: true,
            };
        case GET_REVISION_INFO:
            return {
                ...state,
                last_revision_number: payload.data.revision,
            };
        case REVISION_PROCESS:
            return {
                ...state,
                is_complete_revision: payload.data,
            };
        case GET_WORK_PROC_LIST:
            return {
                ...state,
                ...state,
                work_proc_list: payload.data.proc_list,
                work_proc_list_length: payload.data.proc_list_length,
                assign_list: payload.data.assign_list,
                approval_info_list: payload.data.approval_info_list,
                my_assign_list: payload.data.my_assign_list,
                all_approve_work_assign: undefined,
                approve_work_assign: undefined,
                update_due_date: undefined,
                update_tr: false,
                request_tm_referer: undefined,
                is_loading: false,
            };
        case GET_WORK_SEND_LIST:
            return {
                ...state,
                work_send_list: payload.data,
            };
        case GET_WORK_RECEPTION_LIST:
            return {
                ...state,
                work_recv_list: payload.data,
            };
        case CREATE_WORK_PROC:
            return {
                ...state,
                create_work_data: payload.data,
            };
        case SET_WORK_ASSIGN:
            return {
                ...state,
                work_assign: payload.data,
            };
        case SET_WORK_DEPLOY:
            return {
                ...state,
                work_deploy: payload.data,
            };
        case APPROVE_WORK_ASSIGN:
            return {
                ...state,
                approve_work_assign: payload.data,
            };
        case REPLY_WORK_ASSIGN:
            return {
                ...state,
                reply_work_assign: payload.data,
            };
        case REQUEST_WORK_ASSIGN:
            return {
                ...state,
                work_assign: payload.data,
            };
        case REJECT_WORK_ASSIGN:
            return {
                ...state,
                work_assign: payload.data,
            };
        case DEACTIVE_WORK_MODAL:
            return {
                ...state,
                create_work_data: undefined,
                is_complete_revision: false,
            };
        case GET_WORK_DOCU_LIST:
            return {
                ...state,
                work_docu_list: payload.data,
            };
        case GET_WORK_TMP_BOX_LIST:
            return {
                ...state,
                work_tmp_box_list: [...payload.data.result],
                last_revision_number: undefined,
                edit_stage_code: false,
                work_tmp_box_list_length: payload.data["length"]
                    ? parseInt(payload.data["length"])
                    : 0,
            };
        case GET_WORK_PROC:
            return {
                ...state,
                work_proc_data: payload.data.wpdata,
                sign_org: payload.data.sign_org,
                work_assign: payload.data.work_assign,
                work_deploy: payload.data.work_deploy,
            };
        case DELETE_TMP_BOX:
            return {
                ...state,
                delete_tmp_box_data: payload.data,
            };
        case GET_WORK_CODE:
            return {
                ...state,
                work_code: payload.data,
            };
        case CREATE_MY_DOCUMENT:
            return {
                ...state,
                create_my_document_data: payload.data,
            };
        case GET_MAIN_MY_TASK_LIST:
            return {
                ...state,
                main_my_task_list: payload.data,
            };
        case GET_MAIN_CHART_LIST:
            return {
                ...state,
                main_chart_list: payload.data,
            };
        case GET_DOCUMENT_AUTH_USER:
            return {
                ...state,
                document_auth_user: payload.data,
            };
        case EDIT_STAGE_CODE:
            return {
                ...state,
                edit_stage_code: payload.data,
            };
        case WORK_PROC_DETAIL:
            return {
                ...state,
                work_proc_detail: payload.data.proc,
                work_assign_detail: payload.data.assign,
                work_company_id_list: payload.data.company_id,
            };
        case GET_ORIGINAL_TM:
            return {
                ...state,
                tm_proc_detail: payload.data,
            };
        case DEPLOY_TM_DRN_CLEAN:
            return {
                ...state,
                create_deploy: null,
            };
        case DEPLOY_TM_DRN:
            return {
                ...state,
                create_deploy: payload.data,
            };
        case DELETE_MYDOCUMENT_FILES:
            return {
                ...state,
                delete_mydocument_files: payload.data,
            };
        case GET_UNREAD_WORKS:
            return {
                ...state,
                get_unread_works: payload.data,
            };
        case UPDATE_SEND_RECV_BOX:
            return {
                ...state,
                update_send_recv_box: payload.data,
            };
        case RESTORE_MYDOCUMENT_FILES:
            return {
                ...state,
                restore_mydocument_file: payload.data,
            };
        case GET_DELETE_BOX_LIST:
            return {
                ...state,
                delete_box_list: payload.data,
            };
        case REFRESH_TAB:
            return {
                ...state,
                now_tab: payload,
            };
        case REQUEST_TM_REFERER:
            return {
                ...state,
                request_tm_referer: payload.data,
            };
        case GET_DOCU_MANAGER:
            return {
                ...state,
                docu_manager_list: payload.data,
            };
        case ALL_APPROVE_WORK_ASSIGN:
            return {
                ...state,
                all_approve_work_assign: payload.data,
            };
        case GET_WORK_ASSIGN_USER_LIST:
            return {
                ...state,
                work_assign_user_list: payload.data,
            };
        case GET_REVISION_HISOTORY:
            return {
                ...state,
                revision_history: payload.data,
            };
        case GET_FILE_REVIEW_LIST:
            return {
                ...state,
                file_reviwe_list: payload.data,
            };
        case UPDATE_DUE_DATE:
            return {
                ...state,
                update_due_date: payload.data,
            };
        case GET_ALL_TR_WORK_LIST:
            return {
                ...state,
                tr_proc_data: payload.data.proc,
                work_tr_data: payload.data.work_tm,
                tr_docu_list: payload.data.docu_list,
                tm_attach_list: payload.data.tm_attach,
                mail_user_list: payload.data.mail_user_list,
                tr_assign_list: payload.data.assign_list,
            };
        case UPDATE_TR_DATA:
            return {
                ...state,
                update_tr: payload.data,
            };
        case CLEAN_EDMS_WORK_ATTACH_FILE:
        case UPLOAD_EDMS_WORK_ATTACH_FILE + "_LOADING":
            return {
                ...state,
                edms_work_attach_file: [],
            };
        case UPLOAD_EDMS_WORK_ATTACH_FILE:
            return {
                ...state,
                edms_work_attach_file: payload.data,
            };
        case CONNECT_PLANT_FILES:
            return {
                ...state,
                is_fin_connecting: payload.data,
            };
        default:
            return state;
    }
};
