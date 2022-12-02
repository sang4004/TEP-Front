import { AnyAction } from "redux";
import {
    GET_PROJECT,
    DEACTIVE_PROJ_MODAL,
    GET_PROG_PROJECT_LIST,
    GET_PROJECT_TYPE_LIST,
    CREATE_PROJECT,
    GET_PROJECT_MANAGER,
    SET_NOW_PROJECT,
    GET_PROJECT_DETAIL,
    DELETE_PROJECT,
    EDIT_PROJECT,
    GET_PROJECT_PROGRESS_RATE,
    GET_MAIN_TOP,
    GET_EDMS_ADDRESS,
    DELETE_EDMS_ADDRESS,
    CREATE_EDMS_COMPANY,
    EDIT_EDMS_COMPANY,
    CREATE_EDMS_GROUP,
    EDIT_EDMS_GROUP,
    CREATE_EDMS_USER,
    EDIT_EDMS_USER,
    GET_EDMS_USER_DETAIL,
    GET_ALL_EDMS_DOCU_MANAGER,
    CREATE_DOCU_MANAGER,
    DELETE_DOCU_MANAGER,
    GET_EDMS_DOCUMENT_MANAGER_LIST,
    UPDATE_MENU,
    GET_DISCIPLINE,
    GET_TFT_LOG,
    GET_OFFICIAL_LIST,
    CREATE_OFFICIAL_USER,
    DELETE_OFFICIAL_USER,
} from "../action";

export type edmsProjectsState = {
    project_list: any[];
    project_type_list: any[];
    get_prog_project_list: any[];
    create_project_data?: any;
    project_manager_list?: any[];
    now_project_no?: any;
    project_detail?: any;
    delete_project_data?: boolean;
    edit_project_data?: any;
    project_progress_rate?: number;
    main_top_info?: any;
    edms_user_list: any[];
    edms_company_list: any[];
    edms_group_list: any[];
    edms_position_list: any[];
    delete_address_data: any;
    create_edms_company?: any;
    edit_edms_company?: any;
    create_edms_group?: any;
    edit_edms_group?: any;
    create_edms_user?: any;
    edit_edms_user?: any;
    edms_user_detail_list: any[];
    filtered_company_list: any[];
    edms_docu_manager_list: any[];
    create_docu_manager?: any;
    delete_docu_manager?: any;
    docu_manager_page_list: any[];
    update_edms_user_menu?: any;
    discipline_list: any[];
    drn_flag: boolean;
    tft_log_list: any[];
    group_mail_list: any[];
    official_list: any;
    create_official_user?: any;
    delete_official_user?: any;
};

const initialState: edmsProjectsState = {
    project_list: [],
    project_type_list: [],
    get_prog_project_list: [],
    create_project_data: undefined,
    project_manager_list: undefined,
    now_project_no: undefined,
    project_detail: undefined,
    delete_project_data: false,
    edit_project_data: undefined,
    project_progress_rate: 0,
    main_top_info: undefined,
    edms_user_list: [],
    edms_company_list: [],
    edms_group_list: [],
    edms_position_list: [],
    delete_address_data: undefined,
    create_edms_company: undefined,
    edit_edms_company: undefined,
    create_edms_group: undefined,
    edit_edms_group: undefined,
    create_edms_user: undefined,
    edit_edms_user: undefined,
    edms_user_detail_list: [],
    filtered_company_list: [],
    edms_docu_manager_list: [],
    create_docu_manager: undefined,
    delete_docu_manager: undefined,
    docu_manager_page_list: [],
    update_edms_user_menu: undefined,
    discipline_list: [],
    drn_flag: true,
    tft_log_list: [],
    group_mail_list: [],
    official_list: null,
    create_official_user: undefined,
    delete_official_user: undefined,
};

