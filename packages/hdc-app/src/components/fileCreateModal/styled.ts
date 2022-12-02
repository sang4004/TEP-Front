import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";

type StyledProps = {
    $type?: string;
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
    width: 53%;
    height: 75%;
    box-shadow: 0 0 1px 4px rgba(0, 0, 0, 0.16);
    background: linear-gradient(0, white 90%, #1a4a49 90%);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    position: relative;
    min-width: 500px;
    max-height: 1000px;
    padding: 0 20px;
`;

export const Header = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    flex: 1;
    width: 100%;
`;

export const Title = styled.div`
    flex: 1;
    color: white;
    font-size: 1.3em;
    font-weight: 700;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

export const CloseBtn = styled(Button)`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    img {
        width: 24px;
        height: 24px;
    }
`;

export const Body = styled.div`
    flex: 9;
    display: flex;
    flex-direction: column;
    padding-bottom: 10px;
`;

export const UploadInner = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

export const UploadBtn = styled(Button)`
    width: 100%;
    height: 54px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #487ee9;
    color: white;
    font-size: 1.3em;
    font-weight: 700;
    margin: 10px 0;
    img {
        height: 1.1em;
        margin-right: 10px;
    }
    &:hover {
        background-color: #487ee9;
        opacity: 0.8;
    }
`;
export const UploadItem = styled.div`
    display: flex;
    background-color: #c4d6d6;
    justify-content: center;
    align-items: center;
    font-size: 1.2em;
    color: #333;
    width: 100%;
`;

export const UploadListItem = styled.div`
    background: "#FFFFFF";
    display: flex;
    justify-content: space-between;
    border: 1px solid #ccc;
    align-items: center;
    width: 100%;
`;

export const UploadListItemText = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-start;
    padding-left: 20px;
    font-size: 1.2em;
    color: #333;
`;

export const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex : 1;
    gap : 1em;
    padding : 1em 0;
`;

export const InputInner = styled.div`
    /* margin: 10px 0px 10px 0px; */
    display: flex;
    justify-content: left;
    align-items: center;
`;

export const InputTitle = styled.div`
    font-size: 1.1em;
    font-weight: 700;
    width: 100px;
`;

export const Input = styled.input`
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;
    height: 30px;
    padding: 5px;
    font-size: 1.1em;
    font-weight: 700;
`;

export const TextAreaInner = styled.div`
    /* margin: 10px 0px 10px 0px; */
    display: flex;
    flex: 1;
    justify-content: left;
    align-items: flex-start;
`;

export const TextAreaTitle = styled.div`
    font-size: 1.1em;
    font-weight: 700;
    width: 100px;
    height: 30px;
    display: flex;
    align-items: center;
`;

export const TextArea = styled.textarea`
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;
    height: 100%;
    padding: 5px;
    font-size: 1.1em;
    font-weight: 700;
`;

export const BtmBtns = styled.div`
    /* flex: 1; */
    width: 100%;
    height: 64px;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    gap: 1em;
`;

export const BtmBtn = styled(Button)`
    border: 1px solid #487ee9;
    ${(props: StyledProps) =>
        props.$type == "confirm"
            ? `
        background-color : #487EE9;
        color : white;
        &:hover{
            background-color : #487EE9;
            opacity : 0.8;
        }
    `
            : `
        color : #487EE9;
    `}
`;
