import actions from "common_module/lib/action/creator";
import { FetchApiGet } from "../network";

export const GET_COUNT_PING = "GET_COUNT_PING";
export const GetCountPing = actions(GET_COUNT_PING, async()=>{
    return await FetchApiGet("/api/v1/digitalsign/get_count_ping");
});

export const GET_COUNT_PING_EDMS = "GET_COUNT_PING_EDMS";
export const GetCountPingEdms = actions(GET_COUNT_PING_EDMS, async()=>{
    return await FetchApiGet('/api/v1/edms/etc/get_count_ping_edms');
});