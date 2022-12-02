/******************************************************************************
 * Copyright (c) 2021. Moornmo Inc. Rights reserved.                          *
 * Data modelings and methods used are assets of Moornmo Inc.                 *
 * hooks :
    * useLocations 
 * components : 
    * 
 * last modify : jh.jeong
 * TO DO :  constants 네비게이션을 loop 하여 자동 route 생성 기능 추가
 ******************************************************************************/
//Library
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Switch, Route } from "react-router-dom";
//
//Module
import {
    //inject point 1
    ShipmentPage,
    PackingPage,
    LabelprintPage,
    SelfinspectPage,
    EquipnopPage,
    FlowchartPage,
    MoldioPage,
    BadregistPage,
    PfregistPage,
    MatpushPage,
    WorkregistPage,
    WorkstatPage,
    InfoPage,
    LoginPage,
    MainPage,
} from "./";
//
export const PageList = ()=> {
    return (
        <Switch>
            <Route exact path="/" component={MainPage}/>
            <Route exact path="/shipment" component={ShipmentPage} />
            <Route exact path="/packing" component={PackingPage} />
            <Route exact path="/labelprint" component={LabelprintPage} />
            <Route exact path="/selfinspect" component={SelfinspectPage} />
            <Route exact path="/equipnop" component={EquipnopPage} />
            <Route exact path="/flowchart" component={FlowchartPage} />
            <Route exact path="/moldio" component={MoldioPage} />
            <Route exact path="/badregist" component={BadregistPage} />
            <Route exact path="/pfregist" component={PfregistPage} />
            <Route exact path="/matpush" component={MatpushPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/info" component={InfoPage} />
            <Route exact path="/workregist" component={WorkregistPage} />
            <Route exact path="/workstat" component={WorkstatPage} />
        </Switch>
    );
};