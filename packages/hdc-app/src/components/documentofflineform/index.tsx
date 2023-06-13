/******************************************************************************
 * * hooks :
 * useLocations
 *
 * components :
 * ConfirmButton
 *
 ******************************************************************************/
// Library
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as S from "./styled";
import { LoadingIndicatorComponent, WebEditorComponent } from "components";
import { getMoment } from "../../common/utils";
const moment = getMoment();
import { reducerState } from "../../common";

export type DocumentOfflineFormProps = {
    signData?: object[];
    signedUser?: string;
    isRegist?: boolean;
    isComplete?: boolean;
    isSignwait?: boolean;
    AddSign?: (str: string, head: string, foot: string) => void;
    isHtmlFlag?: boolean;
};
interface FinalDocumentOfflineFormProps extends DocumentOfflineFormProps {}

export const DocumentOfflineFormComp: React.FunctionComponent<FinalDocumentOfflineFormProps> = (
    props: FinalDocumentOfflineFormProps
) => {
    const dsSelector = useSelector((state: reducerState) => state.digitalsign);
    const orgSelector = useSelector((state: reducerState) => state.organization);
    const userSelector = useSelector((state: reducerState) => state.user);
    const compSelector = useSelector((state: reducerState) => state.components);
    const [doc_offline, setDocOffline] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [sign, setsign] = useState<string>("");
    const [signMark, setSignMark] = useState<string>("");
    const [userSign, setUserSign] = useState<string>("");
    const [registSign, setRegistSign] = useState<string>("");
    const [issueSignature, setissueSignature] = useState<string>("");
    const [recvSignature, setRecvSignature] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        setIsLoading(true);
        if (dsSelector.sign_data) {
            let sign_data: any = dsSelector.sign_data;
            setElementValue(
                "cc_input",
                `${sign_data.doc_cc}${
                    sign_data.custom_referer ? "\n" + sign_data.custom_referer : ""
                }`,
                true
            );
            setDocOffline(`<div class="form_container offline_form" id="doc_offline">
                <div id="doc_header_offsign"></div>
                <div id="doc_footer_offsign"></div>
                <div id="doc_body_offsign"></div>
            </div>`);

            let _content = `
            <div class="docu_box">
                <div class="docu_title">문 서 번 호</div>
                <div class="docu" id="title_input"> : ${sign_data.document_code}</div>
            </div>
            <div class="docu_box">
                <div class="docu_title">문 서 제 목</div>
                <div class="docu" id="title_input"> : ${sign_data.title}</div>
            </div>
            <div class="docu_box">
                <div class="docu_title">${
                    sign_data.sign_state == 10 ? `수 신 처` : `발 신 처`
                }</div>
                <div class="docu" id="title_input"> : ${
                    sign_data.sign_state == 10 ? sign_data.doc_recv : sign_data.doc_sender
                }</div>
            </div>
            <div class="docu_box">
                <div class="docu_title">${
                    sign_data.sign_state == 10 ? `발 신 일 자` : `수 신 일 자`
                }</div>
                <div class="docu" id="title_input"> : ${moment(
                    sign_data.sign_state == 10 ? sign_data.sended_at : sign_data.registed_at
                ).format(`YYYY-MM-DD`)}</div>
            </div>`;
            setContent(_content);
            var send_at = moment(sign_data.sended_at);
            var regist_at = moment(sign_data.registed_at);
            //TODO ::: LEGECY CODE
            setSignMark(`
                <div class='sign_layout ${sign_data.form_key}'>
                    <p class='sign_bg'><img src='assets/images/hdc/sign_layout.png' /></p>
                    <p id='sign_title' class='sign_title'>발 송</p>
                    <p id='sign_date' class='sign_date'>${send_at.format("YYYY.MM.DD.")}</p>
                    <p id='sign_comp' class='sign_comp'>${
                        dsSelector.sign_org[0].company == "신한종합건축사사무소"
                            ? "SHINHAN"
                            : dsSelector.sign_org[0].company
                    }</p>
                </div>
            `);

            setUserSign(
                `<img src="${sign_data.issue_signature_img}" class='user_sign sign_layout ${sign_data.form_key}' style='' id="sign_user"/>`
            );

            if (sign_data.is_regist == 1 && dsSelector.sign_org != undefined) {
                setRegistSign(`
                    <div class='sign_regist_layout ${sign_data.form_key}'>
                        <p class='sign_regist_bg'><img src='assets/images/hdc/sign_regist_layout.png' /></p>
                        <p id='sign_regist_title' class='sign_regist_title'>접 수</p>
                        <p id='sign_regist_date' class='sign_regist_date'>${regist_at.format(
                            "YYYY.MM.DD."
                        )}</p>
                        <p id='sign_regist_comp' class='sign_regist_comp'>${
                            dsSelector.sign_org[0].company == "신한종합건축사사무소"
                                ? "SHINHAN"
                                : dsSelector.sign_org[0].company
                        }</p>
                    </div>
                    `);
            }
            setTimeout(() => {
                settingPropHTML(_content);
            }, 1000);
            setTimeout(() => {
                setElementValues();
            }, 2000);
            setTimeout(() => {
                setIsLoading(false);
            }, 1500);
        }
    }, [dsSelector.sign_data]);

    useEffect(() => {
        if (dsSelector.sign_line && dsSelector.sign_line.length > 0 && dsSelector.sign_data) {
            let SignHead = "<div class='SignText'>결재</div>";
            for (var i = 0; i <= dsSelector.sign_line.length - 1; i++) {
                let raw = dsSelector.sign_line[i];
                if (i == (dsSelector.sign_data.group_id == 1 ? 8 : 5))
                    SignHead += "<div class='SignText'></div>";
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
            setsign(
                `<div class='${
                    dsSelector.sign_data.group_id == 1 ? `SignHeadDiv2` : `SignHeadDiv`
                }'>${SignHead}</div>`
            );
        }
    }, [dsSelector.sign_line]);

    useEffect(() => {
        if (dsSelector.sign_data) settingPropHTML();
    }, [compSelector.onlyDocument, props.isComplete, props.isRegist, doc_offline]);

    const setElementValues = () => {
        let _data = dsSelector.sign_data;

        setElementValue("doc_id_input", _data.document_code);
        setElementValue("recv_input", _data.doc_recv);
        setElementValue("sender_input", _data.doc_sender);
        setElementValue(
            "cc_input",
            `${_data.doc_cc}${_data.custom_referer ? "\n" + _data.custom_referer : ""}`
        );
        setElementValue("title_input", _data.title);
        setElementValue("tel_input", _data.doc_tel);
        // if(_data.group_id != 4)
        setElementValue(
            "fax_input",
            _data.group_id == 1 ? "055-643-9128" : _data.doc_fax ? _data.doc_fax : "000-000-0000"
        );
        setElementValue("email_input", _data.doc_email);
        let dateText = ` ${moment(_data.created_at).format("YYYY.MM.DD.")}`;
        if (_data.group_id == 3) dateText = ` (${moment(_data.created_at).format("YYYY.MM.DD.")})`;
        setElementValue("date_input", dateText);
    };

    const setDocument = (html: string, type: number) => {
        let typeId = "";
        if (type == 0) {
            typeId = "doc_header_offsign";
        } else if (type == 1) {
            typeId = "doc_footer_offsign";
        } else if (type == 2) {
            typeId = "doc_body_offsign";
        }
        var doc = document.getElementById(typeId);
        if (doc) doc.innerHTML = html.toString();
    };

    const settingPropHTML = (_content?: string) => {
        document.getElementById(`title_input`)?.setAttribute(`contenteditable`, `false`);
        let sd = dsSelector.sign_data;
        setDocument(`${_content ? _content : content}`, 2);
        if (props.isComplete || props.isSignwait) {
            if (
                sd.group_id == userSelector.company &&
                dsSelector.sign_line.length > 0 &&
                (sd.is_regist == 1 ||
                    sign.length > 0 ||
                    document.getElementById(`doc_header_sign`)?.innerHTML)
            ) {
                setDocument(`${sign}`, 0);
            }
            if (sd.sign_state == 3 || sd.sign_state == 10) {
                setDocument(`${signMark}${userSign}${issueSignature}`, 1);
            } else if (sd.sign_state == 6) {
                setDocument(`${issueSignature}${recvSignature}${signMark}${userSign}`, 1);
            } else if (sd.sign_state == 2 || sd.is_ceo_signed == 1) {
                if (userSign) setDocument(`${userSign}`, 1);
            }
        } else {
            if (sd.is_ceo_signed == 1) setDocument(`${userSign}`, 1);
            document.getElementById(`title_input`)?.setAttribute(`contenteditable`, `true`);
        }
        if (sd.is_regist && sd.form_group_id != userSelector.company) {
            setDocument(`${issueSignature}${recvSignature}${registSign}${userSign}`, 1);
        }
        setTimeout(() => {
            addSign();
        }, 1000);
    };

    const setElementValue = (Id: string, value: any, isChange?: boolean) => {
        if (document.getElementById(Id)) {
            let e = document.getElementById(Id);
            if (document.getElementById(Id)?.tagName == "P") {
                if (e && isChange) {
                    e.innerHTML =
                        !value || value.toString() == "Invalid date" ? "" : value.toString();
                    return;
                }
                if (e && value && e.innerHTML.indexOf(value.toString()) == -1)
                    e.innerHTML =
                        !value || value.toString() == "Invalid date" ? "" : value.toString();
            } else if (e && e.getAttribute("value") != value)
                document.getElementById(Id)?.setAttribute("value", value);
        }
    };

    const addSign = () => {
        if (props.AddSign) {
            var head = document.getElementById("doc_header_offsign");
            var body = document.getElementById("doc_body_offsign");
            var foot = document.getElementById("doc_footer_offsign");

            if (head && body) {
                var headHtml = head.outerHTML;
                var footHtml = foot ? foot.outerHTML : "";
                props.AddSign(body.outerHTML, headHtml, footHtml);
            }
        }
    };

    return (
        <S.Block>
            <LoadingIndicatorComponent open={isLoading} />
            <div id="offline_wrapper" dangerouslySetInnerHTML={{ __html: doc_offline }}></div>
        </S.Block>
    );
};
