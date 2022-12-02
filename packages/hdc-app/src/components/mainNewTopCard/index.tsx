/******************************************************************************
 * Copyright (c) 2021. Moornmo Inc. Rights reserved.                          *
 * Data modelings and methods used are assets of Moornmo Inc.                 *
 * appwrapper/index.tsx
 * hooks :
 * useLocations
 *
 * last modify : jh.jeong@ilts.co.kr
 ******************************************************************************/

// Module
import * as S from "./styled";
import { useLocations } from "hooks";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { reducerState } from "../../common";
import { GetMainTop, SetNowProject } from "../../common/action";
export type mainNewTopCardProps = {
    title: string;
    subTitle: string;
    keyStr: string;
    width?: string; // width style string : 23vw
    height?: string; // height style string : 23vh
};
interface FinalmainNewTopCardProps extends mainNewTopCardProps {}

export const MainNewTopCardComponent: React.FunctionComponent<FinalmainNewTopCardProps> = props => {
    const pjSelector = useSelector((state: reducerState) => state.project);

    const dispatch = useDispatch();
    const { pushHistory, path } = useLocations();
    const [topCountList, setTopCountList] = useState<any[]>([]);

    useEffect(() => {
        if (pjSelector.main_top_info && pjSelector.main_top_info.length > 0) {
            let _list = [];
            for (var d of pjSelector.main_top_info) {
                _list.push({
                    project_no: d.project_no,
                    project_name: d.project_name,
                    DIN: d.DIN,
                    DRN: d.DRN,
                    TM: d.TM,
                    MyDocument: d.MyDocument,
                });
            }

            setTopCountList([..._list]);
        }
    }, [pjSelector.main_top_info]);

    const onClickItem = async (type: string, project_no: number) => {
        await dispatch(SetNowProject(project_no));
        if (type == "DIN") {
            pushHistory(`/edms/workproc/din/${project_no}`);
        } else if (type == "DRN") {
            pushHistory(`/edms/workproc/drn/${project_no}`);
        } else if (type == "TM") {
            pushHistory(`/edms/workproc/tm/${project_no}`);
        }
    };

    const onClickDocu = (idx: number) => {
        if (idx == 0) {
            pushHistory("/edms/tmpDocList");
        } else if (idx == 1) {
            pushHistory("/edms/finalachieve");
        }
    };

    const get_status_type = (type: string) => {
        if (type == undefined) return;
        if (type == "My document") {
            return (
                <>
                    {topCountList.map((raw: any, idx: number) => {
                        return (
                            <S.ProjectDiv key={raw.project_no}>
                                <S.TypeDiv onClick={() => onClickDocu(idx)}>
                                    <S.ProjectTitle>{raw.project_name}</S.ProjectTitle>
                                    <S.StatusNum $type={props.title}>
                                        {raw.MyDocument[0]}건
                                    </S.StatusNum>
                                </S.TypeDiv>
                            </S.ProjectDiv>
                        );
                    })}
                </>
            );
        } else {
            return (
                <>
                    {topCountList.map((raw: any) => {
                        if (raw[type] == undefined) return;
                        let data = raw[type];
                        return (
                            <S.ProjectDiv key={raw.project_no}>
                                <S.TypeDiv onClick={() => onClickItem(type, raw.project_no)}>
                                    <S.ProjectTitle>{raw.project_name}</S.ProjectTitle>
                                    <S.StatusNum $type={props.title}>{data}건</S.StatusNum>
                                </S.TypeDiv>
                            </S.ProjectDiv>
                        );
                    })}
                </>
            );
        }
    };

    return (
        <S.StatusBox style={{ width: props.width, height: props.height }}>
            <S.StatusTitle>
                <S.Title $type={props.title}>
                    {props.title}
                    <S.SubTitle>{props.subTitle}</S.SubTitle>
                </S.Title>
            </S.StatusTitle>
            <S.LineDivOut>
                <S.LineDivIn />
            </S.LineDivOut>
            <S.StatusContentBox>
                <S.ContentLi>
                    <S.ProjectTypeDiv>{get_status_type(props.keyStr)}</S.ProjectTypeDiv>
                </S.ContentLi>
            </S.StatusContentBox>
        </S.StatusBox>
    );
};
