import { ModalInfo } from "components";
import { AnyAction } from "redux";
import {
    SIGN_UP,
    LOGIN,
    HANDSHAKE,
    LOGOUT,
    CHECK_EXIST_ID,
    GET_ORGANIZATION,
    CLEAN_SIGN_UP,
    UPLOAD_PROFILE_IMG,
    UPLOAD_SIGNATURE_IMG,
    REMOVE_SIGN_IMG,
    UPLOAD_SIGN_IMG,
    APPROVE_USER,
    UPDATE_USER_DATA,
    GET_USER_INFO,
    PASSWORD_CHECK,
    PASSWORD_CHECK_EDMS,
    PASSWORD_RESET,
    GET_POSITION_LIST,
    REMOVE_USER,
    REVERT_USER,
    EDIT_POSITION,
    GET_EDMS_USER_INFO,
    UPDATE_EDMS_USER_DATA,
    GET_EDMS_ORGANIZATION,
    APPROVE_EDMS_USER,
} from "../action";

export type userState = {
    token?: string;
    id: number | null;
    userid: string;
    doc_mng: boolean;
    username?: string;
    handshaking: boolean;
    email: string;
    profile_img: string;
    signature_img: string;
    admin_level: number;
    group_id: number;
    company: number;
    groupname: string;
    user_list: object[];
    user_ids: number[];
    login_fail_reason?: string;
    groups?: object[];
    signup_exist_id: boolean;
    signup_success: boolean;
    org_list?: object[];
    user_info: object;
    edms_user_info: any;
    password_check?: boolean;
    password_check_edms?: boolean;
    password_reset?: boolean;
    position_list?: object[];
    upload_profile_img?: string;
    upload_signature_img?: string;
    upload_sign_img?: string;
    remove_fin?: boolean;
    revert_fin?: boolean;
    //EDMS
    edms_user_id?: number;
    edms_level?: number;
    edms_org_list: any;
    approve_edms_user: any;
};

const initialState: userState = {
    token: "",
    id: null,
    userid: "",
    doc_mng: false,
    username: "",
    handshaking: false,
    email: "",
    profile_img: "",
    signature_img: "",
    admin_level: -1,
    group_id: -1,
    company: -1,
    groupname: "",
    user_list: [],
    user_ids: [],
    login_fail_reason: "",
    signup_exist_id: false,
    signup_success: false,
    org_list: undefined,
    user_info: {},
    edms_user_info: undefined,
    password_check: undefined,
    password_check_edms: undefined,
    password_reset: undefined,
    position_list: undefined,
    upload_profile_img: "",
    upload_signature_img: "",
    upload_sign_img: "",
    remove_fin: undefined,
    revert_fin: undefined,
    //EDMS
    edms_user_id: undefined,
    edms_level: undefined,
    edms_org_list: undefined,
    approve_edms_user: undefined,
};

