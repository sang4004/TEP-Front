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
import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Layout, Typography } from "antd";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import moment, { Moment } from "moment";
//
// Module
import { 
    GetWorkData,
    GetWorkFix,
    SetWorkRegist,
    DelWorkRegist,
    reducerState,
    workHistoryType,
    GetCmdInfo
} from "common_module";
import { 
    KeyvaltableComponent, 
    TableComponent,
    LoadingIndicatorComponent,
    ModalInfo
} from "components";
import { useLocations } from "hooks";
import { objects2tabledata } from "utils_ts/lib";
import { getLang } from "utils_js/lib";
import {
    FlowTableComponent,
    RegistBtmTableComponent,
    PoptoolbarComponent, 
    popToolbarStateEnum, 
} from "../components";
//
const { Content } = Layout;

const WORK_INFO_PRINT_KEYS = ["cmdNo", "itemName", "itemNumber", "itemSpec", "cmdAmt"];
const DAY_TEXT = ['일','월','화','수','목','금','토'];
export const WorkregistPage = ()=> {
    const workSelector = useSelector((state: reducerState) => state.work);
    const userSelector = useSelector((state : reducerState) => state.user);
    const dispatch = useDispatch();
    const history = useHistory();
    const {pushHistory} = useLocations();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    // top data
    const [workInfo, setWorkInfo] = useState<object|null>(null);
    const [historyTableHeadList, setHistoryTableHeadList] = useState<string[]>([]);
    const [historyTableDataDay, setHistoryTableDataDay] = useState<string[]>([]);
    const [historyTableDataNight, setHistoryTableDataNight] = useState<string[]>([]);
    const [cIdxDayList, setCIdxDayList] = useState<number[]>([]);
    const [cIdxNightList, setCIdxNightList] = useState<number[]>([]);
    const [tableDateList, setTableDateList] = useState<string[]>([]);
    const [selectedcIdxList, setSelectedcIdxList] = useState<number[]>([]);
    const [selectedDateList, setSelectedDateList] = useState<string[]>([]);
    const [selectedDayNightList, setSelectedDayNightList] = useState<string[]>([]);
    const [workStartDate, setWorkStartDate] = useState<Moment | null>(null);
    const [workEndDate, setWorkEndDate] = useState<Moment | null>(null);
    const [flowTableRefresh, setFlowTableRefresh] = useState<number>(-1);
    //
    // btm data
    const [selectedWorker, setSelectedWorker] = useState<number>(-1);
    const [selectedAmt, setSelectedAmt] = useState<number>(0);
    const [selectedDayNight, setSelectedDayNight] = useState<boolean>(true);
    //

    useEffect(()=>{
        //initialize;
    }, []);

    useEffect(() => {
        if(workSelector.workers && workSelector.workers.length > 0)
            setSelectedWorker(workSelector.workers[0].userNo);

    }, [ workSelector.workers ]);

    useEffect(() => {
        if(workSelector.cmdInfo){
            let _obj = objects2tabledata( [workSelector.cmdInfo], WORK_INFO_PRINT_KEYS )[0];
            Object.assign(_obj, { [getLang("regiDtRange")] : `${workSelector.cmdInfo.startDt} ~ ${workSelector.cmdInfo.endDt}`} );
            setWorkInfo(new Object(_obj));
            setSelectedAmt(workSelector.cmdInfo.cmdAmt);
        } else {
            setWorkInfo(null);
        }
    }, [ workSelector.cmdInfo ]);

    useEffect(() => {
        if(workSelector.cmdInfoErr){
            ModalInfo("조회 결과가 없습니다.");
        }
    }, [ workSelector.cmdInfoErr ]);

    useEffect(()=>{
        if(workSelector.workhistory){
            let headList : string[] = ["주간/야간"];
            let bodyListDay : string[] = ["주간"];
            let bodyListNight : string[] = ["야간"];
            let _cIdxDList : any[] = [];
            let _cIdxNList : any[] = [];

            for(var m = moment(workStartDate); m.isBefore(workEndDate); m.add(1, "days")){
                let key = `${m.format("MM/DD")}(${DAY_TEXT[m.day()]})`;
                tableDateList.push(m.format("YYYY-MM-DD"));
                headList.push(key);
                bodyListDay.push(":");
                bodyListNight.push(":");
                _cIdxDList.push(null);
                _cIdxNList.push(null);
                let res = workSelector.workhistory.filter((raw : workHistoryType , idx : number )=> (raw.regiDt.indexOf(m.format("MM-DD")) != -1));
                for(var r of res){
                    tableDateList[tableDateList.length - 1] = r.startDt;
                    if(r.jobType.indexOf("001") != -1){
                        _cIdxDList[_cIdxDList.length - 1] = r.cIdx;
                        bodyListDay[bodyListDay.length - 1] = `${r.cmdAmt ? r.cmdAmt : ""}:${r.userName}`;
                    }
                    else{
                        _cIdxNList[_cIdxDList.length - 1] = r.cIdx;
                        bodyListNight[bodyListNight.length - 1] = `${r.cmdAmt ? r.cmdAmt : ""}:${r.userName}`;
                    }
                }
            }
            setCIdxDayList(_cIdxDList);
            setCIdxNightList(_cIdxNList);
            setHistoryTableDataDay(bodyListDay);
            setHistoryTableDataNight(bodyListNight);
            setHistoryTableHeadList(headList);
        } else {
            clearParam();
        }
    }, [workSelector.workhistory]);

    useEffect(() => {
        //작지 수립 조회 API
        if(workSelector.selectedProgCode != -1
            && workSelector.selectedEquipCode != -1
            && workSelector.cmdInfo 
            && workStartDate
            && workEndDate
            ){
            getWorkFixCall();
        }
    }, [ workSelector.selectedProgCode, workSelector.cmdInfo, workSelector.selectedEquipCode, workStartDate, workEndDate ]);

    const clearParam = ()=>{
        setSelectedcIdxList([]);
        setSelectedDateList([]);
        setSelectedDayNightList([]);
        setFlowTableRefresh(flowTableRefresh+1);
    }

    const getWorkFixCall = async ()=>{
        clearParam();
        await dispatch(GetWorkFix(
            userSelector.token, 
            workSelector.cmdInfo.cmdNo, 
            workSelector.selectedLine.lineNo, 
            workSelector.selectedProgCode,
            workSelector.selectedEquipCode,
            workStartDate ? workStartDate.format("YYYY-MM-DD") : moment().format("YYYY-MM-DD"),
            workEndDate ? workEndDate.format("YYYY-MM-DD") : moment().format("YYYY-MM-DD")
        ));
    }

    const onClickCell = (idx : number, row_idx : number)=>{
        if(idx == 0) return;
        let key = idx + row_idx * 7;
        let curIdx = row_idx == 0 ? cIdxDayList[idx-1] : cIdxNightList[idx-1];
        let find = selectedcIdxList.indexOf(curIdx ? curIdx : key * -1);
        if(find != -1){
            selectedcIdxList.splice(find, 1);
            selectedDateList.splice(find, 1);
            selectedDayNightList.splice(find, 1);
        }
        else{
            selectedcIdxList.push(curIdx ? curIdx : key * -1);
            selectedDateList.push(tableDateList[idx-1]);
            selectedDayNightList.push(row_idx == 0 ? "001" : "002");
        }
        setSelectedcIdxList([...selectedcIdxList]);
        setSelectedDateList([...selectedDateList]);
        setSelectedDayNightList([...selectedDayNightList]);
    }
    
    const genCommandsObj = (cIdx : number | null, date : string, jobType : string)=>{
        return {
            "cmdNo": workSelector.cmdInfo.cmdNo,
            "lineNo": workSelector.selectedLine.lineNo,
            "userNo": selectedWorker,
            "mchNo": workSelector.selectedEquipCode,
            "progNo": workSelector.selectedProgCode,
            "cIdx": cIdx,
            "cmdAmt": selectedAmt,
            "cmdUnit": workSelector.cmdInfo.cmdUnit,
            "startDt": date,
            "endDt": date,
            "jobType": jobType
        }
    }

    const onClickApplyBtn = async ()=>{
        setIsLoading(true);
        let _data = [];
        for(var i=0;i<selectedcIdxList.length;i++){
            let _cIdx = selectedcIdxList[i] < 0 ? null : selectedcIdxList[i];
            _data.push(genCommandsObj(_cIdx, selectedDateList[i], selectedDayNightList[i]));
        }
        if(_data.length == 0)
            return setIsLoading(false);

        await dispatch(SetWorkRegist(userSelector.token, _data));
        await getWorkFixCall();
        setTimeout(()=>setIsLoading(false),0);
    }

    const onClickDel = async ()=>{
        setIsLoading(true);
        let _data = [];
        for( var cIdx of selectedcIdxList){
            if(cIdx > 0) _data.push(cIdx);
        }
        if(_data.length == 0)
            return setIsLoading(false);

        await dispatch(DelWorkRegist(userSelector.token, _data));
        await getWorkFixCall();
        setTimeout(()=>setIsLoading(false),0);
    }
    
    const onClickApplyAllBtn = async (type : number)=>{
        setIsLoading(true);
        let _data = [];
        let _list = type == 1 ? cIdxDayList : type == 2 ? cIdxNightList : [...cIdxDayList, ...cIdxNightList];
        var i = 0;
        for( var cIdx of _list){
            let jobType = type == 1 ? "001" : type == 2 ? "002" : cIdxDayList.length > i ? "001" : "002";
            _data.push(genCommandsObj(cIdx, tableDateList[i % tableDateList.length], jobType));
            i++;
        }
        if(_data.length == 0)
            return setIsLoading(false);
        
        await dispatch(SetWorkRegist(userSelector.token, _data));
        await getWorkFixCall();
        
        setTimeout(()=>setIsLoading(false),0);
    }

    const onClickDelAll = async (type : number)=>{
        setIsLoading(true);
        let _data = [];
        let _list = type == 1 ? cIdxDayList : type == 2 ? cIdxNightList : [...cIdxDayList, ...cIdxNightList];
        for( var cIdx of _list){
            if(cIdx != null) _data.push(cIdx);
        }
        if(_data.length == 0)
            return setIsLoading(false);
        
        await dispatch(DelWorkRegist(userSelector.token, _data));
        await getWorkFixCall();
        
        setTimeout(()=>setIsLoading(false),0);
    }

    const onChangeWorkDate = (sd : Moment, ed ?: Moment)=>{
        setWorkStartDate(sd);
        if(ed) setWorkEndDate(ed);
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 500);
    }

    return (
        <WorkregistPageBlock className="workregist-page__container">
            <LoadingIndicatorComponent open={isLoading} />
            <PoptoolbarComponent 
                state={popToolbarStateEnum.del}
                onChangeDate={onChangeWorkDate}
                onClickBtn={()=>onClickDelAll(3)}
                isProgType={workInfo != null}
                isMoveBtn
                isItemType
                isCmdType
                isWeekMove
                />
            {workInfo &&
            <KeyvaltableComponent 
                data={workInfo}
                rowCount={3}
                />
            }
            {workSelector.workhistory &&
            <FlowTableComponent
                headList={historyTableHeadList}
                bodyList={{ 1 : historyTableDataDay, 2 : historyTableDataNight }}
                style={{ height : 'max-content', margin : 0 }}
                headStyle={{padding : "12px 10px"}}
                cellSelect={onClickCell}
                isCellSelect={true}
                isMultiCellSelect
                refresh={flowTableRefresh}
                />
            }
            {workSelector.workhistory &&
            <WorkRegistBtmDiv>
                <RegistBtmTableComponent 
                    cmdAmt={workSelector.cmdInfo.cmdAmt}
                    cmdUnit={workSelector.cmdInfo.cmdUnitName}
                    selectDate={"2019-03-15"}
                    workers={workSelector.workers}
                    onChangeAmt={(amt : number)=>setSelectedAmt(amt)}
                    onChangeDayNight={(flag : boolean)=>setSelectedDayNight(flag)}
                    onChangeWorker={(id:number)=>setSelectedWorker(id)}
                    />
                <WorkRegistBtmBtn 
                    $flex=".5"
                    $background="#49AB2B"
                    onClick={onClickApplyBtn}
                    >적용</WorkRegistBtmBtn>
                <WorkRegistBtmBtn 
                    $flex=".5"
                    $background="#DE5E61"
                    onClick={onClickDel}
                    >제거</WorkRegistBtmBtn>
                <WorkRegistBtmBtn 
                    $flex=".5"
                    $background="#DE5E61"
                    onClick={()=>onClickApplyAllBtn(3)}
                    >전체 적용</WorkRegistBtmBtn>
                <WorkRegistBtmBtn 
                    $flex=".5"
                    $background="#DE5E61"
                    onClick={()=>onClickDelAll(3)}
                    >전체 삭제</WorkRegistBtmBtn>
                <WorkRegistBtmBtnGroup>
                    <BtmBtnRight 
                        $background="#1267B2"
                        onClick={()=>onClickApplyAllBtn(1)}
                        >주간 전체 적용</BtmBtnRight>
                    <BtmBtnRight 
                        $background="#1267B2"
                        onClick={()=>onClickApplyAllBtn(2)}
                        >야간 전체 적용</BtmBtnRight>
                    <BtmBtnRight 
                        $background="#df4e50"
                        onClick={()=>onClickDelAll(1)}
                        >주간 전체 삭제</BtmBtnRight>
                    <BtmBtnRight 
                        $background="#df4e50"
                        onClick={()=>onClickDelAll(2)}
                        >야간 전체 삭제</BtmBtnRight>
                </WorkRegistBtmBtnGroup>
            </WorkRegistBtmDiv>
            }
        </WorkregistPageBlock>
    );
}

