import styled from "styled-components";
import Button from "@material-ui/core/Button";
import * as S from "./default.styled";

type StyledProps = {
    $isMain ?: boolean;
    $disabled ?: boolean;
    $color ?: string;
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
    overflow-y : auto;
    margin: 15px auto;
    margin-bottom: 0;
    background-color : #ffffff;
    border : 1px solid #E5E5E5;
`;

export const EnterBottom = styled.div`
    height : 8vw;
    width : 97%;
    margin-bottom : 10px;
    display : flex;
    justify-content : center;
    align-items : center;
    flex-direction : row;
    gap : .5em;
    padding : 10px 0 4px 0 ;
`;

export const FileView = styled.div`
    flex : 7;
    background-color : #EFEFF0;
    border : 1px solid #CCCCCC;
    margin : 1% auto;
    display : flex;
    justify-content : flex-start;
    align-items : center;
    flex-direction : column;
    padding-left : 10px;
    height : 98%;
    overflow : auto;
    font-size : 14px;
    img {
        height : 2vh;
        float : left;
        margin-right : 5px;
    }
    a{
        text-decoration : underline;
    }
    div{
        width : 100%;
        height : 3vh;
        padding : .5vh 0;
    }
`;

export const DocumentAdd = styled.dd`
    button {
        padding: 5px 15px;
        border: 1px solid #ccc;
    }
`;

export const BtmBtn = styled(Button)`
    height : 100%;
    flex : 1;
    padding: 8px 15px;
    margin-left : 10px;
    border-radius : 10px;
    color: ${(props : StyledProps)=>props.$disabled ? 'white' : 'white'};
    background-color : ${(props : StyledProps)=>props.$disabled ? '#EFEFF0' : props.$color} ;
    &:hover{
        background-color : ${(props : StyledProps)=>props.$disabled ? '#EFEFF0' : props.$color} ;
    }
    span{
        font-size : 1.4em;
    }
`;