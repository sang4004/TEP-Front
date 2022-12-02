/******************************************************************************
 * Copyright (c) 2021. Moornmo Inc. Rights reserved.                          *
 * Data modelings and methods used are assets of Moornmo Inc.                 *
 * barcode/index.tsx
 * hooks :
    *
 * last modify : jh.jeong
 ******************************************************************************/
// Library
import React, { useState, useEffect } from "react"; // default hooks
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
//
// Module
import { useLocations } from "hooks" // locations hooks
//
type styledProps = {

}

export type barcodeProps = {
    style ?: object   
}
interface FinalbarcodeProps extends barcodeProps {};

export const BarcodeComponent : React.FunctionComponent<FinalbarcodeProps> = ( props )=>{
    const { back, existBack, path } = useLocations();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    
    useEffect(()=>{
        // initialize here
    }, []);

    return (
        <BarcodeContainer 
            style={props.style}
            className="barcode"
            >
            <BarcodeLeftGroup>
                <BarcodeLOTText>LOT</BarcodeLOTText>
                <BarcodeScanDiv>바코드 스캔</BarcodeScanDiv>
            </BarcodeLeftGroup>
            <BarcodeRightGroup>
                <BarcodeRightBtn>
                    <span className="material-icons">check</span>
                    확인
                </BarcodeRightBtn>
            </BarcodeRightGroup>
        </BarcodeContainer>
    );
}

const BarcodeContainer = styled.div`
    width : 100%;
    height : 60px;
    margin : 0;
    display : flex;
    justify-content : flex-start;
    align-items : center;
    border : 1px solid #D5D5D5;
    background-color : white;
    padding : 0 10px;
`;

const BarcodeLeftGroup = styled.div`
    flex : 1;
    display : flex;
    justify-content :flex-start;
`;

const BarcodeLOTText = styled(Typography)`
    font-size : 1.2em;
    font-weight : 400;
    margin : 0 1em 0 1.4em;
`;

const BarcodeScanDiv = styled.div`
    flex : 1;
    display : flex;
    justify-content : center;
    align-items : center;
    border : 1px solid;
    color : gray;
`;

const BarcodeRightGroup = styled.div`
    flex : 1;
    display : flex;
    justify-content : flex-end;
`;

const BarcodeRightBtn = styled(Button)`
    display : flex;
    justify-content : center;
    align-items : center;
    color : white;
    font-size : 1em;
    background-color : #1267B2;
    border : 1px solid #0267be;
    border-radius : 0;
    margin : 0 10px;
    padding-right : 20px;
    height : 36px;
    &:hover{
       background-color : #0c437a;
    }
`;