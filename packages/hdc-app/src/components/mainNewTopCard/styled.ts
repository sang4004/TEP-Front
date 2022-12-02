import styled from "styled-components";

type StyledProps = {
    $type?: string;
    $boxType?: string;
};

export const StatusBox = styled.li`
    flex: 1.2;
    height: 92%;
    /* margin: 0 1%; */
    color: white;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    font-family: "NanumSquareRound";
    background-color: white;
`;

export const StatusTitle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 48px;
    padding: 0 14px;
    box-sizing: border-box;
    background: #ffffff;
    line-height: 120%;
`;

export const LineDivOut = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0 5% 0 5%;
    box-sizing: border-box;
    background: #ffffff;
`;

export const LineDivIn = styled.div`
    border-bottom: 2px solid gray;
`;

export const Title = styled.div`
    display: inline-block;
    font-size: 1.5em;
    white-space: nowrap;
    color: ${(props: StyledProps) =>
        props.$type == "DIN"
            ? "#2E7D4D"
            : props.$type == "문서회신"
            ? "#CA2828"
            : props.$type == "TM"
            ? "#F26C00"
            : "#2B65C0"};
`;

export const SubTitle = styled.div`
    display: inline-block;
    font-size: 0.6em;
    font-weight: 400;
    color: #6b7280;
    margin-left: 2%;
`;

export const StatusContentBox = styled.div`
    align-items: center;
    background-color: white;
    padding: 10px 12px;
    width: 100%;
    height: calc(100% - 48px);
`;

export const ContentLi = styled.div`
    display: flex;
    justify-content: space-between;
    height: 100%;
`;

export const StatusNum = styled.div`
    width: 50%;
    font-size: 1.3em;
    font-weight: 600;
    text-align: right;
    margin-left: auto;
    color: ${(props: StyledProps) =>
        props.$type == "DIN"
            ? "#4CAF50"
            : props.$type == "문서회신"
            ? "#F44336"
            : props.$type == "TM"
            ? "#FF9800"
            : "#2196F3"};
    text-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
`;

export const ProjectTitle = styled.div`
    width: 50%;
    font-size: 1.3em;
    color: black;
    font-weight: 400;
    margin: 0 5px;
`;

export const StatusNumTitle = styled.div`
    width: 50%;
    color: black;
    font-size: 1vw;
    text-align: right;
`;

export const TypeBox = styled.div`
    background: #71cc63;
`;

export const ProjectTypeDiv = styled.div`
    display: flex;
    flex-direction: row;
    flex: 1;
    flex-wrap: wrap;
    overflow-y: auto;
    height: 100%;
`;

export const ProjectDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    // padding: 1px 10px;
    &:hover {
        background: #eee;
        border-radius: 10px;
    }
`;

export const TypeDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 1% 0;
    cursor: pointer;
    width: 100%;
    filter: opacity(100%);
    &:hover {
        filter: opacity(80%);
    }
`;

export const TypeTitle = styled.div`
    margin-top: 5px;
    display: flex;
    justify-content: space-between;
`;
