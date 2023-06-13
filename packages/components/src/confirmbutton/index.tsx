import React, { useEffect, useState } from "react";

import { Button, ButtonProps } from "antd";
import styled from "styled-components";

export type ConfirmButtonProps = {
    isShadow ?: boolean,
}
interface FinalButtonProps extends ConfirmButtonProps, ButtonProps {};

export const ConfirmButton : React.FunctionComponent<FinalButtonProps> = ( props )=>{
    return (
        <Btn 
            className={props.className} 
            style={ props.style }
            onClick={props.onClick}
            loading={props.loading}
            >
            {props.children}
        </Btn>
    );
}

const Btn = styled(Button)`
    display : flex;
    justify-content : center;
    align-items : center;
    margin : 0;
`