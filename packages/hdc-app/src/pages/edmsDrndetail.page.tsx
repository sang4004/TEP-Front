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

import { GridViewComponent, LoadingIndicatorComponent, ModalInfo } from "components";
import { useLocations } from "hooks";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // redux
import { useParams } from "react-router-dom";
import { reducerState } from "../common";
import {
    ChangeNavTitle,
    GetDrnCommentList,
    GetEdmsAddress,
    GetOriginalTm,
    GetWorkDocuList,
    GetWorkProc,
    TmVersionFileList,
    UpdateDrnApproval,
    WorkProcDetail,
    GetNativeFileList,
} from "../common/action";
import { digitalTwinDomain } from "../common/network";
import { getMoment, windowOpenByPopup, open3DModelFile } from "../common/utils";
import { EdmsDrnReview, EdmsProjectBase, EdmsTmFileVersionModal } from "../components";
import * as S from "../styled/edmsDrndetail.styled";
import * as T from "../styled/edmsProject.styled";

const moment = getMoment();

const tableHeadSize = [0.7, 1.4, 0.3, 0.3, 0.3, 0.4];
const tableHeadType = [1, 0, 1, 1, 1, 0];
const tableHeader = ["문서코드", "문서제목", "작성자", "문서단계", "담당자", "문서"];

const tableHeadSize1 = [0.5, 0.3, 0.3, 0.3, 1.5, 0.5, 0.5, 0.5, 0.5];
const tableHeadType1 = [1, 1, 1, 1, 0, 1, 0, 0, 1];
const tableHeader1 = [
    "회사",
    "직급",
    "code",
    "작성자",
    "리뷰",
    "리뷰 날짜",
    "답글",
    "첨부파일",
    "Page/Sheet",
];

