import { FetchApiGet, FetchApiPostWithFile, FetchApiPost } from "../network";
import actions from "common_module/lib/action/creator";

export const GET_MODEL_FILE_LIST = "GET_MODEL_FILE_LIST";
export const GetModelFileList = actions(GET_MODEL_FILE_LIST, async (project_no: number) => {
    return await FetchApiGet("/api/v1/edms/modelfile/get_model_file_list", { project_no });
});

export const GET_MODEL_ELEMENT_LIST = "GET_MODEL_ELEMENT_LIST";
export const GetModelElementList = actions(GET_MODEL_ELEMENT_LIST, async (imodel_id: number) => {
    return await FetchApiGet("/api/v1/digitaltwin/get_element_data_by_id", { imodel_id });
});

export const UPLOAD_MODEL_FILE = "UPLOAD_MODEL_FILE";
export const UploadModelFile = actions(
    UPLOAD_MODEL_FILE,
    async (files: any, project_no: number, subject: string, explan: string) => {
        return await FetchApiPostWithFile("/api/v1/edms/modelfile/upload_model_file", files, {
            project_no, subject, explan
        }); 
    }
);
