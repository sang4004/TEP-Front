import styled from "styled-components";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import Modal from "@material-ui/core/Modal";

type StyledProps = {
    $first ?: boolean;
    $deactive ?: boolean;
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
    width : 70%;
    height : 90%;
    padding  : 25px 45px;
    box-shadow: 0 0 1px 4px rgba(0, 0, 0, 0.16);
    background-color : white;
    border-radius : 10px;
    display : flex;
    flex-direction : column;
    position : relative;
    min-width: 500px;
    max-height: 1000px;
`;

export const Title = styled.h2`
    flex : .5;
    display : flex;
    align-items : center;
    font-size: 20px;
    font-weight: 600; 
    margin-bottom : 15px;
`;

export const CloseBtn = styled(Button)`
    position : absolute;
    display : flex;
    right: 40px;
    top : 30px;
    min-width : 40px;
    width : 40px;
    height : 40px;
    border-radius : 50%;
    span {
        width : 30px;
    }
    img{
        width : 30px;
        height : 30px;
    }
`;

export const Content = styled.div`
    overflow-y : auto;
    flex : 7.5;
    display : flex;
    justify-content : center;
    align-items : center;
    flex-direction : row;
`;

export const DetailBlock = styled.div`
    display : flex;
    background-color : 	#f6fafe;
    border: 1px solid grey;
    flex : 3;
    display : flex;
    justify-content : start;
    flex-direction : column;
    height : 100%;
    overflow-y : auto;
`;

export const BodyTextfield = styled(TextField)`
    flex : 1;
    /* width: fit-content; */
    margin-left : 10px;
    background-color : white;
    border : 1px solid #B9B9B9;
    border-radius: 5px;
    padding : 0 8px;
`;

export const DocNoTextfield = styled(TextField)`
    height: 100%;
    flex: 1;
    text-align: justify;
    text-align-last: justify;
    margin-left : 10px;
    background-color : transparent;
    border-radius: 5px;
    border : 1px solid black;

    display: flex;
    justify-content: center;
    align-items: center;
    letter-spacing: 2px;
    padding: .4em;
`;


export const DocNoContent = styled.div`
    flex : 1;
    width: fit-content;
    overflow-x: auto;
    display: flex; 
    justify-content: flex-start;
    align-items: center;
    margin-left : 10px;
`;

export const BodyTitle = styled.div`
    width: 100px;
    height : 100%;
    display : flex;
    align-items : center;
`;

export const BodyInfo = styled.div`
    width:90%;
    display: flex;
    justify-content : left;
    align-items : center;
    font-size: 16px;
    margin: 20px 0 0 0;
    justify-content: flex-start;
`;

export const Btn = styled(Button)`
    display : flex;
    position: relative;
    justify-content : center;
    bottom : 10px;
    right: 0px;
    margin : 0;
    height: 100%;
    cursor : move;
    ${(props : StyledProps)=>
        props.$deactive ? `
        background-color : #D8D8D8;
        color : gray;
        cursor : auto;
        &:hover{
            background-color : #D8D8D8;
            color : gray;
        }
        ` : `
        background-color : #477EE9;
        color : white;
        &:hover{
            background-color : #477EE9;
            color : white;
            cursor : pointer;
        }
        `
    }
    padding : 8px 24px;

`
export const EndContainer = styled.div`
   position: relative;
   display : ${(props : StyledProps)=> props.$deactive ? "none" : "flex"};
   justify-content: flex-end;
   padding-right: 20px;
   padding-top: 30px;
`
export const InfoContainer = styled.div`
   display : ${(props : StyledProps)=> props.$deactive ? "none" : "flex"};
   flex-direction: column;
   align-items : center;
   justify-content : center;
   
`;
export const Seperator = styled.div`
    width: 92.5%;
    justify-content: center;
    align-items : center;
    margin: 5px 20px 0 15px;
`;
export const SubTitle = styled.div`
    font-weight : 600;
    width : 100%;
    display : flex;
    align-items : flex-start;
    font-size: 16px;
    margin-left: 16px;
    margin-top: 30px;
`;
export const TreeBlock = styled.div`
    flex : 2;
    border : 1px solid grey;
    display : flex;
    position: relative;
    justify-items: center;
    flex-direction : column;
    height : 100%;
    margin-right: 10px;
`;
export const TreeInnerBox = styled.div`
    height : 95%;
    overflow-y: auto;
    width : 90%;
    display : flex;
    padding : 1rem;
    justify-content : left;
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
    width : 16px;
    height : 16px;
`;

export const DropboxWrap = styled(Select)`
    border : 1px solid #B9B9B9;
    background-color : white;
    border-radius : 0;
    font-weight : bold;
    padding : 0 10px;
    width : 100%;
`;

export const BodyInput = styled.div`
    display: flex; 
    flex : 1;
    margin-left: 10px;
    white-space : break-spaces;
`;

export const AddReceiver = styled.button`
    margin : 0 10px;
    padding : 0 10px;
    color : #FFFFFF;
    background-color : #6eabd1;
    border-radius : 5%;
`;

export const SearchBox = styled.div`
    display : flex;
	flex-direction : row;
    align-items : center;
    justify-content : center;
    align-items : flex-end;
`;

export const Searchbar = styled.div`
	background-color : #fff;
    border : 1px solid grey;
    display : flex;
	flex-direction : row;
    align-items : center;
    width : 95%;
    margin-bottom : 10px;
`;

export const AddButton = styled.button`
    display : flex;
    font-size : 0.9em;
    margin-left : 10px;
    height : 35px;
    padding : 0 10px;
    padding-top : 5px;
    background-color : #dddddd                                                                                                                                                                                                                                                                                                                         ;
`;

export const DocTitle = styled.div`
    width : 100px;
    height : 35px;
    display: flex; 
    align-items : center;
    justify-content : left;
`;

export const DocContent = styled.div`
    flex : 1;
    flex-flow : row wrap;
    /* width : 280px; */
    display: flex; 
    align-items : center;
    justify-content : left;
    padding : 0 10px;
    padding-right : 11%;
    height : fit-content;
    min-height : 42px;
    border : 1px solid #ccc;
    border-radius : 5px;
    margin-left : 10px;
    position : relative;
`;

export const CustomInputField = styled(TextField)`
    width : 100%;
	padding : 4px 10px;
`;

export const DocChip = styled.div`
    width : fit-content;
    margin : 5px;
`;

export const DocBtn = styled.button`
    width : 10%;
    display : flex;
    height : 100%;
    margin-left : 10px;
    background-color : #ccc;
    justify-content : center;
    align-items : center;
    color : #FFFFFF;
    font-size : 2em;
    font-weight : 900;
    border : 1px solid #ccc;
    border-radius : 0 3px 3px 0;
    position : absolute;
    right : 0;
`;