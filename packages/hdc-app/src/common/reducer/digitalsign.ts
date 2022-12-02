import { AnyAction } from "redux";
import {
    GET_DOCUMENT_CODE,
    GET_SIGNING_LIST,
    GET_SIGN_COMPLETE_LIST,
    GET_SIGN_WAIT_LIST,
    GET_SIGN_REJECT_LIST,
    GET_SIGN_FORM_LIST,
    GET_SIGN_FORM_DETAIL_LIST,
    GET_SIGN_DOC_RECV_LIST,
    GET_SIGN_DOC_SEND_LIST,
    GET_OFFLINE_SIGN_LIST,
    GET_OFFLINE_SIGN,
    NEW_OFFLINE_SIGN,
    NEW_SIGN,
    GET_SIGN,
    TEMP_SAVE_SIGN,
    DELETE_SIGN,
    SEND_SIGN,
    REQUEST_SIGN,
    APPROVAL_SIGN,
    REJECT_SIGN,
    CANCEL_SIGN,
    DEFERER_SIGN,
    EDIT_SIGN,
    DEACTIVE_MODAL,
    GET_ORGANIZATION_CHART,
    GET_SIGN_LINE,
    SET_SIGN_LINE,
    GET_TEMP_DOC_LIST,
    UPLOAD_ATTACH_FILE,
    DELETE_ATTACH_FILE,
    GET_REGIST_LIST,
    REGIST_SIGN,
    PREV_APPROVAL_SIGN,
    RE_REQUEST_SIGN,
    SET_SIGN_REFERER,
    CLEAN_SIGNDATA,
    SET_DOC_IS_READ,
    //일반문서
    GET_GENERAL_CODE,
    GET_GENERAL_DOC,
    GET_GENERAL_DOC_LIST,
    SET_GENERAL_DOC,
    SET_GENERAL_DOC_REFERER,
    SET_GENERAL_DOC_RECV,
    SEND_GENERAL_DOC,
    NEW_GENERAL_DOC,
    UPLOAD_ATTACH_GENERAL_DOC_FILE,
    DELETE_ATTACH_GENERAL_DOC_FILE,
    SET_GENERAL_DOC_IS_READ,
    SET_GENERAL_DOC_CODE,
    UPLOAD_GENERAL_DOC_CODE_FILE,
    GET_NORMAL_DOCUMENT_USER_LIST,
    EDIT_GENERAL_DOC_CODE,
    DELETE_GENERAL_DOC_CODE,
    GET_GENERAL_DOC_SIGN_LINE,
    SET_GENERAL_DOC_SIGN_LINE,
    DELETE_GENERAL_DOC,
    REQUEST_GENERAL_DOC,
    CANCEL_GENERAL_DOC,
    APPROVAL_GENERAL_DOC_SIGN,
    REJECT_GENERAL_DOC_SIGN,
    RE_REQUEST_GENERAL_DOC,
    GET_NEW_GENERAL_DOC,
    REFRESH_PAGE_NUMBER,
} from "../action";

export type signingListType = {
    id: number;
    title: string;
    form: string;
    time: string;
    creator: string;
    date: string;
    comment: number;
    document: number;
    attach: number;
    last_signer: string;
};

export type signDocumnetListType = {
    id: number;
    date: string;
    form: string;
    title: string;
    state: number;
    last_signer: string;
    next_signer: string;
    next_signer_id: number;
    reject_signer: string;
};

export type signCommentType = {
    created_at: string;
    comment: string;
    username: string;
    group: string;
};

enum document_state {
    임시저장 = 1,
    완료 = 2,
}

export type signDataType = {
    user_id: number;
    form_id: number;
    group_id: number;
    department_id: number;
    text: string;
    state: document_state;
    isOpen: boolean;
    title: string;
};

enum signLineState {
    기안 = 1,
    대기 = 2,
    결재 = 3,
    반려 = 4,
    결재취소 = 5,
}

export type signLineType = {
    id: number;
    sign_id: number;
    user_id: number;
    state: signLineState;
    is_delete: boolean;
};

