import { AnyAction } from "redux";
import {
    DEACTIVE_CATE_MODAL,
    GET_CATEGORY_STATUS_LIST,
    GET_CATEGORY_PROJECTS,
    CREATE_CATEGORY,
    EDIT_CATEGORY,
    DELETE_CATEGORY,
    GET_CATEGORY_MANAGER,
    GET_CATEGORY_LEVEL_LIST,
    GET_CATEGORY_DETAIL,
    GET_CATEGORY_LIST,
    GET_PROJECT_CATE_LIST,
    GET_SEARCH_CATEGORY_LIST,
} from "../action";

export type edmsCategoryState = {
    edms_cate_status_list: any[];
    cate_proj_list?: any[];
    create_category_data?: any;
    edit_category_data?: any;
    category_detail?: any;
    delete_category_data?: boolean;
    cate_manager_list?: any[];
    cate_root_list?: any[];
    cate_level_list: any[];
    discipline_list?: any[];
    cate_list?: any[];
    project_cate_list: any[];
    search_category_list: any[];
};

const initialState: edmsCategoryState = {
    edms_cate_status_list: [],
    cate_proj_list: undefined,
    create_category_data: undefined,
    edit_category_data: undefined,
    category_detail: undefined,
    delete_category_data: false,
    cate_manager_list: undefined,
    cate_root_list: undefined,
    cate_level_list: [],
    discipline_list: undefined,
    cate_list: undefined,
    project_cate_list: [],
    search_category_list: [],
};

export const category = (state: edmsCategoryState = initialState, { type, payload }: AnyAction) => {
    switch (type) {
        case DEACTIVE_CATE_MODAL:
            return {
                ...state,
                create_category_data: undefined,
            };
        case GET_CATEGORY_DETAIL:
            return {
                ...state,
                category_detail: payload.data,
            };
        case GET_CATEGORY_STATUS_LIST:
            let cate_root_list: any[] = [];
            if (
                payload.data &&
                payload.data.category_list &&
                payload.data.category_list.length > 0
            ) {
                cate_root_list = [
                    ...payload.data.category_list.map((raw: any, idx: number) => {
                        return {
                            cate_no: raw.cate_no,
                            level_cate_name: `${raw.project_name} - ${raw.discipline_name} - ${raw.level_cate_name}`,
                        };
                    }),
                ];
                return {
                    ...state,
                    edit_category_data: undefined,
                    create_category_data: undefined,
                    delete_category_data: undefined,
                    edms_cate_status_list: payload.data.category_list,
                    cate_root_list: cate_root_list,
                    discipline_list: payload.data.discipline_list,
                };
            }
            return {
                ...state,
            };
        case GET_CATEGORY_PROJECTS:
            return {
                ...state,
                cate_proj_list: payload.data,
            };
        case CREATE_CATEGORY:
            return {
                ...state,
                create_category_data: payload.data,
            };
        case EDIT_CATEGORY:
            return {
                ...state,
                edit_category_data: payload.data,
            };
        case DELETE_CATEGORY:
            return {
                ...state,
                delete_category_data: payload.data,
            };
        case GET_CATEGORY_MANAGER:
            return {
                ...state,
                cate_manager_list: payload.data,
            };
        case GET_CATEGORY_LEVEL_LIST:
            return {
                ...state,
                cate_level_list: payload.data.category_list,
                discipline_list: payload.data.discipline_list,
            };
        case GET_CATEGORY_LIST:
            return {
                ...state,
                cate_list: payload.data,
            };
        case GET_PROJECT_CATE_LIST:
            return {
                ...state,
                project_cate_list: payload.data,
            };
        case GET_SEARCH_CATEGORY_LIST:
            return {
                ...state,
                search_category_list: payload.data,
            };
        default:
            return state;
    }
};
