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
import { useState, useEffect, useContext, ChangeEvent } from "react"; // default hooks
import { getMoment } from "../../common/utils";
const moment = getMoment();
//
// Module
import * as S from "./styled";
import {
    SetSignLine
} from "../../common/action";
import { reducerState } from "../../common";
import TalkIconSvg from "../../images/fontawsomeicon/talk-solid-gray.svg";
import hoverbtn from "../../images/btn/arrow_gray_hover.svg";
import { Row } from "antd";
import { sign } from "crypto";

//

type signLineType = {
    order_no : number;
    id : number;
    name : string;
    position : string;
    group : string;
    email : string;
    state : number;
    profile_img : string;
}

export type documentSideMenuProps = {
    style ?: object;
    children ?: React.ReactNode;
    signLines : any[];
    signRefers : any[];
    onChangeLine ?: (LineOrder : number[])=>void;
    isRequested ?: boolean;
    isReceived ?: boolean;
    isOffline ?: boolean;
}
interface FinaldocumentSideMenuProps extends documentSideMenuProps {};

export const DocumentSideMenuComponent : React.FunctionComponent<FinaldocumentSideMenuProps> = ( props )=>{
    const dispatch = useDispatch();
    const dsSelector = useSelector((state:reducerState)=>state.digitalsign);
    const userSelector = useSelector((state : reducerState)=> state.user);

    const [state, setState] = useState<number>(0);
    const [signLine, setSignLine] = useState<any[]>([]);
    const [signLineOrder, setSignLineOrder] = useState<number[]>([]);
    const [signRefer, setSignRefer] = useState<object[]>([]);
    const [signRegister, setSignRegister] = useState<string>("");
    const [docInfo, setDocInfo] = useState<any>({});
    const [signOutRefer, setSignOutRefer] = useState<string>("");
    const [visibleContent, setVisibleContent] = useState<boolean>(false);

    useEffect(() => {
        if( !props.isReceived || (dsSelector.sign_data && userSelector.company == dsSelector.sign_data.group_id)){
            setVisibleContent(true);
        }
    }, [ props.isReceived, dsSelector.sign_data ]);

    useEffect(() => {
        if(props.onChangeLine)
            props.onChangeLine(signLineOrder);
    }, [signLineOrder])

    useEffect(() => {
        if(dsSelector.sign_data){
            setDocInfo({
                // doc_id : dsSelector.sign_data.id + "_" + dsSelector.sign_data.form_id,
                doc_id : dsSelector.sign_data.document_code,
                send : dsSelector.sign_data.doc_sender,
                title : dsSelector.sign_data.title,
                sendComp : dsSelector.sign_data.company + " 대표이사",
                recvComp : dsSelector.sign_data.recv_company_list,
                sendUser : dsSelector.sign_data.creator ? dsSelector.sign_data.creator : dsSelector.signed_user && dsSelector.signed_user[0] ? `${dsSelector.signed_user[0].username} ${dsSelector.signed_user[0].position}` : ``,
                sendedAt : dsSelector.sign_data.sended_at,
                receivedAt : dsSelector.sign_data.registed_at,
                received_sign_at_comp : dsSelector.sign_data.received_sign_at_comp
            });
                if(typeof dsSelector.sign_data.doc_cc == "string" && dsSelector.sign_data.doc_cc != "")
                setSignOutRefer(dsSelector.sign_data.doc_cc.split(", ").join("\n"));                           
        }
    }, [ dsSelector.sign_data ]);

    useEffect(() => {
        if(dsSelector.sign_line){
            let _line : object[] = [];
            let _ids : number[] = [];
            for(var l of [...dsSelector.sign_line]){
                if (_ids.indexOf(l.user_id) != -1) continue;
                _ids.push(l.user_id);
                _line.push(l);
            }
            setSignLineOrder([..._ids]);
            setSignLine([..._line]);
        }
    }, [ dsSelector.sign_line ]);

    useEffect(() => {
        try{
            let sd = dsSelector.sign_data;
            if(dsSelector.sign_register != undefined){
                let reg_text = dsSelector.sign_register.map((raw:any,idx:number)=>`${raw.position} ${raw.username} ${raw.company}`).join("\n");
                if(sd && sd.custom_register) reg_text += `${reg_text.length > 0 ? `\n` : ``}${sd.custom_register}`;
                setSignRegister(reg_text);
            } else {
                if(sd && sd.custom_register) {
                    setSignRegister(`${sd.custom_register}`);
                }
            }
        }catch(err){console.log(err)}
    }, [dsSelector.sign_register]);

    useEffect(() => {
        if(props.signRefers){
            let _line : object[] = [];
            let _ids : number[] = [];
            for(var l of props.signRefers){
                if(_ids.indexOf(l.user_id) != -1) continue;
                _ids.push(l.user_id);
                _line.push(l);
            }
            setSignRefer([..._line]);
        }
    }, [ props.signRefers ]);

    const onChangeTab = ( event ?: ChangeEvent<{}>, newVal ?: number )=>{
        if(newVal != null){
            setState(newVal);
        }
    }

    function onChangeOrder(idx : number, stat : number){
        let no = idx + stat;
        let _line : number[] = signLineOrder;
        if(no > 0 && no < signLineOrder.length && _line.filter((object)=>Object.values(object)[0])){
            if(stat > 0){
                _line.splice(idx,2,signLineOrder[no], signLineOrder[idx]);
            }else{
                _line.splice(idx-1,2,signLineOrder[idx], signLineOrder[no]);
            }
        }
        setSignLineOrder([..._line]);
        dispatch(SetSignLine(dsSelector.sign_data.id, [..._line]));
    }
    
    const getContent = ()=>{
        if(state == 0){
            if(!visibleContent)
                return ( <S.Content></S.Content> );
            return (
                <S.ContentDiv>
                    <S.Content>
                        {/* 기안자 */}
                        {signLine && signLine.length > 0 && 
                        <S.SignBtn key={"local" + 0} >
                            {props.isRequested ? null :
                                <S.SignNumberDiv>
                                </S.SignNumberDiv>
                            }
                            <S.SignBtnAvatar src={signLine[0].profile_img ? signLine[0].profile_img : null} />
                            <S.SignBtnInfo>
                                <S.SignBtnInfoText $isMain={true}>{signLine[0].username}</S.SignBtnInfoText>
                                <S.SignBtnInfoText>{signLine[0].groupname}</S.SignBtnInfoText>
                                <S.SignBtnInfoText>{signLine[0].email}</S.SignBtnInfoText>
                            </S.SignBtnInfo>
                            <S.SignConfirmBtn>{"기안".split("").join("\n")}</S.SignConfirmBtn>
                        </S.SignBtn>
                        }
                        {signLine.length > 0 && signLineOrder.map((id: number, index: number) => {
                                let raw = signLine[index];
                                if(raw.state && parseInt(raw.state) == 1) return null;
                                let stateText = parseInt(raw.state) == 4 ? "반려" : parseInt(raw.state) == 3 || parseInt(raw.state) == 9 ? "결재" : parseInt(raw.state) == 1 ? "기안" : parseInt(raw.state) == 6 ? "전결" : parseInt(raw.state) == (7||9) ? "" : parseInt(raw.state) == 8 ? "후결" : "대기";
                                return (
                                    <S.SignBtn key={"local" + index}>
                                        {props.isRequested ? null :
                                            <S.SignNumberDiv>
                                                <img src={hoverbtn} onClick={() => onChangeOrder(index, -1)} />
                                                <img src={hoverbtn} onClick={() => onChangeOrder(index, 1)} style={{ transform: "rotate(-180deg)" }} />
                                            </S.SignNumberDiv>
                                        }
                                        <S.SignBtnAvatar src={raw.profile_img ? raw.profile_img : null} />
                                        <S.SignBtnInfo>
                                            <S.SignBtnInfoText $isMain={true}>{raw.username}</S.SignBtnInfoText>
                                            <S.SignBtnInfoText>{raw.groupname}</S.SignBtnInfoText>
                                            <S.SignBtnInfoText>{raw.email}</S.SignBtnInfoText>
                                        </S.SignBtnInfo>
                                        <S.SignConfirmBtn>
                                            {stateText.split("").join("\n")}
                                            <S.AllSignLine
                                                $allsign={parseInt(raw.state) == 7 ? true : false}
                                            />
                                        </S.SignConfirmBtn>
                                        {/* <S.AllSignLine/> */}
                                    </S.SignBtn>
                                );
                        })}
                    </S.Content>
                    <S.RejectContent>
                    {dsSelector.sign_comment && dsSelector.sign_comment.map((raw: any, idx: number) => {
                        // console.log(raw);
                        return (
                                <S.RejectRow>{raw.position} {raw.username}{` : `+raw.comment}</S.RejectRow>
                        );
                    })}
                    </S.RejectContent>
                </S.ContentDiv>
            );
        } else if(state == 1) {
            if(!visibleContent)
                return ( <S.Content></S.Content> );
            return (
                <S.Content>
                    <S.DocumentInfo>
                        <li>
                            <S.DocumentReferer>
                            {signRefer.length > 0 && signRefer.map((raw : any,idx : number)=>{
                                return (
                                    <div key={idx}>{raw.company} {raw.part?raw.part:raw.groupname} {raw.name?raw.name:raw.username}</div>
                                );
                            })}
                            </S.DocumentReferer>
                        </li>
                    </S.DocumentInfo>
                </S.Content>
            );
        }
        else if(state == 2) {
            return (
                <S.Content>
                    <S.DocumentInfo>
                        <li>
                            <h3>문서 번호</h3>
                            <p>{docInfo.doc_id ? docInfo.doc_id : ""}</p>
                        </li>
                        <li>
                            <h3>제 목</h3>
                            <p>{docInfo.title}</p>
                        </li>
                        <li>
                            <h3>발 신</h3>
                            <p>{docInfo.sendComp}</p>
                        </li>
                        <li>
                            <h3>수 신</h3>
                            <p>{docInfo.recvComp}</p>
                        </li>

                        <li>
                            <h3>참 조</h3>
                            {/* <S.DocumentReferer>
                            {signOutRefer.length > 0 && signOutRefer.map((valeu : string ,idx : number)=>{
                                return (
                                    <div key={idx}>{valeu}</div>
                                );
                            })}
                            </S.DocumentReferer> */}
                            <p>{signOutRefer}</p>
                        </li>
                        
                        <li>
                            <h3>기 안 자</h3>
                            <p>{docInfo.sendUser ? docInfo.sendUser : signLine[0] ?  `${signLine[0].username} ${signLine[0].groupname}` : ``}</p>
                        </li>
                        <li>
                            <h3>접 수 자</h3>
                            <p style={{whiteSpace : "break-spaces"}}>{signRegister}</p>
                        </li>

                        <li>
                            <h3>발신 일자</h3>
                            <p>{docInfo.sendedAt && moment(docInfo.sendedAt).format("YYYY-MM-DD HH:mm")}</p>
                        </li>

                        <li>
                            <h3>수신 일자</h3>
                            <p>{docInfo.received_sign_at_comp ? docInfo.received_sign_at_comp : docInfo.receivedAt ? moment(docInfo.receivedAt).format("YYYY-MM-DD HH:mm") : ""}</p>
                        </li>
                    </S.DocumentInfo>
                </S.Content>
            );
        } else if (state == 3){
            return (
                <S.Content>
                    <S.DocumentHistoryBlock>
                        <S.HistoryHead>
                            <S.HistoryHeadDiv $flex={2}>날짜</S.HistoryHeadDiv>
                            <S.HistoryHeadDiv $flex={1}>내용</S.HistoryHeadDiv>
                            <S.HistoryHeadDiv $flex={3}>작성자</S.HistoryHeadDiv>
                        </S.HistoryHead>
                        {dsSelector.sign_comment && dsSelector.sign_comment.map((raw : any, idx : number)=>{
                            return (
                                <S.HistoryRow key={idx}>
                                    <S.HistoryRowTop>
                                        <S.HistoryRowTopItem $flex={2}>
                                            {moment(raw.created_at).format("yyyy-mm-DD hh:mm") + "\n"}
                                            {moment(raw.created_at).format("HH:MM")}
                                        </S.HistoryRowTopItem>
                                        <S.HistoryRowTopItem $flex={1}>{raw.type == "0" ? "수정" : raw.type == "1" ? "반려" : raw.type == "2" ? "결재" : "결재취소" }</S.HistoryRowTopItem>
                                        <S.HistoryRowTopItem $flex={3}>{raw.username} {raw.group}</S.HistoryRowTopItem>
                                    </S.HistoryRowTop>
                                    <S.HistoryRowBtm>
                                        <img src={TalkIconSvg} />
                                        {raw.comment}
                                    </S.HistoryRowBtm>
                                </S.HistoryRow>
                            )
                        })}
                    </S.DocumentHistoryBlock>
                </S.Content>
            );
        }
    }

    const getTabBtnLabel = (state : number)=>{
        if(state == 0){
            return (<div>결재선</div>);
        } else if(state == 1){
            return (<div>내부참조<S.TabNumberDiv>
                {visibleContent ? signRefer.length.toString() : 0}
            </S.TabNumberDiv></div>
            );
        } else if(state == 2){
            return (<div>문서정보</div>)
        } else if(state == 3){
            return (<div>문서이력<S.TabNumberDiv>{dsSelector.sign_comment ? dsSelector.sign_comment.length : "0"}</S.TabNumberDiv></div>)
        }
    }
    if(props.isOffline)
        return (
            <S.TabBlock>
                <S.TabBtns TabIndicatorProps={{style : {background : "#4B5964"}}} value={state} onChange={onChangeTab}>
                    <S.TabBtn value={0} label={getTabBtnLabel(0)} />;
                </S.TabBtns>
                {getContent()}
            </S.TabBlock>
        );
    else
        return (
            <S.TabBlock>
                <S.TabBtns TabIndicatorProps={{style : {background : "#4B5964"}}} value={state} onChange={onChangeTab}>
                    <S.TabBtn value={0} label={getTabBtnLabel(0)} />;
                    <S.TabBtn value={1} label={getTabBtnLabel(1)} />
                    <S.TabBtn value={2} label={getTabBtnLabel(2)} />
                    <S.TabBtn value={3} label={getTabBtnLabel(3)} />
                </S.TabBtns>
                {getContent()}
            </S.TabBlock>
        );
}