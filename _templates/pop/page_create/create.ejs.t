---
to: packages/pop-fe/src/pages/<%=name%>.page.tsx
---
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
import { Layout, Typography } from "antd";
import styled from "styled-components";
//
// Module
import { reducerState } from "../common/reducer";
import { ConfirmButton } from "../components";
import { useLocations } from "hooks";
//

const { Content } = Layout;
const { Text } = Typography;

export const <%=name.split("")[0].toUpperCase() + name.split("").splice(1, name.split("").length-1 ).join("")%>Page = ()=> {
    const userSelector = useSelector((state: reducerState) => state.user);
    const dispatch = useDispatch();
    const history = useHistory();
    const {pushHistory} = useLocations();

    return (
        <<%=name.split("")[0].toUpperCase() + name.split("").splice(1, name.split("").length-1 ).join("")%>PageBlock className="<%=name%>-page__container">
            <Text><%=name%> PAGE</Text>
        </<%=name.split("")[0].toUpperCase() + name.split("").splice(1, name.split("").length-1 ).join("")%>PageBlock>
    );
}

const <%=name.split("")[0].toUpperCase() + name.split("").splice(1, name.split("").length-1 ).join("")%>PageBlock = styled(Content)`
    display : flex;
    justify-content : center;
    align-items : center;
    flex-direction: column;
`;