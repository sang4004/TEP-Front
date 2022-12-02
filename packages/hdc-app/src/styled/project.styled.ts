import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import * as S from "./default.styled";

export const DEFAULT_EDMS_COLORS = ["#4CAF50", "#F44336", "#FF9800", "#2196F3"];

type StyledProps = {
    $btnType?: string;
    $headSize?: number;
    $background?: string;
    $index?: number;
    $type?: number;
};

export const ContentContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding-top: 0;
    border-radius: 10px;
`;

export const ContentsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    height: 100%;
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
    border-radius: 10px;
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

export const FolderTitle = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    font-weight: 400;
    font-size: 1.3vw;
    img {
        margin-right: 10px;
    }
`;

export const ButtonDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
`;

export const FolderInputTitle = styled.div`
    font-weight: 400;
    font-size: 0.8vw;
    margin-right: 4px;
`;

export const ProjectTabs = styled(Tabs)`
    width: fit-content;
`;

export const ProjectTab = styled(Tab)`
    min-width: fit-content;
`;

export const ProjectCardBlock = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    /* justify-content: flex-start;
    align-items: flex-start; */
    overflow-y: auto;
`;

export const ProjectCard = styled(Card)`
    width: 28%;
    margin: 2.5%;
    height: 100px;
    transition: 0.3s;
    cursor: pointer;
    font-weight: 400;
    &:hover {
        opacity: 0.65;
    }
`;

export const ProjectCardMedia = styled(CardMedia)`
    height: 25px;
    background-color: ${(props: StyledProps) => {
        let index = props.$index ? props.$index % 4 : 0;
        return DEFAULT_EDMS_COLORS[index];
    }};
`;

export const ProjectCardContent = styled(CardContent)`
    text-align: left;
    padding: 10px;

    h6 {
        color: #aaa;
    }
`;

export const ProjectTitle = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-left: 10px;
    height: 48px;
    flex: 1;
`;

export const ProjectTitleText = styled.div`
    font-size: 0.8em;
    color: rgba(0, 0, 0, 0.8);
    margin-right: 8px;
`;

export const ProjectSelect = styled(Select)`
    border: none;
    outline: none;
    font-size: 0.7em;
    font-weight: 500;
    margin-right: 15px;
`;

export const ProjectSelectMenu = styled(MenuItem)``;

export const FolderTitleButton = styled(Button)`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: fit-content;
    height: 35px;
    font-weight: 600;
    font-size: 0.6em;
    color: white;
    border-radius: 10px;
    margin-right: 10px;
    padding: 0 3%;
    ${S.theme_background_main_button};
    &:hover {
        ${S.theme_background_main_button_hover};
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
    font-size: 0.6em;
    color: white;
    border-radius: 10px;
    margin-right: 10px;
    padding: 0 3%;
    background-color: ${(style: StyledProps) => (style.$background ? style.$background : "white")};
`;

export const WorkListTable = styled.div`
    width: 100%;
    height: ${(style: StyledProps) => (style.$type == 1 ? "calc(100% - 50px)" : "auto")};
    box-sizing: border-box;
    background-color: white;
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
    width: 10vw;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #477ee9;

    &:hover {
        background-color: #477ee9;
        opacity: 0.8;
    }
`;

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

export const TableCheckboxDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    flex: 1;
    border-left: 1px solid #ebebeb;
    border-bottom: 1px solid #ebebeb;
`;

export const TableCheckbox = styled(Checkbox)``;

export const TableTd = styled.td`
    min-height: 50px;
    height: max-content;
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px 12px;

    .MuiCheckbox-root {
        padding: 4px;
    }
`;

export const TableCode = styled.p`
    width: fit-content;
    color: #477ee9;
    font-weight: bold;
    cursor: pointer;
    background: white;
`;

export const TableButton = styled(Button)`
    width: fit-content;
    color: white;
    background: #477ee9;
`;
