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
import { PasswordCheckEdms } from "../../common/action";
import { EdmsTmpDocumentApprovalInfo } from "../";
//
import Close from "@material-ui/icons/Close";

export type WorkProcReceiptProps = {
    style?: object;
    children?: React.ReactNode;
    isdefer?: boolean;
    wptype?: string;
    visible: boolean;
    completeType?: number;
    onClose: () => void;
    onTmReceiptComplete: (approver_id_list: any) => void;
};

interface FinalWorkProcReceiptProps extends WorkProcReceiptProps {}

export const WorkProcReceiptComp: React.FunctionComponent<FinalWorkProcReceiptProps> = props => {
    const dispatch = useDispatch();
    const userSelector = useSelector((state: reducerState) => state.user);

    const [pwVal, setPwVal] = useState<string>("");
    const [isInvalid, setIsInvalid] = useState<boolean>(false);
    const [isClickConfirm, setIsClickConfirm] = useState<boolean>(false);
    const [pwVisibleToast, setPwVisibleToast] = useState<boolean>(false);
    const [TmpApprovalInfoVisible, setTmpApprovalInfoVisible] = useState<boolean>(false);

    const [approverList, setApproverList] = useState<any[]>([]);

    useEffect(() => {
        if (userSelector.password_check_edms != undefined) {
            setIsInvalid(userSelector.password_check_edms == false ? true : false);

            if (pwVal.length > 0 && isClickConfirm && userSelector.password_check_edms) {
                let approver_list: any[] = [];

                for (let list of approverList) {
                    approver_list.push(list.id);
                }
                props.onTmReceiptComplete(approver_list);
            }

            setTimeout(() => {
                setIsClickConfirm(false);
            }, 1000);
        }
    }, [isClickConfirm]);

    const onClickConfirm = async () => {
        if (pwVal.length > 0) {
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

    const approverDelete = (idx: number) => {
        approverList.splice(idx, 1);
        setApproverList([...approverList]);
    };

    const onCompleteApproverList = (list: any) => {
        setApproverList(list);
    };

    return (
        <S.Block open={props.visible ? true : false} onClose={props.onClose}>
            <S.Inner>
                <EdmsTmpDocumentApprovalInfo
                    visible={TmpApprovalInfoVisible}
                    onClose={() => setTmpApprovalInfoVisible(false)}
                    onComplete={onCompleteApproverList}
                    approverList={approverList}
                />
                <S.CloseBtn onClick={props.onClose}>
                    <Close fontSize="large"/>
                </S.CloseBtn>
                <S.TopTextBlock>
                    <S.TopBlock>
                        <S.TopBlockText1>TR 접수</S.TopBlockText1>
                    </S.TopBlock>
                    <S.AssignListBlock>
                        <S.TopBlockText3>결재자를 선택해 주세요 (필수)</S.TopBlockText3>
                        <S.BoxDiv>
                            <S.DeployUserBlock>
                                {approverList.map((data: any, idx: number) => {
                                    return (
                                        <S.DocChip key={data.username}>
                                            <S.ChipBlock
                                                variant={"outlined"}
                                                label={data.username}
                                                onDelete={() => approverDelete(idx)}
                                            />
                                        </S.DocChip>
                                    );
                                })}
                            </S.DeployUserBlock>
                            <S.DocBtn
                                $boxType="receiver"
                                onClick={() => setTmpApprovalInfoVisible(true)}
                            >
                                +
                            </S.DocBtn>
                        </S.BoxDiv>
                    </S.AssignListBlock>

                    <S.PasswordBlock>
                        <S.TopBlockText2>비밀번호를 입력해 주세요 (필수)</S.TopBlockText2>
                        <S.PasswordInput
                            InputProps={{
                                disableUnderline: true,
                                style: {
                                    height: "100%",
                                    border: "1px solid #999999",
                                    padding: "1%",
                                    marginBottom: "1%",
                                },
                            }}
                            variant="standard"
                            value={pwVal}
                            onChange={onChangePW}
                            onKeyUp={onKeyUpPW}
                            type="password"
                            error={isInvalid}
                            helperText={isInvalid ? "* 비밀번호를 확인해 주세요." : ""}
                        />
                    </S.PasswordBlock>
                </S.TopTextBlock>
                <S.BtmBtn onClick={onClickConfirm}>확인</S.BtmBtn>
                <ToastComponent
                    text="비밀번호를 입력해 주세요."
                    close={() => setPwVisibleToast(false)}
                    visible={pwVisibleToast}
                    type={"warning"}
                    style={{ position: "absolute", top: -50, right: 0, alignItems: "center" }}
                />
            </S.Inner>
        </S.Block>
    );
};
