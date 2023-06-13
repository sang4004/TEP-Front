/******************************************************************************
 * dropdown/index.tsx
 * hooks :
    * useLocations 
    *
 * last modify : 
 ******************************************************************************/
// Library
import { useSelector, useDispatch } from "react-redux"; // redux
import React, { useState, useEffect } from "react"; // default hooks
import styled from "styled-components";
// import {
//     Chart,
//     ChartLegend,
//     ChartSeries,
//     ChartSeriesItem,
//     ChartSeriesLabels
// } from "@progress/kendo-react-charts";
import "hammerjs";
//
// Module
import { useLocations } from "hooks" // locations hooks
//

export type donutchartData = {
    label : string,
    value : any
}

export type DonutChartProps = {
    style ?: object;
    data : donutchartData[];
}
interface FinalDonutChartProps extends DonutChartProps {}

export const DonutChartComponent : React.FunctionComponent<FinalDonutChartProps> = ( props : FinalDonutChartProps)=>{
    return (
        <div></div>
        // <Chart>
        //     <ChartSeries>
        //     <ChartSeriesItem type="donut" data={props.data} categoryField="label" field="value">
        //         <ChartSeriesLabels color="#fff" background="none" content={e => e.category } />
        //     </ChartSeriesItem>
        //     </ChartSeries>
        //     <ChartLegend visible={false} />
        // </Chart>
    );
}