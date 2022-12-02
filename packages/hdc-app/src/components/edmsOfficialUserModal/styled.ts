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
    $width?: number;
    $scroll?: boolean;
    $red?: boolean;
    $backColor?: boolean;
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
    width: 70%;
    height: 90%;
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
    height: 80%;
    padding: 30px 30px 15px 30px;
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
    width: 23%;
    margin-right: 3%;
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
    cursor: pointer;
    &:hover {
        background-color: #aaa;
        color: #fff;
    }
`;

export const BtmDiv = styled.div`
    display: flex;
    width: 100%;
    height: 50%;
    justify-content: center;
    align-items: center;
    /* gap: 30px; */
`;

export const BtmAuth = styled.div`
    display: flex;
    flex-direction: column;
    /* flex: 2; */
    width: 50%;
    margin-right: 5%;
    height: 100%;
    justify-content: center;
    align-items: center;
    /* padding: 10px; */
`;

export const Btm = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100%;
    justify-content: center;
    align-items: center;
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
    height: calc(90% - 10px);
    justify-content: flex-start;
    align-items: flex-start;
    border: 1px solid #aaa;
    ${(props: styleProps) => (props.$scroll == true ? "overflow-y: scroll;" : "")}
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

export const BtmListTitle = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    margin: 5px auto;
    justify-content: left;
`;

export const BtmListRow = styled.div`
    display: flex;
    text-align: center;
    align-items: flex-start;
    width: ${(props: styleProps) => (props.$width ? props.$width + "%" : "20%")};
    justify-content: center;
    color: #777;
    font-size: 1em;
`;

export const BtmLine = styled.div`
    width: 98%;
    justify-content: center;
    align-items: center;
    margin-left: 1%;
    border-bottom: 2px solid #aaa;
`;

export const BtmListDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    height: calc(90% - 10px);
    overflow-y: scroll;
    &::-webkit-scrollbar {
        background-color: #ccc;
        color: #fff;
    }
`;

export const BtmListDivRow = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    margin: 0 auto;
    margin-top: 1%;
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

export const BtmAddBtn = styled.button`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.4em;
    padding: 10px 0;
    background-color: ${(props: styleProps) => (props.$active ? "#2196F3" : "#aaa")};
    color: #fff;
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

export const BtmDelBtn = styled.button`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.4em;
    padding: 10px 0;
    background-color: ${(props: styleProps) => (props.$active ? "#FF9800" : "#aaa")};
    color: #fff;
`;

export const TreeIcon = styled.img`
    margin-right: 6px;
    width: 16px;
    height: 16px;
`;

export const TreeDiv = styled.div`
    display: flex;
    padding: 3px 6px;
    align-items: center;
    background: ${(props: styleProps) => (props.$backColor ? "#ccc" : "")};
`;

export const ModalBtnContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: flex-end;
    padding: 15px 30px 25px 30px;
`;

export const CloseBtn = styled.button`
    border: 1px solid #477ee9;
    padding: 1% 3%;
    border-radius: 6px;
    opacity: 0.6;
    transition: opacity 0.5s;
    color: #477ee9;
    margin-right: 1%;
`;

export const SaveBtn = styled.button`
    border: ${(props: styleProps) =>
        props.$red == true ? "1px solid #ff0000;" : "1px solid #477ee9;;"};
    padding: 1% 3%;
    border-radius: 6px;
    opacity: 0.6;
    transition: opacity 0.5s;
    color: #fff;
    background: ${(props: styleProps) => (props.$red == true ? "#ff0000;" : "#477ee9;")};
`;
