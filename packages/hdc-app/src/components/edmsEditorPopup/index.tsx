/******************************************************************************
 * appwrapper/index.tsx
 * hooks :
 * useLocations
 *
 ******************************************************************************/
// Library
import React, { useState, useEffect } from "react"; // default hooks
import { useDispatch, useSelector } from "react-redux";
//
import { WebEditorComponent, ModalInfo } from "components";
import { UploadEdmsWorkAttachFile, CleanEdmsWorkAttachFile } from "../../common/action";
import { domain } from "../../common/network";
import { FileDropComp } from "../";
import { Rnd } from "react-rnd";
// Module
import * as S from "./styled";
//
import Close from "@material-ui/icons/Close";
import { reducerState } from "../../common/store";

const readURL = (file: File): Promise<string> => {
    return new Promise((res, rej) => {
        const reader = new FileReader();
        reader.onload = (e: any) => res(e.target.result);
        reader.onerror = e => rej(e);
        reader.readAsDataURL(file);
    });
};

export type EdmsEditorPopup = {
    style?: object;
    children?: React.ReactNode;
    visible: boolean;
    content: string;
    image ?: string;
    onChange: (str: string, delFile?: boolean) => void;
    onClose: () => void;
    is_reply: boolean;
};

interface FinalEdmsEditorPopup extends EdmsEditorPopup {}

let text = "";
export const EdmsEditorPopup: React.FunctionComponent<FinalEdmsEditorPopup> = props => {
    let fileRes = [];
    const dispatch = useDispatch();
    const workSelector = useSelector((state: reducerState) => state.work);
    const [isDragOver, setIsDragOver] = useState<boolean>(false);
    const [files, setFiles] = useState<File[]>([]);
    const [fileInput, setFileInput] = useState<HTMLInputElement | null>(null);
    const [nowImage, setNowImage] = useState<string>("");

    useEffect(() => {
        if (props.content && props.content.length > 0) {
            text = props.content;
            if(props.image) setNowImage(props.image);
            else setNowImage("");
        }
    }, [props.visible, props.content]);

    useEffect(() => {
        if (workSelector.edms_work_attach_file && workSelector.edms_work_attach_file.length > 0) {
            let file = workSelector.edms_work_attach_file[0];
            setNowImage(file.file_path);
            // props.onChange(text + imageText, true);
        }
    }, [workSelector.edms_work_attach_file]);

    const onClickConfirm = () => {
        props.onChange(text);
    };

    const handleUploadClick = (event: any) => {
        var _file = event.target.files[0];
        if (_file) {
            if (files.filter(obj => obj.name == _file.name).length == 0) files.push(_file);
            dispatch(UploadEdmsWorkAttachFile([_file]));
            setFiles([...files]);
        }
    };

    const onClickUploadFile = () => {
        if (fileInput) fileInput.click();
    };

    const handleFileDrop = (dropFiles: FileList) => {
        if (dropFiles.length > 0) {
            const file = dropFiles[0];
            if (file.size > 20971520) {
                return ModalInfo("최대 이미지 용량 20mb를 넘었습니다.");
            } else if (
                file.type !== "application/pdf" &&
                file.type !== "application/wps-office.pdf" &&
                file.type !== "application/pdf" &&
                file.type !== "image/jpg" &&
                file.type !== "image/jpeg" &&
                file.type !== "image/png"
            ) {
                return ModalInfo("이미지 파일이 아닙니다.");
            } else {
                console.log("file valid");
            }
            dispatch(UploadEdmsWorkAttachFile([file]));
            setFiles([...files, file]);
        }
    };

    const onDeleteImage = ()=>{
        dispatch(CleanEdmsWorkAttachFile());
        setNowImage("");
        props.onChange(text, true);
    }

    if (props.visible == false) return <></>;
    return (
        <Rnd
            default={{
                x: 100,
                y: 100,
                width: 480,
                height: 600,
            }}
            bounds="window"
            style={{ zIndex: 6 }}
            dragHandleClassName="drag-handle-element"
        >
            <S.Block>
                <S.Inner>
                    <S.ModalHeader className="drag-handle-element">
                        <S.HeaderTitle>{props.is_reply ? "Reply" : "Comment"} 작성</S.HeaderTitle>
                        <S.ModalCloseBtn onClick={props.onClose}>
                            <Close style={{fontSize : "1.6em"}} />
                        </S.ModalCloseBtn>
                    </S.ModalHeader>
                    <input
                        accept="*"
                        id="contained-button-file"
                        type="file"
                        style={{ display: "none" }}
                        onChange={handleUploadClick}
                        ref={ref => setFileInput(ref)}
                    />
                    <S.TopTextBlock>
                        <WebEditorComponent
                            onChangeContent={html => (text = html)}
                            content={props.content}
                            editdisabled={false}
                        />
                    </S.TopTextBlock>
                    <S.FileUploadBlock>
                        <FileDropComp
                            // onFrameDragEnter={(event) => console.log('onFrameDragEnter', event)}
                            // onFrameDragLeave={(event) => console.log('onFrameDragLeave', event)}
                            // onFrameDrop={(event) => console.log('onFrameDrop', event)}
                            onDragOver={event => {
                                setIsDragOver(true);
                            }}
                            onDragLeave={event => {
                                setIsDragOver(false);
                            }}
                            onDrop={files => {
                                if (files) handleFileDrop(files);
                            }}
                        >
                            <S.FileDropInner>
                                <S.FileDropInnerImage
                                    style={{ display: nowImage != "" ? "flex" : "none" }}
                                >
                                    <img src={nowImage} />
                                    <Close style={{cursor : "pointer", position : "absolute", right : 4, top : 4}} onClick={onDeleteImage} fontSize="small" />
                                </S.FileDropInnerImage>
                                <S.FileDropInnerDiv>
                                    <a onClick={onClickUploadFile}>여기를 클릭</a>혹은 파일
                                    드래그하여 이미지 업로드
                                </S.FileDropInnerDiv>
                            </S.FileDropInner>
                        </FileDropComp>
                    </S.FileUploadBlock>
                    <S.BtmBtn onClick={onClickConfirm}>확인</S.BtmBtn>
                </S.Inner>
            </S.Block>
        </Rnd>
    );
};
