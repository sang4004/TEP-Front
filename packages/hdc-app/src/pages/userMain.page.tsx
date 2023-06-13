/******************************************************************************
 * hooks :
 * useLocations
 * components :
 *
 *
 *
 ******************************************************************************/
// React
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
//
// Library
import { KendoChartComp } from "components";
import * as S from "../styled/userMainstyled";
import { reducerState } from "../common";
import {
    MainNewTopCardComponent,
    ProjectFromModalComp,
    UserMainBtmCardComponent,
} from "../components";
import {
    GetEdmsProgProjectList,
    GetProjectManager,
    GetMainTop,
    GetMainChartList,
} from "../common/action";
import moment, { Moment } from "moment";
import { useLocations } from "hooks";

//

// card data
const TOP_CARD_CONSTANT = [
    // {
    //     title: "내 문서",
    //     subTitle: "Document List",
    //     keyStr: "My document",
    // },
    // {
    //     title: "DIN",
    //     subTitle: "Design Information Notice",
    //     keyStr: "DIN",
    // },
    {
        title: "문서회신",
        subTitle: "Design Review Notice",
        keyStr: "DRN",
    },
    {
        title: "TR",
        subTitle: "Transmittal Memorandom",
        keyStr: "TM",
    },
];
const category = ["DRN", "TR"];
const UserMainPage = () => {
    const dispatch = useDispatch();
    const { path } = useLocations();
    const pjSelector = useSelector((state: reducerState) => state.project);
    const workSelector = useSelector((state: reducerState) => state.work);
    const [projectFromVisible, setProjectFromVisible] = useState<boolean>(false);
    const [chartData, setChartData] = useState<any>(null);
    const [startDate, setStartDate] = useState<Date>();
    // new Date(new Date().setMonth(new Date().getMonth() - 1))
    const [endDate, setEndDate] = useState<Date>();
    const [chartCategory, setChartCategory] = useState<string[]>([]);

    useEffect(() => {
        let _startDate = moment("2021-01-01").toDate();
        let _endDate = moment().toDate();
        setStartDate(_startDate);
        setEndDate(_endDate);
        dispatch(GetEdmsProgProjectList());
        dispatch(GetProjectManager());
        // dispatch(GetMainChartList());
        // if (pjSelector.main_top_info == undefined) dispatch(GetMainTop());
    }, []);

    // useEffect(() => {
    //     if (path != undefined) dispatch(GetMainTop(path));
    // }, [path]);

    useEffect(() => {
        if (workSelector.main_chart_list && workSelector.main_chart_list.length > 0) {
            let _data;
            for (var d of workSelector.main_chart_list) {
                _data = {
                    DIN: d.DIN,
                    DRN: d.DRN,
                    TM: d.TM,
                    TR: d.TM,
                };
            }
            // setChartData(_data);
            checkChartData(_data);
        }
    }, [workSelector.main_chart_list]);

    useEffect(() => {
        if (endDate && startDate && moment(endDate).diff(startDate, "days") >= 0) {
            dispatch(
                GetMainChartList(
                    moment(startDate).format("YYYY-MM-DD HH:mm"),
                    moment(endDate).add(1, "days").format("YYYY-MM-DD HH:mm")
                )
            );
            dispatch(
                GetMainTop(
                    path,
                    moment(startDate).format("YYYY-MM-DD HH:mm"),
                    moment(endDate).add(1, "days").format("YYYY-MM-DD HH:mm")
                )
            );
        }
    }, [startDate, endDate]);

    const checkChartData = (data: any) => {
        let colors = ["#2196F3", "#4CAF50", "#F44336"];
        let names = ["검토 중", "완료", "기한 초과"];
        let categoryList = Array.from(category);
        let chartDataList = [];
        // 카테고리 정리
        Object.entries(data).map((d: any[]) => {
            let _category = d[0];
            if (category.indexOf(_category) != -1) {
                let values = d[1];
                if (
                    values.filter((v: string) => {
                        return v != "0";
                    }).length == 0
                ) {
                    categoryList.splice(category.indexOf(_category), 1);
                }
            }
        });
        setChartCategory(categoryList);
        // chart data 만들기
        for (let i: number = 0; i < 3; i++) {
            let _data: string[] = [];
            for (let j: number = 0; j < categoryList.length; j++) {
                let value = data[categoryList[j]];
                _data.push(value[i]);
            }
            if (
                _data.filter((v: string) => {
                    return v != "0";
                }).length > 0
            ) {
                chartDataList.push({
                    name: names[i],
                    color: colors[i],
                    data: _data,
                });
            }
        }
        // 만들고나서 데이터가 없는 경우 더미데이터 내보내기

        if (chartDataList.length > 0) {
            return setChartData(chartDataList);
        } else {
            let dummy_data = [
                {
                    name: "검토 중",
                    data: [0, 0],
                    color: "#2196F3",
                },
                {
                    name: "완료",
                    data: [0, 0],
                    color: "#4CAF50",
                },
                {
                    name: "기한 초과",
                    data: [0, 0],
                    color: "#F44336",
                },
            ];
            setChartCategory([]);
            return setChartData(dummy_data);
        }
    };

    const onCloseProjectForm = () => {
        setProjectFromVisible(false);
    };

    const onChangeDate = (date: any, type: "start" | "end") => {
        if (type == "start") {
            setStartDate(moment(date).toDate());
        } else if (type == "end") {
            setEndDate(moment(date).toDate());
        }
    };

    return (
        <S.Block className="main-page__container">
            <ProjectFromModalComp visible={projectFromVisible} onClose={onCloseProjectForm} />
            <S.ProjectContainer>
                {/* <MainNewTopCardComponent {...TOP_CARD_CONSTANT[0]} />
                <MainNewTopCardComponent {...TOP_CARD_CONSTANT[1]} /> */}
                {chartData != null && (
                    <S.chartDateDiv>
                        <S.Date
                            type="date"
                            id="date-picker-inline"
                            min="2017-01-01"
                            max="2030-12-31"
                            value={startDate ? moment(startDate).format("YYYY-MM-DD") : ""}
                            onChange={(e: any) => onChangeDate(e.target.value, "start")}
                        />
                        ~
                        <S.Date
                            type="date"
                            id="date-picker-inline"
                            min="2017-01-01"
                            max="2030-12-31"
                            value={endDate ? moment(endDate).format("YYYY-MM-DD") : ""}
                            onChange={(e: any) => onChangeDate(e.target.value, "end")}
                        />
                    </S.chartDateDiv>
                )}
                <S.ProjectWrap>
                    {pjSelector.drn_flag == true && (
                        <MainNewTopCardComponent {...TOP_CARD_CONSTANT[0]} />
                    )}
                    <MainNewTopCardComponent {...TOP_CARD_CONSTANT[1]} />
                    <S.BtmChartWrap>
                        {chartData != null && (
                            <S.BtmChartDiv>
                                <KendoChartComp
                                    style={{
                                        width: "100%",
                                        height: "95%",
                                        padding: "0 20px",
                                    }}
                                    areaStyle={{ background: "transparent" }}
                                    type="column"
                                    data={chartData}
                                    categories={chartCategory}
                                    title="업무 처리 현황"
                                    titleFont="1.4em sans-serif"
                                    labels={{
                                        visible: true,
                                        step: 1,
                                    }}
                                    legend={{ align: "end" }}
                                ></KendoChartComp>
                            </S.BtmChartDiv>
                        )}
                    </S.BtmChartWrap>
                </S.ProjectWrap>
            </S.ProjectContainer>
            <S.ChartContainer>
                <UserMainBtmCardComponent />
            </S.ChartContainer>
        </S.Block>
    );
};

export default UserMainPage;
