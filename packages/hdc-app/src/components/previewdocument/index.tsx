/******************************************************************************
 * appwrapper/index.tsx
 * hooks :
    * useLocations 
    *
 ******************************************************************************/
// Library
import { useSelector, useDispatch } from "react-redux"; // redux
import { useState, useEffect, useContext, ChangeEvent } from "react"; // default hooks
//
// Module
import * as S from "./styled";
import { useLocations } from "hooks" // locations hooks
import { reducerState } from "../../common";
import { Html2CanvasComponent } from "components";
//
export type PreviewDocumentProps = {
    style ?: object;
    children ?: React.ReactNode;
    visible : boolean;
    onClose : ()=>void;
    element : any;
    class_name ?: string;
}
interface FinalPreviewDocumentProps extends PreviewDocumentProps {};

export const PreviewDocumentComp : React.FunctionComponent<FinalPreviewDocumentProps> = ( props )=>{
    const dispatch = useDispatch();
    const { pushHistory } = useLocations();
    const dsSelector = useSelector((state:reducerState)=>state.digitalsign);
    const [htmlImgList, setHtmlImgList] = useState<ImageData[]>([]);

    useEffect(() => {
        if(props.visible)
            setTimeout(async() => {
                if(props.class_name){
                    let _list = await Html2CanvasComponent({ elementId : "", class_name : props.class_name });
                    // console.log(_list);
                    if(_list) setHtmlImgList([..._list]);
                }
            }, 0);
    }, [props.element]);

    return (
        <S.Block
            open={props.visible ? true : false}
            onClose={props.onClose}
            >
            <S.Inner dangerouslySetInnerHTML={{ __html : props.element }}>
                
            </S.Inner>
        </S.Block>
    );
}