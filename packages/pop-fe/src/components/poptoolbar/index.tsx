/******************************************************************************
 * Copyright (c) 2021. Moornmo Inc. Rights reserved.                          *
 * Data modelings and methods used are assets of Moornmo Inc.                 *
 * poptoolbar/index.tsx
 * hooks :
    * useLocations 
    *
 * last modify : 
 ******************************************************************************/
// Library
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useSelector, useDispatch } from "react-redux"; // redux
import React, { useState, useEffect } from "react"; // default hooks
import styled from "styled-components";
import { Typography, Button, TextField } from "@material-ui/core";
import { DatePicker, DatePickerView } from "@material-ui/pickers";
import { DateRange, OnChangeProps, Range, RangeWithKey } from "react-date-range";
//
// Module
import { 
    useLocations,
    useOutsideClick as UseOutsideClick
} from "hooks" // locations hooks
import { 
    reducerState,
    GetEquipCodes,
    SetEquipCodes,
    GetProgCodes,
    SetProgCode,
    GetCmdInfo,
    equipCodesType,
    progCodesType,
} from "common_module";
import moment, { Moment } from "moment";
import { AutoComboboxComponent, comboboxData } from "components";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
//

type styledProps = {
    $selected ?: boolean;
    $arrowDir ?: string;
    $background ?: string;
    $onlyLeft ?: boolean;
    $justifyC ?: string;
}

export enum popToolbarStateEnum { 
    "add", "del", "confirm", "regist", "none"
}

export type poptoolbarProps = {
    style ?: object;
    state ?: popToolbarStateEnum;
    isMoveBtn ?: boolean;
    children ?: React.ReactNode;
    dateTypes ?: DatePickerView[];
    isWeekMove ?: boolean;
    onChangeDate ?: (d:Moment, ed ?: Moment)=>void;
    onClickBtn ?: ()=>void;
    isItemType ?: boolean;
    isCmdType ?: boolean;
    isProgType ?: boolean;
}
interface FinalpoptoolbarProps extends poptoolbarProps {};

