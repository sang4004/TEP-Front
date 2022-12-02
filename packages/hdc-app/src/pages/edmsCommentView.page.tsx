/******************************************************************************
 * Copyright (c) 2021. Moornmo Inc. Rights reserved.                          *
 * Data modelings and methods used are assets of Moornmo Inc.                 *
 * projecttreemodal/index.tsx
 * hooks :
 * useLocations
 *
 * last modify : jh.jeong@ilts.co.kr
 ******************************************************************************/
// React
import React, { useState, useEffect } from "react"; // default hooks
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
//
import { reducerState } from "../common/store";
import {
    LoadingIndicatorComponent,
    GridViewComponent,
    ModalInfo,
    WebEditorComponent,
} from "components";
//
import {
    AllCommentSelectModal,
    EdmsEditorPopup,
    EdmsRevisionHistoryModal,
    ReviewUploadModalComp,
} from "../components";
import * as S from "../styled/edmsCommentView.styled";
import Close from "@material-ui/icons/Close";
import MaxmizeIcon from "@material-ui/icons/AspectRatio";
import PopupIcon from "@material-ui/icons/DynamicFeed";

import {
    GetTmAllReview,
    TmReviewRegister,
    TmReviewDelete,
    GetWorkDocuList,
    SetTmReviewCommentTemp,
    CleanEdmsWorkAttachFile,
} from "../common/action";
import { OrdinalSuffixOf, getExcelFileByType } from "../common/utils";
import { GridCellProps } from "@progress/kendo-react-grid";

export type edmsCommentViewPageProps = {
    wpIdx: number;
    onlyPrev?: boolean;
};
interface FinalEdmsCommentViewPageProps extends edmsCommentViewPageProps {}

const tableHeadSize = [0, 0.3, 1, 1.2, 0.4];

const tableHeadSizeReview = [0.3, 0.5, 1.4, 0.4, 1.4, 0.5, 0.7];

const tableHeadType = [0, 1, 1, 1, 1];
// 컬럼 나오는게 뭔가이상함
const tableHeadTypeReview = [1, 1, 1, 1, 1, 1, 1];

const tableHeaderReview = [
    "Rev.",
    "검토결과",
    "Review Comment",
    "작성자",
    "Reply",
    "설계변경 해당유무 (Y/N)",
    "날짜",
];

const tableHeader = ["", "No.", "Document Number", "DESCRIPTIONS", "Page/Sheet No."];

