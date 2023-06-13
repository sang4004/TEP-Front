---
to: packages/pop-fe/src/common/reducer/<%=action%>.tsx
---

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