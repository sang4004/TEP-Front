/******************************************************************************
 * Copyright (c) 2021. Moornmo Inc. Rights reserved.                          *
 * Data modelings and methods used are assets of Moornmo Inc.                 *
 * appwrapper/index.tsx
 * hooks :
    * useLocations 
    *
 * last modify : jh.jeong@ilts.co.kr
 ******************************************************************************/
// Library
import { useSelector, useDispatch } from "react-redux"; // redux
import { useState, useEffect, useRef } from "react"; // default hooks
//
import { 
    SetGeneralDocCode,
    UploadGeneralDocCodeFile,
    EditGeneralDocCode,
    DeleteGeneralDocCode
} from "../../common/action";
// Module
import * as S from "./styled";
import Close from "@material-ui/icons/Close";

import { reducerState } from '../../common/store';
//
export type generalFormTypeSelectProps = {
    style?: object;
    children?: React.ReactNode;
    visible: boolean;
    onClose: () => void;
    isEdit ?: boolean;
    editType ?: any;
    title : string;
}

interface FinalgeneralFormTypeSelectProps extends generalFormTypeSelectProps { };

export const GeneralDocType: React.FunctionComponent<FinalgeneralFormTypeSelectProps> = (props) => {
    const dispatch = useDispatch();
    const dsSelector = useSelector((state:reducerState)=>state.digitalsign);

    const [code, setCode] = useState<string>("");
    const [text, setText] = useState<string>("");
    const [fileInput, setFileInput] = useState<HTMLInputElement | null>(null);
    const [fileName, setFileName] = useState<any>();

    useEffect(() => {
        if(dsSelector.gDoc_code_file)
            setFileName(dsSelector.gDoc_code_file);
    }, [ dsSelector.gDoc_code_file ]);

    useEffect(() => {
        if(props.editType){
            setText(props.editType.text);
        }
    }, [props.editType]);

    const onClickConfirm = async () => {
        if(props.isEdit){
            await dispatch(EditGeneralDocCode(props.editType.id, text));
        } else {
            await dispatch(SetGeneralDocCode(text));
        }
        setTimeout(() => {
            props.onClose();
        }, 700);
    }

    const onClickDelete = async()=>{
        if(props.editType) {
            await dispatch(DeleteGeneralDocCode(props.editType.id))
            setTimeout(() => {
                props.onClose();
            }, 700);
        }
    }

    const onClose = () => {
        props.onClose();
    }

    const handleUploadClick = async (event : any)=>{
        var _file = event.target.files[0];
        await dispatch(UploadGeneralDocCodeFile(_file));
    }

    const onClickUploadFile = ()=>{
        if(fileInput)
            fileInput.click();
    }

    const onClickDeleteFile = (key : number)=>{
        setFileName(null);
        // dispatch(DeleteAttachGeneralDocFile(key));
    }

    return (
        <S.Block
            open={props.visible ? true : false}
            onClose={props.onClose}
            >
            <S.Inner>
                <S.Title>{props.title}</S.Title>
                <S.CloseBtn onClick={onClose}>
                    <Close fontSize="large"/>
                </S.CloseBtn>
                <S.Content>
                    {/* <S.Textfield>문서코드를 입력해주세요</S.Textfield>
                    <S.DocType
                        type={"tel"}
                        value={code}
                        onChange={(e)=>setCode(e.target.value)}
                        InputProps={{
                            disableUnderline: true
                        }}
                    /> */}
                    <S.Textfield>문서종류를 입력해주세요</S.Textfield>
                    <S.DocType
                        value={text}
                        onChange={(e)=>setText(e.target.value)}
                        InputProps={{
                            disableUnderline: true
                        }}
                    />
                    {/* <S.Textfield>문서양식을 등록해주세요</S.Textfield>
                    <S.FileDiv>
                        <S.FileList>
                            {fileName && 
                            <div>
                                <S.FileClip src={ClipSvg} />
                                <a 
                                    href={fileName.url}
                                    download={fileName.filename}
                                    >{fileName.filename}</a>
                                <S.FileDelete src={CloseSvg} onClick={()=>onClickDeleteFile(fileName.id)} />
                            </div>
                            }
                        <input
                            accept="*"
                            id="contained-button-file"
                            type="file"
                            style={{ display: "none" }}
                            onChange={handleUploadClick}
                            ref={(ref) => setFileInput(ref)}
                            onClick={(event : any)=>{event.target.value = null}}
                        />
                    </S.FileList>
                    <S.AddButton onClick={() => onClickUploadFile()}>+</S.AddButton>
                    </S.FileDiv> */}
                </S.Content>
                <S.Btn onClick={onClickConfirm}>{props.isEdit ? "수정" : "확인"}</S.Btn>
                {props.isEdit && <S.Btn onClick={onClickDelete}>{"삭제"}</S.Btn>}
            </S.Inner>
        </S.Block>
    );
}