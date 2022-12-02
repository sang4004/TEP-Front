import styled from "styled-components";
import Button from "@material-ui/core/Button";

export const Block = styled.div`
    border-radius: 10px;
    display: block;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

export const Inner = styled.div`
    width: 90%;
    height: 90%;
    padding: 25px 45px;
    box-shadow: 0 0 1px 4px rgba(0, 0, 0, 0.16);
    background-color: white;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    position: relative;
    min-width: 500px;
`;

export const Title = styled.h2`
    flex: 1;
    display: flex;
    align-items: center;
    font-size: 20px;
    font-weight: 600;
`;

export const CloseBtn = styled(Button)`
    position: absolute;
    display: flex;
    right: 35px;
    top: 20px;
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
    transition: 0.3s;
    flex: 9;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    width: 100%;
    height: 90%;
    background-color: white;
`;

export const TableTd = styled.td`
    text-align: center;
    border-left: 1px solid #ebebeb;
    border-bottom: 1px solid #ebebeb;
`;

export const TdBtn = styled(Button)`
    display: flex;
    align-items: center;
    justify-content: center;
    img {
        display: flex;
    }
`;
