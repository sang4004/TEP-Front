/******************************************************************************
 * projecttreemodal/index.tsx
 * hooks :
 * useLocations
 *
 ******************************************************************************/
// Library
import React, { useRef, useState, useEffect } from "react"; // default hooks
import { Editor, EditorTools } from "@progress/kendo-react-editor";
//
// Module
import * as S from "./styled";
import Close from "@material-ui/icons/Close";
import { useDispatch, useSelector } from "react-redux";
import {
    GetDocumentDetail,
    PdfEditDocument,
} from "../../common/action";
import { LoadingIndicatorComponent, ModalInfo } from "components";
import { reducerState } from "../../common/store";
import { getMoment } from "../../common/utils";
const moment = getMoment();

export type edmsDocumentEditModalProps = {
    visible: boolean;
    onClose: () => void;
    docu_no: number;
};
interface FinaledmsDocumentEditModalProps extends edmsDocumentEditModalProps {}

const {
    Bold,
    Strikethrough,
    Subscript,
    Superscript,
    AlignLeft,
    AlignCenter,
    AlignRight,
    AlignJustify,
    Indent,
    Outdent,
    OrderedList,
    UnorderedList,
    Undo,
    Redo,
    FontName,
    FormatBlock,
    InsertImage,
} = EditorTools;

export const EdmsDocumentEditModal: React.FunctionComponent<FinaledmsDocumentEditModalProps> =
    props => {
        const dispatch = useDispatch();
        const editorRef = useRef(null);
        const docuSelector = useSelector((state: reducerState) => state.document);
        const pdfSelector = useSelector((state: reducerState) => state.pdfdata);
        const userSelector = useSelector((state: reducerState) => state.user);
        const projSelector = useSelector((state: reducerState) => state.project);

        const [isLoading, setIsLoading] = useState<boolean>(false);
        const [docuTitle, setDocuTitle] = useState<string>("");
        const [content, setContent] = useState<string>("");
        const [planDate, setPlanDate] = useState<Date>();
        const [realDate, setRealDate] = useState<Date>();
        const [stageCode, setStageCode] = useState<string>("");

        useEffect(() => {
            dispatch(GetDocumentDetail(props.docu_no));
        }, []);

        useEffect(() => {
            if (docuSelector.document_detail && docuSelector.document_detail != undefined) {
                setDocuTitle(docuSelector.document_detail.docu_subject);
                setContent(docuSelector.document_detail.explan);
                setStageCode(docuSelector.document_detail.stage_code);
                setPlanDate(docuSelector.document_detail.plan_submit_dt);
                setRealDate(docuSelector.document_detail.real_submit_dt);
            }
        }, [docuSelector.document_detail]);

        useEffect(() => {
            if (pdfSelector.pdf_edit_document != undefined) {
                dispatch(GetDocumentDetail(props.docu_no));
                setTimeout(() => {
                    setIsLoading(false);
                    ModalInfo("문서 수정이 완료되었습니다.");
                    props.onClose();
                }, 2000);
            }
        }, [pdfSelector.pdf_edit_document]);

        const onClose = () => {
            props.onClose();
        };

        const onClickCreate = async () => {
            setIsLoading(true);
            dispatch(
                PdfEditDocument(
                    props.docu_no,
                    docuTitle,
                    stageCode,
                    content,
                    planDate,
                    realDate,
                    userSelector.username
                )
            );
        };

        return (
            <>
                <S.Block open={props.visible ? true : false} onClose={props.onClose}>
                    <S.Inner>
                        <LoadingIndicatorComponent open={isLoading} />
                        <S.ModalHeader>
                            <S.HeaderTitle>문서수정</S.HeaderTitle>
                            <S.ModalCloseBtn onClick={onClose}>
                                <Close fontSize="large"/>
                            </S.ModalCloseBtn>
                        </S.ModalHeader>

                        <S.ModalContentWrap>
                            <S.ModalInputWrap>
                                <S.ModalInputBox>
                                    <S.InputTitle>문서 제목</S.InputTitle>
                                    <S.Input
                                        value={docuTitle}
                                        onChange={e => setDocuTitle(e.target.value)}
                                    />
                                </S.ModalInputBox>
                                {/* <S.ModalInputBox>
                                    <S.InputTitle>문서단계</S.InputTitle>
                                    <S.InputSelect
                                        disableUnderline
                                        value={stageCode}
                                        onChange={(e: any) => setStageCode(e.target.value)}
                                        style={{ width: "65%", height: "100%" }}
                                    >
                                        {docuSelector.stage_code_list &&
                                            docuSelector.stage_code_list.map(
                                                (raw: any, idx: number) => {
                                                    return (
                                                        <S.InputSelectItem key={idx} value={raw}>
                                                            {raw}
                                                        </S.InputSelectItem>
                                                    );
                                                }
                                            )}
                                    </S.InputSelect>
                                </S.ModalInputBox> */}

                                <S.ModalInputBox $boxType={"wide"}>
                                    <S.InputTitle $boxType={"wide"}>상세 설명</S.InputTitle>
                                    <Editor
                                        tools={[
                                            [Bold, Strikethrough],
                                            [Subscript, Superscript],
                                            [AlignLeft, AlignCenter, AlignRight, AlignJustify],
                                            [Indent, Outdent],
                                            [OrderedList, UnorderedList],
                                            FontName,
                                            FormatBlock,
                                            [Undo, Redo],
                                            [InsertImage],
                                        ]}
                                        value={content}
                                        ref={editorRef}
                                        defaultEditMode="div"
                                        onChange={event => {
                                            setContent(event.html);
                                        }}
                                        // onMount={onMount}
                                        style={{ width: "83.5%", height: "100%" }}
                                    />
                                </S.ModalInputBox>

                                <S.ModalInputBox>
                                    <S.InputTitle>제출 예정일</S.InputTitle>
                                    <S.Input
                                        type="date"
                                        value={moment(planDate).format("YYYY-MM-DD")}
                                        onChange={e => setPlanDate(moment(e.target.value).toDate())}
                                    />
                                </S.ModalInputBox>

                                <S.ModalInputBox>
                                    <S.InputTitle>실제 제출일</S.InputTitle>
                                    <S.Input
                                        type="date"
                                        value={moment(realDate).format("YYYY-MM-DD")}
                                        onChange={e => setRealDate(moment(e.target.value).toDate())}
                                    />
                                </S.ModalInputBox>
                            </S.ModalInputWrap>
                            <S.ModalBtnContainer>
                                <S.CloseBtn onClick={onClose}>닫기</S.CloseBtn>
                                <S.SaveBtn onClick={onClickCreate}>저장</S.SaveBtn>
                            </S.ModalBtnContainer>
                        </S.ModalContentWrap>
                    </S.Inner>
                </S.Block>
            </>
        );
    };
