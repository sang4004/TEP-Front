import { AnyAction } from "redux";
import {
    GET_DOCUMENT_REVIEW_LIST,
    GET_DOCUMENT_REVIEW_CATEGORY_LIST
} from "../action";

export type edmsDocumentReviewState = {
    document_review_list : [],
    document_review_category_list : [],
};

const initialState: edmsDocumentReviewState = {
    document_review_list : [],
    document_review_category_list : [],
};

export const documentreview = (state: edmsDocumentReviewState = initialState, { type, payload }: AnyAction) => {
    switch (type) {
        case GET_DOCUMENT_REVIEW_LIST :
            return {
                ...state,
                document_review_list : payload
            }
        case GET_DOCUMENT_REVIEW_CATEGORY_LIST :
            return {
                ...state,
                document_review_category_list : payload
            }
        default:
            return state;
    }
};
