import styled from "styled-components";

type StyledProps = {
    $type?: string;
    $color?: number;
};

export const StatusTitle = styled.div`
    position : relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 48px;
    width: 100%;
    padding-left: 1em;
    color: white;
    font-size: 1.5em;
    background-color: ${(props: StyledProps) =>
        props.$color == 0
        ? "#4CAF50"
        : props.$color == 1
        ? "#F44336"
        : props.$color == 2
        ? "#FF9800"
        : "#2196F3"};
    cursor: pointer;
`;

export const StatusBox = styled.li`
    width: 23%;
    height : 100%;
    color: white;
    border-radius: 10px;
    background-color: white;
    overflow: hidden;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    font-family: "NanumSquareRound";
`;

export const LineDivOut = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    padding: 0 5%;
    box-sizing: border-box;
    background: #ffffff;
`;

export const LineDivIn = styled.div`
    border-bottom: 2px solid gray;
`;

export const Title = styled.div`
    margin-bottom: 2%;
    font-size: 2em;
    color: ${(props: StyledProps) =>
        props.$type == "DIN"
            ? "#2E7D4D"
            : props.$type == "DRN"
            ? "#CA2828"
            : props.$type == "TM"
            ? "#F26C00"
            : "#2B65C0"};
`;

export const SubTitle = styled.div`
    font-size: 0.9vw;
    font-weight: 400;
    color: #6b7280;
`;

export const StatusContentBox = styled.div`
    display: flex;
    align-items: center;
    background-color: white;
    justify-content: center;
    flex-direction : column;
    height : calc(100% - 48px);
`;

export const StatusNum = styled.div`
    position : absolute;
    right : 8px;
    font-size: 1.3em;
    font-weight: 600;
    /* color: ${(props: StyledProps) =>
        props.$color == 1
            ? "#4CAF50"
            : props.$color == 2
            ? "#F44336"
            : props.$color == 3
            ? "#FF9800"
            : "#2196F3"}; */
    color : white;
    text-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
`;

export const ContentLi = styled.li`
    text-align: center;
    /* padding: 0 7%; */
`;

export const StatusNumTitle = styled.div`
    color: black;
    font-weight: 400;
    font-size: 1.4em;
`;

export const TypeBox = styled.div`
    background: #71cc63;
`;
