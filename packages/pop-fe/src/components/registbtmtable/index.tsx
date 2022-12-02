/******************************************************************************
 * Copyright (c) 2021. Moornmo Inc. Rights reserved.                          *
 * Data modelings and methods used are assets of Moornmo Inc.                 *
 * keyvaltable/index.tsx
 * hooks :
    * useLocations 
    *
 * last modify : 
 ******************************************************************************/
// Library
import { useSelector, useDispatch } from "react-redux"; // redux
import React, { useState, useEffect } from "react"; // default hooks
import styled from "styled-components";
import moment from "moment";
import { Button, Typography } from "@material-ui/core";
import { PermIdentityOutlined } from "@material-ui/icons";
//
// Module
import { workerType } from "common_module";
import { AutoComboboxComponent, comboboxData } from "components";
import { 
    ModalViewerComp,
    ModalKeypadComp
} from "../";
import { useLocations } from "hooks" // locations hooks
//

export type keyvaltableProps = {
    selectDate : string;
    workers : workerType[];
    onChangeWorker ?: (id : number)=>void;
    onChangeAmt ?: ( amt : number )=>void;
    onChangeDayNight ?: (dayNight : boolean)=>void;
    cmdAmt : number;
    cmdUnit : string;
}
interface FinalkeyvaltableProps extends keyvaltableProps {};

const DAY_TEXT = ['일','월','화','수','목','금','토'];
export const RegistBtmTableComponent : React.FunctionComponent<FinalkeyvaltableProps> = ( props )=>{
    const [isDay, setIsDay] = useState<boolean>(true);
    const [workerData, setWorkerData] = useState<comboboxData[]>([]);
    const [selectedWorker, setSelectedWorker] = useState<number>(-1);
    const [selectedWorkerIdx, setSelectedWorkerIdx] = useState<number>(-1);
    const [selectedWorkerLabel, setSelectedWorkerLabel] = useState<string>("");
    const [worekrModalVisible, setWorekrModalVisible] = useState<boolean>(false);
    const [keypadModalVisible, setKeypadModalVisible] = useState<boolean>(false);
    const [keypadVal, setKeypadVal] = useState<number>();
    const dayStr = moment(props.selectDate, "YYYY-MM-DD");

    useEffect(() => {
        setKeypadVal(props.cmdAmt);
    }, []);

    useEffect(() => {
        if(props.workers.length > 0){
            setWorkerData([
                ...props.workers.map((raw,idx)=>{
                    return {
                        label : raw.name,
                        value : raw.userNo
                    }
                })
            ]);
            setSelectedWorker(props.workers[0].userNo);
            setSelectedWorkerLabel(props.workers[0].name);
        }
    }, [props.workers]);

    useEffect(() => {
        if(selectedWorker != -1 && props.onChangeWorker){
            props.onChangeWorker(selectedWorker);
        }
    }, [selectedWorker]);

    const onClickCB = ( idx : number )=>{
        setSelectedWorker(props.workers[idx].userNo);
        setSelectedWorkerLabel(props.workers[idx].name);
        setSelectedWorkerIdx(idx);
    }

    const getWorkerModal = ()=>{
        return (
            <WorkerModalDivBlock>
                {workerData.map((raw,idx)=>{
                    return (
                        <WorkerModalDiv $selected={selectedWorkerIdx == idx} key={idx} onClick={()=>onClickCB(idx)}>{raw.label}</WorkerModalDiv>
                    );
                })}
            </WorkerModalDivBlock>
        );
    }

    const onClickKeypadSave = ( val : number )=>{
        setKeypadModalVisible(false);
        setKeypadVal(val);
        if(props.onChangeAmt) props.onChangeAmt(val);
    }

    const onChangeDayNight = ( flag : boolean )=>{
        setIsDay(flag);
        if(props.onChangeDayNight) props.onChangeDayNight(flag);
    }

    return (
        <KeyvaltableContainer className="keyvaltable">
            <ModalViewerComp 
                children={getWorkerModal()}
                onVisible={worekrModalVisible}
                title={"작업자 선택"}
                onCancel={()=>setWorekrModalVisible(false)}
                onSave={()=>setWorekrModalVisible(false)}
                style={{ width : "30%", maxHeight : "50vh"}}
                onCancelHidden
                />
            <ModalKeypadComp 
                onVisible={keypadModalVisible}
                title={""}
                onCancel={()=>setKeypadModalVisible(false)}
                onSave={onClickKeypadSave}
                style={{ width : "30%", maxHeight : "50vh"}}
                />
            {/* <KeyvalDiv>
                <KeyDiv>선택일자</KeyDiv>
                <ValDiv>{props.selectDate}</ValDiv>
                <OptionDiv>{DAY_TEXT[dayStr.day()]}</OptionDiv>
            </KeyvalDiv> */}
            <KeyvalDiv>
                <KeyDiv>작업자</KeyDiv>
                <ValDiv $pointer onClick={()=>setWorekrModalVisible(true)}>
                    <Typography>{selectedWorkerLabel}</Typography>
                </ValDiv>
                <OptionDiv>
                    <PermIdentityOutlined />
                </OptionDiv>
            </KeyvalDiv>
            <KeyvalDiv>
                <KeyDiv>지시수량</KeyDiv>
                <ValDiv $pointer onClick={()=>setKeypadModalVisible(true)}>
                    {keypadVal?.toLocaleString()}
                </ValDiv>
                <OptionDiv>{props.cmdUnit}</OptionDiv>
            </KeyvalDiv>

            {/* <KeyvalDiv>
                <KeyDiv>주야간</KeyDiv>
                <ValDiv style={{flex:"6.5"}}>
                    <DayNightBtnDiv>
                        <DayNightBtn onClick={()=>onChangeDayNight(true)} $selected={isDay}>주간</DayNightBtn>
                        <DayNightBtn onClick={()=>onChangeDayNight(false)} $selected={!isDay}>야간</DayNightBtn>
                    </DayNightBtnDiv>
                </ValDiv>
            </KeyvalDiv> */}
        </KeyvaltableContainer>
    );
}

