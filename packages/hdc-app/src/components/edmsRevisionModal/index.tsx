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
//
// Module
import * as S from "./styled";
import closeSvg from "../../images/edms/times-solid-white.svg";
import { useSelector, useDispatch } from "react-redux";
import { reducerState } from "../../common";
import { Editor, EditorTools } from "@progress/kendo-react-editor";
import { ModalInfo, LoadingIndicatorComponent } from "components";
import { DeactiveWorkModal, GetRevisionInfo, RevisionProcess } from "../../common/action";

export type edmsRevisionModalProps = {
    style?: object;
    visible: boolean;
    onClose: () => void;
    checkList: number[];
};
interface FinaledmsRevisionModalProps extends edmsRevisionModalProps {}

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

export const EdmsRevisionModal: React.FunctionComponent<FinaledmsRevisionModalProps> = props => {
    const dispatch = useDispatch();
    const editorRef = useRef(null);
    const workSelector = useSelector((state: reducerState) => state.work);
    const fileSelector = useSelector((state: reducerState) => state.files);
    const docuSelector = useSelector((state: reducerState) => state.document);

    const [documents, setDocuments] = useState<any[]>([]);
    const [revision, setRevision] = useState<string>("");
    const [changeRevision, setChangeRevision] = useState<string>("");
    const [contents, setContents] = useState<string>("");
    const [stage, setStage] = useState<string>("");
    const [wtdIdx, setWtdIdx] = useState<number[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        let _list: any[] = [];
        let _wtd: number[] = [];
        if (props.checkList.length > 0) {
            props.checkList.map((idx: number) => {
                let _docu: any = fileSelector.native_file_list[idx];
                if (props.checkList.length != 0) {
                    _list.push(_docu);
                    _wtd.push(_docu.wtb_idx);
                }
            });
        }
        setDocuments([..._list]);
        setWtdIdx([..._wtd]);
    }, [props.checkList]);

    useEffect(() => {
        if (props.visible == true) {
            dispatch(GetRevisionInfo(wtdIdx));
        }
    }, [props.visible]);

    useEffect(() => {
        if (workSelector.last_revision_number && workSelector.last_revision_number.length > 0) {
            setRevision(workSelector.last_revision_number);
        }
    }, [workSelector.last_revision_number]);

    useEffect(()=>{
        if(workSelector.is_complete_revision){
            setTimeout(()=>{
                setIsLoading(false);
                ModalInfo("????????? ????????? ?????????????????????.");
                dispatch(DeactiveWorkModal());
                props.onClose();
            }, 2000);
        }
        setContents("");
        setChangeRevision("");
        setStage("");
        setRevision("");
    }, [workSelector.is_complete_revision]);

    const onClose = () => {
        props.onClose();
        setContents("");
        setChangeRevision("");
        setStage("");
        setRevision("");
    };

    const onClickRevision = async () => {
        if (changeRevision == "") return ModalInfo("????????? ???????????? ??????????????????.");

        setIsLoading(true);
        dispatch(RevisionProcess(wtdIdx, stage, changeRevision, contents));
    };
    return (
        <S.Block open={props.visible ? true : false} onClose={props.onClose}>
            <S.Inner>
                <LoadingIndicatorComponent open={isLoading} style={{ zIndex: 1301 }} />
                <S.ModalHeader>
                    <S.HeaderTitle>????????? ??????</S.HeaderTitle>
                    <S.ModalCloseBtn onClick={onClose}>
                        <img src={closeSvg} />
                    </S.ModalCloseBtn>
                </S.ModalHeader>

                <S.ModalContentWrap>
                    <S.ModalListBox>
                        <S.InnerContainerHeader>
                            ?????? ???????????? - {documents.length}???
                        </S.InnerContainerHeader>
                        <S.ModalRevisionList>
                            {documents.length > 0 &&
                                documents.map((raw: any, idx) => {
                                    return (
                                        <S.ModalRevisionItemDiv key={raw.docu_code}>
                                            <S.ModalRevisionTextDiv>
                                                {raw.docu_code}
                                            </S.ModalRevisionTextDiv>
                                        </S.ModalRevisionItemDiv>
                                    );
                                })}
                        </S.ModalRevisionList>
                    </S.ModalListBox>
                    <S.ModalInputBox $boxType="top">
                        <S.InputSelectTitle>????????????</S.InputSelectTitle>
                        <S.InputSelect
                            disableUnderline
                            value={stage}
                            onChange={(e: any) => setStage(e.target.value)}
                            $boxType="wide"
                        >
                            {docuSelector.stage_code_list &&
                                docuSelector.stage_code_list.map((raw: any, idx: number) => {
                                    return (
                                        <S.InputSelectItem key={raw} value={raw}>
                                            {raw}
                                        </S.InputSelectItem>
                                    );
                                })}
                        </S.InputSelect>
                    </S.ModalInputBox>

                    <S.ModalInputBox $boxType="long">
                        <S.InputTitle $boxType="wide">????????? ????????? ??????</S.InputTitle>
                        <S.TextFieldDiv
                            inputProps={{
                                disabled: true,
                                style: {
                                    height: "100%",
                                    border: "1px solid #999999",
                                    textAlign: "center",
                                    paddingTop: "5px",
                                    borderRadius: "5px",
                                },
                            }}
                            InputProps={{ disableUnderline: true }}
                            type="text"
                            name="Revision"
                            value={revision}
                            variant="standard"
                        />
                        <S.InputTitle $boxType="wide">????????? ????????? ??????</S.InputTitle>
                        <S.TextFieldDiv
                            inputProps={{
                                style: {
                                    height: "100%",
                                    border: "1px solid #999999",
                                    textAlign: "center",
                                    paddingTop: "5px",
                                    borderRadius: "5px",
                                },
                            }}
                            InputProps={{ disableUnderline: true }}
                            type="number"
                            name="ChangeRevision"
                            value={changeRevision}
                            onChange={e => setChangeRevision(e.target.value)}
                            variant="standard"
                        />
                    </S.ModalInputBox>
                    <S.InputTitle $boxType="wide">????????? ??????</S.InputTitle>

                    <S.ModalInputBox $boxType="wide">
                        <Editor
                            value={contents}
                            tools={[
                                [Bold, Strikethrough],
                                [Subscript, Superscript],
                                [AlignLeft, AlignCenter, AlignRight, AlignJustify],
                                [Indent, Outdent],
                                [OrderedList, UnorderedList],
                                [Undo, Redo],
                                [InsertImage],
                                FontName,
                                FormatBlock,
                            ]}
                            ref={editorRef}
                            defaultEditMode="div"
                            onChange={event => {
                                setContents(event.html);
                            }}
                            style={{ width: "100%", height: "100%" }}
                        />
                    </S.ModalInputBox>
                    <S.ModalBtnContainer>
                        <S.CloseBtn onClick={onClose}>??????</S.CloseBtn>
                        <S.SaveBtn onClick={onClickRevision}>??????</S.SaveBtn>
                    </S.ModalBtnContainer>
                </S.ModalContentWrap>
            </S.Inner>
        </S.Block>
    );
};
