import { AnyAction } from "redux";
import {
	SET_STACK,
} from '../action';

export type multitabState = {
    historyStack : string[],
}

const initialState : multitabState = {
    historyStack : [],
}

export function multitab (state:multitabState=initialState, {type, payload} : AnyAction){
    switch(type){
        case SET_STACK :
            return {
                ...state,
                historyStack : payload.historyStack,
            }
        default : 
            return state;
    }
}