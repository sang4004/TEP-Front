import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Modal from "@material-ui/core/Modal";

type StyledProps = {
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
    width : 30%;
    padding  : 0;
    box-shadow: 0 0 1px 4px rgba(0, 0, 0, 0.16);
    background-color : white;
    border-radius : 10px 10px 10px 10px;
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

export const TopTextBlock = styled.div`
    width : 100%;
    display : flex;
    justify-content : center;
    align-items : center;
    flex-direction : column;
    flex : 8;
`;

export const TopBlock = styled.div`
    flex : 2;
    width : 100%;
    display : flex;
    justify-content : center;
    align-items : center;
    flex-direction : column;
`;

export const TopBlockText1 = styled.div`
    color : #000000;
    font-size : 1.5em;
    font-weight :400;
    margin : 10px 0;
    width : 100%;
    text-align : center;
`;

export const CommentBlock = styled.div`
    display : flex;
    align-items : center;
    flex-direction : column;
    justify-content : left;
    flex : 5;
    width : 100%;
`;

export const BtmBtn = styled(Button)`
    flex : 1;
    width : 100%;
    background-color : #477EE9;
    color : white;
    font-size : 1.3em;
    font-weight : 400;
    margin-top : 20px;
    display : flex;
    justify-content : center;
    align-items : center;
    border-radius : 0 0 4px 4px;
    &:hover{
        background-color : #3D6BC6;
    }
`;

export const CheckBoxBlock = styled.div`
    display : flex;
`;

export const TabTitle = styled.div`
    margin-top:4%;
    font-size: 16px;
    font-weight: 700;
    &:hover {
        cursor: pointer;
    }
`;

export const CheckBox = styled(Checkbox)`
`;