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
    SendSign,
    DeactiveModal,
    ChangeDocumentFormState
} from "../common/action";
import { 
    DocumentMenuComponent,
    DocumentSideMenuComponent,
    DocumentFormComp,
} from "../components";
import { ModalInfo, LoadingIndicatorComponent } from "components";
import { useLocations } from "hooks";
import * as S from "../styled/documentsend.styled";
import ClipSvg from "../images/fontawsomeicon/paperclip-solid.svg";
//

type paramTypes ={
    id ?: string;
}

const DocumentSendPage = (props : any)=> {
    const dispatch = useDispatch();
    const dsSelector = useSelector((state : reducerState)=> state.digitalsign);
    const userSelector = useSelector((state : reducerState)=> state.user);
    const { back } = useLocations();
    const [docText, setDocText] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [signLineList, setSignLineList] = useState<object[]>([]);
    const [signReferList, setSignReferList] = useState<object[]>([]);
    const { id } = useParams<paramTypes>();
    const [fileNames, setFileNames] = useState<string[]>([]);

    const [isPrint, setIsPrint] = useState<boolean>(false);
    const [isHtmlFlag, setIsHtmlFlag] = useState<boolean>(false);
    const [signHTML, setSignHTML] = useState<string>("");
    const [headerHTML, setHeaderHTML] = useState<string>("");
    const [footerHTML, setFooterHTML] = useState<string>("");

    useEffect(() => {
        if(id && typeof parseInt(id) == "number"){
            dispatch(GetSign(id));
        } else {
            back();
        }
        dispatch(ChangeDocumentFormState(false));
    }, []);

    useEffect(() => {
        if(isLoading && isHtmlFlag){
            if(isPrint){
                var header = document.head.innerHTML;
                var pre = window.open("","_blank");
                pre?.document.write(header);
                pre?.document.write(signHTML);
                pre?.document.close();
                setTimeout(() => {
                    pre?.print();
                }, 500);
                setIsPrint(false);
            }
            setIsLoading(false);
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
            }, 4000);
        }
    }, [ dsSelector.sign_data ]);

    useEffect(() => {
        if(dsSelector.sign_files){
            setFileNames([...dsSelector.sign_files]);
        }
    }, [ dsSelector.sign_files ]);

    useEffect(() => {
        if(dsSelector.send_sign_fin){
            dispatch(DeactiveModal());
            setTimeout(() => {
                setIsLoading(false);
                ModalInfo("발송 완료.");
                back();
            } , 2000);
        }
    }, [ dsSelector.send_sign_fin ]);

    const onClickRequestSend = async()=>{
        if(dsSelector.sign_data && dsSelector.sign_data.sign_state == 4) return;
        setIsLoading(true);
        dispatch(SendSign(dsSelector.sign_data.id));
    }

    const onClickCancel = async()=>{
        back();
    }

    const onClickPrint = () => {
        setIsLoading(true);
        setIsHtmlFlag(true);
        setIsPrint(true);
    };

    const AddSign = (html : string, header : string, footer : string) => {
        setSignHTML(header + html + footer);
        setHeaderHTML(header);
        setFooterHTML(footer);
    }

    const isDisabled = dsSelector.sign_data == undefined || dsSelector.sign_data.sign_state == 4 || dsSelector.sign_data.sign_state == 3 || dsSelector.sign_data.user_id != userSelector.id;
    const isRejected = dsSelector.sign_data && dsSelector.sign_data.sign_state == 4;

    return (
        <S.Block>
            <LoadingIndicatorComponent open={isLoading} />
            <S.Bg $isMain={true}>
                <S.EnterTop>
                    <DocumentMenuComponent 
                        onClickSign={onClickRequestSend}
                        onClickCancel={onClickCancel}
                        onChangeSignLine={(lines : object[])=>setSignLineList(lines)}
                        onChangeSignRefer={(referer : object[])=>setSignReferList(referer)}
                        onClickPrint={onClickPrint}
                        activePDF
                        html={signHTML}
                        docRegist
                        />
                </S.EnterTop>
                <S.DocumentContent>
                    {/* editor here */}
                    <DocumentFormComp
                        onChangeContent={(str)=>setDocText(str)} 
                        formId={dsSelector.new_form_id} 
                        html={docText}
                        disableEdit={true}
                        isComplete
                        signData={signLineList}
                        isHtmlFlag={isHtmlFlag}
                        AddSign={AddSign}
                        />
                </S.DocumentContent>
                <S.EnterBottom>
                    <S.FileView>
                    <div>첨부파일 {fileNames.length}개</div>
                        {fileNames?.length > 0 && fileNames.map((raw: any, idx) => {
                            return (
                                <div key={idx}>
                                    <img src={ClipSvg} /><a target="_blank" href={raw.url} download={raw.filename}>{raw.filename}</a>
                                </div>
                            )
                        })}
                    </S.FileView>
                    <S.CompleteBtn 
                        $disabled={isDisabled} 
                        onClick={()=>!isDisabled ? onClickRequestSend() : null}
                        >{isRejected ? "반려" : "발송하기"}</S.CompleteBtn>
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

export default DocumentSendPage;