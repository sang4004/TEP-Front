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
import { useHistory, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useLocations } from "hooks";

import { EdmsAchieveReviewModal, EdmsTreeViewComp } from "../components";
import {
    GridViewComponent,
    LoadingIndicatorComponent,
    gridViewChildrenType,
    ContextMenuComp,
    ModalInfo,
} from "components";
import { EdmsAchiveDownLoadModal } from "../components";
import { generateDclAchieveDownload, windowOpenByPopup, open3DModelFile } from "../common/utils";
//library
//image
//
//util
import * as S from "../styled/edmsDcllist.styled";

import { reducerState } from "../common";
import {
    GetDocumentManager,
    GetWorkDclList,
    GetTmCodeList,
    GetAllList,
    GetSerachCategoryList,
    GetEdmsDocuMasterList,
    GetHistory,
    SetHistory,
} from "../common/action";

import moment from "moment";

const tableHeadType = [-1, -1, -1, -1, 1, 0, -1, -1, -1, -1, 0, -1, -1, 1, 1, 1, 1, 1, 1, 1];
const tableHeadSize = [
    0.3, 0.3, 0.3, 0.25, 0.6, 0.5, 0.3, 0.25, 0.3, 0.5, 0.5, 0.2, 0.2, 1.1, 1.1, 1.1, 1.1, 0.2, 0.2,
    0.2,
];
const tableHeader = [
    "Project",
    "Project Type",
    "Discipline",
    "Area",
    "Doc No",
    "Doc Title",
    "Category",
    "Revision",
    "파일타입",
    "파일명",
    "파일위치",
    "작성자",
    "접근권한",
    "Start",
    "IFA",
    "AFC",
    "As-Built Approval",
    "W/V (%)",
    "Plan (%)",
    "Actual (%)",
];

const stagecode = ["Start", "IFA", "AFC", "As-Built Approval"];

const DCL_CONTEXT_MENU_ITEMS = [/*"문서 수정",*/ "성과물 다운로드", "성과물 리뷰", "성과물 보기"];

