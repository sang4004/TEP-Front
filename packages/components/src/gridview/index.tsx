/******************************************************************************
 * gridview/index.tsx
 * gridview example
 * hooks :
 *
 ******************************************************************************/

/* tslint:disable */
import React, { useState, useEffect, useMemo } from "react"; // default hooks
import { useLocations, useWindowDimensions } from "hooks"; // locations hooks
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import {
    Grid,
    GridColumn as Column,
    GridSelectionChangeEvent,
    GridDataStateChangeEvent,
    GridExpandChangeEvent,
    GridRowProps,
    GridColumnMenuProps,
    GridColumnMenuFilter,
    GridNoRecords,
    GridItemChangeEvent,
    GridToolbar,
    getSelectedState,
    GridColumnMenuCheckboxFilter,
    GridColumnMenuSort,
    GridCellProps,
} from "@progress/kendo-react-grid";
import { ExcelExport } from "@progress/kendo-react-excel-export";
import { DataResult, process, State } from "@progress/kendo-data-query";
import { Pager, PagerProps } from "@progress/kendo-react-data-tools";

import likelySubtags from "cldr-core/supplemental/likelySubtags.json";
import currencyData from "cldr-core/supplemental/currencyData.json";
import weekData from "cldr-core/supplemental/weekData.json";

import numbers from "cldr-numbers-full/main/ko/numbers.json";
import currencies from "cldr-numbers-full/main/ko/currencies.json";
import caGregorian from "cldr-dates-full/main/ko/ca-gregorian.json";
import dateFields from "cldr-dates-full/main/ko/dateFields.json";
import timeZoneNames from "cldr-dates-full/main/ko/timeZoneNames.json";

load(
    likelySubtags,
    currencyData,
    weekData,
    numbers,
    currencies,
    caGregorian,
    dateFields,
    timeZoneNames
);

import {
    IntlProvider,
    load,
    LocalizationProvider,
    loadMessages,
} from "@progress/kendo-react-intl";
import { saveAs } from "@progress/kendo-file-saver";
import korMessages from "./kor.json";
import * as H from "./history";
loadMessages(korMessages, "ko-kr");

