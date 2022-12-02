import actions from "common_module/lib/action/creator";
import { historyType } from "../reducer/history";

export const GET_HISTORY = "GET_HISTORY";
export const GetHistory = actions(GET_HISTORY, (path: string) => {
    return { success: true, path: path };
});

export const SET_HISTORY = "SET_HISTORY";
export const SetHistory = actions(SET_HISTORY, (data: historyType) => {
    //
    return { payload: data };
});

export const SET_CURRENT_HISTORY = "SET_CURRENT_HISTORY";
export const SetCurrentHistory = actions(SET_CURRENT_HISTORY, (path: string, data: historyType) => {
    return { payload: { path: path, data } };
});

export const SET_RECENT_HISTORY = "SET_RECENT_HISTORY";
export const SetRecentHistory = actions(SET_RECENT_HISTORY, () => {
    return { success: true };
});

export const POP_HISTORY = "POP_HISTORY";
export const PopHistory = actions(POP_HISTORY, () => {
    return { success: true };
});
