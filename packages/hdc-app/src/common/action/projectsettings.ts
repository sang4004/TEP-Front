import { FetchApiPost, FetchApiGet, FetchApiDelete } from "../network";
import actions from "common_module/lib/action/creator";

//모든 도큐먼트에 대한 스테이지 정보 가져오기
export const GET_STAGE_DATA = "GET_STAGE_DATA";
export const GetStageData = actions(GET_STAGE_DATA, async (docu_no: number) => {
    return await FetchApiGet("/api/v1/edms/settings/get_stage_data", { docu_no });
});
//할증률 세팅
export const SET_ACTUAL_RATE = "SET_ACTUAL_RATE";
export const SetActualRate = actions(
    SET_ACTUAL_RATE,
    async (discipline_no: number, rate_data: object) => {
        return await FetchApiPost("/api/v1/edms/settings/set_actual_rate", {
            discipline_no,
            rate_data,
        });
    }
);

//모든 인덱스 데이터 가져오기
export const GET_INDEX_DATA = "GET_INDEX_DATA";
export const GetIndexData = actions(GET_INDEX_DATA, async () => {
    return await FetchApiGet("/api/v1/edms/settings/get_index_data");
});

// 인덱스 정보 저장
export const SET_INDEX_DATA = "SET_INDEX_DATA";
export const SetIndexData = actions(SET_INDEX_DATA, async (index_type: string, data: any) => {
    return await FetchApiPost("/api/v1/edms/settings/set_index_data", { index_type, data });
});

// 모든 시스템 데이터 처음에 로드
export const GET_ALL = "GET_ALL";
export const GetAllList = actions(GET_ALL, async () => {
    return await FetchApiGet("/api/v1/edms/project/get_all_list");
});

//병목현상리스트
export const GET_BLOCKED_WORK_PROC_LIST = "GET_BLOCKED_WORK_PROC_LIST";
export const GetBlockedWorkProcList = actions(GET_BLOCKED_WORK_PROC_LIST, async () => {
    return FetchApiGet("/api/v1/edms/etc/get_blocked_work_proc_list");
});

// 프로젝트 예상종료일
export const GET_PROJECT_DDAY_DATA = "GET_PROJECT_DDAY_DATA";
export const GetProjectDdayData = actions(GET_PROJECT_DDAY_DATA, async () => {
    return FetchApiGet("/api/v1/edms/etc/get_project_dday_data");
});
