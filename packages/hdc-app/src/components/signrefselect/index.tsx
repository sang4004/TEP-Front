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
import { useHover } from "hooks";
import * as S from "./styled";
import Close from "@material-ui/icons/Close";
import {
    TreeView,
    TreeViewItemClickEvent,
    TreeViewExpandChangeEvent,
    processTreeViewItems,
    TreeViewCheckChangeEvent,
} from "@progress/kendo-react-treeview";
import searchIconSvg from "../../images/icon/search_icon.svg";
import rightArrowBtnSvg from "../../images/btn/right_arrow_btn.svg";
import AddSignBtnSvg from "../../images/btn/addSign.svg";
import rightArrowBtnPressSvg from "../../images/btn/right_arrow_btn_press.svg";
import { reducerState } from "../../common";
import { SetSignReferer } from "../../common/action";
import Draggable from "react-draggable";
import { ToastComponent, ModalInfo } from "components";
import { TreeViewComp } from "../";
//
export type signRefSelectProps = {
    style?: object;
    children?: React.ReactNode;
    visible: boolean;
    onClose: () => void;
    onComplete: (list: object[]) => void;
};
type dataList = {
    id: number;
    name: string;
    part: string;
    company: string;
    user_id: number;
};

interface FinalsignRefSelectProps extends signRefSelectProps {}

