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
import { DeleteOutline } from "@material-ui/icons";
//
// Module
import {
    GetLabelPrintList,
    reducerState
} from "common_module";
import { 
    TableComponent,
} from "components";
import {
    PoplabeltoolbarComponent,
    popToolbarStateEnum,
} from "../components";
import { useLocations } from "hooks";
import { objects2tabledata } from "utils_ts/lib";
const { Content } = Layout;
//

export const LabelprintPage = ()=> {
    const workSelector = useSelector((state: reducerState) => state.work);
    const dispatch = useDispatch();
    const history = useHistory();
    const {pushHistory} = useLocations();

    const [labelPrintData, setLabelPrintData] = useState<object[]>([]);
    
    useEffect(() => {
        dispatch(GetLabelPrintList());
    }, []);

    useEffect(() => {
        if(workSelector.labelPrintList && workSelector.labelPrintList.length > 0){
            for(var data of workSelector.labelPrintList){
                data["product_id"] = getLabelPrintColorText(data["product_id"], "FA3824");
                data["product_name"] = getLabelPrintColorText(data["product_name"], "258BC8");
                Object.assign(data, {cancel : getLabelprintCancelBtn(data.id) });
            }
            let res = objects2tabledata(workSelector.labelPrintList)
            setLabelPrintData(res);
        }
    }, [ workSelector.labelPrintList ]);

    const getLabelPrintColorText = (text : string, color : string) =>{
        return <span style={{ color : `#${color}`}}>{text}</span>
    }

    const getLabelprintCancelBtn = (id : number)=>{
        return (
            <LabelprintCancelBtn onClick={()=>onClickLabelprintCancel(id)}>
                <DeleteOutline />
                <LabelprintCancelBtnText>취소</LabelprintCancelBtnText>
            </LabelprintCancelBtn>
        );
    }

    const onClickLabelprintCancel = (id : number)=>{
        alert(id+ " btn clicked");
        return;
    }

    return (
        <LabelprintBlock className="Labelprint-page__container">
            <PoplabeltoolbarComponent 
                />
            <TableComponent 
                isEdit={false}
                data={labelPrintData}
                headSize={[100, 300, 300, 400, 300, 250, 250, 300, 150]}
                headStyle={{height : "42px"}}
                multiSelect
                // style={{height : "max-content"}}
                />
        </LabelprintBlock>
    );
}

type styledProps = {
    $selected ?: boolean;
}

const LabelprintBlock = styled(Content)`
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

const LabelprintCancelBtn = styled(Button)`
    display : flex;
    justify-content : flex-start;
    align-items : center;
    width : 100%;
    background-color : #DE5E61;
    color : white;
    border-radius : 0;
`;

const LabelprintCancelBtnText = styled(Typography)`
    flex : 1;
    text-align : center;
`;