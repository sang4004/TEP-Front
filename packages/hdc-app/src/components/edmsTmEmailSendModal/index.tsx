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
import * as S from "./styled";
import Close from "@material-ui/icons/Close";
import NewWindow from "react-new-window";
import { domain } from "../../common/network";
// import arrowBtnHoverSvg from "../../images/btn/arrow_gray_hover.svg";
// import AddSignBtnSvg from "../../images/btn/addSign.svg";
// import searchIconSvg from "../../images/icon/search_icon.svg";
import { GetEdmsAddressbook, GetEdmsAddress, GetEdmsMailAddress } from "../../common/action";
import { reducerState } from "../../common";
import { ModalInfo, ToastComponent } from "components";
import { TreeViewComp, CustomGroupManage } from "..";
//
export type edmsTmEmailSendModalProps = {
    style?: object;
    children?: React.ReactNode;
    visible: boolean;
    approverList: emailList[];
    onClose: () => void;
    onComplete: (list: object[]) => void;
};
export type emailList = {
    id: number;
    username: string;
    part: string;
    company: string;
    state: number;
};

interface FinaledmsTmEmailSendModalProps extends edmsTmEmailSendModalProps {}

export const EdmsTmEmailSendModal: React.FunctionComponent<
    FinaledmsTmEmailSendModalProps
