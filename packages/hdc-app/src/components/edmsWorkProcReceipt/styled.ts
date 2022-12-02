import styled from "styled-components";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Chip from "@material-ui/core/Chip";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Modal from "@material-ui/core/Modal";

type StyledProps = {
    $first ?: boolean;
    $width ?: number;
    $disabled ?: boolean;
    $pwInvalid ?: boolean;
    $defer ?: boolean;
    $workType ?: number;
    $boxType ?: string;
}

export const Block = styled(Modal)`
    border-radius : 10px;
    display : block;
    position : relative;
    display :flex;
    justify-content : center;
    align-items : center;
    width : 100%;
    height : 100%;
`;

export const Inner = styled.div`
    height: 40%;
    width : 30%;
    padding  : 0;
    box-shadow: 0 0 1px 4px rgba(0, 0, 0, 0.16);
    background-color : white;
    border-radius : 10px 10px 10px 10px;
    display : flex;
    flex-direction : column;
    position : relative;
    min-width: 300px;
`;

export const CloseBtn = styled(Button)`
    width : 20px;
    height : 20px;
    min-width : 20px;
    position : absolute;
    right : 20px;
    top : 20px;
    padding : 0;
    margin : 0;
`;

export const CloseIcon = styled.img`
    width : 20px;
    height : 20px;
`;

export const DocBtn = styled.button`
    ${(props: StyledProps) => props.$boxType=="receiver" 
    ?   `margin-right: 1%; `
    :   `transform: scale(0.9);`
    }
    width: 48px;
    display: flex;
    height: 48px;
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
    &:hover {
        background-color: #477ee9;
        border: 1px solid #477ee9;
        opacity: 1;
    }
`;

export const TopTextBlock = styled.div`
    width : 100%;
    display : flex;
    justify-content : center;
    align-items : center;
    flex-direction : column;
    flex : 8;
`;

export const TopBlock = styled.div`
    flex : 2;
    width : 100%;
    display : flex;
    justify-content : center;
    align-items : center;
`;

export const TopBlockText1 = styled.div`
    color : #000000;
    font-size : 1.5em;
    font-weight :400;
    margin : 10px 0;
    width : 100%;
    text-align : center;
    margin-bottom: 0;
    margin-top: 4%;
`;

export const BoxDiv = styled.div`
    width: 80%;
    display: flex;
    margin-left: 1%;
    margin-right: 1%;
    align-items: center;
`;

export const TopInputTitle = styled.div`
    width: fit-content;
    min-width: 100px;
    font-size: 1.2em;
    font-weight: 700;
    text-align-last: justify;
    letter-spacing: .2em;
`;

export const InputSelect = styled(Select)`
flex: 1;
width: 30%;
height: 100%;
padding: 0.4em 0;
font-size: 1em;
border: 1px solid #999999;
border-radius: 5px;
`;

export const ModalInputBox = styled.div`
    ${(props: StyledProps) =>
        props.$boxType == "wide"
            ? `width: 100%; height: 20%; padding: 10px;`
            : props.$boxType == "subject"
            ? `width: 100%; height: 10%; padding: 10px;`
            : props.$boxType == "inputDate"
            ? `width: 100%; fit-content; padding: 10px; justify-content: space-between;`
            : props.$boxType == "box; padding: 10px 2px 10px 5px;"
            ? `width: 100%; flex: 1;  `
            : `width: 100%; fit-content; padding: 10px;`};
    display: flex;
    margin-bottom: 2%;
    box-sizing: border-box;
    align-items: center;
`;

export const InputDate = styled.input`
    flex: 1;
    width: 30%;
    height: 100%;
    padding: 0.4em 0;
    font-size: 1em;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

export const TopBlockText2 = styled.div`
    color : #000000;
    font-size : 1em;
    font-weight :400;
    width : 80%;
    flex : 1;
    display : flex;
    text-align : center;
    align-items : center;
    justify-content : left;
    margin-top: 5%;
    margin-bottom: 2%;
