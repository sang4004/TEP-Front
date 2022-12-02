import {
    FetchApiPost,
    FetchApiGet,
    FetchApiDelete,
    FetchApiPostWithFile,
    FetchApiPostWithFiles,
} from "../network";
import actions from "common_module/lib/action/creator";

export const GET_DOCUMENT_CODE = "GET_DOCUMENT_CODE";
export const GetDocumentCode = actions(
    GET_DOCUMENT_CODE,
    async (form_id: number, recv_id: number, cop_id: number, send_id: number) => {
        return await FetchApiPost("/api/v1/digitalsign/get_document_code", {
            form_id,
            recv_id,
            cop_id,
            send_id,
        });
    }
);

export const GET_SIGNING_LIST = "GET_SIGNING_LIST";
export const GetSigningList = actions(GET_SIGNING_LIST, async () => {
    return await FetchApiGet("/api/v1/digitalsign/get_signing_list");
});

export const GET_SIGN_WAIT_LIST = "GET_SIGN_WAIT_LIST";
export const GetSignWaitList = actions(GET_SIGN_WAIT_LIST, async () => {
    return await FetchApiGet("/api/v1/digitalsign/get_sign_box_list", { state: 1 });
});

export const GET_SIGN_COMPLETE_LIST = "GET_SIGN_COMPLETE_LIST";
export const GetSignCompleteList = actions(GET_SIGN_COMPLETE_LIST, async () => {
    return await FetchApiGet("/api/v1/digitalsign/get_sign_box_list", { state: 2 });
});

export const GET_SIGN_REJECT_LIST = "GET_SIGN_REJECT_LIST";
export const GetSignRejectList = actions(GET_SIGN_REJECT_LIST, async () => {
    return await FetchApiGet("/api/v1/digitalsign/get_sign_box_list", { state: 4 });
});

export const GET_SIGN_DOC_SEND_LIST = "GET_SIGN_DOC_SEND_LIST";
export const GetSignDocSendList = actions(GET_SIGN_DOC_SEND_LIST, async (type: string) => {
    return await FetchApiGet("/api/v1/digitalsign/get_sign_box_list", { state: 3, type });
});

export const GET_SIGN_DOC_RECV_LIST = "GET_SIGN_DOC_RECV_LIST";
export const GetSignDocRecvList = actions(GET_SIGN_DOC_RECV_LIST, async (type: string) => {
    return await FetchApiGet("/api/v1/digitalsign/get_recv_box_list", { type });
});

export const GET_TEMP_DOC_LIST = "GET_TEMP_DOC_LIST";
export const GetTempDocList = actions(GET_TEMP_DOC_LIST, async () => {
    return await FetchApiGet("/api/v1/digitalsign/get_temp_box_list");
});

export const GET_SIGN_FORM_LIST = "GET_SIGN_FORM_LIST";
export const GetSignFormList = actions(GET_SIGN_FORM_LIST, async () => {
    return await FetchApiGet("/api/v1/digitalsign/get_sign_forms");
});

export const GET_SIGN_FORM_DETAIL_LIST = "GET_SIGN_FORM_DETAIL_LIST";
export const GetSignFormDetailList = actions(GET_SIGN_FORM_DETAIL_LIST, async () => {
    return await FetchApiGet("/api/v1/digitalsign/get_sign_form_details");
});

export const REQUEST_SIGN = "REQUEST_SIGN";
export const RequestSign = actions(
    REQUEST_SIGN,
    async (
        sign_id: number,
        html: string,
        header: string,
        footer: string,
        sign_line: number[],
        referer_line: number[]
    ) => {
        return await FetchApiPost("/api/v1/digitalsign/request_sign", {
            sign_id,
            html,
            header,
            footer,
            sign_line,
        });
    }
);

export const TEMP_SAVE_SIGN = "TEMP_SAVE_SIGN";
export const TempSaveSign = actions(
    TEMP_SAVE_SIGN,
    async (
        sign_id: number,
        html: string,
        header: string,
        footer: string,
        sign_line: number[],
        referer_line: number[]
    ) => {
        return await FetchApiPost("/api/v1/digitalsign/temporary_save_sign", {
            sign_id,
            html,
            header,
            footer,
            sign_line,
            referer_line,
        });
    }
);

