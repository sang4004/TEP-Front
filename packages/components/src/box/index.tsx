/******************************************************************************
 * Copyright (c) 2021. Moornmo Inc. Rights reserved.                          *
 * Data modelings and methods used are assets of Moornmo Inc.                 *
 ******************************************************************************/
import React, { useEffect, useState } from "react";

import { Space, SpaceProps } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import styled from "styled-components";

export type BoxProps = {
    isShadow ?: boolean
}
interface FinalBoxProps extends BoxProps, SpaceProps {};

export const Box : React.FunctionComponent<FinalBoxProps> = ( props )=>{
    return (
        <Container 
            className={props.className} 
            style={props.style}
            direction={props.direction}
            >
            {props.children}
        </Container>
    );
}

const Container = styled(Space)`
    display : flex;
    justify-content : center;
    align-items : center;
`