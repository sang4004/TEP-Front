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
import { useState, useEffect, useContext } from "react"; // default hooks
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { renderRoutes } from "react-router-config";
//
import { Html2PdfComponent } from "components";
import { ModalInfo, LoadingIndicatorComponent, WebEditorComponent } from "components";
// Module
import * as S from "./styled";
import { useLocations } from "hooks";
import {
    SignRefSelectComp,
    PreviewDocumentComp,
    ApprovalCertifyComp,
    GeneralApprovalInfoComp,
} from "..";
import FileSvg from "../../images/fontawsomeicon/file-alt-solid.svg";
import EyeSvg from "../../images/fontawsomeicon/eye-regular.svg";
import InfoSvg from "../../images/fontawsomeicon/info_black_24dp.svg";
import PrintSvg from "../../images/fontawsomeicon/print_black_24dp.svg";
import PdfSvg from "../../images/fontawsomeicon/picture_as_pdf_black_24dp.svg";
import CancelSvg from "../../images/fontawsomeicon/close-icon-white.svg";
import BarsSvg from "../../images/fontawsomeicon/bars-solid.svg";
import {
    ChangeDocumentFormState,
    ChangeSignSelectModal,
    DefererGeneralDocSign,
    DeactiveModal,
} from "../../common/action";
import { reducerState } from "../../common";
import moment from "moment";
//

export type generalDocumentMenuProps = {
    data?: any;
    style?: object;
    children?: React.ReactNode;
    onClickSign?: () => void;
    onClickCancel?: () => void;
    onClickSignCancel?: () => void;
    activeRequestSign?: boolean;
    activeTempSave?: boolean;
    activePreview?: boolean;
    activeSignInfo?: boolean;
    activeSignCancel?: boolean;
    activePrint?: boolean;
    activePDF?: boolean;
    activeCancel?: boolean;
    activeRefer?: boolean;
    activeEdit?: boolean;
    docRegist?: boolean;
    onChangeSignLine?: (line: object[]) => void;
    onChangeSignRefer?: (line: object[]) => void;
    onClickTemporarySave?: () => void;
    onClickPrint?: () => void;
    onClickPreview?: () => void;
    onClickEdit?: (state: boolean) => void;
    isPDF?: boolean;
    isNoPDF?: boolean;
    isEditMode?: boolean;
    html?: string;
    class_name?: string;
};

interface FinalgeneralDocumentMenuProps extends generalDocumentMenuProps {}

