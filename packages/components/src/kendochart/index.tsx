import React, { useState, useEffect } from "react";

import {
    Chart,
    ChartArea,
    ChartSeries,
    ChartSeriesItem,
    ChartCategoryAxis,
    ChartCategoryAxisItem,
    ChartTitle,
    ChartLegend,
    ChartValueAxis,
    ChartValueAxisItem,
} from "@progress/kendo-react-charts";
import { Legend } from "@progress/kendo-react-charts/dist/npm/option-types/legend.interface";
import "hammerjs";

export type KendoChartProps = {
    type: "column" | "line" | "area" | "pie";
    categories: string[];
    title?: string;
    titleFont?: string;
    style?: object;
    areaStyle?: {
        background?: string;
        margin?: number;
    };
    data?: {
        name: string;
        data: number[];
        color?: string;
    }[];
    pieField?: {
        category: string;
        data: string;
    };
    pieData?: {
        [key: string]: string | number | boolean;
    }[];
    labels?: {
        visible?: boolean;
        step?: number;
        content?: any; // index /count/ text / value / format 제어가능
    };
    legend?: Legend;
};
const labelList = { step: 2, visible: true };
interface FinalKendoChartProps extends KendoChartProps {}
export const KendoChartComp: React.FunctionComponent<FinalKendoChartProps> = (
    props
) => {
    const getChartSeriesByType = () => {
        switch (props.type) {
            case "column":
            case "line":
            case "area":
                return (
                    <ChartSeries>
                        {props.data &&
                            props.data.map((item, idx) => (
                                <ChartSeriesItem
                                    key={idx}
                                    type="bar"
                                    tooltip={{ visible: true }}
                                    data={item.data}
                                    name={item.name}
                                    color={item.color}
                                />
                            ))}
                    </ChartSeries>
                );
            case "pie":
                return (
                    <ChartSeries>
                        <ChartSeriesItem
                            type="pie"
                            overlay={{
                                gradient: "sharpBevel",
                            }}
                            tooltip={{ visible: true }}
                            data={props.pieData}
                            categoryField={props.pieField?.category}
                            field={props.pieField?.data}
                            colorField="color"
                        />
                    </ChartSeries>
                );
            default:
                return null;
        }
    };
    return (
        <Chart style={props.style}>
            <ChartArea
                background={props.areaStyle?.background}
                margin={props.areaStyle?.margin}
            />
            {props.title ? (
                <ChartTitle font={props.titleFont} text={props.title} margin={{top : 10, bottom : 0}}/>
            ) : (
                <></>
            )}
            <ChartValueAxis>
                <ChartValueAxisItem labels={props.labels}></ChartValueAxisItem>
            </ChartValueAxis>
            <ChartLegend position="top" orientation="horizontal" align={props.legend?.align? props.legend?.align : "center" } />
            {props.type != "pie" && (
                <ChartCategoryAxis>
                    <ChartCategoryAxisItem
                        categories={props.categories}
                        startAngle={45}
                    />
                </ChartCategoryAxis>
            )}
            {getChartSeriesByType()}
        </Chart>
    );
};
