import {
    FetchApiPost,
    FetchApiGet,
    FetchApiDelete,
    FetchApiPostWithFile,
    FetchApiPostWithFiles,
} from "../network";
import actions from "common_module/lib/action/creator";

export const GET_PROJECT = "GET_PROJECT";
export const GetProject = actions(GET_PROJECT, async () => {
    return await FetchApiGet("/api/v1/edms/project/get_edms_project");
});

export const GET_PROJECT_TYPE_LIST = "GET_PROJECT_TYPE_LIST";
export const GetProjectTypeList = actions(GET_PROJECT_TYPE_LIST, async () => {
    return await FetchApiGet("/api/v1/edms/project/get_project_type_list");
});

export const GET_PROG_PROJECT_LIST = "GET_PROG_PROJECT_LIST";
export const GetEdmsProgProjectList = actions(GET_PROG_PROJECT_LIST, async () => {
    return await FetchApiGet("/api/v1/edms/project/get_prog_project_list");
});

export const GET_PROJECT_PROGRESS_RATE = "GET_PROJECT_PROGRESS_RATE";
export const GetProjectProgressRate = actions(
    GET_PROJECT_PROGRESS_RATE,
    async (proj_no: number) => {
        return await FetchApiGet("/api/v1/edms/etc/get_proj_progress_rate", { proj_no });
    }
);

export const CREATE_PROJECT = "CREATE_PROJECT";
export const CreateProject = actions(
    CREATE_PROJECT,
    async (
        project_code: string,
        project_name: string,
        explan: string,
        PM_idx: number,
        state: number,
        start_dt: Date,
        end_dt: Date,
        pproject_no: number,
        create_by: string,
        partner_company: string
    ) => {
        return await FetchApiPost("/api/v1/edms/project/create_project", {
            project_code,
            project_name,
            explan,
            PM_idx,
            state,
            start_dt,
            end_dt,
            pproject_no,
            create_by,
            partner_company,
        });
    }
);

export const GET_PROJECT_MANAGER = "GET_PROJECT_MANAGER";
export const GetProjectManager = actions(GET_PROJECT_MANAGER, async () => {
    return await FetchApiGet("/api/v1/edms/project/get_project_manager");
});

//select project
export const SET_NOW_PROJECT = "SET_NOW_PROJECT";
export const SetNowProject = actions(SET_NOW_PROJECT, async (project_no: number) => {
    return { payload: project_no };
});

//deactive modal
export const DEACTIVE_PROJ_MODAL = "DEACTIVE_PROJ_MODAL";
export const DeactiveProjModal = actions(DEACTIVE_PROJ_MODAL, async () => {
    return { payload: true };
});

export const GET_PROJECT_DETAIL = "GET_PROJECT_DETAIL";
export const GetProjectDetail = actions(GET_PROJECT_DETAIL, async (project_no: number) => {
    return await FetchApiGet("/api/v1/edms/project/get_project", { project_no });
});

export const DELETE_PROJECT = "DELETE_PROJECT";
export const DeleteProject = actions(DELETE_PROJECT, async (project_no: number[]) => {
    return await FetchApiPost("/api/v1/edms/project/delete_project", { project_no });
});

export const EDIT_PROJECT = "EDIT_PROJECT";
export const EditProject = actions(
    EDIT_PROJECT,
    async (
        project_no: number,
        project_code: number,
        project_name: string,
        explan: string,
        PM_idx: number,
        state: number,
        start_dt: Date,
        end_dt: Date,
        parent_project_no: number,
        modify_by: string,
        partner_company: string
    ) => {
        return await FetchApiPost("/api/v1/edms/project/edit_project", {
            project_no,
            project_code,
            project_name,
            explan,
            PM_idx,
            state,
            start_dt,
            end_dt,
            parent_project_no,
            modify_by,
            partner_company,
        });
    }
);

export const GET_MAIN_TOP = "GET_MAIN_TOP";
export const GetMainTop = actions(
    GET_MAIN_TOP,
    async (path: string, start: string | null = null, end: string | null = null) => {
        return await FetchApiGet("/api/v1/edms/etc/get_main_top", { path, start, end });
    }
);

