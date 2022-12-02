import styled from "styled-components";
import * as S from "./default.styled";

type StyledProps = {
    $isMain : boolean;
}
export const Block = S.Block;
export const Bg = S.Bg;

export const EnterTop = styled.div`
    font-size : 16px;
    height : 48px;
    width : 100%;
    position : relative;
    border-bottom : 1px solid #bfd2e2;
`;

export const DocumentContent = styled.div`
    flex : 1;
    width : 97%;
    margin: 15px auto;
    margin-bottom: 0;
    overflow-y : auto;
`;