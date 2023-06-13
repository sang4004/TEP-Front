/******************************************************************************
 * hooks :
    * useLocations 
 * components : 
    * 
 ******************************************************************************/
//Library
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { getMoment } from "../common/utils";
const moment = getMoment();
//
//Module
import { reducerState } from "../common";
import { useLocations } from "hooks";
import { DocumentListComp } from "../components/documentlist";
import { GetOfflineSignList, GetSignCompleteList, GetSignFormDetailList } from "../common/action";
import { getSignStatusText } from "../common/utils";
//
// antd components

const headsize = [0,5,10,15,15,35,5,5,10];

//
const SignCompleteList = ()=> {
    const dispatch = useDispatch();
    const userSelector = useSelector((state: reducerState) => state.user);
    const dsSelector = useSelector((state : reducerState)=> state.digitalsign);
    const history = useHistory();
    const {path, pushHistory} = useLocations();
    
    const [datas, setDatas] = useState<any[]>([]);
    const [searchtype, setSearchType] = useState<string[]>([]);

    useEffect(() => {
        dispatch(GetOfflineSignList());
        dispatch(GetSignCompleteList());
        dispatch(GetSignFormDetailList());
    }, [ path ]);

    useEffect(() => {
        let _list = [];
        if(dsSelector.sign_complete_list.length > 0){
            let count = 0;
            for(var d of dsSelector.sign_complete_list){
                _list.push({
                    id : d.id,
                    idx : count,
                    "구분" :d.document_type,
                    "기안일" : moment(d.date).format("YYYY-MM-DD HH:mm"),
                    "문서양식" : d.form?d.form:"오프라인문서",
                    "문서번호" : d.document_code,
                    "제목" : d.title,
                    "기안자" : d.creator,
                    "최종결재자" : d.last_signer,
                    "상태" : d.is_general_doc && d.sended_at ? "발송완료" : getSignStatusText(d.sign_state, false),
                });
                count += 1;
            }
        }else{
            _list.push({
                id : -1,
                idx : 0,
                "구분" : null,
                "기안일" : null,
                "문서양식" : null,
                "문서번호" : null,
                "제목" : null,
                "기안자" : null,
                "최종결재자" : null,
                "상태" : null,
            })
        }
        setSearchType(["제목", "문서번호","기안자"]);
        setDatas([..._list]);
    }, [dsSelector.sign_complete_list]);
    

    const onClickTitle = (idx : number)=>{
        let data = dsSelector.sign_complete_list[idx];
        let id = data.id;
        let off = dsSelector.offline_sign_list.filter((raw:any)=>raw.id == id && raw.title == data.title);
        if(off.length < 1){
            if(data.is_general_doc)
                pushHistory("/document/normal/complete/" + id);    
            else
                pushHistory("/document/complete/" + id);
        }else pushHistory("/document/offcomplete/" + id);
    }

    return (
        <SignedCompletePage>
            <DocumentListComp 
                data={datas}
                alldata={dsSelector.sign_complete_list}
                checkStyle={{width : "5%"}}
                headStyle={{ backgroundColor : "transparent", color :"black"}}
                style={{backgroundColor : "transparent", boxShadow : "none"}}
                headSize={headsize}
                formlist={dsSelector.sign_form_detail_list}
                onClickTitle={onClickTitle}
                searchlist={searchtype}
                titleIdx={2}
                />
        </SignedCompletePage>
    );
};

const SignedCompletePage = styled.div`
	display : flex;
	justify-content : center;
	align-items : center;
	flex-direction : column;
	width : 100%;
	height : 100%;
`;

export default SignCompleteList;