/******************************************************************************
 * hooks :
 * useLocations
 * components :
 * LoadingIndicatorComponent
 * FuseLoginPage
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
import { CleanSignUp } from "../common/action";
import { reducerState } from "../common";
import { useInput, useLocations } from "hooks";
import { LoadingIndicatorComponent, ModalInfo } from "components";
import FuseLoginPage from "../@fuse_app/Login";
//

const shortcuts = new Shortcuts();

const LoginPage = () => {
    const userSelector = useSelector((state: reducerState) => state.user);
    const dispatch = useDispatch();
    const { pushHistory } = useLocations();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        // shortcuts.add([
        //     {
        //         shortcut : "F2",
        //         handler : ()=>{
        //             dispatch(Login("admin", "admin12#", ""));
        //             setIsLoading(true);
        //             return true;
        //         }
        //     }
        // ]);
    }, []);

    useEffect(() => {
        if (userSelector.signup_success) {
            ModalInfo("신청완료.\n관리자에게 승인을 요청해주세요.");
            dispatch(CleanSignUp());
        }
    }, [userSelector.signup_success]);

    useEffect(() => {
        if ((userSelector.id != null && window.localStorage.getItem("access_token") != "") || (userSelector.edms_user_id != null && window.localStorage.getItem("edms_access_token") != "")) {
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
                setTimeout(() => {
                    pushHistory("/");
                }, 300);
            }, 1500);
        }
        return () => {
            shortcuts.reset();
        };
    }, [userSelector.id, userSelector.edms_user_id]);

    return (
        <LoginPageContainer>
            <LoadingIndicatorComponent open={isLoading} />
            <FuseLoginPage></FuseLoginPage>
        </LoginPageContainer>
    );
};

const LoginPageContainer = styled.div`
    width: 100%;
    height: 100%;
`;

export default LoginPage;
