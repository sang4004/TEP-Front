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
import React, { useState, useEffect } from "react";
import { useLocations } from "hooks";
import { useDispatch, useSelector } from "react-redux"; // redux
import { useParams } from "react-router-dom";
import { reducerState } from "../common";
import {
    getExcelFileByType,
    getMoment,
    windowOpenByPopup,
    open3DModelFile,
    generateTrZipDownloadURI,
} from "../common/utils";
import { digitalTwinDomain, domain } from "../common/network";

import {
    EdmsProjectBase,
    EdmsDocuPublishModal,
    EdmsReplyTmModal,
    EdmsTmFileVersionModal,
    ReviewUploadModalComp,
    EdmsTmPdfDownLoadComp,
    EdmsTmApprovalModal,
    EdmsTmAttachFileModal,
    EdmsTmModifyModal,
} from "../components";
import { GridViewComponent, ModalInfo, LoadingIndicatorComponent } from "components";
import {
    ChangeNavTitle,
    GetWorkDocuList,
    WorkProcDetail,
    GetCategoryList,
    GetOriginalTm,
    GetOriginalTmCode,
    GetHencTmHtmlData,
    GetDrnList,
    GetTmDetailList,
    GetTmCodeList,
    TmVersionFileList,
    GetReferenceTmUser,
    TmConfirmRefer,
    RequestTmReferer,
    GetDocuManager,
    GetShinhanTmHtmlData,
    GetEdmsAddress,
    ConfirmCompleteReview,
    GetAllTrWorkList,
    GetNativeFileList,
} from "../common/action";

import * as S from "../styled/edmsTmdetail.styled";
import ArrowBackIcon from "@material-ui/icons/ArrowBackIos";

const moment = getMoment();

const tableHeadSize = [0.4, 0.75, 1.4, 0.2, 0.2, 0.2, 0.2, 0.35, 0.3, 0.3];
const tableHeadType = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
const tableHeader = [
    "문서코드",
    "문서제목",
    "파일명",
    "작성자",
    "문서단계",
    "담당자",
    "파일버전",
    "문서회신 리뷰내역",
    "상세보기",
    "문서회신 생성",
    // "버전업로드",
];

const tableHeadSize1 = [0.2, 0.6, 0.6, 0.2, 0.3, 0.4, 1, 0.4, 0.3, 1, 0.5];
const tableHeadType1 = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
const tableHeader1 = [
    "No.",
    "Document Number",
    "Description",
    "Rev",
    "검토결과",
    "Page/Sheet No",
    "Review Comment",
    "작성자",
    "작성일자",
    "Reply",
    "파일다운로드",
];

const CONTEXT_MENU_ITEMS = [
    "TR 정보",
    "Review Comment 업로드",
    "Review Comment 다운로드",
    "공문 다운로드",
    "공문 미리보기",
    "일괄다운로드",
];