//edms 회사&부서&유저 전체 리스트
export const GET_EDMS_ADDRESS = "GET_EDMS_ADDRESS";
export const GetEdmsAddress = actions(
    GET_EDMS_ADDRESS,
    async (is_org?: boolean, is_mail_user?: boolean) => {
        return await FetchApiGet("/api/v1/edms/project/get_all_edms_user_list", {
            is_org,
            is_mail_user,
        });
    }
);

//회사&부서&유저 삭제
export const DELETE_EDMS_ADDRESS = "DELETE_EDMS_ADDRESS";
export const DeleteAddress = actions(DELETE_EDMS_ADDRESS, async (id: number, type: string) => {
    return await FetchApiPost("/api/v1/edms/project/delete_edms_address", { id, type });
});

//회사 추가
export const CREATE_EDMS_COMPANY = "CREATE_EDMS_COMPANY";
export const CreateEdmsCompany = actions(CREATE_EDMS_COMPANY, async (company_name: string) => {
    return await FetchApiPost("/api/v1/edms/project/create_edms_company", { company_name });
});

//회사 수정
export const EDIT_EDMS_COMPANY = "EDIT_EDMS_COMPANY";
export const EditEdmsCompany = actions(
    EDIT_EDMS_COMPANY,
    async (company_name: string, id: number) => {
        return await FetchApiPost("/api/v1/edms/project/edit_edms_company", {
            company_name,
            id,
        });
    }
);
//부서 추가
export const CREATE_EDMS_GROUP = "CREATE_EDMS_GROUP";
export const CreateEdmsGroup = actions(
    CREATE_EDMS_GROUP,
    async (company_id: number, group_name: string, is_mail_group?: boolean) => {
        return await FetchApiPost("/api/v1/edms/project/create_edms_group", {
            company_id,
            group_name,
            is_mail_group,
        });
    }
);

//부서 수정
export const EDIT_EDMS_GROUP = "EDIT_EDMS_GROUP";
export const EditEdmsGroup = actions(
    EDIT_EDMS_GROUP,
    async (company_id: number, group_name: string, group_id: number) => {
        return await FetchApiPost("/api/v1/edms/project/edit_edms_group", {
            company_id,
            group_name,
            group_id,
        });
    }
);

//유저 추가
export const CREATE_EDMS_USER = "CREATE_EDMS_USER";
export const CreateEdmsUser = actions(
    CREATE_EDMS_USER,
    async (
        userid: string,
        userpw: string,
        username: string,
        company_id: number,
        group_id_list: number[],
        position_id: number,
        level: number,
        email: string,
        tmManager: boolean,
        phone_number: string,
        is_mail_user?: boolean,
        group_no_list?: number[]
    ) => {
        return await FetchApiPost("/api/v1/edms/project/create_edms_user", {
            userid,
            userpw,
            username,
            company_id,
            group_id_list,
            position_id,
            level,
            email,
            tmManager,
            phone_number,
            is_mail_user,
            group_no_list,
        });
    }
);

//유저 수정
export const EDIT_EDMS_USER = "EDIT_EDMS_USER";
export const EditEdmsUser = actions(
    EDIT_EDMS_USER,
    async (
        user_id: number,
        company_id: number,
        group_id: number,
        position_id: number,
        level: number,
        tmManager: boolean,
        email: string,
        phone_number: string,
        selectProjectNoList: number[],
        is_mail_user?: boolean,
        group_no_list?: number[],
        username?: string
    ) => {
        return await FetchApiPost("/api/v1/edms/project/edit_edms_user", {
            user_id,
            company_id,
            group_id,
            position_id,
            level,
            tmManager,
            email,
            phone_number,
            selectProjectNoList,
            is_mail_user,
            group_no_list,
            username,
        });
    }
);

// 조직 관리 유저 리스트
export const GET_EDMS_USER_DETAIL = "GET_EDMS_USER_DETAIL";
export const GetEdmsUserDetail = actions(GET_EDMS_USER_DETAIL, async () => {
    return await FetchApiGet("/api/v1/edms/project/get_edms_user_detail");
});

