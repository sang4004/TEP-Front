import styled from "styled-components";
import LinearProgress from "@material-ui/core/LinearProgress";
import { withStyles } from '@material-ui/core/styles';

type StyledProps = {
    $cellSize ?: number;
    $color ?: string;
    $percent ?: number;
    $justifyContent ?: string;
    $rowIdx ?: number;
}

export const PresentTable = styled.div`
    flex: 1;
    width: 100%;
    background: #fff;
    overflow: hidden;
`;

export const TableHead = styled.div`
    display: flex;
    align-items: center;
    background: #4472C4;
    color: white;
    height : 64px;
`;

export const TableTh = styled.div`
    width:  ${(props: StyledProps) => props.$cellSize ? props.$cellSize+"%" : "9.3%"};
    height: 100%;
    text-align: center;
    border-right: 1px solid #fff;
    box-sizing: border-box;
    display : flex;
    justify-content : center;
    align-items : center;
    font-size : 1.2em;
`;

export const TableThWrap = styled.div`
    display: flex;
    height: 100%;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items : center;
    text-align: center;
    align-items: center;
    font-size : 1.3em;
    width :  ${(props: StyledProps) => props.$cellSize ? props.$cellSize+"%" : "9.3%"};
    color : ${(props: StyledProps)=> props.$color ? props.$color : "white"};
`;

export const TableThWrapBtmBlock = styled.div`
    font-size: 1em;
    display : flex;
    justify-content : space-between;
    align-items : center;
    height : 50%;
    width : 100%;
`;

export const TableThWrapBtm = styled.div`
    border-right: 1px solid #fff;
    display : flex;
    justify-content : center;
    align-items : center;
    height : 100%;
    width : 100%;
`;

export const TableThWrapTop = styled.div`
    height: 50%;
    width: 100%;
    text-align: center;
    border-bottom: 1px solid #fff;
    border-right: 1px solid #fff;
    box-sizing: border-box;
    display : flex;
    justify-content : center;
    align-items : center;
`;

export const TableRow = styled.div`
    display: flex;
    width: 100%;
    height: 48px;
    border-bottom: 1px solid #fff;
    background-color : ${(props:StyledProps)=>props.$rowIdx ? props.$rowIdx % 2 == 0 ? "#E7EBF4" : "#CDD5EA" : "#CDD5EA"};
`;

export const TableTd = styled.div`
    position : relative;
    width: ${(props: StyledProps) => props.$cellSize ? props.$cellSize+"%" : "9.3%"};
    height: 100%;
    text-align: center;
    padding: 0 0.5%;
    border-right: 1px solid #fff;
    color: #666;
    font-weight: 600;
    display: flex;
    justify-content: ${(props:StyledProps)=>props.$justifyContent ? props.$justifyContent : "center"};
    align-items: center;
    font-size: 1vw;
    color : ${(props : StyledProps)=> props.$color ? props.$color : "#333"};
`;

const ProgressBar = styled(LinearProgress)`
    height : 70%;
    width : 80%;
    background-color : #EEEEEE;
`;

export const ProgressBarWrap = withStyles({
    barColorPrimary: {
        backgroundColor: "#71CC63"
    }
})(ProgressBar)

export const ProgressGauge = styled.div`
    position: absolute;
    color : white;
    left : ${(props : StyledProps)=> props.$percent ? props.$percent + "%" : "0%"};
`;