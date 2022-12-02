import styled from "styled-components";
import Modal from "@material-ui/core/Modal";

type StyledProps = {
    $margin?: string;
};

export const Block = styled(Modal)`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: -1;
`;

export const Inner = styled.div`
    width: 300px;
    height: 250px;
    background: white;
    overflow: hidden;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
    top: 50%;
    left: 50%;
`;

export const ModalHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 15%;
    background: #1a4a4a;
    padding: 3%;
    box-sizing: border-box;
    color: white;
    font-size: 1.3vw;
    font-weight: 600;
`;

export const HeaderTitle = styled.div`
    font-size: 18px;
    color: white;
`;

export const ModalCloseBtn = styled.button`
    display: block;
    width: 4%;
    opacity: 0.8;
    transform: scale(0.9);
    transition: opacity 0.3s, transform 0.3s;
`;

export const ModalContentWrap = styled.div`
    width: 100%;
    height: 65%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px 20px 0px 20px;
    box-sizing: border-box;
    flex-direction: column;
`;

export const ModalInputBox = styled.div`
    width: 100%;
    height: 25%;
    display: flex;
    justify-content: center;
    box-sizing: border-box;
    align-items: center;
    margin: 10px 0;
`;

export const InputTitle = styled.div`
    width: fit-content;
    ${(props: StyledProps) =>
        props.$margin == "left" ? `margin-left: 3%; margin-right: 3%;` : `margin-right: 3%;`}
    height: 100%;
    text-align: left;
    align-items: center;
    font-size: 1.1em;
    font-weight: 700;
    display: flex;
    justify-content: flex-start;
`;

export const ModalBtnContainer = styled.div`
    padding: 0px 20px 0px 20px;
    display: flex;
    flex: 1;
    justify-content: flex-end;
`;

export const CloseBtn = styled.button`
    border: 1px solid #477ee9;
    padding: 1% 2%;
    border-radius: 6px;
    opacity: 0.6;
    transition: opacity 0.5s;
    color: #477ee9;
    margin-right: 1%;
    &:hover {
        opacity: 1;
    }
    width: 25%;
`;

export const SaveBtn = styled.button`
    border: 1px solid #477ee9;
    padding: 1% 2%;
    border-radius: 6px;
    opacity: 0.6;
    transition: opacity 0.5s;
    color: #fff;
    background: #477ee9;
    &:hover {
        opacity: 1;
    }
    width: 25%;
`;

export const InputDate = styled.input`
    flex: 1;
    padding: 0.6em 0;
    font-size: 1.2em;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin: 0 2% 0 4%;
`;
