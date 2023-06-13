/******************************************************************************
 * projecttreemodal/index.tsx
 * hooks :
 * useLocations
 *
 ******************************************************************************/
// Library
import React, { useState, useEffect, ChangeEvent } from "react"; // default hooks
//
// Module
import * as S from "./styled";
import * as T from "../../styled/project.styled";
import * as docS from "../../styled/edmsDocument.styled";
import * as s from "../../styled/edmsDocumentActlistDetail.styled";
import closeSvg from "../../images/edms/times-solid-white.svg";
import { useSelector, useDispatch } from "react-redux";
import { reducerState } from "../../common";
import { LoadingIndicatorComponent, GridViewComponent, ToastComponent } from "components";
import { GetReviewList } from "../../common/action";
import { EdmsDocuReplyModal } from "../../components";

const tableHeadType: number[] = [1, 1, 1, 1, 1];
const tableHeadSize: number[] = [0.2, 0.8, 1.4, 0.3, 1.4];
const tableHeader: string[] = ["선택", "문서 제목", "리뷰 내용", "작성자", "리뷰 답변"];

export type edmsDocuReviewListModalProps = {
    style?: object;
    visible: boolean;
    onClose: () => void;
    dataidx: number;
    isFile: boolean;
};
interface FinaledmsDocuReviewListModalProps extends edmsDocuReviewListModalProps {}

export const EdmsDocuReviewListModal: React.FunctionComponent<FinaledmsDocuReviewListModalProps> =
    props => {
        const dispatch = useDispatch();

        const docuReviewSelector = useSelector((state: reducerState) => state.review);
        const documentSelector = useSelector((state: reducerState) => state.document);

        const [isLoading, setIsLoading] = useState<boolean>(false);
        const [reviewList, setReviewList] = useState<any>([]);

        const [docu_no, setDocuNo] = useState<number>(0);
        const [docuReviewList, setDocuReviewList] = useState<any[]>([]);
        const [docuReviewListKeys, setDocuReviewListKeys] = useState<any[]>([]);
        const [visibleToast, setVisibleToast] = useState<boolean>(false);
        const [docu_subject, setDocuSubject] = useState<string>("");
        const [check, setCheck] = useState<number[]>([]);
        const [reviewNo, setReviewNo] = useState<any>();

        const [replyModalVisible, setReplyModalVisible] = useState<boolean>(false);

        useEffect(() => {
            if (documentSelector.document_detail != undefined) {
                setDocuNo(documentSelector.document_detail.docu_no);
                dispatch(GetReviewList(docu_no));
                setDocuSubject(documentSelector.document_detail.docu_subject);
            }
        }, [documentSelector.document_detail]);

        useEffect(() => {
            if (docuReviewSelector.review_list && docuReviewSelector.review_list.length > 0) {
                let _list = [];
                for (var review of docuReviewSelector.review_list) {
                    if (review.file_no === null) {
                        _list.push({
                            reviewNo: review.reviewNo,
                            content: review.content,
                            create_by: review.create_by,
                            reply: review.reply,
                        });
                    }
                }
                setReviewList([..._list]);
            } else if (
                docuReviewSelector.review_list &&
                docuReviewSelector.review_list.length == 0
            ) {
                setReviewList([]);
            }
        }, [docuReviewSelector.review_list]);

        useEffect(() => {
            if (docuReviewSelector.review_list && docuReviewSelector.review_list.length > 0) {
                let _list = [];
                for (var reviews of docuReviewSelector.review_list) {
                    // 파일 리뷰 필터링
                    if (reviews.file_no === null) {
                        // 등록된 답변이 없을 시 기본으로 표시할 내용
                        let reply_temp = "";
                        if (reviews.reply == "") {
                            reply_temp = "등록된 답변이 없습니다.";
                        } else {
                            reply_temp = reviews.reply.substring(3, reviews.reply.length - 4);
                        }
                        _list.push({
                            reviewNo: reviews.review_no,
                            docu_name: docu_subject,
                            // 리뷰 코멘트에 p태그 제거
                            review_comment: reviews.content.substring(
                                3,
                                reviews.content.length - 4
                            ),
                            create_by: reviews.create_by,
                            review_reply: reply_temp,
                        });
                    }
                }
                setDocuReviewList([..._list]);
                setDocuReviewListKeys([...Object.keys(_list[0])]);
            } else {
                setDocuReviewList([]);
                setDocuReviewListKeys([]);
            }
        }, [docuReviewSelector.review_list]);

        const createCustomEl = (idx: number, dataidx?: number) => {
            if (idx === 0) {
                if (dataidx == undefined) return true;
                return (
                    <T.TableTd>
                        <T.TableCheckbox
                            checked={check.indexOf(dataidx) != -1}
                            onChange={e => onClickCheck(e, dataidx)}
                        />
                    </T.TableTd>
                );
            }
            return null;
        };

        const onClickCheck = (e: ChangeEvent<any>, idx: number) => {
            if (e.target.checked) {
                check.push(idx);
                setReviewNo(docuReviewList[idx].reviewNo);
            } else check.splice(check.indexOf(idx), 1);
            setCheck([...check]);
        };

        const onCloseDocuReplyModal = async () => {
            setReplyModalVisible(false);
        };

        const onClose = () => {
            props.onClose();
        };

        const onClickReply = () => {
            if (check.length > 1 || check.length == 0) {
                setVisibleToast(true);
                setTimeout(() => {
                    setVisibleToast(false);
                }, 2000);
                return;
            } else {
                setReplyModalVisible(true);
            }
        };

        return (
            <>
                <EdmsDocuReplyModal
                    visible={replyModalVisible}
                    onClose={onCloseDocuReplyModal}
                    dataidx={props.dataidx}
                    isFile={props.isFile}
                    reviewNo={reviewNo}
                />
                <S.Block open={props.visible ? true : false} onClose={props.onClose}>
                    <S.Inner>
                        <ToastComponent
                            text="체크박스 하나를 선택해주세요."
                            close={() => setVisibleToast(false)}
                            visible={visibleToast}
                            type={"warning"}
                            style={{
                                position: "absolute",
                                bottom: 100,
                                right: 320,
                                alignItems: "center",
                            }}
                        />
                        <LoadingIndicatorComponent open={isLoading} style={{ zIndex: 1301 }} />
                        <S.ModalHeader>
                            <S.HeaderTitle>문서 리뷰 목록</S.HeaderTitle>
                            <S.ModalCloseBtn onClick={onClose}>
                                <img src={closeSvg} />
                            </S.ModalCloseBtn>
                        </S.ModalHeader>
                        <S.ModalContentWrap>
                            <S.ModalListBigBox>
                                <S.InnerContainerHeader>
                                    리뷰목록
                                    <docS.DocumentToolBtn onClick={onClickReply}>
                                        <img src="assets/images/edms/edit.svg" alt="" />
                                        리뷰 답변 등록
                                    </docS.DocumentToolBtn>
                                </S.InnerContainerHeader>
                                <S.ModalFileVersionList>
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
                                    />
                                </S.ModalFileVersionList>
                            </S.ModalListBigBox>
                        </S.ModalContentWrap>
                    </S.Inner>
                </S.Block>
            </>
        );
    };