type styledProps = {
    $flex ?: string;
    $selected ?: boolean;
    $background ?: string;
    $pointer ?: boolean;
}

const KeyvaltableContainer = styled.div`
    width : 100%;
    height : auto;
    margin : 0;
    padding : 0;
    display : flex;
    justify-content : space-between;
    align-items : center;
    flex-direction : row;
    flex-wrap : wrap;
    gap : .5em;
    border : 1px solid #D1D1D1;
    padding : 2em .5em;
    background-color : white;
    flex : 5;
`;

const KeyvalDiv = styled.div`
    width : 48%;
    display : flex;
    height : 100%;
`;

const KeyDiv = styled.div`
    flex : 3;
    display : flex;
    justify-content : center;
    align-items : center;
    background-color : #6B7F8B;
    color : white;
    border : 1px solid #4c5b64;
    margin-right : 6px;
`;

const ValDiv = styled.div`
    flex : 5;
    display : flex;
    justify-content : center;
    align-items : center;
    border : 1px solid #D1D1D1;
    cursor : ${(props: styledProps)=> props.$pointer ? "pointer" : "auto" };
`;

const OptionDiv = styled.div`
    flex : 1;
    display : flex;
    justify-content : center;
    align-items : center;
    background-color : #1267B2;
    color : white;
    padding : 0 6px;
`;

const DayNightBtnDiv = styled.div`
    width : 100%;
    height : 100%; 
    flex : 1;
    display : flex;
`;

const DayNightBtn = styled(Button)`
    flex : 1;
    background-color : ${(props : styledProps)=> props.$selected ? "#1267B2" : "white"};
    &:hover{
        background-color : ${(props : styledProps)=> props.$selected ? "#0c4d86" : "white"};
    }
    color : ${(props : styledProps)=> props.$selected ? "white" : "black"};
    border-radius : 0;
    height : 100%;
`;

const WorkerModalDivBlock = styled.div`
    display : flex;
    justify-content : flex-start;
    align-items : flex-start;
    flex-direction : row;
    flex-wrap : wrap;
    gap : 4%;
    width : 100%;
    height : 100%;
    overflow-y : scroll;
`;

const WorkerModalDiv = styled(Button)`
    width : 30%;
    height : 100px;
    display : flex;
    justify-content : center;
    align-items : center;
    background-color : ${(props : styledProps)=> props.$selected ? "#3490FF" : "white"};
    color : ${(props : styledProps)=> props.$selected ? "white" : "black"};
    &:hover{
        background-color : ${(props : styledProps)=> props.$selected ? "#3490FF" : "white"};
        color : ${(props : styledProps)=> props.$selected ? "white" : "black"};
    }
    border-radius : 1em;
    box-shadow: 0 3px 3px -2px rgb(0 0 0 / 20%), 0 3px 4px 0 rgb(0 0 0 / 14%), 0 1px 8px 0 rgb(0 0 0 / 12%);
    margin : 10px 0;
`;