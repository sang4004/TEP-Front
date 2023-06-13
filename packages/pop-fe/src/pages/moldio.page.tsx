/******************************************************************************
 * hooks :
    * useLocations 
    *
 * components : 
    * 
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
    GetMoldList,
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
//

const { Content } = Layout;

export const MoldioPage = ()=> {
    const workSelector = useSelector((state: reducerState) => state.work);
    const dispatch = useDispatch();
    const history = useHistory();
    const {pushHistory} = useLocations();

    const [selectedBtn, setSelectedBtn] = useState<number>(0);

    const [moldList, setMoldList] = useState<object[]>([]);
    const [selectedMoldList, setSelectedMoldList] = useState<number[]>([]);
    
    useEffect(() => {
        dispatch(GetMoldList());
        if(workSelector.workinfo == undefined)
            dispatch(GetWorkData());
    }, []);

    useEffect(() => {
        if(workSelector.moldList){
            let idx = 0;
            for(var mold of workSelector.moldList){
                let _obj = mold;
                Object.assign(_obj, {"선택" : getSelectBtn(idx)});
                idx += 1;
            }
            setMoldList([...workSelector.moldList]);
        }
    }, [ workSelector.moldList, selectedMoldList ]);

    const onClickSelectBtn = (idx : number)=>{
        const selctedIdx = selectedMoldList.indexOf(idx);
        if(selctedIdx != -1){
            selectedMoldList.splice(selctedIdx,1);
            setSelectedMoldList([...selectedMoldList])
        } else {
            setSelectedMoldList([...selectedMoldList, idx]);
        }
    }

    const getSelectBtn = (idx : number)=>{
        const selected = selectedMoldList.indexOf(idx) != -1;
        return (
            <MoldSelectBtn
                $selected={selected}
                onClick={()=>onClickSelectBtn(idx)}
                key={idx}
                >
                <Icon>check</Icon>
                {selected ? "선택됨" : "선택"}
            </MoldSelectBtn>
        )
    }

    const onClickToolbarBtn = ( btn : number)=>{
        if(btn != selectedBtn){
            setSelectedBtn(btn);
        }
    }
    
    return (
        <MoldioPageBlock className="Badregist-page__container">
            <PoptoolbarComponent 
                state={popToolbarStateEnum.regist}
                >
                <MoldioToolbarBtnGroup>
                    <MoldioToolbarBtn 
                        $selected={selectedBtn == 0}
                        onClick={()=>onClickToolbarBtn(0)}
                        >출고</MoldioToolbarBtn>
                    <MoldioToolbarBtn 
                        $selected={selectedBtn == 1}
                        onClick={()=>onClickToolbarBtn(1)}
                        >회수</MoldioToolbarBtn>
                </MoldioToolbarBtnGroup>
            </PoptoolbarComponent>
            <KeyvaltableComponent 
                style={{border : "none", padding : "1em .5em", height : "auto"}}
                data={workSelector.workinfo}
                rowCount={3}
                />
            <TableComponent 
                isEdit={false}
                data={moldList}
                style={{height : "max-content"}}
                />
        </MoldioPageBlock>
    );
}

type styledProps = {
    $selected ?: boolean;
}

const MoldioPageBlock = styled(Content)`
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

const MoldioToolbarBtnGroup = styled.div`
    display : flex;
    justify-content : center;
    align-items : center;
    width : 30%;
    min-width : 120px;
`;

const MoldioToolbarBtn = styled(Button)`
    border : 1px solid #dedede;
    border-radius : 0;
    background-color : ${(props : styledProps)=> props.$selected ? `#1268B2` : `white`};
    color : ${(props : styledProps)=> props.$selected ? `white` : `black`};
    &:hover {
        background-color : ${(props : styledProps)=> props.$selected ? `#1678ce` : `white`};
    }
`;

const MoldSelectBtn = styled(Button)`
    border-radius : 0;
    background-color : ${(props : styledProps)=> props.$selected ? `#4B9BE4` : `white`};
    border : 1px solid #4B9BE4;
    color : ${(props : styledProps)=> props.$selected ? `white` : `#4B9BE4`};
`;