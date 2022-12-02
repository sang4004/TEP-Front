import styled from "styled-components";
import TextField from "@material-ui/core/TextField";

export const IconWrap = styled.div`
    display: flex;
    min-height: 20px;
    align-items: start;
    margin-right: 6px;
    flex-shrink: 0;
    flex-grow: 0;
`;
export const TreeIcon = styled.img`
    margin-top: 2.5px;
`;

export const TreeItemText = styled.div`
    white-space: pre-wrap;
`;

export const Searchbar = styled.div`
    background-color: #fff;
    border: 1px solid grey;
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 98%;
    margin: 10px 0 10px 1%;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

export const SearchField = styled(TextField)`
    flex: 1;
    margin: 0 8px 0 16px;
`;

export const SearchIcon = styled.img`
    width: 18px;
    height: auto;
    margin: 0 16px 0 8px;
    cursor: pointer;
`;

export const TreeViewHeader = styled.div`
    width: 100%;
    height: 50px;
    border-bottom: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    box-sizing: border-box;
`;
export const TreeViewHeaderWrap = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    div {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    img {
        margin-right: 10px;
    }
    .color-icon {
        color: #ccc;
    }
`;
