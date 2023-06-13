/******************************************************************************
 * hooks :
 * useLocations
 * components :
 *
 ******************************************************************************/
//Library
import React, { useState, useEffect, useContext, useRef, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as S from "../styled/userinfo.styled";
//
//Module
import { reducerState } from "../common";
import { GetEdmsAddressbook, GetEdmsAddress, GetEdmsMailAddress } from "../common/action";
import { useLocations } from "hooks";

import { TreeViewComp, EdmsEmailGroupComp } from "../components";
import { LoadingIndicatorComponent } from "components";
import buildingSvg from "../images/fontawsomeicon/building-solid.svg";
import userSvg from "../images/fontawsomeicon/user-solid.svg";
//

export type addressList = {
    id: number;
    username: string;
    part: string;
    company: string;
    email: string;
};

const MailUserPage = (props: any, sprops: any) => {
    const dispatch = useDispatch();
    const { path } = useLocations();
    const orgSelector = useSelector((state: reducerState) => state.organization);
    const userSelector = useSelector((state: reducerState) => state.user);
    const pjSelector = useSelector((state: reducerState) => state.project);

    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [visibleEmailGroup, setVisibleEmailGroup] = useState<boolean>(false);
    const [addressBook, setAddressBook] = useState<any[]>([]);
    const [treeData, setTreeData] = useState<object[]>([]);
    const [treeIds, setTreeIds] = useState<any[]>([]);
    const [selectedId, setSelectedId] = useState<number[]>([]);
    const [emailList, setEmailList] = useState<addressList[]>([]);
    const [userCompany, setUserCompany] = useState<number>(-1);
    const [selectedType, setSelectedType] = useState<string>("");
    const [selectedNo, setSelectedNo] = useState<number>(-1);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [selectedCompanyNo, setSelectedCompanyNo] = useState<number>(-1);

    const treeRef = useRef(null);

    useEffect(() => {
        dispatch(GetEdmsMailAddress());
        dispatch(GetEdmsAddress());
        dispatch(GetEdmsAddressbook("MAIL"));
    }, [path]);

    useEffect(() => {
        if (selectedNo != -1 || selectedCompanyNo != -1) {
            submitData();
        }
    }, [selectedNo, selectedCompanyNo]);

    useEffect(() => {
        if (pjSelector.edms_user_list.length > 0 && pjSelector.edms_user_list) {
            let user = pjSelector.edms_user_list.find(
                (raw: any) => raw.user_id == userSelector.edms_user_id
            );
            if (user != undefined) {
                setUserCompany(user.company_id);
            }
        }
    }, [pjSelector.edms_user_list]);

    useEffect(() => {
        if (orgSelector.edms_mail_address && orgSelector.edms_mail_address.length > 0) {
            let _list = [];
            for (var d of orgSelector.edms_mail_address) {
                _list.push({
                    company: d.company,
                    company_id: d.cid,
                    id: d.id,
                    oid: d.oid,
                    part: d.part,
                    pid: d.gid,
                    position: d.position,
                    username: d.username,
                    email: d.email,
                });
            }
            setAddressBook([..._list]);
            setEmailList([..._list]);
            getTreeData([..._list]);
        }
    }, [orgSelector.edms_mail_address]);

    const getTreeData = (addressBook: any[]) => {
        let selected = selectedId;
        let searchVal = "";
        let _treeIds = [];
        let _list: any[] = [];
        let _nameList: any[] = [];
        let idx = 0;
        for (var org of addressBook) {
            if (_list.filter(raw => raw.company == org.company).length > 0) continue;

            if (_nameList.indexOf(org.company) == -1) {
                _nameList.push(org.company);
                _list.push({
                    company: org.company,
                    company_id: org.company_id,
                    expanded: searchVal || selected.length > 0 ? true : false,
                    text: org.company,
                    id: `${idx}`,
                    items: [],
                    type: "company",
                });
                idx += 1;
            }
        }
        for (var _l of _list) {
            let _partList: any[] = [];
            let userIdx = 0;
            for (var org of addressBook) {
                if (
                    searchVal &&
                    org.username.indexOf(searchVal) == -1 &&
                    org.position.indexOf(searchVal) == -1 &&
                    org.part.indexOf(searchVal) == -1
                )
                    continue;
                if (org.company.indexOf(_l.text) == -1) continue;

                let is_expand =
                    searchVal &&
                    (org.username.indexOf(searchVal) == -1 ||
                        org.position.indexOf(searchVal) == -1 ||
                        org.part.indexOf(searchVal) == -1);
                let partIdx = _partList.indexOf(org.part);

                if (partIdx == -1) {
                    _partList.push(org.part);
                    partIdx = _partList.length - 1;
                    userIdx = 0;
                    _l.items.push({
                        id: `${_nameList.indexOf(org.company)}_${partIdx}`,
                        text: org.part,
                        part: org.part,
                        company: org.company,
                        isPart: true,
                        expanded: is_expand,
                        type: "part",
                        pid: org.pid,
                    });
                }
                let selectIdx = selected.indexOf(org.id);
                if (selectIdx != -1)
                    _treeIds.push(`${_nameList.indexOf(org.company)}_${partIdx}_${userIdx}`);
                userIdx += 1;
            }
        }
        setTreeIds([..._treeIds]);
        setTreeData([..._list]);
    };

    const onTreeItemClick = (event: any) => {
        //If category, show data, otherwise skip
        let type = event.item.type;
        setSelectedType(type);
        setSelectedItem(event.item.text);
        if (event.item.type == "company") {
            setSelectedCompanyNo(event.item.company_id);
        } else if (event.item.type == "part") {
            setSelectedNo(event.item.pid);
            setSelectedCompanyNo(-1);
        }
    };

    const submitData = () => {
        setIsLoading(true);
        let userList: addressList[] = [];
        let exist_user: any[] = [];
        let data = addressBook.filter((raw: any, idx: any) => {
            //임시 중복체크
            if (exist_user.indexOf(raw.id) != -1) return false;
            exist_user.push(raw.id);
            //
            if (selectedType == "part") {
                return raw.pid == selectedNo;
            } else {
                return raw.company_id == selectedCompanyNo || selectedCompanyNo == -1;
            }
        });
        // if (data == undefined) return;
        if (data.length > 0) {
            for (var d of data) {
                userList.push({
                    id: d.id,
                    username: d.username,
                    part: d.part,
                    company: d.company,
                    email: d.email,
                });
            }
        }
        setTimeout(() => {
            setIsLoading(false);
        }, 200);

        setEmailList([...userList]);
    };

    const getLineRows = (raw: any, index: number) => {
        return (
            <S.BodyDetail key={index}>
                <S.TableCell $width={30}>{raw.username}</S.TableCell>
                {selectedType == "part" && <S.TableCell $width={20}>{raw.part}</S.TableCell>}
                <S.TableCell $width={30}>{raw.company}</S.TableCell>
                <S.TableCell $width={30}>{raw.email}</S.TableCell>
            </S.BodyDetail>
        );
    };

    const getTreeItem = (event: any) => {
        let color: boolean = false;
        if (selectedItem == event.item.text) {
            color = true;
        }
        let icon = userSvg;
        if (event.item.type == "company") {
            icon = buildingSvg;
        }
        return (
            <S.TreeDiv $background={color}>
                <S.TreeIcon src={icon} /> {event.item.text}
            </S.TreeDiv>
        );
    };

    return (
        <>
            <style>
                {`
                    .k-treeview .k-in, .k-treeview .k-state-focused {
                        border : none !important;
                        box-shadow : none !important;
                    }
                `}
            </style>
            <LoadingIndicatorComponent open={isLoading} style={{ zIndex: 100 }} />
            <S.SignedEditPageContainer className="main-page__container">
                <EdmsEmailGroupComp
                    visible={visibleEmailGroup}
                    onClose={() => setVisibleEmailGroup(false)}
                />
                <S.Block>
                    <S.GroupBtnDiv>
                        <S.Title>메일수신 관리</S.Title>
                        <S.SettingBtn onClick={() => setVisibleEmailGroup(true)}>
                            그룹관리
                        </S.SettingBtn>
                    </S.GroupBtnDiv>
                    <S.Content>
                        <S.ContentDiv>
                            <S.TreeBlock>
                                <S.TreeTitle>설정그룹</S.TreeTitle>
                                <S.TreeInnerBox>
                                    <TreeViewComp
                                        data={treeData}
                                        treeRef={treeRef}
                                        treeIds={treeIds}
                                        checkType={false}
                                        onTreeItemClick={onTreeItemClick}
                                        item={getTreeItem}
                                    />
                                </S.TreeInnerBox>
                            </S.TreeBlock>
                            <S.DetailBlock>
                                <S.SubTitle>
                                    <S.TableCell $width={30}>이름</S.TableCell>
                                    {selectedType == "part" && (
                                        <S.TableCell $width={20}>그룹</S.TableCell>
                                    )}
                                    <S.TableCell $width={30}>회사</S.TableCell>
                                    <S.TableCell $width={30}>이메일</S.TableCell>
                                </S.SubTitle>
                                <S.Seperator />
                                <S.InfoContainer>
                                    {emailList.map((raw, idx) => getLineRows(raw, idx))}
                                </S.InfoContainer>
                            </S.DetailBlock>
                        </S.ContentDiv>
                    </S.Content>
                </S.Block>
            </S.SignedEditPageContainer>
        </>
    );
};

export default MailUserPage;
