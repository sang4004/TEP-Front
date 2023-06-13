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
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Layout } from "antd";
import styled from "styled-components";
import { Button, Typography } from "@material-ui/core";
//
// Module
import { 
   GetPerfInfo,
   GetPerfStat,
   GetMaterialInfo,
   reducerState
} from "common_module";
import { 
    TableComponent,
    FlowTablePOPComponent,
    KeyvaltableComponent
} from "components";
import {
    PoptoolbarComponent,
    popToolbarStateEnum,
} from "../components";
import { useLocations } from "hooks";
//

const { Content } = Layout;

export const PfregistPage = ()=> {
    const workSelector = useSelector((state: reducerState) => state.work);
    const dispatch = useDispatch();
    const history = useHistory();
    const {pushHistory} = useLocations();
    const [selectedBtnId, setSelectedBtnId] = useState<number>(0);

    const onClickTableBtn = (num : number)=>{
        if(num != selectedBtnId)
            setSelectedBtnId(num);
    }

    useEffect(() => {
        dispatch(GetPerfInfo());
        dispatch(GetPerfStat());
        if(workSelector.matSmallInfo == undefined)
            dispatch(GetMaterialInfo());
    }, []);
    
    return (
        <PfregistPageBlock className="pfregist-page__container">
            <PoptoolbarComponent
                state={popToolbarStateEnum.confirm}
                />
            <PfregistFlowTableGroupDiv>
                <PfregistFlowTable
                    $flowTableDir="left"
                    >
                    <FlowTablePOPComponent 
                        data={workSelector.perfStatSimple}
                        />
                </PfregistFlowTable>
                <PfregistFlowTable
                    $flowTableDir="right"
                    >
                    <FlowTablePOPComponent 
                        data={workSelector.perfStatDetail}
                        />
                </PfregistFlowTable>
            </PfregistFlowTableGroupDiv>
            <PfregistInfoGroupDiv>
                <PfregistInfoDiv>
                    <PfregistInfoTitle>작지 정보</PfregistInfoTitle>
                    <KeyvaltableComponent 
                        style={{border : "none", padding : "1em .5em"}}
                        data={workSelector.matSmallInfo}
                        rowCount={2}
                        />
                </PfregistInfoDiv>
                <PfregistInfoDiv>
                    <PfregistInfoTitle>원소재 정보</PfregistInfoTitle>
                    <KeyvaltableComponent 
                        style={{border : "none", padding : "1em .5em"}}
                        data={workSelector.perfInfo}
                        rowCount={2}
                        />
                </PfregistInfoDiv>
            </PfregistInfoGroupDiv>
            <PfregistTableBtnGroup>
                <PfregistTableBtn 
                    className={selectedBtnId == 0 ? "active" : ""}
                    onClick={()=>onClickTableBtn(0)}
                    >작지 기준 보기</PfregistTableBtn>
                <PfregistTableBtn 
                    className={selectedBtnId == 1 ? "active" : ""}
                    onClick={()=>onClickTableBtn(1)}
                    >LOT 기준 보기</PfregistTableBtn>
            </PfregistTableBtnGroup>
            <TableComponent 
                isEdit={false}
                data={selectedBtnId==0? workSelector.perfSmall : workSelector.perfLot}
                style={{height : "max-content"}}
                />
        </PfregistPageBlock>
    );
}

type styledProps = {
    $flowTableDir : string;
}

const PfregistPageBlock = styled(Content)`
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

const PfregistFlowTableGroupDiv = styled.div`
    display : flex;
    justify-content : center;
    align-items : center;
    flex-direction : row;
    gap : 1em;
    width : 100%;
`;

const PfregistFlowTable = styled.div`
    display : flex;
    flex : ${(props: styledProps)=> props.$flowTableDir == "left" ? 1 : 5};
`;

const PfregistInfoGroupDiv = styled.div`
    display : flex;
    justify-content : center;
    align-items : center;
    gap : 1em;
    width : 100%;
`;

const PfregistInfoDiv = styled.div`
    flex : 5;
    border : 1px solid #dedede;
    background-color : white;
    padding : 10px;
`;

const PfregistInfoTitle = styled(Typography)`
    font-size : 1.5em;
    padding-left : .5em;
`;

const PfregistTableBtnGroup = styled.div`
    width : 100%;
    display : flex;
    justify-content : flex-start;
    align-items : center;
    gap : 1em;
`;

const PfregistTableBtn = styled(Button)`
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