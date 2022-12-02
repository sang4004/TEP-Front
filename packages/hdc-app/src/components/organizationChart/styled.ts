import styled from "styled-components";
import TextField from "@material-ui/core/TextField";

export const wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
    height: 100%;
    z-index: 10;
`;
export const Block = styled.div`
    height: 96%;
    width: 100%;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 0 5px 1px rgb(136 136 136 / 30%);
    color: #4b5964;
`;

export const TitleDiv = styled.div`
    width: 100%;
    height: 5vh;
    text-align: center;
    font-size: 1.5em;
    font-weight: 400;
    // padding-top : 1vh;
    border-bottom: 0.1vh solid #c5c5c5;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const CloseBtnWrap = styled.div`
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
`;

export const closeBtnImg = styled.img`
    position: absolute;
    top: 1.5vh;
    right: 1vh;
    width: 20px;
    height: 20px;
`;

export const SearchBar = styled.div`
    width: 100%;
    height: 44px;
    border-bottom: 1px solid #c5c5c5;
    position: relative;
`;

export const SearchField = styled(TextField)`
    width: 90%;
    padding: 0 10px;
    height: 100%;
    display: flex;
    justify-content: center;
`;

export const SearchBtn = styled.button`
    width: 24px;
    height: 24px;
    position: absolute;
    right: 8px;
    top: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const SearchBtnImg = styled.img`
    width: 20px;
    height: 20px;
`;

export const TreeView = styled.div`
    width: 100%;
    height: 88%;
    flex: 1;
    overflow-y: scroll;
    padding: 6px 10px;
`;

export const TreeIcon = styled.img`
    margin-right: 6px;
    width: 16px;
    height: 16px;
`;
