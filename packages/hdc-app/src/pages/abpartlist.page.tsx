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
import React, { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
//
//Module
import { reducerState } from "../common";
import { GetAddressbook, GetPositionList } from "../common/action";
import { AddressBookComponent } from "../components/abparttable";
//
// antd components
var headsize = [20, 10, 10, 20, 20];

//
const AbpartListPage = (props: any, sprops: any) => {
    const dispatch = useDispatch();
    const orgSelector = useSelector((state: reducerState) => state.organization);
    const userSelector = useSelector((state: reducerState) => state.user);
    const [tableData, setTableData] = useState<any[]>([]);
    const [companyList, setCompanyList] = useState<object[]>([]);
    const [selectedCompany, setSelectedCompany] = useState<string>("");

    useEffect(() => {
        dispatch(GetAddressbook());
        dispatch(GetPositionList());
    }, []);

    useEffect(() => {
        if (orgSelector.addressbook) setData();
    }, [orgSelector.addressbook, selectedCompany]);

    useEffect(() => {
        let _list = [];
        if (orgSelector.company_list)
            for (var l of orgSelector.company_list)
                _list.push({
                    id: l.id,
                    company: l.company,
                });
        _list.push({
            id: -1,
            company: `탈퇴회원`,
        });
        setCompanyList([..._list]);
    }, [orgSelector.company_list]);

    const setData = () => {
        let _list = [];
        for (var address of orgSelector.addressbook) {
            if (selectedCompany && selectedCompany == address.company && address.is_delete == 0)
                _list.push({
                    no: address.id,
                    comp: address.company,
                    group: address.part,
                    position: address.position,
                    name: address.username,
                    tel: address.phone_number,
                    email: address.email,
                });
            else if (selectedCompany && selectedCompany == `탈퇴회원` && address.is_delete == 1) {
                _list.push({
                    no: address.id,
                    comp: address.company,
                    group: address.part,
                    position: address.position,
                    name: address.username,
                    tel: address.phone_number,
                    email: address.email,
                });
            }
        }
        setTableData([..._list]);
    };

    return (
        <SignedListPageContainer className="main-page__container">
            <AddressBookComponent
                data={tableData}
                companyList={companyList}
                style={{ backgroundColor: "transparent", boxShadow: "none" }}
                headSize={headsize}
                onChangeTab={(company: string) => setSelectedCompany(company)}
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

export default AbpartListPage;
