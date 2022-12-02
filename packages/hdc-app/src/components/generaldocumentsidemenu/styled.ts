import styled from "styled-components";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

type StyledProps = {
    $isMain ?: boolean;
    $isProfileImg ?: boolean;
    $flex ?: number;
    $state ?: boolean;
    $tabidx ?: number;
    $allsign ?: boolean;
}

export const TabBlock = styled.div`
    width : 100%;
    height : 100%;
    display: flex;
    flex-direction : column;
    flex : 1;
`;

export const TabBtns = styled(Tabs)`
    display : flex;
    justify-content : center;
    align-items : center;
    flex-direction : row;
    height : auto;
    border-bottom : 1px solid #bfd2e2;
    position : relative;
`;

export const TabBtn = styled(Tab)`
    color : #4b5964;
    font-weight : 400;
    min-width : 100px;
    width : 33%;
`;

export const TabNumberImg = styled.img`
    position : absolute;
    background-color : red;
`;

export const TabNumberDiv = styled.div`
    border-radius : 50%;
    width : 20px;
    height : 20px;
    display : flex;
    justify-content : center;
    align-items : center;
    background-color : rgb(3, 155, 228);
    color : white;
    position : absolute;
    /* ${(props : StyledProps)=>props.$state ? "10px" : "0"}; */
    right : 0px;
    top : 12px;
`;

export const ContentDiv = styled.div`
    display : flex;
    flex-direction : column;
    height : 94%;
    flex : 1;
    width : 100%;
    overflow-y : auto; 
    ::-webkit-scrollbar{
        display : none;
    }
`;

export const Content = styled.div`
    width : 100%;
    /* height : fit-content; */
    flex: 9;
    display : flex;
    align-items : center;
    flex-direction : column;
`;

export const RejectContent = styled.div`
    width : 100%;
    height : fit-content;
    flex: 1;
    /* position: absolute; */
    white-space: pre-wrap;
    bottom: 0;
    padding: 10px 20px;
    background-color: #dedede;
    display : flex;
    align-items : center;
    flex-direction : column;
`;

export const RejectRow = styled.div`
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: left;
    font-size: 1.2em;
    font-weight: 450;
`;

export const SignBtn = styled.div`
    display : flex;
    justify-content : center;
    align-items : center;
    flex-direction : row;
    min-height : 80px;
    width : 100%;
    border-bottom : 1px solid #ccc;
    border-top : 1px solid #ccc;
    margin-top : -1px;
    margin-bottom : ${(props : StyledProps)=>props.$state ? "10px" : "0"};

`;

export const SignDiv = styled.div`
    display : flex;
    justify-content : center;
    align-items : center;
    flex-direction : row;
    min-height : 80px;
    width : 100%;
    position : relative;
    overflow : hidden;
`;

export const SignNumberDiv = styled.div`
    flex : .1;
    padding: 0 15px;
    color: #000000;
    height : 100%;
    min-width : 14px;
    min-height : 80px;
    display : flex;
    flex-direction : column;
    justify-content : center;
    align-items : center;
    white-space : break-spaces;
    font-size : 14px;
    font-weight : bold;
    img{
        flex : 1;
        min-width : 14px;
        cursor: pointer;
        padding: 1% 1%;
        opacity : 50%;
        &:hover{
            opacity : 100%;
        }
    }
`;

export const AllSignLine = styled.div`
    transform: rotate(118deg);
    position: absolute;
    width : 100px;
    border-top:${(props : StyledProps)=>props.$allsign ? "2px solid #FFFFFF" : "none"};
`;

export const SignBtnAvatar = styled(Avatar)`
    width : 64px;
    height : 64px;
    margin : 0 10px;
    border-radius : 50%;
    img {
        width : ${(props : StyledProps)=> props.$isProfileImg ? "100%" : "55%"};
    }
`;

export const SignBtnInfo = styled.div`
    flex : 2.5;
    display : flex;
    justify-content : flex-start;
    flex-direction : column;
`;

export const SignBtnInfoText = styled(Typography)`
    ${(props:StyledProps)=> props.$isMain ? 
    `
        color : #313131;
        font-weight : 500;
        font-size : 16px;
    ` 
    : 
    `
        color : #313131;
        font-size : 13px;
        font-weight : 300;
    `};
`;

export const SignConfirmBtn = styled.div`
    flex : .2;
    padding: 0 15px;
    color: white;
    background: #6084CB;
    height : 100%;
    min-height : 80px;
    display : flex;
    justify-content : center;
    align-items : center;
    white-space : break-spaces;
    font-size : 14px;
    font-weight : bold;
    line-height : 28px;
    position : relative;
    overflow : hidden;
`;

export const DocumentInfo = styled.ul`
    padding: 15px 20px;
    font-size: 14px;
    width : 100%;
    height : 100%;
    li{
        display: flex;
        margin-bottom: 20px;
        h3{
            width: 30%;
            color: #718493;
        }
        p{
            font-weight: bold;
            white-space: break-spaces;
        }
    }
`;

export const DocumentReferer = styled.div`
    height : auto;
    display : flex;
    flex-wrap : wrap;
    gap : .5em;
    color : #4B5964;
    margin-left : 10px;
    div{
        background-color : #DEECFC;
        border : 1px solid #B4D7FF;
        border-radius : 20px;
        width : auto;
        padding : 6px;
        font-weight : 400;
        display : flex;
        justify-content : center;
        align-items : center;
    }
`;

export const DocumentHistoryBlock = styled.div`
    display : flex;
    justify-content : flex-start;
    align-items :center;
    flex-direction : column;
    color : #4B5964;
    font-weight : bold;
    overflow-y : auto;
    width : 100%;
    height : 100%;
`;

export const HistoryHead = styled.div`
    width : 100%;
    height : 36px;
    display : flex;
    flex-direction : row;
    background-color : #F5FAFF;
    border-bottom : 1px solid #BFD2E2;
`;

export const HistoryHeadDiv = styled.div`
    flex : ${(props : StyledProps)=>props.$flex ? props.$flex : 1};
    display : flex;
    justify-content : center;
    align-items : center;
`;

export const HistoryRow = styled.div`
    width : 100%;
    min-height : 108px;
    border-bottom : 1px solid #BFD2E2;
    display : flex;
    justify-content : center;
    align-items : center;
    flex-direction : column;
`;

export const HistoryRowTop = styled.div`
    flex : 1;
    display : flex;
    justify-content : center;
    align-items : center;
    flex-direction : row;
    width : 100%;
`;

export const HistoryRowTopItem = styled.div`
    flex : ${(props : StyledProps)=>props.$flex ? props.$flex : 1};
    display : flex;
    justify-content : center;
    align-items : center;
    white-space: break-spaces;
    text-align: center;
`;

export const HistoryRowBtm = styled.div`
    flex : 1;
    background-color : #F5F5F5;
    border : 1px solid #DDDDDD;
    border-radius : 12px;
    width : 90%;
    display : flex;
    flex-direction : row;
    margin : 10px 0;
    align-items: center;
    height : auto;
    word-break : break-all;
    padding : 4px;
    img {
        width : 12px;
        height : auto;
        margin : 0 10px;
    }
`;