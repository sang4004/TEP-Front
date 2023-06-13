/******************************************************************************
 * hooks :
 * useLocations
 * components :
 *
 *
 ******************************************************************************/
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import NewWindow from "react-new-window";

import { LoadingIndicatorComponent, ModalInfo } from "components";
import { TreeViewComp } from "..";
import { reducerState } from "../../common";
import { GetOfficialList, CreateOfficialUser, DeleteOfficialUser } from "../../common/action";

import * as S from "./styled";
import Close from "@material-ui/icons/Close";

// Icon
import buildingSvg from "../../images/fontawsomeicon/building-solid.svg";
import userSvg from "../../images/fontawsomeicon/user-solid.svg";
import groupSvg from "../../images/edms/group.svg";
import findUserSvg from "../../images/fontawsomeicon/user-solid1.svg";

export type EdmsOfficialUserProps = {
    visible: boolean;
    onClose: () => void;
};

const OFFCIAL_DOCUMENT_LIST = ["한화공문", "신한공문"];
const OFFCIAL_DOCUMENT_TYPE_LIST = ["FROM", "TO", "CC", "Issued", "Received"];
const OFFCIAL_DOCUMENT_STAGE_TYPE_LIST = ["전체", "IFA", "AFC", "As-Built"];

interface FinalEdmsOfficialUserProps extends EdmsOfficialUserProps {}

