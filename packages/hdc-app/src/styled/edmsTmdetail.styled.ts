import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { createMuiTheme, withStyles } from "@material-ui/core";
import styled from "styled-components";

export const Contents = styled.div`
    display: flex;
    /* flex-wrap: wrap; */
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding-top: 10px;
    box-sizing: border-box;
`;

export const DetailContentWrap = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    /* border: 1px solid #aaa; */
    /* border-radius: 10px; */
`;

export const TreeViewBlock = styled.div`
    overflow: auto;
    flex: 1;
`;

export const TmGridStruct = styled.div`
    width: 15%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border-right: 1px solid #ccc;
`;

export const TmDocuListStruct = styled.div`
    width: 85%;
`;

export const TopDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* flex: 1; */
    height: 5%;
    padding: 0 20px;
    /* border-bottom: 1px solid #ccc; */
`;

export const BackBtnWrap = styled.div`
    padding: 4px 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &:hover {
        background-color: rgba(0, 0, 0, 0.4);
        border-radius : 100%;
    }
`;

export const TmDetailTitle = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 1.4em;
    font-weight: 800;
    padding: 14px 0;
`;

export const DetailBtnWrap = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const DetailBtn = styled.button`
    height: 60%;
    padding: 1em 3em;
    /* border-radius: 10px; */
    font-weight: 700;
    font-size: 1.2em;
    color: #fff;
    background-color: #f46f36;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const DownLoadBtnWrap = styled.div`
    height: 100%;
    display: flex;
    width: 100%;
    flex: 1;
    gap: 1em;
    background-color: #fff;
    justify-content: right;
    margin-bottom: 1%;
`;

export const DownLoadBtn = styled.button`
    padding: 0.7em;
    font-size: 0.9em;
    height: 100%;
    width: 100%;
    color: #fff;
    font-weight: 700;
    background-color: #1a4a4a;
    text-align: center;
    align-items: flex-end;
    margin-right: 1%;
`;

export const MidDiv = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 50%;
    padding: 10px 20px 20px 20px;
    /* gap: 20px; */
`;

export const TmDetailInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 14%;
    height: 100%;
    border: 1px solid #aaa;
    /* border-radius: 10px; */
`;

export const TmDetailInfoHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 50px;
    width: 100%;
    border-bottom: 1px solid #1a4a4a;
    font-size: 1.2em;
    padding: 10px;
    background-color: #1a4a4a;
    color: #fff;
`;

export const TmDocuHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 50px;
    width: 100%;
    font-size: 1.2em;
    padding: 10px;
    background-color: #1a4a4a;
    color: #fff;
`;

export const TmDocuHeaderDiv = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: #1a4a4a;
    align-items: center;
`;

export const TmDetailInfo = styled.div`
    display: flex;
    flex: 1;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    height: fit-content;
    width: 100%;
    padding: 10px 10px 0 10px;
    background-color: #fff;
`;

export const TmDetailInfoInner = styled.div`
    display: flex;
    height: fit-content;
    flex-direction: column;
    padding: 0.4em 0;
    width: 50%;
`;

export const TmDetailInfoInnerTitle = styled.div`
    text-align: justify;
    text-align-last: justify;
    height: fit-content;
    width: fit-content;
    font-size: 1em;
    font-weight: 800;
    color: #777;
`;

export const TmDetailInfoContent = styled.div`
    display: flex;
    justify-content: flex-start;
    height: fit-content;
    flex: 1;
    font-size: 0.9em;
    word-break: break-all;
`;

export const TmDetailInfoABtn = styled.a`
    font-weight: 600;
    font-size: 1.2em;
`;

export const TmDetailInfoExplan = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    flex: 1;
    padding: 0.4em 10px;
    overflow-y: auto;
    gap: 1em;
    background-color: #fff;
`;

export const TmCommentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 30%;
    height: 100%;
    gap: 10px;
`;

export const TmCommentListDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    height: 80%;
    flex: 1;
    border: 1px solid #aaa;
    background-color: #fff;
    /* border-radius: 10px; */
`;

export const TmCommentList = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    flex: 1;
    width: 100%;
    overflow-y: scroll;
`;

