import styled from "styled-components";
import { Layout } from "antd";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import * as S from "./default.styled";
const { Content } = Layout;

type StyledProps = {
    $btnType?: string;
    $headSize?: number;
    $background?: string;
    $margin?: boolean;
};

// FOR document styeld
export const DocumentTopBtns = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
`;

export const DocumentFileAddBtn = styled(Button)`
    min-width: 160px;
    width: max-content;
    color: white;
    padding: 6px 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #4472c4;
    margin-left: 10px;
`;

export const DocumentToolBtns = styled.div`
    width: max-content;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5vw;
    margin-right: 10px;
`;

export const SelectBox = styled(Select)`
    width: fit-content;
    height: 36px;
    background-color: #ff9800;
    border-radius: 4px;
    padding: 8px 6px;
    min-width: 100px;
    color: #fff;
    font-weight: 600;
    text-align: center;
    position: relative;
    display: flex;
    svg {
        display: none;
        position: absolute;
    }
    div {
        width: 100%;
        height: 100%;
        padding: 0 !important;
    }
`;
export const SelectItem = styled(MenuItem)`
    width: 100%;
    min-width: 100px;
    height: 100%;
`;

export const DocumentToolBtn = styled(Button)`
    height: 36px;
    width: max-content;
    min-width: 100px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    ${(props: StyledProps) =>
        props.$margin == true ? "margin:0 10px 0 5px; " : "margin-left: 6px;"}
    ${S.theme_background_sub_button};
    &:hover {
        ${S.theme_background_sub_button_hover};
    }
    img {
        max-height: 20px;
        margin-right: 4px;
    }
`;

export const DocumentInfoContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    background-color: #e4efef;
`;

export const DocumentInfoTitle = styled.div`
    width: 100%;
    padding-left: 10px;
    font-size: 1vw;
    color: #333;
    flex: 1;
`;

export const DocumentInfoTexts = styled.div`
    width: 100%;
    flex: 3;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
`;

export const DocumentInfoTextWrap = styled.div``;
