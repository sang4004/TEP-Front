import styled, { StyledProps } from "styled-components";
import Button from "@material-ui/core/Button";

type styleProps = {
    width?: number;
    textAlign?: string;
};

export const Block = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

export const BtnBlock = styled.div`
    width: 100%;
    display: flex;
    padding: 1% 0;
    flex-direction: column;
`;

export const SaveButton = styled(Button)`
    min-height: 30px;
    width: 100%;
    color: #fff;
    background-color: #ff6358;
    font-size: 1.1em;
    margin: 0 auto 0 1%;
    &:hover {
        opacity: 0.75;
        background-color: #ff6358;
    }
`;

export const ContentDiv = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    margin-top: 1%;
`;

export const ButtonDiv = styled.div`
    min-width: 10%;
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin: 0 1% 0 auto;
`;

export const PdfInfoDiv = styled.div`
    display: flex;
    width: ${(style: styleProps) => (style.width ? style.width + "%" : "width : 5%")};
    flex-direction: column;
`;
export const PdfTitleDiv = styled.div`
    text-align: center;
    background-color: rgba(33, 150, 243);
    color: #fff;
    padding: 6px 8px;
    box-sizing: border-box;
    font-size: 1em;
`;

export const PdfContentDiv = styled.div`
    font-size: 0.9em;
    padding: 6px 8px;
    box-sizing: border-box;
    text-align: ${(style: styleProps) => (style.textAlign ? style.textAlign : "center")};
`;