export type signOrgType = {
    id: number;
    user_id: number;
    username: number;
    name: string;
    company: string;
    email: string;
    admin_level: number;
};

export type signReferType = {
    id: number;
    sign_id: number;
    user_id: number;
    username: string;
};

export type generalDocCodeType = {
    id: number;
    code: string;
    text: string;
};

export type generalDocRecvType = {
    id: number;
    general_doc_id: number;
    user_id: number;
    visible: number; // 0 or 1
    username: string;
};

export type generalDocRefererType = {
    id: number;
    general_doc_id: number;
    user_id: number;
    visible: number; // 0 or 1
    username: string;
};

export type generalDocDataType = {
    id: number;
    created_at: string;
    code_id: number;
    user_id: number;
    state: number; // 1 : 작성중, 2: 발송완료
    title: string;
    content: string;
    sended_at: string;
    username: string;
};

export type generalDocDataListType = {
    id: number;
    created_at: string;
    code_id: number;
    user_id: number;
    state: number; // 1 : 작성중, 2: 발송완료
    title: string;
    content: string;
    sended_at: string;
    code: string;
    creator: string;
};

export type generalDocFileType = {
    id: number;
    general_doc_id: number;
    size: number;
    filename: string;
    url: string;
};

export type digitalsignState = {
    isLoading: boolean;
    document_codes: any;
    signing_list: signingListType[];
    //결재 박스
    sign_wait_list: signDocumnetListType[];
    sign_complete_list: signDocumnetListType[];
    sign_reject_list: signDocumnetListType[];
    //
    offline_sign: any;
    offline_sign_list: any[];
    offline_recv_list: any[];
    offline_send_list: any[];
    // 문서함
    doc_temp_list: any[];
    doc_send_list: any[];
    doc_recv_list: any[];
    doc_regist_list: any[];
    //
    sign_form_list: any[];
    sign_form_detail_list: any[];
    new_offline_sign_id: number;
    new_sign_id: number;
    new_form_id: number;
    regist_sign_id: number;
    // finish request
    request_sign_fin: boolean;
    approval_sign_fin: boolean;
    reject_sign_fin: boolean;
    cancel_sign_fin: boolean;
    defer_sign_fin: boolean;
    edit_sign_fin: boolean;
    send_sign_fin: boolean;
    regist_sign_fin?: boolean;
    re_request_sign_fin: boolean;
    set_general_doc_fin: boolean;
    set_general_doc_is_read_fin: boolean;
    set_doc_is_read_fin: boolean;
    send_general_doc_fin: boolean;
    //
    organization_chart: any[];
    organization_chart_name: any[];
    sign_data?: signDataType;
    view_doc_title: string;
    view_doc_sub_title: string;
    sign_line?: signLineType[];
    signed_user?: any[];
    next_signed_user?: any[];
    sign_refer?: signReferType[];
    sign_files?: string[];
    sign_org?: signOrgType[];
    sign_comment?: signCommentType[];
    gdoc_sign_comment?: signCommentType[];
    document_code?: string;
    is_diff_org?: boolean;
    is_doc_mng?: boolean;
    sign_id?: number;
    sign_register?: any;
    page_data?: any;

    // 일반 문서
    gDoc_files?: generalDocFileType[];
    gDoc_codes?: generalDocCodeType[];
    gDoc_id?: number;
    gDoc_read_list?: any[];
    gDoc_recv?: generalDocRecvType[];
    gDoc_referer?: generalDocRefererType[];
    gDoc_data?: generalDocDataType;
    gDoc_list?: generalDocDataListType[];
    gDoc_code_file: any;
    gDoc_user_list?: any;
    gDoc_sign_line?: any;
    gDoc_register?: any;
    gDoc_is_diff_org?: boolean;
    // is end boolean
    request_general_doc_fin: boolean;
    approval_general_doc_fin: boolean;
    reject_general_doc_fin: boolean;
    cancel_general_doc_fin: boolean;
    defer_general_doc_fin: boolean;
    regist_general_doc_fin: boolean;
    re_request_general_doc_fin: boolean;
    delete_general_doc_fin: boolean;
};

