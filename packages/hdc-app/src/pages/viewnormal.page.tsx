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
import MenuItem from "@material-ui/core/MenuItem";
import Chip from "@material-ui/core/Chip";
//
// Module
import * as S from "../styled/writenormal.styled";
import { useLocations } from "hooks"; // locations hooks
import { reducerState } from "../common";
import {
    UploadAttachGeneralDocFile,
    SendGeneralDoc,
    DeactiveModal,
    GetGeneralDoc,
    CancelGeneralDoc,
    RejectGeneralDocSign,
    ReRequestGeneralDoc,
    ApprovalGeneralDocSign,
} from "../common/action";
import { LoadingIndicatorComponent, ModalInfo, WebEditorComponent } from "components";
import { getMoment } from "../common/utils";
import {
    GeneralDocumentMenuComponent,
    GeneralDocumentSideMenuComponent,
    ApprovalCertifyComp,
    ApprovalRejectComp,
    ApprovalCancelComp,
} from "../components";
const moment = getMoment();
//
import ClipSvg from "../images/fontawsomeicon/paperclip-solid.svg";
import CloseSvg from "../images/fontawsomeicon/close-icon.svg";

type paramTypes = {
    id?: string;
};

const ViewNormal = (props: any) => {
    const dispatch = useDispatch();
    const { pushHistory, back } = useLocations();
    const dsSelector = useSelector((state: reducerState) => state.digitalsign);
    const userSelector = useSelector((state: reducerState) => state.user);
    const orgSelector = useSelector((state: reducerState) => state.organization);
    const { id } = useParams<paramTypes>();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isNoPDF, setIsNoPDF] = useState<boolean>(false);
    const [data, setData] = useState<any>();
    const [docType, setDocType] = useState<object[]>([]);
    const [sender, setSender] = useState<string>("");
    const [writer, setWriter] = useState<string>("");
    const [wirteDay, setWriteDay] = useState<Date>();
    const [fileNames, setFileNames] = useState<object[]>([]);
    const [fileInput, setFileInput] = useState<HTMLInputElement | null>(null);
    const [title, setTitle] = useState<string>("");
    const [docNo, setDocNo] = useState<string>("");
    const [content, setContent] = useState<string>("");
    // 기존 결재 레이아웃 붙이기
    const [signLineList, setSignLineList] = useState<object[]>([]);
    const [certifyOpen, setCertifyOpen] = useState<boolean>(false);
    const [rejectOpen, setRejectOpen] = useState<boolean>(false);
    const [signCancel, setSignCancel] = useState<boolean>(false);
    const [commentOpen, setCommentOpen] = useState<boolean>(false);
    //
    const [selectedDocType, setSelectedDocType] = useState<number>(1);
    const [selectedReply, setSelectedReply] = useState<number>(0);

    const [selectedRecvList, setSelectedRecvList] = useState<number[]>([]);
    const [selectedReferList, setSelectedReferList] = useState<number[]>([]);

    const [recvList, setRecvList] = useState<object[]>([]);
    const [referList, setReferList] = useState<object[]>([]);

    const [isReadList, setIsReadList] = useState<number[]>([]);

    useEffect(() => {
        if (id && typeof parseInt(id) == "number") {
            dispatch(GetGeneralDoc(id));
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        } else {
            back();
        }
    }, []);

    useEffect(() => {
        if (dsSelector.send_general_doc_fin) {
            dispatch(DeactiveModal());
            setTimeout(() => {
                setIsLoading(false);
                ModalInfo("문서발송 완료.");
                pushHistory("/document/normalList/send");
            }, 1500);
        }
    }, [dsSelector.send_general_doc_fin]);

    useEffect(() => {
        if (dsSelector.reject_general_doc_fin) {
            dispatch(DeactiveModal());
            setTimeout(() => {
                setIsLoading(false);
                ModalInfo("결재 반려.");
                back();
            }, 2000);
        }
    }, [dsSelector.reject_general_doc_fin]);

    useEffect(() => {
        if (dsSelector.cancel_general_doc_fin) {
            dispatch(DeactiveModal());
            setTimeout(() => {
                setIsLoading(false);
                ModalInfo("결재 취소.");
                back();
            }, 2000);
        }
    }, [dsSelector.cancel_general_doc_fin]);

    useEffect(() => {
        if (dsSelector.re_request_general_doc_fin) {
            dispatch(DeactiveModal());
            setTimeout(() => {
                setIsLoading(false);
                ModalInfo("재상신 완료");
                pushHistory("/fbtemporary");
            }, 2000);
        }
    }, [dsSelector.re_request_general_doc_fin]);

    useEffect(() => {
        if (dsSelector.approval_general_doc_fin) {
            dispatch(DeactiveModal());
            setTimeout(() => {
                setIsLoading(false);
                ModalInfo("결재 완료.");
                back();
            }, 2000);
        }
    }, [dsSelector.approval_general_doc_fin]);

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
        }
    }, [dsSelector.gDoc_codes]);

    useEffect(() => {
        if (dsSelector.gDoc_data) {
            let data = dsSelector.gDoc_data;
            setWriter(data.username);
            setWriteDay(data.sended_at);
            setTitle(data.title);
            setContent(data.content);
            setSelectedDocType(data.code_id);
            setDocNo(data.code_no);
            setSender(data.sender);
            setSelectedReply(data.reply);
            if (orgSelector.group_list && userSelector) {
                if (getCompany(userSelector.group_id) != getCompany(data.group_id))
                    setIsNoPDF(true);
            }
        }
    }, [dsSelector.gDoc_data]);

    useEffect(() => {
        let _list = [];
        _list.push({
            writer: writer,
            writeday: moment(wirteDay).format(`yyyy-MM-DD HH:mm`),
            title: title,
            content: content,
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
    }, [writer, wirteDay, title, content, selectedDocType, docNo, sender, selectedReply]);

    useEffect(() => {
        if (dsSelector.gDoc_read_list) {
            let _ids: number[] = [];
            dsSelector.gDoc_read_list.map((raw: any, idx: number) => {
                if (raw.is_read == 1) _ids.push(raw.user_id);
            });
            setIsReadList(_ids);
        }
    }, [dsSelector.gDoc_read_list]);

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
        if (dsSelector.gDoc_files) {
            setFileNames([...dsSelector.gDoc_files]);
        }
    }, [dsSelector.gDoc_files]);

    useEffect(() => {
        if (signLineList.length > 0 && !dsSelector.gDoc_is_diff_org) {
            let SignHead = "<div class='SignText'>결재</div>";
            for (var i = 0; i <= signLineList.length - 1; i++) {
                let raw: any = signLineList[i];
                if (i == 8) SignHead += "<div class='SignText'></div>";
                SignHead += `
                    <div class='SignHead'>
                        <div class='name'>${raw.state == "1" ? "담당" : "결재"}</div>
                        <div class='imgdiv'>${
                            raw.state == "7" || raw.state == "2" ? "" : raw.username
                        }</div>
                        <div class='date'>${
                            raw.state == "1"
                                ? moment(raw.created_at).format("YY.MM.DD / HH:mm")
                                : raw.state == "3" || raw.state == "6"
                                ? moment(raw.approval_at).format("YY.MM.DD / HH:mm")
                                : ""
                        }</div>
                    </div>`;
            }
            setDocument(`<div class='SignHeadNormalDiv'>${SignHead}</div>`, 0);
        }
    }, [signLineList]);

    const setDocument = (html: string, type: number) => {
        if (type == 0) {
            var doc = document.getElementById(`sign_head`);
            if (doc) doc.innerHTML = html.toString();
        }
    };

    const getCompany = (id: number) => {
        let _list: any = orgSelector.group_list.filter((obj: any) => obj.id == id)[0];
        return _list ? _list.group_id : -1;
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
        } else if (type == 2) {
            selectedRecvList.splice(selectedRecvList.indexOf(idx), 1);
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
    const onClickSendDocument = async () => {
        setIsLoading(true);
        await dispatch(SendGeneralDoc(dsSelector.gDoc_data.id, title, content, selectedDocType));
    };

    const onClickBtmBtn = async (flag: number) => {
        switch (flag) {
            case 1:
                setSignCancel(true);
                break;
            case 2:
                await dispatch(ReRequestGeneralDoc(dsSelector.gDoc_data.id));
                break;
            case 3:
                setRejectOpen(true);
                break;
            case 4:
                setCertifyOpen(true);
                break;
            case 5:
                onClickSendDocument();
                break;
        }
    };

    const onClickRejectSign = async (comment: string) => {
        setCertifyOpen(false);
        await dispatch(RejectGeneralDocSign(dsSelector.gDoc_data.id, comment));
    };

    const onClickApprovalSign = async (comment?: string) => {
        setCertifyOpen(false);
        await dispatch(ApprovalGeneralDocSign(dsSelector.gDoc_data.id, comment));
    };

    const onClickCancelSign = async (comment: string) => {
        setSignCancel(false);
        await dispatch(
            CancelGeneralDoc(
                dsSelector.gDoc_data.id,
                comment,
                dsSelector.signed_user ? dsSelector.signed_user[0].state : 0
            )
        );
    };
    let disableCancelBtn = true;
    let disableRerequestBtn = true;
    let disableBtn = true;
    let disableSendBtn = true;
    if (dsSelector.gDoc_data != undefined) {
        disableCancelBtn =
            dsSelector.gDoc_data.state == 2 ||
            dsSelector.gDoc_data.state == 3 ||
            dsSelector.signed_user == undefined ||
            dsSelector.gDoc_data.state == 4 ||
            userSelector.id != dsSelector.gDoc_data.user_id ||
            userSelector.id != dsSelector.signed_user[0].id;
        disableRerequestBtn =
            dsSelector.gDoc_data.is_re_request == 1 ||
            dsSelector.gDoc_data.state != 4 ||
            dsSelector.gDoc_data.user_id != userSelector.id;
        disableBtn =
            dsSelector.gDoc_data.user_id == userSelector.id ||
            dsSelector.gDoc_data.state == 4 ||
            dsSelector.gDoc_data.state == 0 ||
            dsSelector.gDoc_data.state == 2 ||
            dsSelector.gDoc_data.state == 3 ||
            dsSelector.next_signed_user[0].id != userSelector.id;
        disableSendBtn = !(
            dsSelector.gDoc_data.user_id == userSelector.id && dsSelector.gDoc_data.state == 2
        );
    }

    return (
        <S.Block>
            <LoadingIndicatorComponent open={isLoading} />
            <ApprovalRejectComp
                visible={rejectOpen}
                onClose={() => setRejectOpen(false)}
                onComplete={onClickRejectSign}
            />
            <ApprovalCertifyComp
                visible={certifyOpen}
                onClose={() => setCertifyOpen(false)}
                onComplete={onClickApprovalSign}
            />
            <ApprovalCancelComp
                visible={signCancel}
                onClose={() => setSignCancel(false)}
                onComplete={onClickCancelSign}
            />
            <S.Bg $isMain={true}>
                <S.EnterTop>
                    <GeneralDocumentMenuComponent
                        data={data}
                        onChangeSignLine={(lines: object[]) => setSignLineList(lines)}
                        isNoPDF={isNoPDF}
                        activePDF
                        isEditMode
                        class_name="form_container"
                    />
                </S.EnterTop>
                <S.Inner className="form_container">
                    {!dsSelector.gDoc_is_diff_org && <S.Head id="sign_head"></S.Head>}
                    <S.Row>
                        <S.Title>문서 구분</S.Title>
                        <S.RadioDiv>
                            {docType.map((value: any, idx: number) => (
                                <S.RadioText
                                    style={{
                                        display: selectedDocType == value.id ? "flex" : "none",
                                    }}
                                    key={idx}
                                >
                                    <S.Radio
                                        readOnly
                                        onChange={() => setSelectedDocType(value.id)}
                                        checked={selectedDocType == value.id}
                                    />
                                    {value.text}
                                </S.RadioText>
                            ))}
                        </S.RadioDiv>
                    </S.Row>
                    <S.Row>
                        <S.Title>문서번호</S.Title>
                        <S.Textfield
                            type={"tel"}
                            value={docNo}
                            onChange={e => setDocNo(e.target.value)}
                            InputProps={{
                                disableUnderline: true,
                                readOnly: true,
                            }}
                        />
                    </S.Row>
                    <S.Row>
                        <S.Title>작성자</S.Title>
                        <S.Textfield
                            value={writer}
                            onChange={e => setWriter(e.target.value)}
                            // disabled
                            InputProps={{
                                disableUnderline: true,
                                readOnly: true,
                                style: { fontSize: `1em`, textAlign: `left` },
                            }}
                        />
                        <S.Title>발송일자</S.Title>
                        <S.Date
                            disableToolbar
                            variant="inline"
                            format="yyyy-MM-DD HH:mm"
                            id="date-picker-inline"
                            value={wirteDay}
                            disabled
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                "aria-label": "change date",
                            }}
                            InputProps={{
                                disableUnderline: true,
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
                                readOnly: true,
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
                                            disabled
                                            style={{
                                                border:
                                                    isReadList.indexOf(id) != -1
                                                        ? "2px solid #4490FF"
                                                        : "",
                                            }}
                                            // onDelete={() => handleDelete(id, 2)}
                                        />
                                    </S.DocChip>
                                );
                            })}
                        </S.DocContent>
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
                                            disabled
                                            style={{
                                                border:
                                                    isReadList.indexOf(id) != -1
                                                        ? "2px solid #4490FF"
                                                        : "",
                                            }}
                                            // onDelete={() => handleDelete(idx, 1)}
                                        />
                                    </S.DocChip>
                                );
                            })}
                        </S.DocContent>
                    </S.Row>
                    <S.Row>
                        <S.Title>제목</S.Title>
                        <S.Textfield
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            // disabled
                            InputProps={{
                                readOnly: true,
                                disableUnderline: true,
                            }}
                        />
                    </S.Row>
                    <S.Row>
                        <S.Title>내용</S.Title>
                        <WebEditorComponent
                            onChangeContent={() => {}}
                            content={content}
                            toolDisabled
                            wrapstyle={{
                                flex: 1,
                                height: "100%",
                            }}
                            contentStyle={{
                                height: "300px",
                            }}
                            editdisabled={true}
                        />
                    </S.Row>
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
                                            </div>
                                        );
                                    return (
                                        <div key={idx}>
                                            <S.FileClip src={ClipSvg} />
                                            <a href={raw.url}>{raw.filename}</a>
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
                    </S.Row>
                    <S.Row>
                        <S.Title>회신필요여부</S.Title>
                        <S.RadioDiv>
                            <S.RadioText>
                                <S.Radio
                                    checked={selectedReply == 0}
                                    // disabled
                                    readOnly
                                />
                                Yes
                            </S.RadioText>
                            <S.RadioText>
                                <S.Radio
                                    checked={selectedReply == 1}
                                    // disabled
                                    readOnly
                                />
                                No
                            </S.RadioText>
                        </S.RadioDiv>
                    </S.Row>
                </S.Inner>
                <S.SubmitDiv>
                    {!disableCancelBtn && (
                        <S.SubmitBtn
                            $color={"#3E8A8B"}
                            $disabled={disableCancelBtn}
                            onClick={() => (!disableCancelBtn ? onClickBtmBtn(1) : null)}
                        >
                            결재취소
                        </S.SubmitBtn>
                    )}
                    {!disableRerequestBtn && (
                        <S.SubmitBtn
                            $color={"#3E8A8B"}
                            $disabled={disableRerequestBtn}
                            onClick={() => onClickBtmBtn(2)}
                        >
                            재상신
                        </S.SubmitBtn>
                    )}
                    <S.SubmitBtn
                        $color={"#3E8A8B"}
                        $disabled={disableBtn}
                        onClick={() => (!disableBtn ? onClickBtmBtn(3) : null)}
                    >
                        반려
                    </S.SubmitBtn>
                    <S.SubmitBtn
                        $color={"#EB5539"}
                        $disabled={disableBtn}
                        onClick={() => (!disableBtn ? onClickBtmBtn(4) : null)}
                    >
                        결재
                    </S.SubmitBtn>
                    <S.SubmitBtn
                        $color={"#4490FF"}
                        onClick={() => (!disableSendBtn ? onClickBtmBtn(5) : null)}
                        $disabled={disableSendBtn}
                    >
                        발송
                    </S.SubmitBtn>
                </S.SubmitDiv>
                {/* <S.SubmitDiv>
                    <S.SubmitBtn onClick={onClickTempSave}>임시저장</S.SubmitBtn>
                    <S.SubmitBtn onClick={onClickSendDocument}>문서발송</S.SubmitBtn>
                </S.SubmitDiv> */}
            </S.Bg>
            <S.Bg $isMain={false}>
                <GeneralDocumentSideMenuComponent
                    signLines={signLineList}
                    signRefers={[]}
                    isReceived={dsSelector.gDoc_is_diff_org}
                    isRequested
                />
            </S.Bg>
        </S.Block>
    );
};

export default ViewNormal;
