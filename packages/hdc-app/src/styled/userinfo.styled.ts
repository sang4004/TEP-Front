import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const $red = "#ED6161";
const $blue = "#477EE8";
const $gray = "#999999";
type styledProps = {
    $color?: string;
    $bgColor?: string;
    $disabled?: boolean;
    $small?: boolean;
    $dir?: string;
    $headSize?: number;
    $width?: number;
    $background?: boolean;
};

export const Block = styled.div`
    position: relative;
    box-sizing: border-box;
    border-radius: 10px;
    background: white;
    color: #4b5964;
    box-shadow: 0 0 5px 1px rgb(136 136 136 / 30%);
    height: 92%;
    width: 96%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

export const TabDiv = styled.div`
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 6%;
    background-color: white;
`;

export const TabsBlock = styled(Tabs)`
    width: 100%;
    background-color: white;
    align-items: center;
    justify-content: center;
    height: 100%;
`;

export const TabBlock = styled(Tab)`
    &:hover {
        background-color: none;
    }
    display: flex;
    font-size: 1.4em;
    align-items: center;
    justify-content: center;
    height: 100%;
`;

export const Wrap = styled.div`
    justify-content: center;
    align-items: center;
    width: 96%;
    height: 94%;
    margin: 0 auto;
    padding: 20px 15px 0 0;
    background-color: white;
    overflow-y: auto;

    ::-webkit-scrollbar {
        width: 2px;
        width: 10px;
        background-color: rgba(0, 0, 0, 0.08);
    }
    ::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.3);
        border-radius: 20px;
    }
`;

export const Header = styled.div`
    font-size: 1.4em;
    width: 100%;
    border-bottom: 2px solid #707070;
    padding-bottom: 10px;
`;

export const ProfileBlock = styled.div`
    width: 100%;
    height: 15vh;
    display: flex;
    align-items: center;
`;

export const ProfileTitleBlock = styled.div`
    width: 100%;
    height: 5vh;
    display: flex;
    align-items: center;
`;

export const ProfileDiv = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    font-size: 1.3em;
`;

export const ProfileImg = styled.img`
    height: 13vh;
    width: 13vh;
    border-radius: 50%;
    margin-right: 10px;
`;

export const ProfileBtn = styled(Button)`
    width: 160px;
    height: min-content;
    padding: 6px 4px;
    color: #4b5964;
    font-size: 1.1em;
    border: 1px solid #9a9a9a;
    border-radius: 10px;
    font-weight: normal;
    margin-left: 15px;
`;

export const InfoDiv = styled.div`
    width: 100%;
    flex: 1;
    display: flex;
    align-items: center;
    margin-top: 20px;
`;

export const InfoLabel = styled.p`
    width: 130px;
    display: block;
    color: ${(props: styledProps) => (props.$color ? props.$color : "#555555")};
    font-size: ${(props: styledProps) => (props.$small ? "1.1em" : "1.3em")};
    margin-right: 30px;
`;

export const InfoText = styled.input`
    font-size: 1.3em;
    flex: 6;
    border: 1px solid #aaaaaa;
    border-radius: 8px;
    height: 5vh;
    padding: 0 10px;
`;

export const PasswordResetBtn = styled(Button)`
    width: 100px;
    border: 1px solid #aaaaaa;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    height: 100%;
    margin-left: 10px;
    min-width: 0;
    height: 5vh;
    letter-spacing: 2px;
    font-weight: 500;
`;

export const PasswordLockBtn = styled(Button)`
    width: 50px;
    border: 1px solid #aaaaaa;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    height: 100%;
    margin-left: 10px;
    min-width: 0;
    height: 5vh;
`;

export const PasswordLockImg = styled.img`
    width: 50%;
    height: 50%;
`;

export const InfoSelect = styled(Select)`
    font-size: 1.3em;
    flex: 6;
    height: 5vh;
    border: 1px solid #aaaaaa;
    border-radius: 8px;
    padding: 0 10px;
`;

export const InfoOption = styled(MenuItem)`
    font-size: 1.3em;
    height: 5vh;
`;

export const BtnDiv = styled.div`
    width: fit-content;
    height: 10%;
    margin: 50px auto 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Btn = styled(Button)`
    width: 15vw;
    height: 6vh;
    font-size: 1.3em;
    color: #ffffff;
    font-weight: 400;
    border-radius: 10px;
    margin: 0 10px;
    padding: 12px;
    background-color: ${(props: styledProps) =>
        props.$bgColor == "red" ? $red : props.$bgColor == "blue" ? $blue : $gray};
    &:hover {
        background-color: ${(props: styledProps) =>
            props.$bgColor == "red" ? $red : props.$bgColor == "blue" ? $blue : $gray};
        opacity: 0.8;
        transition: opacity 0.2s;
    }
