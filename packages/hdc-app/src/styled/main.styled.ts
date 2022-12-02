import styled from "styled-components";
import { Layout } from "antd";
const { Content } = Layout;

type StyledProps = {
    $section ?: number;
}

export const Block = styled(Content)`
    width : 100%;
    height : 100%;
    flex : none;
    position : relative;
`;

export const Section1 = styled.section`
    width : 100%;
    padding: 0 15px;
    box-sizing: border-box;
    margin-top : 10px;
    display : none;
`;

export const HomeTitle = styled.h3`
    font-size: 16px;
    font-weight: 500;
    color: #000;
`;

export const ProgressContainer = styled.ul`
    display: flex;
    justify-content : flex-start;
    align-items: center;
    padding: 15px 0;
    gap : 1.5%;
`;

export const BlankContainer = styled.div`
    display : flex;
    justify-content : center;
    align-items : center;
    width : 100%;
    min-height : 240px;
    font-size : 1.4em;
`;

export const ProgressControls = styled.ul`
    display: flex;
    justify-content: center;
    margin-top : 10px;
    li { 
        list-style: none;
        button{
            margin: 0 30px;
            width : 20px;
            height : 20px;
            color: #bbb;
            transition: color 0.3s;
            img{
                width : 100%;
                height : 100%;
            }
        }
    }
`;

export const Section2 = styled.section`
    display: flex;
    flex-wrap:wrap;
    width : 100%;
    height : 100%;
    padding : 1%;
    flex : 1;
`;