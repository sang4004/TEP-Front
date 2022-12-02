/******************************************************************************
 * Copyright (c) 2021. Moornmo Inc. Rights reserved.                          *
 * Data modelings and methods used are assets of Moornmo Inc.                 *
 * src/App.tsx
 * actions :
 * set_data -> client data setting
 * lasy modify : jh.jeong
 ******************************************************************************/
// Library
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import moment from "moment";
import jQuery from "jquery";
//
// Module
//
//fuse lib
import MomentUtils from "@date-io/moment";
import "moment/locale/ko";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import FuseTheme from "fuse/lib/core/FuseTheme";
import "@progress/kendo-theme-default/dist/all.css";
//
import { AppwrapperComponent } from "./components";
import { pdfViewerDomain } from "./common/network";
import { PageList } from "./pages/page_list";

const App: React.FunctionComponent<any> = props => {
    moment.locale("ko");
    Object.assign(window, { toast: (str: string) => {} });

    Object.assign(window, { $: jQuery });
    // script import
    const script = document.createElement("script");
    script.src = `${pdfViewerDomain}adapter.js`;
    script.async = true;

    document.body.appendChild(script);
    //
    return (
        <MuiPickersUtilsProvider locale="ko" utils={MomentUtils}>
            <BrowserRouter>
                <FuseTheme>
                    <AppwrapperComponent>
                        {/* <MultitabwrapperComponent> */}
                        <PageList />
                        {/* </MultitabwrapperComponent> */}
                    </AppwrapperComponent>
                </FuseTheme>
            </BrowserRouter>
        </MuiPickersUtilsProvider>
    );
};

export default App;
