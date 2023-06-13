/******************************************************************************
 * appwrapper/index.tsx
 * hooks :
 * useLocations
 *
 ******************************************************************************/
// Library
import { useSelector, useDispatch } from "react-redux"; // redux
import { useState, useEffect, useContext, ChangeEvent } from "react"; // default hooks
import { useLocations } from "hooks";
//
// Module
import * as S from "./styled";
//
export type ProgressBarProps = {
    percent: number;
    style ?: object;
};
interface FinalProgressBarProps extends ProgressBarProps {}

export const ProgressbarComp: React.FunctionComponent<FinalProgressBarProps> = props => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress(oldProgress => {
                if(oldProgress >= props.percent)
                    return oldProgress
                const diff = Math.random() * 5;
                return Math.min(oldProgress + diff, 100);
            });
        }, 300);
        return () => {
            clearInterval(timer);
        };
    }, [props.percent]);

    return <S.ProgressBar style={props.style} variant="determinate" value={progress} />;
};
