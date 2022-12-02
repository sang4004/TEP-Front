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
    badregistListObjectType,
    GetMaterialInfo,
    GetMaterialStat,
    GetBadStat,
    GetBadRegistList,
} from "common_module";
import { reducerState } from "../common";
import { 
    TableComponent,
    FlowTablePOPComponent,
    KeyvaltableComponent
} from "components";
import { 
    PoptoolbarComponent,
    popToolbarStateEnum
} from "../components";
import { useLocations } from "hooks";
import { table2data, objects2tabledata } from "utils_ts/lib";
import { getcheckfromid } from "utils_js/lib";
//

const { Content } = Layout;

export const BadregistPage = ()=> {
    const workSelector = useSelector((state: reducerState) => state.work);
    const dispatch = useDispatch();
    const history = useHistory();
    const {pushHistory} = useLocations();
    
    const [selectedBtnId, setSelectedBtnId] = useState<number>(0);
    
    const [badVal, setBadVal] = useState<string>("");
    const [selectedBadId, setSelectedBadId] = useState<number>(-1);
    const [selectedBadText, setSelectedBadText] = useState<string>("");
    //edit table variables;
    const [isEditTable, setIsEditTable] = useState<boolean>(false);
    const [badregistStat, setBadregistStat] = useState<object[]>([]);
    const [matUsedStat, setMatUsedStat] = useState<object[]>([]);
    
    useEffect(() => {
        dispatch(GetBadRegistList());
        dispatch(GetBadStat());
        if(workSelector.matSmallInfo == undefined)
            dispatch(GetMaterialInfo());
        if(workSelector.matUsedInfo == undefined)
            dispatch(GetMaterialStat());
    }, []);

    useEffect(()=>{
        if(workSelector.badregistStat){
            setBadregistStat(objects2tabledata(workSelector.badregistStat));
        }
    }, [ workSelector.badregistStat ]);

    useEffect(() => {
        if(workSelector.matUsedInfo)
            setMatUsedStat(workSelector.matUsedInfo);
    }, [ workSelector.matUsedInfo ]);
    
    const onClickTableBtn = (num : number)=>{
        if(num != selectedBtnId)
            setSelectedBtnId(num);
    }

    const onChangeBadVal = (e : ChangeEvent<HTMLTextAreaElement|HTMLInputElement>)=>{
        console.log(e.target.value);
        setBadVal(e.target.value);
    }

    const onClickBadregistListBtn = (id: number, text : string)=>{
        setSelectedBadId(id);
        setSelectedBadText(text);
    }

    const onClickBadregistBtn = ()=>{
        // TODO :: api call ( selectedBadId )
        console.log(workSelector.badregistStat);
        workSelector.badregistStat.push({
            bad_fit_id : "B1703-001-01",
            equipment : "FM-01",
            process : "단조성형",
            bad_code : selectedBadText,
            bad_amount : badVal,
            register : "이준수"
        })
        console.log(workSelector.badregistStat);
        setBadregistStat(objects2tabledata(workSelector.badregistStat));
        setBadVal("");
    }

    const onClickEdit = async ()=>{
        if(isEditTable){
            let res = null;
            console.log(badregistStat);
            if(selectedBtnId == 0){
                res = table2data(document, Object.keys(badregistStat[0]), badregistStat, "EDIT");
                setBadregistStat([...res]);
            }
            else{
                res = table2data(document, Object.keys(matUsedStat[0]), matUsedStat, "EDIT");
                setMatUsedStat([...res]);   
            }
            // await dispatch(UpdateEmployee(res))
        }
        setIsEditTable(!isEditTable)
    }

    const onClickDelete = async ()=>{
        if(isEditTable){
            let _list = selectedBtnId == 0 ? badregistStat : matUsedStat;
            let ids = [];
            let dataIds = [];
            let newList = [];
            for(var i=0;i<_list.length;i++){
                let checked = getcheckfromid( document , "checked" + i.toString());
                if(checked){
                    ids.push(i);
                    dataIds.push(Object.values(_list[i])[0]);
                } else {
                    newList.push(_list[i]);
                }
            }
            if(selectedBtnId == 0)
                setBadregistStat([...newList])
            else 
                setMatUsedStat([...newList]);
            // await dispatch(DeleteEmployee(ids));
        }
    }
    
    return (
        <BadregistPageBlock className="Badregist-page__container">
            <BadregistInfoGroupDiv>
                <BadregistInfoDiv>
                    <BadregistInfoTitle>작지 정보</BadregistInfoTitle>
                    <KeyvaltableComponent 
                        style={{border : "none", padding : "1em .5em", height : "80%"}}
                        data={workSelector.matSmallInfo}
                        rowCount={2}
                        />
                </BadregistInfoDiv>
                <BadregistInfoDiv>
                    <BadregistInfoTitle>불량 정보</BadregistInfoTitle>
                    <BadregistInfoList style={{padding : "1em .5em"}}>
                        {workSelector.badregistList && workSelector.badregistList.map((raw : badregistListObjectType, idx : number)=>{
                            return (
                                <BadregistInfoListBtn
                                    onClick={()=>onClickBadregistListBtn(raw.id,raw.text)}
                                    key={idx}
                                    >
                                    {raw.text}
                                </BadregistInfoListBtn>
                            );
                        })}
                    </BadregistInfoList>
                </BadregistInfoDiv>
            </BadregistInfoGroupDiv>
            <BadregistInfoGroupDiv
                style={{height : "10%"}}
                >
                <BadregistInputDiv $isVisible={false}/>
                <BadregistInputDiv $isVisible>
                    <BadregistInputKey>{selectedBadText}</BadregistInputKey>
                    <BadregistInputField 
                        value={badVal}
                        onChange={onChangeBadVal}
                        InputProps={{
                            style : {
                                height : "100%",
                                textAlign : "center"
                            },
                            disableUnderline : true,
                        }}
                        inputProps={{
                            style : {
                                textAlign : "center"
                            }
                        }}
                        />
                    <BadregistInputBtn
                        onClick={onClickBadregistBtn}
                        >
                        <Icon>add</Icon>
                        불량 등록
                    </BadregistInputBtn>
                </BadregistInputDiv>
            </BadregistInfoGroupDiv>
            <BadregistTableBtnGroup>
                <BadregistTableBtn 
                    className={selectedBtnId == 0 ? "active" : ""}
                    onClick={()=>onClickTableBtn(0)}
                    >등록된 불량 현황</BadregistTableBtn>
                <BadregistTableBtn 
                    className={selectedBtnId == 1 ? "active" : ""}
                    onClick={()=>onClickTableBtn(1)}
                    >투입된 자재 현황</BadregistTableBtn>
                <Button variant="contained" color={isEditTable? "primary" : "secondary"} onClick={onClickEdit}>{isEditTable? "완료" : "수정"}</Button>
                {isEditTable ? <Button  variant="contained" color={"secondary"} onClick={onClickDelete}>삭제</Button> : null}
            </BadregistTableBtnGroup>
            <TableComponent 
                isEdit={isEditTable}
                data={selectedBtnId==0 ? badregistStat : matUsedStat}
                style={{height : "max-content"}}
                exceptList={[0,1,2,5]}
                />
        </BadregistPageBlock>
    );
}

