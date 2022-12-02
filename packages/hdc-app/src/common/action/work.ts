import {
    FetchApiPost,
    FetchApiGet,
    FetchApiDelete,
    FetchApiPostWithFile,
    FetchApiPostWithFiles,
} from "../network";
import actions from "common_module/lib/action/creator";

//DIN, DRN, TM list
export const GET_WORK_PROC_LIST = "GET_WORK_PROC_LIST";
export const GetWorkProcList = actions(
    GET_WORK_PROC_LIST,
    async (
        work_type_val: number,
        wp_type: string,
        project_no?: number,
        is_fin?: number,
        search_type?: number,
        search_text?: string,
        start_date?: Date,
        end_date?: Date,
        skip?: number,
        size?: number
    ) => {
        return await FetchApiGet("/api/v1/edms/work/get_work_proc_list", {
            work_type_val,
            wp_type,
            project_no,
            is_fin,
            search_type,
            search_text,
            start_date,
            end_date,
            skip,
            size,
        });
    }
);

//송신함
export const GET_WORK_SEND_LIST = "GET_WORK_SEND_LIST";
export const GetWorkSendList = actions(GET_WORK_SEND_LIST, async (project_no: number) => {
    return await FetchApiGet("/api/v1/edms/work/sr/get_send_list", { project_no });
});

// 수신함
export const GET_WORK_RECEPTION_LIST = "GET_WORK_RECEPTION_LIST";
export const GetWorkRecoptionList = actions(GET_WORK_RECEPTION_LIST, async (project_no: number) => {
    return await FetchApiGet("/api/v1/edms/work/sr/get_recv_list", { project_no });
});

export const CREATE_WORK_PROC = "CREATE_WORK_PROC";
export const CreateWorkProc = actions(
    CREATE_WORK_PROC,
    async (
        wp_type: string,
        wp_date: Date,
        project_no: number,
        project_code: string,
        series_no: number,
        account_ym: string,
        subject: string,
        explan: string,
        approver_id: number,
        due_date: Date,
        create_by: string,
        file_list: [],
        same_work_count: number,
        // deploy_users : [],
        approval_users: [],
        stage_no: number,
        approverId: [],
        workCodeCount: string
    ) => {
        let url = `/api/v1/edms/work/create_work_proc_${wp_type.toLowerCase()}`;
        return await FetchApiPost(url, {
            wp_type,
            wp_date,
            project_no,
            project_code,
            series_no,
            account_ym,
            subject,
            explan,
            approver_id,
            due_date,
            create_by,
            file_list,
            same_work_count,
            // deploy_users,
            approval_users,
            stage_no,
            approverId,
            workCodeCount,
        });
    }
);

export const SET_WORK_ASSIGN = "SET_WORK_ASSIGN";
export const SetWorkAssign = actions(
    SET_WORK_ASSIGN,
    async (wp_idx: number, assign_line: number[]) => {
        return await FetchApiPost("/api/v1/edms/work/set_work_assign", { wp_idx, assign_line });
    }
);

export const SET_WORK_DEPLOY = "SET_WORK_DEPLOY";
export const SetWorkDeploy = actions(
    SET_WORK_DEPLOY,
    async (wp_idx: number, deploy_line: number[]) => {
        return await FetchApiPost("/api/v1/edms/work/set_work_deploy", { wp_idx, deploy_line });
    }
);

export const APPROVE_WORK_ASSIGN = "APPROVE_WORK_ASSIGN";
export const ApproveWorkAssign = actions(
    APPROVE_WORK_ASSIGN,
    async (
        wa_idx: number,
        comment: number,
        type: string,
        work_type: string,
        wp_idx: number,
        reason?: string
    ) => {
        return await FetchApiPost("/api/v1/edms/work/approve_work_assign", {
            wa_idx,
            comment,
            type,
            work_type,
            wp_idx,
            reason,
        });
    }
);

//한번에 결재하는 Api
export const ALL_APPROVE_WORK_ASSIGN = "ALL_APPROVE_WORK_ASSIGN";
export const AllApprovalWorkAssign = actions(
    ALL_APPROVE_WORK_ASSIGN,
    async (wp_idx_list: any[], type: string, reason?: string) => {
        return await FetchApiPost("/api/v1/edms/work/all_approval_work_assign", {
            wp_idx_list,
            type,
            reason,
        });
    }
);

export const REPLY_WORK_ASSIGN = "REPLY_WORK_ASSIGN";
export const ReplyWorkAssign = actions(
    REPLY_WORK_ASSIGN,
    async (
        file: any,
        wa_idx: number,
        comment: number,
        completeType: number,
        workType: string,
        startDate?: Date,
        endDate?: Date
    ) => {
        return await FetchApiPostWithFile("/api/v1/edms/work/reply_work_assign", [file], {
            wa_idx,
            comment,
            completeType,
            workType,
            startDate,
            endDate,
        });
    }
);

