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
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Layout } from "antd";
import styled from "styled-components";
import { ArrowBack, Block } from "@material-ui/icons";
import { Button, Typography } from "@material-ui/core";
//
// Module
import { 
    GetMaterialInfo,
    GetMaterialStat,
    reducerState
} from "common_module";
import { 
    KeyvaltableComponent,
    TableComponent
} from "components";
import {
    PoptoolbarComponent,
    popToolbarStateEnum,
} from "../components";
import { useLocations } from "hooks";
//

const { Content } = Layout;

export const MatpushPage = ()=> {
    const workSelector = useSelector((state: reducerState) => state.work);
    const dispatch = useDispatch();
    const history = useHistory();
    const {pushHistory} = useLocations();

    const [selectedBtnId, setSelectedBtnId] = useState<number>(0);
    const [matNewInfo, setMatNewInfo] = useState<object[]>([]);

    const onClickTableBtn = (id : number)=>{
        if(selectedBtnId == id) return;
        setSelectedBtnId(id);
    }

    const onClickRemoveBtn = (id : string)=>{
        alert("반출 ::" + id);
    }
    
    const getRemoveBtn = (id : string)=>{
        return (
            <MatpushRemoveBtn onClick={()=>onClickRemoveBtn(id)}>
                <Block style={{width : "20px"}} />
                반출
            </MatpushRemoveBtn>
        );
    }

    useEffect(() => {
        if(workSelector.matNewInfo){
            let _list = [];
            for(var info of workSelector.matNewInfo){
                let _obj = {};
                Object.assign(_obj, info);
                Object.assign(_obj, {"반출" : getRemoveBtn(info["번호"])})
                _list.push(_obj);
            }
            setMatNewInfo([..._list]);
        }
    }, [ workSelector.matNewInfo ]);

    useEffect(()=>{
        if(!(workSelector.matSmallInfo) || !(workSelector.matOriginInfo))
            dispatch(GetMaterialInfo());
        if(!(workSelector.matUsedInfo) || !(workSelector.matNewInfo))
            dispatch(GetMaterialStat());
    }, []);

    return (
        <MatpushPageBlock className="matpush-page__container">
            <PoptoolbarComponent 
                state={popToolbarStateEnum.confirm}
                />
            <MatpushInfoGroupDiv>
                <MatpushInfoDiv>
                    <MatpushInfoTitle>작지 정보</MatpushInfoTitle>
                    <KeyvaltableComponent 
                        style={{border : "none", padding : "1em .5em"}}
                        data={workSelector.matSmallInfo}
                        rowCount={2}
                        />
                </MatpushInfoDiv>
                <MatpushInfoCenterIcon>
                    <ArrowBack style={{width : "60%", height : "60%", color : "#707D88"}} />
                </MatpushInfoCenterIcon>
                <MatpushInfoDiv>
                    <MatpushInfoTitle>원소재 정보</MatpushInfoTitle>
                    <KeyvaltableComponent 
                        style={{border : "none", padding : "1em .5em"}}
                        data={workSelector.matOriginInfo}
                        rowCount={2}
                        />
                </MatpushInfoDiv>
            </MatpushInfoGroupDiv>
            <MatpushTableBtnGroup>
                <MatpushTableBtn 
                    className={selectedBtnId == 0 ? "active" : ""}
                    onClick={()=>onClickTableBtn(0)}
                    >투입가능 소재 현황</MatpushTableBtn>
                <MatpushTableBtn 
                    className={selectedBtnId == 1 ? "active" : ""}
                    onClick={()=>onClickTableBtn(1)}
                    >투입된 자재 현황</MatpushTableBtn>
            </MatpushTableBtnGroup>
            <TableComponent
                data={ selectedBtnId == 0 ? matNewInfo : workSelector.matUsedInfo }
                style={{ height : "max-content" }}
                isEdit={false}
                />
        </MatpushPageBlock>
    );
}

const MatpushPageBlock = styled(Content)`
    display : flex;
    justify-content : flex-start;
    align-items : center;
    flex-direction: column;
    width : 100%;
    height : 100%;
    flex : none;
    overflow : auto;
    gap : 1.5em;
`;

const MatpushInfoGroupDiv = styled.div`
    display : flex;
    justify-content : center;
    align-items : center;
    gap : 5px;
    width : 100%;
`;

const MatpushInfoDiv = styled.div`
    flex : 5;
    border : 1px solid #dedede;
    background-color : white;
    padding : 10px;
`;

const MatpushInfoTitle = styled(Typography)`
    font-size : 1.5em;
    padding-left : .5em;
`;

const MatpushInfoCenterIcon = styled.div`
    height : 64px;
    width : 64px;
    display : flex;
    justify-content : center;
    align-items : center;
    border-radius : 50%;
    background-color : white;
    border : 1px solid #dedede;
`;

const MatpushTableBtnGroup = styled.div`
    width : 100%;
    display : flex;
    justify-content : flex-start;
    align-items : center;
    gap : 1em;
`;

const MatpushTableBtn = styled(Button)`
    border : 1px solid #dedede;
    border-radius : 0;
    background-color : white;
    color : black;
    font-weight : 400;
    &:hover, &.active{
        background-color : #1267B2;
        color : white;
    }
`;

const MatpushRemoveBtn = styled(Button)`
    color : white;
    background-color : #DE5D5F;
    border-radius : 0;
    &:hover{
        background-color : #e75e60;
    }
`;