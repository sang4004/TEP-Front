import styled from "styled-components";
import { Layout } from "antd";
import Button from "@material-ui/core/Button";
import { KeyboardDatePicker } from "@material-ui/pickers";
const { Content } = Layout;

type StyledProps = {
    $section?: number;
    $color?: number;
};

export const Block = styled(Content)`
    width: 100%;
    height: 100%;
    /* flex : none; */
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    div {
        font-family: "NanumSquareRound";
    }
`;

export const ProjectContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 98%;
    height: 40%;
    align-items: start;
    flex-shrink: 0;
    gap: 1%;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 5px 1px rgb(136 136 136 / 30%);
    margin: 1%;
    & li {
        box-shadow: none;
        border: 1px solid #ccc;
    }
`;

export const ProjectWrap = styled.div`
    display: flex;
    width: 100%;
    height: 85%;
    gap: 20px;
    padding: 0 20px;
    justify-content: space-between;
    align-items: center;
`;

export const ChartContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    margin: 1%;
`;

export const TopProgressText = styled.p`
    display: flex;
    width: 110px;
    font-size: 15px;
    color: ${(props: StyledProps) => (props.$color ? props.$color : "#2196F3")};
    font-weight: 700;
    text-shadow: 0px 0px 8px rgb(0 0 0 / 20%);
`;

export const ChartDiv = styled.div`
    display: flex;
    flex: 1;
    width: 100%;
    padding: 15%;
    border: 1em solid;
    border-color: ${(props: StyledProps) =>
        props.$color == 0
            ? "#4CAF50"
            : props.$color == 1
            ? "#F44336"
            : props.$color == 2
            ? "#FF9800"
            : "#2196F3"};
`;

export const ProgressText = styled.p`
    display: flex;
    width: 110px;
    font-size: 15px;
    font-weight: 700;
    text-shadow: 0px 0px 8px rgb(0 0 0 / 20%);
    margin-right: 10px;
`;

export const ProgressNum = styled.p`
    margin-left: 10px;
    font-size: 15px;
    font-weight: 700;
    text-shadow: 0px 0px 8px rgb(0 0 0 / 20%);
`;

export const DocumentContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    padding: 10px 1%;
    /* flex : 1; */
    border-radius: 10px;
`;

export const PresentTableWrap = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 70%;
    padding-top: 2%;
    box-sizing: border-box;
`;

export const PresentTableTitle = styled.div`
    font-size: 1.6vw;
    font-weight: 700;
    margin-bottom: 1%;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
`;

export const HeaderTab = styled.div`
    display: flex;
    height: 100%;
`;

export const HeaderTabButton = styled(Button)`
    display: block;
    height: 100%;
    padding: 0 40px;
    align-items: center;
    font-size: 1.1vw;
    font-weight: 700;
    color: #999;
    transition: color 0.3s;
`;

export const ProjectButton = styled(Button)`
    float: right;
    padding: 6px 32px;
    font-weight: 600;
    color: #fff;
    margin-right: 10px;
    background: #477ee9;
    &:hover {
        background: #477ee9;
    }
    font-size: 0.8em;
`;

export const BtmChartWrap = styled.div`
    flex: 5;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;
export const BtmChartDiv = styled.div`
    position: relative;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 92%;
    border-radius: 10px;
    background: white;
    border: 1px solid #ccc;
    // box-shadow: 0 0 5px 1px rgb(136 136 136 / 30%);
    border-radius: 10px;
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

export const chartDateDiv = styled.div`
    // position: absolute;
    padding: 4px 10px;
    display: flex;
    flex-direction: row;
    background: #eee;
    border-radius: 10px 0 10px 0;
    z-index: 1;
`;

export const Date = styled.input`
    background: #eee;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 7vw;
    margin: 0 10px;
    text-align: center;
    height: 5%;
    font-weight: 500;
`;
