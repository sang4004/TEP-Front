/******************************************************************************
 * Copyright (c) 2021. Moornmo Inc. Rights reserved.                          *
 * Data modelings and methods used are assets of Moornmo Inc.                 *
 * hooks :
 * useLocations
 * components :
 *                                                                         455qq
 * last modify : jh.jeong
 *

 ******************************************************************************/
import { useDispatch, useSelector } from "react-redux"; // redux
import React, { useState, useEffect } from "react";

import { EdmsTreeViewComp } from "../components";
import { GridViewComponent, LoadingIndicatorComponent, gridViewChildrenType } from "components";
//library
//image
//
//util

import { reducerState } from "../common";
import { GetDocumentManager, GetWorkDclList } from "../common/action";

import * as S from "../styled/edmsDcllist.styled";
import searchIconSvg from "../images/icon/search_icon.svg";

import moment from "moment";

const tableHeadType = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
const tableHeadSize = [
    0.3, 0.3, 0.3, 0.25, 0.6, 0.5, 0.2, 0.8, 0.3, 0.8, 0.2, 0.2, 0.2, 0.2, 0.9, 1.1, 1.1, 1.1, 1.1,
    1.1, 1.1, 0.2, 0.2, 0.2,
];
const tableHeader = [
    "Project",
    "Project Type",
    "Discipline",
    "Area",
    "Doc.No",
    "카테고리",
    "파일타입",
    "파일이름",
    "Stage",
    "파일위치",
    "Revision",
    "Version",
    "작성자",
    "접근권한",
    "Doc Title",
    "Start",
    "IFA Issue",
    "IFA Approval",
    "AFC Issue",
    "AFC Approval",
    "As-Built Approval",
    "W/V (%)",
    "Plan (%)",
    "Actual (%)",
];

const stagecode = [
    "Start",
    "IFA Issue",
    "IFA Approval",
    "AFC Issue",
    "AFC Approval",
    "As-Built Approval",
];

