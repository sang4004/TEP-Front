import { AnyAction } from "redux";

import { GET_HISTORY, SET_HISTORY } from "../action";

export interface historyType {
    path?: string;
    searchType?: number;
    searchText?: string;
    sortCol?: string;
    sort?: 0 | 1; // 내림차순, 오름차순
    nowpage?: number;
    currentPage?: number;
    pageSize?: number;
    pageTotal?: number;
    selectedNo?: number;
    selectedType?: number;
    take?: number;
    skip?: number;
    project_no?: number;
    cateNo?: number;
    docuNo?: number;
    disciplineNo?: number;
    projectTypeNo?: number;
    searchFileType?: string;
    endDate?: Date;
    startDate?: Date;
    treeitem?: any;
}

export type edmsHistoryState = {
    history: historyType[];
    current_history: historyType;
    recent_history: historyType;
    response_history: historyType;
};

const initialState: edmsHistoryState = {
    history: [],
    current_history: {},
    recent_history: {},
    response_history: {},
};

export const history = (state: edmsHistoryState = initialState, { type, payload }: AnyAction) => {
    switch (type) {
        // case GET_HISTORY + "_LOADING" :  // history action 이 발생하자마자 들어오는 곳.
        //     return {
        //         ...state,
        //     }
        // case GET_HISTORY + "_ERROR" :  // history error 가 들어오는 곳.
        //     return {
        //         ...state,
        //     }

        case GET_HISTORY:
            state.response_history = Object.assign({}, state.recent_history);
            return {
                ...state,
            };

        case SET_HISTORY:
            if (state.history.length > 0) {
                if (state.history.length > 20) state.history.shift(); // 20개까지만 쌓기

                if (state.history[state.history.length - 1].path == payload.path) {
                    Object.assign(state.history[state.history.length - 1], payload);
                    Object.assign(state.current_history, payload);
                } else {
                    state.recent_history = state.history[state.history.length - 1];
                    state.current_history = payload;
                    state.history.push(payload);
                }
            } else {
                state.current_history = payload;
                state.history.push(payload);
                state.recent_history = payload;
            }
            return {
                ...state,
            };
        default:
            return state;
    }
};
