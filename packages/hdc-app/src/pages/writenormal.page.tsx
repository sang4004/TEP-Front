/******************************************************************************
 * appwrapper/index.tsx
 * hooks :
 * useLocations
 *
 ******************************************************************************/
// Library
import React, { useState, useEffect, useContext, useRef, ChangeEvent } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"; // redux
import { WebEditorComponent } from "components";
import { EditorComp } from "../components";
import MenuItem from "@material-ui/core/MenuItem";
import Chip from "@material-ui/core/Chip";
//
// Module
import * as S from "../styled/writenormal.styled";
import { useLocations } from "hooks"; // locations hooks
import { reducerState } from "../common";
import {
    UploadAttachGeneralDocFile,
    DeleteAttachGeneralDocFile,
    SetGeneralDoc,
    SendGeneralDoc,
    DeactiveModal,
    SetGeneralDocRecv,
    SetGeneralDocReferer,
    GetGeneralDoc,
    DeleteGeneralDoc,
    RequestGeneralDoc,
    NewGeneralDoc,
} from "../common/action";
import {
    SignFormRecverSelectComp,
    GeneralDocumentMenuComponent,
    GeneralDocumentSideMenuComponent,
} from "../components";
import { LoadingIndicatorComponent, ModalInfo } from "components";
import { getMoment } from "../common/utils";
const moment = getMoment();
//
import ClipSvg from "../images/fontawsomeicon/paperclip-solid.svg";
import CloseSvg from "../images/fontawsomeicon/close-icon.svg";
import { GeneralDocType } from "../components/generaldoctype";

type paramTypes = {
    id?: string;
};

