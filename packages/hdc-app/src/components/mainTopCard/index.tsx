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
//
// Module
import * as S from "./styled";
import { useLocations } from "hooks" // locations hooks
import { getMoment } from "../../common/utils";
const moment = getMoment();
import { date2ago } from "utils_ts/lib/converter";
import {
    signingListType
} from "../../common/reducer";
import ClockSvg from "../../images/fontawsomeicon/clock-regular.svg";
//

export type mainTopCardProps = {
    style ?: object;
    children ?: React.ReactNode;
    data : signingListType;
    ratio : number;
}
interface FinalmainTopCardProps extends mainTopCardProps {};

export const MainTopCardComponent : React.FunctionComponent<FinalmainTopCardProps> = ( props )=>{
    const { pushHistory } = useLocations();
    
    const onClickSignBtn = ()=>{
        pushHistory("/document/view/"+ props.data.id)
    }

    if(Object.keys(props.data).length == 0)
        return null;
    
    return (
        <S.Block>
            <S.Inner>
                <S.ProgressTop>
                    <S.DocumentTitle>{props.data.title.length > 14 ? props.data.title.slice(0, 14) + "..." : props.data.title}</S.DocumentTitle>
                    <S.DocumentForm>{props.data.form}</S.DocumentForm>
                    <S.ProgressTime>
                        <img src={ClockSvg}/>
                        <span>
                            {date2ago(props.data.time)}
                        </span>
                    </S.ProgressTime>
                </S.ProgressTop>
                <S.ProgressInfo>
                    <S.ProgressRow>
                        <S.ProgressRowText $first={true}>기안자</S.ProgressRowText>
                        <S.ProgressRowText>{props.data.creator}</S.ProgressRowText>
                    </S.ProgressRow>
                    <S.ProgressRow>
                        <S.ProgressRowText $first={true}>기안일</S.ProgressRowText>
                        <S.ProgressRowText>{moment(props.data.date).format("YYYY-MM-DD HH:mm")}</S.ProgressRowText>
                    </S.ProgressRow>
                    <S.EtcInfo>
                        {/* <div>
                            <img src={CommentSvg} />
                            <p>{props.data.comment}</p>
                        </div>
                        <div>
                            <img src={FileSvg} />
                            <p>{props.data.document}</p>
                        </div>
                        <div>
                            <img src={ClipSvg} />
                            <p>{props.data.attach}</p>
                        </div> */}
                    </S.EtcInfo>
                </S.ProgressInfo>
                <S.ButtonWrap onClick={onClickSignBtn}>
                    <p>결재하기</p>
                </S.ButtonWrap>
            </S.Inner>
        </S.Block>
    );
}