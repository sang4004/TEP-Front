/******************************************************************************
 * Copyright (c) 2021. Moornmo Inc. Rights reserved.                          *
 * Data modelings and methods used are assets of Moornmo Inc.                 *
 * projecttreemodal/index.tsx
 * hooks :
 * useLocations
 *
 * last modify : jh.jeong@ilts.co.kr
 ******************************************************************************/
// Library
import React, { useState, useEffect } from "react"; // default hooks
// Module
import * as S from "./styled";
import * as T from "../../../src/styled/edmsProject.styled";
import Close from "@material-ui/icons/Close";
import { useSelector, useDispatch } from "react-redux";
import { reducerState } from "../../common";
import { DocumentAllReviweList } from "../../common/action";
import { GridViewComponent, ModalInfo } from "components";
import { getMoment, windowOpenByPopup, open3DModelFile } from "../../common/utils";
import { digitalTwinDomain } from "../../common/network";
import { generateDclAchieveDownload } from "../../common/utils";
import NewWindow from "react-new-window";

const moment = getMoment();

interface FinaledmsAchieveReviewProp extends edmsAchieveReviewProp {}

const tableHeadType: number[] = [1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1];
const tableHeadSize: number[] = [0.5, 1, 0.7, 0.5, 2.5, 0.6, 1.5, 1.5, 0.5, 0.5, 0.5];
const tableHeader: string[] = [
    "리비전",
    "파일명",
    "작성자(회사)",
    "코드",
    "리뷰",
    "리뷰날짜",
    "답글",
    "첨부파일",
    "Page/Sheet",
    "뷰어",
    "다운로드",
];
export type edmsAchieveReviewProp = {
    visible: boolean;
    onClose: () => void;
    docuNo: number;
};

export const EdmsAchieveReviewModal: React.FunctionComponent<
    FinaledmsAchieveReviewProp