type styleProps = {
    $flex ?: string;
    $selected ?: boolean;
    $background ?: string;
}

const WorkregistPageBlock = styled(Content)`
    display : flex;
    justify-content : flex-start;
    align-items : center;
    flex-direction: column;
    width : 100%;
    height : 100%;
    flex : none;
    overflow : auto;
    gap : 2em;
`;

const WorkRegistBtmDiv = styled.div`
    display : flex;
    flex-wrap : wrap;
    gap : 1.2em;
    flex-direction : row;
    width : 100%;
    min-height: 120px;
`;

const WorkRegistBtmBtn = styled(Button)`
    flex : ${(props : styleProps)=> props.$flex};  
    &:hover{
        background-color : ${(props : styleProps)=> props.$background};
        opacity : 0.9;
    }
    background-color : ${(props : styleProps)=> props.$background};
    font-size : 1.4em;
    color : white;
`;

const WorkRegistBtmBtnGroup = styled.div`
    display : flex;
    justify-content : center;
    align-items : center;
    flex-wrap : wrap;
    width : 100%;
    height : 100%;
    flex : 1.5;
    gap : 3%;
`;

const BtmBtnRight = styled(Button)`
    width : 45%;
    height : 48%;
    &:hover{
        background-color : ${(props : styleProps)=> props.$background};
        opacity : 0.9;
    }
    background-color : ${(props : styleProps)=> props.$background};
    font-size : 1.2em;
    color : white;
`;