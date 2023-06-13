/******************************************************************************
 * hooks :
 * useLocations
 * components :
 *
 *
 ******************************************************************************/
import React, { useState, useEffect, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";

import { LoadingIndicatorComponent, ModalInfo } from "components";
import { EdmsTreeViewComp } from "../../components";
import { reducerState } from "../../common";
import {
    GetEdmsAddress,
    GetAllEdmsDocuManager,
    CreateDocuManager,
    DeleteDocuManager,
    EdmsDocumentManagerList,
} from "../../common/action";

import * as S from "./styled";
import Close from "@material-ui/icons/Close";

export type EdmsDocuManageProps = {
    visible: boolean;
    onClose: () => void;
};

interface FinalEdmsDocuManageProps extends EdmsDocuManageProps {}

export const EdmsDocuManageComp: React.FunctionComponent<FinalEdmsDocuManageProps> = props => {
    const dispatch = useDispatch();
    const pjSelector = useSelector((state: reducerState) => state.project);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [selectedCompany, setSelectedCompany] = useState<number>(-1);
    const [selectedGroup, setSelectedGroup] = useState<number>(-1);
    const [selectedUser, setSelectedUser] = useState<number>(-1);
    const [selectedItemId, setSelectedItemId] = useState<string>("");
    const [selectedItemType, setSelectedItemType] = useState<string>("");
    const [nowDisciplineNo, setNowDisciplineNo] = useState<number>(-1);
    const [nowCateNo, setNowCateNo] = useState<number>(-1);
    const [nowDocuNo, setNowDocuNo] = useState<number>(-1);

    const [companyList, setCompanyList] = useState<any[]>([]);
    const [groupList, setGroupList] = useState<any[]>([]);
    const [userList, setUserList] = useState<any[]>([]);
    const [docuManager, setDocuManager] = useState<any[]>([]);
    const [dataList, setDataList] = useState<any[]>([]);
    const [docuData, setDocuData] = useState<any>();
    const [selectedManager, setSelectedManager] = useState<object[]>([]);

    useEffect(() => {
        dispatch(GetEdmsAddress());
        dispatch(GetAllEdmsDocuManager());
    }, []);

    // 회사
    useEffect(() => {
        if (pjSelector.edms_company_list) setCompanyList(pjSelector.edms_company_list);
    }, [pjSelector.edms_company_list]);

    // 그룹
    useEffect(() => {
        if (pjSelector.edms_group_list) setGroupList(pjSelector.edms_group_list);
    }, [pjSelector.edms_group_list]);

    // 유저
    useEffect(() => {
        if (pjSelector.edms_user_list) setUserList(pjSelector.edms_user_list);
    }, [pjSelector.edms_user_list]);

    //문서 담당자
    useEffect(() => {
        if (pjSelector.edms_docu_manager_list) setDocuManager(pjSelector.edms_docu_manager_list);
    }, [pjSelector.edms_docu_manager_list]);

    useEffect(() => {
        if (selectedCompany) {
            setSelectedGroup(-1);
            setSelectedUser(-1);
            getDocuManager();
        }
    }, [selectedCompany]);

    useEffect(() => {
        getDocuManager();
    }, [selectedGroup, selectedUser]);

    // 문서 담당자 추가
    useEffect(() => {
        if (pjSelector.create_docu_manager) {
            dispatch(GetAllEdmsDocuManager());
            dispatch(EdmsDocumentManagerList());
            ModalInfo("문서 담당자가 추가 되었습니다.");
            setSelectedUser(-1);
            setDataList([]);
            setSelectedItemType("");
        }
    }, [pjSelector.create_docu_manager]);

    //문서 담당자 삭제
    useEffect(() => {
        if (pjSelector.delete_docu_manager) {
            dispatch(GetAllEdmsDocuManager());
            dispatch(EdmsDocumentManagerList());
            ModalInfo("문서 담당자가 삭제 되었습니다.");
            setSelectedUser(-1);
            setDataList([]);
            setSelectedItemType("");
        }
    }, [pjSelector.delete_docu_manager]);

    const onClose = () => {
        // 모달 닫는 함수
        props.onClose();
        setSelectedUser(-1);
        setDataList([]);
        setSelectedItemType("");
    };

    const getDocuManager = () => {
        let list = [];
        let _docu = [];
        let _manager: any = pjSelector.edms_docu_manager_list;
        if (selectedCompany != -1) {
            let filter_group = pjSelector.edms_group_list.filter(
                (raw: any) => raw.company_id == selectedCompany
            );
            setGroupList(filter_group);
            setUserList([]);
            if (selectedUser != -1) {
                let userInfo = pjSelector.edms_user_list.filter(
                    (raw: any) => raw.user_id == selectedUser
                )[0];
                if (userInfo.company_id != selectedCompany) {
                    setUserList([]);
                    setSelectedUser(-1);
                }
            }
        } else setSelectedGroup(-1);
        if (selectedGroup != -1) {
            let userList: any[] = pjSelector.edms_user_list.filter((raw: any) => {
                return raw.company_id == selectedCompany && raw.group_id == selectedGroup;
            });
            setUserList(userList);
        } else {
            setSelectedUser(-1);
        }
        if (_manager) list = _manager.filter((raw: any) => raw.user_id == selectedUser);
        if (list.length > 0) {
            for (var l of list) {
                if (l.docu_no != -1) _docu.push(l.docu_no);
            }
            makeSelectedManagerData(list);
            setDocuManager(list);
            setDocuData(_docu);
        }
    };

    const onTreeItemClick = (event: any) => {
        //If category, show data, otherwise skip
        let disciplineNo = -1;
        let cateNo = -1;
        let docuNo = -1;
        let filtered: any[] = [];
        let _data: any[] = [];
        switch (event.item.type) {
            case "project":
            case "discipline":
                disciplineNo = event.item.discipline_id;
                filtered = docuManager.filter(
                    (raw: any) =>
                        raw.discipline_id == disciplineNo && raw.cate_no == -1 && raw.docu_no == -1
                );
                if (filtered && filtered.length > 0) {
                    _data = filtered.filter((raw: any) => raw.user_id == selectedUser);
                }
                break;
            case "pcategory":
            case "category":
                cateNo = event.item.cate_no;
                filtered = docuManager.filter(
                    (raw: any) => raw.cate_no == cateNo && raw.docu_no == -1
                );
                if (filtered && filtered.length > 0) {
                    _data = filtered.filter((raw: any) => raw.user_id == selectedUser);
                }
                break;
            case "document":
                docuNo = event.item.docu_no;
                filtered = docuManager.filter((raw: any) => raw.docu_no == docuNo);
                if (filtered && filtered.length > 0) {
                    _data = filtered.filter((raw: any) => raw.user_id == selectedUser);
                }
                break;
            default:
                break;
        }
        setNowDisciplineNo(disciplineNo);
        setNowCateNo(cateNo);
        setNowDocuNo(docuNo);
        setSelectedItemId(event.item.id.toString());
        setSelectedItemType(event.item.type);
        setDataList(_data);
    };

    const get_botton_type = (userId: number, list: any[], type: string) => {
        if (userId != -1 && list.length == 0 && type != "project" && type.length > 0) {
            return <S.BtmAddBtn onClick={CreateManager}>문서담당자 추가</S.BtmAddBtn>;
        } else if (userId != -1 && list.length > 0 && type != "project" && type.length > 0) {
            return (
                <S.BtmAddBtn $background="red" onClick={DeleteManager}>
                    문서담당자 삭제
                </S.BtmAddBtn>
            );
        } else {
            return null;
        }
    };

    const CreateManager = () => {
        dispatch(
            CreateDocuManager(
                selectedCompany,
                selectedGroup,
                selectedUser,
                nowDisciplineNo,
                nowCateNo,
                nowDocuNo
            )
        );
    };

    const DeleteManager = () => {
        dispatch(
            DeleteDocuManager(
                selectedCompany,
                selectedGroup,
                selectedUser,
                nowDisciplineNo,
                nowCateNo,
                nowDocuNo
            )
        );
    };

    const makeSelectedManagerData = (managerList: any[]) => {
        if (managerList.length > 0) {
            let dataList: object[] = [];
            managerList.map(data => {
                let _data: object = {};
                if (data.docu_no && data.docu_no != -1) {
                    Object.assign(_data, { docu_no: data.docu_no });
                    return dataList.push(_data);
                }
                if (data.cate_no && data.cate_no != -1) {
                    Object.assign(_data, { cate_no: data.cate_no });
                    return dataList.push(_data);
                }
                if (data.discipline_id && data.discipline_id != -1) {
                    Object.assign(_data, { discipline_id: data.discipline_id });
                    return dataList.push(_data);
                }
            });
            setSelectedManager(dataList);
        }
    };

    return (
        <>
            <S.Block open={props.visible} onClose={onClose}>
                <S.Inner>
                    <LoadingIndicatorComponent open={isLoading} />
                    <S.ModalHeader>
                        <S.HeaderTitle>문서 담당자 수정</S.HeaderTitle>
                        <S.ModalCloseBtn onClick={onClose}>
                            <Close style={{ fontSize: "1.6em" }} />
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
                                        selectedItem={selectedItemId}
                                        docuData={docuData}
                                        selectedManager={selectedManager}
                                    />
                                </S.BtmAuthContent>
                            </S.BtmAuth>
                            <S.Btm>
                                {get_botton_type(selectedUser, dataList, selectedItemType)}
                                <S.BtmDelBtn onClick={onClose}>취소</S.BtmDelBtn>
                            </S.Btm>
                        </S.BtmDiv>
                    </S.ModalContentWrap>
                </S.Inner>
            </S.Block>
        </>
    );
};
