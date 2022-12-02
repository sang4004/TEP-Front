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
import NewWindow from "react-new-window";
import * as S from "./styled";
import Close from "@material-ui/icons/Close";
import { GetEdmsAddressbook } from "../../common/action";
import { reducerState } from "../../common";
import { ToastComponent } from "components";
import { TreeViewComp, CustomGroupManage } from "..";
import { domain } from "../../common/network";
//
export type edmsDocuManagerAddProps = {
    style?: object;
    children?: React.ReactNode;
    visible: boolean;
    addList: managerDataList[];
    onClose: () => void;
    onComplete: (list: object[]) => void;
};
export type managerDataList = {
    id: number;
    username: string;
    part: string;
    company: string;
    state: number;
};

interface FinaledmsDocuManagerAddProps extends edmsDocuManagerAddProps {}

export const EdmsDocuManagerAdd: React.FunctionComponent<FinaledmsDocuManagerAddProps> = props => {
    const dispatch = useDispatch();
    const orgSelector = useSelector((state: reducerState) => state.organization);
    const userSelector = useSelector((state: reducerState) => state.user);
    const [selectedId, setSelectedId] = useState<number[]>([]);

    const [addList, setAddList] = useState<managerDataList[]>([]);
    const [searchVal, setSearchVal] = useState<string>("");
    const [treeData, setTreeData] = useState<object[]>([]);
    const [treeIds, setTreeIds] = useState<any[]>([]);
    const [orderList, setOrderList] = useState<number[]>([]);
    const [visibleToast, setVisibleToast] = useState<boolean>(false);
    const [addressBook, setAddressBook] = useState<any[]>([]);
    const [customGroupSelectIdx, setCustomGroupSelectIdx] = useState<number>(-1);
    const [changeType, setChangeEditType] = useState<number>(-1);
    const [buttonCount, setButtonCount] = useState<any[]>([]);
    const [visibleSecondToast, setVisibleSecondToast] = useState<boolean>(false);

    const treeRef = useRef(null);

    useEffect(() => {
        dispatch(GetEdmsAddressbook());
        let count = window.localStorage.getItem("Docu_Manger_Count");
        if (count) {
            let button = count.length > 0 ? count.split(",") : [];
            setButtonCount(button);
        }
    }, [props.visible]);

    useEffect(() => {
        if (addressBook.length != 0) getTreeData();
    }, [addressBook]);

    useEffect(() => {
        if (props.visible && orgSelector.edms_address && orgSelector.edms_address.length > 0) {
            let _list = [];
            for (var d of orgSelector.edms_address) {
                _list.push({
                    company: d.company,
                    company_id: d.cid,
                    id: d.id,
                    oid: d.oid,
                    part: d.part,
                    pid: d.pid,
                    position: d.position,
                    sub_field: d.sub_field,
                    username: d.username,
                });
                setAddressBook([..._list]);
            }
        }
    }, [orgSelector.edms_address]);

    useEffect(() => {
        if (props.addList) {
            let line = [];
            let ids = [];
            for (var l of props.addList) {
                let _obj: any = {};
                _obj.id = l.id;
                _obj.username = l.username;
                _obj.part = l.part;
                _obj.company = l.company;
                _obj.state = l.state;
                line.push(_obj);
                ids.push(l.id);
            }
            if (line.length == 0) {
                line.push({ company: "", id: 0, part: "", state: 1, username: "" });
                ids.push(0);
            }
            setSelectedId([...ids]);
            setAddList([...line]);
            setOrderList([...line.map((raw, idx) => raw.id)]);
            getTreeData();
        }
    }, [props.addList, props.visible]);

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

            if (_nameList.indexOf(org.company) == -1 && org.company_id == userSelector.company) {
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
        let _list = addList.filter((val, idx) => selectedId.indexOf(val.id) != -1);
        if (_list.length < selectedId.length) {
            setVisibleToast(true);
            setTimeout(() => {
                setVisibleToast(false);
            }, 3500);
            return;
        }
        let _addList = addList.filter((raw, idx) => raw.id != 0);
        setOrderList([..._addList.map(raw => raw.id)]);
        props.onComplete([..._addList]);
        props.onClose();
    };

    const deleteSelected = (idx: number, id: number) => {
        addList.splice(idx, 1);
        setAddList([...addList]);

        orderList.splice(orderList.indexOf(id), 1);
        setOrderList([...orderList]);

        selectedId.splice(selectedId.indexOf(id), 1);
        setSelectedId([...selectedId]);
        getTreeData();
    };

    const submitData = (ids: any[] = []) => {
        let approvals: managerDataList[] = addList;
        if (selectedId.length > 0)
            selectedId.map((id: number, idx: number) => {
                if (
                    addList.filter((raw: any, idx) => raw.id == id).length == 0 &&
                    approvals.length <= 10
                ) {
                    let data = addressBook.find((raw: any, idx: any) => raw.id == id);
                    if (data == undefined) return;
                    approvals.push({
                        id: data.id,
                        username: data.username,
                        part: data.part,
                        company: data.company,
                        state: data.state,
                    });
                }
            });
        if (ids && ids.length > 0)
            ids.map((id: any, idx: number) => {
                if (
                    addList.filter((raw: any) => raw.id == id).length == 0 &&
                    approvals.length <= 10
                ) {
                    let data = addressBook.find((raw: any) => raw.id == id);
                    if (data == undefined) return;
                    approvals.push({
                        id: data.id,
                        username: data.username,
                        part: data.part,
                        company: data.company,
                        state: data.state,
                    });
                }
            });

        approvals = [
            approvals[0],
            ...approvals
                .slice(1, approvals.length)
                .sort((a: any, b: any) => b.priority - a.priority),
        ];
        for (var approval of approvals) {
            orderList.push(approval.id);
        }
        // all check disable
        let curr: any = treeRef.current;
        if (curr && curr.data) {
            for (var d of curr.data) {
                d.items.forEach((el: any) => (el.checked = false));
            }
        }
        setAddList([...approvals]);
        setOrderList([...orderList]);
        getTreeData();
    };

    const onClose = () => {
        props.onClose();
    };

    const getLineRows = (raw: any, index: number) => {
        return (
            <S.BodyDetail key={index} style={{ display: raw.state != 1 ? "flex" : "none" }}>
                <S.TableCell $width={20}>{raw.username}</S.TableCell>
                <S.TableCell $width={20}>{raw.part}</S.TableCell>
                <S.TableCell $width={30}>{raw.company}</S.TableCell>
                <S.TableCell $width={10}></S.TableCell>
                <S.TableCell $width={10}>
                    <S.close
                        $disabled={raw.state == 1}
                        onClick={() => deleteSelected(index, raw.id)}
                    >
                        삭제
                    </S.close>
                </S.TableCell>
            </S.BodyDetail>
        );
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

    const editCheck = (e: any) => {
        if (e.target == e.currentTarget.querySelector(".GroupEdit")) {
            setChangeEditType(1);
        } else {
            setChangeEditType(0);
        }
    };

    const customGroup = CustomGroupManage({
        type: "Docu_Manger",
        datas: addList.map(raw => raw.id),
        onSelect: (idx: number) => setCustomGroupSelectIdx(idx),
        selectIdx: customGroupSelectIdx,
        submitData: (ids: any[]) => submitData(ids),
        btnContainerStyle: {
            marginBottom: "20px",
            marginLeft: "10px",
            flex: "1",
            justifyContent: "flex-start",
        },
        numberContainerStyle: { marginBottom: "10px" },
        buttonCount: buttonCount,
        editType: changeType,
        toast: setVisibleSecondToast,
    });

    if (props.visible == false) return <></>;
    return (
        <NewWindow
            title="접수 및 배포"
            onUnload={props.onClose}
            features={{ width: 1000, height: 720 }}
        >
            <S.Block>
                <S.Inner onClick={e => editCheck(e)}>
                    <ToastComponent
                        text="적용되지 않은 결재자가 있습니다. 화살표를 눌러 적용하거나, 창을 닫아주세요."
                        close={() => setVisibleToast(false)}
                        visible={visibleToast}
                        type={"warning"}
                        style={{
                            position: "absolute",
                            right: 50,
                            bottom: 100,
                            alignItems: "flex-end",
                        }}
                    />
                    <ToastComponent
                        text="그룹이 저장되었습니다."
                        close={() => setVisibleSecondToast(false)}
                        visible={visibleSecondToast}
                        type={"warning"}
                        style={{
                            position: "absolute",
                            bottom: 100,
                            right: 100,
                            alignItems: "center",
                        }}
                    />
                    <S.Title>문서담당자 선택</S.Title>
                    {customGroup.numberDiv}
                    <S.CloseBtn onClick={onClose}>
                        <Close style={{fontSize : "3em"}} />
                    </S.CloseBtn>
                    <S.Content>
                        <S.TreeBlock>
                            <S.TreeTitle>
                                조직도
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
                                    <S.SearchIcon src={`${domain}/assets/images/search_icon.svg`} />
                                </S.Searchbar>
                            </S.SearchBox>
                        </S.TreeBlock>
                        <S.SubmitDiv>
                            <S.ActiveBtn onClick={() => submitData()}>
                                <img src={`${domain}/assets/images/addSign.svg`} />
                            </S.ActiveBtn>
                        </S.SubmitDiv>
                        <S.DetailBlock>
                            <S.SubTitle>
                                <S.TableCell $width={20}>이름</S.TableCell>
                                <S.TableCell $width={20}>부서</S.TableCell>
                                <S.TableCell $width={30}>회사</S.TableCell>
                                <S.TableCell $width={10} />
                            </S.SubTitle>
                            <S.Seperator>
                                <hr />
                            </S.Seperator>
                            <S.InfoContainer>
                                {addList.map((raw, idx) => getLineRows(raw, idx))}
                            </S.InfoContainer>
                            <S.EndContainer>
                                {customGroup.btnDiv}
                                <S.Btn onClick={onClickConfirm}>확인</S.Btn>
                            </S.EndContainer>
                        </S.DetailBlock>
                    </S.Content>
                </S.Inner>
            </S.Block>
        </NewWindow>
    );
};
