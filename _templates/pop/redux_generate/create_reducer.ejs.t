---
to: packages/pop-fe/src/common/reducer/<%=action%>.tsx
---

/******************************************************************************
 * Copyright (c) 2021. Moornmo Inc. Rights reserved.                          *
 * Data modelings and methods used are assets of Moornmo Inc.                 *
 ******************************************************************************/

import { AnyAction } from "redux";
import {
    EXAMPLE
} from '../action';

export type <%=action%>State = {
    
}

const initialState : <%=action%>State = {
}

export default function (state:<%=action%>State=initialState, {type, payload} : AnyAction){
    switch(type){
        case EXAMPLE : 
            return {
                ...state,
            }
        default : 
            return state;
    }
}