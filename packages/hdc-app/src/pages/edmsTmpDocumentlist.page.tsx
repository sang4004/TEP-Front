/******************************************************************************
 * Copyright (c) 2021. Moornmo Inc. Rights reserved.                          *
 * Data modelings and methods used are assets of Moornmo Inc.                 *
 * hooks :
 * useLocations
 * components :
 *
 * last modify : jh.jeong
 *

 ******************************************************************************/
import { useDispatch, useSelector } from "react-redux"; // redux
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useLocations } from "hooks";

import {
    EdmsDocuPublishModal,
    EdmsDocumentUploadModal,
    EdmsMydocuToolbar,
    EdmsMydocuFileHistoryModal,
    EdmsFileUploadModal,
    EdmsTmModal,
    EdmsStageModal,
    FileUploadModalComp,
} from "../components";
import {
    GridViewComponent,
    LoadingIndicatorComponent,
    ToastComponent,
    ContextMenuComp,
    ModalInfo,
} from "components";
//library
//image
//
//util
import * as S from "../styled/edmsTmpDocumentlist.styled";
import * as T from "../styled/edmsProject.styled";

import { reducerState } from "../common";
import { digitalTwinDomain } from "../common/network";
import { getExcelFileByType, windowOpenByPopup, open3DModelFile } from "../common/utils";
import {
    GetDocumentManager,
    GetWorkTmpBoxList,
    GetFilesList,
    GetTmCode,
    GetEdmsProgProjectList,
    GetNativeFileList,
    GetSerachCategoryList,
    GetEdmsDocuMasterList,
} from "../common/action";
import { getAuthority } from "../common/getauth";

import moment from "moment";

const tableHeadType = [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1];
const tableHeadSize = [0.4, 0.4, 0.8, 1, 2, 0.3, 0.8, 1.8, 0.4, 0.9, 0.3];
const tableHeader = [
    "프로젝트",
    "분야",
    "카테고리",
    "Doc.No",
    "문서",
    "revision",
    "파일코드",
    "파일이름",
    "파일타입",
    "문서단계",
    "작성자",
];

const CONTEXT_MENU_ITEMS = [
    "문서검토의견",
    // "버전 관리",
    "문서검토",
    // "DIN",
    // "DRN",
    "TR",
    // "성과물등록",
    // "스테이지 변경",
];