export const project = (state: edmsProjectsState = initialState, { type, payload }: AnyAction) => {
    switch (type) {
        case GET_PROJECT:
            return {
                ...state,
                project_list : payload.data
            }
        case DEACTIVE_PROJ_MODAL:
            return {
                ...state,
                create_project_data: undefined,
            };
        case GET_PROJECT_PROGRESS_RATE:
            return {
                ...state,
                project_progress_rate: payload.data ? payload.data.rate : 0,
            };
        case SET_NOW_PROJECT:
            return {
                ...state,
                now_project_no: payload,
            };
        case CREATE_PROJECT:
            return {
                ...state,
                create_project_data: payload.data,
            };
        case GET_PROG_PROJECT_LIST:
            return {
                ...state,
                create_project_data: undefined,
                edit_project_data: undefined,
                delete_project_data: undefined,
                get_prog_project_list: payload.data,
            };
        case GET_PROJECT_TYPE_LIST:
            return {
                ...state,
                project_type_list: payload.data,
            };
        case GET_PROJECT_MANAGER:
            return {
                ...state,
                project_manager_list: payload.data,
            };
        case GET_PROJECT_DETAIL:
            return {
                ...state,
                project_detail: payload.data,
            };
        case DELETE_PROJECT:
            return {
                ...state,
                delete_project_data: payload.data,
            };
        case EDIT_PROJECT:
            return {
                ...state,
                edit_project_data: payload.data,
            };
        case GET_MAIN_TOP:
            return {
                ...state,
                main_top_info: payload.data.datas,
                drn_flag: payload.data.is_drn_flag,
            };
        case GET_EDMS_ADDRESS:
            return {
                ...state,
                edms_user_list: payload.data.user,
                edms_company_list: payload.data.company,
                edms_group_list: payload.data.group,
                edms_position_list: payload.data.position,
                filtered_company_list: payload.data.filtered_company,
                group_mail_list: payload.data.group_mail,
                create_edms_company: undefined,
                edit_edms_company: undefined,
                create_edms_group: undefined,
                edit_edms_group: undefined,
                create_edms_user: undefined,
                edit_edms_user: undefined,
                update_edms_user_menu: undefined,
            };
        case DELETE_EDMS_ADDRESS:
            return {
                ...state,
                delete_address_data: payload.data,
            };
        case CREATE_EDMS_COMPANY:
            return {
                ...state,
                create_edms_company: payload.data,
            };
        case EDIT_EDMS_COMPANY:
            return {
                ...state,
                edit_edms_company: payload.data,
            };
        case CREATE_EDMS_GROUP:
            return {
                ...state,
                create_edms_group: payload.data,
            };
        case EDIT_EDMS_GROUP:
            return {
                ...state,
                edit_edms_group: payload.data,
            };
        case CREATE_EDMS_USER:
            return {
                ...state,
                create_edms_user: payload.data,
            };
        case EDIT_EDMS_USER:
            return {
                ...state,
                edit_edms_user: payload.data,
            };
        case GET_EDMS_USER_DETAIL:
            return {
                ...state,
                edms_user_detail_list: payload.data,
            };
        case GET_ALL_EDMS_DOCU_MANAGER:
            return {
                ...state,
                edms_docu_manager_list: payload.data,
                create_docu_manager: undefined,
                delete_docu_manager: undefined,
            };
        case CREATE_DOCU_MANAGER:
            return {
                ...state,
                create_docu_manager: payload.data,
            };
        case DELETE_DOCU_MANAGER:
            return {
                ...state,
                delete_docu_manager: payload.data,
            };
        case GET_EDMS_DOCUMENT_MANAGER_LIST:
            return {
                ...state,
                docu_manager_page_list: payload.data,
                create_docu_manager: undefined,
                delete_docu_manager: undefined,
            };
        case UPDATE_MENU:
            return {
                ...state,
                update_edms_user_menu: payload.data,
            };
        case GET_DISCIPLINE:
            return {
                ...state,
                discipline_list: payload.data,
            };
        case GET_TFT_LOG:
            return {
                ...state,
                tft_log_list: payload.data,
            };
        case GET_OFFICIAL_LIST:
            return {
                ...state,
                official_list: payload.data,
                create_official_user: undefined,
                delete_official_user: undefined,
            };
        case CREATE_OFFICIAL_USER:
            return {
                ...state,
                create_official_user: payload.data,
            };
        case DELETE_OFFICIAL_USER:
            return {
                ...state,
                delete_official_user: payload.data,
            };
        default:
            return state;
    }
};
