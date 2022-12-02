import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export type Html2PDFProps = {
    elementId: string;
    classId?: string;
    filename?: string;
    element?: any;
    whiteSpace?: number;
    isSave?: boolean;
    extraClass?: string;
    extraId?: string;
    scrollHeight?: number;
};
interface FinalHtml2PDFProps extends Html2PDFProps {}
export const Html2PdfComponent = async (
    props: FinalHtml2PDFProps
): Promise<any | null> => {
    var el = document.getElementById(props.elementId);
    if (props.classId && props.classId.length > 0) {
        let el_list = document.getElementsByClassName(props.classId);
        if (el_list.length > 0) el = el_list[0] as HTMLElement;
    }
    if (props.element) el = props.element;
    let res = await new Promise((r) => {
        if (el) {
            el.setAttribute(
                "style",
                "width:1080px; margin:0; line-height: 160%"
            );
            el.setAttribute("class", "form_wrapper");
            el.setAttribute("id", props.extraId ? props.extraId : "");
            if (props.extraClass) el.classList.add(props.extraClass);
            html2canvas(el, {
                width: 1080,
                height: props.scrollHeight
                    ? props.scrollHeight
                    : el.scrollHeight,
                useCORS: true,
            }).then((canvas) => {
                const imgData = canvas.toDataURL("image/png", 1.0);
                var imgWidth = 210;
                var pageHeight = imgWidth * 1.414;
                var imgHeight = (canvas.height * imgWidth) / canvas.width;
                var heightLeft = imgHeight;
                const pdf = new jsPDF("p", "mm", "a4", 1);
                const widthSpace = props.whiteSpace ? props.whiteSpace : 0;
                var position = props.whiteSpace ? props.whiteSpace : 0;
                pdf.addImage(
                    imgData,
                    "PNG",
                    widthSpace,
                    position,
                    imgWidth - widthSpace * 2,
                    imgHeight - widthSpace * 2,
                    "",
                    "FAST"
                );

                heightLeft -= pageHeight;
                while (heightLeft >= 0) {
                    position = heightLeft - imgHeight;
                    pdf.addPage();
                    pdf.addImage(
                        imgData,
                        "PNG",
                        widthSpace,
                        position,
                        imgWidth - widthSpace * 2,
                        imgHeight - widthSpace * 2,
                        "",
                        "FAST"
                    );
                    heightLeft -= pageHeight;
                }
                if (props.isSave)
                    pdf.save(props.filename ? props.filename : "preview.pdf");
                // console.log(imgData);
                r(imgData);
            });
        }
    });
    if (el) el.setAttribute("style", "");
    return res;
};
