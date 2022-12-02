/******************************************************************************
 * Copyright (c) 2021. Moornmo Inc. Rights reserved.                          *
 * Data modelings and methods used are assets of Moornmo Inc.                 *
 * hooks :
 * useLocations
 * components :
 *
 * last modify : jh.jeong
 *
 ******************************************************************************/
import React, { useState, useEffect, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";

import { LoadingIndicatorComponent, ModalInfo } from "components";
import { reducerState } from "../../common";
import { GetEdmsAddress, UpdateMenu } from "../../common/action";

import * as S from "./styled";
import Close from "@material-ui/icons/Close";

const MENU_LIST = ["문서관리", "성과물"];

export type EdmsMenuAuthorityProps = {
    visible: boolean;
    onClose: () => void;
};

interface FinalEdmsMenuAuthorityProps extends EdmsMenuAuthorityProps {}

export const EdmsMenuAuthorityModal: React.FunctionComponent<FinalEdmsMenuAuthorityProps> =
    props => {
        const dispatch = useDispatch();
        const pjSelector = useSelector((state: reducerState) => state.project);
        const [isLoading, setIsLoading] = useState<boolean>(false);

        const [selectedCompany, setSelectedCompany] = useState<number>(-1);
        const [selectedGroup, setSelectedGroup] = useState<number>(-1);
        const [selectedUser, setSelectedUser] = useState<number>(-1);
        const [companyList, setCompanyList] = useState<any[]>([]);
        const [groupList, setGroupList] = useState<any[]>([]);
        const [userList, setUserList] = useState<any[]>([]);
        const [menuName, setMenuName] = useState<string>("");
        const [menuState, setMenuState] = useState<number>(-1);

        useEffect(() => {
            dispatch(GetEdmsAddress());
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

        useEffect(() => {
            getDocuManager();
        }, [selectedCompany, selectedGroup, selectedUser]);

        useEffect(() => {
            if (pjSelector.update_edms_user_menu) {
                dispatch(GetEdmsAddress());
                if (menuState == 0) {
                    setTimeout(() => {
                        setIsLoading(false);
                        ModalInfo("메뉴 권한이 추가 되었습니다.");
                        setMenuState(-1);
                        setSelectedUser(-1);
                    }, 200);
                } else if (menuState == 1) {
                    setTimeout(() => {
                        setIsLoading(false);
                        ModalInfo("메뉴 권한이 삭제 되었습니다.");
                        setMenuState(-1);
                        setSelectedUser(-1);
                    }, 200);
                }
            }
        }, [pjSelector.update_edms_user_menu]);

        const onClose = () => {
            // 모달 닫는 함수
            props.onClose();
            setSelectedUser(-1);
        };

        const getDocuManager = () => {
            if (selectedGroup != -1)
                setUserList([
                    ...pjSelector.edms_user_list.filter(
                        (raw: any) => raw.group_id == selectedGroup
                    ),
                ]);
            else setSelectedUser(-1);
            if (selectedCompany != -1) {
                setGroupList([
                    ...pjSelector.edms_group_list.filter(
                        (raw: any) => raw.company_id == selectedCompany
                    ),
                ]);
            } else if (selectedUser != -1) {
            } else setSelectedGroup(-1);
        };

        const get_botton_type = (userId: number, num: number) => {
            if (userId != -1 && num == 0) {
                return <S.BtmAddBtn onClick={onClickUpdateMenu}>메뉴권한 추가</S.BtmAddBtn>;
            } else if (userId != -1 && num == 1) {
                return (
                    <S.BtmAddBtn $background="red" onClick={onClickUpdateMenu}>
                        메뉴권한 삭제
                    </S.BtmAddBtn>
                );
            } else {
                return null;
            }
        };

        const onClickUpdateMenu = () => {
            dispatch(UpdateMenu(selectedUser, menuName, menuState));
            setIsLoading(true);
        };

        useEffect(() => {
            if (selectedUser && selectedUser != -1) {
                let user = pjSelector.edms_user_list.find(
                    (raw: any) => raw.user_id == selectedUser
                );
                if (user) {
                    if (menuName == "문서관리") {
                        setMenuState(user.is_menu1);
                    } else if (menuName == "성과물") {
                        setMenuState(user.is_menu2);
                    } else {
                        setMenuState(-1);
                    }
                }
            } else {
                setMenuState(-1);
            }
        }, [menuName, selectedUser]);

        return (
            <>
                <S.Block open={props.visible} onClose={onClose}>
                    <S.Inner>
                        <LoadingIndicatorComponent open={isLoading} />
                        <S.ModalHeader>
                            <S.HeaderTitle>메뉴권한 수정</S.HeaderTitle>
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
                                                                selectedCompany != raw.id
                                                                    ? raw.id
                                                                    : -1
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
                                                                selectedGroup != raw.id
                                                                    ? raw.id
                                                                    : -1
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
                                    <S.BtmTitle>메뉴 목록</S.BtmTitle>
                                    <S.BtmAuthContent>
                                        {MENU_LIST.map((raw: any, idx: number) => {
                                            return (
                                                <S.MenuItem
                                                    key={raw + idx}
                                                    $selected={menuName == raw}
                                                    onClick={() => {
                                                        setMenuName(menuName != raw ? raw : "");
                                                    }}
                                                >
                                                    {raw}
                                                </S.MenuItem>
                                            );
                                        })}
                                    </S.BtmAuthContent>
                                </S.BtmAuth>
                                <S.Btm>
                                    {get_botton_type(selectedUser, menuState)}
                                    <S.BtmDelBtn onClick={onClose}>취소</S.BtmDelBtn>
                                </S.Btm>
                            </S.BtmDiv>
                        </S.ModalContentWrap>
                    </S.Inner>
                </S.Block>
            </>
        );
    };
