/******************************************************************************
 * fileuploadmodal / index.tsx
 * hooks :
 *
 *
 ******************************************************************************/
// Library
import { useSelector, useDispatch } from "react-redux"; // redux
import React, { useState, useEffect, useContext, useRef } from "react"; // default hooks
import { Editor, EditorTools } from "@progress/kendo-react-editor";
//
// Module
import { useLocations } from "hooks"; // locations hooks
import * as S from "./styled";
import fileUploadSvg from "../../images/edms/file-upload-solid.svg";
import trashSvg from "../../images/edms/trash.svg";
import exitSvg from "../../images/edms/times-solid-white.svg";
import { getMoment } from "../../common/utils";
import { sliceText } from "utils_ts/lib";
import { reducerState } from "../../common";
import { UploadModelFile, GetEdmsCateStatusList } from "../../common/action";
import { ModalInfo, LoadingIndicatorComponent, GridViewComponent } from "components";
import { BackTop } from "antd";

export type modelFileCreateModalProps = {
    visible: boolean;
    onClose: () => void;
};

interface FinalModelFileCreateModalProps extends modelFileCreateModalProps {}

const {
    Bold,
    Strikethrough,
    Subscript,
    Superscript,
    AlignLeft,
    AlignCenter,
    AlignRight,
    AlignJustify,
    Indent,
    Outdent,
    OrderedList,
    UnorderedList,
    Undo,
    Redo,
    FontName,
    FormatBlock,
    InsertImage,
} = EditorTools;

export const ModelFileCreateModalComp: React.FunctionComponent<FinalModelFileCreateModalProps> = props => {
    const dispatch = useDispatch();
    const modelFileSelector = useSelector((state: reducerState) => state.modelfile);
    const projSelector = useSelector((state: reducerState) => state.project);
    const { pushHistory } = useLocations();
    const editorRef = useRef(null);

    const [relay, setRelay] = useState<string>("");
    const [content, setContent] = useState<string>("");

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [projectNo, setProjectNo] = useState<number>(-1);

    const [fileInput, setFileInput] = useState<HTMLInputElement | null>(null);
    const [files, setFiles] = useState<any[]>([]);
    const [isUpload, setIsUpload] = useState<boolean>(false);
    const [isClose, setIsClose] = useState<boolean>(true);

    const stat: string[] = ["upload", "confirm"];

    useEffect(()=>{
        dispatch(GetEdmsCateStatusList());
    }, [])

    useEffect(() => {
        if (modelFileSelector.upload_model_file_data && files) {
            setTimeout(() => {
                setIsLoading(false);
                ModalInfo("파일 업로드가 완료되었습니다.");
                setIsUpload(true);
            }, 2000);
        }
        setFiles([]);
    }, [modelFileSelector.upload_model_file_data]);

    useEffect(() => {
        if (projSelector.now_project_no !== undefined) {
            // setIsLoading(true);
            setProjectNo(projSelector.now_project_no);
            
        }
    }, [projSelector.now_project_no]);

    const handleUploadClick = (event: any) => {
        var _files = event.target.files;
        if (_files) {
            for (var f of _files) {
                if (files.filter(obj => obj.name == f.name).length == 0) files.push(f);
            }
            setFiles([...files]);
        }
    };

    const onClickUploadFile = () => {
        if (fileInput) fileInput.click();
    };

    const onClickUpload = async () => {
        if (!isUpload) {
            if (files.length == 0) return ModalInfo("파일을 업로드 해주세요.");
            setIsLoading(true);
            await dispatch(UploadModelFile(files, projectNo));
        }
    };

    const onClickComplete = async () => {};

    const onClickDeleteFile = (idx: number) => {
        if (files.length > idx && files[idx]) {
            files.splice(idx, 1);
            setFiles([...files]);
        }
    };

    const onClose = () => {
        props.onClose();
    };

    return (
        <S.Block open={props.visible} onClose={onClose}>
            <S.Inner>
                <LoadingIndicatorComponent open={isLoading} style={{ zIndex: 1301 }} />
                <S.Header>
                    <S.Title>모델 파일 추가</S.Title>
                    <S.CloseBtn onClick={onClose}>
                        <img src={exitSvg} />
                    </S.CloseBtn>
                </S.Header>
                <S.Body>
                    <S.ModalInputBox>
                        <S.InputDiv>
                            {/* <S.InputTitle>제목</S.InputTitle> */}
                            <S.Input value={relay} onChange={e => setRelay(e.target.value)} placeholder={"제목을 입력하세요"}/>
                        </S.InputDiv>
                        {/* <S.InputTitle>상세 설명</S.InputTitle> */}
                        <Editor
                            value={content}
                            tools={[
                                [Bold, Strikethrough],
                                [Subscript, Superscript],
                                [AlignLeft, AlignCenter, AlignRight, AlignJustify],
                                [Indent, Outdent],
                                [OrderedList, UnorderedList],
                                [Undo, Redo],
                                [InsertImage],
                                FontName,
                                FormatBlock,
                            ]}
                            ref={editorRef}
                            defaultEditMode="div"
                            onChange={event => {
                                setContent(event.html);
                            }}
                            style={{ width: "100%", height: "100%" }}
                        />
                    </S.ModalInputBox>
                    <S.UploadInner>
                        <input
                            multiple
                            accept="*"
                            id="contained-button-file"
                            type="file"
                            style={{ display: "none" }}
                            onChange={handleUploadClick}
                            ref={ref => setFileInput(ref)}
                        />
                        <S.UploadWrapper>
                            <S.UploadBtn onClick={onClickUploadFile}>
                                <img src={fileUploadSvg} /> 파일 업로드
                            </S.UploadBtn>
                            <S.UploadList>
                                <S.UploadListFristItem>파일명</S.UploadListFristItem>
                                <S.UploadListInner>
                                    {files.length > 0 &&
                                        files.map((raw: any, idx) => {
                                            return (
                                                <S.UploadListItem key={raw.name}>
                                                    <S.UploadListItemText>
                                                        <a>{raw.name}</a>
                                                    </S.UploadListItemText>
                                                    <S.UploadListItemDeleteBtn
                                                        onClick={() => onClickDeleteFile(idx)}
                                                    >
                                                        <img src={trashSvg} />
                                                    </S.UploadListItemDeleteBtn>
                                                </S.UploadListItem>
                                            );
                                        })}
                                </S.UploadListInner>
                            </S.UploadList>
                        </S.UploadWrapper>
                    </S.UploadInner>
                    <S.BtmBtns>
                        <S.BtmBtn onClick={onClose}>취소</S.BtmBtn>
                        <S.BtmBtn $type={!isUpload ? "upload" : "confirm"} onClick={onClickUpload}>
                            업로드
                        </S.BtmBtn>
                        <S.BtmBtn
                            $type={isUpload ? "upload" : "confirm"}
                            onClick={() => {
                                props.onClose();
                                setFiles([]);
                                setIsUpload(false);
                            }}
                        >
                            완료
                        </S.BtmBtn>
                    </S.BtmBtns>
                </S.Body>
            </S.Inner>
        </S.Block>
    );
};
