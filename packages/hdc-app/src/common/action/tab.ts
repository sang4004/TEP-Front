import actions from "common_module/lib/action/creator";

export const CHANGE_TAB = "CHANGE_TAB";
export const ChangeTab = actions(CHANGE_TAB, async( type : string )=>{
    return { payload : type };
});

export const CHANGE_TAB_HISTORY_EDMS = "CHANGE_TAB_HISTORY_EDMS";
export const ChangeTabHistoryEdms = actions(CHANGE_TAB_HISTORY_EDMS, async(path : string)=>{
    return { payload : path };
});

export const CHANGE_TAB_HISTORY_DOC = "CHANGE_TAB_HISTORY_DOC";
export const ChangeTabHistoryDoc = actions(CHANGE_TAB_HISTORY_DOC, async(path : string)=>{
    return { payload : path };
});

export const CHANGE_NAV_TITLE = "CHANGE_NAV_TITLE";
export const ChangeNavTitle= actions(CHANGE_NAV_TITLE, async(title : string)=>{
    return { payload : title };
});