export const REQUEST_WORK_ASSIGN = "REQUEST_WORK_ASSIGN";
export const RequestWorkSign = actions(REQUEST_WORK_ASSIGN, async (wa_idx: number) => {
    return await FetchApiPost("/api/v1/edms/work/request_work_assign", { wa_idx });
});

export const REJECT_WORK_ASSIGN = "REJECT_WORK_ASSIGN";
export const RejectWorkSign = actions(REJECT_WORK_ASSIGN, async (wa_idx: number) => {
    return await FetchApiPost("/api/v1/edms/work/reject_work_assign", { wa_idx });
});

export const CREATE_WORK_TMP_BOX = "CREATE_WORK_TMP_BOX";
export const CreateWorkTmpBox = actions(CREATE_WORK_TMP_BOX, async (docu_list: any[]) => {
    return await FetchApiPost("/api/v1/edms/work/create_work_tmp_box", { docu_list });
});

export const DEACTIVE_WORK_MODAL = "DEACTIVE_WORK_MODAL";
export const DeactiveWorkModal = actions(DEACTIVE_WORK_MODAL, async () => {
    return { payload: true };
});

export const GET_WORK_DOCU_LIST = "GET_WORK_DOCU_LIST";
export const GetWorkDocuList = actions(GET_WORK_DOCU_LIST, async (wp_idx_list: number[]) => {
    return FetchApiGet("/api/v1/edms/work/get_work_docu_list", { wp_idx_list });
});

export const GET_WORK_TMP_BOX_LIST = "GET_WORK_TMP_BOX_LIST";
export const GetWorkTmpBoxList = actions(
    GET_WORK_TMP_BOX_LIST,
    async (
        is_delete_box?: string,
        paging?: boolean,
        skip?: number,
        size?: number,
        project_type_no?: number,
        cate_no?: number,
        docu_no?: number,
        selected_type?: number,
        search_data?: string
    ) => {
        return FetchApiGet("/api/v1/edms/work/get_work_tmp_box_list", {
            is_delete_box,
            paging,
            skip,
            size,
            project_type_no,
            cate_no,
            docu_no,
            selected_type,
            search_data,
        });
    }
);

export const DELETE_TMP_BOX = "DELETE_TMP_BOX";
export const DeleteTmpBox = actions(DELETE_TMP_BOX, async (docu_no_list: number[]) => {
    return FetchApiPost("/api/v1/edms/work/delete_tmp_box", { docu_no_list });
});

export const GET_WORK_PROC = "GET_WORK_PROC";
export const GetWorkProc = actions(GET_WORK_PROC, async (wp_idx: number) => {
    return await FetchApiGet("/api/v1/edms/work/get_work_proc", { wp_idx });
});

// ids : 임시문서함 wtb_idx 리스트
export const GET_REVISION_INFO = "GET_REVISION_INFO";
export const GetRevisionInfo = actions(GET_REVISION_INFO, async (ids: number[]) => {
    return await FetchApiGet("/api/v1/edms/work/get_revision_info", { ids });
});

/* 
    ids : 임시문서함 wtb_idx 리스트 
    stage : stage string
    revision_num : 변경후 리비전 번호 (숫자)
    content : 히스토리 text
*/
export const REVISION_PROCESS = "REVISION_PROCESS";
export const RevisionProcess = actions(
    REVISION_PROCESS,
    async (ids: number[], stage: string, revision_num: number, content: string) => {
        return await FetchApiPost("/api/v1/edms/work/revision_process", {
            ids,
            stage,
            revision_num,
            content,
        });
    }
);

export const GET_WORK_CODE = "GET_WORK_CODE";
export const WorkCode = actions(GET_WORK_CODE, async (wp_type: string) => {
    return await FetchApiGet("/api/v1/edms/work/get_work_code", { wp_type });
});

export const CREATE_LIST_TMP_BOX = "CREATE_LIST_TMP_BOX";
export const CreateListTmpBox = actions(CREATE_LIST_TMP_BOX, async (docu_no: number[]) => {
    return await FetchApiPost("/api/v1/edms/work/create_list_tmp_box", { docu_no });
});

