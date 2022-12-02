/******************************************************************************
 * Copyright (c) 2021. Moornmo Inc. Rights reserved.                          *
 * Data modelings and methods used are assets of Moornmo Inc.                 *
 * appwrapper/index.tsx
 * hooks :
    * useLocations 
    *
 * last modify : jh.jeong@ilts.co.kr
 ******************************************************************************/

// Module
import * as S from "./styled";

import { getMoment } from "../../common/utils";
const moment = getMoment();


export type EdmsProjectDrnCompoProps = {
    
}
interface FinalEdmsProjectDrnCompoProps extends EdmsProjectDrnCompoProps {};

export const EdmsProjectDrnCompoComponent : React.FunctionComponent<FinalEdmsProjectDrnCompoProps> = ( props )=>{

    
    return (
        <S.ContentsContainer>
            <S.CatBtmWrap>
                <button style={{ background: "#ff9900"}}>문서회신 진행</button>
            </S.CatBtmWrap>

            <S.DrnContentsWrap>
                <S.TargetDocuBox>
                    <S.InnerContainerHeader>
                        <div>배포 대상 문서 목록</div>
                        <button></button>
                    </S.InnerContainerHeader>
                    <S.TargetDocuTable>
                        {/* grid 부분 */}
                    </S.TargetDocuTable>
                </S.TargetDocuBox>

                <S.AllUserCommentBox>
                    <S.InnerContainerHeader>
                        <div>배포 문서 리비전의 모든 일반 사용자 코멘트</div>
                    </S.InnerContainerHeader>
                    <S.AllUserCommnetList>
                        <S.CommentNone>현재 Comment가 없습니다.</S.CommentNone>
                    </S.AllUserCommnetList>
                </S.AllUserCommentBox>

                <S.TargetDocuBox>
                    <S.InnerContainerHeader>
                        <div>배포 문서 리비전의 모든 일반 사용자 코멘트</div>
                        <button></button>
                    </S.InnerContainerHeader>
                    <S.TargetDocuTable>
                        {/* grid 부분 */}
                    </S.TargetDocuTable>
                </S.TargetDocuBox>
            </S.DrnContentsWrap>

        </S.ContentsContainer>
    );
}