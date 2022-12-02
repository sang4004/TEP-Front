/******************************************************************************
 * Copyright (c) 2021. Moornmo Inc. Rights reserved.                          *
 * Data modelings and methods used are assets of Moornmo Inc.                 *
 * appwrapper/index.tsx
 * hooks :
 * useLocations
 *
 * last modify : jh.jeong@ilts.co.kr
 ******************************************************************************/
// Library
import { useSelector, useDispatch } from "react-redux"; // redux
import { useState, useEffect, useRef } from "react"; // default hooks
//
// Module
import * as S from "./docuDeployModal.styled";
import Close from "@material-ui/icons/Close";
import searchIconSvg from "../../images/icon/search_icon.svg";
import { GetAddressbook  } from "../../common/action";
import { reducerState } from "../../common";
import { TreeViewComp } from "..";
import Draggable from "react-draggable";
//
export type DocuDeployModal = {
    style?: object;
    children?: React.ReactNode;
    visible: boolean;
    deployUsers: deployData[];
    onClose: () => void;
    onComplete: (list: object[]) => void;
};
export type deployData = {
    id: number;
    username: string;
    part: string;
    company: string;
};

interface FinalDocuDeployModal extends DocuDeployModal {}

export const DocuDeployModal: React.FunctionComponent<FinalDocuDeployModal> = props => {
    const dispatch = useDispatch();
    const orgSelector = useSelector((state: reducerState) => state.organization);
    const userSelector = useSelector((state: reducerState) => state.user);
    const [selectedId, setSelectedId] = useState<number[]>([]);

    const [approvalList, setApprovalList] = useState<deployData[]>([]);
    const [searchVal, setSearchVal] = useState<string>("");
    const [treeData, setTreeData] = useState<object[]>([]);
    const [treeIds, setTreeIds] = useState<any[]>([]);
    const [addressBook, setAddressBook] = useState<any[]>([]);
    const treeRef = useRef(null);

    useEffect(() => {
        if (orgSelector.addressbook.length == 0) dispatch(GetAddressbook());
    }, []);

    useEffect(() => {
        if (orgSelector.addressbook && orgSelector.addressbook.length > 0) {
            let _list = [];
            for (var d of orgSelector.addressbook) {
                if (d.id != userSelector.id) {
                    _list.push({
                        company: d.company,
                        id: d.id,
                        oid: d.oid,
                        part: d.part,
                        pid: d.pid,
                        position: d.position,
                        sub_field: d.sub_field,
                        username: d.username,
                    });
                    setAddressBook([..._list]);
                    getTreeData();
                }
            }
        }
    }, [orgSelector.addressbook, props.visible]);

    useEffect(() => {
        if (props.deployUsers && props.deployUsers.length > 0) {
            let line = [];
            let ids = [];
            for (var l of props.deployUsers) {
                let _obj: any = {};
                _obj.id = l.id;
                _obj.username = l.username;
                _obj.part = l.part;
                _obj.company = l.company;
                line.push(_obj);
                ids.push(l.id);
            }
            setSelectedId([...ids]);
            setApprovalList([...line]);
            getTreeData();
        }
    }, [props.deployUsers, props.visible]);

    useEffect(() => {
        getTreeData(searchVal);
    }, [searchVal]);

    const getTreeData = (searchVal: null | string = null, _selectedId: any = null) => {
        let selected = _selectedId ? _selectedId : selectedId;
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
                    expanded: searchVal || selected.length > 0 ? true : false,
                    text: org.company,
                    id: `${idx}`,
                    items: [],
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
                if (partIdx != -1) {
                    _l.items[partIdx].items.push({
                        text: `${org.position} ${org.username}`,
                        company: org.company,
                        part: org.part,
                        id: `${_nameList.indexOf(org.company)}_${partIdx}_${userIdx}`,
                        itemid: org.id,
                        expanded: is_expand,
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
                        items: [
                            {
                                text: `${org.position} ${org.username}`,
                                company: org.company,
                                part: org.part,
                                id: `${_nameList.indexOf(org.company)}_${partIdx}_${userIdx}`,
                                itemid: org.id,
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

    const onClickConfirm = async () => {
        let approvals = addressBook.filter((raw: any) => selectedId.indexOf(raw.id) != -1);
        props.onComplete([...approvals]);
        props.onClose();
    };

    const onClose = () => {
        props.onClose();
    };

    const onChangeTreeIds = (ids: number[]) => {
        const combined = [...selectedId, ...ids];
        const deleted = selectedId.filter((id, idx) => {
            return ids.indexOf(id) == -1;
        });
        const unique = combined.filter((id, idx) => {
            return combined.indexOf(id) === idx;
        });

        const final = unique.filter((id, idx) => {
            return deleted.indexOf(id) == -1;
        });
        if (searchVal.length == 0) setSelectedId(final);
        else setSelectedId(unique);
    };

    return (
        <S.Block open={props.visible ? true : false} onClose={props.onClose}>
            <Draggable>
                <S.Inner>
                    <S.Title>수신자 선택</S.Title>
                    <S.CloseBtn onClick={onClose}>
                        <Close fontSize="large"/>
                    </S.CloseBtn>
                    <S.Content>
                        <S.TreeBlock>
                            <S.TreeTitle>
                                리스트
                                <hr />
                            </S.TreeTitle>
                            <S.TreeInnerBox>
                                <TreeViewComp
                                    data={treeData}
                                    treeRef={treeRef}
                                    treeIds={treeIds}
                                    onChangeTreeIds={(ids: number[]) => onChangeTreeIds(ids)}
                                    selectedId={selectedId}
                                />
                            </S.TreeInnerBox>
                            <S.SearchBox>
                                <S.Searchbar>
                                    <S.SearchField
                                        InputProps={{
                                            disableUnderline: true,
                                        }}
                                        placeholder={"이름/부서/직급 등"}
                                        onChange={e => setSearchVal(e.target.value)}
                                        value={searchVal}
                                    />
                                    <S.SearchIcon src={searchIconSvg} />
                                </S.Searchbar>
                            </S.SearchBox>
                        </S.TreeBlock>
                    </S.Content>
                    <S.Btn onClick={onClickConfirm}>확인</S.Btn>
                </S.Inner>
            </Draggable>
        </S.Block>
    );
};
