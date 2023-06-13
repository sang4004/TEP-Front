/******************************************************************************
 * Description
 * 해당 페이지는 유저의 정보를 보며 수정하는 페이지입니다.
 * 또한 관리자는 해당페이지에서 다른 유저들을 수정 할 수 있습니다.
 * hooks :
 * useLocations
 * components :
 *
 ******************************************************************************/
//Library
import React, { useState, useEffect, useContext, useRef, ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { ModalInfo, LoadingIndicatorComponent, ToastComponent } from "components";
import { useLocations } from "hooks";
//
//Module
import * as S from "../styled/userinfo.styled";
import { reducerState } from "../common";
import {
    UploadProfileImg,
    UploadSignImg,
    GetOrganization,
    UpdateUserData,
    ApproveUser,
    RemoveUser,
    GetUserInfo,
    PasswordReset,
    GetPositionList,
    RevertUser,
    RemoveSignImg,
    GetEdmsUserInfo,
    UpdateEdmsUserData,
    GetEdmsOranization,
} from "../common/action";
import LockIconSvg from "../images/fontawsomeicon/eye-slash-regular.svg";
import LockOpenIconSvg from "../images/fontawsomeicon/eye-regular.svg";
import { ADMIN_LEVEL_DESC } from "./common/userInfoPage/constant";
//

const UserInfoPage = (props: any, sprops: any) => {
    const dispatch = useDispatch();
    const userSelector = useSelector((state: reducerState) => state.user);
    const [userImg, setUserImg] = useState<string>("");
    const [signImg, setSignImg] = useState<string>("");
    const [usersignImg, setUserSignImg] = useState<string>("");
    const [fileInput, setFileInput] = useState<HTMLInputElement | null>(null);
    const [usersignFileInput, setUserSignFileInput] = useState<HTMLInputElement | null>(null);
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [userId, setUserId] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [fax, setFax] = useState<string>("");
    const [groupId, setGroupId] = useState<number>(-1);
    const [posId, setPositionId] = useState<number>(-1);
    const [approved, setApproved] = useState<boolean>(false);
    const [isDocManager, setIsDocManager] = useState<boolean>(false);
    const [password, setPassword] = useState<string>("");
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
    const [visibleToast, setVisibleToast] = useState<boolean>(false);
    const [selectedTab, setSelectedTab] = useState<number>(0);
    const [adminLevel, setAdminLevel] = useState<number>(0);
    // EDMS 회사 담당자일 경우 접수및배포 or 생성시 기본 기한일자 설정
    const [expiredDefaultDay, setExpiredDefaultDay] = useState<number>(0);

    const [posList, setPosList] = useState<object[]>([]);
    const [groupList, setGroupList] = useState<object[]>([]);
    const [edmsPositionList, setEdmsPositionList] = useState<any[]>([]);

    const [is_ceo, setIsCEO] = useState<number>(-1);
    const [is_sub, setIsSub] = useState<number>(0);
    const [is_del, setIsDel] = useState<number>(0);
    const [is_user, setIsUser] = useState<boolean>(false);
    const [is_admin, setIsAdmin] = useState<boolean>(false);
    const [edms_use, setIsEdmsUse] = useState<boolean>();
    const [use_sign, setUseSign] = useState<boolean>(false);
    const [tebType, setTebType] = useState<boolean>(false);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { back } = useLocations();
    const { user_id } = useParams<{ user_id?: string }>();

    useEffect(() => {
        dispatch(GetOrganization());
        dispatch(GetPositionList());
    }, []);

    useEffect(() => {
        if (user_id) {
            if (user_id != "0") {
                dispatch(GetUserInfo(user_id));
            } else {
                setSelectedTab(1);
            }
            if (parseInt(user_id) == userSelector.id) {
                setTebType(true);
            }
        } else {
            back();
        }
    }, [user_id]);

    useEffect(() => {
        if (userSelector.edms_user_id) {
            dispatch(GetEdmsUserInfo(userSelector.edms_user_id));
            dispatch(GetEdmsOranization());
        }
    }, [userSelector.edms_user_id]);

    useEffect(() => {
        if (userSelector.edms_org_list && userSelector.edms_org_list.length > 0) {
            let same_company_info = userSelector.edms_org_list.find(
                (raw: any) => raw.company.id == userSelector.company
            );
            if (same_company_info) {
                setEdmsPositionList(same_company_info.position);
            }
        }
    }, [userSelector.edms_org_list]);

    useEffect(() => {
        getInfo(selectedTab);
    }, [userSelector.user_info, userSelector.org_list, userSelector.edms_user_info]);

    useEffect(() => {
        if (userSelector.upload_profile_img) {
            setUserImg(userSelector.upload_profile_img);
        }
    }, [userSelector.upload_profile_img]);

    useEffect(() => {
        if (userSelector.upload_signature_img) {
            setSignImg(userSelector.upload_signature_img);
        }
    }, [userSelector.upload_signature_img]);

    useEffect(() => {
        if (userSelector.upload_sign_img) {
            setUserSignImg(userSelector.upload_sign_img);
        }
    }, [userSelector.upload_sign_img]);

    useEffect(() => {
        if (userSelector.remove_fin) {
            setTimeout(() => {
                ModalInfo("삭제 완료.");
                back();
            }, 500);
        }
    }, [userSelector.remove_fin]);
    const getInfo = (tab: number) => {
        const userInfo = userSelector.user_info;
        const edms_user = userSelector.edms_user_info;
        if (tab == 0 && userInfo && Object.keys(userInfo).length > 0) {
            setUserImg(userInfo.profile_img);
            setSignImg(userInfo.signature_img);
            setUserSignImg(userInfo.sign_img);
            setUsername(userInfo.username);
            setEmail(userInfo.email);
            setPhone(userInfo.phone_number);
            setFax(userInfo.fax_number);
            setApproved(userInfo.approved);
            setPassword(userInfo.password);
            setUserId(userInfo.userid);
            setIsDocManager(userInfo.doc_mng);
            setIsSub(userInfo.sub_field);
            setIsEdmsUse(userInfo.edms_use ? true : false);
            setIsDel(userInfo.is_delete);
            setAdminLevel(userInfo.admin_level);
            let comId = 0;
            if (userSelector.org_list) {
                let targetGroupId: number[] = [];
                userSelector.org_list.map((_org: any) => {
                    if (_org.id == userInfo.group_id) {
                        if (userInfo.position == "대표이사") {
                            setIsCEO(1);
                        } else {
                            setIsCEO(0);
                        }
                        comId = parseInt(_org.group_id);
                        targetGroupId.push(comId);
                        setGroupId(_org.id);
                    }
                });
                setGroupList([
                    ...userSelector.org_list.filter(
                        (obj: any) => targetGroupId.indexOf(obj.group_id) != -1
                    ),
                ]);
            }
            // 포지션 리스트 데이터 삽입
            if (userSelector.position_list) {
                for (var position of userSelector.position_list) {
                    if (position.id == userInfo.position_id) {
                        setPositionId(position.id);
                        setPosList([...userSelector.position_list]);
                    }
                }
            }
            // 총관리자 인지 체크
            if (userSelector.admin_level == 1) {
                setIsAdmin(true);
            } else {
                setIsAdmin(false);
            }
            // 관리자 인지 체크

            // 직인 및 싸인 이미지를 사용하는 유저인지 체크
            if ((comId != 1 && userInfo.sub_field == 1) || userInfo.use_sign == 1) {
                setUseSign(true);
            } else {
                setUseSign(false);
            }
            // 자기자신 인지 체크
            if (userSelector.id == user_id) {
                setIsUser(true);
            } else {
                setIsUser(false);
            }
        } else if (tab == 1 && edms_user && Object.keys(edms_user).length > 0) {
            setUserImg(edms_user.profile_img);
            setUsername(edms_user.username);
            setEmail(edms_user.email);
            setPhone(edms_user.phone_number);
            setPassword(edms_user.password);
            setUserId(edms_user.userid);
            setPositionId(edms_user.position_id);
            if (userSelector.org_list) {
                let targetGroupId: number[] = [];
                userSelector.org_list.map((org: any) => {
                    if (org.id == edms_user.group_id) {
                        if (edms_user.position == "대표이사") {
                            setIsCEO(1);
                        } else {
                            setIsCEO(0);
                        }
                        setGroupId(org.id);
                        targetGroupId.push(parseInt(org.group_id));
                    }
                });
                setGroupList([
                    ...userSelector.org_list.filter(
                        (obj: any) => targetGroupId.indexOf(obj.group_id) != -1
                    ),
                ]);
            }
        }
    };

    const handleDropdown = (e: ChangeEvent<{ name?: string; value: any }>, type: number) => {
        if (type == 0) {
            // group id
            setGroupId(e.target.value);
        } else if (type == 1) {
            // 직급 설정
            setPositionId(e.target.value);
        } else if (type == 2) {
            // 관리레벨 설정
            setAdminLevel(e.target.value);
        }
    };

    const handleUploadClick = (event: any) => {
        var file = event.target.files[0];
        if (file) dispatch(UploadProfileImg(file));
    };

    const handleUserSignUploadClick = (event: any) => {
        var file = event.target.files[0];
        if (file) dispatch(UploadSignImg(file));
    };

    const onClickUploadProfile = (type: string) => {
        if (type == "profile" && fileInput) fileInput.click();
        // else if (type == "sign" && signFileInput) signFileInput.click();
        else if (type == "usersign" && usersignFileInput) usersignFileInput.click();
    };

    const onClickDeleteSignFile = () => {
        dispatch(RemoveSignImg(user_id));
    };

    const onClickConfirm = async () => {
        if (password.length > 3) {
            setIsLoading(true);
            if (selectedTab == 0) {
                if (userSelector.user_info.edms_use == undefined && !edms_use) {
                    setIsEdmsUse(undefined);
                }
                await dispatch(
                    UpdateUserData(
                        parseInt(user_id ? user_id : ""),
                        username,
                        email,
                        groupId,
                        posId,
                        userImg,
                        signImg,
                        usersignImg,
                        phone,
                        fax,
                        password,
                        isDocManager,
                        userId,
                        adminLevel,
                        is_sub,
                        edms_use
                    )
                );
                await dispatch(GetUserInfo(user_id));
            } else {
                //기한일자
                if (expiredDefaultDay > 0)
                    window.localStorage.setItem("expiredDefaultDay", expiredDefaultDay.toString());
                //
                await dispatch(
                    UpdateEdmsUserData(
                        userSelector.edms_user_id,
                        username,
                        email,
                        posId,
                        userImg,
                        password,
                        userId,
                        phone
                    )
                );
                await dispatch(GetEdmsUserInfo(userSelector.edms_user_id));
            }

            setTimeout(() => {
                setIsLoading(false);
            }, 2000);
        } else {
            setVisibleToast(true);
            setTimeout(() => {
                setVisibleToast(false);
            }, 3500);
        }
    };

    const onClickCancel = () => {
        back();
    };

    const onClickRemove = async () => {
        if (user_id) {
            let res = confirm("유저를 삭제하시겠습니까?");
            if (res) {
                await dispatch(RemoveUser(parseInt(user_id)));
                await dispatch(GetUserInfo(user_id));
            }
        }
    };

    const onClickRevert = async () => {
        if (user_id) {
            let res = confirm("유저 탈퇴를 취소하시겠습니까?");
            if (res) {
                await dispatch(RevertUser(parseInt(user_id)));
                await dispatch(GetUserInfo(user_id));
            }
        }
    };

    const onClickApprove = async () => {
        if (user_id) {
            await dispatch(ApproveUser(parseInt(user_id)));
            await dispatch(GetUserInfo(user_id));
        }
    };

    const ResetPassword = async () => {
        if (user_id && confirm("1234로 비밀번호가 초기화됩니다.")) {
            await dispatch(PasswordReset(user_id));
            await dispatch(GetUserInfo(user_id));
        }
    };

    const handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
        // setIsDocManager(event.target.checked);
        // console.log(is_admin, event.target.checked)
        if (is_admin) setIsSub(event.target.checked ? 1 : 0);
    };

    const handleChangeTab = async (event: any, newVal: number) => {
        if (newVal != undefined) {
            setSelectedTab(newVal);
            setUserImg("");
            setSignImg("");
            setUserSignImg("");
            setUsername("");
            setEmail("");
            setPhone("");
            setFax("");
            setPositionId(-1);
            setApproved(false);
            setPassword("");
            setPasswordVisible(false);
            setUserId("");
            setIsDocManager(false);
            getInfo(newVal);
        }
    };

    // 자동 하이픈
    const autoHypenPhoneNumber = (e: any) => {
        if (e.target.value) {
            let phone = e.target.value.replace(/[^0-9]/g, "");
            var tmp = "";
            if (phone.length < 4) {
                e.target.value = phone;
            } else if (phone.length < 7) {
                tmp += phone.substr(0, 3);
                tmp += "-";
                tmp += phone.substr(3);
                e.target.value = tmp;
            } else if (phone.length < 11) {
                tmp += phone.substr(0, 3);
                tmp += "-";
                tmp += phone.substr(3, 3);
                tmp += "-";
                tmp += phone.substr(6);
                e.target.value = tmp;
            } else {
                tmp += phone.substr(0, 3);
                tmp += "-";
                tmp += phone.substr(3, 4);
                tmp += "-";
                tmp += phone.substr(7);
                e.target.value = tmp;
            }
        }
    };

    return (
        <SignedEditPageContainer className="main-page__container">
            <LoadingIndicatorComponent open={isLoading} />
            <ToastComponent
                text="비밀번호는 3자리 이상이여야 합니다. 다시 작성해주세요."
                close={() => setVisibleToast(false)}
                visible={visibleToast}
                type={"warning"}
                style={{ position: "absolute", right: 100, bottom: 90, alignItems: "flex-end" }}
            />
            <S.Block>
                <S.TabDiv>
                    <S.TabsBlock
                        value={selectedTab}
                        onChange={handleChangeTab}
                        TabIndicatorProps={{ style: { display: "none" } }}
                    >
                        <S.TabBlock disabled={user_id == "0"} value={0} label="문서수발신시스템" />
                        {tebType ? <S.TabBlock value={1} label="EDMS" /> : <></>}
                    </S.TabsBlock>
                </S.TabDiv>
                {selectedTab == 0 ? (
                    <S.Wrap>
                        <S.Header>회원정보</S.Header>
                        <S.ProfileTitleBlock>
                            <S.ProfileDiv>프로필 사진</S.ProfileDiv>
                            {/* <S.ProfileDiv>개인 서명 파일</S.ProfileDiv> */}
                            {(is_ceo == 1 || use_sign) && (
                                <S.ProfileDiv>결제 직인 파일</S.ProfileDiv>
                            )}
                        </S.ProfileTitleBlock>
                        <S.ProfileBlock>
                            <S.ProfileDiv>
                                <S.ProfileImg src={userImg} />
                                <input
                                    accept="image/*"
                                    id="contained-button-file"
                                    multiple
                                    type="file"
                                    style={{ display: "none" }}
                                    onChange={handleUploadClick}
                                    ref={ref => setFileInput(ref)}
                                />
                                <S.ProfileBtn onClick={() => onClickUploadProfile("profile")}>
                                    사진 선택하기
                                </S.ProfileBtn>
                            </S.ProfileDiv>
                            {(is_ceo == 1 || use_sign) && (
                                <S.ProfileDiv>
                                    {usersignImg && (
                                        <S.ProfileImg
                                            style={{ borderRadius: 0 }}
                                            src={usersignImg}
                                        />
                                    )}
                                    <input
                                        accept="image/*"
                                        id="contained-button-file"
                                        multiple
                                        type="file"
                                        style={{ display: "none" }}
                                        onChange={handleUserSignUploadClick}
                                        ref={ref => setUserSignFileInput(ref)}
                                    />
                                    {is_user && (
                                        <S.ProfileBtn
                                            onClick={() => onClickUploadProfile("usersign")}
                                        >
                                            직인 파일 업로드
                                        </S.ProfileBtn>
                                    )}
                                    {is_user && (
                                        <S.ProfileBtn onClick={onClickDeleteSignFile}>
                                            삭제
                                        </S.ProfileBtn>
                                    )}
                                </S.ProfileDiv>
                            )}
                        </S.ProfileBlock>
                        <S.InfoDiv>
                            <S.InfoLabel>아이디</S.InfoLabel>
                            <S.InfoText
                                onChange={e => setUserId(e.target.value)}
                                value={userId}
                                readOnly
                            />
                        </S.InfoDiv>
                        <S.InfoDiv>
                            <S.InfoLabel>비밀번호</S.InfoLabel>
                            <S.InfoText
                                onChange={e => setPassword(e.target.value)}
                                readOnly={!is_user}
                                value={password}
                                type={passwordVisible ? "text" : "password"}
                                style={{ flex: "5.7" }}
                            />
                            {is_user && (
                                <S.PasswordLockBtn
                                    onClick={() => setPasswordVisible(!passwordVisible)}
                                >
                                    <S.PasswordLockImg
                                        src={passwordVisible ? LockIconSvg : LockOpenIconSvg}
                                    />
                                </S.PasswordLockBtn>
                            )}
                            {!is_user && (
                                <S.PasswordResetBtn onClick={ResetPassword}>
                                    초기화
                                </S.PasswordResetBtn>
                            )}
                        </S.InfoDiv>
                        <S.InfoDiv>
                            <S.InfoLabel>이름</S.InfoLabel>
                            <S.InfoText
                                onChange={e => setUsername(e.target.value)}
                                value={username}
                            ></S.InfoText>
                        </S.InfoDiv>
                        <S.InfoDiv>
                            <S.InfoLabel>이메일</S.InfoLabel>
                            <S.InfoText
                                onChange={e => setEmail(e.target.value)}
                                value={email}
                            ></S.InfoText>
                        </S.InfoDiv>
                        <S.InfoDiv>
                            <S.InfoLabel>전화번호</S.InfoLabel>
                            <S.InfoText
                                onChange={e => setPhone(e.target.value)}
                                value={phone}
                            ></S.InfoText>
                        </S.InfoDiv>
                        <S.InfoDiv>
                            <S.InfoLabel>팩스번호</S.InfoLabel>
                            <S.InfoText
                                onChange={e => setFax(e.target.value)}
                                value={fax}
                            ></S.InfoText>
                        </S.InfoDiv>
                        <S.InfoDiv>
                            <S.InfoLabel>직급</S.InfoLabel>
                            <S.InfoSelect
                                disableUnderline
                                value={posId}
                                onChange={e => handleDropdown(e, 1)}
                            >
                                <S.InfoOption value={-1}>선택해주세요..</S.InfoOption>
                                {userSelector.position_list &&
                                    userSelector.position_list.length > 0 &&
                                    posList.map((raw: any, idx: number) => (
                                        <S.InfoOption key={idx} value={raw.id}>
                                            {raw.name}
                                        </S.InfoOption>
                                    ))}
                            </S.InfoSelect>
                        </S.InfoDiv>
                        <S.InfoDiv>
                            <S.InfoLabel $color="#ED6161">관리레벨</S.InfoLabel>
                            <S.InfoSelect
                                disableUnderline
                                value={adminLevel}
                                onChange={e => handleDropdown(e, 2)}
                                disabled={!is_admin}
                            >
                                <S.InfoOption value={-1}>선택해주세요..</S.InfoOption>
                                {Object.values(ADMIN_LEVEL_DESC).map((val, idx) => (
                                    <S.InfoOption key={idx} value={idx + 1}>
                                        {val}
                                    </S.InfoOption>
                                ))}
                            </S.InfoSelect>
                        </S.InfoDiv>
                        <S.InfoDiv>
                            <S.InfoLabel>소속 / 부서</S.InfoLabel>
                            <S.InfoSelect
                                disableUnderline
                                value={groupId}
                                onChange={e => handleDropdown(e, 0)}
                            >
                                <S.InfoOption value={-1}>선택해주세요..</S.InfoOption>
                                {userSelector.org_list &&
                                    userSelector.org_list.length > 0 &&
                                    groupList.map((raw: any, idx: number) => (
                                        <S.InfoOption key={idx} value={raw.id}>
                                            {raw.company + "/" + raw.name}
                                        </S.InfoOption>
                                    ))}
                            </S.InfoSelect>
                        </S.InfoDiv>
                        <S.InfoDiv>
                            <S.InfoLabel $small={true}>
                                현장대리인 / 책임건설사업관리기술자
                            </S.InfoLabel>
                            <S.CheckboxBlock
                                checked={is_sub != 0}
                                disabled={!is_admin}
                                color="primary"
                                onChange={handleChangeCheckbox}
                            />
                        </S.InfoDiv>
                        <S.InfoDiv>
                            <S.InfoLabel $small={true}>EDMS 사용자 여부</S.InfoLabel>
                            <S.CheckboxBlock
                                disabled={!is_admin}
                                checked={edms_use != undefined ? edms_use : false}
                                onChange={e => {
                                    setIsEdmsUse(!edms_use);
                                }}
                                color="primary"
                            />
                        </S.InfoDiv>
                        <S.BtnDiv>
                            <S.Btn $bgColor="red" onClick={onClickConfirm}>
                                정보 수정하기
                            </S.Btn>
                            {(userSelector.admin_level == 1 || userSelector.admin_level == 2) &&
                            !approved ? (
                                <S.Btn $bgColor="blue" onClick={onClickApprove}>
                                    가입 승인하기
                                </S.Btn>
                            ) : null}
                            {userSelector.admin_level == 1 && is_del == 0 ? (
                                <S.Btn $bgColor="blue" onClick={onClickRemove}>
                                    회원 삭제하기
                                </S.Btn>
                            ) : null}
                            {(userSelector.admin_level == 1 || userSelector.admin_level == 2) &&
                            is_del == 1 ? (
                                <S.Btn $bgColor="blue" onClick={onClickRevert}>
                                    회원 탈퇴 취소하기
                                </S.Btn>
                            ) : null}
                            <S.Btn $bgColor="gray" onClick={onClickCancel}>
                                나가기
                            </S.Btn>
                        </S.BtnDiv>
                    </S.Wrap>
                ) : (
                    <S.Wrap>
                        <S.Header>회원정보</S.Header>
                        <S.ProfileTitleBlock>
                            <S.ProfileDiv>프로필 사진</S.ProfileDiv>
                            {(is_ceo == 1 || use_sign) && (
                                <S.ProfileDiv>결제 직인 파일</S.ProfileDiv>
                            )}
                        </S.ProfileTitleBlock>
                        <S.ProfileBlock>
                            <S.ProfileDiv>
                                <S.ProfileImg src={userImg} />
                                <input
                                    accept="image/*"
                                    id="contained-button-file"
                                    multiple
                                    type="file"
                                    style={{ display: "none" }}
                                    onChange={handleUploadClick}
                                    ref={ref => setFileInput(ref)}
                                />
                                <S.ProfileBtn onClick={() => onClickUploadProfile("profile")}>
                                    사진 선택하기
                                </S.ProfileBtn>
                            </S.ProfileDiv>
                            {(is_ceo == 1 || use_sign) && (
                                <S.ProfileDiv>
                                    {usersignImg && (
                                        <S.ProfileImg
                                            style={{ borderRadius: 0 }}
                                            src={usersignImg}
                                        />
                                    )}
                                    <input
                                        accept="image/*"
                                        id="contained-button-file"
                                        multiple
                                        type="file"
                                        style={{ display: "none" }}
                                        onChange={handleUserSignUploadClick}
                                        ref={ref => setUserSignFileInput(ref)}
                                    />
                                    {is_user && (
                                        <S.ProfileBtn
                                            onClick={() => onClickUploadProfile("usersign")}
                                        >
                                            직인 파일 업로드
                                        </S.ProfileBtn>
                                    )}
                                    {is_user && (
                                        <S.ProfileBtn onClick={onClickDeleteSignFile}>
                                            삭제
                                        </S.ProfileBtn>
                                    )}
                                </S.ProfileDiv>
                            )}
                        </S.ProfileBlock>
                        <S.InfoDiv>
                            <S.InfoLabel>아이디</S.InfoLabel>
                            <S.InfoText
                                onChange={e => setUserId(e.target.value)}
                                value={userId}
                                readOnly
                            />
                        </S.InfoDiv>
                        <S.InfoDiv>
                            <S.InfoLabel>비밀번호</S.InfoLabel>
                            <S.InfoText
                                onChange={e => setPassword(e.target.value)}
                                readOnly={!is_user}
                                value={password}
                                type={passwordVisible ? "text" : "password"}
                                style={{ flex: "5.7" }}
                            />
                            {is_user && (
                                <S.PasswordLockBtn
                                    onClick={() => setPasswordVisible(!passwordVisible)}
                                >
                                    <S.PasswordLockImg
                                        src={passwordVisible ? LockIconSvg : LockOpenIconSvg}
                                    />
                                </S.PasswordLockBtn>
                            )}
                            {!is_user && (
                                <S.PasswordResetBtn onClick={ResetPassword}>
                                    초기화
                                </S.PasswordResetBtn>
                            )}
                        </S.InfoDiv>
                        <S.InfoDiv>
                            <S.InfoLabel>이름</S.InfoLabel>
                            <S.InfoText
                                onChange={e => setUsername(e.target.value)}
                                value={username}
                            ></S.InfoText>
                        </S.InfoDiv>
                        <S.InfoDiv>
                            <S.InfoLabel>이메일</S.InfoLabel>
                            <S.InfoText
                                onChange={e => setEmail(e.target.value)}
                                value={email}
                            ></S.InfoText>
                        </S.InfoDiv>
                        <S.InfoDiv>
                            <S.InfoLabel>전화번호</S.InfoLabel>
                            <S.InfoText
                                type="text"
                                maxLength={13}
                                onChange={e => setPhone(e.target.value)}
                                value={phone}
                                onInput={autoHypenPhoneNumber}
                            ></S.InfoText>
                        </S.InfoDiv>
                        <S.InfoDiv>
                            <S.InfoLabel>직급</S.InfoLabel>
                            <S.InfoSelect
                                disableUnderline
                                value={posId}
                                onChange={e => handleDropdown(e, 1)}
                            >
                                <S.InfoOption value={-1}>선택해주세요..</S.InfoOption>
                                {edmsPositionList.map((raw: any, idx: number) => {
                                    return (
                                        <S.InfoOption key={idx} value={raw.id}>
                                            {raw.position_name}
                                        </S.InfoOption>
                                    );
                                })}
                            </S.InfoSelect>
                        </S.InfoDiv>
                        {userSelector.edms_level < 3 && (
                            <S.InfoDiv>
                                <S.InfoLabel>기본 기한일자</S.InfoLabel>
                                <S.InfoText
                                    type="number"
                                    maxLength={4}
                                    onChange={e => setExpiredDefaultDay(parseInt(e.target.value))}
                                    value={expiredDefaultDay}
                                    min={0}
                                ></S.InfoText>
                            </S.InfoDiv>
                        )}
                        <S.BtnDiv>
                            <S.Btn $bgColor="red" onClick={onClickConfirm}>
                                정보 수정하기
                            </S.Btn>
                            {(userSelector.admin_level == 1 || userSelector.admin_level == 2) &&
                            !approved ? (
                                <S.Btn $bgColor="blue" onClick={onClickApprove}>
                                    가입 승인하기
                                </S.Btn>
                            ) : null}
                            {userSelector.admin_level == 1 && is_del == 0 ? (
                                <S.Btn $bgColor="blue" onClick={onClickRemove}>
                                    회원 삭제하기
                                </S.Btn>
                            ) : null}
                            {(userSelector.admin_level == 1 || userSelector.admin_level == 2) &&
                            is_del == 1 ? (
                                <S.Btn $bgColor="blue" onClick={onClickRevert}>
                                    회원 탈퇴 취소하기
                                </S.Btn>
                            ) : null}
                            <S.Btn $bgColor="gray" onClick={onClickCancel}>
                                나가기
                            </S.Btn>
                        </S.BtnDiv>
                    </S.Wrap>
                )}
            </S.Block>
        </SignedEditPageContainer>
    );
};

const SignedEditPageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
`;

export default UserInfoPage;
