import { FetchApiPost, FetchApiGet, FetchApiPostWithFile, FetchApiDelete } from "../network";
import actions from "common_module/lib/action/creator";

export const HANDSHAKE = "HANDSHAKE";
export const Handshake = actions(HANDSHAKE, async () => {
    return await FetchApiPost("/api/v1/auth/handshake");
});

export const SIGN_UP = "SIGN_UP";
export const SignUp = actions(
    SIGN_UP,
    async (
        userid: string,
        name: string,
        pw: string,
        email: string,
        group_id: number,
        phone_number: string,
        position: string,
        company_id: number,
        type: string
    ) => {
        return await FetchApiPost("/api/v1/auth/signup", {
            userid,
            name,
            pw,
            email,
            group_id,
            phone_number,
            position,
            company_id,
            type,
        });
    }
);

export const CLEAN_SIGN_UP = "CLEAN_SIGN_UP";
export const CleanSignUp = actions(CLEAN_SIGN_UP, () => {
    return { payload: true };
});

export const LOGIN = "LOGIN";
export const Login = actions(LOGIN, async (userid: string, pw: string) => {
    return await FetchApiPost("/api/v1/auth/login", { userid, pw });
});

export const LOGOUT = "LOGOUT";
export const Logout = actions(LOGOUT, async () => {
    return await FetchApiGet("/api/v1/auth/logout");
});

export const CHECK_EXIST_ID = "CHECK_EXIST_ID";
export const CheckExistId = actions(
    CHECK_EXIST_ID,
    async (username: string, signupType: "document" | "edms") => {
        return await FetchApiGet("/api/v1/auth/duplicate", { username, signupType });
    }
);

export const GET_ORGANIZATION = "GET_ORGANIZATION";
export const GetOrganization = actions(GET_ORGANIZATION, async () => {
    return await FetchApiGet("/api/v1/organization/get_list");
});

export const UPLOAD_PROFILE_IMG = "UPLOAD_PROFILE_IMG";
export const UploadProfileImg = actions(UPLOAD_PROFILE_IMG, async (file: any) => {
    return await FetchApiPostWithFile("/api/v1/auth/upload_profile_img", [file]);
});

export const UPLOAD_SIGNATURE_IMG = "UPLOAD_SIGNATURE_IMG";
export const UploadSignatureImg = actions(UPLOAD_SIGNATURE_IMG, async (file: any) => {
    return await FetchApiPostWithFile("/api/v1/auth/upload_signature_img", [file]);
});

export const UPLOAD_SIGN_IMG = "UPLOAD_SIGN_IMG";
export const UploadSignImg = actions(UPLOAD_SIGN_IMG, async (file: any) => {
    return await FetchApiPostWithFile("/api/v1/auth/upload_sign_img", [file]);
});

export const REMOVE_SIGN_IMG = "REMOVE_SIGN_IMG";
export const RemoveSignImg = actions(REMOVE_SIGN_IMG, async (id: number) => {
    return await FetchApiDelete("/api/v1/auth/remove_sign_img", { id });
});

export const UPDATE_USER_DATA = "UPDATE_USER_DATA";
export const UpdateUserData = actions(
    UPDATE_USER_DATA,
    async (
        id: number,
        username: string,
        email: string,
        group_id: number,
        pos_id: number,
        profile_img: string,
        signature_img: string,
        user_sign_img: string,
        phone_number: string,
        fax_number: string,
        password: string,
        doc_mng: boolean,
        userid: string,
        admin_level : number,
        sub_field?: number,
        edms_use?: boolean,
    ) => {
        return await FetchApiPost("/api/v1/auth/update", {
            id,
            username,
            email,
            group_id,
            pos_id,
            profile_img,
            signature_img,
            user_sign_img,
            phone_number,
            fax_number,
            password,
            doc_mng,
            userid,
            sub_field,
            edms_use,
            admin_level
        });
    }
);

export const UPDATE_EDMS_USER_DATA = "UPDATE_EDMS_USER_DATA";
export const UpdateEdmsUserData = actions(
    UPDATE_EDMS_USER_DATA,
    async (
        id: number,
        username: string,
        email: string,
        pos_id: number,
        profile_img: string,
        password: string,
        userid: string,
        phone_number: string,
        is_use: number
    ) => {
        return await FetchApiPost("/api/v1/auth/edms_update", {
            id,
            username,
            email,
            pos_id,
            profile_img,
            password,
            userid,
            phone_number,
            is_use,
        });
    }
);

export const APPROVE_USER = "APPROVE_USER";
export const ApproveUser = actions(APPROVE_USER, async (id: number) => {
    return await FetchApiPost("/api/v1/auth/approve", { id });
});

export const REMOVE_USER = "REMOVE_USER";
export const RemoveUser = actions(REMOVE_USER, async (id: number) => {
    return await FetchApiPost("/api/v1/auth/remove", { id });
});

export const REVERT_USER = "REVERT_USER";
export const RevertUser = actions(REVERT_USER, async (id: number) => {
    return await FetchApiPost("/api/v1/auth/revert", { id });
});

export const GET_USER_INFO = "GET_USER_INFO";
export const GetUserInfo = actions(GET_USER_INFO, async (user_id: number) => {
    return await FetchApiGet("/api/v1/auth/user_info", { user_id });
});

export const GET_EDMS_USER_INFO = "GET_EDMS_USER_INFO";
export const GetEdmsUserInfo = actions(GET_EDMS_USER_INFO, async (user_id: number) => {
    return await FetchApiGet("/api/v1/auth/edms_user_info", { user_id });
});

export const PASSWORD_CHECK = "PASSWORD_CHECK";
export const PasswordCheck = actions(PASSWORD_CHECK, async (password: string) => {
    return await FetchApiPost("/api/v1/auth/password_check", { password });
});

export const PASSWORD_CHECK_EDMS = "PASSWORD_CHECK_EDMS";
export const PasswordCheckEdms = actions(PASSWORD_CHECK_EDMS, async (password: string) => {
    return await FetchApiPost("/api/v1/auth/password_check_edms", { password });
});

export const PASSWORD_RESET = "PASSWORD_RESET";
export const PasswordReset = actions(PASSWORD_RESET, async (user_id: number) => {
    return await FetchApiPost("/api/v1/auth/reset_password", { user_id });
});

export const GET_POSITION_LIST = "GET_POSITION_LIST";
export const GetPositionList = actions(GET_POSITION_LIST, async () => {
    return await FetchApiGet("/api/v1/auth/get_position");
});

export const EDIT_POSITION = "EDIT_POSITION";
export const EditPosition = actions(EDIT_POSITION, async (list: any[], new_list: any[]) => {
    return await FetchApiPost("/api/v1/auth/edit_position", { list, new_list });
});

export const GET_EDMS_ORGANIZATION = "GET_EDMS_ORGANIZATION";
export const GetEdmsOranization = actions(GET_EDMS_ORGANIZATION, async () => {
    return await FetchApiGet("/api/v1/organization/get_edms_list");
});

export const APPROVE_EDMS_USER = "APPROVE_EDMS_USER";
export const ApproveEdmsUser = actions(APPROVE_EDMS_USER, async (userId: number, type: string) => {
    return await FetchApiPost("/api/v1/auth/approve_edms_user", { userId, type });
});
