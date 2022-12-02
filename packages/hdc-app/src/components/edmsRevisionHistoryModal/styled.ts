import styled from "styled-components";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";

type StyledProps = {
    $boxType?: string;
};

export const Block = styled(Modal)`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: -1;
`;

export const Inner = styled.div`
    width: 70%;
    height: 90%;
    background: white;
    overflow: hidden;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
    top: 50%;
    left: 50%;
`;

export const ModalHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 8%;
    background: #1a4a4a;
    padding: 3%;
    box-sizing: border-box;
    color: white;
    font-size: 1.3vw;
    font-weight: 600;
`;

export const HeaderTitle = styled.div`
    font-size: 1em;
    color: white;
`;

export const ModalCloseBtn = styled.button`
    display: block;
    width: 5%;
    opacity: 0.8;
    transform: scale(0.9);
    transition: opacity 0.3s, transform 0.3s;
`;

export const ModalContentWrap = styled.div`
    width: 100%;
    height: 90%;
    padding: 15px 30px 15px 30px;
    box-sizing: border-box;
    overflow-y: auto;
`;

export const ModalListBox = styled.div`
    height: 530px;
    margin-top: 5px;
    width: 100%;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border: 1px solid #ccc;
`;

export const ModalHistoryListBox = styled.div`
    height: 200px;
    margin-top: 20px;
    width: 100%;
    border: 1px solid #ccc;
`;

export const InnerContainerHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    background: #e4efef;
    border-radius: 10px 10px 0 0;
    padding: 0px 10px;
    box-sizing: border-box;
    color: #666;
    font-weight: 700;
    font-size: 14px;
`;

export const ModalFileVersionList = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    flex: 1;
    width: 100%;
    height: calc(100% - 50px);
    overflow: auto;
    div {
        text-align: left;
        color: #999;
    }
`;
export const TableTd = styled.td`
    text-align: center;
    border-left: 1px solid #ebebeb;
    border-bottom: 1px solid #ebebeb;
`;

export const TableButtonDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
`;

export const TableButton = styled(Button)`
    width: fit-content;
    color: white;
    background-color: #1a4a4a;
`;
