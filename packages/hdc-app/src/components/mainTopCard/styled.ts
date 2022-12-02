import styled from "styled-components";

type StyledProps = {
    $first ?: boolean;
}

export const Block = styled.li`
    background: white;
    width : 24%;
    height : auto;
    border-radius: 10px;
    box-shadow: 0 0 5px 1px rgba(136, 136, 136, 0.3);
`;

export const Inner = styled.div`
    padding: 25px 30px;
    box-sizing: border-box;
    color: #909090;
    font-size: 14px;
`;

export const ProgressTop = styled.div`
    position: relative;
    &::after {
        content: "";
        display: block;
        border-bottom: 1px solid #eee;
        padding: 3px;
    }
`;

export const DocumentTitle = styled.h4`
    font-size: 1.2em;
    font-weight: 700;
    color: #000;
`;

export const DocumentForm = styled.p`
    font-weight: 300;
`;

export const ProgressTime = styled.div`
    position: absolute;
    top: 20px;
    right: 0;
    display : flex;
    gap : 4px;
    font-size : 1em;
    img{
        width : 14px;
    }
`;

export const ProgressInfo = styled.ul`
    margin: 15px 0;
    li{
        display: flex;
        margin-bottom: 8px;
    }
`;

export const ProgressRow = styled.li`
    display: flex;
    margin-bottom: 8px;
`;

export const ProgressRowText = styled.p`
    ${(props : StyledProps)=> props.$first ? `margin-right: 30px; font-weight: 700;` : `color: #000;font-size: 1em;`};
`;

export const EtcInfo = styled.li`
    font-size: 12px;
    margin-top: 15px;
    div{
        display: flex;
        align-items: center;
        margin-right: 10px;
        img {
            width : 12px;
            height : 12px;
        }
        p{
            margin-left: 5px;
            color: #ccc;
        }
    }
`;

export const ButtonWrap = styled.button`
    display: block;
    width: 100%;
    padding: 10px 0;
    border: 1px solid #e2e2e2;
    border-radius: 5px;
    transition: color 0.3s, background 0.3s;
    p {
        margin: 0 auto;
        font-size: 1em;
        color: #000;
    }
    &:hover {
        background: #477EE9;
        p {
            color: white;
        }
    }
`;