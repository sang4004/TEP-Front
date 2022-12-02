import styled from "styled-components";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Modal from "@material-ui/core/Modal";

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
    flex: 1;
    display: flex;
    align-items: center;
    font-size: 20px;
    font-weight: 600;
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
    transition: .3s;
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
    flex: 1.5;
    display: flex;
    justify-content: start;
    flex-direction: column;
    height: 100%;
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
    margin: 0 20px;
`;

export const SubTitle = styled.div`
    font-weight: 600;
    width: 92.5%;
    display: flex;
    align-items: center;
    margin: 20px;
    height: 5%;
    justify-content: left;
    flex-direction: row;
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

export const TreeInnerBox = styled.div`
    overflow: auto;
    flex: 1;
    width: 90%;
    display: flex;
    padding: 0 1rem 1rem 1rem;
    justify-content: left;
    position: relative;
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
    width: 98%;
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

export const CloseBtn2 = styled.button`
    border: 1px solid #477ee9;
    padding: 1% 3%;
    border-radius: 10px;
    opacity: 0.6;
    transition: opacity 0.5s;
    color: #477ee9;
    margin-right: 1%;
    &:hover {
        opacity: 1;
    }
`;

export const SaveBtn = styled.button`
    border: 1px solid #477ee9;
    padding: 1% 3%;
    border-radius: 10px;
    opacity: 0.8;
    transition: opacity 0.5s;
    color: #fff;
    background: #477ee9;
    &:hover {
        opacity: 1;
    }
`;

export const Input = styled.input`
    width: 20%;
    height: 100%;
    padding: 0 3%;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-right: 10%;
`;

export const ModalInputBox = styled.div`
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: space-between;
    padding: 1%;
    box-sizing: border-box;
    align-items: center;
`;

export const InputTitle = styled.div`
    width: 50%;
    text-align: left;
    font-size: 1.1vw;
    font-weight: 700;
    margin-left: 20%;
`;

export const ContentDiv = styled.div`
    display: flex;
    flex: 11;
    flex-direction: column;
    margin-top: 20px;
`;

export const SubTitleDiv = styled.div`
    width: fit-content;
    font-size: 1.3em;
    margin: 10px;
    color: #666;
`;

export const TitleImg = styled.img`
    width: 20px;
    height: 20px;
    margin: 10px;
`;
