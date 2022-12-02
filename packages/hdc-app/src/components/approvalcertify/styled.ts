import styled from "styled-components";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import Modal from "@material-ui/core/Modal";

type StyledProps = {
    $first?: boolean;
    $width?: number;
    $disabled?: boolean;
    $pwInvalid?: boolean;
    $defer?: boolean;
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
`;

export const Inner = styled.div`
    width: 30%;
    height: 40%;
    padding: 0;
    box-shadow: 0 0 1px 4px rgba(0, 0, 0, 0.16);
    background-color: white;
    border-radius: 10px 10px 10px 10px;
    display: flex;
    flex-direction: column;
    position: relative;
    min-width: 300px;
`;

export const CloseBtn = styled(Button)`
    width: 20px;
    height: 20px;
    min-width: 20px;
    position: absolute;
    right: 20px;
    top: 20px;
    padding: 0;
    margin: 0;
`;

export const CloseIcon = styled.img`
    width: 20px;
    height: 20px;
`;

export const TopTextBlock = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    flex: 8;
`;

export const TopBlock = styled.div`
    flex: 2;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

export const TopBlockText1 = styled.div`
    color: #000000;
    font-size: 1.5em;
    font-weight: 400;
    margin: 10px 0;
    width: 100%;
    text-align: center;
`;

export const TopBlockText2 = styled.div`
    color: #000000;
    font-size: 1em;
    font-weight: 400;
    width: 80%;
    flex: 1;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: left;
`;

export const CommentBlock = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: left;
    flex: 5;
    width: 100%;
`;

export const CommentInput = styled(TextField)`
    font-size: 1.1em;
    width: 80%;
    flex: 5;
    font-weight: 400;
    color: #666;
    input {
        padding: 5em;
    }
`;

export const BoxBlock = styled.div`
    display: ${(props: StyledProps) => (props.$defer ? "none" : "flex")};
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex: 2;
    width: 80%;
`;

export const PasswordBlock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 2;
    width: 100%;
`;

export const PasswordText = styled.div`
    color: ${(props: StyledProps) => (props.$pwInvalid ? "#EB5539" : "#333333")};
    font-size: 1.1em;
    margin-left: 10px;
`;

export const FakeInput = styled(TextField)`
    width: 0;
    height: 0;
    border: 0;
`;

export const PasswordInput = styled(TextField)`
    font-size: 1.1em;
    width: 80%;
    flex: 1;
    font-weight: 400;
    color: #666;
    input {
    }
`;

export const PasswordInvalid = styled.div`
    display: ${(props: StyledProps) => (props.$pwInvalid ? "block" : "none")};
    color: #ed6161;
    font-size: 0.9em;
`;

export const BtmBtn = styled(Button)`
    flex: 1;
    width: 100%;
    background-color: #477ee9;
    color: white;
    font-size: 1.3em;
    font-weight: 400;
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0 0 4px 4px;
    &:hover {
        background-color: #3d6bc6;
    }
`;

export const CheckBoxBlock = styled.div`
    flex: 1;
    display: flex;
    align-items: flex-start;
`;

export const CheckboxBlockIn = styled(Checkbox)``;