export const GeneralDocumentMenuComponent: React.FunctionComponent<FinalgeneralDocumentMenuProps> =
    props => {
        const dispatch = useDispatch();
        const compSelector = useSelector((state: reducerState) => state.components);
        const { back, pushHistory } = useLocations();
        const [visibleGeneralDocApproval, setVisibleGeneralDocApproval] = useState<boolean>(false);
        const [visibleRefer, setVisibleRefer] = useState<boolean>(false);
        const [visiblePreview, setVisiblePreview] = useState<boolean>(false);
        const [visibleDefer, setVisibleDefer] = useState<boolean>(false);
        const [certifyOpen, setCertifyOpen] = useState<boolean>(false);
        const [isLoading, setIsLoading] = useState<boolean>(false);
        const dsSelector = useSelector((state: reducerState) => state.digitalsign);
        const userSelector = useSelector((state: reducerState) => state.user);

        const [data, setData] = useState<any>();
        const [signline, setSignLine] = useState<any[]>([]);

        useEffect(() => {
            if (dsSelector.gDoc_sign_line) {
                for (var line of dsSelector.gDoc_sign_line) {
                    if (line.state == 8 && line.user_id == userSelector.id) setVisibleDefer(true);
                }
            }
        }, [dsSelector.gDoc_sign_line]);

        useEffect(() => {
            if (dsSelector.defer_general_doc_fin) {
                dispatch(DeactiveModal());
                setTimeout(() => {
                    setIsLoading(false);
                    ModalInfo("후결 완료.");
                    back();
                }, 2000);
            }
        }, [dsSelector.defer_general_doc_fin]);

        useEffect(() => {
            if (dsSelector.gDoc_data && dsSelector.gDoc_data.is_regist == 0) {
                if (props.isPDF) onClickPdf();
            }
        }, [props.isPDF]);

        useEffect(() => {
            if (props.data) {
                setData(props.data);
            }
        }, [props.data]);

        const onCompleteSelectLine = (list: object[]) => {
            if (props.onChangeSignLine) props.onChangeSignLine(list);
            setSignLine(list);
        };

        const onCompleteSelectRefer = (list: object[]) => {
            if (props.onChangeSignRefer) props.onChangeSignRefer(list);
        };

        const onClickPdf = async () => {
            var pdf = document.getElementById("print_pdf");
            if (pdf) {
                pdf.style.display = "";
                var div = document.createElement("div");
                div.innerHTML = pdf.outerHTML;
                let el = document.body.appendChild(div);
                await Html2PdfComponent({
                    elementId: "",
                    element: div,
                    filename: dsSelector.gDoc_data.pdf_name,
                    isSave: true,
                });
                document.body.removeChild(el);
                pdf.style.display = "none";
            }
        };

        const onClickPdf2 = async () => {
            var pdf = document.getElementById("print_pdf");
            if (pdf) {
                pdf.style.display = "";
                var div = document.createElement("div");
                div.innerHTML = pdf.outerHTML;
                let el = document.body.appendChild(div);
                el.getElementsByClassName(`pdfrow`)[0]?.remove();
                await Html2PdfComponent({
                    elementId: "",
                    element: div,
                    filename: dsSelector.gDoc_data.pdf_name,
                    isSave : true
                });
                document.body.removeChild(el);
                pdf.style.display = "none";
            }
        };

        const onClickDocumentForm = () => {
            if (props.isEditMode) return;
            dispatch(ChangeDocumentFormState(!compSelector.onlyDocument));
        };

        const onClickPreview = () => {
            if (props.onClickPreview) props.onClickPreview();
        };

        const onClickPrint = () => {
            if (props.onClickPrint) props.onClickPrint();
        };

        const onClickCancel = () => {
            if (props.onClickCancel) {
                props.onClickCancel();
            }
        };

        const onClickDeferSign = async (comment?: string) => {
            if (userSelector.id == dsSelector.gDoc_data.user_id) return;
            setCertifyOpen(false);
            setIsLoading(true);
            await dispatch(DefererGeneralDocSign(dsSelector.gDoc_data.id, comment ? comment : ""));
        };

        const gethtml = () => {
            if (data && data.doctype && data.recvlist.length > 0) {
                return (
                    <div
                        id="print_pdf"
                        className="general_form"
                        style={{ zIndex: -1, position: "absolute", display: "none" }}
                    >
                        <div className="pdfrow">
                            <div className="SignHeadNormalDiv">
                                <div className="SignText">결재</div>
                                {signline &&
                                    signline.map((raw: any, idx: number) => {
                                        return (
                                            <div className="SignHead" key={idx}>
                                                <div className="name">
                                                    {raw.state == "1" ? "담당" : "결재"}
                                                </div>
                                                <div className="imgdiv">
                                                    {raw.state == "7" || raw.state == "2"
                                                        ? ""
                                                        : raw.username}
                                                </div>
                                                <div className="pdfdate">
                                                    {raw.state == "1"
                                                        ? moment(raw.created_at).format(
                                                              "YY.MM.DD HH:mm"
                                                          )
                                                        : raw.state == "3" || raw.state == "6"
                                                        ? moment(raw.approval_at).format(
                                                              "YY.MM.DD HH:mm"
                                                          )
                                                        : ""}
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                        <div className="row fixed_height_row">
                            <div className="title_box">문서구분</div>
                            <div className="input_box" id="document-type">
                                {data.doctype.filter((val: string) => val)[0]}
                            </div>
                        </div>
                        <div className="row fixed_height_row">
                            <div className="title_box">문서번호</div>
                            <div className="input_box" id="document-code">
                                {data.docno}
                            </div>
                        </div>
                        <div className="row second_row">
                            <div className="title_box">작성자</div>
                            <div className="input_box" id="document-writer">
                                {data.writer}
                            </div>
                            <div className="title_box">작성일자</div>
                            <div className="input_box" id="document-date">
                                {data.writeday}
                            </div>
                        </div>
                        <div className="row fixed_height_row">
                            <div className="title_box">발신</div>
                            <div className="input_box" id="document-caller">
                                {data.sender}
                            </div>
                        </div>
                        <div className="row auto_height_row">
                            <div className="title_box">수신자</div>
                            <div className="input_box" id="document-receiver">
                                {data.recv.map((val: any, idx: number) => {
                                    let filtered = data.recvlist.filter(
                                        (obj: any) => obj.id == val
                                    );
                                    return (
                                        <div key={idx} className="inner_list">
                                            {filtered.length > 0 &&
                                                filtered[0].position + " " + filtered[0].username}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="row auto_height_row">
                            <div className="title_box">참조자</div>
                            <div className="input_box" id="document-CC">
                                {data.ref.map((val: any, idx: number) => {
                                    let filtered = data.recvlist.filter(
                                        (obj: any) => obj.id == val
                                    );
                                    return (
                                        <div key={idx} className="inner_list">
                                            {filtered.length > 0 &&
                                                filtered[0].position + " " + filtered[0].username}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="row fixed_height_row">
                            <div className="title_box">제목</div>
                            <div className="input_box" id="document-title">
                                {data.title}
                            </div>
                        </div>
                        <div className="row auto_height_row contents_row">
                            <div className="title_box">내용</div>
                            <div className="input_box" id="document-content">
                                <WebEditorComponent
                                    onChangeContent={() => {}}
                                    content={data.content ? data.content : ""}
                                    toolDisabled
                                    wrapstyle={{
                                        flex: 1,
                                        height: "100%",
                                    }}
                                    editdisabled={true}
                                />
                            </div>
                        </div>
                        <div className="row auto_height_row attachments_row">
                            <div className="title_box">첨부파일</div>
                            <div className="input_box" id="document-attachments">
                                {data.files.map((raw: any, idx: number) => {
                                    return (
                                        <div key={idx} className="attachments_list">
                                            <img
                                                src="./paperclip-solid.svg"
                                                alt=""
                                                className="icon"
                                            />
                                            {raw.filename}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="row fixed_height_row last_row">
                            <div className="title_box">회신필요여부</div>
                            <S.RadioDiv>
                                {data.reply == `Yes` ? (
                                    <S.RadioText>
                                        <>
                                            <S.Radio checked />
                                            Yes
                                        </>
                                    </S.RadioText>
                                ) : (
                                    <S.RadioText>
                                        <>
                                            <S.Radio />
                                            Yes
                                        </>
                                    </S.RadioText>
                                )}
                                {data.reply == `No` ? (
                                    <S.RadioText>
                                        <>
                                            <S.Radio checked />
                                            No
                                        </>
                                    </S.RadioText>
                                ) : (
                                    <S.RadioText>
                                        <>
                                            <S.Radio />
                                            No
                                        </>
                                    </S.RadioText>
                                )}
                            </S.RadioDiv>
                        </div>
                    </div>
                );
            }
        };

        return (
            <S.Block>
                {gethtml()}
                <PreviewDocumentComp
                    visible={visiblePreview}
                    onClose={() => setVisiblePreview(false)}
                    element={props.html}
                    class_name={props.class_name}
                />
                <SignRefSelectComp
                    visible={visibleRefer}
                    onClose={() => setVisibleRefer(false)}
                    onComplete={onCompleteSelectRefer}
                />
                <ApprovalCertifyComp
                    visible={certifyOpen}
                    isdefer={visibleDefer}
                    onClose={() => setCertifyOpen(false)}
                    onComplete={onClickDeferSign}
                />
                <GeneralApprovalInfoComp
                    visible={visibleGeneralDocApproval}
                    onClose={() => setVisibleGeneralDocApproval(false)}
                    onComplete={onCompleteSelectLine}
                />
                <LoadingIndicatorComponent open={isLoading} />
                <S.TabMenu>
                    {props.activeRequestSign && (
                        <S.SignBtn>
                            <button onClick={props.onClickSign}>결재요청</button>
                        </S.SignBtn>
                    )}
                    {props.activeTempSave && (
                        <S.TempBtn>
                            <button onClick={props.onClickTemporarySave}>
                                <img src={FileSvg} alt="" />
                                임시저장
                            </button>
                        </S.TempBtn>
                    )}
                    {props.activePreview && (
                        <li>
                            <button onClick={onClickPreview}>
                                <img src={EyeSvg} alt="" />
                                미리보기
                            </button>
                        </li>
                    )}
                    {props.activeSignInfo && (
                        <li>
                            <button onClick={() => setVisibleGeneralDocApproval(true)}>
                                <img src={InfoSvg} alt="" />
                                결재선지정
                            </button>
                        </li>
                    )}
                    {props.activeRefer && (
                        <li>
                            <button onClick={() => setVisibleRefer(true)}>
                                <img src={InfoSvg} alt="" />
                                내부참조
                            </button>
                        </li>
                    )}
                    {props.activePrint && (
                        <li>
                            <button onClick={props.docRegist ? onClickPrint : onClickDocumentForm}>
                                <img src={PrintSvg} alt="" />
                                {props.docRegist
                                    ? "출력하기"
                                    : compSelector.onlyDocument
                                    ? "문서 보기"
                                    : "공문만 보기"}
                            </button>
                        </li>
                    )}
                    {props.activePDF && !props.isNoPDF && (
                        <li>
                            <button onClick={onClickPdf}>
                                <img src={PdfSvg} alt="" />
                                PDF 다운로드(결재포함)
                            </button>
                        </li>
                    )}
                    {props.activePDF && (
                        <li>
                            <button onClick={onClickPdf2}>
                                <img src={PdfSvg} alt="" />
                                {props.isNoPDF ? "PDF 다운로드" : "PDF 다운로드(결재제외)"}
                            </button>
                        </li>
                    )}
                    {/* {props.activeSignCancel &&
                <li>
                    <button onClick={onClickSignCancel}><img src={CancelSvg} alt=""/>결재취소</button>
                </li>} */}
                    {props.activeCancel && (
                        <li>
                            <button onClick={onClickCancel}>
                                <img src={CancelSvg} alt="" />
                                작성취소
                            </button>
                        </li>
                    )}
                    {/* {props.activeEdit && 
                <li>
                    <button onClick={onClickEdit}>
                        <img style={{width : "12px"}} src={props.isEditMode ? FileRegularSvg : FileSvg} alt=""/>
                        {props.isEditMode ? "수정완료" : "수정하기"}
                    </button>
                </li>
                } */}
                    {visibleDefer && (
                        <li>
                            <button
                                onClick={() => {
                                    setCertifyOpen(true);
                                }}
                            >
                                후결처리
                            </button>
                        </li>
                    )}
                </S.TabMenu>
                <S.TabEtc>
                    {/* <li>
                    <select>
                        <option value="자동저장안함">자동저장안함</option>
                        <option value="자동저장안함">5분</option>
                        <option value="자동저장안함">10분</option>
                    </select>
                </li> */}
                    <li>
                        <button onClick={() => history.go(-2)}>
                            <img src={BarsSvg} alt="" />
                            <span>목록</span>
                        </button>
                    </li>
                </S.TabEtc>
            </S.Block>
        );
    };
