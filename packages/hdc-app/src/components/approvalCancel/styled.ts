import styled from "styled-components";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
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
    width : 20px;
    height : 20px;
    min-width : 20px;
    position : absolute;
    right : 20px;
    top : 20px;
    padding : 0;
    margin : 0;
`;

export const CloseIcon = styled.img`
    width : 20px;
    height : 20px;
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
    font-size : 1.5em;
    font-weight :400;
    margin-top:20px;
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
    padding : 20px;
    padding-top : 0;
`;

export const CommentInput = styled(TextField)`
    font-size : 1.1em;
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
    font-size : 1.5em;
    font-weight : 400;
    display : flex;
    justify-content : center;
    align-items : center;
    background-color : #3E8A8B;
    border-radius : 0 0 4px 4px;
    &:hover{
        background-color : #337272;
    }
`;