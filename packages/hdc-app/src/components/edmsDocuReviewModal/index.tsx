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
import React, { useRef, useState, useEffect } from "react"; // default hooks
import { useSelector, useDispatch } from "react-redux";
// Module
import { reducerState } from "../../common";
import { CreateReview } from "../../common/action";
import { ModalInfo, LoadingIndicatorComponent, WebEditorComponent } from "components";
//

import * as S from "./styled";

import closeSvg from "../../images/edms/times-solid-white.svg";

export type edmsDocuReviewModalProps = {
    style?: object;
    visible: boolean;
    onClose: () => void;
    isFile: boolean;
    dataidx?: number;
    myDocu?: number;
    myFileNo?: number;
};
interface FinaledmsDocuReviewModalProps extends edmsDocuReviewModalProps {}

export const EdmsDocuReviewModal: React.FunctionComponent<FinaledmsDocuReviewModalProps> =
    props => {
        const dispatch = useDispatch();
        const docuReviewSelector = useSelector((state: reducerState) => state.review);

        const [history, setHistory] = useState<string>("");
        const [isInput, setIsInput] = useState<boolean>(false);
        const [isLoading, setIsLoading] = useState<boolean>(false);

        const [docu_no, setDocuNo] = useState<number>(0);
        const [file_no, setFileNo] = useState<number>(0);
        const [content, setContent] = useState<string>("");

        useEffect(() => {
            if (props.visible && props.myDocu && props.myFileNo) {
                setDocuNo(props.myDocu);
                setFileNo(props.myFileNo);
            }
        }, [props.visible]);

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
            if (docuReviewSelector.create_review_data != undefined) {
                setTimeout(() => {
                    ModalInfo("?????? ????????? ?????????????????????.");
                    setIsLoading(false);
                    onClose();
                }, 2000);
            }
            setHistory("");
        }, [docuReviewSelector.create_review_data]);

        const onClose = () => {
            setHistory("");
            props.onClose();
        };

        const onClickSaveReview = async () => {
            if (!isInput) return ModalInfo("?????? ????????? ??????????????????.");
            
            setIsLoading(true);
            await dispatch(CreateReview(docu_no, file_no, content));
        };

        return (
            <S.Block open={props.visible ? true : false} onClose={props.onClose}>
                <S.Inner>
                    <LoadingIndicatorComponent open={isLoading} style={{ zIndex: 1301 }} />
                    <S.ModalHeader>
                        <S.HeaderTitle>?????? ??????</S.HeaderTitle>
                        <S.ModalCloseBtn onClick={onClose}>
                            <img src={closeSvg} />
                        </S.ModalCloseBtn>
                    </S.ModalHeader>

                    <S.ModalContentWrap>
                        <S.ModalListBigBox>
                            <S.InnerContainerHeader>????????????</S.InnerContainerHeader>
                            <S.ModalInputBox $boxType="wide">
                                <WebEditorComponent
                                        onChangeContent={html => setHistory(html)}
                                        editdisabled={false}
                                        toolDisabled={false}
                                />
                            </S.ModalInputBox>
                            <S.ModalBottom>
                                <S.ModalBtnContainer>
                                    <S.CloseBtn onClick={onClose}>??????</S.CloseBtn>
                                    <S.SaveBtn
                                        $type={isInput ? "input" : "confirm"}
                                        onClick={onClickSaveReview}
                                    >
                                        ??????
                                    </S.SaveBtn>
                                </S.ModalBtnContainer>
                            </S.ModalBottom>
                        </S.ModalListBigBox>
                    </S.ModalContentWrap>
                </S.Inner>
            </S.Block>
        );
    };
