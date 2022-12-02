import { FetchApiPost, FetchApiGet, FetchApiPostWithFiles, FetchApiPostWithFile } from "../network";
import actions from "common_module/lib/action/creator";

export const CREATE_TM = "CREATE_TM";
export const CreateTm = actions(
    CREATE_TM,
    async (
        files: any,
        wp_date: Date,
        project_no: number,
        series_no: number,
        account_ym: string,
        subject: string,
        explan: string,
        approver_id: number,
        due_date: Date,
        create_by: string,
        docu_list: any,
        same_work_count: number,
        tm_no: string,
        approver_list: [],
        file_list: any,
        recvCompanyTmId: number,
        stage_type_no: number,
        referenceIdList?: number[],
        emailIdList?: number[],
        exFileList?: any[],
        forType?: number
    ) => {
        return await FetchApiPostWithFiles(`/api/v1/edms/work/create_work_proc_tm`, files, {
            wp_date,
            project_no,
            series_no,
            account_ym,
            subject,
            explan,
            approver_id,
            due_date,
            create_by,
            docu_list,
            same_work_count,
            tm_no,
            approver_list,
            file_list,
            recvCompanyTmId,
            stage_type_no,
            referenceIdList,
            emailIdList,
            exFileList,
            forType,
        });
    }
);

export const TM_REPLY = "TM_REPLY";
export const TmReply = actions(
    TM_REPLY,
    async (
        files: any,
        due_date: Date,
        approver_list: [],
        original_tm: number,
        emailIdList: number[],
        newTmCode: string,
        is_re_send: boolean
    ) => {
        return await FetchApiPostWithFiles(`/api/v1/edms/work/tm/tm_reply`, files, {
            due_date,
            approver_list,
            original_tm,
            emailIdList,
            newTmCode,
            is_re_send,
        });
    }
);

export const TM_REPLY_APPROVE = "TM_REPLY_APPROVE";
export const TmReplyApprove = actions(
    TM_REPLY_APPROVE,
    async (comment: string, check: string, wa_idx: number, wp_idx: number) => {
        return await FetchApiPost(`/api/v1/edms/work/tm/tm_reply_approve`, {
            comment,
            check,
            wa_idx,
            wp_idx,
        });
    }
);

export const GET_ORIGINAL_TM_CODE = "GET_ORIGINAL_TM_CODE";
export const GetOriginalTmCode = actions(GET_ORIGINAL_TM_CODE, async (wp_idx: number) => {
    return await FetchApiGet(`/api/v1/edms/work/tm/get_original_tm_code`, {
        wp_idx,
    });
});

export const CREATE_TM_COMMENT = "CREATE_TM_COMMENT";
export const CreateTmComment = actions(
    CREATE_TM_COMMENT,
    async (
        wp_idx: number,
        review_owner: string,
        contents: string,
        create_by: string,
        reviewer_id: number
    ) => {
        return await FetchApiPost("/api/v1/edms/work/tm/create_tm_comment", {
            wp_idx,
            review_owner,
            contents,
            create_by,
            reviewer_id,
        });
    }
);

export const APPROVAL_TM = "APPROVAL_TM";
export const ApprovalTm = actions(APPROVAL_TM, async (wp_idx: number, create_by: string) => {
    return await FetchApiPost("/api/v1/edms/work/tm/approval_tm", {
        wp_idx,
        create_by,
    });
});

export const GET_TM_DETAIL_LIST = "GET_TM_DETAIL_LIST";
export const GetTmDetailList = actions(GET_TM_DETAIL_LIST, async (wp_idx: number) => {
    return await FetchApiGet("/api/v1/edms/work/tm/get_tm_detail", { wp_idx });
});

export const GET_DOCU_REVIEW_LIST = "GET_DOCU_REVIEW_LIST";
export const GetDocuReviewList = actions(GET_DOCU_REVIEW_LIST, async (docu_no: number) => {
    return await FetchApiGet("/api/v1/edms/work/tm/get_docu_review", { docu_no });
});

export const GET_DRN_LIST = "GET_DRN_LIST";
export const GetDrnList = actions(GET_DRN_LIST, async (docu_no: number, wp_idx: number) => {
    return await FetchApiGet("/api/v1/edms/work/tm/get_drn_history", { docu_no, wp_idx });
});

export const GET_TM_CODE = "GET_TM_CODE";
export const GetTmCode = actions(
    GET_TM_CODE,
    async (
        is_reply?: boolean,
        company_name?: string,
        file_no?: any,
        project_no?: number,
        stage_type?: string
    ) => {
        return await FetchApiGet("/api/v1/edms/work/tm/get_tm_code", {
            is_reply: is_reply ? 1 : 0,
            company_name,
            file_no,
            project_no,
            stage_type,
        });
    }
);

export const CREATE_TM_APPROVER = "CREATE_TM_APPROVER";
export const CreateTmApprover = actions(
    CREATE_TM_APPROVER,
    async (wa_idx: number, approver_id_list: any) => {
        return await FetchApiPost("/api/v1/edms/work/tm/create_tm_approver", {
            wa_idx,
            approver_id_list,
        });
    }
);

