/******************************************************************************
 * appwrapper/index.tsx
 * hooks :
 * useLocations
 *
 ******************************************************************************/
// Library
import { useSelector, useDispatch } from "react-redux"; // redux
import { useState, useEffect } from "react"; // default hooks
//
// Module
import * as S from "./styled";
import { reducerState } from "../../common";
import {
    DeleteAddress,
    GetEdmsAddress,
    CreateEdmsUser,
    EditEdmsUser,
    GetProjectTypeList,
    GetEdmsAddressbook,
    GetEdmsMailAddress,
} from "../../common/action";
import { EdmsAddressModal } from "..";
//image
import Close from "@material-ui/icons/Close";
import EditIcon from "../../images/edms/icon_edit_green.svg";
import DelIcon from "../../images/edms/trash.svg";
import { ModalInfo, LoadingIndicatorComponent } from "components";

export type EdmsEmailGroupProps = {
    visible: boolean;
    onClose: () => void;
};

interface FinalEdmsEmailGroupProps extends EdmsEmailGroupProps {}

export const EdmsEmailGroupComp: React.FunctionComponent<FinalEdmsEmailGroupProps> = props => {
    const dispatch = useDispatch();
    const projSelector = useSelector((state: reducerState) => state.project);
    const userSelector = useSelector((state: reducerState) => state.user);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [userBtn, setUserBtn] = useState<boolean>(true);
    const [groupBtn, setGroupBtn] = useState<boolean>(true);
    const [tmManager, setTmManager] = useState<boolean>(true);
    const [addressVisibleModal, setAddressVisibleModal] = useState<boolean>(false);

    const [userList, setUserList] = useState<any[]>([]);
    const [groupList, setGroupList] = useState<any[]>([]);
    const [companyList, setCompanyList] = useState<any[]>([]);
    const [positionList, setPositionList] = useState<any[]>([]);
    const [filterGroupList, setFilterGroupList] = useState<any[]>([]);
    const [filterPositionList, setFilterPositionList] = useState<any[]>([]);

    const [isIdx, setIsIdx] = useState<number>();
    const [isEdit, setIsEdit] = useState<number>(-1);

    const [userInfo, setUserInfo] = useState<any>();
    const [userInfoNo, setUserInfoNo] = useState<number>(-1);

    const [userNo, setUserNo] = useState<number>(-1);
    const [userId, setUserId] = useState<string>("");
    const [userPw, setUSerPw] = useState<string>("");
    const [groupNoList, setGroupNoList] = useState<number[]>([]);
    const [groupId, setGroupId] = useState<number>(-1);
    const [userName, setUserName] = useState<string>("");
    const [userEmail, setUserEmail] = useState<string>("");
    const [companyId, setCompanyId] = useState<number>(userSelector.company);
    const [companyInfo, setCompanyInfo] = useState<any>();
    const [groupName, setGroupName] = useState<string>("");
    const [positionNo, setPositionNo] = useState<number>(0);
    const [positionName, setPositionName] = useState<string>("");
    const [userPhoneNumber, setUserPhoneNumber] = useState<string>("");
    const [projectTypeList, setProjectTypeList] = useState<any[]>([]);
    const [tmProjectNameList, setTmProjectNameList] = useState<string[]>([]);
    const [selectProjectNoList, setSelectProjectNoList] = useState<number[]>([]);
    const [groupMailList, setGroupMailList] = useState<any[]>([]);

    useEffect(() => {
        if (props.visible) {
            dispatch(GetProjectTypeList());
            dispatch(GetEdmsAddress(true, true));
            setCompanyId(userSelector.company);
        }
    }, [props.visible]);

    useEffect(() => {
        if (projSelector.edms_company_list && projSelector.edms_company_list.length > 0) {
            setCompanyInfo(projSelector.edms_company_list.find((raw: any) => raw.id == companyId));
        }
    }, [projSelector.edms_company_list]);

    useEffect(() => {
        if (projSelector.project_type_list && projSelector.project_type_list.length != 0) {
            setProjectTypeList(projSelector.project_type_list);
        }
    }, [projSelector.project_type_list]);

    // 직급 리스트
    useEffect(() => {
        if (projSelector.edms_position_list) {
            setPositionList(projSelector.edms_position_list);
        }
    }, [projSelector.edms_position_list]);

    // 그룹메일 리스트
    useEffect(() => {
        if (projSelector.group_mail_list) {
            setGroupMailList(projSelector.group_mail_list);
        }
    }, [projSelector.group_mail_list]);

    // 삭제 & 수정 후 GetEdmsAddress 제 호출
    useEffect(() => {
        if (
            projSelector.delete_address_data ||
            projSelector.create_edms_company ||
            projSelector.edit_edms_company ||
            projSelector.create_edms_group ||
            projSelector.edit_edms_group ||
            projSelector.create_edms_user ||
            projSelector.edit_edms_user
        )
            dispatch(GetEdmsAddress(true, true));
    }, [
        projSelector.delete_address_data,
        projSelector.create_edms_company,
        projSelector.edit_edms_company,
        projSelector.create_edms_group,
        projSelector.edit_edms_group,
        projSelector.create_edms_user,
        projSelector.edit_edms_user,
    ]);

    // 삭제 & 수정 후 positionList 필터 새로고침
    useEffect(() => {
        if (companyId != -1) {
            setGroupList(
                projSelector.edms_group_list.filter((raw: any) => raw.company_id == companyId)
            );
        }
    }, [projSelector.edms_group_list]);

    // 삭제 & 수정 후 userList 필터 새로고침
    useEffect(() => {
        if (companyId != -1) {
            setUserList(
                projSelector.edms_user_list.filter((raw: any) => raw.company_id == companyId)
            );
        }
    }, [projSelector.edms_user_list]);

    //회사 추가&삭제, 부서 추가&삭제
    useEffect(() => {
        if (isEdit == -1) setAddressVisibleModal(false);
        else setAddressVisibleModal(true);
    }, [isEdit]);

    useEffect(() => {
        if (projSelector.create_edms_user) {
            dispatch(GetEdmsMailAddress());
            setUserInfoNo(-1);
            setTimeout(() => {
                setIsLoading(false);
                ModalInfo("유저 등록이 완료되었습니다.");
            }, 2000);
        }
    }, [projSelector.create_edms_user]);

    useEffect(() => {
        if (projSelector.edit_edms_user) {
            dispatch(GetEdmsMailAddress());
            setTimeout(() => {
                setIsLoading(false);
                ModalInfo("유저 수정이 완료되었습니다.");
            }, 2000);
        }
    }, [projSelector.edit_edms_user]);

    useEffect(() => {
        let projectNameList: string[] = [];
        for (let i = 0; i < selectProjectNoList.length; i++) {
            let tmProject = projectTypeList.find(
                projectType => projectType.project_no == selectProjectNoList[i]
            );
            if (tmProject) projectNameList.push(tmProject.project_name);
        }
        setTmProjectNameList(projectNameList);
    }, [selectProjectNoList]);

    const onClose = () => {
        props.onClose();
        setCompanyId(-1);
        setGroupId(-1);
        setUserInfoNo(-1);
    };

    // 리스트 필터
    const filteredList = (company_id: number, type: string, group_id?: number) => {
        let filtered = [];
        if (type == "group") {
            filtered = projSelector.edms_user_list.filter(
                (raw: any) => raw.company_id == company_id && raw.group_id == group_id
            );
            setUserList(filtered);
            setGroupId(group_id == undefined ? -1 : group_id);
            setUserInfoNo(-1);
        }
    };

    const AddressPositionCreate = () => {
        setIsEdit(2);
    };

    const AddressPositionEdit = (idx: number) => {
        setIsEdit(3);
        setIsIdx(idx);
    };

    const onCloseAddress = () => {
        setAddressVisibleModal(false);
        setIsEdit(-1);
    };

    // 삭제
    const deleteRow = (id: number, type: string, name: string) => {
        let res = confirm(name + "을(를) 삭제하시겠습니까?");
        if (res) {
            dispatch(DeleteAddress(id, type));
            setUserInfoNo(-1);
            if (type == "comapy" && companyId == id) {
                dispatch(GetEdmsAddress(true, true));
                setGroupList([]);
                setUserList([]);
                setCompanyId(-1);
                setGroupId(-1);
                setUserInfoNo(-1);
            } else if (type == "group" && groupId == id) {
                dispatch(GetEdmsAddress(true, true));
                setUserList([]);
                setGroupId(-1);
                setUserInfoNo(-1);
            }
        }
    };

    // 리스트 생성
    const getLineRows = (raw: any, index: number, type: string) => {
        if (type == "group") {
            return (
                <>
                    <S.BodyDetail key={index}>
                        <S.TableCell $width={15}>{index + 1}</S.TableCell>

                        <S.TableCell
                            $width={55}
                            // onClick={() => filteredList(raw.company_id, type, raw.id)}
                        >
                            {raw.group_name}
                        </S.TableCell>

                        <S.TableCell $width={15}>
                            <S.EditButton onClick={() => AddressPositionEdit(index)}>
                                <S.EditImg src={EditIcon} />
                            </S.EditButton>
                        </S.TableCell>

                        <S.TableCell $width={15}>
                            <S.EditButton onClick={() => deleteRow(raw.id, type, raw.group_name)}>
                                <S.EditImg src={DelIcon} />
                            </S.EditButton>
                        </S.TableCell>
                    </S.BodyDetail>
                </>
            );
        } else if (type == "user") {
            return (
                <>
                    <S.BodyDetail>
                        <S.TableCell $cursor $width={75} onClick={() => getUserDetail("edit", raw)}>
                            {raw.username}
                        </S.TableCell>

                        {/* <S.TableCell $width={25}>
                            <S.EditButton onClick={() => getUserDetail("edit", raw)}>
                                <S.EditImg src={EditIcon} />
                            </S.EditButton>
                        </S.TableCell> */}

                        <S.TableCell $width={25}>
                            <S.EditButton
                                onClick={() => deleteRow(raw.user_id, type, raw.username)}
                            >
                                <S.EditImg src={DelIcon} />
                            </S.EditButton>
                        </S.TableCell>
                    </S.BodyDetail>
                </>
            );
        }
    };

    // 유저 상세정보 및 생성, 수정
    const getUserDetail = (type: string, raw?: any) => {
        let group: any;
        let position: any;
        let phoneNUmber: any;
        let tmProject: any;
        let group_mail: number[] = [];

        setUserId("");
        setUSerPw("");
        setGroupNoList([]);
        setUserName("");
        setUserEmail("");
        setGroupName("");
        setPositionNo(0);
        setPositionName("");
        setUserPhoneNumber("");

        // 유저 정보 확인
        if (type == "info" && raw != undefined) {
            setUserInfoNo(0);
            group = groupList.find(data => data.id == raw.group_id);
            if (raw.position_id != 0) {
                position = positionList.find(data => data.id == raw.position_id);
                if (position) setPositionName(position.position_name);
            }
            if (group) setGroupName(group.group_name);
            setUserInfo(raw);
            setTmManager(raw.is_tm);

            if (raw.tm_project_no_list.length != 0) {
                let projectsNames: string[] = [];
                for (let i = 0; i < raw.tm_project_no_list.length; i++) {
                    tmProject = projectTypeList.find(
                        projectType => projectType.project_no == raw.tm_project_no_list[i]
                    );
                    if (tmProject) {
                        projectsNames.push(tmProject.project_name);
                    }
                }
            } else {
            }
        }
        // 유저 추가
        else if (type == "create") {
            setUserInfoNo(1);
            group = groupList.filter(data => data.company_id == companyId);
            position = positionList.filter(data => data.company_id == companyId);

            setFilterGroupList([...group]);
            setFilterPositionList([...position]);
        }
        // 유저 수정
        else if (type == "edit" && raw != undefined) {
            setIsLoading(true);
            setUserInfoNo(2);

            let group_mail_list = groupMailList
                .filter(data => data.user_id == raw.user_id)
                .map(id => id.group_id);

            for (var mail of group_mail_list) {
                group_mail.push(parseInt(mail));
            }
            group = groupList.filter(data => data.company_id == raw.company_id);
            position = positionList.filter(data => data.company_id == companyId);
            phoneNUmber = raw.phone_number ? raw.phone_number : "";
            setFilterGroupList([...group]);
            setFilterPositionList([...position]);
            setGroupNoList(group_mail);
            setUserNo(raw.user_id);
            // setGroupNo(raw.group_id);
            setPositionNo(raw.position_id);
            setUserName(raw.username);
            setUserEmail(raw.email);
            setUserPhoneNumber(phoneNUmber);
            setTmManager(raw.is_tm);

            if (raw.tm_project_no_list.length != 0) {
                let projectNameList: string[] = [];
                for (let i = 0; i < raw.tm_project_no_list.length; i++) {
                    tmProject = projectTypeList.find(
                        projectType => projectType.project_no == raw.tm_project_no_list[i]
                    );
                    if (tmProject) projectNameList.push(tmProject.project_name);
                }
                setTmProjectNameList(projectNameList);
                setSelectProjectNoList(raw.tm_project_no_list);
            } else {
                setTmProjectNameList([]);
            }
            setTimeout(() => setIsLoading(false), 100);
        } else setUserInfoNo(-1);
    };

    const getUserLevel = (level: number) => {
        switch (level) {
            case 1:
                return "총관리자";
            case 2:
                return "회사 담당자";
            case 3:
                return "회사 구성원";
            default:
                return "권한이 존재하지 않습니다.";
        }
    };

    // 생성 및 수정 저장
    const onSave = (type: string) => {
        if (type == "create") {
            if (userId.length == 0) return ModalInfo("아이디를 입력해주세요.");
            if (userPw.length == 0) return ModalInfo("비밀번호를 입력해주세요.");
            if (userName.length == 0) return ModalInfo("이름을 입력해주세요.");
            if (positionNo == 0) return ModalInfo("직급을 선택해주세요.");
            if (userEmail.length == 0) return ModalInfo("이메일을 입력해주세요.");

            setIsLoading(true);
            dispatch(
                CreateEdmsUser(
                    userId,
                    userPw,
                    userName,
                    companyId,
                    1,
                    positionNo,
                    4,
                    userEmail,
                    tmManager,
                    userPhoneNumber,
                    true, // is_mail_user
                    groupNoList
                )
            );
        } else if (type == "edit") {
            setIsLoading(true);
            dispatch(
                EditEdmsUser(
                    userNo,
                    companyId,
                    1,
                    positionNo,
                    4,
                    tmManager,
                    userEmail,
                    userPhoneNumber,
                    selectProjectNoList,
                    true,
                    groupNoList,
                    userName
                )
            );
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

    const trProjectNoDelete = (idx: number) => {
        tmProjectNameList.splice(idx, 1);
        selectProjectNoList.splice(idx, 1);

        setTmProjectNameList([...tmProjectNameList]);
        setSelectProjectNoList([...selectProjectNoList]);
    };

    const onChangeGroupList = (event: any) => {
        const value = event.target.value;
        setGroupNoList(value);
    };

    const renderValueGroupList = (selected: any) => {
        let _filtered = filterGroupList.filter((raw, idx) => selected.indexOf(raw.id) != -1);
        return _filtered.map(raw => (raw.group_name ? raw.group_name : "")).join(", ");
    };

    return (
        <>
            <EdmsAddressModal
                visible={addressVisibleModal}
                onClose={onCloseAddress}
                isEdit={isEdit}
                idx={isIdx}
                companyId={companyId}
                projectTypeList={projectTypeList}
                selectProjectNoList={selectProjectNoList}
                setSelectProjectNoList={setSelectProjectNoList}
                isMailGroup
            />
            <S.Block open={props.visible ? true : false} onClose={props.onClose}>
                <S.Inner>
                    <LoadingIndicatorComponent open={isLoading} style={{ zIndex: 1301 }} />
                    <S.Title>
                        {companyInfo ? companyInfo.company_name + " " : ""}이메일 그룹 및 유저 관리
                    </S.Title>
                    <S.CloseBtn onClick={onClose}>
                        <Close style={{ fontSize: "1.6em" }} />
                    </S.CloseBtn>
                    <S.Content>
                        <S.DetailBlock>
                            <S.SubTitle>
                                <S.TableCell $width={15}>순서</S.TableCell>
                                <S.TableCell $width={55}>부서명</S.TableCell>
                                <S.TableCell $width={15}>수정</S.TableCell>
                                <S.TableCell $width={15}>삭제</S.TableCell>
                            </S.SubTitle>
                            <S.Seperator>
                                <hr />
                            </S.Seperator>
                            <S.InfoContainer>
                                {groupList.map((raw, idx) => getLineRows(raw, idx, "group"))}
                            </S.InfoContainer>
                            {groupBtn && (
                                <S.EndContainer>
                                    <S.Btn onClick={AddressPositionCreate}>추가하기</S.Btn>
                                </S.EndContainer>
                            )}
                        </S.DetailBlock>

                        <S.DetailBlockParent>
                            <S.DetailBlock $flex={0.7} $isMerge>
                                <S.SubTitle>
                                    <S.TableCell $width={75}>유저 선택</S.TableCell>
                                    {/* <S.TableCell $width={25}>수정</S.TableCell> */}
                                    <S.TableCell $width={25}>삭제</S.TableCell>
                                </S.SubTitle>
                                <S.UserSeperator>
                                    <hr />
                                </S.UserSeperator>
                                <S.InfoContainer>
                                    {userList.map((raw, idx) => getLineRows(raw, idx, "user"))}
                                </S.InfoContainer>
                                {userBtn && (
                                    <S.EndContainer>
                                        <S.Btn onClick={() => getUserDetail("create")}>
                                            추가하기
                                        </S.Btn>
                                    </S.EndContainer>
                                )}
                            </S.DetailBlock>
                            <S.DetailBlock $flex={1.5} $isMerge>
                                {(userInfoNo == 0 && (
                                    <>
                                        <S.SubTitle>
                                            <S.InformationTitle>이메일유저 정보</S.InformationTitle>
                                        </S.SubTitle>
                                        <S.Seperator>
                                            <hr />
                                        </S.Seperator>
                                        {userInfo != undefined && (
                                            <S.InfoContainer>
                                                <S.InputBox>
                                                    <S.InputTitle>이름</S.InputTitle>
                                                    <S.InputText>{userInfo.username}</S.InputText>
                                                </S.InputBox>
                                                <S.InputBox>
                                                    <S.InputTitle>부서</S.InputTitle>
                                                    <S.InputText>
                                                        {groupName === null ? "" : groupName}
                                                    </S.InputText>
                                                </S.InputBox>
                                                <S.InputBox>
                                                    <S.InputTitle>직급</S.InputTitle>
                                                    <S.InputText>
                                                        {positionName === null ? "" : positionName}
                                                    </S.InputText>
                                                </S.InputBox>
                                                <S.InputBox>
                                                    <S.InputTitle>이메일</S.InputTitle>
                                                    <S.InputText>
                                                        {userInfo.email === null
                                                            ? ""
                                                            : userInfo.email}
                                                    </S.InputText>
                                                </S.InputBox>
                                                <S.InputBox>
                                                    <S.InputTitle>전화번호</S.InputTitle>
                                                    <S.InputText>
                                                        {userInfo.phone_number === null
                                                            ? ""
                                                            : userInfo.phone_number}
                                                    </S.InputText>
                                                </S.InputBox>
                                            </S.InfoContainer>
                                        )}
                                    </>
                                )) ||
                                    (userInfoNo == 1 && (
                                        <>
                                            <S.SubTitle>
                                                <S.InformationTitle>
                                                    이메일유저 추가
                                                </S.InformationTitle>
                                            </S.SubTitle>
                                            <S.Seperator>
                                                <hr />
                                            </S.Seperator>
                                            <S.InfoContainer>
                                                <S.InputBox>
                                                    <S.InputTitle>아이디</S.InputTitle>
                                                    <S.Input
                                                        value={userId}
                                                        onChange={e => setUserId(e.target.value)}
                                                        placeholder={"로그인시 입력하는 아이디"}
                                                    ></S.Input>
                                                </S.InputBox>
                                                <S.InputBox>
                                                    <S.InputTitle>비밀먼호</S.InputTitle>
                                                    <S.Input
                                                        type="password"
                                                        value={userPw}
                                                        onChange={e => setUSerPw(e.target.value)}
                                                        placeholder={"로그인시 입력하는 비밀번호"}
                                                    ></S.Input>
                                                </S.InputBox>
                                                <S.InputBox>
                                                    <S.InputTitle>이름</S.InputTitle>
                                                    <S.Input
                                                        value={userName}
                                                        onChange={e => setUserName(e.target.value)}
                                                    ></S.Input>
                                                </S.InputBox>
                                                <S.InputBox>
                                                    <S.InputTitle>부서</S.InputTitle>
                                                    <S.InputSelect
                                                        style={{
                                                            paddingLeft: "1.5%",
                                                            fontSize: "1.1em",
                                                            fontWeight: 500,
                                                            color: "gray",
                                                        }}
                                                        disableUnderline
                                                        value={groupNoList}
                                                        multiple
                                                        onChange={e => onChangeGroupList(e)}
                                                        renderValue={renderValueGroupList}
                                                    >
                                                        {filterGroupList.map(
                                                            (raw: any, idx: number) => {
                                                                return (
                                                                    <S.InputSelectItem
                                                                        key={idx}
                                                                        value={raw.id}
                                                                    >
                                                                        {raw.group_name}
                                                                    </S.InputSelectItem>
                                                                );
                                                            }
                                                        )}
                                                    </S.InputSelect>
                                                </S.InputBox>
                                                <S.InputBox>
                                                    <S.InputTitle>직급</S.InputTitle>
                                                    <S.InputSelect
                                                        style={{
                                                            paddingLeft: "1.5%",
                                                            fontSize: "1.1em",
                                                            fontWeight: 500,
                                                            color: "gray",
                                                        }}
                                                        disableUnderline
                                                        value={positionNo}
                                                        onChange={(e: any) =>
                                                            setPositionNo(e.target.value)
                                                        }
                                                    >
                                                        {filterPositionList.map(
                                                            (raw: any, idx: number) => {
                                                                return (
                                                                    <S.InputSelectItem
                                                                        key={idx}
                                                                        value={raw.id}
                                                                    >
                                                                        {raw.position_name}
                                                                    </S.InputSelectItem>
                                                                );
                                                            }
                                                        )}
                                                    </S.InputSelect>
                                                </S.InputBox>
                                                <S.InputBox>
                                                    <S.InputTitle>이메일</S.InputTitle>
                                                    <S.Input
                                                        value={userEmail}
                                                        onChange={e => setUserEmail(e.target.value)}
                                                    ></S.Input>
                                                </S.InputBox>
                                                <S.InputBox>
                                                    <S.InputTitle>전화번호</S.InputTitle>
                                                    <S.Input
                                                        type="text"
                                                        maxLength={13}
                                                        value={userPhoneNumber}
                                                        onChange={e =>
                                                            setUserPhoneNumber(e.target.value)
                                                        }
                                                        onInput={autoHypenPhoneNumber}
                                                    ></S.Input>
                                                </S.InputBox>
                                            </S.InfoContainer>
                                            <S.EndContainer>
                                                <S.Btn onClick={() => onSave("create")}>저장</S.Btn>
                                            </S.EndContainer>
                                        </>
                                    )) ||
                                    (userInfoNo == 2 && (
                                        <>
                                            <S.SubTitle>
                                                <S.EditUserTitle>이메일유저 수정</S.EditUserTitle>
                                            </S.SubTitle>
                                            <S.Seperator>
                                                <hr />
                                            </S.Seperator>
                                            <S.InfoContainer>
                                                <S.InputBox>
                                                    <S.InputTitle>이름</S.InputTitle>
                                                    <S.Input
                                                        value={userName}
                                                        onChange={e => setUserName(e.target.value)}
                                                    ></S.Input>
                                                </S.InputBox>
                                                <S.InputBox>
                                                    <S.InputTitle>부서</S.InputTitle>
                                                    <S.InputSelect
                                                        style={{
                                                            paddingLeft: "1.5%",
                                                            fontSize: "1.1em",
                                                            fontWeight: 500,
                                                            color: "gray",
                                                        }}
                                                        disableUnderline
                                                        value={groupNoList}
                                                        multiple
                                                        onChange={e => onChangeGroupList(e)}
                                                        renderValue={renderValueGroupList}
                                                    >
                                                        {filterGroupList.map(
                                                            (raw: any, idx: number) => {
                                                                return (
                                                                    <S.InputSelectItem
                                                                        key={idx}
                                                                        value={raw.id}
                                                                    >
                                                                        {raw.group_name}
                                                                    </S.InputSelectItem>
                                                                );
                                                            }
                                                        )}
                                                    </S.InputSelect>
                                                </S.InputBox>
                                                <S.InputBox>
                                                    <S.InputTitle>직급</S.InputTitle>
                                                    <S.InputSelect
                                                        style={{
                                                            paddingLeft: "1.5%",
                                                            fontSize: "1.1em",
                                                            fontWeight: 500,
                                                            color: "gray",
                                                        }}
                                                        disableUnderline
                                                        value={positionNo}
                                                        onChange={(e: any) =>
                                                            setPositionNo(e.target.value)
                                                        }
                                                    >
                                                        {filterPositionList.map(
                                                            (raw: any, idx: number) => {
                                                                return (
                                                                    <S.InputSelectItem
                                                                        key={idx}
                                                                        value={raw.id}
                                                                    >
                                                                        {raw.position_name}
                                                                    </S.InputSelectItem>
                                                                );
                                                            }
                                                        )}
                                                    </S.InputSelect>
                                                </S.InputBox>
                                                <S.InputBox>
                                                    <S.InputTitle>이메일</S.InputTitle>
                                                    <S.Input
                                                        value={userEmail}
                                                        onChange={e => setUserEmail(e.target.value)}
                                                    ></S.Input>
                                                </S.InputBox>
                                                <S.InputBox>
                                                    <S.InputTitle>전화번호</S.InputTitle>
                                                    <S.Input
                                                        type="text"
                                                        maxLength={13}
                                                        value={userPhoneNumber}
                                                        onChange={e =>
                                                            setUserPhoneNumber(e.target.value)
                                                        }
                                                        onInput={autoHypenPhoneNumber}
                                                    ></S.Input>
                                                </S.InputBox>
                                            </S.InfoContainer>
                                            <S.EndContainer>
                                                <S.Btn onClick={() => onSave("edit")}>저장</S.Btn>
                                            </S.EndContainer>
                                        </>
                                    ))}
                            </S.DetailBlock>
                        </S.DetailBlockParent>
                    </S.Content>
                </S.Inner>
            </S.Block>
        </>
    );
};
