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
//
import { Html2PdfComponent } from "components";
import { ModalInfo, LoadingIndicatorComponent } from "components";
// Module
import * as S from "./styled";
import { useLocations } from "hooks";
import { ApprovalInfoComp, SignRefSelectComp, PreviewDocumentComp, ApprovalCertifyComp } from "../";
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
    DefererSign,
    DeactiveModal,
} from "../../common/action";
import { reducerState } from "../../common";
//

interface GetHeightType {
    height: number;
    tot_height: number;
    divide: number;
    isNext: boolean;
}
export type documentMenuProps = {
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
    onClickPreview?: (data: null | any) => void;
    onClickEdit?: (state: boolean) => void;
    isPDF?: boolean;
    isEditMode?: boolean;
    html?: string;
    class_name?: string;
};
interface FinaldocumentMenuProps extends documentMenuProps {}

export const DocumentMenuComponent: React.FunctionComponent<FinaldocumentMenuProps> = props => {
    const dispatch = useDispatch();
    const compSelector = useSelector((state: reducerState) => state.components);
    const { back, pushHistory, path } = useLocations();
    const [visibleApproval, setVisibleApproval] = useState<boolean>(false);
    const [visibleRefer, setVisibleRefer] = useState<boolean>(false);
    const [visiblePreview, setVisiblePreview] = useState<boolean>(false);
    const [visibleDefer, setVisibleDefer] = useState<boolean>(false);
    const [certifyOpen, setCertifyOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const dsSelector = useSelector((state: reducerState) => state.digitalsign);
    const userSelector = useSelector((state: reducerState) => state.user);

    const [dualPDF, setDualPDF] = useState<boolean>(false);

    useEffect(() => {
        if (dsSelector.sign_line) {
            for (var line of dsSelector.sign_line) {
                if (line.state == 8 && line.user_id == userSelector.id) setVisibleDefer(true);
            }
        }
    }, [dsSelector.sign_line]);

    useEffect(() => {
        if (
            dsSelector.sign_data &&
            (dsSelector.sign_data.group_id == userSelector.company ||
                dsSelector.sign_data.form_group_id == userSelector.company ||
                !dsSelector.is_diff_org) &&
            (dsSelector.sign_data.sign_state == 2 ||
                dsSelector.sign_data.sign_state == 3 ||
                dsSelector.sign_data.sign_state == 6 ||
                dsSelector.sign_data.sign_state == 8 ||
                dsSelector.sign_data.sign_state == 10 ||
                dsSelector.sign_data.is_regist == 1)
        ) {
            setDualPDF(true);
        }
    }, [dsSelector.sign_data]);

    useEffect(() => {
        if (dsSelector.defer_sign_fin) {
            dispatch(DeactiveModal());
            setTimeout(() => {
                setIsLoading(false);
                ModalInfo("후결 완료.");
                back();
            }, 2000);
        }
    }, [dsSelector.defer_sign_fin]);

    useEffect(() => {
        if (dsSelector.sign_data && dsSelector.sign_data.is_regist == 0) {
            if (props.isPDF) onClickPdf();
        }
    }, [props.isPDF]);

    const onCompleteSelectLine = (list: object[]) => {
        if (props.onChangeSignLine) props.onChangeSignLine(list);
    };

    const onCompleteSelectRefer = (list: object[]) => {
        if (props.onChangeSignRefer) props.onChangeSignRefer(list);
    };

    const setHeight = (): Promise<GetHeightType> => {
        return new Promise(async (resolve: (val: GetHeightType) => void, reject) => {
            const normalHeight = 800;
            const factor = 50;
            var tot_height = 1080 * 1.414;

            if (document.body) {
                console.log(document.body.clientHeight);
                if (document.body.clientHeight < 800 || document.body.clientHeight > 900) {
                    let zoom = Math.floor((document.body.clientHeight / normalHeight) * 100);
                    document.body.setAttribute("style", "zoom:" + zoom + "%");
                    console.log(document.body.style);
                    await new Promise(r => setTimeout(r, 500));
                }
            }
            var body = document.getElementById("doc_body");
            var header = document.getElementById("doc_header");
            var footer = document.getElementById("doc_footer");
            var height = 0;
            if (header && body) height += body.scrollHeight + header.clientHeight;
            if (footer) height += footer.clientHeight;
            resolve({
                height,
                tot_height,
                divide: Math.floor(height / tot_height),
                isNext: height + factor > tot_height,
            });
            document.body.setAttribute("style", "zoom:none");
        });
    };

    const onClickPdf = async () => {
        var div = document.createElement("div");
        div.innerHTML = props.html ? props.html.trim() : "";
        let el = document.body.appendChild(div);
        document.getElementById(`pdf`)?.remove();
        document.getElementById(`close`)?.remove();
        let pdfName = dsSelector.sign_data.pdf_name;
        if (dualPDF) pdfName += "(결재포함)";
        let heightData = await setHeight();
        if (heightData.isNext)
            $(div)
                .find("#doc_footer")
                .css("margin-top", heightData.tot_height * heightData.divide);
        await Html2PdfComponent({
            elementId: "",
            element: div,
            filename: pdfName,
            whiteSpace: 0,
            isSave: true,
            extraClass: props.class_name,
        });
        document.body.removeChild(el);
    };

    const onClickPdf2 = async () => {
        var div = document.createElement("div");
        if (props.class_name) div.classList.add(props.class_name);
        div.innerHTML = props.html ? props.html.trim() : "";
        let el = document.body.appendChild(div);
        el.getElementsByClassName(`SignHeadDiv`)[0]?.remove();
        el.getElementsByClassName(`SignHeadDiv2`)[0]?.remove();
        el.getElementsByClassName(`issue_signature_img`)[0]?.remove();
        let pdfName = dsSelector.sign_data.pdf_name + "(결재제외)";
        let heightData = await setHeight();
        if (heightData.isNext)
            $(div)
                .find("#doc_footer")
                .css("margin-top", heightData.tot_height * heightData.divide);
        if (props.isEditMode || compSelector.onlyDocument)
            await Html2PdfComponent({
                elementId: "",
                element: div,
                filename: pdfName,
                whiteSpace: 0,
                isSave: true,
                extraClass: props.class_name,
            });
        else
            await Html2PdfComponent({
                elementId: "",
                element: div,
                filename: pdfName,
                whiteSpace: 0,
                isSave: true,
                extraClass: props.class_name,
            });
        document.body.removeChild(el);
    };

    const onClickDocumentForm = () => {
        if (props.isEditMode) return;
        dispatch(ChangeDocumentFormState(!compSelector.onlyDocument));
    };

    const onClickPreview = async () => {
        var div = document.createElement("div");
        div.innerHTML = props.html ? props.html.trim() : "";
        let el = document.body.appendChild(div);
        el.getElementsByClassName(`SignHeadDiv`)[0]?.remove();
        el.getElementsByClassName(`SignHeadDiv2`)[0]?.remove();
        el.getElementsByClassName(`issue_signature_img`)[0]?.remove();

        let heightData = await setHeight();
        if (heightData.isNext)
            $(div)
                .find("#doc_footer")
                .css("margin-top", heightData.tot_height * heightData.divide);
        let res = await Html2PdfComponent({
            elementId: "",
            element: div,
            whiteSpace: 0,
        });
        if (props.onClickPreview) props.onClickPreview(res);
    };

    const onClickPrint = () => {
        if (props.onClickPrint) props.onClickPrint();
    };

    const onClickCancel = () => {
        if (props.onClickCancel) {
            let res = confirm("작성을 취소하시겠습니까?");
            if (res) {
                setTimeout(() => {
                    dispatch(ChangeSignSelectModal(true));
                }, 100);
                props.onClickCancel();
            }
        }
    };

    const onClickDeferSign = async (comment?: string) => {
        if (userSelector.id == dsSelector.sign_data.user_id) return;
        setCertifyOpen(false);
        setIsLoading(true);
        await dispatch(DefererSign(dsSelector.sign_data.id, comment ? comment : ""));
    };

    return (
        <S.Block>
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
            <ApprovalInfoComp
                visible={visibleApproval}
                onClose={() => setVisibleApproval(false)}
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
                        <button onClick={() => setVisibleApproval(true)}>
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
                {props.activePDF && (
                    <li>
                        <button onClick={onClickPdf}>
                            <img src={PdfSvg} alt="" />
                            {dualPDF ? "PDF 다운로드(결재포함)" : "PDF 다운로드"}
                        </button>
                    </li>
                )}
                {dualPDF && (
                    <li>
                        <button onClick={onClickPdf2}>
                            <img src={PdfSvg} alt="" />
                            PDF 다운로드(결재제외)
                        </button>
                        {/* <button onClick={onClickPdf2}><img src={PdfSvg} alt=""/>{path?.indexOf("recv") != -1? "PDF 다운로드" : "PDF 다운로드(결재제외)"}</button> */}
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
                {/* {visibleDefer &&
                <li>
                    <button onClick={()=>{setCertifyOpen(true)}}>후결처리</button>
                </li>} */}
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
                    <button onClick={() => back()}>
                        <img src={BarsSvg} alt="" />
                        <span>목록</span>
                    </button>
                </li>
            </S.TabEtc>
        </S.Block>
    );
};
