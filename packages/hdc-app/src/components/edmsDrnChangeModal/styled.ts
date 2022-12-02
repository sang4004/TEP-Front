import styled from "styled-components";
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
    width: 45%;
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
    font-size: 1.1vw;
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
    width: 100%;
    height: 70%;
    padding: 15px 30px;
    box-sizing: border-box;
`;

export const ModalContentComment = styled.p`
    text-align: center; 
    font-size: 22px; 
    margin: 15px 0;
`;

export const ModalContentInnerBox = styled.div`
    width: 100%;
    height: 90%;
    border: 1px solid #CCC;
    border-radius: 10px;
    padding: 50px;
    box-sizing: border-box;    
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const ModalContentRow = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
    font-size: 18px;
    width: inherit;
`;

export const ModalContentTitle = styled.div`
    width: 45%;
    text-align: right;
    font-weight: 700;
`;

export const ModalContentInfo = styled.div`
    width: 50%;
`;

export const InputSelect = styled(Select)`
    width : fit-content;
    height: 100%;
    padding: 0 3%;
    box-sizing: border-box;
    border: 1px solid #CCC;
    border-radius: 5px;
`;

export const InputSelectItem = styled(MenuItem)``;


export const ModalBtnContainer = styled.div`
    text-align: right;
    padding-top: 3%;
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