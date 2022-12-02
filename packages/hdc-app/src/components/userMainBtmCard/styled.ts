import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { KeyboardDatePicker } from "@material-ui/pickers";
import MenuItem from "@material-ui/core/MenuItem";

type StyledProps = {
    $state?: number;
    $is_signer?: boolean;
    $isBlank?: boolean;
    $cellSize?: number;
    $isTitle?: boolean;
    $hover?: boolean;
};

export const Block = styled.div`
    width: 98%;
    height: 100%;
`;

export const HomeTitle = styled.div`
    width: 100%;
    height: 5%;
    padding-left: 10px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

export const HomeTitleText = styled.h3`
    font-size: 16px;
    font-weight: 500;
    color: #000;
    flex: 1;
`;

export const HomeTitleBtn = styled.div`
    color: #909090;
    font-size: 15px;
    font-weight: 500;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    img {
        width: 12px;
        height: 12px;
        margin-left: 5px;
        margin-bottom: 3px;
    }
`;

export const HomeCheckBoxWrap = styled.div`
    flex: 6;
    font-size: 1em;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 100%;
`;

export const HomeCheckbox = styled(Checkbox)`
    border-radius: 0;
`;

export const SectionBg = styled.div`
    width: 100%;
    height: 92%;
    border-radius: 10px;
    background: white;
    box-shadow: 0 0 5px 1px rgb(136 136 136 / 30%);
    border-radius: 10px;
    table {
        display: block;
        padding: 10px 15px 15px 15px;
        box-sizing: border-box;
        font-size: 13px;
        height: 100%;
        thead {
            display: block;
            width: 100%;
            tr {
                display: block;
                width: 100%;
                padding: 5px 0;
                border-bottom: 1px solid #e2e2e2;
            }
        }
        tbody {
            display: flex;
            align-items: center;
            flex-direction: column;
            width: 100%;
            padding: 15px 0;
            color: #000;
            font-weight: bold;
            height: 92%;
            overflow-y: scroll;
            &::-webkit-scrollbar {
                display: none;
            }
            justify-content: ${(props: StyledProps) => (props.$isBlank ? "center" : "flex-start")};
            tr {
                display: block;
                width: 100%;
            }
        }
    }
`;

export const HeadCell = styled.th`
    width: ${(props: StyledProps) => (props.$cellSize ? props.$cellSize + "%" : "fit-content")};
    display: inline-block;
    text-align: center;
`;

export const BodyCell = styled.td`
    width: ${(props: StyledProps) => (props.$cellSize ? props.$cellSize + "%" : "fit-content")};
    display: inline-block;
    text-align: ${(props: StyledProps) => (props.$isTitle ? "left" : "center")};
    margin-bottom: 15px;
    font-size: 1.1em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export const StateBtn = styled.div`
    color: white;
    border-radius: 5px;
    font-size: 13px;
    background-color: ${(props: StyledProps) => (props.$is_signer ? "#4285F4" : "#E89B98")};
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const StateBtnv2 = styled.div`
    color: white;
    border-radius: 5px;
    font-size: 13px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ExpandBtn = styled(Button)`
    display: flex;
    align-items: center;
    justify-content: center;
    img {
        display: flex;
        width: 10px;
        height: 10px;
        transform: ${(props: StyledProps) => (props.$hover ? "rotate(180deg)" : "roate(0)")};
    }
`;

export const ExpandText = styled.div`
    display: flex;
    margin-right: 5px;
`;

export const ExpandDiv = styled.div`
    display: flex;
    justify-content: end;
    width: 100%;
`;
export const GridViewWrap = styled.div`
    width: 100%;
    margin-bottom: 24px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
`;

export const BtmWrap = styled.div`
    display: flex;
    padding: 10px;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    flex-direction: row;
    border-radius: 10px;
    background: white;
    box-shadow: 0 0 5px 1px rgb(136 136 136 / 30%);
`;

export const ChartWrap = styled.div`
    flex: 2;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;
export const ChartDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 92%;
    border-radius: 10px;
    background: white;
    box-shadow: 0 0 5px 1px rgb(136 136 136 / 30%);
    border-radius: 10px;
`;

export const SearchBar = styled.div`
    display: flex;
    width: 85%;
    height: 100%;
    padding: 15px 10px 10px 10px;
`;

export const SearchDocType = styled(Select)`
    width: 150px;
    height: 100%;
    padding: 5px;
    padding-left: 10px;
    margin: 0 10px;
    border: 1px solid #aaaaaa;
`;

export const SearchDateDiv = styled.div`
    width: fit-content;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Date = styled.input`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #aaaaaa;
    width: 180px;
    height: 100%;
    margin: 0 10px;
    padding-left: 10px;
    text-align: center;
`;

export const SearchType = styled(Select)`
    width: 150px;
    height: 100%;
    border: 1px solid #4490ff;
`;

export const FormType = styled(Select)`
    width: 100%;
    height: 100%;
    border: 1px solid #4490ff;
    padding: 5px 10px;

    .MuiSelect-select.MuiSelect-select {
        padding: 6px 0;
    }
`;

export const SearchText = styled(TextField)`
    flex: 0.6;
    min-width: 150px;
    border: 1px solid #aaaaaa;
    padding: 0 10px;
    margin: 0 10px;
    display: flex;
    justify-content: center;

    .MuiInputBase-input {
        padding: 6px 0;
    }
`;

export const SearchBtn = styled.button`
    width: 150px;
    height: 100%;
    margin: 0 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #4490ff;
    border-radius: 5px;
    color: #ffffff;
    font-size: 1.2em;
`;

export const MenuItemType = styled(MenuItem)``;

export const ForomControler = styled(FormControl)`
    width: 100%;
    height: 100%;
    padding: 15px 5px 0 5px;
    margin-left: 10px;
`;

export const InputLabelType = styled(InputLabel)`
    margin: 0 10px;
`;

export const OutlinedInputDiv = styled(OutlinedInput)`
    margin: 0 10px;
`;

export const SelectBoxDiv = styled.div`
    display: flex;
    width: 15%;
    height: 100%;
    padding-bottom: 10px;
`;

export const BigSearchDiv = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 60px;
`;
