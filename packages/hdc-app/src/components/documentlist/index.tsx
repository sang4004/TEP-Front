/******************************************************************************
 * * hooks :
 * useLocations
 *
 * components :
 * ConfirmButton
 *
 ******************************************************************************/
// Library
import React, { useState, useEffect } from "react";
import * as S from "./styled";
import Pagination from "@material-ui/lab/Pagination";
import Switch from "@material-ui/core/Switch";
import {
    CleanSignData,
    GetOfflineSignList,
    GetSignDocRecvList,
    GetSignDocSendList,
    GetTempDocList,
    NewOfflineSign,
    RefreshPageNumber,
    UploadAttachFile,
} from "../../common/action";
import { useDispatch, useSelector } from "react-redux";
import MenuItem from "@material-ui/core/MenuItem";
import moment from "moment";
import { OriginDocument } from "../originDocu";
import { LoadingIndicatorComponent, ModalInfo, ModalError } from "components";
import { reducerState } from "../../common";
import { useLocations } from "hooks";

export type DocumentListProps = {
    data: object[];
    alldata: object[];
    style?: object;
    checkStyle?: object;
    tableStyle?: object;
    headStyle?: object;
    cellSelect?: (idx: number, row_idx: number) => void;
    rowSelect?: (idx: number) => void;
    headSize: number[];
    datetype?: string;
    formlist?: object[];
    searchlist?: string[];
    multiSelect?: boolean;
    onClickTitle?: (id: number) => void;
    titleIdx?: number;
    path?: string;
    useCheckbox?: boolean;
    useToggleBtn?: boolean;
    useSwitch?: boolean;
    switchLabel?: string;
    onSwitchChange?: (isChecked: boolean) => void;
    isToggle?: boolean;
    toggleBtnText?: string;
    onClickToggleBtn?: () => void;
    onChangeCheckbox?: (rowData: any, checked: boolean) => void;
    checkItems?: number[];
    pageable?: boolean;
    isAdmin?: boolean;
    selectType?: string;
};
interface FinalDocumentListProps extends DocumentListProps {}

