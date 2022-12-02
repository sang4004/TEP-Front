import styled from "styled-components";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import Modal from "@material-ui/core/Modal";

type StyledProps = {
    $first ?: boolean;
    $width ?: number;
    $disabled ?: boolean;
}

export const Block = styled(Modal)`
    border-radius : 10px;
    display : block;
    position : relative;
    display :flex;
    justify-content : center;
    align-items : center;
    width : 100%;
    height : 100%;
`;

export const Inner = styled.div`
    height : 560px;
    padding  : 0 45px 25px 45px;
    box-shadow: 0 0 1px 4px rgba(0, 0, 0, 0.16);
    background-color : white;
    border-radius : 10px;
    display : flex;
    flex-direction : column;
    position : relative;
    min-width: 500px;
`;

export const Title = styled.h2`
    flex : 1;
    display : flex;
    align-items : center;
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 15px;
`;

export const CloseBtn = styled(Button)`
    position : absolute;
    display : flex;
    right: 30px;
    top : 30px;
    min-width : 40px;
    width : 30px;
    height : 30px;
    border-radius : 50%;
    span {
        width : 30px;
    }
    img{
        width : 15px;
        height : 15px;
    }
`;

export const Content = styled.div`
    flex : 10;
    display : flex;
    justify-content : center;
    align-items : center;
    flex-direction : column;
    width : 100%;
    height : 90%;

    max-height : 420px;
    min-height : 420px;
`;

export const BodyInput = styled.div`
    display: flex; 
    margin-left: 10px;
`;

export const BodyBtn = styled(Button)`
    background: #EEE;
    width:92.5%;
    display : flex;
    justify-content : flex-start;
    font-size: 16px;
    margin: 0;
    margin-left: 30px;
`;
export const BodyDetail = styled.div`
    margin-top : 1%;
    font-weight : 600;
    background: transparent;
    width: 100%;
    display: flex;
    align-items : center;
    font-size: 14px;
`;
export const Btn = styled(Button)`
    flex : .1;
    display : flex;
    position: relative;
    justify-content : center;
    margin : 20px 0;
    width: 100%;
    background-color : #477EE9;
    color : white;
    &:hover{
        background-color : #477EE9;
        color : white;
    }
    padding : 8px 24px;

`

export const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items : flex-start;
    justify-content : flex-start;
    height:70%;
    gap : 5px;    
`;
export const Seperator = styled.div`
    width: 92.5%;
    justify-content: center;
    align-items : center;
    margin: 0 20px 0 30px;
`;
export const SubTitle = styled.div`
    font-weight : 600;
    width : 100%;
    display : flex;
    align-items : center;
    font-size: 15px;
    margin-left: 0px;
    margin-top: 30px;
    height:5%;
    justify-content: left;
`;
export const TreeBlock = styled.div`
    flex : 1.5;
    border : 1px solid grey;
    display : flex;
    position: relative;
    justify-items: center;
    flex-direction : column;
    width : 100%;
    min-height : 95%;
`;
export const TreeTitle= styled.div`
    font-weight:600;
    text-align: left;
    position: relative;
    padding:10px;
    min-height:40px;
    width:100%;
    font-size:15px;
`
export const TreeInnerBox = styled.div`
    overflow-y : auto;
    flex : 1;
    width : 100%;
    display : flex;
    padding : 1rem;
    justify-content : left;
    position:relative;
    img{
        position:absolute;
        width : 50px;
        right : 1%;
        top : 40%;
        filter: invert(50%) sepia(0%) saturate(500%) hue-rotate(131deg) brightness(96%) contrast(100%);
    }
`;
export const TableCell = styled.div`
    display : flex;
    align-items : flex-start;
    width: ${(props: StyledProps)=> props.$width ? props.$width + "%" : "20%"};
    justify-content: center;
`
export const close = styled(Button)`
    display : ${(props:StyledProps)=> props.$disabled ? "none" : "flex"};
    justify-content:center;
    min-width : 30px;
    width : 30px;
    height : 30px;
    padding : 5px;
    border-radius : 50%;
    span {
        width : 100%;
    }
    img{
        width : 15px;
        height : 15px;
    }
`;


export const SearchBox = styled.div`
    display : flex;
	flex-direction : row;
    align-items : center;
    justify-content : center;
    align-items : center;
    min-height : 40px;
`;

export const Searchbar = styled.div`
	background-color : #fff;
    border-bottom : 1px solid grey;
    display : flex;
	flex-direction : row;
    align-items : center;
    width : 100%;
`;

export const SearchField = styled(TextField)`
    flex : 1;
	margin : 0 8px 0 16px;
`;

export const SearchIcon = styled.img`
	width : 18px;
	height: auto;
	margin : 0 16px 0 8px;
	cursor : pointer;
`;

export const TreeIcon = styled.img`
    margin-right : 6px;
`;

export const DropboxWrap = styled(Select)`
    border : 1px solid #B9B9B9;
    background-color : white;
    border-radius : 4px;
    font-weight : bold;
    justify-content: center;
    padding : 0 20px;
    left:10px;
`;

export const ActiveBtnBlock = styled.div`
    display : flex;
    justify-content : center;
    align-items : center;
    height :100%;
    flex : .5;
`;

export const ActiveBtn = styled.div`
    width : 68px;
    height : 100px;
    display : flex;
    justify-content : center;
    align-items : center;
    background-size : cover;
    font-size : 1.4em;
    cursor: pointer;
    padding-right : 10px;
    opacity : 50%;
    &:hover{
        opacity : 100%;
    }
`;