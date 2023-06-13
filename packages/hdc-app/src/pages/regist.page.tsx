/******************************************************************************
 * hooks :
 * useLocations
 * components :
 * LoadingIndicatorComponent
 * FuseRegisterPage
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
import { GetOrganization, GetPositionList, GetEdmsOranization } from "../common/action";
import { reducerState } from "../common";
import { useInput, useLocations } from "hooks";
import { LoadingIndicatorComponent } from "components";
import FuseRegisterPage from "../@fuse_app/Register";
//

const shortcuts = new Shortcuts();
const { Title } = Typography;

const RegistPage = () => {
    const userSelector = useSelector((state: reducerState) => state.user);
    const dispatch = useDispatch();
    const { pushHistory, path } = useLocations();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        dispatch(GetOrganization());
        dispatch(GetPositionList());
        dispatch(GetEdmsOranization());
    }, [path]);

    useEffect(() => {
        if (userSelector.signup_success) {
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
                setTimeout(() => {
                    pushHistory("/");
                }, 300);
            }, 1500);
        }
    }, [userSelector.signup_success]);

    return (
        <RegistPageContainer>
            <LoadingIndicatorComponent open={isLoading} />
            <FuseRegisterPage />
        </RegistPageContainer>
    );
};

const RegistPageContainer = styled.div`
    width: 100%;
    height: 100%;
`;

export default RegistPage;