export const PoptoolbarComponent : React.FunctionComponent<FinalpoptoolbarProps> = ( props )=>{
    const dispatch = useDispatch();
    const workSelector = useSelector((state : reducerState)=> state.work);
    const userSelector = useSelector((state : reducerState)=> state.user);
    
    const [cmdText, setCmdText] = useState<string>("");
    const [cmdTextFocus, setCmdTextFocus] = useState<boolean>(false);
    const [equipCodes, setEquipCodes] = useState<comboboxData[]>([]);
    const [progCodes, setProgCodes] = useState<comboboxData[]>([]);
    const [selectedDate, setSelectedDate] = useState<Moment>(moment());
    const [selectedEndDate, setSelectedEndDate] = useState<Moment>(moment());
    const [isActiveDateRange, setIsActiveDateRange] = useState<boolean>(false);
    
    useEffect(()=>{
        // initialize here
        if(props.isWeekMove){
            setSelectedDate(moment().startOf("week").add(1, "days"));
            setSelectedEndDate(moment().endOf("week").add(1, "days"));
        }
    }, []);

    useEffect(() => {
        if(props.onChangeDate){
            if(props.isWeekMove && moment.duration(selectedEndDate.diff(selectedDate)).asDays() < 1)
                return;
            props.onChangeDate(selectedDate, selectedEndDate);
        }
    }, [ selectedDate, selectedEndDate ]);

    useEffect(() => {
        if(workSelector.cmdInfo){
            if(cmdText.indexOf(workSelector.cmdInfo.cmdNo) == -1)
                setCmdText(workSelector.cmdInfo.cmdNo);
            dispatch(GetProgCodes(userSelector.token, workSelector.cmdInfo.itemNo));
        }
    }, [workSelector.cmdInfo]);

    useEffect(() => {
        if(workSelector.equipCodes){
            setEquipCodes([
                ...workSelector.equipCodes.map((raw : equipCodesType, idx : number)=>{
                    return {
                        label : `${raw.itemName}[${raw.itemNumber}]`,
                        value : raw.itemNo
                    }
                })
            ]);
        }
    }, [workSelector.equipCodes]);

    useEffect(() => {
        if(workSelector.progCodes){
            setProgCodes([
                ...workSelector.progCodes.map((raw : progCodesType, idx : number)=>{
                    return {
                        label : `${raw.progName}`,
                        value : raw.progNo
                    }
                })
            ]);
        }
    }, [ workSelector.progCodes ]);

    const onChangeCmd = ()=>{
        if(cmdText && cmdText.length > 0){
            if(workSelector.cmdInfo && cmdText == workSelector.cmdInfo.cmdNo)
                return;

            dispatch(GetCmdInfo(userSelector.token, cmdText));
        }
    }
    
    const onChangeDate = (date : MaterialUiPickersDate) =>{
        setSelectedDate(moment(date));
        // if(props.onChangeDate)
        //     props.onChangeDate(date);
    }

    const onChangeDateRange = (date : Range)=>{
        if(date.startDate && date.endDate){
            setSelectedDate(moment(date.startDate));
            setSelectedEndDate(moment(date.endDate));
        }
        // if(props.onChangeDate)
        //     props.onChangeDate(moment(date.startDate), moment(date.endDate) );
    }
    
    const onClickCB = (type : string, id : number)=>{
        switch(type){
            case "item" : 
                dispatch(SetEquipCodes( id ));
                break;
            case "prog" :
                dispatch(SetProgCode(id));
                break;
            default : 
                break;
        }
    }

    const getRightBtn = ()=>{
        switch(props.state){
            case popToolbarStateEnum.none : 
                return null;
            case popToolbarStateEnum.del :
                return (
                    <ToolBarCDBtn onClick={props.onClickBtn} $background="#DE5E61">
                        <span className="material-icons">delete</span>
                        삭제
                    </ToolBarCDBtn>
                );
            case popToolbarStateEnum.confirm :
                return (
                    <ToolBarCDBtn onClick={props.onClickBtn}>
                        <span className="material-icons">check</span>
                        확인
                    </ToolBarCDBtn>
                );
            case popToolbarStateEnum.regist:
                return (
                    <ToolBarCDBtn onClick={props.onClickBtn}>
                        <span className="material-icons">add</span>
                        등록
                    </ToolBarCDBtn>
                );
            case popToolbarStateEnum.add : 
            default : 
                return (
                    <ToolBarCDBtn onClick={props.onClickBtn}>
                        <span className="material-icons">add</span>
                        추가
                    </ToolBarCDBtn>
                );
        }
    }

    const getMoveBtn = (type : string)=>{
        var isDateSelectFlag = props.dateTypes ? props.dateTypes.indexOf("date") != -1 : false;
        if(!props.isMoveBtn || isDateSelectFlag)
            return;
        return (
            <MoveBtn onClick={()=>onClickMoveBtn(type)}>
                <ToolbarArrow $arrowDir={type} />
            </MoveBtn>
        )
    }

    const onClickMoveBtn = ( dir : string )=>{
        if(props.isWeekMove){
            let _date = dir == "left" ? selectedDate : selectedEndDate;
            _date.add(dir == "left" ? -2 : 2, "day");
            var startOfWeek = moment(_date).startOf('week').add(1, "days");
            setSelectedDate(startOfWeek);
            var endOfWeek = moment(_date).endOf('week').add(1, "days");
            setSelectedEndDate(endOfWeek);
        } else if(props.dateTypes && props.dateTypes.indexOf("date") != -1){
            // move 1 day
            let _date = selectedDate;
            _date.add(dir == "left" ? -1 : 1, "days");
            setSelectedDate(_date);
        } else {
            // move month
            let _date = selectedDate;
            _date.add(dir == "left" ? -1 : 1 , "months");
            setSelectedDate(moment(_date));
        }
    }

    const getCombobox = ( type : string, label : string )=>{
        let data : comboboxData[];
        let _default = null;
        switch(type){
            case "item" :
                data = equipCodes;
                _default = workSelector.selectedEquipCode;
                break;
            case "prog" : 
                data = progCodes;
                _default = workSelector.selectedProgCode;
                break;
            default : 
                data = [];
                break;
        }
        return (
            <AutoComboboxComponent
                data={data}
                label={label}
                onChange={(val)=>onClickCB(type, val)}
                labelStyle={{fontSize : "1.2em", paddingLeft : "10px", color : "#909399", fontWeight : 500}}
                disabled={data.length == 0}
                default={_default}
                />
        )
    }

    const getCmdTextField = (label : string) => {

        const onChangeCmdText = (e : any)=>{
            setCmdText(e.target.value);
        }

        const onPressKey = (e : any)=>{
            if(e.keyCode == 13) {
                onBlur();
            }
        }

        const onBlur = ()=>{
            setCmdTextFocus(false);
            onChangeCmd();
        }

        return (
            <TextField 
                label={label}
                variant="outlined"
                InputLabelProps={{
                    style: !cmdTextFocus && cmdText == "" ? {
                        top : "-.5em", 
                        left : 0,
                    } : {}
                }}
                onFocus={()=>setCmdTextFocus(true)}
                onBlur={onBlur}
                value={cmdText}
                onChange={onChangeCmdText}
                onKeyDown={onPressKey}
                />
        )
    }

    var isDateSelectFlag = props.dateTypes ? props.dateTypes.indexOf("date") != -1 : false;

    return (
        <PopToolbarContainer 
            className="poptoolbar"
            style={props.style}
            $onlyLeft={props.state == undefined}
            >
            <ToolbarLeftGroup
                $onlyLeft={props.state == undefined}
                >
                { props.isItemType && getCombobox("item", "설비코드") }
                { props.isCmdType && getCmdTextField("생산계획번호") }
                { props.isProgType && getCombobox("prog", "공정") }
            </ToolbarLeftGroup>

            <ToolbarRightGroup hidden={props.state == undefined}>
                {getMoveBtn("left")}
                {props.children ? 
                    props.children :
                    props.isWeekMove ? 
                    <DateTextBtn onClick={()=>setIsActiveDateRange(true)}>
                        {`${selectedDate.format("YYYY-MM-DD")} ~ ${selectedEndDate.format("MM-DD")}`}
                    </DateTextBtn>
                    : 
                    isDateSelectFlag ? 
                    <PopToolbarDateRangeBlock $justifyC={isDateSelectFlag ? "flex-end" : "center"}>
                        {!isActiveDateRange ? 
                        <DateTextBtn onClick={()=>setIsActiveDateRange(true)}>
                            {`${selectedDate.format("YYYY-MM-DD")} ~ ${selectedEndDate.format("YYYY-MM-DD")}`}
                        </DateTextBtn>
                        :
                        <UseOutsideClick
                            onClickOutside={()=>setIsActiveDateRange(false)}
                            >
                            <PopToolbarDateRange
                                onChange={(r : any )=>onChangeDateRange(r.selection)}
                                moveRangeOnFirstSelection={false}
                                editableDateInputs={false}
                                ranges={[
                                    {
                                        key : "selection",
                                        startDate : selectedDate.toDate(),
                                        endDate : selectedEndDate.toDate()
                                    }
                                ]}
                                showDateDisplay={true}
                                showMonthAndYearPickers={false}
                                showSelectionPreview={false}
                                showPreview={false}
                                />
                        </UseOutsideClick>
                        }
                    </PopToolbarDateRangeBlock>
                    :
                    <DatePicker
                        value={selectedDate} 
                        onChange={onChangeDate}
                        openTo={props.dateTypes && props.dateTypes.length > 0 ? props.dateTypes[props.dateTypes.length-1] : "year"}
                        variant="inline"
                        views={props.dateTypes && props.dateTypes.length > 0 ? props.dateTypes : ["year", "month"]}
                        inputProps={{
                            style : {
                                textAlign : "center",
                                border : "1px solid #D8D8D8",
                                height : "36px",
                                padding : "10px",
                                cursor : "pointer"
                            },
                            disableunderline : true,
                        }}
                        />
                }
                {getMoveBtn("right")}
                {getRightBtn()}
            </ToolbarRightGroup>

        </PopToolbarContainer>
    );
}