const initialState: digitalsignState = {
    signing_list: [],
    document_codes: undefined,
    isLoading: false,
    //결재 박스
    sign_wait_list: [],
    sign_complete_list: [],
    sign_reject_list: [],
    //
    offline_sign: undefined,
    offline_sign_list: [],
    offline_recv_list: [],
    offline_send_list: [],
    // 문서함
    doc_temp_list: [],
    doc_recv_list: [],
    doc_send_list: [],
    doc_regist_list: [],
    //
    sign_form_list: [],
    sign_form_detail_list: [],
    request_sign_fin: false,
    approval_sign_fin: false,
    reject_sign_fin: false,
    cancel_sign_fin: false,
    defer_sign_fin: false,
    send_sign_fin: false,
    edit_sign_fin: false,
    regist_sign_fin: undefined,
    re_request_sign_fin: false,
    set_doc_is_read_fin: false,
    set_general_doc_fin: false,
    set_general_doc_is_read_fin: false,
    send_general_doc_fin: false,
    request_general_doc_fin: false,
    approval_general_doc_fin: false,
    reject_general_doc_fin: false,
    cancel_general_doc_fin: false,
    defer_general_doc_fin: false,
    regist_general_doc_fin: false,
    re_request_general_doc_fin: false,
    delete_general_doc_fin: false,
    regist_sign_id: -1,
    new_offline_sign_id: -1,
    new_sign_id: -1,
    new_form_id: -1,
    organization_chart: [],
    organization_chart_name: [],
    sign_data: undefined,
    view_doc_title: "",
    view_doc_sub_title: "",
    sign_line: undefined,
    signed_user: undefined,
    next_signed_user: undefined,
    sign_refer: undefined,
    sign_files: undefined,
    sign_comment: undefined,
    gdoc_sign_comment: undefined,
    sign_org: undefined,
    document_code: undefined,
    is_diff_org: undefined,
    is_doc_mng: undefined,
    sign_id: undefined,
    sign_register: undefined,
    page_data: undefined,
    // 일반문서
    gDoc_files: undefined,
    gDoc_codes: undefined,
    gDoc_id: undefined,
    gDoc_read_list: undefined,
    gDoc_recv: undefined,
    gDoc_referer: undefined,
    gDoc_data: undefined,
    gDoc_list: undefined,
    gDoc_code_file: undefined,
    gDoc_user_list: undefined,
    gDoc_sign_line: undefined,
    gDoc_register: undefined,
    gDoc_is_diff_org: false,
};

