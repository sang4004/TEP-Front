/******************************************************************************
 * Copyright (c) 2021. Moornmo Inc. Rights reserved.                          *
 * Data modelings and methods used are assets of Moornmo Inc.                 *
 * keyvaltable/index.tsx
 * hooks :
    * useLocations 
    *
 * last modify : 
 ******************************************************************************/
// Library
import { useSelector, useDispatch } from "react-redux"; // redux
import React, { useState, useEffect } from "react"; // default hooks
import styled from "styled-components";
//
// Module
import { useLocations } from "hooks" // locations hooks
//

export type keyvaltableProps = {
    style ?: object;
    data ?: object;
    rowCount ?: number;
    isOption ?:boolean;
}
interface FinalkeyvaltableProps extends keyvaltableProps {};

export const KeyvaltableComponent : React.FunctionComponent<FinalkeyvaltableProps> = ( props )=>{
    const { back, existBack, path } = useLocations();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [dataKeys, setDataKeys] = useState<string[]>([]);
    const [dataValues, setDataValues] = useState<any[]>([]);
    const [valWidth, setValWidth] = useState<string>("31%");
    
    useEffect(()=>{
        if(props.data && Object.keys(props.data).length != 0){
            setDataKeys(Object.keys(props.data));
            setDataValues(Object.values(props.data));
            if(props.rowCount){
                setValWidth( 96 / props.rowCount + "%");
            }
        }
    }, [ props.data ]);

    return (
        <KeyvaltableContainer 
            style={props.style}
            className="keyvaltable"
            >
            {dataKeys.map((raw,idx)=>{
                if(dataValues[idx].children){
                    return( 
                        <KeyvalDiv 
                            key={idx}
                            style={{width : valWidth}}
                            >
                            <KeyDiv>{dataKeys[idx]}</KeyDiv>
                            <ValDiv style={{flex:"6"}}>{dataValues[idx].children}</ValDiv>
                        </KeyvalDiv>
                    )
                }
                if(props.isOption || dataValues[idx].option){
                    let isIcon = dataValues[idx].option.indexOf("icon") != -1;
                    return (
                        <KeyvalDiv 
                            key={idx}
                            style={{width : valWidth}}
                            >
                            <KeyDiv>{dataKeys[idx]}</KeyDiv>
                            <ValDiv>{dataValues[idx].main}</ValDiv>
                            <OptionDiv>
                                {isIcon ? 
                                    <span style={{fontSize : "1.6em"}} className="material-icons">{dataValues[idx].option.replace("icon:", "")}</span> 
                                    : 
                                    dataValues[idx].option.replace("icon:", "")
                                }
                            </OptionDiv>
                        </KeyvalDiv>    
                    )
                }
                return (
                    <KeyvalDiv 
                        key={idx}
                        style={{width : valWidth}}
                        >
                        <KeyDiv>{dataKeys[idx]}</KeyDiv>
                        <ValDiv>{dataValues[idx]}</ValDiv>
                    </KeyvalDiv>
                );
            })}
        </KeyvaltableContainer>
    );
}

const KeyvaltableContainer = styled.div`
    width : 100%;
    height : auto;
    margin : 0;
    padding : 0;
    display : flex;
    justify-content : space-between;
    align-items : center;
    flex-direction : row;
    flex-wrap : wrap;
    gap : .5em;
    border : 1px solid #D1D1D1;
    padding : 2em .5em;
    background-color : white;
`;

const KeyvalDiv = styled.div`
    width : 31%;
    display : flex;
    height : 40px;
`;

const KeyDiv = styled.div`
    flex : 3;
    display : flex;
    justify-content : center;
    align-items : center;
    background-color : #6B7F8B;
    color : white;
    border : 1px solid #4c5b64;
    margin-right : 6px;
`;

const ValDiv = styled.div`
    flex : 5;
    display : flex;
    justify-content : center;
    align-items : center;
    border : 1px solid #D1D1D1;
`;

const OptionDiv = styled.div`
    flex : 1;
    display : flex;
    justify-content : center;
    align-items : center;
    background-color : #1267B2;
    color : white;
    padding : 0 6px;
`;