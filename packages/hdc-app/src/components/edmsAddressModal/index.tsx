/******************************************************************************
 * Copyright (c) 2021. Moornmo Inc. Rights reserved.                          *
 * Data modelings and methods used are assets of Moornmo Inc.                 *
 * projecttreemodal/index.tsx
 * hooks :
 * useLocations
 *
 * last modify : jh.jeong@ilts.co.kr
 ******************************************************************************/
// Library
import React, { useState, useEffect } from "react"; // default hooks
//image
import closeSvg from "../../images/edms/times-solid-white.svg";
//styled
import * as S from "./styled";
// Module
import { useSelector, useDispatch } from "react-redux";
import { reducerState } from "../../common";
import { ModalInfo, LoadingIndicatorComponent } from "components";
import {
    CreateEdmsCompany,
    EditEdmsCompany,
    CreateEdmsGroup,
    EditEdmsGroup,
} from "../../common/action";

export type edmsAddressModalProps = {
    style?: object;
    visible: boolean;
    onClose: () => void;
    isEdit: number;
    idx?: number;
    companyId?: number;
    projectTypeList: any[];
    selectProjectNoList?: number[];
    setSelectProjectNoList?: any;
    isMailGroup ?: boolean;
};
interface FinaledmsAddressModalProps extends edmsAddressModalProps {}

