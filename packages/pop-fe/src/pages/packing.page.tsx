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
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Layout } from "antd";
import { Button, Typography } from "@material-ui/core";
import { DeleteOutline } from "@material-ui/icons";
import styled from "styled-components";
//
// Module
import {
    GetPackingList,
    reducerState
} from "common_module";
import { 
    TableComponent
} from "components";
import { 
    PopPackingToolbarComponent
} from "../components";
import { useLocations } from "hooks";
import { objects2tabledata } from "utils_ts/lib";
//

const { Content } = Layout;

export const PackingPage = ()=> {
    const workSelector = useSelector((state: reducerState) => state.work);
    const dispatch = useDispatch();
    const history = useHistory();
    const {pushHistory} = useLocations();
    const [packingData, setPackingData] = useState<object[]>([]);

    useEffect(() => {
        dispatch(GetPackingList());
    }, []);

    useEffect(() => {
        if(workSelector.packingList && workSelector.packingList.length > 0){
            for( var data of workSelector.packingList){
                data["product_id"] = getPackingColorText(data["product_id"], "FA3824");
                data["product_name"] = getPackingColorText(data["product_name"], "258BC8");
                Object.assign(data, { cancel : getPackingCancelBtn(data["id"]) });
            }
            let res = objects2tabledata(workSelector.packingList);
            setPackingData(res);
        }
    }, [ workSelector.packingList ]);

    const getPackingColorText = (text : string, color : string) =>{
        return <span style={{ color : `#${color}`}}>{text}</span>
    }

    const getPackingCancelBtn = (id : number)=>{
        return (
            <PackingCancelBtn onClick={()=>onClickPackingCancel(id)}>
                <DeleteOutline />
                <PackingCancelBtnText>취소</PackingCancelBtnText>
            </PackingCancelBtn>
        );
    }

    const onClickPackingCancel = (id : number)=>{
        alert(id + " btn clicked");
        return;
    }

    return (
        <PackingPageBlock className="packing-page__container">
            <PopPackingToolbarComponent />
            <TableComponent 
                data={packingData} 
                isEdit={false}
                headSize={[100, 300, 300, 350, 450, 350, 350, 300, 200]} 
                headStyle={{height : "44px"}}
                style={{ margin : 0 }}
                multiSelect
                />
        </PackingPageBlock>
    );
}

const PackingPageBlock = styled(Content)`
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

const PackingCancelBtn = styled(Button)`
    display : flex;
    justify-content : flex-start;
    align-items : center;
    width : 100%;
    background-color : #DE5E61;
    color : white;
    border-radius : 0;
`;

const PackingCancelBtnText = styled(Typography)`
    flex : 1;
    text-align : center;
`;