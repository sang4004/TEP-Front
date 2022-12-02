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
import styled from "styled-components";
import { Button, Typography } from "@material-ui/core";
//
// Module
import { useLocations } from "hooks";
import {
    GetBarcodeList,
    reducerState
} from "common_module";
import { 
    BarcodeComponent,
    TableComponent,
} from "components";
import {
    PopShipmentToolbarComponent,
} from "../components";
import { objects2tabledata } from "utils_ts/lib";
//

const { Content } = Layout;

export const ShipmentPage = ()=> {
    const workSelector = useSelector((state: reducerState) => state.work);
    const dispatch = useDispatch();
    const history = useHistory();
    const { pushHistory } = useLocations();
    
    const [barcodeData, setBarcodeData] = useState<object[]>([]);

    useEffect(() => {
        dispatch(GetBarcodeList());
    }, []);
    
    useEffect(() => {
        if(workSelector.barcodeList && workSelector.barcodeList.length > 0){
            setBarcodeData(objects2tabledata(workSelector.barcodeList));
        }
    }, [ workSelector.barcodeList ]);

    return (
        <ShipmentPageBlock className="shipment-page__container">
            <PopShipmentToolbarComponent />
            <BarcodeComponent />
            <TableComponent 
                isEdit={false}
                data={barcodeData}
                style={{margin : 0}}
                />
        </ShipmentPageBlock>
    );
}

const ShipmentPageBlock = styled(Content)`
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