/******************************************************************************
 * Copyright (c) 2021. Moornmo Inc. Rights reserved.                          *
 * Data modelings and methods used are assets of Moornmo Inc.                 *
 * pdftronviewer/index.tsx
 * hooks :
 *
 * last modify : jh.jeong@ilts.co.kr
 ******************************************************************************/
// Library
import { useSelector, useDispatch } from "react-redux"; // redux
import { useState, useEffect, useContext, ChangeEvent, useRef } from "react"; // default hooks
import { useAsyncEffect } from "hooks";
import WebViewer from "@pdftron/webviewer";
import path from "path";
//
// Module
//

export type PdftronViewerProps = {
    
};

interface FinalPdftronViewerProps extends PdftronViewerProps {}

export const PdftronViewer: React.FunctionComponent<FinalPdftronViewerProps> = props => {
    const viewerRef = useRef<HTMLDivElement>(null);

    useAsyncEffect(async () => {
        await WebViewer({
            path:  '/webviewer/lib',
            initialDoc:
                "/assets/files/1.pptx",
        }, viewerRef.current as HTMLDivElement);
    }, [viewerRef]);

    return <div className="pdftron-viewer" style={{ width: "100%", height: "100%" }} ref={viewerRef}></div>;
};
