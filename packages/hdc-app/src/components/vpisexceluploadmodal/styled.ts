import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Modal from "@material-ui/core/Modal";

type StyledProps = {
    $type ?: string;
    $idx ?: number;
}

export const Block = styled.div`
    /* border-radius : 10px; */
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
    box-shadow: 0 0 1px 4px rgba(0, 0, 0, 0.16);
    background: linear-gradient(0, white 90%, #1A4A49 90%);
    border-radius : ${(props:StyledProps)=> props.$type == "window" ? "0 0 10px 10px" : "10px"};
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
    flex : 1;
    width : 100%;
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
    flex : 9;
    display : flex;
    justify-content : center;
    align-items : center;
    flex-direction : column;
    padding-bottom : 10px;
`;

export const Wrapper = styled.div`
    width: 100%;
    display : flex;
    justify-content : center;
    align-items : center;
    flex-direction : column;
    font-size: 2em;
    margin-top: 1em;
    height: 50vh;
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
    justify-content : center;
    align-items : center;
    flex-direction : column;
    overflow-y: auto;
`;

export const UploadInner = styled.div`
    width : 100%;
    display : flex;
    flex: 1;
    justify-content : flex-start;
    align-items : center;
    flex-direction : column;
`;

export const UploadWrapper = styled.div`
    display : flex;
    justify-content : center;
    align-items : center;
    width : 100%;
    height: fit-content;
    flex-direction : column;
`;

export const UploadBtn = styled(Button)`
    width : 100%;
    height : 3em;
    display : flex;
    justify-content : center;
    align-items : center;
    background-color : #487EE9;
    color : white;
    font-size : 1.3em;
    font-weight : 700;
    margin : 10px 0;
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
    flex : 1;
    display :flex;
    justify-content : flex-start;
    align-items : center;
    flex-direction : column;
    width : 100%;
    border : 1px solid #ccc;
`;

export const UploadListFristItem = styled.div`
    display : flex;
    background-color : #C4D6D6;
    justify-content : center;
    align-items : center;
    font-size : 1.2em;
    color : #333;
    width : 100%;
`;

export const UploadListInner = styled.div`
    display : flex;
    justify-content : flex-start;
    align-items : center;
    flex-direction : column;
    min-height: 2em;
    max-height: 6em;
    height: fit-content;
    overflow-y : auto;
    width : 100%;
`;

export const UploadListItem = styled.div`
    background : #FFFFFF;
    display : flex;
    justify-content : space-between;
    align-items : center;
    height: 2em;
    width : 100%;
`;

export const UploadListItemText = styled.div`
    flex : 1;
    display : flex;
    justify-content : flex-start;
    padding-left : 20px;
    font-size : 1.2em;
    color : #333;
`;

export const UploadListItemDeleteBtn = styled(Button)`
    img {
        width : 16px;
        height : 16px;
    }
`;

export const BtmBtns = styled.div`
    width : 100%;
    height : 64px;
    display : flex;
    justify-content : flex-end;
    align-items : center;
    gap : 1em;
`;

export const BtmBtn = styled(Button)`
    border : 1px solid #487EE9;
    ${(props : StyledProps)=> props.$type == "upload" ? `
        background-color : #487EE9;
        color : white;
        &:hover{
            background-color : #487EE9;
            opacity : 0.8;
        }
    ` : props.$type == "confirm" ? `
    background-color : #487EE9;
    color : white;
    opacity : 0.6;
    &:hover{
        background-color : #487EE9;
        opacity : 0.4;
    }
    ` : `
    color : #487EE9;
    `}
`;

export const ProjectSelect = styled(Select)`
    border: none;
    outline: none;
    font-size: .7em;
    font-weight : 500;
    margin-right : 15px;
`;

export const ProjectSelectMenu = styled(MenuItem)``;