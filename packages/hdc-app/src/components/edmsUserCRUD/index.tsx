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
import arrowBtnHoverSvg from "../../images/btn/arrow_gray_hover.svg";
import { reducerState } from "../../common";
import Draggable from "react-draggable";
//
export type UserManageProps = {
    style?: object;
    children?: React.ReactNode;
    visible: boolean;
    userNo: number;
    onClose: () => void;
    onComplete: (info: object, new_info: object) => void;
};

interface FinalUserManageProps extends UserManageProps {}

const Data = [
    {
        user_no: 1,
        c_no: 0,
        u_name: `정주호`,
        u_company: `무른모`,
        u_group: `개발팀`,
        u_position: `팀장`,
        u_email: `email@email.com`,
    },
    {
        user_no: 2,
        c_no: 0,
        u_name: `이종섭`,
        u_company: `무른모`,
        u_group: `개발팀`,
        u_position: `사원`,
        u_email: `email@email.com`,
    },
    {
        user_no: 3,
        c_no: 0,
        u_name: `박우상`,
        u_company: `무른모`,
        u_group: `개발팀`,
        u_position: `사원`,
        u_email: `email@email.com`,
    },
    {
        user_no: 4,
        c_no: 0,
        u_name: `박진수`,
        u_company: `무른모`,
        u_group: `개발팀`,
        u_position: `사원`,
        u_email: `email@email.com`,
    },
    {
        user_no: 5,
        c_no: 1,
        u_name: `김영철`,
        u_company: `통영에코파워`,
        u_group: `발전소`,
        u_position: `부장`,
        u_email: `email@email.com`,
    },
    {
        user_no: 6,
        c_no: 2,
        u_name: `???`,
        u_company: `벤틀리`,
        u_group: `임원진`,
        u_position: `지사장`,
        u_email: `email@email.com`,
    },
];

const Company = [
    { c_no: 0, c_name: `무른모` },
    { c_no: 1, c_name: `통영에코파워` },
    { c_no: 2, c_name: `벤틀리` },
];

export const UserManageComp: React.FunctionComponent<FinalUserManageProps> = props => {
    const dispatch = useDispatch();



    const [approvalList, setApprovalList] = useState<any[]>([]);
    const [newPosList, setNewPosList] = useState<any[]>([]);

    useEffect(()=>{
        if(props.userNo != -1){
            let _data = Data.filter((raw)=> raw.user_no == props.userNo)[0];

        }
    }, [props.userNo])

    const onClickConfirm = async () => {
        props.onComplete([...approvalList.reverse()], [...newPosList]);
        approvalList.reverse();
        props.onClose();
    };

    const onClose = () => {
        props.onClose();
    };

    return (
        <S.Block open={props.visible ? true : false} onClose={props.onClose}>
            <S.Inner>
                <S.Top>
                    <S.Title>사용자 정보 수정하기</S.Title>
                    <S.CloseBtn onClick={onClose}>
                        <Close fontSize="large"/>
                    </S.CloseBtn>
                </S.Top>
                <S.Content>
                    <S.ContentRow>
                        <S.RowTitle>회사 :</S.RowTitle>
                    </S.ContentRow>
                    <S.ContentRow>
                        <S.RowTitle>부서 :</S.RowTitle>
                    </S.ContentRow>
                    <S.ContentRow>
                        <S.RowTitle>직급 :</S.RowTitle>
                    </S.ContentRow>
                    <S.ContentRow>
                        <S.RowTitle>이름 :</S.RowTitle>
                    </S.ContentRow>
                    <S.ContentRow>
                        <S.RowTitle>이메일 :</S.RowTitle>
                    </S.ContentRow>
                    <S.ContentRow>
                        <S.RowTitle>전화번호 :</S.RowTitle>
                    </S.ContentRow>
                    <S.ContentRow>
                        <S.RowTitle>관리자 :</S.RowTitle>
                    </S.ContentRow>
                </S.Content>
                <S.Bottom>
                    <S.Btn onClick={onClickConfirm}>확인</S.Btn>
                    <S.BtmCloseBtn onClick={() => props.onClose()}>취소</S.BtmCloseBtn>
                </S.Bottom>
            </S.Inner>
        </S.Block>
    );
};
