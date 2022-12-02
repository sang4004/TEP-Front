import { AnyAction } from "redux";

import { GET_PDF_DATA, PDF_EDIT_DOCUMENT, GET_OTHER_PDF_DATA } from "../action";

export type edmsPDFDataState = {
    pdf_data?: any;
    pdf_edit_document?: any;
};

const initialState: edmsPDFDataState = {
    pdf_data: undefined,
    pdf_edit_document: undefined,
};

export const pdfdata = (state: edmsPDFDataState = initialState, { type, payload }: AnyAction) => {
    switch (type) {
        case GET_PDF_DATA + "_LOADING":
            return {
                ...state,
                pdf_data: undefined,
            };
        case GET_PDF_DATA:
            return {
                ...state,
                pdf_data: payload.data,
            };
        case PDF_EDIT_DOCUMENT:
            return {
                ...state,
                pdf_edit_document: payload.data,
            };
        case GET_OTHER_PDF_DATA:
            return {
                ...state,
                pdf_data: payload.data,
            };
        default:
            return state;
    }
};
