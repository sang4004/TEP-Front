/******************************************************************************
 * appwrapper/index.tsx
 * hooks :
 * useLocations
 *
 ******************************************************************************/
// Library
import { useSelector, useDispatch } from "react-redux"; // redux
import { useState, useEffect, useContext, ChangeEvent } from "react"; // default hooks
//
// Module
import * as S from "./styled";
import { reducerState } from "../../common";
import { PasswordCheck } from "../../common/action";
//
import Close from "@material-ui/icons/Close";

export type approvalCancelProps = {
    style?: object;
    children?: React.ReactNode;
    visible: boolean;
    onClose: () => void;
    onComplete: (comment: string) => void;
};

interface FinalapprovalCancelProps extends approvalCancelProps {}

export const ApprovalCancelComp: React.FunctionComponent<FinalapprovalCancelProps> = props => {
    const dispatch = useDispatch();
    const dsSelector = useSelector((state: reducerState) => state.digitalsign);
    const userSelector = useSelector((state: reducerState) => state.user);
    const [comment, setComment] = useState<string>("");

    const onClickConfirm = async () => {
        if (comment.length > 0) {
            props.onComplete(comment);
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
                        <S.TopBlockText>결재 취소</S.TopBlockText>
                    </S.TopBlock>
                    <S.CommentBlock>
                        <S.CommentInput
                            // InputProps={{ disableUnderline : true }}
                            // $pwInvalid={isInvalid}
                            variant="outlined"
                            value={comment}
                            onChange={e => setComment(e.target.value)}
                            type="text"
                            placeholder="결재취소 사유를 입력해주세요."
                            InputProps={{ style: { height: "100%" } }}
                            inputProps={{ style: { height: "100%" } }}
                            multiline
                        />
                    </S.CommentBlock>
                </S.TopTextBlock>
                <S.BtmBtn onClick={onClickConfirm}>결재 취소</S.BtmBtn>
            </S.Inner>
        </S.Block>
    );
};
