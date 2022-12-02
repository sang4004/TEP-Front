import { FetchApiPost, FetchApiGet, FetchApiDelete } from "../network";
import actions from "common_module/lib/action/creator";

export const CREATE_REVIEW = "CREATE_REVIEW";
export const CreateReview = actions(
    CREATE_REVIEW,
    async (docu_no: number, file_no: number, content: string) => {
        return await FetchApiPost("/api/v1/edms/review/create_review", {
            docu_no,
            file_no,
            content,
        });
    }
);

export const GET_REVIEW_LIST = "GET_REVIEW_LIST";
export const GetReviewList = actions(GET_REVIEW_LIST, async (docu_no: number) => {
    return await FetchApiGet("/api/v1/edms/review/get_review_list", { docu_no });
});

export const CREATE_REVIEW_REPLY = "CREATE_REVIEW_REPLY";
export const CreateReviewReply = actions(
    CREATE_REVIEW_REPLY,
    async (reviewNo: number, content: string) => {
        return await FetchApiPost("/api/v1/edms/review/create_review_reply", { reviewNo, content });
    }
);

export const DELETE_REVIEW = "DELETE_REVIEWd";
export const DeleteReview = actions(DELETE_REVIEW, async () => {
    return await FetchApiDelete("/api/v1/edms/review/get_review_list", {});
});

export const DOCUMENT_ALL_REVIWE_LIST = "DOCUMENT_ALL_REVIWE_LIST";
export const DocumentAllReviweList = actions(DOCUMENT_ALL_REVIWE_LIST, async (docu_no: number) => {
    return await FetchApiGet("/api/v1/edms/review/document_all_review_list", { docu_no });
});
