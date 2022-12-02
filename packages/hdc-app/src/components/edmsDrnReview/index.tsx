/******************************************************************************
 * Copyright (c) 2021. Moornmo Inc. Rights reserved.                          *
 * Data modelings and methods used are assets of Moornmo Inc.                 *
 * appwrapper/index.tsx
 * hooks :
 * useLocations
 *
 * last modify : jh.jeong@ilts.co.kr
 ******************************************************************************/
// Library
import { useSelector, useDispatch } from "react-redux"; // redux
import React, { useState, useEffect, useRef } from "react"; // default hooks
//
// Module
import * as S from "./styled";
import { reducerState } from "../../common";
import { getMoment } from "../../common/utils";
import { Editor, EditorTools } from "@progress/kendo-react-editor";
import {
    PasswordCheck,
    CreateDrnComment,
    UploadEdmsWorkAttachFile,
    CreateDrnReply,
} from "../../common/action";
//
import Close from "@material-ui/icons/Close";
import FileIconSvg from "../../images/fontawsomeicon/paperclip-solid.svg";
import { ModalInfo, LoadingIndicatorComponent } from "components";

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

const code_list = ["Code 1", "Code 2", "Code 3", "Code 4"];

export type DrnReviewProps = {
    drnDetail: any;
    comment: any;
    isReply: boolean;
    visible: boolean;
    onClose: () => void;
};

interface FinalDrnReviewProps extends DrnReviewProps {}

