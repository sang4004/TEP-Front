/******************************************************************************
 * Copyright (c) 2021. Moornmo Inc. Rights reserved.                          *
 * Data modelings and methods used are assets of Moornmo Inc.                 *
 * hooks :
    * useLocations 
 * components : 
    * 
 * last modify : jh.jeong
 ******************************************************************************/
//Library
import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Layout, Typography } from "antd";
import styled from "styled-components";
//
//Module
import { reducerState } from "common_module";
import { ConfirmButton } from "components";
import { useLocations } from "hooks";
//
// antd components
const { Content } = Layout;
const { Text } = Typography;
//
export const MainPage = (props : any)=> {
    const dispatch = useDispatch();
    const userSelector = useSelector((state: reducerState) => state.user);
    const history = useHistory();
    
    const {pushHistory} = useLocations();

    const onClickProj = ()=>{
        pushHistory("/project");
    }

    return (
        <MainPageContainer 
			className="main-page__container"
			>
            <Text code>MAIN PAGE</Text>
            <ConfirmButton onClick={onClickProj}>
                SHOW PROJECT ALL
            </ConfirmButton>
        </MainPageContainer>
    );
};

const MainPageContainer = styled.div`
	display : flex;
	justify-content : center;
	align-items : center;
	flex-direction : column;
	width : 100%;
	height : 100%;

`;