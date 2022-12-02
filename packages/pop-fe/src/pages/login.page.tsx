/******************************************************************************
 * Copyright (c) 2021. Moornmo Inc. Rights reserved.                          *
 * Data modelings and methods used are assets of Moornmo Inc.                 *
 * hooks :
    * useLocations 
 * components : 
    * LoadingIndicatorComponent
    * FuseLoginPage
 * last modify : jh.jeong
 ******************************************************************************/
//Library
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Typography } from "antd";
import { Shortcuts } from "shortcuts";
// import ip from "ip";
//
// Module
import { 
    Login,
} from "common_module";
import { reducerState } from "../common";
import { useInput, useLocations } from "hooks";
import { Box, ModalWarning, ConfirmButton, LoadingIndicatorComponent } from "components";
import FuseLoginPage from "../@fuse_app/main/login/Login";
//

const shortcuts = new Shortcuts();
const { Title } = Typography;

export const LoginPage = ()=> {
    const userSelector = useSelector((state: reducerState) => state.user);
    const dispatch = useDispatch();
    const { pushHistory } = useLocations();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        shortcuts.add([
            {
                shortcut : "F2",
                handler : ()=>{
                    dispatch(Login("admin", "admin"));
                    setIsLoading(true);
                    return true;
                }
            }
        ])
    }, []);

    useEffect(()=>{
        if(userSelector.id != null && userSelector.token){
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
                setTimeout(() => {
                    pushHistory("/");
                }, 300);
            }, 1500);
        }
        return ()=>{
            shortcuts.reset();
        }
    }, [userSelector.id]);

    return (
        <LoginPageContainer>
            <LoadingIndicatorComponent open={isLoading} />
            <FuseLoginPage></FuseLoginPage>
        </LoginPageContainer>
    );
}

const LoginPageContainer = styled.div`
    width : 100%;
    height : 100%;
`;