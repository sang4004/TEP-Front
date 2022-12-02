import styled from "styled-components";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Modal from "@material-ui/core/Modal";
import { KeyboardDatePicker } from "@material-ui/pickers";

type StyledProps = {
    $first?: boolean;
    $width?: number;
    $disabled?: boolean;
    $pwInvalid?: boolean;
    $defer?: boolean;
};

export const Block = styled(Modal)`
    border-radius: 10px;
    display: block;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

export const Inner = styled.div`
    width: 30%;
    height: 40%;
    padding: 0;
    box-shadow: 0 0 1px 4px rgba(0, 0, 0, 0.16);
    background-color: white;
    border-radius: 10px 10px 10px 10px;
    display: flex;
    flex-direction: column;
    position: relative;
    min-width: 300px;
`;

export const CloseBtn = styled(Button)`
    width: 20px;
    height: 20px;
    min-width: 20px;
    position: absolute;
    right: 20px;
    top: 20px;
    padding: 0;
    margin: 0;
`;

export const CloseIcon = styled.img`
    width: 20px;
    height: 20px;
`;

export const Content = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    flex: 8;
    gap: 1em;
`;

export const TitleDiv = styled.div`
    width: 100%;
    height: 20px;
    margin: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

export const title = styled.div`
    color: #000000;
    font-size: 1.5em;
    font-weight: 400;
    margin: 10px 0;
    width: 100%;
    text-align: center;
`;

export const Row = styled.div`
    flex: 1;
    width: 100%;
    padding: 0 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1em;
`;

export const RowTitle = styled.div`
    width: 85px;
    height: fit-content;
    font-size: 1.2em;
    font-weight: 500;
    text-align: justify;
    text-align-last: justify;
    /* display: flex; */
    /* align-items: center; */
    /* justify-content: space-between; */
`;

export const RowInput = styled.div`
    flex: 1;
    height: 100%;
    display: flex;
    /* border: 2px solid #c7c7c7; */
`;

export const Textfield = styled(TextField)`
    flex: 1;
    display: flex;
    justify-content: center;
    border: 1px solid #aaaaaa;
    padding: 0 10px;
`;

export const Date = styled.input`
    justify-content: center;
    align-items: stretch;
    border: 1px solid #aaaaaa;
    flex: 1;
    height: 100%;
    letter-spacing: 0.2em;
    font-size: 1.3em;
`;

export const FileAdd = styled.div`
    width: 60px;
    height: 100%;
    background-color: #a7a7a7;
    color: white;
`;

export const FileAddBtn = styled.button`
    width: 100%;
    height: 100%;
    font-size: 1.5em;
    font-weight: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const BtmBtn = styled(Button)`
    flex: 1;
    width: 100%;
    background-color: #477ee9;
    color: white;
    font-size: 1.3em;
    font-weight: 400;
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0 0 4px 4px;
    &:hover {
        background-color: #3d6bc6;
    }
`;
