import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Modal from "@material-ui/core/Modal";

export type styleProps = {
    $selected?: boolean;
    $selectedCount?: number;
    $background?: string;
    $cellSelected?: boolean;
    $headSize?: number;
    $active?: boolean;
    $deleted?: boolean;
    $expanded?: boolean;
};

export const Block = styled(Modal)`
    display: block;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

export const Inner = styled.div`
    width: 70%;
    height: 70%;
    position: relative;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    font-size: 1.2em;
    div {
        font-family: "NanumSquareRound";
    }
`;

export const Title = styled.h2`
    font-size: 1.5em;
    font-weight: 700;
    margin-right: 10px;
`;

export const CloseBtn = styled(Button)`
    position: absolute;
    display: flex;
    right: 18px;
    top: 30px;
    min-width: 40px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    span {
        width: 30px;
    }
    img {
        width: 30px;
        height: 30px;
    }
`;

export const Content = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 90%;
`;

export const ContentDiv = styled.div`
    width: 97%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border: 1px solid #ccc;
    border-radius: 5px;
    height: calc(100% - 40px);
`;

export const TopMenuBlock = styled.div`
    width: 100%;
    height: fit-content;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const TableMenu = styled(Tabs)`
    display: flex;
    align-items: center;
    flex: 1;
`;

export const BtnMenu = styled(Tab)`
    width: ${(props: styleProps) =>
        props.$selectedCount ? `${100 / props.$selectedCount}%` : `15%`};
    height: 100%;
    padding: 20px 0;
    border-radius: 10px;
    font-size: 1em;
    &:hover {
        filter: invert(56%) sepia(65%) saturate(399%) hue-rotate(183deg) brightness(87%)
            contrast(87%);
    }
    color: ${(props: styleProps) => (props.$active ? `#000000` : `#777777`)};
`;

export const GroupBtnDiv = styled.div`
    display: flex;
    flex: 1;
    align-items: center;
    margin-left: 2%;
    margin-top: 1%;
`;

export const GroupBtn = styled(Button)`
    height: 50%;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid #6cabce;
    color: #6cabce;
    font-size: 1em;
    &:hover {
        background-color: #9abed1;
        color: #ffffff;
    }
`;

export const TableContainer = styled.div`
    flex: 1;
    width: 100%;
    overflow: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
    height: calc(100% - 80px);
`;

export const BoardTable = styled.table`
    justify-items: center;
    width: 100%;
`;

export const TheadDiv = styled.div`
    margin: 14px auto;
    width: 100%;
    height: 3em;
    border-bottom: 2px solid #ccc;
    display: flex;
`;

export const Thead = styled.div`
    width: ${(props: styleProps) => (props.$headSize ? props.$headSize + "%" : `fit-content`)};
    float: left;
    padding: 0 1em;
    padding-top: 0.6em;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const BoardBody = styled.tbody`
    justify-items: center;
`;

export const TableBodyRow = styled.tr`
    background-color: ${(props: styleProps) => (props.$selected ? `#DAEDFF` : `transparent`)};
    opacity: 90%;
    height: 4em;
    display: ${(props: styleProps) => (props.$deleted ? "none" : "table-row")};
`;

export const TableBodyCell = styled.td`
    vertical-align: middle;
    width: fit-content;
    padding: 0% 1%;
    display: table-cell;
    text-align: center;
`;
