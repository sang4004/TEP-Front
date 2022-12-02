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
    DeactiveModal,
    ChangeDocumentFormState,
    GetAddressbook,
    GetOfflineSign,
    RequestSign,
} from "../common/action";
import {
    DocumentMenuComponent,
    DocumentSideMenuComponent,
    DocumentBtmComponent,
    DocumentOfflineFormComp,
} from "../components";
import { ModalInfo, LoadingIndicatorComponent, ToastComponent } from "components";
import { useLocations } from "hooks";
import * as S from "../styled/documentnew.styled";
//

type paramTypes = {
    id?: string;
};

const DocumentOffEditPage = (props: any) => {
    const dispatch = useDispatch();
    const dsSelector = useSelector((state: reducerState) => state.digitalsign);
    const { pushHistory, back } = useLocations();
    const [docText, setDocText] = useState<string>("");
    const [signHTML, setSignHTML] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [signLineList, setSignLineList] = useState<object[]>([]);
    const [signReferList, setSignReferList] = useState<object[]>([]);
    const [visibleToast, setVisibleToast] = useState<boolean>(false);
    const [completeSignData, setCompleteSignData] = useState<boolean>(false);
    //
    const [isHtmlFlag, setIsHtmlFlag] = useState<boolean>(false);
    const [isSign, setIsSign] = useState<boolean>(false);

    //
    const { id } = useParams<paramTypes>();

    useEffect(() => {
        if (id && typeof parseInt(id) == "number") {
            dispatch(GetAddressbook());
            dispatch(GetOfflineSign(id));
        } else {
            back();
        }
        dispatch(ChangeDocumentFormState(true));
    }, []);

    useEffect(() => {
        if (dsSelector.sign_data) {
            setCompleteSignData(true);
        }
    }, [dsSelector.sign_data]);

    useEffect(() => {
        if (isLoading && isHtmlFlag) {
            if (isSign) {
                dispatch(
                    RequestSign(dsSelector.sign_data.id, "", "", "", [
                        ...signLineList.map((raw: any, idx) => raw.user_id),
                    ])
                );
            }
            setIsSign(false);
        }
    }, [isSign]);

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
        setIsLoading(true);
        setIsSign(true);
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
                        onChangeSignLine={(lines: object[]) => setSignLineList(lines)}
                        onChangeSignRefer={(lines: object[]) => setSignReferList(lines)}
                        activeRequestSign
                        activeSignInfo
                        activeCancel={dsSelector.sign_data && !dsSelector.sign_data.is_regist}
                        activeRefer
                        class_name="form_container"
                    />
                </S.EnterTop>
                <S.DocumentContent>
                    {/* editor here */}
                    <DocumentOfflineFormComp
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

export default DocumentOffEditPage;
