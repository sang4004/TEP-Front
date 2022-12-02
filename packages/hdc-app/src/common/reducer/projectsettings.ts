import { AnyAction } from "redux";

import {
    GET_STAGE_DATA,
    SET_ACTUAL_RATE,
    GET_INDEX_DATA,
    SET_INDEX_DATA,
    GET_ALL,
    GET_BLOCKED_WORK_PROC_LIST,
    GET_PROJECT_DDAY_DATA,
} from "../action";

export type edmsProjectSettingsState = {
    stage_data: any[];
    index_data?: any;
    project_list: any[];
    cate_list: any[];
    docu_list: any[];
    discipline_list: any[];
    project_dday_data: any[];
    blocked_wp_list: any[];
    stage_type_list: any[];
    dcl_cate_list: any[];
    update_stage: boolean;
};

const initialState: edmsProjectSettingsState = {
    stage_data: [],
    index_data: undefined,
    project_list: [],
    cate_list: [],
    docu_list: [],
    discipline_list: [],
    project_dday_data: [],
    blocked_wp_list: [],
    stage_type_list: [],
    dcl_cate_list: [],
    update_stage: false,
};

export const projectsettings = (
    state: edmsProjectSettingsState = initialState,
    { type, payload }: AnyAction
) => {
    switch (type) {
        //#region On LOADING
        case GET_STAGE_DATA + "_LOADING":
            return {
                ...state,
                stage_data: [],
            };
        case GET_INDEX_DATA + "_LOADING":
            return {
                ...state,
                index_data: undefined,
            };
        //#endregion
        case GET_STAGE_DATA:
            return {
                ...state,
                stage_data: payload.data,
                update_stage: false,
            };
        case GET_INDEX_DATA:
            return {
                ...state,
                index_data: payload.data,
            };
        case SET_ACTUAL_RATE:
            return {
                ...state,
                update_stage: payload.data,
            };
        case SET_INDEX_DATA:
            return {
                ...state,
                index_data: {
                    ...state.index_data,
                    ...payload.data,
                },
            };
        case GET_ALL:
            return {
                ...state,
                project_list: payload.data.proj,
                discipline_list: payload.data.discipline,
                cate_list: payload.data.cate,
                docu_list: payload.data.docu,
                stage_type_list: payload.data.stage_type,
                dcl_cate_list: payload.data.dcl_cate,
            };
        case GET_BLOCKED_WORK_PROC_LIST:
            return {
                ...state,
                blocked_wp_list: payload.data,
            };
        case GET_PROJECT_DDAY_DATA:
            return {
                ...state,
                project_dday_data: payload.data,
            };
        default:
            return state;
    }
};
