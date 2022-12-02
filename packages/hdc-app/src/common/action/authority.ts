import { FetchApiGet, FetchApiPostWithFile, FetchApiPost, FetchApiDelete } from "../network";
import actions from "common_module/lib/action/creator";

// 문서수정 권한 가져오기
export const GET_DOCU_AUTHORITY = "GET_DOCU_AUTHORITY";
export const GetDocuAuthority = actions(GET_DOCU_AUTHORITY, async () => {
    return await FetchApiGet("/api/v1/edms/authority/get_docu_authority");
});

//사용자 권한 관리
export const GET_AUTH_LIST = "GET_AUTH_LIST";
export const GetAuthList = actions(GET_AUTH_LIST, async () => {
    return await FetchApiGet("/api/v1/edms/authority/get_auth_list");
});

export const EDIT_AUTH = "EDIT_AUTH";
export const EditAuth = actions(
    EDIT_AUTH,
    async (
        auth_list: any[],
        readAuth: boolean,
        writeAuth: boolean,
        downloadAuth: boolean,
        deleteAuth: boolean,
        company_id: number,
        group_id: number,
        user_id: number
    ) => {
        return await FetchApiPost("/api/v1/edms/authority/edit_auth", {
            auth_list,
            readAuth,
            writeAuth,
            downloadAuth,
            deleteAuth,
            company_id,
            group_id,
            user_id,
        });
    }
);

export const DELETE_AUTH = "DELETE_AUTH";
export const DeleteAuth = actions(DELETE_AUTH, async (auth_ids: number) => {
    return await FetchApiDelete("/api/v1/edms/authority/delete_auth", { auth_ids });
});
