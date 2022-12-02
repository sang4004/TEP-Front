import styled from "styled-components";

type StyledProps = {
    $type ?: string;
}

export const ContentsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    height: 90%;
    margin-top: -4%;
    padding: 2%;
    box-sizing: border-box;
    padding-top: 0;
`;

export const RightContentsWrap = styled.div`
    width: 100%;
    height: 100%;
    background: #f7f8f8;
`;

export const CatBtmWrap = styled.div`
    float: left;
    margin: 15px 0;
`;

export const CatBtnWrapBtn = styled.button`
    height: 35px;
    padding: 0 50px;
    border-radius: 10px;
    font-weight: 700;
    color: #fff;
    margin-right: 10px;
`;

export const DrnContentsWrap = styled.div`
    clear: both;
    width: 100%;
    height: 90%;
    background: #fff;
    border-radius: 10px;
    border: 1px solid #ccc;
    padding: 10px;
    box-sizing: border-box;
`;

export const InnerContainer = styled.div`
    width: 100%;
    height: 31.5%;
    border-radius: 10px;
    border: 1px solid #ccc;
`;

export const InnerContainerHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 30px;
    background: #F0F0F0;
    border-radius: 10px 10px 0 0;
    padding: 0px 10px;
    box-sizing: border-box;
    color: #666;
    font-weight: 700;
    font-size: 14px;
`;

export const BtnContainer = styled.div`
    display: flex;
    align-items: center;
`;

export const BtnContainerBtn = styled.button`
    display: block;
    margin-left: 10px;
`;

export const BtnContainerBtnImg = styled.div`
    display: block;
`;

export const TargetDocuBox = styled.div`
    width: 100%;
    height: 31.5%;
    border-radius: 10px;
    border: 1px solid #ccc;
    clear: both;
    margin-bottom: 1%;
`;

export const InnerContentsBox = styled.div`
    float: left;
    width: 80%;
    height: calc(100% - 30px);
`;

export const TargetDocuTable = styled.div`
    height: calc(100% - 30px);
    font-size: 14px;
    overflow: auto;
`;

export const AllUserCommentBox = styled.div`
    width: 100%;
    height: 31.5%;
    border-radius: 10px;
    border: 1px solid #ccc;
    margin-bottom: 1%;  
`;

export const AllUserCommnetList = styled.div`
    padding: 10px;
    box-sizing: border-box;
`;

export const TargetUserCommentList = styled.div`
    padding: 10px;
    box-sizing: border-box;
`;

export const CommentNone = styled.div`
    color: #47afe9;
`;