export const digitalsign = (
    state: digitalsignState = initialState,
    { type, payload }: AnyAction
) => {
    switch (type) {
        case APPROVAL_GENERAL_DOC_SIGN + "_LOADING":
            return {
                ...state,
                approval_general_doc_fin: false,
            };
        case APPROVAL_SIGN + "_LOADING":
        case PREV_APPROVAL_SIGN + "_LOADING":
            return {
                ...state,
                approval_sign_fin: false,
            };
        case REGIST_SIGN + "_LOADING":
            return {
                ...state,
                regist_sign_fin: undefined,
            };
        case REQUEST_SIGN + "_LOADING":
            return {
                ...state,
                request_sign_fin: false,
            };
        case REJECT_SIGN + "_LOADING":
            return {
                ...state,
                reject_sign_fin: false,
            };
        case CANCEL_SIGN + "_LOADING":
            return {
                ...state,
                cancel_sign_fin: false,
            };
        case DEFERER_SIGN + "_LOADING":
            return {
                ...state,
                defer_sign_fin: false,
            };
        case NEW_SIGN + "_LOADING":
            return {
                ...state,
                sign_data: undefined,
                sign_id: undefined,
                sign_line: undefined,
                sign_refer: undefined,
                sign_org: undefined,
                sign_files: undefined,
                sign_comment: undefined,
            };
        case NEW_OFFLINE_SIGN + "_LOADING":
            return {
                ...state,
                new_offline_sign_id: undefined,
            };
        case GET_OFFLINE_SIGN + "_LOADING":
            return {
                ...state,
                offline_sign: undefined,
            };
        case SEND_SIGN + "_LOADING":
            return {
                ...state,
                send_sign_fin: false,
            };
        case GET_SIGN + "_LOADING":
            return {
                ...state,
                view_doc_title: "",
                view_doc_sub_title: "",
                sign_data: undefined,
                sign_id: undefined,
                sign_line: undefined,
                sign_refer: undefined,
                sign_comment: undefined,
                gdoc_sign_comment: undefined,
                sign_files: undefined,
                document_code: undefined,
                sign_org: undefined,
                is_diff_org: undefined,
                sign_register: undefined,
            };
        case EDIT_SIGN + "_LOADING":
            return {
                ...state,
                edit_sign_fin: false,
            };
        case GET_GENERAL_DOC + "_LOADING":
            return {
                ...state,
                gdoc_sign_comment: undefined,
                gDoc_data: undefined,
                gDoc_read_list: undefined,
                gDoc_recv: undefined,
                gDoc_referer: undefined,
                gDoc_files: undefined,
                sign_org: undefined,
                signed_user: undefined,
                next_signed_user: undefined,
                gDoc_register: undefined,
            };
        case NEW_GENERAL_DOC + "_LOADING":
            return {
                ...state,
                gDoc_id: undefined,
                gDoc_data: undefined,
                gDoc_files: undefined,
                gDoc_recv: undefined,
                gDoc_referer: undefined,
                gdoc_sign_comment: undefined,
            };
        case SET_GENERAL_DOC + "_LOADING":
            return {
                ...state,
                set_general_doc_fin: false,
            };
        case SET_GENERAL_DOC_IS_READ + "_LOADING":
            return {
                ...state,
                set_general_doc_is_read_fin: false,
            };
        case SET_DOC_IS_READ + "_LOADING":
            return {
                ...state,
                set_doc_is_read_fin: false,
            };
        case SEND_GENERAL_DOC + "_LOADING":
            return {
                ...state,
                send_general_doc_fin: false,
            };
        case type + "_LOADING":
            state.isLoading = true;
            return {
                ...state,
            };
        case GET_DOCUMENT_CODE:
            return {
                ...state,
                document_codes: payload.data,
            };
        case UPLOAD_ATTACH_FILE:
            return {
                ...state,
                sign_files: [...payload.data],
            };
        case DELETE_ATTACH_FILE:
            return {
                ...state,
            };
        case GET_TEMP_DOC_LIST:
            return {
                ...state,
                doc_temp_list: payload.data,
            };
        case GET_SIGNING_LIST:
            return {
                ...state,
                signing_list: payload.data,
                isLoading: false,
            };
        case GET_SIGN_WAIT_LIST:
            return {
                ...state,
                sign_wait_list: payload.data,
                isLoading: false,
            };
        case GET_SIGN_REJECT_LIST:
            return {
                ...state,
                sign_reject_list: payload.data,
                isLoading: false,
            };
        case GET_SIGN_COMPLETE_LIST:
            return {
                ...state,
                sign_complete_list: payload.data,
                isLoading: false,
            };
        case GET_SIGN_DOC_RECV_LIST:
            return {
                ...state,
                doc_recv_list: payload.data,
                isLoading: false,
            };
        case GET_SIGN_DOC_SEND_LIST:
            return {
                ...state,
                doc_send_list: payload.data,
                isLoading: false,
            };
        case GET_SIGN_FORM_LIST:
            return {
                ...state,
                sign_form_list: payload.data,
            };
        case GET_SIGN_FORM_DETAIL_LIST:
            return {
                ...state,
                sign_form_detail_list: payload.data,
            };
        case NEW_SIGN:
            return {
                ...state,
                sign_data: payload.data.sign_data,
                sign_line: payload.data.sign_line,
                sign_refer: payload.data.referer_line,
                sign_org: payload.data.sign_org,
                new_sign_id: payload.data.sign_data.id,
                new_form_id: payload.data.sign_data.form_id,
                document_code: payload.data.document_code,
            };
        case NEW_OFFLINE_SIGN:
            return {
                ...state,
                new_offline_sign_id: payload.data,
            };
        case GET_OFFLINE_SIGN_LIST:
            return {
                ...state,
                offline_sign_list: payload.data.offsign,
                offline_recv_list: payload.data.offrecv,
                offline_send_list: payload.data.offsend,
                new_offline_sign_id: -1,
            };
        case GET_OFFLINE_SIGN:
            return {
                ...state,
                sign_data: payload.data.sign_data,
                sign_line: payload.data.sign_line,
                sign_refer: payload.data.referer_line,
                sign_org: payload.data.sign_org,
                signed_user: payload.data.signed_user,
                sign_files: payload.data.files,
            };
        case GET_SIGN:
            return {
                ...state,
                sign_id: payload.data.sign_data.id,
                sign_line: payload.data.sign_line,
                signed_user: payload.data.signed_user,
                sign_refer: payload.data.referer_line,
                sign_data: payload.data.sign_data,
                sign_comment: payload.data.sign_comment,
                sign_files: payload.data.sign_files,
                view_doc_title: payload.data.sign_data.title,
                view_doc_sub_title: payload.data.sign_data.form,
                document_code: payload.data.document_code,
                sign_org: payload.data.sign_org,
                is_diff_org: payload.data.is_diff_org,
                is_doc_mng: payload.data.is_doc_mng,
                sign_register: payload.data.sign_register,
            };
        case DELETE_SIGN:
            return {
                ...state,
            };
        case TEMP_SAVE_SIGN:
            return {
                ...state,
            };
        case SEND_SIGN:
            return {
                ...state,
                send_sign_fin: true,
            };
        case REQUEST_SIGN:
            return {
                ...state,
                request_sign_fin: true,
            };
        case APPROVAL_SIGN:
        case PREV_APPROVAL_SIGN:
            return {
                ...state,
                approval_sign_fin: payload.data,
            };
        case REJECT_SIGN:
            return {
                ...state,
                reject_sign_fin: true,
            };
        case CANCEL_SIGN:
            return {
                ...state,
                cancel_sign_fin: true,
            };
        case DEFERER_SIGN:
            return {
                ...state,
                defer_sign_fin: true,
            };
        case EDIT_SIGN:
            return {
                ...state,
                edit_sign_fin: true,
            };
        case GET_ORGANIZATION_CHART:
            if(payload.data){
                return {
                    ...state,
                    organization_chart: payload.data.list,
                    organization_chart_name: payload.data.alllist,
                };
            }
            return {
                ...state,
            };
        case GET_SIGN_LINE:
        case SET_SIGN_LINE:
            return {
                ...state,
                sign_line: payload.data,
            };
        case SET_SIGN_REFERER:
            return {
                ...state,
            };
        case DEACTIVE_MODAL:
            return {
                ...state,
                approval_general_doc_fin: false,
                request_sign_fin: false,
                approval_sign_fin: false,
                edit_sign_fin: false,
                reject_sign_fin: false,
                cancel_sign_fin: false,
                regist_sign_fin: undefined,
                send_sign_fin: false,
                re_request_sign_fin: false,
                defer_sign_fin: false,
                set_doc_is_read_fin: false,
                set_general_doc_fin: false,
                set_general_doc_is_read_fin: false,
                send_general_doc_fin: false,
                delete_general_doc_fin: false,
                request_general_doc_fin: false,
                cancel_general_doc_fin: false,
                defer_general_doc_fin: false,
                regist_general_doc_fin: false,
                re_request_general_doc_fin: false,
            };
        case CLEAN_SIGNDATA:
            return {
                ...state,
                sign_data: undefined,
                sign_id: undefined,
            };
        case GET_REGIST_LIST:
            return {
                ...state,
                doc_regist_list: payload.data,
            };
        case REGIST_SIGN:
            return {
                ...state,
                regist_sign_fin: payload.data.res,
                regist_sign_id: payload.data.regist_id,
            };
        case RE_REQUEST_SIGN:
            return {
                ...state,
                re_request_sign_fin: true,
            };
        case GET_GENERAL_DOC:
            return {
                ...state,
                gdoc_sign_comment: payload.data.sign_comment,
                gDoc_data: payload.data.doc_data,
                gDoc_read_list: payload.data.doc_read_list,
                gDoc_recv: payload.data.doc_recv,
                gDoc_referer: payload.data.doc_referer,
                gDoc_files: payload.data.doc_files,
                sign_org: payload.data.sign_org,
                signed_user: payload.data.signed_user,
                next_signed_user: payload.data.next_signed_user,
                gDoc_register: payload.data.doc_register,
                gDoc_is_diff_org: payload.data.is_diff_org,
            };
        case GET_GENERAL_CODE:
        case EDIT_GENERAL_DOC_CODE:
        case DELETE_GENERAL_DOC_CODE:
            return {
                ...state,
                gDoc_codes: payload.data,
            };
        case NEW_GENERAL_DOC:
            return {
                ...state,
                gDoc_id: payload.data.id,
                gDoc_data: payload.data.doc_data,
                sign_org: payload.data.sign_org,
            };
        case GET_NEW_GENERAL_DOC:
            return {
                ...state,
                sign_org: payload.data.sign_org,
                gDoc_data: undefined,
                gDoc_id: undefined,
                gDoc_files: undefined,
                gDoc_recv: undefined,
                gDoc_referer: undefined,
                gdoc_sign_comment: undefined,
                gDoc_sign_line: undefined,
            };
        case SET_GENERAL_DOC_RECV:
            return {
                ...state,
                gDoc_recv: payload.data,
            };
        case SET_GENERAL_DOC_IS_READ:
            return {
                ...state,
                set_general_doc_is_read_fin: true,
            };
        case SET_DOC_IS_READ:
            return {
                ...state,
                set_doc_is_read_fin: true,
            };
        case SET_GENERAL_DOC_REFERER:
            return {
                ...state,
                gDoc_referer: payload.data,
            };
        case GET_GENERAL_DOC_LIST:
            return {
                ...state,
                gDoc_list: payload.data,
            };
        case SET_GENERAL_DOC:
            return {
                ...state,
                set_general_doc_fin: true,
            };
        case SET_GENERAL_DOC_CODE:
            return {
                ...state,
                gDoc_codes: payload.data.doc_code,
            };
        case SEND_GENERAL_DOC:
            return {
                ...state,
                send_general_doc_fin: true,
            };
        case UPLOAD_ATTACH_GENERAL_DOC_FILE:
            return {
                ...state,
                gDoc_files: payload.data,
            };
        case DELETE_ATTACH_GENERAL_DOC_FILE:
            return {
                ...state,
            };
        case UPLOAD_GENERAL_DOC_CODE_FILE:
            return {
                ...state,
                gDoc_code_file: payload.data.file,
            };
        case GET_NORMAL_DOCUMENT_USER_LIST:
            return {
                ...state,
                gDoc_user_list: payload.data,
            };
        case GET_GENERAL_DOC_SIGN_LINE:
        case SET_GENERAL_DOC_SIGN_LINE:
            return {
                ...state,
                gDoc_sign_line: payload.data,
            };
        case DELETE_GENERAL_DOC:
            return {
                ...state,
                delete_general_doc_fin: true,
            };
        case REQUEST_GENERAL_DOC:
            return {
                ...state,
                request_general_doc_fin: true,
            };
        case CANCEL_GENERAL_DOC:
            return {
                ...state,
                cancel_general_doc_fin: true,
            };
        case REJECT_GENERAL_DOC_SIGN:
            return {
                ...state,
                reject_general_doc_fin: true,
            };
        case APPROVAL_GENERAL_DOC_SIGN:
            return {
                ...state,
                approval_general_doc_fin: true,
            };
        case RE_REQUEST_GENERAL_DOC:
            return {
                ...state,
                re_request_general_doc_fin: true,
            };
        case REFRESH_PAGE_NUMBER:
            return {
                ...state,
                page_data: payload,
            };
        default:
            return state;
    }
};
