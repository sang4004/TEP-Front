import { AnyAction } from "redux";

import {
    GET_WORK_ACHIEVE,
    GET_WORK_ACHIEVE_BOX_LIST,
    GET_WORK_DCL_LIST,
    GET_WORK_REVIEW_LIST,
    UPDATE_DCL_DATA,
    GET_PLANT_LIST,
    SET_PLANT_LIST,
    SET_OTHER_FILES,
    GET_VP_FOLDER_LIST,
} from "../action";

export type edmsAchieveState = {
    work_achieve_list: any[];
    work_achieve_box_list: any[];
    work_dcl_list: any[];
    work_dcl_stage: any[];
    work_review_list: any[];
    update_dcl_data: boolean;
    ext_list: any[];
    plant_list: any[];
    other_files: any[];
    folder_list: any[];
};

const initialState: edmsAchieveState = {
    work_achieve_list: [],
    work_achieve_box_list: [],
    work_dcl_list: [],
    ext_list: [],
    work_dcl_stage: [],
    work_review_list: [],
    update_dcl_data: false,
    plant_list: [],
    other_files: [],
    folder_list: [],
};

export const achieve = (state: edmsAchieveState = initialState, { type, payload }: AnyAction) => {
    switch (type) {
        case GET_WORK_ACHIEVE:
            return {
                ...state,
                work_achieve_list: payload.data,
            };
        case GET_WORK_ACHIEVE_BOX_LIST:
            return {
                ...state,
                work_achieve_box_list: payload.data,
            };
        case GET_WORK_DCL_LIST:
            return {
                ...state,
                work_dcl_list: payload.data.result ? payload.data.result : [],
                ext_list: payload.data.ext_list ? payload.data.ext_list : [],
                update_dcl_data: false,
            };
        case GET_WORK_REVIEW_LIST:
            return {
                ...state,
                work_review_list: payload.data,
            };
        case UPDATE_DCL_DATA:
            return {
                ...state,
                update_dcl_data: payload.data,
            };
        case GET_PLANT_LIST:
            return {
                ...state,
                plant_list: payload.data.result ? payload.data.result : [],
            };

        case SET_PLANT_LIST:
            let fIdx = state.plant_list.findIndex(raw => raw.plant_id == payload.data?.plant_id);
            let otherFIdx = state.other_files.findIndex(raw => raw.file_no == payload.data.file_no);
            state.plant_list[fIdx].wp_code = state.other_files[otherFIdx].wp_code;
            state.plant_list[fIdx].file_no = payload.data.file_no;
            state.plant_list[fIdx].wp_idx = state.other_files[otherFIdx].wp_idx;
            state.plant_list[fIdx].root_path = state.other_files[otherFIdx].root_path;
            state.plant_list[fIdx].subject = state.other_files[otherFIdx].subject;
            return {
                ...state,
                plant_list: [...state.plant_list],
            };
        case SET_OTHER_FILES:
            return {
                ...state,
                other_files: payload.data.other_files,
            };

        case GET_VP_FOLDER_LIST:
            return {
                ...state,
                folder_list: payload.data,
            };
        default:
            return state;
    }
};
