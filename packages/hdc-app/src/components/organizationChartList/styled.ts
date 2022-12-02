import styled from "styled-components";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

export type styleProps = {
    $selected?: boolean;
    $background?: string;
    $cellSelected?: boolean;
    $headSize?: number;
}


export const TableWrap = styled.div`
    height : 83%;
    width : 100%;
    background-color : white;
    color : #4B5964;
`;

export const TableTopMenu = styled.div`
    margin : 0 auto;
    min-height : 0;
    width : 98%;
    border : 0;
    outline : 0;
    border-bottom : 1px #BFD2E2;
    position : relative;
`;

export const TableMenu = styled(Tabs)`
    width : 100%;
    position : relative;
`;
export const TreeView = styled.div`
    width : 100%;
    height : 100%;
    flex : 1;
    overflow-y : scroll;
    padding : 20px 10px 0 30px;
`;
export const TreeIcon = styled.img`
    margin-right : 6px;
    width : 16px;
    height : 16px;
`;

export const BtnMenu = styled(Tab)`
    min-width : 48px;
    width : fit-content;
    height : 100%;
    width: 50%;
    color : ${(props : styleProps)=>props.$selected ? "#4B5964" : "#B2C7D8"};
    border-radius : 0;
    font-weight : 400;
    font-size : 14px;
    margin: 0 auto;
    &:hover {
        filter: invert(56%) sepia(65%) saturate(399%) hue-rotate(183deg) brightness(87%) contrast(87%);
    }
`;
