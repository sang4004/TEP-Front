import styled from "styled-components";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import { KeyboardDatePicker } from "@material-ui/pickers";

export type styleProps = {
    $selected?: boolean;
    $background?: string;
    $cellSelected?: boolean;
    $headSize?: number;
    $pageAble?: boolean;
    $isActive?: boolean;
};

export const TableCheckbox = styled.input.attrs({
    type: "checkbox",
})`
    width: 100%;
`;

export const TableWrap = styled.div`
    height: 96%;
    width: 99%;
    padding: 2% 4%;
    gap: 1em;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 0 5px 1px rgb(136 136 136 / 30%);
    color: #4b5964;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`;

export const TableTopMenu = styled.div`
    margin: 0 auto;
    min-height: 0;
    width: 98%;
    border: 0;
    outline: 0;
    border-bottom: 1px #bfd2e2;
    position: relative;
`;

export const TableMenu = styled(Tabs)`
    width: 80%;
    overflow-x: auto;
    position: relative;
`;

export const Searchdiv = styled.div`
    width: 20%;
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    border-radius: 0;
    padding: 10px 1%;
    justify-items: center;
    align-items: center;
    vertical-align: middle;
`;

export const SearchInput = styled.input`
    background-color: transparent;
    box-shadow: 0px 0px 5px #a3a3a3;
    width: 90%;
    height: 100%;
    float: left;
    padding-left: 10px;
`;

export const SearchBtnImg = styled.img`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const BtnMenu = styled(Tab)`
    min-width: 48px;
    width: fit-content;
    height: 100%;
    padding: 1 1;
    color: ${(props: styleProps) => (props.$selected ? "#4B5964" : "#B2C7D8")};
    border-radius: 0;
    font-weight: 400;
    font-size: 14px;
    &:hover {
        filter: invert(56%) sepia(65%) saturate(399%) hue-rotate(183deg) brightness(87%)
            contrast(87%);
    }
`;

export const BtnSetting = styled.button`
    width: 12%;
    height: 100%;
    color: #999999;
    text-align: right;
    border-radius: 0;
    padding: 1% 1%;
    justify-items: center;
    align-items: center;
    vertical-align: middle;
    position: absolute;
    right: 0;
    display: flex;
    flex-direction: row;
    gap: 1em;
    &:hover {
        filter: invert(56%) sepia(65%) saturate(399%) hue-rotate(183deg) brightness(87%)
            contrast(87%);
    }
`;

export const ToolImgSetting = styled.img`
    height: 20px;
    color: #ff0000;
`;

export const ToolBtn = styled.button`
    width: 100%;
    height: 100%;
    min-width: 0;
    padding: 0;
    &:hover {
        filter: invert(56%) sepia(65%) saturate(399%) hue-rotate(183deg) brightness(87%)
            contrast(87%);
    }
`;

export const ToolBtnImg = styled.img`
    width: 40%;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const SearchBar = styled.div`
    display: flex;
    width: 100%;
    height: 60px;
    padding: 10px;
    border: 1px solid #4490ff;
`;

export const SearchDocType = styled(Select)`
    width: 150px;
    height: 100%;
    padding: 5px;
    padding-left: 10px;
    margin: 0 10px;
    border: 1px solid #4490ff;
`;

export const SearchDateDiv = styled.div`
    width: fit-content;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Date = styled.input`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #aaaaaa;
    width: 150px;
    height: 100%;
    margin: 0 10px;
    padding-left: 10px;
    text-align: center;
`;

export const SearchType = styled(Select)`
    width: 150px;
    height: 100%;
    padding: 5px;
    padding-left: 10px;
    margin: 0 10px;
    border: 1px solid #4490ff;
`;

export const FormType = styled(Select)`
    width: 200px;
    height: 100%;
    padding: 5px;
    padding-left: 10px;
    margin: 0 10px;
    border: 1px solid #4490ff;
`;

export const SearchText = styled(TextField)`
    flex: 1;
    min-width: 150px;
    border: 1px solid #aaaaaa;
    padding: 0 10px;
    margin: 0 10px;
    display: flex;
    justify-content: center;
`;

export const SearchBtn = styled.button`
    width: 150px;
    height: 100%;
    margin: 0 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #4490ff;
    border-radius: 5px;
    color: #ffffff;
    font-size: 1.2em;
