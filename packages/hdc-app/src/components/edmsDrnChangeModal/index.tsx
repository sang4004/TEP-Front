/******************************************************************************
 * projecttreemodal/index.tsx
 * hooks :
 * useLocations
 *
 ******************************************************************************/
// Library
import React, { useRef } from "react"; // default hooks
import { Editor, EditorTools } from '@progress/kendo-react-editor';
//
// Module
import * as S from "./styled";
// import './styled.css';
import Close from "@material-ui/icons/Close";
import { useDispatch } from "react-redux";

export type edmsDrnChangeModalProps = {
    style ?: object;
    visible : boolean;
    onClose : ()=>void;
}
interface FinaledmsDrnChangeModalProps extends edmsDrnChangeModalProps {};

const {
    Bold, Strikethrough, Subscript, Superscript,
    AlignLeft, AlignCenter, AlignRight, AlignJustify,
    Indent, Outdent, OrderedList, UnorderedList,
    Undo, Redo, FontName, FormatBlock,
    InsertImage,
} = EditorTools;

export const EdmsDrnChangeModal : React.FunctionComponent<FinaledmsDrnChangeModalProps> = ( props )=>{
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
                    <S.HeaderTitle>문서 진행상태 변경</S.HeaderTitle>
                    <S.ModalCloseBtn onClick={onClose}>
                        <Close fontSize="large"/>
                    </S.ModalCloseBtn>
                </S.ModalHeader>

                <S.ModalContentWrap>
                    <S.ModalContentComment>문서단계 변경을 진행하시겠습니까?</S.ModalContentComment>
                    <S.ModalContentInnerBox>
                        <S.ModalContentRow>
                            <S.ModalContentTitle>카테고리 명</S.ModalContentTitle>
                            <S.ModalContentInfo>DRN</S.ModalContentInfo>
                        </S.ModalContentRow>
                        <S.ModalContentRow>
                            <S.ModalContentTitle>사번</S.ModalContentTitle>
                            <S.ModalContentInfo>이수명 사원</S.ModalContentInfo>
                        </S.ModalContentRow>
                        <S.ModalContentRow>
                            <S.ModalContentTitle>조회일</S.ModalContentTitle>
                            <S.ModalContentInfo>2021-04-23</S.ModalContentInfo>
                        </S.ModalContentRow>
                        <S.ModalContentRow>
                            <S.ModalContentTitle>사용자 진행 상태</S.ModalContentTitle>
                            <S.ModalContentInfo>
                                <S.InputSelect
                                    disableUnderline
                                    value="읽기 전"
                                >
                                    <S.InputSelectItem value="읽기 전">읽기 전</S.InputSelectItem>
                                    <S.InputSelectItem value="확인함">확인함</S.InputSelectItem>
                                    <S.InputSelectItem value="검토완료">검토완료</S.InputSelectItem>
                                </S.InputSelect>
                            </S.ModalContentInfo>
                        </S.ModalContentRow>
                    </S.ModalContentInnerBox>

                    <S.ModalBtnContainer>
                        <S.CloseBtn onClick={onClose}>닫기</S.CloseBtn>
                        <S.SaveBtn>저장</S.SaveBtn>
                    </S.ModalBtnContainer>
                </S.ModalContentWrap>
            </S.Inner>
        </S.Block>

    );
}