import {
    FetchApiPost,
    FetchApiGet,
    FetchApiDelete,
    FetchApiPostWithFile,
    FetchApiPostWithFiles,
} from "../network";
import actions from "common_module/lib/action/creator";

export const COLLECT_FILE_EXCEL = "COLLECT_FILE_EXCEL";
export const CollectFileExcel = actions(
    COLLECT_FILE_EXCEL,
    async (file: any, project_no: number) => {
        return await FetchApiPostWithFile("/api/v1/edms/files/collect_file_excel", [file], {
            project_no,
        });
    }
);

export const COLLECT_FILE = "COLLECT_FILE";
export const CollectFile = actions(COLLECT_FILE, async (files: any, project_no: number) => {
    return await FetchApiPostWithFiles("/api/v1/edms/files/collect_file", files, { project_no });
});

export const COLLECT_FILE_BUILD = "COLLECT_FILE_BUILD";
export const CollectFileBuild = actions(
    COLLECT_FILE_BUILD,
    async (exFilePath: string, files?: any[], isConfirm?: boolean) => {
        return await FetchApiPost("/api/v1/edms/files/collect_file_build", {
            exFilePath,
            files,
            isConfirm,
        });
    }
);

export const COLLECT_FILE_BUILD_CLEAR = "COLLECT_FILE_BUILD_CLEAR";
export const CollectFileBuildClear = actions(COLLECT_FILE_BUILD_CLEAR, async () => {
    return { payload: true };
});

export const COLLECT_FILE_BUILD_DCL = "COLLECT_FILE_BUILD_DCL";
export const CollectFileBuildDcl = actions(
    COLLECT_FILE_BUILD_DCL,
    async (exFilePath: string, projNo: number) => {
        return await FetchApiPost("/api/v1/edms/files/collect_file_build_dcl", {
            exFilePath,
            projNo,
        });
    }
);

export const COLLECT_FILE_BUILD_VP = "COLLECT_FILE_BUILD_VP";
export const CollectFileBuildVp = actions(
    COLLECT_FILE_BUILD_VP,
    async (exFilePath: string, projNo: number) => {
        return await FetchApiPost("/api/v1/edms/files/collect_file_build_vp", {
            exFilePath,
            projNo,
        });
    }
);

export const COLLECT_FILE_BUILD_VPIS = "COLLECT_FILE_BUILD_VPIS";
export const CollectFileBuildVpis = actions(
    COLLECT_FILE_BUILD_VPIS,
    async (exFilePath: string, projNo: number) => {
        return await FetchApiPost("/api/v1/edms/files/collect_file_build_vpis", {
            exFilePath,
            projNo,
        });
    }
);

export const COLLECT_FILE_BUILD_PLANT = "COLLECT_FILE_BUILD_PLANT";
export const CollectFileBuildPlant = actions(
    COLLECT_FILE_BUILD_PLANT,
    async (exFilePath: string, projNo: number) => {
        return await FetchApiPost("/api/v1/edms/files/collect_file_build_plant", {
            exFilePath,
            projNo,
        });
    }
);

export const GET_FILE_LIST = "GET_FILE_LIST";
export const GetFileList = actions(GET_FILE_LIST, async (docu_no: number) => {
    return await FetchApiGet("/api/v1/edms/files/get_file_list", { docu_no });
});

export const GET_FILES_LIST = "GET_FILES_LIST";
export const GetFilesList = actions(GET_FILES_LIST, async (docu_no: number) => {
    return await FetchApiGet("/api/v1/edms/files/get_files_list", { docu_no });
});

export const CREATE_FILE = "CREATE_FILE";
export const CreateFile = actions(
    CREATE_FILE,
    async (
        file: any,
        //EBMSprojectBase에 있음
        project_no: number,
        //query string으로 두개
        //ex) ../detail/2/1
        cate_no: number,
        docu_no: number,
        //file_code & file_name: User가 입력
        file_code: string,
        file_name: string,
        original_file_name: string,
        //확장자명
        file_type: string,
        //버전은 서버에서 확인 후 넣어줌
        fversion: number,
        is_last_version: string,
        //
        regi_dt: Date,
        //유저 네임
        create_by: string,
        create_tm: Date,
        // weight: string
        history: string
    ) => {
        return await FetchApiPostWithFile("/api/v1/edms/files/create_file", [file], {
            project_no,
            cate_no,
            docu_no,
            file_code,
            file_name,
            original_file_name,
            file_type,
            fversion,
            is_last_version,
            regi_dt,
            create_by,
            create_tm,
            history,
            // weight,
        });
    }
);

//파일 버전별 관리 api
export const GET_FILE_HISTORY = "GET_FILE_HISTORY";
export const GetFileHistory = actions(GET_FILE_HISTORY, async (file_code: string) => {
    return await FetchApiGet("/api/v1/edms/files/get_file_history", { file_code });
});