const PopToolbarDateRangeBlock = styled.div`
    width : 100%;
    height : 100%;
    display : flex;
    justify-content : ${(props : styledProps)=> props.$justifyC ? props.$justifyC : "center"};
    padding-right : ${(props : styledProps)=> props.$justifyC?.indexOf("flex-end") != -1 ? "20px" : 0};
    align-items : flex-start;
    position : relative;
`;

const PopToolbarDateRange = styled(DateRange)`
    z-index : 10;
    position : absolute;
    top : -28px;
`;

const PopToolbarContainer = styled.div`
    width : ${(props : styledProps)=> props.$onlyLeft ? `30%` : `100%`};
    ${(props : styledProps)=> props.$onlyLeft ? `min-width : 180px` : ``};
    height : 60px;
    margin : 0;
    padding : 0;
    display : flex;
    justify-content : flex-start;
    align-items : center;
    border : 1px solid #D5D5D5;
    background-color : white;
`;

const ToolbarText = styled(Typography)`
    text-align : center;
    width : ${(props : styledProps)=> props.$onlyLeft ? `30%` : `10%`};
    font-size : 1.2em;
`;

const ToolbarLeftGroup = styled.div`
    /* width : ${(props : styledProps)=> props.$onlyLeft ? `70%` : `50%`}; */
    height : 100%;
    display : flex;
    justify-content : ${(props : styledProps)=> props.$onlyLeft ? `center` : `flex-start`};
    flex-direction : row;
    align-items : center;
    overflow-x : auto;
    font-weight : 400;
    flex : 1;
    gap : 1em;
    padding-left : 10px;
`;

