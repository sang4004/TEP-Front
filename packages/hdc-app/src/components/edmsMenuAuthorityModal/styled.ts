import styled from "styled-components";
import Modal from "@material-ui/core/Modal";

export type styleProps = {
    $selected?: boolean;
    $background?: string;
    $cellSelected?: boolean;
    $headSize?: number;
    $active?: boolean;
    $deleted?: boolean;
    $expanded?: boolean;
};

export const Block = styled(Modal)`
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
    width: 50%;
    height: 80%;
    background: white;
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
`;

export const TableTd = styled.td``;

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
    font-size: 1.2vw;
    font-weight: 400;
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
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 90%;
    padding: 30px;
    box-sizing: border-box;
`;

export const TopDiv = styled.div`
    display: flex;
    height: 50%;
    width: 100%;
    justify-content: center;
    align-items: center;
    /* gap: 30px; */
`;

export const Top = styled.div`
    display: flex;
    flex-direction: column;
    /* flex: 1; */
    width: 30%;
    margin-right: 5%;
    height: 100%;
    justify-content: center;
    align-items: center;
`;

export const TopUser = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100%;
    justify-content: center;
    align-items: center;
`;

export const TopTitle = styled.div`
    width: 100%;
    justify-content: left;
    align-items: center;
    font-size: 1.4em;
    font-weight: 800;
    padding: 10px;
`;

export const TopContent = styled.div`
    flex-direction: column;
    width: 100%;
    height: 90%;
    justify-content: flex-start;
    align-items: flex-start;
    border: 1px solid #aaa;
    overflow-y: scroll;
    &::-webkit-scrollbar {
        background-color: #ccc;
        color: #fff;
    }
`;

export const TableRow = styled.div`
    display: flex;
    width: 100%;
    height: fit-content;
    font-size: 1em;
    letter-spacing: 0.2em;
    padding: 5px;
    background-color: ${(props: styleProps) => (props.$selected ? "#aaa" : "#fff")};
    color: ${(props: styleProps) => (props.$selected ? "#fff" : "#777")};
    &:hover {
        background-color: #aaa;
        color: #fff;
    }
`;

export const BtmDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 50%;
    justify-content: center;
    align-items: center;
`;

export const BtmAuth = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 80%;
    justify-content: center;
    align-items: center;
    /* padding: 10px; */
`;

export const Btm = styled.div`
    display: flex;
    margin-top: 30px;
    width: 100%;
    justify-content: flex-end;
    gap: 10px;
    flex-direction: row;
`;

export const BtmAddBtn = styled.button`
    display: flex;
    width: fit-content;
    height: 100%;
    justify-content: center;
    align-items: center;
    font-size: 1.4em;
    padding: 10px;
    background-color: ${(props: styleProps) =>
        props.$background == "red" ? "#F54336" : "#2196F3;"};
    color: #fff;
    border-radius: 4px;
`;

export const BtmDelBtn = styled.button`
    display: flex;
    width: fit-content;
    height: 100%;
    justify-content: center;
    align-items: center;
    font-size: 1.4em;
    padding: 10px;
    background-color: #aaa;
    color: #fff;
    border-radius: 4px;
`;

export const BtmTitle = styled.div`
    width: 100%;
    justify-content: left;
    align-items: center;
    font-size: 1.4em;
    font-weight: 800;
    padding: 10px;
`;

export const BtmAuthContent = styled.div`
    flex-direction: column;
    width: 100%;
    height: 90%;
    justify-content: flex-start;
    align-items: flex-start;
    border: 1px solid #aaa;
    &::-webkit-scrollbar {
        background-color: #ccc;
        color: #fff;
    }
`;

export const BtmContent = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 90%;
    justify-content: center;
    align-items: center;
    border: 1px solid #aaa;
`;

export const BtmContentRow = styled.div`
    width: 100%;
    flex: 1;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 1.6em;
`;

export const Checkbox = styled.input.attrs({
    type: "checkbox",
})`
    width: 10%;
    margin: 0 10%;
    transform: scale(1.5);
    cursor: pointer;
`;

export const BtmBtnDiv = styled.div`
    width: 100%;
    height: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const BtmEditBtn = styled.button`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.4em;
    padding: 10px 0;
    background-color: ${(props: styleProps) => (props.$active ? "#2196F3" : "#aaa")};
    color: #fff;
`;

export const MenuItem = styled.div`
    display: flex;
    width: 100%;
    height: fit-content;
    font-size: 1em;
    letter-spacing: 0.2em;
    padding: 5px;
    background-color: ${(props: styleProps) => (props.$selected ? "#aaa" : "#fff")};
    color: ${(props: styleProps) => (props.$selected ? "#fff" : "#777")};
    &:hover {
        background-color: #aaa;
        color: #fff;
    }
`;
