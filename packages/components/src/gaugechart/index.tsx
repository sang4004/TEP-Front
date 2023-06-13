/******************************************************************************
 * graph/index.tsx
 * hooks :
 * useLocations
 *
 * last modify :
 ******************************************************************************/

import React, { useState, useEffect } from "react"; // default hooks
import styled from "styled-components";
import {
    RadialGauge,
    RadialGaugeProps,
    RadialLabelPosition,
} from "@progress/kendo-react-gauges";

export type gaugeGraphProps = {
    label?: string;
    labelStyle?: object;
    minWidth?: number;
    minHeight?: number;
};
interface FinalgaugeGraphProps extends gaugeGraphProps, RadialGaugeProps {}

type styledProps = {
    $rotate?: number;
};

export const GaugeChartComponent: React.FunctionComponent<
    FinalgaugeGraphProps
> = (props: FinalgaugeGraphProps) => {
    let pos: "inside" | "outside" = "inside";
    const defaultData = {
        scale: {
            minorTicks: { visible: false },
            majorTicks: { visible: false },
            minorUnit: 4,
            majorUnit: 25,
            max: 100,
            ranges: [
                { from: 0, to: 25, color: "#F66801" },
                { from: 25, to: 50, color: "#F8CF00" },
                { from: 50, to: 75, color: "#8BD103" },
                { from: 75, to: 100, color: "#14B301" },
            ],
            rangeSize: 26,
            startAngle: 0,
            endAngle: 180,
            labels: {
                position: pos,
                margin: 0,
                padding: 0,
            },
            ...props.scale,
        },
        pointer: {
            color: "#000",
            length: 1.2,
            ...props.pointer,
        },
        style: {
            minWidth: props.minWidth ? props.minWidth : "180px",
            minHeight: props.minHeight ? props.minHeight : "90px",
            height: "max-content",
            ...props.style,
        },
    };
    return (
        <RadialBlock>
            <RadialGauge {...defaultData} />
            <Label style={props.labelStyle}>{props.label}</Label>
        </RadialBlock>
    );
};

export const RadialBlock = styled.div`
    height: min-content;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

export const Label = styled.span`
    font-size: 2em;
    font-weight: 500;
`;
