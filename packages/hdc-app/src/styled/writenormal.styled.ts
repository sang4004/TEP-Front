import styled from "styled-components";
import { Layout } from "antd";
import TextField from "@material-ui/core/TextField";
import { KeyboardDatePicker } from "@material-ui/pickers";
const { Content } = Layout;

type StyledProps = {
    $isMain?: boolean;
    $color?: string;
    $disabled?: boolean;
};
export const Block = styled(Content)`
    width: 100%;
    padding: 6px;
    height: 100%;
    flex: none;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    overflow-y: auto;
    gap: 10px;
`;

export const EnterTop = styled.div`
    font-size: 16px;
    height: 48px;
    width: 100%;
    position: relative;
    border-bottom: 1px solid #bfd2e2;
`;

export const Bg = styled.div`
    position: relative;
    box-sizing: border-box;
    border-radius: 10px;
    background: white;
    color: #4b5964;
    box-shadow: 0 0 5px 1px rgb(136 136 136 / 30%);
    width: ${(props: StyledProps) => (props.$isMain ? "75%" : "25%")};
    min-height: 80vh;
    height: auto;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
`;

export const Inner = styled.div`
    width: 96%;
    height: 96%;
    flex: 1;
    border-radius: 5px;
    background-color: #fff;
    padding: 40px 40px 0px 40px;
    margin-bottom: 20px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    gap: 5px;
    overflow: auto;
    &::-webkit-scrollbar {
        display: none;
    }
`;

export const Head = styled.div`
    display: flex;
    flex-direction: row;
    gap: 5px;
    width: 90%;
    height: fit-content;
    font-size: 16px;
    position: relative;
    min-height: 120px;
`;

export const Row = styled.div`
    display: flex;
    flex-direction: row;
    gap: 5px;
    width: 90%;
    height: fit-content;
    font-size: 16px;
`;

export const Title = styled.div`
    width: 15%;
    height: 100%;
    min-height: 50px;
    background-color: #4490ff;
    border-radius: 5px;
    color: #ffffff;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    letter-spacing: 6px;
    flex-shrink: 0;
    flex-grow: 0;
`;

export const Date = styled(KeyboardDatePicker)`
    flex: 0.8;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    border: 1px solid #aaaaaa;
    margin: 0;
    text-align: center;
`;

export const Textfield = styled(TextField)`
    flex: 1;
    display: flex;
    justify-content: center;
    border: 1px solid #aaaaaa;
    padding: 0 10px;
`;

export const TextArea = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-start;
    border: 1px solid #aaaaaa;
    padding: 10px;
    height: 150px;
    &:focus {
        border: none;
        outline: 1px solid #aaaaaa;
    }
    /* table{
        width : 100%;
        border : 1px solid;
        th, td{
            border : 1px solid;
        }
    } */
`;

export const RadioDiv = styled.div`
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    height: fit-content;
    min-height: 50px;
    justify-content: flex-start;
    align-items: center;
    border: 1px solid #aaaaaa;
    padding: 0 10px;
    /* padding-top : 6px;
    overflow-x : auto; */
`;

export const Radio = styled.input.attrs({
    type: "radio",
})`
    width: 20px;
    flex-shrink: 0;
    flex-grow: 0;
    height: 20px;
    margin: 0 10px;
`;

export const RadioText = styled.div`
    width: 25%;
    height: 100%;
    margin: 6px 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

export const AddButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    background-color: #aaaaaa;
    color: #ffffff;
    font-size: 2em;
`;

export const DocContent = styled.div`
    flex: 1;
    flex-flow: row wrap;
    /* width : 280px; */
    display: flex;
    align-items: center;
    justify-content: left;
    padding: 0 10px;
    /* height : fit-content; */
    /* min-height : 100px; */
    border: 1px solid #aaaaaa;
    position: relative;
`;

export const DocChip = styled.div`
    width: fit-content;
    margin: 5px;
`;

export const FileList = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    border: 1px solid #aaaaaa;
    max-height: 20vh;
    flex-direction: column;
    width: 100%;
    padding: 10px 5px;
    box-sizing: border-box;
    overflow-y: scroll;
    align-items: center;
    &::-webkit-scrollbar-thumb {
        background-color: #707070;
    }
    &::-webkit-scrollbar {
        background-color: transparent !important;
    }

    div {
        display: flex;
        width: 100%;
        position: relative;
        z-index: 10;
        margin-bottom: 10px;
    }
    a {
        text-decoration: underline;
        opacity: 50%;
        margin: 0 7px;
        line-height: 24px;
        font-size: 0.8em;
    }
`;

export const FileClip = styled.img`
    width: 16px;
`;

export const FileDelete = styled.img`
    width: 10px;
    cursor: pointer;
`;

export const SubmitDiv = styled.div`
    /* position: relative;
    bottom: 50px; */
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    width: 40%;
    height: fit-content;
    margin: 10px 0;
    padding: 5px 0;
`;

export const SubmitBtn = styled.button`
    flex: 1;
    height: 50px;
    /* background-color: ${(props: StyledProps) => (props.$color ? props.$color : "#4490FF")}; */
    border-radius: 5px;
    color: #ffffff;
    font-size: 1.6em;
    background-color: ${(props: StyledProps) => (props.$disabled ? "#EFEFF0" : props.$color)};
    &:hover {
        background-color: ${(props: StyledProps) => (props.$disabled ? "#EFEFF0" : props.$color)};
    }
`;
