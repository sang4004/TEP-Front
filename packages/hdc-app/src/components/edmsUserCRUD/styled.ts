import styled from "styled-components";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Modal from "@material-ui/core/Modal";

type StyledProps = {
    $first?: boolean;
    $width?: number;
    $disabled?: boolean;
    $dir?: boolean; // 0 top, 1 btm
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
    width: 40%;
    height: 50%;
    padding: 20px;
    box-shadow: 0 0 1px 4px rgba(0, 0, 0, 0.16);
    background-color: white;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
`;

export const Top = styled.div`
    display: flex;
    align-items: center;
    padding-bottom: 20px;
`;

export const Title = styled.h2`
    display: flex;
    height: fit-content;
    flex: 1;
    align-items: center;
    font-size: 20px;
    font-weight: 600;
`;

export const CloseBtn = styled(Button)`
    display: flex;
    min-width: 40px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    span {
        width: 30px;
    }
    img {
        width: 30px;
        height: 30px;
    }
`;

export const Content = styled.div`
    flex: 9;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    gap: 1.6em;
    width: 100%;
`;

export const ContentRow = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    flex : 1;
`;

export const RowTitle = styled.div`
    width: fit-content;
    min-width: 6em;
    font-size: 1.4em;
    font-weight: 700;
    letter-spacing: .2qem;
    text-align-last: justify;
`;

export const InfoSelect = styled(Select)`
    position: absolute;
    border: 1px solid #b9b9b9;
    background-color: white;
    border-radius: 4px;
    font-weight: bold;
    justify-content: center;
    padding: 0 20px;
    min-width: 200px;
    width: fit-content;
    top: 40px;
    left: 200px;
`;

export const InfoOption = styled(MenuItem)`
    font-size: 1.3em;
    height: 5vh;
`;

export const Bottom = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 1em;
    padding-top: 20px;
    Button {
        font-size: 1.4em;
        padding: 10px 30px;
        display: flex;
        justify-content: center;
        width: fit-content;
        height: 100%;
    }
`;

export const Btn = styled(Button)`
    background-color: #477ee9;
    color: white;
    &:hover {
        color: #477ee9;
        border: 1px solid #477ee9;
    }
`;

export const BtmCloseBtn = styled(Button)`
    background-color: #fff;
    color: #477ee9;
    border: 1px solid #477ee9;
`;