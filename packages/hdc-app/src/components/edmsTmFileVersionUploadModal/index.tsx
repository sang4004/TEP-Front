/******************************************************************************
 * projecttreemodal/index.tsx
 * hooks :
 * useLocations
 *
 ******************************************************************************/
// Library
import React, { useState, useEffect } from "react"; // default hooks
import { useSelector, useDispatch } from "react-redux";
// Module
import { reducerState } from "../../common";
import { ModalInfo, LoadingIndicatorComponent, WebEditorComponent } from "components";
import { TmUploadVersionFile } from "../../common/action";
//
import Close from "@material-ui/icons/Close";
import * as S from "./styled";

export type edmsTmFileVersionModalProps = {
    style?: object;
    visible: boolean;
    onClose: () => void;
    dataidx?: number;
    file?: any;
    wpIdx?: number;
    docuNo?: number;
};
interface FinaledmsTmFileVersionModalProps extends edmsTmFileVersionModalProps {}

export const EdmsTmFileVersionModal: React.FunctionComponent<
    FinaledmsTmFileVersionModalProps
> = props => {
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [file, setFile] = useState<any | null>(null);
    const [fileList, setFileList] = useState<any>();
    const [fileName, setFileName] = useState<string>("");
    const [fileUpload, setFileUpload] = useState<HTMLInputElement | null>(null);

    const [version, setVersion] = useState<string>("");
    const [history, setHistory] = useState<string>("");
    const [historyList, setHistoryList] = useState<any[]>([]);

    useEffect(() => {
        if (props.visible && props.file) {
            setIsLoading(true);

            let file_list: any[] = [];
            for (let list of props.file) file_list.push(list);
            file_list.sort((a: any, b: any) => {
                return a.fversion - b.fversion;
            });
            setHistoryList(file_list);
            setFileList(file_list[file_list.length - 1]);
            makeFversion(file_list[file_list.length - 1].fversion);
        }
    }, [props.visible]);

    useEffect(() => {
        if (fileList != undefined) {
            setIsLoading(false);
        }
    }, [fileList]);

    const makeFversion = (fversion: any) => {
        setVersion(fversion + 1);
    };

    const onClose = () => {
        setVersion("");
        setHistory("");
        setFileName("");
        setFileList(null);
        setHistoryList([]);
        props.onClose();
    };

    const onClickUploadFlie = () => {
        if (fileUpload) fileUpload.click();
    };

    const onChangeFile = (event: any) => {
        var fileup = event.target.files[0];

        if (fileup) {
            setFile(fileup);
            setFileName(fileup.name);
        }
    };

    const onClickVersionUpload = async () => {
        if (file == null) return ModalInfo("파일을 업로드해주세요.");
        setIsLoading(true);
        await dispatch(TmUploadVersionFile(file, props.wpIdx, props.docuNo, history));
        setTimeout(() => {
            setIsLoading(false);
            ModalInfo("업로드되었습니다.");
            onClose();
        }, 2000);
    };

    return (
        <S.Block open={props.visible ? true : false} onClose={props.onClose}>
            <S.Inner>
                <LoadingIndicatorComponent open={isLoading} style={{ zIndex: 1301 }} />
                <S.ModalHeader>
                    {fileList != undefined && (
                        <S.HeaderTitle>{fileList.file_name} 업로드</S.HeaderTitle>
                    )}
                    <S.ModalCloseBtn onClick={onClose}>
                        <Close style={{ fontSize: "1.6em" }} />
                    </S.ModalCloseBtn>
                </S.ModalHeader>

                <S.ModalContentWrap>
                    <S.ModalListBigBox>
                        <S.InnerContainerHeader>파일버전목록</S.InnerContainerHeader>
                        <S.ModalFileVersionList>
                            {historyList.length != 0 &&
                                historyList.map(raw => {
                                    return (
                                        <S.ModalFilVersionTextDiv>
                                            V{raw.fversion} :{" "}
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: raw.history,
                                                }}
                                            />
                                        </S.ModalFilVersionTextDiv>
                                    );
                                })}
                        </S.ModalFileVersionList>
                    </S.ModalListBigBox>
                    <S.InputTitle $boxType="wide">수정내역</S.InputTitle>
                    <S.ModalInputBox $boxType="wide">
                        <WebEditorComponent
                            onChangeContent={html => setHistory(html)}
                            editdisabled={false}
                            toolDisabled={false}
                        />
                    </S.ModalInputBox>
                    <S.ModalBottom>
                        <S.InputTitle $boxType="wide">버전</S.InputTitle>
                        <S.FileTextFieldDiv
                            inputProps={{
                                disabled: true,
                                style: {
                                    width: "40%",
                                    height: "100%",
                                    border: "1px solid #ccc",
                                    textAlign: "center",
                                    paddingTop: "5px",
                                    borderRadius: "5px",
                                },
                            }}
                            InputProps={{
                                disableUnderline: true,
                                disabled: true,
                                style: { color: "#000000" },
                            }}
                            type="text"
                            name="FileVersion"
                            value={version}
                            variant="standard"
                        />
                    </S.ModalBottom>
                    <input
                        accept="*"
                        type="file"
                        style={{ display: "none" }}
                        onChange={onChangeFile}
                        ref={ref => setFileUpload(ref)}
                    />
                    <S.ModalBottom>
                        <S.InputTitle $boxType="wide">업로드</S.InputTitle>
                        <S.FileUploadBtn onClick={onClickUploadFlie}>
                            <img src="assets/images/edms/download-black.svg" />
                            업로드
                        </S.FileUploadBtn>
                        <S.FileTextFieldDiv
                            inputProps={{
                                disabled: true,
                                style: {
                                    width: "100%",
                                    height: "100%",
                                    textAlign: "left",
                                    paddingTop: "5px",
                                    borderRadius: "5px",
                                    overflowX: "scroll",
                                },
                            }}
                            InputProps={{
                                disableUnderline: true,
                                disabled: true,
                                style: { color: "#000000" },
                            }}
                            type="text"
                            name="FileName"
                            value={fileName}
                            variant="standard"
                        />
                        <S.ModalBtnContainer>
                            <S.CloseBtn onClick={onClose}>닫기</S.CloseBtn>
                            <S.SaveBtn onClick={onClickVersionUpload}>저장</S.SaveBtn>
                        </S.ModalBtnContainer>
                    </S.ModalBottom>
                </S.ModalContentWrap>
            </S.Inner>
        </S.Block>
    );
};
