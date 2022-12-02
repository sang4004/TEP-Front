import styled from "styled-components";

export const EnterBottom = styled.div`
    min-height: 120px;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    dl {
        display: flex;
        flex-direction: row;
        width: 80%;
        margin: 30px 10px;
        position: relative;
        align-items: center;
        dt {
            margin-right: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 10%;
        }
    }
`;

export const FileAdd = styled.dd`
    position: relative;
    min-height: 5vh;
    max-height: 20vh;
    width: 90%;
    border: 2px dashed #ccc;
    display: flex;
`;

export const FileList = styled.dd`
    flex-direction: column;
    width: 100%;
    overflow-y: scroll;
    padding: 10px 5px;
    &::-webkit-scrollbar-thumb {
        background-color: #707070;
    }
    &::-webkit-scrollbar {
        background-color: transparent !important;
    }
    div {
        display: flex;
        height: auto;
        margin-bottom: 10px;
        width: 100%;
        position: relative;
        z-index: 10;
        max-width: 45vw;
        align-items: center;
    }
    a {
        text-decoration: underline;
        opacity: 50%;
        margin-right: 5px;
        line-height: 24px;
        font-size: 1em;
        word-break: break-all;
    }
`;

export const FileClip = styled.img`
    opacity: 100%;
    width: 14px;
    margin-right: 5px;
`;

export const FileDelete = styled.img`
    width: 10px !impo;
    cursor: pointer;
`;

export const FileSelect = styled.div`
    display: flex;
    justify-content: flex-end;
    color: black;
    width: fit-content;
    height: 100%;
    font-size: 1.2em;
    z-index: 10;
    width: 10%;
    button {
        text-decoration: underline;
        font-weight: 500;
        line-height: 5vh;
        color: #6eadff;
    }
`;

export const DocumentAdd = styled.dd`
    button {
        padding: 5px 15px;
        border: 1px solid #ccc;
    }
`;

export const CompleteBtn = styled.button`
    position: absolute;
    right: 15px;
    padding: 12px 24px;
    font-size: 1.2em;
    background: #477ee9;
    color: white;
    border: none;
    border-radius: 5px;
`;
