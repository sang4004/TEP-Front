//
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Radio from "@material-ui/core/Radio";
import AppBar from "@material-ui/core/AppBar";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import _Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/core";
import styled from "styled-components";
export * from "./project.styled";
import * as S from "./default.styled";

type StyledProps = {
    $isOver?: boolean;
    $selected?: boolean;
    $workType?: boolean;
    $approval?: boolean;
    $register?: boolean;
};

export const TypeSelectGroup = styled.div`
    width: auto;
    height: 100%;
    margin: 0 15px 0 0;
    display: flex;
    justify-content: center;
    align-items: center;
`;
export const TypeSelectLabel = styled.div`
    font-weight: 500;
    font-size: 1.4em;
    color: #333;
    white-space: pre;
    user-select: none;
`;
export const TypeSelectItem = styled(Radio)`
    color: #333;
`;

export const WorkListTable = styled.div`
    width: 100%;
    height: 94%;
    box-sizing: border-box;
`;

export const StructureTable = styled.div`
    width: 100%;
    height: 100%;
    padding-bottom: 20px;
    background-color: white;
    border-radius: 10px;
`;

export const StructureTableHead = styled.div`
    height: fit-content;
    border-bottom: 1px solid #ccc;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: flex-start;
    box-sizing: border-box;
    border-radius: 10px 10px 0 0;
`;

export const FolderTitle = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: flex-start;
    img {
        margin-right: 10px;
    }
`;

export const WorkProcTabDiv = styled(AppBar)``;

export const WorkProcTabs = styled(Tabs)`
    width: 140px;
`;

export const WorkProcTab = styled(Tab)`
    font-weight: 500;
    font-size: 1.2em;
    min-width: fit-content !important;
    opacity: ${(props: StyledProps) =>
        props.$workType
            ? `
        0.3
    `
            : `
        1
    `};
`;

export const ApprovalDiv = styled.div`
    display: flex;
    width: fit-content;
    height: 70%;
`;

export const ApprovalBtn = styled.div`
    ${(props: StyledProps) =>
        props.$workType ? `${S.theme_background_sub_button};` : `background-color: #ff9800;`};
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    font-size: 1.2em;
    height: 2.4em;
    color: #fff;
    padding: 6px 0;
    border-radius: 6px;
    cursor: pointer;
`;

export const TableCheckboxDiv = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    flex: 1;
`;

export const TableCheckbox = styled(Checkbox)`
    width: fit-content;
    font-weight: bold;
    cursor: pointer;
    background: white;
    padding: 0px;
`;

export const TableTd = styled.td`
    min-height: 50px;
    width: 100%;
    background-color: #fff;
    padding: 8px 12px;
`;

export const TableDate = styled.div`
    text-align: center;
    ${(props: StyledProps) =>
        props.$isOver
            ? `
            color : #477EE9;
            `
            : `
            color : #e54b0b;
    `};
`;

export const TableCode = styled.p`
    width: 100%;
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

export const SelectDiv = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 60px;
    padding: 10px;
    border-radius: 10px 10px 0 0;
`;

export const InputSelect = styled(Select)`
    flex: 1;
    padding: 0.2em 0;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin: 0 2% 0 2%;
    text-align: center;
`;

export const InputSelectItem = withStyles({ root: { textAlign: "center" } })(MenuItem);

export const TopApprovalBtn = styled(Button)`
    height: 36px;
    flex: 1;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 6px;
    ${(props: StyledProps) =>
        props.$approval == true
            ? `
            background-color: #ff9800;
            &:hover {
                background-color: #ff9800;
            }
    `
            : `
            background-color: #ccc;
            &:hover {
                background-color: #ccc;
            }
    `};
`;

export const TopRegisterBtn = styled(Button)`
    height: 36px;
    width: max-content;
    min-width: 100px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 6px;
    ${(props: StyledProps) =>
        props.$register == true
            ? `
            background-color: #ff9800;
            &:hover {
                background-color: #ff9800;
            }
    `
            : `
            background-color: #ccc;
            &:hover {
                background-color: #ccc;
            }
    `};
`;

export const TopButtonDiv = styled.div`
    display: flex;
    flex-direction: row;
    gap: 6px;
`;

export const TopDiv = styled.div`
    display: flex;
    flex: 1;
    width: 100%;
    justify-content: flex-start;
    align-items: center;
    padding: 0 10px;
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
    flex: 1.8;
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
    height: 100%;
    margin: 0 10px;
    padding-left: 10px;
    flex: 1;
    text-align: center;
`;

export const SearchType = styled(Select)`
    flex: 0.6;
    height: 100%;
    padding: 5px;
    padding-left: 10px;
    margin: 0 10px;
    border: 1px solid #4490ff;
`;

export const FormType = styled(Select)`
    flex: 0.6;
    height: 100%;
    padding: 5px;
    padding-left: 10px;
    margin: 0 10px;
    border: 1px solid #4490ff;
`;

export const SearchText = styled(TextField)`
    flex: 1.9;
    min-width: 150px;
    border: 1px solid #aaaaaa;
    padding: 0 10px;
    margin: 0 10px;
    display: flex;
    justify-content: center;
`;

export const SearchBtn = styled.button`
    flex: 0.5;
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

export const ToolTip = withStyles({
    tooltip: {
        // backgroundColor : "transparent",
        // borderRadius : 0,
        width: 360,
        maxWidth: 360,
    },
})(_Tooltip);
