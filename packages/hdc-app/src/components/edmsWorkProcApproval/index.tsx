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
import FileIconSvg from "../../images/fontawsomeicon/paperclip-solid.svg";

const moment = getMoment();

export type WorkProcApprovalProps = {
    style?: object;
    children?: React.ReactNode;
    isdefer?: boolean;
    wptype?: string;
    visible: boolean;
    // completeType => 0: 결재, 1: DIN 완료 , 5: tm 발신, 6: tm 접수
    completeType?: number;
    onClose: () => void;
    onDinComplete?: (comment: string, file: any[], startDate?: Date, endDate?: Date) => void;
    onDrnComplete: (comment: string, check: string, reason?: string) => void;
};

interface FinalWorkProcApprovalProps extends WorkProcApprovalProps {}

export const WorkProcApprovalComp: React.FunctionComponent<FinalWorkProcApprovalProps> = props => {
    const dispatch = useDispatch();
    const userSelector = useSelector((state: reducerState) => state.user);

    const [isInvalid, setIsInvalid] = useState<boolean>(false);
    const [isClickConfirm, setIsClickConfirm] = useState<boolean>(false);
    const [pwVisibleToast, setPwVisibleToast] = useState<boolean>(false);
    const [checkVisibleToast, setCheckVisibleToast] = useState<boolean>(false);
    const [reviewVisibleToast, setReviewVisibleToast] = useState<boolean>(false);
    const [rejectVisibleToast, setRejectVisibleToast] = useState<boolean>(false);
    const [dueDateVisibleToast, setDueDateVisibleToast] = useState<boolean>(false);

    const [check, setCheck] = useState<string>("");
    const [approveCheck, setApproveCheck] = useState<boolean>(false);
    const [rejectCheck, setRejectCheck] = useState<boolean>(false);

    const [files, setFiles] = useState<any[]>([]);
    const [fileInput, setFileInput] = useState<HTMLInputElement | null>(null);

    const [endDate, setEndDate] = useState<Date>();
    const [pwVal, setPwVal] = useState<string>("");
    const [comment, setComment] = useState<string>("");
    const [workType, setWorkType] = useState<number>(-1);
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [reason, setReason] = useState<string>("");

    useEffect(() => {
        if (userSelector.password_check_edms != undefined) {
            setIsInvalid(userSelector.password_check_edms == false ? true : false);

            if (pwVal.length > 0 && isClickConfirm && userSelector.password_check_edms) {
                if (
                    workType == 0 ||
                    (workType == 2 && props.completeType != 0 && props.completeType != 5)
                ) {
                    // legacy code
                    if (props.onDinComplete) {
                        props.onDinComplete(comment, files[0], startDate, endDate);
                    }
                } else if (workType == 1 || props.completeType == 0 || props.completeType == 5) {
                    props.onDrnComplete(comment, check, reason);
                }
            }

            setTimeout(() => {
                setIsClickConfirm(false);
            }, 1000);
        }
    }, [isClickConfirm]);

    useEffect(() => {
        if (props.wptype) {
            switch (props.wptype) {
                case `din`:
                    setWorkType(0);
                    break;
                case `drn`:
                    setWorkType(1);
                    break;
                case `tm`:
                    setWorkType(2);
                    break;
            }
        }
    }, [props.wptype]);

    const onClickConfirm = async () => {
        if (comment === "" && props.completeType != 5 && props.completeType != 0) {
            if (rejectCheck && reason === "") {
                setRejectVisibleToast(true);

                setTimeout(() => {
                    setRejectVisibleToast(false);
                }, 2000);
            } else if (workType == 1) {
                setReviewVisibleToast(true);

                setTimeout(() => {
                    setReviewVisibleToast(false);
                }, 2000);
            }
        } else if (workType == 1 && check != "approve") {
            setCheckVisibleToast(true);

            setTimeout(() => {
                setCheckVisibleToast(false);
            }, 2000);
        } else if (
            workType == 2 &&
            props.completeType != 0 &&
            props.completeType != 5 &&
            !endDate
        ) {
            setDueDateVisibleToast(true);

            setTimeout(() => {
                setDueDateVisibleToast(false);
            }, 2000);
        } else if (props.completeType == 0 && !approveCheck && !rejectCheck) {
            setCheckVisibleToast(true);

            setTimeout(() => {
                setCheckVisibleToast(false);
            }, 2000);
        } else if (pwVal.length > 0) {
            //TODO :: wait api
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

    const onClickUploadFile = () => {
        if (fileInput) fileInput.click();
    };

    const handleUploadClick = async (event: any) => {
        var files = event.target.files;
        if (files) {
            setFiles(files);
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
            <S.Inner $completeType={props.completeType} $rejectCheck={rejectCheck}>
                <S.CloseBtn onClick={props.onClose}>
                    <Close style={{ fontSize: "1.6em" }} />
                </S.CloseBtn>
                <S.TopTextBlock>
                    <S.TopBlock>
                        <S.TopBlockText1>결재 확인</S.TopBlockText1>
                    </S.TopBlock>
                    {workType == 1 ? (
                        <S.CommentBlock>
                            <S.TopBlockText2>리뷰를 입력해 주세요 (필수)</S.TopBlockText2>
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
                    ) : props.completeType == 5 ? (
                        <></>
                    ) : (
                        <></>
                    )}
                    {workType != 1 && props.completeType != 0 && props.completeType != 5 && (
                        <S.FileBlock>
                            <S.TopBlockText2>파일을 등록해 주세요</S.TopBlockText2>
                            <input
                                accept="*"
                                id="contained-button-file"
                                type="file"
                                style={{ display: "none" }}
                                onChange={handleUploadClick}
                                ref={ref => setFileInput(ref)}
                            />
                            <S.FileInputDiv>
                                {files && <S.FileIcon src={FileIconSvg} />}
                                <S.FileInput
                                    InputProps={{
                                        disableUnderline: true,
                                        style: { height: "100%" },
                                    }}
                                    variant="standard"
                                    value={files.length > 0 ? files[0].name : ``}
                                />
                                <S.AddFileBtn onClick={onClickUploadFile}>파일선택</S.AddFileBtn>
                            </S.FileInputDiv>
                        </S.FileBlock>
                    )}
                    {workType == 2 && props.completeType != 0 && props.completeType != 5 && (
                        <S.InputDateBox>
                            <S.DateBlock $first={true}>
                                <S.TopBlockText3>적용일자(필수) :</S.TopBlockText3>
                                <S.InputDate
                                    value={moment(startDate).format("YYYY-MM-DD")}
                                    onChange={e => setStartDate(moment(e.target.value).toDate())}
                                    type="date"
                                    style={{ width: "100%" }}
                                    min="2017-01-01"
                                    max="2030-12-31"
                                />
                            </S.DateBlock>
                            <S.DateBlock>
                                <S.TopBlockText3>기한일자(필수) :</S.TopBlockText3>
                                <S.InputDate
                                    onChange={e => setEndDate(moment(e.target.value).toDate())}
                                    type="date"
                                    style={{ width: "100%" }}
                                    min="2017-01-01"
                                    max="2030-12-31"
                                />
                            </S.DateBlock>
                        </S.InputDateBox>
                    )}
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
                    {props.completeType == 0 && (
                        <>
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
                        </>
                    )}
                    {rejectCheck == true && (
                        <S.CommentBlock>
                            <S.TopBlockText2>반려 사유를 입력해 주세요</S.TopBlockText2>
                            <S.CommentInput
                                InputProps={{
                                    disableUnderline: true,
                                    style: { height: "100%", border: "1px solid #999999" },
                                }}
                                variant="standard"
                                value={reason}
                                onChange={e => setReason(e.target.value)}
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
                    text="리뷰를 입력해 주세요."
                    close={() => setReviewVisibleToast(false)}
                    visible={reviewVisibleToast}
                    type={"warning"}
                    style={{ position: "absolute", top: -50, right: 0, alignItems: "center" }}
                />
                <ToastComponent
                    text="기한일을 입력해 주세요."
                    close={() => setDueDateVisibleToast(false)}
                    visible={dueDateVisibleToast}
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