const ALL_COMMENT_LOCKED_COLUMNS = [true, true, true, true, true];
const EDIT_TYPES: any[] = [false, false, false, false, false];
const LEFT_COLUMN_LENGTH = 5;
const RIGHT_COLUMN_GROUP_LENGTH = 7;
const COMMENT_GROUP_EDIT_TYPES = [false, false, false, false, false, false, false];
const LEFT_COLUMN_CUSTOM_EL_IDX = [2, 4];
var timeoutId: null | NodeJS.Timeout = null;
const EdmsCommentViewPage: React.FunctionComponent<FinalEdmsCommentViewPageProps> = props => {
    // comment_type 1 : 전체 2 : 최근
    const { wp_idx, comment_type } = useParams<{ wp_idx: string; comment_type: string }>();
    const wpIdx = parseInt(wp_idx);
    const onlyPrev = parseInt(comment_type) == 2;
    const dispatch = useDispatch();
    const userSelector = useSelector((state: reducerState) => state.user);
    const tmSelector = useSelector((state: reducerState) => state.tm);
    const workSelector = useSelector((state: reducerState) => state.work);
    const compoSelector = useSelector((state: reducerState) => state.components);

    const [nowType, setNowType] = useState<string>("");
    const [nowDataIdx, setNowDataIdx] = useState<number>(-1);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [allCommentSelectVisible, setAllCommentSelectVisible] = useState<boolean>(false);
    const [historyModalVisible, setHistoryModalVisible] = useState<boolean>(false);
    const [reviewList, setReviewList] = useState<any[]>([]);
    const [originData, setOriginData] = useState<any[]>([]);
    const [originDataListKeys, setOriginDataListKeys] = useState<any[]>([]);
    const [originDataListTitles, setOriginDataListTitles] = useState<any[]>([]);
    const [originDataHeadSize, setOriginDataHeadSize] = useState<any[]>([]);
    const [originDataHeadType, setOriginDataHeadType] = useState<any[]>([]);
    const [docuNo, setDocuNo] = useState<number>(-1);

    const [maxOrder, setMaxOrder] = useState<number>(1);
    const [customElIndexes, setCustomElIndexes] = useState<number[]>([1, 2]);
    // const [revElIndexes, setRevElIndexes] = useState<number[]>([]);
    const [reviewResultElIndexes, setReviewResultElIndexes] = useState<number[]>([]);
    const [reviewCommentElIndexes, setReviewCommentElIndexes] = useState<number[]>([]);
    const [reviewReplyElIndexes, setReviewReplyElIndexes] = useState<number[]>([]);
    const [reviewChangeElIndexes, setReviewChangeElIndexes] = useState<number[]>([]);
    const [nowOrder, setNowOrder] = useState<number>(-1);
    const [editTypes, setEditTypes] = useState<any[]>(EDIT_TYPES);
    // 기존행추가
    const [selectedRowWpIdx, setSelectedRowWpIdx] = useState<number>(-1);
    const [selectedRowIdx, setSelectedRowIdx] = useState<number>(-1);

    //editor popup
    const [visibleEditorPopup, setVisibleEditorPopup] = useState<boolean>(false);
    const [editorPopupContent, setEditorPopupContent] = useState<string>("");
    const [editorPopupImage, setEditorPopupImage] = useState<string>("");
    const [isEditorPopupReply, setIsEditorPopupReply] = useState<boolean>(false);
    const [nowEditorPopupDataIdx, setNowEditorPopupDataIdx] = useState<number>(-1);
    const [nowEditorPopupOrder, setNowEditorPopupOrder] = useState<number>(-1);
    //

    //selection box data
    const [docuNoList, setdocuNoList] = useState<any[]>([]);
    const [docuCodeList, setDocuCodeList] = useState<string[]>([]);
    const [docuDescList, setDocuDescList] = useState<string[]>([]);
    const changeList = ["Y", "N"];

    // Excel Variable
    const [isOpenExcelUpload, setIsOpenExcelUpload] = useState<boolean>(false);

    // 창 팝업화 or 전체화면
    // const [isMaximize, setIsMaximize] = useState<boolean>(false);

    useEffect(() => {
        dispatch(GetWorkDocuList([wpIdx]));
    }, []);

    useEffect(() => {
        if (workSelector.work_docu_list) {
            // setIsMaximize(false);
            setIsLoading(true);
            dispatch(GetTmAllReview(wpIdx));
            if (workSelector.work_docu_list.length != 0) {
                docuNoList.push(-1);
                docuCodeList.push("ALL");
                docuDescList.push("공통");
                for (let list of workSelector.work_docu_list) {
                    docuNoList.push(list.docu_no);
                    docuCodeList.push(list.docu_code);
                    docuDescList.push(list.description_name);
                }
                setdocuNoList([...docuNoList]);
                setDocuCodeList([...docuCodeList]);
                setDocuDescList([...docuDescList]);
            }
        }
    }, [workSelector.work_docu_list]);

    useEffect(() => {
        if (tmSelector.tm_all_review_list != undefined) {
            let _list: any[] = [];
            let _review_list: any[] = [];
            let tmp_review: any[] = tmSelector.tm_all_review_list;
            let maxOrder = 2;
            let idx = -1;
            let _editTypes = EDIT_TYPES;
            // 작성한 리뷰가 없다면
            if (tmp_review.length == 0) {
                _review_list.push({
                    wp_idx: 0,
                    no: 1,
                    docuNo: "",
                    fileName: "-",
                    pageSheet: "",
                    review: [
                        {
                            ["rev0"]: "-",
                            ["create_by0"]: "-",
                            ["change0"]: "N",
                            ["result0"]: "",
                            ["review0"]: "",
                            ["reply0"]: "",
                            ["date0"]: "-",
                            ["review_attach0"]: { file_path: "", originalname: "" },
                            ["reply_attach0"]: { file_path: "", originalname: "" },
                        },
                    ],
                    wr_idx: [-1],
                    is_created: true,
                });
            }
            //
            tmp_review = loadTempData(tmp_review);
            // 바로직전의 리뷰만 보이도록 수정
            if (onlyPrev) {
                let now_wp_idx = tmp_review.length > 0 ? tmp_review[0].wp_idx : -1;
                let sorted = [...tmp_review];
                maxOrder =
                    sorted.length > 0
                        ? sorted.sort((a: any, b: any) => b.order - a.order)[0].order + 1
                        : 1;
                for (var i = 0; i < tmp_review.length; i++) {
                    nowReview = tmp_review[i];
                    if (tmp_review[i + 1] == undefined || tmp_review[i + 1].wp_idx != now_wp_idx) {
                        idx += 1;
                        // 첫 review 생성
                        _review_list.push({
                            wp_idx: nowReview.wp_idx,
                            no: idx + 1,
                            docuNo: nowReview.is_all
                                ? "ALL"
                                : nowReview.docu_code
                                ? nowReview.docu_code
                                : "-",
                            fileName: nowReview.file_name ? nowReview.file_name : "",
                            pageSheet: nowReview.page_sheet_no ? nowReview.page_sheet_no : "-",
                            review: [
                                {
                                    rev0: nowReview.revision ? nowReview.revision : "-",
                                    create_by0: nowReview.create_by,
                                    change0: nowReview.is_change_design,
                                    result0: "Code" + nowReview.code,
                                    review0: nowReview.contents ? nowReview.contents : "-",
                                    reply0: nowReview.reply ? nowReview.reply : "-",
                                    date0: nowReview.date ? nowReview.date : "-",
                                    review_attach0: nowReview.review_attach
                                        ? nowReview.review_attach
                                        : { file_path: "", originalname: "" },
                                    reply_attach0: nowReview.reply_attach
                                        ? nowReview.reply_attach
                                        : { file_path: "", originalname: "" },
                                },
                            ],
                            wr_idx: [nowReview.wr_idx],
                        });
                        // 추가 데이터 미리입력
                        _review_list[idx].review.push({
                            ["rev1"]: "",
                            ["create_by1"]: nowReview.create_by,
                            ["change1"]: "N",
                            ["result1"]: "",
                            ["review1"]: "",
                            ["reply1"]: "",
                            ["date1"]: "-",
                            ["review_attach1"]: { file_path: "", originalname: "" },
                            ["reply_attach1"]: { file_path: "", originalname: "" },
                            order: maxOrder, // 해당값으로 몇회차에 리뷰를 더해줄건지 확인
                        });
                        _review_list[idx].wr_idx.push(-1);
                        now_wp_idx = tmp_review[i + 1]
                            ? tmp_review[i + 1].wp_idx
                            : nowReview.wp_idx;
                    }
                }
                // review grid data output
                _review_list.map((raw: any) => {
                    let obj = {
                        wp_idx: raw.wp_idx,
                        no: raw.no,
                        docuNo: raw.docuNo,
                        fileName: raw.fileName,
                        pageSheet: raw.pageSheet,
                    };
                    let r = raw.review[0];
                    Object.assign(obj, {
                        ["rev0"]: r["rev0"],
                        ["result0"]: r["result0"],
                        ["review0"]: r["review0"],
                        ["create_by0"]: r["create_by0"],
                        ["reply0"]: r["reply0"],
                        ["change0"]: r["change0"],
                        ["date0"]: r["date0"],
                    });
                    Object.assign(obj, {
                        ["rev1"]: "",
                        ["result1"]: "",
                        ["review1"]: "-",
                        ["create_by1"]: "-",
                        ["reply1"]: "-",
                        ["change1"]: "-",
                        ["date1"]: "-",
                    });
                    _editTypes = [..._editTypes, ...COMMENT_GROUP_EDIT_TYPES];
                    _list.push(obj);
                });
                //
                //custom element definition
                SetAllCustomElIndexes(maxOrder);
                //
                // grid head keys
                let keys = [...tableHeader];
                let headSize = [...tableHeadSize];
                let headType = [...tableHeadType];

                for (var i = 0; i < 2; i++) {
                    let _tableHeaderReview = [...tableHeaderReview];
                    if (i != 0) {
                        _tableHeaderReview[2] = "Next " + _tableHeaderReview[1];
                        _tableHeaderReview[4] = "Next " + _tableHeaderReview[3];
                    } else {
                        _tableHeaderReview[2] = "Recent " + _tableHeaderReview[1];
                        _tableHeaderReview[4] = "Recent " + _tableHeaderReview[3];
                    }
                    keys = [...keys, ..._tableHeaderReview];
                    headSize = [...headSize, ...tableHeadSizeReview];
                    headType = [...headType, ...tableHeadTypeReview];
                }
                setOriginDataListTitles([...keys]);
                setOriginDataHeadSize([...headSize]);
                setOriginDataHeadType([...headType]);
                //
                if (_list.length > 0) {
                    setOriginDataListKeys([...Object.keys(_list[0])]);
                    setMaxOrder(maxOrder);
                    setReviewList([..._review_list]);
                    setOriginData([..._list]);
                    setEditTypes([..._editTypes]);
                }
                setIsLoading(false);
            } else {
                for (var nowReview of tmp_review) {
                    // original review가 아닐경우 pass
                    if (nowReview.p_wr_idx != 0) continue;
                    idx += 1;
                    // 첫 review 생성
                    _review_list.push({
                        wp_idx: nowReview.wp_idx,
                        no: idx + 1,
                        docuNo: nowReview.is_all
                            ? "ALL"
                            : nowReview.docu_code
                            ? nowReview.docu_code
                            : "-",
                        fileName: nowReview.file_name ? nowReview.file_name : "-",
                        pageSheet: nowReview.page_sheet_no ? nowReview.page_sheet_no : "",
                        review: [
                            {
                                rev0: nowReview.revision,
                                create_by0: nowReview.create_by,
                                change0: nowReview.is_change_design,
                                result0: "Code" + nowReview.code,
                                review0: nowReview.contents ? nowReview.contents : "-",
                                reply0: nowReview.reply ? nowReview.reply : "-",
                                date0: nowReview.date ? nowReview.date : "-",
                                review_attach0: nowReview.review_attach
                                    ? nowReview.review_attach
                                    : { file_path: "", originalname: "" },
                                reply_attach0: nowReview.reply_attach
                                    ? nowReview.reply_attach
                                    : { file_path: "", originalname: "" },
                            },
                        ],
                        wr_idx: [nowReview.wr_idx],
                    });
                    //
                    // 회차별 리뷰 추가
                    let child_review = tmp_review.find(
                        (raw: any) => raw.p_wr_idx == nowReview.wr_idx
                    );
                    let order = 1;
                    while (child_review != undefined) {
                        _review_list[idx].review.push({
                            ["rev" + order]: child_review.revision,
                            ["create_by" + order]: child_review.create_by,
                            ["change" + order]: child_review.is_change_design,
                            ["result" + order]: "Code" + child_review.code,
                            ["review" + order]: child_review.contents ? child_review.contents : "-",
                            ["reply" + order]: child_review.reply ? child_review.reply : "-",
                            ["date" + order]: child_review.date ? child_review.date : "-",
                            ["review_attach" + order]: child_review.review_attach
                                ? child_review.review_attach
                                : { file_path: "", originalname: "" },
                            ["reply_attach" + order]: child_review.reply_attach
                                ? child_review.reply_attach
                                : { file_path: "", originalname: "" },
                        });
                        _review_list[idx].wr_idx.push(child_review.wr_idx);

                        child_review = tmp_review.find(
                            (raw: any) => raw.p_wr_idx == child_review.wr_idx
                        );
                        order += 1;
                    }
                    if (order + 1 > maxOrder) maxOrder = order + 1;
                    //
                }
                idx = -1;
                // 추가 데이터 미리입력
                for (var nowReview of tmp_review) {
                    if (nowReview.p_wr_idx != 0) continue;
                    idx += 1;
                    for (var i = _review_list[idx].review.length - 1; i < maxOrder; i++) {
                        let newIdx = i + 1;
                        _review_list[idx].review.push({
                            ["rev" + newIdx]: nowReview.revision,
                            ["create_by" + newIdx]: nowReview.create_by,
                            ["change" + newIdx]: "N",
                            ["result" + newIdx]: "",
                            ["review" + newIdx]: "",
                            ["reply" + newIdx]: "",
                            ["date" + newIdx]: "-",
                            ["review_attach" + newIdx]: { file_path: "", originalname: "" },
                            ["reply_attach" + newIdx]: { file_path: "", originalname: "" },
                        });

                        _review_list[idx].wr_idx.push(-1);
                    }
                    //
                }
                // review grid data output
                _review_list.map((raw: any) => {
                    let obj = {
                        wp_idx: raw.wp_idx,
                        no: raw.no,
                        docuNo: raw.docuNo,
                        fileName: raw.fileName,
                        pageSheet: raw.pageSheet,
                    };

                    for (var i = 0; i < maxOrder; i++) {
                        let r = raw.review[i];
                        // 바로직전의 리뷰만나오도록
                        if (r == undefined) {
                            Object.assign(obj, {
                                ["rev" + i]: "",
                                ["result" + i]: "",
                                ["review" + i]: "-",
                                ["create_by" + i]: "-",
                                ["reply" + i]: "-",
                                ["change" + i]: "-",
                                ["date" + i]: "-",
                            });
                        } else {
                            Object.assign(obj, {
                                ["rev" + i]: r["rev" + i],
                                ["result" + i]: r["result" + i],
                                ["review" + i]: r["review" + i],
                                ["create_by" + i]: r["create_by" + i],
                                ["reply" + i]: r["reply" + i],
                                ["change" + i]: r["change" + i],
                                ["date" + i]: r["date" + i],
                            });
                        }
                        _editTypes = [..._editTypes, ...COMMENT_GROUP_EDIT_TYPES];
                    }
                    _list.push(obj);
                });
                //
                //custom element definition
                SetAllCustomElIndexes(maxOrder);
                //
                // grid head keys
                let keys = [...tableHeader];
                let headSize = [...tableHeadSize];
                let headType = [...tableHeadType];

                for (var i = 0; i < maxOrder; i++) {
                    let _tableHeaderReview = [...tableHeaderReview];
                    _tableHeaderReview[1] = OrdinalSuffixOf(i + 1) + " " + _tableHeaderReview[1];
                    _tableHeaderReview[3] = OrdinalSuffixOf(i + 1) + " " + _tableHeaderReview[3];
                    keys = [...keys, ..._tableHeaderReview];
                    headSize = [...headSize, ...tableHeadSizeReview];
                    headType = [...headType, ...tableHeadTypeReview];
                }
                setOriginDataListTitles([...keys]);
                setOriginDataHeadSize([...headSize]);
                setOriginDataHeadType([...headType]);
                //
                if (_list.length > 0) {
                    setOriginDataListKeys([...Object.keys(_list[0])]);
                    setMaxOrder(maxOrder);
                    setReviewList([..._review_list]);
                    setOriginData([..._list]);
                }
                setEditTypes([..._editTypes]);
                setIsLoading(false);
            }
        } else {
            setOriginData([]);
            setOriginDataListKeys([...tableHeader]);
            setIsLoading(false);
        }
    }, [tmSelector.tm_all_review_list]);

    const SetAllCustomElIndexes = (reviewCount: number) => {
        let customElIdx = LEFT_COLUMN_CUSTOM_EL_IDX;
        let customElRevIdx = [];
        let customElResultIdx = [];
        let customElCommentIdx = [];
        let customElReplyIdx = [];
        let customElChangeIdx = [];
        for (var i = 0; i < reviewCount; i++) {
            let sIdx = i * RIGHT_COLUMN_GROUP_LENGTH + LEFT_COLUMN_LENGTH; // 리뷰 묶음들의 처음 index를 의미합니다.
            // customElIdx.push(sIdx);
            // customElRevIdx.push(sIdx); // 리비전
            customElIdx.push(sIdx + 1);
            customElResultIdx.push(sIdx + 1); // 검토결과
            customElIdx.push(sIdx + 2);
            customElCommentIdx.push(sIdx + 2); // 코멘트
            customElIdx.push(sIdx + 4);
            customElReplyIdx.push(sIdx + 4); // 답장
            customElIdx.push(sIdx + 5);
            customElChangeIdx.push(sIdx + 5);
        }
        setCustomElIndexes(customElIdx);
        // setRevElIndexes(customElRevIdx);
        setReviewResultElIndexes(customElResultIdx);
        setReviewCommentElIndexes(customElCommentIdx);
        setReviewReplyElIndexes(customElReplyIdx);
        setReviewChangeElIndexes(customElChangeIdx);
    };

    const loadTempData = (tmp_review: any[]) => {
        // 임시저장된 데이터 불러오기
        try {
            for (var r of tmp_review) {
                let idx = compoSelector.tmReviewOriginTemp.findIndex(raw => raw.wp_idx == r.wp_idx);
                if (idx != -1) {
                    let data = compoSelector.tmReviewOriginTemp[idx];
                    let review = compoSelector.tmReviewListTemp[idx];
                    let order = r.order - 1;
                    r.rev = data["rev" + order];
                    r.code = parseInt(data["result" + order].replace("Code", ""));
                    r.contents = data["review" + order];
                    r.reply = data["reply" + order];
                    r.date = data["date" + order];
                    r.is_change_design = data["change" + order];
                    r.page_sheet_no = data["pageSheet"];
                    r.review_attach = review.review[order]["review_attach" + order];
                    r.reply_attach = review.review[order]["reply_attach" + order];
                }
            }
        } catch (err) {
            console.log("임시저장 데이터 불러오기 실패.");
        } finally {
        }
        //
        return tmp_review;
    };

    const change_list_data = (list: any, data: any, keyVal: any) => {
        let order: number;
        let changeData: any;
        let dataKey = Object.keys(data)[0];
        //review0 에서 review 는 키, 0 은 order
        order = parseInt(dataKey.replace(/^\D+/g, ""));
        changeData = { [dataKey]: Object.values(data)[0] };

        list.map((raw: any) => {
            if (raw.no == keyVal) {
                Object.assign(raw.review[order], changeData);
            }
        });

        return list;
    };

    // legacy size tool
    // const onClose = () => {
    //     setReviewList([]);
    //     setOriginData([]);
    //     setOriginDataListKeys([]);
    // };

    // const onClickMaxmize = () => {
    //     setIsMaximize(true);
    // };

    // const onClickMinimize = () => {
    //     setIsMaximize(false);
    // };
    //

    const onClickSelect = (dataIdx: number, type: string, nowOrder: number) => {
        setNowDataIdx(dataIdx);
        setNowType(type);
        setAllCommentSelectVisible(true);
        setNowOrder(nowOrder);
    };
    const onCloseModal = () => {
        setAllCommentSelectVisible(false);
    };

    // Grid handler
    const onChangeSelectData = (value: string) => {
        let data: any;
        let changedItem = originData.find((raw: any) => raw.no == nowDataIdx + 1);
        let review = reviewList[nowDataIdx].review[nowOrder];
        switch (nowType) {
            case "change":
                review["change" + nowOrder] = value;
                data = { ["change" + nowOrder]: value };
                break;
            case "docu":
                data = { docuNo: value };
                break;
            case "code":
            default:
                review["result" + nowOrder] = value;
                data = { ["result" + nowOrder]: value };
                break;
        }
        Object.assign(changedItem, data);
        setReviewList([...reviewList]);
        setOriginData([...originData]);
        onTemporarySave(changedItem, reviewList[nowDataIdx]);
    };

    const onChangedItem = (keyVal: any, data: any) => {
        let changedItem = originData.find((raw: any) => Object.values(raw)[0] == keyVal);
        Object.assign(changedItem, data);
        let changeReviewList = change_list_data(reviewList, data, keyVal);
        setReviewList([...changeReviewList]);
    };

    // 추가, 삭제, 적용 기능
    const onClickAdd = (isCopy: boolean = false) => {
        // isCopy : 기존행 추가
        let obj = {};
        let lastItem: any;
        let selectedData = reviewList.find(raw => raw.wp_idx == selectedRowWpIdx);
        let defaultObj = {
            no: reviewList.length + 1,
            docuNo: "",
            fileName: "",
            pageSheet: "",
        };
        //기존행 추가시
        let isCopyFlag = isCopy && selectedData && selectedData.review;
        if (isCopyFlag) {
            defaultObj.docuNo = selectedData.docuNo;
            defaultObj.fileName = selectedData.fileName;
            defaultObj.pageSheet = selectedData.pageSheet;
        }
        //
        let initData = { ...defaultObj };
        let reviews = [];
        let _order = maxOrder;
        if (onlyPrev) _order = 2; // 두개 회차만 추가되면 된다.
        for (var i = 0; i < _order; i++) {
            let obj = {
                ["rev" + i]: "",
                ["result" + i]: "",
                ["review" + i]: "-",
                ["create_by" + i]: "-",
                ["reply" + i]: "-",
                ["change" + i]: "-",
                ["date" + i]: "-",
                ["review_attach" + i]: { file_path: "", originalname: "" },
                ["reply_attach" + i]: { file_path: "", originalname: "" },
                order: maxOrder, // 리뷰데이터관리시에 필요함
            };
            Object.assign(initData, obj);
            reviews.push(obj);
        }
        //기존행 추가시
        if (isCopyFlag) {
            let _reviewList = selectedData.review;
            for (var i = 0; i < _reviewList.length; i++) {
                if (reviews[i] == undefined) break;
                let _review = _reviewList[i];
                let _review_data = {
                    ["rev" + i]: _review["rev" + i],
                    ["result" + i]: _review["result" + i],
                    ["review" + i]: _review["review" + i],
                    ["create_by" + i]: "",
                    ["reply" + i]: _review["reply" + i],
                    ["change" + i]: _review["change" + i],
                    ["date" + i]: _review["date" + i],
                    ["review_attach" + i]: _review["review_attach" + i],
                    ["reply_attach" + i]: _review["reply_attach" + i],
                };
                Object.assign(initData, { ..._review_data });
                Object.assign(reviews[i], { ..._review_data });
                Object.assign(obj, { ..._review_data });
            }
        }
        //

        if (originData.length == 0) lastItem = initData;
        else lastItem = originData[originData.length - 1];

        for (var key of Object.keys(lastItem)) {
            if (key == Object.keys(lastItem)[0] || key == "no")
                Object.assign(obj, { [key]: parseInt(lastItem[key]) + 1 });
            else Object.assign(obj, { [key]: "" });
        }
        // 기존행 추가시
        if (isCopyFlag) Object.assign(obj, { ...initData });
        //

        reviewList.push({
            ...defaultObj,
            review: [...reviews],
            wr_idx: reviews.map(raw => -1),
            is_created: true, // 처음 생성한 로우의 경우 추가
        });
        setReviewList([...reviewList]);
        setOriginData([...originData, obj]);
    };

    const onClickDelete = async (data: any) => {
        setIsLoading(true);
        let idx = originData.findIndex(
            raw => raw[Object.keys(raw)[0]] == data[Object.keys(data)[0]]
        );
        // 본인이 작성한 문서만 삭제가 가능하도록
        if (originData[idx].create_by0 !== userSelector.username) {
            setIsLoading(false);
            return ModalInfo("삭제 권한이 없는 코멘트입니다.");
        }

        originData.splice(idx, 1);
        setOriginData([...originData]);

        await dispatch(TmReviewDelete(tmSelector.tm_all_review_list, originData));

        setTimeout(() => {
            dispatch(GetTmAllReview(wpIdx));
        }, 2000);
    };

    const onClickApply = async () => {
        setIsLoading(true);
        dispatch(SetTmReviewCommentTemp([], [])); // 임시데이터 삭제!
        await dispatch(TmReviewRegister(wpIdx, reviewList, originData));

        setTimeout(() => {
            dispatch(GetTmAllReview(wpIdx));
        }, 2000);
    };
    //

    const createCustomEl = (
        idx: number,
        dataIdx?: number,
        columnIdx?: number,
        dataItem?: any,
        props?: GridCellProps
    ) => {
        let defaultObj: any = {};
        if (props) {
            Object.assign(defaultObj, {
                style: { ...props.style, "border-color": "rgba(0,0,0,0.08)" },
                className: props.className,
                // colSpan: props.colSpan,
                // role: "gridcell",
                // "aria-colindex": props.ariaColumnIndex,
                // "aria-selected": props.isSelected,
                // "data-grid-col-index": props.columnIndex,
            });
        }

        if (dataIdx == undefined) {
            if (customElIndexes.indexOf(idx) != -1) return true;
            return false;
        }

        if (dataIdx && originData[dataIdx] == undefined)
            return <S.TableTd {...defaultObj}>-</S.TableTd>;
        let data = originData[dataIdx];
        let review = reviewList[dataIdx];
        let nowOrder = Math.floor((idx - LEFT_COLUMN_LENGTH) / RIGHT_COLUMN_GROUP_LENGTH);
        let nowReview = review.review[nowOrder];
        // 본인이 작성한 리뷰인지.
        // 회차에 따라서 구분 ( 회차마다 작성자가 달리질 수 있기에)
        let isMine = userSelector.groupname.indexOf(data.create_by0) != -1 || data.create_by0 == "";
        //
        if (idx == 2) {
            return (
                <S.TableTd {...defaultObj}>
                    {data.docuNo}
                    {isMine && (
                        <S.ButtonWrap>
                            <S.TableButton
                                onClick={() => {
                                    onClickSelect(dataIdx, "docu", nowOrder);
                                }}
                            >
                                선택
                            </S.TableButton>
                        </S.ButtonWrap>
                    )}
                </S.TableTd>
            );
        } else if (idx == 3) {
            return (
                <S.TableTd {...defaultObj}>
                    {data && data.fileName === "" ? "" : data.fileName}
                </S.TableTd>
            );
        } else if (idx == 4) {
            return (
                <S.TableTd {...defaultObj}>
                    {isMine ? (
                        <S.TablePageSheet
                            defaultValue={data.pageSheet}
                            type="number"
                            onChange={e => onChangePageSheet(dataIdx, parseInt(e.target.value))}
                        />
                    ) : (
                        <>{data.pagesheet}</>
                    )}
                </S.TableTd>
            );
        }
        // else if (idx == 5) {
        //     if (data && data.rev === "") {
        //         return (
        //             <S.TableTd
        //                 className={"k-grid-content-sticky"}
        //                 style={props ? { ...props.style } : {}}
        //                 {...defaultObj}
        //             ></S.TableTd>
        //         );
        //     } else {
        //         return (
        //             <S.TableTd
        //                 className={"k-grid-content-sticky"}
        //                 style={
        //                     props
        //                         ? { textAlign: "center", ...props.style }
        //                         : { textAlign: "center" }
        //                 }
        //                 onClick={() =>
        //                     onClickRevisonHistoryModal(
        //                         tmSelector.tm_all_review_list[dataIdx]
        //                             ? tmSelector.tm_all_review_list[dataIdx].docu_no
        //                             : -1
        //                     )
        //                 }
        //             >
        //                 <S.TableCode>{data.rev}</S.TableCode>
        //             </S.TableTd>
        //         );
        //     }
        // }
        else if (reviewResultElIndexes.indexOf(idx) != -1) {
            return (
                <S.TableTd {...defaultObj}>
                    {data && data["result" + nowOrder] != "" ? data["result" + nowOrder] : <></>}
                    {isMine && (
                        <S.ButtonWrap>
                            <S.TableButton onClick={() => onClickSelect(dataIdx, "code", nowOrder)}>
                                선택
                            </S.TableButton>
                        </S.ButtonWrap>
                    )}
                </S.TableTd>
            );
        } else if (reviewCommentElIndexes.indexOf(idx) != -1) {
            let content = data ? data["review" + nowOrder] : "";
            let image =
                nowReview &&
                nowReview["review_attach" + nowOrder] &&
                nowReview["review_attach" + nowOrder].file_path
                    ? nowReview["review_attach" + nowOrder].file_path
                    : "";
            return (
                <S.TableTd {...defaultObj}>
                    <S.ButtonWrap style={{ flexDirection: "column" }}>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: content,
                            }}
                            style={{ height: "fit-content", overflowY: "hidden" }}
                        />
                        {isMine && (
                            <S.TableButton
                                onClick={() =>
                                    onClickOpenEditor(content, false, dataIdx, nowOrder, image)
                                }
                            >
                                수정
                            </S.TableButton>
                        )}
                    </S.ButtonWrap>
                </S.TableTd>
            );
        } else if (reviewReplyElIndexes.indexOf(idx) != -1) {
            let reply = data ? data["reply" + nowOrder] : "";
            let image =
                nowReview &&
                nowReview["reply_attach" + nowOrder] &&
                nowReview["reply_attach" + nowOrder].file_path
                    ? nowReview["reply_attach" + nowOrder].file_path
                    : "";
            return (
                <S.TableTd {...defaultObj}>
                    <S.ButtonWrap style={{ flexDirection: "column" }}>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: reply,
                            }}
                            style={{ height: "fit-content", overflowY: "hidden" }}
                        />
                        {isMine && (
                            <S.TableButton
                                onClick={() =>
                                    onClickOpenEditor(reply, true, dataIdx, nowOrder, image)
                                }
                            >
                                수정
                            </S.TableButton>
                        )}
                    </S.ButtonWrap>
                </S.TableTd>
            );
        } else if (reviewChangeElIndexes.indexOf(idx) != -1) {
            return (
                <S.TableTd {...defaultObj}>
                    {data && data["change" + nowOrder] != "" ? data["change" + nowOrder] : <></>}
                    {isMine && (
                        <S.ButtonWrap>
                            <S.TableButton
                                onClick={() => onClickSelect(dataIdx, "change", nowOrder)}
                            >
                                선택
                            </S.TableButton>
                        </S.ButtonWrap>
                    )}
                </S.TableTd>
            );
        }
        return null;
    };

    const onTemporarySave = (data: any, _reviewList: any) => {
        // 임시저장
        if (timeoutId != null) clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
            dispatch(SetTmReviewCommentTemp(data, _reviewList));
        }, 3000);
    };

    const onChangePageSheet = (dataIdx: number, pagesheet: number) => {
        if (dataIdx > -1 && pagesheet > 0) {
            originData[dataIdx]["pageSheet"] = pagesheet;
            reviewList[dataIdx]["pageSheet"] = pagesheet;
        }
        setOriginData(originData);
        setReviewList(reviewList);

        onTemporarySave(originData[dataIdx], reviewList[dataIdx]);
    };

    const onClickOpenEditor = (
        content: string,
        is_reply: boolean,
        dataIdx: number,
        nowOrder: number,
        image: string
    ) => {
        dispatch(CleanEdmsWorkAttachFile());
        setVisibleEditorPopup(true);
        setEditorPopupContent(content);
        setEditorPopupImage(image);
        setIsEditorPopupReply(is_reply);
        setNowEditorPopupDataIdx(dataIdx);
        setNowEditorPopupOrder(nowOrder);
    };

    const onClickRevisonHistoryModal = (docu_no: number) => {
        setDocuNo(docu_no);
        setHistoryModalVisible(true);
    };

    const onChangeEditor = (content: string, delFile?: boolean) => {
        try {
            let review = reviewList[nowEditorPopupDataIdx].review;
            //#region 첨부파일 관리
            if (
                (workSelector.edms_work_attach_file &&
                    workSelector.edms_work_attach_file.length > 0) ||
                delFile
            ) {
                let attach = !delFile
                    ? workSelector.edms_work_attach_file[0]
                    : { file_path: "", originalname: "" };
                if (attach) {
                    if (isEditorPopupReply) {
                        if (review[nowEditorPopupOrder]) {
                            review[nowEditorPopupOrder]["reply_attach" + nowEditorPopupOrder] =
                                attach;
                        } else {
                            review.push({ ["reply_attach" + nowEditorPopupOrder]: attach });
                        }
                    } else {
                        if (review[nowEditorPopupOrder]) {
                            review[nowEditorPopupOrder]["review_attach" + nowEditorPopupOrder] =
                                attach;
                        } else {
                            review.push({ ["review_attach" + nowEditorPopupOrder]: attach });
                        }
                    }
                }
            }
            //#endregion
            if (isEditorPopupReply) {
                if (review[nowEditorPopupOrder]) {
                    review[nowEditorPopupOrder]["reply" + nowEditorPopupOrder] = content;
                } else {
                    review.push({ ["reply" + nowEditorPopupOrder]: content });
                }
                originData[nowEditorPopupDataIdx]["reply" + nowEditorPopupOrder] = content;
            } else {
                if (review[nowEditorPopupOrder]) {
                    review[nowEditorPopupOrder]["review" + nowEditorPopupOrder] = content;
                } else {
                    review.push({ ["review" + nowEditorPopupOrder]: content });
                }
                originData[nowEditorPopupDataIdx]["review" + nowEditorPopupOrder] = content;
            }
            // 임시저장
            onTemporarySave(originData[nowEditorPopupDataIdx], reviewList[nowEditorPopupDataIdx]);

            setReviewList([...reviewList]);
            setOriginData([...originData]);
            setEditorPopupContent(content);

            if (!delFile) setVisibleEditorPopup(false);
        } catch (err) {
            console.log("on change editor errro : ", err);
        }
    };

    const onChangeSelect = (selectItems: any) => {
        let key = Object.keys(selectItems).length > 0 ? Object.keys(selectItems)[0] : null;
        if (key && typeof key == "string" && selectItems[key]) {
            let wp_idx = parseInt(key);
            setSelectedRowWpIdx(wp_idx);
            setSelectedRowIdx(reviewList.findIndex(raw => raw.wp_idx == wp_idx));
        } else {
            setSelectedRowWpIdx(-1);
            setSelectedRowIdx(-1);
        }
    };

    const onClickExcelOpen = async () => {
        setIsLoading(true);
        await getExcelFileByType("review_comment", {
            wp_idx: wpIdx,
            edms_access_token: window.localStorage.getItem("edms_access_token"),
        });
        setTimeout(() => {
            setIsLoading(false);
        }, 500);
    };

    const onClickExcelUpload = () => {
        setIsOpenExcelUpload(true);
    };

    const onCloseExcelUpload = () => {
        setIsOpenExcelUpload(false);
    };

    const onDeleteTemporaryData = () => {
        dispatch(SetTmReviewCommentTemp([], [])); // 임시데이터 삭제!
        ModalInfo("임시데이터 삭제완료");
        location.reload();
    };

    const onClickHome = () => {
        window.localStorage.setItem("hdc_past_path", "");
        location.href = "/edms/home";
    };

    return (
        <S.Block>
            <S.Inner>
                <style>
                    {` 
                        .k-grid table {
                            width : 100% !important;
                        }
                        .k-grid-container ::-webkit-scrollbar{
                            background-color: transparent !important;
                        }
                        .k-grid a { 
                            color : #1890ff;
                        }
                        .k-grid a:hover{
                            opacity : 0.8;
                        }
                        `}
                </style>
                <ReviewUploadModalComp
                    visible={isOpenExcelUpload}
                    onClose={onCloseExcelUpload}
                    wp_idx={wpIdx}
                />
                <AllCommentSelectModal
                    visible={allCommentSelectVisible}
                    onClose={onCloseModal}
                    docuCodeList={docuCodeList}
                    docuDescList={docuDescList}
                    changeList={changeList}
                    dataIdx={nowDataIdx}
                    nowType={nowType}
                    onChangeSelectData={onChangeSelectData}
                />
                <EdmsEditorPopup
                    content={editorPopupContent}
                    visible={visibleEditorPopup}
                    onChange={onChangeEditor}
                    onClose={() => setVisibleEditorPopup(false)}
                    is_reply={isEditorPopupReply}
                    image={editorPopupImage}
                />
                <EdmsRevisionHistoryModal
                    visible={historyModalVisible}
                    onClose={() => setHistoryModalVisible(false)}
                    docu_no={docuNo}
                />
                <LoadingIndicatorComponent open={isLoading} style={{ zIndex: 1300 }} />
                <S.ModalHeader className="drag-handle-element">
                    <S.HeaderTitle>
                        <S.HomeIconBlock onClick={onClickHome} />
                        전체 코멘트 보기
                    </S.HeaderTitle>
                    <S.HeaderBtnBlock>
                        {/* {!isMaximize ? (
                            <S.ModalCloseBtn onClick={onClickMaxmize}>
                                <MaxmizeIcon fontSize="large" />
                            </S.ModalCloseBtn>
                        ) : (
                            <S.ModalCloseBtn onClick={onClickMinimize}>
                                <PopupIcon fontSize="large" />
                            </S.ModalCloseBtn>
                        )}
                        <S.ModalCloseBtn onClick={onClose}>
                            <Close style={{fontSize : "1.6em"}} />
                        </S.ModalCloseBtn> */}
                        <S.ExcelOpenBtn onClick={onDeleteTemporaryData}>
                            임시데이터 삭제
                        </S.ExcelOpenBtn>
                        <S.ExcelOpenBtn onClick={onClickExcelOpen}>Excel Open</S.ExcelOpenBtn>
                        <S.ExcelOpenBtn onClick={onClickExcelUpload}>Excel Upload</S.ExcelOpenBtn>
                    </S.HeaderBtnBlock>
                </S.ModalHeader>
                <S.AllCommentContainer>
                    <S.GridViewWrap>
                        <GridViewComponent
                            titles={originDataListTitles}
                            fullData={originData}
                            values={originData}
                            keys={originDataListKeys}
                            keysWidth={originDataHeadSize}
                            keysWidthTotal={8}
                            datatype={originDataHeadType}
                            getCustomEl={createCustomEl}
                            headerClass="background-dark-sky-blue color-white align-center"
                            rowClass="border-color-light-black"
                            // isEdit={true}
                            // isAdd={true}
                            // isDel={true}
                            isSearch={true}
                            editKey={originDataListKeys[0]}
                            editType={editTypes}
                            onClickAdd={onClickAdd}
                            onClickApply={onClickApply}
                            onClickDel={onClickDelete}
                            onItemChanged={onChangedItem}
                            filterable={false}
                            sortable={true}
                            lockedColumns={ALL_COMMENT_LOCKED_COLUMNS}
                            // isAddCustom={true}
                            // isAddCustomText={
                            //     selectedRowIdx != -1
                            //         ? `No. ${selectedRowIdx + 1}기존행추가`
                            //         : `기존행추가`
                            // }
                            onClickAddCustom={() => onClickAdd(true)}
                            onChangeSelect={onChangeSelect}
                            isSelect={true}
                            isSelectSingle={true}
                            selectKey={"wp_idx"}
                        />
                    </S.GridViewWrap>
                </S.AllCommentContainer>
            </S.Inner>
        </S.Block>
    );
};

export default EdmsCommentViewPage;
