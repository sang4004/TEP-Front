import { useSelector, useDispatch } from "react-redux"; // redux
import { useState, useEffect, useRef } from "react"; // default hooks
//
// Module
import * as S from "./styled";
import fileUploadSvg from "../../images/edms/file-upload-solid.svg";
import exitSvg from "../../images/edms/times-solid-white.svg";
import { reducerState } from "../../common";
import { CreateFile, GetNewFileCode } from "../../common/action";
import { ModalInfo, LoadingIndicatorComponent } from "components";
import { Editor, EditorTools } from "@progress/kendo-react-editor";
import moment from "moment";
export type fileCreateModalProps = {
    visible: boolean;
    onClose: () => void;
    cate_no?: string;
    docu_no?: string;
};
interface FinalfileCreateModalProps extends fileCreateModalProps {}

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

export const FileCreateModalComp: React.FunctionComponent<FinalfileCreateModalProps> = props => {
    const dispatch = useDispatch();
    const editorRef = useRef(null);
    const fileSelector = useSelector((state: reducerState) => state.files);
    const projSelector = useSelector((state: reducerState) => state.project);
    const userSelector = useSelector((state: reducerState) => state.user);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [file, setFile] = useState<any | null>(null);
    const [fileInput, setFileInput] = useState<HTMLInputElement | null>(null);
    const [fileType, setFileType] = useState<string>("");
    const [fileName, setFileName] = useState<string>("");
    const [fileCode, setFileCode] = useState<string>("");
    const [initialFileName, setInitialFileName] = useState<string>("");
    const [weight, setWeight] = useState<string>("");
    const [version, setVersion] = useState<string>("");
    const [history, setHistory] = useState<string>("");

    useEffect(() => {
        if (fileSelector.create_file_data) {
            setTimeout(() => {
                setIsLoading(false);
                ModalInfo("파일등록이 완료되었습니다.");
                props.onClose();
            }, 2000);
            setFile(null);
            setFileInput(null);
            setFileType("");
            setFileName("");
            setInitialFileName("");
            // setWeight("");
            setHistory("");
        }
    }, [fileSelector.create_file_data]);

    useEffect(() => {
        setVersion("1");
    }, [version]);

    useEffect(() => {
        setFileCode(fileSelector.new_file_code);
    }, [fileSelector.new_file_code]);

    useEffect(() => {
        if (props.docu_no != undefined && props.visible == true)
            dispatch(GetNewFileCode(props.docu_no));
    }, [props.visible]);

    const onClose = () => {
        if (props.onClose) props.onClose();
    };
    const handleUploadClick = (event: any) => {
        try {
            var file = event.target.files[0];
            if (file) {
                setFile(file);
                setFileType(file.type);
                setInitialFileName(file.name);
            }
        } catch (err) {
            ModalInfo("파일 업로드 시스템 오류");
        }
    };
    const onClickUploadFile = () => {
        if (fileInput) fileInput.click();
    };
    const onClickSubmit = async () => {
        if (file && projSelector.now_project_no !== undefined) {
            const proj_no: number = projSelector.now_project_no;
            if (props.cate_no !== undefined && props.docu_no !== undefined) {
                if (!isNaN(parseInt(props.cate_no)) && !isNaN(parseInt(props.docu_no))) {
                    setIsLoading(true);
                    await dispatch(
                        CreateFile(
                            file,
                            proj_no,
                            parseInt(props.cate_no),
                            parseInt(props.docu_no),
                            // "" - dummy data (아직 필드 결정 X)
                            fileCode,
                            fileName,
                            initialFileName,
                            fileType,
                            //fversion
                            version,
                            //is_last_version
                            "",
                            new Date(),
                            userSelector.username,
                            new Date(),
                            // weight
                            history
                        )
                    );
                }
            }
        } else {
            ModalInfo("파일을 업로드 해주세요.");
        }
    };
    return (
        <S.Block open={props.visible} onClose={onClose}>
            <S.Inner>
                <LoadingIndicatorComponent open={isLoading} style={{ zIndex: 1301 }} />
                <S.Header>
                    <S.Title>새 파일 등록</S.Title>
                    <S.CloseBtn onClick={onClose}>
                        <img src={exitSvg} />
                    </S.CloseBtn>
                </S.Header>
                <S.Body>
                    <input
                        accept="*"
                        id="contained-button-file"
                        type="file"
                        style={{ display: "none" }}
                        onChange={handleUploadClick}
                        ref={ref => setFileInput(ref)}
                    />
                    <S.UploadInner>
                        <S.UploadBtn onClick={onClickUploadFile}>
                            <img src={fileUploadSvg} /> 파일 업로드
                        </S.UploadBtn>

                        <S.UploadItem>파일명</S.UploadItem>

                        <S.UploadListItem>
                            <S.UploadListItemText>
                                {initialFileName === "" ? "선택한 파일 없음" : initialFileName}
                            </S.UploadListItemText>
                        </S.UploadListItem>
                    </S.UploadInner>

                    <S.InputWrapper>
                        <S.InputInner>
                            <S.InputTitle>파일 코드</S.InputTitle>
                            <S.Input disabled={true} value={fileCode} />
                        </S.InputInner>
                        <S.InputInner>
                            <S.InputTitle>파일 버전</S.InputTitle>
                            <S.Input disabled={true} value={`V` + version} />
                        </S.InputInner>
                        {/* <S.InputInner>
                            <S.InputTitle>중요도</S.InputTitle>
                            <S.Input value={weight} onChange={e => setWeight(e.target.value)} />
                        </S.InputInner> */}
                        <S.InputInner>
                            <S.InputTitle>파일명</S.InputTitle>
                            <S.Input value={fileName} onChange={e => setFileName(e.target.value)} />
                        </S.InputInner>
                        <S.TextAreaInner>
                            <S.TextAreaTitle>변경 내역</S.TextAreaTitle>
                            <Editor
                                value={history}
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
                                    setHistory(event.html);
                                }}
                                style={{ width: "100%", height: "100%" }}
                            />
                        </S.TextAreaInner>
                    </S.InputWrapper>
                    <S.BtmBtns>
                        <S.BtmBtn onClick={onClose}>취소</S.BtmBtn>
                        <S.BtmBtn $type="confirm" onClick={onClickSubmit}>
                            완료
                        </S.BtmBtn>
                    </S.BtmBtns>
                </S.Body>
            </S.Inner>
        </S.Block>
    );
};
