import styled from "styled-components";
import TextField from "@material-ui/core/TextField";

type StyledProps = {
    $wpType?: string;
};

export const DocumentWorklistContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
`;

export const DoucmentWorklistTableBox = styled.div`
    width: 100%;
    background: #fff;
    border-radius: 10px;
    box-shadow: 1px 0 5px rgba(0, 0, 0, 10%);
`;

export const DocumentWorklistTableBoxHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 50px;
    padding: 0 10px;
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;
`;

export const GridViewWrap = styled.div`
    width: 100%;
    height: calc(100% - 50px);
    overflow-y: scroll;
`;

export const StatusDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 1em;
    font-weight: 700;
`;

export const Stage = styled.p`
    color: #ff9800;
    width: 100%;
`;

export const ActualDate = styled.p`
    color: #555;
    width: 100%;
`;

export const wpType = styled.p`
    color: ${(props: StyledProps) =>
        props.$wpType == "DIN"
            ? "#4CAF50"
            : props.$wpType == "DRN"
            ? "#F44336"
            : props.$wpType == "TM"
            ? "#FF9800"
            : "#2196F3"};
`;

export const FileToolBtnWrapper = styled.div`
    display: flex;
`;

export const SearchIcon = styled.img`
    width: 18px;
    height: auto;
    margin: 0 16px 0 8px;
    cursor: pointer;
`;

export const SearchField = styled(TextField)`
    flex: 1;
    margin: 0 8px 0 16px;
`;

export const Searchbar = styled.div`
    background-color: #fff;
    border: 1px solid grey;
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 20%;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

export const Notice = styled.p`
    color: #f44236;
    font-size: 14px;
    margin-right: 13%;
`;
