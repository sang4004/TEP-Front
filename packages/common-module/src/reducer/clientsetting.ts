/******************************************************************************
 * Copyright (c) 2021. Moornmo Inc. Rights reserved.                          *
 * Data modelings and methods used are assets of Moornmo Inc.                 *
 ******************************************************************************/

import { AnyAction } from "redux";
import {
	SET_CLIENT_DATA,
} from '../action';

export type clientsettingState = {
    default : object
}

const initialState : clientsettingState = {
    default : {} 
}

export const clientsetting= (state:clientsettingState=initialState, {type, payload} : AnyAction)=>{
    switch(type){
        case SET_CLIENT_DATA :
            return {
                ...state,
                default : payload
            }
        default : 
            return state;
    }
}