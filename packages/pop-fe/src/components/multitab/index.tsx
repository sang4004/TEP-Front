/******************************************************************************
 * multitabwrapper/index.tsx
 * hooks :
    * useLocations 
    *
 * last modify : 
 ******************************************************************************/
// Library
import { useSelector, useDispatch } from "react-redux"; // redux
import React, { useState, useEffect, ChangeEvent } from "react"; // default hooks
import styled from "styled-components";
import { AppBar, Tabs, Tab, makeStyles } from "@material-ui/core";
//
// Module
//

export type multitabProps = {
    style ?: object,
    tabChildren : React.ReactNode[];
    stack : string[];
    onChange ?: (tab : string)=>void;
}
interface FinalmultitabProps extends multitabProps {};

const useStyles = makeStyles((theme) => ({
    root : {
        flex:1,
        // backgroundColor : theme.palette.primary.dark,
        backgroundColor : "transparent",
        width : "100%",
        height : "100%",
    },
    appbar : {
        backgroundColor : "transparent",
        color : theme.palette.primary.dark,
        boxShadow: "none",
        height : "100%",
    },
    icon : {
        position : "absolute",
        right : "10px",
        fontSize : "22px"
    }
}));

export const MultitabComponent : React.FunctionComponent<FinalmultitabProps> = ( props )=>{
    const classes = useStyles();
    const dispatch = useDispatch();

    const [nowIdx, setNowIdx] = useState<number>(0);
    const [stack, setStack] = useState<string[]>([]);
    const [tabStack, setTabStack] = useState<React.ReactNode[]>([]);

    useEffect(()=>{
        if(props.stack){
            setStack([...props.stack]);
            setTabStack([...props.tabChildren]);
        }
    }, []);

    const onChangeTab = ( event ?: ChangeEvent<{}>, newVal ?: number )=>{
        if(newVal != null && nowIdx != newVal){
            setNowIdx(newVal);
            if(props.onChange)
                props.onChange(stack[newVal]);
        }
    }

    return (
        <div 
            className={classes.root + " multitabwrapper"}
            >
            <AppBar position="static" className={classes.appbar}>
                <Tabs value={nowIdx} onChange={onChangeTab}>
                    {stack.map((raw,idx)=>{
                        return ( <TabBtn key={idx} label={raw} /> );
                    })}
                </Tabs>
                {stack.map((raw,idx)=>{
                    return (
                        <TabPanelDiv
                            enabled={nowIdx == idx}
                            key={idx}
                            style={props.style}
                            >
                            {props.tabChildren[idx]}
                        </TabPanelDiv>
                    );
                })}
            </AppBar>
        </div>
    );
}

type styledProps = {
    enabled : boolean
}

const TabBtn = styled(Tab)`
    min-height : 48px;
`;

const TabPanelDiv = styled.div`
    width : 100%;
    height : 100%;
    display : ${(props:styledProps)=> props.enabled ? "flex" : "none"};
    justify-content : center;
    align-items : center;
`;