import styled from "styled-components";
import Button from "@material-ui/core/Button";
import * as S from "./default.styled";

type StyledProps = {
    $color?: string;
    $disabled?: boolean;
};

export const Contents = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    padding: 2%;
    box-sizing: border-box;
    padding-top: 0;
`;

export const DetailBtnWrap = styled.div`
    float: left;
    margin: 15px 0;
    height: 35px;
    padding: 0 50px;
    border-radius: 10px;
    font-weight: 700;
    color: #fff;
    background-color: #4caf50;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const DetailContentWrap = styled.div`
    display: flex;
    flex-direction: column;
    clear: both;
    width: 100%;
    height: 93%;
    background: #fff;
    border-radius: 10px;
    border: 1px solid #ccc;
`;

export const DetailContentsHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 8%;
    border-bottom: 1px solid #ccc;
    box-sizing: border-box;
`;

export const DetailTitle = styled.div`
    font-size: 20px;
    font-weight: 700;
    margin-left: 5px;
`;

export const DinDetailBtnContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    height: 100%;
    padding: 5px;
`;

export const DinDetailBtn = styled(Button)`
    align-items: center;
    padding: 8px 15px;
    color: white;
    border-radius: 5px;
    margin-left: 10px;
    img {
        display: block;
        width: 14px;
        margin-right: 5px;
    }
    ${S.theme_background_sub_button};
    &:hover {
        ${S.theme_background_sub_button_hover};
    }
`;

export const DinDetailApprovedContainer = styled.div`
    margin: 10px;
    width: calc(100% - 20px);
    border-radius: 10px;
    border: 1px solid #ccc;
    height: 25%;
`;

export const DinDetailCopyboxContainer = styled.div`
    // margin: 0 0 10px 10px;
    margin: 10px;
    border-radius: 10px;
    border: 1px solid #ccc;
    float: left;
    width: calc(33.33% - 20px);
    height: 100%;
    flex: 1;
    margin-right: 10px;
`;

export const DinDetailTargetUserBox = styled.div`
    flex: 1;
    margin-right: 10px;
    border-radius: 10px 10px 0 0;
    border-top: 1px solid #ccc;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    float: right;
    width: calc(33% - 20px);
    height: 100%;
    margin-left: 10px;
`;

export const DinDetailTargetDocuBox = styled.div`
    margin: 10px;
    width: calc(100% - 20px);
    border-radius: 10px 10px 0 0;
    border-top: 1px solid #ccc;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    height: 95%;
`;

export const GridViewWrap = styled.div`
    width: 100%;
    height: calc(100% - 30px);
    overflow: auto;
    border-bottom: 1px solid #ccc;
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
    background: #e4efef;
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
    background: #e4efef;
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
    flex-direction: row;
`;

export const DinDetailInnerHeaderBtn = styled(Button)`
    display: flex;
    align-items: center;
    img {
        display: flex;
    }
`;

export const DinDetailText = styled.div`
    display: flex;
    color: #477ee9;
`;

export const DinDetailInnerContentsBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: calc(100% - 30px);
    padding: 10px 5px;
    box-sizing: border-box;
    flex-wrap: wrap;
    overflow-y: auto;
`;

export const DinDetailApprovalUserList = styled.div`
    display: flex;
    height: 100%;
    width: 65%;
`;

export const DinDetailApprovalCommissionBox = styled.div`
    width: 35%;
    display: flex;
    justify-content: flex-end;
    flex-direction: row;
    height: calc(100% - 30px);
    padding-left: 5px;
`;

export const DinDetailApprovalText = styled.div`
    color: #ff9900;
    font-size: 0.8em;
    margin-top: 8px;
    text-align: center;
`;

export const DinDetailApprovaDiv = styled.div``;

export const DinDetailApprovalCommissionBtn = styled(Button)`
    align-items: center;
    padding: 8px 20px;
    font-size: 1em;
    background: ${(props: StyledProps) => (props.$disabled ? "#EFEFF0" : props.$color)};
    margin-left: 5px;
    color: white;
    border-radius: 10px;
    height: 40px;
    img {
        display: block;
        width: 14px;
        margin-right: 8px;
    }
    /* &:hover{
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    } */
`;

