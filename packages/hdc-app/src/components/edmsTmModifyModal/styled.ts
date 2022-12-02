import styled from "styled-components";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Chip from "@material-ui/core/Chip";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { withStyles } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";

type StyledProps = {
    $boxType?: string;
    $inputData?: boolean;
    $heightType?: boolean;
};

export const Block = styled.div`
    border-radius: 10px;
    display: block;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    div {
        font-family: "NanumSquareRound";
    }
`;

export const Inner = styled.div`
    height: 100%;
    width: 100%;
    background: white;
`;

export const BoxDiv = styled.div`
    ${(props: StyledProps) =>
        props.$boxType == "Receive" ? `width : 25%; margin-right: 10px;` : `width : 50%;`};

    display: flex;
    align-items: center;
`;

export const DateBox = styled.div`
    display: flex;
    align-items: center;
`;

export const InDateBox = styled.div`
    display: flex;
`;

export const ModalHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 5%;
    background: #1a4a4a;
    padding: 0 3%;
    box-sizing: border-box;
    color: white;
    font-size: 1.1vw;
    font-weight: 400;
`;

export const Input = styled.input`
    height: 40px;
    width: 100%;
    margin-left: 1%;
    margin-right: 1%;
    padding: 0 3%;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

export const HeaderTitle = styled.div`
    font-size: 16px;
    color: white;
`;

export const ModalCloseBtn = styled.button`
    display: block;
    width: 5%;
    opacity: 0.8;
    transform: scale(0.9);
    transition: opacity 0.3s, transform 0.3s;
`;

export const ModalContentWrap = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 90%;
    padding: 2% 3%;
    box-sizing: border-box;
    overflow-y: auto;
    &::-webkit-scrollbar {
        background-color: #ccc;
        width: 10px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #707070;
    }
`;

export const ModalInputWrap = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex: 1;
    width: 100%;
    justify-content: space-between;
`;

export const ModalInputBox = styled.div`
    ${(props: StyledProps) =>
        props.$boxType == "wide"
            ? `width: 100%; max-height: 20%; padding: 10px;`
            : props.$boxType == "subject"
            ? `width: 100%; max-height: 10%; padding: 10px;`
            : props.$boxType == "desc"
            ? `width: 100%; max-height: 12%; padding: 10px;`
            : props.$boxType == "box"
            ? `width: 40%; padding: 10px; max-height: 10%; justify-content: space-between;`
            : `width: 100%; max-height: 10%; padding: 10px;`};

    display: flex;
    margin-bottom: 2%;
    box-sizing: border-box;
    align-items: center;
`;

export const InputTitle = styled.div`
    ${(props: StyledProps) =>
        props.$boxType == "right"
            ? `text-align-last: justify; margin-right : 4%;`
            : `text-align-last: justify`};

    width: fit-content;
    min-width: 120px;
    font-size: 1.2em;
    font-weight: 700;
    letter-spacing: 0.2em;
    white-space: nowrap;
    flex-shrink: 0;
    flex-grow: 0;
`;

export const TopInputTitle = styled.div`
    width: fit-content;
    font-size: 1.2em;
    font-weight: 700;
    text-align-last: justify;
    letter-spacing: 0.2em;
    white-space: nowrap;
    margin-right: 3%;
`;

export const InputeDateBox = styled.div`
    display: flex;
    width: 100%;
`;

export const InputDate = styled.input`
    flex: 1;
    padding: 0.6em 0;
    font-size: 1.2em;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin: 0 2% 0 4%;
    text-align: center;
`;

export const InputItem = styled.div`
    text-align: left;
    padding-left: 10px;
    font-size: 1.4em;
    white-space: nowrap;
    /* width : fit-content; */
    flex: 1;
`;

export const InputSelect = styled(Select)`
    flex: 1;
    padding: 0.6em 0;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin: 0 2% 0 4%;
    text-align: center;
`;

export const InputCopySelect = styled(Select)`
    width: 25%;
    padding: 0.6em 0;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-left: 1.5%;
`;

export const InputSelectItem = withStyles({ root: { textAlign: "center" } })(MenuItem);
export const InputSelectCheck = styled(Checkbox)``;
export const InputSelectIcon = styled(ListItemIcon)``;
export const InputSelectItemText = styled(ListItemText)``;

