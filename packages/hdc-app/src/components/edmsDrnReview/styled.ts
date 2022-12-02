import styled from "styled-components";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import Modal from "@material-ui/core/Modal";

type StyledProps = {
    $isReply: boolean;
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
    height: ${(props: StyledProps) => (props.$isReply ? "70%" : "80%")};
    width: 40%;
    padding: 0;
    box-shadow: 0 0 1px 4px rgba(0, 0, 0, 0.16);
    background-color: white;
    border-radius: 10px 10px 10px 10px;
    display: flex;
    flex-direction: column;
    position: relative;
    min-width: 300px;
    overflow-y: auto;
    &::-webkit-scrollbar {
        display: none;
    }
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

export const TopBlockText1 = styled.div`
    color: #000000;
    font-size: 2em;
    font-weight: 400;
    margin: 10px 0;
    width: 100%;
    text-align: center;
`;

export const TopBlockText2 = styled.div`
    color: #000000;
    font-size: 1.2em;
    font-weight: 400;
    width: 80%;
    height: 40px;
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

export const InputDateBox = styled.div`
    display: flex;
    width: 100%;
    margin-top: 1%;
    justify-content: space-between;
`;

export const TopTextBlock = styled.div`
    width: 100%;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

export const TopBlock = styled.div`
    height: fit-content;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

export const CommentBlock = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: left;
    flex: 1;
    width: 100%;
`;

export const ContentBlock = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    height: fit-content;
    width: 100%;
`;

export const SelectBox = styled(Select)`
    width: 80%;
    border: 1px solid #ccc;
    padding: 0 10px;
    border: 1px solid #999;
    font-size: 1.2em;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Item = styled(MenuItem)`
    display: flex;
    justify-content: flex-start;
    align-items: center;
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
    font-size: 1.2em;
    width: 80%;
    flex: 1;
    font-weight: 400;
    color: #666;
`;

export const AddFileBtn = styled.button`
    width: fit-content;
    padding: 10px;
`;

export const PasswordInput = styled(TextField)`
    font-size: 1.2em;
    width: 80%;
    font-weight: 400;
    color: #666;
`;

export const BtmBtn = styled(Button)`
    width: 100%;
    background-color: #477ee9;
    color: white;
    font-size: 1.8em;
    height: fit-content;
    padding: 10px 0;
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

export const PageSheetNoDiv = styled.div`
    display: flex;
    align-items: center;
    width: 80%;
    padding: 0 10px;
    border: 1px solid #999;
`;

export const ApproveBlock = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
`;

export const CheckboxBlockIn = styled(Checkbox)``;

export const PageSheetNoInput = styled(TextField)`
    box-sizing: border-box;
    flex: 1;
    margin: 0 2% 0 4%;
`;

export const SaveBtn = styled(Button)`
    border: 1px solid black;
    padding: 1% 2%;
    border-radius: 6px;
    opacity: 0.6;
    transition: opacity 0.5s;
    color: black;
    background-color: #ffffff;
    &:hover {
        background-color: #ffffff;
        color: black;
    }
    min-width: 65px;
`;

export const UpdateBtn = styled(Button)`
    border: 1px solid black;
    padding: 1% 2%;
    border-radius: 6px;
    opacity: 0.6;
    transition: opacity 0.5s;
    color: black;
    background-color: #ffffff;
    &:hover {
        background-color: #ffffff;
        color: black;
    }
    min-width: 65px;
    margin-left: 10px;
`;

export const ButtonDiv = styled.div`
    width: 140px;
    height: 35px;
    position: sticky;
    left: 20px;
    top: 20px;
    padding: 0;
    margin: 0;
`;
