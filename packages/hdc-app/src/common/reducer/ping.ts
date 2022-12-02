import { AnyAction } from "redux";
import { jwtdecode } from "utils_ts/lib";
import { GET_COUNT_PING, GET_COUNT_PING_EDMS } from "../action";

export type pingState = {
    // 문서함 개수 표시 value
    doc_temp_count: number;
    doc_signing_count: number;
    doc_complete_count: number;
    doc_reject_count: number;
    doc_sent_count: number;
    doc_recv_count: number;
    doc_recv_is_read: number;
    doc_group_sent_count: number;
    doc_group_recv_count: number;
    doc_regist_count: number;
    doc_general_recv_count: number;
    doc_general_recv_is_read: number;
    doc_general_send_count: number;
    doc_group_general_recv_count: number;
    doc_group_general_send_count: number;
    general_doc_temp_count: number;
    general_doc_signing_count: number;
    general_doc_complete_count: number;
    general_doc_reject_count: number;
    doc_complete_is_send: number;
    doc_signing_is_approval: number;
    doc_reject_is_re_request: number;
    //
    // EDMS 문서관리 개수
    din_count: number;
    drn_count: number;
    tm_count: number;
    send_box_count: number;
    recv_box_count: number;
    //
    //타이밍 플래그
    time: number;
};

const initialState: pingState = {
    //문서함 개수 표시 value
    doc_temp_count: 0,
    doc_signing_count: 0,
    doc_complete_count: 0,
    doc_reject_count: 0,
    doc_sent_count: 0,
    doc_recv_count: 0,
    doc_recv_is_read: 0,
    doc_group_sent_count: 0,
    doc_group_recv_count: 0,
    doc_regist_count: 0,
    doc_general_recv_count: 0,
    doc_general_recv_is_read: 0,
    doc_general_send_count: 0,
    doc_group_general_recv_count: 0,
    doc_group_general_send_count: 0,
    general_doc_temp_count: 0,
    general_doc_signing_count: 0,
    general_doc_complete_count: 0,
    general_doc_reject_count: 0,
    doc_complete_is_send: 0,
    doc_signing_is_approval: 0,
    doc_reject_is_re_request: 0,
    din_count: 0,
    drn_count: 0,
    tm_count: 0,
    send_box_count: 0,
    recv_box_count: 0,
    time: 0,
    //
};

export const ping = (state: pingState = initialState, { type, payload }: AnyAction) => {
    switch (type) {
        case GET_COUNT_PING:
            return {
                ...state,
                doc_temp_count: payload.data.temp,
                doc_signing_count: payload.data.signing,
                doc_reject_count: payload.data.reject,
                doc_complete_count: payload.data.complete,
                doc_sent_count: payload.data.sent,
                doc_recv_count: payload.data.recv,
                doc_recv_is_read: payload.data.recv_is_read,
                doc_group_sent_count: payload.data.group_sent,
                doc_group_recv_count: payload.data.group_recv,
                doc_regist_count: payload.data.regist,
                doc_general_recv_count: payload.data.recv_general_doc,
                doc_general_recv_is_read: payload.data.grecv_is_read,
                doc_general_send_count: payload.data.send_general_doc,
                doc_group_general_recv_count: payload.data.group_recv_general_doc,
                doc_group_general_send_count: payload.data.group_send_general_doc,
                general_doc_temp_count: payload.data.temp_general_doc,
                general_doc_signing_count: payload.data.signing_general_doc,
                general_doc_complete_count: payload.data.complete_general_doc,
                general_doc_reject_count: payload.data.reject_general_doc,
                doc_complete_is_send: payload.data.complete_is_send,
                doc_signing_is_approval: payload.data.signing_is_approval,
                doc_reject_is_re_request: payload.data.reject_is_re_request,
                time: payload.data.time,
            };
        case GET_COUNT_PING_EDMS:
            return {
                ...state,
                din_count: payload.data.DIN,
                drn_count: payload.data.DRN,
                tm_count: payload.data.TM,
                send_box_count: payload.data.SEND,
                recv_box_count: payload.data.RECV,
                time: payload.data.time,
            };
        default:
            return state;
    }
};
