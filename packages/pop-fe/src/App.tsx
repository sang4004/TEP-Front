/******************************************************************************
	* src/App.tsx
	* actions : 
		* set_data -> client data setting
******************************************************************************/
// Library
import React from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import type from "./config-client/type.json";
import moment from "moment";
import {
    SetStack
} from "common_module";
import {
    MultitabwrapperComponent,
} from "components";
import { 
    AppwrapperComponent
} from "./components";
import {
    PageList
} from "./pages/page_list";
//
// Module
//
//fuse lib
import MomentUtils from '@date-io/moment';
import "moment/locale/ko";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import FuseTheme from './@fuse/core/FuseTheme';
//
//fuse properties
import FuseLayout from "./@fuse/core/FuseLayout/FuseLayout";
//

const App = ()=> {
    const dispatch = useDispatch();
    moment.locale("ko")
    const host = window.location.host;
    const updateStack = (_stack : string[])=>{
        dispatch(SetStack(_stack));
    }
    return (
        <MuiPickersUtilsProvider locale="ko" utils={MomentUtils}>
            <BrowserRouter>
                <FuseTheme>
                    <AppwrapperComponent>
                        {/* <MultitabwrapperComponent SetStack={updateStack} > */}
                            <PageList />
                        {/* </MultitabwrapperComponent> */}
                    </AppwrapperComponent>
                </FuseTheme>
            </BrowserRouter>
        </MuiPickersUtilsProvider>
    );
}

export default App;