import styled from "styled-components";
import { Layout } from "antd";
const { Content } = Layout;

type StyledProps = {
    $flex ?: number;
    $flexDir ?: string;
    $gap ?: number;
    $width ?: string;
    $height ?: string;
    $paddingR ?: string;
    $justifyContent ?: string;
    $alignItems ?: string;
}

export const Block = styled(Content)`
    display : flex;
    justify-content : center;
    align-items : center;
    flex-direction: row;
    width : 100%;
    height : 100%;
    flex : none;
    gap : .5em;
    position : relative;
`;

const S = {
    Block,
    
};

export const MAIN = S;