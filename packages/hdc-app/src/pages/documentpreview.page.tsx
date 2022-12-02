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
} from "../common/action";
import { 
    
} from "../components";
import { ModalInfo, LoadingIndicatorComponent } from "components";
import { useLocations } from "hooks";
import * as S from "../styled/documentview.styled";
//

type paramTypes ={
    id ?: string;
}

const DocumentPreviewPage = (props : any)=> {
    const dispatch = useDispatch();
    const dsSelector = useSelector((state : reducerState)=> state.digitalsign);
    const userSelector = useSelector((state : reducerState)=> state.user);
    const {pushHistory, back} = useLocations();
    const [docText, setDocText] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { id } = useParams<paramTypes>();

    useEffect(() => {
        if(id && typeof parseInt(id) == "number"){
            dispatch(GetSign(id));
        } else {
            back();
        }
    }, []);

    useEffect(() => {
        if(dsSelector.sign_data){
            setDocText(dsSelector.sign_data.html);
        }
    }, [ dsSelector.sign_data ]);

    return (
        <div style={{width:"100%"}}>
            <LoadingIndicatorComponent open={isLoading} />
            <S.DocumentContent
            dangerouslySetInnerHTML={{ __html : docText }}
            ></S.DocumentContent>
        </div>
    );
};

export default DocumentPreviewPage;