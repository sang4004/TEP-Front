import {
    FetchApiPost,
    FetchApiGet,
    FetchApiDelete,
    FetchApiPostWithFile,
    FetchApiPostWithFiles,
} from "../network";
import actions from "common_module/lib/action/creator";

export const GET_DISCIPLINE_LIST = "GET_DISCIPLINE_LIST";
export const GetDisciplineList = actions(GET_DISCIPLINE_LIST, async () => {
    return await FetchApiGet("/api/v1/edms/discipline/get_discipline_list");
});

export const CREATE_DISCIPLINE = "CREATE_DISCIPLINE";
export const CreateDiscipline = actions(
    CREATE_DISCIPLINE,
    async (project_no: number, name: string, code: string, is_vp: number) => {
        return await FetchApiPost("/api/v1/edms/discipline/create_discipline", {
            project_no,
            name,
            code,
            is_vp,
        });
    }
);

export const EDIT_DISCIPLINE = "EDIT_DISCIPLINE";
export const EditDiscipline = actions(
    EDIT_DISCIPLINE,
    async (discipline_id: number, name: string, code: string, is_vp: number) => {
        return await FetchApiPost("/api/v1/edms/discipline/edit_discipline", {
            discipline_id,
            name,
            code,
            is_vp,
        });
    }
);

export const DELETE_DISCIPLINE = "DELETE_DISCIPLINE";
export const DeleteDiscipline = actions(DELETE_DISCIPLINE, async (discipline_id: number[]) => {
    return await FetchApiPost("/api/v1/edms/discipline/delete_discipline", { discipline_id });
});

//deactive modal
export const DEACTIVE_DISCIPLINE_MODAL = "DEACTIVE_DISCIPLINE_MODAL";
export const DeactiveDisciplineModal = actions(DEACTIVE_DISCIPLINE_MODAL, async () => {
    return { payload: true };
});
