import moment from "moment-timezone";
import { FetchApiGet, domain, digitalTwinDomain } from "./network";

export const getSignStatusText = (
    state: number | string,
    isRegist?: boolean,
    isRecv?: boolean,
    isRequest?: number
): string => {
    if (typeof state == "string") state = parseInt(state);
    switch (state) {
        case 0:
            return isRegist ? "접수" : "작성중";
        case 1:
            return isRegist ? "결재 중" : "결재 중";
        case 2:
            return isRegist ? "접수완료" : "결재완료";
        case 3:
            return isRecv ? "수신" : "발송";
        case 4:
            return isRequest == 1 ? "재상신" : "반려";
        case 5:
            return "결재취소";
        case 6:
            return "접수";
        case 7:
            return "재상신";
        default:
            return "";
    }
};

export const getMoment = () => {
    moment.tz.setDefault("Asia/Seoul");
    return moment;
};

const serialize = (obj: any) => {
    var str = [];
    for (var p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(
                encodeURIComponent(Array.isArray(obj[p]) ? p + "[]" : p) +
                    "=" +
                    encodeURIComponent(obj[p])
            );
        }
    return str.join("&");
};

// TODO : 일괄 다운로드 api 추가
export const getZipFileByType = async (
    type: string,
    filename: string,
    ids: number[],
    isrecent?: number
) => {
    let uri = "";
    switch (type) {
        case "document":
            uri = "/api/v1/edms/files/download_files";
            break;
        case "work":
        default:
            uri = "/api/v1/edms/work/get_zip_file";
            break;
    }
    let queryObj = { ids, filename, isrecent };
    window.open(`${domain}${uri}?${serialize(queryObj)}`, "_blank");
};

export const getExcelFileByType = async (type: string, queryObj: object) => {
    let uri = "";
    switch (type) {
        case "review_comment":
            uri = "/api/v1/edms/work/tm/get_tm_review_excel";
            break;
        case "document":
        default:
            uri = "/api/v1/edms/document/get_document_excel_file_upload_form";
            break;
    }

    window.open(`${domain}${uri}?${serialize(queryObj)}`, "_blank");
};

export const open3DModelFile = (file_path: string, file_no: number, user_id: number) => {
    if (file_path.indexOf(".dgn") != -1) {
        file_path = file_path.replace(".dgn", ".i.bim");
        var pre = windowOpenByPopup(
            `${digitalTwinDomain}?imodel=${file_path}&file_no=${file_no}&user_id=${user_id}`
        );
    }
};

export const windowOpenByPopup = (url: string) => {
    if (url.indexOf(digitalTwinDomain) != -1) {
        return alert("모델 뷰어는 현재 준비 중 입니다.\n불편을 드려 죄송합니다.");
    }
    return window.open(
        `${url}`,
        "_blank",
        "width=1080px,height=1528,toolbar=0,menubar=0,location=0,status=0,scrollbars=1,resizable=0,left=0,top=0"
    );
};

export const generateZipDownloadURI = async (
    disc_no: number[],
    cate_no: number[],
    docu_no: any[],
    user_id: number
) => {
    window.open(
        `${domain}/api/v1/edms/work/achieve/achieve_download?disc_no=${disc_no.join(
            ","
        )}&cate_no=${cate_no.join(",")}&docu_no=${docu_no.join(",")}&user_id=${user_id}`,
        "_blank"
    );
};

export const generateTrZipDownloadURI = async (queryObj: Object) => {
    let url = "/api/v1/edms/work/tm/tr_data_download";

    window.open(`${domain}${url}?${serialize(queryObj)}`, "_blank");
};

export const generateDclAchieveDownload = async (docu_no: number, user_id: number) => {
    window.open(
        `${domain}/api/v1/edms/work/achieve/dcl_achieve_download?&docu_no=${docu_no}&user_id=${user_id}`
    );
};
export const downloadOfficialDocument = async (
    id_list: number[],
    sign_type: number,
    user_id: number
) => {
    window.open(
        `${domain}/api/v1/digitalsign/download_official_document?id_list=${id_list.join(
            ","
        )}&sign_type=${sign_type}&user_id=${user_id}`,
        "_blank"
    );
};

export const downloadGeneralOfficialDocument = async (
    id_list: number[],
    sign_type: number,
    user_id: number
) => {
    window.open(
        `${domain}/api/v1/digitalsign/download_general_official_document?id_list=${id_list.join(
            ","
        )}&sign_type=${sign_type}&user_id=${user_id}`,
        "_blank"
    );
};
export const OrdinalSuffixOf = (i: number) => {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
};

export const GetTRExpiredDefaultDay = () => {
    //기한일자 설정
    let expiredDay = window.localStorage.getItem("expiredDefaultDay");
    let now = new Date();
    if (expiredDay) {
        now.setDate(now.getDate() + parseInt(expiredDay));
    }
    //
    return now;
};
