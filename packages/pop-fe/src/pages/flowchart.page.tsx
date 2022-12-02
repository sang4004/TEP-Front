/******************************************************************************
 * Copyright (c) 2021. Moornmo Inc. Rights reserved.                          *
 * Data modelings and methods used are assets of Moornmo Inc.                 *
 * hooks :
    * useLocations 
    *
 * components : 
    * 
 * last modify : jh.jeong
 ******************************************************************************/

// Library
import React, { useState, useEffect, ChangeEvent } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Layout } from "antd";
import styled from "styled-components";
import { Button, Typography, TextField, Icon } from "@material-ui/core";
//
// Module
import { 
    GetWorkData,
    GetFlowChart,
    reducerState
} from "common_module";
import { 
    TableComponent,
    KeyvaltableComponent
} from "components";
import {
    PoptoolbarComponent,
    popToolbarStateEnum,
} from "../components";
import { useLocations } from "hooks";

const { Content } = Layout;
//

const flowchartInfoKeys = ["지시번호", "품명", "품번", "규격"];
export const FlowchartPage = ()=> {
    const workSelector = useSelector((state: reducerState) => state.work);
    const dispatch = useDispatch();
    const history = useHistory();
    const {pushHistory} = useLocations();
    const [workInfo, setWorkInfo] = useState<object>({});
    const [flowchartList, setFlowchartList] = useState<object[]>([]);
    const [selectedFlowchartList, setSelectedFlowchartList] = useState<number[]>([]);
    
    useEffect(() => {
        dispatch(GetFlowChart());
        if(!(workSelector.workinfo))
            dispatch(GetWorkData());
    }, []);

    useEffect(() => {
        if(workSelector.workinfo){
            let _obj = {};
            let keys = Object.keys(workSelector.workinfo);
            for(var i=0;i<keys.length;i++){
                if(flowchartInfoKeys.indexOf(keys[i]) != -1){
                    Object.assign(_obj, { [keys[i]] : Object.values(workSelector.workinfo)[i] });
                }
            }
            setWorkInfo(_obj);
        }
    }, [ workSelector.workinfo ]);

    useEffect(() => {
        if(workSelector.flowchartList){
            let _list = [];
            let idx = 0;
            for(var data of workSelector.flowchartList){
                Object.assign(data, {"선택" : getSelectBtn(idx)});
                _list.push(data);
                idx += 1;
            }
            setFlowchartList([..._list]);
        }
    }, [ workSelector.flowchartList, selectedFlowchartList ]);


    const onClickSelectBtn = (idx : number)=>{
        const selctedIdx = selectedFlowchartList.indexOf(idx);
        if(selctedIdx != -1){
            selectedFlowchartList.splice(selctedIdx,1);
            setSelectedFlowchartList([...selectedFlowchartList])
        } else {
            setSelectedFlowchartList([...selectedFlowchartList, idx]);
        }
    }

    const getSelectBtn = (idx : number)=>{
        const selected = selectedFlowchartList.indexOf(idx) != -1;
        return (
            <FlowchartSelectBtn
                $selected={selected}
                onClick={()=>onClickSelectBtn(idx)}
                key={idx}
                >
                <Icon>check</Icon>
                {selected ? "선택됨" : "선택"}
            </FlowchartSelectBtn>
        )
    }

    return (
        <FlowchartBlock className="Badregist-page__container">
            <PoptoolbarComponent 
                state={popToolbarStateEnum.confirm}
                />
            <KeyvaltableComponent 
                style={{border : "none", padding : "1em .5em", height : "auto"}}
                data={workInfo}
                rowCount={4}
                />
            <TableComponent 
                isEdit={false}
                data={flowchartList}
                style={{height : "max-content"}}
                />
        </FlowchartBlock>
    );
}

type styledProps = {
    $selected ?: boolean;
}

const FlowchartBlock = styled(Content)`
    display : flex;
    justify-content : flex-start;
    align-items : center;
    flex-direction: column;
    width : 100%;
    height : 100%;
    flex : none;
    overflow : auto;
    gap : 0.8em;
`;

const FlowchartSelectBtn = styled(Button)`
    border-radius : 0;
    background-color : ${(props : styledProps)=> props.$selected ? `#4B9BE4` : `white`};
    border : 1px solid #4B9BE4;
    color : ${(props : styledProps)=> props.$selected ? `white` : `#4B9BE4`};
`;