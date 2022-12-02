import html2canvas  from "html2canvas";

export type Html2CanvasProps = {
    elementId : string;
    class_name ?: string;
}
interface FinalHtml2CanvasProps extends Html2CanvasProps {};
export const Html2CanvasComponent = async ( props : FinalHtml2CanvasProps )=>{
    var el = document.getElementById(props.elementId);
    if(props.class_name){
        let el_list = document.getElementsByClassName(props.class_name);
        if(el_list.length > 0) el = el_list[0] as HTMLElement;
    }

    console.log(props.class_name, el)
    let img_list = [];
    if(el){
        const canvas = await html2canvas(el, { width: el.scrollWidth, height: el.scrollHeight , useCORS : true })
        var imgWidth = 210;
        var pageHeight = imgWidth * 1.414;
        var imgHeight = canvas.height * imgWidth / canvas.width;
        var heightLeft = imgHeight;
        
        var position = 0;

        heightLeft -= pageHeight;
        while(heightLeft >= 0){
            let context = canvas.getContext("2d");
            if(context){
                position = heightLeft - imgHeight;
                var data = context.getImageData(5, position, imgWidth, pageHeight);
                img_list.push(data);
                heightLeft -= pageHeight;
            }
        }
        console.log(img_list)
        return img_list;
    }
    return null;
}