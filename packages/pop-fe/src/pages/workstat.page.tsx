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
import React, { useState, useEffect, Profiler } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Layout, Typography } from "antd";
import styled from "styled-components";
import { DatePickerView } from "@material-ui/pickers";
//
// Module
import { 
    GetWorkStat,
    SetWorkStat,
    GetCmdInfo,
    reducerState
} from "common_module";
import { 
    TableComponent,
    LoadingIndicatorComponent
} from "components";
import { 
    PoptoolbarComponent,
    popToolbarStateEnum,
    MultitabComponent
} from "../components";
import { useLocations } from "hooks";
import moment, { Moment } from "moment";
import { objects2tabledata } from "utils_ts/lib";
import { Range } from "react-date-range";
//

const { Content } = Layout;
const { Text } = Typography;

const WORK_STAT_PRINT_KEYS = ["regiDt", "cmdNo", "itemName", "itemNumber", "itemSpec", "progName", "cmdAmt", "totalWorkAmt", "workRate"];
const dateFormat = "YYYY-MM-DD";
const monthFormat = "YYYY-MM";

export const WorkstatPage = ()=> {
    const userSelector = useSelector((state: reducerState) => state.user);
    const workSelector = useSelector((state: reducerState) => state.work);
    const dispatch = useDispatch();
    const history = useHistory();
    const {pushHistory} = useLocations();
    const [workstat, setWorkstat] = useState<object[]>([]);
    const [dateType, setDateType] = useState<DatePickerView[]>(["date"]);
    const [selectedDate, setSelectedDate] = useState<Moment>(moment());
    const [selectedEndDate, setSelectedEndDate] = useState<Moment>(moment());
    const [selectedRowIdx, setSelectedRowIdx] = useState<number>(-1);
    
    const tabStack = ["일 작업지시 상황", "월 작업지시 상황"];
    useEffect(()=>{
        if(workSelector.selectedLine){
            if(dateType.indexOf("date") != -1){
                dispatch(GetWorkStat(
                    userSelector.token,
                    "004", 
                    workSelector.selectedLine.lineNo, 
                    workSelector.selectedEquipCode, 
                    selectedDate.format(dateFormat), 
                    selectedEndDate.format(dateFormat), 
                    userSelector.id
                ));
            } else {
                dispatch(GetWorkStat(
                    userSelector.token,
                    "002", 
                    workSelector.selectedLine.lineNo, 
                    "",
                    selectedDate.format(monthFormat),
                    undefined,
                    userSelector.id
                ));
            }
        }
    }, [ workSelector.selectedLine, workSelector.selectedEquipCode ]);

    useEffect(() => {
        if(workSelector.selectedLine){
            if(dateType.indexOf("date") != -1){
                dispatch(GetWorkStat(
                    userSelector.token,
                    "004", 
                    workSelector.selectedLine.lineNo, 
                    workSelector.selectedEquipCode, 
                    selectedDate.format(dateFormat) ,
                    selectedEndDate.format(dateFormat), 
                    userSelector.id
                ));
            } else {
                dispatch(GetWorkStat(
                    userSelector.token,
                    "002", 
                    workSelector.selectedLine.lineNo, 
                    workSelector.selectedEquipCode, 
                    selectedDate.format(monthFormat),
                    undefined,
                    userSelector.id
                ));
            }
        }
    }, [selectedDate, selectedEndDate]);

    useEffect(() => {
        if(workSelector.workstat){
            setWorkstat(objects2tabledata(workSelector.workstat, WORK_STAT_PRINT_KEYS ));
        }
    }, [workSelector.workstat]);

    const onChangeTab = (tab : string)=>{
        if(tabStack.indexOf(tab) == 0){
            setDateType(["date"]);
            dispatch(GetWorkStat(
                userSelector.token,
                "004", 
                workSelector.selectedLine.lineNo,
                workSelector.selectedEquipCode, 
                selectedDate.format(dateFormat), selectedEndDate.format(dateFormat), 
                userSelector.id
            ));
        } else {
            setDateType(["year","month"]);
            dispatch(GetWorkStat(
                userSelector.token,
                "002", 
                workSelector.selectedLine.lineNo, 
                "", 
                selectedDate.format(monthFormat),
                undefined,
                userSelector.id
            ));
        }
    }

    const onChangeDate = (d : Moment, ed ?: Moment )=>{
        console.log(d, ed);
        if(workSelector.selectedLine){
            if(ed){
                setSelectedEndDate(ed);
            }
            setSelectedDate(d);
        }
    }

    const onClickAdd = ()=>{
        if(selectedRowIdx != -1){
            Object.assign(workSelector.workstat[selectedRowIdx], {regiDtRange : selectedDate.format(monthFormat)})
            dispatch(GetCmdInfo(userSelector.token, workSelector.workstat[selectedRowIdx].cmdNo));
            // dispatch(SetWorkStat(workSelector.workstat[selectedRowIdx]));
            history.push("/workregist");
        }
    }

    return (
        <WorkstatPageBlock className="workstat-page__container">
            <PoptoolbarComponent 
                dateTypes={dateType}
                state={dateType.indexOf("date") != -1 ? popToolbarStateEnum.none : popToolbarStateEnum.add}
                onChangeDate={onChangeDate}
                onClickBtn={onClickAdd}
                isMoveBtn
                isItemType={true}
                />
            <MultitabComponent 
                style={{ alignItems : "flex-start"}} 
                tabChildren={[
                    <TableComponent 
                        rowSelect={(idx:number)=>setSelectedRowIdx(idx)} 
                        style={{height : "max-content"}} 
                        isEdit={false} 
                        data={workstat}
                        />,
                    <TableComponent 
                        rowSelect={(idx:number)=>setSelectedRowIdx(idx)}
                        style={{height : "max-content"}} 
                        isEdit={false} 
                        data={workstat}
                        />
                ]} 
                stack={["일 작업지시 상황", "월 작업지시 상황"]} 
                onChange={onChangeTab}
                />
        </WorkstatPageBlock>
    );
}

const WorkstatPageBlock = styled(Content)`
    display : flex;
    justify-content : flex-start;
    align-items : center;
    flex-direction: column;
    width : 100%;
    height : 100%;
    flex : none;
    overflow : auto;
`;