const ROW_COLORS = ["#eee", "#FFF"];
const PAGE_SIZE = 20;
const EdmsTmpDocumentListPage = (props: any) => {
    const dispatch = useDispatch();
    const workSelector = useSelector((state: reducerState) => state.work);
    const projSelector = useSelector((state: reducerState) => state.project);
    const userSelector = useSelector((state: reducerState) => state.user);
    const tmSelector = useSelector((state: reducerState) => state.tm);
    const authSelector = useSelector((state: reducerState) => state.authority);
    const pjSelector = useSelector((state: reducerState) => state.project);
    const categorySelector = useSelector((state: reducerState) => state.category);
    const docuSelector = useSelector((state: reducerState) => state.document);

    const { replace, location, action, push } = useHistory();
    const { searchParam } = useLocations();
    const [checked, setChecked] = useState<number[]>([]);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [file, setFile] = useState<any>({});
    const [skip, setSkip] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [queryString, setQueryString] = useState<string>("");

    const [visibleToast, setVisibleToast] = useState<boolean>(false);
    const [visibleToastSecond, setVisibleToastSecond] = useState<boolean>(false);
    const [fileHistoryModalVisible, setFileHistoryVisible] = useState<boolean>(false);
    const [docuUploadModalVisible, setDocuUploadModalVisible] = useState<boolean>(false);
    // const [fileUploadModalVisible, setFileUploadModalVisible] = useState<boolean>(false);
    const [exfileUploadModalVisible, setExFileUploadModalVisible] = useState<boolean>(false);
    const [projectTreeModalVisible, setProjectTreeModalVisible] = useState<boolean>(false);
    const [tmModalVisible, setTmModalVisible] = useState<boolean>(false);
    const [stageModalVisible, setStageModalVisible] = useState<boolean>(false);

    const [state, setState] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [workList, setWorkList] = useState<any[]>([]);
    const [workListKeys, setWorkListKeys] = useState<any[]>([]);
    const { contextMenuElement, onContextMenu } = ContextMenuComp({
        menu_id: "tmp_doc_list",
        items: CONTEXT_MENU_ITEMS,
        onClickItem: data => onClickContextMenuItem(data),
    });
    const [pageSize, setPageSize] = useState<number>(0);

    //TODO: SelectedTreeItem type -> something but any
    const [selectedFunc, setSelectedFunc] = useState<number>(-1);
    const [selectedDocuNo, setSelectedDocuNo] = useState<number>(-1);
    const [selectedDocuSub, setSelectedDocuSub] = useState<string>("");
    const [selectedFileNo, setSelectedFileNo] = useState<number>(-1);

    const [workTmpBoxList, setWorkTmpBoxList] = useState<any[]>([]);

    //Search
    const [searchData, setSearchData] = useState<string>("");
    const [selectedType, setSelectedType] = useState<number>(1);
    const [projectTypeList, setProjectTypeList] = useState<any[]>([]);
    const [projectTypeNo, setProejctTypeNo] = useState<number>(-1);
    const [categoryList, setCategoryList] = useState<any[]>([]);
    const [cateNo, setCateNo] = useState<number>(-1);
    const [docuList, setDocuList] = useState<any[]>([]);
    const [docuNo, setDocuNo] = useState<number>(-1);
    const [cateName, setCateName] = useState<string>("카테고리 선택");
    const [docuCode, setDocuCode] = useState<string>("문서코드 선택");

    useEffect(() => {
        let skip: number = 0;
        let _searchData: string = "";
        let _selectedType: number = -1;
        if (location.search != "") {
            //방문한적이있음
            setQueryString(location.search.replace(/^\?/, ""));
            let skipStr: string | null = searchParam.get("skip");
            let selectedTypeStr: string | null = searchParam.get("selectedType");
            let searchText: string | null = searchParam.get("searchText");
            if (skipStr) {
                skip = parseInt(skipStr);
                setSkip(skip);
            }
            if (selectedTypeStr && selectedTypeStr != "") {
                _selectedType = parseInt(selectedTypeStr);
                setSelectedType(_selectedType);
                if (searchText) {
                    _searchData = searchText;
                    setSearchData(searchText);
                }
            }
        }
        (async () => {
            await dispatch(
                GetWorkTmpBoxList(
                    false,
                    true,
                    skip,
                    PAGE_SIZE,
                    projectTypeNo,
                    cateNo,
                    docuNo,
                    _selectedType,
                    _searchData
                )
            );
        })();
        getData();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    useEffect(() => {
        if (tmSelector.tm_code) {
            setIsAdmin(true);
        }
    }, [tmSelector.tm_code]);
    //

    useEffect(() => {
        if (projectTypeList.length == 0) {
            setProjectTypeList(pjSelector.project_type_list);
        }
    }, [pjSelector.project_type_list]);

    useEffect(() => {
        if (
            categorySelector.search_category_list &&
            categorySelector.search_category_list.length > 0 &&
            projectTypeNo != -1
        ) {
            setCateName("카테고리 선택");
            setDocuCode("문서코드 선택");
            setCateNo(-1);
            setDocuNo(-1);
            let _list = [];
            _list.push({
                cate_no: -1,
                cate_name: "카테고리 선택",
            });
            for (var cate of categorySelector.search_category_list) {
                if (cate.project_no == projectTypeNo) {
                    _list.push({
                        cate_no: cate.cate_no,
                        cate_name: cate.cate_name,
                    });
                }
                setCategoryList([..._list]);
            }
        } else if (projectTypeNo == -1) {
            setCateName("카테고리 선택");
            setDocuCode("문서코드 선택");
            setDocuNo(-1);
            setDocuList([]);
            setCateNo(-1);
            setCategoryList([]);
        }
    }, [projectTypeNo]);

    useEffect(() => {
        if (docuSelector.edms_doc_master_list && cateNo != -1) {
            setDocuCode("문서코드 선택");
            setDocuNo(-1);
            let _docu = [];
            _docu.push({
                docu_no: -1,
                docu_code: "문서코드 선택",
            });
            for (var docu of docuSelector.edms_doc_master_list) {
                if (docu.cate_no == cateNo) {
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
            setDocuCode("문서코드 선택");
        }
    }, [cateNo]);

    // 문서 등록 시 새로고침
    useEffect(() => {
        let result = workSelector.create_my_document_data;
        if (result != undefined && result.result) {
            if (workSelector.create_my_document_data) {
                dispatch(GetWorkTmpBoxList(false, true, skip, PAGE_SIZE));
                setIsLoading(true);
                setTimeout(() => {
                    setIsLoading(false);
                }, 5000);
            }
        }
    }, [workSelector.create_my_document_data]);

    useEffect(() => {
        makeList();
        setWorkTmpBoxList(workSelector.work_tmp_box_list);
        setPageSize(workSelector.work_tmp_box_list_length);
    }, [workSelector.work_tmp_box_list]);

    const makeList = () => {
        setIsLoading(true);
        let _tmplist = [];

        if (workSelector.work_tmp_box_list && workSelector.work_tmp_box_list.length > 0) {
            let data = workSelector.work_tmp_box_list;
            if (data.length > 0) {
                for (var tmp of data) {
                    _tmplist.push({
                        docu_no: tmp.docu_no,
                        no_list: {
                            docu_no: tmp.docu_no,
                            file_no: tmp.file_no,
                            cate_no: tmp.cate_no,
                            auth: tmp.auth,
                        },
                        proj_name: tmp.project_name,
                        discipline_name: tmp.disc_name,
                        cate_name: tmp.cate_name,
                        docu_code: tmp.docu_code,
                        docu_subject: tmp.docu_subject,
                        revision: tmp.revision,
                        file_code: tmp.file_code,
                        file_name: tmp.file_name,
                        file_type: tmp.file_type,
                        status: {
                            stage: tmp.stage,
                            first_dt_name: tmp.first_dt_name,
                            first_dt: tmp.first_dt,
                        },
                        create_by: tmp.create_by,
                    });
                }
                setWorkList([..._tmplist]);
                let _keys = Object.keys(_tmplist[0]).filter((raw, idx) => idx != 0 && idx != 1);
                setWorkListKeys(_keys);
                if (
                    currentPage >
                    Math.floor(workSelector.work_tmp_box_list_length / PAGE_SIZE) + 1
                ) {
                    setCurrentPage(1);
                    setSkip(0);
                }
                setPageSize(workSelector.work_tmp_box_list_length);
            } else {
                setWorkList([]);
            }
            setIsLoading(false);
        } else if (workSelector.work_tmp_box_list && workSelector.work_tmp_box_list.length == 0) {
            setWorkList([]);
        }
        setChecked([]);
    };

    const createCustomEl = (idx: number, dataIdx?: number) => {
        if (workList.length != 0) {
            if (dataIdx != undefined && workList.length <= dataIdx) return null;
            if (idx === 8) {
                if (dataIdx == undefined) return true;
                let data = workList[dataIdx].wptype;
                let nos = workList[dataIdx].no_list;
                return (
                    <T.TableTd style={{ backgroundColor: `${ROW_COLORS[nos.auth]}` }}>
                        <S.StatusDiv>
                            <S.wpType $wpType={data ? data : ``}>{data ? data : `임시`}</S.wpType>
                        </S.StatusDiv>
                    </T.TableTd>
                );
            } else if (idx === 9) {
                if (dataIdx == undefined) return true;
                let data = workList[dataIdx].status;
                let nos = workList[dataIdx].no_list;
                return (
                    <T.TableTd style={{ backgroundColor: `${ROW_COLORS[nos.auth]}` }}>
                        <S.StatusDiv>
                            <S.Stage>{data.stage}</S.Stage>
                            <S.ActualDate>
                                {data.first_dt_name ? data.first_dt_name : ``}{" "}
                                {data.first_dt ? moment(data.actual_dt).format(`YYYY-MM-DD`) : ``}
                            </S.ActualDate>
                        </S.StatusDiv>
                    </T.TableTd>
                );
            }
        }

        return null;
    };

    const onCheckChange = (selectItems: any) => {
        let docus = Object.keys(selectItems);
        let checked: number[] = [];
        for (var docu of docus) if (selectItems[docu] === true) checked.push(parseInt(docu));
        setChecked([...checked]);
    };

    const onClickWorkProc = (type: string, selectItem?: number) => {
        let is_check = isCheck();

        if (selectItem == undefined) {
            if (checked.length == 0) {
                setVisibleToast(true);
                setTimeout(() => {
                    setVisibleToast(false);
                }, 2000);
                return;
            }
        }
        if (is_check) {
            setState(type);
            setProjectTreeModalVisible(true);
        }
    };

    const onCloseModal = () => {
        setProjectTreeModalVisible(false);
        // setEdmsRevisionModalVisible(false);
    };

    const onCloseFileHistoryModal = async () => {
        setFileHistoryVisible(false);
    };

    const onClickFileHistroyvisible = async () => {
        setFileHistoryVisible(true);
    };

    const onClickDocuUpload = () => {
        setDocuUploadModalVisible(true);
    };

    const onCloseDocuUpload = () => {
        setDocuUploadModalVisible(false);
    };

    // const onClikcFileUploadvisible = async (idx?: number) => {
    //     // if (idx) {
    //     setFileUploadModalVisible(true);
    //     // }
    // };

    // const onCloseFileUploadModal = async () => {
    //     setFileUploadModalVisible(false);
    // };

    const onClikcExFileUploadvisible = async () => {
        setExFileUploadModalVisible(true);
    };

    const onCloseExFileUploadModal = async () => {
        setExFileUploadModalVisible(false);
    };

    const isCheck = () => {
        if (checked.length != 0) {
            let is_check: boolean = true;
            let check_project_type: any[] = [];

            checked.map((check: any, idx: number) => {
                let projectType = workTmpBoxList.find((workTmp: any) => workTmp.docu_no == check);

                if (idx == 0) {
                    check_project_type.push(projectType.project_no);
                } else {
                    if (check_project_type[0] != projectType.project_no) {
                        is_check = false;
                        ModalInfo("서로 다른 프로젝트의 파일이 선택되었습니다.");
                        return is_check;
                    }
                }
            });

            return is_check;
        }
        return true;
    };

    const onClickTmModal = () => {
        let is_check = isCheck();

        if (is_check) {
            if (isAdmin) {
                if (tmModalVisible) {
                    setTmModalVisible(false);
                    setTimeout(() => {
                        setTmModalVisible(true);
                    }, 0);
                } else {
                    setTmModalVisible(true);
                }
            } else ModalInfo("권한이 없습니다. 관리자에게 문의하세요.");
        }
    };

    const onCloseTmModal = () => {
        setTmModalVisible(false);
    };

    // const onClickStageModal = (selectItem?: number) => {
    //     if (selectItem == undefined) {
    //         if (checked.length == 0) {
    //             setVisibleToast(true);
    //             setTimeout(() => {
    //                 setVisibleToast(false);
    //             }, 2000);
    //             return;
    //         }
    //     }
    //     setStageModalVisible(true);
    // };

    const onCloseStageModal = () => {
        setStageModalVisible(false);
    };

    // const get_file_type = (file_type: string) => {
    //     switch (file_type) {
    //         case "001":
    //             return "도면";
    //         case "002":
    //             return "PDF";
    //         case "003":
    //             return "문서";
    //         default:
    //             return "파일없음";
    //     }
    // };

    const handleChange = (e: any) => {
        let auth: any[] = [];
        let notAuth: any[] = [];
        let notAuthItem: any;

        let isAuth =
            workList.filter((raw, idx) => {
                let checkAuth = checked.indexOf(raw.no_list.docu_no) != -1 && raw.no_list.auth == 0;
                if (checkAuth) notAuthItem = raw;
                return checkAuth;
            }).length == 0;

        workList.map((raw, idx) => {
            if (checked.indexOf(raw.no_list.docu_no) != -1) {
                if (raw.no_list.auth == 1) auth.push(raw);
                else if (raw.no_list.auth == 0) notAuth.push(raw);
            }
        });

        setSelectedFunc(-1);
        let funcNo = e.target.value;
        //DIN 예외처리 및 권한이 없을경우 확인 불가
        if (funcNo == 1 && isAuth == false)
            return ModalInfo(
                `권한이 없는 파일이 선택되어 있습니다.\n\n\n${notAuthItem.docu_subject}`
            );
        if (funcNo == 0) onClickDetailView("comment");
        // if (funcNo == 1) onClickDetailView("ㄹrevision");
        if (funcNo == 1) onClickPdfViewer();
        // if (funcNo == 3 && auth.length != 0 && notAuth.length != 0)
        //     return ModalInfo("같은 권한의 문서만 선택해 주세요");
        if (funcNo == 2) onClickTmModal();
        // if (funcNo == 7) onClickStageModal();
        else if (funcNo > 1 && funcNo != 3 && funcNo != 5)
            onClickWorkProc(CONTEXT_MENU_ITEMS[funcNo]);
    };

    const onClickDetailView = (type: string, selectItem?: number) => {
        let index = selectItem != undefined ? selectItem : checked[0];
        let data;
        let auth;
        let data_list: any[] = [];
        if (selectItem == undefined) {
            let tmp: any;
            // CheckBox 선택 확인
            if (checked.length == 0) {
                setVisibleToast(true);
                setTimeout(() => {
                    setVisibleToast(false);
                }, 2000);
                return;
            } else if (checked.length >= 2) {
                setVisibleToastSecond(true);
                setTimeout(() => {
                    setVisibleToastSecond(false);
                }, 2000);
                return;
            }
            // CheckBox 한개 선택 시
            // workList에서 문서번호 비교 후 docu_no, file_no, docu_subject 추출
            for (var l of workList) {
                if (l.no_list.docu_no == index) tmp = l;
            }
            data = workSelector.work_tmp_box_list.find(
                (raw: any) => raw.file_no == tmp.no_list.file_no
            );
            // 버전 관리 수정 가능여부 확인
            if (type === "revision") {
                data_list.push(data);
                auth = getAuthority(authSelector, data_list);
                if (!auth.write) return ModalInfo("수정 권한이 없는 파일입니다.");
            }
        } else {
            data = workSelector.work_tmp_box_list[index];
        }

        if (type === "comment") {
            setFile(data);
            setIsLoading(true);
            dispatch(GetFilesList(data.docu_no));
            setSelectedFileNo(data.file_no);
            setSelectedDocuNo(data.docu_no);
            setSelectedDocuSub(data.docu_subject);
        } else if (type === "revision" && auth != undefined && auth.write == true) {
            setFile(data);
            setIsLoading(true);
            dispatch(GetFilesList(data.docu_no));
        }

        if (type === "comment") {
            setTimeout(() => {
                setIsLoading(false);
                onClickFileHistroyvisible();
            }, 2000);
        }
        // else if (type == "revision" && auth != undefined && auth.write == true) {
        //     setTimeout(() => {
        //         setIsLoading(false);
        //         onClikcFileUploadvisible();
        //     }, 2000);
        // }
    };

    const onClickPdfViewer = (selectItem?: number) => {
        if (selectItem == undefined) {
            if (checked.length == 0) {
                setVisibleToast(true);
                setTimeout(() => {
                    setVisibleToast(false);
                }, 2000);
                return;
            } else if (checked.length >= 2) {
                setVisibleToastSecond(true);
                setTimeout(() => {
                    setVisibleToastSecond(false);
                }, 2000);
                return;
            }
        }
        const data =
            selectItem != undefined
                ? workSelector.work_tmp_box_list[selectItem]
                : workSelector.work_tmp_box_list.find((raw: any) => raw.docu_no == checked[0]);
        // if (get_file_type(data.file_type) === "도면" || data.file_type === "도면")
        //     // alert("모델 뷰어는 현재 준비 중 입니다.\n불편을 드려 죄송합니다.");
        //     open3DModelFile(data.repo_path, data.file_no, userSelector.edms_user_id);
        // else
        windowOpenByPopup(
            `http://${window.location.host}/edms/pdfviewer/${data.file_no}?page_type=0`
        );
    };

    const onClickContextMenuItem = (contextData: any) => {
        const { selectedId, selectItem } = contextData;

        setChecked([selectedId.no_list.docu_no]);
        const data = workSelector.work_tmp_box_list.find(
            (raw: any) => raw.docu_no == selectedId.no_list.docu_no
        );
        if (selectedId.no_list.auth == 0 && selectItem != 3) return ModalInfo("권한이 없습니다.");
        let selectedIdx = workSelector.work_tmp_box_list.findIndex(
            (raw: any) => raw.docu_no == selectedId.docu_no
        );
        switch (selectItem) {
            case 0:
                onClickDetailView("comment", selectedIdx);
                break;
            // case 1:
            //     onClickDetailView("revision", selectedIdx);
            //     break;
            case 1:
                // if (get_file_type(data.file_type) === "도면" || data.file_type === "도면") {
                //     open3DModelFile(data.repo_path, data.file_no, userSelector.edms_user_id);
                // } else {
                onClickPdfViewer(selectedIdx);
                // }
                break;
                // case 3:
                //     onClickWorkProc("DIN", selectedIdx);
                //     break;
                // case 2:
                //     onClickWorkProc("DRN", selectedIdx);
                break;
            case 2:
                onClickTmModal();
                break;
            // case 6:
            //     AddAchieve(data.docu_no);
            //     break;
            // case 7:
            //     onClickStageModal(selectedId);
            //    break;
            default:
                break;
        }
    };

    // const AddAchieve = (id: number) => {
    //     ModalInfo("성과물 등록 완료");
    // };

    const onClickDownload = async () => {
        setIsLoading(true);
        await getExcelFileByType("document", { proj_no: projSelector.now_project_no });
        setTimeout(() => {
            setIsLoading(false);
        }, 500);
    };

    // 검색 기능
    const onSearchData = async (_skip?: number) => {
        setIsLoading(true);
        // let _currentPage: number;
        // if (_skip != undefined) {
        //     _currentPage = Math.floor(_skip / PAGE_SIZE) + 1;
        // } else {
        //     _currentPage = currentPage;
        // }

        makeQueryStringArr({
            us: 1,
            searchText: searchData,
            projectTypeNo: projectTypeNo,
            cateNo: cateNo,
            docuNo: docuNo,
            selectedType: selectedType,
        });
        dispatch(
            GetWorkTmpBoxList(
                false,
                true,
                _skip ? _skip : 0,
                PAGE_SIZE,
                projectTypeNo,
                cateNo,
                docuNo,
                selectedType,
                searchData
            )
        );
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    };

    const makeQueryStringArr = (searchDatas: object) => {
        let queryStringArr: string[] = [];
        Object.entries(searchDatas).map(([k, v]) => {
            if (v != -1 && v != "" && v != undefined) {
                queryStringArr.push(`${k}=${v}`);
            }
        });
        setQueryString(queryStringArr.join("&"));
    };

    const onPopAction = () => {
        let _queryString: object = {};

        let _skip: string | null = searchParam.get("skip");
        let param_searchText: string | null = searchParam.get("searchText");
        let param_selectedType: string | null = searchParam.get("selectedType");

        if (param_searchText != null) {
            setSearchData(param_searchText);
            Object.assign(_queryString, { searchText: param_searchText });
        } else {
            setSearchData("");
        }
        if (param_selectedType != null) {
            setSelectedType(parseInt(param_selectedType));
            Object.assign(_queryString, { selectedType: param_selectedType });
        } else {
            setSelectedType(1);
        }
        makeQueryStringArr(_queryString);
        dispatch(
            GetWorkTmpBoxList(
                false,
                true,
                _skip ? _skip : 0,
                PAGE_SIZE,
                projectTypeNo,
                cateNo,
                docuNo,
                param_selectedType,
                param_searchText
            )
        );
    };

    const getData = async () => {
        await dispatch(GetDocumentManager());
        await dispatch(GetTmCode());
        await dispatch(GetNativeFileList());
        await dispatch(GetEdmsProgProjectList());
        await dispatch(GetSerachCategoryList());
        await dispatch(GetEdmsDocuMasterList());
    };
    return (
        <>
            <style>
                {`
                    .k-grid table {
                        width : 100% !important;
                    }
                    .k-grid td {
                        white-space : pre-wrap;
                    }
                `}
            </style>
            <LoadingIndicatorComponent open={isLoading} style={{ zIndex: 100 }} />
            {contextMenuElement}
            <ToastComponent
                text="문서를 선택해주세요."
                close={() => setVisibleToast(false)}
                visible={visibleToast}
                type={"warning"}
                style={{ position: "absolute", bottom: 100, right: 100, alignItems: "center" }}
            />
            <ToastComponent
                text="하나의 문서를 선택해주세요."
                close={() => setVisibleToastSecond(false)}
                visible={visibleToastSecond}
                type={"warning"}
                style={{ position: "absolute", bottom: 100, right: 100, alignItems: "center" }}
            />
            <FileUploadModalComp
                visible={exfileUploadModalVisible}
                onClose={onCloseExFileUploadModal}
            />
            <EdmsDocuPublishModal
                visible={projectTreeModalVisible}
                onClose={onCloseModal}
                checkList={checked}
                state={state}
            />
            {/* <EdmsFileUploadModal
                visible={fileUploadModalVisible}
                onClose={onCloseFileUploadModal}
                file={file}
            /> */}
            <EdmsDocumentUploadModal visible={docuUploadModalVisible} onClose={onCloseDocuUpload} />
            <EdmsMydocuFileHistoryModal
                visible={fileHistoryModalVisible}
                onClose={onCloseFileHistoryModal}
                // dataidx={dataIdx}
                myDocu={selectedDocuNo}
                myDocuSub={selectedDocuSub}
                myFileNo={selectedFileNo}
            />
            <EdmsTmModal
                visible={tmModalVisible}
                onClose={onCloseTmModal}
                workList={workList}
                checkList={checked}
                state={state}
            />
            <EdmsStageModal
                visible={stageModalVisible}
                onClose={onCloseStageModal}
                checkList={checked}
            />
            <S.DocumentWorklistContainer>
                <S.DoucmentWorklistTableBox>
                    <S.DocumentWorklistTableBoxHeader>
                        <S.DocumentSearchButtonDiv>
                            <S.FormType
                                $flex={0.3}
                                value={projectTypeNo}
                                onChange={(e: any) => setProejctTypeNo(parseInt(e.target.value))}
                                disableUnderline={true}
                            >
                                <S.InputSelectItem value={-1}>{"프로젝트 선택"}</S.InputSelectItem>
                                {projectTypeList &&
                                    projectTypeList.map((val: any, idx: number) => {
                                        return (
                                            <S.InputSelectItem
                                                value={val.project_no}
                                                key={val.project_name + idx}
                                            >
                                                {val.project_name}
                                            </S.InputSelectItem>
                                        );
                                    })}
                            </S.FormType>

                            <S.InputAutoComplete
                                value={cateName}
                                onChange={(e: any, newVal: any) => {
                                    setCateName(newVal);
                                    let cate = categoryList.find(raw => raw.cate_name === newVal);
                                    if (cate) setCateNo(cate.cate_no);
                                }}
                                options={categoryList.map(raw => {
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
                                value={selectedType}
                                onChange={(e: any) => setSelectedType(parseInt(e.target.value))}
                                disableUnderline={true}
                            >
                                <S.InputSelectItem value={1}>파일명</S.InputSelectItem>
                                <S.InputSelectItem value={2}>문서제목</S.InputSelectItem>
                            </S.SearchType>
                            <S.SearchText
                                value={searchData}
                                onChange={e => setSearchData(e.target.value)}
                                onKeyUp={e => {
                                    if (e.key == `Enter`) onSearchData();
                                }}
                                InputProps={{
                                    disableUnderline: true,
                                }}
                            />
                            <S.SearchBtn onClick={() => onSearchData()}>검색하기</S.SearchBtn>
                        </S.DocumentSearchButtonDiv>
                        <S.DocumentWorkButtonDiv>
                            <EdmsMydocuToolbar
                                checked={checked}
                                selectedFunc={selectedFunc}
                                handleChange={handleChange}
                                onClickDocuUpload={onClickDocuUpload}
                                onClickFileUpload={onClikcExFileUploadvisible}
                                onClickDclDownload={onClickDownload}
                                setIsLoading={setIsLoading}
                                contextMenuItems={CONTEXT_MENU_ITEMS}
                                skip={skip}
                            />
                        </S.DocumentWorkButtonDiv>
                    </S.DocumentWorklistTableBoxHeader>
                    <S.GridViewWrap>
                        <GridViewComponent
                            titles={tableHeader}
                            keys={workListKeys}
                            values={Object.values(workList)}
                            fullData={workList}
                            keysWidth={tableHeadSize}
                            datatype={tableHeadType}
                            rowClass="background-color-white color-light-black"
                            headerClass="background-dark-sky-blue color-white align-center"
                            getCustomEl={createCustomEl}
                            keysWidthTotal={10}
                            onContextMenu={onContextMenu}
                            pageable={true}
                            pagefake
                            onPageChange={(_skip: number, take: number, currentPage: number) => {
                                setSkip(_skip);
                                if (skip != _skip) {
                                    setIsLoading(true);
                                    setTimeout(() => {
                                        setIsLoading(false);
                                    }, 3000);
                                    onSearchData(_skip);
                                }
                            }}
                            nowPageSize={pageSize}
                            // nowPage={currentPage}
                            isSelect
                            onChangeSelect={onCheckChange}
                            selectKey={"docu_no"}
                            queryString={queryString}
                            onPopAction={onPopAction}
                            historyRecord
                        />
                    </S.GridViewWrap>
                </S.DoucmentWorklistTableBox>
            </S.DocumentWorklistContainer>
        </>
    );
};

export default EdmsTmpDocumentListPage;
