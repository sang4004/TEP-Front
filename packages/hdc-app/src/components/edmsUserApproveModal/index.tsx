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
import { reducerState } from "../../common";
import { PasswordCheck } from "../../common/action";
//
import Close from "@material-ui/icons/Close";

export type userApproveModalProps = {
    style?: object;
    visible: boolean;
    userApprove: (type: string) => void;
    onClose: () => void;
};

interface FinaluserApproveModalProps extends userApproveModalProps {}

export const EdmsUserApproveModal: React.FunctionComponent<FinaluserApproveModalProps> = props => {
    const dispatch = useDispatch();

    const [isEdmsUser, setIsEdmsUser] = useState<boolean>(true);
    const [isMailUser, setIsMailUser] = useState<boolean>(false);

    const onClickApprove = () => {
        if (isEdmsUser) props.userApprove("EDMS");
        else props.userApprove("MAIL");
    };

    const onClickCheck = (type: string) => {
        if (type === "EDMS") {
            setIsEdmsUser(true);
            setIsMailUser(false);
        } else {
            setIsEdmsUser(false);
            setIsMailUser(true);
        }
    };

    return (
        <S.Block open={props.visible ? true : false} onClose={props.onClose}>
            <S.Inner>
                <S.CloseBtn onClick={props.onClose}>
                    <Close style={{fontSize : "1.6em"}} />
                </S.CloseBtn>
                <S.TopTextBlock>
                    <S.TopBlock>
                        <S.TopBlockText1>결재 확인</S.TopBlockText1>
                    </S.TopBlock>
                    <S.CommentBlock>
                        <S.CheckBoxBlock>
                            <S.CheckBox
                                checked={isEdmsUser}
                                onChange={() => onClickCheck("EDMS")}
                            />
                            <S.TabTitle onClick={() => onClickCheck("EDMS")}>50 User</S.TabTitle>
                            <S.CheckBox
                                checked={isMailUser}
                                onChange={() => onClickCheck("MAIL")}
                            />
                            <S.TabTitle onClick={() => onClickCheck("MAIL")}>Mail User</S.TabTitle>
                        </S.CheckBoxBlock>
                    </S.CommentBlock>
                </S.TopTextBlock>
                <S.BtmBtn onClick={onClickApprove}>확인</S.BtmBtn>
            </S.Inner>
        </S.Block>
    );
};
