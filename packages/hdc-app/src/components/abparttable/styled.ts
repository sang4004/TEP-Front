import styled from "styled-components";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

export type styleProps = {
    $selected?: boolean;
    $background?: string;
    $cellSelected?: boolean;
    $headSize?: number;
    $active?: boolean;
    $deleted?: boolean;
    $expanded?: boolean;
}

export const TableCheckbox = styled.input.attrs({
    type: 'checkbox'
})`
    width : 100%;
`;

export const TableWrap = styled.div`
    height : 96%;
    width : 96%;
    background-color : #f5f5f5;
    border-radius : 20px;
    box-shadow : 0px 0px 5px #a3a3a3;
    position: relative;
`;

export const funcBtnImg = styled.img`
	width : 30%;
	height : 30%;
	justify-content : center;
    align-items : center;
`;

export const TopMenuBlock = styled.div`
    margin : 0 auto;
    width : 100%;
    position: relative;
    display : flex;
    align-items : center;
    justify-content : center;
`;

export const TableMenu = styled(Tabs)`
    display : flex;
    align-items : center;
    flex : 1;
`;

export const BtnMenu = styled(Tab)`
    width : 15%;
    height : 100%;
    padding : 0;
    border-radius : 0;
    &:hover {
        filter: invert(56%) sepia(65%) saturate(399%) hue-rotate(183deg) brightness(87%) contrast(87%);
    }
    color : ${(props: styleProps) => props.$active ? `#000000` : `#777777`};
`;

export const Searchdiv = styled.div`
    width: 20%;
    padding-top : .6em;
    display : flex;
    justify-content : center;
    align-items : center;
`;

export const SearchInput = styled(TextField)`
    padding-left : 6px;
    width: 70%;
    padding : 0 4%;
    text-align: center;
    /* box-shadow : 0px 0px 5px #a3a3a3; */
    /* border-bottom : 1px solid #a3a3a3; */
`;

export const SearchBtn = styled.div`
    width : 30px;
    height : auto;
    margin-left : 6px;
    float : left;
`;

export const GroupBtnDiv = styled.div`
    width: 20%;
    float: right;
    margin-right: 20px;
    padding-top: 20px;
    gap: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const GroupBtn = styled(Button)`
	flex : 1;
    padding : 2% 4%;
    border-radius : 10px;
    border : 1px solid #6cabce;
    color : #6cabce;
    &:hover {
        background-color : #9abed1;
        color : #FFFFFF;
    }
`;

export const ToolBtn = styled(Button)`
	width : 100%;
	height : 100%;
	min-width : 0;
	padding : 0;
    &:hover {
        filter: invert(56%) sepia(65%) saturate(399%) hue-rotate(183deg) brightness(87%) contrast(87%);
    };
    align-items : center; 
    margin : 0 auto;
`;

export const ToolEditBtn = styled(Button)`
	width : 70%;
	min-width : 0;
    padding : 2% 4%;
    border-radius : 8px;
    border : 1px solid #6cabce;
    color : #6cabce;
    &:hover {
        background-color : #9abed1;
        color : #FFFFFF;
    }
`;

export const SearchBtnImg = styled.img`
	width : 60%;
	height : 60%;
	display : flex;
	justify-content : center;
    align-items : center;
`;

export const ToolBtnImg = styled.img`
	width : 40%;
	height : 40%;
	display : flex;
	justify-content : center;
    align-items : center;
`;

export const TableContainer = styled.div`
	margin : 0 auto;
    height : 85%;
    overflow : scroll;
	border-radius : 0;
	width : 100%;
	padding-bottom : 0;
    padding : 0 1%;
    -ms-overflow-style : none;
    &::-webkit-scrollbar{
        display : none;
    }
	&:last-child{
		padding-bottom : 0;
	}

`;

export const BoardTable = styled.table`
    justify-items:center;
    width:100%;
`;

export const TableHeadDiv = styled.thead`
    background-color : transparent;
    width:100%;
`;

export const BoardHeadRow = styled.tr`
    justify-items:center;
    width : 100%;
`;

export const TableHeadCell = styled.th`
    color : black;
    width : ${(props: styleProps) => props.$headSize ? props.$headSize + '%' : `fit-content`};
	font-weight : 500;
	white-space : break-spaces;	
	padding : 0;
	line-height : 1.4em;
    padding : 1% 1%;
`;
export const TheadDiv = styled.div`
    margin : 14px auto;
    width : 100%;
    height : 3em;
    padding : 0% 1%;
    border-bottom: 2px solid #ccc;
    display: flex;
`;

export const Thead = styled.div`
    width : ${(props: styleProps) => props.$headSize ? props.$headSize + '%' : `fit-content`};
    float : left;
    padding : 0 1em;
    padding-top : .6em;
    display : flex;
    justify-content : center;
    align-items : center;
`;

export const GroupDiv = styled.div`
    width : 100%;
    height : 3em;
    padding : 0% 6%;
    padding-top : .6em;
    background-color : #9abed1;
`;

export const BoardBody = styled.tbody`
    justify-items:center;
`;

export const TableBodyRow = styled.tr`
    background-color : ${(props: styleProps) => props.$selected ? `#DAEDFF` : `transparent`};
    opacity : 90%;
    height : 4em;
    display : ${(props: styleProps) => props.$deleted ? 'none' : 'table-row'};
`;

export const TableBodyCell = styled.td`
	vertical-align : middle;
    width : fit-content;
    padding : 0% 1%;
    display : table-cell;
    text-align : center;
`;

export const TableFooter = styled.div`
    width : calc(96%);
    height : 10%;
    margin : 0 auto;
    padding : 1% 1%;
    bottom : 0%;
    left : 2%;
    position: absolute;
`;

export const pagingdiv = styled.div`
    height : 100%;
    margin : 0 auto;
    width : 10%;
    display : flex;
    flex-direction : row;
`;

export const pagebtn = styled(Button)`
    flex : 1;
    height : 100%;
`;

export const pagenum = styled.i`
    height : 50%;
    margin : 0 auto;
`;

export const pageimg = styled.img`
    height : 40%;
    margin : 0 auto;
`;

export const pageselectdiv = styled.div`
    background-color : transparent;
    height : fit-content;
    position : absolute;
    width : 10%;
    right : 0%;
    top : 40%;
    display : flex;
    flex-direction : row;
`;

export const pagetext = styled.div`
    background-color : transparent;
    height : fit-content;
    flex : 2;
`;

export const pageselect = styled.select`
    height : fit-content;
    margin : 0 auto;
    flex : 1;
`;

export const pageoption = styled.option`
`;

export const settingdiv = styled.div`
    background-color : transparent;
    height : fit-content;
    position : absolute;
    width : 10%;
    left : 0%;
    top : 40%;
    display : flex;
    flex-direction : row;
`;

export const BtnSetting = styled(Button)`
    width : 90%;
    height : 100%;
    padding : 1% 1%;
    color : #999999;
    float : right;
    text-align : right;
    border-radius : 0;
    justify-items : center;
    align-items : center;
    vertical-align : middle;
    position: relative;
    &:hover {
        filter: invert(56%) sepia(65%) saturate(399%) hue-rotate(183deg) brightness(87%) contrast(87%);
    }
`;

export const ToolImgSetting = styled.img`
    height : 90%;
    top : 5%;
    left : 0%;
    color : #ff0000;
    position: absolute;
`;