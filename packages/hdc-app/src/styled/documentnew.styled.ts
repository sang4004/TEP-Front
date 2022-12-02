import styled from "styled-components";
import * as S from "./default.styled";

type StyledProps = {
    $isMain : boolean;
}

export const Block = S.Block;
export const Bg = S.Bg;

export const EnterTop = styled.div`
    font-size : 16px;
    height : 48px;
    width : 100%;
    position : relative;
    border-bottom : 1px solid #bfd2e2;
`;

export const DocumentContent = styled.div`
    flex : 1;
    width : 97%;
    margin: 15px auto;
    margin-bottom: 0;
    overflow-y : auto;
    &::-webkit-scrollbar{
        display : none;
    }
`;

export const EnterBottom = styled.div`
    min-height : 120px;
    width : 100%;
    display : flex;
    justify-content : flex-start;
    align-items : center;
    dl {
        display: flex;
        flex-direction : row;
        width: 80%;
        margin: 30px 10px;
        position : relative;
        dt {
            margin-right: 20px;
        }
    }
`;

export const FileAdd = styled.dd`
    position: relative;
    min-height : 5vh;
    max-height : 8vh;
    overflow-y : auto;
    width : 100%;
    height: fit-content;
    border: 2px dashed #ccc;
    display : flex;
`;

export const FileList = styled.dd`
    position : relative;
    flex-direction : column;
    width : 100%;
    height : fit-content;
    div{
        display : flex;
        height : 3vh;
        margin-left : 5px;
        width : fit-content;
        position : relative;
        z-index : 10;
    }
    img{
        opacity : 100%;
        width : 1.5vh;
        margin-right : 5px;
        line-height : 2vh;
    }
    a{
        text-decoration : underline;
        opacity : 50%;
        margin-right : 5px;
        padding-top : .5vh;
        line-height : 2vh;
    }
`;

export const FileSelect = styled.div`
    display : flex;
    justify-content : flex-end;
    padding-right : 24px;
    color : black;
    position : absolute;
    width : 100%;
    height : 100%;
    top : 0;
    font-size : 1.2em;
    button{
        text-decoration : underline;
        font-weight : 500;
        line-height : 5vh;
        color : #6eadff;
    }
`;

export const DocumentAdd = styled.dd`
    button {
        padding: 5px 15px;
        border: 1px solid #ccc;
    }
`;

export const CompleteBtn = styled.button`
    position: absolute;
    right: 15px;
    padding: 12px 24px;
    font-size : 1.2em;
    margin: 7px 20px;
    background: #477EE9;
    color: white;
    border: none;
    border-radius: 5px;
`;