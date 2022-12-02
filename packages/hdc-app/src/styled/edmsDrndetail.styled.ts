import Button from "@material-ui/core/Button";
import styled from "styled-components";

type StyledProps = {
    $disabled?: boolean;
    $margin?: string;
    $boxType?: string;
    $radius?: boolean;
};

export const Contents = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    width: 100%;
    height: 90%;
    padding-left: 1%;
    padding-right: 1%;
    box-sizing: border-box;
    padding-top: 0;
    overflow: auto;
`;

export const DetailBtnWrap = styled.div`
    margin: 10px 0;
    height: 40px;
    padding: 0 50px;
    border-radius: 10px;
    font-weight: 700;
    color: #fff;
    background-color: #f46f36;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const DetailContentWrap = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 80%;
    padding-left: 10px;
`;

export const DrnDetailGridViewContainer = styled.div`
    ${(props: StyledProps) =>
        props.$margin == "bottom"
            ? `
                margin-bottom: 10px;
                height : 50%;
            `
            : props.$margin == "right"
            ? `
                margin-right : 5px; 
                height : 90%;
            `
            : `
                margin : 0px;
                heigth : 90%
                margin-left: 10px;
                border-radius: 10px 10px 0 0;
            `}
    overflow: auto;
    border: 1px solid #ccc;
    padding: 1px;
`;

export const GridViewWrap = styled.div`
    width: 100%;
    height: calc(100% - 30px);
    overflow: auto;
`;

export const DrnDetailGridViewHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 30px;
    background: #e4efef;
    border-radius: ${(props: StyledProps) => (props.$radius ? "10px 10px 0 0;" : "0;")};
    padding: 0px 10px;
    box-sizing: border-box;
    color: #666;
    font-weight: 700;
    font-size: 14px;
`;

export const DrnDetailGridViewButton = styled(Button)`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    img {
        display: flex;
    }
`;

export const DrnDetailText = styled.div`
    display: flex;
    color: #477ee9;
    margin-left: 4px;
`;

export const TopDiv = styled.div`
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0 1%;
`;

export const ApprovalButton = styled(Button)`
    margin: 15px 0;
    height: 35px;
    padding: 0 50px;
    border-radius: 10px;
    font-weight: 700;
    color: #fff;
    background: ${(props: StyledProps) => (props.$disabled ? "#EFEFF0" : "#477ee9")};
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
        background: ${(props: StyledProps) => (props.$disabled ? "#EFEFF0" : "#1a5bd9")};
    }
`;
export const ApprovalRejectButton = styled(Button)`
    margin: 15px 0;
    height: 35px;
    padding: 0 50px;
    border-radius: 10px;
    font-weight: 700;
    color: #fff;
    background: ${(props: StyledProps) => (props.$disabled ? "#EFEFF0" : "#54B0A9")};
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
        background: ${(props: StyledProps) => (props.$disabled ? "#EFEFF0" : "#428e88")};
    }
`;
export const ApprocalDiv = styled.div`
    display: flex;
    justify-content: space-between;
    width: 260px;
`;

export const DrnDetailInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    height: 50%;
    border: 1px solid #aaa;
    margin-bottom: ${(props: StyledProps) => (props.$boxType == "bottom" ? "10px" : "0px")};
    margin-bottom: 2%;
`;

export const DrnDetailInfoHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    width: 100%;
    border-bottom: 1px solid
        ${(props: StyledProps) => (props.$boxType == "TM" ? "#4CAF50" : "#f46f36")};
    padding: 10px;
    background-color: ${(props: StyledProps) => (props.$boxType == "TM" ? "#4CAF50" : "#f46f36")};
`;

export const TitleText = styled.h1`
    flex: 1;
    font-size: 1.2em;
    color: #fff;
`;

export const DetailTitleBtn = styled.div`
    color: #fff;
    font-size: 15px;
    font-weight: 500;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    img {
        width: 12px;
        height: 12px;
        margin-left: 5px;
    }
`;

export const DrnDetailInfo = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    height: fit-content;
    width: 100%;
    padding: 10px 10px 0 10px;
    background-color: #fff;
`;

export const DrnDetailInfoInner = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: fit-content;
    padding: 0.4em 0;
    gap: 1em;
    width: 50%;
`;

export const DrnDetailInfoInnerTitle = styled.div`
    text-align: justify;
    text-align-last: justify;
    height: fit-content;
    width: 40%;
    font-size: 1em;
    font-weight: 800;
    color: #777;
`;

export const DrnDetailInfoContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: fit-content;
    flex: 1;
    font-size: 1em;
`;

export const DrnDetailInfoExplan = styled.div`
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

export const DetailBtn = styled.button`
    margin: 10px 0;
    height: 40px;
    padding: 0 50px;
    border-radius: 10px;
    font-weight: 700;
    color: #fff;
    background-color: #f89b00;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const InfoContentWrap = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 20%;
`;

export const TmDetailBtnWrap = styled.div`
    height: 10%;
    display: flex;
    width: 100%;
    gap: 1em;
    background-color: #fff;
    justify-content: right;
    margin-bottom: 1%;
`;

export const TmDetailBtn = styled.button`
    padding: 0.5em;
    font-size: 1em;
    height: 100%;
    color: #fff;
    font-weight: 700;
    background-color: #4caf50;
    text-align: center;
    margin-right: 1%;
`;
