import axios from 'axios';

import {
    ModalError
} from "components";

const domain =
process.env.NODE_ENV === 'development'
    // ? 'http://localhost:3000'
    ? 'https://lts.moornmo.com/api'
    : 'https://lts.moornmo.com/api'
    // : 'http://pop.ilts.co.kr:5500';

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
export const FetchApiGet = async (url: any, params?: any, token ?: string) => {
    try {
        const response = await axios({
            method: 'GET',
            url: domain + url,
            headers:{
                "Access-Control-Allow-Origin" : "*",
                "Authorization" : `Bearer ${token}`
            },
            params: {
                ...params
            }
            // withCredentials : true
        });
        // console.log("RESPONSE", response.data);

        // console.log(response.data.success);

        if (!response.data.success) {
            throw response.data.errorMessage;
        }

        return response.data;
    } catch (error) {
        return { resultCode: 9999, errorMessage: error };
    }
};

/**
 * API 호출 기본 모듈
 * @param url API URL
 * @param params Parameter
 */
export const FetchApiPost = async (url: any, params?: any, token ?: string) => {
    try {
        // Json Data를 URLSearchParams Data로 변환
        const urlSearchParams = new URLSearchParams();
        if (!isEmpty(params)) {
            Object.keys(params).forEach((key) => {
                if (!isEmpty(params[key])) {
                    urlSearchParams.append(key, params[key]);
                }
            });
        }

        const response = await axios({
            method: 'POST',
            url: domain + url,
            data: params,
            headers:{
                "Access-Control-Allow-Origin" : "*",
                "Authorization" : `Bearer ${token}`
            },
            // withCredentials : true
        });
        console.log("POST result ",response.data.success);

        if (!response.data.success) {
            throw response.data.errorMessage;
        }
        //login
        if(url.indexOf("login") != -1)
            response.data.username = params.username;

        return response.data;
    } catch (error) {
        // console.log(error);
        ModalError(error != "" ? error : 
        `
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
export const FetchApiPut = async (url: any, params?: any) => {
    try {
        // Json Data를 URLSearchParams Data로 변환
        const urlSearchParams = new URLSearchParams();
        if (!isEmpty(params)) {
            Object.keys(params).forEach((key) => {
                if (!isEmpty(params[key])) {
                    if(typeof params[key] == "object") 
                        urlSearchParams.append(key, JSON.stringify(params[key]));
                    else
                        urlSearchParams.append(key, params[key]);
                }
            });
        }
        const response = await axios({
            method: 'PUT',
            url: domain + url,
            data: params,
            headers:{
                "Access-Control-Allow-Origin" : "*",
            },
            // withCredentials : true
        });
        console.log(response.data.success);

        if (!response.data.success) {
            throw response.data.errorMessage;
        }
        return response.data;
    } catch (error) {
        // ModalError(`
        //     시스템 오류가 발생하였습니다.
        //     관리자에게 문의해주세요.
        // `);
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
        const urlSearchParams = new URLSearchParams();
        if (!isEmpty(params)) {
            Object.keys(params).forEach((key) => {
                if (!isEmpty(params[key])) {
                    urlSearchParams.append(key, params[key]);
                }
            });
        }

        const response = await axios({
            method: 'DELETE',
            url: domain + url,
            data: params,
            headers:{
                "Access-Control-Allow-Origin" : "*",
            },
            // withCredentials : true
        });
        console.log(response.data.success);

        if (!response.data.success) {
            throw response.data.errorMessage;
        }
        return response.data;
    } catch (error) {
        // ModalError(`
        //     시스템 오류가 발생하였습니다.
        //     관리자에게 문의해주세요.
        // `);
        return { resultCode: 9999, errorMessage: error };
    }
};
