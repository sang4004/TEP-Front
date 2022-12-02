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
    $workType?: number;
    $completeType?: number;
    $rejectCheck?: boolean;
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
    ${(props: StyledProps) => (props.$rejectCheck == true ? "height : 300px;" : "height : 200px;")};
    width: 400px;

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

export const TopBlockText3 = styled.div`
    color: #000000;
    font-size: 1em;
    font-weight: 400;
    display: flex;
    justify-content: left;
    width: 100%;
`;

export const DateBlock = styled.div`
    ${(props: StyledProps) => (props.$first ? "margin-left: 10%;" : "margin-right: 10%;")};
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
`;

export const InputDateBox = styled.div`
    display: flex;
    width: 100%;
    margin-top: 1%;
    justify-content: space-between;
`;

export const CommentBlock = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: left;
    flex: 5;
    width: 100%;
    margin-bottom: 10px;
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

export const FileBlock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 2;
    width: 100%;
    margin-top: 1%;
`;

export const FileInputDiv = styled.div`
    display: flex;
    align-items: center;
    width: 80%;
    padding: 0 10px;
    border: 1px solid #999;
`;

export const FileIcon = styled.img`
    height: 50%;
    display: flex;
    justify-content: center;
    align-content: center;
`;

export const FileInput = styled(TextField)`
    font-size: 1.1em;
    width: 80%;
    flex: 1;
    font-weight: 400;
    color: #666;
`;

export const AddFileBtn = styled.button`
    width: fit-content;
    padding: 10px;
`;

export const PasswordBlock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 2;
    width: 100%;
`;

export const ApproveBlock = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    margin-top: 1%;
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