export const ButtonDiv = styled.div`
    display: flex;
    width: 100%;
    height: 8%;
    box-sizing: border-box;
    align-items: center;
`;

export const ModalBtnContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: flex-end;
    margin-right: 2%;
`;

export const CloseBtn = styled.button`
    border: 1px solid #477ee9;
    padding: 1% 3%;
    border-radius: 6px;
    opacity: 0.6;
    transition: opacity 0.5s;
    color: #477ee9;
    margin-right: 1%;
    &:hover {
        opacity: 1;
    }
`;

export const SaveBtn = styled.button`
    border: 1px solid #477ee9;
    padding: 1% 3%;
    border-radius: 6px;
    opacity: 0.6;
    transition: opacity 0.5s;
    color: #fff;
    background: #477ee9;
    &:hover {
        opacity: 1;
    }
`;

export const DocBtn = styled.button`
    ${(props: StyledProps) =>
        props.$boxType == "receiver"
            ? `margin-right: 1%; height: 100%;`
            : props.$boxType == "reselect"
            ? `margin-right: 1%; height: 30%;`
            : `transform: scale(0.9); height: 100%;`}
    width: 6%;
    display: flex;
    opacity: 0.6;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    font-size: 2em;
    font-weight: 900;
    background-color: #ccc;
    border: 1px solid #ccc;
    border-radius: 3px;
    transition: opacity 0.5s;
    max-height: 48px;
    min-height: 36px;
    &:hover {
        background-color: #477ee9;
        border: 1px solid #477ee9;
        opacity: 1;
    }
`;

export const GridViewWrap = styled.div`
    width: 100%;
    height: calc(100% - 20px);
    border: 1px solid #ccc;
`;

export const DeployUserBlock = styled.div`
    width: 90%;
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    flex-wrap: wrap;
    height: auto;
    margin-left: 2%;
`;

export const ChipBlock = styled(Chip)``;

export const DocChip = styled.div`
    width: fit-content;
    margin: 5px;
`;

export const FileSelectBtn = styled.button`
    border: 1px solid black;
    padding: 1% 3%;
    margin-left: 20px;
    border-radius: 6px;
    opacity: 0.6;
    transition: opacity 0.5s;
    color: black;
    background: white;
    &:hover {
        background: gray;
        color: white;
        border: 1px solid white;
    }
`;

export const UploadListInner = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    min-height: 2em;
    max-height: 6em;
    height: fit-content;
    overflow-y: auto;
    width: 100%;
`;

export const UploadList = styled.div`
    /* display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column; */
    margin: 0 10px 0 10px;
    width: 95%;
    border: 1px solid #ccc;
    max-height: 200px;
    overflow-y: auto;
`;

export const UploadListFristItem = styled.div`
    display: flex;
    background-color: #c4d6d6;
    justify-content: center;
    align-items: center;
    font-size: 1.2em;
    color: #333;
    width: 100%;
`;

export const UploadListItem = styled.div`
    background: #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 2em;
    width: 100%;
`;

export const UploadListItemText = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-start;
    padding-left: 20px;
    font-size: 1.2em;
    color: #333;
`;

export const UploadListItemDeleteBtn = styled(Button)`
    img {
        width: 16px;
        height: 16px;
    }
`;

export const FileTextFieldDiv = styled(TextField)`
    box-sizing: border-box;
    ${(props: StyledProps) =>
        props.$heightType == true
            ? ` height: 40px; width: 100%; margin: 0 2% 0 2%;`
            : `flex: 1; margin: 0 2% 0 4%;`}
`;

export const EditorBox = styled.div`
    margin: 0 10px 0 10px;
    width: 100%;
    height: 100%;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

export const EmptyBox = styled.div`
    display: flex;
    justify-content: flex-end;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;
    height: 40px;
    margin-left: 1%;
    margin-right: 1%;
`;

export const GroupBtn = styled(Button)`
    display: flex;
    position: relative;
    justify-content: center;
    right: 0px;
    margin: 0;
    height: 100%;
    background-color: #ffffff;
    color: black;
    border: 1px solid black;
    &:hover {
        background-color: #ffffff;
        color: black;
    }
    padding: 4px 8px;
`;

export const TmNoInput = styled.input`
    text-align: left;
    font-size: 1.4em;
    white-space: nowrap;
    flex: 1;
    margin: 0 1%;
    padding: 0 3%;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 5px;
    height: 100%;
`;
