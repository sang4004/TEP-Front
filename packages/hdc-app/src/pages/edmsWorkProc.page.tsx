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
// import * as S from "../styled/edmsDetail.styled";
import React, { useState, useEffect, useMemo } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; // redux

import { useLocations } from "hooks";
import { reducerState } from "../common";

import {
    ApproveWorkAssign,
    GetWorkProcList,
    ReplyWorkAssign,
    TmReplyApprove,
    GetUnreadWorks,
    UpdateSendRecvBox,
    GetCountPingEdms,
    GetOriginalTmCode,
    GetWorkDocuList,
    RefreshTab,
    GetEdmsProgProjectList,
    AllApprovalWorkAssign,
    GetWorkAssignUserList,
} from "../common/action";
import {
    GridViewComponent,
    LoadingIndicatorComponent,
    ModalInfo,
    ToastComponent,
} from "components";
import {
    EdmsProjectBase,
    WorkProcApprovalComp,
    EdmsDrnDistributeModal,
    EdmsTmApprovalModal,
    EdmsReviewerListModal,
    EdmsStepperComp,
} from "../components";

//common
import {
    makeWorkProcList,
    makeSendList,
    makeRecvList,
    makeCheckedList,
    getPageIndex,
} from "../pages/common/workProcPage/list";
import { makeQueryString } from "../pages/common/workProcPage/history";
import {
    tableHeadSizeApproval,
    tableHeadTypeApproval,
    tableHeaderApproval,
    tableHeadSizeDeploy,
    tableHeadTypeDeploy,
    tableHeaderDeploy,
    tableHeadSizeTm,
    tableHeadTypeTm,
    tableHeaderTm,
    customElIdx1,
    customElIdx2,
    customElTmIdx2,
    PAGE_SIZE,
    sendApprovalKeys,
    recvApprovalKeys,
} from "../pages/common/workProcPage/constant";
import {
    getRecvWpIdxEl,
    getSendWpIdxEl,
    getExpiredDtEl,
    getReviewEl,
    getApprovalBtn,
} from "../pages/common/workProcPage/customElement";

import * as S from "../styled/edmsWorkProc.styled";

import moment from "moment";

