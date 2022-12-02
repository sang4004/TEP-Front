import styled from "styled-components";
import { Layout } from "antd";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import { KeyboardDatePicker } from "@material-ui/pickers";
const { Content } = Layout;

export type styleProps = {
    $selected?: boolean;
    $background?: string;
    $cellSelected?: boolean;
    $headSize?: number;
    $isActive?: boolean;
    $pageAble?: boolean;
};

export const Block = styled(Content)`
    width: 100%;
    height: 100%;
    flex: none;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Inner = styled.div`
    width: 96%;
    height: 96%;
    border-radius: 5px;
    background-color: #fff;
    padding: 40px 40px 100px 40px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    gap: 5px;
    overflow: auto;
    &::-webkit-scrollbar {
        display: none;
    }
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
export const SwichDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: end;
`;

export const SwichLabel = styled.label`
    font-size: 1.2em;
`;

export const Date = styled(KeyboardDatePicker)`
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

export const SearchText = styled(TextField)`
    flex: 1;
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

export const TableContainer = styled.div`
    margin: 0 auto;
    height: 75vh;
    max-height: 75vh;
    overflow-y: auto;
    border-radius: 0;
    width: 98%;
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

export const TableCheckbox = styled.input.attrs({
    type: "checkbox",
})`
    width: 100%;
`;

export const BoardTable = styled.table`
    justify-items: center;
    width: calc(100% - 10px);
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
    position: sticky;
    top: 0;
    /* border-top : 1px solid #BFD2E2; */
    /* border-bottom : 1px solid #BFD2E2; */
    box-shadow: inset 0 1px 0 #bfd2e2, inset 0 -1px 0 #bfd2e2;
    background-color: white;
`;

export const BoardBody = styled.tbody`
    justify-items: center;
`;

export const TableBodyRow = styled.tr`
    background-color: ${(props: styleProps) => (props.$selected ? `#DAEDFF` : `transparent`)};
    border-collapse: collapse;
    border-top: 1px solid #bfd2e2;
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
