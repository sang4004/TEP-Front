import styled from "styled-components";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Chip from "@material-ui/core/Chip";

type StyledProps = {
    $first?: boolean;
    $width?: number;
    $disabled?: boolean;
    $dir?: boolean; // 0 top, 1 btm
    $background?: boolean;
};

export const GroupBtn = styled(Button)`
    display: flex;
    position: relative;
    justify-content: center;
    right: 0px;
    margin: 0;
    height: 100%;
    background-color: #ffffff;
    color: black;
    border: 1px solid black;
    &:hover {
        background-color: #ffffff;
        color: black;
    }
    padding: 8px 16px;
    margin-right: 5px;
`;

export const ButtonContainer = styled.div`
    display: flex;
    gap: 10px;
`;

export const ButtonDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
    width: 100%;
    height: fit-content;
`;

export const ButtonDivTitle = styled.div`
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: 600;
    margin-right: 10px;
`;

export const NumberButton = styled(Button)`
    display: flex;
    justify-content: center;
    opacity: 0.6;
    color: white;
    border-radius: 50%;
    min-height: 24px;
    min-width: 24px;
    max-height: 24px;
    max-width: 24px;
    background-color: #ccc;
    padding: 0;
    cursor: pointer;
    &:hover {
        opacity: 1;
        background-color: #ccc;
    }
`;

export const GroupDiv = styled.div`
    display: flex;
`;

export const SignNumberDiv = styled.div`
    color: #000000;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 10px;
    font-weight: bold;
    line-height: 20px;
`;

export const EditGroupName = styled(TextField)``;

export const ChipBlock = styled(Chip)`
    background-color: ${(props: StyledProps) => (props.$background == true ? "#FF9800" : "#fffff")};
`;

export const ChipDiv = styled.div``;
