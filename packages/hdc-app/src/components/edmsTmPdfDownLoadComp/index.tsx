/******************************************************************************
 * Copyright (c) 2021. Moornmo Inc. Rights reserved.                          *
 * Data modelings and methods used are assets of Moornmo Inc.                 *
 * projecttreemodal/index.tsx
 * hooks :
 * useLocations
 *
 * last modify : jh.jeong@ilts.co.kr
 ******************************************************************************/
// React
import React, { useState, useEffect } from "react"; // default hooks
//
import { Html2PdfComponent, LoadingIndicatorComponent } from "components";
//
import { getMoment } from "../../common/utils";

const moment = getMoment();

export type edmsTmPdfDownLoadCompProps = {
    style?: object;
    visible: boolean;
    onClose: () => void;
    htmlData: any;
    htmlDataResult: any;
    isType: "SHIN" | "HENC";
    isPreview: boolean;
};
interface FinaledmsTmPdfDownLoadCompProps extends edmsTmPdfDownLoadCompProps {}

export const EdmsTmPdfDownLoadComp: React.FunctionComponent<
    FinaledmsTmPdfDownLoadCompProps
> = props => {
    // Props data variable
    const [data, setData] = useState<any>(null);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    // Set Props data
    useEffect(() => {
        if (props.visible) {
            setIsLoading(true);
            setData(props.htmlDataResult);
        }
    }, [props.visible]);

    useEffect(() => {
        if (data) {
            switch (props.isType) {
                case "HENC":
                    onClickDownloadHENC();
                    break;
                case "SHIN":
                    onClickDownloadSHIN();
                    break;
                default:
                    break;
            }
        }
    }, [data]);

    const onClose = () => {
        setIsLoading(false);
        props.onClose();
    };

    const setHeight = () => {
        var tot_height = 1080 * 1.414;
        var header = document.getElementById("pdf_doc_header");
        var body = document.getElementById("pdf_doc_body");
        var footer = document.getElementById("pdf_doc_footer");
        var height = 0;
        if (header && body) height += body.clientHeight + header.clientHeight;
        if (footer) height += footer.clientHeight;
        return [height, tot_height, Math.floor(height / tot_height)];
    };

    // 한화
    const onClickDownloadHENC = async () => {
        var div = document.createElement("div");
        div.innerHTML = props.htmlData ? props.htmlData.trim() : "";
        let el = document.body.appendChild(div);
        let pdfName = data.docu_code;
        let [height, tot_height, divide] = setHeight();
        let footer = $(div).find("#pdf_doc_footer");
        // if (height > tot_height)
        //     footer.css("margin-top", height * divide - 600);
        // else footer.css("margin-top", (tot_height - height - 310 - 600) + "px"); // 310 => bottom big div total height

        let result = await Html2PdfComponent({
            elementId: "",
            element: div,
            filename: pdfName,
            whiteSpace: 0,
            isSave: props.isPreview ? false : true,
        });

        if (props.isPreview) onClickPreview(result);
        if (result) {
            document.body.removeChild(el);
            onClose();
        }
    };

    //신한
    const onClickDownloadSHIN = async () => {
        var div = document.createElement("div");
        div.innerHTML = props.htmlData ? props.htmlData.trim() : "";
        let el = document.body.appendChild(div);
        let pdfName = data.docu_code;

        let result = await Html2PdfComponent({
            elementId: "",
            element: div,
            filename: pdfName,
            whiteSpace: 0,
            isSave: props.isPreview ? false : true,
            extraId: "shinhan_tr",
        });

        if (props.isPreview) onClickPreview(result);
        if (result) {
            document.body.removeChild(el);
            onClose();
        }
    };

    const onClickPreview = (res: any) => {
        var header = document.head.innerHTML;
        var pre = window.open(
            "",
            "1429893142534",
            "width=1080px,height=1528,toolbar=0,menubar=0,location=0,status=0,scrollbars=1,resizable=0,left=0,top=0"
        );
        pre?.document.write(header);
        pre?.document.write(`<div class="form_wrapper overflowAuto"><img src="${res}" /></div>`);
        pre?.document.close();
    };

    return (
        <>
            <LoadingIndicatorComponent open={isLoading} />
        </>
    );
};
