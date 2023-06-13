/******************************************************************************
 * hooks :
 * useLocations
 * components :
 *
 *

 ******************************************************************************/
import { useDispatch, useSelector } from "react-redux"; // redux
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { useLocations } from "hooks";

import { GridViewComponent, LoadingIndicatorComponent, ModalInfo, ModalConfirm } from "components";
//library
//util
import { reducerState } from "../common";
import {
    GetDocumentManager,
    GetDeleteBoxList,
    RestoreMydocumentFiles,
    DeleteMydocumentFiles,
} from "../common/action";
//
//image
import * as S from "../styled/edmsDeleteBox.styled";
import * as T from "../styled/edmsProject.styled";

import * as docS from "../styled/edmsDocument.styled";
import trashIcon from "../images/edms/trash-white.svg";
import searchIconSvg from "../images/icon/search_icon.svg";
//

let checkedDocuList: any[] = [];

const tableHeadType = [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1];
const tableHeadSize = [0.6, 0.4, 0.6, 1.2, 1, 1.4, 0.5, 0.8, 1.8, 0.4, 0.5, 0.9, 0.4];
const tableHeader = [
    "삭제일",
    "프로젝트",
    "분야",
    "항목",
    "Doc.No",
    "문서제목",
    "revision",
    "파일코드",
    "파일이름",
    "파일타입",
    "최근 업무절차",
    "문서단계",
    "작성자",
];
const PAGE_SIZE = 20;
const EdmsDeleteBoxPage = () => {
    const dispatch = useDispatch();
    const { path, searchParam } = useLocations();
    const { location } = useHistory();

    const workSelector = useSelector((state: reducerState) => state.work);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isPop, setIsPop] = useState<boolean>(false);

    const [keyWord, setKeyWord] = useState<string>("");
    const [searchData, setSearchData] = useState<string>("");

    const [checked, setChecked] = useState<number[]>([]);
    const [workList, setWorkList] = useState<any[]>([]);
    const [workListKeys, setWorkListKeys] = useState<any[]>([]);
    const [deletedBoxList, setdeletedBoxList] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [page, setPage] = useState<number>(0);
    const [queryString, setQueryString] = useState<string>();
    const [pageTotal, setPageTotal] = useState<number>(0);

    useEffect(() => {
        dispatch(GetDeleteBoxList("General"));
        dispatch(GetDocumentManager());
        if (searchParam.has("searchData")) {
            setQueryString(location.search.replace(/^\?/, ""));
            let _searchText: string | null = searchParam.get("searchData");
            if (_searchText != null) setSearchData(_searchText);
        }
    }, []);

    useEffect(() => {
        makeList();
    }, [workSelector.delete_box_list, searchData]);

    useEffect(() => {
        if (isPop) {
            setIsPop(false);
            makeList();
        }
    }, [isPop]);

    const checkKoreanRegExp = (searchData: string) => {
        var reg = /[a-z0-9]|[ \[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"'\\]/g;

        if (reg.test(searchData)) {
            return searchData.replace(reg, "");
        } else {
            return searchData;
        }
    };

    const makeList = () => {
        setIsLoading(true);
        let _tmplist: any[] = [];

        if (workSelector.delete_box_list && workSelector.delete_box_list.length > 0) {
            let deleteBoxList: any[] = workSelector.delete_box_list;

            if (searchData != "") {
                let search_target: any[] = [];
                let search_result: any[] = [];

                let is_Korean = checkKoreanRegExp(searchData);

                deleteBoxList.map(deletedFile => {
                    search_target.push([
                        deletedFile.file_no,
                        deletedFile.docu_subject,
                        deletedFile.docu_code,
                        deletedFile.file_name,
                    ]);
                });

                search_target.map(target => {
                    for (let i = 1; i < 4; i++) {
                        if (is_Korean) {
                            if (
                                target[i] &&
                                checkKoreanRegExp(target[i].toUpperCase()).indexOf(
                                    searchData.toUpperCase()
                                ) != -1
                            ) {
                                search_result.push(
                                    deleteBoxList.find(
                                        deletedFile => deletedFile.file_no == target[0]
                                    )
                                );
                            }
                        } else {
                            if (
                                target[i] &&
                                target[i].toUpperCase().indexOf(searchData.toUpperCase()) != -1
                            ) {
                                search_result.push(
                                    deleteBoxList.find(
                                        deletedFile => deletedFile.file_no == target[0]
                                    )
                                );
                            }
                        }
                    }
                });

                deleteBoxList = search_result;
                setPageTotal(deleteBoxList.length);
            }
            makeQueryStringArr({
                searchData: searchData,
                pageTotal: deleteBoxList.length,
            });
            if (deleteBoxList.length > 0) {
                for (var tmp of deleteBoxList) {
                    _tmplist.push({
                        docu_no: tmp.docu_no,
                        file_no: tmp.file_no,
                        no_list: {
                            docu_no: tmp.docu_no,
                            file_no: tmp.file_no,
                            cate_no: tmp.cate_no,
                            auth: tmp.auth,
                        },
                        create_tm: moment(tmp.create_tm).format("YYYY-MM-DD HH:mm:ss"),
                        proj_name: tmp.project_name,
                        discipline_name: tmp.disc_name,
                        cate_name: tmp.cate_name,
                        docu_code: tmp.docu_code,
                        docu_subject: tmp.docu_subject,
                        revision: tmp.revision,
                        file_code: tmp.file_code,
                        file_name: tmp.file_name,
                        file_type: tmp.file_type,
                        wptype: tmp.type,
                        status: {
                            stage: tmp.stage,
                            first_dt_name: tmp.first_dt_name,
                            first_dt: tmp.first_dt,
                        },
                        create_by: tmp.file_create_user_name,
                    });
                }

                setWorkList([..._tmplist]);
                setdeletedBoxList(deleteBoxList);
                let _keys = Object.keys(_tmplist[0]).filter(
                    (raw, idx) => idx != 0 && idx != 1 && idx != 2
                );
                setWorkListKeys(_keys);
            } else {
                setWorkList([]);
            }
        } else if (workSelector.delete_box_list && workSelector.delete_box_list.length == 0) {
            setWorkList([]);
        }

        setTimeout(() => {
            setIsLoading(false);
        }, 300);
        setChecked([]);
    };

    const createCustomEl = (idx: number, dataIdx?: number) => {
        if (workList.length != 0) {
            if (dataIdx != undefined && workList.length <= dataIdx) return null;
            if (idx === 9) {
                if (dataIdx == undefined) return true;
                let data = workList[dataIdx].wptype;
                return (
                    <T.TableTd>
                        <S.StatusDiv>
                            <S.wpType $wpType={data ? data : ``}>{data ? data : `임시`}</S.wpType>
                        </S.StatusDiv>
                    </T.TableTd>
                );
            } else if (idx === 11) {
                if (dataIdx == undefined) return true;
                let data = workList[dataIdx].status;
                return (
                    <T.TableTd>
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

    const onKeyPress = (e: any) => {
        if (e.key == "Enter" || e === "click") {
            setSearchData(keyWord);
        }
    };

    const confirmRestoreOrDelete = async (type: string, confirmText: string) => {
        setIsLoading(true);
        let completeText: string = "";

        if (type === "RESTORE") {
            completeText = "복원";
            dispatch(RestoreMydocumentFiles(checkedDocuList));
        } else {
            completeText = "영구 삭제";
            dispatch(DeleteMydocumentFiles(checkedDocuList, true));
        }

        setTimeout(() => {
            dispatch(GetDeleteBoxList("General"));
            ModalInfo(`${confirmText}가 ${completeText}되었습니다.`);
            checkedDocuList = [];
            setIsLoading(false);
        }, 2000);
    };

    const onClickBtn = (type: string) => {
        if (checked && deletedBoxList.length != 0 && checked.length != 0) {
            checkedDocuList = [];

            checked.map(raw => {
                let checkedDocuments = deletedBoxList.find(fRaw => fRaw.file_no == raw);
                if (checkedDocuments) checkedDocuList.push(checkedDocuments);
            });
        }

        if (checkedDocuList.length == 0) return ModalInfo("파일을 한개 이상 선택해 주세요.");

        let confirmText: string = "";
        let checkedDocuNames: any[] = checkedDocuList.map(raw => raw.docu_subject);

        if (checkedDocuNames.length > 1)
            confirmText = `${checkedDocuNames[0]} 외 ` + `${checkedDocuNames.length - 1}건의 문서`;
        else confirmText = `${checkedDocuNames[0]} 문서`;

        if (type === "RESTORE")
            ModalConfirm(`${confirmText}를 복원하시겠습니까?`, result => {
                if (result) {
                    confirmRestoreOrDelete("RESTORE", confirmText);
                }
            });
        else
            ModalConfirm(`${confirmText}를 영구 삭제하시겠습니까?`, result => {
                if (result) {
                    confirmRestoreOrDelete("DELETE", confirmText);
                }
            });
    };

    const makeQueryStringArr = (searchDatas: object) => {
        let queryStringArr: string[] = [];
        Object.entries(searchDatas).map(([k, v]) => {
            if (v != -1 && v != undefined) {
                queryStringArr.push(`${k}=${v}`);
            }
        });
        setQueryString(queryStringArr.join("&"));
    };

    const onPopAction = () => {
        setIsLoading(true);
        setIsPop(true);
        if (location.search != "") {
            let param_searchData: string | null = searchParam.get("searchData");
            let param_pageTotal: string | null = searchParam.get("pageTotal");
            if (param_searchData != null) {
                setKeyWord(param_searchData);
                setSearchData(param_searchData);
            }
            if (param_pageTotal != null) {
                setPageTotal(parseInt(param_pageTotal));
            }
        } else {
            setSearchData("");
            setPageTotal(0);
        }
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
            <S.DocumentWorklistContainer>
                <S.DoucmentWorklistTableBox>
                    <S.DocumentWorklistTableBoxHeader>
                        <S.Searchbar>
                            <S.SearchField
                                value={keyWord}
                                placeholder={"문서 이름을 입력하세요."}
                                onChange={e => setKeyWord(e.target.value)}
                                onKeyPress={e => onKeyPress(e)}
                                InputProps={{
                                    disableUnderline: true,
                                }}
                            />
                            <S.SearchIcon src={searchIconSvg} />
                        </S.Searchbar>
                        <S.FileToolBtnWrapper>
                            <docS.DocumentToolBtn
                                onClick={e => onClickBtn("RESTORE")}
                                style={{ backgroundColor: "#FF9800" }}
                            >
                                복원
                            </docS.DocumentToolBtn>
                            <docS.DocumentToolBtn onClick={e => onClickBtn("DELETE")}>
                                <img src={trashIcon} />
                                영구 삭제
                            </docS.DocumentToolBtn>
                        </S.FileToolBtnWrapper>
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
                            pageable={true}
                            pagecount={PAGE_SIZE}
                            isSelect
                            onChangeSelect={onCheckChange}
                            nowPageSize={pageTotal}
                            selectKey={"file_no"}
                            queryString={queryString}
                            onPageChange={(skip: number, take: number, currentPage: number) => {
                                setPage(skip);
                            }}
                            onPopAction={onPopAction}
                            historyRecord
                        />
                    </S.GridViewWrap>
                </S.DoucmentWorklistTableBox>
            </S.DocumentWorklistContainer>
        </>
    );
};

export default EdmsDeleteBoxPage;
