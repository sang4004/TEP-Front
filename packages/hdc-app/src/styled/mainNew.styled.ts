import styled from "styled-components";
import { Layout } from "antd";
import Button from "@material-ui/core/Button";
import { Select } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";

const { Content } = Layout;

type StyledProps = {
    $section?: number;
    $color?: number;
    $hover?: boolean;
    $cellSize?: number;
    $isTitle?: boolean;
    $isTbody?: boolean;
};

export const Block = styled(Content)`
    width: 100%;
    height: 100%;
    /* flex : none; */
    position: relative;
    display: flex;
    flex-direction: column;

    div {
        font-family: "NanumSquareRound";
    }
`;

export const ProjectContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 1%;
    width: 98%;
    gap: 20px;
    height: 20vh;
`;

export const Bottom = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #fff;
    padding: 10px 0;
    margin: 1%;
    box-shadow: 0 0 5px rgb(0 0 0 / 30%);
    border-radius: 10px;
    max-height: 65vh;
    overflow: scroll;
`;

export const ExpandDiv = styled.div`
    display: flex;
    justify-content: end;
    width: 100%;
    padding: 0 1%;
`;

export const ExpandBtn = styled(Button)`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    img {
        display: flex;
        width: 10px;
        height: 10px;
        transform: ${(props: StyledProps) => (props.$hover ? "rotate(180deg)" : "roate(0)")};
    }
`;

export const ExpandText = styled.div`
    display: flex;
    margin-right: 5px;
`;

export const DocumentContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    padding: 0 1% 10px 1%;
    /* flex : 1; */
    border-radius: 10px;
    height: 100%;
    overflow-y: auto;
`;

export const AdminHomeTitle = styled.div`
    width: 100%;
    height: 8%;
    padding-left: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const AdminHomeTitleText = styled.div`
    font-size: 16px;
    font-weight: 500;
    color: #000;
    flex: 1;
`;

export const AdminHomeTaskList = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #fff;
    padding: 10px 0;
    margin: 0 1%;
    box-shadow: 0 0 5px rgb(0 0 0 / 30%);
    border-radius: 10px;
    max-height: 50vh;
    overflow-y: auto;
    table {
        display: block;
        padding: 0 15px;
        box-sizing: border-box;
        font-size: 13px;
        height: 100%;
        thead {
            display: block;
            width: 100%;
            tr {
                display: block;
                width: 100%;
                border-bottom: 1px solid #e2e2e2;
            }
        }
        tbody {
            display: flex;
            align-items: center;
            flex-direction: column;
            width: 100%;
            padding: 15px 0;
            color: #000;
            font-weight: bold;
            height: ${(props: StyledProps) => (props.$isTbody ? "92%" : "fit-content")};
            overflow-y: scroll;
            &::-webkit-scrollbar {
                display: none;
            }
            justify-content: "center";
            tr {
                display: block;
                width: 100%;
            }
        }
    }
`;

export const HeadText = styled.div`
    width: ${(props: StyledProps) => (props.$cellSize ? props.$cellSize + "%" : "fit-content")};
    display: inline-block;
    text-align: center;
`;

export const TableData = styled.td`
    width: ${(props: StyledProps) => (props.$cellSize ? props.$cellSize + "%" : "fit-content")};
    display: inline-block;
    text-align: ${(props: StyledProps) => (props.$isTitle ? "left" : "center")};
    margin-bottom: 15px;
    font-size: 1.1em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export const ChartDiv = styled.div`
    flex: 4;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: 15px;
    height: 100%;
`;

export const inner = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    flex: 1;
`;

export const InputSelect = styled(Select)`
    width: 10%;
    padding: 0 1%;
    margin-left: 1%;
    box-sizing: border-box;
    border: 1px solid #666;
    border-radius: 5px;
`;

export const InputSelectItem = styled(MenuItem)``;

export const Caption = styled.div`
    position: absolute;
    right: 10px;
    top: 5px;
    color: #000;
`;
