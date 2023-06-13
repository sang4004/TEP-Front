/******************************************************************************
 * appwrapper/index.tsx
 * hooks :
    * useLocations 
    *
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
    SetGeneralDocSignLine
} from "../../common/action";
import { reducerState } from "../../common";
import TalkIconSvg from "../../images/fontawsomeicon/talk-solid-gray.svg";
import hoverbtn from "../../images/btn/arrow_gray_hover.svg";
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

export type generalDocumentSideMenuProps = {
    style ?: object;
    children ?: React.ReactNode;
    signLines : any[];
    signRefers : any[];
    onChangeLine ?: (LineOrder : number[])=>void;
    isRequested ?: boolean;
    isReceived ?: boolean;
}
interface FinalgeneralDocumentSideMenuProps extends generalDocumentSideMenuProps {};

export const GeneralDocumentSideMenuComponent : React.FunctionComponent<FinalgeneralDocumentSideMenuProps> = ( props )=>{
    const dispatch = useDispatch();
    const dsSelector = useSelector((state:reducerState)=>state.digitalsign);

    const [state, setState] = useState<number>(0);
    const [signLine, setSignLine] = useState<any[]>([]);
    const [signLineOrder, setSignLineOrder] = useState<number[]>([]);
    const [signRefer, setSignRefer] = useState<object[]>([]);
    const [signRegister, setSignRegister] = useState<string>("");
    const [docInfo, setDocInfo] = useState<any>({});

    useEffect(() => {
        if(props.onChangeLine)
            props.onChangeLine(signLineOrder);
    }, [signLineOrder]);

    useEffect(() => {
        if(dsSelector.gDoc_data){
            setDocInfo({
                doc_id : dsSelector.gDoc_data.code_no,
                send : dsSelector.gDoc_data.doc_sender,
                title : dsSelector.gDoc_data.title,
                sendUser : dsSelector.signed_user && dsSelector.signed_user.length > 0 ? `${dsSelector.signed_user[0].position} ${dsSelector.signed_user[0].username}` : ``,
                sendedAt : dsSelector.gDoc_data.sended_at,
                // receivedAt : dsSelector.gDoc_data.registed_at
            });
        }
    }, [ dsSelector.gDoc_data ]);

    useEffect(() => {
        if(dsSelector.gDoc_sign_line){
            let _line : object[] = [];
            let _ids : number[] = [];
            for(var l of [...dsSelector.gDoc_sign_line]){
                if (_ids.indexOf(l.user_id) != -1) continue;
                _ids.push(l.user_id);
                _line.push(l);
            }
            setSignLineOrder([..._ids]);
            setSignLine([..._line]);
        }
    }, [ dsSelector.gDoc_sign_line ]);

    useEffect(() => {
        try{
            if(dsSelector.gDoc_register != undefined){
                setSignRegister(dsSelector.gDoc_register.map((raw:any,idx:number)=>`${raw.username} ${raw.position}`).join("\n"));
            }
        }catch(err){console.log(err)}
    }, [dsSelector.gDoc_register]);

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
        dispatch(SetGeneralDocSignLine(dsSelector.gDoc_data.id, [..._line]));
    }

    const getContent = ()=>{
        if(state == 0){
            if(props.isReceived) 
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
                    {dsSelector.gdoc_sign_comment && dsSelector.gdoc_sign_comment.map((raw: any, idx: number) => {
                        return (
                                <S.RejectRow>{raw.position} {raw.username}{` : `+raw.comment}</S.RejectRow>
                        );
                    })}
                    </S.RejectContent>
                </S.ContentDiv>
            );
        } else if(state == 1) {
            return (
                <S.Content>
                    <S.DocumentInfo>
                        <li>
                            <S.DocumentReferer>
                            {signRefer.length > 0 && signRefer.map((raw : any,idx : number)=>{
                                return (
                                    <div key={idx}>{raw.company} {raw.part} {raw.name}</div>
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
                            <h3>문서번호</h3>
                            <p>{docInfo.doc_id ? docInfo.doc_id : ""}</p>
                        </li>
                        <li>
                            <h3>제목</h3>
                            <p>{docInfo.title}</p>
                        </li>
                        <li>
                            <h3>기안자</h3>
                            <p>{docInfo.sendUser}</p>
                        </li>
                        <li>
                            <h3>발신일자</h3>
                            <p>{docInfo.sendedAt && moment(docInfo.sendedAt).format("YYYY-MM-DD HH:mm")}</p>
                        </li>
                        {/* <li>
                            <h3>수신일자</h3>
                            <p>{docInfo.receivedAt && moment(docInfo.receivedAt).format("YYYY-MM-DD HH:mm")}</p>
                        </li> */}
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
                        {dsSelector.gdoc_sign_comment && dsSelector.gdoc_sign_comment.map((raw : any, idx : number)=>{
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
        } 
        // else if(state == 1){
        //     return (<div>내부참조<S.TabNumberDiv>{signRefer.length.toString()}</S.TabNumberDiv></div>);
        // } 
        // else if(state == 2){
        //     return (<div>문서정보</div>)
        // } 
        // else if(state == 3){
        //     return (<div>문서이력<S.TabNumberDiv>{dsSelector.gdoc_sign_comment ? dsSelector.gdoc_sign_comment.length : "0"}</S.TabNumberDiv></div>)
        // }
    }

    return (
        <S.TabBlock>
            <S.TabBtns TabIndicatorProps={{style : {background : "#4B5964"}}} value={state} onChange={onChangeTab}>
                <S.TabBtn value={0} label={getTabBtnLabel(0)} />;
                {/* <S.TabBtn value={1} label={getTabBtnLabel(1)} /> */}
                {/* <S.TabBtn value={2} label={getTabBtnLabel(2)} /> */}
                {/* <S.TabBtn value={2} label={getTabBtnLabel(2)} /> */}
            </S.TabBtns>
            {getContent()}
        </S.TabBlock>
    );
}