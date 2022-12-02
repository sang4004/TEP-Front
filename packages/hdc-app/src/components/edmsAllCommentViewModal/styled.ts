import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Modal from "@material-ui/core/Modal";

type StyledProps = {
    $boxType?: string;
    $inputData?: boolean;
};

export const Block = styled.div`
    display: block;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    border : 1px solid;
    div {
        font-family: "NanumSquareRound";
    }
`;

export const Inner = styled.div`
    height: 100%;
    width: 100%;
    background: white;
`;

export const AllCommentContainer = styled.div`
    height: 90%;
    width: 100%;
`;

export const GridViewWrap = styled.div`
    margin: 1% 1% 0 1%;
    height: 100%;
`;

export const ModalHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 5%;
    background: #1a4a4a;
    padding: 2%;
    color: white;
    font-size: 1.1vw;
    font-weight: 400;
`;

export const HeaderTitle = styled.div`
    font-size: 16px;
    color: white;
`;

export const HeaderBtnBlock = styled.div`
    width: 60%;
    display : flex;
    flex-direction : row;
    justify-content: flex-end;
    gap: 10px;
`;

export const ModalCloseBtn = styled.button`
    display: block;
    width: 5%;
    opacity: 0.8;
    transform: scale(0.9);
    transition: opacity 0.3s, transform 0.3s;
`;

export const TableTd = styled.td`
    align-items: center;
    text-align: center;
    border-left: 1px solid #ebebeb !important;
    border-bottom: 1px solid #ebebeb !important;
`;

export const SelectBox = styled(Select)`
    width: 80%;
    border: 1px solid #ccc;
    padding: 0 10px;
    border: 1px solid #999;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Item = styled(MenuItem)`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 12px;
`;

export const TableButton = styled(Button)`
    height: 28px;
    width: 28px;
    display: flex;
    justify-content: center;
    color: white;
    background-color: #fc4a47;
`;

export const ButtonWrap = styled.div`
    display: flex;
    align-items: center;
`;

export const TableCode = styled.p`
    width: 100%;
    color: #477ee9;
    font-weight: bold;
    cursor: pointer;
    background: white;
`;
