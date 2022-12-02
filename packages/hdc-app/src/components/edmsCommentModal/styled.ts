import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Modal from "@material-ui/core/Modal";

type StyledProps = {
    $boxType ?: string;
}

export const Block = styled(Modal)`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: -1;
`;

export const Inner = styled.div`
    width: 950px;
    height: 600px;
    background: white;
    overflow: hidden;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
    top: 50%;
    left: 50%;
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
    font-weight: 600;
`;

export const HeaderTitle = styled.div`
    font-size : 18px;
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
    height: 90%;
    padding: 15px 30px 5px 30px;
    box-sizing: border-box;
`;

export const ModalListBox = styled.div`
    height: 170px;
    margin-top : 10px;
    margin-bottom : 5px;
    width: 100%;
    border-radius: 10px;
    border: 1px solid #ccc;
`;

export const ModalRevisionList = styled.div`
    display : flex;
    justify-content : flex-start;
    flex-direction : column;
    flex : 1;
    width : 100%;
    height : calc(100% - 30px);  
    overflow-y : auto;
    div{
        text-align: center;
        color: #999;
    }
`;

export const ModalRevisionItemDiv = styled.div`
    display : flex;
    justify-content : space-between;
    align-items : center;
    width : 100%;
`;

export const ModalRevisionTextDiv = styled.div`
    flex  : 1;
    display : flex;
    justify-content : flex-start;
    font-size : 1.2em;
    color : #333;
    margin-top : 5px;
    margin-left : 10px;
`;

export const ModalInputBox = styled.div`
    ${(props : StyledProps)=> props.$boxType == 'wide' 
        ? `width: 100%; height: 80%; padding-top : 5px` :
        props.$boxType == 'long'
        ?`width: 100%; height: 40px;` :
        props.$boxType == 'top'
        ?`width: 100%; height: 10%; padding-top : 10px;`
        : `width: 50%; height: 10%;` };

    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    align-items: flex-start;
    
`;

export const InputTitle = styled.div`
    ${(props : StyledProps)=> props.$boxType == 'wide'
    ? `width: fit-content;` : `width: 30%; margin-right: 3%;` };
    text-align: left;
    font-size : 1.1em;
    font-weight : 700;
`;

export const InputSelectTitle = styled.div`
    width: 30%;
    text-align: left;
    font-size: 1.1em;
    font-weight: 700;
`;

export const TextFieldDiv = styled(TextField)`
    display : flex;
    justify-content : center;
    box-sizing: border-box;
    width : 12%;
`;

export const InputSelect = styled(Select)`
    width : ${(props : StyledProps)=> props.$boxType == 'wide' ? "100%" : "50%"};
    height: 70%;
    padding: 0 3%;
    box-sizing: border-box;
    border: 1px solid #CCC;
    border-radius: 5px;
`;

export const InputSelectItem = styled(MenuItem)`
`;

export const InnerContainerHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 30px;
    background: #e4efef;
    border-radius: 10px 10px 0 0;
    padding: 0px 10px;
    box-sizing: border-box;
    color: #666;
    font-weight: 700;
    font-size: 14px;
`;

export const ModalBtnContainer = styled.div`
    text-align: right;
    padding : 10px 0px 20px 20px;
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