export const CREATE_MY_DOCUMENT = "CREATE_MY_DOCUMENT";
export const CreateMyDocument = actions(
    CREATE_MY_DOCUMENT,
    async (
        // docu
        create_by: string,
        project_no: number,
        discipline_id: number,
        cate_no: number,
        docu_type: string,
        docu_subject: string,
        explan: string,
        docu_code: string,
        stage_code: string,
        status: string,
        plan_submit_dt: Date,
        real_submit_dt: Date,
        plan_dates: Date[],
        actual_dates: Date[],
        stages: string[],
        // file
        files: any,
        fileTypes: string[],
        is_last_version: string,
        regi_dt: Date,
        fversion: number,
        docuNo: number
        //
        // weight: string,
        // process_code: string,
    ) => {
        return await FetchApiPostWithFiles(
            "/api/v1/edms/work/mydocument/create_mydocument",
            files,
            {
                create_by,
                project_no,
                discipline_id,
                cate_no,
                docu_type,
                docu_subject,
                explan,
                docu_code,
                stage_code,
                status,
                plan_submit_dt,
                real_submit_dt,
                plan_dates,
                actual_dates,
                stage_list: stages,
                fileTypes: fileTypes,
                is_last_version,
                regi_dt,
                fversion,
                docuNo,
                //
                // weight,
                // process_code,
            }
        );
    }
);

export const GET_MAIN_MY_TASK_LIST = "GET_MAIN_MY_TASK_LIST";
export const GetMainMyTaskList = actions(
    GET_MAIN_MY_TASK_LIST,
    async (
        type: string | null = null,
        start: string | null = null,
        end: string | null = null,
        keyword: string | null = null,
        orderType: number | null = null
    ) => {
        return await FetchApiGet("/api/v1/edms/etc/get_main_my_task_list", {
            type,
            start,
            end,
            keyword,
            orderType,
        });
    }
);

export const GET_MAIN_CHART_LIST = "GET_MAIN_CHART_LIST";
export const GetMainChartList = actions(
    GET_MAIN_CHART_LIST,
    async (start: string | null = null, end: string | null = null) => {
        return await FetchApiGet("/api/v1/edms/etc/get_main_chart_list", { start, end });
    }
);

export const GET_DOCUMENT_AUTH_USER = "GET_DOCUMENT_AUTH_USER";
export const GetDocumentAuthUser = actions(GET_DOCUMENT_AUTH_USER, async (docu_list: any) => {
    return await FetchApiGet("/api/v1/edms/document/get_document_auth_user", { docu_list });
});

export const EDIT_STAGE_CODE = "EDIT_STAGE_CODE";
export const EditStageCode = actions(EDIT_STAGE_CODE, async (noList: number[], stage: string) => {
    return await FetchApiPost("/api/v1/edms/work/mydocument/edit_stage_code", { noList, stage });
});

export const WORK_PROC_DETAIL = "WORK_PROC_DETAIL";
export const WorkProcDetail = actions(WORK_PROC_DETAIL, async (wp_idx: number, type: string) => {
    return await FetchApiGet("/api/v1/edms/work/work_proc_detail", { wp_idx, type });
});

export const DEPLOY_TM_DRN = "DEPLOY_TM_DRN";
export const DeployTmDrn = actions(
    DEPLOY_TM_DRN,
    async (
        wp_idx: number,
        due_date: Date,
        is_approve: boolean,
        comment: string,
        docuManagerIdList?: any[],
        mail_groups?: number[]
    ) => {
        return await FetchApiPost("/api/v1/edms/work/deploy_tm_drn", {
            wp_idx,
            due_date,
            is_approve,
            comment,
            docuManagerIdList,
            mail_groups,
        });
    }
);

export const DEPLOY_TM_DRN_CLEAN = "DEPLOY_TM_DRN_CLEAN";
export const DeployTmDrnClean = actions(DEPLOY_TM_DRN_CLEAN, async () => {
    return { payload: true };
});

// 참조처에 TM 검토 요청
export const REQUEST_TM_REFERER = "REQUEST_TM_REFERER";
export const RequestTmReferer = actions(REQUEST_TM_REFERER, async (wp_idx: number) => {
    return await FetchApiPost("/api/v1/edms/work/tm/request_tm_referer", { wp_idx });
});

export const GET_ORIGINAL_TM = "GET_ORIGINAL_TM";
export const GetOriginalTm = actions(GET_ORIGINAL_TM, async (original_tm_id: number) => {
    return await FetchApiGet("/api/v1/edms/work/get_original_tm", { original_tm_id });
});

// delete_mydocument_files
export const DELETE_MYDOCUMENT_FILES = "DELETE_MYDOCUMENT_FILES";
export const DeleteMydocumentFiles = actions(
    DELETE_MYDOCUMENT_FILES,
    async (docu_data_list: any[], is_delete?: boolean) => {
        return await FetchApiPost("/api/v1/edms/work/delete_mydocument_files", {
            docu_data_list,
            is_delete,
        });
    }
);

export const GET_UNREAD_WORKS = "GET_UNREAD_WORKS";
export const GetUnreadWorks = actions(GET_UNREAD_WORKS, async () => {
    return await FetchApiGet("/api/v1/edms/work/get_unread_works");
});

export const UPDATE_SEND_RECV_BOX = "UPDATE_SEND_RECV_BOX";
export const UpdateSendRecvBox = actions(UPDATE_SEND_RECV_BOX, async (wp_idx_list: number[]) => {
    return await FetchApiPost("/api/v1/edms/work/update_send_recv_box", { wp_idx_list });
});

