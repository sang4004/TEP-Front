import { AnyAction } from "redux";
import {
    GET_PROJECT
} from '../action';

export type projectState = {
    id ?: number,
    name ?: string,
    sector ?: string,
    type ?: string,
    pm ?: string,
    file ?: string,
    data ?: Array<Object>
}

const initialState : projectState = {
    id : undefined,
    name : undefined,
    sector : undefined,
    type : undefined,
    pm : undefined,
    file : undefined,
    data : undefined
}

export const project= (state:projectState=initialState, {type, payload} : AnyAction)=>{
    switch(type){
        case GET_PROJECT:
            return {
                ...state,
                data : payload
            }
        // case GET_PROJECT : 
        //     return {
        //         ...state,
        //         id : payload.id,
        //         name : payload.name,
        //         sector : payload.sector,
        //         type : payload.type,
        //         pm : payload.pm,
        //         file : payload.file
        //     }
        default : 
            return state;
    }
}