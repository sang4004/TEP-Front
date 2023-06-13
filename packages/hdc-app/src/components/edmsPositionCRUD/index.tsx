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
    ApproveEdmsUser,
    GetProjectTypeList,
} from "../../common/action";
import { EdmsAddressModal, EdmsUserApproveModal } from "../../components";
//image
import Close from "@material-ui/icons/Close";
import EditIcon from "../../images/edms/icon_edit_green.svg";
import DelIcon from "../../images/edms/trash.svg";
import { ModalInfo, LoadingIndicatorComponent } from "components";

export type EdmsPositionManageProps = {
    style?: object;
    children?: React.ReactNode;
    visible: boolean;
    onClose: () => void;
    onComplete: (list: object[], new_list: object[]) => void;
};

interface FinalEdmsPositionManageProps extends EdmsPositionManageProps {}

export const EdmsPositionManageComp: React.FunctionComponent<
    FinalEdmsPositionManageProps
> = props => {
    const dispatch = useDispatch();
    const projSelector = useSelector((state: reducerState) => state.project);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [userBtn, setUserBtn] = useState<boolean>(false);
    const [groupBtn, setGroupBtn] = useState<boolean>(false);
    const [tmManager, setTmManager] = useState<boolean>(false);
    const [addressVisibleModal, setAddressVisibleModal] = useState<boolean>(false);
    const [userApproveModalVisible, setUserApproveModalVisible] = useState<boolean>(false);

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
    const [groupNo, setGroupNo] = useState<number>(0);
    const [groupId, setGroupId] = useState<number>(-1);
    const [selectedUserInfo, setSelectedUserInfo] = useState<any>();
    const [userName, setUserName] = useState<string>("");
    const [userEmail, setUserEmail] = useState<string>("");
    const [companyId, setCompanyId] = useState<number>(-1);
    const [groupName, setGroupName] = useState<string>("");
    const [positionNo, setPositionNo] = useState<number>(0);
    const [authorityNo, setAuthorityNo] = useState<number>(0);
    const [companyName, setCompanyName] = useState<string>("");
    const [positionName, setPositionName] = useState<string>("");
    const [userAuthority, setUserAuthority] = useState<string>("");
    const [userPhoneNumber, setUserPhoneNumber] = useState<string>("");
    const [tmProjectName, setTmProjectName] = useState<string>("");
    const [projectTypeList, setProjectTypeList] = useState<any[]>([]);
    const [tmProjectNameList, setTmProjectNameList] = useState<string[]>([]);
    const [selectProjectNoList, setSelectProjectNoList] = useState<number[]>([]);

    useEffect(() => {
        dispatch(GetProjectTypeList());
        dispatch(GetEdmsAddress(true));
    }, [props.visible]);

    useEffect(() => {
        if (projSelector.project_type_list && projSelector.project_type_list.length != 0) {
            setProjectTypeList(projSelector.project_type_list);
        }
    }, [projSelector.project_type_list]);

    // 회사 리스트
    useEffect(() => {
        if (projSelector.edms_company_list) {
            setCompanyList(projSelector.edms_company_list);
        }
    }, [projSelector.edms_company_list]);

    // 직급 리스트
    useEffect(() => {
        if (projSelector.edms_position_list) {
            setPositionList(projSelector.edms_position_list);
        }
    }, [projSelector.edms_position_list]);

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
            dispatch(GetEdmsAddress(true));
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
        if (companyId != -1 && groupId != -1) {
            setUserList(
                projSelector.edms_user_list.filter(
                    (raw: any) => raw.company_id == companyId && raw.group_id == groupId
                )
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
            setUserInfoNo(-1);
            setTimeout(() => {
                setIsLoading(false);
                ModalInfo("유저 등록이 완료되었습니다.");
            }, 2000);
        }
    }, [projSelector.create_edms_user]);

    useEffect(() => {
        if (projSelector.edit_edms_user) {
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
        setGroupList([]);
        setGroupBtn(false);
        setUserList([]);
        setUserBtn(false);
        setCompanyId(-1);
        setGroupId(-1);
        setUserInfoNo(-1);
    };

    // 리스트 필터
    const filteredList = (company_id: number, type: string, group_id?: number) => {
        let filtered = [];
        if (type == "company") {
            filtered = projSelector.edms_group_list.filter(
                (raw: any) => raw.company_id == company_id
            );

            setCompanyId(company_id);
            setGroupList(filtered);
            setGroupBtn(true);
            setUserList([]);
            setUserBtn(false);
            setUserInfoNo(-1);
        } else if (type == "group") {
            filtered = projSelector.edms_user_list.filter(
                (raw: any) => raw.company_id == company_id && raw.group_id == group_id
            );
            setUserList(filtered);
            setUserBtn(true);
            setGroupId(group_id == undefined ? -1 : group_id);
            setUserInfoNo(-1);
        }
    };

    const AddressCompanyCreate = () => {
        setIsEdit(0);
    };

    const AddressCompanyEdit = (idx: number) => {
        setIsEdit(1);
        setIsIdx(idx);
    };

    const AddressPositionCreate = () => {
        setIsEdit(2);
    };

    const AddressPositionEdit = (idx: number) => {
        setIsEdit(3);
        setIsIdx(idx);
    };

    const AddressTrProjectEdit = () => {
        setIsEdit(4);
    };

    const onCloseAddress = () => {
        setAddressVisibleModal(false);
        setIsEdit(-1);
    };

    const onCloseUserApproveModal = () => {
        setUserApproveModalVisible(false);
    };

    // 삭제
    const deleteRow = (id: number, type: string, name: string) => {
        let res = confirm(name + "을(를) 삭제하시겠습니까?");
        if (res) {
            dispatch(DeleteAddress(id, type));
            if (type == "comapy" && companyId == id) {
                setGroupList([]);
                setUserList([]);
                setCompanyId(-1);
                setGroupId(-1);
                setUserInfoNo(-1);
            } else if (type == "group" && groupId == id) {
                setUserList([]);
                setGroupId(-1);
                setUserInfoNo(-1);
            }
        }
    };

    // 리스트 생성
    const getLineRows = (raw: any, index: number, type: string) => {
        if (type == "company") {
            return (
                <>
                    <S.BodyDetail key={index}>
                        <S.TableCell $width={10}>{index + 1}</S.TableCell>

                        <S.TableCell $cursor $width={90} onClick={() => filteredList(raw.id, type)}>
                            {raw.company_name}
                        </S.TableCell>

                        {/* <S.TableCell $width={15}>
                            <S.EditButton onClick={() => AddressCompanyEdit(index)}>
                                <S.EditImg src={EditIcon} />
                            </S.EditButton>
                        </S.TableCell> */}

                        {/* <S.TableCell $width={15}>
                            <S.EditButton onClick={() => deleteRow(raw.id, type, raw.company_name)}>
                                <S.EditImg src={DelIcon} />
                            </S.EditButton>
                        </S.TableCell> */}
                    </S.BodyDetail>
                </>
            );
        } else if (type == "group") {
            return (
                <>
                    <S.BodyDetail key={index}>
                        <S.TableCell $width={10}>{index + 1}</S.TableCell>

                        <S.TableCell
                            $cursor
                            $width={90}
                            onClick={() => filteredList(raw.company_id, type, raw.id)}
                        >
                            {raw.group_name}
                        </S.TableCell>

                        {/* <S.TableCell $width={15}>
                            <S.EditButton onClick={() => AddressPositionEdit(index)}>
                                <S.EditImg src={EditIcon} />
                            </S.EditButton>
                        </S.TableCell> */}
                        {/* 
                        <S.TableCell $width={15}>
                            <S.EditButton onClick={() => deleteRow(raw.id, type, raw.group_name)}>
                                <S.EditImg src={DelIcon} />
                            </S.EditButton>
                        </S.TableCell> */}
                    </S.BodyDetail>
                </>
            );
        } else if (type == "user") {
            return (
                <>
                    <S.BodyDetail>
                        <S.TableCell
                            $cursor
                            $width={100}
                            onClick={() => getUserDetail("info", raw)}
                        >
                            {raw.username}
                        </S.TableCell>

                        <S.TableCell $width={25}>
                            <S.EditButton onClick={() => getUserDetail("edit", raw)}>
                                <S.EditImg src={EditIcon} />
                            </S.EditButton>
                        </S.TableCell>

                        {/* <S.TableCell $width={25}>
                            <S.EditButton
                                onClick={() => deleteRow(raw.user_id, type, raw.username)}
                            >
                                <S.EditImg src={DelIcon} />
                            </S.EditButton>
                        </S.TableCell> */}
                    </S.BodyDetail>
                </>
            );
        }
    };

    // 유저 상세정보 및 생성, 수정
    const getUserDetail = (type: string, raw?: any) => {
        let company: any;
        let group: any;
        let position: any;
        let phoneNUmber: any;
        let tmProject: any;

        setUserId("");
        setUSerPw("");
        setGroupNo(0);
        setUserName("");
        setUserEmail("");
        setGroupName("");
        setPositionNo(0);
        setAuthorityNo(0);
        setCompanyName("");
        setPositionName("");
        setUserAuthority("");
        setUserPhoneNumber("");

        // 유저 정보 확인
        if (type == "info" && raw != undefined) {
            setUserInfoNo(0);
            company = companyList.find(data => data.id == raw.company_id);
            group = groupList.find(data => data.id == raw.group_id);
            if (raw.position_id != 0) {
                position = positionList.find(data => data.id == raw.position_id);
                if (position) setPositionName(position.position_name);
            }
            if (company) setCompanyName(company.company_name);
            if (group) setGroupName(group.group_name);
            setUserAuthority(getUserLevel(raw.level));
            setUserInfo(raw);
            setTmManager(raw.is_tm);
            if (raw.tm_project_no_list && raw.tm_project_no_list.length != 0) {
                let projectsNames: string[] = [];
                for (let i = 0; i < raw.tm_project_no_list.length; i++) {
                    tmProject = projectTypeList.find(
                        projectType => projectType.project_no == raw.tm_project_no_list[i]
                    );
                    if (tmProject) {
                        projectsNames.push(tmProject.project_name);
                    }
                }
                setTmProjectName(projectsNames.join(","));
            } else {
                setTmProjectName("");
            }
        }
        // 유저 추가
        else if (type == "create") {
            setUserInfoNo(1);
            company = companyList.find(data => data.id == companyId);
            group = groupList.find(data => data.id == groupId);
            position = positionList.filter(data => data.company_id == companyId);

            if (group) setGroupName(group.group_name);
            if (company) setCompanyName(company.company_name);
            setFilterPositionList([...position]);
        }
        // 유저 수정
        else if (type == "edit" && raw != undefined) {
            setUserInfoNo(2);
            company = companyList.find(data => data.id == raw.company_id);
            group = groupList.filter(data => data.company_id == raw.company_id);
            position = positionList.filter(data => data.company_id == companyId);
            phoneNUmber = raw.phone_number ? raw.phone_number : "";
            setFilterGroupList([...group]);
            setFilterPositionList([...position]);
            if (company) setCompanyName(company.company_name);
            setUserNo(raw.user_id);
            setGroupNo(raw.group_id);
            setPositionNo(raw.position_id);
            setAuthorityNo(raw.level);
            setUserName(raw.username);
            setUserEmail(raw.email);
            setUserPhoneNumber(phoneNUmber);
            setTmManager(raw.is_tm);

            if (raw.tm_project_no_list && raw.tm_project_no_list.length != 0) {
                let projectNameList: string[] = [];
                for (let i = 0; i < raw.tm_project_no_list.length; i++) {
                    tmProject = projectTypeList.find(
                        projectType => projectType.project_no == raw.tm_project_no_list[i]
                    );
                    if (tmProject) projectNameList.push(tmProject.project_name);
                }
                setTmProjectName("");
                setTmProjectNameList(projectNameList);
                setSelectProjectNoList(raw.tm_project_no_list);
            } else {
                setTmProjectName("");
                setTmProjectNameList([]);
            }
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

    const onClickUserApproveModal = (userInfo: any) => {
        setSelectedUserInfo(userInfo);
        setUserApproveModalVisible(true);
    };

    // 유저 승인하기
    const userApprove = async (type: string) => {
        if (selectedUserInfo.username) {
            let res = confirm(`"${selectedUserInfo.username}" 해당 유저를 승인하시겠습니까?`);
            if (res) {
                setUserApproveModalVisible(false);
                setIsLoading(true);
                await dispatch(ApproveEdmsUser(selectedUserInfo.user_id, type));
                await dispatch(GetEdmsAddress(true));

                setTimeout(() => {
                    setGroupId(-1);
                    setCompanyId(-1);
                    setUserInfoNo(-1);
                    setIsLoading(false);
                    ModalInfo("승인되었습니다.");
                }, 2000);
            }
        }
    };

    // 생성 및 수정 저장
    const onSave = (type: string) => {
        if (type == "create") {
            if (userId.length == 0) return ModalInfo("아이디를 입력해주세요.");
            if (userPw.length == 0) return ModalInfo("비밀번호를 입력해주세요.");
            if (userName.length == 0) return ModalInfo("이름을 입력해주세요.");
            if (positionNo == 0) return ModalInfo("직급을 선택해주세요.");
            if (authorityNo == 0) return ModalInfo("권한을 선택해주세요.");
            if (userEmail.length == 0) return ModalInfo("이메일을 입력해주세요.");

            setIsLoading(true);
            dispatch(
                CreateEdmsUser(
                    userId,
                    userPw,
                    userName,
                    companyId,
                    groupId,
                    positionNo,
                    authorityNo,
                    userEmail,
                    tmManager,
                    userPhoneNumber
                )
            );
        } else if (type == "edit") {
            setIsLoading(true);
            dispatch(
                EditEdmsUser(
                    userNo,
                    companyId,
                    groupNo,
                    positionNo,
                    authorityNo,
                    tmManager,
                    userEmail,
                    userPhoneNumber,
                    selectProjectNoList
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
            />
            <EdmsUserApproveModal
                visible={userApproveModalVisible}
                onClose={onCloseUserApproveModal}
                userApprove={userApprove}
            />
            <S.Block open={props.visible ? true : false} onClose={props.onClose}>
                <S.Inner>
                    <LoadingIndicatorComponent open={isLoading} style={{ zIndex: 1301 }} />
                    <S.Title>조직관리</S.Title>
                    <S.CloseBtn onClick={onClose}>
                        <Close style={{ fontSize: "1.6em" }} />
                    </S.CloseBtn>
                    <S.Content>
                        <S.DetailBlock>
                            <S.SubTitle>
                                <S.TableCell $width={10}>순서</S.TableCell>
                                <S.TableCell $width={90}>회사명</S.TableCell>
                                {/* <S.TableCell $width={15}>수정</S.TableCell> */}
                                {/* <S.TableCell $width={15}>삭제</S.TableCell> */}
                            </S.SubTitle>
                            <S.Seperator>
                                <hr />
                            </S.Seperator>
                            <S.InfoContainer>
                                {companyList.map((raw, idx) => getLineRows(raw, idx, "company"))}
                            </S.InfoContainer>
                            {/* <S.EndContainer>
                                <S.Btn onClick={AddressCompanyCreate}>추가하기</S.Btn>
                            </S.EndContainer> */}
                        </S.DetailBlock>

                        <S.DetailBlock>
                            <S.SubTitle>
                                <S.TableCell $width={10}>순서</S.TableCell>
                                <S.TableCell $width={90}>부서명</S.TableCell>
                                {/* <S.TableCell $width={15}>수정</S.TableCell> */}
                                {/* <S.TableCell $width={15}>삭제</S.TableCell> */}
                            </S.SubTitle>
                            <S.Seperator>
                                <hr />
                            </S.Seperator>
                            <S.InfoContainer>
                                {groupList.map((raw, idx) => getLineRows(raw, idx, "group"))}
                            </S.InfoContainer>
                            {/* {groupBtn && (
                                <S.EndContainer>
                                    <S.Btn onClick={AddressPositionCreate}>추가하기</S.Btn>
                                </S.EndContainer>
                            )} */}
                        </S.DetailBlock>

                        <S.DetailBlock $flex={0.7}>
                            <S.SubTitle>
                                <S.TableCell $width={100}>이름</S.TableCell>
                                {/* <S.TableCell $width={25}>수정</S.TableCell> */}
                                {/* <S.TableCell $width={25}>삭제</S.TableCell> */}
                            </S.SubTitle>
                            <S.UserSeperator>
                                <hr />
                            </S.UserSeperator>
                            <S.InfoContainer>
                                {userList.map((raw, idx) => getLineRows(raw, idx, "user"))}
                            </S.InfoContainer>
                            {/* {userBtn && (
                                <S.EndContainer>
                                    <S.Btn onClick={() => getUserDetail("create")}>추가하기</S.Btn>
                                </S.EndContainer>
                            )} */}
                        </S.DetailBlock>
                        <S.DetailBlock $flex={1.5}>
                            {(userInfoNo == 0 && (
                                <>
                                    <S.SubTitle>
                                        <S.InformationTitle>유저 정보</S.InformationTitle>
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
                                                <S.InputTitle>회사</S.InputTitle>
                                                <S.InputText>
                                                    {companyName === null ? "" : companyName}
                                                </S.InputText>
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
                                                <S.InputTitle>권한</S.InputTitle>
                                                <S.InputText>
                                                    {userAuthority === null ? "" : userAuthority}
                                                </S.InputText>
                                            </S.InputBox>
                                            <S.InputBox>
                                                <S.InputTitle>이메일</S.InputTitle>
                                                <S.InputText>
                                                    {userInfo.email === null ? "" : userInfo.email}
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
                                            <S.InputBox>
                                                <S.InputTitle>TR담당자</S.InputTitle>
                                                <S.CheckDiv>
                                                    <S.Check checked={tmManager} />
                                                    <S.InputText $boxType="3%">
                                                        {tmProjectName}
                                                    </S.InputText>
                                                </S.CheckDiv>
                                            </S.InputBox>
                                        </S.InfoContainer>
                                    )}
                                    {userInfo.approved == 0 && (
                                        <S.EndContainer $is_approve={true}>
                                            <S.Btn
                                                onClick={() => onClickUserApproveModal(userInfo)}
                                            >
                                                승인하기
                                            </S.Btn>
                                        </S.EndContainer>
                                    )}
                                </>
                            )) ||
                                (userInfoNo == 1 && (
                                    <>
                                        <S.SubTitle>
                                            <S.InformationTitle>유저 정보추가</S.InformationTitle>
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
                                                ></S.Input>
                                            </S.InputBox>
                                            <S.InputBox>
                                                <S.InputTitle>비밀먼호</S.InputTitle>
                                                <S.Input
                                                    type="password"
                                                    value={userPw}
                                                    onChange={e => setUSerPw(e.target.value)}
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
                                                <S.InputTitle>회사</S.InputTitle>
                                                <S.InputText>
                                                    {companyName === null ? "" : companyName}
                                                </S.InputText>
                                            </S.InputBox>
                                            <S.InputBox>
                                                <S.InputTitle>부서</S.InputTitle>
                                                <S.InputText>
                                                    {groupName === null ? "" : groupName}
                                                </S.InputText>
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
                                                <S.InputTitle>권한</S.InputTitle>
                                                <S.InputSelect
                                                    style={{
                                                        paddingLeft: "1.5%",
                                                        fontSize: "1.1em",
                                                        fontWeight: 500,
                                                        color: "gray",
                                                    }}
                                                    disableUnderline
                                                    value={authorityNo}
                                                    onChange={(e: any) =>
                                                        setAuthorityNo(e.target.value)
                                                    }
                                                >
                                                    <S.InputSelectItem value={1}>
                                                        총관리자
                                                    </S.InputSelectItem>
                                                    <S.InputSelectItem value={2}>
                                                        회사 담당자
                                                    </S.InputSelectItem>
                                                    <S.InputSelectItem value={3}>
                                                        회사 구성원
                                                    </S.InputSelectItem>
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
                                            {/* <S.InputBox>
                                                <S.InputTitle>TR담당자</S.InputTitle>
                                                <S.CheckDiv>
                                                    <S.Check
                                                        checked={tmManager}
                                                        onChange={e => setTmManager(!tmManager)}
                                                    />
                                                </S.CheckDiv>
                                            </S.InputBox> */}
                                        </S.InfoContainer>
                                        <S.EndContainer>
                                            <S.Btn onClick={() => onSave("create")}>저장</S.Btn>
                                        </S.EndContainer>
                                    </>
                                )) ||
                                (userInfoNo == 2 && (
                                    <>
                                        <S.SubTitle>
                                            <S.InformationTitle>유저 정보수정</S.InformationTitle>
                                        </S.SubTitle>
                                        <S.Seperator>
                                            <hr />
                                        </S.Seperator>
                                        <S.InfoContainer>
                                            <S.InputBox>
                                                <S.InputTitle>이름</S.InputTitle>
                                                <S.InputText>{userName}</S.InputText>
                                            </S.InputBox>
                                            <S.InputBox>
                                                <S.InputTitle>회사</S.InputTitle>
                                                <S.InputText>{companyName}</S.InputText>
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
                                                    value={groupNo}
                                                    onChange={(e: any) =>
                                                        setGroupNo(e.target.value)
                                                    }
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
                                                <S.InputTitle>권한</S.InputTitle>
                                                <S.InputSelect
                                                    style={{
                                                        paddingLeft: "1.5%",
                                                        fontSize: "1.1em",
                                                        fontWeight: 500,
                                                        color: "gray",
                                                    }}
                                                    disableUnderline
                                                    value={authorityNo}
                                                    onChange={(e: any) =>
                                                        setAuthorityNo(e.target.value)
                                                    }
                                                >
                                                    <S.InputSelectItem value={1}>
                                                        총관리자
                                                    </S.InputSelectItem>
                                                    <S.InputSelectItem value={2}>
                                                        회사 담당자
                                                    </S.InputSelectItem>
                                                    <S.InputSelectItem value={3}>
                                                        회사 구성원
                                                    </S.InputSelectItem>
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
                                            <S.InputTmBox>
                                                <S.InputTitle>TR담당자</S.InputTitle>
                                                <S.CheckDiv>
                                                    <S.Check
                                                        checked={tmManager}
                                                        onChange={e => setTmManager(!tmManager)}
                                                    />
                                                    <S.DeployUserBlock>
                                                        {tmProjectNameList.map(
                                                            (tmProjectName: any, idx: number) => {
                                                                return (
                                                                    <S.DocChip key={idx}>
                                                                        <S.ChipBlock
                                                                            variant={"outlined"}
                                                                            label={tmProjectName}
                                                                            onDelete={() =>
                                                                                trProjectNoDelete(
                                                                                    idx
                                                                                )
                                                                            }
                                                                        />
                                                                    </S.DocChip>
                                                                );
                                                            }
                                                        )}
                                                    </S.DeployUserBlock>
                                                    <S.DocBtn
                                                        onClick={() => AddressTrProjectEdit()}
                                                    >
                                                        +
                                                    </S.DocBtn>
                                                </S.CheckDiv>
                                            </S.InputTmBox>
                                        </S.InfoContainer>
                                        <S.EndContainer>
                                            {userInfo && userInfo.approved == 0 && (
                                                <S.Btn
                                                    $is_approve={true}
                                                    onClick={() =>
                                                        onClickUserApproveModal(userInfo)
                                                    }
                                                >
                                                    승인하기
                                                </S.Btn>
                                            )}
                                            <S.Btn onClick={() => onSave("edit")}>저장</S.Btn>
                                        </S.EndContainer>
                                    </>
                                ))}
                        </S.DetailBlock>
                    </S.Content>
                </S.Inner>
            </S.Block>
        </>
    );
};
