/******************************************************************************
 * hooks :
 * useLocations
 * components :
 *
 *
 ******************************************************************************/
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { LoadingIndicatorComponent, ModalInfo } from "components";
import { EdmsTreeViewComp } from "../../components";
import { reducerState } from "../../common";
import { DeleteAuth, EditAuth, GetAuthList } from "../../common/action";

import * as S from "./styled";
import Close from "@material-ui/icons/Close";

export type EdmsAuthManageProps = {
    visible: boolean;
    onClose: () => void;
};

interface FinalEdmsAuthManageProps extends EdmsAuthManageProps {}

export const EdmsAuthManageComp: React.FunctionComponent<FinalEdmsAuthManageProps> = props => {
    const dispatch = useDispatch();
    const authSelector = useSelector((state: reducerState) => state.authority);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [selectedCompany, setSelectedCompany] = useState<number>(-1);
    const [selectedGroup, setSelectedGroup] = useState<number>(-1);
    const [selectedUser, setSelectedUser] = useState<number>(-1);
    const [selectedItemId, setSelectedItemId] = useState<string>("");
    const [selectedItem, setSelectedItem] = useState<any>();

    const [companyList, setCompanyList] = useState<any[]>([]);
    const [groupList, setGroupList] = useState<any[]>([]);
    const [userList, setUserList] = useState<any[]>([]);
    const [authList, setAuthList] = useState<any[]>([]);

    const [authData, setAuthData] = useState<any>();
    const [selectAuthList, setSelectAuthList] = useState<any[]>([]);

    const [readAuth, setReadAuth] = useState<boolean>(false);
    const [writeAuth, setWriteAuth] = useState<boolean>(false);
    const [downloadAuth, setDownloadAuth] = useState<boolean>(false);
    const [deleteAuth, setDeleteAuth] = useState<boolean>(false);

    useEffect(() => {
        dispatch(GetAuthList());
    }, []);

    useEffect(() => {
        if (authSelector.auth_list) {
            let auth: any = authSelector.auth_list;
            setCompanyList(auth.edms_comp);
            setGroupList(auth.edms_group);
            setUserList(auth.edms_user);
            setAuthList(auth.edms_auth);
        }
    }, [authSelector.auth_list]);

    useEffect(() => {
        if (authSelector.delete_auth) {
            setIsLoading(false);
            ModalInfo("권한 삭제를 완료했습니다.");
        } else if (authSelector.edit_auth) {
            setIsLoading(false);
            ModalInfo("권한 적용이 완료되었습니다.");
        }
        dispatch(GetAuthList());
        getAuth();
    }, [authSelector.delete_auth, authSelector.edit_auth]);

    useEffect(() => {
        getAuth();
    }, [selectedCompany, selectedGroup, selectedUser]);

    const onClose = () => {
        // 모달 닫는 함수
        props.onClose();
    };

    const getAuth = () => {
        let list = [];
        let _proj = [];
        let _projtype = [];
        let _dcl = [];
        let _cate = [];
        let _docu = [];
        let _auth: any = authSelector.auth_list;
        if (selectedGroup != -1)
            setUserList([..._auth.edms_user.filter((raw: any) => raw.group_id == selectedGroup)]);
        else setSelectedUser(-1);
        if (selectedCompany != -1) {
            setGroupList([
                ..._auth.edms_group.filter((raw: any) => raw.company_id == selectedCompany),
            ]);
        } else setSelectedGroup(-1);
        if (_auth)
            list = _auth.edms_auth.filter(
                (raw: any) =>
                    raw.company_id == selectedCompany &&
                    raw.group_id == selectedGroup &&
                    raw.user_id == selectedUser
            );
        if (list.length > 0) {
            for (var l of list) {
                if (l.docu_no != -1) _docu.push(l.docu_no);
                else if (l.cate_no != -1) _cate.push(l.cate_no);
                else if (l.discipline_id != -1) _dcl.push(l.discipline_id);
                else if (l.project_type_no != -1) _projtype.push(l.project_type_no);
                else if (l.project_no != -1) _proj.push(l.project_no);
            }
            setAuthList(list);
        }
        setSelectAuthList([]);
        setSelectedItem(null);
        setReadAuth(false);
        setWriteAuth(false);
        setDownloadAuth(false);
        setDeleteAuth(false);
        setAuthData({ _proj, _projtype, _dcl, _cate, _docu });
    };

    const onTreeItemClick = (event: any) => {
        //If category, show data, otherwise skip
        let projNo = -1;
        let disciplineNo = -1;
        let cateNo = -1;
        let docuNo = -1;
        let _auth: any = {};
        let findAuth = null;
        // event.item.isSelected = event.item.isSelected==true?false:true;
        const findIdx = selectAuthList.findIndex(auth => auth.tree_id == event.item.id);
        if (findIdx != -1) {
            selectAuthList.splice(findIdx, 1);
            setSelectAuthList([...selectAuthList]);
        } else {
            switch (event.item.type) {
                case "project":
                    projNo = event.item.project_no;
                    Object.assign(_auth, { auth_id: projNo, type: "project" });
                    if (event.item.isAuth)
                        findAuth = authList.find(
                            raw => raw.project_type_no == projNo && raw.discipline_id == -1
                        );

                    break;
                case "discipline":
                    disciplineNo = event.item.discipline_id;
                    Object.assign(_auth, { auth_id: disciplineNo, type: "discipline" });
                    if (event.item.isAuth)
                        findAuth = authList.find(
                            raw => raw.discipline_id == disciplineNo && raw.cate_no == -1
                        );
                    break;
                case "pcategory":
                case "category":
                    cateNo = event.item.cate_no;
                    Object.assign(_auth, { auth_id: cateNo, type: "category" });
                    if (event.item.isAuth)
                        findAuth = authList.find(raw => raw.cate_no == cateNo && raw.docu_no == -1);
                    break;
                case "document":
                    docuNo = event.item.docu_no;
                    Object.assign(_auth, { auth_id: docuNo, type: "document" });
                    if (event.item.isAuth) findAuth = authList.find(raw => raw.docu_no == docuNo);
                    break;
                default:
                    break;
            }

            if (_auth == undefined) _auth = {};
            Object.assign(_auth, { tree_id: event.item.id });
            if (findAuth) Object.assign(_auth, findAuth);

            setSelectAuthList([...selectAuthList, _auth]);
            setSelectedItem(event.item);
            setSelectedItemId(event.item.id.toString());
            if (event.item.isAuth) {
                setReadAuth(parseInt(_auth.read) == 1);
                setWriteAuth(parseInt(_auth.write) == 1);
                setDownloadAuth(parseInt(_auth.download) == 1);
                setDeleteAuth(parseInt(_auth.delete) == 1);
            } else {
                setReadAuth(false);
                setWriteAuth(false);
                setDownloadAuth(false);
                setDeleteAuth(false);
            }
        }
    };

    const EditDocuAuth = async () => {
        if (selectAuthList != null && selectAuthList.length > 0) {
            await dispatch(
                EditAuth(
                    selectAuthList,
                    readAuth,
                    writeAuth,
                    downloadAuth,
                    deleteAuth,
                    selectedCompany,
                    selectedGroup,
                    selectedUser
                )
            );
            setIsLoading(true);
        }
    };

    const DeleteDocuAuth = async () => {
        if (selectAuthList != null && selectAuthList.length > 0) {
            await dispatch(DeleteAuth(selectAuthList.map(raw => raw.id)));
            setIsLoading(true);
        }
    };

    return (
        <>
            <S.Block open={props.visible} onClose={onClose}>
                <S.Inner>
                    <LoadingIndicatorComponent open={isLoading} />
                    <S.ModalHeader>
                        <S.HeaderTitle>권한 관리</S.HeaderTitle>
                        <S.ModalCloseBtn onClick={onClose}>
                            <Close style={{fontSize : "1.6em"}} />
                        </S.ModalCloseBtn>
                    </S.ModalHeader>
                    <S.ModalContentWrap>
                        <S.TopDiv>
                            <S.Top>
                                <S.TopTitle>회사 목록</S.TopTitle>
                                <S.TopContent>
                                    {companyList &&
                                        companyList.length > 0 &&
                                        companyList.map((raw: any, idx: number) => {
                                            return (
                                                <S.TableRow
                                                    $selected={selectedCompany == raw.id}
                                                    onClick={() => {
                                                        setSelectedCompany(
                                                            selectedCompany != raw.id ? raw.id : -1
                                                        );
                                                    }}
                                                >
                                                    {raw.company_name}
                                                </S.TableRow>
                                            );
                                        })}
                                </S.TopContent>
                            </S.Top>
                            <S.Top>
                                <S.TopTitle>부서 목록</S.TopTitle>
                                <S.TopContent>
                                    {groupList &&
                                        selectedCompany != -1 &&
                                        groupList.map((raw: any, idx: number) => {
                                            return (
                                                <S.TableRow
                                                    $selected={selectedGroup == raw.id}
                                                    onClick={() =>
                                                        setSelectedGroup(
                                                            selectedGroup != raw.id ? raw.id : -1
                                                        )
                                                    }
                                                >
                                                    {raw.group_name}
                                                </S.TableRow>
                                            );
                                        })}
                                </S.TopContent>
                            </S.Top>
                            <S.TopUser>
                                <S.TopTitle>사원 목록</S.TopTitle>
                                <S.TopContent>
                                    {userList &&
                                        selectedCompany != -1 &&
                                        groupList.length > 0 &&
                                        selectedGroup != -1 &&
                                        userList.map((raw: any, idx: number) => {
                                            return (
                                                <S.TableRow
                                                    $selected={selectedUser == raw.user_id}
                                                    onClick={() =>
                                                        setSelectedUser(
                                                            selectedUser != raw.user_id
                                                                ? raw.user_id
                                                                : -1
                                                        )
                                                    }
                                                >
                                                    {raw.username}
                                                </S.TableRow>
                                            );
                                        })}
                                </S.TopContent>
                            </S.TopUser>
                        </S.TopDiv>
                        <S.BtmDiv>
                            <S.BtmAuth>
                                <S.BtmTitle>문서 목록</S.BtmTitle>
                                <S.BtmAuthContent>
                                    <EdmsTreeViewComp
                                        onChangeTreeData={data => {}}
                                        onTreeItemClick={onTreeItemClick}
                                        authData={authData}
                                        selectedItems={selectAuthList.map(raw => raw.tree_id)}
                                        // searchData={finalSearch}
                                        // filtered={{ project: { visibile: true, no: [42] } }}
                                    />
                                </S.BtmAuthContent>
                            </S.BtmAuth>
                            <S.Btm>
                                <S.BtmTitle>문서 권한</S.BtmTitle>
                                <S.BtmContent>
                                    <S.BtmContentRow>
                                        <S.Checkbox
                                            checked={readAuth}
                                            onClick={() => {
                                                if (selectAuthList.length > 0)
                                                    setReadAuth(!readAuth);
                                            }}
                                        />
                                        읽기
                                    </S.BtmContentRow>
                                    <S.BtmContentRow>
                                        <S.Checkbox
                                            checked={writeAuth}
                                            onClick={() => {
                                                if (selectAuthList.length > 0)
                                                    setWriteAuth(!writeAuth);
                                            }}
                                        />
                                        쓰기
                                    </S.BtmContentRow>
                                    <S.BtmContentRow>
                                        <S.Checkbox
                                            checked={downloadAuth}
                                            onClick={() => {
                                                if (selectAuthList.length > 0)
                                                    setDownloadAuth(!downloadAuth);
                                            }}
                                        />
                                        다운로드
                                    </S.BtmContentRow>
                                    <S.BtmContentRow>
                                        <S.Checkbox
                                            checked={deleteAuth}
                                            onClick={() => {
                                                if (selectAuthList.length > 0)
                                                    setDeleteAuth(!deleteAuth);
                                            }}
                                        />
                                        삭제
                                    </S.BtmContentRow>
                                    <S.BtmBtnDiv>
                                        <S.BtmEditBtn
                                            onClick={() => EditDocuAuth()}
                                            $active={selectAuthList.length > 0}
                                        >
                                            적용
                                        </S.BtmEditBtn>
                                        <S.BtmDelBtn
                                            onClick={() => DeleteDocuAuth()}
                                            $active={selectAuthList.length > 0}
                                        >
                                            삭제
                                        </S.BtmDelBtn>
                                    </S.BtmBtnDiv>
                                </S.BtmContent>
                            </S.Btm>
                        </S.BtmDiv>
                    </S.ModalContentWrap>
                </S.Inner>
            </S.Block>
        </>
    );
};
