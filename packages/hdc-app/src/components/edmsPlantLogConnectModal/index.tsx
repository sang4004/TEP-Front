/******************************************************************************
 * Copyright (c) 2021. Moornmo Inc. Rights reserved.                          *
 * Data modelings and methods used are assets of Moornmo Inc.                 *
 * hooks :
 * useLocations
 * components :
 *
 * last modify : dongeun
 *
 ******************************************************************************/
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { GridViewComponent, LoadingIndicatorComponent, ModalInfo } from "components";

import * as S from "./styled";

import { reducerState } from "../../common";
import { GetEdmsOtherFileList, SetOtherFiles } from "../../common/action";

//utill
import moment from "moment";

// Module

import Close from "@material-ui/icons/Close";

const tableHeadType = [-1, 0, -1, -1, 0, 0, -1, -1, -1];
const tableHeadSize = [0.8, 1.2, 0.3, 0.3, 1.2, 1.2, 0.6];
const tableHeader = [" ", "파일명", "확장자", "문서구분", "TR.No.", "TR 제목", "업로드 날짜"];

export type EdmsPlantLogConnectMoalProps = {
    fileNo: number;
    plant_id: number;
    visible: boolean;
    onClose: () => void;
    onConnctFile: (file_no: number) => void;
};

interface FinalEdmsPlantLogConnectMoalProps extends EdmsPlantLogConnectMoalProps {}

export const EdmsPlantLogConnectModalComp: React.FunctionComponent<
    FinalEdmsPlantLogConnectMoalProps
> = props => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const fileSelector = useSelector((state: reducerState) => state.files);

    //GridView
    const [dataList, setDataList] = useState<any[]>([]);
    const [fileNoList, setFileNoList] = useState<number[]>([]);
    const [tableKeys, setTableKeys] = useState<any[]>([]);
    const [searchType, setSearchType] = useState<number>(0);
    const [searchText, setSearchText] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [isPageChangeFromModal, setIsPageChangeFromModal] = useState<boolean>(false);
    useEffect(() => {
        dispatch(GetEdmsOtherFileList());
    }, []);

    useEffect(() => {
        makeList();
    }, [props.fileNo, props.plant_id]);

    useEffect(() => {
        if (fileSelector.other_file_list.length > 0) {
            dispatch(SetOtherFiles(fileSelector.other_file_list));
        }
    }, [fileSelector.other_file_list]);

    const makeList = () => {
        setIsLoading(true);
        let _datalist: any[] = [];
        let _fileNoList: number[] = [];
        // search data
        let _searchText = searchText;
        let _searchType = get_search_type(searchType);
        if (/^\s+$/.test(_searchText)) _searchText = "";
        //
        let otherFiles = fileSelector.other_file_list;
        if (otherFiles && otherFiles.length > 0) {
            const isSearchByText = _searchText != " " && _searchText != "";
            _searchText = _searchText.replace(/\s|\(|\)|\[|\|]|\\/g, "");
            for (var _file of otherFiles) {
                let regexp = new RegExp(`${_searchText}`, "i");
                let isFirst = false;

                if (props.fileNo && _file.file_no == props.fileNo) {
                    // 연결 되있는 파일이다.
                    // 1. 이 파일은 맨앞으로 올려야된다.
                    isFirst = true;
                }
                if (isSearchByText) {
                    let target = _file[_searchType].replace(/\s|\(|\)|\[|\]|\\/g, "");
                    if (!regexp.test(target)) {
                        continue;
                        // 검색된 파일이다.
                    }
                }
                //데이터넣어주고
                const _result = {
                    plant_id: props.plant_id,
                    original_file_name: _file.original_file_name,
                    file_ext: _file.file_ext,
                    file_type: get_file_type(_file.file_type),
                    wp_code: _file.wp_code,
                    subject: _file.subject,
                    create_tm: moment(new Date(_file.create_tm)).format("YYYY-MM-DD"),
                    file_no: _file.file_no,
                };
                if (isFirst) {
                    _datalist.unshift(_result);
                } else {
                    _datalist.push(_result);
                }
                // 파일 넘버를 넣는다.
                _fileNoList.push(_file.file_no);
            }
            if (_datalist.length > 0) {
                setTableKeys(Object.keys(_datalist[0]));
                setDataList([..._datalist]);
                setFileNoList([..._fileNoList]);
            } else {
                setDataList([]);
                setCurrentPage(0);
            }
        } else {
            setDataList([]);
        }

        setTimeout(() => {
            setIsLoading(false);
        }, 300);
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

    const searchData = () => {
        makeList();
    };

    const onClickConnectBtn = (fileNo: number) => {
        setIsLoading(true);
        props.onConnctFile(fileNo);
        setCurrentPage(1);
        setIsPageChangeFromModal(true);
        setTimeout(() => {
            setIsLoading(false);
            setIsPageChangeFromModal(false);
            ModalInfo("연결이 완료되었습니다.");
        }, 1000);
    };

    const onCloseModal = () => {
        setIsPageChangeFromModal(false);
        setSearchText("");
        props.onClose();
    };

    const createCustomEl = (
        idx: number,
        dataIdx?: number,
        columnIndex?: number,
        dataItem?: any
    ) => {
        if (idx == 0) {
            return dataItem?.file_no == props.fileNo ? (
                <S.TableTd style={{ textAlign: "center" }}>
                    <S.TableConnectedBtn>연결완료</S.TableConnectedBtn>
                </S.TableTd>
            ) : (
                <S.TableTd style={{ textAlign: "center" }}>
                    <S.TableConnectBtn
                        onClick={() => {
                            if (dataIdx != undefined) {
                                onClickConnectBtn(fileNoList[dataIdx]);
                            }
                        }}
                    >
                        연결하기
                    </S.TableConnectBtn>
                </S.TableTd>
            );
        }
    };

    return (
        <S.Block open={props.visible} onClose={onCloseModal}>
            <S.ListContainer>
                <LoadingIndicatorComponent open={isLoading} style={{ zIndex: 100 }} />
                <S.CloseBtn onClick={onCloseModal}>
                    <Close style={{ fontSize: "1.6em" }} />
                </S.CloseBtn>
                <S.AlertText>파일을 검색해서 연결해주세요.</S.AlertText>
                <S.SearchDiv>
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
                </S.SearchDiv>
                <S.TableBoxDiv>
                    <GridViewComponent
                        titles={tableHeader}
                        keys={tableKeys}
                        headerClass="background-dark-sky-blue color-white align-center"
                        values={Object.values(dataList)}
                        fullData={dataList}
                        keysWidth={tableHeadSize}
                        datatype={tableHeadType}
                        getCustomEl={createCustomEl}
                        pageable
                        nowPage={currentPage}
                        nowPageSize={dataList.length}
                        onPageChange={(_skip: number, take: number, _currentPage: number) => {
                            if (currentPage != _currentPage && !isPageChangeFromModal) {
                                setIsPageChangeFromModal(true);
                                setCurrentPage(_currentPage);
                                setTimeout(() => {
                                    setIsPageChangeFromModal(false);
                                }, 0);
                            }
                        }}
                    />
                </S.TableBoxDiv>
            </S.ListContainer>
        </S.Block>
    );
};
