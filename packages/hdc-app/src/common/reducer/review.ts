import { AnyAction } from "redux";

import {
    CREATE_REVIEW,
    GET_REVIEW_LIST,
    DELETE_REVIEW,
    CREATE_REVIEW_REPLY,
    DOCUMENT_ALL_REVIWE_LIST,
} from "../action";

export type edmsReviewState = {
    review_list: any[];
    create_review_data?: any[];
    create_review_reply_data?: any[];
    achieve_review_list: any[];
    review_docu: any;
};

const initialState: edmsReviewState = {
    review_list: [],
    create_review_data: undefined,
    create_review_reply_data: undefined,
    achieve_review_list: [],
    review_docu: undefined,
};

export const review = (state: edmsReviewState = initialState, { type, payload }: AnyAction) => {
    switch (type) {
        case GET_REVIEW_LIST + "_LOADING":
            return {
                ...state,
                create_review_data: undefined,
                create_review_reply_data: undefined,
                review_list: [],
            };
        case GET_REVIEW_LIST:
            return {
                ...state,
                review_list: payload.data,
            };
        case CREATE_REVIEW:
            return {
                ...state,
                create_review_data: payload.data,
            };
        case CREATE_REVIEW_REPLY:
            return {
                ...state,
                create_review_reply_data: payload.data,
            };
        case DOCUMENT_ALL_REVIWE_LIST:
            return {
                ...state,
                achieve_review_list: payload.data.list,
                review_docu: payload.data.document,
            };
        default:
            return state;
    }
};