export const NEW_SIGN = "NEW_SIGN";
export const NewSign = actions(
    NEW_SIGN,
    async (
        form_id: number,
        cop_id: number,
        doc_org_send_id: number,
        doc_org_recv_id: number,
        title: string,
        recv_list: number[],
        refer_list: number[],
        regist_list: number[],
        recv_custom: string,
        ref_custom: string,
        is_head: number,
        org_id: number,
        docId: number,
        docCode: string,
        reg_custom: string
    ) => {
        return await FetchApiPost("/api/v1/digitalsign/new_sign", {
            form_id,
            cop_id,
            doc_org_send_id,
            doc_org_recv_id,
            title,
            recv_list,
            refer_list,
            regist_list,
            recv_custom,
            ref_custom,
            is_head,
            org_id,
            docId,
            docCode,
            reg_custom,
        });
    }
);

export const NEW_OFFLINE_SIGN = "NEW_OFFLINE_SIGN";
export const NewOfflineSign = actions(
    NEW_OFFLINE_SIGN,
    async (docCode: string, title: string, vendor: string, date: Date, type: number) => {
        return await FetchApiPost("/api/v1/digitalsign/new_offline_sign", {
            docCode,
            title,
            vendor,
            date,
            type,
        });
    }
);

export const GET_NORMAL_DOCUMENT_USER_LIST = "GET_NORMAL_DOCUMENT_USER_LIST";
export const GetNormalDocumentUserList = actions(GET_NORMAL_DOCUMENT_USER_LIST, async () => {
    return await FetchApiGet("/api/v1/digitalsign/get_normal_document_user_list");
});

export const GET_OFFLINE_SIGN_LIST = "GET_OFFLINE_SIGN_LIST";
export const GetOfflineSignList = actions(GET_OFFLINE_SIGN_LIST, async () => {
    return await FetchApiGet("/api/v1/digitalsign/get_offline_sign_list");
});

export const GET_OFFLINE_SIGN = "GET_OFFLINE_SIGN";
export const GetOfflineSign = actions(GET_OFFLINE_SIGN, async (sign_id: number) => {
    return await FetchApiGet("/api/v1/digitalsign/get_offline_sign", { sign_id });
});

export const GET_SIGN = "GET_SIGN";
export const GetSign = actions(GET_SIGN, async (sign_id: number) => {
    return await FetchApiGet("/api/v1/digitalsign/get_sign", { sign_id });
});

export const SEND_SIGN = "SEND_SIGN";
export const SendSign = actions(SEND_SIGN, async (sign_id: number) => {
    return await FetchApiPost("/api/v1/digitalsign/send_sign", { sign_id });
});

export const DELETE_SIGN = "DELETE_SIGN";
export const DeleteSign = actions(DELETE_SIGN, async (sign_id: number) => {
    return await FetchApiDelete("/api/v1/digitalsign/delete_sign", { sign_id });
});

export const APPROVAL_SIGN = "APPROVAL_SIGN";
export const ApprovalSign = actions(APPROVAL_SIGN, async (sign_id: number, comment: string) => {
    return await FetchApiPost("/api/v1/digitalsign/approval_sign", { sign_id, comment });
});

export const PREV_APPROVAL_SIGN = "PREV_APPROVAL_SIGN";
export const PrevApprovalSign = actions(
    PREV_APPROVAL_SIGN,
    async (sign_id: number, comment: string) => {
        return await FetchApiPost("/api/v1/digitalsign/prev_approval_sign", { sign_id, comment });
    }
);

export const REJECT_SIGN = "REJECT_SIGN";
export const RejectSign = actions(REJECT_SIGN, async (sign_id: number, comment: string) => {
    return await FetchApiPost("/api/v1/digitalsign/reject_sign", { sign_id, comment });
});

export const CANCEL_SIGN = "CANCEL_SIGN";
export const CancelSign = actions(
    CANCEL_SIGN,
    async (sign_id: number, comment: string, user_state: number) => {
        return await FetchApiPost("/api/v1/digitalsign/cancel_sign", {
            sign_id,
            comment,
            user_state,
        });
    }
);

export const EDIT_SIGN = "EDIT_SIGN";
export const EditSign = actions(
    EDIT_SIGN,
    async (sign_id: number, html: string, header: string, footer: string, comment: string) => {
        return await FetchApiPost("/api/v1/digitalsign/edit_sign", {
            sign_id,
            html,
            header,
            footer,
            comment,
        });
    }
);

export const DEFERER_SIGN = "DEFERER_SIGN";
export const DefererSign = actions(DEFERER_SIGN, async (sign_id: number, comment: string) => {
    return await FetchApiPost("/api/v1/digitalsign/deferer_sign", { sign_id, comment });
});

