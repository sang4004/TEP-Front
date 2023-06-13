/******************************************************************************
 * hooks :
 * useLocations
 * components :
 *
 *

 ******************************************************************************/
// import * as S from "../styled/edmsDetail.styled";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; // redux
import moment from "moment";

import { reducerState } from "../common";

import { GetEdmsProgProjectList, GetTftLog } from "../common/action";
import {
    GridViewComponent,
    LoadingIndicatorComponent,
    gridViewChildrenType,
} from "components";
import { EdmsProjectBase } from "../components";

import * as S from "../styled/edmsWorkProc.styled";

const tableHeadSizeLog = [0.2, 3];
const tableHeadTypeLog = [1.1];
const tableHeaderLog = ["Discipline", "HENC"];
const PAGE_SIZE = 20;
const EdmsLogPage = (props: any) => {
    const dispatch = useDispatch();

    // Redux handle variable
    const pjSelector = useSelector((state: reducerState) => state.project);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [tableChild, setTableChild] = useState<gridViewChildrenType>();
    const [logList, setLogList] = useState<any[]>([]);
    //
    // search Datas
    const [projectTypeNo, setProjectTypeNo] = useState<number>(-1);
    const [projectTypeList, setProjectTypeList] = useState<any[]>([]);
    const [startDay, setStartDay] = useState<Date>(new Date());
    const [endDay, setEndDay] = useState<Date>(new Date());
    const [selectedType, setSelectedType] = useState<number>(-1);
    const [searchData, setSearchData] = useState<string>("");
    const [pageSize, setPageSize] = useState<number>(0);
    const [page, setPage] = useState<number>(0);
    //
    useEffect(() => {
        dispatch(GetTftLog());
        dispatch(GetEdmsProgProjectList());
    }, []);

    useEffect(() => {
        if (projectTypeList.length == 0) {
            setProjectTypeList(pjSelector.project_type_list);
        }
    }, [pjSelector.project_type_list]);

    useEffect(() => {
        makeList();
    }, [pjSelector.tft_log_list]);

    const makeList = () => {
        if (pjSelector.tft_log_list && pjSelector.tft_log_list.length > 0) {
            let children: gridViewChildrenType = {};
            let data = pjSelector.tft_log_list;
            let _list = [];

            for (var s of tableHeaderLog) {
                if (s != "Discipline") {
                    Object.assign(children, {
                        [s]: [
                            {
                                field: `issued_date`,
                                title: "HENC Issued Date",
                                headerClassName: "align-center",
                            },
                            { field: `tr_no`, title: "TR No", headerClassName: "align-center" },
                            {
                                field: `docu_no`,
                                title: "Doc.No",
                                headerClassName: "align-center",
                            },
                            {
                                field: `revision`,
                                title: "Rev",
                                headerClassName: "align-center",
                            },
                            {
                                field: `description`,
                                title: "Description",
                                headerClassName: "align-center",
                            },
                            {
                                field: `due_date`,
                                title: "신한 Due Date",
                                headerClassName: "align-center",
                            },
                            {
                                field: `actual_date`,
                                title: "신한 Atual Date",
                                headerClassName: "align-center",
                            },
                            {
                                field: `delay_date`,
                                title: "신한 Delay Date",
                                headerClassName: "align-center",
                            },
                            {
                                field: `result`,
                                title: "Result",
                                headerClassName: "align-center",
                            },
                        ],
                    });
                }
            }

            setTableChild(children);
            setLogList([...data]);
        }
    };
    //

    // 달력 자동 오픈
    const onChangeDate = (date: any, type: "start" | "end") => {
        if (type == "start") {
            setStartDay(moment(date).toDate());
        } else if (type == "end") {
            setEndDay(moment(date).toDate());
        }
    };

    // 검색 기능
    const onSearchData = async (_page?: number) => {
        setIsLoading(true);
        let _endDate = moment(endDay).add(1, "day").toDate();
        await dispatch(
            GetTftLog(
                projectTypeNo,
                selectedType,
                searchData,
                startDay,
                _endDate,
                _page ? _page : page,
                PAGE_SIZE
            )
        );
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    };

    return (
        <>
            <LoadingIndicatorComponent open={isLoading} />
            <EdmsProjectBase>
                {/*Body*/}
                <S.ContentContainer>
                    <S.WorkListContainer>
                        <S.StructureTable>
                            <S.StructureTableHead>
                                <S.SelectDiv>
                                    <S.FormType
                                        value={projectTypeNo}
                                        onChange={(e: any) =>
                                            setProjectTypeNo(parseInt(e.target.value))
                                        }
                                        disableUnderline={true}
                                    >
                                        <S.InputSelectItem value={-1}>
                                            {"프로젝트 선택"}
                                        </S.InputSelectItem>
                                        {projectTypeList.map((val: any, idx: number) => {
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
                                    <S.SearchDateDiv>
                                        <S.Date
                                            type="date"
                                            id="date-picker-inline"
                                            value={moment(startDay).format("YYYY-MM-DD")}
                                            min="2017-01-01"
                                            max="2030-12-31"
                                            onChange={(e: any) =>
                                                onChangeDate(e.target.value, "start")
                                            }
                                        />
                                        ~
                                        <S.Date
                                            type="date"
                                            id="date-picker-inline"
                                            value={moment(endDay).format("YYYY-MM-DD")}
                                            min="2017-01-01"
                                            max="2030-12-31"
                                            onChange={(e: any) =>
                                                onChangeDate(e.target.value, "end")
                                            }
                                        />
                                    </S.SearchDateDiv>
                                    <S.SearchType
                                        value={selectedType}
                                        onChange={(e: any) =>
                                            setSelectedType(parseInt(e.target.value))
                                        }
                                        disableUnderline={true}
                                    >
                                        <S.InputSelectItem value={-1}>검색조건</S.InputSelectItem>
                                        <S.InputSelectItem value={1}>discipline</S.InputSelectItem>
                                        <S.InputSelectItem value={2}>TR. No.</S.InputSelectItem>
                                        <S.InputSelectItem value={3}>
                                            Document. No.
                                        </S.InputSelectItem>
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
                                    <S.SearchBtn onClick={() => onSearchData()}>
                                        검색하기
                                    </S.SearchBtn>
                                </S.SelectDiv>
                            </S.StructureTableHead>

                            <S.WorkListTable>
                                <GridViewComponent
                                    titles={tableHeaderLog}
                                    keys={tableHeaderLog}
                                    values={Object.values(logList)}
                                    fullData={logList}
                                    keysWidth={tableHeadSizeLog}
                                    rowClass="background-color-white color-light-black"
                                    headerClass="background-dark-sky-blue color-white align-center"
                                    keysWidthTotal={2}
                                    datatype={tableHeadTypeLog}
                                    gridChildren={tableChild}
                                    pageable
                                    pagecount={PAGE_SIZE}
                                    onPageChange={(_page: number) => {
                                        if (page != _page) {
                                            setIsLoading(true);
                                            setTimeout(() => {
                                                setIsLoading(false);
                                            }, 3000);
                                            setPage(_page);
                                            onSearchData(_page);
                                        }
                                    }}
                                    nowPageSize={pageSize}
                                />
                            </S.WorkListTable>
                        </S.StructureTable>
                    </S.WorkListContainer>
                </S.ContentContainer>
            </EdmsProjectBase>
        </>
    );
};

export default EdmsLogPage;
