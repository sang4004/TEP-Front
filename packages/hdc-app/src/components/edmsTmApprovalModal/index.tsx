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
import { useState, useEffect } from "react"; // default hooks
//
// Module
import * as S from "./styled";
import { ToastComponent } from "components";
import { reducerState } from "../../common";
import { getMoment } from "../../common/utils";
import { PasswordCheckEdms } from "../../common/action";
//
import Close from "@material-ui/icons/Close";

const moment = getMoment();

export type EdmsTmApprovalModalProps = {
    style?: object;
    children?: React.ReactNode;
    isdefer?: boolean;
    wptype?: string;
    visible: boolean;
    onClose: () => void;
    onTmComplete: (comment: string, check: string) => void;
};

interface FinalEdmsTmApprovalModalProps extends EdmsTmApprovalModalProps {}

export const EdmsTmApprovalModal: React.FunctionComponent<
    FinalEdmsTmApprovalModalProps
> = props => {
    const dispatch = useDispatch();
    const userSelector = useSelector((state: reducerState) => state.user);

    const [isInvalid, setIsInvalid] = useState<boolean>(false);
    const [rejectCheck, setRejectCheck] = useState<boolean>(false);
    const [approveCheck, setApproveCheck] = useState<boolean>(false);
    const [isClickConfirm, setIsClickConfirm] = useState<boolean>(false);
    const [pwVisibleToast, setPwVisibleToast] = useState<boolean>(false);
    const [checkVisibleToast, setCheckVisibleToast] = useState<boolean>(false);
    const [rejectVisibleToast, setRejectVisibleToast] = useState<boolean>(false);

    const [pwVal, setPwVal] = useState<string>("");
    const [check, setCheck] = useState<string>("");
    const [comment, setComment] = useState<string>("");

    useEffect(() => {
        if (!props.visible) {
            setPwVal("");
            setCheck("");
            setComment("");
            setApproveCheck(false);
            setRejectCheck(false);
        }
    }, [props.visible]);

    useEffect(() => {
        if (userSelector.password_check_edms != undefined) {
            setIsInvalid(userSelector.password_check_edms == false ? true : false);

            if (pwVal.length > 0 && isClickConfirm && userSelector.password_check_edms) {
                props.onTmComplete(comment, check);
            }

            setTimeout(() => {
                setIsClickConfirm(false);
            }, 1000);
        }
    }, [isClickConfirm]);

    const onClickConfirm = async () => {
        if (comment === "" && rejectCheck) {
            setRejectVisibleToast(true);

            setTimeout(() => {
                setRejectVisibleToast(false);
            }, 2000);
        } else if (check === "") {
            setCheckVisibleToast(true);

            setTimeout(() => {
                setCheckVisibleToast(false);
            }, 2000);
        } else if (pwVal.length > 0) {
            await dispatch(PasswordCheckEdms(pwVal));
            setTimeout(() => {
                setIsClickConfirm(true);
            }, 400);
        } else {
            setPwVisibleToast(true);
            setTimeout(() => {
                setPwVisibleToast(false);
            }, 2000);
        }
    };

    const onChangePW = (e: any) => {
        if (isInvalid) setIsInvalid(false);
        setPwVal(e.target.value);
    };

    const onKeyUpPW = (e: any) => {
        if (e.key == "Enter") {
            onClickConfirm();
        }
    };

    const onClickCheck = (type: string) => {
        if (type === "approve") {
            if (!approveCheck) {
                setCheck("approve");
                setApproveCheck(true);
                setRejectCheck(false);
            }
        } else {
            if (!rejectCheck) {
                setCheck("reject");
                setRejectCheck(true);
                setApproveCheck(false);
            }
        }
    };

    return (
        <S.Block open={props.visible ? true : false} onClose={props.onClose}>
            <S.Inner $rejectCheck={rejectCheck}>
                <S.CloseBtn onClick={props.onClose}>
                    <Close style={{ fontSize: "1.6em" }} />
                </S.CloseBtn>
                <S.TopTextBlock>
                    <S.TopBlock>
                        <S.TopBlockText1>결재 확인</S.TopBlockText1>
                    </S.TopBlock>
                    <S.PasswordBlock>
                        <S.TopBlockText2>비밀번호를 입력해주세요 (필수)</S.TopBlockText2>
                        <S.FakeInput></S.FakeInput>
                        <S.PasswordInput
                            InputProps={{
                                disableUnderline: true,
                                style: { height: "100%", border: "1px solid #999999" },
                            }}
                            variant="standard"
                            value={pwVal}
                            onChange={onChangePW}
                            onKeyUp={onKeyUpPW}
                            type="password"
                            error={isInvalid}
                            helperText={isInvalid ? "* 비밀번호를 확인해 주세요." : ""}
                            autoComplete="new-password"
                        />
                    </S.PasswordBlock>
                    <S.ApproveBlock>
                        <S.CheckboxBlockIn
                            checked={approveCheck}
                            onChange={e => onClickCheck("approve")}
                        />
                        승인
                        <S.CheckboxBlockIn
                            checked={rejectCheck}
                            onChange={e => onClickCheck("reject")}
                        />
                        반려
                    </S.ApproveBlock>
                    {rejectCheck == true && (
                        <S.CommentBlock>
                            <S.TopBlockText2>반려 사유를 입력해 주세요</S.TopBlockText2>
                            <S.CommentInput
                                InputProps={{
                                    disableUnderline: true,
                                    style: { height: "100%", border: "1px solid #999999" },
                                }}
                                variant="standard"
                                value={comment}
                                onChange={e => setComment(e.target.value)}
                                type="text"
                                inputProps={{ style: { height: "100%" } }}
                                multiline
                            />
                        </S.CommentBlock>
                    )}
                    <S.BtmBtn onClick={onClickConfirm}>확인</S.BtmBtn>
                </S.TopTextBlock>

                <ToastComponent
                    text="비밀번호를 입력해 주세요."
                    close={() => setPwVisibleToast(false)}
                    visible={pwVisibleToast}
                    type={"warning"}
                    style={{ position: "absolute", top: -50, right: 0, alignItems: "center" }}
                />
                <ToastComponent
                    text="결재상태를 체크해 주세요."
                    close={() => setCheckVisibleToast(false)}
                    visible={checkVisibleToast}
                    type={"warning"}
                    style={{ position: "absolute", top: -50, right: 0, alignItems: "center" }}
                />
                <ToastComponent
                    text="반려 사유를 입려해 주세요"
                    close={() => setRejectVisibleToast(false)}
                    visible={rejectVisibleToast}
                    type={"warning"}
                    style={{ position: "absolute", top: -50, right: 0, alignItems: "center" }}
                />
            </S.Inner>
        </S.Block>
    );
};