export const EdmsDrnReview: React.FunctionComponent<FinalDrnReviewProps> = props => {
    const dispatch = useDispatch();
    const editorRef = useRef(null);
    const userSelector = useSelector((state: reducerState) => state.user);
    const drnSelector = useSelector((state: reducerState) => state.drn);
    const workSelector = useSelector((state: reducerState) => state.work);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [code, setCode] = useState<number>(-1);

    const [files, setFiles] = useState<any[]>([]);
    const [fileInput, setFileInput] = useState<HTMLInputElement | null>(null);

    const [comment, setComment] = useState<string>("");
    const [review, setReview] = useState<string>("");
    const [isChangedDesign, setIsChangedDesign] = useState<boolean>(false);
    const [sheetPageNo, setSheetPageNo] = useState<string>("");

    useEffect(() => {
        if (workSelector.edms_work_attach_file) {
            setFiles(workSelector.edms_work_attach_file);
        }
    }, [workSelector.edms_work_attach_file]);

    useEffect(() => {
        if (props.comment && props.comment.contents) {
            setComment(props.comment.contents);
        }
    }, [props.comment]);

    const onClickConfirm = async () => {
        if (props.isReply) {
            setIsLoading(true);
            await dispatch(CreateDrnReply(files, props.comment.wr_idx, review));
            setTimeout(() => {
                setIsLoading(false);
                ModalInfo("답변이 등록되었습니다.");
                onCloseModal();
            }, 2000);
        } else {
            if (code == -1) return ModalInfo("코드를 선택해주세요.");
            setIsLoading(true);
            await dispatch(
                CreateDrnComment(
                    props.drnDetail.wp_idx,
                    "WOR",
                    comment,
                    userSelector.username,
                    userSelector.edms_user_id,
                    code + 1,
                    sheetPageNo,
                    isChangedDesign,
                    files
                )
            );
            setTimeout(() => {
                setIsLoading(false);
            }, 2000);
        }
    };

    useEffect(() => {
        if (drnSelector.create_drn_comment != undefined) {
            setTimeout(() => {
                ModalInfo("리뷰 등록이 완료되었습니다.");
                onCloseModal();
            }, 2000);
        }
    }, [drnSelector.create_drn_comment]);

    const onCloseModal = () => {
        setCode(-1);
        setFiles([]);
        setReview("");
        setComment("");
        setFileInput(null);
        props.onClose();
    };

    const onClickUploadFile = () => {
        if (fileInput) fileInput.click();
    };

    const handleUploadClick = async (event: any) => {
        var files = event.target.files;
        if (files) {
            dispatch(UploadEdmsWorkAttachFile(files));
        }
    };

    const handleChange = (e: any) => {
        setCode(e.target.value);
    };

    const ReviweSave = async () => {
        let Desaign = isChangedDesign.toString();
        let Code = code.toString();

        window.localStorage.setItem("comment", comment);
        window.localStorage.setItem("isChangedDesign", Desaign);
        window.localStorage.setItem("sheetPageNo", sheetPageNo);
        window.localStorage.setItem("code", Code);
        ModalInfo("리뷰가 저장 되었습니다.");
    };

    const ReviweImport = async () => {
        let comment = window.localStorage.getItem("comment");
        let isChangedDesign = window.localStorage.getItem("isChangedDesign");
        let sheetPageNo = window.localStorage.getItem("sheetPageNo");
        let code = window.localStorage.getItem("code");

        setComment(comment != null ? comment : "");
        setIsChangedDesign(isChangedDesign == "true" && isChangedDesign != null ? true : false);
        setSheetPageNo(sheetPageNo != null ? sheetPageNo : "");
        setCode(code != null ? parseInt(code) : -1);
        ModalInfo("저장된 리뷰를 불러왔습니다.");
    };

    return (
        <>
            <S.Block open={props.visible ? true : false} onClose={props.onClose}>
                <S.Inner $isReply={props.isReply}>
                    <LoadingIndicatorComponent open={isLoading} />
                    <S.ButtonDiv>
                        <S.SaveBtn onClick={ReviweSave}>임시저장</S.SaveBtn>
                        <S.UpdateBtn onClick={ReviweImport}>불러오기</S.UpdateBtn>
                    </S.ButtonDiv>
                    <S.CloseBtn onClick={onCloseModal}>
                        <Close style={{ fontSize: "1.6em" }} />
                    </S.CloseBtn>
                    <S.TopTextBlock>
                        <S.TopBlock>
                            <S.TopBlockText1>{props.isReply ? `Reply` : `Review`}</S.TopBlockText1>
                        </S.TopBlock>
                        <S.CommentBlock>
                            {props.isReply ? (
                                <>
                                    <S.TopBlockText2>Review Comment</S.TopBlockText2>
                                    <Editor
                                        value={comment}
                                        style={{
                                            width: "80%",
                                            height: "80%",
                                            margin: "20px 0",
                                        }}
                                    />
                                    <S.TopBlockText2>Review Reply</S.TopBlockText2>
                                    <Editor
                                        value={review}
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
                                            setReview(event.html);
                                        }}
                                        style={{
                                            width: "80%",
                                            height: "100%",
                                            marginTop: "20px",
                                        }}
                                    />
                                </>
                            ) : (
                                <>
                                    <Editor
                                        value={comment}
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
                                            setComment(event.html);
                                        }}
                                        style={{
                                            width: "80%",
                                            height: "100%",
                                            marginTop: "20px",
                                        }}
                                    />
                                </>
                            )}
                        </S.CommentBlock>
                        {!props.isReply && (
                            <>
                                <S.ContentBlock>
                                    <S.TopBlockText2>Page/Sheet</S.TopBlockText2>
                                    <S.PageSheetNoDiv>
                                        <S.PageSheetNoInput
                                            inputProps={{
                                                style: {
                                                    textAlign: "center",
                                                    borderRadius: "5px",
                                                },
                                            }}
                                            InputProps={{
                                                disableUnderline: true,
                                                style: { fontSize: "1.25em", color: "#000000" },
                                            }}
                                            type="number"
                                            value={sheetPageNo}
                                            onChange={e => setSheetPageNo(e.target.value)}
                                            variant="standard"
                                        />
                                    </S.PageSheetNoDiv>
                                </S.ContentBlock>
                                <S.TopBlockText2>설계성과물 해당여부</S.TopBlockText2>
                                <S.ApproveBlock>
                                    <S.CheckboxBlockIn
                                        checked={isChangedDesign == true}
                                        onChange={() => setIsChangedDesign(!isChangedDesign)}
                                    />
                                    Y
                                    <S.CheckboxBlockIn
                                        checked={isChangedDesign == false}
                                        onChange={() => setIsChangedDesign(!isChangedDesign)}
                                    />
                                    N
                                </S.ApproveBlock>

                                <S.ContentBlock>
                                    <S.TopBlockText2>코드를 선택해주세요 (필수)</S.TopBlockText2>
                                    <S.SelectBox
                                        value={code}
                                        onChange={handleChange}
                                        disableUnderline
                                    >
                                        {code_list.map((raw, idx) => {
                                            return (
                                                <S.Item key={"code" + idx} value={idx}>
                                                    {raw}
                                                </S.Item>
                                            );
                                        })}
                                    </S.SelectBox>
                                </S.ContentBlock>
                            </>
                        )}
                        <S.ContentBlock>
                            <S.TopBlockText2>첨부파일을 등록해 주세요</S.TopBlockText2>
                            <input
                                accept="*"
                                id="contained-button-file"
                                type="file"
                                multiple
                                style={{ display: "none" }}
                                onChange={handleUploadClick}
                                ref={ref => setFileInput(ref)}
                            />
                            <S.FileInputDiv>
                                {files && files.length > 0 && <S.FileIcon src={FileIconSvg} />}
                                <S.FileInput
                                    InputProps={{
                                        disableUnderline: true,
                                        style: { height: "100%" },
                                    }}
                                    variant="standard"
                                    value={
                                        files.length > 0
                                            ? files.map((raw: any, idx: number) => {
                                                  return raw.originalname;
                                              })
                                            : ``
                                    }
                                />
                                <S.AddFileBtn onClick={onClickUploadFile}>파일선택</S.AddFileBtn>
                            </S.FileInputDiv>
                        </S.ContentBlock>
                    </S.TopTextBlock>
                    <S.BtmBtn onClick={onClickConfirm}>확인</S.BtmBtn>
                </S.Inner>
            </S.Block>
        </>
    );
};
