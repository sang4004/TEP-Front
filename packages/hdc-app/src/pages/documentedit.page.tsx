/******************************************************************************
 * hooks :
 * useLocations
 * components :
 *
 ******************************************************************************/
//Library
import React, { useState, useEffect, useContext, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
//
//Module
import { reducerState } from "../common";
import {
    GetSign,
    DeleteSign,
    DeactiveModal,
    TempSaveSign,
    RequestSign,
    ChangeDocumentFormState,
    GetAddressbook,
} from "../common/action";
import {
    DocumentMenuComponent,
    DocumentSideMenuComponent,
    DocumentFormComp,
    DocumentBtmComponent,
} from "../components";
import { ModalInfo, LoadingIndicatorComponent, ToastComponent } from "components";
import { useLocations } from "hooks";
import * as S from "../styled/documentnew.styled";
import PdfSvg from "../images/fontawsomeicon/picture_as_pdf_black_24dp.svg";
import CancelSvg from "../images/fontawsomeicon/close-icon-white.svg";
//

type paramTypes = {
    id?: string;
};

const DocumentEditPage = (props: any) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const userSelector = useSelector((state: reducerState) => state.user);
    const dsSelector = useSelector((state: reducerState) => state.digitalsign);
    const { pushHistory, back } = useLocations();
    const [docText, setDocText] = useState<string>("");
    const [signHTML, setSignHTML] = useState<string>("");
    const [headerHTML, setHeaderHTML] = useState<string>("");
    const [pdfBtnHTML, setPdfBtnHTML] = useState<string>("");
    const [footerHTML, setFooterHTML] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [signLineList, setSignLineList] = useState<object[]>([]);
    const [signReferList, setSignReferList] = useState<object[]>([]);
    const [visibleToast, setVisibleToast] = useState<boolean>(false);
    //
    const [isHtmlFlag, setIsHtmlFlag] = useState<boolean>(false);
    const [isPreview, setIsPreview] = useState<any>(null);
    const [isSign, setIsSign] = useState<boolean>(false);
    const [isTempSave, setIsTempSave] = useState<boolean>(false);
    const [isPDF, setIsPDF] = useState<boolean>(false);
    const [isNewEditor, setIsNewEditor] = useState<boolean>(false);
    //
    const { id } = useParams<paramTypes>();

    useEffect(() => {
        if (id && typeof parseInt(id) == "number") {
            // dev - 공문서 id 값 1800 이후부터는 새로운 에디터가 나오게 설정
            if (parseInt(id) > 1800) setIsNewEditor(true);
            else setIsNewEditor(false);
            dispatch(GetAddressbook());
            dispatch(GetSign(id));
        } else {
            back();
        }
        dispatch(ChangeDocumentFormState(true));
        setIsLoading(true);
        setTimeout(() => {
            setIsHtmlFlag(true);
            setTimeout(() => {
                setIsHtmlFlag(false);
                setTimeout(() => {
                    setIsLoading(false);
                }, 1000);
            }, 500);
        }, 2000);
    }, []);

    useEffect(() => {
        if (isLoading && isHtmlFlag) {
            let _docText = docText;
            let _header = headerHTML;
            let _footer = footerHTML;
            if (_docText.length == 0) _docText = dsSelector.sign_data.html;
            if (isPreview) {
                setTimeout(() => {
                    var header = document.head.innerHTML;
                    var pre = window.open(
                        "",
                        "1429893142534",
                        "width=1080px,height=1528,toolbar=0,menubar=0,location=0,status=0,scrollbars=1,resizable=0,left=0,top=0"
                    );
                    pre?.document.write(header);
                    // pre?.document.write(`<div class="form_wrapper overflowAuto">${_header + pdfBtnHTML + _docText + _footer}</div>`);
                    pre?.document.write(
                        `<div class="form_wrapper overflowAuto">${pdfBtnHTML}<img src="${isPreview}" /></div>`
                    );
                    pre?.document.close();
                    pre?.document.getElementById(`pdf`)?.addEventListener(`click`, () => {
                        onClickPDF();
                    });
                    pre?.document.getElementById(`close`)?.addEventListener(`click`, () => {
                        pre?.close();
                    });
                    pre?.document.getElementById(`btnPDF`)?.setAttribute(`src`, PdfSvg);
                    pre?.document.getElementById(`btnClose`)?.setAttribute(`src`, CancelSvg);
                    setIsLoading(false);
                }, 1000);
            } else if (isSign) {
                dispatch(
                    RequestSign(dsSelector.sign_data.id, _docText, _header, _footer, [
                        ...signLineList.map((raw: any, idx) => raw.user_id),
                    ])
                );
            } else if (isTempSave) {
                setTimeout(async () => {
                    await dispatch(
                        TempSaveSign(dsSelector.sign_data.id, _docText, _header, _footer)
                    );
                    ModalInfo("결재 임시저장.");
                    back();
                    setIsLoading(false);
                }, 0);
            }
            setIsPreview(null);
            setIsSign(false);
            setIsTempSave(false);
            setIsHtmlFlag(false);
        }
    }, [signHTML]);

    useEffect(() => {
        if (dsSelector.request_sign_fin) {
            dispatch(DeactiveModal());
            setTimeout(() => {
                setIsLoading(false);
                ModalInfo("결재요청 완료.");
                pushHistory("/dsrequest");
            }, 2000);
        }
    }, [dsSelector.request_sign_fin]);

    useEffect(() => {
        if (dsSelector.sign_data) {
            setDocText(dsSelector.sign_data.html);
            if (dsSelector.sign_data.is_regist) dispatch(ChangeDocumentFormState(false));
            setIsLoading(true);
            setIsHtmlFlag(true);
        }
    }, [dsSelector.sign_data]);

    const onClickRequestSign = async () => {
        if (signLineList.length == 1) {
            setVisibleToast(true);
            setTimeout(() => {
                setVisibleToast(false);
            }, 2000);
            return;
        }
        if (dsSelector.sign_data.is_regist) {
            let _docText = docText;
            let _header = headerHTML;
            let _footer = footerHTML;
            await dispatch(
                RequestSign(dsSelector.sign_data.id, _docText, _header, _footer, [
                    ...signLineList.map((raw: any, idx) => raw.user_id),
                ])
            );
        }
        setIsLoading(true);
        setIsSign(true);
        setIsHtmlFlag(true);
    };

    const onClickCancel = async () => {
        await dispatch(DeleteSign(dsSelector.sign_data.id));
        ModalInfo("결재 작성취소.");
        back();
    };

    const onClickTempSave = async () => {
        setIsTempSave(true);
        setIsLoading(true);
        setIsHtmlFlag(true);
    };

    const onClickPreview = (preview_img: any) => {
        setIsPreview(preview_img);
        setIsLoading(true);
        setIsHtmlFlag(true);
    };

    const AddSign = (html: string, header: string, footer: string, previewpdf?: string) => {
        setHeaderHTML(header.replace(/&nbsp;/gi, " "));
        setFooterHTML(footer);
        setSignHTML(header + html + footer);
        setPdfBtnHTML(previewpdf ? previewpdf : "");
    };

    const onClickPDF = () => {
        setIsPDF(true);
    };

    const onChangeHTML = (html: string) => {
        setDocText(html);
        setSignHTML(headerHTML + html + footerHTML);
    };

    return (
        <S.Block>
            <LoadingIndicatorComponent open={isLoading} />
            <ToastComponent
                text="결재라인을 선택해주세요."
                close={() => setVisibleToast(false)}
                visible={visibleToast}
                type={"warning"}
                style={{ position: "absolute", bottom: 100, right: 100, alignItems: "center" }}
            />
            <S.Bg $isMain={true}>
                <S.EnterTop>
                    <DocumentMenuComponent
                        html={signHTML}
                        onClickSign={onClickRequestSign}
                        onClickCancel={onClickCancel}
                        onClickTemporarySave={onClickTempSave}
                        onClickPreview={onClickPreview}
                        onChangeSignLine={(lines: object[]) => setSignLineList(lines)}
                        onChangeSignRefer={(lines: object[]) => setSignReferList(lines)}
                        activeRequestSign
                        activeSignInfo
                        activeTempSave
                        activeCancel={dsSelector.sign_data && !dsSelector.sign_data.is_regist}
                        activeRefer
                        activePreview
                        activePDF
                        isEditMode={true}
                        class_name="form_container"
                        isPDF={isPDF}
                    />
                </S.EnterTop>
                <S.DocumentContent>
                    {/* editor here */}
                    <DocumentFormComp
                        onChangeContent={str => onChangeHTML(str)}
                        formId={dsSelector.new_form_id}
                        html={dsSelector.sign_data ? dsSelector.sign_data.html : null}
                        isComplete={
                            dsSelector.sign_data && dsSelector.sign_data.is_regist == 1
                                ? true
                                : false
                        }
                        isRegist={
                            dsSelector.sign_data && dsSelector.sign_data.is_regist == 1
                                ? true
                                : false
                        }
                        isHtmlFlag={isHtmlFlag}
                        AddSign={AddSign}
                        isNewEditor={isNewEditor}
                    />
                </S.DocumentContent>
                <DocumentBtmComponent onClickComplete={onClickRequestSign} />
            </S.Bg>
            <S.Bg $isMain={false}>
                <DocumentSideMenuComponent signLines={signLineList} signRefers={signReferList} />
            </S.Bg>
        </S.Block>
    );
};

export default DocumentEditPage;
