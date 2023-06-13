/******************************************************************************
 * multitabwrapper/index.tsx
 * hooks :
    * useLocations 
    *
 ******************************************************************************/
// Library
import React, { useState, useEffect, ChangeEvent, useRef } from "react"; // default hooks
import { useHistory } from "react-router-dom";
// import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
// import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

//
// Module
//

export type PDFViewerProps = {
    filePath ?: string
}
interface FinalPDFViewerProps extends PDFViewerProps {};

const formatParams = ( params : any ) =>{
    return "?" + Object
          .keys(params)
          .map(function(key){
            return key+"="+encodeURIComponent(params[key])
          })
          .join("&")
}

export const PDFViewerComponent : React.FunctionComponent<FinalPDFViewerProps> = ( props )=>{
    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageNumber, setPageNumber] = useState<number>(1);

    const onDocumentLoadSuccess = ({ numPages } : { numPages : number} ) => {
        setNumPages(numPages);
    }
    return (
        <div style={{width : "100%", height : "100%"}}>
            {/* <Document 
                file={{
                    url : props.filePath+ formatParams({
                        access_token : window.localStorage.getItem("access_token"),
                        refresh_token : window.localStorage.getItem("refresh_token")
                    }),
                    withCredentioals : true
                }}
                onLoadSuccess={onDocumentLoadSuccess}
                >
                <Page pageNumber={ pageNumber } />
            </Document> */}
            <p>Page {pageNumber} of {numPages}</p>
        </div>
    );
}