const EdmsWorkProcPage = (props: any) => {
    const dispatch = useDispatch();
    const { path, pushHistory, searchParam } = useLocations();
    const { replace, location, push, action } = useHistory();
    const { type, wp_idx, work_type, project_no } = useParams<{
        type: string;
        work_type: string;
        wp_idx: string;
        project_no: string;
    }>();
    const nowDate = moment();

    // Redux handle variable
    const tmSelector = useSelector((state: reducerState) => state.tm);
    const userSelector = useSelector((state: reducerState) => state.user);
    const workSelector = useSelector((state: reducerState) => state.work);
    const pjSelector = useSelector((state: reducerState) => state.project);
    // const historySelector = useSelector((state: reducerState) => state.history);
    //

    // Modal, Comp visible variable
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [visibleDrn, setVisibleDrn] = useState<boolean>(false);
    const [visibleToast, setVisibleToast] = useState<boolean>(false);
    const [visibleApproval, setVisibleApproval] = useState<boolean>(false);
    const [visibleTmApproval, setVisibleTmApproval] = useState<boolean>(false);
    const [visibleReviewer, setVisibleReviewer] = useState<boolean>(false);
    const [reviewerWpIdx, setReviewerWpIdx] = useState<number>(-1);
    //

    //Grid setting
    const [sendApprovalList, setSendApprovalList] = useState<any[]>([]);
    const [recvApprovalList, setRecvApprovalList] = useState<any[]>([]);
    const [tableHeader, setTableHeader] = useState<string[]>(tableHeaderApproval);
    const [tableHeadSize, setTableHeadSize] = useState<number[]>(tableHeadSizeApproval);
    const [tableHeadType, setTableHeadType] = useState<number[]>(tableHeadTypeApproval);
    //

    const [wpIdxList, setWpidxList] = useState<number[]>([]);
    const [userId, setUserId] = useState<number>(-1);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [workList, setWorkList] = useState<any[]>([]);
    const [nowWpIdx, setNowWpIdx] = useState<number>(-1);
    const [checkList, setCheckList] = useState<number>(-1);
    const [workTypeVal, setWorkTypeVal] = useState<number>(work_type ? parseInt(work_type) : 2);
    const [deployTitleList, setDeployTitleList] = useState<string[]>([]);
    const [workListKeys, setWorkListKeys] = useState<any[]>([]);
    const [completeType, setCompleteType] = useState<number>(-1);
    const [sendRootData, setSendRootData] = useState<any[]>([]);
    const [unreadWorksData, setUnreadWorkData] = useState<any[]>([]);
    const [selectedWpIdxList, setSelectedWpIdxList] = useState<number[]>([]);
    const [checked, setChecked] = useState<number[]>([]);
    const [pageSize, setPageSize] = useState<number>(0);

    // search bar
    const [projectTypeNo, setProejctTypeNo] = useState<number>(
        project_no ? parseInt(project_no) : -1
    );
    const [projectTypeList, setProjectTypeList] = useState<any[]>([]);
    const [approvalType, setApprovalType] = useState<boolean>(false);
    const [registerType, setRegisterType] = useState<boolean>(false);
    const [startDay, setStartDay] = useState<Date>();
    const [endDay, setEndDay] = useState<Date>();
    const [selectedType, setSelectedType] = useState<number>(1);
    const [searchData, setSearchData] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [skip, setSkip] = useState<number>(0);
    const [queryString, setQueryString] = useState<string>("");
    // const [isSetting, setIsSetting] = useState<boolean>(false);

    useEffect(() => {
        setInitialDay();
    }, []);

    useEffect(() => {
        if (workSelector.now_tab != undefined) {
            setWorkTypeVal(workSelector.now_tab);
        }
    }, [workSelector.now_tab]);

    //Type 변할때 초기화 해주기
    useEffect(() => {
        setIsLoading(true);
        clearWorkProcPage();
    }, [type]);

    // type din or drn 일때 각각 list 불러오기
    useEffect(() => {
        if (path) {
            setIsLoading(true);
            setUserId(userSelector.edms_user_id);
            setIsAdmin(userSelector.edms_level >= 2);
            dispatch(GetUnreadWorks());
            dispatch(GetEdmsProgProjectList());
            if (location.search == "") {
                // 첫방문
                onSearchData(0);
            } else {
                // 이전에 방문한적이 있다.
                let _skip: number;
                let skipStr = searchParam.get("skip");
                // skip qs가 들어왔다면, 페이지를 설정해준다.
                if (skipStr != null) {
                    _skip = parseInt(skipStr);
                } else {
                    _skip = 0;
                }
                //
                if (workSelector.work_proc_list_length == 0) {
                    onSearchData(_skip);
                } else {
                    setCurrentPage(Math.floor(_skip / PAGE_SIZE) + 1);
                }
            }
        }
    }, [path]);

    useEffect(() => {
        if (tmSelector.original_tm_code) {
            let tm_code = tmSelector.original_tm_code;
            let tm_subject = tmSelector.original_tm_subject;
            setDeployTitleList([tm_code + "_" + tm_subject]);
        }
    }, [tmSelector.original_tm_code]);

    // 접수 및 배포 완료 시
    useEffect(() => {
        if (workSelector.create_deploy) {
            setSelectedWpIdxList([]);
            onSearchData();
        }
    }, [workSelector.create_deploy]);

    useEffect(() => {
        if (
            workSelector.get_unread_works != undefined &&
            workSelector.get_unread_works.length > 0
        ) {
            setUnreadWorkData(workSelector.get_unread_works);
        }
    }, [workSelector.get_unread_works]);

    useEffect(() => {
        if (projectTypeList.length == 0) {
            setProjectTypeList(pjSelector.project_type_list);
        }
    }, [pjSelector.project_type_list]);

    useEffect(() => {
        if (workSelector.work_proc_list.length != 0 && workSelector.assign_list.length != 0) {
            setIsLoading(true);
            let assign_list = workSelector.assign_list;
            let work_proc_list = workSelector.work_proc_list;
            let approval_info_list = workSelector.approval_info_list;
            let my_assign_list = workSelector.my_assign_list;
            let wpLength = workSelector.work_proc_list_length;

            let datas = makeWorkProcList(
                work_proc_list,
                assign_list,
                approval_info_list,
                my_assign_list,
                workTypeVal,
                type,
                wp_idx
            );
            let _sendList_now_order: any[] = datas.sendListNowOrder;
            let _sendList: any[] = datas.sendList;
            let _recvList: any[] = datas.recvList;

            // Root Data & List
            if (type === "tm") {
                if (workTypeVal == 1 && _sendList.length > 0) {
                    // 발신함 List
                    let result = makeSendList(_sendList, _sendList_now_order);
                    _sendList = result.sendList;
                    setSendRootData(result.rootData);
                    setSendApprovalList([..._sendList]);
                } else if (workTypeVal == 2 && _recvList.length > 0) {
                    // 보관함 List
                    setRecvApprovalList([...makeRecvList(_recvList)]);
                }
            } else {
                setSendApprovalList([..._sendList]);
                setRecvApprovalList([..._recvList]);
            }

            setPageSize(wpLength);
            if (currentPage > Math.floor(wpLength / PAGE_SIZE) + 1) {
                setCurrentPage(1);
            }
            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        } else {
            setWorkList([]);
            setPageSize(0);
            if (!workSelector.is_loading && workList.length == 0) {
                setTimeout(() => {
                    setIsLoading(false);
                }, 3000);
            }
        }
    }, [workSelector.work_proc_list]);

    useEffect(() => {
        if (type == "tm" && workTypeVal == 2) {
            setTableHeader(tableHeaderTm);
            setTableHeadType(tableHeadTypeTm);
            setTableHeadSize(tableHeadSizeTm);
        } else {
            let Header = [tableHeaderApproval, tableHeaderDeploy];
            let HeadType = [tableHeadTypeApproval, tableHeadTypeDeploy];
            let HeadSize = [tableHeadSizeApproval, tableHeadSizeDeploy];
            setTableHeader(Header[workTypeVal - 1]);
            setTableHeadType(HeadType[workTypeVal - 1]);
            setTableHeadSize(HeadSize[workTypeVal - 1]);
        }

        if (workTypeVal == 1) {
            if (sendApprovalList.length > 0) {
                setWorkList(sendApprovalList);
                setWorkListKeys(sendApprovalKeys);
            } else {
                setWorkList([]);
                setWorkListKeys(tableHeaderApproval);
            }
        } else if (workTypeVal == 2) {
            if (recvApprovalList.length > 0) {
                setWorkList(recvApprovalList);
                setWorkListKeys(recvApprovalKeys);
            } else {
                setWorkList([]);
                setWorkListKeys(tableHeaderDeploy);
            }
        }
    }, [sendApprovalList, recvApprovalList]);

    useEffect(() => {
        if (checked.length > 0) {
            let work_proc_list = workSelector.work_proc_list;
            let result = makeCheckedList(checked, work_proc_list);
            let _list: any[] = result.list;
            let _order: any[] = result.order;

            if (_order.length > 0) {
                //일괄 결재
                setApprovalType(_order.findIndex((raw: any) => raw == 0) == -1);
                //
            }
            if (_list.length > 0) {
                // 접수 및 배포 8 , 참조 접수 19
                setRegisterType(_list.findIndex((raw: any) => raw == 0) == -1);
                //
            }
        } else {
            setApprovalType(false);
            setRegisterType(false);
        }
    }, [checked]);

    // 결재
    useEffect(() => {
        if (workSelector.approve_work_assign != undefined) {
            setTimeout(() => {
                ModalInfo("결재가 완료되었습니다.");
                setSelectedWpIdxList([]);
                setCheckList(-1);
                setChecked([]);
                onSearchData();
                setIsLoading(false);
            }, 1000);
        }
    }, [workSelector.approve_work_assign]);

    const onClose = () => {
        setVisibleApproval(false);
        setVisibleTmApproval(false);
        setVisibleDrn(false);
        setVisibleReviewer(false);
        setCheckList(-1);
    };

    const onClickMove = (wp_idx: number) => {
        if (wp_idx != undefined) {
            dispatch(UpdateSendRecvBox([wp_idx]));
            dispatch(GetCountPingEdms());
            let qs = makeQueryString({
                us: 1,
                skip: skip,
                searchData: searchData,
                selectedType: selectedType,
                startDay: moment(startDay).format("YYYY-MM-DD"),
                endDay: moment(endDay).format("YYYY-MM-DD"),
            });
            let wpQs = `${wp_idx}?${qs}`;
            if (type == "din") pushHistory(`/edms/din/detail/${wpQs}`);
            else if (type == "drn") pushHistory(`/edms/drn/detail/${wpQs}`);
            else pushHistory(`/edms/tm/detail/${wpQs}`);
        }
    };

    const onDrnComplete = async (comment: string, check: string, reason?: string) => {
        setVisibleApproval(false);
        setIsLoading(true);

        if (selectedWpIdxList.length > 0) {
            dispatch(UpdateSendRecvBox(selectedWpIdxList));
            dispatch(GetCountPingEdms());
        }

        // 결재 하나 & 결재 여러개
        if (checkList != -1) {
            await dispatch(ApproveWorkAssign(checkList, comment, check, type, nowWpIdx, reason));
        } else if (checkList == -1 && checked.length > 0) {
            for (let wpIdx of checked) {
                let wa = workSelector.work_proc_list.find((raw: any) => raw.wp_idx == wpIdx);
                if (wa) {
                    await dispatch(
                        ApproveWorkAssign(wa.waIdx, comment, check, type, wpIdx, reason)
                    );
                }
            }
        }
    };

    const onTmComplete = async (comment: string, check: string) => {
        setVisibleTmApproval(false);
        setIsLoading(true);

        if (selectedWpIdxList.length > 0) {
            dispatch(UpdateSendRecvBox(selectedWpIdxList));
            dispatch(GetCountPingEdms());
        }

        await dispatch(TmReplyApprove(comment, check, checkList, nowWpIdx));
        setTimeout(() => {
            setSelectedWpIdxList([]);
            ModalInfo("결재완료");
            onSearchData();
            setIsLoading(false);
        });
    };
    //

    const setInitialDay = () => {
        let past = new Date();
        past.setMonth(past.getMonth() - 1);
        setEndDay(new Date());
        setStartDay(past);
    };

    const onClickApproval = (
        wa_idx: number,
        type: number,
        wp_idx: number,
        isTm: boolean = false
    ) => {
        setSelectedWpIdxList([wp_idx]);
        setNowWpIdx(wp_idx);
        setCheckList(wa_idx);
        setCompleteType(type);
        if (isTm) {
            setVisibleTmApproval(true);
        } else {
            setVisibleApproval(true);
        }
    };

    const onClickDeploy = async (data: any) => {
        dispatch(GetWorkDocuList([data.wp_idx]));
        dispatch(GetOriginalTmCode(data.wp_idx));

        setWpidxList([data.wp_idx]);
        setSelectedWpIdxList([data.wp_idx]);

        setTimeout(() => {
            setVisibleDrn(true);
        }, 1000);
    };

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        dispatch(RefreshTab(newValue));
        onSearchData(undefined, newValue);
    };

    const getSubjectEl = (dataIdx: number) => {
        return (
            <S.TableTd style={{ justifyContent: "flex-start", background: "#fff" }}>
                <S.TableCode
                    style={{ paddingLeft: "10px" }}
                    onClick={() => onClickMove(workList[dataIdx].wp_idx)}
                >
                    {workList[dataIdx] ? workList[dataIdx].subject : ""}
                </S.TableCode>
            </S.TableTd>
        );
    };

    const getApprovalBtnEL = (dataIdx: number) => {
        if (workList[dataIdx] != undefined && workList[dataIdx].due_date != undefined) {
            let data = workList[dataIdx];
            let tdStyle = {};
            Object.assign(tdStyle, { background: "#fff" });
            let btnStyle = {};
            const approvalBtnEL = useMemo(() => {
                if (data.now_order[1] == 2 && type != "drn") {
                    let tmp = -1;
                    if (data.now_order[0].length != 0) tmp = data.now_order[0][0].user_id;
                    if (tmp == userId) {
                        return getApprovalBtn(
                            tdStyle,
                            btnStyle,
                            data.assign_state,
                            false,
                            onClickApprovalBtn,
                            [1, data]
                        );
                    } else {
                        return getApprovalBtn(
                            tdStyle,
                            btnStyle,
                            data.assign_state,
                            false,
                            onClickApprovalBtn,
                            [-1, null]
                        );
                    }
                } else if (type == "drn") {
                    return getApprovalBtn(
                        tdStyle,
                        btnStyle,
                        data.assign_state,
                        true,
                        onClickApprovalBtn,
                        [2, data]
                    );
                } else if (data.now_order[3] == true && data.now_order[1] == 3) {
                    Object.assign(btnStyle, { backgroundColor: "#ccc" });
                    return getApprovalBtn(
                        tdStyle,
                        btnStyle,
                        "결재완료",
                        false,
                        onClickApprovalBtn,
                        [-1, null]
                    );
                } else if (data.now_order[1] == 4 && type != "drn") {
                    Object.assign(btnStyle, { backgroundColor: "#ccc" });
                    return getApprovalBtn(
                        tdStyle,
                        btnStyle,
                        "회신완료",
                        false,
                        onClickApprovalBtn,
                        [-1, null]
                    );
                } else if (type === "tm") {
                    if (data.now_order[1] == 5) {
                        Object.assign(btnStyle, { backgroundColor: "#FE6E64" });
                        if (data.now_order[7]) {
                            return getApprovalBtn(
                                tdStyle,
                                btnStyle,
                                data.assign_state,
                                false,
                                onClickApprovalBtn,
                                [3, data]
                            );
                        } else {
                            return getApprovalBtn(
                                tdStyle,
                                btnStyle,
                                data.assign_state,
                                false,
                                onClickApprovalBtn,
                                [-1, null]
                            );
                        }
                    } else if (data.now_order[1] == 6) {
                        return getApprovalBtn(
                            tdStyle,
                            btnStyle,
                            data.assign_state,
                            false,
                            onClickApprovalBtn,
                            [1, data]
                        );
                    } else if (data.now_order[1] == 7 || data.now_order[1] == 14) {
                        Object.assign(btnStyle, { background: "#ccc" });
                        return getApprovalBtn(
                            tdStyle,
                            btnStyle,
                            data.assign_state,
                            false,
                            onClickApprovalBtn,
                            [-1, null]
                        );
                    } else if (data.now_order[1] == 8 || data.now_order[1] == 19) {
                        return getApprovalBtn(
                            tdStyle,
                            btnStyle,
                            data.assign_state,
                            false,
                            onClickApprovalBtn,
                            [4, data]
                        );
                    } else if (data.now_order[1] == 13) {
                        return getApprovalBtn(
                            tdStyle,
                            btnStyle,
                            data.assign_state,
                            false,
                            onClickApprovalBtn,
                            [1, data]
                        );
                    } else if (
                        data.now_order[1] == 9 ||
                        data.now_order[1] == 10 ||
                        data.now_order[1] == 11 ||
                        data.now_order[1] == 12 ||
                        data.now_order[1] == 14 ||
                        data.now_order[1] >= 15
                    ) {
                        // data.now_order[1] => 10: 회신대기, 11: 최종완료, 12: 회신하기, 13: 회신결재, 14: 회신완료
                        return getApprovalBtn(
                            tdStyle,
                            btnStyle,
                            data.assign_state,
                            true,
                            onClickApprovalBtn,
                            [2, data]
                        );
                    } else {
                        Object.assign(btnStyle, { backgroundColor: "#ccc" });
                        return getApprovalBtn(
                            tdStyle,
                            btnStyle,
                            data.assign_state,
                            false,
                            onClickApprovalBtn,
                            [-1, null]
                        );
                    }
                } else if (data.assign_state === "반려") {
                    Object.assign(btnStyle, { backgroundColor: "#ccc" });
                    return getApprovalBtn(
                        tdStyle,
                        btnStyle,
                        data.assign_state,
                        false,
                        onClickApprovalBtn,
                        [-1, null]
                    );
                } else {
                    Object.assign(btnStyle, { backgroundColor: "#ccc" });
                    return getApprovalBtn(
                        tdStyle,
                        btnStyle,
                        type == `drn` ? `결재대기` : `회신대기`,
                        false,
                        onClickApprovalBtn,
                        [-1, null]
                    );
                }
            }, [data]);
            return approvalBtnEL;
        } else {
            return <S.TableTd style={{ background: "#fff" }}></S.TableTd>;
        }
    };

    const getStateEl = (dataIdx: number, type: string) => {
        if (workList[dataIdx] != undefined) {
            let data = workList[dataIdx];
            let steps: { label: string; icon?: string }[] = [];
            let step = 0;
            if (type == "tm") {
                steps.push(
                    { label: "기안" },
                    { label: "내부결재" },
                    { label: "발신" },
                    { label: "접수" },
                    { label: "검토" },
                    { label: "회신결재" },
                    { label: "회신" }
                );
            } else if (type == "drn") {
                steps.push({ label: "리뷰요청" }, { label: "검토중" }, { label: "검토완료" });
            }
            step = parseInt(data.now_order[10]);
            return (
                <S.ToolTip
                    placement="left"
                    arrow
                    title={
                        <>
                            <EdmsStepperComp steps={steps} step={step} />
                        </>
                    }
                    children={
                        <S.TableTd style={{ textAlign: "center", background: "#fff" }}>
                            {data.assign_state}
                        </S.TableTd>
                    }
                />
            );
        } else {
            return <S.TableTd></S.TableTd>;
        }
    };

    const createCustomEl = (
        idx: number,
        dataIdx?: number,
        columnIndex?: number,
        dataItem?: any
    ) => {
        let nowDataIdx = dataItem ? workList.findIndex(raw => raw.wp_idx == dataItem.wp_idx) : -1;
        // 제목
        if (idx == 0 && type == `tm` && dataIdx == undefined) return true;
        if (workTypeVal == 1 && customElIdx1.indexOf(idx) != -1 && dataIdx == undefined)
            return true;
        if (
            workTypeVal == 2 &&
            type != "tm" &&
            customElIdx2.indexOf(idx) != -1 &&
            dataIdx == undefined
        )
            return true;
        // tm 보관함 index
        if (
            workTypeVal == 2 &&
            type == "tm" &&
            customElTmIdx2.indexOf(idx) != -1 &&
            dataIdx == undefined
        )
            return true;

        if (workTypeVal == 1) {
            if (idx === 0 && type == `tm`) {
                return getSendWpIdxEl(workList, sendRootData, nowDataIdx);
            } else if (idx === 2) {
                return getSubjectEl(nowDataIdx);
            } else if (idx == 3) {
                return getExpiredDtEl(workList, nowDataIdx);
            }
        } else if (workTypeVal == 2) {
            if (type == "tm") {
                if (idx === 1) {
                    return getRecvWpIdxEl(workList, nowDataIdx);
                } else if (idx === 3) {
                    return getSubjectEl(nowDataIdx);
                } else if (idx == 6) {
                    return getExpiredDtEl(workList, nowDataIdx);
                } else if (idx == 9) {
                    return getStateEl(nowDataIdx, "tm");
                } else if (idx == 10) {
                    return getReviewEl(workList, nowDataIdx, onClickOpenAssignModal);
                } else if (idx == 11) {
                    return getApprovalBtnEL(nowDataIdx);
                }
            } else if (type == "drn") {
                if (idx === 2) {
                    return getSubjectEl(nowDataIdx);
                } else if (idx == 5) {
                    return getExpiredDtEl(workList, nowDataIdx);
                } else if (idx == 8) {
                    return getStateEl(nowDataIdx, "drn");
                } else if (idx == 9) {
                    return getApprovalBtnEL(nowDataIdx);
                }
            } else if (type == "din") {
                if (idx === 2) {
                    return getSubjectEl(nowDataIdx);
                } else if (idx == 5) {
                    return getExpiredDtEl(workList, nowDataIdx);
                }
            }
        }
        return null;
    };

    const onCheckChange = (selectItems: any) => {
        let work_proc = Object.keys(selectItems);
        let checked: number[] = [];
        for (var work of work_proc) {
            if (selectItems[work] === true) {
                checked.push(parseInt(work));
            }
        }
        setChecked([...checked]);
    };

    // 달력 자동 오픈
    const onChangeDate = (date: any, type: "start" | "end") => {
        if (type == "start") {
            setStartDay(moment(date).toDate());
        } else if (type == "end") {
            setEndDay(moment(date).toDate());
        }
    };

    // 검색 기능
    const onSearchData = async (_skip?: number, newValue?: number) => {
        setIsLoading(true);
        if (newValue != undefined) setWorkTypeVal(newValue);
        if (_skip && _skip == skip) {
            setIsLoading(false);
            return;
        }
        let _searchData = searchData;
        if (/^\s+$/.test(_searchData)) _searchData = "";

        let _endDate: String;
        let _startDate: String;
        if (endDay) {
            _endDate = moment(endDay).add(1, "day").format("YYYY-MM-DD");
        } else {
            let endDateStr: string | null = searchParam.get("endDate");
            _endDate = endDateStr ? endDateStr : moment().add(1, "day").format("YYYY-MM-DD");
            setEndDay(new Date(`${_endDate}`));
        }
        if (startDay) {
            _startDate = moment(startDay).format("YYYY-MM-DD");
        } else {
            let startDateStr: string | null = searchParam.get("startDate");
            _startDate = startDateStr
                ? startDateStr
                : moment().add(-1, "month").format("YYYY-MM-DD");
            setStartDay(new Date(`${_startDate}`));
        }
        setQueryString(
            makeQueryString({
                searchText: searchData,
                projectTypeNo: projectTypeNo,
                selectedType: selectedType,
                startDate: _startDate,
                endDate: _endDate,
            })
        );
        await dispatch(
            GetWorkProcList(
                workTypeVal,
                type,
                projectTypeNo,
                false, // is_fin 검토완료 플래그
                selectedType,
                _searchData,
                _startDate,
                _endDate,
                _skip != undefined ? _skip : skip,
                PAGE_SIZE
            )
        );

        if (_skip) {
            setSkip(_skip);
            setCurrentPage(getPageIndex(_skip, PAGE_SIZE));
        }
    };

    const onClickAllApproval = () => {
        setSelectedWpIdxList(checked);
        setCompleteType(0);
        setVisibleApproval(true);
    };

    const onClickAllDeploy = () => {
        setDeployTitleList([]);
        dispatch(GetWorkDocuList(checked));
        setSelectedWpIdxList(checked);
        setWpidxList(checked);
        setTimeout(() => {
            setVisibleDrn(true);
        }, 1000);
    };

    const onClickOpenAssignModal = async (wp_idx: number) => {
        if (userSelector.edms_level == 2) {
            await dispatch(GetWorkAssignUserList(wp_idx));
            setTimeout(() => {
                setReviewerWpIdx(wp_idx);
                setVisibleReviewer(true);
            }, 200);
        }
    };
    // const setHistoryAction = (qs: string) => {
    //     let state: any = location.state;
    //     if (state) {
    //         let dataState = state.dataState;
    //         if (isSetting) {
    //             replace(`${path}?${qs}`, { dataState: dataState });
    //         } else {
    //             push(`${path}?${qs}`, { dataState: dataState });
    //             setIsSetting(true);
    //         }
    //     } else {
    //         if (isSetting) {
    //             replace(`${path}?${qs}`, null);
    //         } else {
    //             push(`${path}?${qs}`, null);
    //             setIsSetting(true);
    //         }
    //     }
    // };

    const clearWorkProcPage = () => {
        // setIsSetting(false);
        setPageSize(0);
        setSkip(0);
        setCurrentPage(1);
        setSearchData("");
        setSelectedType(1);
        setProejctTypeNo(-1);
    };

    const onClickApprovalBtn = (idx: number, data: any) => {
        switch (idx) {
            // onClickApproval
            case 1:
                let _wa_idx: number = data.now_order[2];
                let _wp_idx: number = data.wp_idx;
                let _is_tm: boolean = false;
                if (data.now_order[1] == 13) _is_tm = true;
                onClickApproval(_wa_idx, 0, _wp_idx, _is_tm);
                break;
            // onClickMove
            case 2:
                onClickMove(data.wp_idx);
                break;
            // ModalInfo
            case 3:
                let modalMsg: string = `반려사유 ${data.now_order[7]}`;
                ModalInfo(modalMsg);
                break;

            //onClickDeploy
            case 4:
                onClickDeploy(data);
                break;

            default:
                break;
        }
    };

    const onPopAction = () => {
        let _queryString: object = {};

        let _skip: string | null = searchParam.get("skip");
        let param_searchText: string | null = searchParam.get("searchText");
        let param_selectedType: string | null = searchParam.get("selectedType");
        let param_startDate: string | null = searchParam.get("startDate");
        let param_endDate: string | null = searchParam.get("endDate");

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
        if (param_startDate != null) {
            setStartDay(new Date(param_startDate));
            Object.assign(_queryString, { startDate: param_startDate });
        }
        if (param_endDate != null) {
            setEndDay(new Date(param_endDate));
            Object.assign(_queryString, { endDate: param_endDate });
        }
        setQueryString(makeQueryString(_queryString));
        if (param_startDate != null && param_endDate != null) {
            dispatch(
                GetWorkProcList(
                    workTypeVal,
                    type,
                    projectTypeNo,
                    false, // is_fin 검토완료 플래그
                    selectedType,
                    param_searchText ? param_searchText : "",
                    param_startDate,
                    param_endDate,
                    _skip != undefined ? _skip : skip,
                    PAGE_SIZE
                )
            );
        }
    };
    return (
        <>
            <style>
                {`
                    
                    .k-toolbar {
                        height : 50px;
                        margin-right : 10px;
                        background-color:#fff;
                    }
                   
                 `}
            </style>
            <LoadingIndicatorComponent open={isLoading} />
            <EdmsProjectBase>
                {/*Body*/}
                <S.ContentContainer>
                    <ToastComponent
                        text="체크박스 하나를 선택해주세요."
                        close={() => setVisibleToast(false)}
                        visible={visibleToast}
                        type={"warning"}
                        style={{
                            position: "absolute",
                            bottom: 100,
                            right: 100,
                            alignItems: "center",
                        }}
                    />
                    <WorkProcApprovalComp
                        wptype={type}
                        visible={visibleApproval}
                        onClose={onClose}
                        completeType={completeType}
                        onDrnComplete={onDrnComplete}
                    />
                    <EdmsTmApprovalModal
                        wptype={type}
                        visible={visibleTmApproval}
                        onClose={onClose}
                        onTmComplete={onTmComplete}
                    />
                    <EdmsDrnDistributeModal
                        visible={visibleDrn}
                        title={deployTitleList}
                        onClose={onClose}
                        wpIdxList={wpIdxList}
                        selectedWpIdxList={selectedWpIdxList}
                        unreadWorksData={unreadWorksData}
                    />
                    <EdmsReviewerListModal
                        wpIdx={reviewerWpIdx}
                        isAdmin={isAdmin}
                        visible={visibleReviewer}
                        onClose={onClose}
                    />
                    <S.WorkListContainer>
                        <S.StructureTable>
                            <S.StructureTableHead>
                                <S.SelectDiv>
                                    <S.FormType
                                        value={workTypeVal}
                                        onChange={(e: any) =>
                                            handleChange(e, parseInt(e.target.value))
                                        }
                                        disableUnderline={true}
                                    >
                                        <S.InputSelectItem value={1}>발신함</S.InputSelectItem>
                                        <S.InputSelectItem value={2}>보관함</S.InputSelectItem>
                                    </S.FormType>
                                    <S.FormType
                                        value={projectTypeNo}
                                        onChange={(e: any) =>
                                            setProejctTypeNo(parseInt(e.target.value))
                                        }
                                        disableUnderline={true}
                                    >
                                        <S.InputSelectItem value={-1}>
                                            {"프로젝트 선택"}
                                        </S.InputSelectItem>
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
                                    <S.SearchDateDiv>
                                        <S.Date
                                            type="date"
                                            id="date-picker-inline"
                                            min="2017-01-01"
                                            max="2030-12-31"
                                            value={moment(startDay).format("YYYY-MM-DD")}
                                            onChange={(e: any) => {
                                                let value: string = e.target.value;
                                                let time: number = e.target.valueAsNumber;
                                                if (!time)
                                                    value = moment(new Date()).format("YYYY-MM-DD");
                                                onChangeDate(value, "start");
                                            }}
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
                                        <S.InputSelectItem value={1}>제목</S.InputSelectItem>
                                        <S.InputSelectItem value={2}>TR. No.</S.InputSelectItem>
                                        <S.InputSelectItem value={3}>문서 코드</S.InputSelectItem>
                                        <S.InputSelectItem value={4}>문서 제목</S.InputSelectItem>
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
                                        autoComplete="new-password"
                                    />
                                    <S.SearchBtn onClick={() => onSearchData()}>
                                        검색하기
                                    </S.SearchBtn>
                                    <S.TopDiv>
                                        {workTypeVal == 2 && type == "tm" && (
                                            <S.TopButtonDiv>
                                                <S.TopApprovalBtn
                                                    $approval={approvalType}
                                                    onClick={
                                                        approvalType == true
                                                            ? onClickAllApproval
                                                            : undefined
                                                    }
                                                >
                                                    결재
                                                </S.TopApprovalBtn>
                                                <S.TopRegisterBtn
                                                    $register={registerType}
                                                    onClick={
                                                        registerType == true
                                                            ? onClickAllDeploy
                                                            : undefined
                                                    }
                                                >
                                                    접수 및 배포
                                                </S.TopRegisterBtn>
                                            </S.TopButtonDiv>
                                        )}
                                    </S.TopDiv>
                                </S.SelectDiv>
                            </S.StructureTableHead>

                            <S.WorkListTable>
                                <GridViewComponent
                                    titles={tableHeader ? tableHeader : []}
                                    keys={workListKeys}
                                    values={Object.values(workList)}
                                    fullData={workList}
                                    keysWidth={tableHeadSize}
                                    rowClass="background-color-white color-light-black"
                                    headerClass="background-dark-sky-blue color-white align-center"
                                    getCustomEl={createCustomEl}
                                    keysWidthTotal={workTypeVal == 2 && type == "tm" ? 3 : 7}
                                    datatype={tableHeadType}
                                    reorderable
                                    sortable
                                    excelFilename={`${nowDate.format(
                                        "YYYY-MM-DD"
                                    )}_${type.toUpperCase()}`}
                                    pageable
                                    pagefake
                                    pagecount={PAGE_SIZE}
                                    onPageChange={(
                                        _skip: number,
                                        take: number,
                                        currentPage: number
                                    ) => {
                                        setSkip(_skip);
                                        // console.log(_skip);
                                        // console.log("type=", type);
                                        if (skip != _skip) {
                                            setIsLoading(true);

                                            if (!isLoading) {
                                                onSearchData(_skip);
                                            }
                                            setTimeout(() => {
                                                setIsLoading(false);
                                            }, 3000);
                                        }
                                    }}
                                    nowPageSize={pageSize}
                                    nowPage={currentPage}
                                    //={type != "tm"}
                                    isSelect={workTypeVal == 2 && type == "tm"}
                                    onChangeSelect={onCheckChange}
                                    selectKey={"check_wp_idx"}
                                    queryString={queryString}
                                    onPopAction={onPopAction}
                                    historyRecord
                                />
                            </S.WorkListTable>
                        </S.StructureTable>
                    </S.WorkListContainer>
                </S.ContentContainer>
            </EdmsProjectBase>
        </>
    );
};

export default EdmsWorkProcPage;
