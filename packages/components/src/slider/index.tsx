/******************************************************************************
 * Copyright (c) 2021. Moornmo Inc. Rights reserved.                          *
 * Data modelings and methods used are assets of Moornmo Inc.                 *
 ******************************************************************************/
import React, { useState, useEffect } from "react";
import { useLocations } from "hooks"
import { Divider } from "antd";

export const Slider  = ()=>{
    const [visible, setVisible] = useState<boolean>(false);

    const { back, existBack, path } = useLocations();
    useEffect(()=>{
        if(!visible && path && path.indexOf("login") == -1){
            setVisible(true);
        }
    }, [ path ]);

    return (
        <Divider
            style={!visible ? {display : "none"} : undefined}
            >
            FOOTER
        </Divider>
    );
}