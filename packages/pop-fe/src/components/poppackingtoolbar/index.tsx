/******************************************************************************
 * poppackingtoolbar/index.tsx
 * hooks :
    *
 ******************************************************************************/
// Library
import { useSelector, useDispatch } from "react-redux"; // redux
import React, { useState, useEffect } from "react"; // default hooks
import styled from "styled-components";
import { Typography, Button } from "@material-ui/core";
import { InboxOutlined, SyncOutlined } from '@material-ui/icons';
//
// Module
import { useLocations } from "hooks" // locations hooks
import { 
    reducerState,
    GetEquipCodes,
    SetEquipCodes,
} from "common_module";
//

type styledProps = {
    $selected ?: boolean;
    $arrowDir ?: string;
    $background ?: string;
    $onlyLeft ?: boolean;
    $flex ?: number;
}

export type popPackingToolbarProps = {
    style ?: object;
    children ?: React.ReactNode;
}
interface FinalpoptoolbarProps extends popPackingToolbarProps {};

export const PopPackingToolbarComponent : React.FunctionComponent<FinalpoptoolbarProps> = ( props )=>{
    const { back, existBack, path } = useLocations();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const dispatch = useDispatch();
    
    const [selectedType, setSelectedType] = useState<string>("A4");
    
    useEffect(()=>{
        // initialize here
    }, []);

    const onClickTypeBtn = (type : string) =>{
        setSelectedType(type);
    }

    return (
        <PopToolbarContainer 
            className="poptoolbar"
            style={props.style}
            >
            <ToolbarLeftGroup
                >
                <ToolbarText>작업 일자</ToolbarText>
                <ToolBarTimeText>2019-03-09</ToolBarTimeText>
                <ToolbarText>작업자 코드</ToolbarText>
                <ToolBarTimeText>이준수</ToolBarTimeText>
                <ToolbarText>LOT NO</ToolbarText>
                <ToolBarTimeText>1901-0001</ToolBarTimeText>
                <ToolBarCDBtn>
                    <span className="material-icons">check</span>
                    확인
                </ToolBarCDBtn>
            </ToolbarLeftGroup>
            <ToolbarRightGroup>
                <ToolbarActionBtn>
                    <InboxOutlined />
                    <ToolbarActionBtnText>포장 등록</ToolbarActionBtnText>
                </ToolbarActionBtn>
                <ToolbarActionBtn>
                    <SyncOutlined />
                    <ToolbarActionBtnText>새로고침</ToolbarActionBtnText>
                </ToolbarActionBtn>
            </ToolbarRightGroup>
        </PopToolbarContainer>
    );
}

const PopToolbarContainer = styled.div`
    width : ${(props : styledProps)=> props.$onlyLeft ? `30%` : `100%`};
    ${(props : styledProps)=> props.$onlyLeft ? `min-width : 180px` : ``};
    height : 60px;
    margin : 0;
    padding : 0;
    display : flex;
    justify-content : flex-start;
    align-items : center;
    border : 1px solid #D5D5D5;
    background-color : white;
`;

const ToolbarText = styled(Typography)`
    font-size : 1.2em;
    margin-left: 1.4em;
    margin-right : 1em;
`;

const ToolbarLeftGroup = styled.div`
    width : 70%;
    display : flex;
    justify-content : ${(props : styledProps)=> props.$onlyLeft ? `center` : `flex-start`};
    flex-direction : row;
    align-items : center;
    overflow-x : auto;
    font-weight : 400;
`;

const ToolBarTimeText = styled(Typography)`
    border : 1px solid #D5D5D5;
    color : #4D4D4D;
    padding : 5px;
    display : flex;
    justify-content : center;
    align-items : center;
    flex : 1;
    height : 36px;
    font-size : 1.1em;
`;

const ToolBarCDBtn = styled(Button)`
    display : flex;
    justify-content : center;
    align-items : center;
    color : white;
    font-size : 1em;
    background-color : #1267B2;
    border : 1px solid #0267be;
    border-radius : 0;
    margin : 0 10px;
    padding-right : 20px;
    height : 36px;
    &:hover{
       background-color : #0c437a;
    }
`;

const ToolbarRightGroup = styled.div`
    width : 30%;
    display : flex;
    justify-content : flex-end;
    align-items : center;
    gap : 1em;
    margin-right : 20px;
`;

const ToolbarActionBtn = styled(Button)`
    width : 120px;
    background-color :#1267B2;
    color : white;
    text-align : center;
    font-weight : 400;
    border-radius : 0;
    font-size : 1em;
    height : 36px;
    display : flex;
    justify-content : flex-start;
    &:hover{
        background-color :#1274ca;
    }
`;

const ToolbarActionBtnText = styled(Typography)`
    flex : 1;
    text-align : center;
`;