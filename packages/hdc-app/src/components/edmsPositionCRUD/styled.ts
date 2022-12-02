import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Chip from "@material-ui/core/Chip";
import Checkbox from "@material-ui/core/Checkbox";
import Modal from "@material-ui/core/Modal";

type StyledProps = {
    $width?: number;
    $cursor?: boolean;
    $disabled?: boolean;
    $flex?: number;
    $margin?: number;
    $boxType?: string;
    $is_approve?: boolean;
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
    width: 90%;
    height: 80%;
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
    flex: 1;
    display: flex;
    align-items: center;
    font-size: 20px;
    font-weight: 600;
    margin-left: 5px;
`;

export const CloseBtn = styled(Button)`
    position: absolute;
    display: flex;
    right: 35px;
    top: 40px;
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
    flex: ${(props: StyledProps) => (props.$flex ? props.$flex : "0.9")};
    display: flex;
    justify-content: start;
    flex-direction: column;
    height: 100%;
    margin: 0 5px;
`;

export const BodyDetail = styled.div`
    margin-top: 1%;
    font-weight: 600;
    background: transparent;
    width: 90%;
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
    height: 100%;
    background-color: #477ee9;
    color: white;
    &:hover {
        background-color: #477ee9;
        color: white;
    }
    padding: 8px 24px;
    width: 80px;
    margin-right: ${(props: StyledProps) => (props.$is_approve ? "50%" : "0")};
`;

export const EndContainer = styled.div`
    position: relative;
    display: flex;
    justify-content:  ${(props: StyledProps) => (props.$is_approve ? "flex-start" : "flex-end")};
    padding: 0 20px;
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
    justify-content: center;
    align-items: center;
    padding: 0 20px;
`;

export const UserSeperator = styled.div`
    justify-content: center;
    align-items: center;
    padding: 0 10px;
`;

export const SubTitle = styled.div`
    font-weight: 600;
    width: 90%;
    display: flex;
    align-items: center;
    margin: 0 auto;
    margin-top: ${(props: StyledProps) => (props.$margin ? props.$margin + "px" : "30px")};
    height: 40px;
    justify-content: left;
`;

export const TableCell = styled.div`
    display: flex;
    text-align: center;
    align-items: flex-start;
    width: ${(props: StyledProps) => (props.$width ? props.$width + "%" : "20%")};
    justify-content: center;
    ${(props: StyledProps) => (props.$cursor ? "cursor : pointer;" : "")}
    font-size: 1.1em;
    font-weight: 700;
`;

export const EditButton = styled(Button)`
    display: ${(props: StyledProps) => (props.$disabled ? "none" : "flex")};
    justify-content: center;
    min-width: 30px;
    width: 30px;
    height: 30px;
    padding: 5px;
    border-radius: 50%;
`;

export const EditImg = styled.img`
    width: 15px;
    height: 15px;
`;

export const InformationTitle = styled.div`
    display: flex;
    text-align: left;
    align-items: flex-start;
    width: 100%;
    height: 100%;
    font-size: 1.5em;
`;

export const InputBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 15px 20px;
    align-items: center;
`;

export const InputText = styled.div`
    width: 100%;
    height: 35px;
    text-align: left;
    font-size: 1.1em;
    font-weight: 700;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 1.5%;
    margin-left: ${(props: StyledProps) => (props.$boxType ? props.$boxType : "0")};
`;

export const InputTitle = styled.div`
    width: 30%;
    height: 100%;
    text-align: left;
    font-size: 1.1em;
    font-weight: 700;
    display: flex;
    align-items: center;
`;

export const Input = styled.input`
    width: 100%;
    height: 100%;
    text-align: left;
    font-size: 1.1em;
    font-weight: 700;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 2%;
`;

export const InputSelect = styled(Select)`
    width: 100%;
    height: 35px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

export const InputSelectItem = styled(MenuItem)``;

export const CheckDiv = styled.div`
    width: 100%;
    height: 35px;
    display: flex;
    align-items: center;
`;

export const Check = styled(Checkbox)`
    padding: 0;
`;

export const InfoDiv = styled.div`
    flex: 1.2;
    
`;

export const InputTmBox = styled.div`
    width: 100%;
    display: flex;
    // justify-content: space-between;
    box-sizing: border-box;
    padding: 15px 20px;
    align-items: center;
`;

export const DeployUserBlock = styled.div`
    width: 90%;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin-left: 3%;
`;

export const ChipBlock = styled(Chip)``;

export const DocChip = styled.div`
    width: fit-content;
    margin: 5px;
`;

export const DocBtn = styled.button`
    ${(props: StyledProps) =>
        props.$boxType == "receiver" 
        ? `margin-right: 1%; height: 100%;` 
        : props.$boxType == "reselect"
        ?  `margin-right: 1%; height: 30%;`
        : `transform: scale(0.9); height: 100%;`}
    width: 10%;
    display: flex;
    opacity: 0.6;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    font-size: 2em;
    font-weight: 900;
    background-color: #ccc;
    border: 1px solid #ccc;
    border-radius: 3px;
    transition: opacity 0.5s;
    max-height : 48px;
    min-height : 36px;
    &:hover {
        background-color: #477ee9;
        border: 1px solid #477ee9;
        opacity: 1;
    }
`;