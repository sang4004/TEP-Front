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
import { PasswordCheck } from "../../common/action";
import { ToastComponent } from "components";
//
import Close from "@material-ui/icons/Close";

export type approvalCertifyProps = {
    style?: object;
    children?: React.ReactNode;
    isdefer?: boolean;
    visible: boolean;
    onClose: () => void;
    onComplete: (comment?: string, prevApproval?: boolean) => void;
};

interface FinalapprovalCertifyProps extends approvalCertifyProps {}

export const ApprovalCertifyComp: React.FunctionComponent<FinalapprovalCertifyProps> = props => {
    const dispatch = useDispatch();
    const dsSelector = useSelector((state: reducerState) => state.digitalsign);
    const userSelector = useSelector((state: reducerState) => state.user);
    const [isClickConfirm, setIsClickConfirm] = useState<boolean>(false);
    const [isInvalid, setIsInvalid] = useState<boolean>(false);
    const [pwVal, setPwVal] = useState<string>("");
    const [comment, setComment] = useState<string>("");
    const [isPrevApproval, setIsPrevApproval] = useState<boolean>(false);
    const [visibleToast, setVisibleToast] = useState<boolean>(false);

    useEffect(() => {
        if (userSelector.password_check != undefined) {
            setIsInvalid(userSelector.password_check == false ? true : false);
            if (pwVal.length > 0 && isClickConfirm && userSelector.password_check) {
                if (comment.length > 0) props.onComplete(comment, isPrevApproval);
                else props.onComplete("", isPrevApproval);
            }
            setTimeout(() => {
                setIsClickConfirm(false);
            }, 1000);
        }
    }, [isClickConfirm]);

    const onClickConfirm = async () => {
        if (pwVal.length > 0) {
            //TODO :: wait api
            await dispatch(PasswordCheck(pwVal));

            setTimeout(() => {
                setIsClickConfirm(true);
            }, 100);
        } else {
            setVisibleToast(true);
            setTimeout(() => {
                setVisibleToast(false);
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

    return (
        <S.Block open={props.visible ? true : false} onClose={props.onClose}>
            <S.Inner>
                <S.CloseBtn onClick={props.onClose}>
                    <Close fontSize="large" />
                </S.CloseBtn>
                <S.TopTextBlock>
                    <S.TopBlock>
                        <S.TopBlockText1>결재 확인</S.TopBlockText1>
                    </S.TopBlock>
                    <S.CommentBlock>
                        <S.TopBlockText2>코맨트를 입력해주세요 (선택)</S.TopBlockText2>
                        <S.CommentInput
                            InputProps={{
                                disableUnderline: true,
                                style: { height: "100%", border: "1px solid #999999" },
                            }}
                            variant="standard"
                            value={comment}
                            onChange={e => setComment(e.target.value)}
                            type="text"
                            // placeholder="결재문서와 관련된 코멘트를 입력해주세요."
                            inputProps={{ style: { height: "100%" } }}
                            multiline
                        />
                    </S.CommentBlock>
                    {/* <S.BoxBlock
                        $defer={props.isdefer}
                    >
                        <S.TopBlockText2>전결 처리시 체크해주세요 (선택)</S.TopBlockText2>
                        <S.CheckBoxBlock>
                            <S.CheckboxBlockIn 
                                checked={isPrevApproval}
                                color="primary"
                                onChange={(event)=>setIsPrevApproval(event.target.checked)}
                                />
                        </S.CheckBoxBlock>
                    </S.BoxBlock> */}
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
                            helperText={isInvalid ? "* 비밀번호를 확인해주세요." : ""}
                            autoComplete="new-password"
                        />
                    </S.PasswordBlock>
                </S.TopTextBlock>
                <S.BtmBtn onClick={onClickConfirm}>확인</S.BtmBtn>
                <ToastComponent
                    text="비밀번호를 입력해주세요."
                    close={() => setVisibleToast(false)}
                    visible={visibleToast}
                    type={"warning"}
                    style={{ position: "absolute", top: -50, right: 0, alignItems: "center" }}
                />
            </S.Inner>
        </S.Block>
    );
};