export const SET_SIGN_REFERER = "SET_SIGN_REFERER";
export const SetSignReferer = actions(
    SET_SIGN_REFERER,
    async (sign_id: number, referer_line: number[]) => {
        return await FetchApiPost("/api/v1/digitalsign/set_sign_referer", {
            sign_id,
            referer_line,
        });
    }
);

export const SET_SIGN_LINE = "SET_SIGN_LINE";
export const SetSignLine = actions(
    SET_SIGN_LINE,
    async (sign_id: number, sign_line: number[], deferer_line: number[]) => {
        return await FetchApiPost("/api/v1/digitalsign/set_sign_line", {
            sign_id,
            sign_line,
            deferer_line,
        });
    }
);

export const GET_ORGANIZATION_CHART = "GET_ORGANIZATION_CHART";
export const GetOrganizationChart = actions(GET_ORGANIZATION_CHART, async () => {
    return await FetchApiGet("/api/v1/digitalsign/get_organization_chart");
});

export const GET_SIGN_LINE = "GET_SIGN_LINE";
export const GetSignLine = actions(GET_SIGN_LINE, async (sign_id: number) => {
    return await FetchApiGet("/api/v1/digitalsign/get_sign_line", { sign_id });
});

export const SET_DOC_IS_READ = "SET_DOC_IS_READ";
export const SetDocIsRead = actions(SET_DOC_IS_READ, async (sign_id: number) => {
    return await FetchApiPost("/api/v1/digitalsign/set_doc_is_read", { sign_id });
});

export const UPLOAD_ATTACH_FILE = "UPLOAD_ATTACH_FILE";
export const UploadAttachFile = actions(UPLOAD_ATTACH_FILE, async (file: any, sign_id: number) => {
    return await FetchApiPostWithFile("/api/v1/digitalsign/upload_file", [file], { sign_id });
});

export const DELETE_ATTACH_FILE = "DELETE_ATTACH_FILE";
export const DeleteAttachFile = actions(DELETE_ATTACH_FILE, async (file_id: number) => {
    return await FetchApiDelete("/api/v1/digitalsign/delete_file", { file_id });
});

export const GET_REGIST_LIST = "GET_REGIST_LIST";
export const GetRegistList = actions(GET_REGIST_LIST, async () => {
    return await FetchApiGet("/api/v1/digitalsign/get_regist_box_list");
});

export const REGIST_SIGN = "REGIST_SIGN";
export const RegistSign = actions(REGIST_SIGN, async (sign_id: number) => {
    return await FetchApiPost("/api/v1/digitalsign/regist_sign", { sign_id });
});

export const RE_REQUEST_SIGN = "RE_REQUEST_SIGN";
export const ReRequestSign = actions(RE_REQUEST_SIGN, async (sign_id: number) => {
    return await FetchApiPost("/api/v1/digitalsign/re_request_sign", { sign_id });
});

// component handle
export const DEACTIVE_MODAL = "DEACTIVE_MODAL";
export const DeactiveModal = actions(DEACTIVE_MODAL, () => {
    return { payload: true };
});

export const CLEAN_SIGNDATA = "CLEAN_SIGNDATA";
export const CleanSignData = actions(CLEAN_SIGNDATA, () => {
    return { payload: true };
});

// general document apis
export const UPLOAD_ATTACH_GENERAL_DOC_FILE = "UPLOAD_ATTACH_GENERAL_DOC_FILE";
export const UploadAttachGeneralDocFile = actions(
    UPLOAD_ATTACH_GENERAL_DOC_FILE,
    async (files: any, id: number) => {
        return await FetchApiPostWithFiles("/api/v1/digitalsign/upload_general_doc_file", files, {
            general_doc_id: id,
        });
    }
);

export const DELETE_ATTACH_GENERAL_DOC_FILE = "DELETE_ATTACH_GENERAL_DOC_FILE";
export const DeleteAttachGeneralDocFile = actions(
    DELETE_ATTACH_GENERAL_DOC_FILE,
    async (file_id: number) => {
        return await FetchApiDelete("/api/v1/digitalsign/delete_general_doc_file", { file_id });
    }
);

export const GET_GENERAL_CODE = "GET_GENERAL_CODE";
export const GetGeneralCode = actions(GET_GENERAL_CODE, async () => {
    return await FetchApiGet("/api/v1/digitalsign/get_general_code");
});

export const NEW_GENERAL_DOC = "NEW_GENERAL_DOC";
export const NewGeneralDoc = actions(NEW_GENERAL_DOC, async (code: number) => {
    return await FetchApiPost("/api/v1/digitalsign/new_general_doc", { code });
});

