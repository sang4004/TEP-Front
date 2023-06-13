/******************************************************************************
 * * hooks :
    *
 * components : 
    * 
 ******************************************************************************/
// Library
import React, { useState, useEffect, useRef } from "react";

import Button from "@material-ui/core/Button";
import styled from "styled-components";
//
// Module
//

type styledProps = {
    $isOP ?: boolean;
    $barCount ?: number;
}

export type equipflowtableCompProps = {
    data : string[];
    startHour : number;
    endHour : number;
    
}
interface FinalEquipflowTableProps extends equipflowtableCompProps {};

export const EquipflowTableComponent : React.FunctionComponent<FinalEquipflowTableProps> = ( props : FinalEquipflowTableProps )=>{
    const [timeList, setTimeList] = useState<string[]>([]);
    const [barList, setBarList] = useState<boolean[]>([]);
    const [barIdxList, setBarIdxList] = useState<number[]>([]);
    
    useEffect(()=>{
        try{
            let _times = [];
            let _bars = [];
            for(var h=props.startHour; h<props.endHour;h++){
                _times.push(`${h >= 10 ? h : '0'+h}:30`);
                for(var i=0;i<6;i++){
                    let isIn = false;
                    var dataIdx = 0;
                    for(dataIdx; dataIdx <props.data.length;dataIdx++){
                        let start = props.data[dataIdx].split("|")[0];
                        let end = props.data[dataIdx].split("|")[1];
                        if(isTimeIn( start, end, h, i*10 )){
                            isIn = true;
                            break;
                        }
                    }
                    _bars.push(!isIn);
                }
            }
            setTimeList([..._times]);
            setBarList([..._bars]);
            let _indexes = [];
            let index = 0;
            for(var i=0;i<_bars.length;i++){
                if(_bars[i]){
                    if(index != 0)
                        _indexes.push(i - Math.floor(index / 2));
                    index = 0;
                    continue;
                }
                index += 1;
            }
            console.log(_indexes)
            setBarIdxList(_indexes);
        }catch(err){}
    }, [props.data]);
    
    const isTimeIn = (start : string, end : string, hour : number, min : number)=>{
        let startTotalMin = parseInt(start.split(":")[0]) * 60 + parseInt(start.split(":")[1])
        let endTotalMin = parseInt(end.split(":")[0]) * 60 + parseInt(end.split(":")[1]);
        let totalMin = hour * 60 + min;
        if(startTotalMin <= totalMin && endTotalMin >= totalMin){
            return true;
        }
        return false;
    }
        
    if(!(props.data && props.data.length > 0))
        return (
            <div>표시할 데이터가 없습니다..</div>
        );
    return (
		<EquipflowTableBlock>
            <EquipflowTableTimeDiv>
                {timeList.map((raw,idx)=>{
                    return (
                        <EquipflowTableTimeVal key={idx}>{raw}</EquipflowTableTimeVal>
                    )
                })}
            </EquipflowTableTimeDiv>
            <EquipflowTableChartDiv>
                {barList.map((raw,idx)=>{
                    let barIdx = barIdxList.indexOf(idx);
                    return (
                        <EquipflowTableChartBarDiv 
                            key={idx}
                            $isOP={raw} 
                            $barCount={barList.length}
                            >
                            {barIdx != -1 ? <EquipflowTableChartBarNopDiv>{barIdx}</EquipflowTableChartBarNopDiv> : null}
                        </EquipflowTableChartBarDiv>
                    );    
                })}
            </EquipflowTableChartDiv>
        </EquipflowTableBlock>
    );
};

const EquipflowTableBlock = styled.div`
	width : 100%;
    height : 120px;
    display : flex;
    justify-content : center;
    align-items : center;
    flex-direction : column;
`;

const EquipflowTableTimeDiv = styled.div`
    width : 100%;
    flex : 1;
    display : flex;
    flex-direction : row;
    justify-content : center;
    align-items : center;
    background-color : #6B7F8B;
    border : 1px solid #55656e;
`;

const EquipflowTableTimeVal = styled.div`
    flex : 1;
    display : flex;
    justify-content : center;
    align-items : center;
    font-size : 1.1em;
    color : white;
`;

const EquipflowTableChartDiv = styled.div`
    width : 100%;
    flex : 1;
    display : flex;
    flex-direction : row;
    justify-content : center;
    align-items : center;
    background-color : white;
    gap : 1px;
`;

const EquipflowTableChartBarDiv = styled.div`
    background-color : ${(props : styledProps)=> props.$isOP ? `#40A79F` : `#DE5E61`};
    flex : 1;
    width : ${(props: styledProps)=>`calc(99% / ${props.$barCount})`};
    height : 100%;
    position : relative;
`;

const EquipflowTableChartBarNopDiv = styled.div`
    position : absolute;
    z-index : 10;
    width : 200%;
    right : 0;
    height : 50%;
    top : 25%;
    display : flex;
    justify-content : center;
    align-items : center;
    background-color : #4B9BE4;
    color : white;
    font-size : 1.2em;
    border-radius : 4px;
`;