/******************************************************************************
 * Copyright (c) 2021. Moornmo Inc. Rights reserved.                          *
 * Data modelings and methods used are assets of Moornmo Inc.                 *
 * appwrapper/index.tsx
 * hooks :
 * useLocations
 *
 * last modify : jh.jeong@ilts.co.kr
 ******************************************************************************/
// Library
import React, { useState, useEffect, useContext, useRef, ChangeEvent } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"; // redux
import { Pagination } from "@material-ui/lab";
import MenuItem from "@material-ui/core/MenuItem";
import Switch from "@material-ui/core/Switch";
//
// Module
import * as S from "../styled/normallist.styled";
import { useLocations } from "hooks"; // locations hooks
import { reducerState } from "../common";
import { getMoment, downloadGeneralOfficialDocument } from "../common/utils";
import { LoadingIndicatorComponent, ModalInfo, ModalConfirm } from "components";
const moment = getMoment();
import {
    GetGeneralDocList,
    SetGeneralDocIsRead,
    GetGeneralDocListPaging,
    RefreshPageNumber,
} from "../common/action";
//

type paramTypes = {
    id?: string;
    type?: string;
};

const headStyle = { color: "black" };
const HEADSIZE = [0, 5, 10, 10, 40, 5, 5, 5, 10, 10];
const SearchType = ["제목", "제목 + 내용", "작성자"];

