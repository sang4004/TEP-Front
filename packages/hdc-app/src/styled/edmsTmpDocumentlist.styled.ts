import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TextField from "@material-ui/core/TextField";
import * as S from "./default.styled";
import { withStyles } from "@material-ui/core";
import AutoComplete from "@material-ui/lab/Autocomplete";

//전하성
//From css

type StyledProps = {
    $btnType?: string;
    $headSize?: number;
    $background?: string;
    $color?: string;
    $hover?: string;
    $dateType?: number;
    $wpType?: string;
    $flex?: number;
};

export const DocumentWorklistContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
`;
export const DocumentWorklistStruct = styled.div`
    width: 15%;
    height: 100%;
    display: flex;
    flex-direction: column;
    border-right: 1px solid #ccc;
`;
export const DocumentContentHeader = styled.div`
    height: 50px;
    border-bottom: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    box-sizing: border-box;
`;
export const DocumentTreeList = styled.div`
    overflow: auto;
    flex: 1;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
`;

export const DocumentTreeViewBlock = styled.div`
    flex: 1;
`;

export const DocumentWorklistTitle = styled.div`
    width: 100%;
    font-size: 1.6em;
    font-weight: 800;
`;
export const DoucmentWorklistTableBox = styled.div`
    width: 100%;
    background: #fff;
    border-radius: 15px;
    box-shadow: 1px 0 5px rgba(0, 0, 0, 10%);
`;
export const DoucmentAchievelistTableBox = styled.div`
    width: 85%;
`;
export const DocumentWorklistTableBoxHeader = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100px;
    box-sizing: border-box;
`;

export const DocumentWorkButtonDiv = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 50px;
    box-sizing: border-box;
    align-items: center;
`;

export const DocumentSearchButtonDiv = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 50px;
    box-sizing: border-box;
    padding: 10px 0px 5px 0px;
    border-bottom: 1px solid #ccc;
`;

export const DocumentWorklistTableFolderTitle = styled.div`
    float: left;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    font-weight: 700;
    img {
        margin-right: 10px;
    }
    div {
        display: flex;
        justify-content: flex-start;
        flex-direction: row;
    }
`;

export const DocumentWorkListMyDocumentBtn = styled(Button)`
    width: 100%;
    border-radius: 0;
    ${S.theme_background_sub_button};
    color: white;
    &:hover {
        ${S.theme_background_sub_button_hover};
    }
`;

export const SelectBox = styled(Select)`
    width: fit-content;
    height: 36px;
    background-color: #ffc344;
    border-radius: 4px;
    min-width: 100px;
    color: #fff;
    font-weight: 600;
    text-align: center;
    position: relative;
    display: flex;
    svg {
        display: none;
        position: absolute;
    }
    div {
        width: 100%;
        height: 100%;
        padding: 0 !important;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;
export const Items = styled(MenuItem)`
    width: 100%;
    min-width: 100px;
    height: 100%;
`;
export const TreeIcon = styled.img`
    margin-right: 6px;
    width: 16px;
    height: 16px;
`;
export const GridViewWrap = styled.div`
    width: 100%;
    height: calc(100% - 100px);
`;
export const TableCheckbox = styled(Checkbox)``;

export const StatusDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 1em;
    font-weight: 700;
`;
export const Stage = styled.p`
    color: #ff9800;
    width: 100%;
`;
export const ActualDate = styled.p`
    color: #555;
    width: 100%;
`;
export const wpType = styled.p`
    color: ${(props: StyledProps) =>
        props.$wpType == "DIN"
            ? "#4CAF50"
            : props.$wpType == "DRN"
            ? "#F44336"
            : props.$wpType == "TM"
            ? "#FF9800"
            : "#2196F3"};
`;

export const FileToolBtnWrapper = styled.div`
    display: flex;
`;
export const FileToolBtn = styled.button`
    min-width: 80px;
    margin-right: 10px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 1.2em;
    &:hover {
        background: #477ee9;
        opacity: 0.7;
    }

    border-radius: 5px;
    background: #477ee9;
    color: #fff;
    height: 40px;
`;
export const FolderTitle = styled.div`
    display: flex;
    align-items: center;
    width: fit-content;
    height: fit-content;
    img {
        margin-right: 10px;
    }
`;
export const FolderTitleButton = styled(Button)`
    display: flex;
    justify-content: center;
    align-items: center;
    white-space: nowrap;
    width: fit-content;
    height: 35px;
    font-weight: 500;
    font-size: 1em;
    color: white;
    border-radius: 10px;
    margin-right: 10px;
    padding: 0 10px;
    background: ${(props: StyledProps) => (props.$color ? props.$color : `#FCC344`)};
    &:hover {
        background: ${(props: StyledProps) => (props.$hover ? props.$hover : `#FAA11F`)};
    }
`;

export const WorkProcTabs = styled(Tabs)`
    width: fit-content;
`;
export const WorkProcTab = styled(Tab)`
    font-weight: 500;
    font-size: 1.2em;
    min-width: fit-content !important;
`;

export const FormType = styled(Select)`
    flex: ${(props: StyledProps) => (props.$flex ? props.$flex : `0.6;`)};
    height: 100%;
    padding: 5px;
    padding-left: 10px;
    margin: 0 10px;
    border: 1px solid #4490ff;
`;

export const InputSelectItem = withStyles({ root: { textAlign: "center" } })(MenuItem);

export const SearchType = styled(Select)`
    flex: 0.3;
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
    flex: 0.3;
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

export const InputAutoComplete = styled(AutoComplete)`
    flex: 0.6;
    height: 100%;
    box-sizing: border-box;
    border: 1px solid #4490ff;
    padding: 2px 5px 0px 10px;
    margin: 0 10px;
`;

export const TextFieldBlock = styled(TextField)``;
