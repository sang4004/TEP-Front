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
import { CreateDrnComment, GetDrnCommentList } from "../../common/action";

export type edmsCommentModalProps = {
    style?: object;
    visible: boolean;
    onClose: () => void;
    wp_idx: string;
};
interface FinaledmsCommentModalProps extends edmsCommentModalProps {}

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

export const EdmsCommentModal: React.FunctionComponent<FinaledmsCommentModalProps> = props => {
    const dispatch = useDispatch();
    const editorRef = useRef(null);
    const userSelector = useSelector((state: reducerState) => state.user);
    const workSelector = useSelector((state: reducerState) => state.work);
    const docuSelector = useSelector((state: reducerState) => state.document);
    const drnSelector = useSelector((state: reducerState) => state.drn);

    const [contents, setContents] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [userId, setUserId] = useState<number>(0);
    const [userName, setUserName] = useState<string>("");

    useEffect(() => {
        setUserId(userSelector.edms_user_id);
        setUserName(userSelector.username);
    }, []);

    useEffect(() => {
        if (drnSelector.create_drn_comment != undefined) {
            dispatch(GetDrnCommentList(props.wp_idx));
            setTimeout(() => {
                setIsLoading(false);
                ModalInfo("코멘트가 작성되었습니다.");
                props.onClose();
            }, 2000);
            setContents("");
        }
    }, [drnSelector.create_drn_comment]);

    const onClose = () => {
        props.onClose();
    };

    const onClickComment = async () => {
        if (contents.length == 0 || contents.length == 7) ModalInfo("내용을 입력해주세요.");

        setIsLoading(true);
        dispatch(CreateDrnComment(props.wp_idx, "WOR", contents, userName, userId));
    };
    return (
        <S.Block open={props.visible ? true : false} onClose={props.onClose}>
            <S.Inner>
                <LoadingIndicatorComponent open={isLoading} style={{ zIndex: 1301 }} />
                <S.ModalHeader>
                    <S.HeaderTitle>코멘트 작성</S.HeaderTitle>
                    <S.ModalCloseBtn onClick={onClose}>
                        <img src={closeSvg} />
                    </S.ModalCloseBtn>
                </S.ModalHeader>

                <S.ModalContentWrap>
                    <S.InputTitle $boxType="wide">코멘트 내용</S.InputTitle>

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
                        <S.CloseBtn onClick={onClose}>닫기</S.CloseBtn>
                        <S.SaveBtn onClick={onClickComment}>저장</S.SaveBtn>
                    </S.ModalBtnContainer>
                </S.ModalContentWrap>
            </S.Inner>
        </S.Block>
    );
};
