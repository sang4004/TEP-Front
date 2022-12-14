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
        // ?????? ??????
        if (props.idx != undefined && props.isEdit == 1) {
            let company = projSelector.edms_company_list[props.idx];
            setCompanyName(company.company_name);
            setCompanyId(company.id);
        }
        // ?????? ??????
        else if (props.companyId != -1 && props.isEdit == 2) {
            let company = projSelector.edms_company_list.filter(
                (raw: any) => raw.id == props.companyId
            );
            setCompanyName(company[0].company_name);
        }
        // ?????? ??????
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

    // ?????? ??????
    useEffect(() => {
        if (projSelector.create_edms_company) {
            setCompanyName("");
            setTimeout(() => {
                setIsLoading(false);
                ModalInfo("?????? ????????? ?????????????????????.");
                props.onClose();
            }, 2000);
        }
    }, [projSelector.create_edms_company]);

    //?????? ??????
    useEffect(() => {
        if (projSelector.edit_edms_company) {
            setCompanyName("");
            setTimeout(() => {
                setIsLoading(false);
                ModalInfo("????????? ????????? ?????????????????????.");
                props.onClose();
            }, 2000);
        }
    }, [projSelector.edit_edms_company]);

    //?????? ??????
    useEffect(() => {
        if (projSelector.create_edms_group) {
            setGroupName("");
            setTimeout(() => {
                setIsLoading(false);
                ModalInfo("????????? ????????? ?????????????????????.");
                props.onClose();
            }, 2000);
        }
    }, [projSelector.create_edms_group]);

    //?????? ??????
    useEffect(() => {
        if (projSelector.edit_edms_group) {
            setGroupName("");
            setTimeout(() => {
                setIsLoading(false);
                ModalInfo("????????? ????????? ?????????????????????.");
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
        if (companyName.length == 0) return ModalInfo("???????????? ??????????????????.");

        setIsLoading(true);
        dispatch(CreateEdmsCompany(companyName));
    };

    const onEditCompany = async () => {
        if (companyName.length == 0) return ModalInfo("???????????? ??????????????????.");

        setIsLoading(true);
        dispatch(EditEdmsCompany(companyName, companyId));
    };

    const onCreateGroup = async () => {
        if (groupName.length == 0) return ModalInfo("???????????? ??????????????????.");

        setIsLoading(true);
        dispatch(CreateEdmsGroup(props.companyId, groupName, props.isMailGroup));
    };

    const onEditGroup = async () => {
        if (groupName.length == 0) return ModalInfo("???????????? ??????????????????.");

        setIsLoading(true);
        dispatch(EditEdmsGroup(props.companyId, groupName, groupId));
    };

    const onEditTrProject = () => {
        if (selectProjectNo == 0) return ModalInfo("???????????? ????????? ??????????????????.");
        if (props.setSelectProjectNoList != undefined) {
            let is_exist_project_no = selectProjectNoList.find(projectNo => projectNo == selectProjectNo);
            if (is_exist_project_no) { 
                return ModalInfo("?????? ?????????????????? ???????????? ???????????????.");
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
                    <S.InputTitle>?????????</S.InputTitle>
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
                        <S.InputTitle>?????????</S.InputTitle>
                        <S.InputText>{companyName}</S.InputText>
                    </S.ModalInputBox>
                    <S.ModalInputBox>
                        <S.InputTitle>?????????</S.InputTitle>
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
                    <S.InputTitle>???????????????</S.InputTitle>
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
                            ? "?????? ??????"
                            : props.isEdit == 1
                            ? "?????? ??????"
                            : props.isEdit == 2
                            ? "?????? ??????"
                            : props.isEdit == 3
                            ? "?????? ??????"
                            : props.isEdit == 4
                            ? "???????????? ?????? ??????"
                            : ""
                        }
                    </S.HeaderTitle>
                    <S.ModalCloseBtn onClick={onClose}>
                        <img src={closeSvg} />
                    </S.ModalCloseBtn>
                </S.ModalHeader>

                <S.ModalContentWrap>{getInputBox(props.isEdit)}</S.ModalContentWrap>
                <S.ModalBtnContainer>
                    <S.CloseBtn onClick={onClose}>??????</S.CloseBtn>
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
                        ??????
                    </S.SaveBtn>
                </S.ModalBtnContainer>
            </S.Inner>
        </S.Block>
    );
};
