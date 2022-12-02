import styled from "styled-components";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";

type StyledProps = {
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

export const ModalHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 10%;
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
    height: 90%;
`;

export const ModalInputWrap = styled.div`
    width: 100%;
    height: 90%;
    padding: 10px 0;
    display: flex;
    flex-wrap: wrap;
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
            ? `width: 45%; padding: 10px; max-height: 10%; justify-content: space-between;`
            : `width: 100%; padding: 10px;`};

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
    display: flex;
    align-items: center;
`;

export const InputSelect = styled(Select)`
    flex: 1;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin: 0 1%;
    text-align: center;
    padding: 1% 0;
`;

export const InputSelectItem = styled(MenuItem)``;

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

export const ModalBtnContainer = styled.div`
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
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
    flex: 1;
    margin-right: 100%;
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
    padding: 0 3%;
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
    padding: 0 3%;
    border-radius: 6px;
    opacity: 0.6;
    transition: opacity 0.5s;
    color: #fff;
    background: #477ee9;
    &:hover {
        opacity: 1;
    }
`;
