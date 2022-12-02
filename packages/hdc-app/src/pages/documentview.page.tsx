/******************************************************************************
 * Copyright (c) 2021. Moornmo Inc. Rights reserved.                          *
 * Data modelings and methods used are assets of Moornmo Inc.                 *
 * hooks :
    * useLocations 
 * components : 
    * 
 * last modify : jh.jeong
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
    ApprovalSign,
    PrevApprovalSign,
    DeactiveModal,
    RejectSign,
    EditSign,
    CancelSign,
    ChangeDocumentFormState,
    ReRequestSign
} from "../common/action";
import { 
    DocumentMenuComponent,
    DocumentSideMenuComponent,
    DocumentFormComp,
    ApprovalCertifyComp,
    ApprovalRejectComp,
    SignCommentComp
} from "../components";
import { ModalInfo, LoadingIndicatorComponent } from "components";
import { useLocations } from "hooks";
import * as S from "../styled/documentview.styled";
import ClipSvg from "../images/fontawsomeicon/paperclip-solid.svg";
import PdfSvg from "../images/fontawsomeicon/picture_as_pdf_black_24dp.svg";
import CancelSvg from "../images/fontawsomeicon/close-icon-white.svg";
import { ApprovalCancelComp } from "../components/approvalCancel";
//

type paramTypes ={
    id ?: string;
}

const DocumentViewPage = (props : any)=> {
    const dispatch = useDispatch();
    const dsSelector = useSelector((state : reducerState)=> state.digitalsign);
    const userSelector = useSelector((state : reducerState)=> state.user);
    const {pushHistory, back} = useLocations();
    const [docText, setDocText] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [certifyOpen, setCertifyOpen] = useState<boolean>(false);
    const [rejectOpen, setRejectOpen] = useState<boolean>(false);
    const [signCancel, setSignCancel] = useState<boolean>(false);
    const [commentOpen, setCommentOpen] = useState<boolean>(false);
    const [commentText, setCommentText] = useState<string>("");
    
    const { id } = useParams<paramTypes>();
    const [signLineList, setSignLineList] = useState<object[]>([]);
    const [signReferList, setSignReferList] = useState<object[]>([]);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [isFinishSign, setIsFinishSign] = useState<boolean>(false);
    const [isDeferSign, setIsDeferSign] = useState<boolean>(false);
    const [isNowSign, setIsNowSign] = useState<boolean>(false);
    //    
    const [signHTML, setSignHTML] = useState<string>("");
    const [headerHTML, setHeaderHTML] = useState<string>("");
    const [footerHTML, setFooterHTML] = useState<string>("");
    const [pdfBtnHTML, setPdfBtnHTML] = useState<string>("");
    const [isHtmlFlag, setIsHtmlFlag] = useState<boolean>(false);
    const [isPreview, setIsPreview] = useState<any>(false);
    const [isEditSign, setIsEditSign] = useState<boolean>(false);
    //
    const [fileNames, setFileNames] = useState<string[]>([]);
    const [isPDF, setIsPDF] = useState<boolean>(false);

    useEffect(() => {
        if(id && typeof parseInt(id) == "number"){
            dispatch(GetSign(id));
        } else {
            back();
        }
        dispatch(ChangeDocumentFormState(true));
    }, []);

    useEffect(() => {
        if(isLoading && isHtmlFlag){
            let _docText = docText;
            let _header = headerHTML;
            let _footer = footerHTML;
            if(_docText.length == 0) _docText = dsSelector.sign_data.html;
            if(isPreview){
                setTimeout(() => {
                    var header = document.head.innerHTML;
                    var pre = window.open("", '1429893142534','width=1080px,height=1528,toolbar=0,menubar=0,location=0,status=0,scrollbars=1,resizable=0,left=0,top=0');
                    pre?.document.write(header);
                    // pre?.document.write(`<div class="form_wrapper overflowAuto">${_header + pdfBtnHTML + _docText + _footer}</div>`);
                    pre?.document.write(`<div class="form_wrapper overflowAuto">${pdfBtnHTML}<img src="${isPreview}" /></div>`);
                    pre?.document.close();
                    pre?.document.getElementById(`pdf`)?.addEventListener(`click`, ()=>{
                        onClickPDF();
                    });
                    pre?.document.getElementById(`close`)?.addEventListener(`click`, ()=>{
                        pre?.close();
                    });
                    pre?.document.getElementById(`btnPDF`)?.setAttribute(`src`, PdfSvg);
                    pre?.document.getElementById(`btnClose`)?.setAttribute(`src`, CancelSvg);
                }, 1000);
            } else if(isEditSign){
                dispatch(EditSign(dsSelector.sign_data.id, _docText , _header, _footer, commentText));
            }
            setIsPreview(null);
            setIsLoading(false);
            setIsEditMode(false);
            setIsEditSign(false);
            setIsHtmlFlag(false);
        }
    }, [signHTML]);

    useEffect(() => {
        if(dsSelector.sign_data){
            setDocText(dsSelector.sign_data.html);
            setIsLoading(true);
            setTimeout(() => {
                setIsHtmlFlag(true);
                setTimeout(() => {
                    setIsHtmlFlag(false);
                    setTimeout(() => {
                        setIsLoading(false);
                    }, 1000);
                }, 500);
            }, 3000);
        }
    }, [ dsSelector.sign_data ]);

    useEffect(() => {
        if(dsSelector.sign_line){
            let is_now_sign = null;
            for(var line of dsSelector.sign_line){
                if(line.user_id == userSelector.id){
                    if(line.state == "3" || line.state == "4"){
                        setIsFinishSign(true)
                    }
                    if(line.state == "8" || line.state == "9"){
                        return setIsDeferSign(true);
                    }
                    else if(line.state == "2"){
                        setIsFinishSign(false);
                        if(is_now_sign == null) is_now_sign = true;
                    }
                } else if((line.state == "2" || line.state == "7") && is_now_sign == null) {
                    is_now_sign = false;
                }
            }
            setIsNowSign(is_now_sign ? true : false);
        }
    }, [ dsSelector.sign_line ]);

    useEffect(() => {
        if(dsSelector.sign_refer){
            setSignReferList(dsSelector.sign_refer);
        }
    }, [ dsSelector.sign_refer ])

    useEffect(() => {
        if(dsSelector.sign_files){
            setFileNames([...dsSelector.sign_files]);
        }
    }, [ dsSelector.sign_files ]);

    useEffect(() => {
        if(dsSelector.approval_sign_fin){
            dispatch(DeactiveModal());
            setTimeout(() => {
                setIsLoading(false);
                ModalInfo("결재 완료.");
                back();
            } , 2000);
        }
    }, [ dsSelector.approval_sign_fin ]);

    useEffect(() => {
        if(dsSelector.edit_sign_fin){
            dispatch(DeactiveModal());
            setIsLoading(false);
            ModalInfo("수정 완료.");
            dispatch(GetSign( dsSelector.sign_data.id ));
        }
    }, [ dsSelector.edit_sign_fin ]);


    useEffect(() => {
        if(dsSelector.reject_sign_fin){
            dispatch(DeactiveModal());
            setTimeout(() => {
                setIsLoading( false );
                ModalInfo("결재 반려.");
                back();
            }, 2000);
        }
    }, [ dsSelector.reject_sign_fin ]);

    useEffect(() => {
        if(dsSelector.cancel_sign_fin){
            dispatch(DeactiveModal());
            setTimeout(() => {
                setIsLoading( false );
                ModalInfo("결재 취소.");
                back();
            }, 2000);
        }
    }, [ dsSelector.cancel_sign_fin ]);

    useEffect(() => {
        if(dsSelector.re_request_sign_fin){
            dispatch(DeactiveModal());
            setTimeout(() => {
                setIsLoading( false );
                ModalInfo("재상신 완료");
                pushHistory("/fbtemporary");
            }, 2000);
        }
    }, [ dsSelector.re_request_sign_fin ]);

    const onClickApprovalSign = async( comment ?: string, isPrevApproval ?: boolean )=>{
        if(userSelector.id == dsSelector.sign_data.user_id) return;
        setCertifyOpen(false);
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 5000);
        if(isPrevApproval)
            await dispatch(PrevApprovalSign(dsSelector.sign_data.id, comment ? comment : ""));
        else
            await dispatch(ApprovalSign(dsSelector.sign_data.id, comment ? comment : ""));
    }

    const onClickRejectSign = async(comment : string)=>{
        if(userSelector.id == dsSelector.sign_data.user_id) return;
        setRejectOpen(false);
        await dispatch(RejectSign(dsSelector.sign_data.id, comment));
        setIsLoading(true);
    }

    const onClickCancelSign = async(comment : string)=>{
        if(userSelector.id != dsSelector.signed_user[0].id) return;
        setSignCancel(false);
        await dispatch(CancelSign(dsSelector.sign_data.id, comment, dsSelector.signed_user[0].state));
        setIsLoading(true);
    }

    const onClickCancel = async()=>{
        back();
    }

    const onClickEditSign = async(comment : string)=>{
        setCommentText(comment);
        setCommentOpen(false);
        setIsLoading(true);
        setIsEditMode(false);
        setIsEditSign(true);
        setIsHtmlFlag(true);
    }

    const onClickReRequestSign = async()=>{
        setIsLoading(true);
        await dispatch(ReRequestSign( dsSelector.sign_data.id ));
    }

    const onClickEdit = async()=>{
        if(!isEditMode){
            setIsEditMode(true);
        } else {
            setCommentOpen(true);
        }
    }

    const onClickBtmBtn = ( flag : number )=>{
        // console.log(dsSelector.signed_user[0].state);
        if((dsSelector.signed_user[0].state == 3 || dsSelector.signed_user[0].state == 1) && flag == 4)
            setSignCancel(true);
        if(flag == 3)
            onClickEdit();
        if(flag == 5)
            onClickReRequestSign();
        
        if(dsSelector.sign_data == undefined || userSelector.id == dsSelector.sign_data.user_id || isEditMode)
            return;
        if(flag == 1){
            setRejectOpen(true);
        } else if(flag == 2){
            setCertifyOpen(true);
        }
    }

    const onClickPreview = (preview_img : any) => {
        setIsPreview(preview_img);
        setIsLoading(true);
        setIsHtmlFlag(true);
    };

    const AddSign = (html : string, header : string, footer : string, previewpdf ?: string) => {
        setSignHTML(header + html + footer);
        setHeaderHTML(header);
        setFooterHTML(footer);
        setPdfBtnHTML(previewpdf ? previewpdf : "");
    }

    const onClickPDF = () => {
        setIsPDF(true);
    }

    const onChangeHTML = (html : string) => {
        setDocText(html);
        setSignHTML(headerHTML+html+footerHTML);
    }

    const disabledBtn = isFinishSign || isDeferSign || dsSelector.sign_data == undefined || userSelector.id == dsSelector.sign_data.user_id || dsSelector.sign_data.sign_state == "4" || isEditMode || !isNowSign;
    const disabledEditBtn = isFinishSign || isDeferSign || dsSelector.sign_data == undefined || userSelector.id == dsSelector.sign_data.user_id || dsSelector.sign_data.sign_state == "4" || dsSelector.sign_data.is_regist == 1;
    const disableSignCancel = dsSelector.sign_data == undefined || dsSelector.signed_user == undefined || dsSelector.sign_data.sign_state == "4" 
                                || userSelector.id != dsSelector.sign_data.user_id || userSelector.id != dsSelector.signed_user[0].id;
    return (
        <S.Block>
            <SignCommentComp 
                onClose={()=>setCommentOpen(false)}
                onComplete={onClickEditSign}
                visible={commentOpen}
                />
            <ApprovalRejectComp 
                visible={rejectOpen}
                onClose={()=>setRejectOpen(false)} 
                onComplete={onClickRejectSign}
                />
            <ApprovalCertifyComp 
                visible={certifyOpen} 
                onClose={()=>setCertifyOpen(false)} 
                onComplete={onClickApprovalSign}
                />
            <ApprovalCancelComp
                visible={signCancel}
                onClose={()=>setSignCancel(false)}
                onComplete={onClickCancelSign}
                />
            <LoadingIndicatorComponent open={isLoading} />
            <S.Bg $isMain={true}>
                <S.EnterTop>
                    <DocumentMenuComponent
                        html={signHTML}
                        onClickCancel={onClickCancel}
                        onClickSignCancel={()=>setSignCancel(true)}
                        onChangeSignLine={(lines : object[])=>setSignLineList(lines)}
                        // onChangeSignRefer={(lines : object[])=>setSignReferList(lines)}
                        onClickEdit={onClickEdit}
                        onClickPreview={onClickPreview}
                        isPDF={isPDF}
                        isEditMode={isEditMode}
                        // activeRefer
                        activePDF
                        activeEdit
                        activePreview
                        activeSignCancel
                        />
                </S.EnterTop>
                <S.DocumentContent>
                    <DocumentFormComp
                        onChangeContent={(str)=>onChangeHTML(str)} 
                        formId={dsSelector.new_form_id} 
                        html={dsSelector.sign_data ? dsSelector.sign_data.html : ""}
                        disableEdit={!isEditMode}
                        isRegist={dsSelector.sign_data && dsSelector.sign_data.is_regist ? true : false }
                        isSignwait={dsSelector.sign_data ? true : false }
                        AddSign={AddSign}
                        isHtmlFlag={isHtmlFlag}
                        />
                </S.DocumentContent>
                <S.EnterBottom>
                    <S.FileView>
                        <div>첨부파일 {fileNames.length}개</div>
                        {fileNames?.length > 0 && fileNames.map((raw: any, idx) => {
                            return (
                                <div key={idx}>
                                    <img src={ClipSvg} />
                                    <a href={raw.url} target="_blank" download={raw.filename}>{raw.filename}</a>
                                </div>
                            )
                        })}
                    </S.FileView>
                    <S.BtmBtn 
                        $color={"#3E8A8B"}
                        $disabled={disableSignCancel}
                        onClick={()=>!disableSignCancel ? onClickBtmBtn(4) : null}
                        >결재취소</S.BtmBtn>
                    {dsSelector.sign_data && dsSelector.sign_data.sign_state == 4 && dsSelector.sign_data.user_id == userSelector.id  && dsSelector.sign_data.is_re_request == false ? 
                        <S.BtmBtn 
                            $color={"#3E8A8B"}
                            onClick={()=>onClickBtmBtn(5)}
                            >재상신</S.BtmBtn>
                        :
                        <S.BtmBtn 
                            $color={"#3E8A8B"}
                            $disabled={disabledBtn}
                            onClick={()=>!disabledBtn ? onClickBtmBtn(1) : null}
                            >반려</S.BtmBtn>
                    }
                    <S.BtmBtn 
                        $color={"#EB5539"}
                        $disabled={disabledBtn}
                        onClick={()=>!disabledBtn ? onClickBtmBtn(2) : null}
                        >결재</S.BtmBtn>
                    {/* <S.BtmBtn 
                        $color="#6084CB"
                        $disabled={disabledEditBtn}
                        onClick={()=>!disabledEditBtn ? onClickBtmBtn(3) : null}
                        >{isEditMode ? "수정완료" : "수정"}</S.BtmBtn> */}
                </S.EnterBottom>
            </S.Bg>
            <S.Bg $isMain={false}>
                <DocumentSideMenuComponent 
                    signLines={signLineList}
                    signRefers={signReferList}
                    isRequested
                    />
            </S.Bg>
        </S.Block>
    );
};

export default DocumentViewPage;