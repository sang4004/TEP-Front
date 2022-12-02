import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { Stepper, StepperChangeEvent } from "@progress/kendo-react-layout";

export const Block = styled.div`
    display: block;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

export const StepperBlock = styled(Stepper)`
    padding : 0;
    width : 100%;
    .k-step-label{
        color : white;
    }
`;