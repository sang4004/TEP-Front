/******************************************************************************
 * Copyright (c) 2021. Moornmo Inc. Rights reserved.                          *
 * Data modelings and methods used are assets of Moornmo Inc.                 *
 * hooks :
 * useLocations
 * components :
 *
 * last modify : jh.jeong
 *
 *
 ******************************************************************************/
import * as S from "../styled/mainNew.styled";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { reducerState } from "../common";

import { MainNewTopCardComponent, ProjectFromModalComp, CountPingComp } from "../components";
import {
    GetEdmsProgProjectList,
    GetProjectManager,
    GetMainTop,
    GetMainMiddle,
    GetMainBottom,
    GetBlockedWorkProcList,
    GetProjectDdayData,
} from "../common/action";
import { gridViewChildrenType, GridViewComponent, LoadingIndicatorComponent } from "components";
import { MainNewMidCardComponent } from "../components";
import { useLocations } from "hooks";

//image
import arrowBtnHoverSvg from "../images/btn/arrow_gray_hover.svg";

const TABLE_HEADER_LIST = ["No", "제목", "사용자명", "기한일", "경과일"];
const TABLE_HEADER_SIZE_LIST = [8, 50, 12, 20, 10];

const SELETE_BOX_ITEM = ["진척율(W/V)"]; //, "예상종료일"];

// card data
const TOP_CARD_CONSTANT: { title: string; subTitle: string; keyStr: string }[] = [
    {
        title: "DIN",
        subTitle: "Design Information Notice",
        keyStr: "DIN",
    },
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
    {
        title: "내문서",
        subTitle: "Document List",
        keyStr: "My document",
    },
];

const tableHeadSize = [0.5, 1, 1, 1, 1, 1, 0.5];
const tableHeadType = [1, 0, 1, 1, 1, 1, 1, 1, 1];
const tableHeader = ["Project", "Discipline", "Start", "IFA", "AFC", "As-Built Approval", "Total"];