export const DocumentListComp: React.FunctionComponent<FinalDocumentListProps> = (
    props: FinalDocumentListProps
) => {
    const dispatch = useDispatch();
    const { path } = useLocations();
    const dsSelector = useSelector((state: reducerState) => state.digitalsign);
    const [selectedRowIdx, setSelectedRowIdx] = useState<number>(-1);
    const [selectedRowIdxList, setSelectedRowIdxList] = useState<number[]>([]);
    const [pageCount, setPageCount] = useState<number>(0);
    const [pageData, setPageData] = useState<object[]>([]);
    const [tabData, setTabData] = useState<object[]>([]);
    const [pageIdx, setPageIdx] = useState<number>(1);
    const [searchdata, setSearch] = useState<string>("");

    const [startDay, setStartDay] = useState<Date>();
    const [endDay, setEndDay] = useState<Date>();
    const [searchType, setSearchType] = useState<string[]>([]);
    const [formType, setFormType] = useState<string[]>(["전체", "일반문서"]);

    const [selectedType, setSelectedType] = useState<number>(0);
    const [selectedForm, setSelectedForm] = useState<number>(0);

    const [isOriginDocu, setIsOriginDocu] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [offlineFile, setOfflineFile] = useState<File[]>([]);
    const [addType, setAddType] = useState<number>(-1);

    useEffect(() => {
        var date = new Date();
        setStartDay(new Date(date.getFullYear(), date.getMonth(), 1));
        setEndDay(date);
        setIsLoading(true);
    }, []);

    useEffect(() => {
        if (path && path.indexOf("recieved") != -1) {
            setAddType(0);
        } else if (path && path.indexOf("sent") != -1) {
            setAddType(1);
        } else if (path && path.indexOf("fbtemporary") != -1) {
            setAddType(2);
        }
    }, [path]);

    useEffect(() => {
        if (props.rowSelect) props.rowSelect(selectedRowIdx);
    }, [selectedRowIdx]);

    useEffect(() => {
        setPageData([...tabData.slice((pageIdx - 1) * 10, (pageIdx - 1) * 10 + 10)]);
    }, [pageIdx]);

    useEffect(() => {
        if (props.data.length > 0) {
            initializeData(false);
            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        }
        if (props.searchlist) setSearchType(props.searchlist);
    }, [props.data, selectedForm]);

    useEffect(() => {
        if (props.formlist) {
            let _list: any[] = props.formlist;

            let _form: string[] =
                props.selectType == "group" || props.selectType == "user"
                    ? ["전체", "통영에코파워(주)_기존공문"]
                    : ["전체", "일반문서"];
            for (var d of _list) _form.push(d.company + `_` + d.title);
            setFormType(_form);
        }
    }, [props.formlist]);

    useEffect(() => {
        if (dsSelector.new_offline_sign_id && dsSelector.new_offline_sign_id > 0) {
            for (var f of offlineFile) {
                dispatch(UploadAttachFile(f, dsSelector.new_offline_sign_id));
            }
            setOfflineFile([]);
            setIsLoading(false);
            ModalInfo("추가완료");
            dispatch(GetOfflineSignList());
        } else if (dsSelector.new_offline_sign_id == 0) {
            setIsLoading(false);
            ModalInfo("문서코드가 중복되었습니다.");
        }
    }, [dsSelector.new_offline_sign_id]);

    useEffect(() => {
        if (dsSelector.page_data != undefined) {
            if (dsSelector.page_data.path == path) {
                setPageIdx(dsSelector.page_data.page);
            } else {
                setPageIdx(1);
            }
        }
    }, [dsSelector.page_data, path]);

    useEffect(() => {
        initializeData(false);
    }, [props.pageable]);

    const initializeData = (is_search: boolean) => {
        if (props.data.length > 0) {
            setIsLoading(true);
            let _data = props.alldata;
            let _ids: number[] = [];
            let data = [];
            for (var d of _data) {
                let objList = Object.values(d);
                let filtered = _data.filter((raw: any) => {
                    if (formType.length == 0) return raw.id == objList[0];
                    else
                        return (
                            raw.id == objList[0] &&
                            (selectedForm == 0 ||
                                (selectedForm == 1 &&
                                    raw.document_type == formType[selectedForm]) ||
                                raw.form == formType[selectedForm])
                        );
                });
                if (filtered.length > 0) _ids.push(objList[0]);
            }
            let searchData: any[] = [];
            if (is_search) {
                for (var d of _data.filter((raw: any) => _ids.indexOf(raw.id) != -1)) {
                    let objList = Object.values(d);
                    let filtered = _data.filter((raw: any) => {
                        let _endDay = moment(endDay).add(1, "days").toDate();
                        let isBetween = moment(raw.date).isBetween(startDay, _endDay);
                        if (addType == 0) {
                            isBetween =
                                isBetween ||
                                (raw.registed_at &&
                                    moment(raw.registed_at).isBetween(startDay, _endDay));
                        } else if (addType == 1) {
                            isBetween =
                                isBetween ||
                                (raw.sended_at &&
                                    moment(raw.sended_at).isBetween(startDay, _endDay));
                        }

                        let sameId = raw.id == objList[0];
                        if (selectedType == 0)
                            // title
                            return sameId && isBetween && raw.title.includes(searchdata);
                        else if (selectedType == 1)
                            // document code
                            return sameId && isBetween && raw.document_code.includes(searchdata);
                        else if (selectedType == 2 && searchType[2] == "기안자")
                            // creator
                            return sameId && isBetween && raw.creator.includes(searchdata);
                        else if (
                            selectedType == 2 &&
                            searchType[2] == "접수자" &&
                            raw.receiver != ""
                        )
                            // receiver
                            return sameId && isBetween && raw.receiver?.includes(searchdata);
                        // content..?
                        else return sameId && isBetween;
                    });
                    if (filtered.length == 0) _ids.splice(_ids.indexOf(objList[0]), 1);
                }
            }
            for (var d of props.data) {
                let objList = Object.values(d);
                if (_ids.indexOf(objList[0]) != -1) {
                    searchData.push(d);
                    data.push(d);
                }
            }
            if (props.pageable) {
                let page = is_search ? searchData.length / 10 : data.length / 10;
                if (Math.floor(page) == page) page -= 1;
                let _pageCount = Math.floor(page) + 1;
                setPageCount(_pageCount);
                setPageData(
                    is_search
                        ? [...searchData.slice((pageIdx - 1) * 10, (pageIdx - 1) * 10 + 10)]
                        : [...data.slice((pageIdx - 1) * 10, (pageIdx - 1) * 10 + 10)]
                );

                setTabData(is_search ? searchData : data);
            } else {
                setPageData(data);
            }

            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        }
    };

    const onClickRow = async (data: any) => {
        if (props.multiSelect) {
            let _exist = selectedRowIdxList.indexOf(data.id);
            if (_exist != -1) {
                selectedRowIdxList.splice(_exist, 1);
                setSelectedRowIdxList([...selectedRowIdxList]);
            } else {
                setSelectedRowIdxList([...selectedRowIdxList, data.id]);
            }
            return;
        }
        if (props.onClickTitle) {
            await dispatch(CleanSignData());
            props.onClickTitle(data.idx);
        }
    };

    const onChangePageIdx = (page: number) => {
        if (page == 0) return;
        dispatch(RefreshPageNumber(page, path));
        setPageIdx(page);
    };

    const AddOriginDocu = async (data: any, files: File[]) => {
        if (props.path) {
            setIsLoading(true);
            setOfflineFile(files);
            if (addType != -1) {
                await dispatch(
                    NewOfflineSign(data.no, data.title, data.vendor, data.date, addType)
                );
            } else {
                ModalError("시스템 오류가 발생하였습니다. 새로고침 후 다시 시도해주세요.");
            }
            if (addType == 1) {
                dispatch(GetSignDocSendList("group"));
            } else if (addType == 0) {
                dispatch(GetSignDocRecvList("group"));
            } else {
                dispatch(GetTempDocList());
            }
        }
    };

    const onChangeDate = (date: any, type: "start" | "end") => {
        if (type == "start") {
            setStartDay(moment(date).toDate());
        } else if (type == "end") {
            setEndDay(moment(date).toDate());
        }
    };
    return (
        <S.TableWrap>
            {/* {searchType.length <= 0 && <S.TableTopMenu>
                <S.TableMenu 
                    TabIndicatorProps={{style : {backgroundColor : "#4B5964"}}} 
                    value={tabIdx} 
                    onChange={(e, value)=>setTabIdx(value)}
                    >
                    {tabList.map((val, idx)=>(
                        <S.BtnMenu key={idx} $selected={tabIdx == idx} label={val} />
                    ))}
                </S.TableMenu>
                <S.Searchdiv>
                    <S.SearchInput 
                        placeholder={"문서 검색"} 
                        value={searchdata}
                        onChange={onKeyPress}
                        />
                </S.Searchdiv>
            </S.TableTopMenu>} */}
            <LoadingIndicatorComponent open={isLoading} />
            <OriginDocument
                type={addType}
                visible={isOriginDocu}
                onClose={() => setIsOriginDocu(false)}
                onComplete={AddOriginDocu}
            />
            <S.SearchBar>
                <S.FormType
                    value={selectedForm}
                    onChange={(e: any) => setSelectedForm(parseInt(e.target.value))}
                    disableUnderline={true}
                >
                    {formType.map((val: string, idx: number) => {
                        return (
                            <MenuItem key={idx} value={idx}>
                                {val}
                            </MenuItem>
                        );
                    })}
                </S.FormType>
                <S.SearchDateDiv>
                    {props.datetype ? props.datetype : "기안날짜"}
                    <S.Date
                        id="date-picker-inline"
                        type="date"
                        value={moment(startDay).format("YYYY-MM-DD")}
                        onChange={(e: any) => onChangeDate(e.target.value, "start")}
                        min="2017-01-01"
                        max="2030-12-31"
                        // max={endDay}
                    />
                    ~
                    <S.Date
                        id="date-picker-inline"
                        type="date"
                        value={moment(endDay).format("YYYY-MM-DD")}
                        onChange={(e: any) => onChangeDate(e.target.value, "end")}
                        min="2017-01-01"
                        max="2030-12-31"
                        // min={startDay}
                    />
                </S.SearchDateDiv>
                <S.SearchType
                    value={selectedType}
                    onChange={(e: any) => setSelectedType(parseInt(e.target.value))}
                    disableUnderline={true}
                >
                    {searchType.map((val: string, idx: number) => {
                        return (
                            <MenuItem key={idx} value={idx}>
                                {val}
                            </MenuItem>
                        );
                    })}
                </S.SearchType>
                <S.SearchText
                    value={searchdata}
                    onChange={e => setSearch(e.target.value)}
                    onKeyUp={e => {
                        if (e.key == `Enter`) initializeData(true);
                    }}
                    InputProps={{
                        disableUnderline: true,
                    }}
                />
                <S.SearchBtn onClick={() => initializeData(true)}>검색하기</S.SearchBtn>
                {props.useToggleBtn && (
                    <S.ToggleBtn
                        $isActive={props.isToggle}
                        onClick={e => {
                            props.onClickToggleBtn && props.onClickToggleBtn();
                        }}
                    >
                        {props.toggleBtnText}
                    </S.ToggleBtn>
                )}

                {props.path && props.path.indexOf("group") != -1 && props.isAdmin && (
                    <S.AddBtn onClick={() => setIsOriginDocu(true)}>기존문서추가</S.AddBtn>
                )}
                {props.path && props.path.indexOf("temp") != -1 && props.isAdmin && (
                    <S.AddBtn onClick={() => setIsOriginDocu(true)}>문서등록</S.AddBtn>
                )}
            </S.SearchBar>
            <S.TableContainer style={props.style}>
                {props.useSwitch && (
                    <S.SwichDiv>
                        <S.SwichLabel>{props.switchLabel}</S.SwichLabel>
                        <Switch
                            onChange={e => {
                                if (props.onSwitchChange) {
                                    props.onSwitchChange(e.target.checked);
                                }
                            }}
                        />
                    </S.SwichDiv>
                )}

                <S.BoardTable aria-label="simple table" style={props.tableStyle}>
                    <S.TableHeadDiv>
                        <S.BoardHeadRow>
                            {props.useCheckbox && (
                                <S.TableHeadCell $headSize={5}>
                                    <S.TableCheckbox
                                        onChange={e => {
                                            props.onChangeCheckbox &&
                                                props.onChangeCheckbox(-1, e.target.checked);
                                        }}
                                    />
                                </S.TableHeadCell>
                            )}
                            {props.data &&
                                props.data.length > 0 &&
                                Object.keys(props.data[0]).map((raw, idx) => {
                                    if (raw.indexOf("id") != -1) return;
                                    return (
                                        <S.TableHeadCell
                                            style={props.headStyle}
                                            align="center"
                                            key={idx}
                                            $headSize={props.headSize[idx]}
                                        >
                                            {raw}
                                        </S.TableHeadCell>
                                    );
                                })}
                        </S.BoardHeadRow>
                    </S.TableHeadDiv>
                    <S.BoardBody>
                        {props.data && props.data.length > 0 ? (
                            pageData.map((row, idx) => (
                                <S.TableBodyRow
                                    key={"tableRow" + idx}
                                    $selected={
                                        props.multiSelect
                                            ? selectedRowIdxList.indexOf(idx) != -1
                                            : selectedRowIdx == Object.values(row)[0]
                                    }
                                    onClick={
                                        Object.values(row)[0] != -1
                                            ? () => onClickRow(row)
                                            : undefined
                                    }
                                >
                                    {props.useCheckbox && (
                                        <S.TableBodyCell>
                                            <S.TableCheckbox
                                                onChange={e => {
                                                    props.onChangeCheckbox &&
                                                        props.onChangeCheckbox(
                                                            row,
                                                            e.target.checked
                                                        );
                                                }}
                                                checked={
                                                    props.checkItems != undefined
                                                        ? props.checkItems.indexOf(
                                                              Object.values(row)[0]
                                                          ) != -1
                                                        : false
                                                }
                                            />
                                        </S.TableBodyCell>
                                    )}
                                    {Object.values(row).map((value, val_idx) => {
                                        if (val_idx == 0 || val_idx == 1) return;
                                        return (
                                            <S.TableBodyCell
                                                key={"tableCell" + val_idx}
                                                align="center"
                                                style={
                                                    val_idx == props.titleIdx
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
                                    colSpan={props.data[0] ? Object.keys(props.data[0]).length : 0}
                                >
                                    표시할 데이터가 없습니다 .
                                </S.TableBodyCell>
                            </tr>
                        )}
                    </S.BoardBody>
                </S.BoardTable>
            </S.TableContainer>
            <S.TableFooter $pageAble={props.pageable}>
                <S.pagingdiv>
                    <Pagination
                        count={pageCount}
                        defaultPage={1}
                        onChange={(e: any, page: any) => onChangePageIdx(page)}
                        page={pageIdx}
                    />
                </S.pagingdiv>
            </S.TableFooter>
        </S.TableWrap>
    );
};