const WriteNormal = (props: any) => {
    const dispatch = useDispatch();
    const { pushHistory, back, path } = useLocations();
    const dsSelector = useSelector((state: reducerState) => state.digitalsign);
    const userSelector = useSelector((state: reducerState) => state.user);
    const { id } = useParams<paramTypes>();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isAllvisible, setIsAllVisible] = useState<boolean>(false);
    const [data, setData] = useState<any>();
    const [docType, setDocType] = useState<object[]>([]);
    const [sender, setSender] = useState<string>("");
    const [writer, setWriter] = useState<string>("");
    const [wirteDay, setWriteDay] = useState<Date>();
    const [fileNames, setFileNames] = useState<object[]>([]);
    const [fileInput, setFileInput] = useState<HTMLInputElement | null>(null);
    const [visibleFormType, setVisibleFormType] = useState<boolean>(false);
    const [visibleFormTypeEdit, setVisibleFormTypeEdit] = useState<boolean>(false);
    const [visibleFormRecv, setVisibleFormRecv] = useState<boolean>(false);
    const [visibleFormRef, setVisibleFormRef] = useState<boolean>(false);
    const [title, setTitle] = useState<string>("");
    const [docNo, setDocNo] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [webcontent, setWebContent] = useState<string>("");

    //결재 기능 추가
    const [signLineList, setSignLineList] = useState<object[]>([]);
    //
    const [selectedDocType, setSelectedDocType] = useState<number>(-1);
    const [selectedDocCodeFile, setSelectedDocCodeFile] = useState<any>();
    const [selectedReply, setSelectedReply] = useState<number>(-1);

    const [selectedRecvList, setSelectedRecvList] = useState<number[]>([]);
    const [selectedReferList, setSelectedReferList] = useState<number[]>([]);

    const [recvList, setRecvList] = useState<object[]>([]);
    const [referList, setReferList] = useState<object[]>([]);

    const [isNewEditor, setIsNewEditor] = useState<boolean>(false);

    useEffect(() => {
        if (id && typeof parseInt(id) == "number") {
            setWriter("");
            setWriteDay(new Date());
            setTitle("");
            setContent("");
            setWebContent("");
            setSelectedDocType(-1);
            setDocNo("");
            setSender("");
            setSelectedReply(-1);
            setSignLineList([]);
            dispatch(GetGeneralDoc(id));
            // dev - 일반문서 id 300 번 이후부터는 신규 에디터
            if (parseInt(id) > 300) setIsNewEditor(true);
            else setIsNewEditor(false);
        } else if (dsSelector.gDoc_data == undefined) {
            setIsNewEditor(true);
            // location.href="/";
        }
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);

    useEffect(() => {
        if (dsSelector.gDoc_user_list) {
            let recvs = dsSelector.gDoc_user_list;
            setRecvList([...recvs]);
            setReferList([...recvs]);
        }
    }, [dsSelector.gDoc_user_list]);

    useEffect(() => {
        if (dsSelector.gDoc_codes) {
            setDocType([...dsSelector.gDoc_codes]);
            let _filtered = dsSelector.gDoc_codes.filter((raw: any) => raw.id == selectedDocType);
            if (_filtered.length > 0) setSelectedDocCodeFile(_filtered[0].file);
        }
    }, [dsSelector.gDoc_codes]);

    useEffect(() => {
        if (dsSelector.gDoc_data) {
            let data = dsSelector.gDoc_data;
            setWriter(data.username);
            setWriteDay(moment(data.created_at).toDate());
            setTitle(data.title);
            setContent(data.content);
            setWebContent(data.content);
            setSelectedDocType(data.code_id);
            setDocNo(data.code_no);
            setSender(data.sender);
            setSelectedReply(data.reply);
            setIsAllVisible(true);
        }
    }, [dsSelector.gDoc_data]);

    useEffect(() => {
        let _list = [];
        _list.push({
            writer: writer,
            writeday: moment(wirteDay).format(`yyyy-MM-DD HH:mm`),
            title: title,
            content: webcontent != "" ? webcontent : content,
            doctype: docType.map((val: any, idx) => {
                if (val.id == selectedDocType) return val.text;
            }),
            docno: docNo,
            sender: sender,
            reply: selectedReply == 0 ? `Yes` : `No`,
            files: fileNames,
            recv: selectedRecvList,
            ref: selectedReferList,
            recvlist: recvList,
        });
        setData(_list[0]);
    }, [writer, wirteDay, title, webcontent, selectedDocType, docNo, sender, selectedReply]);

    useEffect(() => {
        if (dsSelector.gDoc_recv) {
            setSelectedRecvList([...dsSelector.gDoc_recv.map((raw: any) => raw.user_id)]);
        }
    }, [dsSelector.gDoc_recv]);

    useEffect(() => {
        if (dsSelector.gDoc_referer) {
            setSelectedReferList([...dsSelector.gDoc_referer.map((raw: any) => raw.user_id)]);
        }
    }, [dsSelector.gDoc_referer]);

    useEffect(() => {
        if (dsSelector.set_general_doc_fin) {
            dispatch(DeactiveModal());
            setTimeout(() => {
                setIsLoading(false);
                ModalInfo("임시저장 완료.");
                if (id) back();
                else pushHistory("/fbtemporary");
            }, 1500);
        }
    }, [dsSelector.set_general_doc_fin]);

    useEffect(() => {
        if (dsSelector.request_general_doc_fin) {
            dispatch(DeactiveModal());
            setTimeout(() => {
                setIsLoading(false);
                ModalInfo("결재요청 완료.");
                pushHistory("/dsrequest");
            }, 1500);
        }
    }, [dsSelector.request_general_doc_fin]);

    useEffect(() => {
        if (dsSelector.delete_general_doc_fin) {
            dispatch(DeactiveModal());
            setTimeout(() => {
                setIsLoading(false);
                ModalInfo("작성 취소.");
            }, 1500);
        }
    }, [dsSelector.delete_general_doc_fin]);

    useEffect(() => {
        if (dsSelector.gDoc_files) {
            setFileNames([...dsSelector.gDoc_files]);
        }
    }, [dsSelector.gDoc_files]);

    useEffect(() => {
        if (dsSelector.gDoc_codes && selectedDocType != undefined) {
            let _filtered = dsSelector.gDoc_codes.filter((raw: any) => raw.id == selectedDocType);
            if (_filtered.length > 0) setSelectedDocCodeFile(_filtered[0].file);
        }
    }, [selectedDocType]);

    const onChangeDocType = async (id: number) => {
        if (selectedDocType == -1) {
            setIsLoading(true);
            setSelectedRecvList([]);
            setSelectedReferList([]);
            await dispatch(NewGeneralDoc(id));
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
            setIsAllVisible(true);
        }
        setSelectedDocType(id);
    };

    const getRecvText = (id: number) => {
        let _list: any = recvList.filter((obj: any) => obj.id == id)[0];
        return _list ? _list.position + " " + _list.username : "";
    };

    const handleDelete = (idx: number, type: number) => {
        if (type == 0) {
        } else if (type == 1) {
            selectedReferList.splice(idx, 1);
            setSelectedReferList([...selectedReferList]);
            dispatch(SetGeneralDocReferer(dsSelector.gDoc_data.id, selectedReferList));
        } else if (type == 2) {
            selectedRecvList.splice(selectedRecvList.indexOf(idx), 1);
            dispatch(SetGeneralDocRecv(dsSelector.gDoc_data.id, selectedRecvList));
            setSelectedRecvList([...selectedRecvList]);
        }
    };

    const handleDateChange = (date: any) => {
        setWriteDay(date);
    };

    const handleUploadClick = (event: any) => {
        var files = event.target.files;
        if (files) dispatch(UploadAttachGeneralDocFile(files, dsSelector.gDoc_data.id));
    };

    const onClickUploadFile = () => {
        if (fileInput) fileInput.click();
    };

    const onClickDeleteFile = (key: number, idx: number) => {
        fileNames.splice(idx, 1);
        setFileNames([...fileNames]);
        dispatch(DeleteAttachGeneralDocFile(key));
    };

    const onClickTempSave = async () => {
        if (dsSelector.gDoc_data && dsSelector.gDoc_data.id) {
            setIsLoading(true);
            await dispatch(
                SetGeneralDoc(
                    dsSelector.gDoc_data.id,
                    title,
                    webcontent,
                    selectedDocType,
                    docNo,
                    sender,
                    selectedReply
                )
            );
        }
    };

    const onClickCancel = async () => {
        let res = confirm("작성을 취소하시겠습니까?");
        if (res && dsSelector.gDoc_data && dsSelector.gDoc_data.id) {
            setIsLoading(true);
            await dispatch(DeleteGeneralDoc(dsSelector.gDoc_data.id));
            ModalInfo("작성 취소.");
            pushHistory("/dshome");
        }
    };
    // 결재요청
    const onClickRequestDocument = async () => {
        if (selectedDocType == -1) return ModalInfo("문서 구분을 선택해주세요.");
        if (title == "" && title.length == 0) return ModalInfo("제목을 작성해주세요.");
        if (sender == "" && sender.length == 0) return ModalInfo("발신을 작성해주세요.");
        if (webcontent == "" && webcontent.length == 0) return ModalInfo("내용을 작성해주세요.");

        //결제진행
        // if(signLineList.length > 1){
        setIsLoading(true);
        if (dsSelector.gDoc_data && dsSelector.gDoc_data.id) {
            await dispatch(
                RequestGeneralDoc(
                    dsSelector.gDoc_data.id,
                    title,
                    webcontent,
                    selectedDocType,
                    docNo,
                    sender,
                    selectedReply
                )
            );
        }

        setTimeout(() => {
            if (isLoading) {
                setIsLoading(false);
                ModalInfo("오류가 발생했습니다.\n잠시 후에 다시 시도해주세요.");
            }
        }, 5000);
        // }
    };

    // 발신
    const onClickSendDocument = async () => {
        await dispatch(SendGeneralDoc(dsSelector.gDoc_data.id));
    };

    const onCompleteSelectRecvList = (list: number[]) => {
        setSelectedRecvList(list);
        dispatch(SetGeneralDocRecv(dsSelector.gDoc_data.id, list));
    };

    const onCompleteSelectRefererList = (list: number[]) => {
        setSelectedReferList(list);
        dispatch(SetGeneralDocReferer(dsSelector.gDoc_data.id, list));
    };

    return (
        <S.Block>
            <LoadingIndicatorComponent open={isLoading} />
            <GeneralDocType
                visible={visibleFormType}
                onClose={() => setVisibleFormType(false)}
                title={"문서구분 추가"}
            />
            <GeneralDocType
                visible={visibleFormTypeEdit}
                onClose={() => setVisibleFormTypeEdit(false)}
                title={"문서구분 수정"}
                isEdit
                editType={docType.filter((raw: any, idx) => raw.id == selectedDocType)[0]}
            />
            <SignFormRecverSelectComp
                title="수신 선택"
                visible={visibleFormRecv}
                recvlist={recvList}
                selected={selectedRecvList}
                onClose={() => setVisibleFormRecv(false)}
                onComplete={onCompleteSelectRecvList}
            />
            <SignFormRecverSelectComp
                title="참조 선택"
                visible={visibleFormRef}
                recvlist={referList}
                selected={selectedReferList}
                onClose={() => setVisibleFormRef(false)}
                onComplete={onCompleteSelectRefererList}
            />
            <S.Bg $isMain={true}>
                <S.EnterTop>
                    <GeneralDocumentMenuComponent
                        data={data}
                        onClickSign={onClickRequestDocument}
                        onClickCancel={onClickCancel}
                        onClickTemporarySave={onClickTempSave}
                        onChangeSignLine={(lines: object[]) => setSignLineList(lines)}
                        activeRequestSign
                        activeSignInfo
                        activeTempSave
                        activeCancel
                        activePDF
                        isEditMode
                        class_name="form_container"
                    />
                </S.EnterTop>
                <S.Inner className="form_container">
                    <S.Row>
                        <S.Title>문서구분</S.Title>
                        <S.RadioDiv>
                            {docType.map((value: any, idx: number) => (
                                <S.RadioText key={idx}>
                                    <S.Radio
                                        onChange={() => onChangeDocType(value.id)}
                                        checked={selectedDocType == value.id}
                                    />
                                    {value.text}
                                </S.RadioText>
                            ))}
                        </S.RadioDiv>
                        {userSelector.admin_level == 1 && (
                            <>
                                <S.AddButton
                                    style={{ fontSize: "1em" }}
                                    onClick={() => setVisibleFormType(true)}
                                >
                                    구분
                                    <br />
                                    추가
                                </S.AddButton>
                                <S.AddButton
                                    style={{ fontSize: "1em" }}
                                    onClick={() => setVisibleFormTypeEdit(true)}
                                >
                                    구분
                                    <br />
                                    수정
                                </S.AddButton>
                            </>
                        )}
                    </S.Row>
                    <S.Row>
                        <S.Title>문서번호</S.Title>
                        <S.Textfield
                            type={"tel"}
                            value={docNo}
                            onChange={e => setDocNo(e.target.value)}
                            InputProps={{
                                disableUnderline: true,
                                readOnly: !isAllvisible,
                            }}
                            inputProps={{
                                style: {
                                    height: "100%",
                                },
                            }}
                        />
                    </S.Row>
                    <S.Row>
                        <S.Title>작성자</S.Title>
                        <S.Textfield
                            value={writer}
                            // disabled
                            onChange={e => setWriter(e.target.value)}
                            InputProps={{
                                disableUnderline: true,
                                readOnly: true,
                                style: { fontSize: `1em`, textAlign: `left` },
                            }}
                        />
                        <S.Title>작성일자</S.Title>
                        <S.Date
                            disableToolbar
                            variant="inline"
                            format="yyyy-MM-DD"
                            id="date-picker-inline"
                            value={wirteDay}
                            disabled
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                "aria-label": "change date",
                            }}
                            InputProps={{
                                disableUnderline: true,
                                readOnly: !isAllvisible,
                                style: { fontSize: `1em`, textAlign: `center`, color: `black` },
                            }}
                        />
                    </S.Row>
                    <S.Row>
                        <S.Title>발신</S.Title>
                        <S.Textfield
                            value={sender}
                            onChange={e => setSender(e.target.value)}
                            InputProps={{
                                disableUnderline: true,
                                readOnly: !isAllvisible,
                            }}
                            inputProps={{
                                style: {
                                    height: "100%",
                                },
                            }}
                        />
                    </S.Row>
                    <S.Row>
                        <S.Title>수신</S.Title>
                        <S.DocContent>
                            {selectedRecvList.map((id: number, idx: number) => {
                                return (
                                    <S.DocChip key={idx}>
                                        <Chip
                                            variant={"outlined"}
                                            label={getRecvText(id)}
                                            onDelete={() => handleDelete(id, 2)}
                                        />
                                    </S.DocChip>
                                );
                            })}
                        </S.DocContent>
                        {isAllvisible && (
                            <S.AddButton onClick={() => setVisibleFormRecv(true)}>+</S.AddButton>
                        )}
                    </S.Row>
                    <S.Row>
                        <S.Title>참조</S.Title>
                        <S.DocContent>
                            {selectedReferList.map((id: number, idx: number) => {
                                return (
                                    <S.DocChip key={idx}>
                                        <Chip
                                            variant={"outlined"}
                                            label={getRecvText(id)}
                                            onDelete={() => handleDelete(idx, 1)}
                                        />
                                    </S.DocChip>
                                );
                            })}
                        </S.DocContent>
                        {isAllvisible && (
                            <S.AddButton onClick={() => setVisibleFormRef(true)}>+</S.AddButton>
                        )}
                    </S.Row>
                    <S.Row>
                        <S.Title>제목</S.Title>
                        <S.Textfield
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            InputProps={{
                                disableUnderline: true,
                                readOnly: !isAllvisible,
                            }}
                            inputProps={{
                                style: {
                                    height: "100%",
                                },
                            }}
                        />
                    </S.Row>
                    <S.Row>
                        <S.Title>내용</S.Title>
                        {isNewEditor ? (
                            <EditorComp
                                edit
                                content={content}
                                onChangeContent={html => {
                                    setWebContent(html);
                                }}
                                height={500}
                            />
                        ) : (
                            <WebEditorComponent
                                onChangeContent={html => setWebContent(html)}
                                content={content}
                                wrapstyle={{
                                    flex: 1,
                                    height: "100%",
                                }}
                                contentStyle={{
                                    height: "450px",
                                }}
                                editdisabled={!isAllvisible}
                            />
                        )}
                    </S.Row>
                    {selectedDocCodeFile && (
                        <S.Row>
                            <S.Title>기본파일</S.Title>
                            <S.FileList>
                                <div>
                                    <S.FileClip src={ClipSvg} />
                                    <a
                                        href={selectedDocCodeFile.url}
                                        download={selectedDocCodeFile.filename}
                                    >
                                        {selectedDocCodeFile.filename}
                                    </a>
                                </div>
                            </S.FileList>
                        </S.Row>
                    )}
                    <S.Row>
                        <S.Title>첨부파일</S.Title>
                        <S.FileList>
                            {fileNames?.length > 0 &&
                                fileNames.map((raw: any, idx) => {
                                    if (raw.filename.indexOf(".pdf") == -1)
                                        return (
                                            <div key={idx}>
                                                <S.FileClip src={ClipSvg} />
                                                <a href={raw.url} download={raw.filename}>
                                                    {raw.filename}
                                                </a>
                                                <S.FileDelete
                                                    src={CloseSvg}
                                                    onClick={() => onClickDeleteFile(raw.id, idx)}
                                                />
                                            </div>
                                        );
                                    return (
                                        <div key={idx}>
                                            <S.FileClip src={ClipSvg} />
                                            <a href={raw.url} target={"_blank"}>
                                                {raw.filename}
                                            </a>
                                            <S.FileDelete
                                                src={CloseSvg}
                                                onClick={() => onClickDeleteFile(raw.id, idx)}
                                            />
                                        </div>
                                    );
                                })}
                            <input
                                multiple
                                accept="*"
                                id="contained-button-file"
                                type="file"
                                style={{ display: "none" }}
                                onChange={handleUploadClick}
                                ref={ref => setFileInput(ref)}
                                onClick={(event: any) => {
                                    event.target.value = null;
                                }}
                            />
                        </S.FileList>
                        {isAllvisible && (
                            <S.AddButton onClick={() => onClickUploadFile()}>+</S.AddButton>
                        )}
                    </S.Row>
                    <S.Row>
                        <S.Title>회신필요여부</S.Title>
                        <S.RadioDiv>
                            <S.RadioText>
                                <S.Radio
                                    onChange={() => {
                                        isAllvisible ? setSelectedReply(0) : null;
                                    }}
                                    value={0}
                                    checked={selectedReply == 0}
                                />
                                Yes
                            </S.RadioText>
                            <S.RadioText>
                                <S.Radio
                                    onChange={() => {
                                        isAllvisible ? setSelectedReply(1) : null;
                                    }}
                                    value={1}
                                    checked={selectedReply == 1}
                                />
                                No
                            </S.RadioText>
                        </S.RadioDiv>
                    </S.Row>
                    {/* <S.SubmitDiv>
                        <S.SubmitBtn onClick={onClickTempSave}>임시저장</S.SubmitBtn>
                        <S.SubmitBtn onClick={onClickSendDocument}>문서발송</S.SubmitBtn>
                    </S.SubmitDiv> */}
                </S.Inner>
            </S.Bg>
            <S.Bg $isMain={false}>
                <GeneralDocumentSideMenuComponent
                    signLines={signLineList}
                    signRefers={[]}
                    isRequested
                />
            </S.Bg>
        </S.Block>
    );
};

export default WriteNormal;
