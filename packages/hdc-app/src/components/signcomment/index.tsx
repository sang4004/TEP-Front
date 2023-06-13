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

export type SignCommentProps = {
    style ?: object;
    children ?: React.ReactNode;
    visible : boolean;
    onClose : ()=>void;
    onComplete : (comment : string)=>void;
}

interface FinalSignCommentProps extends SignCommentProps {};

export const SignCommentComp : React.FunctionComponent<FinalSignCommentProps> = ( props )=>{
    const [comment, setComment] = useState<string>("");

    const onClickConfirm = async ()=>{
        if(comment.length > 0){
            props.onComplete(comment);
        }
    }

    return (
        <S.Block
            open={props.visible ? true : false}
            onClose={props.onClose}
            >
            <S.Inner>
                <S.CloseBtn onClick={props.onClose}>
                    <Close fontSize="large"/>
                </S.CloseBtn>
                <S.TopTextBlock>
                    <S.TopBlock>
                        <S.TopBlockText>코멘트 입력하기</S.TopBlockText>
                    </S.TopBlock>
                    <S.CommentBlock>
                        <S.CommentInput 
                            // InputProps={{ disableUnderline : true }} 
                            // $pwInvalid={isInvalid}
                            variant="outlined"
                            value={comment}
                            onChange={(e)=>setComment(e.target.value)}
                            type="text"
                            placeholder="수정사항 관련 내용을 입력해주세요."
                            InputProps={{ style : { height : "100%" } }}
                            inputProps={{ style : { height : "100%" } }}
                            multiline
                            />
                    </S.CommentBlock>
                </S.TopTextBlock>
                <S.BtmBtn onClick={onClickConfirm}>수정하기</S.BtmBtn>
            </S.Inner>
        </S.Block>
    );
}