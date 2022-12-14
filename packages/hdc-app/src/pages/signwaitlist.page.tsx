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
import { getMoment } from "../common/utils";
import Checkbox from "@material-ui/core/Checkbox";
const moment = getMoment();
//
//Module
import { reducerState } from "../common";
import { useLocations } from "hooks";
import { DocumentListComp } from "../components/documentlist";
import { GetOfflineSignList, GetSignFormDetailList, GetSignWaitList } from "../common/action";
import { getSignStatusText } from "../common/utils";
//
// antd components
const headsize = [0, 5, 15, 15, 15, 30, 5, 5, 5, 5];

//
const SignWaitList = () => {
    const dispatch = useDispatch();
    const userSelector = useSelector((state: reducerState) => state.user);
    const dsSelector = useSelector((state: reducerState) => state.digitalsign);
    const history = useHistory();
    const { path, pushHistory } = useLocations();
    const [checked, setChecked] = useState<boolean>(false);

    const [signWaitList, setSignWaitList] = useState<any[]>([]);
    const [datas, setDatas] = useState<object[]>([]);
    const [searchtype, setSearchType] = useState<string[]>([]);

    useEffect(() => {
        if (path) {
            dispatch(GetOfflineSignList());
            dispatch(GetSignWaitList());
            dispatch(GetSignFormDetailList());
        }
    }, [path]);

    useEffect(() => {
        let _list = [];
        let signList = [];
        if (dsSelector.sign_wait_list.length > 0) {
            let count = 0;
            for (var d of dsSelector.sign_wait_list) {
                signList.push(d);
                _list.push({
                    id: d.id,
                    idx: count,
                    ??????: d.document_type,
                    ?????????: moment(d.date).format("YYYY-MM-DD HH:mm"),
                    ????????????: d.form ? d.form : "??????????????????",
                    ????????????: d.document_code,
                    ??????: d.title,
                    ?????????: d.creator,
                    ???????????????: d.next_signer,
                    ???????????????: d.last_signer,
                    ??????: getSignStatusText(d.sign_state, d.is_regist),
                });
                count += 1;
            }
        } else {
            _list.push({
                id: -1,
                idx: 0,
                ??????: null,
                ?????????: null,
                ????????????: null,
                ????????????: null,
                ??????: null,
                ?????????: null,
                ???????????????: null,
                ???????????????: null,
                ??????: null,
            });
        }
        setSearchType(["??????", "????????????", "?????????"]);
        setDatas([..._list]);
        setSignWaitList([...signList]);
    }, [dsSelector.sign_wait_list]);

    const onClickTitle = (idx: number) => {
        let data = dsSelector.sign_wait_list[idx];
        let id = 0;
        if (data) id = data.id;
        let off = dsSelector.offline_sign_list.filter(
            (raw: any) => raw.id == id && raw.title == data.title
        );
        if (off.length < 1) {
            if (data && data.is_general_doc) pushHistory("/document/normal/view/" + id);
            else pushHistory("/document/view/" + id);
        } else pushHistory("/document/offview/" + id);
    };

    const onChangeCheckbox = () => {
        let _list = [];
        let signList = [];
        if (dsSelector.sign_wait_list && dsSelector.sign_wait_list.length > 0) {
            for (var d of dsSelector.sign_wait_list) {
                if (!checked && d.next_signer_id != userSelector.id) continue;
                signList.push(d);
                _list.push({
                    id: d.id,
                    ??????: d.document_type,
                    ?????????: moment(d.date).format("YYYY-MM-DD HH:mm"),
                    ????????????: d.form,
                    ??????: d.title,
                    ?????????: d.creator,
                    ???????????????: d.next_signer,
                    ???????????????: d.last_signer,
                    ??????: getSignStatusText(d.sign_state, d.is_regist),
                });
            }
        }
        setDatas([..._list]);
        setSignWaitList([...signList]);
        setChecked(!checked);
    };

    return (
        <SignedListPageContainer>
            <HomeCheckBoxWrap>
                ?????? ?????? ??????
                <HomeCheckbox checked={checked} color="primary" onChange={onChangeCheckbox} />
            </HomeCheckBoxWrap>
            <DocumentListComp
                data={datas}
                alldata={signWaitList}
                checkStyle={{ width: "5%" }}
                headStyle={{ backgroundColor: "transparent", color: "black" }}
                style={{ backgroundColor: "transparent", boxShadow: "none" }}
                headSize={headsize}
                formlist={dsSelector.sign_form_detail_list}
                searchlist={searchtype}
                titleIdx={2}
                onClickTitle={onClickTitle}
                pageable
            />
        </SignedListPageContainer>
    );
};

const SignedListPageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
`;

const HomeCheckBoxWrap = styled.div`
    flex: 1;
    padding-left: 20px;
    width: 100%;
    font-size: 1em;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 100%;
`;

const HomeCheckbox = styled(Checkbox)`
    border-radius: 0;
`;

export default SignWaitList;
