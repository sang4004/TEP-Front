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
import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useLocations } from "hooks";

import { EdmsTreeViewComp } from "../components";
import {
    GridViewComponent,
    LoadingIndicatorComponent,
    gridViewChildrenType,
    ContextMenuComp,
    ModalInfo,
} from "components";
import { windowOpenByPopup, open3DModelFile } from "../common/utils";
//library
//image
//
//util
import * as S from "../styled/edmsOtherDocument.styled";

import { reducerState } from "../common";
import { GetEdmsOtherFileList, GetHistory, SetHistory } from "../common/action";

import moment from "moment";

const tableHeadType = [0, -1, -1, 0, 0, -1, -1, -1];
const tableHeadSize = [1.2, 0.3, 0.3, 1.2, 1.2, 0.6];
const tableHeader = ["파일명", "확장자", "문서구분", "TR.No.", "TR 제목", "업로드 날짜"];
const CONTEXT_MENU_ITEMS = ["파일 다운로드", "파일 보기", "TR 보기"];
const PAGE_SIZE = 20;

const EdmsDclListPage = (props: any) => {
    const dispatch = useDispatch();
    const { location, action } = useHistory();
    const { pushHistory, path, searchParam } = useLocations();
    //selector
    const fileSelector = useSelector((state: reducerState) => state.files);
    const userSelector = useSelector((state: reducerState) => state.user);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [achieveList, setAchieveList] = useState<any[]>([]);
    const [extList, setExtList] = useState<Array<any>>([]);
    //Components
    //GridView
    const [tableKeys, setTableKeys] = useState<any[]>([]);
    const [searchFileType, setSearchFileType] = useState<string>(" ");
    const [searchType, setSearchType] = useState<number>(0);
    const [searchText, setSearchText] = useState<string>("");
    const [queryString, setQueryString] = useState<string>("");
    const [isPop, setIsPop] = useState<boolean>(false);
    //TreeView
    const [selectedTreeItems, setSelectedTreeItems] = useState<any>(null);
    const [selectedType, setSelectedType] = useState<string>("");
    const [selectedNo, setSelectedNo] = useState<number>(-1);
    const [selectType, setSelectType] = useState<string>("");
    //AchieveReview
    const [pageTotal, setPageTotal] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);

    //Context
    const { contextMenuElement, onContextMenu } = ContextMenuComp({
        menu_id: "other_list",
        items: CONTEXT_MENU_ITEMS,
        onClickItem: data => onClickContextMenuItem(data),
    });

    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 5000);
        dispatch(GetEdmsOtherFileList());
        // if (location.search != "") {
        //     let queryString: string = location.search.replace(/^\?/, "");
        //     let queryStringArr: string[] = queryString.split("&");
        //     getQueyStringData(queryStringArr);
        // }
    }, []);

    useEffect(() => {
        makeList();
    }, [fileSelector.other_file_list]);

    useEffect(() => {
        setExtList(fileSelector.ext_list);
    }, [fileSelector.ext_list]);

    useEffect(() => {
        if ((selectedNo && selectedNo != -1) || selectType == "ALL") {
            makeList();
        }
    }, [selectedNo, selectType]);

    useEffect(() => {
        if (searchFileType != " ") {
            makeList();
        }
    }, [searchFileType]);

    useEffect(() => {
        if (isPop) {
            setIsPop(false);
            makeList();
        }
    }, [isPop]);

    const makeList = () => {
        setIsLoading(true);
        let _achievelist: any[] = [];
        let _searchText = searchText;
        let _searchType = get_search_type(searchType);
        let _queryString: string[] = [];
        if (/^\s+$/.test(_searchText)) _searchText = "";
        if (fileSelector.other_file_list && fileSelector.other_file_list.length > 0) {
            let data = fileSelector.other_file_list;
            if (selectedNo != -1) {
                data = data.filter((raw: any) => {
                    if (selectedType == "project") {
                        return raw.project_no == selectedNo;
                    }
                });
                _queryString.push(`selectedType=${selectedType}`);
            }
            if (searchFileType != " ") {
                data = data.filter((raw: any) => {
                    return raw.file_ext == searchFileType;
                });
            }
            if (_searchText != " " && _searchText != "") {
                _searchText = _searchText.replace(/\s|\(|\)|\[|\]|\\/g, "");
                let regexp = new RegExp(`${_searchText}`, "i");
                data = data.filter((raw: any) => {
                    let target = raw[_searchType].replace(/\s|\(|\)|\[|\\]/g, "");
                    return regexp.test(target);
                });
                _queryString.push(`searchType=${searchType}`);
                _queryString.push(`searchText=${searchText}`);
            }
            setQueryString(_queryString.join("&"));

            if (data.length > 0) {
                for (var achieve of data) {
                    _achievelist.push({
                        original_file_name: achieve.original_file_name,
                        file_ext: achieve.file_ext,
                        file_type: get_file_type(achieve.file_type),
                        wp_code: achieve.wp_code,
                        subject: achieve.subject,
                        create_tm: moment(new Date(achieve.create_tm)).format("YYYY-MM-DD"),
                        file_no: achieve.file_no,
                    });
                }
                setTableKeys(Object.keys(_achievelist[0]));
                setAchieveList([..._achievelist]);
            } else {
                setAchieveList([]);
            }
        } else if (fileSelector.other_file_list && fileSelector.other_file_list.length == 0) {
            setAchieveList([]);
        }
        setPageTotal(_achievelist.length);
        setTimeout(() => {
            setIsLoading(false);
        }, 300);
    };
    const searchData = () => {
        setCurrentPage(1);
        makeList();
    };

    const onDoubleClickRow = (selectedItem: any) => {
        const data = fileSelector.other_file_list.find(
            (raw: any) => raw.file_no == selectedItem.file_no
        );
        onClickPdfViewer(data);
    };

    const fileDownload = (path: string) => {
        if (path) {
            window.open(path, "_blank");
        }
    };

    const get_file_type = (file_type: string) => {
        switch (file_type) {
            case "001":
                return "도면";
            case "002":
                return "문서";
            case "003":
                return "모델";
            default:
                return "파일없음";
        }
    };

    const get_search_type = (searchType: number) => {
        switch (searchType) {
            case 0:
                return "wp_code";
            case 1:
                return "subject";
            case 2:
                return "original_file_name";
            default:
                return "";
        }
    };

    const onTreeItemClick = (event: any) => {
        setSelectedType(event.item.type);
        setSelectedTreeItems(event.item);
        if (event.item.type == "project") {
            setSelectType("project");
            setSelectedNo(event.item.project_no);
        } else if (event.item.type == "discipline") {
            setSelectType("discipline");
            setSelectedNo(event.item.discipline_id);
        } else if (event.item.type === "pcategory") {
            setSelectType("pcategory");
            setSelectedNo(event.item.cate_no);
        } else if (event.item.type === "category") {
            setSelectType("category");
            setSelectedNo(event.item.cate_no);
        } else {
            setSelectType("");
            setSelectedTreeItems(null);
        }
    };

    const clearSeletedTreeItem = () => {
        setSelectedTreeItems(null);
        setSelectedNo(-1);
        setSelectType("ALL");
    };

    const onClickContextMenuItem = (contextData: any) => {
        const { selectedId, selectItem } = contextData;
        const selected_file_no = selectedId.file_no;
        const data = fileSelector.other_file_list.find(
            (raw: any) => raw.file_no == selected_file_no
        );

        if (selectItem == 0) {
            fileDownload(data.root_path);
        } else if (selectItem == 1) {
            onClickPdfViewer(data);
        } else if (selectItem == 2) {
            pushHistory(`/edms/tm/detail/${data.wp_idx}`);
        }
    };

    const onClickPdfViewer = (data: any) => {
        if (data && data.file_ext != "msg") {
            windowOpenByPopup(
                `http://${window.location.host}/edms/pdfviewer/${data.file_no}?page_type=1`
            );
            // }
        } else {
            return ModalInfo("뷰어가 존재하지 않습니다.");
        }
    };

    //필터 적용으로 인해 전체페이지 수가 변할경우.
    const onPageTotalChange = (total: number) => {
        if (pageTotal != total && total > 0) {
            setPageTotal(total);
            if (Math.floor(total / 20) + 1 < currentPage) {
                setCurrentPage(1);
            }
        }
    };

    const getQueyStringData = (arr: string[]) => {
        let data: any = {};
        arr.map(qs => {
            let key = qs.split("=")[0];
            let value = qs.split("=")[1];

            switch (key) {
                case "searchText":
                    setSearchText(value);
                    break;
                case "searchType":
                    setSearchType(parseInt(value));
                    break;
                case "currentPage":
                    setCurrentPage(parseInt(value));
                    break;
            }
            data[key] = value;
        });
    };

    const onPopAction = () => {
        setIsLoading(true);
        setIsPop(true);
        if (location.search != "") {
            let param_searchText: string | null = searchParam.get("searchText");
            let param_searchType: string | null = searchParam.get("searchType");
            if (param_searchText != null) {
                setSearchText(param_searchText);
            }
            if (param_searchType != null) {
                setSearchType(parseInt(param_searchType));
            }
        } else {
            setSearchText("");
            setSearchType(0);
        }
    };

    return (
        <>
            <style>
                {`
                      .k-grid table {
                          width : 100% !important;
                          margin : 0 -2px;
                      }
                      .k-grid td {
                          white-space : pre-wrap;
                          padding : 6px 8px !important;
                      }
                      .k-grid tbody tr {
                        height : 50px;
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
                    <S.SearchType
                        value={searchType}
                        onChange={(e: any) => setSearchType(parseInt(e.target.value))}
                        disableUnderline={true}
                    >
                        <S.InputSelectItem value={0}>TR. No.</S.InputSelectItem>
                        <S.InputSelectItem value={1}>TR 제목</S.InputSelectItem>
                        <S.InputSelectItem value={2}>파일명</S.InputSelectItem>
                    </S.SearchType>
                    <S.SearchText
                        value={searchText}
                        onChange={e => setSearchText(e.target.value)}
                        onKeyUp={e => {
                            if (e.key == `Enter`) searchData();
                        }}
                        InputProps={{
                            disableUnderline: true,
                        }}
                    />
                    <S.SearchBtn onClick={() => searchData()}>검색하기</S.SearchBtn>
                </S.DocumentSearchButtonDiv>
                <S.DclListDiv>
                    <S.DocumentWorklistStruct>
                        <S.DocumentTreeList>
                            <S.DocumentTreeViewBlock>
                                <EdmsTreeViewComp
                                    onChangeTreeData={data => {}}
                                    onTreeItemClick={onTreeItemClick}
                                    isCloseDisciplines={true}
                                    isCloseCategory={true}
                                    isCloseDocument={true}
                                    dataType="ALL"
                                    isSelectItem={{
                                        selectType: selectType,
                                        selectedNo: selectedNo,
                                    }}
                                    selectedHeaderItem={selectedTreeItems}
                                    isHeader={true}
                                    clearSeletedTreeItem={clearSeletedTreeItem}
                                />
                            </S.DocumentTreeViewBlock>
                        </S.DocumentTreeList>
                    </S.DocumentWorklistStruct>
                    <S.DoucmentAchievelistTableBox>
                        <S.GridViewWrap>
                            <GridViewComponent
                                titles={tableHeader}
                                keys={tableKeys}
                                values={Object.values(achieveList)}
                                fullData={achieveList}
                                keysWidth={tableHeadSize}
                                datatype={tableHeadType}
                                headerClass="background-dark-sky-blue color-white align-center"
                                keysWidthTotal={7}
                                pageable={true}
                                pagecount={PAGE_SIZE}
                                queryString={queryString}
                                onContextMenu={onContextMenu}
                                onDoubleClickRow={onDoubleClickRow}
                                onPageTotalChange={onPageTotalChange}
                                nowPageSize={pageTotal}
                                nowPage={currentPage}
                                noRecordsMsg={"표시할 내용이 없습니다."}
                                selectKey={"file_no"}
                                isSelect
                                isSelectFake
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