export const DinDetailInnerInfoList = styled.div`
    display: flex;
    font-size: 12px;
    width: 50%;
`;

export const DinDetailInnerInfoListTitle = styled.div`
    width: 20%;
    font-weight: 700;
    margin: 0px 10px;
    display: flex;
    justify-content: flex-start;
    font-size: 1.2em;
`;

export const DinDetailInnerInfoListDetailInfo = styled.div`
    font-size: 1.2em;
`;

export const DinDetailCopyFileBoxList = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    flex: 1;
    width: 100%;
    height: calc(100% - 30px);
    overflow-y: auto;
    div {
        margin: 0 0 30px 0 auto;
        text-align: center;
        color: #999;
    }
`;

export const DinDetailCopyFileBoxListItem = styled.div`
    background: "#FFFFFF";
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

export const DinDetailCopyFileBoxListItemText = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-start;
    padding-left: 20px;
    font-size: 1.1em;
    color: #333;
`;

export const UploadListItemDeleteBtn = styled(Button)`
    img {
        width: 16px;
        height: 16px;
    }
`;

export const DinDetailFileBox = styled.div`
    width: 100%;
    background: #e8e8e8;
    height: 100%;
    border-radius: 5px;
    border: 1px solid #ccc;
    overflow: hidden;
    box-sizing: border-box;
`;

export const DinDetailFileChooseBtn = styled(Button)`
    float: right;
    height: 100%;
    display: flex;
    align-items: center;
    background: white;
    padding: 0 20px;
    border-left: 1px solid #ccc;
    img {
        display: block;
        width: 14px;
        margin-right: 8px;
    }
`;

export const DinDetailFileUploadBtn = styled(Button)`
    width: 25%;
    height: 100%;
    background: #477ee9;
    color: white;
    border-radius: 5px;
`;

export const DinDetailTargetUserTable = styled.div`
    width: 100%;
    height: calc(100% - 30px);
    font-size: 14px;
`;

export const DinDetailTargetUserTableHead = styled.div`
    display: flex;
    width: 100%;
    height: 30px;
    align-items: center;
    background: #c4d6d6;
    padding: 0 10px;
    box-sizing: border-box;
`;

export const DinDetailTargetUserTableth = styled.div`
    color: #666;
    width: auto;
`;

export const DinDetailTargetUserTableRow = styled.div`
    display: flex;
    align-items: center;
    padding: 0 10px;
    box-sizing: border-box;
    height: 35px;
`;

export const DinDetailTargetUserTableRowTd = styled.div`
    width: 20%;
    background: #eff6ff;
`;

export const DinDetailTargetUserTableBtn = styled(Button)`
    float: right;
    img {
        display: block;
        width: 16px;
    }
`;

export const DinDetailTargetDocuTable = styled.div`
    height: calc(100% - 30px);
    font-size: 14px;
    overflow: auto;
`;

export const DinDetailTargetDocuTableThead = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #c4d6d6;
    height: 30px;
    padding: 0 10px;
    box-sizing: border-box;
`;

export const DinDetailTargetDocuTableRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 35px;
    padding: 0 10px;
    box-sizing: border-box;
`;

export const DinDetailTargetDocuTableCountWrap = styled.div`
    color: #477ee9;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    img {
        margin-right: 5px;
    }
`;

export const DinDetailTargetDocuTableManageCol = styled.div`
    width: 20%;
    background: #eff6ff;
`;

export const DinDetailTargetDocuTableManageColBtn = styled(Button)`
    display: block;
    margin-left: 10px;
    img {
        display: block;
        width: 16px;
    }
`;
export const BottomDiv = styled.div`
    display: flex;
    flex: 1;
    margin-bottom: 1%;
    margin-top: 2%;
`;

export const MiddleDiv = styled.div`
    display: flex;
    flex: 1;
    justify-content: space-between;
    height: 30%;
    margin-top: 1%;
`;

export const TopDiv = styled.div`
    flex: 1;
`;

export const MiddleFileDiv = styled.div`
    height: 100%;
    display: flex;
    flex: 1;
    flex-direction: column;
    width: 33%;
    margin: 10px;
`;
