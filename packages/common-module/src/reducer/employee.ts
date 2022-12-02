/******************************************************************************
 * Copyright (c) 2021. Moornmo Inc. Rights reserved.                          *
 * Data modelings and methods used are assets of Moornmo Inc.                 *
 ******************************************************************************/

import { AnyAction } from "redux";
import {
	GET_EMPLOYEE,
	CREATE_EMPLOYEE,
	UPDATE_EMPLOYEE,
	DELETE_EMPLOYEE,
} from '../action';

export type employeeState = {
    list : object[];
    newEmployee ?: object;
    editEmployee : boolean;
    deleteEmployee : boolean;
}

const initialState : employeeState = {
    list : [],
    newEmployee : undefined,
    editEmployee : false,
    deleteEmployee : false
}

export const employee= (state:employeeState=initialState, {type, payload} : AnyAction)=>{
    switch(type){
        case GET_EMPLOYEE :
            return {
                ...state,
                list : payload.employee
            }
        case CREATE_EMPLOYEE :
            return {
                ...state,
                newEmployee : payload.insert_employee
            }
        case UPDATE_EMPLOYEE+"_LOADING" :
            return {
                ...state,
                editEmployee : false
            }
        case UPDATE_EMPLOYEE :
            return {
                ...state,
                editEmployee : true
            }
        case DELETE_EMPLOYEE + "_LOADING":
            return {
                ...state,
                deleteEmployee : false
            }
        case DELETE_EMPLOYEE :
            return {
                ...state,
                deleteEmployee : true
            }
        default : 
            return state;
    }
}