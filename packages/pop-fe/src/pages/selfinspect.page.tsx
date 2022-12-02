/******************************************************************************
 * Copyright (c) 2021. Moornmo Inc. Rights reserved.                          *
 * Data modelings and methods used are assets of Moornmo Inc.                 *
 * hooks :
    * useLocations 
    *
 * components : 
    * ConfirmButton
    * 
 * last modify : 
 ******************************************************************************/

// Library
import React, { useState, useEffect, ChangeEvent } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Layout } from "antd";
import styled from "styled-components";
import { Button, Typography, TextField, Icon, Select, MenuItem } from "@material-ui/core";
//
// Module
import { 
    GetSelfinspectList,
    reducerState
} from "common_module";
import { 
    InspectTableCompnent,
    GraphComponent
} from "components";
import {
    PoptoolbarComponent,
    popToolbarStateEnum,
} from "../components";
import { useLocations } from "hooks";
import { objects2tabledata } from "utils_ts/lib";
const { Content } = Layout;
//

export const SelfinspectPage = ()=> {
    const workSelector = useSelector((state: reducerState) => state.work);
    const dispatch = useDispatch();
    const history = useHistory();
    const {pushHistory} = useLocations();
    const [inspectList, setInspectList] = useState<object[]>([]);
    const [inspectUserList, setInspectUserList] = useState<object[]>([]);
    useEffect(() => {
        dispatch(GetSelfinspectList());
    }, []);

    useEffect(() => {
        if(workSelector.selfInspectList){
            let res = objects2tabledata(workSelector.selfInspectList);
            setInspectList([...res]);
        }
    }, [ workSelector.selfInspectList ]);

    useEffect(() => {
        if(workSelector.selfInspectUserList){
            let res = objects2tabledata(workSelector.selfInspectUserList);
            setInspectUserList([...res]);
        }
    }, [workSelector.selfInspectUserList]);

    return (
        <SelfinspectPageBlock className="selfinspect-page__container">
            <PoptoolbarComponent 
                />
            <SelfinspectTableGroup>
                <InspectTableCompnent style={{flex : 3}} data={inspectList} />
                <InspectTableCompnent style={{flex : 2}} data={inspectUserList} />
            </SelfinspectTableGroup>
            <SelfinspectBtmGroup>
                <SelfinspectChartDiv>
                    <GraphComponent 
                        height={290}
                        width={800}
                        type="line" 
                        style={{height : "320px", padding : "20px 10px"}}
                        data={workSelector.selfInspectChartData}
                        chartOptions={{ "responsive" : false }}
                        />
                </SelfinspectChartDiv>
                <SelfinspectImageDiv>
                    <SelfinspectImageZoomBtn>
                        <img style={{width : "100%"}} src="https://i.pinimg.com/originals/df/9a/79/df9a79ae3b5de61a5b3199491a3fa6f9.jpg"/>
                    </SelfinspectImageZoomBtn>
                </SelfinspectImageDiv>
            </SelfinspectBtmGroup>
        </SelfinspectPageBlock>
    );
}

type styledProps = {
}

const SelfinspectPageBlock = styled(Content)`
    display : flex;
    justify-content : flex-start;
    align-items : flex-start;
    flex-direction: column;
    width : 100%;
    height : 100%;
    flex : none;
    overflow : auto;
    gap : 0.8em;
`;

const SelfinspectTableGroup = styled.div`
    width : 100%;
    height : auto;
    display : flex;
    flex-direction : row;
    justify-content : center;
    align-items : center;
    gap : .5em;
`;

const SelfinspectBtmGroup = styled.div`
    width : 100%;
    height : auto;
    display : flex;
    flex-direction : row;
    justify-content : center;
    align-items : center;
    gap : .5em;
`;

const SelfinspectChartDiv = styled.div`
    flex : 3;
    background-color : white;
`;

const SelfinspectImageDiv = styled.div`
    position : relative;
    flex : 2;
    height : 320px;
    display : flex;
    justify-content : center;
    align-items : center;
    background-color : white;
    padding : 10px;
`;

const SelfinspectImageZoomBtn = styled(Button)`
    width : 100%;
    height : 100%;
    cursor : zoom-in;
`;