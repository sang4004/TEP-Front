import styled from "styled-components";
import { Layout } from "antd";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import * as S from "./default.styled";

type StyledProps = {
    $btnType?: string;
    $headSize?: number;
    $background?: string;
    $color?: string;
    $hover?: string;
    $dateType?: number;
};

export const ContentContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    box-sizing: borxder-box;
    padding-top: 0;
`;

export const ContentsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    height: 90%;
    margin-top: -4%;
    padding: 2%;
    box-sizing: border-box;
    padding-top: 0;
`;

export const ContContainerHeader = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 17%;
    padding: 1.5%;
    box-sizing: border-box;
    background: #1d2431;
    color: white;
`;

export const ContentsWrap = styled.div`
    width: 100%;
    height: 100%;
    margin: 1% 0;
    border-radius: 10px;
    padding: 0;
    overflow: hidden;
`;

export const RightWrap = styled.div`
    width: 100%;
    height: calc(97% - 65px);
    margin: 1% 0;
    border-radius: 10px;
    background: #f7f8f8;
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.3);
    padding: 0;
    overflow: hidden;
`;

export const WorkListContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
`;

export const BtnContainerBtn = styled.button`
    padding: 0 5px;
    transform: scale(0.8);
    transition: transform 0.3s;
    &:hover {
        transform: scale(1);
    }
`;

export const InfoContainer = styled.div`
    width: 15%;
    height: 100%;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
`;

export const InfoContentHeader = styled.div`
    display: flex;
    align-items: flex-end;
    padding: 10px;
    height: 50px;
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;
`;

export const StructureTable = styled.div`
    width: 100%;
`;

export const StructureTableHead = styled.div`
    height: 50px;
    /* border-bottom: 1px solid #ccc; */
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    box-sizing: border-box;
`;

export const SelectTableHead = styled.div`
    height: 50px;
    /* border-bottom: 1px solid #ccc; */
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 10px;
    box-sizing: border-box;
`;

export const FolderTitle = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    font-weight: 400;
    font-size: 1.3em;
    img {
        margin-right: 10px;
    }
`;

export const FolderInputTitle = styled.div`
    font-weight: 400;
    font-size: 0.8vw;
    margin-right: 4px;
`;

export const FolderTitleButton = styled(Button)`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: fit-content;
    height: 35px;
    font-weight: 600;
    font-size: 15px;
    color: white;
    border-radius: 10px;
    margin-right: 10px;
    padding: 0 3%;
    background: ${(props: StyledProps) => (props.$color ? props.$color : `#FCC344`)};
    &:hover {
        background: ${(props: StyledProps) => (props.$hover ? props.$hover : `#FAA11F`)};
    }
`;

export const FolderTitleDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: fit-content;
    height: 35px;
    font-weight: 600;
    font-size: 0.8em;
    color: white;
    border-radius: 10px;
    margin-right: 10px;
    padding: 0 3%;
    background: ${(props: StyledProps) => (props.$background ? props.$background : `#4472C4`)};
`;

export const FolderTitleSelect = styled(Select)`
    width: fit-content;
    height: 100%;
    padding: 0 10px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-right: 10px;
    background: white;
`;

export const FolderTitleSelectItem = styled(MenuItem)``;

export const WorkListTable = styled.div`
    width: 100%;
    height: calc(100% - 54px);
    overflow: auto;
    box-sizing: border-box;
    border-radius: 0 0 10px 10px;
`;

export const BreadCrumb = styled.div`
    display: flex;
    font-size: 12px;
    margin-left: 5px;
`;

export const TableContainer = styled.div`
    margin: 0 auto;
    height: auto;
    max-height: 75vh;
    overflow-y: auto;
    border-radius: 0;
    width: 98%;
    padding-bottom: 0;
    &:last-child {
        padding-bottom: 0;
    }
`;

export const BoardTable = styled.table`
    justify-items: center;
    width: 100%;
    height: auto;
`;

export const TableHeadDiv = styled.thead`
    background-color: transparent;
    width: 100%;
`;

export const BoardHeadRow = styled.tr`
    justify-items: center;
    width: 100%;
    border-collapse: collapse;
    border-top: 1px solid #bfd2e2;
    border-bottom: 1px solid #bfd2e2;
`;

export const TableHeadCell = styled.th`
    color: black;
    width: ${(props: StyledProps) => (props.$headSize ? props.$headSize + "%" : `fit-content`)};
    font-weight: 500;
    white-space: break-spaces;
    padding: 0;
    line-height: 1.4em;
    padding: 10px 1%;
    text-align: center;
