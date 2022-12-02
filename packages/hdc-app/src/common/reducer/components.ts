import { AnyAction } from "redux";
import {
    CHANGE_SIGN_SELECT_MODAL,
    CHANGE_DOCUMENT_FORM_STATE,
    SET_TM_REVIEW_COMMENT_TEMP,
} from "../action";

export type componentsState = {
    isOpenSignSelect: boolean;
    isOpenProjectTree: boolean;
    isOpenOrgModal: boolean;
    onlyDocument: boolean;
    tmReviewOriginTemp: any[];
    tmReviewListTemp: any[];
};

const initialState: componentsState = {
    isOpenSignSelect: false,
    isOpenProjectTree: false,
    isOpenOrgModal: false,
    onlyDocument: false,
    tmReviewOriginTemp: [],
    tmReviewListTemp: [],
};

export const components = (state: componentsState = initialState, { type, payload }: AnyAction) => {
    switch (type) {
        case CHANGE_SIGN_SELECT_MODAL:
            return {
                ...state,
                isOpenSignSelect: !state.isOpenSignSelect,
            };
        case CHANGE_DOCUMENT_FORM_STATE:
            return {
                ...state,
                onlyDocument: payload.data,
            };
        case SET_TM_REVIEW_COMMENT_TEMP:
            if (payload.data) {
                if (payload.data.originData.length == 0) {
                    return {
                        ...state,
                        tmReviewOriginTemp: [],
                        tmReviewListTemp: [],
                    };
                }
                let findIdx = state.tmReviewOriginTemp?.findIndex(
                    raw => raw.wp_idx == payload.data.originData.wp_idx
                );
                if (findIdx != -1) {
                    state.tmReviewOriginTemp[findIdx] = payload.data.originData;
                    state.tmReviewListTemp[findIdx] = payload.data.reviewList;
                    return {
                        ...state,
                        tmReviewOriginTemp: state.tmReviewOriginTemp,
                        tmReviewListTemp: state.tmReviewListTemp,
                    };
                } else {
                    return {
                        ...state,
                        tmReviewOriginTemp: [...state.tmReviewOriginTemp, payload.data.originData],
                        tmReviewListTemp: [...state.tmReviewListTemp, payload.data.reviewList],
                    };
                }
            }
            return {
                ...state,
            };
        default:
            return state;
    }
};
