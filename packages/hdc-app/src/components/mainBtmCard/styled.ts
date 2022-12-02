import styled from "styled-components";
import Checkbox from "@material-ui/core/Checkbox";

type StyledProps = {
    $state?: number;
    $is_signer?: boolean;
    $isBlank?: boolean;
    $cellSize?: number;
    $isTitle?: boolean;
};

export const Block = styled.div`
    position: relative;
    width: 50%;
    height: 50%;
    padding: 0 1% 1% 1%;
`;

export const HomeTitle = styled.div`
    width: 100%;
    height: 8%;
    padding-left: 10px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

export const HomeTitleText = styled.h3`
    font-size: 16px;
    font-weight: 500;
    color: #000;
    flex: 1;
`;

export const HomeTitleBtn = styled.div`
    color: #909090;
    font-size: 15px;
    font-weight: 500;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    img {
        width: 12px;
        height: 12px;
        margin-left: 5px;
        margin-bottom: 3px;
    }
`;

export const HomeCheckBoxWrap = styled.div`
    flex: 6;
    font-size: 1em;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 100%;
`;

export const HomeCheckbox = styled(Checkbox)`
    border-radius: 0;
`;

export const SectionBg = styled.div`
    width: 100%;
    height: 92%;
    border-radius: 10px;
    background: white;
    box-shadow: 0 0 5px 1px rgb(136 136 136 / 30%);
    border-radius: 10px;
    table {
        display: block;
        padding: 15px;
        box-sizing: border-box;
        font-size: 13px;
        height: 100%;
        thead {
            display: block;
            width: 100%;
            tr {
                display: block;
                width: 100%;
                padding: 5px 0;
                border-bottom: 1px solid #e2e2e2;
            }
        }
        tbody {
            display: flex;
            align-items: center;
            flex-direction: column;
            width: 100%;
            // padding: 15px 0;
            color: #000;
            font-weight: bold;
            height: 92%;
            overflow-y: scroll;
            &::-webkit-scrollbar {
                display: none;
            }
            justify-content: ${(props: StyledProps) => (props.$isBlank ? "center" : "flex-start")};
            tr {
                display: block;
                width: 100%;
                padding: 6px 8px;
            }
            tr:nth-of-type(2n) {
                background-color: rgba(226, 226, 226, 0.4);
            }
        }
    }
`;

export const HeadCell = styled.th`
    width: ${(props: StyledProps) => (props.$cellSize ? props.$cellSize + "%" : "fit-content")};
    display: inline-block;
    text-align: center;
`;

export const BodyCell = styled.td`
    width: ${(props: StyledProps) => (props.$cellSize ? props.$cellSize + "%" : "fit-content")};
    display: inline-block;
    text-align: ${(props: StyledProps) => (props.$isTitle ? "left" : "center")};
    padding:
    // margin-bottom: 15px;
    font-size: 1.1em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export const StateBtn = styled.div`
    color: white;
    border-radius: 5px;
    font-size: 13px;
    background-color: ${(props: StyledProps) =>
        props.$state == 0
            ? "#959595"
            : props.$state == 1
            ? props.$is_signer
                ? "#4285F4"
                : "#E89B98"
            : props.$state == 2
            ? "#999999"
            : "#66B821"};
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const StateBtnv2 = styled.div`
    color: white;
    border-radius: 5px;
    font-size: 13px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
