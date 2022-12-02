import {
    FetchApiPost,
    FetchApiGet,
    FetchApiDelete,
    FetchApiPostWithFile,
    FetchApiPostWithFiles,
} from "../network";
import actions from "common_module/lib/action/creator";

export const GET_WORK_ACHIEVE = "GET_WORK_ACHIEVE";
export const WorkAchieve = actions(GET_WORK_ACHIEVE, async (project_no: number) => {
    return await FetchApiGet("/api/v1/edms/work/achieve/get_work_achieve", { project_no });
});

export const GET_WORK_ACHIEVE_BOX_LIST = "GET_WORK_ACHIEVE_BOX_LIST";
export const WorkAchieveBoxList = actions(GET_WORK_ACHIEVE_BOX_LIST, async () => {
    return await FetchApiGet("/api/v1/edms/work/achieve/get_work_achieve_box_list");
});

export const GET_WORK_DCL_LIST = "GET_WORK_DCL_LIST";
export const GetWorkDclList = actions(
    GET_WORK_DCL_LIST,
    async (
        project_no: number,
        is_vp?: number,
        discipline_id?: number,
        cate_no?: number,
        docu_no?: number,
        search_type?: number,
        search_text?: string
    ) => {
        return await FetchApiGet("/api/v1/edms/work/achieve/get_work_dcl_list", {
            project_no,
            is_vp,
            discipline_id,
            cate_no,
            docu_no,
            search_type,
            search_text,
        });
    }
);

export const GET_WORK_REVIEW_LIST = "GET_WORK_REVIEW_LIST";
export const GetWorkReviewList = actions(GET_WORK_REVIEW_LIST, async () => {
    return await FetchApiGet("/api/v1/edms/work/achieve/work_review_list");
});

export const UPDATE_DCL_DATA = "UPDATE_DCL_DATA";
export const UpdateDclData = actions(
    UPDATE_DCL_DATA,
    async (
        docu_no: number,
        docu_code: string,
        cate_no: number,
        subject: string,
        wvRate: any,
        planRate: any,
        actualRate: any,
        palnDataList: any[]
    ) => {
        return await FetchApiPost("/api/v1/edms/work/achieve/update_dcl_data", {
            docu_no,
            docu_code,
            cate_no,
            subject,
            wvRate,
            planRate,
            actualRate,
            palnDataList,
        });
    }
);
export const GET_PLANT_LIST = "GET_PLANT_LIST";
export const GetPlantList = actions(
    GET_PLANT_LIST,
    async (project_no: number, search_type?: number, search_text?: string) => {
        return await FetchApiGet("/api/v1/edms/work/achieve/get_plant_list", {
            project_no,
            search_type,
            search_text,
        });
    }
);

// 데이터 자체를 넘겨주는게 아니라 인덱스만을 넘겨서 처리를 하세용
export const SET_PLANT_LIST = "SET_PLANT_LIST";
export const SetPlantList = actions(SET_PLANT_LIST, (plant_id: number, file_no: number) => {
    return { payload: { data: { plant_id, file_no } } };
});

export const SET_OTHER_FILES = "SET_OTHER_FILES";
export const SetOtherFiles = actions(SET_OTHER_FILES, (other_files: any[]) => {
    return { payload: { data: { other_files: other_files } } };
});

export const GET_VP_FOLDER_LIST = "GET_VP_FOLDER_LIST";
export const GetVpFolderList = actions(GET_VP_FOLDER_LIST, async (project_no: number) => {
    return await FetchApiGet("/api/v1/edms/work/achieve/vp_folder_list", { project_no });
});
