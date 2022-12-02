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
import { ChangeDocumentFormState, GetOfflineSign, SendSign } from "../common/action";
import { DocumentMenuComponent } from "../components";
import { ModalInfo, LoadingIndicatorComponent } from "components";
import { useLocations } from "hooks";
import * as S from "../styled/documentsend.styled";
import ClipSvg from "../images/fontawsomeicon/paperclip-solid.svg";
import { DocumentOfflineFormComp, DocumentSideMenuComponent } from "../components";
//

type paramTypes = {
    id?: string;
};

const DocumentOffSendPage = (props: any) => {
    const dispatch = useDispatch();
    const dsSelector = useSelector((state: reducerState) => state.digitalsign);
    const userSelector = useSelector((state: reducerState) => state.user);
    const { back } = useLocations();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [signLineList, setSignLineList] = useState<object[]>([]);
    const [signReferList, setSignReferList] = useState<object[]>([]);
    const { id } = useParams<paramTypes>();
    const [fileNames, setFileNames] = useState<string[]>([]);

    const [isPrint, setIsPrint] = useState<boolean>(false);
    const [isHtmlFlag, setIsHtmlFlag] = useState<boolean>(false);
    const [signHTML, setSignHTML] = useState<string>("");

    useEffect(() => {
        if (id && typeof parseInt(id) == "number") {
            dispatch(GetOfflineSign(id));
        } else {
            back();
        }
        dispatch(ChangeDocumentFormState(false));
    }, []);

    useEffect(() => {
        if (dsSelector.sign_files) {
            setFileNames([...dsSelector.sign_files]);
        }
    }, [dsSelector.sign_files]);

    const onClickCancel = async () => {
        back();
    };

    const onClickPrint = () => {
        setIsLoading(true);
        setIsHtmlFlag(true);
        setIsPrint(true);
    };

    const AddSign = (html : string, header : string, footer : string) => {
        setSignHTML(header + html + footer);
    }

    // const onClickRequestSend = async()=>{
    //     if(dsSelector.sign_data && dsSelector.sign_data.sign_state == 4) return;
    //     setIsLoading(true);
    //     dispatch(SendSign(dsSelector.sign_data.id));
    // }

    // const isDisabled = dsSelector.sign_data == undefined || dsSelector.sign_data.sign_state == 4 || dsSelector.sign_data.sign_state == 3 || dsSelector.sign_data.user_id != userSelector.id;
    // const isRejected = dsSelector.sign_data && dsSelector.sign_data.sign_state == 4;

    return (
        <S.Block>
            <LoadingIndicatorComponent open={isLoading} />
            <S.Bg $isMain={true}>
                <S.EnterTop>
                    <DocumentMenuComponent
                        onClickCancel={onClickCancel}
                        onChangeSignLine={(lines: object[]) => setSignLineList(lines)}
                        onChangeSignRefer={(referer: object[]) => setSignReferList(referer)}
                        onClickPrint={onClickPrint}
                        activePDF
                        html={signHTML}
                        docRegist
                        class_name="offline_form"
                    />
                </S.EnterTop>
                <S.DocumentContent>
                    {/* editor here */}
                    <DocumentOfflineFormComp isComplete signData={signLineList} AddSign={AddSign} isHtmlFlag={isHtmlFlag} />
                </S.DocumentContent>
                <S.EnterBottom>
                    <S.FileView>
                        <div>첨부파일 {fileNames.length}개</div>
                        {fileNames?.length > 0 &&
                            fileNames.map((raw: any, idx) => {
                                return (
                                    <div key={idx}>
                                        <img src={ClipSvg} />
                                        <a target="_blank" href={raw.url} download={raw.filename}>
                                            {raw.filename}
                                        </a>
                                    </div>
                                );
                            })}
                    </S.FileView>
                    {/* <S.CompleteBtn 
                        $disabled={isDisabled} 
                        onClick={()=>!isDisabled ? onClickRequestSend() : null}
                        >{isRejected ? "반려" : "발송하기"}</S.CompleteBtn> */}
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

export default DocumentOffSendPage;
