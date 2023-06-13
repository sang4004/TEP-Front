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
import { WebEditorComponent } from "components";
import { EditorComp } from "../froalaeditor";
import { useWindowDimensions } from "hooks";
import { getMoment } from "../../common/utils";
import { reducerState } from "../../common";

const moment = getMoment();

export type DocumentFormProps = {
    formId: number;
    onChangeContent: (str: string) => void;
    html?: string;
    disableEdit?: boolean;
    isComplete?: boolean;
    signData?: object[];
    AddSign?: (str: string, head: string, foot: string, pdf?: string) => void;
    signedUser?: string;
    isRegist?: boolean;
    isSignwait?: boolean;
    isHtmlFlag?: boolean;
    isNewEditor?: boolean;
};
interface FinalDocumentFormProps extends DocumentFormProps {}

export const DocumentFormComp: React.FunctionComponent<FinalDocumentFormProps> = (
    props: FinalDocumentFormProps
) => {
    const dsSelector = useSelector((state: reducerState) => state.digitalsign);
    const orgSelector = useSelector((state: reducerState) => state.organization);
    const userSelector = useSelector((state: reducerState) => state.user);
    const compSelector = useSelector((state: reducerState) => state.components);
    const [html, setHtml] = useState<string | undefined>("");
    const [propHtml, setPropHtml] = useState<string>("");
    const [doc_header, setHeader] = useState<string>("");
    const [doc_footer, setFooter] = useState<string>("");
    const [count, setCount] = useState<boolean>(false);
    const { height } = useWindowDimensions();
    const [sign, setsign] = useState<string>("");
    const [signMark, setSignMark] = useState<string>("");
    const [userSign, setUserSign] = useState<string>("");
    const [registSign, setRegistSign] = useState<string>("");
    const [issueSignature, setissueSignature] = useState<string>("");
    const [recvSignature, setRecvSignature] = useState<string>("");
    const [diffVal, setDiffVal] = useState<number>(0);

    useEffect(() => {
        if (html) {
            props.onChangeContent(html);
        }
    }, [html]);

    useEffect(() => {
        setTimeout(() => {
            if (props.disableEdit) {
                document.getElementById(`title_input`)?.setAttribute(`contenteditable`, `false`);
                document.getElementById(`date_input`)?.setAttribute(`contenteditable`, `false`);
                document
                    .getElementById(`business_title_input`)
                    ?.setAttribute(`contenteditable`, `false`);
                document.getElementById(`reply_input`)?.setAttribute(`contenteditable`, `false`);
            } else {
                document.getElementById(`title_input`)?.setAttribute(`contenteditable`, `true`);
                document.getElementById(`date_input`)?.setAttribute(`contenteditable`, `true`);
                document
                    .getElementById(`business_title_input`)
                    ?.setAttribute(`contenteditable`, `true`);
                document.getElementById(`reply_input`)?.setAttribute(`contenteditable`, `true`);
            }
        }, 2000);
    }, [props.disableEdit]);

    useEffect(() => {
        if (props.isHtmlFlag && props.AddSign) {
            var head = document.getElementById("doc_header");
            var body = document.getElementById("doc_body");
            var foot = document.getElementById("doc_footer");

            if (head && body) {
                var headHtml = head.outerHTML;
                var footHtml = foot ? foot.outerHTML : "";
                var clickpdf = `<div class="preview_pdf"><button id="pdf"><img id="btnPDF"/><p>PDF 다운로드</p></button><button id = "close"><img id="btnClose"/><p>닫기</p></button></div>`;
                let diff = diffVal ? "\n" : "\n\n";
                props.AddSign(
                    body.outerHTML + diff,
                    headHtml + diff,
                    footHtml + diff,
                    clickpdf + diff
                );
            }
            setDiffVal(diffVal == 0 ? 1 : 0);
        }
    }, [props.isHtmlFlag]);

    useEffect(() => {
        if (dsSelector.sign_data && !count) {
            setElementValues();
        }
    }, [propHtml]);

    useEffect(() => {
        if (dsSelector.sign_data && dsSelector.sign_data.company) {
            let _sign, _signMark, _userSign, _issueSignature, _recvSignature, _registSign;
            let sign_data: any = dsSelector.sign_data;
            setElementValue(
                "cc_input",
                `${sign_data.doc_cc}${
                    sign_data.custom_referer ? "\n" + sign_data.custom_referer : ""
                }`,
                true
            );
            setHeader(sign_data.doc_header);
            setFooter(sign_data.doc_footer);
            if (sign_data.form_key.indexOf("tr") != -1) {
                if (sign_data.issue_signature_img) {
                    _issueSignature = `<img src="${sign_data.issue_signature_img}" class='issue_signature_img ${sign_data.form_key}' style=''/>`;
                    setissueSignature(_issueSignature);
                }
                if (sign_data.recv_signature_img) {
                    _recvSignature = `<img src="${sign_data.recv_signature_img}" class='recv_signature_img ${sign_data.form_key}' style=''/>`;
                    setRecvSignature(_recvSignature);
                }
            }

            var send_at = moment(sign_data.sended_at);
            var regist_at = moment(sign_data.registed_at);
            //TODO ::: LEGECY CODE
            _signMark = `
                <div class='sign_layout ${sign_data.form_key}'>
                    <p class='sign_bg'><img src='assets/images/hdc/sign_layout.png' /></p>
                    <p id='sign_title' class='sign_title'>발 송</p>
                    <p id='sign_date' class='sign_date'>${send_at.format("YYYY.MM.DD.")}</p>
                    <p id='sign_comp' class='sign_comp'>${
                        sign_data.company == "신한종합건축사사무소" ? "SHINHAN" : sign_data.company
                    }</p>
                </div>
            `;
            setSignMark(_signMark);
            _userSign = `<img src="${sign_data.issue_signature_img}" class='user_sign ${sign_data.form_key}' id="sign_user" style=''/>`;
            setUserSign(_userSign);
            if (sign_data.is_regist == 1 && dsSelector.sign_org != undefined) {
                _registSign = `
                    <div class='sign_regist_layout ${sign_data.form_key}'>
                        <p class='sign_regist_bg'><img src='assets/images/hdc/sign_regist_layout.png' /></p>
                        <p id='sign_regist_title' class='sign_regist_title'>접 수</p>
                        <p id='sign_regist_date' class='sign_regist_date'>${regist_at.format(
                            "YYYY.MM.DD."
                        )}</p>
                        <p id='sign_regist_comp' class='sign_regist_comp'>${
                            dsSelector.sign_org[0].company == "신한종합건축사사무소"
                                ? "SHINHAN"
                                : dsSelector.sign_register && dsSelector.sign_register.length > 0
                                ? dsSelector.sign_register[0].company
                                : ""
                        }</p>
                    </div>
                    `;
                setRegistSign(_registSign);
            }
            setTimeout(() => {
                var head = document.getElementById("doc_header");
                var body = document.getElementById("doc_body");
                var foot = document.getElementById("doc_footer");

                if (head && body && props.AddSign) {
                    var headHtml = head.outerHTML;
                    var footHtml = foot ? foot.outerHTML : "";
                    var clickpdf = `<div class="preview_pdf"><button id="pdf"><img id="btnPDF"/><p>PDF 다운로드</p></button><button id = "close"><img id="btnClose"/><p>닫기</p></button></div>`;
                    let diff = diffVal ? "\n" : "\n\n";
                    props.AddSign(
                        body.outerHTML + diff,
                        headHtml + diff,
                        footHtml + diff,
                        clickpdf + diff
                    );
                }
                setDiffVal(diffVal == 0 ? 1 : 0);
            }, 3000);

            setTimeout(() => {
                setElementValues();
            }, 2000);
            settingPropHTML(
                _sign,
                _signMark,
                _userSign,
                _issueSignature,
                _recvSignature,
                _registSign
            );
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
                        <div class='imgdiv'>${raw.username}</div>
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
        if (dsSelector.sign_data)
            settingPropHTML(sign, signMark, userSign, issueSignature, recvSignature, registSign);
    }, [props.html, compSelector.onlyDocument, props.isComplete, props.isRegist, sign]);

    const setElementValues = () => {
        if (!count) {
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
                _data.group_id == 1
                    ? "055-643-9128"
                    : _data.doc_fax
                    ? _data.doc_fax
                    : "000-000-0000"
            );
            setElementValue("email_input", _data.doc_email);
            let dateText = ` ${moment(_data.created_at).format("YYYY.MM.DD.")}`;
            if (_data.group_id == 3)
                dateText = ` (${moment(_data.created_at).format("YYYY.MM.DD.")})`;
            setElementValue("date_input", dateText);
            if (_data.sended_at) {
                if (_data.group_id == 1)
                    setElementValue(
                        "send_date_input",
                        "(" + moment(_data.sended_at).format("YYYY.MM.DD.") + ")"
                    );
                else
                    setElementValue(
                        "send_date_input",
                        moment(_data.sended_at).format("YYYY.MM.DD.")
                    );
            }
            //for tr form
            setElementValue("issued_date_input", moment(_data.sended_at).format("YYYY-MM-DD"));
            setElementValue("received_date_input", moment(_data.registed_at).format("YYYY-MM-DD"));
            //for hanhwa form

            // 대표이사 or 현장대리인 이름 insert
            if (
                orgSelector.addressbook &&
                (_data.form_org_id != 0 || _data.form_group_id == 2 || _data.form_group_id == 1)
            ) {
                let _org: any[] = orgSelector.addressbook;
                let _filtered = _org.filter(
                    obj =>
                        obj.sub_field == 1 && obj.oid == _data.form_group_id && obj.is_delete == 0
                );
                let _ceo = _org.find(
                    obj => obj.pid == 1 && obj.oid == _data.group_id && obj.is_delete == 0
                );
                if (_filtered.length > 0) {
                    if (_data.form_group_id == 4)
                        setElementValue("stamp_input3_1", `현장대리인 ` + _filtered[0].username);
                    else if (_data.form_group_id == 2)
                        setElementValue(
                            "stamp_input3_1",
                            `책임건설사업관리기술인 ` + _filtered[0].username
                        );
                    else setElementValue("stamp_input3_1", _filtered[0].username);
                } else {
                    if (_data.group_id == 4)
                        setElementValue(
                            "stamp_input3_1",
                            `대 표 이 사 ${_ceo ? _ceo.username.split("").join(" ") : ""}`
                        );
                    if (_data.group_id == 2)
                        setElementValue(
                            "stamp_input3_1",
                            `대 표 이 사      ${
                                _ceo ? _ceo.username.split("").join("  ") : ""
                            }   (  인  )`
                        );
                    if (_data.group_id == 1)
                        setElementValue("stamp_input3_1", `대표이사 ${_ceo ? _ceo.username : ""}`);
                }
                // if(dsSelector.sign_data.group_id == 4){
                //     if(_filtered.length > 0)
                //         setElementValue('fax_input', _filtered[0].fax_number);
                //     else if(_ceo.length > 0)
                //         setElementValue('fax_input', _ceo[0].fax_number);
                //     else
                //         setElementValue('fax_input', "000-000-0000");
                // }
            }
            // else
            //     setElementValue('stamp_input3', `대 표 이 사 최 광 호`);
        }
    };

    const setDocument = (html: string, type: number) => {
        if (type == 0) {
            var doc = document.getElementById(`doc_header_sign`);
            if (doc) doc.innerHTML = html.toString();
        } else if (type == 1) {
            var doc = document.getElementById(`doc_footer_sign`);
            if (doc) doc.innerHTML = html.toString();
        }
    };

    const settingPropHTML = (
        sign: any,
        signMark: any,
        userSign: any,
        issueSignature: any,
        recvSignature: any,
        registSign: any
    ) => {
        document.getElementById(`title_input`)?.setAttribute(`contenteditable`, `false`);
        let sd = dsSelector.sign_data;
        if (props.isComplete || props.isSignwait) {
            if (
                sd.group_id == userSelector.company &&
                dsSelector.sign_line.length > 0 &&
                sign &&
                (sd.is_regist == 1 ||
                    sign.length > 0 ||
                    document.getElementById(`doc_header_sign`)?.innerHTML)
            ) {
                setDocument(`${sign}`, 0);
            }
            if (sd.sign_state == 3) {
                setDocument(`${signMark}${userSign}${issueSignature}`, 1);
            } else if (sd.sign_state == 6) {
                setDocument(`${issueSignature}${recvSignature}${signMark}${userSign}`, 1);
            } else if (sd.sign_state == 2 || sd.is_ceo_signed == 1) {
                setDocument(`${userSign}`, 1);
            }
        } else {
            if (sd.is_ceo_signed == 1) setDocument(`${userSign}`, 1);
            document.getElementById(`title_input`)?.setAttribute(`contenteditable`, `true`);
        }
        if (sd.is_regist && sd.form_group_id != userSelector.company) {
            setDocument(`${issueSignature}${recvSignature}${registSign}${signMark}${userSign}`, 1);
        }
        setPropHtml(props.html ? props.html : "");
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
    let isEditorEdit = props.isRegist
        ? false
        : props.disableEdit != undefined
        ? !props.disableEdit
        : true;

    return (
        <S.Block>
            <style>
                {`
                .fr-box{
                    width : 100%;
                    height : 100%;
                    overflow-y: scroll;
                }
                `}
            </style>
            <div
                id="header_wrapper"
                dangerouslySetInnerHTML={{ __html: doc_header }}
                style={{ height: "fit-content", overflowY: "hidden" }}
            ></div>
            <div style={{ height: "50%" }}>
                {props.html ? (
                    props.isNewEditor ? (
                        <EditorComp
                            onChangeContent={html => setHtml(html)}
                            content={propHtml}
                            height={height * 0.5}
                            edit={isEditorEdit}
                        />
                    ) : (
                        <WebEditorComponent
                            onChangeContent={html => setHtml(html)}
                            content={propHtml}
                            contentStyle={{ height: height * 0.5 }}
                            editdisabled={
                                props.isRegist
                                    ? true
                                    : props.disableEdit != undefined
                                    ? props.disableEdit
                                    : false
                            }
                        />
                    )
                ) : (
                    <div></div>
                )}
            </div>
            <div
                id="footer_wrapper"
                dangerouslySetInnerHTML={{ __html: doc_footer }}
                style={{ height: "fit-content", overflowY: "hidden" }}
            ></div>
        </S.Block>
    );
};
