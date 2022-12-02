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
import { useState, useEffect, useContext } from "react"; // default hooks
//
// Module
import { useLocations } from "hooks" // locations hooks
import { signDocumnetListType, signingListType } from "../../common/reducer";
import * as S from "./styled";
import RightArrowSvg from "../../images/fontawsomeicon/chevron-right-solid.svg";
import { getMoment } from "../../common/utils";
const moment = getMoment();
import { sliceText } from "utils_ts/lib";
import { reducerState } from "../../common";

//

// enum stateType {
//     결재대기=1,
//     결재예정=2,
//     결재수신=3
// }
enum stateType {
    진행중 = 0,
    결재대기 = 1,
    결재예정 = 2,
    결재수신 = 3
}

const theadSize = [20, 25, 45, 10];

export type mainBtmCardProps = {
    style?: object;
    children?: React.ReactNode;
    data: signDocumnetListType[];
    title: string;
    state: stateType;
    isCheckList?: signDocumnetListType[];
}

interface FinalmainBtmCardProps extends mainBtmCardProps { };

export const MainBtmCardComponent: React.FunctionComponent<FinalmainBtmCardProps> = (props) => {
    const userSelector = useSelector((state: reducerState) => state.user);
    const dsSelector = useSelector((state: reducerState) => state.digitalsign);
    const [data, setData] = useState<signDocumnetListType[]>([]);
    const [checked, setChecked] = useState<boolean>(false);
    const { pushHistory } = useLocations();

    useEffect(() => {
        if (props.data.length > 0) {
            setData([...props.data]);
        }
    }, [props.data]);

    const onClickMove = () => {
        if (props.state == 0) pushHistory("/fbtemporary");
        else if (props.state == 1) pushHistory("/dsrequest");
        else if (props.state == 2) pushHistory("/dsreject");
        else if (props.state == 3) pushHistory("/dscomplete");
    }

    const onClickTitle = (id: number) => {
        let off = dsSelector.offline_sign_list.filter((raw:any)=>raw.id == id);
        if(off.length < 1){
            let filtered = data.filter((raw: any) => raw.id == id && raw.is_general_doc);
            if (filtered.length > 0) {
                if (props.state == 0) pushHistory("/document/normal/edit/" + id);
                else if (props.state == 1) pushHistory("/document/normal/view/" + id);
                else if (props.state == 2) pushHistory("/document/normal/reject/" + id);
                else if (props.state == 3) pushHistory("/document/normal/complete/" + id);
            } else {
                if (props.state == 0) pushHistory("/document/edit/" + id);
                else if (props.state == 1) pushHistory("/document/view/" + id);
                else if (props.state == 2) pushHistory("/document/reject/" + id);
                else if (props.state == 3) pushHistory("/document/complete/" + id);
            }
        }else {
            if (props.state == 0) pushHistory("/document/offrecv/" + id);
            else if (props.state == 1) pushHistory("/document/offview/" + id);
            else if (props.state == 2) pushHistory("/document/offreject/" + id);
            else if (props.state == 3) pushHistory("/document/offcomplete/" + id);
        }
    }

    const getDocStatusText = (status: number) => {
        return status == 0 ? "상태" : status == 1 ? "결재예정" : status == 2 ? "반려자" : "최종결재자"
    }

    const onChangeCheckbox = () => {
        if (checked)
            setData([...props.data]);
        else if (props.isCheckList) setData([...props.isCheckList]);
        setChecked(!checked);
    }

    return (
        <S.Block>
            <S.HomeTitle>
                <S.HomeTitleText>{props.title}</S.HomeTitleText>
                {props.isCheckList &&
                    <S.HomeCheckBoxWrap>
                        본인 결재 문서
                        <S.HomeCheckbox
                            checked={checked}
                            color="primary"
                            onChange={onChangeCheckbox}
                        />
                    </S.HomeCheckBoxWrap>
                }
                <S.HomeTitleBtn onClick={onClickMove}>
                    바로가기
                    <img src={RightArrowSvg} />
                </S.HomeTitleBtn>
            </S.HomeTitle>
            <S.SectionBg $isBlank={data.length == 0}>
                <table>
                    <thead>
                        <tr>
                            <S.HeadCell $cellSize={theadSize[0]}>시간</S.HeadCell>
                            <S.HeadCell $cellSize={theadSize[1]}>문서양식</S.HeadCell>
                            <S.HeadCell $cellSize={theadSize[2]}>제목</S.HeadCell>
                            <S.HeadCell $state={props.state} $cellSize={theadSize[3]}>
                                {getDocStatusText(props.state)}
                            </S.HeadCell>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 && data.map((raw, idx) => {
                            return (
                                <tr key={raw.id} onClick={() => onClickTitle(raw.id)} style={{cursor : "pointer"}}>
                                    <S.BodyCell $cellSize={theadSize[0]}>{moment(raw.date).format("YYYY-MM-DD HH:mm")}</S.BodyCell>
                                    <S.BodyCell $cellSize={theadSize[1]}>{sliceText(raw.form?raw.form:"기존문서", 20, true)}</S.BodyCell>
                                    <S.BodyCell $isTitle $cellSize={theadSize[2]} onClick={() => onClickTitle(raw.id)}>{raw.title}</S.BodyCell>
                                    <S.BodyCell $cellSize={theadSize[3]}>
                                        <S.StateBtn $state={props.state} $is_signer={raw.next_signer_id == userSelector.id}>
                                            {props.state == 0 ? "임시저장" :
                                                props.state == 1 ? raw.next_signer :
                                                    props.state == 2 ? raw.reject_signer : raw.last_signer}</S.StateBtn>
                                    </S.BodyCell>
                                </tr>
                            )
                        })}
                        {data.length == 0 && <div>표시할 내용이 없습니다..</div>}
                    </tbody>
                </table>
            </S.SectionBg>
        </S.Block>
    );
}