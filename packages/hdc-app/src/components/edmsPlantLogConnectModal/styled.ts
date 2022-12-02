import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Modal from "@material-ui/core/Modal";

type StyledProps = {};

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

export const ListContainer = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80%;
    height: 80%;
    flex-direction: column;
    padding: 10px;
    box-sizing: border-box;
    background-color: #fff;
`;

export const SearchDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 50px;
    box-sizing: border-box;
    padding: 10px 0px 5px 0px;
    border-bottom: 1px solid #ccc;
`;

export const SearchType = styled(Select)`
    flex: 0.3;
    height: 100%;
    padding: 5px;
    padding-left: 10px;
    margin: 0 5px;
    border: 1px solid #4490ff;
`;

export const InputSelectItem = withStyles({ root: { textAlign: "center" } })(MenuItem);

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

export const TableBoxDiv = styled.div`
    display: flex;
    width: 100%;
    height: calc(100% - 70px);
    padding: 5px;
`;

export const TableTd = styled.td`
    min-height: 50px;
    width: 100%;
    background-color: #fff;
    padding: 8px 12px;
`;

export const TableConnectBtn = styled.button`
    width: 80%;
    color: white;
    background: #477ee9;
    padding: 5px 10px;
    border-radius: 6px;
`;

export const TableConnectedBtn = styled.button`
    width: 80%;
    color: white;
    background: rgb(254, 110, 100);
    padding: 5px 10px;
    border-radius: 6px;
`;

export const AlertText = styled.div`
    color: #fa6358;
    // font-size: 0.8em;
    margin-top: 10px;
`;

export const CloseBtn = styled(Button)`
    width: 20px;
    height: 20px;
    min-width: 20px;
    position: absolute;
    right: 20px;
    top: 15px;
    padding: 0;
    margin: 0;
`;

export const CloseIcon = styled.img`
    width: 20px;
    height: 20px;
`;