export const EdmsOfficialUserComp: React.FunctionComponent<FinalEdmsOfficialUserProps> = props => {
    const dispatch = useDispatch();
    const pjSelector = useSelector((state: reducerState) => state.project);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [selectedUserNo, setSelectedUserNo] = useState<number>(-1);

    const [projectTypeList, setProjectTypeList] = useState<any[]>([]);
    const [officialUserList, setOfficialUserList] = useState<any[]>([]);
    const [addressBook, setAddressBook] = useState<any[]>([]);
    const [userList, setUserList] = useState<any[]>([]);
    const [treeData, setTreeData] = useState<object[]>([]);
    const [treeIds, setTreeIds] = useState<any[]>([]);
    const [filterUserIdList, setFilterUserIdList] = useState<any[]>([]);
    const [filterUserList, setFilterUserList] = useState<any[]>([]);
    const [buttonType, setButtonType] = useState<boolean>(false);
    const [wtouIdx, setWtouIdx] = useState<number>(-1);

    const [selectOfficialDocument, setSelectOfficialDocument] = useState<number>(-1);
    const [selectOfficialDocumentType, setSelectOfficialDocumentType] = useState<number>(-1);
    const [selectOfficialProjectType, setSelectOfficialProjectType] = useState<number>(-1);
    const [selectOfficialStageType, setSelectOfficialStageType] = useState<number>(-1);

    const treeRef = useRef(null);

    useEffect(() => {
        dispatch(GetOfficialList());
    }, [props.visible]);

    useEffect(() => {
        if (pjSelector.official_list) {
            let official = pjSelector.official_list;
            setProjectTypeList(official.project_type);
            setAddressBook(official.edms_user_list);
            setOfficialUserList(official.official_list);
        }
    }, [pjSelector.official_list]);

    useEffect(() => {
        if (addressBook.length) {
            let _list = [];
            for (var d of addressBook) {
                _list.push({
                    company: d.company,
                    company_id: d.cid,
                    id: d.id,
                    oid: d.oid,
                    part: d.part,
                    pid: d.gid,
                    position: d.position,
                    username: d.username,
                });
                setUserList([..._list]);
            }
        }
    }, [addressBook]);

    useEffect(() => {
        if (userList.length != 0) getTreeData();
    }, [userList]);

    useEffect(() => {
        if (pjSelector.create_official_user) {
            dispatch(GetOfficialList());
            setSelectOfficialDocumentType(-1);
            setTimeout(() => {
                setIsLoading(false);
                ModalInfo("유저 등록이 완료되었습니다.");
            }, 2000);
        }
    }, [pjSelector.create_official_user]);

    useEffect(() => {
        if (pjSelector.delete_official_user) {
            dispatch(GetOfficialList());
            setSelectOfficialDocumentType(-1);
            setFilterUserIdList([]);
            setFilterUserList([]);
            setButtonType(false);
            setTimeout(() => {
                setIsLoading(false);
                ModalInfo("유저 삭제가 완료되었습니다.");
            }, 2000);
        }
    }, [pjSelector.delete_official_user]);

    useEffect(() => {
        if (
            selectOfficialDocument != -1 &&
            selectOfficialProjectType != -1 &&
            selectOfficialDocumentType != -1
        ) {
            let filter_user = officialUserList.filter(
                raw =>
                    raw.off_docu_type == selectOfficialDocument &&
                    raw.project_no == selectOfficialProjectType &&
                    raw.off_type == selectOfficialDocumentType
            );

            if (filter_user.length > 0) {
                setFilterUserList(filter_user);
                setFilterUserIdList(filter_user.map(raw => raw.user_id));
                getTreeItem;
            } else {
                setFilterUserIdList([]);
                setFilterUserList([]);
                setButtonType(false);
            }
        }
    }, [selectOfficialDocument, selectOfficialProjectType, selectOfficialDocumentType]);

    useEffect(() => {
        if (filterUserList.length > 0 && selectedUserNo != -1) {
            let filter_user: any[] = [];
            filter_user = filterUserList.filter(raw => raw.user_id == selectedUserNo);
            if (filter_user.length > 0) {
                let stage_type_list = filter_user.map(raw => raw.stage_type);

                if (stage_type_list.length > 0 && stage_type_list.indexOf(0) != -1) {
                    let index = stage_type_list.indexOf(0);
                    setWtouIdx(filter_user[index].wtou_idx);
                    setButtonType(true);
                } else if (
                    stage_type_list.length > 0 &&
                    stage_type_list.indexOf(selectOfficialStageType) != -1
                ) {
                    let index = stage_type_list.indexOf(selectOfficialStageType);
                    setWtouIdx(filter_user[index].wtou_idx);
                    setButtonType(true);
                } else {
                    setButtonType(false);
                }
            } else {
                setButtonType(false);
            }
        }
    }, [filterUserList, selectedUserNo, selectOfficialStageType]);

    const getTreeData = (searchVal: null | string = null, _selectedId: any = null) => {
        let selected = _selectedId ? _selectedId : [];
        let _treeIds = [];
        let _list: any[] = [];
        let _nameList: any[] = [];
        let idx = 0;
        for (var org of userList) {
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
            for (var org of userList) {
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

                if (partIdx != -1) {
                    _l.items[partIdx].items.push({
                        text: `${org.position} ${org.username}`,
                        company: org.company,
                        groupname: org.groupname,
                        id: `${_nameList.indexOf(org.company)}_${partIdx}_${userIdx}`,
                        itemid: org.id,
                        expanded: is_expand,
                        type: "user",
                        uid: org.id,
                    });
                } else {
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
                        items: [
                            {
                                text: `${org.position} ${org.username}`,
                                company: org.company,
                                groupname: org.groupname,
                                id: `${_nameList.indexOf(org.company)}_${partIdx}_${userIdx}`,
                                itemid: org.id,
                                type: "user",
                                uid: org.id,
                            },
                        ],
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
        setSelectedItem(event.item.text);
        if (event.item.type == "company") {
            setSelectedUserNo(-1);
        } else if (event.item.type == "part") {
            setSelectedUserNo(-1);
        } else if (event.item.type == "user") {
            setSelectedUserNo(event.item.uid);
        }
    };

    const getTreeItem = (event: any) => {
        let color: boolean = false;
        if (selectedItem == event.item.text) {
            color = true;
        }

        let icon = userSvg;
        if (event.item.type == "company") {
            icon = buildingSvg;
        } else if (event.item.type == "part") {
            icon = groupSvg;
        } else if (
            filterUserIdList.length > 0 &&
            filterUserIdList.find(raw => raw == event.item.uid)
        ) {
            icon = findUserSvg;
        }

        return (
            <S.TreeDiv $backColor={color}>
                <S.TreeIcon src={icon} /> {event.item.text}
            </S.TreeDiv>
        );
    };

    const onClose = () => {
        props.onClose();
    };

    const onCreateOfficialUser = () => {
        if (selectOfficialDocument == -1) return ModalInfo("공문을 선택해주세요.");
        if (selectOfficialProjectType == -1) return ModalInfo("프로젝트를 선택해주세요.");
        if (selectOfficialDocumentType == -1) return ModalInfo("유형을 선택해주세요.");
        if (selectedUserNo == -1) return ModalInfo("유저을 선택해주세요.");

        setIsLoading(true);
        // user,  project, off_type, stage_type_no, off_docu_type
        dispatch(
            CreateOfficialUser(
                selectedUserNo,
                selectOfficialProjectType,
                selectOfficialDocumentType,
                selectOfficialStageType,
                selectOfficialDocument
            )
        );
    };

    const onDeleteOfficialUser = () => {
        setIsLoading(true);
        dispatch(DeleteOfficialUser(wtouIdx));
    };

    const getDivRows = (raw: any, index: number) => {
        return (
            <S.BtmListDivRow key={index}>
                <S.BtmListRow $width={20}>{raw.off_docu_type_name}</S.BtmListRow>
                <S.BtmListRow $width={20}>{raw.project_name}</S.BtmListRow>
                <S.BtmListRow $width={20}>{raw.off_type_name}</S.BtmListRow>
                <S.BtmListRow $width={20}>{raw.stage_type_name}</S.BtmListRow>
                <S.BtmListRow $width={20}>{raw.username}</S.BtmListRow>
            </S.BtmListDivRow>
        );
    };

    return (
        <S.Block open={props.visible} onClose={onClose}>
            <S.Inner>
                <LoadingIndicatorComponent open={isLoading} />
                <S.ModalHeader>
                    <S.HeaderTitle>공문 담당자 관리</S.HeaderTitle>
                    <S.ModalCloseBtn onClick={onClose}>
                        <Close style={{ fontSize: "2em" }} />
                    </S.ModalCloseBtn>
                </S.ModalHeader>
                <S.ModalContentWrap>
                    <S.TopDiv>
                        <S.Top>
                            <S.TopTitle>공문 목록</S.TopTitle>
                            <S.TopContent>
                                {OFFCIAL_DOCUMENT_LIST.map((raw: any, idx: number) => {
                                    return (
                                        <S.TableRow
                                            $selected={selectOfficialDocument == idx}
                                            onClick={() =>
                                                setSelectOfficialDocument(
                                                    selectOfficialDocument != idx ? idx : -1
                                                )
                                            }
                                        >
                                            {raw}
                                        </S.TableRow>
                                    );
                                })}
                            </S.TopContent>
                        </S.Top>
                        <S.Top>
                            <S.TopTitle>프로젝트 목록</S.TopTitle>
                            <S.TopContent>
                                {projectTypeList &&
                                    projectTypeList.map((raw: any, idx: number) => {
                                        return (
                                            <S.TableRow
                                                $selected={
                                                    selectOfficialProjectType == raw.project_no
                                                }
                                                onClick={() =>
                                                    setSelectOfficialProjectType(
                                                        selectOfficialProjectType != raw.project_no
                                                            ? raw.project_no
                                                            : -1
                                                    )
                                                }
                                            >
                                                {raw.project_name}
                                            </S.TableRow>
                                        );
                                    })}
                            </S.TopContent>
                        </S.Top>
                        <S.Top>
                            <S.TopTitle>유형 목록</S.TopTitle>
                            <S.TopContent>
                                {OFFCIAL_DOCUMENT_TYPE_LIST.map((raw: any, idx: number) => {
                                    return (
                                        <S.TableRow
                                            $selected={selectOfficialDocumentType == idx}
                                            onClick={() =>
                                                setSelectOfficialDocumentType(
                                                    selectOfficialDocumentType != idx ? idx : -1
                                                )
                                            }
                                        >
                                            {raw}
                                        </S.TableRow>
                                    );
                                })}
                            </S.TopContent>
                        </S.Top>
                        <S.TopUser>
                            <S.TopTitle>스테이지 목록</S.TopTitle>
                            <S.TopContent>
                                {OFFCIAL_DOCUMENT_STAGE_TYPE_LIST.map((raw: any, idx: number) => {
                                    return (
                                        <S.TableRow
                                            $selected={selectOfficialStageType == idx}
                                            onClick={() =>
                                                setSelectOfficialStageType(
                                                    selectOfficialStageType != idx ? idx : -1
                                                )
                                            }
                                        >
                                            {raw}
                                        </S.TableRow>
                                    );
                                })}
                            </S.TopContent>
                        </S.TopUser>
                    </S.TopDiv>
                    <S.BtmDiv>
                        <S.BtmAuth>
                            <S.BtmTitle>구성원 목록</S.BtmTitle>
                            <S.BtmAuthContent $scroll={true}>
                                <TreeViewComp
                                    data={treeData}
                                    treeRef={treeRef}
                                    treeIds={treeIds}
                                    checkType={false}
                                    onTreeItemClick={onTreeItemClick}
                                    item={getTreeItem}
                                />
                            </S.BtmAuthContent>
                        </S.BtmAuth>
                        <S.Btm>
                            <S.BtmTitle>현황</S.BtmTitle>
                            <S.BtmAuthContent>
                                <S.BtmListTitle>
                                    <S.BtmListRow $width={20}>공문</S.BtmListRow>
                                    <S.BtmListRow $width={20}>프로젝트</S.BtmListRow>
                                    <S.BtmListRow $width={20}>유형</S.BtmListRow>
                                    <S.BtmListRow $width={20}>스테이지</S.BtmListRow>
                                    <S.BtmListRow $width={20}>이름</S.BtmListRow>
                                </S.BtmListTitle>
                                <S.BtmLine />
                                <S.BtmListDiv>
                                    {officialUserList.map((raw, idx) => getDivRows(raw, idx))}
                                </S.BtmListDiv>
                            </S.BtmAuthContent>
                        </S.Btm>
                    </S.BtmDiv>
                </S.ModalContentWrap>
                <S.ModalBtnContainer>
                    <S.CloseBtn onClick={onClose}>닫기</S.CloseBtn>
                    {buttonType == true ? (
                        <S.SaveBtn $red onClick={onDeleteOfficialUser}>
                            삭제
                        </S.SaveBtn>
                    ) : (
                        <S.SaveBtn onClick={onCreateOfficialUser}>추가</S.SaveBtn>
                    )}
                </S.ModalBtnContainer>
            </S.Inner>
        </S.Block>
    );
};