export const user = (state: userState = initialState, { type, payload }: AnyAction) => {
    switch (type) {
        case HANDSHAKE + "_LOADING":
            return {
                ...state,
                handshaking: true,
            };
        case HANDSHAKE + "_ERROR":
            return {
                ...state,
                handshaking: false,
                id: null,
                username: "",
                admin_level: -1,
                email: "",
                profile_img: "",
            };
        case GET_USER_INFO + "_LOADING":
            return {
                ...state,
                remove_fin: false,
                revert_fin: false,
            };
        case PASSWORD_CHECK:
            return {
                ...state,
                password_check: payload.data.check,
            };
        case PASSWORD_CHECK_EDMS:
            return {
                ...state,
                password_check_edms: payload.data.check,
            };
        case PASSWORD_RESET:
            if (payload.data) ModalInfo("비밀번호 초기화 완료.");
            return {
                ...state,
            };
        case APPROVE_USER:
            if (payload.data) ModalInfo("가입 승인 완료.");
            return {
                ...state,
            };
        case REMOVE_SIGN_IMG:
            if (payload.data) ModalInfo("삭제 완료");
            return {
                ...state,
                user_info: {
                    ...state.user_info,
                    sign_img: null,
                },
            };
        case UPDATE_USER_DATA:
            if (payload.data) ModalInfo("정보 수정 완료.");
            return {
                ...state,
                // user_info: { ...payload.data },
            };
        case UPDATE_EDMS_USER_DATA:
            if (payload.data) ModalInfo("정보 수정 완료.");
            return {
                ...state,
                edms_user_info: { ...payload.data },
            };
        case GET_USER_INFO:
            return {
                ...state,
                user_info: { ...payload.data },
            };
        case GET_EDMS_USER_INFO:
            return {
                ...state,
                edms_user_info: { ...payload.data },
            };
        case UPLOAD_SIGN_IMG:
            return {
                ...state,
                upload_sign_img: payload.data,
            };
        case UPLOAD_SIGNATURE_IMG:
            return {
                ...state,
                upload_signature_img: payload.data,
            };
        case UPLOAD_PROFILE_IMG:
            return {
                ...state,
                upload_profile_img: payload.data,
            };
        case HANDSHAKE:
            return {
                ...state,
                ...payload.data,
                handshaking: false,
            };
        case SIGN_UP:
            return {
                ...state,
                id: payload.id,
                username: payload.username,
                userid: payload.userid,
                signup_success: true,
            };
        case CLEAN_SIGN_UP:
            return {
                ...state,
                signup_success: false,
            };
        case LOGIN + "_LOADING":
            return {
                ...state,
                login_fail_reason: "",
            };
        case LOGIN + "_ERROR":
            return {
                ...state,
                login_fail_reason: payload.msg,
            };
        case LOGIN:
            let _user_ids = state.user_ids;
            let _user_list = state.user_list;

            if (state.user_ids?.indexOf(payload.data.id) == -1) {
                _user_ids.push(payload.data.id);
                _user_list.push({
                    ...payload.data,
                });
            }
            if (payload.data.accessToken)
                window.localStorage.setItem("access_token", payload.data.accessToken);
            if (payload.data.refreshToken)
                window.localStorage.setItem("refresh_token", payload.data.refreshToken);
            if (payload.data.edmsAccessToken)
                window.localStorage.setItem("edms_access_token", payload.data.edmsAccessToken);
            if (payload.data.edmsRefreshToken)
                window.localStorage.setItem("edms_refresh_token", payload.data.edmsRefreshToken);
            return {
                ...state,
                ...payload.data,
                user_ids: [..._user_ids],
                user_list: [..._user_list],
            };
        case LOGOUT:
            if (window.localStorage.getItem("access_token"))
                window.localStorage.setItem("access_token", "");
            if (window.localStorage.getItem("refresh_token"))
                window.localStorage.setItem("refresh_token", "");
            if (window.localStorage.getItem("edms_access_token"))
                window.localStorage.setItem("edms_access_token", "");
            if (window.localStorage.getItem("edms_refresh_token"))
                window.localStorage.setItem("edms_refresh_token", "");
            return { ...initialState };
        case CHECK_EXIST_ID:
            return {
                ...state,
                signup_exist_id: payload.data,
            };

        case GET_ORGANIZATION:
            return {
                ...state,
                org_list: payload.data,
            };
        case GET_POSITION_LIST:
            return {
                ...state,
                position_list: payload.data,
            };
        case EDIT_POSITION:
            return {
                ...state,
            };
        case REMOVE_USER:
            return {
                ...state,
                remove_fin: payload.data,
            };
        case REVERT_USER:
            return {
                ...state,
                revert_fin: payload.data,
            };
        case GET_EDMS_ORGANIZATION:
            return {
                ...state,
                edms_org_list: payload.data,
            };
        case APPROVE_EDMS_USER:
            return {
                ...state,
                approve_edms_user: payload.data,
            };
        default:
            return state;
    }
};
