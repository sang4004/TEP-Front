/******************************************************************************
 * popshipmenttoolbar/index.tsx
 * hooks :
    *
 ******************************************************************************/
// Library
import { useSelector, useDispatch } from "react-redux"; // redux
import React, { useState, useEffect } from "react"; // default hooks
import styled from "styled-components";
import { Typography, Button, TextField } from "@material-ui/core";
import { DatePicker } from "@material-ui/pickers";
import { InboxOutlined, SyncOutlined } from '@material-ui/icons';
//
// Module
import { useLocations } from "hooks" // locations hooks
import { 
    reducerState,
    GetEquipCodes,
    SetEquipCodes,
} from "common_module";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
//

type styledProps = {
    $selected ?: boolean;
    $arrowDir ?: string;
    $background ?: string;
    $onlyLeft ?: boolean;
    $flex ?: number;
}

export type popShipmentToolbarProps = {
    style ?: object;
    children ?: React.ReactNode;
}
interface FinalpoptoolbarProps extends popShipmentToolbarProps {};

export const PopShipmentToolbarComponent : React.FunctionComponent<FinalpoptoolbarProps> = ( props )=>{
    const { back, existBack, path } = useLocations();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const dispatch = useDispatch();
    const workSelector = useSelector((state : reducerState)=> state.work);
    const userSelector = useSelector((state : reducerState)=> state.user);
    
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    
    useEffect(()=>{
        // initialize here
    }, []);

    const onChangeDate = (date : any) =>{
        setSelectedDate(date);
    }

    return (
        <PopToolbarContainer 
            className="poptoolbar"
            style={props.style}
            >
            <ToolbarLeftGroup>
                <ToolbarVerticalGroup>
                    <ToolbarText>납품 일자</ToolbarText>
                    <ToolBarTimeText>2019-03-09</ToolBarTimeText>
                    <ToolbarText>고객 코드</ToolbarText>
                    <ToolBarTimeText>(주)코글플래닛</ToolBarTimeText>
                    <ToolbarText>회계년월</ToolbarText>
                    <DatePicker
                        value={selectedDate} 
                        onChange={onChangeDate}
                        openTo="year"
                        variant="inline"
                        views={["year", "month"]}
                        inputProps={{
                            style : {
                                textAlign : "center",
                                border : "1px solid #D8D8D8",
                                height : "36px",
                                padding : "10px",
                                cursor : "pointer"
                            },
                            disableUnderline : true,
                        }}
                        />
                </ToolbarVerticalGroup>
                <ToolbarVerticalGroup></ToolbarVerticalGroup>
            </ToolbarLeftGroup>
            <ToolbarRightGroup>
                <ToolbarActionBtn>
                    <ToolbarActionBtnText>납품 등록</ToolbarActionBtnText>
                </ToolbarActionBtn>
            </ToolbarRightGroup>
        </PopToolbarContainer>
    );
}

const PopToolbarContainer = styled.div`
    width : ${(props : styledProps)=> props.$onlyLeft ? `30%` : `100%`};
    ${(props : styledProps)=> props.$onlyLeft ? `min-width : 180px` : ``};
    height : 140px;
    margin : 0;
    padding : 0;
    display : flex;
    justify-content : flex-start;
    align-items : center;
    border : 1px solid #D5D5D5;
    background-color : white;
`;

const ToolbarText = styled(Typography)`
    font-size : 1.2em;
    margin-left: 1.4em;
    margin-right : 1em;
`;

const ToolbarLeftGroup = styled.div`
    width : 70%;
    display : flex;
    flex-direction : column;
    align-items : flex-start;
    overflow-x : auto;
    font-weight : 400;
    height : 90%;
`;

const ToolbarVerticalGroup = styled.div`
    width : 100%;
    height: 100%;
    display : flex;
    justify-content : ${(props : styledProps)=> props.$onlyLeft ? `center` : `flex-start`};
    flex-direction : row;
    align-items : center;
    overflow-x : auto;
    font-weight : 400;
    flex : 1;
`;

const ToolBarTimeText = styled(Typography)`
    border : 1px solid #D5D5D5;
    color : #4D4D4D;
    padding : 5px;
    display : flex;
    justify-content : center;
    align-items : center;
    flex : 1;
    height : 36px;
    font-size : 1.1em;
`;

const ToolbarRightGroup = styled.div`
    width : 30%;
    display : flex;
    justify-content : flex-end;
    align-items : center;
    gap : 1em;
    margin-right : 20px;
    height : 100%;
`;

const ToolbarActionBtn = styled(Button)`
    width : 120px;
    background-color :#1267B2;
    color : white;
    text-align : center;
    font-weight : 400;
    border-radius : 0;
    font-size : 1em;
    height : 80%;
    display : flex;
    justify-content : flex-start;
    &:hover{
        background-color :#1274ca;
    }
`;

const ToolbarActionBtnText = styled(Typography)`
    flex : 1;
    text-align : center;
`;