const EdmsTmDetailPage = (props: any) => {
    const dispatch = useDispatch();
    const { path, searchParam, back, existBack, pushHistory } = useLocations();
    const { wp_idx } = useParams<{ wp_idx: string }>();

    const tmSelector = useSelector((state: reducerState) => state.tm);
    const workSelector = useSelector((state: reducerState) => state.work);
    const fileSelector = useSelector((state: reducerState) => state.files);
    const userSelector = useSelector((state: reducerState) => state.user);
    const cateSelector = useSelector((state: reducerState) => state.category);
    const pjSelector = useSelector((state: reducerState) => state.project);

    const WpIdx = parseInt(wp_idx);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isTmUser, setIsTmUser] = useState<boolean>(false);
    const [isTmManager, setIsTmManager] = useState<boolean>(false);
    const [isReferConfirm, setIsReferConfirm] = useState<boolean>(false);
    const [tmModalVisible, setTmModalVisible] = useState<boolean>(false);
    const [tmPdfDownLoadVisible, setTmPdfDownLoadVisible] = useState<boolean>(false);
    const [tmPdfDownloadType, setTmPdfDownloadType] = useState<"SHIN" | "HENC">("HENC");
    const [isTmPdfPreview, setIsTmPdfPreview] = useState<boolean>(false);
    const [fileUploadModalVisible, setFileUploadModalVisible] = useState<boolean>(false);
    const [drnPublishModalVisible, setDrnPublishModalVisible] = useState<boolean>(false);
    const [trModifyModalVisible, setTrModifyModalVisible] = useState<boolean>(false);
    const [reviewUpModalVisible, setReviewUpModalVisible] = useState<boolean>(false);
    const [isApprovalModal, setIsApprovalModal] = useState<boolean>(false);
    const [isTmAttachFileModal, setIsTmAttachFileModal] = useState<boolean>(false);
    const [isSendCC, setIsSendCC] = useState<boolean>(false);
    const [isDocuManagerList, setIsDcouManagerList] = useState<any[]>([]);
    // 재회신
    const [isReSend, setIsReSend] = useState<boolean>(false);

    const [docuNo, setDocuNo] = useState<number>(-1);
    const [state, setState] = useState<string>("DRN");
    const [checked, setChecked] = useState<number[]>([]);

    const [docuList, setDocuList] = useState<any[]>([]);
    const [docuNoList, setDocuNoList] = useState<any[]>([]);
    const [docuListKeys, setDocuListKeys] = useState<any[]>([]);

    const [drnInfo, setDrnInfo] = useState<any[]>([]);
    const [DrnList, setDrnList] = useState<any[]>([]);
    const [DrnListKeys, setDrnListKeys] = useState<any[]>([]);
    const [DrnColorList, setDrnColorList] = useState<any[]>([]);

    const [filtered, setFiltered] = useState<any>();
    const [docNoList, setDocNoList] = useState<any[]>([]);
    const [cateNoList, setCateNoList] = useState<any[]>([]);
    const [projectNoList, setProjectNoList] = useState<any[]>([]);
    const [attachFiles, setAttachFiles] = useState<any[]>([]);

    const [wpIdx, setWpIdx] = useState<string>("");
    const [wpType, setWpType] = useState<string>("");
    const [wpDate, setWpDate] = useState<string>("");
    const [dueDate, setDueDate] = useState<string>("");
    const [docuDrn, setDocuDrn] = useState<string>("");
    const [createTm, setCreateTm] = useState<string>("");
    const [procDetail, setProcDetail] = useState<any>({});
    const [assignDate, setAssignDate] = useState<string>("");
    const [procCompany, setProcCompany] = useState<any[]>([]);
    const [description, setDescription] = useState<string>("");
    const [tmCode, setTmCode] = useState<string>("");
    const [requesterId, setRequesterId] = useState<number>(-1);
    const [edmsUserList, setEdmsUserList] = useState<any[]>([]);

    const [replyList, setReplyList] = useState<any[]>([]);
    const [commentList, setCommentList] = useState<any[]>([]);
    const [fileList, setFileList] = useState<any[]>([]);
    const [reviewFileList, setReviewFileList] = useState<any[]>([]);
    const [selectedType, setSelectedType] = useState<number>(-1);
    const [TrType, setTrType] = useState<number>(0);

    useEffect(() => {
        if (path) {
            setIsLoading(true);
            dispatch(GetTmCodeList());
            dispatch(GetOriginalTm(WpIdx));
            dispatch(GetWorkDocuList([WpIdx]));
            dispatch(GetTmDetailList(WpIdx));
            dispatch(WorkProcDetail(WpIdx, "TM"));
            dispatch(GetOriginalTmCode(WpIdx));
            dispatch(GetReferenceTmUser(WpIdx));
            dispatch(ChangeNavTitle("EDMS - 문서관리 - TR 상세"));
            dispatch(GetEdmsAddress());
            dispatch(GetNativeFileList());
            setWpIdx(wp_idx);
            setDrnList([]);
            setDrnListKeys([]);
            setFiltered(undefined);
        }
    }, [path]);

    useEffect(() => {
        if (tmSelector.tm_upload_version_data != undefined) {
            dispatch(GetWorkDocuList([WpIdx]));
            dispatch(GetTmDetailList(WpIdx));
        }
    }, [tmSelector.tm_upload_version_data]);

    useEffect(() => {
        if (tmSelector.tm_code_list && tmSelector.tm_code_list.length != 0) {
            let _tm_user_id_list: any[] = [];

            for (let list of tmSelector.tm_code_list) {
                _tm_user_id_list.push(list.tm_user_id);
            }

            if (_tm_user_id_list.indexOf(userSelector.edms_user_id) != -1) {
                setIsTmManager(true);
            }
        }
    }, [tmSelector.tm_code_list]);

    useEffect(() => {
        if (pjSelector.edms_user_list && edmsUserList && edmsUserList.length == 0) {
            setEdmsUserList(pjSelector.edms_user_list);
        }
    }, [pjSelector.edms_user_list]);

    useEffect(() => {
        if (workSelector.work_proc_detail) {
            setProcDetail(workSelector.work_proc_detail);
            if (workSelector.work_company_id_list != undefined) {
                setProcCompany(workSelector.work_company_id_list);
            }
        }
    }, [workSelector.work_proc_detail]);

    useEffect(() => {
        if (
            procDetail.wp_date != undefined &&
            procDetail.due_date != undefined &&
            procDetail.create_tm != undefined &&
            procDetail.requester_id != undefined
        ) {
            setWpIdx(procDetail.wp_idx);
            setWpDate(procDetail.wp_date.substring(0, 10));
            setDueDate(procDetail.due_date.substring(0, 10));
            setCreateTm(procDetail.create_tm.substring(0, 10));
            setRequesterId(procDetail.requester_id);
        }
    }, [procDetail]);

    useEffect(() => {
        if (workSelector.tm_proc_detail != undefined) {
            setIsSendCC(workSelector.tm_proc_detail.is_send_cc);
            setIsReferConfirm(workSelector.tm_proc_detail.is_cc_confirm);
            setAttachFiles(workSelector.tm_proc_detail.attach_files);
            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        }
    }, [workSelector.tm_proc_detail]);

    useEffect(() => {
        if (tmSelector.reference_tm_user) {
            setIsTmUser(tmSelector.reference_tm_user);
        }
    }, [tmSelector.reference_tm_user]);

    useEffect(() => {
        if (workSelector.work_assign_detail) {
            setAssignDate(moment(workSelector.work_assign_detail.assign_date).format("YYYY-MM-DD"));
        }
    }, [workSelector.work_assign_detail]);

    useEffect(() => {
        if (
            workSelector.work_docu_list &&
            workSelector.work_docu_list.length > 0 &&
            workSelector.tm_proc_detail
        ) {
            let docus = [];
            let _docu_no_list = [];
            for (var work of workSelector.work_docu_list) {
                let docu = {};
                Object.assign(docu, {
                    docu_code: work.docu_code,
                    docu_subject: work.docu_subject,
                    file_name: work.file_name,
                    create_by: work.create_by,
                    stage_code: work.stage_code,
                    username: work.user_name,
                    fversion: work.last_fversion,
                    docu_no: work.docu_no,
                    docu_no2: work.docu_no,
                    detail: "",
                });
                // if (isTmManager && workSelector.tm_proc_detail.is_sender) {
                //     Object.assign(docu, {
                //         fileUpload: "",
                //     });
                // }
                docus.push(docu);
                _docu_no_list.push(work.docu_no);
            }
            setDocuDrn("");
            setDocuList([...docus]);
            setDocuNoList(_docu_no_list);
            setDocuListKeys([...Object.keys(docus[0])]);
        } else {
            setDocuList([]);
            setDocuListKeys([]);
        }
    }, [workSelector.work_docu_list, workSelector.tm_proc_detail]);

    useEffect(() => {
        if (
            docuNoList &&
            docuNoList.length != 0 &&
            fileSelector.native_file_list &&
            fileSelector.native_file_list.length != 0
        ) {
            let tmp_list = fileSelector.native_file_list;
            let filteredDataList: any[] = [];
            let _projtype: any[] = [];
            let _cate: any[] = [];
            let _docu: any[] = [];

            for (let list of tmp_list) {
                let filteredData = docuNoList.filter(raw => raw == list.docu_no);
                if (filteredData && filteredData.length != 0) filteredDataList.push(list);
            }

            if (filteredDataList.length != 0) {
                for (let list of filteredDataList) {
                    _projtype.push(list.project_no);
                    _cate.push(list.cate_no);
                    _docu.push(list.docu_no);
                }
            }
            let temp = new Set(_cate);
            _cate = [...temp];

            setCateNoList(_cate);
            setDocNoList(_docu);
            setProjectNoList(_projtype);

            dispatch(GetCategoryList(_cate));
        }
    }, [docuNoList]);

    useEffect(() => {
        if (cateSelector.cate_list != undefined) {
            let _dcl: any[] = [];
            let project = { visible: true, no: projectNoList };
            let discipline = { visible: true, no: _dcl };
            let cate = { visible: true, no: cateNoList };
            let docu = { visible: true, no: docNoList };

            for (let list of cateSelector.cate_list) {
                _dcl.push(list.discipline_id);
            }

            setFiltered({ project, discipline, cate, docu });
        }
    }, [cateSelector.cate_list]);

    useEffect(() => {
        if (
            workSelector.work_proc_data &&
            Object.keys(workSelector.work_proc_data) &&
            Object.keys(workSelector.work_proc_data).length > 0
        ) {
            setProcDetail(workSelector.work_proc_data);
            // setTimeout(() => {
            //     setIsLoading(false);
            // }, 1000);
        }
    }, [workSelector.work_proc_data]);

    useEffect(() => {
        if (tmSelector.original_tm_code != undefined && tmSelector.original_tm_code)
            setTmCode(tmSelector.original_tm_code);
    }, [tmSelector.original_tm_code]);

    useEffect(() => {
        if (
            tmSelector.drn_history &&
            tmSelector.drn_history.length != 0 &&
            tmSelector.drn_history != undefined
        ) {
            let _list: any[] = [];
            let _info: any[] = [];
            let _color: any[] = [];
            let _reply_list: any[] = [];
            let _comment_list: any[] = [];
            let _review_file_list: any[] = [];
            let count = 1;

            for (let review of tmSelector.drn_history) {
                for (let file of tmSelector.drn_review_file) {
                    if (file.wp_idx == review.wp_idx) {
                        _review_file_list.push({
                            idx: count,
                            file_name: file.file_name,
                            file_path: file.file_path,
                        });
                    }
                }

                _list.push({
                    no: count++,
                    docu_code: docuDrn,
                    description: description,
                    rev: review.revision,
                    code: "Code" + review.code,
                    page_sheet_no: review.page_sheet_no,
                    review_comment: "",
                    create_by: review.create_by,
                    review_date: moment(review.review_date).format("YYYY-MM-DD"),
                    reply: "",
                    downLoadBtn: "",
                });

                _comment_list.push(review.contents);
                _reply_list.push(review.reply);
                _info.push({
                    file_no: review.file_no,
                });

                // Tm 담당자
                // Code 3 : 노랑
                // Code 4 : 빨강
                // Code 1, 2 : 흰색
                if (userSelector.edms_user_id == 1) {
                    if (review.code == 3) {
                        _color.push({ backgroundColor: "#feffc7" });
                    } else if (review.code == 4) {
                        _color.push({ backgroundColor: "#ffddd9" });
                    } else {
                        _color.push({ backgroundColor: "#fff" });
                    }
                    // DRN 결재자
                    // 본인 리뷰 : 연두
                } else {
                    if (review.reviewer_id == userSelector.edms_user_id) {
                        _color.push({ backgroundColor: "#e8fff1" });
                    } else {
                        _color.push({ backgroundColor: "#fff" });
                    }
                }
            }

            setDrnInfo(_info);
            setDrnList([..._list]);
            setDrnColorList(_color);

            setReplyList(_reply_list);
            setCommentList(_comment_list);
            setReviewFileList(_review_file_list);
            setFileList(tmSelector.drn_review_file);
            setDrnListKeys([...Object.keys(_list[0])]);
        } else {
            setDrnList([]);
            setDrnListKeys([]);
        }
    }, [tmSelector.drn_history]);

    useEffect(() => {
        if (
            (wpType != "" && checked.length != 0 && isTmManager == true) ||
            (wpType != "" && checked.length != 0 && isDocuManagerList.length > 0)
        ) {
            setState("DRN");
        } else if (
            wpType != "" &&
            checked.length != 0 &&
            isTmManager == false &&
            isDocuManagerList.length == 0
        ) {
            ModalInfo("TM 담당자 혹은 문서 담당자가 아닙니다.");
            setWpType("");
            setChecked([]);
        }
    }, [isDocuManagerList]);

    useEffect(() => {
        if (workSelector.docu_manager_list && workSelector.docu_manager_list.length > 0) {
            setIsDcouManagerList(workSelector.docu_manager_list);
        }
    }, [workSelector.docu_manager_list]);

    useEffect(() => {
        if (tmSelector.is_confirm_refer == true && isLoading) {
            setIsLoading(false);
            ModalInfo("참조승인 완료");
        } else if (tmSelector.is_confirm_refer == false && isLoading) {
            setIsLoading(false);
            ModalInfo("참조승인 반려");
        }
    }, [tmSelector.is_confirm_refer]);

    useEffect(() => {
        if (workSelector.request_tm_referer == true) {
            setIsLoading(true);
            setTimeout(async () => {
                ModalInfo("검토요청 완료");
                setIsLoading(false);
                await dispatch(GetOriginalTm(WpIdx));
            }, 1000);
        }
    }, [workSelector.request_tm_referer]);

    const onCloseModal = () => {
        setChecked([]);
        setWpType("");
        setFileUploadModalVisible(false);
        setDrnPublishModalVisible(false);
        setTmPdfDownLoadVisible(false);
    };

    const get_file_type = (file_type: string) => {
        switch (file_type) {
            case "001":
                return "도면";
            case "002":
                return "PDF";
            case "003":
                return "문서";
            default:
                return "파일없음";
        }
    };

    const onClickPdfViewer = (data: any) => {
        // if (get_file_type(data.file_type) === "도면" || data.file_type === "도면") {
        //     // alert("모델/도면 뷰어는 현재 준비 중 입니다.\n불편을 드려 죄송합니다.");
        //     open3DModelFile(data.repo_path, data.file_no, userSelector.edms_user_id);
        // } else
        windowOpenByPopup(
            `http://${window.location.host}/edms/pdfviewer/${data.file_no}?page_type=0`
        );
    };

    const onClickMove = async (idx: number, type: number) => {
        if (type == 0) {
            // drn 히스토리
            setDocuDrn(`[${docuList[idx].docu_code}]`);
            setDescription(docuList[idx].docu_subject);
            await dispatch(GetDrnList(docuList[idx].docu_no, wpIdx));
        } else if (type == 1) {
            // 상세보기
            const data = workSelector.work_docu_list[idx];
            onClickPdfViewer(data);
        } else if (type == 2) {
            // 생성
            await dispatch(GetDocuManager(workSelector.work_docu_list[idx].docu_no));
            setWpType("TM");
            setChecked([docuList[idx].docu_no]);
            setDrnPublishModalVisible(true);
        } else if (type == 3) {
            // 버전업로드
            setDocuNo(workSelector.work_docu_list[idx].docu_no);
            await dispatch(TmVersionFileList(WpIdx, workSelector.work_docu_list[idx].docu_no));
            setTimeout(() => {
                setFileUploadModalVisible(true);
            }, 1000);
        } else if (type == 4) {
            if (drnInfo[idx].file_no == null) {
                ModalInfo("첨부된 파일이 없습니다.");
            } else {
                ModalInfo("File");
            }
        }
    };

    const createCustomEl = (idx: number, dataIdx?: number) => {
        if (idx == 7) {
            if (dataIdx == undefined) return true;
            return (
                <S.TableTd>
                    <S.TableButtonDiv>
                        <S.TableButton onClick={() => onClickMove(dataIdx, 0)}>
                            리스트업
                        </S.TableButton>
                    </S.TableButtonDiv>
                </S.TableTd>
            );
        } else if (idx == 8) {
            if (dataIdx == undefined) return true;
            return (
                <S.TableTd>
                    <S.TableButtonDiv>
                        <S.TableButton onClick={() => onClickMove(dataIdx, 1)}>
                            상세보기
                        </S.TableButton>
                    </S.TableButtonDiv>
                </S.TableTd>
            );
        } else if (idx == 9) {
            if (dataIdx == undefined) return true;
            return (
                <S.TableTd>
                    <S.TableButtonDiv>
                        <S.TableButton onClick={() => onClickMove(dataIdx, 2)}>생성</S.TableButton>
                    </S.TableButtonDiv>
                </S.TableTd>
            );
        }
        // else if (idx == 10) {
        //     if (dataIdx == undefined) return true;
        //     return (
        //         <S.TableTd>
        //             <S.TableButtonDiv>
        //                 <S.TableButton onClick={() => onClickMove(dataIdx, 3)}>
        //                     버전업로드
        //                 </S.TableButton>
        //             </S.TableButtonDiv>
        //         </S.TableTd>
        //     );
        // }
        return null;
    };

    const createCustomElDrn = (idx: number, dataIdx?: number) => {
        if (idx == 6) {
            if (dataIdx == undefined) return true;
            return (
                <S.TableTd>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: commentList[dataIdx],
                        }}
                    />
                </S.TableTd>
            );
        } else if (idx == 9) {
            if (dataIdx == undefined) return true;
            return (
                <S.TableTd>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: replyList[dataIdx],
                        }}
                    />
                </S.TableTd>
            );
        } else if (idx == 10) {
            if (dataIdx == undefined) return true;

            let file_info: any[] = [];
            for (let file of reviewFileList) {
                if (DrnList[dataIdx] != undefined && DrnList[dataIdx].no == file.idx)
                    file_info.push(file);
            }
            if (file_info.length != 0) {
                return (
                    <S.TableTd>
                        {file_info.map(raw => {
                            if (raw.file_path) {
                                return (
                                    <div>
                                        <a
                                            style={{ color: "blue" }}
                                            target="_blank"
                                            href={raw.file_path}
                                        >
                                            {raw.file_name}
                                        </a>
                                    </div>
                                );
                            }
                        })}
                    </S.TableTd>
                );
            } else {
                return <S.TableTd></S.TableTd>;
            }
        }
        return null;
    };

    const onReplyWorkProc = () => {
        setChecked(docuNoList);
        setState("TM");
        setTmModalVisible(true);
    };

    const onClickReSend = () => {
        setChecked(docuNoList);
        setState("TM");
        setTmModalVisible(true);
        setIsReSend(true);
    };

    const onCloseTmModal = async () => {
        setState("TM");
        setTmModalVisible(false);
        await dispatch(GetOriginalTm(WpIdx));
    };

    const handleChange = (e: any) => {
        setSelectedType(-1);

        let buttonNo = e.target.value;

        // TR 정보
        if (buttonNo == 0) onClickTrModify(1);
        // 리뷰 업로드
        if (buttonNo == 1) onClickReviewUpload();
        // 리뷰 다운로드
        if (buttonNo == 2) onClickReviewDownload();
        // 공문 다운로드
        if (buttonNo == 3) onClickDocuDownload();
        // 공문 미리보기
        if (buttonNo == 4) onClickDocuDownload(true);
        // 일괄다운로드
        if (buttonNo == 5) onClickAllFileDownload();
    };

    const onClickAllCommentView = (is_prev: boolean) => {
        window.open(`/edms/tm/commentview/${wp_idx}/${is_prev ? 2 : 1}`, "_blank");
    };

    const onClickReviewUpload = () => {
        setReviewUpModalVisible(true);
    };

    const onCloseReviewModal = () => {
        setReviewUpModalVisible(false);
    };

    const onClickReviewDownload = async () => {
        setIsLoading(true);
        await getExcelFileByType("review_comment", {
            wp_idx: wpIdx,
            edms_access_token: window.localStorage.getItem("edms_access_token"),
        });
        setTimeout(() => {
            setIsLoading(false);
        }, 500);
    };

    const onClickDocuDownload = async (is_preview?: boolean) => {
        let user = edmsUserList.find(raw => raw.user_id == requesterId);
        if (user != undefined && user.company_id == 2) {
            await dispatch(GetShinhanTmHtmlData(wp_idx));
            setTmPdfDownloadType("SHIN");
        } else {
            await dispatch(GetHencTmHtmlData(wp_idx));
            setTmPdfDownloadType("HENC");
        }
        setIsTmPdfPreview(is_preview ? true : false);
        setTimeout(() => {
            setTmPdfDownLoadVisible(true);
        }, 1000);
    };

    const onClickConfirmRefer = () => {
        setChecked(docuNoList);
        setState("TM");
        setIsApprovalModal(true);
    };

    const onConfirmComplete = async (comment: string, check: string) => {
        setIsLoading(true);
        await dispatch(TmConfirmRefer(wpIdx, check === "approve", comment));
        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
        setIsApprovalModal(false);
        await dispatch(GetOriginalTm(WpIdx));
    };

    const onClickAttachFiles = () => {
        if (attachFiles.length > 0) {
            if (wp_idx != attachFiles[0].wp_idx) return;
            setIsTmAttachFileModal(true);
        } else {
            ModalInfo("첨부된 파일이 없습니다.");
        }
    };

    const onClickRequestTmReferer = async () => {
        let res = confirm("참조처에 검토를 요청하시겠습니까?");
        if (res) {
            await dispatch(RequestTmReferer(wpIdx));
        }
    };

    const onClickConfirmReview = async () => {
        let res = confirm("리뷰 작성을 완료하시겠습니까?");
        if (res) {
            setIsLoading(true);
            await dispatch(ConfirmCompleteReview(wpIdx));
            setTimeout(async () => {
                ModalInfo("리뷰 완료");
                setIsLoading(false);
                await dispatch(GetOriginalTm(WpIdx));
            }, 1500);
        }
    };

    const onClickTrModify = (type: number) => {
        setTrType(type);
        dispatch(GetAllTrWorkList(WpIdx));
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setTrModifyModalVisible(true);
        }, 2000);
    };

    const onClickCloseTrModify = () => {
        setTrModifyModalVisible(false);
    };

    const onChangeTmActionSelect = (value: string) => {
        if (value === "reply") {
            onReplyWorkProc();
        } else if (value === "re_send") {
            onClickReSend();
        } else if (value === "cc_request") {
            onClickRequestTmReferer();
        } else if (value === "refer_confirm") {
            onClickConfirmRefer();
        } else if (value === "review_confirm") {
            onClickConfirmReview();
        } else if (value === "tr_modify") {
            onClickTrModify(0);
        }
    };

    const onClickAllFileDownload = async () => {
        let edms_access_token = window.localStorage.getItem("edms_access_token");
        if (WpIdx != undefined && edms_access_token != null) {
            await generateTrZipDownloadURI({ wp_idx: WpIdx, edms_access_token: edms_access_token });
        }
    };

    const onClickBackBtn = () => {
        if (searchParam.has("us")) {
            pushHistory("/edms/workproc/tm?" + searchParam.toString());
        } else {
            back();
        }
    };

    let is_tm_reply = false;
    let is_tm_re_send = false;
    let is_cc_request = false;
    let is_review_confirm = false;
    let is_tr_modify = false;
    if (workSelector.tm_proc_detail) {
        let detail = workSelector.tm_proc_detail;
        if (isTmManager) {
            if (detail.is_response) is_tm_reply = true;
            if (detail.is_cc_request) is_cc_request = true;
            if (detail.is_re_send) is_tm_re_send = true;
            if (detail.is_tr_modify) is_tr_modify = true;
        }
        if (detail.is_review_confirm) is_review_confirm = true;
    }

    return (
        <>
            <LoadingIndicatorComponent open={isLoading} style={{ zIndex: 100 }} />
            <EdmsProjectBase>
                <EdmsTmAttachFileModal
                    onClose={() => setIsTmAttachFileModal(false)}
                    visible={isTmAttachFileModal}
                    attachFiles={attachFiles}
                />
                <EdmsTmApprovalModal
                    onClose={() => setIsApprovalModal(false)}
                    visible={isApprovalModal}
                    onTmComplete={onConfirmComplete}
                />
                <ReviewUploadModalComp
                    visible={reviewUpModalVisible}
                    onClose={onCloseReviewModal}
                    wp_idx={WpIdx}
                />
                <EdmsDocuPublishModal
                    visible={drnPublishModalVisible}
                    onClose={onCloseModal}
                    checkList={checked}
                    state={state}
                    wpType={wpType}
                    tmIdx={WpIdx}
                    title={
                        tmCode != undefined && procDetail.subject != undefined
                            ? `${tmCode}_${procDetail.subject}`
                            : undefined
                    }
                />
                <EdmsReplyTmModal
                    visible={tmModalVisible}
                    onClose={onCloseTmModal}
                    checkList={checked}
                    state={state}
                    originalTm={parseInt(wpIdx)}
                    fileList={fileList}
                    wpIdx={WpIdx}
                    docuNoList={docuNoList}
                    isReSend={isReSend}
                />
                <EdmsTmFileVersionModal
                    visible={fileUploadModalVisible}
                    onClose={onCloseModal}
                    file={tmSelector.tm_version_file_list}
                    wpIdx={parseInt(wpIdx)}
                    docuNo={docuNo}
                />
                <EdmsTmPdfDownLoadComp
                    visible={tmPdfDownLoadVisible}
                    onClose={onCloseModal}
                    htmlData={tmSelector.tm_html_data}
                    htmlDataResult={tmSelector.tm_html_data_result}
                    isPreview={isTmPdfPreview}
                    isType={tmPdfDownloadType}
                />
                <EdmsTmModifyModal
                    visible={trModifyModalVisible}
                    onClose={onClickCloseTrModify}
                    wp_idx={WpIdx}
                    type={TrType}
                />

                <S.Contents>
                    <S.DetailContentWrap>
                        <S.TopDiv>
                            <S.TmDetailTitle>
                                {existBack && (
                                    <S.BackBtnWrap onClick={onClickBackBtn}>
                                        <ArrowBackIcon />
                                    </S.BackBtnWrap>
                                )}
                                {tmCode} / {procDetail.subject}
                            </S.TmDetailTitle>
                            <S.DetailBtnWrap>
                                <S.TmActionSelect
                                    disableUnderline
                                    defaultValue={0}
                                    value={0}
                                    onChange={(e: any) => onChangeTmActionSelect(e.target.value)}
                                    disabled={
                                        is_cc_request == false &&
                                        is_tm_reply == false &&
                                        isReferConfirm == false &&
                                        is_tm_re_send == false &&
                                        is_review_confirm == false &&
                                        is_tr_modify == false
                                    }
                                    style={
                                        is_cc_request == false &&
                                        is_tm_reply == false &&
                                        isReferConfirm == false &&
                                        is_tm_re_send == false &&
                                        is_review_confirm == false &&
                                        is_tr_modify == false
                                            ? { backgroundColor: "gray" }
                                            : {}
                                    }
                                >
                                    <S.TmActionSelectItem value={0}>선택</S.TmActionSelectItem>
                                    {is_cc_request && (
                                        <S.TmActionSelectItem value="cc_request">
                                            검토요청
                                        </S.TmActionSelectItem>
                                    )}
                                    {is_tm_reply && (
                                        <S.TmActionSelectItem value="reply">
                                            회신하기
                                        </S.TmActionSelectItem>
                                    )}
                                    {isReferConfirm && (
                                        <S.TmActionSelectItem value="refer_confirm">
                                            승인하기
                                        </S.TmActionSelectItem>
                                    )}
                                    {is_tm_re_send && (
                                        <S.TmActionSelectItem value="re_send">
                                            재회신
                                        </S.TmActionSelectItem>
                                    )}
                                    {is_review_confirm && (
                                        <S.TmActionSelectItem value="review_confirm">
                                            리뷰 완료
                                        </S.TmActionSelectItem>
                                    )}
                                    {is_tr_modify && (
                                        <S.TmActionSelectItem value="tr_modify">
                                            TR 수정
                                        </S.TmActionSelectItem>
                                    )}
                                </S.TmActionSelect>
                            </S.DetailBtnWrap>
                        </S.TopDiv>
                        <S.MidDiv>
                            <S.TmDetailInfoContainer>
                                <S.TmDetailInfoHeader>TR Information</S.TmDetailInfoHeader>
                                <S.TmDetailInfoInnerDiv>
                                    <S.TmDetailInfo>
                                        <S.TmDetailInfoInner>
                                            <S.TmDetailInfoInnerTitle>
                                                배 포 타 입
                                            </S.TmDetailInfoInnerTitle>
                                            <S.TmDetailInfoContent>
                                                {procDetail.wp_type === null
                                                    ? "-"
                                                    : procDetail.wp_type}
                                            </S.TmDetailInfoContent>
                                        </S.TmDetailInfoInner>
                                        <S.TmDetailInfoInner>
                                            <S.TmDetailInfoInnerTitle>
                                                요 청 자
                                            </S.TmDetailInfoInnerTitle>
                                            <S.TmDetailInfoContent>
                                                {procDetail.create_by === null
                                                    ? "-"
                                                    : procDetail.create_by}
                                            </S.TmDetailInfoContent>
                                        </S.TmDetailInfoInner>
                                        <S.TmDetailInfoInner>
                                            <S.TmDetailInfoInnerTitle>
                                                발 신 처
                                            </S.TmDetailInfoInnerTitle>
                                            <S.TmDetailInfoContent>
                                                {procCompany[1] == undefined
                                                    ? "-"
                                                    : procCompany[1].company_name}
                                            </S.TmDetailInfoContent>
                                        </S.TmDetailInfoInner>
                                        <S.TmDetailInfoInner>
                                            <S.TmDetailInfoInnerTitle>
                                                접 수 처
                                            </S.TmDetailInfoInnerTitle>
                                            <S.TmDetailInfoContent>
                                                {procCompany[0] == undefined
                                                    ? "-"
                                                    : procCompany[0].company_name}
                                            </S.TmDetailInfoContent>
                                        </S.TmDetailInfoInner>
                                        <S.TmDetailInfoInner>
                                            <S.TmDetailInfoInnerTitle>
                                                작 성 일
                                            </S.TmDetailInfoInnerTitle>
                                            <S.TmDetailInfoContent>
                                                {createTm === "" ? "-" : createTm}
                                            </S.TmDetailInfoContent>
                                        </S.TmDetailInfoInner>
                                        <S.TmDetailInfoInner>
                                            <S.TmDetailInfoInnerTitle>
                                                승 인 일
                                            </S.TmDetailInfoInnerTitle>
                                            <S.TmDetailInfoContent>
                                                {assignDate === "Invalid date" ? "-" : assignDate}
                                            </S.TmDetailInfoContent>
                                        </S.TmDetailInfoInner>
                                        <S.TmDetailInfoInner>
                                            <S.TmDetailInfoInnerTitle>
                                                종 료 일
                                            </S.TmDetailInfoInnerTitle>
                                            <S.TmDetailInfoContent>
                                                {dueDate === "" ? "-" : dueDate}
                                            </S.TmDetailInfoContent>
                                        </S.TmDetailInfoInner>
                                        <S.TmDetailInfoInner>
                                            <S.TmDetailInfoInnerTitle>
                                                첨 부 파 일
                                            </S.TmDetailInfoInnerTitle>
                                            <S.TmDetailInfoContent>
                                                <S.TmDetailInfoABtn onClick={onClickAttachFiles}>
                                                    파일상세보기
                                                </S.TmDetailInfoABtn>
                                            </S.TmDetailInfoContent>
                                        </S.TmDetailInfoInner>
                                        <S.TmDetailInfoInner style={{ width: "100%" }}>
                                            <S.TmDetailInfoInnerTitle
                                                style={{ width: "fit-content" }}
                                            >
                                                상 세 내 용
                                            </S.TmDetailInfoInnerTitle>
                                            <S.TmDetailInfoContent
                                                dangerouslySetInnerHTML={{
                                                    __html: procDetail.explan,
                                                }}
                                            />
                                        </S.TmDetailInfoInner>
                                    </S.TmDetailInfo>
                                    <S.DownBtnDiv>
                                        <S.SelectBox
                                            value={selectedType}
                                            onChange={handleChange}
                                            disableUnderline={true}
                                        >
                                            <S.Items value={-1}>선택</S.Items>
                                            {CONTEXT_MENU_ITEMS.map((raw, idx) => {
                                                return (
                                                    <S.Items value={idx} key={"context_menu" + idx}>
                                                        {raw}
                                                    </S.Items>
                                                );
                                            })}
                                        </S.SelectBox>
                                    </S.DownBtnDiv>
                                </S.TmDetailInfoInnerDiv>
                            </S.TmDetailInfoContainer>
                            <S.TmDocuContainer>
                                <S.TmDocuHeader>TR Documents</S.TmDocuHeader>
                                <S.DocumentListContainer>
                                    <S.TmDocuList>
                                        <GridViewComponent
                                            fullData={docuList}
                                            titles={tableHeader}
                                            keys={docuListKeys}
                                            values={docuList}
                                            keysWidth={tableHeadSize}
                                            datatype={tableHeadType}
                                            // gridStyle={back}
                                            getCustomEl={createCustomEl}
                                            rowClass="background-color-parent color-light-black"
                                            headerClass="background-color-dark-green align-center"
                                            noRecordsMsg="표시할 문서가 없습니다."
                                        />
                                    </S.TmDocuList>
                                </S.DocumentListContainer>
                            </S.TmDocuContainer>
                        </S.MidDiv>
                        <S.BtmDiv>
                            <S.TmReviewContainer>
                                <S.TmDocuHeaderDiv>
                                    <S.TmDocuHeader>
                                        EDMS Documents 문서회신 {docuDrn}
                                    </S.TmDocuHeader>
                                    <S.AllCommentButton onClick={() => onClickAllCommentView(true)}>
                                        최근 코멘트 보기
                                    </S.AllCommentButton>
                                    <S.AllCommentButton
                                        onClick={() => onClickAllCommentView(false)}
                                    >
                                        전체 코멘트 보기
                                    </S.AllCommentButton>
                                </S.TmDocuHeaderDiv>
                                <S.TmReviewList>
                                    <GridViewComponent
                                        fullData={DrnList}
                                        titles={tableHeader1}
                                        keys={DrnListKeys}
                                        values={DrnList}
                                        keysWidth={tableHeadSize1}
                                        datatype={tableHeadType1}
                                        rowColors={DrnColorList}
                                        getCustomEl={createCustomElDrn}
                                        headerClass="background-color-dark-green align-center"
                                        noRecordsMsg="표시할 리뷰가 없습니다."
                                    />
                                </S.TmReviewList>
                            </S.TmReviewContainer>
                        </S.BtmDiv>
                    </S.DetailContentWrap>
                </S.Contents>
            </EdmsProjectBase>
        </>
    );
};

export default EdmsTmDetailPage;
