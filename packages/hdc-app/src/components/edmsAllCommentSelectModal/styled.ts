import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Modal from "@material-ui/core/Modal";

export const Block = styled.div`
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
    width : 100%;
    height : 100%;
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

export const CloseIcon = styled.img`
    width : 20px;
    height : 20px;
`;

export const TopTextBlock = styled.div`
    width : 100%;
    display : flex;
    justify-content : center;
    align-items : center;
    flex-direction : column;
    flex : 2;
`;

export const TopBlock = styled.div`
    flex : 1;
    width : 100%;
    display : flex;
    justify-content : center;
    align-items : center;
    flex-direction : column;
`;

export const MidBlock = styled.div`
    flex : 1;
    width : 100%;
    display : flex;
    justify-content : center;
    align-items : center;
    flex-direction : column;
    margin-bottom: 5%;
`;

export const TopBlockText1 = styled.div`
    color : #000000;
    font-size : 1.5em;
    font-weight :400;
    margin : 10px 0;
    width : 100%;
    text-align : center;
`;

export const BtmBtn = styled(Button)`
    width : 100%;
    height: 20%;
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

export const SelectBox = styled(Select)`
    width: 80%;
    border: 1px solid #ccc;
    padding: 0 10px;
    border: 1px solid #999;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Item = styled(MenuItem)`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 12px;
`;