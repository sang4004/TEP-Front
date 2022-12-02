import {
    FetchApiPost,
    FetchApiGet,
    FetchApiDelete,
    FetchApiPostWithFile,
    FetchApiPostWithFiles,
} from "../network";
import actions from "common_module/lib/action/creator";

export const CREATE_DRN_COMMENT = "CREATE_DRN_COMMENT";
export const CreateDrnComment = actions(
    CREATE_DRN_COMMENT,
    async (
        wp_idx: number,
        review_owner: string,
        contents: string,
        create_by: string,
        reviewer_id: number,
        code: number,
        page_sheet_no: string,
        is_changed_design: boolean,
        files?: any
    ) => {
        return await FetchApiPost("/api/v1/edms/work/drn/create_drn_comment", {
            wp_idx,
            review_owner,
            contents,
            create_by,
            reviewer_id,
            code,
            page_sheet_no,
            is_changed_design,
            files,
        });
    }
);

export const CREATE_DRN_REPLY = "CREATE_DRN_REPLY";
export const CreateDrnReply = actions(
    CREATE_DRN_REPLY,
    async (attach_files: any, wr_idx: number, reply: string) => {
        return await FetchApiPost("/api/v1/edms/work/drn/create_drn_reply", {
            attach_files,
            wr_idx,
            reply,
        });
    }
);

export const GET_DRN_COMMENT_LIST = "GET_DRN_COMMENT_LIST";
export const GetDrnCommentList = actions(GET_DRN_COMMENT_LIST, (wp_idx: number) => {
    return FetchApiGet("/api/v1/edms/work/drn/drn_comment_list", { wp_idx });
});

export const UPDATE_DRN_APPROVAL = "UPDATE_DRN_APPROVAL";
export const UpdateDrnApproval = actions(
    UPDATE_DRN_APPROVAL,
    (wp_idx: number, is_approval: number) => {
        return FetchApiPost("/api/v1/edms/work/drn/update_drn_approval", { wp_idx, is_approval });
    }
);

export const CREATE_TM_DRN = "CREATE_TM_DRN";
export const CreateTmDrn = actions(
    CREATE_TM_DRN,
    (
        wp_date: Date,
        explan: string,
        due_date: Date,
        create_by: string,
        file_list: [],
        approval_users: [],
        tm_wp_idx: number,
        relay: string
    ) => {
        return FetchApiPost("/api/v1/edms/work/drn/create_tm_drn", {
            wp_date,
            explan,
            due_date,
            create_by,
            file_list,
            approval_users,
            tm_wp_idx,
            relay,
        });
    }
);
