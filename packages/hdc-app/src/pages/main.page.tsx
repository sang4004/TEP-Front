/******************************************************************************
 * Copyright (c) 2021. Moornmo Inc. Rights reserved.                          *
 * Data modelings and methods used are assets of Moornmo Inc.                 *
 * hooks :
    * useLocations 
 * components : 
    * 
 * last modify : jh.jeong
 ******************************************************************************/
//Library
import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
//
//Module
import { getConstants } from "utils_ts/lib";
import { reducerState } from "../common";
import { 
    GetSignWaitList,
    GetTempDocList,
    GetOfflineSignList,
    GetSignCompleteList,
    GetSignRejectList,
    GetSignDocRecvList,
    GetSignDocSendList
} from "../common/action";
import { signingListType, signDocumnetListType } from "../common/reducer";
import { MainBtmCardComponent, MainTopCardComponent } from "../components";
import { useLocations } from "hooks";
import * as S from "../styled/main.styled";
import LeftArrowSvg from "../images/fontawsomeicon/chevron-left.svg";
import RightArrowSvg from "../images/fontawsomeicon/chevron-right.svg";
import LeftArrowSolidSvg from "../images/fontawsomeicon/chevron-left-solid.svg";
import RightArrowSolidSvg from "../images/fontawsomeicon/chevron-right-solid.svg";
//
// antd components
//

const MainPage = (props : any)=> {
    const dispatch = useDispatch();
    const history = useHistory();
    const userSelector = useSelector((state: reducerState) => state.user);
    const dsSelector = useSelector((state : reducerState)=> state.digitalsign);
    const {pushHistory} = useLocations();
    
    const [signingList, setSigningList] = useState<signingListType[]>([]);
    const [signingListIdx, setSigningListIdx] = useState<number>(-1);
    const signingListCount = getConstants("HDC").MAIN_TOP_CARD_COUNT;
    const [signWaitOwnList, setSignWaitOwnList] = useState<signDocumnetListType[]>([]);
    
    useEffect(() => {
        dispatch(GetTempDocList());
        dispatch(GetOfflineSignList());
        dispatch(GetSignCompleteList());
        dispatch(GetSignWaitList());
        dispatch(GetSignRejectList());
        dispatch(GetSignDocRecvList());
        dispatch(GetSignDocSendList());
    }, []);

    useEffect(() => {
        if(dsSelector.sign_complete_list && dsSelector.sign_complete_list.length > 0)
            dispatch(GetSignWaitList());
    }, [dsSelector.sign_complete_list]);

    useEffect(() => {
        if(dsSelector.signing_list && dsSelector.signing_list.length > 0){
            SetSigningListSlice(0, signingListCount);
        }
    }, [ dsSelector.signing_list ]);

    useEffect(() => {
        if(dsSelector.sign_wait_list){
            let ownList = [];
            for(var list of dsSelector.sign_wait_list){
                // 본인 진행중 문서만 필터링
                if(list.next_signer_id == userSelector.id)
                    ownList.push(list);
            }
            setSignWaitOwnList([...ownList]);
        }
    }, [dsSelector.sign_wait_list]);

    const SetSigningListSlice = (sIdx : number, eIdx : number)=>{
        setSigningList([
            ...dsSelector.signing_list.slice(sIdx, eIdx)
        ]);
        setSigningListIdx(eIdx);
    }

    const onClickProgressControl = (type : number)=>{
        let sIdx = 0;
        let eIdx = 0;
        if(type == 0){ //left
            sIdx = signingListIdx - signingListCount * 2;
            eIdx = signingListIdx - signingListCount;
        } else if(type == 1){ //right
            sIdx = signingListIdx;
            eIdx = signingListIdx + signingListCount;
        }
        SetSigningListSlice(sIdx, eIdx);
    }

    let enabledLeft = signingListIdx <= signingListCount;
    let enabledRight = dsSelector.signing_list && dsSelector.signing_list.length > 0 && signingListIdx >= dsSelector.signing_list.length

    return (
        <S.Block className="main-page__container">
            <S.Section1>
                <S.HomeTitle>진행 중인 결재</S.HomeTitle>
                <S.ProgressContainer style={ signingList.length == 0 ? { height : "80%" } : undefined}>
                    {signingList.length == 0 && <S.BlankContainer>진행 중인 결재가 없습니다.</S.BlankContainer>}
                    {signingList.map((raw : signingListType , idx : number)=>{
                        return (
                            <MainTopCardComponent 
                                data={raw}
                                key={idx}
                                ratio={signingList.length}
                                />
                        );
                    })}
                </S.ProgressContainer>
                <S.ProgressControls>
                    <li>
                        <button onClick={()=>enabledLeft ? null : onClickProgressControl(0)}>
                            <img src={enabledLeft ? LeftArrowSvg : LeftArrowSolidSvg} />
                        </button>
                    </li>
                    <li>
                        <button onClick={()=>enabledRight ? null : onClickProgressControl(1)}>
                            <img src={enabledRight ? RightArrowSvg : RightArrowSolidSvg} />
                        </button>
                    </li>
                </S.ProgressControls>
            </S.Section1>
            <S.Section2>
                <MainBtmCardComponent state={0} title="작성 중(접수)" data={dsSelector.doc_temp_list} />
                <MainBtmCardComponent state={1} title="진행 중" data={dsSelector.sign_wait_list} isCheckList={signWaitOwnList} />
                <MainBtmCardComponent state={2} title="반려" data={dsSelector.sign_reject_list} />
                <MainBtmCardComponent state={3} title="결재완료" data={dsSelector.sign_complete_list} />
            </S.Section2>
        </S.Block>
    );
};

export default MainPage;