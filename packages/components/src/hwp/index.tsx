/******************************************************************************
 * Copyright (c) 2021. Moornmo Inc. Rights reserved.                          *
 * Data modelings and methods used are assets of Moornmo Inc.                 *
 * multitabwrapper/index.tsx
 * hooks :
    * useLocations 
    *
 * last modify : jh.jeong
 ******************************************************************************/
// Library
import React, { useState, useEffect, ChangeEvent, useRef } from "react"; // default hooks
import { useHistory } from "react-router-dom";
// import { Viewer } from "hwp.js";
import { useAsyncEffect } from "hooks";
//
// Module
//

export type HWPViewerProps = {
    filePath ?: string
}
interface FinalHWPViewerProps extends HWPViewerProps {};

const formatParams = ( params : any ) =>{
    return "?" + Object
          .keys(params)
          .map(function(key){
            return key+"="+encodeURIComponent(params[key])
          })
          .join("&")
}

export const HWPViewerComponent : React.FunctionComponent<FinalHWPViewerProps> = ( props )=>{
    const hwpEl = useRef<HTMLDivElement | null>(null);

    useAsyncEffect(async () => {
        if(hwpEl.current != null){
            try{
                let res = await fetch(props.filePath + formatParams({
                    access_token : window.localStorage.getItem("access_token"),
                    refresh_token : window.localStorage.getItem("refresh_token")
                }));
                let arrayBuf = await res.arrayBuffer();
                const array = new Uint8Array(arrayBuf);
                // new Viewer(hwpEl.current, array, { type: 'array' })
            }catch(err){ console.log(err); }
        }
    }, [hwpEl]);
    
    return (
        <div style={{width : "100%", height : "100%"}} ref={hwpEl}>
        </div>
    );
}