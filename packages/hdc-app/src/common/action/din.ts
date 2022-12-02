import {
    FetchApiPost,
    FetchApiGet,
    FetchApiDelete,
    FetchApiPostWithFile,
    FetchApiPostWithFiles,
} from "../network";
import actions from "common_module/lib/action/creator";

//참조 파일 upload_attach_files
export const UPLOAD_DIN_ATTACH_FILES = "UPLOAD_ATTACH_FILES";
export const UploadDinAttachFiles = actions(UPLOAD_DIN_ATTACH_FILES,async (files : any, wp_idx : number) => {
    return await FetchApiPostWithFiles("/api/v1/edms/work/din/upload_attach_files", files, {wp_idx});
    }
);

export const DELETE_DIN_ATTACH_FILE = "DELETE_DIN_ATTACH_FILE";
export const DeleteDinAttachFile = actions(DELETE_DIN_ATTACH_FILE, async(wat_idx : number)=>{
    return await FetchApiDelete("/api/v1/edms/work/din/delete_attach_file", {wat_idx});
});

export const GET_DIN_ATTACH_FILES = "GET_DIN_ATTACH_FILES";
export const GetDinAttachFiles = actions(GET_DIN_ATTACH_FILES, async( wp_idx : number )=>{
    return await FetchApiGet("/api/v1/edms/work/din/get_attach_files", { wp_idx });
});