export const GET_NEW_GENERAL_DOC = "GET_NEW_GENERAL_DOC";
export const GetNewGeneralDoc = actions(GET_NEW_GENERAL_DOC, async () => {
    return await FetchApiGet("/api/v1/digitalsign/get_new_general_doc");
});

export const SET_GENERAL_DOC_RECV = "SET_GENERAL_DOC_RECV";
export const SetGeneralDocRecv = actions(
    SET_GENERAL_DOC_RECV,
    async (general_doc_id: number, recv_list: number[]) => {
        return await FetchApiPost("/api/v1/digitalsign/set_general_doc_recv", {
            general_doc_id,
            recv_list,
        });
    }
);

export const SET_GENERAL_DOC_IS_READ = "SET_GENERAL_DOC_IS_READ";
export const SetGeneralDocIsRead = actions(
    SET_GENERAL_DOC_IS_READ,
    async (general_doc_id: number) => {
        return await FetchApiPost("/api/v1/digitalsign/set_general_doc_IsRead", { general_doc_id });
    }
);

export const SET_GENERAL_DOC_REFERER = "SET_GENERAL_DOC_REFERER";
export const SetGeneralDocReferer = actions(
    SET_GENERAL_DOC_REFERER,
    async (general_doc_id: number, referer_line: number[]) => {
        return await FetchApiPost("/api/v1/digitalsign/set_general_doc_referer", {
            general_doc_id,
            referer_line,
        });
    }
);

export const GET_GENERAL_DOC = "GET_GENERAL_DOC";
export const GetGeneralDoc = actions(GET_GENERAL_DOC, async (general_doc_id: number) => {
    return await FetchApiGet("/api/v1/digitalsign/get_general_doc", { general_doc_id });
});

export const GET_GENERAL_DOC_LIST = "GET_GENERAL_DOC_LIST";
export const GetGeneralDocList = actions(
    GET_GENERAL_DOC_LIST,
    async (type: string, searchType?: number, searchText?: string) => {
        return await FetchApiGet("/api/v1/digitalsign/get_general_doc_list", {
            type,
            searchType,
            searchText,
        });
    }
);
export const GetGeneralDocListPaging = actions(GET_GENERAL_DOC_LIST, async (type: string) => {
    return await FetchApiGet("/api/v1/digitalsign/get_general_doc_list", { type, paging: 1 });
});

export const SET_GENERAL_DOC = "SET_GENERAL_DOC";
export const SetGeneralDoc = actions(
    SET_GENERAL_DOC,
    async (
        general_doc_id: number,
        title: string,
        content: string,
        code: number,
        code_no: number,
        sender: string,
        doc_reply: number
    ) => {
        return await FetchApiPost("/api/v1/digitalsign/set_general_doc", {
            general_doc_id,
            title,
            content,
            code,
            code_no,
            sender,
            doc_reply,
        });
    }
);

export const CANCEL_GENERAL_DOC = "CANCEL_GENERAL_DOC";
export const CancelGeneralDoc = actions(
    CANCEL_GENERAL_DOC,
    async (general_doc_id: number, comment: string, user_state: number) => {
        return await FetchApiPost("/api/v1/digitalsign/cancel_general_doc", {
            general_doc_id,
            comment,
            user_state,
        });
    }
);

export const GET_GENERAL_DOC_SIGN_LINE = "GET_GENERAL_DOC_SIGN_LINE";
export const GetGeneralDocSignLine = actions(
    GET_GENERAL_DOC_SIGN_LINE,
    async (general_doc_id: number) => {
        return await FetchApiGet("/api/v1/digitalsign/get_general_sign_line", { general_doc_id });
    }
);

export const SET_GENERAL_DOC_SIGN_LINE = "SET_GENERAL_DOC_SIGN_LINE";
export const SetGeneralDocSignLine = actions(
    SET_GENERAL_DOC_SIGN_LINE,
    async (general_doc_id: number, sign_line: number[], deferer_line: number[]) => {
        return await FetchApiPost("/api/v1/digitalsign/set_general_doc_sign_line", {
            general_doc_id,
            sign_line,
            deferer_line,
        });
    }
);

export const APPROVAL_GENERAL_DOC_SIGN = "APPROVAL_GENERAL_DOC_SIGN";
export const ApprovalGeneralDocSign = actions(
    APPROVAL_GENERAL_DOC_SIGN,
    async (general_doc_id: number, comment: string) => {
        return await FetchApiPost("/api/v1/digitalsign/approval_general_doc_sign", {
            general_doc_id,
            comment,
        });
    }
);

