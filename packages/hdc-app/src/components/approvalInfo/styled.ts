import styled from "styled-components";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import Modal from "@material-ui/core/Modal";

type StyledProps = {
    $first?: boolean;
    $width?: number;
    $disabled?: boolean;
    $dir?: boolean; // 0 top, 1 btm
    $background?: boolean;
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
    width: 70%;
    height: 70%;
    padding: 25px 45px;
    box-shadow: 0 0 1px 4px rgba(0, 0, 0, 0.16);
    background-color: white;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    position: relative;
    min-width: 500px;
`;

export const Title = styled.h2`
    display: flex;
    align-items: center;
    font-size: 20px;
    font-weight: 600;
`;

export const CloseBtn = styled(Button)`
    /* position: absolute;
    right: 30px;
    top: 40px; */
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
    justify-content: center;
    align-items: center;
    flex-direction: row;
    width: 100%;
    height: 90%;
`;

export const DetailBlock = styled.div`
    background-color: white;
    border: 1px solid grey;
    flex: 2.5;
    display: flex;
    justify-content: start;
    flex-direction: column;
    height: 100%;
`;
export const BodyInput = styled.div`
    display: flex;
    margin-left: 10px;
`;

export const BodyBtn = styled(Button)`
    background: #eee;
    width: 92.5%;
    display: flex;
    justify-content: flex-start;
    font-size: 16px;
    margin: 0;
    margin-left: 30px;
`;
export const BodyDetail = styled.div`
    margin-top: 1%;
    font-weight: 600;
    background: transparent;
    width: 92.5%;
    display: flex;
    min-height: 4.5em;
    margin: 0 auto;
    align-items: center;
    font-size: 14px;
`;
export const Btn = styled(Button)`
    display: flex;
    position: relative;
    justify-content: center;
    right: 0px;
    margin: 0;
    height: 100%;
    background-color: #477ee9;
    color: white;
    &:hover {
        background-color: #477ee9;
        color: white;
    }
    padding: 8px 24px;
`;
export const EndContainer = styled.div`
    position: relative;
    display: flex;
    justify-content: flex-end;
    flex: 1;
    padding-right: 20px;
    margin-bottom: 20px;
`;
export const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    flex: 10;
    overflow-y: scroll;
    ::-webkit-scrollbar {
        display: none;
    }
`;
export const Seperator = styled.div`
    width: 92.5%;
    justify-content: center;
    align-items: center;
    margin: 0 20px 0 30px;
`;
export const SubTitle = styled.div`
    font-weight: 600;
    width: 92.5%;
    display: flex;
    align-items: center;
    margin: 0 auto;
    margin-top: 30px;
    height: 5%;
    justify-content: left;
`;
export const TreeBlock = styled.div`
    flex: 1;
    border: 1px solid grey;
    display: flex;
    position: relative;
    justify-items: center;
    flex-direction: column;
    height: 100%;
    margin-right: 10px;
`;
export const TreeTitle = styled.div`
    font-weight: 600;
    text-align: left;
    position: relative;
    padding: 10px;
    min-height: 40px;
    width: 100%;
    font-size: 15px;
`;
export const TreeInnerBox = styled.div`
    /* max-height : 480px; */
    overflow-y: auto;
    flex: 1;
    width: 90%;
    display: flex;
    padding: 0 1rem 1rem 1rem;
    justify-content: left;
    position: relative;
    img {
        position: absolute;
        width: 50px;
        right: 1%;
        top: 40%;
        filter: invert(50%) sepia(0%) saturate(500%) hue-rotate(131deg) brightness(96%)
            contrast(100%);
    }
`;
export const TableCell = styled.div`
    display: flex;
    text-align: center;
    align-items: flex-start;
    width: ${(props: StyledProps) => (props.$width ? props.$width + "%" : "20%")};
    justify-content: center;
`;

export const AfterCheck = styled.input.attrs({
    type: "checkbox",
})`
    width: 100%;
`;

export const SignNumberDiv = styled.div`
    padding: 0 15px;
    color: #000000;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    white-space: break-spaces;
    font-size: 10px;
    font-weight: bold;
    line-height: 20px;
    p {
        /* font-size : 1.2em; */
        min-height: 1em;
    }
`;

export const SignNumberMoveBtn = styled.img`
    width: 18px;
    transform: ${(props: StyledProps) => (props.$dir ? "rotate(180deg)" : "roate(0)")};
    cursor: pointer;
    filter: opacity(50%);
    &:hover {
        filter: opacity(100%);
    }
`;

export const SignNumberEditInput = styled(TextField)`
    flex: 1;
`;

export const close = styled(Button)`
    display: ${(props: StyledProps) => (props.$disabled ? "none" : "flex")};
    justify-content: center;
    min-width: 30px;
    width: 30px;
    height: 30px;
    padding: 5px;
    border-radius: 50%;
    span {
        width: 100%;
    }
    img {
        width: 15px;
        height: 15px;
    }
`;

export const SubmitDiv = styled.div`
    position: relative;
    flex: 0.25;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ActiveBtn = styled.div`
    width: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-size: cover;
    font-size: 1.4em;
    cursor: pointer;
    padding-right: 10px;
    opacity: 50%;
    &:hover {
        opacity: 100%;
    }
`;

export const SearchBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    align-items: center;
    min-height: 40px;
`;

export const Searchbar = styled.div`
    background-color: #fff;
    border: 1px solid grey;
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 95%;
`;

export const SearchField = styled(TextField)`
    flex: 1;
    margin: 0 8px 0 16px;
`;

export const SearchIcon = styled.img`
    width: 18px;
    height: auto;
    margin: 0 16px 0 8px;
    cursor: pointer;
`;

export const TreeIcon = styled.img`
    margin-right: 6px;
`;

export const DropboxWrap = styled(Select)`
    border: 1px solid #b9b9b9;
    background-color: white;
    border-radius: 4px;
    font-weight: bold;
    justify-content: center;
    padding: 0 20px;
    left: 10px;
`;

export const TitleDiv = styled.div`
    flex: 1;
    display: flex;
    justify-content: space-between;
`;

export const ButtonDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;
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
    color: white;
    border-radius: 50%;
    min-height: 54px;
    min-width: 54px;
    max-height: 54px;
    max-width: 54px;
    background-color: ${(props: StyledProps) =>
        props.$background == true ? "#FF9800" : "#477ee9"};
    padding: 0;
    cursor: pointer;
    &:hover {
        background-color: #ff9800;
        color: white;
    }
`;

export const GroupDiv = styled.div`
    display: flex;
`;

export const ButtonText = styled.div`
    display: flex;
    font-size: 14px;
    font-weight: 600;
    margin-left: 5px;
    align-items: center;
`;
export const CheckContainer = styled.div`
    position: relative;
    display: flex;
    justify-content: flex-end;
    flex: 0.3;
    padding-right: 20px;
    margin-bottom: 20px;
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    flex: 0.7;
    padding-left: 20px;
    margin-bottom: 20px;
`;

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