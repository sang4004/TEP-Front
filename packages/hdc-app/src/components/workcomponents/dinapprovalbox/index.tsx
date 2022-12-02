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
import * as S from "./styled";
import {
    GaugeChartComponent,
    ModalConfirm,
    ModalInfo,
    LoadingIndicatorComponent,
} from "components";
import React, { useRef, useState, useEffect, ChangeEvent } from "react"; // default hooks
import { useDispatch, useSelector } from "react-redux";
import {
    SetWorkAssign,
    RequestWorkSign,
} from "../../../common/action";
import { reducerState } from "../../../common/store";
import { EdmsDinApprovalInfo } from "../../../components";
import trashIcon from "../../../images/edms/trash.svg";
import arrowBtnHoverSvg from "../../../images/btn/arrow_gray_hover.svg";

export type DinApprovalBox = {};
interface FinalDinApprovalBox extends DinApprovalBox {}

export const DinApprovalBoxComp: React.FunctionComponent<FinalDinApprovalBox> = props => {
    const dispatch = useDispatch();
    const workSelector = useSelector((state: reducerState) => state.work);
    const userSelector = useSelector((state: reducerState) => state.user);
    const [approvalType, setApprovalType] = useState<number>(-1);
    const [visibleApprovalModal, setVisibleApprovalModal] = useState<boolean>(false);
    const [dinSignLineList, setDinSignLineList] = useState<object[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const [userList, setUserList] = useState<any[]>([]);
    const [assignUser, setAssignUser] = useState<any>();

    useEffect(() => {
        if (workSelector.work_assign) {
            setUserList([...workSelector.work_assign]);
            let nowAssign = true;
            for (var s of workSelector.work_assign) {
                if (s.is_approval == 0 && nowAssign) {
                    setAssignUser(s);
                    nowAssign = false;
                }
            }
        }
    }, [workSelector.work_assign]);

    useEffect(() => {
        if (assignUser && assignUser.user_id == userSelector.edms_user_id)
            setApprovalType(parseInt(assignUser.assign_state));
    }, [assignUser]);

    const onClickComplete = async () => {
        if (isDisabled == false) ModalConfirm("결재 상신을 진행하시겠습니까?", successComplete);
    };

    const successComplete = async () => {
        setIsLoading(true);
        await dispatch(RequestWorkSign(assignUser.wa_idx));
        setTimeout(() => {
            setIsLoading(false);
            ModalInfo("상신 완료");
        }, 1000);
        setIsDisabled(true);
    };

    const onClickApprovalReject = async () => {
        if (isDisabled == false) ModalConfirm("반려 하시겠습니까?", successApprovalReject);
    };

    const successApprovalReject = async () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            ModalInfo("반려 완료");
        }, 1000);
        setIsDisabled(true);
    };

    const onClickApproval = async () => {
        if (isDisabled == false) ModalConfirm("결재 하시겠습니까?", successApproval);
    };

    const successApproval = async () => {
        setIsLoading(true);
        await dispatch(RequestWorkSign(assignUser.wa_idx));
        setTimeout(() => {
            setIsLoading(false);
            ModalInfo("결재 완료");
        }, 1000);
        setIsDisabled(true);
    };

    const onChangeApprovalOrder = async (idx: number, move: number) => {
        let no = idx + move;
        if (no >= 0 && no < userList.length) {
            if (move > 0 && idx != 0) {
                userList.splice(idx, 2, userList[no], userList[idx]);
            } else if (move < 0 && idx != 1) {
                userList.splice(idx - 1, 2, userList[idx], userList[no]);
            }
        }
        await dispatch(
            SetWorkAssign(workSelector.work_proc_data.wp_idx, [
                ...userList.map((raw, idx) => raw.user_id),
            ])
        );
        setUserList([...userList]);
    };

    const get_state_type = (state: string) => {
        switch (state) {
            case `1`:
                return "기안";
            case `2`:
                return "대기";
            case `3`:
                return "결재";
            case `4`:
                return "반려";
            default:
                return "";
        }
    };

    const deleteAssign = async (idx: number) => {
        userList.splice(idx, 1);
        await dispatch(
            SetWorkAssign(workSelector.work_proc_data.wp_idx, [
                ...userList.map((raw, idx) => raw.user_id),
            ])
        );
        setUserList([...userList]);
    };

    const getLine = (type: number) => {
        if (type == 1) {
            return (
                <S.DinDetailApprovalCommissionBtn
                    $color={"#477ee9"}
                    onClick={onClickComplete}
                    $disabled={isDisabled}
                >
                    <img src="assets/images/edms/commission.svg" />
                    결재 상신
                    <S.DinDetailApprovalText>
                        상신 후에는 수정이 불가합니다.
                    </S.DinDetailApprovalText>
                </S.DinDetailApprovalCommissionBtn>
            );
        } else if (type == 2) {
            return (
                <>
                    <S.DinDetailApprovalCommissionBtn
                        $color={"#477ee9"}
                        onClick={onClickApproval}
                        $disabled={isDisabled}
                    >
                        <img src="assets/images/edms/commission.svg" />
                        결재 하기
                    </S.DinDetailApprovalCommissionBtn>
                    <S.DinDetailApprovalCommissionBtn
                        $color={"#54B0A9"}
                        onClick={onClickApprovalReject}
                        $disabled={isDisabled}
                    >
                        <img src="assets/images/edms/commission.svg" />
                        반려 하기
                    </S.DinDetailApprovalCommissionBtn>
                </>
            );
        } else if (type == 3) {
            return (
                <S.DinDetailApprovalCommissionBtn $color={"#477ee9"}>
                    <img src="assets/images/edms/commission.svg" />
                    결재 완료
                </S.DinDetailApprovalCommissionBtn>
            );
        }
    };
    
    return (
        <>
            <EdmsDinApprovalInfo
                visible={visibleApprovalModal}
                onClose={() => setVisibleApprovalModal(false)}
                onComplete={(lines: object[]) => setDinSignLineList(lines)}
            />
            <LoadingIndicatorComponent open={isLoading} />
            <S.DinDetailApprovedContainer>
                <S.DinDetailInnerHeader>
                    배포 승인 결재
                    <S.DinDetailInnerBtns>
                        {workSelector.work_proc_data &&
                            workSelector.work_proc_data.requester_id == userSelector.edms_user_id && (
                                <S.DinDetailInnerHeaderBtn
                                    onClick={() => setVisibleApprovalModal(true)}
                                >
                                    <img src="assets/images/edms/group.svg" alt="" />
                                    <S.DinDetailText>결재라인 선택</S.DinDetailText>
                                </S.DinDetailInnerHeaderBtn>
                            )}
                    </S.DinDetailInnerBtns>
                </S.DinDetailInnerHeader>
                <S.DinDetailInnerContentsBox>
                    <S.DinDetailApprovalUserList>
                        {userList.length > 0 &&
                            userList.map((raw: any, idx: number) => {
                                return (
                                    <S.DinDetailUserCard key={raw.username}>
                                        <S.DinDetailUserCardTitle $state={raw.assign_state}>
                                            <S.SignNumberMoveBtn
                                                $dir
                                                $marginType="right"
                                                src={arrowBtnHoverSvg}
                                                onClick={() => onChangeApprovalOrder(idx, -1)}
                                            />
                                            {raw.username}
                                            <S.SignNumberMoveBtn
                                                $hover
                                                $marginType="left"
                                                src={arrowBtnHoverSvg}
                                                onClick={() => onChangeApprovalOrder(idx, 1)}
                                            />
                                        </S.DinDetailUserCardTitle>
                                        <S.DinDetailUserCardButtonDiv>
                                            {get_state_type(raw.assign_state)}
                                            {idx != 0 ? (
                                                <S.DinDeleteButton
                                                    onClick={() => deleteAssign(idx)}
                                                >
                                                    <img src={trashIcon} />
                                                </S.DinDeleteButton>
                                            ) : (
                                                <S.DinDeleteButton></S.DinDeleteButton>
                                            )}
                                        </S.DinDetailUserCardButtonDiv>
                                    </S.DinDetailUserCard>
                                );
                            })}
                    </S.DinDetailApprovalUserList>

                    <S.DinDetailApprovalCommissionBox>
                        {getLine(approvalType)}
                    </S.DinDetailApprovalCommissionBox>
                </S.DinDetailInnerContentsBox>
            </S.DinDetailApprovedContainer>
        </>
    );
};
