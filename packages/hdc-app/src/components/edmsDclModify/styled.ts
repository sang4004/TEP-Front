import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core";

type StyledProps = {
    $type?: string;
    $error?: number;
    $idx?: number;
    $boxType?: string;
};

export const Block = styled.div`
    display: block;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

export const Inner = styled.div`
    width: 100%;
    height: 100%;
    box-shadow: 0 0 1px 4px rgba(0, 0, 0, 0.16);
    background: linear-gradient(0, white 90%, #1a4a49 90%);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    position: relative;
    min-width: 500px;
    max-height: 1000px;
    padding: 0 20px;
`;

export const Header = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    width: 100%;
    height: 10%;
`;

export const Title = styled.div`
    flex: 1;
    color: white;
    font-size: 1.3em;
    font-weight: 700;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

export const CloseBtn = styled(Button)`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    img {
        width: 24px;
        height: 24px;
    }
`;

export const Body = styled.div`
    height: 90%;
`;

export const DclInner = styled.div`
    width: 100%;
    height: 90%;
    padding: 20px 0 10px 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

export const BtmBtns = styled.div`
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 1em;
`;

export const BtmBtn = styled(Button)`
    border: 1px solid #487ee9;
    ${(props: StyledProps) =>
        props.$type == "upload"
            ? `
        background-color : #487EE9;
        color : white;
        &:hover{
            background-color : #487EE9;
            opacity : 0.8;
        }
    `
            : props.$type == "confirm"
            ? `
    background-color : #487EE9;
    color : white;
    opacity : 0.6;
    &:hover{
        background-color : #487EE9;
        opacity : 0.4;
    }
    `
            : `
    color : #487EE9;
    `}
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
            ? `width: 45%; padding: 10px; max-height: 10%; justify-content: space-between;`
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
    min-width: 150px;
    font-size: 1.2em;
    font-weight: 700;
    letter-spacing: 0.2em;
    white-space: nowrap;
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

export const DclInputSelect = styled(Select)`
    flex: 1;
    padding: 0.6em 0;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin: 0 2% 0 4%;
    text-align: center;
`;

export const DclInputSelectItem = withStyles({ root: { textAlign: "center" } })(MenuItem);

export const InputDate = styled.input`
    flex: 1;
    padding: 0.6em 0;
    font-size: 1.2em;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin: 0 2% 0 4%;
    text-align: center;
`;
