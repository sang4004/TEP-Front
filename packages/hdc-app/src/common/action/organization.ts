import { FetchApiPost, FetchApiGet, FetchApiPostWithFile } from "../network";
import actions from "common_module/lib/action/creator";

export const GET_ADDRESSBOOK = "GET_ADDRESSBOOK";
export const GetAddressbook = actions(GET_ADDRESSBOOK, async () => {
    return await FetchApiGet("/api/v1/organization/get_addressbook");
});

export const EDIT_GROUP = "EDIT_GROUP";
export const EditGroup = actions(
    EDIT_GROUP,
    async (list: any[], new_list: any[], compId: number) => {
        return await FetchApiPost("/api/v1/organization/edit_group", { list, new_list, compId });
    }
);

export const GET_EDMS_ADDRESSBOOK = "GET_EDMS_ADDRESSBOOK";
export const GetEdmsAddressbook = actions(GET_EDMS_ADDRESSBOOK, async (type?: string) => {
    return await FetchApiGet("/api/v1/organization/get_edms_address", { type });
});

export const GET_EDMS_GROUP = "GET_EDMS_GROUP";
export const GetEdmsGroup = actions(
    GET_EDMS_GROUP,
    async (company_id: number, is_mail_group?: boolean) => {
        return await FetchApiGet("/api/v1/organization/get_edms_group", {
            company_id,
            is_mail_group,
        });
    }
);

export const GET_EDMS_MAIL_ADDRESS = "GET_EDMS_MAIL_ADDRESS";
export const GetEdmsMailAddress = actions(GET_EDMS_MAIL_ADDRESS, async () => {
    return await FetchApiGet("/api/v1/organization/get_edms_mail_address");
});
