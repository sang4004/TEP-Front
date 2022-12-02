import {
    FetchApiPost,
    FetchApiGet,
    FetchApiDelete,
    FetchApiPostWithFile,
    FetchApiPostWithFiles,
} from "../network";
import actions from "common_module/lib/action/creator";

export const GET_PDF_DATA = "GET_PDF_DATA";
export const GetPdfData = actions(GET_PDF_DATA, async (file_no: string) => {
    return await FetchApiGet("/api/v1/edms/pdfdata/get_pdf_data", { file_no });
});

export const SET_PDF_DATA = "SET_PDF_DATA";
export const SetPdfData = actions(
    SET_PDF_DATA,
    async (file_no: number, data: any, annotation: any) => {
        return await FetchApiPost("/api/v1/edms/pdfdata/set_pdf_data", {
            file_no,
            data,
            annotation,
        });
    }
);

export const PDF_EDIT_DOCUMENT = "PDF_EDIT_DOCUMENT";
export const PdfEditDocument = actions(
    PDF_EDIT_DOCUMENT,
    async (
        docu_no: number,
        docu_subject: string,
        stage_code: string,
        explan: string,
        plan_submit_dt: Date,
        real_submit_dt: Date,
        modify_by: string
    ) => {
        return await FetchApiPost("/api/v1/edms/pdfdata/pdf_edit_document", {
            docu_no,
            docu_subject,
            stage_code,
            explan,
            plan_submit_dt,
            real_submit_dt,
            modify_by,
        });
    }
);
export const GET_OTHER_PDF_DATA = "GET_OTHER_PDF_DATA";
export const GetOtherPdfData = actions(GET_OTHER_PDF_DATA, async (file_no: string) => {
    return await FetchApiGet("/api/v1/edms/pdfdata/get_other_pdf_data", { file_no });
});