export const GET_FILES_HISTORY = "GET_FILES_HISTORY";
export const GetFilesHistory = actions(
    GET_FILES_HISTORY,
    async (files_no: any, docu_no: number) => {
        return await FetchApiGet("/api/v1/edms/files/get_files_history", { files_no, docu_no });
    }
);
//

export const NEW_VERSION_FILE = "NEW_VERSION_FILE";
export const NewVersionFile = actions(
    NEW_VERSION_FILE,
    async (
        file: any,
        file_code: string,
        fversion: number,
        history: string,
        stage_code: string,
        docu_no: number
    ) => {
        return await FetchApiPostWithFile("/api/v1/edms/files/new_version_file", [file], {
            file_code,
            fversion,
            history,
            stage_code,
            docu_no,
        });
    }
);

export const DOWNLOAD_FILE = "DOWNLOAD_FILE";
export const DownloadFile = actions(
    DOWNLOAD_FILE,
    async (ids: number[], type: boolean, filename: string) => {
        return await FetchApiGet("/api/v1/edms/files/download_files", { ids, type, filename });
    }
);

export const GET_EXFILE = "GET_EXFILE";
export const GetExfile = actions(GET_EXFILE, async (exFilePath: string) => {
    return await FetchApiGet("/api/v1/edms/files/get_exfile_data", { exFilePath });
});

export const GET_EXFILE_DCL = "GET_EXFILE_DCL";
export const GetExfileDcl = actions(
    GET_EXFILE_DCL,
    async (exFilePath: string, project_no: number) => {
        return await FetchApiGet("/api/v1/edms/files/get_exfile_data_dcl", {
            exFilePath,
            project_no,
        });
    }
);

export const GET_EXFILE_VP = "GET_EXFILE_VP";
export const GetExfileVp = actions(
    GET_EXFILE_VP,
    async (exFilePath: string, project_no: number) => {
        return await FetchApiGet("/api/v1/edms/files/get_exfile_data_vp", {
            exFilePath,
            project_no,
        });
    }
);

export const GET_EXFILE_VPIS = "GET_EXFILE_VPIS";
export const GetExfileVpis = actions(
    GET_EXFILE_VPIS,
    async (exFilePath: string, project_no: number) => {
        return await FetchApiGet("/api/v1/edms/files/get_exfile_data_vpis", {
            exFilePath,
            project_no,
        });
    }
);

export const GET_EXFILE_PLANT = "GET_EXFILE_PLANT";
export const GetExfilePlant = actions(
    GET_EXFILE_PLANT,
    async (exFilePath: string, project_no: number) => {
        return await FetchApiGet("/api/v1/edms/files/get_exfile_data_plant", {
            exFilePath,
            project_no,
        });
    }
);

export const GET_NEW_FILE_CODE = "GET_NEW_FILE_CODE";
export const GetNewFileCode = actions(GET_NEW_FILE_CODE, async (docu_no: number) => {
    return await FetchApiGet("/api/v1/edms/files/get_now_file_code", { docu_no });
});

export const GET_FILE_DETAIL = "GET_FILE_DETAIL";
export const GetFileDetail = actions(
    GET_FILE_DETAIL,
    async (file_no: number, page_type: number) => {
        return await FetchApiGet("/api/v1/edms/files/get_file", { file_no, page_type });
    }
);

export const REVIEW_COMMENT_FILE = "REVIEW_COMMENT_FILE";
export const ReviewCommentFile = actions(
    REVIEW_COMMENT_FILE,
    async (files: any, project_no: number) => {
        return await FetchApiPostWithFiles("/api/v1/edms/files/review_comment_file", files, {
            project_no,
        });
    }
);

export const GET_REVIEW_EXFILE = "GET_REVIEW_EXFILE";
export const ReviewExfile = actions(GET_REVIEW_EXFILE, async (file_data: string) => {
    return await FetchApiGet("/api/v1/edms/files/get_review_data", { file_data });
});

export const SET_BUILD_RESULT_CLEAR = "SET_BUILD_RESULT_CLEAR";
export const SetBuildResultClear = actions(SET_BUILD_RESULT_CLEAR, async () => {
    return { payload: true };
});

export const GET_COUNT_UPLOAD_EDMS = "GET_COUNT_UPLOAD_EDMS";
export const GetCountUploadEdms = actions(GET_COUNT_UPLOAD_EDMS, async () => {
    return FetchApiGet("/api/v1/edms/files/get_count_upload_edms");
});

export const GET_NATIVE_FILE_LIST = "GET_NATIVE_FILE_LIST";
export const GetNativeFileList = actions(GET_NATIVE_FILE_LIST, async () => {
    return FetchApiGet("/api/v1/edms/files/get_native_file_list");
});

export const GET_EDMS_OTHER_FILE_LIST = "GET_EDMS_OTHER_FILE_LIST";
export const GetEdmsOtherFileList = actions(
    GET_EDMS_OTHER_FILE_LIST,
    async (file_ext?: number, search_type?: number, search_text?: string) => {
        return FetchApiGet("/api/v1/edms/files/get_edms_other_file_list", {
            file_ext,
            search_type,
            search_text,
        });
    }
);
