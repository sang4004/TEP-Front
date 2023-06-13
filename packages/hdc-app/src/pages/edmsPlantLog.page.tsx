/******************************************************************************
 * hooks :
 * useLocations
 * components :
 *                                                                         455qq
 *

 ******************************************************************************/
import { useDispatch, useSelector } from "react-redux"; // redux
import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useLocations } from "hooks";
import { GetPlantList, ConnectPlantFiles, SetPlantList } from "../common/action";
import { useParams } from "react-router-dom";
import {
    GridViewComponent,
    LoadingIndicatorComponent,
    ContextMenuComp,
    ModalInfo,
} from "components";
import { EdmsPlantLogConnectModalComp } from "../components";
import { windowOpenByPopup } from "../common/utils";
import { makeQueryString } from "../pages/common/workProcPage/history";

//library

//util
import moment from "moment";

import * as S from "../styled/edmsPlantLog.styled";

import { reducerState } from "../common";
import * as constant from "../pages/common/edmsPlantLogPage/constant";

const EdmsPlantLogPage = (props: any) => {
    const dispatch = useDispatch();
    const { replace, location, push, action } = useHistory();
    const { pushHistory, path, searchParam } = useLocations();
    const { pno } = useParams<{ pno: string }>();
    //selector
    const achieveSelector = useSelector((state: reducerState) => state.achieve);

    const [isSetting, setIsSetting] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [plantLogList, setPlantLogList] = useState<any[]>([]);
    //Components
    //GridView
    const [tableKeys, setTableKeys] = useState<any[]>([]);
    const [searchType, setSearchType] = useState<number>(1);
    const [searchText, setSearchText] = useState<string>("");
    const [orderType, setOrderType] = useState<string>(" ");
    const [queryString, setQueryString] = useState<string>("");

    //Paging

    const [pageTotal, setPageTotal] = useState<number>(0);

    //Context
    const { contextMenuElement, onContextMenu } = ContextMenuComp({
        menu_id: "plantLog_list",
        items: constant.CONTEXT_MENU_ITEMS,
        onClickItem: data => onClickContextMenuItem(data),
    });
    const [connectModalVisible, setConnectModalVisible] = useState<boolean>(false);
    const [modalFileNo, setModalFileNo] = useState<number>(0);
    const [modalPlantId, setModalPlantId] = useState<number>(0);

    const project_no = parseInt(pno);

    useEffect(() => {
        setIsLoading(true);
        if (location.search == "") {
            dispatch(GetPlantList(project_no));
        } else {
            let queryString: string = location.search.replace(/^\?/, "");
            let queryStringArr: string[] = queryString.split("&");
            let qs: {
                searchText?: string;
                searchType?: number;
            } = getQueyStringData(queryStringArr);
            setIsSetting(true);
            setQueryString(queryString);
            dispatch(GetPlantList(project_no, qs.searchType, qs.searchText));
        }
        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    }, [project_no]);

    useEffect(() => {
        makeList();
    }, [achieveSelector.plant_list]);

    useEffect(() => {
        if (plantLogList.length > 0 && orderType != " ") {
            let _planLogList: any[] = [...plantLogList];
            setPlantLogList(sortList(orderType, _planLogList));
        }
    }, [orderType]);

    useEffect(() => {
        if (action == "POP" && isSetting) {
            setIsSetting(false);
            setSearchText("");
            dispatch(GetPlantList(project_no));
        }
    }, [action]);

    const makeList = () => {
        setIsLoading(true);
        let _planLogList: any[] = [];
        if (achieveSelector.plant_list.length > 0) {
            let data = achieveSelector.plant_list;
            for (let plantLog of data) {
                if (modalPlantId == plantLog.plant_id) {
                    setModalFileNo(plantLog.file_no);
                }
                _planLogList.push({
                    transmittal: plantLog.transmittal,
                    equipment: plantLog.equipment,
                    mdl: plantLog.mdl,
                    customer_transmittal: plantLog.customer_transmittal,
                    contract_due_date: moment(plantLog.contract_due_date).format("YYYY-MM-DD"),
                    issue_date: moment(plantLog.issue_date).format("YYYY-MM-DD"),
                    file_name: plantLog.file_name,
                    title: plantLog.title,
                    rev: plantLog.rev,
                    document_issue: plantLog.document_issue,
                    for_contractual_review: plantLog.for_contractual_review,
                    for_contractual_approval: plantLog.for_contractual_approval,
                    status_issued: plantLog.status_issued,
                    documentum_folder_link: plantLog.documentum_folder_link,
                    customer_return_xml: plantLog.customer_return_xml,
                    review_result: plantLog.review_result,
                    wp_code: plantLog.wp_code,
                    subject: plantLog.subject,
                    file_no: plantLog.file_no,
                    plant_id: plantLog.plant_id,
                });
            }

            if (orderType != " ") {
                _planLogList = sortList(orderType, _planLogList);
            }
            setTableKeys(Object.keys(_planLogList[0]));
            setPlantLogList([..._planLogList]);
        } else {
            setPlantLogList([]);
            setPageTotal(0);
        }
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    };

    const sortList = (type: string, list: any[]) => {
        list.sort((a: any, b: any) => {
            let _a: any = a[type];
            let _b: any = b[type];
            if (_a > _b) return -1;
            else if (_a < _b) return 1;
            else if (_a == _b) return 0;
            else return -1;
        });
        return list;
    };

    const searchData = () => {
        setIsLoading(true);
        let _searchText = searchText.replace(/^\s+/, "");
        setQueryString(makeQueryString({ searchType: searchType, searchText: _searchText }));
        dispatch(GetPlantList(project_no, searchType, _searchText));
    };

    const onDoubleClickRow = (selectedItem: any) => {
        const selected_file_no = selectedItem.file_no;
        const data = achieveSelector.plant_list.find((raw: any) => raw.file_no == selected_file_no);
        onClickPdfViewer(data);
    };

    const onClickContextMenuItem = (contextData: any) => {
        const { selectedId, selectItem } = contextData;
        const selected_plant_id = selectedId.plant_id;
        const data = achieveSelector.plant_list.find(
            (raw: any) => raw.plant_id == selected_plant_id
        );
        if (selectItem == 0) {
            if (data.root_path) {
                fileDownload(data.root_path);
            } else {
                ModalInfo("파일이 존재하지 않습니다.");
            }
        } else if (selectItem == 1) {
            onClickPdfViewer(data);
        } else if (selectItem == 2) {
            if (data.wp_idx) {
                pushHistory(`/edms/tm/detail/${data.wp_idx}`);
            } else {
                ModalInfo("TR이 존재하지 않습니다.");
            }
        } else if (selectItem == 3) {
            setModalFileNo(data.file_no);
            setModalPlantId(data.plant_id);
            setConnectModalVisible(true);
        }
    };

    const onClickPdfViewer = (data: any) => {
        if (data.file_no) {
            windowOpenByPopup(
                `http://${window.location.host}/edms/pdfviewer/${data.file_no}?page_type=1`
            );
            // }
        } else {
            return ModalInfo("파일이 존재하지 않습니다.");
        }
    };

    const fileDownload = (path: string) => {
        if (path) {
            window.open(path, "_blank");
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
            }
            data[key] = value;
        });
        return data;
    };

    const connectFile = (file_no: number) => {
        if (modalPlantId && file_no) {
            setIsLoading(true);
            setModalFileNo(file_no);
            dispatch(ConnectPlantFiles(modalPlantId, file_no));
            dispatch(SetPlantList(modalPlantId, file_no));
        }
    };

    const onPopAction = () => {
        if (location.search != "") {
            let queryStringArr: string[] = [];
            let param_searchText: string | null = searchParam.get("searchText");
            let param_searchType: string | null = searchParam.get("searchType");
            if (param_searchText != null) {
                setSearchText(param_searchText);
                queryStringArr.push(`searchText=${param_searchText}`);
            }
            if (param_searchType != null) {
                setSearchType(parseInt(param_searchType));
                queryStringArr.push(`searchType=${param_searchType}`);
            }
            setQueryString(queryStringArr.join("&"));
            getQueyStringData(queryStringArr);
            dispatch(GetPlantList(project_no, param_searchType, param_searchText));
        } else {
            setSearchText("");
            setSearchType(1);
            setQueryString("");
            dispatch(GetPlantList(project_no));
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
                   `}
            </style>
            {contextMenuElement}
            <LoadingIndicatorComponent open={isLoading} style={{ zIndex: 100 }} />
            <EdmsPlantLogConnectModalComp
                visible={connectModalVisible}
                onClose={() => {
                    setConnectModalVisible(false);
                    setModalPlantId(0);
                    setModalFileNo(0);
                }}
                plant_id={modalPlantId}
                fileNo={modalFileNo}
                onConnctFile={connectFile}
            />
            <S.PlantLogContainer>
                <S.PlantLogSearchButtonDiv>
                    <S.SearchType
                        value={orderType}
                        onChange={(e: any) => setOrderType(e.target.value)}
                        disableUnderline={true}
                    >
                        <S.InputSelectItem value={" "}>정렬</S.InputSelectItem>;
                        {constant.tableHeader &&
                            constant.tableHeader.map((title: string) => {
                                return <S.InputSelectItem value={title}>{title}</S.InputSelectItem>;
                            })}
                    </S.SearchType>
                    <S.SearchType
                        value={searchType}
                        onChange={(e: any) => setSearchType(parseInt(e.target.value))}
                        disableUnderline={true}
                    >
                        <S.InputSelectItem value={1}>파일명</S.InputSelectItem>
                        <S.InputSelectItem value={2}>제목</S.InputSelectItem>
                        <S.InputSelectItem value={3}>TR.No.</S.InputSelectItem>
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
                </S.PlantLogSearchButtonDiv>
                <S.PlantLogListDiv>
                    <S.PlantLoglistTableBox>
                        <S.GridViewWrap>
                            <GridViewComponent
                                titles={constant.tableHeader}
                                keys={tableKeys}
                                values={Object.values(plantLogList)}
                                fullData={plantLogList}
                                keysWidth={constant.tableHeadSize}
                                datatype={constant.tableHeadType}
                                headerClass="background-dark-sky-blue color-white align-center"
                                keysWidthTotal={27}
                                pageable={true}
                                nowPageSize={pageTotal}
                                pagecount={constant.PAGE_SIZE}
                                queryString={queryString}
                                noRecordsMsg={"표시할 내용이 없습니다."}
                                onContextMenu={onContextMenu}
                                isSelect
                                isSelectFake
                                onDoubleClickRow={onDoubleClickRow}
                                onPopAction={onPopAction}
                                historyRecord
                            />
                        </S.GridViewWrap>
                    </S.PlantLoglistTableBox>
                </S.PlantLogListDiv>
            </S.PlantLogContainer>
        </>
    );
};

export default EdmsPlantLogPage;
