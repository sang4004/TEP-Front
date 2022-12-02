import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Chip from "@material-ui/core/Chip";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Modal from "@material-ui/core/Modal";

type StyledProps = {
    $boxType?: string;
};

export const Block = styled(Modal)`
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
    width: 50%;
    height: 90%;
    background: white;
`;

export const ModalHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 8%;
    background: #1a4a4a;
    padding: 3%;
    box-sizing: border-box;
    color: white;
    font-size: 1.1vw;
    font-weight: 400;
`;

export const HeaderTitle = styled.div`
    font-size: 1em;
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
    overflow-y: scroll;
`;

export const ModalInputWrap = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100%;
`;

export const ModalInputBox = styled.div`
    ${(props: StyledProps) =>
        props.$boxType == "wide"
            ? `width: 100%; height: 40%;`
            : props.$boxType == "long"
            ? `width: 100%; height: 10%;`
            : props.$boxType == "box"
            ? `width: 100%; flex: 1; flex-direction: column;`
            : props.$boxType == "half"
            ? `width: 50%; height: fit-content;`
            : `width: 100%; height: fit-content;`};

    display: flex;
    padding: 10px;
    box-sizing: border-box;
    align-items: center;
`;

export const InputTitle = styled.div`
    /* ${(props: StyledProps) =>
        props.$boxType == "wide"
            ? `width: 14%; margin-right: 1%; text-align: left;`
            : props.$boxType == "long"
            ? `width: 100%; text-align: left;`
            : `width: 10%; margin-right: 3%; text-align: left;`}; */
    width: fit-content;
    min-width: 100px;
    font-size: 1em;
    font-weight: 700;
    text-align-last: justify;
    letter-spacing: 0.2em;
`;

export const InputList = styled.div`
    display: flex;
    justify-content: flex-start;
    flex: 1;
    overflow-x: scroll;
    margin-top: 8px;
`;

export const InputItem = styled.div`
    text-align: left;
    padding-left: 20px;
    font-size: 1em;
    white-space: nowrap;
    /* width : fit-content; */
    flex: 1;
`;

export const InputSelectIcon = styled(ListItemIcon)``;

export const InputSelectCheck = styled(Checkbox)``;

export const InputSelect = styled(Select)`
    ${(props: StyledProps) =>
        props.$boxType == "receiver" ? ` margin : 0 0 0 20px;` : `margin : 0 20px;`};
    flex: 1;
    height: 100%;
    padding: 0.4em;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

export const InputSelectItem = styled(MenuItem)``;

export const InputSelectItemText = styled(ListItemText)``;

export const Input = styled.input`
    /* ${(props: StyledProps) => (props.$boxType == "wide" ? `width: 84%;` : `width: 65%;`)}; */
    flex: 1;
    height: 100%;
    margin-left: 20px;
    padding: 0.4em 0;
    font-size: 1em;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

export const InputDate = styled.input`
    flex: 1;
    height: 100%;
    margin-left: 20px;
    padding: 0.4em 0;
    font-size: 1em;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

export const InputNumber = styled(TextField)`
    flex: 1;
    height: 100%;
    padding: 0.4em;
    margin-left: 20px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

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
`;
export const ModalBtn = styled.button`
    border: 1px solid #477ee9;
    padding: 1% 3%;
    border-radius: 10px;
    opacity: 0.6;
    transition: opacity 0.5s;
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
export const GridViewWrap = styled.div`
    width: 100%;
    height: calc(100% - 20px);
    border: 1px solid #ccc;
`;

export const DocChip = styled.div`
    width: fit-content;
    margin: 5px;
`;

export const ChipBlock = styled(Chip)``;

export const DeployUserBlock = styled.div`
    width: 90%;
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    flex-wrap: wrap;
    height: auto;
    margin-left: 2%;
`;

export const DocBtn = styled.button`
    width: 48px;
    display: flex;
    height: 48px;
    margin-left: 10px;
    background-color: #ccc;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    font-size: 2em;
    font-weight: 900;
    border: 1px solid #ccc;
    border-radius: 3px;
`;
