import styled from "styled-components";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Modal from "@material-ui/core/Modal";

type StyledProps = {
    $first ?: boolean;
    $width ?: number;
    $disabled ?: boolean;
    $pwInvalid ?: boolean;
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
    width : 40%;
    height : 40%;
    padding  : 0;
    box-shadow: 0 0 1px 4px rgba(0, 0, 0, 0.16);
    background-color : white;
    border-radius : 10px;
    display : flex;
    flex-direction : column;
    position : relative;
    min-width: 300px;
`;

export const CloseBtn = styled(Button)`
    width : 30px;
    height : 30px;
    min-width : 30px;
    position : absolute;
    right : 15px;
    top : 15px;
    padding : 0;
    margin : 0;
    border-radius : 50%;
`;

export const CloseIcon = styled.img`
    width : 15px;
    height : 15px;
`;

export const TopBlock = styled.div`
    flex : 1;
    width : 100%;
    display : flex;
    justify-content : center;
    align-items : center;
    flex-direction : column;
`;

export const TopTextBlock = styled.div`
    width : 100%;
    display : flex;
    justify-content : center;
    align-items : center;
    flex-direction : column;
    flex : 6;
`;

export const TopBlockText = styled.div`
    color : #333333;
    font-size : 1.2em;
    font-weight :300;
    margin : 10px 0;
    width : 100%;
    text-align : center;
`;

export const CommentBlock = styled.div`
    display : flex;
    align-items : center;
    flex-direction : row;
    justify-content : center;
    gap : 1em;
    flex : 4;
    width : 100%;
`;

export const CommentInput = styled(TextField)`
    font-size : 1.1em;
    padding : 8px;
    width : 100%;
    height : 100%;
    font-weight : 400;
    color : #666;
`;

export const CommentInvalid = styled.div`
    display : ${(props : StyledProps)=>props.$pwInvalid ? "block" : "none"};
    color : #ED6161;
    font-size : .9em;
`;

export const BtmBtn = styled(Button)`
    flex : 1;
    width : 100%;
    color : white;
    font-size : 1.3em;
    font-weight : 400;
    display : flex;
    justify-content : center;
    align-items : center;
    background-color : #477EE9;
    border-radius : 0 0 4px 4px;
    &:hover{
        background-color : #3D6BC6;
    }
`;