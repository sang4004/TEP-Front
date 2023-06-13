/******************************************************************************
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