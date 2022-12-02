import styled from "styled-components";
import { Layout } from "antd";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
const { Content } = Layout;

type StyledProps = {
    $btnType?: string;
};

export const Block = styled(Content)`
    width: 100%;
    height: 99%;
    flex: none;
    position: relative;
    background: #fff;
    // background: linear-gradient(0, #f7f8f8 88%, #1a4a4a 88%);
    border-radius: 10px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    div {
        font-family: "NanumSquareRound";
    }
`;

export const ContentsBody = styled.div`
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-radius: 10px;
`;

export const ContentsHeader = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    // height: 5%;
    box-sizing: border-box;
    color: white;
`;

export const ProjectTitle = styled.div`
    display: flex;
    flex-direction: column;
    width: 20%;
`;

export const ProjectTitleText = styled.div`
    font-size: 1em;
    color: rgba(255, 255, 255, 0.8);
`;

export const ProjectTitleSpan = styled.div`
    font-size: 1.5em;
    color: white;
`;

export const ProjectSelect = styled(Select)`
    border: none;
    outline: none;
    font-size: 1.6em;
    color: white;
`;

export const ProjectSelectMenu = styled(MenuItem)``;

export const ProjectStatWrap = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

export const ProjectStatGauge = styled.div`
    text-align: center;
    width: 30%;
    margin-right: 10px;
    transform: scale(0.4);
    margin-top: 10px;
`;

export const ProjectStat = styled.p`
    font-size: 1vw;
    margin-top: 5%;
`;

export const ProjectStatPer = styled.div`
    font-size: 2vw;
    padding: 0 5%;
    box-sizing: border-box;
    background: #000;
    border-radius: 10px;
    color: #71cc63;
    margin-left: 5%;
`;
