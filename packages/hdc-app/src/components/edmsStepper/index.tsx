/******************************************************************************
 * appwrapper/index.tsx
 * hooks :
 * useLocations
 *
 ******************************************************************************/
// Library
import React, { useState, useEffect } from "react"; // default hooks
import { useDispatch, useSelector } from "react-redux";
import { StepIconProps } from "@material-ui/core/StepIcon";
import Check from "@material-ui/icons/Check";
//
// Module
import * as S from "./styled";
//
import { reducerState } from "../../common/store";
import { StepperChangeEvent, Step } from '@progress/kendo-react-layout';

export type EdmsStepperProps = {
    steps: {label : string, icon ?: string}[];
    step: number;
};

interface FinalEdmsStepperProps extends EdmsStepperProps {}

export const EdmsStepperComp: React.FunctionComponent<FinalEdmsStepperProps> = props => {

    return (
        <S.Block>
            <S.StepperBlock
                value={props.step}
                items={props.steps}
                onChange={(e: StepperChangeEvent)=>{}}
            />
        </S.Block>
    );
};