const NormalList = (props: any) => {
    const dispatch = useDispatch();
    const { path, pushHistory, back } = useLocations();
    const dsSelector = useSelector((state: reducerState) => state.digitalsign);
    const userSelector = useSelector((state: reducerState) => state.user);
    const { id, type } = useParams<paramTypes>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isReadList, setIsReadList] = useState<number[]>([]);
    const [isNoList, setIsNoList] = useState<boolean>(false);
    const [isSearch, setIsSearch] = useState<boolean>(false);
    //일괄다운로드
    const [useCheckbox, setUseCheckbox] = useState<boolean>(false);
    const [checkItems, setCheckItems] = useState<number[]>([]);
    const [isToggle, setisToggle] = useState<boolean>(false);
    const [useToggleBtn, setUseToggleBtn] = useState<boolean>(false);
    const [signType, setSignType] = useState<number>(0);
    const [docType, setDocType] = useState<object[]>([]);
    const [startDay, setStartDay] = useState<Date>();
    const [endDay, setEndDay] = useState<Date>();
    const [searchText, setSearchText] = useState<string>("");

    const [pageIdx, setPageIdx] = useState<number>(1);
    const [tabIdx, setTabIdx] = useState<number>(0);
    const [pageable, setPageable] = useState<boolean>(true);
    const [pageCount, setPageCount] = useState<number>(0);
    const [pageData, setPageData] = useState<object[]>([]);
    const [tabData, setTabData] = useState<object[]>([]);

    const [selectedDocType, setSelectedDocType] = useState<number>(-1);
    const [selectedType, setSelectedType] = useState<number>(0);
    const [selectedDocId, setSelectedDocId] = useState<number>(0);

    useEffect(() => {
        setIsLoading(true);
        setIsNoList(false);
        setTabData([]);
        setSearchText("");
        setSelectedType(0);
        setIsSearch(false);
        //일괄다운로드
        setUseToggleBtn(false);
        setUseCheckbox(false);
        setisToggle(false);
        setPageable(true);
        setCheckItems([]);
        if (type && typeof type.toString() == "string") {
            dispatch(GetGeneralDocListPaging(type));
            setTimeout(() => {
                dispatch(GetGeneralDocList(type));
            }, 3000);
        }
        var date = new Date();
        setStartDay(new Date(date.getFullYear(), date.getMonth(), 1));
        setEndDay(new Date(date.getFullYear(), date.getMonth() + 1, 0));
    }, [path]);

    useEffect(() => {
        if (dsSelector.gDoc_codes) {
            setDocType([...dsSelector.gDoc_codes]);
        }
    }, [dsSelector.gDoc_codes]);

    useEffect(() => {
        if (dsSelector.gDoc_list && dsSelector.gDoc_list.length > 0) {
            if (type && /group/.test(type)) {
                setUseToggleBtn(true);
            }
            initializeData();
            setIsNoList(false);
            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        } else if (dsSelector.gDoc_list && dsSelector.gDoc_list.length == 0) {
            setIsNoList(true);
            let _data = [];
            let obj = {
                id: -1,
                NO: -1,
                문서구분: null,
                문서번호: null,
                제목: null,
                작성자: null,
                발신: null,
                첨부파일: null,
            };
            if (type == `send` || type == `groupsend`) {
                Object.assign(obj, { 발송일자: null });
            } else {
                Object.assign(obj, { 수신일자: null });
            }
            Object.assign(obj, { 상태: null });
            _data.push(obj);
            setTabData([..._data]);
            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        }
    }, [dsSelector.gDoc_list, selectedDocType, useCheckbox]);

    useEffect(() => {
        setPageData([...tabData.slice((pageIdx - 1) * 10, (pageIdx - 1) * 10 + 10)]);
    }, [pageIdx]);

    useEffect(() => {
        if (dsSelector.set_general_doc_is_read_fin && selectedDocId != 0) {
            setTimeout(() => {
                setIsLoading(false);
                pushHistory("/document/normal/view/" + selectedDocId);
            }, 1500);
            setSelectedDocId(0);
        }
    }, [dsSelector.set_general_doc_is_read_fin]);

    useEffect(() => {
        if (dsSelector.page_data != undefined) {
            if (dsSelector.page_data.path == path) {
                setPageIdx(dsSelector.page_data.page);
            } else {
                setPageIdx(1);
            }
        }
    }, [dsSelector.page_data, path]);

    const handleChange = (e: ChangeEvent<{ name?: string; value: any }>, type: number) => {
        if (type == 0) setSelectedDocType(e.target.value);
        else if (type == 1) setSelectedType(e.target.value);
    };

    const onClickRow = async (id: number) => {
        let _filter = dsSelector.gDoc_list.filter((raw: any) => raw.id == id);
        if (useCheckbox) {
            onChangeCheckbox(_filter[0], !checkItems.includes(_filter[0].id));
            return;
        }
        if (_filter && _filter.length > 0) {
            if (_filter[0].state == 3) {
                let flag = isReadList.indexOf(id);
                setSelectedDocId(id);
                setIsRead(id, flag);
            }
            if (_filter[0].state == 0) {
                pushHistory("/document/normal/edit/" + id);
            } else {
                pushHistory("/document/normal/view/" + id);
            }
        }
    };

    const setIsRead = async (id: number, flag: number) => {
        if (flag != -1) {
            isReadList.splice(isReadList.indexOf(id), 1);
            setIsReadList([...isReadList]);
            setIsLoading(true);
            await dispatch(SetGeneralDocIsRead(id));
        } else {
            pushHistory("/document/normal/view/" + id);
        }
    };

    const getStateText = (
        state: number,
        duser_id: number,
        read_text: string,
        is_read: number | undefined = undefined
    ) => {
        let _text = `\n` + read_text;
        if (type == `grouprecv`) _text = "";
        switch (state) {
            case 0:
                return "작성 중";
            case 1:
                return "진행 중";
            case 2:
                return "결재 완료";
            case 3:
                if (type == `send` || type == `groupsend`) return "발송" + _text;
                if (is_read != undefined) {
                    if (is_read == 1) return "읽음";
                    else return "읽지않음";
                }
                return "수신"; //+ _text;
            case 4:
                return "반려";
            default:
                return "";
        }
    };

    const initializeData = () => {
        let _data: any[] = [];
        let _list: number[] = [];
        let is_read = "";
        let idx = 0;
        for (var d of dsSelector.gDoc_list) {
            idx += 1;
            if (d.state != 0 && d.state != 1) is_read = `( ${d.read_sum} / ${d.recv_sum} )`;
            let obj = {
                id: d.id,
                NO: idx.toString(),
                문서구분: d.code,
                문서번호: d.code_no,
                제목: d.title,
                작성자: d.creator,
                발신: d.sender,
                첨부파일: d.file_count,
            };
            if (type == `send` || type == `groupsend`) {
                Object.assign(obj, { 발송일자: moment(d.sended_at).format("YYYY-MM-DD HH:mm") });
            } else {
                Object.assign(obj, { 수신일자: moment(d.sended_at).format("YYYY-MM-DD HH:mm") });
            }
            Object.assign(obj, { 상태: getStateText(d.state, d.user_id, is_read, d.is_read) });
            _data.push(obj);
            if (d.is_read == 0) _list.push(d.id);
        }
        if (_list.length > 0) setIsReadList(_list);

        if (_data.length > 0) {
            let data = [];
            for (var d of _data) {
                let real_data = dsSelector.gDoc_list.filter((raw: any) => raw.id == d.id);
                if (selectedDocType != -1) {
                    if (real_data[0].code_id == selectedDocType) data.push(d);
                } else data.push(d);
            }
            let searchData: any[] = [];
            // let isSearch = (selectedType == 0 || selectedType == 1) && searchText.length > 0;
            if (isSearch) {
                setCheckItems([]);
                for (var d of data) {
                    let _endDay = moment(endDay).add(1, "days").toDate();
                    let filtered = dsSelector.gDoc_list.filter((raw: any) => {
                        let isBetween: boolean = moment(raw.sended_at).isBetween(startDay, _endDay);
                        if (raw.id != d.id) return false;
                        if (!isBetween) return false;
                        if (selectedType == 0) return raw.title?.includes(searchText);
                        else if (selectedType == 1)
                            return (
                                raw.title?.includes(searchText) || raw.content?.includes(searchText)
                            );
                        else if (selectedType == 2) return raw.creator?.includes(searchText);
                        else return true;
                    });
                    if (filtered.length > 0) searchData.push(d);
                }
            }
            if (pageable) {
                let _pageCount =
                    Math.floor(isSearch ? searchData.length / 10 : data.length / 10) + 1;
                setPageCount(_pageCount);
                setPageData(
                    isSearch
                        ? [...searchData.slice((pageIdx - 1) * 10, (pageIdx - 1) * 10 + 10)]
                        : [...data.slice((pageIdx - 1) * 10, (pageIdx - 1) * 10 + 10)]
                );
            } else {
                setPageData(isSearch ? searchData : data);
            }
            setTabData(isSearch ? searchData : data);
        }
    };

    const onChangePageIdx = (page: number) => {
        if (page == 0) return;
        dispatch(RefreshPageNumber(page, path));
        setPageIdx(page);
    };

    const onClickSearch = () => {
        let _isSearch =
            (selectedType == 0 || selectedType == 1 || selectedType == 2) && searchText.length > 0;
        setIsLoading(true);
        setIsSearch(true);
        dispatch(GetGeneralDocList(type, selectedType, searchText));
    };

    const onClickToggleBtn = () => {
        if (useCheckbox && checkItems.length > 0) {
            ModalConfirm(
                `${checkItems.length}건의 문서를 다운로드 하시겠습니까 ?`,
                (result: boolean) => {
                    if (result) {
                        let user_id: number = userSelector.id;
                        downloadGeneralOfficialDocument(checkItems, signType, user_id);
                    }
                }
            );
        } else {
            setCheckItems([]);
            setUseCheckbox(!useCheckbox);
            setisToggle(!isToggle);
            setPageable(!pageable);
        }
    };

    const onChangeCheckbox = (rowData: any, checked: boolean) => {
        let _checkItems = checkItems.slice();
        if (rowData == -1) {
            //전체선택
            if (checked) {
                tabData.map((d: any) => {
                    if (d.id && checkItems.indexOf(d.id) == -1) {
                        _checkItems.push(d.id);
                    }
                });
            } else {
                _checkItems = [];
            }
        } else {
            if (checked) {
                if (_checkItems.indexOf(rowData.id) == -1) {
                    _checkItems.push(rowData.id);
                }
            } else {
                _checkItems.splice(_checkItems.indexOf(rowData.id), 1);
            }
        }
        setCheckItems(_checkItems);
    };

    const onSwitchChange = (isChecked: boolean) => {
        setSignType(isChecked ? 1 : 0);
    };

    return (
        <S.Block>
            <LoadingIndicatorComponent open={isLoading} />
            <S.Inner>
                <S.SearchBar>
                    <S.SearchDocType
                        value={selectedDocType}
                        onChange={e => {
                            handleChange(e, 0);
                        }}
                        disableUnderline={true}
                    >
                        <MenuItem value={-1}>
                            <em>문서구분</em>
                        </MenuItem>
                        {docType.map((raw: any, idx: number) => {
                            return (
                                <MenuItem key={idx} value={raw.id}>
                                    {raw.text}
                                </MenuItem>
                            );
                        })}
                    </S.SearchDocType>
                    <S.SearchDateDiv>
                        {type == `send` || type == `groupsend` ? "발신날짜" : "접수날짜"}
                        <S.Date
                            disableToolbar
                            variant="inline"
                            format="yyyy-MM-DD"
                            id="date-picker-inline"
                            value={startDay}
                            onChange={(date: any) => setStartDay(date)}
                            KeyboardButtonProps={{
                                "aria-label": "change date",
                            }}
                            InputProps={{
                                disableUnderline: true,
                                style: { fontSize: `1.2em`, textAlign: `center` },
                            }}
                        />
                        ~
                        <S.Date
                            disableToolbar
                            variant="inline"
                            format="yyyy-MM-DD"
                            id="date-picker-inline"
                            value={endDay}
                            onChange={(date: any) => setEndDay(date)}
                            KeyboardButtonProps={{
                                "aria-label": "change date",
                            }}
                            InputProps={{
                                disableUnderline: true,
                                style: { fontSize: `1.2em`, textAlign: `center` },
                            }}
                        />
                    </S.SearchDateDiv>
                    <S.SearchType
                        value={selectedType}
                        onChange={e => {
                            handleChange(e, 1);
                        }}
                        disableUnderline={true}
                    >
                        {SearchType.map((val: string, idx: number) => {
                            return (
                                <MenuItem key={idx} value={idx}>
                                    {val}
                                </MenuItem>
                            );
                        })}
                    </S.SearchType>
                    <S.SearchText
                        value={searchText}
                        onChange={e => setSearchText(e.target.value)}
                        onKeyUp={e => {
                            if (e.key == `Enter`) onClickSearch();
                        }}
                        InputProps={{
                            disableUnderline: true,
                        }}
                    />
                    <S.SearchBtn onClick={onClickSearch}>검색하기</S.SearchBtn>
                    {useToggleBtn && (
                        <S.ToggleBtn
                            $isActive={isToggle}
                            onClick={e => {
                                onClickToggleBtn();
                            }}
                        >
                            {useCheckbox
                                ? checkItems.length > 0
                                    ? "선택 완료"
                                    : "취소"
                                : "다운로드"}
                        </S.ToggleBtn>
                    )}
                </S.SearchBar>
                <S.TableContainer>
                    {isToggle && (
                        <S.SwichDiv>
                            <S.SwichLabel>{signType ? "결재포함" : "결재미포함"}</S.SwichLabel>
                            <Switch
                                onChange={e => {
                                    onSwitchChange(e.target.checked);
                                }}
                            />
                        </S.SwichDiv>
                    )}
                    <S.BoardTable aria-label="simple table">
                        <S.TableHeadDiv>
                            <S.BoardHeadRow>
                                {useCheckbox && (
                                    <S.TableHeadCell $headSize={5}>
                                        <S.TableCheckbox
                                            onChange={e => {
                                                onChangeCheckbox &&
                                                    onChangeCheckbox(-1, e.target.checked);
                                            }}
                                        />
                                    </S.TableHeadCell>
                                )}
                                {tabData &&
                                    tabData.length > 0 &&
                                    Object.keys(tabData[0]).map((raw, idx) => {
                                        if (raw.indexOf("id") != -1) return;
                                        return (
                                            <S.TableHeadCell
                                                style={headStyle}
                                                align="center"
                                                key={idx}
                                                $headSize={HEADSIZE[idx]}
                                            >
                                                {raw}
                                            </S.TableHeadCell>
                                        );
                                    })}
                            </S.BoardHeadRow>
                        </S.TableHeadDiv>
                        <S.BoardBody>
                            {tabData && !isNoList ? (
                                pageData.map((row, idx) => (
                                    <S.TableBodyRow
                                        key={"tableRow" + idx}
                                        onClick={() => onClickRow(Object.values(row)[0])}
                                    >
                                        {useCheckbox && (
                                            <S.TableBodyCell>
                                                <S.TableCheckbox
                                                    onChange={e => {
                                                        onChangeCheckbox &&
                                                            onChangeCheckbox(row, e.target.checked);
                                                    }}
                                                    checked={
                                                        checkItems != undefined
                                                            ? checkItems.indexOf(
                                                                  Object.values(row)[0]
                                                              ) != -1
                                                            : false
                                                    }
                                                />
                                            </S.TableBodyCell>
                                        )}
                                        {Object.values(row).map((value, val_idx) => {
                                            if (val_idx == 0) return;

                                            return (
                                                <S.TableBodyCell
                                                    key={"tableCell" + val_idx}
                                                    align="center"
                                                    style={
                                                        val_idx == 4
                                                            ? { cursor: "pointer" }
                                                            : undefined
                                                    }
                                                    // onClick={()=>onClickCell(Object.values(row)[0], val_idx)}
                                                >
                                                    {value}
                                                </S.TableBodyCell>
                                            );
                                        })}
                                    </S.TableBodyRow>
                                ))
                            ) : (
                                <tr>
                                    <S.TableBodyCell
                                        style={{
                                            padding: "10px",
                                        }}
                                        colSpan={tabData[0] ? Object.keys(tabData[0]).length : 0}
                                    >
                                        표시할 데이터가 없습니다 .
                                    </S.TableBodyCell>
                                </tr>
                            )}
                        </S.BoardBody>
                    </S.BoardTable>
                </S.TableContainer>
                <S.TableFooter $pageAble={pageable}>
                    <S.pagingdiv>
                        <Pagination
                            count={pageCount}
                            defaultPage={1}
                            onChange={(e: any, page: any) => onChangePageIdx(page)}
                        />
                    </S.pagingdiv>
                </S.TableFooter>
            </S.Inner>
        </S.Block>
    );
};

export default NormalList;
