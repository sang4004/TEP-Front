/******************************************************************************
 * hooks :
    * useLocations 
 * components : 
    * 
 * 
 *  

 ******************************************************************************/
import * as S from "./styled";
import { GaugeChartComponent } from "components";
import React, { useRef, useState, useEffect, ChangeEvent } from "react"; // default hooks
import { useDispatch, useSelector } from "react-redux";
import {
    GetProjectTypeList,
    SetNowProject,
} from "../../common/action";
import { reducerState } from "../../common/store";
import { useLocations } from "hooks";

export type projectBaseProps = {
    style?: object;
    children?: React.ReactNode;
    openCard?: boolean;
};
interface FinalprojectBaseProps extends projectBaseProps {}

export const EdmsProjectBase: React.FunctionComponent<FinalprojectBaseProps> = props => {
    const dispatch = useDispatch();
    const projSelector = useSelector((state: reducerState) => state.project);

    const [projectList, setProjectList] = useState<any[]>([]);
    const [projId, setProjId] = useState<number>(-1);
    const [progressRate, setProgressRate] = useState<number>(0);
    const [progressColor, setProgressColor] = useState<string>("");
    const [progressLabel, setProgressLabel] = useState<string>("");
    const [nowProjName, setNowProjName] = useState<string>();

    const { path } = useLocations();

    useEffect(() => {
        dispatch(GetProjectTypeList());
    }, []);

    useEffect(() => {
        if (projSelector.project_type_list && projSelector.project_type_list.length > 0) {
            setProjectList(projSelector.project_type_list);
            setNowProjName(projSelector.project_type_list[0].project_name);
        }
    }, [projSelector.project_type_list]);

    useEffect(() => {
        if (projectList.length > 0 && projId == -1) {
            let filtered: any = projectList[0];
            setProjId(filtered.project_no);
        }
    }, [projectList]);

    useEffect(() => {
        if (projSelector.now_project_no) {
            setProjId(projSelector.now_project_no);
            // dispatch(GetProjectProgressRate(projSelector.now_project_no));
        }
    }, [projSelector.now_project_no]);

    // useEffect(() => {
    //     if (projSelector.project_progress_rate && projSelector.project_progress_rate > 0) {
    //         setProgressRate(projSelector.project_progress_rate);
    //         if (projSelector.project_progress_rate < 25) {
    //             setProgressColor("#4CAF50");
    //             setProgressLabel("bad");
    //         } else if (projSelector.project_progress_rate < 50) {
    //             setProgressColor("#F44336");
    //             setProgressLabel("not good");
    //         } else if (projSelector.project_progress_rate < 75) {
    //             setProgressColor("#FF9800");
    //             setProgressLabel("good");
    //         } else {
    //             setProgressColor("#2196F3");
    //             setProgressLabel("very good");
    //         }
    //     }
    // }, [projSelector.project_progress_rate]);

    const onChange = (e: ChangeEvent<any>) => {
        let _id = e.target.value;
        dispatch(SetNowProject(_id));
    };

    const select_page_type = () => {
        if (props.openCard == true) {
            return (
                <>
                    <S.ProjectTitle>
                        <S.ProjectTitleText>Project</S.ProjectTitleText>
                        <S.ProjectSelect disableUnderline value={projId} onChange={onChange}>
                            {projectList.map((raw: any, idx: number) => {
                                return (
                                    <S.ProjectSelectMenu
                                        value={raw.project_no}
                                        key={raw.project_no}
                                    >
                                        {raw.project_name}
                                    </S.ProjectSelectMenu>
                                );
                            })}
                            {/* <S.ProjectSelectMenu value={-1} >통영에코파워 발전기</S.ProjectSelectMenu> */}
                        </S.ProjectSelect>
                    </S.ProjectTitle>
                </>
            );
        }
    };

    const progress_page_type = () => {
        if (props.openCard == true) {
            return (
                <>
                    <S.ProjectStatWrap>
                        <S.ProjectStatGauge>
                            <GaugeChartComponent
                                pointer={{
                                    value: progressRate,
                                    length: 1.3,
                                    color: "white",
                                }}
                                label={progressLabel}
                                style={{ width: "100%", height: "100%", fontSize: "2em" }}
                                labelStyle={{ fontSize: "2em" }}
                            />
                        </S.ProjectStatGauge>

                        <S.ProjectStatPer>{progressRate}%</S.ProjectStatPer>
                    </S.ProjectStatWrap>
                </>
            );
        }
    };

    return (
        <S.Block className="main-page__container" style={props.style}>
            <style>
                {`
                    .k-grid table {
                        width : 100% !important;
                        margin : 0 -2px;
                    }
                `}
            </style>
            {/*Head*/}
            <S.ContentsHeader>
                {path?.indexOf("/edms/project") == -1 ? (
                    <>
                        {select_page_type()}

                        {progress_page_type()}
                    </>
                ) : (
                    <S.ProjectTitle></S.ProjectTitle>
                )}
            </S.ContentsHeader>
            {/*Body*/}
            <S.ContentsBody>{props.children ? props.children : <div></div>}</S.ContentsBody>
        </S.Block>
    );
};
