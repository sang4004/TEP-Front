/******************************************************************************
 * projecttreemodal/index.tsx
 * hooks :
 * useLocations
 *
 ******************************************************************************/
// React
import React, { useState, useEffect, ChangeEvent } from "react"; // default hooks
import { useSelector, useDispatch } from "react-redux";
//
import { reducerState } from "../../common";
import { GridViewComponent, ToastComponent } from "components";
import { GetReviewList, GetFilesHistory } from "../../common/action";
import moment from "moment";
import Close from "@material-ui/icons/Close";
//

import * as S from "./styled";
import * as T from "../../styled/project.styled";
import * as docS from "../../styled/edmsDocument.styled";

import { EdmsDocuReviewModal, EdmsDocuReplyModal } from "../../components";

const tableHeadType: number[] = [0, 1, 1, 1, 1];
const tableHeadSize: number[] = [0.2, 0.8, 1.4, 0.2, 1.4];
const tableHeader: string[] = ["선택", "문서 제목", "리뷰 내용", "작성자", "리뷰 답변"];

const tableHeadType1 = [1, 0, 1, 1];
const tableHeadSize1 = [0.3, 1, 1, 0.5];
const tableHeader1 = ["파일버전", "코멘트", "파일이름", "생성일"];

export type edmsMydocuFileHistroyProps = {
    style?: object;
    myDocu: number;
    myDocuSub: string;
    myFileNo: number;
    visible: boolean;
    onClose: () => void;
    dataidx?: number;
};
interface FinaledmsMydocuFileHistroyProps extends edmsMydocuFileHistroyProps {}

export const EdmsMydocuFileHistoryModal: React.FunctionComponent<
    FinaledmsMydocuFileHistroyProps
> = props => {
    const dispatch = useDispatch();
    const fileSelector = useSelector((state: reducerState) => state.files);
    const docuReviewSelector = useSelector((state: reducerState) => state.review);

    const [file, setFile] = useState<any>({});
    const [historyList, setHistoryList] = useState<any[]>([]);
    const [historyListKeys, setHistoryListKeys] = useState<any[]>([]);
    const [check, setCheck] = useState<number[]>([]);
    const [reviewNo, setReviewNo] = useState<any>();
    const [docuReviewList, setDocuReviewList] = useState<any[]>([]);
    const [docuReviewListKeys, setDocuReviewListKeys] = useState<any[]>([]);
    const [isFile, setIsFile] = useState<boolean>(true);

    const [visibleToast, setVisibleToast] = useState<boolean>(false);
    const [replyModalVisible, setReplyModalVisible] = useState<boolean>(false);
    const [reviewModalVisible, setReviewModalVisible] = useState<boolean>(false);

    useEffect(() => {
        if (props.visible && fileSelector.files_list) {
            dispatch(GetReviewList(props.myDocu));

            for (var f of fileSelector.files_list) {
                if (f.file_no === props.myFileNo) setFile(f);
            }
        }
    }, [props.visible, replyModalVisible, reviewModalVisible]);

    useEffect(() => {
        if (props.visible && fileSelector.files_list) {
            let fileTmp: any[] = [];

            for (var f of fileSelector.files_list) {
                if (f.file_name === file.file_name) fileTmp.push(f.file_no);
            }

            dispatch(GetFilesHistory(fileTmp, props.myDocu));
        }
    }, [file]);

    useEffect(() => {
        if (props.visible && fileSelector.files_histories) {
            let _list = [];

            for (var f of fileSelector.files_histories) {
                _list.push({
                    fversion: "V" + f.fversion,
                    history: f.history,
                    file_name: f.file_name,
                    create_tm: moment(f.create_tm).format("YYYY-MM-DD"),
                });
            }
            setHistoryListKeys([...Object.keys(_list[0])]);
            setHistoryList([..._list]);
        }
    }, [fileSelector.files_histories]);

    useEffect(() => {
        if (
            props.visible &&
            docuReviewSelector.review_list &&
            docuReviewSelector.review_list.length > 0
        ) {
            let _list = [];
            for (var reviews of docuReviewSelector.review_list) {
                // 파일 리뷰 필터링
                if (reviews.file_no != null && reviews.file_no === props.myFileNo) {
                    // 등록된 답변이 없을 시 기본으로 표시할 내용
                    let reply_temp = "";
                    if (reviews.reply == "") {
                        reply_temp = "등록된 답변이 없습니다.";
                    } else {
                        reply_temp = reviews.reply.substring(3, reviews.reply.length - 4);
                    }
                    _list.push({
                        reviewNo: reviews.review_no,
                        docu_name: props.myDocuSub,
                        // 리뷰 코멘트에 p태그 제거
                        review_comment: reviews.content.substring(3, reviews.content.length - 4),
                        create_by: reviews.create_by,
                        review_reply: reply_temp,
                    });
                }
            }
            // 선택한 파일에 리뷰 있을 때 docuReviewList 추가
            if (_list.length != 0) {
                setDocuReviewList([..._list]);
                setDocuReviewListKeys([...Object.keys(_list[0])]);
            } else {
                setDocuReviewList([]);
                setDocuReviewListKeys([]);
            }
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

    const createHistoryCustomEl = (idx: number, dataIdx?: number) => {
        if (idx == 1) {
            if (dataIdx == undefined) return true;
            return (
                <T.TableTd>
                    <div dangerouslySetInnerHTML={{ __html: historyList[dataIdx].history }} />
                </T.TableTd>
            );
        }
    };

    const onClickCheck = (e: ChangeEvent<any>, idx: number) => {
        if (e.target.checked) {
            check.push(idx);
            setReviewNo(docuReviewList[idx].reviewNo);
        } else check.splice(check.indexOf(idx), 1);
        setCheck([...check]);
    };

    const onClose = () => {
        setCheck([]);
        setDocuReviewList([]);
        setDocuReviewListKeys([]);
        props.onClose();
    };

    // ReviewMoal visible
    const onClickFileReviewModal = () => {
        setReviewModalVisible(true);
    };

    const onCloseFileReviewModal = () => {
        setReviewModalVisible(false);
    };
    //
    // ReplyModal visible
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

    const onCloseDocuReplyModal = async () => {
        setReplyModalVisible(false);
    };
    //

    return (
        <div>
            <EdmsDocuReviewModal
                visible={reviewModalVisible}
                onClose={onCloseFileReviewModal}
                // dataidx={props.dataidx}
                isFile={isFile}
                myDocu={props.myDocu}
                myFileNo={props.myFileNo}
            />
            <EdmsDocuReplyModal
                visible={replyModalVisible}
                onClose={onCloseDocuReplyModal}
                // dataidx={props.dataidx}
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
                            <Close style={{ fontSize: "1.6em" }} />
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
                                    keysWidthTotal={6}
                                />
                            </S.ModalFileVersionList>
                        </S.ModalListBox>
                        <S.ModalHistoryListBox>
                            <GridViewComponent
                                titles={tableHeader1}
                                keys={historyListKeys}
                                fullData={historyList}
                                values={historyList}
                                keysWidth={tableHeadSize1}
                                datatype={tableHeadType1}
                                getCustomEl={createHistoryCustomEl}
                                rowClass="background-color-white color-light-black"
                                headerClass="background-dark-sky-blue color-white align-center"
                            />
                        </S.ModalHistoryListBox>
                    </S.ModalContentWrap>
                </S.Inner>
            </S.Block>
        </div>
    );
};