`;

export const BoardBody = styled.tbody`
    justify-items: center;
`;

export const TableBodyRow = styled.tr`
    background-color: #daedff;
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
    height: 64px;
    text-align: center;
`;

export const TableFooter = styled.div`
    width: 100%;
    min-height: 48px;
    height: 6%;
    position: relative;
`;

export const CategoryAddButton = styled(Button)`
    width: max-content;
    min-width: 15%;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    ${S.theme_background_main_button};
    &:hover {
        ${S.theme_background_main_button_hover};
    }
`;

export const InputSelect = styled(Select)`
    width: 20%;
    height: 100%;
    padding: 0 10px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-right: 10px;
`;

export const TableInputSelect = styled(Select)`
    width: 100%;
    height: 100%;
    padding: 0 10px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-right: 10px;
`;

export const InputSelectItem = styled(MenuItem)``;

export const WorkListInfoSearch = styled.div`
    display: flex;
    justify-content: flex-end;
`;

export const WorkListSearchInput = styled.input`
    display: block;
    padding: 5px;
    box-sizing: border-box;
    font-size: 14px;
    margin-right: 10px;
`;

export const WorkSearchButton = styled.button`
    display: block;
    width: 100%;
`;

export const ProjectButton = styled.button`
    float: right;
    height: 35px;
    width: 200px;
    font-weight: 600;
    color: #fff;
    margin-right: 10px;
    background: #477ee9;
    font-size: 0.9vw;
    margin-bottom: 5px;
`;

export const CatBtnWrap = styled.div`
    float: left;
    margin: 15px 0;
`;

export const CatBtnWrapButton = styled.div`
    height: 35px;
    padding: 0 50px;
    border-radius: 10px;
    font-weight: 700;
    color: #fff;
    margin-right: 10px;
`;

export const BtnColorType = styled.button`
    background: ${(props: StyledProps) =>
        props.$btnType === "DIN" ? "#71cc63" : props.$btnType === "DRN" ? "#FF9900" : "#ecb937"};
`;

export const DockLockerTable = styled.div`
    clear: both;
    float: left;
    width: 100%;
    height: calc(100% - 65px);
    overflow: auto;
`;

export const DockLockerTableHead = styled.div`
    display: flex;
    height: 50px;
    width: 100%;
    color: white;
    background: #546585;
    text-align: center;
`;

export const DockLockerTableTh = styled.div`
    border-right: 1px solid #ccc;
    line-height: 300%;
    width: 10%;
`;

export const DockLockerTableBody = styled.div`
    height: calc(100% - 50px);
`;

export const DockLockerTableRow = styled.div`
    display: flex;
    width: 100%;
    height: 50px;
    background: #fff;
    border-bottom: 1px solid #ccc;
`;

export const DockLockerTableTd = styled.div`
    height: 100%;
    border-right: 1px solid #ccc;
    line-height: 300%;
    width: 10%;
`;

export const TableCheckboxDiv = styled.td`
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    border-left: 1px solid #ebebeb;
    border-bottom: 1px solid #ebebeb;
`;

export const TableCheckbox = styled(Checkbox)`
    padding: 5px;
    text-align: center;
    width: 100%;
    display: flex;
    align-items: center;
`;

export const TableTd = styled.td`
    text-align: center;
    border-left: 1px solid #ebebeb;
    border-bottom: 1px solid #ebebeb;
    background: ${(props: StyledProps) => (props.$dateType == 1 ? "#FCC344" : "#fff")};
    color: ${(props: StyledProps) => (props.$dateType == 1 ? "#fff" : "#000")};
`;

export const TableButtonDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
`;

export const TableButton = styled(Button)`
    width: fit-content;
    color: white;
    ${S.theme_background_sub_button};
    &:hover {
        ${S.theme_background_sub_button_hover};
    }
`;

export const TableCode = styled.p`
    width: 100%;
    color: #477ee9;
    font-weight: bold;
    cursor: pointer;
    background: transparent;
    white-space: pre-wrap;
`;

export const TableDate = styled.p`
    width: 100%;
    text-align: center;
    font-weight: bold;
    cursor: pointer;
    background: transparent;
    white-space: pre-wrap;
`;

export const TableDownloadDiv = styled.div`
    display: flex;
    flex: 1;
    color: blue;
    &:hover {
        text-decoration: underline;
    }
`;
