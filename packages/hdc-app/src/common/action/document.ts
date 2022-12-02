import {
    FetchApiPost,
    FetchApiGet,
    FetchApiDelete,
    FetchApiPostWithFile,
    FetchApiPostWithFiles,
} from "../network";
import actions from "common_module/lib/action/creator";

export const GET_EXCEL_FILE_UPLOAD_FORM = "GET_EXCEL_FILE_UPLOAD_FORM";
export const GetExcelFileUploadForm = actions(
    GET_EXCEL_FILE_UPLOAD_FORM,
    async (proj_no: number) => {
        return await FetchApiGet("/api/v1/edms/document/get_document_excel_file_upload_form", {
            proj_no,
        });
    }
);

export const GET_STAGE_CODES = "GET_STAGE_CODES";
export const GetStageCodes = actions(GET_STAGE_CODES, async () => {
    return await FetchApiGet("/api/v1/edms/document/get_stage_codes");
});

export const GET_EDMS_DOCU_MASTER_LIST = "GET_EDMS_DOCU_MASTER_LIST";
export const GetEdmsDocuMasterList = actions(GET_EDMS_DOCU_MASTER_LIST, async () => {
    return await FetchApiGet("/api/v1/edms/document/get_document_master_list");
});

export const CREATE_DOCUMENT = "CREATE_DOCUMENT";
export const CreateDocument = actions(
    CREATE_DOCUMENT,
    async (
        cate_no: number,
        docu_code: string,
        docu_subject: string,
        docu_type: string,
        explan: string,
        status: string,
        plan_submit_dt: Date,
        real_submit_dt: Date,
        plan_dates: Date[],
        actual_dates: Date[]
    ) => {
        return await FetchApiPost("/api/v1/edms/document/create_document", {
            cate_no,
            docu_code,
            docu_subject,
            docu_type,
            explan,
            status,
            plan_submit_dt,
            real_submit_dt,
            plan_dates,
            actual_dates,
        });
    }
);
export const EDIT_DOCUMENT = "EDIT_DOCUMENT";
export const EditDocument = actions(
    EDIT_DOCUMENT,
    async (
        docu_no: number,
        cate_no: number,
        docu_code: string,
        docu_subject: string,
        docu_type: string,
        explan: string,
        plan_submit_dt: Date,
        real_submit_dt: Date,
        plan_dates: Date[],
        actual_dates: Date[]
    ) => {
        return await FetchApiPost("/api/v1/edms/document/edit_document", {
            docu_no,
            cate_no,
            docu_code,
            docu_subject,
            docu_type,
            explan,
            plan_submit_dt,
            real_submit_dt,
            plan_dates,
            actual_dates,
        });
    }
);
export const GET_DOCUMENT_LIST = "GET_DOCUMENT_LIST";
export const GetDocumentList = actions(GET_DOCUMENT_LIST, async (cate_no: number) => {
    return await FetchApiGet(`/api/v1/edms/document/get_document_list`, { cate_no });
});
export const GET_DOCUMENT_DETAIL = "GET_DOCUMENT_DETAIL";
export const GetDocumentDetail = actions(GET_DOCUMENT_DETAIL, async (docu_no: number) => {
    // 문서정보를 id로 찾기
    return await FetchApiGet(`/api/v1/edms/document/get_document`, { docu_no });
});

export const DELETE_DOCUMENT = "DELETE_DOCUMENT";
export const DeleteDocument = actions(DELETE_DOCUMENT, async (docu_no: number[]) => {
    return await FetchApiDelete(`/api/v1/edms/document/delete_document`, { docu_no });
});

export const GET_DOCUMENT_MANAGER = "GET_DOCUMENT_MANAGER";
export const GetDocumentManager = actions(GET_DOCUMENT_MANAGER, async () => {
    return await FetchApiGet("/api/v1/edms/document/get_document_manager");
});

export const GET_MAIN_MIDDLE = "GET_MAIN_MIDDLE";
export const GetMainMiddle = actions(GET_MAIN_MIDDLE, async () => {
    return await FetchApiGet("/api/v1/edms/etc/get_main_middle");
});

export const GET_MAIN_BOTTOM = "GET_MAIN_BOTTOM";
export const GetMainBottom = actions(GET_MAIN_BOTTOM, async () => {
    return await FetchApiGet("/api/v1/edms/etc/get_main_bottom");
});

export const GET_DOCU_COMPARISON = "GET_DOCU_COMPARISON";
export const DocuComparison = actions(GET_DOCU_COMPARISON, async (docu_no: number) => {
    return await FetchApiGet("/api/v1/edms/document/get_docu_comparison", { docu_no });
});

export const GET_DOCU_STAGE_DATA = "GET_DOCU_STAGE_DATA";
export const GetDocuStageData = actions(GET_DOCU_STAGE_DATA, async (docu_no: number) => {
    return await FetchApiGet("/api/v1/edms/document/get_docu_stage_data", { docu_no });
});

export const GET_STAGE_TYPE = "GET_STAGE_TYPE";
export const GetStageType = actions(GET_STAGE_TYPE, async () => {
    return await FetchApiGet("/api/v1/edms/document/get_stage_type");
});