const EdmsAchiveListPage = (props: any) => {
    const dispatch = useDispatch();
    const waSelector = useSelector((state: reducerState) => state.achieve);
    const nowDate = moment();

    const [checked, setChecked] = useState<number[]>([]);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [achieveList, setAchieveList] = useState<any[]>([]);

    const [tableChild, setTableChild] = useState<gridViewChildrenType>();
    const [selectedTreeItems, setSelectedTreeItems] = useState<any>(null);
    const [selectedType, setSelectedType] = useState<string>("");
    const [selectedNo, setSelectedNo] = useState<number>(-1);

    const [keyWord, setKeyWord] = useState<string>("");
    const [searchData, setSearchData] = useState<string>("");

    useEffect(() => {
        dispatch(GetWorkDclList());
        dispatch(GetDocumentManager());
    }, []);

    useEffect(() => {
        if (selectedNo && selectedNo != -1) {
            makeList();
        }
    }, [selectedNo]);

    useEffect(() => {
        makeList();
    }, [waSelector.work_dcl_list]);

    const makeList = () => {
        setIsLoading(true);
        let children: gridViewChildrenType = {};
        for (var s of stagecode) {
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
        setTableChild(children);

        let _achievelist = [];
        if (waSelector.work_dcl_list && waSelector.work_dcl_list.length > 0) {
            let data = waSelector.work_dcl_list;
            if (selectedNo != -1) {
                data = data.filter((raw: any) => {
                    if (selectedType == "category" || selectedType == "pcategory") {
                        return raw.cate_no == selectedNo;
                    } else if (selectedType == "discipline") {
                        return raw.discipline_id == selectedNo;
                    } else if (selectedType == "project") {
                        return raw.project_no == selectedNo;
                    }
                });
            }
            data.sort((a: any, b: any) => {
                return b.revision - a.revision;
            });
            if (data.length > 0) {
                for (var achieve of data) {
                    _achievelist.push({
                        no_list: {
                            docu_no: achieve.docu_no,
                        },
                        Stage: achieve.stage_code,
                        Project: achieve.project_name,
                        "Project Type": achieve.projtypename,
                        Discipline: achieve.dcl,
                        Area: achieve.area ? achieve.area : `no area`,
                        "Doc.No": achieve.docu_code,
                        카테고리: achieve.cate ? achieve.cate : "",
                        파일타입: get_file_type(achieve.file_type),
                        파일이름: achieve.file_name,
                        파일위치: achieve.repo_path,
                        Revision: achieve.fversion,
                        Version: achieve.file_code ? achieve.file_code.split(`_`)[2] : "",
                        작성자: achieve.create_by,
                        접근권한: "",
                        "Doc Title": achieve.docu_subject,
                        "Start Plan": getPFA(achieve.stage, `Start Plan`),
                        "Start Forecast": getPFA(achieve.stage, `Start Forecast`),
                        "Start Actual": getPFA(achieve.stage, `"Start Actual`),

                        "IFA Plan": getPFA(achieve.stage, `IFA Plan`),
                        "IFA Forecast": getPFA(achieve.stage, `IFA Forecast`),
                        "IFA Actual": getPFA(achieve.stage, `IFA Actual`),

                        "AFC Plan": getPFA(achieve.stage, `AFC Plan`),
                        "AFC Forecast": getPFA(achieve.stage, `AFC Forecast`),
                        "AFC Actual": getPFA(achieve.stage, `AFC Actual`),

                        "As-Built Approval Plan": getPFA(achieve.stage, `As-Built Approval Plan`),
                        "As-Built Approval Forecast": getPFA(
                            achieve.stage,
                            `As-Built Approval Forecast`
                        ),
                        "As-Built Approval Actual": getPFA(
                            achieve.stage,
                            `As-Built Approval Actual`
                        ),
                        "W/V (%)": 0.01,
                        "Plan (%)": 0.3,
                        "Actual (%)": 0.3,
                    });
                }
                setAchieveList([..._achievelist]);
            } else {
                setAchieveList([]);
            }
        } else if (waSelector.work_dcl_list && waSelector.work_dcl_list.length == 0) {
            setAchieveList([]);
        }
        setTimeout(() => {
            setIsLoading(false);
        }, 300);
        setChecked([]);
    };

    const getPFA = (stage_list: any[], code: string) => {
        let _code = code.split(` `);
        let type = ``;
        let date;
        if (_code[0] == `Start`) {
            date = _code[1];
        } else {
            type = _code[1] == `Issue` ? `i` : `a`;
            date = _code[2];
        }
        if (stage_list) {
            let filtered = stage_list.filter(
                raw => raw.stage_code == _code[0] && raw.stage_type == type
            );
            filtered.sort((a: any, b: any) => {
                return a.docu_no - b.docu_no;
            });
            if (filtered.length > 0) {
                switch (date) {
                    case `Plan`:
                        return filtered[0].plan_dt
                            ? moment(filtered[0].plan_dt).format(`YYYY-MM-DD`)
                            : ``;
                    case `Forecast`:
                        return filtered[0].forecast_dt
                            ? moment(filtered[0].forecast_dt).format(`YYYY-MM-DD`)
                            : ``;
                    case `Actual`:
                        return filtered[0].actual_dt
                            ? moment(filtered[0].actual_dt).format(`YYYY-MM-DD`)
                            : ``;
                }
            }
        } else return ``;
    };

    const onKeyPress = (e: any) => {
        if (e.key == "Enter" || e === "click") {
            setSearchData(keyWord);
        }
    };

    const onClickRow = async (idx: number, selectedRow: any) => {
        if (checked.indexOf(idx) != -1) checked.push(achieveList[idx].no_list.docu_no);
        else checked.splice(checked.indexOf(achieveList[idx].no_list.docu_no), 1);
        setChecked([...checked]);
    };

    const get_file_type = (file_type: string) => {
        switch (file_type) {
            case "001":
                return "도면";
            case "002":
                return "PDF";
            case "003":
                return "문서";
            default:
                return "파일없음";
        }
    };

    const onTreeItemClick = (event: any) => {
        //If category, show data, otherwise skip
        setSelectedType(event.item.type);
        setSelectedTreeItems(event.item);
        if (event.item.type == "project") {
            setSelectedNo(event.item.project_no);
        } else if (event.item.type == "discipline") {
            setSelectedNo(event.item.discipline_id);
        } else if (event.item.type === "category" || event.item.type === "pcategory") {
            setSelectedNo(event.item.cate_no);
        } else {
            setSelectedTreeItems(null);
        }
    };

    return (
        <>
            <style>
                {`
                     .k-grid table {
                         width : 80% !important;
                         margin : 0 -2px;
                     }
                     .k-grid td {
                         white-space : pre-wrap;
                     }
                 `}
            </style>
            <LoadingIndicatorComponent open={isLoading} style={{ zIndex: 100 }} />
            <S.DocumentWorklistContainer>
                <S.DocumentWorklistStruct>
                    <S.DocumentContentHeader>
                        <S.DocumentWorklistTableFolderTitle>
                            {selectedTreeItems && (
                                <div>
                                    <img src="assets/images/edms/worklist_dep3.svg" alt="" />
                                    <p>{selectedTreeItems.name}</p>
                                </div>
                            )}
                        </S.DocumentWorklistTableFolderTitle>
                    </S.DocumentContentHeader>
                    <S.DocumentTreeList>
                        <S.DocumentTreeViewBlock>
                            <EdmsTreeViewComp
                                onChangeTreeData={data => {}}
                                onTreeItemClick={onTreeItemClick}
                                searchData={searchData}
                                isSearch={true}
                            />
                        </S.DocumentTreeViewBlock>
                    </S.DocumentTreeList>
                </S.DocumentWorklistStruct>
                <S.DoucmentAchievelistTableBox>
                    <S.DocumentWorklistTableBoxHeader></S.DocumentWorklistTableBoxHeader>
                    {achieveList.length > 0 ? (
                        <S.GridViewWrap>
                            <GridViewComponent
                                fullData={achieveList}
                                titles={tableHeader}
                                keys={tableHeader}
                                values={Object.values(achieveList)}
                                keysWidth={tableHeadSize}
                                datatype={tableHeadType}
                                gridChildren={tableChild}
                                // rowClass="color-light-black"
                                headerClass="background-dark-sky-blue color-white align-center"
                                keysWidthTotal={6}
                                onClickRow={onClickRow}
                                pageable={true}
                                excelFilename={`${nowDate.format("YYYY-MM-DD")}_DCL`}
                            />
                        </S.GridViewWrap>
                    ) : (
                        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                            표시할 내용이 없습니다.
                        </div>
                    )}
                </S.DoucmentAchievelistTableBox>
            </S.DocumentWorklistContainer>
        </>
    );
};

export default EdmsAchiveListPage;
