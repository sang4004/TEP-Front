/******************************************************************************
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
    GetStopType,
    GetStopReason,
    GetEquipnopList,
    reducerState
} from "common_module";
import {
    EquipflowTableComponent,
    EquipnoptableComponent
} from "components";
import {
    PoptoolbarComponent,
    popToolbarStateEnum,
} from "../components";
import { useLocations } from "hooks";
const { Content } = Layout;
//


export const EquipnopPage = ()=> {
    const workSelector = useSelector((state: reducerState) => state.work);
    const dispatch = useDispatch();
    const history = useHistory();
    const {pushHistory} = useLocations();
    const [nopTimeList, setNopTimeList] = useState<string[]>([]);
    const [equipNopDataList, setEquipNopDataList] = useState<object[]>([]);

    useEffect(() => {
        dispatch(GetStopType());
        dispatch(GetStopReason());
        dispatch(GetEquipnopList());
    }, []);

    useEffect(() => {
        if(workSelector.equipNOPList && workSelector.equipNOPList.length > 0 
            && workSelector.stopTypeList && workSelector.stopTypeList.length > 0
            && workSelector.stopReasonList && workSelector.stopReasonList.length > 0 ){
            let _timeList = [];
            for(var data of workSelector.equipNOPList){
                _timeList.push(data.nop_time.start.time + "|" + data.nop_time.end.time);
            }
            setNopTimeList(_timeList);
            getEquipNopDataList();
        }
    }, [workSelector.equipNOPList, workSelector.stopTypeList, workSelector.stopReasonList]);

    const getEquipNopDataList = (stopType ?: string, stopValue ?: number, changeRowIdx ?: number)=>{
        let _list = [];
        for(var i=0;i< workSelector.equipNOPList.length;i++){
            let data = workSelector.equipNOPList[i];
            if(changeRowIdx == i){
                stopType == "type" ? data.stop_type = stopValue : data.stop_reason = stopValue;
            }
            _list.push({
                "순번" : data.id,
                "제품" : data.product,
                // column divide needs
                "정지 시각" : {
                    "일" : data.nop_time.start.day,
                    "시간" : data.nop_time.start.time
                },
                "정지 종료" : {
                    "일" : data.nop_time.end.day,
                    "시간" : data.nop_time.end.time,
                },
                "정지시간(분)" : data.nop_time_total,
                "정지 유형" : data.stop_type + "dropdown0",
                "정지 사유" : data.stop_reason + "dropdown1",
                "분할" : getEquipNOPDivideBtn(data.id)
            });
        }
        setEquipNopDataList([..._list]);
    }
    
    const onClickEquipNOPDivide = (idx : number)=>{
        alert(idx);
    }

    const getEquipNOPDivideBtn = (idx : number)=>{
        return (
            <EquipNOPDivideBtn
                onClick={()=>onClickEquipNOPDivide(idx)}
                >
                <Icon>add</Icon>
                분할
            </EquipNOPDivideBtn>
        );
    }

    const handleStopTypeSelect = (type : string, value : number, row_idx : number)=>{
        getEquipNopDataList(type,  value, row_idx);
    }

    return (
        <EquipnopPageBlock className="equipnop-page__container">
            <PoptoolbarComponent 
                />
            <EquipflowTableComponent 
                startHour={8} 
                endHour={17} 
                data={nopTimeList}
                />
            <EquipnoptableComponent 
                stopTypeList={workSelector.stopTypeList} 
                stopReasonList={workSelector.stopReasonList} 
                data={equipNopDataList}
                style={{height : "max-content", margin : "0"}}
                cbSelect={handleStopTypeSelect}
                headObjList={["정지 시각", "정지 종료"]}
                headStyle={{height : "60px"}}
                headSize={[100, 300, 300, 300, 250, 250, 300, 100]}
                />
        </EquipnopPageBlock>
    );
}

const EquipnopPageBlock = styled(Content)`
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

const EquipNOPDivideBtn = styled(Button)`
    border-radius : 0;
    background-color : #4B9BE4;
    border : 1px solid #4B9BE4;
    color : white;
    width : 100%;
    height : 100%;
`;