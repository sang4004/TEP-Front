import {
    FetchApiPost,
    FetchApiGet,
    FetchApiDelete,
    FetchApiPostWithFile,
    FetchApiPostWithFiles,
} from "../network";
import actions from "common_module/lib/action/creator";

export const GET_CATEGORY_STATUS_LIST = "GET_CATEGORY_STATUS_LIST";
export const GetEdmsCateStatusList = actions(GET_CATEGORY_STATUS_LIST, async () => {
    return await FetchApiGet("/api/v1/edms/category/get_category_status_list");
});

export const GET_CATEGORY_PROJECTS = "GET_CATEGORY_PROJECTS";
export const GetCategoryProjects = actions(GET_CATEGORY_PROJECTS, async () => {
    return await FetchApiGet("/api/v1/edms/category/get_category_projects");
});

export const GET_CATEGORY_MANAGER = "GET_CATEGORY_MANAGER";
export const GetCategoryManager = actions(GET_CATEGORY_MANAGER, async () => {
    return await FetchApiGet("/api/v1/edms/category/get_category_manager");
});

export const GET_CATEGORY_LEVEL_LIST = "GET_CATEGORY_LEVEL_LIST";
export const GetCategoryLevelList = actions(
    GET_CATEGORY_LEVEL_LIST,
    async (project_no?: number) => {
        return await FetchApiGet("/api/v1/edms/category/get_category_level_list", { project_no });
    }
);

export const GET_CATEGORY_DETAIL = "GET_CATEGORY_DETAIL";
export const GetCategoryDetail = actions(GET_CATEGORY_DETAIL, async (cate_no: number) => {
    return await FetchApiGet("/api/v1/edms/category/get_category", { cate_no });
});

export const GET_CATEGORY_LIST = "GET_CATEGORY_LIST";
export const GetCategoryList = actions(GET_CATEGORY_LIST, async (cate_no_list: number[]) => {
    return await FetchApiGet("/api/v1/edms/category/get_categories", { cate_no_list });
});

export const CREATE_CATEGORY = "CREATE_CATEGORY";
export const CreateCategory = actions(
    CREATE_CATEGORY,
    async (
        project_no: number,
        pcate_no: number,
        cate_code: string,
        cate_name: string,
        isVp: number,
        discipline_id: number
    ) => {
        return await FetchApiPost("/api/v1/edms/category/create_category", {
            project_no,
            pcate_no,
            cate_code,
            cate_name,
            isVp,
            discipline_id,
        });
    }
);

export const EDIT_CATEGORY = "EDIT_CATEGORY";
export const EditCategory = actions(
    EDIT_CATEGORY,
    async (
        cate_no: number,
        pcate_no: number,
        cate_code: string,
        cate_name: string,
        isVp: number,
        discipline_id: number
    ) => {
        return await FetchApiPost("/api/v1/edms/category/edit_category", {
            cate_no,
            pcate_no,
            cate_code,
            cate_name,
            isVp,
            discipline_id,
        });
    }
);

export const DELETE_CATEGORY = "DELETE_CATEGORY";
export const DeleteCategory = actions(DELETE_CATEGORY, async (cate_no: number[]) => {
    return await FetchApiPost("/api/v1/edms/category/delete_category", { cate_no });
});

//deactive modal
export const DEACTIVE_CATE_MODAL = "DEACTIVE_CATE_MODAL";
export const DeactiveCateModal = actions(DEACTIVE_CATE_MODAL, async () => {
    return { payload: true };
});

//dcl modify
export const GET_PROJECT_CATE_LIST = "GET_PROJECT_CATE_LIST";
export const GetProjectCateList = actions(GET_PROJECT_CATE_LIST, async (project_no: number) => {
    return await FetchApiGet("/api/v1/edms/category/get_project_cate_list", { project_no });
});

//검색 카테고리 리스트 is_root 상관없이 출력
export const GET_SEARCH_CATEGORY_LIST = "GET_SEARCH_CATEGORY_LIST";
export const GetSerachCategoryList = actions(GET_SEARCH_CATEGORY_LIST, async () => {
    return await FetchApiGet("/api/v1/edms/category/get_search_category_list");
});
