import { AnyAction } from "redux";
import {
    CHANGE_TAB,
    CHANGE_TAB_HISTORY_DOC,
    CHANGE_TAB_HISTORY_EDMS,
    CHANGE_NAV_TITLE
} from '../action';

export type tabState = {
    type : string,
    doc_path : string,
    edms_path : string,
    edms_nav_title : string
}

const initialState : tabState = {
    type : "",
    doc_path : "",
    edms_path : "",
    edms_nav_title : ""
}

export const tab = (state:tabState=initialState, {type, payload} : AnyAction)=>{
    switch(type){
        case CHANGE_TAB : 
            return {
                ...state,
                type : payload
            }
        case CHANGE_TAB_HISTORY_DOC :
            return {
                ...state,
                doc_path : payload
            }
        case CHANGE_TAB_HISTORY_EDMS :
            return {
                ...state,
                edms_path : payload
            }
        case CHANGE_NAV_TITLE + "_LOADING":
            return {
                ...state,
                edms_nav_title : ""
            }
        case CHANGE_NAV_TITLE:
            return {
                ...state,
                edms_nav_title : payload
            }
        default : 
            return state;
    }
}