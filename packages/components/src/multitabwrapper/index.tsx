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
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { AppBar, Tabs, Tab, makeStyles } from "@material-ui/core";
//
// Module
import { useLocations } from "hooks" // locations hooks
import { getLang } from "utils_js/lib/lang";
//

export type multitabwrapperProps = {
    SetStack : (_stack : string[])=>void;
    style ?: object;
}
interface FinalmultitabwrapperProps extends multitabwrapperProps {};

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

const blackList = ["/login"]

export const MultitabwrapperComponent : React.FunctionComponent<FinalmultitabwrapperProps> = ( props )=>{
    const multitabSelector = useSelector((state:any)=>state.multitab);
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();

    const { back, existBack, path } = useLocations();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [nowIdx, setNowIdx] = useState<number>(0);
    const [stack, setStack] = useState<string[]>([]);
    const [tabStack, setTabStack] = useState<React.ReactNode[]>([]);

    useEffect(()=>{
        if(multitabSelector.historyStack){
            setStack([...multitabSelector.historyStack]);
        }
    }, []);
    
    useEffect(()=>{
        // main page is workstat
    
        if(path && blackList.indexOf(path) == -1){
            let idx = stack.indexOf(path);
            if(idx == -1) {
                setStack([...stack, path]);
                setTabStack([...tabStack, props.children]);
                setNowIdx(stack.length);
                updateStack([...stack, path]);
            }
            else { setNowIdx(idx); }
        } 
    }, [path]);

    const updateStack = (_stack : string[])=>{ 
        props.SetStack(_stack);
        //dispatch(SetStack(_stack)) 
    }

    const onChangeTab = ( event ?: ChangeEvent<{}>, newVal ?: number )=>{
        if(newVal != null){
            setNowIdx(newVal);
            console.log(tabStack.length, newVal)
            history.push(stack[newVal]);
        }
    }

    const onCloseTab = ( val : number )=>{
        stack.splice(val, 1);
        tabStack.splice(val, 1);
        setStack([...stack]);
        setTabStack([...tabStack]);
        updateStack([...stack]);
        if(val == nowIdx)
            onChangeTab(undefined, stack.length -1);
    }

    const getClearIcon = (val : number)=>{
        if(stack.length -1 == 0)
            return (<TabCloseIcon className={classes.icon} />);
        return (
            <TabCloseIcon className={ classes.icon + " material-icons"} onClick={()=>onCloseTab(val)}>
                clear
            </TabCloseIcon>
        );
    }

    if(path == "/login")
        return (
            <>{props.children}</>
        )

    return (
        <div 
            style={props.style}
            className={classes.root + " multitabwrapper"}
            >
            <AppBar position="static" className={classes.appbar}>
                <Tabs value={nowIdx} onChange={onChangeTab}>
                    {stack.map((raw,idx)=>{
                        return ( <TabBtn key={idx} label={getLang(raw)} icon={getClearIcon(idx)} /> );
                    })}
                </Tabs>
                {stack.map((raw,idx)=>{
                    return (
                        <TabPanelDiv
                            enabled={nowIdx == idx}
                            key={idx}
                            >
                            {tabStack[idx] ? tabStack[idx] : props.children}
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

const TabCloseIcon = styled.span`
    font-size : 1.4em;
    margin-bottom : 0 !important;
`;

const TabPanelDiv = styled.div`
    width : 100%;
    height : 100%;
    display : ${(props:styledProps)=> props.enabled ? "flex" : "none"};
    justify-content : center;
    align-items : center;
`;