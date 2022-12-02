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
import React, { useRef } from "react"; // default hooks
import { Editor, EditorTools } from '@progress/kendo-react-editor';
//
// Module
import * as S from "./styled";
import Close from "@material-ui/icons/Close";
import { useDispatch } from "react-redux";

export type edmsDinApprovalModalProps = {
    style ?: object;
    visible : boolean;
    onClose : ()=>void;
}
interface FinaledmsDinApprovalModalProps extends edmsDinApprovalModalProps {};

const {
    Bold, Strikethrough, Subscript, Superscript,
    AlignLeft, AlignCenter, AlignRight, AlignJustify,
    Indent, Outdent, OrderedList, UnorderedList,
    Undo, Redo, FontName, FormatBlock,
    InsertImage,
} = EditorTools;

export const EdmsDinApprovalModal : React.FunctionComponent<FinaledmsDinApprovalModalProps> = ( props )=>{
    const dispatch = useDispatch();
    const editorRef = useRef(null);

    const onClose = ()=>{
        props.onClose()
    }

    return (
        <S.Block
            open={props.visible ? true : false}
            onClose={props.onClose}
        >
            <S.Inner>
                <S.ModalHeader>
                    <S.HeaderTitle>새 문서배포 추가</S.HeaderTitle>
                    <S.ModalCloseBtn onClick={onClose}>
                        <Close fontSize="large"/>
                    </S.ModalCloseBtn>
                </S.ModalHeader>

                <S.ModalContentWrap>
                    <S.ModalInputWrap>

                        <S.ModalInputBox>
                            <S.InputTitle>배포 유형</S.InputTitle>
                            <S.InputSelect
                                disableUnderline
                            >
                                <S.InputSelectItem value="배포 유형 선택">배포 유형 선택</S.InputSelectItem>
                            </S.InputSelect>
                        </S.ModalInputBox>

                        <S.ModalInputBox>
                            <S.InputTitle>승인자</S.InputTitle>
                            <S.InputSelect
                                disableUnderline
                            >
                                <S.InputSelectItem value="승인자 선택">승인자 선택</S.InputSelectItem>
                            </S.InputSelect>
                        </S.ModalInputBox>

                        <S.ModalInputBox $boxType="long">
                            <S.InputTitle $boxType="wide">전달 명</S.InputTitle>
                            <S.Input $boxType="wide" />
                        </S.ModalInputBox>


                        <S.ModalInputBox $boxType="long">
                            <S.InputTitle $boxType="wide">상세설명</S.InputTitle>
                            <S.Input $boxType="wide" />
                        </S.ModalInputBox>

                        <S.ModalInputBox $boxType="long">
                            <S.InputTitle $boxType="wide">참조(회신) 대상</S.InputTitle>
                            <S.Input $boxType="wide" />
                        </S.ModalInputBox>

                        <S.ModalInputBox>
                            <S.InputTitle>요청일</S.InputTitle>
                            <S.Input type="date"/>
                        </S.ModalInputBox>

                        <S.ModalInputBox>
                            <S.InputTitle>기한일</S.InputTitle>
                            <S.Input type="date"/>
                        </S.ModalInputBox>

                    </S.ModalInputWrap>

                    <S.ModalBtnContainer>
                        <S.CloseBtn onClick={onClose}>닫기</S.CloseBtn>
                        <S.SaveBtn>저장</S.SaveBtn>
                    </S.ModalBtnContainer>
                </S.ModalContentWrap>
            </S.Inner>
        </S.Block>
    );
}