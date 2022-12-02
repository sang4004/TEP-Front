import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Modal from "@material-ui/core/Modal";

export const Block = styled.div`
    display : block;
    position : relative;
    display :flex;
    justify-content : center;
    align-items : center;
    width : 100%;
    height : 100%;
`;

export const Inner = styled.div`
    width : 100%;
    height : 100%;
    padding  : 0;
    background-color : white;
    display : flex;
    flex-direction : column;
    position : relative;
    min-width: 300px;
    border : 1px solid;

`;

export const CloseBtn = styled(Button)`
    width : 100%;
    height : 20px;
    padding : 0;
    margin : 0;
    display: flex;
    flex-direction : row;
    justify-content: flex-end;
`;

export const CloseIcon = styled.img`
    width : 20px;
    height : 20px;
`;

export const ModalHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 8%;
    background: #1a4a4a;
    padding: 2%;
    color: white;
    font-size: 1.1vw;
    font-weight: 400;
`;

export const HeaderTitle = styled.div`
    font-size: 1em;
    color: white;
`;

export const ModalCloseBtn = styled.button`
    display: block;
    width: 10%;
    opacity: 0.8;
    transform: scale(0.9);
    transition: opacity 0.3s, transform 0.3s;
`;

export const TopTextBlock = styled.div`
    width : 100%;
    display : flex;
    justify-content : center;
    align-items : center;
    flex-direction : column;
    flex : 3;
`;

export const FileUploadBlock = styled.div`
    width : 100%;
    display : flex;
    justify-content : center;
    align-items : center;
    flex : 1;
    a{
        color : #1a4a4a;
    }
`;

export const FileDropInner = styled.div`
    width : 100%;
    height : 100%;
    display : flex;
    flex-direction : row;
`;

export const FileDropInnerImage = styled.div`
    flex : 3;
    position: relative;
    display : flex;
    justify-content : center;
    align-items : center;
    img {
        height : 100%;
        width : auto;
    }
`;
export const FileDropInnerDiv = styled.div`
    flex : 1;
    display : flex;
    justify-content : center;
    align-items : center;
    flex-direction : column;
`;

export const BtmBtn = styled(Button)`
    width : 100%;
    height: 64px;
    background-color : #477EE9;
    color : white;
    font-size : 1.3em;
    font-weight : 400;
    display : flex;
    justify-content : center;
    align-items : center;
    border-radius : 0;
    &:hover{
        background-color : #3D6BC6;
    }
`;