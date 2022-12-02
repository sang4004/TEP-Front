import axios from "axios";
import { ModalError } from "components";

export const domain =
    process.env.NODE_ENV === "development"
        ? // ? 'http://mms.soonsoft.co.kr'
          "http://127.0.0.1:3002"
        : "http://tep.moornmo.com";

export const digitalTwinDomain =
    process.env.NODE_ENV == "development" ? "http://localhost:3000" : "http://tep-dt.moornmo.com";

export const pdfViewerDomain =
    process.env.NODE_ENV == "development"
        ? "http://11.11.0.201:8088/streamdocs/"
        : "http://10.10.1.22:8088/streamdocs/";
/**
 * 빈 값 여부를 확인한다.
 * @param value
 */
export const isEmpty = (value: any) => {
    if (value != undefined && value != null) {
        return false;
    } else {
        return true;
    }
};

/**
 * API 호출 기본 모듈
 * @param url API URL
 * @param params Parameter
 */
export const FetchApiGet = async (url: any, params?: any, withoutErr: boolean = false) => {
    try {
        const response = await axios({
            method: "GET",
            url: domain + url,
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            params: {
                ...params,
                access_token: window.localStorage.getItem("access_token"),
                refresh_token: window.localStorage.getItem("refresh_token"),
                edms_access_token: window.localStorage.getItem("edms_access_token"),
                edms_refresh_token: window.localStorage.getItem("edms_refresh_token"),
            },
            withCredentials: true,
        });
        // console.log("RESPONSE", response.data);

        // console.log(response.resultCode);

        if (response.data.resultCode != 200) {
            throw response.data.errorMsg;
        }

        return response.data;
    } catch (error: any) {
        if (!withoutErr)
            ModalError(
                error != ""
                    ? error
                    : `
                시스템 오류가 발생하였습니다.
                관리자에게 문의해주세요.
            `
            );
        return { resultCode: 9999, errorMessage: error };
    }
};

/**
 * API 호출 기본 모듈
 * @param url API URL
 * @param params Parameter
 */
export const FetchApiPost = async (url: any, params?: any) => {
    try {
        // Json Data를 URLSearchParams Data로 변환
        // const urlSearchParams = new URLSearchParams();
        // if (!isEmpty(params)) {
        //     Object.keys(params).forEach(key => {
        //         if (!isEmpty(params[key])) {
        //             urlSearchParams.append(key, params[key]);
        //         }
        //     });
        // }

        const access_token = window.localStorage.getItem("access_token");
        const refresh_token = window.localStorage.getItem("refresh_token");
        const edms_access_token = window.localStorage.getItem("edms_access_token");
        const edms_refresh_token = window.localStorage.getItem("edms_refresh_token");
        if (
            access_token == null &&
            edms_access_token == null &&
            url.indexOf("login") == -1 &&
            url.indexOf("signup") == -1
        )
            throw new Error("");
        if (params == undefined) params = {};
        Object.assign(params, { access_token });
        Object.assign(params, { refresh_token });
        Object.assign(params, { edms_access_token });
        Object.assign(params, { edms_refresh_token });

        const response = await axios({
            method: "POST",
            url: domain + url,
            data: params,
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            withCredentials: true,
        });

        if (response.data.resultCode != 200) {
            throw response.data.errorMsg;
        }

        return response.data;
    } catch (error: any) {
        // console.log(error);
        ModalError(
            error != ""
                ? error
                : `
            시스템 오류가 발생하였습니다.
            관리자에게 문의해주세요.
        `
        );
        return { resultCode: 9999, errorMessage: error };
    }
};

/**
 * API 호출 기본 모듈
 * @param url API URL
 * @param params Parameter
 */
export const FetchApiPostWithFile = async (url: any, files?: any[], params?: any) => {
    try {
        let formData = new FormData();
        if (params)
            Object.keys(params).forEach(key => {
                formData.append(key, params[key]);
            });

        const access_token = window.localStorage.getItem("access_token");
        const refresh_token = window.localStorage.getItem("refresh_token");
        const edms_access_token = window.localStorage.getItem("edms_access_token");
        const edms_refresh_token = window.localStorage.getItem("edms_refresh_token");
        if (access_token == null && edms_access_token == null) throw new Error("");
        formData.append("access_token", access_token ? access_token : "");
        formData.append("refresh_token", refresh_token ? refresh_token : "");
        formData.append("edms_access_token", edms_access_token ? edms_access_token : "");
        formData.append("edms_refresh_token", edms_refresh_token ? edms_refresh_token : "");
        //files append
        if (files)
            files.map((raw, idx) => {
                formData.append("file", raw);
            });
        else formData.append("file", "");
        const response = await axios({
            method: "POST",
            url: domain + url,
            data: formData,
            headers: {
                "Access-Control-Allow-Origin": "*",
                // "Content-Type": "multipart-form-data",
            },
            withCredentials: true,
        });

        if (response.data.resultCode != 200) {
            throw response.data.errorMsg;
        }

        return response.data;
    } catch (error: any) {
        // console.log(error);
        ModalError(
            error != ""
                ? error
                : `
            시스템 오류가 발생하였습니다.
            관리자에게 문의해주세요.
        `
        );
        return { resultCode: 9999, errorMessage: error };
    }
};

