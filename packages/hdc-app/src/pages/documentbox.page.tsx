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
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { getMoment } from "../common/utils";
const moment = getMoment();
//
//Module
import { reducerState } from "../common";
import { useLocations } from "hooks";
import { DocumentListComp } from "../components/documentlist";
import { LoadingIndicatorComponent, ModalInfo, ModalConfirm } from "components";
import {
    GetTempDocList,
    GetSignDocSendList,
    GetSignDocRecvList,
    GetRegistList,
    RegistSign,
    DeactiveModal,
    SetDocIsRead,
    GetAddressbook,
    GetSignFormDetailList,
    GetOfflineSignList,
} from "../common/action";
import { getSignStatusText, downloadOfficialDocument } from "../common/utils";
const HEADSIZE = [0, 0, 5, 10, 15, 15, 50, 5];
const HEADSIZE_SEND = [0, 0, 5, 10, 15, 13, 27, 5, 10, 5, 10];
const HEADSIZE_COMPLETE = [0, 0, 5, 10, 10, 10, 45, 10, 10];
const HEADSIZE_CHECKBOX = [0, 0, 5, 10, 10, 10, 40, 10, 10];
// const SearchType = ["제목", "제목 + 내용", "문서번호"];

type paramTypes = {
    type?: string;
};
//
const DocumentBoxPage = () => {
    const dispatch = useDispatch();
    const userSelector = useSelector((state: reducerState) => state.user);
    const dsSelector = useSelector((state: reducerState) => state.digitalsign);
    const { type } = useParams<paramTypes>();
    const { path, pushHistory } = useLocations();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [selectId, setSelectId] = useState<number>(-1);

    const [datas, setDatas] = useState<object[]>([]);
    const [alldatas, setAllDatas] = useState<object[]>([]);
    const [searchtype, setSearchType] = useState<string[]>([]);
    const [isReadList, setIsReadList] = useState<number[]>([]);
    const [datetype, setDateType] = useState<string>();
    const [pathtype, setPathType] = useState<string>();
    const [useCheckbox, setUseCheckbox] = useState<boolean>(false);
    const [checkItems, setCheckItems] = useState<number[]>([]);
    const [isToggle, setisToggle] = useState<boolean>(false);
    const [signType, setSignType] = useState<number>(0);
    const [useToggleBtn, setUseToggleBtn] = useState<boolean>(false);
    const [pageable, setPagealbe] = useState<boolean>(true);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    useEffect(() => {
        setIsLoading(true);
        setDatas([]);
        setUseToggleBtn(false);
        setUseCheckbox(false);
        setisToggle(false);
        setPagealbe(true);
        setCheckItems([]);
        dispatch(GetSignFormDetailList());
        dispatch(GetAddressbook());
        dispatch(GetOfflineSignList());
        if (userSelector.admin_level == 1 || userSelector.admin_level == 2) {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
        if (path)
            switch (path) {
                case "/fbregist":
                    dispatch(GetRegistList());
                    break;
                case "/fbsent/" + type:
                    setPathType("sent" + type);
                    dispatch(GetSignDocSendList(type));
                    break;
                case "/fbrecieved/" + type:
                    setPathType("recieve" + type);
                    dispatch(GetRegistList());
                    dispatch(GetSignDocRecvList(type));
                    break;
                case "/fbtemporary":
                    setPathType("temp");
                    dispatch(GetTempDocList());
                    break;
            }
    }, [path]);

    useEffect(() => {
        // let _list = [];
        // if(dsSelector.doc_regist_list.length > 0){
        //     for(var d of dsSelector.doc_regist_list){
        //         _list.push({
        //             id : d.id,
        //             "구분" : d.document_type,
        //             "접수일" : d.regist_date?moment(d.regist_date).format("YYYY-MM-DD hh:mm"):"",
        //             "발신처" : d.company,
        //             "문서번호" : d.document_code,
        //             "제목" : d.title,
        //             "접수자" : d.creator,
        //             "상태" : getSignStatusText(d.sign_state, true),
        //         })
        //     }
        // }else{
        //     _list.push({
        //         id : -1,
        //         "구분" : null,
        //         "접수일" : null,
        //         "발신처" : null,
        //         "문서번호" : null,
        //         "제목" : null,
        //         "접수자" : null,
        //         "상태" : null,
        //     })
        // }
        //  setDatas([..._list]);
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, [dsSelector.doc_regist_list]);

    useEffect(() => {
        if (path == `/fbsent/${type}`) {
            let _list = [];
            let is_read;
            if (dsSelector.doc_send_list.length > 0) {
                let send_list = dsSelector.doc_send_list;
                let count = 0;
                if (isAdmin && type == "group") {
                    setUseToggleBtn(true);
                }
                for (var d of send_list) {
                    is_read = `\n(${d.read_sum}/${d.recv_sum})`;
                    if (d.doc_type_id == 3)
                        _list.push({
                            id: d.id,
                            idx: count,
                            구분: "발신문서",
                            발신일: moment(d.date).tz("Asia/Seoul").format("YYYY-MM-DD HH:mm"),
                            문서양식: d.form,
                            문서번호: d.document_code,
                            제목: d.title,
                            기안자: d.last_signer,
                            수신처: d.doc_recv,
                            최종결재자: d.last_signer,
                            상태: "발신완료",
                        });
                    else
                        _list.push({
                            id: d.id,
                            idx: count,
                            구분: d.document_type,
                            발신일: moment(d.date).tz("Asia/Seoul").format("YYYY-MM-DD HH:mm"),
                            문서양식: d.form,
                            문서번호: d.document_code,
                            제목: d.title,
                            기안자: d.creator,
                            수신처: d.doc_recv,
                            최종결재자: d.last_signer,
                            상태: getSignStatusText(d.sign_state) + is_read,
                        });
                    count += 1;
                }
            } else {
                _list.push({
                    id: -1,
                    idx: 0,
                    구분: null,
                    발신일: null,
                    문서양식: null,
                    문서번호: null,
                    제목: null,
                    기안자: null,
                    수신처: null,
                    최종결재자: null,
                    상태: null,
                });
            }
            setDateType("발신날짜");
            setSearchType(["제목", "문서번호", "기안자"]);
            setAllDatas([...dsSelector.doc_send_list]);
            setDatas([..._list]);
            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        }
    }, [dsSelector.doc_send_list]);

    useEffect(() => {
        if (path == `/fbrecieved/${type}`) {
            let _list = [];
            let isReadlist: number[] = [];
            let is_read = "";
            if (dsSelector.doc_recv_list.length > 0) {
                let recv_list: any[] = dsSelector.doc_recv_list;
                let count = 0;
                if (isAdmin && type == "group") {
                    setUseToggleBtn(true);
                }
                for (var d of recv_list) {
                    let stat = "";
                    if (type != `group`) {
                        is_read = `\n(${d.read_sum}/${d.recv_sum})`;
                        stat = d.user_read == 1 ? "읽음" : "읽지않음";
                    } else {
                        if (d.sign_state == 0 || d.sign_state == 6 || d.sign_state == 8)
                            stat = "접수";
                        else if (d.sign_state == 1) stat = "결재중";
                        else stat = "결재완료";
                    }
                    if (d.doc_type_id == 3)
                        _list.push({
                            id: d.id,
                            idx: count,
                            구분: "수신문서",
                            접수일: moment(d.registed_at ? d.registed_at : new Date()).format(
                                "YYYY-MM-DD HH:mm"
                            ),
                            발신처: d.doc_sender,
                            문서번호: d.document_code,
                            제목: d.title,
                            접수자: d.receiver,
                            상태: "결재완료",
                            // "상태" : d.user_read == -1 ? getSignStatusText(d.sign_state,false, true)+is_read : d.user_read == 1 ? "읽음":"읽지않음",
                        });
                    else
                        _list.push({
                            id: d.id,
                            idx: count,
                            구분: d.document_type,
                            접수일: moment(d.registed_at ? d.registed_at : d.sended_at).format(
                                "YYYY-MM-DD HH:mm"
                            ),
                            발신처: d.company,
                            문서번호: d.document_code,
                            제목: d.title,
                            접수자: d.receiver,
                            상태: stat,
                            // "상태" : d.user_read == -1 ? getSignStatusText(d.sign_state,false, true)+is_read : d.user_read == 1 ? "읽음":"읽지않음",
                        });
                    if (d.is_read == 0) isReadlist.push(d.id);
                    count += 1;
                }
            } else {
                _list.push({
                    id: -1,
                    idx: 0,
                    구분: null,
                    접수일: null,
                    발신처: null,
                    문서번호: null,
                    제목: null,
                    접수자: null,
                    상태: null,
                });
            }
            setDateType("접수날짜");
            setSearchType(["제목", "문서번호", "접수자"]);
            setIsReadList([...isReadlist]);
            setAllDatas([...dsSelector.doc_recv_list]);
            setDatas([..._list]);
        }
    }, [dsSelector.doc_recv_list]);

    useEffect(() => {
        if (path == "/fbtemporary") {
            let _list = [];
            if (dsSelector.doc_temp_list.length > 0) {
                let count = 0;
                for (var d of dsSelector.doc_temp_list) {
                    _list.push({
                        id: d.id,
                        idx: count,
                        구분: d.document_type,
                        기안일: moment(d.time).local().format("YYYY-MM-DD HH:mm:ss"),
                        문서양식: d.form ? d.form : "오프라인 문서",
                        문서번호: d.document_code,
                        제목: d.title,
                        기안자: d.creator,
                    });
                    count += 1;
                }
            } else {
                _list.push({
                    id: -1,
                    idx: 0,
                    구분: null,
                    기안일: null,
                    문서양식: null,
                    문서번호: null,
                    제목: null,
                    기안자: null,
                });
            }
            setSearchType(["제목", "문서번호", "기안자"]);
            setDateType("기안날짜");
            setAllDatas([...dsSelector.doc_temp_list]);
            setDatas([..._list]);
            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        }
    }, [dsSelector.doc_temp_list]);

    useEffect(() => {
        if (dsSelector.regist_sign_fin) {
            dispatch(DeactiveModal());
            setTimeout(() => {
                setIsLoading(false);
                ModalInfo("접수 완료.");
                // let id = dsSelector.regist_sign_id != -1 ? dsSelector.regist_sign_id : selectId;
                let data = dsSelector.doc_recv_list.filter(
                    (raw: any, idx: number) => raw.id == selectId
                );
                setIsReadDoc(selectId);
                if (data.length > 0 && data[0].is_register) {
                    pushHistory("/document/edit/" + dsSelector.regist_sign_id);
                } else {
                    pushHistory("/document/recv/" + selectId);
                }
            }, 1000);
        } else if (dsSelector.regist_sign_fin !== undefined && selectId != -1) {
            setIsLoading(false);
            pushHistory("/document/recv/" + selectId);
        } else {
            setIsLoading(false);
        }
    }, [dsSelector.regist_sign_fin]);

    const setIsReadDoc = (id: number) => {
        let flag = isReadList.indexOf(id);
        if (flag != -1) {
            isReadList.splice(isReadList.indexOf(id), 1);
            setIsReadList([...isReadList]);
            setIsLoading(true);
            setTimeout(() => {
                dispatch(SetDocIsRead(id));
            }, 1000);
        }
    };

    const onClickTitle = async (idx: number) => {
        if (useCheckbox) {
            let rowData: any = datas[idx];
            onChangeCheckbox(rowData, !checkItems.includes(rowData.id));
            return;
        }
        if (path == "/fbsent/" + type) {
            let data = dsSelector.doc_send_list[idx];
            let id = 0;
            if (data) id = data.id;

            let off = dsSelector.offline_send_list.filter(
                (raw: any, idx: number) => raw.id == id && raw.title == data.title
            );
            if (off.length < 1) pushHistory("/document/send/" + id);
            else pushHistory("/document/offsend/" + id);
        } else if (path == "/fbrecieved/" + type) {
            let recv_data = dsSelector.doc_recv_list[idx];
            let id = 0;
            if (recv_data) id = recv_data.id;
            let off = dsSelector.offline_recv_list.filter((raw: any, idx: number) => raw.id == id);
            if (off.length < 1) {
                if (recv_data && (recv_data.is_regist || !recv_data.is_out_refer)) {
                    setIsReadDoc(id);
                    pushHistory("/document/recv/" + id);
                } else {
                    setIsReadDoc(id);
                    setSelectId(id);
                    setIsLoading(true);
                    dispatch(DeactiveModal());
                    await dispatch(RegistSign(id));
                    await dispatch(GetSignDocRecvList(type));
                }
            } else {
                if (off[0].sign_state == 8) pushHistory("/document/offrecv/" + id);
                else if (off[0].sign_state == 2) pushHistory("/document/offsend/" + id);
                else pushHistory("/document/offview/" + id);
            }
        } else if (path == "/fbtemporary") {
            let temp_data = dsSelector.doc_temp_list[idx];
            let id = -1;
            if (temp_data) id = temp_data.id;
            let off = dsSelector.offline_sign_list.filter(
                (raw: any, idx: number) => raw.id == id && raw.title == temp_data.title
            );
            if (off.length < 1) {
                if (temp_data && temp_data.is_general_doc) {
                    pushHistory("/document/normal/edit/" + id);
                } else {
                    pushHistory("/document/edit/" + id);
                }
            } else pushHistory("/document/offedit/" + id);
        } else if (path == "/fbregist") {
            // IMPORTANT :: NOT USE
            let data = dsSelector.doc_regist_list[idx];
            let id = -1;
            if (data) id = data.id;
            if (data) {
                switch (data.sign_state) {
                    case 0:
                        pushHistory("/document/edit/" + id);
                        break;
                    case 1:
                        pushHistory("/document/view/" + id);
                        break;
                    case 2:
                    default:
                        pushHistory("/document/regist/" + id);
                        break;
                }
            }
        }
    };
    /**
     * @Todo 일괄다운로드 연결
     */
    const onClickToggleBtn = () => {
        if (useCheckbox && checkItems.length > 0) {
            ModalConfirm(
                `${checkItems.length}건의 문서를 다운로드 하시겠습니까 ?`,
                (result: boolean) => {
                    if (result) {
                        let user_id: number = userSelector.id;
                        downloadOfficialDocument(checkItems, signType, user_id);
                        setCheckItems([]);
                    }
                }
            );
        } else {
            setCheckItems([]);
            setUseCheckbox(!useCheckbox);
            setisToggle(!isToggle);
            setPagealbe(!pageable);
        }
    };
    const onChangeCheckbox = (rowData: any, checked: boolean) => {
        let _checkItems = checkItems.slice();
        if (rowData == -1) {
            //전체선택
            if (checked) {
                datas.map((d: any) => {
                    if (d.id && checkItems.indexOf(d.id) == -1) {
                        _checkItems.push(d.id);
                    }
                });
            } else {
                _checkItems = [];
            }
        } else {
            if (checked) {
                if (_checkItems.indexOf(rowData.id) == -1) {
                    _checkItems.push(rowData.id);
                }
            } else {
                _checkItems.splice(_checkItems.indexOf(rowData.id), 1);
            }
        }
        setCheckItems(_checkItems);
    };
    const onSwitchChange = (isChecked: boolean) => {
        setSignType(isChecked ? 1 : 0);
    };
    const headsize =
        path == "/fbregist" || path == "/fbrecieved/" + type
            ? useCheckbox
                ? HEADSIZE_CHECKBOX
                : HEADSIZE_COMPLETE
            : path == "/fbsent/" + type
            ? HEADSIZE_SEND
            : HEADSIZE;
    return (
        <DocumentBoxBlock>
            <LoadingIndicatorComponent open={isLoading} />
            <DocumentListComp
                data={datas}
                alldata={alldatas}
                checkStyle={{ width: "5%" }}
                headStyle={{ backgroundColor: "transparent", color: "black" }}
                style={{ backgroundColor: "transparent", boxShadow: "none" }}
                datetype={datetype}
                headSize={headsize}
                formlist={dsSelector.sign_form_detail_list}
                searchlist={searchtype}
                titleIdx={2}
                onClickTitle={onClickTitle}
                path={pathtype ? pathtype : ""}
                useCheckbox={useCheckbox}
                onChangeCheckbox={onChangeCheckbox}
                useToggleBtn={useToggleBtn}
                isToggle={isToggle}
                toggleBtnText={
                    useCheckbox ? (checkItems.length > 0 ? "선택 완료" : "취소") : "다운로드"
                }
                onClickToggleBtn={onClickToggleBtn}
                checkItems={checkItems}
                pageable={pageable}
                onSwitchChange={onSwitchChange}
                switchLabel={signType ? "결재포함" : "결재미포함"}
                useSwitch={isToggle}
                isAdmin={isAdmin}
                selectType={type}
            />
        </DocumentBoxBlock>
    );
};

const DocumentBoxBlock = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
`;

export default DocumentBoxPage;