`;

export const ToggleBtn = styled.button`
    width: 150px;
    height: 100%;
    margin: 0 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${(props: styleProps) => (props.$isActive ? "#ff6358" : "#4490ff")};
    border-radius: 5px;
    color: #ffffff;
    font-size: 1.2em;
`;

export const AddBtn = styled.button`
    width: 150px;
    height: 100%;
    margin: 0 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ff9044;
    border-radius: 5px;
    color: #ffffff;
    font-size: 1.2em;
`;

export const TableContainer = styled.div`
    height: 75vh;
    max-height: 75vh;
    overflow-y: auto;
    border-radius: 0;
    width: 100%;
    padding-bottom: 0;
    &:last-child {
        padding-bottom: 0;
    }
    ::-webkit-scrollbar {
        width: 10px;
        background-color: rgba(0, 0, 0, 0.08);
    }
    ::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.06);
        border-radius: 20px;
    }
`;

export const BoardTable = styled.table`
    justify-items: center;
    width: calc(100% - 15px);
    height: auto;
    border-collapse: collapse;
`;

export const TableHeadDiv = styled.thead`
    background-color: transparent;
    width: 100%;
`;

export const BoardHeadRow = styled.tr`
    justify-items: center;
    width: 100%;
    border-collapse: collapse;
    /* border-top: 1px solid #bfd2e2;
    border-bottom: 1px solid #bfd2e2; */
`;

export const TableHeadCell = styled.th`
    color: black;
    width: ${(props: styleProps) => (props.$headSize ? props.$headSize + "%" : `fit-content`)};
    font-weight: 500;
    white-space: break-spaces;
    padding: 0;
    line-height: 1.4em;
    padding: 10px 1%;
    text-align: center;
    //for fixed
    position: sticky;
    top: 0;
    //design
    box-shadow: inset 0 1px 0 #bfd2e2, inset 0 -1px 0 #bfd2e2;
    background-color: white !important;
`;

export const BoardBody = styled.tbody`
    justify-items: center;
`;

export const TableBodyRow = styled.tr`
    background-color: ${(props: styleProps) => (props.$selected ? `#DAEDFF` : `transparent`)};
    border-collapse: collapse;
    // border-top: 1px solid #bfd2e2;
    border-bottom: 1px solid #bfd2e2;
    cursor: pointer;
    &:hover {
        background-color: #daedff;
    }
`;

export const TableBodyCell = styled.td`
    vertical-align: middle;
    width: fit-content;
    padding: 0% 1%;
    height: 48px;
    text-align: center;
    white-space: pre-wrap;
`;

export const TableFooter = styled.div`
    width: 100%;
    min-height: 48px;
    height: 6%;
    position: relative;
    display: ${(props: styleProps) => (props.$pageAble ? "block" : "none")};
`;

export const pagingdiv = styled.div`
    height: 100%;
    margin: 0 auto;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const pagebtn = styled.button`
    flex: 1;
    height: 100%;
`;

export const pagenum = styled.i`
    height: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
`;

export const pageimg = styled.img`
    height: 40%;
    margin: 0 auto;
`;

export const pageselectdiv = styled.div`
    background-color: transparent;
    height: fit-content;
    position: absolute;
    width: 10%;
    right: 0%;
    top: 40%;
    display: flex;
    flex-direction: row;
`;

export const pagetext = styled.div`
    background-color: transparent;
    height: fit-content;
    flex: 2;
`;

export const pageselect = styled.select`
    height: fit-content;
    margin: 0 auto;
    flex: 1;
`;

export const pageoption = styled.option``;

export const SwichDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: end;
`;
export const SwichLabel = styled.label`
    font-size: 1.2em;
`;
const S = {
    BoardTable,
    TableHeadDiv,
    BoardHeadRow,
    TableHeadCell,
    BoardBody,
    TableBodyRow,
    TableBodyCell,
    ToolBtn,
    ToolBtnImg,
    ToolImgSetting,
    TableCheckbox,
    TableWrap,
    TableMenu,
    BtnMenu,
    BtnSetting,
    TableContainer,
    TableFooter,
    pageselectdiv,
    pagingdiv,
    pagebtn,
    pagenum,
    pageimg,
    pageselect,
    pageoption,
};

export const MAIN = S;
