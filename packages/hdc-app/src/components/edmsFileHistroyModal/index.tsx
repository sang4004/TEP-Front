/******************************************************************************
 * projecttreemodal/index.tsx
 * hooks :
 * useLocations
 *
 ******************************************************************************/
// Library
import React, { useState, useEffect, ChangeEvent } from "react"; // default hooks
//
import { EdmsDocuReviewModal, EdmsDocuReplyModal } from "../../components";
//
// Module
import * as S from "./styled";
import * as docS from "../../styled/edmsDocument.styled";
import * as T from "../../styled/project.styled";
import closeSvg from "../../images/edms/times-solid-white.svg";
import { useSelector, useDispatch } from "react-redux";
import { reducerState } from "../../common";
import { GetFileHistory, GetReviewList } from "../../common/action";
import { GridViewComponent, ToastComponent } from "components";

const tableHeadType: number[] = [1, 1, 1, 1, 1];
const tableHeadSize: number[] = [0.2, 0.8, 1.4, 0.3, 1.4];
const tableHeader: string[] = ["선택", "문서 제목", "리뷰 내용", "작성자", "리뷰 답변"];

export type edmsFileHistroyProps = {
    style?: object;
    visible: boolean;
    onClose: () => void;
    dataidx: number;
};
interface FinaledmsFileHistroyProps extends edmsFileHistroyProps {}

export const EdmsFileHistoryModal: React.FunctionComponent<FinaledmsFileHistroyProps> = props => {
    const dispatch = useDispatch();
    const fileSelector = useSelector((state: reducerState) => state.files);
    const docuReviewSelector = useSelector((state: reducerState) => state.review);
    const documentSelector = useSelector((state: reducerState) => state.document);

    const [file, setFile] = useState<any>({});
    const [historyList, setHistoryList] = useState<any[]>([]);
    const [reviewModalVisible, setReviewModalVisible] = useState<boolean>(false);
    const [isFile, setIsFile] = useState<boolean>(true);
    const [docu_subject, setDocuSubject] = useState<string>("");
    const [docu_no, setDocuNo] = useState<number>(0);
    const [reviewNo, setReviewNo] = useState<any>();
    const [check, setCheck] = useState<number[]>([]);
    const [visibleToast, setVisibleToast] = useState<boolean>(false);
    const [docuReviewList, setDocuReviewList] = useState<any[]>([]);
    const [docuReviewListKeys, setDocuReviewListKeys] = useState<any[]>([]);
    const [replyModalVisible, setReplyModalVisible] = useState<boolean>(false);

    useEffect(() => {
        dispatch(GetReviewList(docu_no));
    }, [props.visible, docu_no]);

    useEffect(() => {
        if (documentSelector.document_detail != undefined) {
            setDocuNo(documentSelector.document_detail.docu_no);
            setDocuSubject(documentSelector.document_detail.docu_subject);
        }
    }, [documentSelector.document_detail]);

    useEffect(() => {
        if (props.dataidx != -1) setFile(fileSelector.file_list[props.dataidx]);
    }, [props.dataidx]);

    useEffect(() => {
        dispatch(GetFileHistory(file.origin_file_code));
    }, [file]);

    useEffect(() => {
        if (fileSelector.file_histories && fileSelector.file_histories.length > 0) {
            setHistoryList([...fileSelector.file_histories]);
        }
    }, [fileSelector.file_histories]);

    useEffect(() => {
        if (docuReviewSelector.review_list && docuReviewSelector.review_list.length > 0) {
            let _list = [];
            for (var reviews of docuReviewSelector.review_list) {
                // 파일 리뷰 필터링
                if (reviews.file_no != null) {
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
                        review_comment: reviews.content.substring(3, reviews.content.length - 4),
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

    const onClose = () => {
        props.onClose();
    };

    const onClickFileReviewModal = () => {
        setReviewModalVisible(true);
    };

    const onCloseFileReviewModal = () => {
        setReviewModalVisible(false);
    };

    const onCloseDocuReplyModal = async () => {
        setReplyModalVisible(false);
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
        <div>
            <EdmsDocuReviewModal
                visible={reviewModalVisible}
                onClose={onCloseFileReviewModal}
                dataidx={props.dataidx}
                isFile={isFile}
            />
            <EdmsDocuReplyModal
                visible={replyModalVisible}
                onClose={onCloseDocuReplyModal}
                dataidx={props.dataidx}
                isFile={isFile}
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
                            right: 280,
                            alignItems: "center",
                        }}
                    />
                    <S.ModalHeader>
                        <S.HeaderTitle>
                            파일 상세 보기 <br />
                            {file.file_name}{" "}
                        </S.HeaderTitle>
                        <S.ModalCloseBtn onClick={onClose}>
                            <img src={closeSvg} />
                        </S.ModalCloseBtn>
                    </S.ModalHeader>
                    <S.ModalContentWrap>
                        <S.ModalListBox>
                            <S.InnerContainerHeader>
                                파일 리뷰 목록
                                <S.ButtonDiv>
                                    <docS.DocumentToolBtn onClick={onClickFileReviewModal}>
                                        <img src="assets/images/edms/edit.svg" alt="" />
                                        파일 리뷰 등록
                                    </docS.DocumentToolBtn>
                                    <docS.DocumentToolBtn onClick={onClickReply}>
                                        <img src="assets/images/edms/edit.svg" alt="" />
                                        리뷰 답변 등록
                                    </docS.DocumentToolBtn>
                                </S.ButtonDiv>
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
                        </S.ModalListBox>
                        <S.ModalHistoryListBox>
                            <S.InnerContainerHeader>히스토리</S.InnerContainerHeader>
                            <S.ModalFileVersionList>
                                {historyList.length > 0 &&
                                    historyList.map((raw: any) => {
                                        return (
                                            <S.ModalFilVersionTextDiv>
                                                V{raw.fversion} :{" "}
                                                <div
                                                    dangerouslySetInnerHTML={{
                                                        __html: raw.history,
                                                    }}
                                                />
                                            </S.ModalFilVersionTextDiv>
                                        );
                                    })}
                            </S.ModalFileVersionList>
                        </S.ModalHistoryListBox>
                    </S.ModalContentWrap>
                </S.Inner>
            </S.Block>
        </div>
    );
};
