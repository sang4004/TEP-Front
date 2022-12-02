/******************************************************************************
 * Copyright (c) 2021. Moornmo Inc. Rights reserved.                          *
 * Data modelings and methods used are assets of Moornmo Inc.                 *
 * loading_indicator/index.tsx
 * hooks :
    * useLocations 
    *
 * last modify : jh.jeong
 ******************************************************************************/
 
import { useSelector, useDispatch } from "react-redux"; // redux
import React, { useState, useEffect } from "react"; // default hooks
import Backdrop, { BackdropProps } from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import styled from "styled-components";

export type LoadingIndicatorProps = {
}
interface FinalLoadingIndicatorProps extends LoadingIndicatorProps, BackdropProps {};

export const LoadingIndicatorComponent = ( props : FinalLoadingIndicatorProps )=>{
    return (
        <Loading_indicatorContainer 
            style={props.style}
            className="loading_indicator"
            open={props.open}
            >
            <CircularProgress color="secondary" />
        </Loading_indicatorContainer>
    );
}

const Loading_indicatorContainer = styled(Backdrop)`
    z-index : 2;
    /* width : 100%;
    height : 100%;
    margin : 0;
    padding : 0;
    display : flex;
    justify-content : center;
    align-items : center;
    background-color : rgba(0,0,0,0.5); */
`;