const trashIcon = (
    <svg
        width="18"
        height="21"
        viewBox="0 0 18 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <g clip-path="url(#clip0)">
            <path
                d="M1.28571 19.0311C1.28571 20.1185 2.14915 20.9999 3.21429 20.9999H14.7857C15.8508 20.9999 16.7143 20.1185 16.7143 19.0311V5.24988H1.28571V19.0311ZM12.2143 8.53113C12.2143 8.16856 12.502 7.87488 12.8571 7.87488C13.2123 7.87488 13.5 8.16856 13.5 8.53113V17.7186C13.5 18.0812 13.2123 18.3749 12.8571 18.3749C12.502 18.3749 12.2143 18.0812 12.2143 17.7186V8.53113ZM8.35714 8.53113C8.35714 8.16856 8.64482 7.87488 9 7.87488C9.35518 7.87488 9.64286 8.16856 9.64286 8.53113V17.7186C9.64286 18.0812 9.35518 18.3749 9 18.3749C8.64482 18.3749 8.35714 18.0812 8.35714 17.7186V8.53113ZM4.5 8.53113C4.5 8.16856 4.78768 7.87488 5.14286 7.87488C5.49804 7.87488 5.78571 8.16856 5.78571 8.53113V17.7186C5.78571 18.0812 5.49804 18.3749 5.14286 18.3749C4.78768 18.3749 4.5 18.0812 4.5 17.7186V8.53113ZM17.3571 1.31238H12.5357L12.158 0.545391C11.9949 0.211114 11.6602 -0.00052689 11.2942 -0.000116734H6.70179C6.33656 -0.0013472 6.00228 0.210293 5.84196 0.545391L5.46429 1.31238H0.642857C0.287679 1.31238 0 1.60606 0 1.96863V3.28113C0 3.64371 0.287679 3.93738 0.642857 3.93738H17.3571C17.7123 3.93738 18 3.64371 18 3.28113V1.96863C18 1.60606 17.7123 1.31238 17.3571 1.31238Z"
                fill="#666666"
            />
        </g>
        <defs>
            <clipPath id="clip0">
                <rect width="18" height="21" fill="white" />
            </clipPath>
        </defs>
    </svg>
);

export type gridViewChildrenType = {
    [key: string]: {
        field: string; // ex ) filed.children_filed_name
        title: string; // ex ) children_filed_name
        headerClassName?: string; // ex ) same class_name other headerClass
        className?: string; // ex ) same class_name other headerClass
    }[];
};

type editType = "text" | "numeric" | "boolean" | "date";

export type gridViewProps = {
    keys: string[];
    titles: string[];
    values: object[];
    keysWidth?: number[] | string[];
    keysWidthTotal?: number;
    datatype?: number[];
    isAddCustomText?: string;
    // func flag
    isDel?: boolean;
    isEdit?: boolean;
    isAdd?: boolean;
    isAddCustom?: boolean;
    isSearch?: boolean;
    isSelect?: boolean;
    isSelectFake?: boolean;
    isSelectSingle?: boolean;
    isCustomBtn?: boolean;
    //edit func
    editKey?: any; // unique key need For edit feature
    editType?: any[]; // editType
    onItemChanged?: (keyVal: any, data: any) => void;
    //select func
    selectKey?: any;
    //tool btn props
    addIcon?: string;
    customBtnText?: string[];
    // change event
    onClickAdd?: () => void;
    onClickAddCustom?: () => void;
    onClickApply?: () => void;
    onClickDel?: (data: any) => void;
    onClickRow?: (idx: number, selectedRow?: any) => void;
    onDoubleClickRow?: (selectedItem: any) => void;
    onContextMenu?: (event: any, idx: number) => void;
    onChangeSelect?: (selectItems: any) => void;
    onChangeEditMode?: (event: any) => void;
    onClickCustomBtn?: (customIdx: number) => void;
    onPageChange?: (skip: number, take: number, currentPage: number) => void;
    onPageTotalChange?: (total: number) => void;
    //style
    headerClass?: string;
    rowClass?: string;
    rowColors?: any[];
    headerStyle?: any;
    rowStyle?: any;
    gridStyle?: any;
    //get select row
    getCustomEl?: (
        idx: number,
        dataIdx?: number,
        columnIdx?: number,
        dataItem?: any,
        e?: GridCellProps
    ) => any;
    //custom list
    //full data for multi column
    gridChildren?: gridViewChildrenType;
    //custom grid params
    fullData?: any[];
    sortable?: boolean;
    filterable?: boolean;
    groupable?: boolean;
    reorderable?: boolean;
    pageable?: boolean;
    // paging API 에서 현재 페이지의 데이터만 내려줄때 사용하는 플래그
    pagefake?: boolean;
    //
    pagecount?: number;
    nowPage?: number;
    nowPageSize?: number;
    sort?: { field: string; dir: string }[];
    group?: { field: string }[];
    lockedColumns?: boolean[];
    filter?: { filters: any; logic: string }[];
    //
    excelFilename?: string;
    noRecordsMsg?: string;
    queryString?: string;
    historyRecord?: boolean; // querystring 사용플래그
    onPopAction?: () => void;
};
interface FinalgridViewProps extends gridViewProps {}

function isStringArray(value: any): value is number[] {
    if (value instanceof Array) {
        value.forEach(function (item) {
            // maybe only check first value?
            if (typeof item !== "number") {
                return false;
            }
            return true;
        });
        return true;
    }
    return false;
}

interface PageState {
    take: number;
    skip: number;
}

export const GridViewComponent: React.FunctionComponent<FinalgridViewProps> = (
    props
) => {
    const { width } = useWindowDimensions();
    const [keysWidth, setKeysWidth] = useState<string[]>([]);
    const { location, push, action, replace } = useHistory();
    const [cellEnabled, setCellEnabled] = useState<boolean>(false);
    const [dragEnabled, setDragEnabled] = useState<boolean>(false);
    const [headerClass, setHeaderClass] = useState<string[]>([]);
    const [headerType, setHeaderType] = useState<number[]>([]);
    const [rowClass, setRowClass] = useState<string[]>([]);
    const [editId, setEditId] = useState<number | null>(null);
    const [editKey, setEditKey] = useState<string>("");
    const [fullData, setFullData] = useState<any[]>([]);
    const [originData, setOriginData] = useState<any[]>([]);
    const [searchTimer, setSearchTimer] = useState<any>();
    const [page, setPage] = useState<PageState>({ skip: 0, take: 20 });
    const [pageTotal, setPageTotal] = useState<number>(0);
    const [isFiltering, setIsFiltering] = useState<boolean>(false);
    const [queryString, setQueryString] = useState<string[]>([]);
    const [isPushed, setIsPushed] = useState<boolean>(false);
    const [isPop, setIsPop] = useState<boolean>(false);
    const _grid = React.useRef<any>();
    const _export = React.useRef<ExcelExport | null>(null);

    //default data set
    const [dataState, setDataState] = useState<State>({
        skip: 0,
        take: 20,
    });
    const [dataResult, setDataResult] = useState<DataResult>();
    const [selectedState, setSelectedState] = useState({});

    useEffect(() => {
        if (action == "POP") {
            setIsPushed(false);
            setIsPop(true);
            if (props.onPopAction) props.onPopAction();
            if (props.historyRecord)
                setQueryString(location.search.replace(/^\?/, "").split("&"));
            let state: any = location.state;
            let _dataState: State = state?.dataState;
            if (_dataState && props.fullData) {
                insertDataState(_dataState, false);
                if (_dataState.skip != undefined && _dataState.take) {
                    setPage({ skip: _dataState.skip, take: _dataState.take });
                }
                setDataResult(process(props.fullData, _dataState));
            } else {
                setPage({ skip: 0, take: 20 });
            }
        }
    }, [location.search]);

    useEffect(() => {
        if (Object.keys(selectedState).length > 0)
            makeFullData(props.fullData, selectedState);
    }, [selectedState]);

    useEffect(() => {
        //history.action check
        if (!props.historyRecord) return;
        let _queryString: string = queryString.join("&");
        if (props.queryString && props.queryString != "" && !isPop) {
            _queryString = `${props.queryString}${
                _queryString != "" ? "&" : ""
            }${_queryString}`;
        }
        if (_queryString != "" && `?${_queryString}` != location.search) {
            //첫방문일때 queryString이 있을경우
            if (page.skip == 0 && !isPushed) {
                replace(`${location.pathname}?${_queryString}`, {
                    dataState: dataState,
                });
            } else {
                push(`${location.pathname}?${_queryString}`, {
                    dataState: dataState,
                });
            }
        }
        if (isPop) setIsPop(false);
        setIsPushed(true);
    }, [queryString]);

    useEffect(() => {
        let _headerClass: string[] = [];
        _headerClass = [...props.keys.map((raw) => `${props.headerClass}`)];
        if (props.lockedColumns && props.lockedColumns.length > 0) {
            for (var i = 0; i < props.keys.length; i++) {
                if (props.lockedColumns[i]) {
                    if (props.lockedColumns.length - 1 == i)
                        _headerClass[i] += " border-right-color-black";
                    _headerClass[i] += " border-color-light-black";
                }
            }
        }
        setHeaderClass([..._headerClass]);

        if (props.rowClass) {
            let _rowClass = [...props.keys.map((raw) => `${props.rowClass}`)];
            if (props.lockedColumns && props.lockedColumns.length > 0) {
                for (var i = 0; i < props.keys.length; i++) {
                    if (
                        props.lockedColumns[i] &&
                        props.lockedColumns.length - 1 == i
                    ) {
                        _rowClass[i] =
                            "border-right-color-black " + _rowClass[i];
                    }
                }
            }
            setRowClass([..._rowClass]);
        }
    }, [props.keys]);

    useEffect(() => {}, [props.rowClass]);

    useEffect(() => {
        if (props.datatype) setHeaderType([...props.datatype]);
    }, [props.datatype]);

    useEffect(() => {
        if (props.onPageChange)
            props.onPageChange(
                page.skip,
                page.take,
                Math.floor(page.skip / page.take) + 1
            );
        if (page.skip != undefined && page.take != undefined) {
            // makeFullData(props.fullData);
            insertDataState({ skip: page.skip, take: page.take }, true);
            // setDataState((prevState) => {
            //     return { ...prevState, skip: page.skip, take: page.take };
            // });
        }
    }, [page]);

    useEffect(() => {
        if (
            props.nowPage &&
            props.nowPage > 1 &&
            page.skip != (props.nowPage - 1) * 20
        ) {
            setPage({ skip: (props.nowPage - 1) * 20, take: 20 });
        } else if (props.nowPage == 1) {
            setPage({ skip: 0, take: 20 });
        }
    }, [props.nowPage]);

    useEffect(() => {
        if (props.nowPageSize) {
            setPageTotal(Math.floor(props.nowPageSize / 20) + 1);
            if (
                Math.floor(props.nowPageSize / 20) + 1 <
                Math.floor(page.skip / page.take) + 1
            ) {
                setPage({ skip: 0, take: 20 });
            }
        }
    }, [props.nowPageSize]);

    useEffect(() => {
        if (props.fullData) {
            let _dataState = {
                skip: page.skip,
                take: props.pageable
                    ? props.pagecount
                        ? props.pagecount
                        : page.take
                    : Number.MAX_SAFE_INTEGER,
            };
            if (props.sort) {
                Object.assign(_dataState, { sort: [...props.sort] });
            }
            if (props.group) {
                Object.assign(_dataState, { group: [...props.group] });
            }
            if (!isPop) {
                insertDataState(_dataState, true);
                H.makeQueryString(_dataState);
            }
            setOriginData(props.fullData);
            setHeaderSize();
            setFullData(props.fullData);
            if (props.isEdit && props.editKey) setEditKey(props.editKey);
        }
    }, [props.fullData]);

    useEffect(() => {
        if (props.keysWidth && props.keysWidth.length > 0) {
            setHeaderSize();
        }
    }, [props.keysWidth, width]);

    useEffect(() => {
        if (dataResult?.data) {
            if (!isPop && props.historyRecord) {
                setQueryString(H.makeQueryString(dataState));
            }
            // else {
            //     if (
            //         dataState.skip != undefined &&
            //         page.skip != dataState.skip
            //     ) {
            //         console.log("dataResult setPage", dataState);
            //         setPage({ skip: dataState.skip, take: 20 });
            //     }
            // }
            setFullData(dataResult.data);
            if (props.onPageTotalChange && dataResult.total > 0) {
                props.onPageTotalChange(dataResult.total);
            }
            // setPageTotal(dataResult.total);
        }
    }, [dataResult]);

    const onHeaderSelectionChange = (event: any) => {
        const checkboxElement = event.syntheticEvent.target;
        const checked = checkboxElement.checked;
        const newSelectedState = {};
        event.dataItems.forEach((item: any) => {
            newSelectedState[item[props.selectKey]] = checked;
        });
        setSelectedState(newSelectedState);
        if (props.onChangeSelect) props.onChangeSelect(newSelectedState);
        makeFullData(undefined, newSelectedState);
    };

    const makeFullData = (
        data?: any[],
        newSelectedState?: any,
        state?: State
    ) => {
        let _dataState = {
            skip: props.pagefake ? 0 : page.skip,
            take: props.pageable ? (props.pagecount ? props.pagecount : 20) : 0,
        };
        let filter: State["filter"] = state?.filter || dataState.filter;
        let sort: State["sort"] = state?.sort || dataState.sort;

        if (filter) {
            Object.assign(_dataState, { filter: filter });
        }
        if (sort) {
            Object.assign(_dataState, { sort: sort });
        }
        let _data = data ? data : fullData;
        const _selectedState = newSelectedState
            ? newSelectedState
            : selectedState;
        if (props.isEdit || props.isSelect) {
            setDataResult(
                process(
                    _data.map((raw) => {
                        let addObj = {};
                        if (props.isEdit)
                            Object.assign(addObj, {
                                inEdit: raw[editKey] === editId,
                            });
                        if (props.isSelect && props.selectKey)
                            Object.assign(addObj, {
                                selected:
                                    _selectedState[raw[props.selectKey]] ===
                                    true,
                            });
                        return {
                            ...raw,
                            ...addObj,
                        };
                    }),
                    _dataState
                )
            );
        } else {
            setDataResult(process(_data, _dataState));
        }
    };

    const excelExport = async () => {
        if (_export.current !== null && props.excelFilename) {
            if (props.fullData) {
                let data = await _export.current.toDataURL(
                    props.fullData,
                    _grid.current.columns
                );
                saveAs(data, props.excelFilename);
            }
        }
    };

    const setHeaderSize = () => {
        let list: string[] = [];
        let keysWidth = props.keysWidth;
        if (isStringArray(keysWidth)) {
            let total = 0;
            keysWidth.map((raw: number, idx) => (total += raw));
            for (var w of keysWidth) {
                let calc =
                    (width /
                        (props.keysWidthTotal ? props.keysWidthTotal : 10)) *
                    w;
                let result = calc;
                list.push(`${result}px`);
            }
        }
        setKeysWidth([...list]);
    };

    // row 클릭시 호출
    // isEdit일 경우 클릭한 로우를 setEditId 함으로써 수정모드
    const onSelectionModeChange = (event: GridSelectionChangeEvent) => {
        //select
        if (props.isSelect && props.onChangeSelect) {
            var newSelectedState = getSelectedState({
                event,
                selectedState: selectedState,
                dataItemKey: props.selectKey,
            });
            for (var key of Object.keys(selectedState)) {
                if (newSelectedState[key] == selectedState[key])
                    newSelectedState[key] = false;
                if (
                    newSelectedState[key] == undefined &&
                    props.isSelectSingle == undefined
                )
                    newSelectedState[key] = selectedState[key];
            }
            setSelectedState(newSelectedState);
            props.onChangeSelect(newSelectedState);
        }
        //
        if (props.onClickRow) {
            props.onClickRow(
                event.endRowIndex,
                event.dataItems && event.dataItems[event.endRowIndex]
                    ? event.dataItems[event.endRowIndex]
                    : undefined
            );
        } else if (props.isEdit) {
            if (props.editKey) {
                let _editId = event.dataItems[event.endRowIndex][editKey];
                setEditId(_editId);
                const newData = fullData.map((item) =>
                    item[editKey] == _editId ? { ...item, inEdit: true } : item
                );
                setFullData(newData);
                makeFullData(newData);
            }
        }
    };

    const onChangeItem = (event: GridItemChangeEvent) => {
        const inEditId = event.dataItem[editKey];
        const field = event.field || "";

        const newData = fullData.map((item) =>
            item[editKey] == inEditId ? { ...item, [field]: event.value } : item
        );
        setFullData(newData);
        makeFullData(newData);

        if (props.onItemChanged) {
            props.onItemChanged(inEditId, {
                [field]: event.value,
            });
        }
    };

    const onCloseEdit = (event: any) => {
        if (event.target === event.currentTarget) setEditId(null);
    };

    // 추가 버튼클릭시
    // 추가했을 경우 해당 로우가 바로 수정 모드로 진입
    const addRecord = (isAddCustom?: boolean) => {
        const obj = {};
        // 가장 마지막 아이템
        const lastItem = fullData[fullData.length - 1];
        for (var key of Object.keys(lastItem)) {
            // edit key 와 같을경우 해당 id 를 더하기
            if (key == editKey) {
                Object.assign(obj, { [key]: lastItem[key] + 1 });
            } else {
                Object.assign(obj, { [key]: null });
            }
        }
        // 해당 로우 수정모드
        Object.assign(obj, { inEdit: true });
        // 기존데이터와 동일한 구조의 object 를 추가
        setEditId(obj[editKey]);
        setFullData([...fullData, obj]);
        makeFullData([...fullData, obj]);
        //onClickAdd 가 있을경우 호출

        if (isAddCustom && props.onClickAddCustom) props.onClickAddCustom();
        else if (props.onClickAdd) props.onClickAdd();
    };

    const applyRecord = () => {
        if (props.onClickApply) {
            props.onClickApply();
        }
    };

    const dataStateChange = (event: GridDataStateChangeEvent) => {
        if (props.fullData) {
            setDataResult({ ...process(props.fullData, event.dataState) });
            setDataState(event.dataState);
        }
    };

    const expandChange = (event: GridExpandChangeEvent) => {
        const isExpanded =
            event.dataItem.expanded === undefined
                ? event.dataItem.aggregates
                : event.dataItem.expanded;
        event.dataItem.expanded = !isExpanded;
        if (dataResult) setDataResult({ ...dataResult });
    };

    const rowRender = (
        trElement: React.ReactElement<HTMLTableRowElement>,
        gridProps: GridRowProps
    ) => {
        const defaultColor = { backgroundColor: "white !important" };
        const { rowColors, selectKey, onContextMenu } = props;
        const { dataIndex } = gridProps;

        const trProps: any = {
            style:
                rowColors && rowColors[dataIndex]
                    ? rowColors[dataIndex]
                    : defaultColor,
            onContextMenu: (e: any) => {
                let selected = { [fullData[dataIndex][selectKey]]: true };
                setSelectedState(selected);
                // makeFullData(undefined, selected);
                onContextMenu ? onContextMenu(e, fullData[dataIndex]) : null;
            },
            onDoubleClick: () => {
                if (props.onDoubleClickRow) {
                    props.onDoubleClickRow(fullData[dataIndex]);
                    let selected = { [fullData[dataIndex][selectKey]]: true };
                    setSelectedState(selected);
                }
            },
        };
        return React.cloneElement(
            trElement,
            { ...trProps },
            trElement.props.children
        );
    };

    const GridPager = (props: PagerProps) => {
        const totalPages = Math.ceil((props.total || 0) / props.take);
        const currentPage =
            totalPages > 0 ? Math.floor(props.skip / props.take) + 1 : 0;
        return (
            <div className={props.className}>
                <div className="row">
                    <div className="col-4">
                        <Pager
                            style={{ backgroundColor: "#fff", border: "none" }}
                            skip={props.skip}
                            take={props.take}
                            total={props.total}
                            onPageChange={props.onPageChange}
                            pageSizes={props.pageSizes}
                            buttonCount={props.buttonCount}
                            info={true}
                            type={"numeric"}
                            previousNext={props.previousNext}
                            messagesMap={() => {
                                return {
                                    defaultMessage: `${currentPage} 페이지 / ${totalPages} 페이지`,
                                    messageKey: "",
                                };
                            }}
                        />
                    </div>
                </div>
            </div>
        );
    };

    const ColumnMenu = (props: GridColumnMenuProps) => {
        return (
            <div>
                <GridColumnMenuCheckboxFilter
                    {...props}
                    data={originData}
                    filterable={true}
                    onFilterChange={(e: any) => {
                        insertDataState({ filter: e, skip: 0, take: 20 }, true);
                        // setDataState((prevState) => {
                        //     return {
                        //         ...prevState,

                        //     };
                        // });
                        // setPage({ skip: 0, take: 20 });
                    }}
                    // expanded={false}
                />
                {/* <GridColumnMenuFilter
                    {...props}
                    // expanded={false}
                    hideSecondFilter={false}
                /> */}
                <GridColumnMenuSort
                    onSortChange={(e: any) => {
                        setDataState((prevState) => {
                            return {
                                ...prevState,
                                sort: e.sort,
                                skip: 0,
                                take: 20,
                            };
                        });
                        // setPage({ skip: 0, take: 20 });
                    }}
                    {...props}
                />
            </div>
        );
    };

    const CommandCell = (_props: any) => {
        return (
            <td className="k-command-cell">
                <div
                    onClick={() =>
                        confirm(
                            "삭제하시겠습니까? : " + _props.dataItem[editKey]
                        ) &&
                        props.onClickDel &&
                        props.onClickDel(_props.dataItem)
                    }
                    style={{ cursor: "pointer" }}
                >
                    {/* trash icon */}
                    {trashIcon}
                </div>
            </td>
        );
    };

    const onChangeSearch = (e: any) => {
        if (searchTimer) clearTimeout(searchTimer);
        if (e.target.value == "") {
            //초기화
            setSearchTimer(
                setTimeout(() => {
                    if (props.fullData) {
                        setFullData([...props.fullData]);
                        makeFullData([...props.fullData]);
                    }
                }, 1500)
            );
            return;
        }
        setSearchTimer(
            setTimeout(() => {
                let value = e.target.value;
                let newData = fullData.filter((raw) => {
                    return (
                        Object.values(raw).filter(
                            (val: any) => val.toString().indexOf(value) != -1
                        ).length > 0
                    );
                });
                setFullData(newData);
                makeFullData(newData);
            }, 1500)
        );
        return;
    };

    const GetCustomEl = (idx: number, raw: any, isLocked?: boolean) => {
        return (
            <Column
                key={idx}
                headerClassName={headerClass[idx]}
                className={rowClass[idx]}
                field={raw}
                title={props.titles[idx]}
                filterable={false}
                width={keysWidth && keysWidth[idx] ? keysWidth[idx] : undefined}
                // minResizableWidth={64}
                cell={(e) => {
                    if (props.getCustomEl)
                        return props.getCustomEl(
                            idx,
                            e.dataIndex,
                            e.columnIndex,
                            e.dataItem,
                            e
                        );
                    return null;
                }}
                locked={isLocked}
            />
        );
    };

    const insertDataState = (_dataState: State, isMake: boolean) => {
        setDataState((prevState) => {
            return { ...prevState, ..._dataState };
        });
        if (isMake && props.fullData) {
            makeFullData(props.fullData, null, _dataState);
        }
    };

    const toolbarVisible =
        props.excelFilename ||
        props.isAdd ||
        props.isEdit ||
        props.isSearch ||
        props.isCustomBtn;

    return (
        <LocalizationProvider language="ko-kr">
            <IntlProvider locale="ko">
                <ExcelExport ref={_export} fileName={props.excelFilename}>
                    <style>
                        {`
                            .k-grid-toolbar {
                                padding : 0;
                            }
                            .no-recored-header {
                                height : 30px;
                                box-sizing: border-box;
                                width : 100%;
                            }
                            .k-state-selected > td {
                                background-color: #ccc !important;
                            }
                        `}
                    </style>

                    <GridContainer
                        data={dataResult}
                        // @ts-ignore: Unreachable code error
                        ref={_grid}
                        sortable={props.sortable}
                        onSortChange={(e: any) => {
                            insertDataState(
                                { sort: e.sort, skip: 0, take: 0 },
                                true
                            );
                            // setDataState((prevState) => {
                            //     return { ...prevState, sort: e.sort };
                            // });
                        }}
                        // sort={dataState.sort ? dataState.sort : null}
                        // filter={dataState.filter ? dataState.filter : undefined}
                        filterable={props.filterable}
                        groupable={props.groupable}
                        reorderable={props.reorderable}
                        pageable={
                            props.pageable
                                ? { buttonCount: 10, pageSizes: false }
                                : false
                        }
                        pager={GridPager}
                        skip={page.skip}
                        take={page.take}
                        total={props.nowPageSize}
                        onPageChange={(e) => {
                            setPage({ ...e.page });
                        }}
                        {...dataState}
                        onDataStateChange={dataStateChange}
                        onExpandChange={expandChange}
                        resizable
                        selectable={{
                            enabled: true,
                            cell: cellEnabled,
                            drag: dragEnabled,
                            mode: "multiple",
                        }}
                        onSelectionChange={onSelectionModeChange}
                        rowRender={rowRender}
                        style={props.gridStyle}
                        editField="inEdit"
                        onItemChange={onChangeItem}
                        selectedField={props.isSelect ? "selected" : ""}
                        onHeaderSelectionChange={onHeaderSelectionChange}
                        dataItemKey={props.selectKey}
                    >
                        {toolbarVisible && (
                            <GridToolbar>
                                <GridToolbarBtns onClick={onCloseEdit}>
                                    {props.isCustomBtn && (
                                        <>
                                            {props.customBtnText?.map(
                                                (raw, idx) => (
                                                    <button
                                                        key={
                                                            "custom_grid_btn" +
                                                            idx
                                                        }
                                                        title="Custom Btn"
                                                        className="k-button k-primary"
                                                        onClick={() =>
                                                            props.onClickCustomBtn &&
                                                            props.onClickCustomBtn(
                                                                idx
                                                            )
                                                        }
                                                    >
                                                        {raw}
                                                    </button>
                                                )
                                            )}
                                        </>
                                    )}
                                    {props.excelFilename && (
                                        <button
                                            className="k-button k-primary"
                                            id="excel_export"
                                            style={
                                                props.excelFilename
                                                    ? { float: "right" }
                                                    : { display: "none" }
                                            }
                                            onClick={excelExport}
                                        >
                                            엑셀 출력
                                        </button>
                                    )}
                                    {props.isAddCustom && (
                                        <button
                                            title="Add new"
                                            className="k-button k-primary"
                                            onClick={() => addRecord(true)}
                                        >
                                            {props.isAddCustomText
                                                ? props.isAddCustomText
                                                : "행 추가"}
                                        </button>
                                    )}
                                    {props.isAdd && (
                                        <button
                                            title="Add new"
                                            className="k-button k-primary"
                                            onClick={() => addRecord()}
                                        >
                                            추가
                                        </button>
                                    )}
                                    {props.isEdit && (
                                        <button
                                            title="Apply"
                                            className="k-button k-primary"
                                            onClick={applyRecord}
                                        >
                                            저장
                                        </button>
                                    )}
                                    {props.isSearch && (
                                        <input
                                            className="k-textobx"
                                            onChange={onChangeSearch}
                                            style={{
                                                borderBottom: "1px solid #333",
                                            }}
                                            placeholder={"검색어 입력"}
                                        />
                                    )}
                                </GridToolbarBtns>
                            </GridToolbar>
                        )}
                        {props.isSelect &&
                            !props.isSelectFake &&
                            fullData.length > 0 && (
                                <Column
                                    headerClassName={`align-left ${headerClass}`}
                                    field={"selected"}
                                    width="50px"
                                    headerSelectionValue={
                                        Object.keys(selectedState).length == 0
                                            ? false
                                            : Object.keys(selectedState).filter(
                                                  (key) =>
                                                      selectedState[key] ===
                                                      true
                                              ).length ===
                                              Object.keys(selectedState).length
                                    }
                                    className="background-color-white"
                                    locked={
                                        props.lockedColumns &&
                                        props.lockedColumns[0]
                                            ? true
                                            : false
                                    }
                                />
                            )}
                        {/* {fullData && fullData.length == 0 && (
                            <Column
                                title=" "
                                editable={false}
                                locked={false}
                                sortable={false}
                                headerClassName={`${headerClass[0]} no-recored-header`}
                                width={"100%"}
                            ></Column>
                        )} */}
                        <GridNoRecords>
                            {props.noRecordsMsg && props.noRecordsMsg.length > 0
                                ? props.noRecordsMsg
                                : "표시할 내용이 없습니다."}
                        </GridNoRecords>
                        {fullData &&
                            // fullData.length > 0 &&
                            props.keys.map((raw, idx) => {
                                if (raw == props.selectKey) return;
                                let isLocked =
                                    props.lockedColumns &&
                                    props.lockedColumns[idx];
                                if (
                                    props.getCustomEl &&
                                    props.getCustomEl(idx)
                                ) {
                                    return GetCustomEl(idx, raw, isLocked);
                                }
                                let rclassname = rowClass[idx];
                                let filter: any = undefined;
                                if (headerType.length > 0) {
                                    switch (headerType[idx]) {
                                        case 0:
                                            rclassname += " align-left";
                                            filter = "text";
                                            break;
                                        case 1:
                                            rclassname += " align-center";
                                            filter = "numeric";
                                            break;
                                        case 2:
                                            rclassname += " align-right";
                                            filter = "numeric";
                                            break;
                                        default:
                                            rclassname += " align-center";
                                            filter = "text";
                                    }
                                }
                                let child = undefined;
                                if (
                                    props.gridChildren &&
                                    Object.keys(props.gridChildren).indexOf(
                                        raw
                                    ) != -1
                                ) {
                                    for (var _child of props.gridChildren[
                                        raw
                                    ]) {
                                        Object.assign(_child, {
                                            className: rclassname,
                                            width: keysWidth[idx]
                                                ? parseInt(keysWidth[idx]) /
                                                  props.gridChildren[raw].length
                                                : 0,
                                            columnMenu: ColumnMenu,
                                        });
                                    }
                                    child = props.gridChildren[raw];
                                }
                                if (props.titles[idx] == undefined) return;
                                return (
                                    <Column
                                        key={idx}
                                        headerClassName={headerClass[idx]}
                                        className={rclassname}
                                        field={raw}
                                        title={props.titles[idx]}
                                        filter={filter}
                                        columnMenu={
                                            child ? undefined : ColumnMenu
                                        }
                                        width={
                                            keysWidth && keysWidth[idx]
                                                ? keysWidth[idx]
                                                : undefined
                                        }
                                        children={child}
                                        editor={
                                            props.editType
                                                ? props.editType[idx]
                                                : undefined
                                        }
                                        editable={
                                            props.editType &&
                                            props.editType[idx] === false
                                                ? false
                                                : true
                                        }
                                        locked={isLocked}
                                    />
                                );
                            })}
                        {props.isDel && (
                            <Column cell={CommandCell} width="36px" />
                        )}
                    </GridContainer>
                </ExcelExport>
            </IntlProvider>
        </LocalizationProvider>
    );
};

const GridContainer = styled(Grid)`
    width: 100%;
    height: 100%;
    border-color: transparent;
    border-radius: 0 0 10px 10px;
`;

const GridToolbarBtns = styled.div`
    width: 100%;
    margin: 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 12px;
    button {
        padding: 4px 10px;
    }
`;