export const SignRefSelectComp: React.FunctionComponent<FinalsignRefSelectProps> = props => {
    const dispatch = useDispatch();
    const dsSelector = useSelector((state: reducerState) => state.digitalsign);
    const [selectedId, setSelectedId] = useState<number[]>([]);

    const [referList, setReferList] = useState<dataList[]>([]);
    const [searchVal, setSearchVal] = useState<string>("");
    const [treeData, setTreeData] = useState<object[]>([]);
    const [treeIds, setTreeIds] = useState<any[]>([]);
    const [visibleToast, setVisibleToast] = useState<boolean>(false);
    const [buttonUp, setButtonUp] = useState<boolean>(false);
    const [buttonType, setButtonType] = useState<number>(0);

    const treeRef = useRef(null);

    useEffect(() => {
        if (dsSelector.sign_refer) {
            let refer = [];
            for (var l of dsSelector.sign_refer) {
                let _obj: any = {};
                _obj.id = l.user_id;
                _obj.name = l.username;
                _obj.part = l.groupname;
                _obj.company = l.company;
                _obj.user_id = l.user_id;
                if (l.state) _obj.state = parseInt(l.state);
                refer.push(_obj);
            }
            props.onComplete(refer);
            setReferList([...refer]);
            setSelectedId([...refer.map(raw => raw.id)]);
            getTreeData();
        }
    }, [dsSelector.sign_refer]);

    useEffect(() => {
        getTreeData(searchVal);
    }, [searchVal]);

    useEffect(() => {
        if (props.visible) {
            getTreeData();
        }
    }, [props.visible]);

    const getTreeData = (searchVal: null | string = null) => {
        let selected = referList.map(raw => raw.id);
        let _treeIds = [];
        if (dsSelector.sign_org) {
            let _list: any[] = [];
            let _nameList: any[] = [];
            let idx = 0;
            for (var org of dsSelector.sign_org) {
                if (
                    searchVal &&
                    org.username.indexOf(searchVal) == -1 &&
                    org.position.indexOf(searchVal) == -1 &&
                    org.groupname.indexOf(searchVal) == -1
                )
                    if (_list.filter(raw => raw.company == org.company).length > 0) continue;

                let is_expand =
                    searchVal &&
                    (org.username.indexOf(searchVal) != -1 ||
                        org.position.indexOf(searchVal) != -1 ||
                        org.groupname.indexOf(searchVal) != -1);

                if (_nameList.indexOf(org.company) == -1) {
                    _nameList.push(org.company);
                    _list.push({
                        text: org.company,
                        company: org.company,
                        isComp: true,
                        id: `${idx}`,
                        items: [],
                        expanded: searchVal || selectedId.length > 0 ? true : false,
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

                    let is_expand =
                        searchVal &&
                        (org.username.indexOf(searchVal) != -1 ||
                            org.position.indexOf(searchVal) != -1 ||
                            org.groupname.indexOf(searchVal) != -1);

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
                            items: [
                                {
                                    text: `${org.position} ${org.username}`,
                                    company: org.company,
                                    groupname: org.groupname,
                                    id: `${_nameList.indexOf(org.company)}_${partIdx}_${userIdx}`,
                                    itemid: org.id,
                                },
                            ],
                            expanded: is_expand,
                        });
                    }
                    let selectIdx = selectedId.indexOf(org.id);
                    if (selectIdx != -1)
                        _treeIds.push(`${_nameList.indexOf(org.company)}_${partIdx}_${userIdx}`);
                    userIdx += 1;
                }
            }
            setTreeIds([..._treeIds]);
            setTreeData([..._list]);
        }
    };

    const onClickConfirm = async () => {
        let _list = referList.filter((val, idx) => selectedId.indexOf(val.id) != -1);
        if (_list.length < selectedId.length) {
            setVisibleToast(true);
            setTimeout(() => {
                setVisibleToast(false);
            }, 3500);
            return;
        }
        if (dsSelector.sign_data)
            await dispatch(
                SetSignReferer(dsSelector.sign_data.id, [
                    ...referList.map((raw, idx) => raw.user_id),
                ])
            );
        props.onComplete([...referList]);
        props.onClose();
    };

    const submitData = (ids?: number[]) => {
        let refer: dataList[] = referList.filter(raw => selectedId.indexOf(raw.id) != -1);

        if (selectedId.length > 0) {
            selectedId.map((id: number, idx: number) => {
                if (referList.filter((raw: any, idx) => raw.id == id).length == 0) {
                    let data = dsSelector.sign_org.filter((raw: any, idx: any) => raw.id == id);
                    if (data.length == 0) return;
                    refer.push({
                        id: data[0].user_id,
                        name: data[0].username,
                        part: data[0].groupname,
                        company: data[0].company,
                        user_id: data[0].user_id,
                    });
                }
            });
        } else if (ids != undefined && ids.length > 0) {
            ids.map((id: any, idx: number) => {
                if (referList.filter((raw: any) => raw.id == id).length == 0) {
                    let data = dsSelector.sign_org.find((raw: any) => raw.id == id);
                    if (data == undefined) return;
                    refer.push({
                        id: data.user_id,
                        name: data.username,
                        part: data.groupname,
                        company: data.company,
                        user_id: data.user_id,
                    });
                }
            });
        }
        // all check disable
        let curr: any = treeRef.current;
        if (curr && curr.data) {
            for (var d of curr.data) {
                d.items.forEach((el: any) => (el.checked = false));
            }
        }
        setReferList([...refer]);
    };

    const onClose = () => {
        props.onClose();
    };

    const deleteSelected = (id: number) => {
        let _list = referList;
        let idx = selectedId.indexOf(id);
        selectedId.splice(idx, 1);
        _list.splice(idx, 1);
        setSelectedId([...selectedId]);
        setReferList([..._list]);
        getTreeData(searchVal);
    };

    const getLineRows = (raw: any, idx: number) => {
        return (
            <S.BodyDetail key={idx}>
                <S.TableCell $width={10} />
                <S.TableCell $width={30}>{raw.name}</S.TableCell>
                <S.TableCell $width={20}>{raw.part}</S.TableCell>
                <S.TableCell $width={30}>{raw.company}</S.TableCell>
                <S.TableCell $width={10} style={{ justifyContent: "flex-start" }}>
                    <S.close $disabled={raw.state == 1} onClick={() => deleteSelected(raw.id)}>
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
        setSelectedId(final);
    };

    const groupSave = async (type: number) => {
        if (referList.length > 0) {
            let ids = referList.map(raw => raw.id);
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
            {/* <Draggable> */}
            <S.Inner>
                <ToastComponent
                    text="적용되지 않은 참조가 있습니다. 화살표를 눌러 적용하거나, 창을 닫아주세요."
                    close={() => setVisibleToast(false)}
                    visible={visibleToast}
                    type={"warning"}
                    style={{ position: "absolute", right: 50, bottom: 100, alignItems: "flex-end" }}
                />
                <S.TitleDiv>
                    <S.Title>내부참조 선택</S.Title>

                    <S.ButtonDiv>
                        <S.ButtonDivTitle>참조 그룹 :</S.ButtonDivTitle>
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
                        <Close style={{ fontSize: "1.6em" }} />
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
                                onChangeTreeIds={(ids: number[]) => onChangeTreeIds([...ids])}
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
                            <S.TableCell $width={30}>이름</S.TableCell>
                            <S.TableCell $width={20}>부서</S.TableCell>
                            <S.TableCell $width={30}>회사</S.TableCell>
                            <S.TableCell $width={10}></S.TableCell>
                        </S.SubTitle>
                        <S.Seperator>
                            <hr />
                        </S.Seperator>
                        <S.InfoContainer>
                            {referList.map((raw: any, idx: number) => getLineRows(raw, idx))}
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
            {/* </Draggable> */}
        </S.Block>
    );
};