export const RESTORE_MYDOCUMENT_FILES = "RESTORE_MYDOCUMENT_FILES";
export const RestoreMydocumentFiles = actions(
    RESTORE_MYDOCUMENT_FILES,
    async (docu_data_list: any[], is_admin: boolean = false) => {
        return await FetchApiPost("/api/v1/edms/work/restore_mydocument_files", {
            docu_data_list,
            is_admin,
        });
    }
);

export const GET_DELETE_BOX_LIST = "GET_DELETE_BOX_LIST";
export const GetDeleteBoxList = actions(GET_DELETE_BOX_LIST, async (deleteBoxType: string) => {
    return await FetchApiGet("/api/v1/edms/work/get_delete_box_list", { deleteBoxType });
});

export const REFRESH_TAB = "REFRESH_TEB";
export const RefreshTab = actions(REFRESH_TAB, async (tab: number) => {
    return { payload: tab };
});

export const GET_DOCU_MANAGER = "GET_DOCU_MANAGER";
export const GetDocuManager = actions(GET_DOCU_MANAGER, async (docu_no: number) => {
    return await FetchApiGet("/api/v1/edms/work/get_docu_manager", { docu_no });
});

export const GET_WORK_ASSIGN_USER_LIST = "GET_WORK_ASSIGN_USER_LIST";
export const GetWorkAssignUserList = actions(GET_WORK_ASSIGN_USER_LIST, async (wp_idx: number) => {
    return await FetchApiGet("/api/v1/edms/work/get_work_assign_user_list", { wp_idx });
});

export const GET_REVISION_HISOTORY = "GET_REVISION_HISOTORY";
export const GetRevisionHisotory = actions(GET_REVISION_HISOTORY, async (docu_no: number) => {
    return await FetchApiGet("/api/v1/edms/work/get_revision_hisotory", { docu_no });
});

export const GET_FILE_REVIEW_LIST = "GET_FILE_REVIEW_LIST";
export const GetFileReviewList = actions(
    GET_FILE_REVIEW_LIST,
    async (file_no: number, wp_idx: number) => {
        return await FetchApiGet("/api/v1/edms/work/get_file_review_list", { file_no, wp_idx });
    }
);

export const UPDATE_DUE_DATE = "UPDATE_DUE_DATE";
export const UpdateDueDate = actions(UPDATE_DUE_DATE, async (wp_idx: number, endDate: Date) => {
    return await FetchApiPost("/api/v1/edms/work/update_due_date", { wp_idx, endDate });
});

export const GET_ALL_TR_WORK_LIST = "GET_ALL_TR_WORK_LIST";
export const GetAllTrWorkList = actions(GET_ALL_TR_WORK_LIST, async (wp_idx: number) => {
    return await FetchApiGet("/api/v1/edms/work/get_all_tr_work_list", { wp_idx });
});

export const UPLOAD_EDMS_WORK_ATTACH_FILE = "UPLOAD_EDMS_WORK_ATTACH_FILE";
export const UploadEdmsWorkAttachFile = actions(
    UPLOAD_EDMS_WORK_ATTACH_FILE,
    async (files: any) => {
        return await FetchApiPostWithFiles("/api/v1/edms/work/upload_attach_file", files);
    }
);

export const CLEAN_EDMS_WORK_ATTACH_FILE = "CLEAN_EDMS_WORK_ATTACH_FILE";
export const CleanEdmsWorkAttachFile = actions(CLEAN_EDMS_WORK_ATTACH_FILE, () => {
    return { payload: true };
});

export const UPDATE_TR_DATA = "UPDATE_TR_DATA";
export const UpdateTrData = actions(
    UPDATE_TR_DATA,
    async (
        wp_idx: number,
        startDate: string,
        endDate: string,
        subject: string,
        explan: string,
        referenceId: number,
        emailIdList: number[],
        docuList: number[],
        fileList: number[],
        files: any,
        tmNo: number,
        stageTypeId: number,
        projectTypeNo: number
    ) => {
        return await FetchApiPostWithFiles("/api/v1/edms/work/update_tr_data", files, {
            wp_idx,
            startDate,
            endDate,
            subject,
            explan,
            referenceId,
            emailIdList,
            docuList,
            fileList,
            files,
            tmNo,
            stageTypeId,
            projectTypeNo,
        });
    }
);

export const CONNECT_PLANT_FILES = "CONNECT_PLANT_FILES";
export const ConnectPlantFiles = actions(
    CONNECT_PLANT_FILES,
    async (plant_id: number, file_no: number) => {
        return await FetchApiPost("/api/v1/edms/work/plant/connect_plant_files", {
            plant_id,
            file_no,
        });
    }
);
