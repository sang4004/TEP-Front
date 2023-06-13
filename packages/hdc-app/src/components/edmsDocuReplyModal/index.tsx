/******************************************************************************
 * projecttreemodal/index.tsx
 * hooks :
 * useLocations
 *
 ******************************************************************************/
// Library
import React, { useRef, useState, useEffect } from "react"; // default hooks
import { useSelector, useDispatch } from "react-redux";
// Module
import { reducerState } from "../../common";
import { CreateReviewReply } from "../../common/action";
import { ModalInfo, LoadingIndicatorComponent, WebEditorComponent } from "components";
//
import closeSvg from "../../images/edms/times-solid-white.svg";

import * as S from "./styled";

export type edmsDocuReplyModalProps = {
    style?: object;
    visible: boolean;
    onClose: () => void;
    isFile: boolean;
    dataidx?: number;
    reviewNo: number;
};
interface FinaledmsDocuReplyModalProps extends edmsDocuReplyModalProps {}

export const EdmsDocuReplyModal: React.FunctionComponent<FinaledmsDocuReplyModalProps> = props => {
    const dispatch = useDispatch();
    const docuReviewSelector = useSelector((state: reducerState) => state.review);

    const [history, setHistory] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [isInput, setIsInput] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (history == "" || history == "<p></p>") {
            setIsInput(false);
            setContent("");
        } else {
            setIsInput(true);
            setContent(history);
        }
    }, [history]);

    useEffect(() => {
        if (docuReviewSelector.create_review_reply_data != undefined) {
            setTimeout(() => {
                ModalInfo("답변 등록이 완료되었습니다.");
                setIsLoading(false);
                onClose();
            }, 2000);
        }
        setHistory("");
    }, [docuReviewSelector.create_review_reply_data]);

    const onClose = () => {
        setHistory("");
        props.onClose();
    };

    const onClickSaveReview = async () => {
        if (!isInput) return ModalInfo("답변 내용을 작성해주세요.");

        setIsLoading(true);
        await dispatch(CreateReviewReply(props.reviewNo, content));
    };

    return (
        <S.Block open={props.visible ? true : false} onClose={props.onClose}>
            <S.Inner>
                <LoadingIndicatorComponent open={isLoading} style={{ zIndex: 1301 }} />
                <S.ModalHeader>
                    <S.HeaderTitle>리뷰 답변 등록</S.HeaderTitle>
                    <S.ModalCloseBtn onClick={onClose}>
                        <img src={closeSvg} />
                    </S.ModalCloseBtn>
                </S.ModalHeader>
                <S.ModalContentWrap>
                    <S.ModalListBigBox>
                        <S.InnerContainerHeader>답변내용</S.InnerContainerHeader>
                        <S.ModalInputBox $boxType="wide">
                            <WebEditorComponent
                                    onChangeContent={html => setHistory(html)}
                                    editdisabled={false}
                                    toolDisabled={false}
                            />
                        </S.ModalInputBox>
                        <S.ModalBottom>
                            <S.ModalBtnContainer>
                                <S.CloseBtn onClick={onClose}>닫기</S.CloseBtn>
                                <S.SaveBtn
                                    $type={isInput ? "input" : "confirm"}
                                    onClick={onClickSaveReview}
                                >
                                    저장
                                </S.SaveBtn>
                            </S.ModalBtnContainer>
                        </S.ModalBottom>
                    </S.ModalListBigBox>
                </S.ModalContentWrap>
            </S.Inner>
        </S.Block>
    );
};
