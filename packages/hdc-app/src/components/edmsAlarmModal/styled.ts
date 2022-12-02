import styled from "styled-components";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Modal from "@material-ui/core/Modal";

type StyledProps = {
    $boxType?: string;
    $inputData?: boolean;
    $isTab?: any;
    $dir?: any;
    $active?: boolean;
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
    height: 60%;
    width: 60%;
    background: white;
    overflow: auto;
    border-radius: 10px;
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

export const TableTd = styled.td`
    align-items: center;
    text-align: center;
    border-left: 1px solid #ebebeb;
    border-bottom: 1px solid #ebebeb;
`;

export const ApprovalBtn = styled.div`
    background-color: #ff9800;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    font-size: 1.2em;
    color: #fff;
    padding: 6px 0;
    border-radius: 6px;
    cursor: pointer;
`;

export const TabsBlock = styled(Tabs)`
    min-height: 42px;
    width: 100%;
    background-color: white;
    margin-left: 5%;
    margin-bottom: 5px;
`;

export const TabBlock = styled(Tab)`
    min-width: 5%;
    height: 100%;
    padding: 20px 0;
    border-radius: 10px;
    font-size: 1em;
    &:hover {
        filter: invert(56%) sepia(65%) saturate(399%) hue-rotate(183deg) brightness(87%)
            contrast(87%);
    }
    color: ${(props: StyledProps) => (props.$active ? `#000000` : `#777777`)};
`;

export const WorkListTable = styled.div`
    width: 90%;
    margin-left: 5%;
    height: calc(95% - 20px);
    max-height: 75%;
    box-sizing: border-box;
`;