`;

export const CheckboxBlock = styled(Checkbox)`
    flex: 1;
    margin-right: calc(100% - 184px);
    padding: 0;
    border-radius: 0;
`;

export const SignedEditPageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
`;

export const Content = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 90%;
`;

export const ContentDiv = styled.div`
    width: 97%;
    display: flex;
    flex: 3;
    height: calc(100% - 40px);
`;

export const TopMenuBlock = styled.div`
    width: 100%;
    height: fit-content;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const TableMenu = styled(Tabs)`
    display: flex;
    align-items: center;
    flex: 1;
`;

export const TheadDiv = styled.div`
    margin: 14px auto;
    width: 100%;
    height: 3em;
    border-bottom: 2px solid #ccc;
    display: flex;
`;

export const TableContainer = styled.div`
    flex: 1;
    width: 100%;
    overflow: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
    height: calc(100% - 80px);
`;

export const BoardTable = styled.table`
    justify-items: center;
    width: 100%;
`;

export const BoardBody = styled.tbody`
    justify-items: center;
    border: 1px solid;
`;

export const TableBodyRow = styled.tr`
    background-color: transparent;
    opacity: 90%;
    height: 3em;
    display: table-row;
    border-bottom: 1px solid;
`;

export const BtnMenu = styled(Tab)`
    width: 5%;
    height: 100%;
    padding: 20px 0;
    border-radius: 10px;
    font-size: 1em;
    &:hover {
        filter: invert(56%) sepia(65%) saturate(399%) hue-rotate(183deg) brightness(87%)
            contrast(87%);
    }
    color: #777777;
`;

export const Thead = styled.div`
    width: ${(props: styledProps) => (props.$headSize ? props.$headSize + "%" : `fit-content`)};
    float: left;
    padding: 0 1em;
    padding-top: 0.6em;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const TableBodyCell = styled.td`
    vertical-align: middle;
    width: fit-content;
    padding: 0% 1%;
    display: table-cell;
    text-align: center;
`;

export const GroupBtnDiv = styled.div`
    display: flex;
    flex: 1;
    width: 98%;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    padding-top: 10px;
`;

export const Title = styled.h2`
    font-size: 1.5em;
    font-weight: 700;
    width: 12%;
`;

export const CloseBtn = styled(Button)`
    position: absolute;
    display: flex;
    right: 0px;
    top: 30px;
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

export const EmailCHheckDiv = styled.td``;

export const EmailCheck = styled(Checkbox)`
    padding: 0;
    border-radius: 0;
    flex: 1;
    display: flex;
    justify-content: center;
`;

export const SettingBtn = styled(Button)`
    display: flex;
    position: relative;
    justify-content: center;
    right: 0px;
    margin: 0;
    height: 50%;
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

export const TreeBlock = styled.div`
    flex: 0.7;
    border: 1px solid #ccc;
    display: flex;
    position: relative;
    justify-items: center;
    flex-direction: column;
    height: 98%;
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
    border-bottom: 2px solid #ccc;
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
`;

export const DetailBlock = styled.div`
    background-color: white;
    border: 1px solid #ccc;
    flex: 2.3;
    display: flex;
    justify-content: start;
    flex-direction: column;
    height: 98%;
`;

export const SubTitle = styled.div`
    font-weight: 600;
    width: 100%;
    display: flex;
    align-items: center;
    margin: 0 auto;
    margin-top: 10px;
    height: 5%;
    justify-content: left;
`;

export const TableCell = styled.div`
    display: flex;
    text-align: center;
    align-items: flex-start;
    width: ${(props: styledProps) => (props.$width ? props.$width + "%" : "20%")};
    justify-content: center;
`;

export const Seperator = styled.div`
    width: 100%;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    border-bottom: 2px solid #ccc;
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

export const BodyDetail = styled.div`
    margin-top: 1%;
    font-weight: 600;
    background: transparent;
    width: 100%;
    display: flex;
    min-height: 3em;
    margin: 0 auto;
    align-items: center;
    font-size: 14px;
    border: 1px solid;
`;

export const TreeIcon = styled.img`
    margin-right: 6px;
    width: 16px;
    height: 16px;
`;

export const TreeDiv = styled.div`
    display: flex;
    background: ${(props: styledProps) => (props.$background ? "#ccc" : "")};
    padding: 3px 6px;
    align-items: center;
`;
