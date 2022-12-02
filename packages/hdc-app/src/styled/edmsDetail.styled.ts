import styled from "styled-components";
import { Layout } from "antd";
const { Content } = Layout;

type StyledProps = {
    $btnType ?: string;
}

export const Block = styled(Content)`
    width : 100%;
    height : 100%;
    flex : none;
    position : relative;
`;

export const ContentsWrap = styled.div`
    width: 100%;
    height: calc(97% - 65px);
    margin: 1% 0;
    border-radius: 10px;
    background: #f7f8f8;
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.3);
    padding: 0;
    overflow: hidden;
`;

export const ContentsWrapHeader = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 20%;
    padding: 1.5%;
    box-sizing: border-box;
    background: #1d2431;
    color: white;
`;

export const ContentsWrapHeaderDrn = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 1.5%;
    box-sizing: border-box;
    background: #1d2431;
    color: white;
`;

export const ProjectTitle = styled.div`
    display: flex;
    flex-direction: column;
    width: 18%;
`;

export const ProjectTitleSmall = styled.small`
    color: #ccc;
    margin-bottom: 2%;
    margin-left: 3%;
`;

export const ProjectSelect = styled.div`
    background-color: #1d2431;
    border: none;
    outline: none;
    font-size: 24px;  
`;

export const ProjectStatWrap = styled.div`
    display: flex;
    justify-content: flex-end;
`;

export const ProjectStatGauge = styled.div`
    text-align: center;
    width: 20%;
`;

export const  ProjectStat = styled.div`
    font-size: 20px;
    margin-top: 5%;
`;

export const ProjectStatGaugeImg = styled.div`
    display: block;
    width: 100%;
`;

export const ProjectStatPer = styled.div`
    display: flex;
    align-items: center;
    height: 50%;
    font-size: 36px;
    padding: 2% 5%;
    box-sizing: border-box;
    background: #000;
    border-radius: 10px;
    color: #71cc63;
    margin-left: 5%;
`;