// 문서 담당자 리스트
export const GET_ALL_EDMS_DOCU_MANAGER = "GET_ALL_EDMS_DOCU_MANAGER";
export const GetAllEdmsDocuManager = actions(GET_ALL_EDMS_DOCU_MANAGER, async () => {
    return await FetchApiGet("/api/v1/edms/project/get_all_edms_docu_manager");
});

// 문서 담당자 추가
export const CREATE_DOCU_MANAGER = "CREATE_DOCU_MANAGER";
export const CreateDocuManager = actions(
    CREATE_DOCU_MANAGER,
    async (
        company_id: number,
        group_id: number,
        user_id: number,
        discipline_id: number,
        cate_no: number,
        docu_no: number
    ) => {
        return await FetchApiPost("/api/v1/edms/project/create_docu_manager", {
            company_id,
            group_id,
            user_id,
            discipline_id,
            cate_no,
            docu_no,
        });
    }
);

//문서 담당자 삭제
export const DELETE_DOCU_MANAGER = "DELETE_DOCU_MANAGER";
export const DeleteDocuManager = actions(
    DELETE_DOCU_MANAGER,
    async (
        company_id: number,
        group_id: number,
        user_id: number,
        discipline_id: number,
        cate_no: number,
        docu_no: number
    ) => {
        return await FetchApiPost("/api/v1/edms/project/delete_docu_manager", {
            company_id,
            group_id,
            user_id,
            discipline_id,
            cate_no,
            docu_no,
        });
    }
);

// 문서 담당자 페이지 리스트
export const GET_EDMS_DOCUMENT_MANAGER_LIST = "GET_EDMS_DOCUMENT_MANAGER_LIST";
export const EdmsDocumentManagerList = actions(GET_EDMS_DOCUMENT_MANAGER_LIST, async () => {
    return await FetchApiGet("/api/v1/edms/project/get_edms_document_manager_list");
});

export const UPDATE_MENU = "UPDATE_MEUN";
export const UpdateMenu = actions(
    UPDATE_MENU,
    async (user_id: number, menu_name: string, menu_state: number) => {
        return await FetchApiPost("/api/v1/edms/project/update_user_menu", {
            user_id,
            menu_name,
            menu_state,
        });
    }
);

export const GET_DISCIPLINE = "GET_DISCIPLINE";
export const GetDiscipline = actions(GET_DISCIPLINE, async () => {
    return await FetchApiGet("/api/v1/edms/project/get_edms_discipline");
});

export const GET_TFT_LOG = "GET_TFT_LOG";
export const GetTftLog = actions(
    GET_TFT_LOG,
    async (
        project_no?: number,
        search_type?: number,
        search_text?: string,
        start_date?: Date,
        end_date?: Date,
        skip?: number,
        size?: number
    ) => {
        return await FetchApiGet("/api/v1/edms/project/get_tft_log/", {
            project_no,
            search_type,
            search_text,
            start_date,
            end_date,
            skip,
            size,
        });
    }
);

export const GET_OFFICIAL_LIST = "GET_OFFICIAL_LIST";
export const GetOfficialList = actions(GET_OFFICIAL_LIST, async () => {
    return await FetchApiGet("/api/v1/edms/project/get_official_list");
});

export const CREATE_OFFICIAL_USER = "CREATE_OFFICIAL_USER";
export const CreateOfficialUser = actions(
    CREATE_OFFICIAL_USER,
    async (
        user_id: number,
        project_no: number,
        off_type: number,
        stage_type_no: number,
        off_docu_type: number
    ) => {
        return await FetchApiPost("/api/v1/edms/project/create_official_user", {
            user_id,
            project_no,
            off_type,
            stage_type_no,
            off_docu_type,
        });
    }
);

export const DELETE_OFFICIAL_USER = "DELETE_OFFICIAL_USER";
export const DeleteOfficialUser = actions(DELETE_OFFICIAL_USER, async (wtou_idx: number) => {
    return await FetchApiPost("/api/v1/edms/project/delete_official_user", { wtou_idx });
});