export const TmCommentRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: fit-content;
    width: 100%;
    gap: 1em;
    padding: 0 4px;
    border-bottom: 1px solid #ddd;
`;

export const TmComment = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: fit-content;
    padding: 6px;
    font-size: 1.1em;
`;

export const TmCommentDelete = styled.img`
    display: flex;
`;

export const TmCommentAdd = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 20%;
    border: 1px solid #aaa;
    border-radius: 10px;
`;

export const TmCommentInput = styled(TextField)`
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    height: 100%;
`;

export const TmCommentInputBtn = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: fit-content;
    height: 100%;
    padding: 10px;
    border-left: 1px solid #aaa;
`;

export const BtmDiv = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 50%;
    flex: 1;
    padding: 0 20px 20px 20px;
    /* gap: 20px; */
`;

export const TmDocuContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 85%;
    margin-left: 1%;
    height: 100%;
    border: 1px solid #aaa;
    /* border-radius: 10px; */
`;

export const DocumentListContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #fff;
`;

export const TmDocuList = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    overflow: auto;
    flex: 1;
    width: 100%;
`;

export const GridViewWrap = styled.div`
    width: 100%;
    height: calc(100% - 50px);
    overflow-y: scroll;
`;

export const TmReviewContainer = styled.div`
    /* display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center; */
    width: 100%;
    height: 100%;
    overflow-y: hidden;
    border: 1px solid #aaa;
`;

export const TmReviewList = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    /* flex: 1; */
    height: calc(100% - 50px);
    /* height: 90%; */
    width: 100%;
`;

export const TmReviewRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: fit-content;
    width: 100%;
    border-bottom: 1px solid #ddd;
`;

export const TmReview = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: fit-content;
    padding: 6px;
    font-size: 1.1em;
`;

export const TableTd = styled.td`
    text-align: center;
    border-left: 1px solid #ebebeb;
    border-bottom: 1px solid #ebebeb;
`;

export const TableButtonDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
`;

export const TableButton = styled(Button)`
    width: fit-content;
    color: white;
    background-color: #1a4a4a;
`;

export const AllCommentButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 136px;
    color: #1a4a4a;
    background-color: white;
    border-radius: 6px;
    font: bold;
    font-size: 13px;
    text-align: center;
    height: 30px;
    margin-right: 8px;
    &:hover {
        cursor: pointer;
        opacity: 0.9;
    }
`;

export const TmDetailGridViewContainer = styled.div`
    width: 100%;
    overflow: auto;
    margin-bottom: 10px;
    border-radius: 10px 10px 0 0;
    border: 1px solid #ccc;
    height: 50%;
    padding: 1px;
`;

// export const GridViewWrap = styled.div`
//     width : 100%;
//     height : calc(100% - 30px);
//     overflow: auto;
// `;

export const TmDetailGridViewHeader = styled.div`
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

export const TmDetailGridViewButton = styled(Button)`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    img {
        display: flex;
    }
`;

export const TmDetailText = styled.div`
    display: flex;
    color: #477ee9;
    margin-left: 4px;
`;

export const DownBtnDiv = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: fit-content;
    justify-content: flex-end;
`;

export const SelectBox = styled(Select)`
    width: fit-content;
    height: 100%;
    background-color: #1a4a4a;
    border-radius: 4px;
    padding: 8px 6px;
    min-width: 90px;
    color: #fff;
    font-weight: 600;
    text-align: center;
    position: relative;
    display: flex;
    margin: 0 1% 1% 0;
    svg {
        display: none;
        position: absolute;
    }
    div {
        width: 100%;
        height: 100%;
        padding: 0 !important;
    }
`;
export const Items = styled(MenuItem)`
    width: 100%;
    min-width: 100px;
    height: 100%;
`;

export const TmActionSelect = styled(Select)`
    padding: 12px 6px;
    /* border-radius: 10px; */
    font-weight: 700;
    font-size: 1.2em;
    color: #fff;
    background-color: #f46f36;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 120px;
    height: 44px;
`;

export const TmActionSelectItem = styled(MenuItem)`
    text-align: center;
`;

export const TmDetailInfoInnerDiv = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    overflow-y: auto;
`;
