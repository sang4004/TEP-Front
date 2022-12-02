import styled from "styled-components";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core";
import * as S from "./default.styled";

//From css

type StyledProps = {
    $btnType?: string;
    $headSize?: number;
    $background?: string;
    $color?: string;
    $hover?: string;
    $dateType?: number;
    $wpType?: string;
    $flex?: number;
};

export const PlantLogContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    background: #fff;
    border-radius: 10px;
    flex-direction: column;
`;
export const PlantLogSearchButtonDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 50px;
    box-sizing: border-box;
    padding: 10px 0px 5px 0px;
    border-bottom: 1px solid #ccc;
`;
export const FormType = styled(Select)`
    flex: ${(props: StyledProps) => (props.$flex ? props.$flex : `0.6;`)};
    height: 100%;
    padding: 5px;
    padding-left: 10px;
    margin: 0 5px;
    border: 1px solid #4490ff;
`;

export const TextFieldBlock = styled(TextField)``;
export const InputSelectItem = withStyles({ root: { textAlign: "center" } })(MenuItem);
export const SearchType = styled(Select)`
    flex: 0.3;
    height: 100%;
    padding: 5px;
    padding-left: 10px;
    margin: 0 5px;
    border: 1px solid #4490ff;
`;
export const SearchText = styled(TextField)`
    flex: 1;
    min-width: 150px;
    border: 1px solid #aaaaaa;
    padding: 0 10px;
    margin: 0 5px;
    display: flex;
    justify-content: center;
`;
export const SearchBtn = styled.button`
    flex: 0.3;
    height: 100%;
    margin: 0 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #4490ff;
    border-radius: 5px;
    color: #ffffff;
    font-size: 1.2em;
`;
export const PlantLogListDiv = styled.div`
    display: flex;
    height: calc(100% - 50px);
    overflow: auto;
`;

export const PlantLoglistTableBox = styled.div`
    width: 100%;
    overflow: auto;
`;

export const GridViewWrap = styled.div`
    width: 100%;
    height: 98%;
`;
