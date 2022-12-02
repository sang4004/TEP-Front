import styled from "styled-components";
import Checkbox from "@material-ui/core/Checkbox";
import Modal from "@material-ui/core/Modal";

// import * as S from "../default.styled";

type StyledProps = {
    $boxType?: string;
    $btnType?: string;
    $headSize?: number;
    $background?: string;
    $color?: string;
    $hover?: string;
    $dateType?: number;
    $wpType?: string;
};

export const Block = styled.div`
    border-radius: 10px;
    display: block;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    div {
        font-family: "NanumSquareRound";
    }
`;

export const Inner = styled.div`
    width: 100%;
    height: 100%;
    background: white;
`;

export const ModalHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 8%;
    background: #1a4a4a;
    // background: #1a4a4a;
    padding: 3%;
    box-sizing: border-box;
    color: white;
    font-size: 1.1vw;
    font-weight: 400;
`;

export const HeaderText = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 5%;
    // background: #1a4a4a;
    padding: 3%;
    box-sizing: border-box;
    color: white;
    font-size: 1.1vw;
    font-weight: 400;
`;


export const HeaderTitle = styled.div`
    margin-left: 0; 
    color: white;
    font-size: 0.8em;
`;

export const ModalCloseBtn = styled.button`
    display: block;
    width: 5%;
    opacity: 0.8;
    transform: scale(0.9);
    transition: opacity 0.3s, transform 0.3s;
`;

export const FileSelectBtn = styled.button`
    display: block;
    width: 3%;
    opacity: 0.8;
    transform: scale(0.9);
    transition: opacity 0.3s, transform 0.3s;
    margin-top: 3%;
`;

export const FileCheckbox = styled(Checkbox)``;

export const SaveBtn = styled.button`
    border: 1px solid #477ee9;
    padding: 0 2%;
    border-radius: 6px;
    opacity: 1;
    transition: opacity 0.5s;
    color: #fff;
    font-size: 0.8em;
    background: #477ee9;
    height : 32px;
    &:hover {
        opacity: 0.7;
    }
`;

export const GridViewWrap = styled.div`
    width: 100%;
    height: calc(100% - 60px);   
`;

export const DocumentWorklistContainer = styled.div`
    display: flex;
    height: 75%;
    background: #fff;
    border-radius: 10px;
    margin: 6%;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
`;

export const FileSelectContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 80%;
`;

export const DocumentWorklistStruct = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    // border-right: 1px solid #ccc;
`;

export const DocumentContentHeader = styled.div`
    height: 50px;
    border-bottom: 1px solid #ccc;
    display: flex;
    // justify-content: space-between;
    align-items: center;
    padding: 10px;
    box-sizing: border-box;
`;
export const DocumentTreeViewBlock = styled.div`
    overflow: auto;
    flex : 1;
`;

export const DocumentTreeList = styled.div`
    overflow: auto;
    flex: 1;
`;

export const DoucmentWorklistTableBox = styled.div`
    width: 100%;
`;

export const DocumentWorklistTableBoxHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 50px;
    padding: 0 10px;
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;
`;

export const DocumentWorklistTableFolderTitle = styled.div`
    display: flex;
    align-items: center;
    font-weight: 700;
    img {
        margin-left: 15px;
        margin-right: 10px;
    }
    div{
        display : flex;
        justify-content : flex-start;
        flex-direction : row;
    }
`;

export const SelectItemText = styled.div`
    ${(props: StyledProps) => (props.$boxType == "project"
        ? `width: 100%;`
        : `width: 100%;`
    )}
    overflow: auto;
`;

export const TreeIcon = styled.img`
    margin-right: 6px;
    width: 16px;
    height: 16px;
`;

export const BodyTitle = styled.div`
    width: 100px;
    height : 100%;
    display : flex;
    align-items : center;
`;
