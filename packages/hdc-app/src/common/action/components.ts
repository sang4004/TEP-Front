import actions from "common_module/lib/action/creator";

export const CHANGE_SIGN_SELECT_MODAL = "CHANGE_SIGN_SELECT_MODAL";
export const ChangeSignSelectModal = actions(CHANGE_SIGN_SELECT_MODAL, async () => {
    return {
        payload: true,
    };
});

export const CHANGE_DOCUMENT_FORM_STATE = "CHANGE_DOCUMENT_FORM_STATE";
export const ChangeDocumentFormState = actions(
    CHANGE_DOCUMENT_FORM_STATE,
    async (state: boolean) => {
        return {
            payload: { data: state },
        };
    }
);

export const SET_TM_REVIEW_COMMENT_TEMP = "SET_TM_REVIEW_COMMENT_TEMP";
export const SetTmReviewCommentTemp = actions(
    SET_TM_REVIEW_COMMENT_TEMP,
    (originData: any, reviewList : any) => {
        return {
            payload: { data: { originData, reviewList } },
        };
    }
);