/**
 * API 호출 기본 모듈
 * @param url API URL
 * @param params Parameter
 */
export const FetchApiPostWithFiles = async (url: any, files?: any, params?: any) => {
    try {
        let formData = new FormData();
        if (params)
            Object.keys(params).forEach(key => {
                if (typeof params[key] == "object") {
                    formData.append(key, JSON.stringify(params[key]));
                } else {
                    formData.append(key, params[key]);
                }
            });

        const access_token = window.localStorage.getItem("access_token");
        const refresh_token = window.localStorage.getItem("refresh_token");
        const edms_access_token = window.localStorage.getItem("edms_access_token");
        const edms_refresh_token = window.localStorage.getItem("edms_refresh_token");
        if (access_token == null && edms_access_token == null) throw new Error("");
        formData.append("access_token", access_token ? access_token : "");
        formData.append("refresh_token", refresh_token ? refresh_token : "");
        formData.append("edms_access_token", edms_access_token ? edms_access_token : "");
        formData.append("edms_refresh_token", edms_refresh_token ? edms_refresh_token : "");
        for (var key of Object.keys(files)) {
            if (files[key]) {
                formData.append("file", files[key]);
            }
        }
        const response = await axios({
            method: "POST",
            url: domain + url,
            data: formData,
            headers: {
                "Access-Control-Allow-Origin": "*",
                // "Content-Type": "multipart-form-data",
            },
            withCredentials: true,
        });
        if (response.data.resultCode != 200) {
            throw response.data.errorMsg;
        }

        return response.data;
    } catch (error: any) {
        // console.log(error);
        ModalError(
            error != ""
                ? error
                : `
            시스템 오류가 발생하였습니다.
            관리자에게 문의해주세요.
        `
        );
        return { resultCode: 9999, errorMessage: error };
    }
};

/**
 * API 호출 기본 모듈
 * @param url API URL
 * @param params Parameter
 */
export const FetchApiPut = async (url: any, params?: any) => {
    try {
        // Json Data를 URLSearchParams Data로 변환
        // const urlSearchParams = new URLSearchParams();
        // if (!isEmpty(params)) {
        //     Object.keys(params).forEach(key => {
        //         if (!isEmpty(params[key])) {
        //             if (typeof params[key] == "object")
        //                 urlSearchParams.append(key, JSON.stringify(params[key]));
        //             else urlSearchParams.append(key, params[key]);
        //         }
        //     });
        // }

        const access_token = window.localStorage.getItem("access_token");
        const refresh_token = window.localStorage.getItem("refresh_token");
        const edms_access_token = window.localStorage.getItem("edms_access_token");
        const edms_refresh_token = window.localStorage.getItem("edms_refresh_token");
        if (access_token == null && edms_access_token == null) throw new Error("");
        Object.assign(params, { access_token: access_token ? access_token : "" });
        Object.assign(params, { refresh_token: refresh_token ? refresh_token : "" });
        Object.assign(params, { edms_access_token: edms_access_token ? edms_access_token : "" });
        Object.assign(params, { edms_refresh_token: edms_refresh_token ? edms_refresh_token : "" });

        const response = await axios({
            method: "PUT",
            url: domain + url,
            params: params,
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            // withCredentials : true
        });

        if (response.data.resultCode != 200) {
            throw response.data.errorMsg;
        }
        return response.data;
    } catch (error) {
        ModalError(`
            시스템 오류가 발생하였습니다.
            관리자에게 문의해주세요.
        `);
        return { resultCode: 9999, errorMessage: error };
    }
};

/**
 * API 호출 기본 모듈
 * @param url API URL
 * @param params Parameter
 */
export const FetchApiDelete = async (url: any, params?: any) => {
    try {
        // Json Data를 URLSearchParams Data로 변환
        // const urlSearchParams = new URLSearchParams();
        // if (!isEmpty(params)) {
        //     Object.keys(params).forEach(key => {
        //         if (!isEmpty(params[key])) {
        //             urlSearchParams.append(key, params[key]);
        //         }
        //     });
        // }

        const access_token = window.localStorage.getItem("access_token");
        const refresh_token = window.localStorage.getItem("refresh_token");
        const edms_access_token = window.localStorage.getItem("edms_access_token");
        const edms_refresh_token = window.localStorage.getItem("edms_refresh_token");
        if (access_token == null && edms_access_token == null) throw new Error("");
        Object.assign(params, { access_token: access_token ? access_token : "" });
        Object.assign(params, { refresh_token: refresh_token ? refresh_token : "" });
        Object.assign(params, { edms_access_token: edms_access_token ? edms_access_token : "" });
        Object.assign(params, { edms_refresh_token: edms_refresh_token ? edms_refresh_token : "" });

        const response = await axios({
            method: "DELETE",
            url: domain + url,
            params: params,
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            withCredentials: true,
        });

        if (response.data.resultCode != 200) {
            throw response.data.errorMsg;
        }
        return response.data;
    } catch (error) {
        ModalError(`
            시스템 오류가 발생하였습니다.
            관리자에게 문의해주세요.
        `);
        return { resultCode: 9999, errorMessage: error };
    }
};
