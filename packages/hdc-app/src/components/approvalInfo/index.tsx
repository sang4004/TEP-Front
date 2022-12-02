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
import { useState, useEffect, useContext, ChangeEvent, useRef } from "react"; // default hooks
//
// Module
import * as S from "./styled";
import Close from "@material-ui/icons/Close";
import arrowBtnHoverSvg from "../../images/btn/arrow_gray_hover.svg";
import AddSignBtnSvg from "../../images/btn/addSign.svg";
import searchIconSvg from "../../images/icon/search_icon.svg";
import { GetSignLine, SetSignLine, GetAddressbook } from "../../common/action";
import { reducerState } from "../../common";
import { ModalInfo, ToastComponent } from "components";
import { TreeViewComp } from "../";
import Draggable from "react-draggable";
//
export type approvalInfoProps = {
    style?: object;
    children?: React.ReactNode;
    visible: boolean;
    onClose: () => void;
    onComplete: (list: object[]) => void;
};
export type dataList = {
    id: number;
    username: string;
    groupname: string;
    company: string;
    user_id: number;
    state: number;
    email: string;
    priority: number;
};

interface FinalapprovalInfoProps extends approvalInfoProps {}

export const ApprovalInfoComp: React.FunctionComponent<FinalapprovalInfoProps> = props => {
    const dispatch = useDispatch();
    const userSelector = useSelector((state: reducerState) => state.user);
    const dsSelector = useSelector((state: reducerState) => state.digitalsign);
    const orgSelector = useSelector((state: reducerState) => state.organization);
    const [selectedId, setSelectedId] = useState<number[]>([]);
    const [defererId, setDefererId] = useState<number[]>([]);

    const [approvalList, setApprovalList] = useState<dataList[]>([]);
    const [searchVal, setSearchVal] = useState<string>("");
    const [treeData, setTreeData] = useState<object[]>([]);
    const [treeIds, setTreeIds] = useState<any[]>([]);
    const [orderList, setOrderList] = useState<number[]>([]);
    const [visibleToast, setVisibleToast] = useState<boolean>(false);
    const [visibleToast2, setVisibleToast2] = useState<boolean>(false);
    const [buttonUp, setButtonUp] = useState<boolean>(false);
    const [buttonType, setButtonType] = useState<number>(0);

    const treeRef = useRef(null);

    useEffect(() => {
        // if (dsSelector.sign_data) dispatch(GetSignLine(dsSelector.sign_data.id));
        dispatch(GetAddressbook());
    }, [dsSelector.sign_data]);

    useEffect(() => {
        if (dsSelector.sign_line) {
            let line = [];
            let deferer_line = [];
            // let select: number[] = [];
            for (var l of dsSelector.sign_line) {
                let _obj: any = {};
                _obj.id = l.user_id;
                _obj.username = l.username;
                _obj.groupname = l.groupname;
                _obj.company = l.company;
                _obj.email = l.email;
                _obj.user_id = l.user_id;
                _obj.priority = l.priority;
                if (l.state) _obj.state = parseInt(l.state);
                if (parseInt(l.state) == 8) deferer_line.push(parseInt(l.user_id));
                line.push(_obj);
            }
            props.onComplete(line);
            setApprovalList([...line]);
            setDefererId([...deferer_line]);
            setOrderList([...line.map((raw, idx) => raw.id)]);
            getTreeData();
        }
    }, [dsSelector.sign_line, props.visible]);

    useEffect(() => {
        getTreeData(searchVal);
    }, [searchVal]);

    const getTreeData = (searchVal: null | string = null, _selectedId: any = null) => {
        let selected = _selectedId ? _selectedId : selectedId;
        let _treeIds = [];
        if (dsSelector.sign_org) {
            let _list: any[] = [];
            let _nameList: any[] = [];
            let idx = 0;
            for (var org of dsSelector.sign_org) {
                // if (searchVal
                //     && org.username.indexOf(searchVal) == -1
                //     && org.company.indexOf(searchVal) == -1
                //     && org.groupname.indexOf(searchVal) == -1
                //     )
                //     continue;
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
                for (var org of dsSelector.sign_org) {
                    if (
                        searchVal &&
                        org.username.indexOf(searchVal) == -1 &&
                        org.position.indexOf(searchVal) == -1 &&
                        org.groupname.indexOf(searchVal) == -1
                    )
                        continue;
                    if (org.company.indexOf(_l.text) == -1) continue;
                    if (
                        dsSelector.sign_data &&
                        dsSelector.sign_data.form_group_id == 0 &&
                        userSelector.groupname.indexOf(org.company) == -1
                    )
                        continue;

                    let is_expand =
                        searchVal &&
                        (org.username.indexOf(searchVal) == -1 ||
                            org.position.indexOf(searchVal) == -1 ||
                            org.groupname.indexOf(searchVal) == -1);
                    let partIdx = _partList.indexOf(org.groupname);
                    if (partIdx != -1) {
                        _l.items[partIdx].items.push({
                            text: `${org.position} ${org.username}`,
                            company: org.company,
                            groupname: org.groupname,
                            id: `${_nameList.indexOf(org.company)}_${partIdx}_${userIdx}`,
                            itemid: org.id,
                            expanded: is_expand,
                        });
                    } else {
                        _partList.push(org.groupname);
                        partIdx = _partList.length - 1;
                        userIdx = 0;
                        _l.items.push({
                            id: `${_nameList.indexOf(org.company)}_${partIdx}`,
                            text: org.groupname,
                            groupname: org.groupname,
                            company: org.company,
                            isPart: true,
                            expanded: is_expand,
                            items: [
                                {
                                    text: `${org.position} ${org.username}`,
                                    company: org.company,
                                    groupname: org.groupname,
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
            // console.log("APPROVAL INFIO !", _treeIds);
            // console.log("APPROVAL SELECTED !", selected);
            setTreeIds([..._treeIds]);
            setTreeData([..._list]);
        }
    };

    const onClickConfirm = async () => {
        let _list = approvalList.filter((val, idx) => selectedId.indexOf(val.id) != -1);
        if (_list.length < selectedId.length) {
            setVisibleToast(true);
            setTimeout(() => {
                setVisibleToast(false);
            }, 3500);
            return;
        }
        let org = [];
        let _org = orgSelector.addressbook.filter(
            (obj: any) => obj.oid == dsSelector.sign_data.group_id
        );
        for (var o of _org) {
            let filtered = approvalList.filter((obj: any) => obj.user_id == o.id);
            if (filtered.length > 0) org.push(o);
        }
        if (
            !dsSelector.sign_data.is_regist &&
            org.filter((obj: any) => obj.pid == 1 || obj.sub_field == 1).length == 0
        ) {
            setVisibleToast2(true);
            setTimeout(() => {
                setVisibleToast2(false);
            }, 3500);
            return;
        }
        if (dsSelector.sign_data) {
            await dispatch(
                SetSignLine(
                    dsSelector.sign_data.id,
                    [...approvalList.map((raw, idx) => raw.user_id)],
                    defererId
                )
            );
        }
        setOrderList([...approvalList.map((raw, idx) => raw.id)]);
        props.onComplete([...approvalList]);
        props.onClose();
    };

    const deleteSelected = (idx: number, id: number) => {
        approvalList.splice(idx, 1);
        setApprovalList([...approvalList]);

        defererId.splice(defererId.indexOf(id), 1);
        setDefererId([...defererId]);

        orderList.splice(orderList.indexOf(id), 1);
        setOrderList([...orderList]);

        selectedId.splice(selectedId.indexOf(id), 1);
        setSelectedId([...selectedId]);
        getTreeData();
    };

    const onChangeDeferer = (id: number, check: boolean) => {
        let _list = defererId;
        if (check) _list.push(id);
        else _list.splice(defererId.indexOf(id), 1);
        setDefererId([..._list]);
    };

    const submitData = (ids?: number[]) => {
        let approvals: dataList[] = approvalList;

        if (selectedId.length > 0) {
            selectedId.map((id: number, idx: number) => {
                if (
                    approvalList.filter((raw: any, idx) => raw.id == id).length == 0 &&
                    approvals.length <= 10
                ) {
                    let data = dsSelector.sign_org.filter((raw: any, idx: any) => raw.id == id);
                    if (data.length == 0) return;
                    approvals.push({
                        id: data[0].id,
                        username: data[0].username,
                        groupname: data[0].groupname,
                        company: data[0].company,
                        user_id: data[0].user_id,
                        state: data[0].state,
                        email: data[0].email,
                        priority: data[0].priority,
                    });
                }
            });
            approvals = [
                approvals[0],
                ...approvals
                    .slice(1, approvals.length)
                    .sort((a: any, b: any) => b.priority - a.priority),
            ];
        } else if (ids != undefined && ids.length > 0) {
            ids.map((id: any, idx: number) => {
                if (
                    approvalList.filter((raw: any) => raw.id == id).length == 0 &&
                    approvals.length <= 10
                ) {
                    let data = dsSelector.sign_org.find((raw: any) => raw.id == id);
                    if (data == undefined) return;
                    approvals.push({
                        id: data.id,
                        username: data.username,
                        groupname: data.groupname,
                        company: data.company,
                        user_id: data.user_id,
                        state: data.state,
                        email: data.email,
                        priority: data.priority,
                    });
                }
            });
        }
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
        setApprovalList([...approvals]);
        setOrderList([...orderList]);
        getTreeData();
    };

    const onClose = () => {
        props.onClose();
    };

    const getLineRows = (raw: any, index: number) => {
        if (raw.state == 1) return;
        return (
            <S.BodyDetail key={index}>
                <S.TableCell $width={10}>
                    <S.SignNumberDiv>
                        <S.SignNumberMoveBtn
                            src={arrowBtnHoverSvg}
                            onClick={() => onChangeOrder(index, -1)}
                        />
                        {/* <S.SignNumberEditInput
                            >{index}</S.SignNumberEditInput> */}
                        <p>{/* {orderList.indexOf(raw.id)} */}</p>
                        <S.SignNumberMoveBtn
                            $dir
                            src={arrowBtnHoverSvg}
                            onClick={() => onChangeOrder(index, 1)}
                        />
                    </S.SignNumberDiv>
                </S.TableCell>
                <S.TableCell $width={20}>{raw.username}</S.TableCell>
                <S.TableCell $width={20}>{raw.groupname}</S.TableCell>
                <S.TableCell $width={30}>{raw.company}</S.TableCell>
                <S.TableCell $width={10}>
                    {/* <S.AfterCheck
                        checked={defererId.indexOf(raw.id) != -1 ? true : false}
                        onChange={e => onChangeDeferer(raw.id, e.target.checked)}
                    /> */}
                </S.TableCell>
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

    const onChangeOrder = (idx: number, stat: number) => {
        let no = idx + stat;
        if (no > 0 && no < approvalList.length) {
            if (stat > 0) {
                approvalList.splice(idx, 2, approvalList[no], approvalList[idx]);
            } else {
                approvalList.splice(idx - 1, 2, approvalList[idx], approvalList[no]);
            }
        }
        setApprovalList([...approvalList]);
    };
    const onChangeTreeIds = (ids: number[]) => {
        const combined = [...selectedId, ...ids];
        // console.log(selectedId, ids);
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

    // 저장
    const groupSave = async (type: number) => {
        if (approvalList.length > 1) {
            let ids = approvalList.filter(raw => raw.id != userSelector.id).map(raw => raw.id);
            window.localStorage.setItem("group" + type, ids.join(","));
            ModalInfo(type + "번째 그룹에 저장 했습니다.");
        } else {
            return ModalInfo("한명 이상의 유저를 선택해주세요.");
        }
    };

    // 불러오기
    const groupImport = async (type: number) => {
        let ids: any[];
        let data = window.localStorage.getItem("group" + type);
        if (data) {
            ids = data.length > 0 ? data.split(",") : [];
            submitData(ids);
            ModalInfo(type + "번째 그룹을 불러왔습니다.");
        }
    };

    const groupNumber = (id: number) => {
        if (buttonUp == false) {
            setButtonUp(true);
            setButtonType(id);
        } else if (buttonUp == true) {
            setButtonUp(false);
            setButtonType(0);
        }
    };

    return (
        <S.Block open={props.visible ? true : false} onClose={props.onClose}>
            <Draggable>
                <S.Inner>
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
                        text="결재라인에 대표이사나 현장대리인이 없습니다. 결재자를 추가하거나, 창을 닫아주세요."
                        close={() => setVisibleToast2(false)}
                        visible={visibleToast2}
                        type={"warning"}
                        style={{
                            position: "absolute",
                            right: 50,
                            bottom: 100,
                            alignItems: "flex-end",
                        }}
                    />
                    <S.TitleDiv>
                        <S.Title>결재라인 선택</S.Title>

                        <S.ButtonDiv>
                            <S.ButtonDivTitle>결재 그룹 :</S.ButtonDivTitle>
                            {[1, 2, 3].map((raw, idx) => (
                                <S.NumberButton
                                    key={"groupBtn" + raw}
                                    $background={buttonType == raw ? true : false}
                                    onClick={() => groupNumber(raw)}
                                >
                                    그룹 {raw}
                                </S.NumberButton>
                            ))}
                        </S.ButtonDiv>
                        <S.CloseBtn onClick={onClose}>
                            <Close style={{fontSize : "1.6em"}} />
                        </S.CloseBtn>
                    </S.TitleDiv>
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
                                    <S.SearchIcon src={searchIconSvg} />
                                </S.Searchbar>
                            </S.SearchBox>
                        </S.TreeBlock>
                        <S.SubmitDiv>
                            <S.ActiveBtn onClick={() => submitData()}>
                                <img src={AddSignBtnSvg} />
                            </S.ActiveBtn>
                        </S.SubmitDiv>
                        <S.DetailBlock>
                            <S.SubTitle>
                                <S.TableCell $width={10} />
                                <S.TableCell $width={20}>이름</S.TableCell>
                                <S.TableCell $width={20}>부서</S.TableCell>
                                <S.TableCell $width={30}>회사</S.TableCell>
                                {/* <S.TableCell $width={10}>후결 여부</S.TableCell> */}
                                <S.TableCell $width={10} />
                            </S.SubTitle>
                            <S.Seperator>
                                <hr />
                            </S.Seperator>
                            <S.InfoContainer>
                                {approvalList[0] && (
                                    <S.BodyDetail>
                                        <S.TableCell $width={10} />
                                        <S.TableCell $width={20}>
                                            {approvalList[0].username}
                                        </S.TableCell>
                                        <S.TableCell $width={20}>
                                            {approvalList[0].groupname}
                                        </S.TableCell>
                                        <S.TableCell $width={30}>
                                            {approvalList[0].company}
                                        </S.TableCell>
                                        {/* <S.TableCell $width={10} /> */}
                                        <S.TableCell $width={10}>
                                            <S.close $disabled={approvalList[0].state == 1}>
                                                <Close
                                                    fontSize="large"
                                                    onClick={() =>
                                                        deleteSelected(0, approvalList[0].id)
                                                    }
                                                />
                                            </S.close>
                                        </S.TableCell>
                                    </S.BodyDetail>
                                )}
                                {approvalList.map((raw, idx) => getLineRows(raw, idx))}
                            </S.InfoContainer>
                            <S.EndContainer>
                                <S.ButtonContainer>
                                    {buttonUp && (
                                        <S.GroupDiv>
                                            <S.GroupBtn onClick={() => groupImport(buttonType)}>
                                                불러오기
                                            </S.GroupBtn>
                                            <S.GroupBtn onClick={() => groupSave(buttonType)}>
                                                그룹저장
                                            </S.GroupBtn>
                                        </S.GroupDiv>
                                    )}
                                </S.ButtonContainer>
                                <S.CheckContainer>
                                    <S.Btn onClick={onClickConfirm}>확인</S.Btn>
                                </S.CheckContainer>
                            </S.EndContainer>
                        </S.DetailBlock>
                    </S.Content>
                </S.Inner>
            </Draggable>
        </S.Block>
    );
};