export const EdmsAddressModal: React.FunctionComponent<FinaledmsAddressModalProps> = props => {
    const dispatch = useDispatch();
    const projSelector = useSelector((state: reducerState) => state.project);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [companyName, setCompanyName] = useState<string>("");
    const [companyId, setCompanyId] = useState<number>();
    const [groupName, setGroupName] = useState<string>("");
    const [groupId, setGroupId] = useState<number>();
    const [selectProjectName, setSelectProjectName] = useState<string>("");
    const [selectProjectNo, setSelectProjectNo] = useState<number>(0);
    const [projectTypeList, setProjectTypeList] = useState<any[]>([]);
    const [selectProjectNoList, setSelectProjectNoList] = useState<number[]>([]);

    useEffect(() => {
        // 회사 수정
        if (props.idx != undefined && props.isEdit == 1) {
            let company = projSelector.edms_company_list[props.idx];
            setCompanyName(company.company_name);
            setCompanyId(company.id);
        }
        // 부서 추가
        else if (props.companyId != -1 && props.isEdit == 2) {
            let company = projSelector.edms_company_list.filter(
                (raw: any) => raw.id == props.companyId
            );
            setCompanyName(company[0].company_name);
        }
        // 부서 수정
        else if (props.idx != undefined && props.companyId != -1 && props.isEdit == 3) {
            let company = projSelector.edms_company_list.filter(
                (raw: any) => raw.id == props.companyId
            );
            let group = projSelector.edms_group_list.filter(
                (raw: any) => raw.company_id == props.companyId
            );

            setCompanyName(company[0].company_name);
            setGroupName(group[props.idx].group_name);
            setGroupId(group[props.idx].id);
        } else if (props.projectTypeList && props.selectProjectNoList) {
            setProjectTypeList(props.projectTypeList)
            setSelectProjectNoList(props.selectProjectNoList);
        }
    }, [props.idx, props.companyId, props.isEdit]);

    // 회사 등록
    useEffect(() => {
        if (projSelector.create_edms_company) {
            setCompanyName("");
            setTimeout(() => {
                setIsLoading(false);
                ModalInfo("회사 등록이 완료되었습니다.");
                props.onClose();
            }, 2000);
        }
    }, [projSelector.create_edms_company]);

    //회사 수정
    useEffect(() => {
        if (projSelector.edit_edms_company) {
            setCompanyName("");
            setTimeout(() => {
                setIsLoading(false);
                ModalInfo("회사명 수정이 완료되었습니다.");
                props.onClose();
            }, 2000);
        }
    }, [projSelector.edit_edms_company]);

    //부서 등록
    useEffect(() => {
        if (projSelector.create_edms_group) {
            setGroupName("");
            setTimeout(() => {
                setIsLoading(false);
                ModalInfo("부서명 등록이 완료되었습니다.");
                props.onClose();
            }, 2000);
        }
    }, [projSelector.create_edms_group]);

    //부서 수정
    useEffect(() => {
        if (projSelector.edit_edms_group) {
            setGroupName("");
            setTimeout(() => {
                setIsLoading(false);
                ModalInfo("부서명 수정이 완료되었습니다.");
                props.onClose();
            }, 2000);
        }
    }, [projSelector.edit_edms_group]);

    const onClose = () => {
        props.onClose();
        setCompanyName("");
        setGroupName("");
    };

    const onCreateCompany = async () => {
        if (companyName.length == 0) return ModalInfo("회사명을 입력해주세요.");

        setIsLoading(true);
        dispatch(CreateEdmsCompany(companyName));
    };

    const onEditCompany = async () => {
        if (companyName.length == 0) return ModalInfo("회사명을 입력해주세요.");

        setIsLoading(true);
        dispatch(EditEdmsCompany(companyName, companyId));
    };

    const onCreateGroup = async () => {
        if (groupName.length == 0) return ModalInfo("부서명을 입력해주세요.");

        setIsLoading(true);
        dispatch(CreateEdmsGroup(props.companyId, groupName, props.isMailGroup));
    };

    const onEditGroup = async () => {
        if (groupName.length == 0) return ModalInfo("부서명을 입력해주세요.");

        setIsLoading(true);
        dispatch(EditEdmsGroup(props.companyId, groupName, groupId));
    };

    const onEditTrProject = () => {
        if (selectProjectNo == 0) return ModalInfo("프로젝트 타입을 선택해주세요.");
        if (props.setSelectProjectNoList != undefined) {
            let is_exist_project_no = selectProjectNoList.find(projectNo => projectNo == selectProjectNo);
            if (is_exist_project_no) { 
                return ModalInfo("이미 등록되어있는 프로젝트 타입입니다.");
            } else {
                selectProjectNoList.push(selectProjectNo);
                props.setSelectProjectNoList([...selectProjectNoList]);
            }
        }
        props.onClose();
    };

    const changeProjectNo = (e: any) => {
        let selectProject = e.target.value;
        setSelectProjectName(selectProject);
        projectTypeList.map(project => {
            if (project.project_name === selectProject) {
                setSelectProjectNo(project.project_no);
            }
        })
    };

    const getInputBox = (type: number) => {
        if (type == 0 || type == 1) {
            return (
                <S.ModalInputBox>
                    <S.InputTitle>회사명</S.InputTitle>
                    <S.Input
                        $boxType="wide"
                        value={companyName}
                        onChange={e => setCompanyName(e.target.value)}
                    ></S.Input>
                </S.ModalInputBox>
            );
        }
        else if (type == 2 || type == 3) {
            return (
                <S.ContentDiv>
                    <S.ModalInputBox>
                        <S.InputTitle>회사명</S.InputTitle>
                        <S.InputText>{companyName}</S.InputText>
                    </S.ModalInputBox>
                    <S.ModalInputBox>
                        <S.InputTitle>부서명</S.InputTitle>
                        <S.Input
                            $boxType="wide"
                            value={groupName}
                            onChange={e => setGroupName(e.target.value)}
                        ></S.Input>
                    </S.ModalInputBox>
                </S.ContentDiv>
            );
        } else {
           return (
                <S.ModalInputBox>
                    <S.InputTitle>프로젝트명</S.InputTitle>
                    <S.InputSelect
                        style={{
                            paddingLeft: "1.5%",
                            fontSize: "1.1em",
                            fontWeight: 500,
                            color: "gray",
                            
                        }}
                        disableUnderline
                        value={selectProjectName}
                        onChange={(e: any) =>
                            changeProjectNo(e)
                        }
                    >
                        {props.projectTypeList.map(
                            (projectType: any, idx: number) => {
                                return (
                                    <S.InputSelectItem
                                        key={idx}
                                        value={projectType.project_name}
                                    >
                                        {projectType.project_name}
                                    </S.InputSelectItem>
                                );
                            }
                        )}
                    </S.InputSelect>
                </S.ModalInputBox>
           );
        }
    };

    return (
        <S.Block open={props.visible ? true : false} onClose={props.onClose}>
            <S.Inner>
                <LoadingIndicatorComponent open={isLoading} style={{ zIndex: 1301 }} />
                <S.ModalHeader>
                    <S.HeaderTitle>
                        {props.isEdit == 0
                            ? "회사 추가"
                            : props.isEdit == 1
                            ? "회사 수정"
                            : props.isEdit == 2
                            ? "부서 추가"
                            : props.isEdit == 3
                            ? "부서 수정"
                            : props.isEdit == 4
                            ? "프로젝트 타입 선택"
                            : ""
                        }
                    </S.HeaderTitle>
                    <S.ModalCloseBtn onClick={onClose}>
                        <img src={closeSvg} />
                    </S.ModalCloseBtn>
                </S.ModalHeader>

                <S.ModalContentWrap>{getInputBox(props.isEdit)}</S.ModalContentWrap>
                <S.ModalBtnContainer>
                    <S.CloseBtn onClick={onClose}>닫기</S.CloseBtn>
                    <S.SaveBtn
                        onClick={
                            props.isEdit == 0
                                ? onCreateCompany
                                : props.isEdit == 1
                                ? onEditCompany
                                : props.isEdit == 2
                                ? onCreateGroup
                                : props.isEdit == 3
                                ? onEditGroup
                                : onEditTrProject
                        }
                    >
                        저장
                    </S.SaveBtn>
                </S.ModalBtnContainer>
            </S.Inner>
        </S.Block>
    );
};