> = props => {
    const dispatch = useDispatch();
    const reviewSelector = useSelector((state: reducerState) => state.review);
    const userSelector = useSelector((state: reducerState) => state.user);
    const [docuReviewList, setDocuReviewList] = useState<any[]>([]);
    const [docuReviewListKeys, setDocuReviewListKeys] = useState<any[]>([]);
    const [docuCode, setDocuCode] = useState<string>("");

    useEffect(() => {
        if (props.docuNo != -1) {
            dispatch(DocumentAllReviweList(props.docuNo));
        }
    }, [props.docuNo]);

    useEffect(() => {
        if (reviewSelector.achieve_review_list && reviewSelector.achieve_review_list.length > 0) {
            let _list = [];
            for (var d of reviewSelector.achieve_review_list) {
                _list.push({
                    revision: d.revision,
                    file_name: d.original_file_name,
                    reviewer: d.comapny_name,
                    code: "Code" + d.code,
                    contents: d.contents,
                    reviewDate: moment(d.reviewDate).format("YYYY-MM-DD"),
                    reply: d.reply,
                    file_data: d.file_data,
                    page_sheet_no: d.page_sheet_no,
                    viewer: [d.file_type, d.file_no, d.repo_path],
                    down_load: "",
                });
            }
            setDocuReviewList([..._list]);
            setDocuReviewListKeys([...Object.keys(_list[0])]);
        } else {
            setDocuReviewList([]);
        }
    }, [reviewSelector.achieve_review_list]);

    useEffect(() => {
        if (reviewSelector.review_docu) {
            setDocuCode(reviewSelector.review_docu.docu_code);
        }
    }, [reviewSelector.review_docu]);

    const onClose = () => {
        props.onClose();
    };

    const createCustomEl = (idx: number, dataIdx?: number) => {
        if (idx == 4 && docuReviewList.length != 0) {
            if (dataIdx == undefined || docuReviewList[dataIdx] == undefined) return true;
            if (
                docuReviewList[dataIdx].contents != undefined &&
                docuReviewList[dataIdx].contents != ""
            ) {
                return (
                    <T.TableTd>
                        <div
                            dangerouslySetInnerHTML={{ __html: docuReviewList[dataIdx].contents }}
                        />
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
        if (idx == 6 && docuReviewList.length != 0) {
            if (dataIdx == undefined || docuReviewList[dataIdx] == undefined) return true;
            if (docuReviewList[dataIdx].reply != undefined && docuReviewList[dataIdx].reply != "") {
                return (
                    <T.TableTd>
                        <div dangerouslySetInnerHTML={{ __html: docuReviewList[dataIdx].reply }} />
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
        if (idx === 7 && docuReviewList.length != 0) {
            if (dataIdx == undefined || docuReviewList[dataIdx] == undefined) return true;
            if (docuReviewList[dataIdx].file_data.length > 0) {
                return (
                    <T.TableTd>
                        {docuReviewList[dataIdx].file_data.map((raw: any, idx: number) => {
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
        if (idx == 9) {
            if (dataIdx == undefined || docuReviewList[dataIdx] == undefined) return true;
            return (
                <T.TableTd>
                    <T.TableButtonDiv>
                        <T.TableButton onClick={() => onClickPdfViewer(dataIdx)}>
                            상세보기
                        </T.TableButton>
                    </T.TableButtonDiv>
                </T.TableTd>
            );
        }
        if (idx == 10) {
            if (dataIdx == undefined || docuReviewList[dataIdx] == undefined) return true;
            return (
                <T.TableTd>
                    <T.TableButtonDiv>
                        <T.TableButton onClick={() => onClickAchieveDownload()}>
                            다운로드
                        </T.TableButton>
                    </T.TableButtonDiv>
                </T.TableTd>
            );
        }
    };

    const onClickAchieveDownload = async () => {
        await generateDclAchieveDownload(props.docuNo, userSelector.edms_user_id);
    };

    const onClickPdfViewer = (dataIdx: number) => {
        // 0:file_type, 1:file_no, 2:repo_path
        let data = docuReviewList[dataIdx].viewer;
        if (data) {
            if (get_file_type(data[0]) === "도면") {
                open3DModelFile(data[2], data[1], userSelector.edms_user_id);
            } else {
                windowOpenByPopup(
                    `http://${window.location.host}/edms/pdfviewer/${data[1]}?page_type=0`
                );
            }
        } else {
            return ModalInfo("뷰어가 존재하지 않습니다.");
        }
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

    if (props.visible)
        return (
            <NewWindow
                title="성과물 리뷰 목록"
                onUnload={props.onClose}
                onOpen={window => {
                    window.addEventListener(
                        "dragover",
                        function (e) {
                            e = e || event;
                            e.preventDefault();
                        },
                        false
                    );
                    window.addEventListener(
                        "drop",
                        function (e) {
                            e = e || event;
                            e.preventDefault();
                        },
                        false
                    );
                }}
                features={{ width: 860, height: 860 }}
            >
                <S.Block>
                    <S.Inner>
                        <S.ModalHeader>
                            <S.HeaderTitle>성과물 리뷰 / {docuCode}</S.HeaderTitle>
                            {/* <S.ModalCloseBtn onClick={onClose}>
                                <Close style={{ fontSize: "2em" }} />
                            </S.ModalCloseBtn> */}
                        </S.ModalHeader>
                        <S.ModalContentWrap>
                            <GridViewComponent
                                titles={tableHeader}
                                keys={docuReviewListKeys}
                                values={docuReviewList}
                                fullData={docuReviewList}
                                keysWidth={tableHeadSize}
                                rowClass="background-color-white color-light-black"
                                headerClass="background-dark-sky-blue color-white align-center"
                                getCustomEl={createCustomEl}
                                datatype={tableHeadType}
                                noRecordsMsg={"표시할 리뷰가 없습니다."}
                            />
                        </S.ModalContentWrap>
                    </S.Inner>
                </S.Block>
            </NewWindow>
        );
    else return <></>;
};