export const GET_TM_CODE_LIST = "GET_TM_CODE_LIST";
export const GetTmCodeList = actions(GET_TM_CODE_LIST, async () => {
    return await FetchApiGet("/api/v1/edms/work/tm/get_all_tm_code_list");
});

export const EDIT_TM_CODE = "EDIT_TM_CODE";
export const EditTmCode = actions(
    EDIT_TM_CODE,
    async (company_id: number, startCode: string, midCode: string, lastCode: string) => {
        return await FetchApiPost("/api/v1/edms/work/tm/edit_tm_code", {
            company_id,
            startCode,
            midCode,
            lastCode,
        });
    }
);

export const TM_VERSION_FILE_LIST = "TM_VERSION_FILE_LIST";
export const TmVersionFileList = actions(
    TM_VERSION_FILE_LIST,
    async (wp_idx: number, docu_no: number) => {
        return await FetchApiGet("/api/v1/edms/work/tm/tm_version_file_list", { wp_idx, docu_no });
    }
);

export const TM_UPLOAD_VERSION_FILE = "TM_UPLOAD_VERSION_FILE";
export const TmUploadVersionFile = actions(
    TM_UPLOAD_VERSION_FILE,
    async (file: any, wp_idx: number, docu_no: number, history: string) => {
        return await FetchApiPostWithFile("/api/v1/edms/work/tm/tm_upload_version_file", [file], {
            wp_idx,
            docu_no,
            history,
        });
    }
);

export const GET_HENC_TM_HTML_DATA = "GET_HENC_TM_HTML_DATA";
export const GetHencTmHtmlData = actions(GET_HENC_TM_HTML_DATA, (wp_idx: number) => {
    return FetchApiGet("/api/v1/edms/work/tm/get_henc_tm_html_data", { wp_idx });
});

export const GET_SHINHAN_TM_HTML_DATA = "GET_SHINHAN_TM_HTML_DATA";
export const GetShinhanTmHtmlData = actions(GET_SHINHAN_TM_HTML_DATA, (wp_idx: number) => {
    return FetchApiGet("/api/v1/edms/work/tm/get_shinhan_tm_html_data", { wp_idx });
});

export const GET_TM_ALL_REVIEW = "GET_TM_ALL_REVIEW";
export const GetTmAllReview = actions(GET_TM_ALL_REVIEW, (wp_idx: number) => {
    return FetchApiGet("/api/v1/edms/work/tm/get_tm_all_review", { wp_idx });
});

export const TM_REVIEW_REGISTER = "TM_REVIEW_REGISTER";
export const TmReviewRegister = actions(
    TM_REVIEW_REGISTER,
    (wp_idx: number, reviewList: any, originData: any) => {
        return FetchApiPost("/api/v1/edms/work/tm/tm_review_register", {
            wp_idx,
            reviewList,
            originData,
        });
    }
);

export const TM_REVIEW_DELETE = "TM_REVIEW_DELETE";
export const TmReviewDelete = actions(TM_REVIEW_DELETE, (reviewList: any, data: any) => {
    return FetchApiPost("/api/v1/edms/work/tm/tm_review_delete", { reviewList, data });
});

export const GET_REFERENCE_TM_USER = "GET_REFERENCE_TM_USER";
export const GetReferenceTmUser = actions(GET_REFERENCE_TM_USER, async (wp_idx: number) => {
    return await FetchApiGet("/api/v1/edms/work/tm/get_reference_tm_user", { wp_idx });
});

export const TM_CONFIRM_REFER = "TM_CONFIRM_REFER";
export const TmConfirmRefer = actions(
    TM_CONFIRM_REFER,
    async (wp_idx: number, is_approval: boolean, comment: string) => {
        return await FetchApiPost("/api/v1/edms/work/tm/confirm_referer", {
            wp_idx,
            is_approval,
            comment,
        });
    }
);

export const CREATE_REVIEW_EXCEL = "CREATE_REVIEW_EXCEL";
export const CreateReviewExcel = actions(
    CREATE_REVIEW_EXCEL,
    async (ex_list: any[], wp_idx: number) => {
        return await FetchApiPost("/api/v1/edms/work/tm/create_review_excel", {
            ex_list,
            wp_idx,
        });
    }
);

export const CONFIRM_COMPLETE_REVIEW = "CONFIRM_COMPLETE_REVIEW";
export const ConfirmCompleteReview = actions(
    CONFIRM_COMPLETE_REVIEW,
    async (wp_idx: number, reviewer_id?: number) => {
        return await FetchApiPost("/api/v1/edms/work/tm/confirm_complete_review", {
            wp_idx,
            reviewer_id,
        });
    }
);

export const TR_NO_EXAMINE = "TR_NO_EXAMINE";
export const TrNoExamine = actions(TR_NO_EXAMINE, async (tr_no: string) => {
    return await FetchApiGet("/api/v1/edms/work/tm/tr_no_examine", { tr_no });
});