type styledProps = {
    $isVisible : boolean
}

const BadregistPageBlock = styled(Content)`
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

const BadregistInfoGroupDiv = styled.div`
    display : flex;
    justify-content : center;
    align-items : center;
    gap : 1em;
    width : 100%;
    height : 35%;
`;

const BadregistInfoDiv = styled.div`
    flex : 5;
    border : 1px solid #dedede;
    background-color : white;
    padding : 10px;
    height : 100%;
    display : flex;
    flex-direction : column;
`;

const BadregistInfoTitle = styled(Typography)`
    font-size : 1.5em;
    padding-left : .5em;
`;

const BadregistInfoList = styled.div`
    width : 100%;
    height : 85%;
    display : flex;
    justify-content : space-between;
    align-items : center;
    flex-wrap : wrap;
    gap : 0.5em;
    overflow-y : auto;
`;

const BadregistInfoListBtn = styled(Button)`
    background-color : #49A5A1;
    border : 1px solid #38807c;
    color : white;
    width : 22%;
    border-radius : 0;
    &:hover{
        background-color : #38807c;
    }
`;

const BadregistInputDiv = styled.div`
    display : flex;
    justify-content : center;
    align-items : center;
    padding : 10px 10px;
    height : 60px;
    flex : 1;
    ${(props : styledProps)=> props.$isVisible ? `border : 1px solid #dedede; background-color : white;` : ``};
    gap : .5em;
`;

const BadregistInputKey = styled.div`
    flex : 2;
    display : flex;
    justify-content : center;
    align-items :center;
    background-color : #ECECEC;
    border : 1px solid #D5D5D5;
    height : 100%;
`;

const BadregistInputField = styled(TextField)`
    flex : 1;
    border : 1px solid #d5d5d5;
    height : 100%;
    display : flex;
    justify-content : flex-end;
    font-size : 1em;
    padding : 0 10px;
`;

const BadregistInputBtn = styled(Button)`
    flex : 1;
    height : 100%;
    background-color : #1267B2;
    color : white;
    font-size : 1em;
    &:hover{
        background-color : #1372c5;
    }
`;

const BadregistTableBtnGroup = styled.div`
    width : 100%;
    display : flex;
    justify-content : flex-start;
    align-items : center;
    gap : 1em;
`;

const BadregistTableBtn = styled(Button)`
    border : 1px solid #dedede;
    border-radius : 0;
    background-color : white;
    color : black;
    font-weight : 400;
    padding : 10px 1.5em;
    &:hover, &.active{
        background-color : #1267B2;
        color : white;
    }
`;