const EdmsDrnDetailPage = (props: any) => {
    const dispatch = useDispatch();
    const tmSelector = useSelector((state: reducerState) => state.tm);
    const drnSelector = useSelector((state: reducerState) => state.drn);
    const fileSelector = useSelector((state: reducerState) => state.files);
    const workSelector = useSelector((state: reducerState) => state.work);
    const userSelector = useSelector((state: reducerState) => state.user);
    const pjSelector = useSelector((state: reducerState) => state.project);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [visibleDrnReview, setVisibleDrnReview] = useState<boolean>(false);
    const [fileUploadModalVisible, setFileUploadModalVisibled] = useState<boolean>(false);

    const [docuNo, setDocuNo] = useState<number>(-1);
    const [docuList, setDocuList] = useState<any[]>([]);
    const [docuListKeys, setDocuListKeys] = useState<any[]>([]);
    const [commentList, setCommentList] = useState<any[]>([]);
    const [commentListKeys, setCommentListKeys] = useState<any[]>([]);
    const [nowComment, setNowComment] = useState<any>();
    const [drnProcDetail, setDrnProcDetail] = useState<any>({});
    const [tmProcDetail, setTmProcDetail] = useState<any>({});

    const { path, pushHistory } = useLocations();
    const { wp_idx } = useParams<{ wp_idx: string }>();
    const WpIdx = parseInt(wp_idx);
    const [isReply, setIsReply] = useState<boolean>(false);
    const [companyId, setCompanyId] = useState<number>(0);
    const [originalTmWpIdx, setOriginalTmWpIdx] = useState<number>(-1);

    useEffect(() => {
        if (path) {
            dispatch(WorkProcDetail(WpIdx, "DRN"));
            dispatch(GetWorkDocuList([wp_idx]));
            dispatch(GetDrnCommentList(WpIdx));
            dispatch(ChangeNavTitle("EDMS - 문서관리 - 문서회신 상세"));
            dispatch(GetEdmsAddress());
            if (
                fileSelector.native_file_list == undefined ||
                fileSelector.native_file_list.length == 0
            )
                dispatch(GetNativeFileList());
            setCommentList([]);
            setDrnProcDetail({});
        }
    }, [path]);

    useEffect(() => {
        if (
            tmSelector.tm_upload_version_data != undefined &&
            tmProcDetail != {} &&
            tmProcDetail != undefined
        ) {
            dispatch(
                TmVersionFileList(tmProcDetail.wp_idx, workSelector.work_docu_list[0].docu_no)
            );
        }
    }, [tmSelector.tm_upload_version_data]);

    useEffect(() => {
        if (workSelector.work_docu_list && workSelector.work_docu_list.length > 0) {
            let docus = [];

            for (var work of workSelector.work_docu_list) {
                docus.push({
                    docu_code: work.docu_code,
                    docu_subject: work.docu_subject,
                    create_by: work.create_by,
                    stage_code: work.stage_code,
                    username: work.user_name,
                    button: null,
                });
            }

            setDocuList([...docus]);
            setDocuListKeys([...Object.keys(docus[0])]);
        } else if (workSelector.work_docu_list && workSelector.work_docu_list.length == 0) {
            setDocuList([]);
        }
    }, [workSelector.work_docu_list]);

    useEffect(() => {
        if (drnSelector.drn_comment_list && drnSelector.drn_comment_list.length > 0) {
            let _list = [];

            for (var comment of drnSelector.drn_comment_list) {
                _list.push({
                    company_name: comment.company_name,
                    position_name: comment.position_name,
                    code: comment.code,
                    create_by: comment.create_by,
                    contents: comment.contents,
                    review_date: moment(comment.review_date).format("YYYY-MM-DD"),
                    reply: comment.reply,
                    files: comment.file_data,
                    page_sheet_no: comment.page_sheet_no,
                });
            }

            setCommentList([..._list]);
            setCommentListKeys([...Object.keys(_list[0])]);
        } else if (drnSelector.drn_comment_list && drnSelector.drn_comment_list.length == 0) {
            setCommentList([]);
        }
    }, [drnSelector.drn_comment_list]);

    useEffect(() => {
        if (workSelector.work_proc_detail != [] && workSelector.work_proc_detail) {
            setDrnProcDetail(workSelector.work_proc_detail);
        }
    }, [workSelector.work_proc_detail]);

    useEffect(() => {
        if (drnSelector.create_drn_comment) {
            dispatch(GetDrnCommentList(WpIdx));
        }
    }, [drnSelector.create_drn_comment]);

    useEffect(() => {
        if (drnSelector.create_drn_reply) {
            dispatch(GetDrnCommentList(WpIdx));
            setIsLoading(true);
            setTimeout(() => {
                onCloseModal();
                setIsLoading(false);
                ModalInfo("답변 등록이 완료되었습니다.");
            }, 2000);
        }
    }, [drnSelector.create_drn_reply]);
    useEffect(() => {
        if (drnProcDetail.original_tm_id != undefined && drnProcDetail != {}) {
            setTmProcDetail({});
            dispatch(GetOriginalTm(drnProcDetail.original_tm_id));
        }
    }, [drnProcDetail]);

    useEffect(() => {
        if (workSelector.tm_proc_detail && workSelector.tm_proc_detail != undefined) {
            setTmProcDetail(workSelector.tm_proc_detail);
        }
    }, [workSelector.tm_proc_detail]);

    useEffect(() => {
        if (pjSelector.edms_user_list && pjSelector.edms_user_list.length > 0) {
            let user = pjSelector.edms_user_list.filter(
                (raw: any) => raw.user_id == userSelector.edms_user_id
            );
            setCompanyId(user[0].company_id);
        }
    }, [pjSelector.edms_user_list]);

    const createCustomEl = (idx: number, dataidx?: number) => {
        if (idx === 5) {
            if (dataidx == undefined) return true;
            return (
                <T.TableTd>
                    <T.TableButtonDiv>
                        <T.TableButton onClick={() => onClickMove(dataidx)}>상세보기</T.TableButton>
                    </T.TableButtonDiv>
                </T.TableTd>
            );
        }
    };

    const createCustomElComment = (idx: number, dataidx?: number) => {
        if (idx == 4 && commentList.length != 0) {
            if (dataidx == undefined) return true;
            if (commentList[dataidx].contents != "" && commentList[dataidx].contents != undefined) {
                return (
                    <T.TableTd>
                        <div dangerouslySetInnerHTML={{ __html: commentList[dataidx].contents }} />
                    </T.TableTd>
                );
            } else {
                return (
                    <T.TableTd>
                        <div />
                    </T.TableTd>
                );
            }
        }

        if (idx === 6 && commentList.length != 0 && drnSelector.drn_comment_list.length > 0) {
            if (dataidx == undefined) return true;
            let isReplyVal = drnSelector.drn_comment_list[dataidx].is_reply;
            let isCompanyVal = drnSelector.drn_comment_list[dataidx].company_id;
            return (
                <T.TableTd>
                    {isReplyVal != 1 && companyId != isCompanyVal && companyId != 0 ? (
                        <T.TableButtonDiv>
                            <T.TableButton
                                onClick={() =>
                                    openModal(drnSelector.drn_comment_list[dataidx], isReplyVal)
                                }
                            >
                                답글달기
                            </T.TableButton>
                        </T.TableButtonDiv>
                    ) : (
                        <div dangerouslySetInnerHTML={{ __html: commentList[dataidx].reply }} />
                    )}
                </T.TableTd>
            );
        }
        if (idx === 7 && commentList.length != 0) {
            if (dataidx == undefined) return true;
            if (commentList[dataidx].files.length > 0) {
                return (
                    <T.TableTd>
                        {commentList[dataidx].files.map((raw: any, idx: number) => {
                            return (
                                <T.TableDownloadDiv key={idx + raw[0]}>
                                    <a target="_blank" href={raw[1]}>
                                        {raw[0]}
                                    </a>
                                </T.TableDownloadDiv>
                            );
                        })}
                    </T.TableTd>
                );
            } else {
                return (
                    <T.TableTd>
                        <div />
                    </T.TableTd>
                );
            }
        }
    };

    const openModal = (comment?: any, is_reply?: number) => {
        if (is_reply != undefined) {
            setIsReply(true);
            setNowComment(comment);
            if (is_reply == 1) ModalInfo(`답글을 달 수 없습니다.`);
            else if (is_reply == 0) setVisibleDrnReview(true);
        } else {
            setVisibleDrnReview(true);
        }
    };

    const onCloseModal = () => {
        setVisibleDrnReview(false);
        setFileUploadModalVisibled(false);
    };

    const onClickMove = (idx: number) => {
        const data = fileSelector.native_file_list.find(
            (raw: any) => raw.docu_no == workSelector.work_docu_list[idx].docu_no
        );
        // if (get_file_type(data.file_type) === "도면" || data.file_type === "도면") {
        //     open3DModelFile(data.repo_path, data.file_no, userSelector.edms_user_id);
        // } else {
        onClickPdfViewer(data);
        // }
    };

    const onClickPdfViewer = (data: any) => {
        windowOpenByPopup(
            `http://${window.location.host}/edms/pdfviewer/${data.file_no}?page_type=0`
        );
    };

    const successApprovalReject = () => {
        setIsLoading(true);
        dispatch(UpdateDrnApproval(wp_idx, 2));
        dispatch(GetWorkProc(wp_idx));
        setTimeout(() => {
            setIsLoading(false);
            ModalInfo("반려 완료");
        }, 1000);
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
                return "파일이 없습니다.";
        }
    };

    const onClickMoveTm = (wp_idx: number) => {
        if (wp_idx != undefined) {
            pushHistory(`/edms/tm/detail/${wp_idx}`);
        } else {
            ModalInfo("해당 문서회신의 TR이 존재하지 않습니다.");
        }
    };

    const onTmFileVersionUpload = async () => {
        // 버전업로드
        setOriginalTmWpIdx(tmProcDetail.wp_idx);

        if (workSelector.work_docu_list.length > 0) {
            setDocuNo(workSelector.work_docu_list[0].docu_no);
            await dispatch(
                TmVersionFileList(tmProcDetail.wp_idx, workSelector.work_docu_list[0].docu_no)
            );
            setTimeout(() => {
                setFileUploadModalVisibled(true);
            }, 1000);
        } else {
            ModalInfo("대상문서를 찾을 수없습니다.");
        }
    };

    return (
        <>
            <EdmsDrnReview
                drnDetail={drnProcDetail}
                comment={nowComment}
                isReply={isReply}
                visible={visibleDrnReview}
                onClose={onCloseModal}
            />
            <EdmsTmFileVersionModal
                visible={fileUploadModalVisible}
                onClose={onCloseModal}
                file={tmSelector.tm_version_file_list}
                wpIdx={originalTmWpIdx}
                docuNo={docuNo}
            />
            <EdmsProjectBase>
                <LoadingIndicatorComponent open={isLoading} style={{ zIndex: 1301 }} />
                <S.TopDiv>
                    <S.DetailBtnWrap>문서회신 상세</S.DetailBtnWrap>
                    {tmProcDetail.is_review == true && (
                        <S.DetailBtn onClick={() => openModal()}>리뷰 작성</S.DetailBtn>
                    )}
                </S.TopDiv>
                <S.Contents>
                    <S.InfoContentWrap>
                        {/* <S.DrnDetailInfoContainer $boxType="bottom">
                            <S.DrnDetailInfoHeader>
                                <S.TitleText>DRN Information</S.TitleText>
                            </S.DrnDetailInfoHeader>
                            <S.DrnDetailInfo>
                                <S.DrnDetailInfoInner>
                                    <S.DrnDetailInfoInnerTitle>
                                        배 포 타 입
                                    </S.DrnDetailInfoInnerTitle>
                                    <S.DrnDetailInfoContent>
                                        {drnProcDetail.wp_type === null
                                            ? "-"
                                            : drnProcDetail.wp_type}
                                    </S.DrnDetailInfoContent>
                                </S.DrnDetailInfoInner>
                                <S.DrnDetailInfoInner>
                                    <S.DrnDetailInfoInnerTitle>작 성 일</S.DrnDetailInfoInnerTitle>
                                    <S.DrnDetailInfoContent>
                                        {drnProcDetail.create_tm === ""
                                            ? "-"
                                            : moment(drnProcDetail.create_tm).format("YYYY-MM-DD")}
                                    </S.DrnDetailInfoContent>
                                </S.DrnDetailInfoInner>
                                <S.DrnDetailInfoInner>
                                    <S.DrnDetailInfoInnerTitle>요 청 자</S.DrnDetailInfoInnerTitle>
                                    <S.DrnDetailInfoContent>
                                        {drnProcDetail.create_by === null
                                            ? "-"
                                            : drnProcDetail.create_by}
                                    </S.DrnDetailInfoContent>
                                </S.DrnDetailInfoInner>
                                <S.DrnDetailInfoInner>
                                    <S.DrnDetailInfoInnerTitle>
                                        문 서 제 목
                                    </S.DrnDetailInfoInnerTitle>
                                    <S.DrnDetailInfoContent>
                                        {drnProcDetail.subject === null
                                            ? "-"
                                            : drnProcDetail.subject}
                                    </S.DrnDetailInfoContent>
                                </S.DrnDetailInfoInner>
                                <S.DrnDetailInfoInner>
                                    <S.DrnDetailInfoInnerTitle>시 작 일</S.DrnDetailInfoInnerTitle>
                                    <S.DrnDetailInfoContent>
                                        {drnProcDetail.wp_date === ""
                                            ? "-"
                                            : moment(drnProcDetail.wp_date).format("YYYY-MM-DD")}
                                    </S.DrnDetailInfoContent>
                                </S.DrnDetailInfoInner>
                                <S.DrnDetailInfoInner>
                                    <S.DrnDetailInfoInnerTitle>종 료 일</S.DrnDetailInfoInnerTitle>
                                    <S.DrnDetailInfoContent>
                                        {drnProcDetail.due_date === ""
                                            ? "-"
                                            : moment(drnProcDetail.due_date).format("YYYY-MM-DD")}
                                    </S.DrnDetailInfoContent>
                                </S.DrnDetailInfoInner>
                            </S.DrnDetailInfo>
                            <S.DrnDetailInfoExplan>
                                <S.DrnDetailInfoInnerTitle style={{ width: "20%" }}>
                                    상 세 내 용
                                </S.DrnDetailInfoInnerTitle>
                                <S.DrnDetailInfoContent
                                    dangerouslySetInnerHTML={{ __html: drnProcDetail.explan }}
                                />
                            </S.DrnDetailInfoExplan>
                        </S.DrnDetailInfoContainer> */}

                        <S.DrnDetailInfoContainer>
                            <S.DrnDetailInfoHeader $boxType="TM">
                                <S.TitleText>TR Information</S.TitleText>
                            </S.DrnDetailInfoHeader>
                            {tmProcDetail != undefined ? (
                                <S.DrnDetailInfo>
                                    <S.DrnDetailInfoInner>
                                        <S.DrnDetailInfoInnerTitle>
                                            배 포 타 입
                                        </S.DrnDetailInfoInnerTitle>
                                        <S.DrnDetailInfoContent>
                                            {tmProcDetail.wp_type === ""
                                                ? "-"
                                                : tmProcDetail.wp_type}
                                        </S.DrnDetailInfoContent>
                                    </S.DrnDetailInfoInner>
                                    <S.DrnDetailInfoInner>
                                        <S.DrnDetailInfoInnerTitle>
                                            요 청 자
                                        </S.DrnDetailInfoInnerTitle>
                                        <S.DrnDetailInfoContent>
                                            {tmProcDetail.create_by === ""
                                                ? "-"
                                                : tmProcDetail.create_by}
                                        </S.DrnDetailInfoContent>
                                    </S.DrnDetailInfoInner>
                                    <S.DrnDetailInfoInner>
                                        <S.DrnDetailInfoInnerTitle>
                                            발 신 처
                                        </S.DrnDetailInfoInnerTitle>
                                        <S.DrnDetailInfoContent>
                                            {tmProcDetail.send_company === ""
                                                ? "-"
                                                : tmProcDetail.send_company}
                                        </S.DrnDetailInfoContent>
                                    </S.DrnDetailInfoInner>
                                    <S.DrnDetailInfoInner>
                                        <S.DrnDetailInfoInnerTitle>
                                            접 수 처
                                        </S.DrnDetailInfoInnerTitle>
                                        <S.DrnDetailInfoContent>
                                            {tmProcDetail.receive_company === ""
                                                ? "-"
                                                : tmProcDetail.receive_company}
                                        </S.DrnDetailInfoContent>
                                    </S.DrnDetailInfoInner>
                                    <S.DrnDetailInfoInner>
                                        <S.DrnDetailInfoInnerTitle>
                                            시 작 일
                                        </S.DrnDetailInfoInnerTitle>
                                        <S.DrnDetailInfoContent>
                                            {tmProcDetail.wp_date === null
                                                ? "-"
                                                : moment(tmProcDetail.wp_date).format("YYYY-MM-DD")}
                                        </S.DrnDetailInfoContent>
                                    </S.DrnDetailInfoInner>
                                    <S.DrnDetailInfoInner>
                                        <S.DrnDetailInfoInnerTitle>
                                            종 료 일
                                        </S.DrnDetailInfoInnerTitle>
                                        <S.DrnDetailInfoContent>
                                            {tmProcDetail.due_data === null
                                                ? "-"
                                                : moment(tmProcDetail.due_data).format(
                                                      "YYYY-MM-DD"
                                                  )}
                                        </S.DrnDetailInfoContent>
                                    </S.DrnDetailInfoInner>
                                </S.DrnDetailInfo>
                            ) : (
                                <S.DrnDetailInfo>
                                    <div
                                        style={{
                                            width: "100%",
                                            flex: 1,
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            fontSize: "1em",
                                        }}
                                    >
                                        표시할 정보가 없습니다.
                                    </div>
                                </S.DrnDetailInfo>
                            )}
                            {tmProcDetail ? (
                                <S.DrnDetailInfoExplan>
                                    <S.DrnDetailInfoInnerTitle style={{ width: "20%" }}>
                                        상 세 내 용
                                    </S.DrnDetailInfoInnerTitle>
                                    <S.DrnDetailInfoContent
                                        dangerouslySetInnerHTML={{ __html: tmProcDetail.explan }}
                                    />
                                </S.DrnDetailInfoExplan>
                            ) : (
                                <S.DrnDetailInfoExplan></S.DrnDetailInfoExplan>
                            )}
                            {tmProcDetail ? (
                                <S.TmDetailBtnWrap>
                                    <S.TmDetailBtn
                                        onClick={() => onClickMoveTm(tmProcDetail.wp_idx)}
                                    >
                                        상세보기
                                    </S.TmDetailBtn>
                                    <S.TmDetailBtn onClick={() => onTmFileVersionUpload()}>
                                        버전업로드
                                    </S.TmDetailBtn>
                                </S.TmDetailBtnWrap>
                            ) : (
                                <S.TmDetailBtnWrap></S.TmDetailBtnWrap>
                            )}
                        </S.DrnDetailInfoContainer>
                        <S.DrnDetailGridViewContainer $margin="bottom">
                            <S.DrnDetailGridViewHeader>
                                배포 대상 문서 목록
                            </S.DrnDetailGridViewHeader>
                            <S.GridViewWrap>
                                <GridViewComponent
                                    fullData={docuList}
                                    titles={tableHeader}
                                    keys={docuListKeys}
                                    values={docuList}
                                    keysWidth={tableHeadSize}
                                    datatype={tableHeadType}
                                    getCustomEl={createCustomEl}
                                    rowClass="background-color-white color-light-black"
                                    headerClass="background-dark-sky-blue color-white align-center"
                                />
                            </S.GridViewWrap>
                        </S.DrnDetailGridViewContainer>
                    </S.InfoContentWrap>
                    <S.DetailContentWrap>
                        <S.DrnDetailGridViewContainer $margin="left">
                            <S.DrnDetailGridViewHeader $radius={true}>
                                배포 문서 리비전의 사용자 리뷰
                            </S.DrnDetailGridViewHeader>
                            <S.GridViewWrap>
                                <GridViewComponent
                                    fullData={commentList}
                                    titles={tableHeader1}
                                    keys={commentListKeys}
                                    values={commentList}
                                    keysWidth={tableHeadSize1}
                                    datatype={tableHeadType1}
                                    getCustomEl={createCustomElComment}
                                    rowClass="background-color-white color-light-black"
                                    headerClass="background-dark-sky-blue color-white align-center"
                                />
                            </S.GridViewWrap>
                        </S.DrnDetailGridViewContainer>
                    </S.DetailContentWrap>
                </S.Contents>
            </EdmsProjectBase>
        </>
    );
};

export default EdmsDrnDetailPage;
