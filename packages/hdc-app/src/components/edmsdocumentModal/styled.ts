import styled from "styled-components";
import Select from "@material-ui/core/Select";
import AutoComplete from "@material-ui/lab/Autocomplete";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";

type StyledProps = {
    $boxType?: string;
};

export const TextFieldBlock = styled(TextField)`
    height: 100%;
    & .MuiAutocomplete-inputRoot {
        height: 100%;
    }
`;

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
    font-size: 1.3vw;
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
`;

export const ModalInputWrap = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    flex: 1;
    width: 100%;
    height: 38vh;
    overflow: auto;
`;

export const ModalInputBox = styled.div`
    ${(props: StyledProps) =>
        props.$boxType == "wide"
            ? `width: 100%; height: 40%;`
            : props.$boxType == "long"
            ? `width: 100%; height: 10%;`
            : `width: 47%; height: 10%;`};

    display: flex;
    justify-content: space-between;
    padding: 1%;
    box-sizing: border-box;
    align-items: center;
`;

export const InputTitle = styled.div`
    ${(props: StyledProps) =>
        props.$boxType == "wide"
            ? `width: 14%; margin-right: 1%;`
            : `width: 30%; margin-right: 5%;`};
    text-align: right;
    font-size: 1.1em;
    font-weight: 700;
`;

export const InputAutoComplete = styled(AutoComplete)`
    width: 84%;
    height: 100%;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 5px;
    position: relative;
    padding: 0 10px;
`;

export const InputSelect = styled(Select)`
    width: ${(props: StyledProps) => (props.$boxType == "wide" ? "84%" : "65%")};
    height: 100%;
    padding: 0 3%;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

export const InputSelectItem = styled(MenuItem)``;

export const Input = styled.input`
    ${(props: StyledProps) => (props.$boxType == "wide" ? `width: 84%;` : `width: 65%;`)};
    height: 100%;
    padding: 0 3%;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

export const ModalBtnContainer = styled.div`
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const BtnDiv = styled.div`
    display: flex;
    width: 100%;
    justify-content: flex-end;
    gap: 1em;
    height: 60%;
`;

export const VpDiv = styled.div`
    display: flex;
    justify-content: flex-start;
    width: 50%;
    padding: 0 10px;
`;

export const CheckboxBlock = styled(Checkbox)`
    padding: 0;
    border-radius: 0;
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
