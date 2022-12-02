import styled from "styled-components";
import Button from "@material-ui/core/Button";

type StyledProps = {
    $color ?: string;
    $disabled ?: boolean;
    $state ?: number;
    $dir ?: boolean;
    $hover ?: boolean;
    $marginType ?: string;
}

export const DinDetailApprovedContainer = styled.div`
    margin: 10px;
    width: calc(100% - 20px);
    border-radius: 10px;
    border: 1px solid #ccc;
    height: 25%;
`;


export const GridViewWrap = styled.div`
    width : 100%;
    height : calc(100% - 30px);
    overflow: auto;
    border-bottom : 1px solid #ccc;
`;

export const DinDetailCopyFileBox = styled.div`
    border-radius: 10px;
    border: 1px solid #ccc;
    float: left;
    width: 100%;
    height: 70%;
`;

export const DinDetailCopyFileChooseBox = styled.div`
    width: 100%;
    height: 30%;
    display: flex;
    justify-content: space-between;
    float: left;
    margin-top: 10px;
    
    padding: 10px;
    border-radius: 10px;
    border: 1px solid #ccc;
    box-sizing: border-box;
`;

export const DinDetailInnerHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 30px;
    background: #E4EFEF;
    border-radius: 10px 10px 0 0;
    padding: 0px 10px;
    box-sizing: border-box;
    color: #666;
    font-weight: 700;
    font-size: 14px;
`;

export const DinDetailGridViewHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 30px;
    background: #E4EFEF;
    border-radius: 10px 10px 0 0;
    padding: 0px 10px;
    box-sizing: border-box;
    color: #666;
    font-weight: 700;
    font-size: 14px;
`;

export const DinDetailInnerBtns = styled.div`
    display: flex;
    align-items: center;
    flex-direction : row;
`;

export const DinDetailInnerHeaderBtn = styled(Button)`
    display: flex;
    align-items: center;
    justify-content : center;
    img {
        display: flex;
    }
`;

export const DinDetailText = styled.div`
    display : flex;
    color : #477EE9;
    margin-left : 4px;
`

export const DinDetailInnerContentsBox = styled.div`
    display: flex;
    flex-direction : row;
    justify-content : flex-start;
    align-items : flex-start;
    width: 100%;
    height: calc(100% - 30px);
    padding: 10px 5px;
    box-sizing: border-box;
    flex-wrap : wrap;
`;

export const DinDetailApprovalUserList = styled.div`
    flex : 8;
    display : flex;
    justify-content : flex-start;
    align-items : center;
    overflow-x : auto;
    height: 100%;
    overflow-x: scroll;
`;

export const DinDetailApprovalCommissionBox = styled.div`
    flex : 1;
    display: flex;
    justify-content: center;
    flex-direction: column;
    height: 100%;
    padding-left: 5px;
    gap : 6px;
`;

export const DinDetailApprovalText = styled.div`
    color: #FF9900;
    font-size: 0.8em;
    position : absolute;
    bottom : -2em;
`

export const DinDetailApprovaDiv = styled.div`
    
`

export const DinDetailApprovalCommissionBtn = styled(Button)`
    align-items: center;
    padding: 8px 20px;
    font-size: 1em;
    background: ${(props : StyledProps) => props.$disabled ? '#EFEFF0' : props.$color};
    &:hover{
        background: ${(props : StyledProps) => props.$disabled ? '#EFEFF0' : props.$color};
    }
    margin-left: 5px;
    color: white;
    border-radius: 10px;
    flex : 1;
    display : flex;
    justify-content : center;
    align-items : center;
    max-height : 50%;
    img{
        display: block;
        width: 14px;
        margin-right: 8px;
    }
`;

export const DinDetailUserCard = styled.div`
    display : flex;
    justify-content: flex-start;
    flex-direction: column;
    height : 100%;
    background-color : #E4EAEC;
    border-radius: 10px;
    border: 1px solid #ccc;
    margin-right : 5px;
`;

export const DinDetailUserCardTitle = styled.div`
    display : flex;
    justify-content : center;
    background-color : ${(props: StyledProps)=>props.$state == 1 ? "#DDDDDD" : props.$state == 2 ? "#66B821" : props.$state == 3 ? "#EB5539" : "#DDDDDD"};
    border-radius: 10px 10px 0 0;
    padding: 5px 0;
    color : ${(props: StyledProps)=>props.$state == 1 ? "black" : "white"};
    img {
        width : 16px;
        height : 16px;
    }
`;

export const SignNumberMoveBtn = styled.img`
    ${(props : StyledProps)=>props.$marginType == 'left'
    ? 'margin-left : 30px;' :
    props.$marginType == 'right'
    ? 'margin-right : 30px;' :
    'margin: 0 20px'};
    width : 16px;
    transform : ${(props : StyledProps)=>props.$dir ? "rotate(270deg)" : props.$hover ? "rotate(90deg)" : "roate(0)" };
    cursor : pointer;
    filter : opacity(50%);
    &:hover{
        filter : opacity(100%);
    }  
`;

export const DinDetailUserCardButtonDiv = styled.div`
    display : flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width: 150px;
    height : 100%;
`;

export const DinDeleteButton = styled(Button)`
    img {
        width : 16px;
        height : 16px;
    }
`