> = props => {
    const dispatch = useDispatch();
    const orgSelector = useSelector((state: reducerState) => state.organization);
    const userSelector = useSelector((state: reducerState) => state.user);
    const [selectedId, setSelectedId] = useState<number[]>([]);

    const [emailList, setEmailList] = useState<emailList[]>([]);
    const [searchVal, setSearchVal] = useState<string>("");
    const [treeData, setTreeData] = useState<object[]>([]);
    const [treeIds, setTreeIds] = useState<any[]>([]);
    const [orderList, setOrderList] = useState<number[]>([]);
    const [visibleToast, setVisibleToast] = useState<boolean>(false);
    const [visibleSecondToast, setVisibleSecondToast] = useState<boolean>(false);
    const [addressBook, setAddressBook] = useState<any[]>([]);
    const [selectBtnIdx, setSelectBtnIdx] = useState<number>(-1);

    const [buttonCount, setButtonCount] = useState<any[]>([]);
    const [changeType, setChangeEditType] = useState<number>(-1);

    const treeRef = useRef(null);

    useEffect(() => {
        dispatch(GetEdmsMailAddress());
        // dispatch(GetEdmsAddressbook("MAIL"));
        let count = window.localStorage.getItem("Mail_Receive_Count");
        if (count) {
            let button = count.length > 0 ? count.split(",") : [];
            setButtonCount(button);
        }
    }, [props.visible]);

    useEffect(() => {
        if (
            orgSelector.edms_mail_address &&
            orgSelector.edms_mail_address.length > 0
        ) {
            let _list = [];
            for (var d of orgSelector.edms_mail_address) {
                if (d.id != userSelector.id) {
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
            getTreeData(_list);
        }
    }, [orgSelector.edms_mail_address]);

    useEffect(() => {
        if (props.approverList) {
            let line = [];
            let ids = [];
            for (var l of props.approverList) {
                let _obj: any = {};
                _obj.id = l.id;
                _obj.username = l.username;
                _obj.part = l.part;
                _obj.company = l.company;
                _obj.state = l.state;
                line.push(_obj);
                ids.push(l.id);
            }
            // pre render
            if (line.length == 0) {
                line.push({ company: "", id: 0, part: "", state: 1, username: "" });
                ids.push(0);
            }
            setSelectedId([...ids]);
            setEmailList([...line]);
            setOrderList([...line.map((raw, idx) => raw.id)]);
            getTreeData();
        }
    }, [props.approverList, props.visible]);

    useEffect(() => {
        getTreeData(null, searchVal);
    }, [searchVal]);

    const getTreeData = (
        address_book: null | any[] = null,
        searchVal: null | string = null,
        _selectedId: any = null
    ) => {
        let selected = _selectedId ? _selectedId : selectedId;
        let _treeIds = [];
        let _list: any[] = [];
        let _nameList: any[] = [];
        let idx = 0;
        let NowaddressBook = addressBook;
        if (address_book) NowaddressBook = address_book;
        for (var org of NowaddressBook) {
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
            for (var org of NowaddressBook) {
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
        // let _list = emailList.filter((val, idx) => selectedId.indexOf(val.id) != -1);
        // if (_list.length < selectedId.length) {
        //     setVisibleToast(true);
        //     setTimeout(() => {
        //         setVisibleToast(false);
        //     }, 3500);
        //     return;
        // }
        let _emailList = emailList.filter(raw => raw.id != 0);
        setOrderList([..._emailList.map((raw, idx) => raw.id)]);
        props.onComplete([..._emailList]);
        props.onClose();
    };

    const deleteSelected = (idx: number, id: number) => {
        emailList.splice(idx, 1);
        setEmailList([...emailList]);

        orderList.splice(orderList.indexOf(id), 1);
        setOrderList([...orderList]);

        selectedId.splice(selectedId.indexOf(id), 1);
        setSelectedId([...selectedId]);
        getTreeData();
    };

    const submitData = (ids?: number[]) => {
        let approvals: emailList[] = emailList;

        if (selectedId.length > 0) {
            selectedId.map((id: number, idx: number) => {
                if (emailList.filter((raw: any, idx) => raw.id == id).length == 0) {
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

            approvals = [
                approvals[0],
                ...approvals
                    .slice(1, approvals.length)
                    .sort((a: any, b: any) => b.priority - a.priority),
            ];
        } else if (ids != undefined && ids.length > 0) {
            ids.map((id: any, idx: number) => {
                if (emailList.filter((raw: any) => raw.id == id).length == 0) {
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
        setEmailList([...approvals]);
        setOrderList([...orderList]);
        getTreeData();
    };

    const onClose = () => {
        props.onClose();
    };

    const onChangeOrder = (idx: number, stat: number) => {
        let no = idx + stat;
        if (no > -1 && no < emailList.length) {
            if (stat > 0) {
                emailList.splice(idx, 2, emailList[no], emailList[idx]);
            } else {
                emailList.splice(idx - 1, 2, emailList[idx], emailList[no]);
            }
        }
        setEmailList([...emailList]);
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
        datas: emailList.map(raw => raw.id),
        submitData: ids => submitData(ids),
        type: "Mail_Receive",
        onSelect: setSelectBtnIdx,
        selectIdx: selectBtnIdx,
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
            onUnload={onClose}
            center="parent"
            features={{ width: 1000, height: 600 }}
            title="TR 메일수신자 선택"
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
                    <S.Title>메일 수신자 선택</S.Title>
                    {/* {customGroup.numberDiv} */}
                    {/* <S.CloseBtn onClick={onClose}>
                        <Close style={{ fontSize: "3em" }} />
                    </S.CloseBtn> */}
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
                                    checkType={true}
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
                            <S.ActiveBtn onClick={() => submitData(undefined)}>
                                <img src={`${domain}/assets/images/addSign.svg`} />
                            </S.ActiveBtn>
                        </S.SubmitDiv>
                        <S.DetailBlock>
                            <S.SubTitle>
                                {/* <S.TableCell $width={10} /> */}
                                <S.TableCell $width={20}>이름</S.TableCell>
                                <S.TableCell $width={20}>부서</S.TableCell>
                                <S.TableCell $width={30}>회사</S.TableCell>
                                <S.TableCell $width={10} />
                            </S.SubTitle>
                            <S.Seperator>
                                <hr />
                            </S.Seperator>
                            <S.InfoContainer>
                                {emailList.map((raw, idx) => {
                                    return (
                                        <S.BodyDetail
                                            key={idx}
                                            style={{
                                                display: raw.state != 1 ? "flex" : "none",
                                            }}
                                        >
                                            {/* <S.ApproverDiv>
                                                <S.SignNumberDiv>
                                                    <S.SignNumberMoveBtn
                                                        style={{
                                                            width: "18px",
                                                            margin: "5px 0",
                                                            cursor: "pointer",
                                                            filter: "opacity(50%)",
                                                        }}
                                                        src={`${domain}/assets/images/arrow_gray_hover.svg`}
                                                        onClick={() => onChangeOrder(idx, -1)}
                                                    />
                                                    <S.SignNumberMoveBtn
                                                        style={{
                                                            width: "18px",
                                                            margin: "5px 0",
                                                            cursor: "pointer",
                                                            filter: "opacity(50%)",
                                                        }}
                                                        $dir
                                                        src={`${domain}/assets/images/arrow_gray_hover.svg`}
                                                        onClick={() => onChangeOrder(idx, 1)}
                                                    />
                                                </S.SignNumberDiv>
                                            </S.ApproverDiv> */}
                                            <S.TableCell $width={20}>{raw.username}</S.TableCell>
                                            <S.TableCell $width={20}>{raw.part}</S.TableCell>
                                            <S.TableCell $width={30}>{raw.company}</S.TableCell>
                                            <S.TableCell $width={10}></S.TableCell>
                                            <S.TableCell $width={10}>
                                                <S.close
                                                    $disabled={raw.state == 1}
                                                    onClick={() => deleteSelected(idx, raw.id)}
                                                >
                                                    삭제
                                                </S.close>
                                            </S.TableCell>
                                        </S.BodyDetail>
                                    );
                                })}
                            </S.InfoContainer>
                            <S.EndContainer>
                                {customGroup.btnDiv}
                                <S.CheckContainer>
                                    <S.Btn onClick={onClickConfirm}>확인</S.Btn>
                                </S.CheckContainer>
                            </S.EndContainer>
                        </S.DetailBlock>
                    </S.Content>
                </S.Inner>
            </S.Block>
        </NewWindow>
    );
};