export const PREV_APPROVAL_GENERAL_DOC_SIGN = "PREV_APPROVAL_GENERAL_DOC_SIGN";
export const PrevApprovalGeneralDocSign = actions(
    PREV_APPROVAL_GENERAL_DOC_SIGN,
    async (general_doc_id: number, comment: string) => {
        return await FetchApiPost("/api/v1/digitalsign/prev_approval_general_doc_sign", {
            general_doc_id,
            comment,
        });
    }
);

export const DEFERER_GENERAL_DOC_SIGN = "DEFERER_GENERAL_DOC_SIGN";
export const DefererGeneralDocSign = actions(
    DEFERER_GENERAL_DOC_SIGN,
    async (general_doc_id: number, comment: string) => {
        return await FetchApiPost("/api/v1/digitalsign/deferer_general_doc_sign", {
            general_doc_id,
            comment,
        });
    }
);

export const REJECT_GENERAL_DOC_SIGN = "REJECT_GENERAL_DOC_SIGN";
export const RejectGeneralDocSign = actions(
    REJECT_GENERAL_DOC_SIGN,
    async (general_doc_id: number, comment: string) => {
        return await FetchApiPost("/api/v1/digitalsign/reject_general_doc_sign", {
            general_doc_id,
            comment,
        });
    }
);

export const REQUEST_GENERAL_DOC = "REQUEST_GENERAL_DOC";
export const RequestGeneralDoc = actions(
    REQUEST_GENERAL_DOC,
    async (
        general_doc_id: number,
        title: string,
        content: string,
        code: number,
        code_no: number,
        sender: string,
        doc_reply: number
    ) => {
        return await FetchApiPost("/api/v1/digitalsign/request_general_doc", {
            general_doc_id,
            title,
            content,
            code,
            code_no,
            sender,
            doc_reply,
        });
    }
);

export const RE_REQUEST_GENERAL_DOC = "RE_REQUEST_GENERAL_DOC";
export const ReRequestGeneralDoc = actions(
    RE_REQUEST_GENERAL_DOC,
    async (general_doc_id: number) => {
        return await FetchApiPost("/api/v1/digitalsign/re_request_general_doc", { general_doc_id });
    }
);

export const DELETE_GENERAL_DOC = "DELETE_GENERAL_DOC";
export const DeleteGeneralDoc = actions(DELETE_GENERAL_DOC, async (general_doc_id: number) => {
    return await FetchApiDelete("/api/v1/digitalsign/delete_general_doc", { general_doc_id });
});

export const SEND_GENERAL_DOC = "SEND_GENERAL_DOC";
export const SendGeneralDoc = actions(SEND_GENERAL_DOC, async (general_doc_id: number) => {
    return await FetchApiPost("/api/v1/digitalsign/send_general_doc", { general_doc_id });
});

export const SET_GENERAL_DOC_CODE = "SET_GENERAL_DOC_CODE";
export const SetGeneralDocCode = actions(
    SET_GENERAL_DOC_CODE,
    async (text: string, file_id: number) => {
        return await FetchApiPost("/api/v1/digitalsign/set_general_doc_code", { text, file_id });
    }
);

export const EDIT_GENERAL_DOC_CODE = "EDIT_GENERAL_DOC_CODE";
export const EditGeneralDocCode = actions(
    EDIT_GENERAL_DOC_CODE,
    async (code_id: number, code_text: string) => {
        return await FetchApiPost("/api/v1/digitalsign/edit_general_doc_code", {
            code_id,
            code_text,
        });
    }
);

export const DELETE_GENERAL_DOC_CODE = "DELETE_GENERAL_DOC_CODE";
export const DeleteGeneralDocCode = actions(DELETE_GENERAL_DOC_CODE, async (code_id: number) => {
    return await FetchApiDelete("/api/v1/digitalsign/delete_general_doc_code", { code_id });
});

export const UPLOAD_GENERAL_DOC_CODE_FILE = "UPLOAD_GENERAL_DOC_CODE_FILE";
export const UploadGeneralDocCodeFile = actions(UPLOAD_GENERAL_DOC_CODE_FILE, async (file: any) => {
    return await FetchApiPostWithFile("/api/v1/digitalsign/upload_general_doc_code_file", [file]);
});

export const REFRESH_PAGE_NUMBER = "REFRESH_PAGE_NUMBER";
export const RefreshPageNumber = actions(
    REFRESH_PAGE_NUMBER,
    async (page: number, path: string) => {
        return { payload: { page, path } };
    }
);
