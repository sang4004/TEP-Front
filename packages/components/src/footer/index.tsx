import React, { useState, useEffect } from "react";
import { useLocations } from "hooks"
import { Layout } from "antd";
const _Footer = Layout.Footer;

export const Footer  = ()=>{
    const [visible, setVisible] = useState<boolean>(false);

    const { back, existBack, path } = useLocations();
    useEffect(()=>{
        if(!visible && path && path.indexOf("login") == -1){
            setVisible(true);
        }
    }, [ path ]);

    return (
        <_Footer
            style={!visible ? {display : "none"} : undefined}
            >
            FOOTER
        </_Footer>
    );
}