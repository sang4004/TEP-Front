import styled from "styled-components";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Modal from "@material-ui/core/Modal";

type StyledProps = {
    $first ?: boolean;
    $width ?: number;
    $disabled ?: boolean;
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
`;

export const Inner = styled.div`
    height : fit-content;
    padding  : 0 45px 25px 45px;
    box-shadow: 0 0 1px 4px rgba(0, 0, 0, 0.16);
    background-color : white;
    border-radius : 10px;
    display : flex;
    flex-direction : column;
    position : relative;
    min-width: 500px;
`;

export const Title = styled.h2`
    margin : 20px 0;
    height:50px;
    display : flex;
    align-items : center;
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 15px;
`;

export const CloseBtn = styled(Button)`
    position : absolute;
    display : flex;
    right: 30px;
    top : 30px;
    min-width : 40px;
    width : 30px;
    height : 30px;
    border-radius : 50%;
    span {
        width : 30px;
    }
    img{
        width : 15px;
        height : 15px;
    }
`;

export const Content = styled.div`
    display : flex;
    justify-content : center;
    align-items : center;
    flex-direction : column;
    width : 100%;
    height: fit-content;
    `;

export const Textfield = styled.h4`
    display : flex;
    justify-content : flex-start;
    align-items : center;
    width: 100%;
    height: 40px;
`;

export const DocType = styled(TextField)`
    width: 100%;
    height: 40px;
    padding : 0 10px;
    border : 1px solid #4490FF;
    display : flex;
    justify-content : center;
    align-items : flex-start;
`;

export const AddButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 100px;
    background-color: #aaaaaa;
    color: #ffffff;
    font-size: 3em;
`;

export const FileDiv = styled.div`
    width: 100%;
    height: fit-content;
    display : flex;
    align-items: center;
    justify-content: center;
`;

export const FileList = styled.div`
    height: 100px;
    display : flex;
    align-items: center;
    border : 1px solid #4490FF;
    flex-direction : column;
    flex : 1;
    overflow-y : scroll;
    div{
        display : flex;
        height : 32px;
        margin-left : 5px;
        width : 100%;
        position : relative;
        z-index : 10;
    }
    a{
        text-decoration : underline;
        opacity : 50%;
        margin-right : 5px;
        line-height : 32px;
        font-size : 1.2em;
    }
`;

export const FileClip = styled.img`
    width : 16px;
`;

export const FileDelete = styled.img`
    width : 16px;
`;

export const Btn = styled(Button)`
    height: 50px;
    display : flex;
    position: relative;
    justify-content : center;
    margin : 20px 0;
    width: 100%;
    background-color : #477EE9;
    color : white;
    padding : 8px 24px;
    &:hover{
        background-color : #477EE9;
        color : white;
    }
`;