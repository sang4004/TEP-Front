/******************************************************************************
 * Copyright (c) 2021. Moornmo Inc. Rights reserved.                          *
 * Data modelings and methods used are assets of Moornmo Inc.                 *
 * actions 
    * Example : example description.
 ******************************************************************************/
import actions from "./creator";

export const SET_STACK = "SET_STACK";
export const SetStack = actions(SET_STACK, (historyStack: string[])=>{
    return {
        payload : {
            historyStack,
        }
    }
});