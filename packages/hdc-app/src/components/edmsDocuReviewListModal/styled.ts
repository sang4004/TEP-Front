import styled from "styled-components";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Modal from "@material-ui/core/Modal";

type StyledProps = {
    $type?: string;
    $boxType?: string;
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
    width: 70%;
    height: 90%;
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
    height: 8%;
    background: #1a4a4a;
    padding: 3%;
    box-sizing: border-box;
    color: white;
    font-size: 1.3vw;
    font-weight: 600;
`;

export const HeaderTitle = styled.div`
    font-size: 1em;
    color: white;
`;

export const ModalCloseBtn = styled.button`
    display: block;
    width: 5%;
    opacity: 0.8;
    transform: scale(0.9);
    transition: opacity 0.3s, transform 0.3s;
`;

export const ModalContentWrap = styled.div`
    width: 100%;
    height: 90%;
    padding: 15px 30px 5px 30px;
    box-sizing: border-box;
`;

export const ModalListBigBox = styled.div`
    height: 95%;
    margin-top: 15px;
    margin-bottom: 10px;
    width: 100%;
    border-radius: 10px;
    border: 1px solid #ccc;
`;
//

export const ModalFileVersionList = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    flex: 1;
    width: 100%;
    height: calc(100% - 50px);
    overflow-y: auto;
    div {
        text-align: left;
        color: #999;
    }
`;

export const ModalFilVersionItemDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

export const ModalFilVersionTextDiv = styled.div`
    display: flex;
    font-size: 1.2em;
    color: #333;
    margin-top: 5px;
    margin-left: 2%;
`;

export const ModalFilVersionReplyTextDiv = styled.div`
    display: flex;
    font-size: 1.2em;
    color: #333;
    margin-left: 18%;
`;

export const ModalInputBox = styled.div`
    ${(props: StyledProps) =>
        props.$boxType == "wide"
            ? `width: 100%; height: 40%;`
            : props.$boxType == "long"
            ? `width: 100%; height: 8%;`
            : `width: 44%; height: 10%;`};

    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    align-items: center;
    padding-top: 10px;
`;

export const ModalBottom = styled.div`
    ${(props: StyledProps) =>
        props.$boxType == "wide"
            ? `width: 100%; height: 50%;`
            : props.$boxType == "top"
            ? `width: 100%; height: 10%; padding-top : 10px;`
            : `width: 100%; height: 10%; `};

    display: flex;
    justify-content: flex-end;
    box-sizing: border-box;
    align-items: center;
    margin-top: 40px;
`;

export const InputTitle = styled.div`
    ${(props: StyledProps) =>
        props.$boxType == "wide" ? `width: 12%;` : `width: 30%; margin-right: 5%;`};
    text-align: left;
    font-size: 1.1em;
    font-weight: 700;
    margin-top: 30px;
`;

export const InputSelectTitle = styled.div`
    width: 30%;
    text-align: left;
    font-size: 1.1em;
    font-weight: 700;
`;

export const InputSelect = styled(Select)`
    width: ${(props: StyledProps) => (props.$boxType == "wide" ? "100%" : "50%")};
    height: 80%;
    padding: 0 3%;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

export const InputSelectItem = styled(MenuItem)``;

export const FileTextFieldDiv = styled(TextField)`
    box-sizing: border-box;
`;

export const InnerContainerHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    background: #e4efef;
    border-radius: 10px 10px 0 0;
    padding: 0px 10px;
    box-sizing: border-box;
    color: #666;
    font-weight: 700;
    font-size: 14px;
`;

export const ModalBtnContainer = styled.div`
    text-align: right;
    width : 54%;
    height : 100%;
    padding-top : 5px;
`;

export const FileUploadBtn = styled(Button)`
    float: left;
    height: 60%;
    display: flex;
    align-items: center;
    background: white;
    padding: 0 20px;
    border: 1px solid #ccc;
    width: 15%;
    margin-right: 1%;
    img {
        display: block;
        width: 14px;
        margin-right: 8px;
    }
`;

export const CloseBtn = styled.button`
    height: 70%;
    width: 15%;
    border: 1px solid #477ee9;
    padding: 1% 3%;
    border-radius: 6px;
    opacity: 0.6;
    transition: opacity 0.5s;
    color: #477ee9;
    margin-right: 1%;
    &:hover {
        opacity: 1;
    }
`;

export const SaveBtn = styled(Button)`
    height: 70%;
    width: 15%;
    border: 1px solid #477ee9;
    padding: 1% 3%;
    border-radius: 6px;
    transition: opacity 0.5s;
    color: #fff;
    ${(props: StyledProps) =>
        props.$type == "input"
            ? `
      background-color : #487EE9;
      &:hover{
          background-color : #487EE9;
          opacity : 0.8;
      }
  `
            : props.$type == "confirm"
            ? `
  background-color : #487EE9;
  opacity : 0.6;
  &:hover{
      background-color : #487EE9;
      opacity : 0.4;
  }
  `
            : `
  color : #487EE9;
  `}
`;