const MainPageNew = () => {
    const { path } = useLocations();
    const dispatch = useDispatch();
    const pjSelector = useSelector((state: reducerState) => state.project);
    const psSelector = useSelector((state: reducerState) => state.projectsettings);
    const docuSelector = useSelector((state: reducerState) => state.document);
    const [mainBtm, setMainBtm] = useState<any[]>([]);
    const [tableChild, setTableChild] = useState<gridViewChildrenType>();
    const [expand, setExpand] = useState<boolean>(true);
    const [secondExpand, setSeconedExpand] = useState<boolean>(false);
    const [data, setData] = useState<any[]>([]);
    const [selectNumber, setSelectNumber] = useState<number>(0);
    const [projDdayData, setProjDdayData] = useState<any[]>([]);
    const [blockedData, setBlockedData] = useState<any[]>([]);

    useEffect(() => {
        dispatch(GetEdmsProgProjectList());
        dispatch(GetProjectManager());
        // dispatch(GetBlockedWorkProcList());
        // dispatch(GetProjectDdayData());
        //dispatch(GetProjectProgressRate());
        if (docuSelector.edms_main_bottom == undefined) dispatch(GetMainBottom());
        if (docuSelector.edms_main_middle == undefined) dispatch(GetMainMiddle());
    }, []);

    useEffect(() => {
        if (path != undefined) dispatch(GetMainTop(path));
    }, [path]);

    //병목현상 wp
    // useEffect(() => {
    //     if (psSelector.blocked_wp_list && psSelector.blocked_wp_list.length > 0) {
    //         setBlockedData([...psSelector.blocked_wp_list]);
    //     }
    // }, [psSelector.blocked_wp_list]);

    useEffect(() => {
        if (psSelector.project_dday_data && psSelector.project_dday_data.length > 0) {
            setProjDdayData([...psSelector.project_dday_data]);
        }
    }, [psSelector.project_dday_data]);

    useEffect(() => {
        if (docuSelector.edms_main_middle) {
            let cnt = 0;
            let allcnt = 0;
            let data = [];
            for (var l of docuSelector.edms_main_middle) {
                cnt += parseInt(l.cnt);
                allcnt += parseInt(l.allCnt);
                let rateTotal = (parseInt(l.cnt) / parseInt(l.allCnt)) * 100;
                data.push({
                    project_no: l.project_no,
                    project_name: l.project_name,
                    rate: rateTotal > 0 && rateTotal < 1 ? 1 : rateTotal,
                });
            }
            data.unshift({
                project_no: 0,
                project_name: "전체",
                rate: Math.round((cnt / allcnt) * 100),
            });
            setData(data);
        }
    }, [docuSelector.edms_main_middle]);

    useEffect(() => {
        if (pjSelector.get_prog_project_list && pjSelector.get_prog_project_list.length > 0) {
            let total = 0;
            let count = 0;
            for (var proj of pjSelector.get_prog_project_list) {
                count += 1;
                total += proj.rate ? proj.rate : 0;
            }
            if (total > 0) total = Math.floor(total / count);
        }
    }, [pjSelector.get_prog_project_list]);

    useEffect(() => {
        let children: gridViewChildrenType = {};
        for (var s of tableHeader) {
            if (s != "Project" && s != "Discipline" && s != "Total") {
                Object.assign(children, {
                    [s]: [
                        { field: `${s} Plan`, title: "Plan", headerClassName: "align-center" },
                        {
                            field: `${s} Forecast`,
                            title: "Forecast",
                            headerClassName: "align-center",
                        },
                        { field: `${s} Actual`, title: "Actual", headerClassName: "align-center" },
                    ],
                });
            }
        }
        setTableChild(children);
        if (docuSelector.edms_main_bottom && docuSelector.edms_main_bottom.length > 0) {
            //let tempMainBtm = [...docuSelector.edms_main_bottom];
            //const temp = tempMainBtm.splice(-1);
            //tempMainBtm.splice(0, 0, temp[0]);
            let list = [];
            for (var data of docuSelector.edms_main_bottom) {
                list.push({
                    Project: data.project_name,
                    Discipline:
                        data.is_vp == 1 ? "(VP)" + data.discipline_name : data.discipline_name,

                    "Start Plan": data.start_plan,
                    "Start Forecast": data.start_actual,
                    "Start Actual": data.start_forecast,

                    "IFA Plan": data.IFA_plan,
                    "IFA Forecast": data.IFA_actual,
                    "IFA Actual": data.IFA_forecast,

                    "AFC Plan": data.AFC_plan,
                    "AFC Forecast": data.AFC_acutal,
                    "AFC Actual": data.AFC_forecast,

                    "As-Built Approval Plan": data.As_B_A_paln,
                    "As-Built Approval Forecast": data.As_B_A_actial,
                    "As-Built Approval Actual": data.As_B_A_forecast,

                    Total: data.Total,
                });
            }
            if (expand == true) {
                setMainBtm([...list]);
            } else {
                setMainBtm([]);
            }
        }
    }, [docuSelector.edms_main_bottom, expand]);

    // 버튼 전환
    const get_button_type = (expand: boolean, type: string) => {
        if (type == "grid") {
            return (
                <S.ExpandBtn $hover={expand == false} onClick={() => onClickchange(type)}>
                    <S.ExpandText>{expand == true ? "접기" : "펼치기"}</S.ExpandText>
                    <img src={arrowBtnHoverSvg} />
                </S.ExpandBtn>
            );
        } else if (expand == true && type == "list") {
            return (
                <S.ExpandBtn onClick={() => onClickchange(type)}>
                    <S.ExpandText>접기</S.ExpandText>
                    <img src={arrowBtnHoverSvg} />
                </S.ExpandBtn>
            );
        } else if (expand == false && type == "list") {
            return (
                <S.ExpandBtn $hover onClick={() => onClickchange(type)}>
                    <S.ExpandText>펼치기</S.ExpandText>
                    <img src={arrowBtnHoverSvg} />
                </S.ExpandBtn>
            );
        }
    };

    // expand boolean 값 전환
    const onClickchange = (type: string) => {
        if (type == "grid") {
            setExpand(!expand);
        } else if (secondExpand == true && type == "list") {
            setSeconedExpand(false);
        } else if (secondExpand == false && type == "list") {
            setSeconedExpand(true);
        }
    };

    return (
        <S.Block className="main-page__container">
            <style>
                {`
                    .k-grid table {
                        width : 100% !important;
                        margin : 0 -2px;
                    }
                `}
            </style>
            <S.inner>
                <S.ProjectContainer>
                    <MainNewTopCardComponent height="100%" {...TOP_CARD_CONSTANT[1]} />
                    <MainNewTopCardComponent height="100%" {...TOP_CARD_CONSTANT[2]} />
                    <S.ChartDiv>
                        {selectNumber == 0
                            ? data.map((raw: any, idx: number) => {
                                  return (
                                      <MainNewMidCardComponent
                                          key={raw.project_no}
                                          projNo={raw.project_no}
                                          idx={idx}
                                          data={raw}
                                      />
                                  );
                              })
                            : projDdayData.map((raw: any, idx: number) => {
                                  return (
                                      <MainNewMidCardComponent
                                          key={raw.project_no}
                                          projNo={raw.project_no}
                                          idx={idx}
                                          data={{ project_name: raw.project_name, rate: raw.per }}
                                          char={`D${raw.dday}`}
                                          label={"스테이지 W/V"}
                                          disableChart
                                      />
                                  );
                              })}
                    </S.ChartDiv>
                </S.ProjectContainer>

                <S.Bottom>
                    {/* <S.ExpandDiv>{get_button_type(expand, "grid")}</S.ExpandDiv> */}
                    <S.DocumentContainer>
                        <GridViewComponent
                            fullData={mainBtm}
                            titles={tableHeader}
                            keys={tableHeader}
                            datatype={tableHeadType}
                            values={Object.values(mainBtm)}
                            gridChildren={tableChild}
                            keysWidth={tableHeadSize}
                            rowClass="color-light-black"
                            headerClass="background-dark-sky-blue color-white align-center"
                            groupable
                            reorderable
                            gridStyle={
                                expand == true
                                    ? { height: "100%", width: "100%" }
                                    : { height: "fit-content", width: "100%" }
                            }
                            noRecordsMsg={
                                expand ? "표시할 내용이 없습니다." : "내용을 보시려면 펼쳐주세요"
                            }
                        />
                    </S.DocumentContainer>
                </S.Bottom>

                {/* <S.AdminHomeTaskList $isTbody={secondExpand}>
                    <S.ExpandDiv>{get_button_type(secondExpand, "list")}</S.ExpandDiv>
                    <table>
                        <thead>
                            <tr>
                                {TABLE_HEADER_LIST.map((raw, idx) => {
                                    return (
                                        <S.HeadText
                                            $cellSize={TABLE_HEADER_SIZE_LIST[idx]}
                                            key={raw}
                                        >
                                            {raw}
                                        </S.HeadText>
                                    );
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {secondExpand == true &&
                                blockedData.map((raw, idx) => {
                                    return <tr key={idx} style={{ cursor: "pointer" }}>
                                        <S.TableData $cellSize={TABLE_HEADER_SIZE_LIST[0]}>{raw.wp_idx}</S.TableData>
                                        <S.TableData $cellSize={TABLE_HEADER_SIZE_LIST[1]}>{raw.subject}</S.TableData>
                                        <S.TableData $cellSize={TABLE_HEADER_SIZE_LIST[2]}>{raw.username}</S.TableData>
                                        <S.TableData $cellSize={TABLE_HEADER_SIZE_LIST[3]}>{raw.due_to_date}</S.TableData>
                                        <S.TableData $cellSize={TABLE_HEADER_SIZE_LIST[4]}>{raw.diff_days}일</S.TableData>
                                    </tr>;
                                })}
                            {secondExpand == false && <span>내용을 보시려면 펼쳐주세요.</span>}
                        </tbody>
                    </table>
                </S.AdminHomeTaskList> */}
            </S.inner>
        </S.Block>
    );
};

export default MainPageNew;
