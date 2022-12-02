import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

type StyledProps = {
    $cellSize ?: number;
    $boxSize ?: number;
    $dir ?: string;
    $color ?: string;
}

export const ProjectDetailBox = styled.div`
    background: #fff;
    border-radius: 10px;
    height: 95%;
    width: ${(props: StyledProps) => props.$boxSize ? props.$boxSize+"%" : "45%"};
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
`;

export const ProjectDetailBoxHeader = styled.div`
    display: flex;
    padding: 0 3%;
    box-sizing: border-box;
    justify-content: space-between;
    align-items: center;
    height: 55px;
    border-bottom: 1px solid #ccc;
    font-weight: 600;
    font-size : 1.2em;
`;

export const ProjectDetailBoxTitle = styled.div`
    border: none;
    outline: none;
    select {
        font-size : 1.1em;
        font-weight : 700;
    }
`;

export const ProjectDetailBoxDate = styled.div`
    font-size: 1em;
`;

export const ProjectDetailContents = styled.div`
    padding: 3%;
    height: 50%;
`;

export const ProjectDetailInfo = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 2% 3%;
    border-top: 1px solid #ccc;
    box-sizing: border-box;
    font-size: 1em;
    height : 35%;
`;

export const ProjectDetailList = styled.div`
    display: flex;
    width: 100%;
    margin-bottom: 2%;
    display : flex;
    justify-content: space-between;
    flex-direction : column;
`;

export const ProjectDetailDiv = styled.div`
    display: flex;
    justify-content: space-between;
    flex : 1;
`

export const ProjectDetailListTitle = styled.div`
    color: #477ee9;
    font-weight: 700;
    width: 40%;
    display : flex;
    align-items : center;
`;

export const ProjectDetailListDate = styled.div`
    width: 45%;
    display : flex;
    align-items : center;
`

export const SearchBoxWrap = styled.div`
    display : flex;
    justify-content : center;
    align-items : center;
`;

export const SearchBox = styled(Button)`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    min-width : 0;
    padding : 4px;
`;

export const SearchBoxInput = styled.input`
    display: block;
    height: 100%;
    padding: 2%;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: .8em;
    margin-right : 10px;
`;

export const SearchBoxButton = styled.button`
    width: 7%;
    margin-left: 5%;

`;

export const ProjectAdrTable = styled.div`
    height: 90%;
    text-align: center;
    font-size: 1.2em;
    font-weight : 500;
`;

export const ProjectAdrTableHead = styled.div`
    display: flex;
    align-items: center;
    height: 12%;
    border-bottom: 1px solid #ccc;
    color: #666;
`;

export const ProjectAdrTableTh = styled.div`
    width: ${(props: StyledProps) => props.$cellSize ? props.$cellSize+"%" : "12%"};
`;

export const ProjectAdrTableBody = styled.div`
    height: calc(100% - 64px);
    overflow: auto;
    display : flex;
    flex-direction : column;
`;

export const ProjectAdrTableRow = styled.div`
    display: flex;
    align-items: center;
`;

export const ProjectAdrTableTd = styled.div`
    margin-left: 1.5%;  
    width: ${(props: StyledProps) => props.$cellSize ? props.$cellSize+"%" : "1%"};    
    display : flex;
    justify-content : center;
    align-items : center;
    flex-direction : row;
`;

export const ProjectAdrTableTdIcon = styled.img`
    cursor: pointer;
    width : 1.5vw;
    height : auto;
    margin-right : 8px;
`;

export const ProjectMoreBtn = styled.button`
    opacity: 1;
    transition: opacity 0.3s;
    color : #477EE9;
`;

export const ProjectOutputTable = styled.div`
    height: calc(100% - 64px);
    overflow: auto;
    display : flex;
`;

export const ProjectOutputThead = styled.div`
    display: flex;
    width: 100%;
    height: 20%;
    background: #deebfb;
    text-align: center;
    border-bottom : 1px solid #ccc;
`;

export const ProjectOutputTbody = styled.div`
    display: flex;
    flex-direction : column;
    width: 100%;
    height: 80%;
    text-align: center;
`;

export const ProjectOutputRow = styled.div`
    display : flex;
    border-bottom : 1px solid #ccc;
    border-left : 1px solid #ccc;
`;

export const ProejctOutputRowVal = styled.div`
    width: 25%; 
    border-right: 1px solid #ccc;
    display : flex;
    justify-content : ${(props : StyledProps)=> props.$dir ? props.$dir  == "left" ? "flex-start" : props.$dir  == "right" ? "flex-end" : "center" : "center"};
    padding : 4px 6px;
    align-items : center;
    color : ${(props : StyledProps)=>props.$color ? props.$color : "#333"};
`;

export const ProjectOutputTheadTh = styled.div`
    width: ${(props: StyledProps) => props.$cellSize ? props.$cellSize+"%" : "25%"};    
    border-right: 1px solid #ccc;
    display : flex;
    justify-content : center;
    align-items : center;
`;

export const ProjectOutputTheadTh3 = styled.div`
    width: 42.84%;
    display: flex;
    align-items : center;
    flex-wrap: wrap;
    text-align: center;
`;
export const ProjectOutputTheadTh4 = styled.div`
    width: 28.56%;
    display: flex;
    align-items : center;
    flex-wrap: wrap;
    text-align: center;
    color: #ecb937;
`;
export const ProjectOutputSubTh = styled.div`
    line-height: 155%;
`;

export const ProjectOutputSubTh1 = styled.div`
    width: 100%;
    height : 50%;
    box-sizing: border-box;
    border-right: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    display : flex;
    justify-content : center;
    align-items : center;
`;
export const ProjectOutputSubTh2 = styled.div`
    width: 33.33%;
    border-right: 1px solid #ccc;
    box-sizing: border-box;
    height : 50%;
    display : flex;
    justify-content : center;
    align-items : center;
`;
export const ProjectOutputSubTh3 = styled.div`
    width: 100%;
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;
    height : 50%;
    display : flex;
    justify-content : center;
    align-items : center;
`;
export const ProjectOutputSubTh4 = styled.div`
    width: 50%;
    border-right: 1px solid #ccc;
    box-sizing: border-box;
    height : 50%;
    display : flex;
    justify-content : center;
    align-items : center;
`;

export const BoxAdrTabs = styled(Tabs)`

`;

export const BoxAdrTab = styled(Tab)`

`;