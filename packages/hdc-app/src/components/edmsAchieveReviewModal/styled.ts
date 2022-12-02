import styled from "styled-components";
import Modal from "@material-ui/core/Modal";

type StyledProps = {
    $boxType?: string;
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
    height: 5%;
    background: #1a4a4a;
    padding: 2%;
    box-sizing: border-box;
    color: white;
    font-weight: 600;
`;

export const HeaderTitle = styled.div`
    font-size: 1.2em;
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
    height: 92%;
    padding: 15px 30px 15px 30px;
    box-sizing: border-box;
`;

export const ModalListBox = styled.div`
    height: 530px;
    margin-top: 5px;
    width: 100%;
    border-radius: 10px;
    border: 1px solid #ccc;
`;

export const ModalHistoryListBox = styled.div`
    height: 200px;
    margin-top: 20px;
    width: 100%;
    border-radius: 10px;
    border: 1px solid #ccc;
`;

export const ModalFileHistoryList = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    flex: 1;
    width: 100%;
    height: calc(100% - 30px);
    overflow-y: auto;
    div {
        text-align: center;
        color: #999;
    }
`;

export const ModalHistoryItemDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

export const ModalHistoryTextDiv = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-start;
    font-size: 1.2em;
    color: #333;
    margin-top: 5px;
    margin-left: 10px;
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

export const ButtonDiv = styled.div`
    display: flex;
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

export const ModalFilVersionTextDiv = styled.div`
    display: flex;
    font-size: 1.2em;
    color: #333;
    margin-top: 5px;
    margin-left: 10px;
`;
