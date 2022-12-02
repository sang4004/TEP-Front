import Button from "@material-ui/core/Button";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import styled from "styled-components";

type StyledProps = {
    $btnType ?: string;
    $headSize ?: number;
    $background ?: string;
    $color ?: string;
    $hover ?: string;
    $dateType ?: number;
}

export const DocumentTitle = styled.div`
    padding: 5px 0px 5px 15px;
    text-align: left;
    font-size: 1.6em;
    border-bottom: 1px solid #ccc;
    border-top: 1px solid #ccc;
`;

export const DocumentInfo = styled.div`
    margin: 5px 10px 5px 10px;
    height: fit-content;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
`;
export const DocumentInfoTitle = styled.div`
    background-color: #e4ecec;
    font-size: 1.4em;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    padding: 5px 0px 5px 10px;
`;
export const ButtonHeaderWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 5px 10px 5px 10px;
`;
export const FileToolBtnWrapper = styled.div`
    display: flex;
`;
export const FileUploadBtn = styled.button`
    float: right;
    min-width: 180px;
    height: 40px;
    padding: 5px 20px;
    border-radius: 5px;
    margin-right: 10px;
    box-sizing: border-box;
    background: #477ee9;
    font-size: 1.4em;
    &:hover {
        background: #477ee9;
        opacity: 0.7;
    }
    color: #fff;
`;
export const FileToolBtn = styled.button`
    min-width: 80px;
    margin-right: 10px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 1.2em;
    &:hover {
        background: #477ee9;
        opacity: 0.7;
    }

    border-radius: 5px;
    background: #477ee9;
    color: #fff;
    height: 40px;
`;
export const DocumentInfoContent = styled.div`
    font-weight: bold;
    background-color: #1c3c4c;
    display: flex;
    flex-direction : column;
`;
export const DocumentInfoColumn = styled.div`
    flex: 1;
    height: 100%;
    padding: 5px 10px 5px 10px;
    display: flex;
`;
export const DocumentInfoColumnTitle = styled.div`
    color: #248cac;
    flex : 0.3;
    margin: 5px 0px 5px 0px;
    font-size: 1.2em;
`;
export const DocumentInfoColumnContent = styled.div`
    color: white;
    flex: 1.2;
    margin: 5px 10px 5px 0px;
    font-size: 1.2em;
    white-space: nowrap;
    overflow: auto;
    
`;

export const DocumentGrid = styled.div`
    height: 60%;
    margin: 0 10px;
`;

export const StructureTableHead = styled.div`
    height: 60px;
    /* border-bottom: 1px solid #ccc; */
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 10px;
    box-sizing: border-box;
`;

export const FolderTitle = styled.div`
    display: flex;
    align-items: center;
    width: fit-content;
    img {
        margin-right : 10px;
    }
`;

export const FolderTitleButton = styled(Button)`
    display: flex;
    justify-content : center;
    align-items : center;
    white-space: nowrap;
    width: fit-content;
    height: 35px;
    font-weight: 500;
    font-size : 1em;
    color : white;
    border-radius : 10px;
    margin-right : 10px;
    padding: 0 10px;
    background : ${(props: StyledProps) => props.$color ? props.$color : `#FCC344`};
    &:hover{
        background : ${(props: StyledProps) => props.$hover ? props.$hover : `#FAA11F`};
    }
`;

export const WorkProcTabs = styled(Tabs)`
    width: fit-content;
`;

export const WorkProcTab = styled(Tab)`
    font-weight: 500;
    font-size: 1.2em;
    min-width: fit-content !important;
`;