const ToolbarArrow = styled.div`
    ${(props : styledProps)=>props.$arrowDir == "left" ?  
    `border-top: 1px solid white;
    border-left: 1px solid white;`
    : 
    `border-bottom: 1px solid white;
    border-right: 1px solid white;`
    }
    width: 9px;
    height: 9px;
    transform: ${(props : styledProps)=>props.$arrowDir == "left" ?  "rotate(-45deg)" : "rotate(-45deg)" };
    ${(props : styledProps)=>props.$arrowDir == "left" ?  `margin-left : 3px;` : `margin-right : 3px` };
`;

const ToolbarRightGroup = styled.div`
    /* width : 40%; */
    display : flex;
    justify-content : flex-end;
    align-items : center;
    gap : 1em;
`;

const MoveBtn = styled(Button)`
    padding : 5px 10px;
    display : flex;
    justify-content : center;
    align-items : center;
    background-color : #6B7F8B;
    color : white;
    min-width : 30px;
    width : 40px;
    flex : none;
    height : 36px;
    border-radius : 0;
    border : 1px solid #5B7f8b;
    &:hover{
        background-color : #7B7f8b;
    }
`;

const ToolBarCDBtn = styled(Button)`
    display : flex;
    justify-content : center;
    align-items : center;
    color : white;
    font-size : 1em;
    background-color : ${(props : styledProps)=> props.$background ? props.$background : "#1267B2"};
    border : 1px solid ${(props : styledProps)=> props.$background ? props.$background : "#0267be"};
    border-radius : 0;
    margin : 0 10px;
    height : 36px;
    min-width : 70px;
    &:hover{
       background-color : ${(props : styledProps)=> props.$background ? props.$background : "#0c437a"};
    }
`;

const DateTextBtn = styled(Button)`
    padding : 5px 10px;
    display : flex;
    justify-content : center;
    align-items : center;
    color : #626262;
    border-radius : 0;
    border : 1px solid #D8D8D8;
    font-weight : 400;
`;