const EdmsDclListPage = (props: any) => {
    const dispatch = useDispatch();
    const { pno } = useParams<{ pno: string }>();
    const { path, searchParam } = useLocations();
    const { location } = useHistory();
    const waSelector = useSelector((state: reducerState) => state.achieve);
    const tmSelector = useSelector((state: reducerState) => state.tm);
    const userSelector = useSelector((state: reducerState) => state.user);
    const categorySelector = useSelector((state: reducerState) => state.category);
    const docuSelector = useSelector((state: reducerState) => state.document);
    const settingSelector = useSelector((state: reducerState) => state.projectsettings);
    const nowDate = moment();

    const [checked, setChecked] = useState<number[]>([]);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isClear, setIsClear] = useState<boolean>(false);
    const [achieveList, setAchieveList] = useState<any[]>([]);

    const [tableChild, setTableChild] = useState<gridViewChildrenType>();
    const [selectedTreeItems, setSelectedTreeItems] = useState<any>(null);
    const [selectedType, setSelectedType] = useState<string>("");
    const [selectedNo, setSelectedNo] = useState<number>(-1);
    const [fileDownModalVisible, setFileDownModalVisible] = useState<boolean>(false);
    const [trManager, setTrManager] = useState(false);
    const [selectType, setSelectType] = useState<string>("");
    const [extList, setExtList] = useState<any[]>([]);
    const [searchFileType, setSearchFileType] = useState<string>(" ");
    const [cateName, setCateName] = useState<string>("Category 선택");
    const [docuCode, setDocuCode] = useState<string>("Doc No 선택");
    const [cateNo, setCateNo] = useState<number>(-1);
    const [docuNo, setDocuNo] = useState<number>(-1);
    const [cateList, setCateList] = useState<any[]>([]);
    const [docuList, setDocuList] = useState<any[]>([]);
    const [searchType, setSearchType] = useState<number>(1);
    const [searchText, setSearchText] = useState<string>("");
    const [queryString, setQueryString] = useState<string>("");
    const [disciplineList, setDisciplineList] = useState<any[]>([]);
    const [disciplineNo, setDisciplineNo] = useState<number>(-1);
    //AchieveReview
    const [reviewModalVisible, setReviewModalVisible] = useState<boolean>(false);
    const [selectDocuNo, setSelectDocuNo] = useState<number>(-1);

    const project_no = parseInt(pno);

    const [page, setPage] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageTotal, setPageTotal] = useState<number>(0);
    //context
    const { contextMenuElement, onContextMenu } = ContextMenuComp({
        menu_id: "dcl_list",
        items: DCL_CONTEXT_MENU_ITEMS,
        onClickItem: data => onClickContextMenuItem(data),
    });
    //
    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 5000);
        let _searchText: string = "";
        let _searchType: number = -1;
        if (location.search != "") {
            let _queryString: string[] = [];
            let param_searchText: string | null = searchParam.get("searchText");
            let param_searchType: string | null = searchParam.get("searchType");
            if (param_searchText != null) {
                _searchText = param_searchText;
                setSearchText(`searchText=${searchText}`);
                _queryString.push(_searchText);
            }
            if (param_searchType != null) {
                _searchType = parseInt(param_searchType);
                setSearchType(_searchType);
                _queryString.push(`searchType=${_searchType}`);
            }
            setTimeout(() => {
                setQueryString(_queryString.join("&"));
            }, 100);
        }
        dispatch(
            GetWorkDclList(project_no, 0, disciplineNo, cateNo, docuNo, _searchType, _searchText)
        );
        dispatch(GetDocumentManager());
        dispatch(GetTmCodeList());
        dispatch(GetSerachCategoryList());
        dispatch(GetEdmsDocuMasterList());
        dispatch(GetAllList());
        setPageTotal(1);
        setSearchFileType(" ");
        clearSeletedTreeItem();
    }, [project_no]);

    useEffect(() => {
        if (settingSelector.discipline_list && project_no) {
            let _discipline = [];
            for (var disc of settingSelector.discipline_list) {
                if (disc.project_no == project_no && disc.is_vp == "0") {
                    _discipline.push({
                        discipline_no: disc.id,
                        discipline_name: disc.name,
                    });
                }
                setDisciplineList([..._discipline]);
            }
        }
    }, [settingSelector.discipline_list, project_no]);

    useEffect(() => {
        if (categorySelector.search_category_list && disciplineNo != -1) {
            setCateName("Category 선택");
            setDocuCode("Doc No 선택");
            setCateNo(-1);
            setDocuNo(-1);
            let _cate = [];
            _cate.push({
                cate_no: -1,
                cate_name: "Category 선택",
            });
            for (var cate of categorySelector.search_category_list) {
                if (cate.discipline_id == disciplineNo && cate.project_no == project_no) {
                    _cate.push({
                        cate_no: cate.cate_no,
                        cate_name: cate.cate_name,
                    });
                }
                setCateList([..._cate]);
            }
        } else if (disciplineNo == -1) {
            setCateName("Category 선택");
            setDocuCode("Doc No 선택");
            setDocuNo(-1);
            setDocuList([]);
            setCateNo(-1);
            setCateList([]);
        }
    }, [disciplineNo]);

    useEffect(() => {
        if (docuSelector.edms_doc_master_list && cateNo != -1) {
            setDocuCode("Doc No 선택");
            setDocuNo(-1);
            let _docu = [];
            _docu.push({
                docu_no: -1,
                docu_code: "Doc No 선택",
            });
            for (var docu of docuSelector.edms_doc_master_list) {
                if (docu.cate_no == cateNo && docu.project_no == project_no) {
                    _docu.push({
                        docu_no: docu.docu_no,
                        docu_code: docu.docu_code,
                    });
                }
                setDocuList([..._docu]);
            }
        } else if (cateNo == -1) {
            setDocuNo(-1);
            setDocuList([]);
            setDocuCode("Doc No 선택");
        }
    }, [cateNo]);

    useEffect(() => {
        if ((selectedNo && selectedNo != -1) || isClear) {
            onSearchDate();
            setIsClear(false);
        }
    }, [selectedNo, selectType]);

    useEffect(() => {
        makeList();
    }, [waSelector.work_dcl_list]);

    useEffect(() => {
        if (waSelector.ext_list.length > 0) {
            setExtList(waSelector.ext_list);
        }
    }, [waSelector.ext_list]);

    useEffect(() => {
        if (path) {
            setSelectedTreeItems(null);
            setSelectedNo(-1);
            setSelectedType("");
            setSearchText("");
        }
    }, [path]);

    //문서 담당자 확인
    useEffect(() => {
        if (tmSelector.tm_code_list && tmSelector.tm_code_list.length > 0) {
            let tm_user = tmSelector.tm_code_list.find(
                (raw: any) =>
                    raw.tm_user_id == userSelector.edms_user_id && raw.project_no == project_no
            );
            if (tm_user != undefined) {
                setTrManager(true);
            }
        }
    }, [tmSelector.tm_code_list]);

    useEffect(() => {
        makeList();
    }, [searchFileType]);

    const makeList = () => {
        setIsLoading(true);
        let children: gridViewChildrenType = {};
        let _queryString: string[] = [];
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

        let _achievelist: any[] = [];
        if (waSelector.work_dcl_list && waSelector.work_dcl_list.length > 0) {
            let data = waSelector.work_dcl_list;

            if (data.length > 0) {
                for (var achieve of data) {
                    if (selectedNo != -1) {
                        if (selectType == "category" || selectType == "pcategory") {
                            if (achieve.cate_no != selectedNo && achieve.pcate_no != selectedNo)
                                continue;
                        } else if (selectType == "discipline") {
                            if (achieve.discipline_id != selectedNo) continue;
                        } else if (selectType == "project") {
                            if (achieve.project_no != selectedNo) continue;
                        }
                        _queryString.push(`selectType=${selectType}`);
                    }
                    if (searchFileType != " " && achieve.file_ext != searchFileType) continue;
                    _achievelist.push({
                        docu_no: achieve.docu_no,
                        no_list: {
                            docu_no: achieve.docu_no,
                        },
                        // Stage: achieve.stage_code,
                        Project: achieve.project_name,
                        "Project Type": achieve.projtypename,
                        Discipline: achieve.dcl,
                        Area: achieve.area ? achieve.area : `no area`,
                        "Doc No": achieve.docu_code,
                        Category: achieve.cate ? achieve.cate : "",
                        Revision: achieve.revision,
                        file_no: achieve.file_no,
                        파일타입: get_file_type(achieve.file_type),
                        파일명: achieve.file_name,
                        파일위치: achieve.repo_path,
                        작성자: achieve.create_by,
                        접근권한: "",
                        "Doc Title": achieve.docu_subject,
                        "Start Plan": achieve[`Start_Plan`],
                        "Start Forecast": achieve[`Start_Forecast`],
                        "Start Actual": achieve[`Start_Actual`],

                        "IFA Plan": achieve[`IFA_Plan`],
                        "IFA Forecast": achieve[`IFA_Forecast`],
                        "IFA Actual": achieve[`IFA_Actual`],

                        "AFC Plan": achieve[`AFC_Plan`],
                        "AFC Forecast": achieve[`AFC_Forecast`],
                        "AFC Actual": achieve[`AFC_Actual`],

                        "As-Built Approval Plan": achieve[`As-Built_Approval_Plan`],
                        "As-Built Approval Forecast": achieve[`As-Built_Approval_Forecast`],
                        "As-Built Approval Actual": achieve[`As-Built_Approval_Actual`],
                        "W/V (%)": achieve.wv_rate,
                        "Plan (%)": achieve.plan_rate,
                        "Actual (%)": achieve.actual_rate,
                    });
                }
                setAchieveList([]);
                setTimeout(() => {
                    setAchieveList([..._achievelist]);
                }, 0);
            } else {
                setAchieveList([]);
            }
        } else if (waSelector.work_dcl_list && waSelector.work_dcl_list.length == 0) {
            setAchieveList([]);
        } else if (waSelector.work_dcl_list.length == undefined) {
        }
        setPageTotal(_achievelist.length);
        setTimeout(() => {
            setIsLoading(false);
        }, 300);
        setChecked([]);
    };

    const onClickRow = async (idx: number, selectedRow: any) => {
        if (checked.indexOf(idx) != -1) checked.push(achieveList[idx].no_list.docu_no);
        else checked.splice(checked.indexOf(achieveList[idx].no_list.docu_no), 1);
        setChecked([...checked]);
    };

    const onDoubleClickRow = async (selectedItem: any) => {
        const data = waSelector.work_dcl_list.find(
            (raw: any) => raw.docu_no == selectedItem.docu_no
        );
        if (
            data == undefined ||
            data.revision == undefined ||
            data.revision == null ||
            data.revision == "" ||
            data.revision == "미접수" ||
            data.file_no == -1
        ) {
            return ModalInfo(`${data.docu_subject}\n문서의 성과물이 존재하지 않습니다.`);
        } else {
            onClickPdfViewer(data);
        }
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
            setSelectType("project");
            setSelectedNo(event.item.project_no);
        } else if (event.item.type == "discipline") {
            setSelectType("discipline");
            setSelectedNo(event.item.discipline_id);
            setDisciplineNo(event.item.discipline_id);
        } else if (event.item.type === "pcategory") {
            let cate = categorySelector.search_category_list.filter((c: any) => {
                return c.cate_no == event.item.cate_no;
            })[0];
            if (cate.discipline_id != -1) {
                setDisciplineNo(cate.discipline_id);
            }
            setSelectType("pcategory");
            setSelectedNo(event.item.cate_no);
            setTimeout(() => {
                setCateName(event.item.name);
            }, 0);
        } else if (event.item.type === "category") {
            setSelectType("category");
            setSelectedNo(event.item.cate_no);
        } else {
            setSelectType("");
            setSelectedTreeItems(null);
        }
    };

    const onClickContextMenuItem = (contextData: any) => {
        const { selectedId, selectItem } = contextData;

        // if (trManager == false) return ModalInfo("권한이 없습니다.");

        let _docu_no = selectedId.no_list.docu_no;
        const data = waSelector.work_dcl_list.find((raw: any) => raw.docu_no == _docu_no);

        if (
            data == undefined ||
            data.revision == undefined ||
            data.revision == null ||
            data.revision == "" ||
            data.revision == "미접수" ||
            data.file_no == -1
        )
            return ModalInfo(data.docu_subject + "\n문서의 성과물이 존재하지 않습니다.");

        if (selectItem == 0) {
            if (_docu_no != null) {
                onClickDclAchieveDownload(_docu_no);
            }
        } else if (selectItem == 1) {
            onClickAchieveReview(_docu_no);
        } else if (selectItem == 2) {
            onClickPdfViewer(data);
        }
    };

    const onClickPdfViewer = (data: any) => {
        if (data) {
            // if (get_file_type(data.file_type) === "도면") {
            //     open3DModelFile(data.repo_path, data.file_no, userSelector.edms_user_id);
            // } else {
            windowOpenByPopup(
                `http://${window.location.host}/edms/pdfviewer/${data.file_no}?page_type=0`
            );
            // }
        } else {
            return ModalInfo("뷰어가 존재하지 않습니다.");
        }
    };

    const onClickAchieveReview = (_docu_no: number) => {
        setIsLoading(true);
        setSelectDocuNo(_docu_no);
        setTimeout(() => {
            setReviewModalVisible(true);
            setIsLoading(false);
        }, 2000);
    };

    const onClickDclAchieveDownload = async (_docu_no: number) => {
        await generateDclAchieveDownload(_docu_no, userSelector.edms_user_id);
    };

    const onSearchDate = () => {
        setIsLoading(true);
        setCurrentPage(1);
        let _searchText = searchText;
        if (/^\s+$/.test(_searchText)) _searchText = "";
        if (_searchText != "") setQueryString(`searchText=${_searchText}&searchType=${searchType}`);
        dispatch(
            GetWorkDclList(project_no, 0, disciplineNo, cateNo, docuNo, searchType, _searchText)
        );
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    };

    const clearSeletedTreeItem = () => {
        setSelectedTreeItems(null);
        setSelectedNo(-1);
        setSelectType("");
        setDisciplineNo(-1);
        setIsClear(true);
    };

    const onPageTotalChange = (total: number) => {
        if (pageTotal != total && total > 0) {
            setPageTotal(total);
            if (Math.floor(total / 20) + 1 < currentPage) {
                setCurrentPage(1);
            }
        }
    };

    const onPopAction = () => {
        let _queryString: string[] = [];
        let param_searchText: string | null = searchParam.get("searchText");
        let param_searchType: string | null = searchParam.get("searchType");
        if (param_searchText != null) {
            setSearchText(param_searchText);
            _queryString.push(`searchText=${param_searchText}`);
        }
        if (param_searchType != null) {
            setSearchType(parseInt(param_searchType));
            _queryString.push(`searchType=${param_searchType}`);
        }
        setQueryString(_queryString.join("&"));
        dispatch(
            GetWorkDclList(
                project_no,
                0,
                disciplineNo,
                cateNo,
                docuNo,
                param_searchType,
                param_searchText
            )
        );
    };

    return (
        <>
            <style>
                {`
                     .k-grid table {
                         width : 100% !important;
                         margin : 0 -2px;
                     }
                     .k-master-row  {
                        cursor:pointer;
                     }
                     .k-grid td {
                         white-space : pre-wrap;
                         padding : 6px 8px !important;
                     }
                     .k-toolbar {
                         height : 50px;
                         margin-right : 10px;
                     }
                     .k-treeview .k-in, .k-treeview .k-state-focused {
                         border : none !important;
                         box-shadow : none !important;
                     }    
                 `}
            </style>
            {contextMenuElement}
            <LoadingIndicatorComponent open={isLoading} style={{ zIndex: 100 }} />
            <EdmsAchiveDownLoadModal
                visible={fileDownModalVisible}
                onClose={() => setFileDownModalVisible(false)}
                projectNo={project_no}
                type={"DCL"}
            />
            <EdmsAchieveReviewModal
                visible={reviewModalVisible}
                onClose={() => setReviewModalVisible(false)}
                docuNo={selectDocuNo}
            />
            <S.DocumentWorklistContainer>
                <S.DocumentSearchButtonDiv>
                    <S.SearchType
                        value={searchFileType}
                        onChange={(e: any) => setSearchFileType(e.target.value)}
                        disableUnderline={true}
                    >
                        <S.InputSelectItem value={" "}>확장자 선택</S.InputSelectItem>;
                        {extList &&
                            extList.map((ext: any, i) => {
                                return (
                                    <S.InputSelectItem value={ext.file_ext}>
                                        {ext.file_ext}
                                    </S.InputSelectItem>
                                );
                            })}
                    </S.SearchType>

                    <S.FormType
                        $flex={0.4}
                        value={disciplineNo}
                        onChange={(e: any) => {
                            setSelectType("discipline");
                            setSelectedNo(e.target.value);
                            setDisciplineNo(parseInt(e.target.value));
                        }}
                        disableUnderline={true}
                    >
                        <S.InputSelectItem value={-1}>{"Discipline 선택"}</S.InputSelectItem>
                        {disciplineList &&
                            disciplineList.map((val: any, idx: number) => {
                                return (
                                    <S.InputSelectItem
                                        value={val.discipline_no}
                                        key={val.discipline_name + idx}
                                    >
                                        {val.discipline_name}
                                    </S.InputSelectItem>
                                );
                            })}
                    </S.FormType>

                    <S.InputAutoComplete
                        value={cateName}
                        onChange={(e: any, newVal: any) => {
                            setCateName(newVal);
                            let cate = cateList.find(raw => raw.cate_name === newVal);
                            if (cate) {
                                setCateNo(cate.cate_no);
                                setSelectType("pcategory");
                                setSelectedNo(cate.cate_no);
                            }
                        }}
                        options={cateList.map(raw => {
                            return raw.cate_name;
                        })}
                        renderInput={params => (
                            <S.TextFieldBlock
                                {...params}
                                InputProps={{
                                    ...params.InputProps,
                                    disableUnderline: true,
                                }}
                            />
                        )}
                    />
                    <S.InputAutoComplete
                        value={docuCode}
                        onChange={(e: any, newVal: any) => {
                            setDocuCode(newVal);
                            let docu = docuList.find(raw => raw.docu_code === newVal);
                            if (docu) setDocuNo(docu.docu_no);
                        }}
                        options={docuList.map(raw => {
                            return raw.docu_code;
                        })}
                        renderInput={params => (
                            <S.TextFieldBlock
                                {...params}
                                InputProps={{
                                    ...params.InputProps,
                                    disableUnderline: true,
                                }}
                            />
                        )}
                    />
                    <S.SearchType
                        value={searchType}
                        onChange={(e: any) => setSearchType(parseInt(e.target.value))}
                        disableUnderline={true}
                    >
                        <S.InputSelectItem value={1}>파일명</S.InputSelectItem>
                        <S.InputSelectItem value={2}>Doc Title</S.InputSelectItem>
                        <S.InputSelectItem value={3}>Doc No</S.InputSelectItem>
                    </S.SearchType>
                    <S.SearchText
                        value={searchText}
                        onChange={e => setSearchText(e.target.value)}
                        onKeyUp={e => {
                            if (e.key == `Enter`) onSearchDate();
                        }}
                        InputProps={{
                            disableUnderline: true,
                        }}
                    />
                    <S.SearchBtn onClick={() => onSearchDate()}>검색하기</S.SearchBtn>
                </S.DocumentSearchButtonDiv>
                <S.DclListDiv>
                    <S.DocumentWorklistStruct>
                        <S.DocumentTreeList>
                            <S.DocumentTreeViewBlock>
                                <EdmsTreeViewComp
                                    onChangeTreeData={data => {}}
                                    onTreeItemClick={onTreeItemClick}
                                    filtered={{ project: { visibile: true, no: [project_no] } }}
                                    isSearch
                                    dataType="DCL"
                                    isCloseDocument={true}
                                    isSelectItem={{
                                        selectType: selectType,
                                        selectedNo: selectedNo,
                                    }}
                                    expand={{ ids: ["0"], idFiled: "id" }}
                                    isHeader={true}
                                    selectedHeaderItem={selectedTreeItems}
                                    clearSeletedTreeItem={clearSeletedTreeItem}
                                />
                            </S.DocumentTreeViewBlock>
                        </S.DocumentTreeList>
                    </S.DocumentWorklistStruct>
                    <S.DoucmentAchievelistTableBox>
                        <S.GridViewWrap>
                            <GridViewComponent
                                titles={tableHeader}
                                keys={tableHeader}
                                values={Object.values(achieveList)}
                                fullData={achieveList}
                                keysWidth={tableHeadSize}
                                datatype={tableHeadType}
                                gridChildren={tableChild}
                                headerClass="background-dark-sky-blue color-white align-center"
                                // rowClass="background-color-white color-light-black"
                                keysWidthTotal={6}
                                onDoubleClickRow={onDoubleClickRow}
                                onPageTotalChange={onPageTotalChange}
                                onClickRow={onClickRow}
                                pageable={true}
                                excelFilename={`${nowDate.format("YYYY-MM-DD")}_DCL`}
                                onContextMenu={onContextMenu}
                                isCustomBtn
                                customBtnText={["일괄 다운로드"]}
                                onClickCustomBtn={() => setFileDownModalVisible(true)}
                                selectKey={"docu_no"}
                                isSelectFake
                                isSelect
                                queryString={queryString}
                                nowPageSize={pageTotal}
                                noRecordsMsg={"표시할 내용이 없습니다."}
                                onPageChange={(skip: number, take: number, currentPage: number) => {
                                    setPage(skip);
                                }}
                                onPopAction={onPopAction}
                                historyRecord
                            />
                        </S.GridViewWrap>
                    </S.DoucmentAchievelistTableBox>
                </S.DclListDiv>
            </S.DocumentWorklistContainer>
        </>
    );
};

export default EdmsDclListPage;
