import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";

type StyledProps = {
    $type ?: string;
    $error ?: number;
    $idx ?: number;
}

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
    height: 100%;
    box-shadow: 0 0 1px 4px rgba(0, 0, 0, 0.16);
    background: linear-gradient(0, white 90%, #1A4A49 90%);
    border-radius : 10px;
    display : flex;
    flex-direction : column;
    position : relative;
    min-width: 500px;
    max-height: 1000px;
    padding : 0 20px;
`;

export const Header = styled.div`
    display : flex;
    justify-content : center;
    align-items :center;
    flex-direction : row;
    width : 100%;
    height: 10%;
`;

export const Title = styled.div`
    flex : 1;
    color : white;
    font-size : 1.3em;
    font-weight : 700;
    display : flex;
    justify-content : flex-start;
    align-items : center;
`;

export const CloseBtn = styled(Button)`
    display : flex;
    justify-content : flex-end;
    align-items : center;
    img{
        width : 24px;
        height: 24px;
    }
`;

export const Body = styled.div`
    height: 90%;
`;

export const Wrapper = styled.div`
    width: 100%;
    display : flex;
    justify-content : center;
    align-items : center;
    flex-direction : column;
    font-size: 2em;
    margin-top: 1em;
    height: 40vh;
`;

export const ProjectTitle = styled.div`
    width: 100%;
    display: flex;
    height: fit-content;
    justify-content : center;
    align-items : center;
    color: #FFF;
    background-color : #487EE9;
    padding:.2em 0;
`;

export const GridViewWrap = styled.div`
    width : 100%;
    flex: 1;
    display : flex;
    justify-content : flex-start;
    align-items : center;
    flex-direction : column;
`;

export const UploadInner = styled.div`
    width : 100%;
    height: 88%;
    padding: 20px 0 10px 0;
`;

export const UploadWrapper = styled.div`
    width : 100%;
    height: 90%;
`;

export const UploadBtn = styled(Button)`
    width : 100%;
    height : 10%;
    display : flex;
    justify-content : center;
    align-items : center;
    background-color : #487EE9;
    color : white;
    font-size : 1.3em;
    font-weight : 700;
    img {
        height : 1.1em;
        margin-right : 10px;
    }
    &:hover{
        background-color : #487EE9;
        opacity : 0.8;
    }
`;

export const UploadList = styled.div`
    display :flex;
    justify-content : flex-start;
    align-items : center;
    flex-direction : column;
    width : 100%;
    height: 100%;
    border : 1px solid #ccc;
`;

export const UploadListFristItem = styled.div`
    display : flex;
    background-color : #C4D6D6;
    justify-content : center;
    align-items : center;
    font-size : 1.2em;
    height: fit-content;
    padding: 6px 0;
    color : #333;
    width : 100%;
`;

export const UploadListInner = styled.div`
    display : flex;
    justify-content : flex-start;
    align-items : center;
    flex-direction : column;
    height: 100%;
    overflow-y : scroll;
    width : 100%;
`;

export const UploadListItem = styled.div`
    background : #FFFFFF;
    display : flex;
    justify-content : space-between;
    align-items : center;
    height: fit-content;
    padding: 10px;
    width : 100%;
`;

export const UploadListItemText = styled.div`
    flex : 1;
    display : flex;
    justify-content : flex-start;
    font-size : 1.2em;
    color: ${(props : StyledProps)=> props.$error && props.$error > 0 ? "#F00" : "#333"};
`;

export const UploadListItemDeleteBtn = styled(Button)`
    img {
        width : 16px;
        height : 16px;
    }
`;

export const BtmBtns = styled.div`
    width : 100%;
    height : 10%;
    display : flex;
    justify-content : flex-end;
    align-items : center;
    gap : 1em;
`;

export const BtmBtn = styled(Button)`
    border : 1px solid #487EE9;
    background-color : #487EE9;
    color : white;
    &:hover{
        background-color : #487EE9;
        opacity : 0.8;
    }
`;