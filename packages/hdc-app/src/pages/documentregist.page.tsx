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
import React, { useState, useEffect, useContext, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
//
//Module
import { reducerState } from "../common";
import { 
    GetSign,
    ChangeDocumentFormState
} from "../common/action";
import { 
    DocumentMenuComponent,
    DocumentSideMenuComponent,
    DocumentFormComp,
} from "../components";
import { ModalInfo, LoadingIndicatorComponent } from "components";
import { useLocations } from "hooks";
import * as S from "../styled/documentview.styled";
import ClipSvg from "../images/fontawsomeicon/paperclip-solid.svg";
//

type paramTypes ={
    id ?: string;
}

const DocumentRegistPage = (props : any)=> {
    const dispatch = useDispatch();
    const dsSelector = useSelector((state : reducerState)=> state.digitalsign);
    const {pushHistory, back} = useLocations();
    const [docText, setDocText] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { id } = useParams<paramTypes>();
    const [signLineList, setSignLineList] = useState<object[]>([]);
    const [signReferList, setSignReferList] = useState<object[]>([]);
    const [fileNames, setFileNames] = useState<string[]>([]);

    const [isPrint, setIsPrint] = useState<boolean>(false);
    const [isHtmlFlag, setIsHtmlFlag] = useState<boolean>(false);
    const [signHTML, setSignHTML] = useState<string>("");
    const [headerHTML, setHeaderHTML] = useState<string>("");
    const [footerHTML, setFooterHTML] = useState<string>("");

    useEffect(() => {
        if(id && typeof parseInt(id) == "number"){
            dispatch(GetSign(id));
        } else {
            back();
        }
        dispatch(ChangeDocumentFormState( false ));
    }, []);

    useEffect(() => {
        if(isLoading && isHtmlFlag){
            if(isPrint){
                var header = document.head.innerHTML;
                var pre = window.open("","_blank");
                pre?.document.write(header);
                pre?.document.write(headerHTML + signHTML + footerHTML);
                pre?.document.close();
                setTimeout(() => {
                    pre?.print();
                }, 500);
                setIsPrint(false);
            }
            setIsLoading(false);
            setIsHtmlFlag(false);
        }
    }, [signHTML]);

    useEffect(() => {
        if(dsSelector.sign_data){
            setDocText(dsSelector.sign_data.html);
            setTimeout(() => {
                setIsHtmlFlag(true);
                setTimeout(() => {
                    setIsHtmlFlag(false);
                }, 500);
            }, 500);
        }
        if(dsSelector.sign_line){
            let line = [];
            for(var l of dsSelector.sign_line){
                let _obj : any = {};
                _obj.id = l.user_id;
                _obj.username = l.username;
                _obj.groupname = l.groupname;
                _obj.email = l.email;
                _obj.user_id = l.user_id;
                if(l.state)
                    _obj.state = parseInt(l.state);
                line.push(_obj);
            }
            setSignLineList([...line]);
        }
        if(dsSelector.sign_refer){
            let refer = [];
            for(var l of dsSelector.sign_refer){
                let _obj : any = {};
                _obj.id = l.user_id;
                _obj.name = l.name;
                _obj.part = l.part;
                _obj.company = l.company;
                _obj.user_id = l.user_id;
                if(l.state)
                    _obj.state = parseInt(l.state);
                refer.push(_obj);
            }
            setSignReferList([...refer]);
        }
    }, [ dsSelector.sign_data ]);

    useEffect(() => {
        if(dsSelector.sign_files){
            setFileNames([...dsSelector.sign_files]);
        }
    }, [ dsSelector.sign_files ]);

    const onClickCancel = async()=>{
        back();
    };

    const onClickPrint = () => {
        setIsLoading(true);
        setIsHtmlFlag(true);
        setIsPrint(true);
    };

    const AddSign = (html : string, header : string, footer : string) => {
        setHeaderHTML(header);
        setFooterHTML(footer);
        setSignHTML(header + html + footer);
    }

    return (
        <S.Block>
            <LoadingIndicatorComponent open={isLoading} />
            <S.Bg $isMain={true}>
                <S.EnterTop>
                    <DocumentMenuComponent 
                        onClickCancel={onClickCancel}
                        onClickPrint={onClickPrint}
                        // activePrint
                        activePDF
                        docRegist
                        html={signHTML}
                        />
                </S.EnterTop>
                <S.DocumentContent>
                    <DocumentFormComp
                        onChangeContent={(str)=>setDocText(str)} 
                        formId={dsSelector.new_form_id} 
                        html={docText}
                        disableEdit={true}
                        isComplete
                        isHtmlFlag={isHtmlFlag}
                        AddSign={AddSign}
                        />
                </S.DocumentContent>
                <S.EnterBottom>
                <S.FileView>
                        <div>첨부파일 {fileNames.length}개</div>
                        {fileNames?.length > 0 && fileNames.map((raw: any, idx) => {
                            return (
                                <div key={idx}>
                                    <img src={ClipSvg} /><a href={raw.fileurl} download={raw.filename}>{raw.filename}</a>
                                </div>
                            )
                        })}
                    </S.FileView>
                    <S.BtmBtn $color={"#EB5539"} $disabled={true}>접수완료</S.BtmBtn >
                </S.EnterBottom>
            </S.Bg>
            <S.Bg $isMain={false}>
                <DocumentSideMenuComponent 
                    signLines={signLineList}
                    signRefers={signReferList}
                    isRequested
                    />
            </S.Bg>
        </S.Block>
    );
};

export default DocumentRegistPage;