`;

export const TopBlockText3 = styled.div`
    color : #000000;
    font-size : 1em;
    font-weight :400;
    width : 80%;
    flex : 1;
    display : flex;
    text-align : center;
    align-items : center;
    justify-content : left;
    margin-bottom: 2%;
`;

export const DateBlock = styled.div`
    ${(props : StyledProps) => props.$first
        ? "margin-left: 10%;"
        : "margin-right: 10%;"};
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
`;


export const DeployUserBlock = styled.div`
    width: 90%;
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    flex-wrap: wrap;
    height: auto;
`;

export const ChipBlock = styled(Chip)``;

export const DocChip = styled.div`
    width: fit-content;
    margin: 5px;
`;

export const InputDateBox = styled.div`
    display: flex;
    width: 100%;
    margin-top: 1%;
    justify-content : space-between;
`;

export const CommentBlock = styled.div`
    display : flex;
    align-items : center;
    flex-direction : column;
    justify-content : left;
    flex : 5;
    width : 100%;
`;

export const CommentInput = styled(TextField)`
    font-size : 1.1em;
    width : 80%;
    flex : 5;
    font-weight : 400;
    color : #666;
    input{
        padding : 5em;
    }
`;

export const BoxBlock = styled.div`
    display : ${(props : StyledProps)=>props.$defer ? "none" : "flex"};;
    flex-direction : row;
    align-items : center;
    justify-content : center;
    flex : 2;
    width : 80%;
`;

export const FileBlock = styled.div`
    display : flex;
    flex-direction : column;
    align-items : center;
    justify-content : center;
    flex:2;
    width : 100%;
    margin-top: 1%;
`;

export const FileInputDiv = styled.div`
    display: flex;
    align-items: center;
    width: 80%;
    padding :  0 10px;
    border : 1px solid #999;
`;

export const FileIcon = styled.img`
    height: 50%;
    display: flex;
    justify-content: center;
    align-content: center;
`;

export const FileInput = styled(TextField)`
    font-size : 1.1em;
    width : 80%;
    flex : 1;
    font-weight : 400;
    color : #666;
`;

export const AddFileBtn = styled.button`
    width: fit-content;
    padding: 10px;
`;

export const PasswordBlock = styled.div`
    display : flex;
    flex-direction : column;
    align-items : center;
    justify-content : center;
    flex:2;
    width : 100%;
`;

export const AssignListBlock = styled.div`
    display : flex;
    flex-direction : column;
    align-items : center;
    justify-content : center;
    flex:2;
    width : 100%;
`;

export const ApproveBlock = styled.div`
    display: flex;
    width: 100%;
    justify-content : center;
    align-items : center;
    margin-top: 3%;
`;

export const PasswordText = styled.div`
    color : ${(props : StyledProps)=>props.$pwInvalid ? "#EB5539" : "#333333"};
    font-size : 1.1em;
    margin-left : 10px;
`;

export const InputSelectItem = styled(MenuItem)``;
export const InputSelectCheck = styled(Checkbox)``;
export const InputSelectIcon = styled(ListItemIcon)``;
export const InputSelectItemText = styled(ListItemText)``;

export const PasswordInput = styled(TextField)`
    font-size : 1.1em;
    width : 80%;
    flex : 1;
    font-weight : 400;
    color : #666;
    margin-bottom: 5%;
    height: 100%;
`;

export const PasswordInvalid = styled.div`
    display : ${(props : StyledProps)=>props.$pwInvalid ? "block" : "none"};
    color : #ED6161;
    font-size : .9em;
`;

export const BtmBtn = styled(Button)`
    flex : 1;
    width : 100%;
    background-color : #477EE9;
    color : white;
    font-size : 1.3em;
    font-weight : 400;
    margin-top : 20px;
    display : flex;
    justify-content : center;
    align-items : center;
    border-radius : 0 0 4px 4px;
    &:hover{
        background-color : #3D6BC6;
    }
`;

export const CheckBoxBlock = styled.div`
    flex : 1;
    display : flex;
    align-items : flex-start;
`;

export const CheckboxBlockIn = styled(Checkbox)`
`;