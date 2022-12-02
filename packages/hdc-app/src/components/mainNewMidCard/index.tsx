/******************************************************************************
 * Copyright (c) 2021. Moornmo Inc. Rights reserved.                          *
 * Data modelings and methods used are assets of Moornmo Inc.                 *
 * appwrapper/index.tsx
 * hooks :
 * last modify : jh.jeong@ilts.co.kr
 ******************************************************************************/

// Module
import * as S from "./styled";

import React, { useState, useEffect } from "react";
import { useLocations } from "hooks";
import { GaugeChartComponent } from "components";

export type mainNewMidCardProps = {
    projNo: number;
    idx: number;
    data: { project_name: string; rate: number };
    char?: string;
    label?: string;
    disableChart?: boolean;
};
interface FinalmainNewMidCardProps extends mainNewMidCardProps {}

export const MainNewMidCardComponent: React.FunctionComponent<FinalmainNewMidCardProps> = props => {
    const onClickProject = () => {
        if (props.projNo == 0) {
            pushHistory("/edms/project");
        } else {
            // pushHistory("/edms/projectinfo");
        }
    };

    const { pushHistory } = useLocations();
    return (
        <S.StatusBox>
            <S.StatusTitle $color={props.idx} onClick={onClickProject}>
                {props.data.project_name}
                <S.StatusNum $color={props.idx}>
                    {props.char == undefined
                        ? props.data.rate
                            ? `${Math.floor(props.data.rate)}%`
                            : `0%`
                        : props.char}
                </S.StatusNum>
            </S.StatusTitle>
            <S.StatusContentBox>
                {props.disableChart ? (
                    <></>
                ) : (
                    <GaugeChartComponent
                        pointer={{
                            value: props.data.rate
                                ? props.data.rate < 1
                                    ? 1
                                    : props.data.rate
                                : 0,
                            length: 1,
                            color: "#777777",
                        }}
                        style={{
                            width: "fit-content",
                            height: "100%",
                            fontSize: "1.4em",
                            margin: "2em",
                        }}
                        minWidth={172}
                        minHeight={90}
                    />
                )}
            </S.StatusContentBox>
        </S.StatusBox>
    );
};
