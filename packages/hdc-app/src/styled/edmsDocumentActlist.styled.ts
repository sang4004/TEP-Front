import styled from "styled-components";
import Checkbox from "@material-ui/core/Checkbox";
import * as S from "./default.styled";

//전하성
//From css

export const DocumentContentContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    height: 90%;
    margin-top: -4%;
    padding: 2%;
    box-sizing: border-box;
    padding-top: 0;
`;
export const DocumentWorklistContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
`;
export const DocumentWorklistStruct = styled.div`
    width: 15%;
    height: 100%;
    display: flex;
    flex-direction: column;
    border-right: 1px solid #ccc;
`;
export const DocumentContentHeader = styled.div`
    height: 50px;
    border-bottom: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    box-sizing: border-box;
`;

export const DocumentTreeList = styled.div`
    overflow: auto;
    flex: 1;
`;
export const DocumentWorklistTitle = styled.div`
    font-weight: 700;
`;
export const DoucmentWorklistTableBox = styled.div`
    width: 85%;
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
    float: left;
    display: flex;
    align-items: center;
    width: 100%;
    font-weight: 700;
    img {
        margin-right: 10px;
    }
`;
export const DocumentWorklistBreadcrumb = styled.div`
    display: flex;
    font-size: 12px;
    margin-left: 20px;
    margin-top: 5px;
    color: #666;
`;
export const DocumentWorklistDep = styled.div``;
export const DocumentWorklistIcon = styled.div`
    margin: 0 5px;
`;

export const DocumentCreateBtn = styled.button`
    float: right;
    min-width: 154px;
    height: 36px;
    padding: 5px 20px;
    border-radius: 5px;
    margin-right: 10px;
    box-sizing: border-box;
    ${S.theme_background_main_button};
    &:hover {
        ${S.theme_background_main_button_hover};
    }
    color: #fff;
`;

export const FileCheckDiv = styled.div`
    float: right;
    min-width: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 10px;
`;

export const FileCheck = styled.input.attrs({
    type: "checkbox",
})`
    margin-right: 10px;
`;

export const FileDowloadBtn = styled.button`
    float: right;
    min-width: 154px;
    height: 30px;
    padding: 5px 20px;
    border-radius: 5px;
    margin-right: 10px;
    box-sizing: border-box;
    ${S.theme_background_sub_button};
    &:hover {
        ${S.theme_background_sub_button_hover};
    }
    color: #fff;
`;

export const DocumentWorklistSearch = styled.div`
    float: right;
    display: flex;
    input {
        display: block;
        padding: 5px;
        box-sizing: border-box;
        font-size: 14px;
        margin-right: 10px;
    }
`;

export const TreeSearchDiv = styled.div`
    float: right;
    display: flex;
    input {
        display: block;
        padding: 5px;
        width: 100%;
        font-size: 14px;
        margin-right: 10px;
    }
`;

export const SearchDiv = styled.div`
    float: right;
    display: flex;
    border : 1px solid;
    border-radius : 4px;
    margin-left : 5px;
    padding : 1px;
    input {
        display: block;
        padding: 5px;
        box-sizing: border-box;
        font-size: 14px;
        margin-right: 10px;
        background-color: #fafafa;
    }
`;

export const DocumentWorklistSearchBtn = styled.button`
    width: 18px;
    img {
        display: block;
    }
`;

export const TreeSearchBtn = styled.button`
    width: 20px;
    img {
        display: block;
    }
`;

//For Doc.Actlist.page
export const TreeIcon = styled.img`
    margin-right: 6px;
    width: 16px;
    height: 16px;
`;

export const GridViewWrap = styled.div`
    width: calc(100% + 8px);
    height: calc(100% - 50px);
    overflow-y: scroll;
`;

export const TableCheckboxDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    height: 100%;
    padding: 8px 12px;
    flex: 1;
    border-left: 1px solid #ebebeb;
    border-bottom: 1px solid #ebebeb;
`;

export const TableCheckbox = styled(Checkbox)``;
