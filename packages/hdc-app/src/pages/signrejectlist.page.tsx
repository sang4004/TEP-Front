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
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
//
//Module
import { getMoment } from "../common/utils";
const moment = getMoment();
import { reducerState } from "../common";
import { useLocations } from "hooks";
import { DocumentListComp } from "../components/documentlist";
import { GetSignFormDetailList, GetSignRejectList } from "../common/action";
import { getSignStatusText } from "../common/utils";
//
// antd components

const headsize = [0, 5, 15, 15, 15, 30, 5, 5, 5, 5];

//
const SignRejectList = () => {
    const dispatch = useDispatch();
    const userSelector = useSelector((state: reducerState) => state.user);
    const dsSelector = useSelector((state: reducerState) => state.digitalsign);
    const history = useHistory();
    const { path, pushHistory } = useLocations();

    const [datas, setDatas] = useState<object[]>([]);
    const [searchtype, setSearchType] = useState<string[]>([]);

    useEffect(() => {
        dispatch(GetSignRejectList());
        dispatch(GetSignFormDetailList());
    }, [path]);

    useEffect(() => {
        let _list = [];
        if (dsSelector.sign_reject_list.length > 0) {
            let count = 0;
            for (var d of dsSelector.sign_reject_list) {
                _list.push({
                    id: d.id,
                    idx: count,
                    구분: d.document_type,
                    기안일: moment(d.date).format("YYYY-MM-DD HH:mm"),
                    문서양식: d.form,
                    문서번호: d.document_code,
                    제목: d.title,
                    기안자: d.creator,
                    반려자: d.reject_signer,
                    최종결재자: d.last_signer,
                    상태: getSignStatusText(d.sign_state, false, false, d.is_request),
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
                반려자: null,
                최종결재자: null,
                상태: null,
            });
        }
        setSearchType(["제목", "문서번호", "기안자"]);
        setDatas([..._list]);
    }, [dsSelector.sign_reject_list]);

    const onClickTitle = (idx: number) => {
        let data = dsSelector.sign_reject_list[idx];
        let id = 0;
        if (data) id = data.id;
        if (data && data.is_general_doc) pushHistory("/document/normal/reject/" + id);
        else pushHistory("/document/reject/" + id);
    };

    return (
        <SignedReceivedPage>
            <DocumentListComp
                data={datas}
                alldata={dsSelector.sign_reject_list}
                checkStyle={{ width: "5%" }}
                headStyle={{ backgroundColor: "transparent", color: "black" }}
                style={{ backgroundColor: "transparent", boxShadow: "none" }}
                headSize={headsize}
                formlist={dsSelector.sign_form_detail_list}
                onClickTitle={onClickTitle}
                searchlist={searchtype}
                titleIdx={2}
                pageable
            />
        </SignedReceivedPage>
    );
};

const SignedReceivedPage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
`;

export default SignRejectList;
