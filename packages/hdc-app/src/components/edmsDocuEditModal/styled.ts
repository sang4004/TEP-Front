import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Modal from "@material-ui/core/Modal";

type StyledProps = {
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
    div{
        font-family : "NanumSquareRound";
    }
`;

export const Inner = styled.div`
    width: 55%;
    height: 65%;
    background: white;
    overflow: hidden;
`;

export const ModalHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 8%;
    background: #1A4A4A;
    padding: 3%;
    box-sizing: border-box;
    color: white;
    font-size: 1.3vw;
    font-weight: 400;
`;

export const HeaderTitle = styled.div`
    font-size : 1em;
    color : white;
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
    ${(props : StyledProps)=> props.$boxType == 'wide' 
        ? `width: 100%; height: 40%;` :
        props.$boxType == 'long'
        ?`width: 100%; height: 10%;`
        : `width: 47%; height: 10%;` };

    display: flex;
    justify-content: space-between;
    padding: 1%;
    box-sizing: border-box;
    align-items: center;
`;

export const InputTitle = styled.div`
    ${(props : StyledProps)=> props.$boxType == 'wide' 
    ? `width: 14%; margin-right: 1%;` : `width: 30%; margin-right: 5%;` };
    text-align: left;
    font-size : 1.1em;
    font-weight : 700;
`;

export const InputSelect = styled(Select)`
    width : ${(props : StyledProps)=> props.$boxType == 'wide' ? "84%" : "65%"};
    height: 100%;
    padding: 0 3%;
    box-sizing: border-box;
    border: 1px solid #CCC;
    border-radius: 5px;
`;

export const InputSelectItem = styled(MenuItem)``;

export const Input = styled.input`
    ${(props : StyledProps)=> props.$boxType == 'wide' 
    ? `width: 84%;` : `width: 65%;` };
    height: 100%;
    padding: 0 3%;
    box-sizing: border-box;
    border: 1px solid #CCC;
    border-radius: 5px;
`;

export const ModalBtnContainer = styled.div`
    text-align: right;
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

export const UploadInner = styled.div`
    width: 100%;
    display: flex;
    height: 20%;
    margin-bottom: 10px;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
`;

export const UploadWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: fit-content;
    flex-direction: column;
`;

export const UploadBtn = styled(Button)`
    width: 98%;
    height: 3em;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #487ee9;
    color: white;
    font-size: 1.3em;
    font-weight: 700;
    margin: 40px 0 10px 0;
    img {
        height: 1.1em;
        margin-right: 10px;
    }
    &:hover {
        background-color: #487ee9;
        opacity: 0.8;
    }
`;

export const UploadList = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    margin: 0 0 10px 0;
    width: 98%;
    border: 1px solid #ccc;
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