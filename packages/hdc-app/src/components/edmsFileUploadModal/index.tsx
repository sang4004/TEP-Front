/******************************************************************************
 * Copyright (c) 2021. Moornmo Inc. Rights reserved.                          *
 * Data modelings and methods used are assets of Moornmo Inc.                 *
 * projecttreemodal/index.tsx
 * hooks :
 * useLocations
 *
 * last modify : jh.jeong@ilts.co.kr
 ******************************************************************************/
// Library
import React, { useRef, useState, useEffect } from "react"; // default hooks
import { useSelector, useDispatch } from "react-redux";
// Module
import { reducerState } from "../../common";
import {
    ModalInfo,
    LoadingIndicatorComponent,
    WebEditorComponent,
    GridViewComponent,
} from "components";
import { GetFilesHistory, NewVersionFile } from "../../common/action";
import moment from "moment";
//
import Close from "@material-ui/icons/Close";

import * as S from "./styled";

const tableHeadType = [1, 0, 1, 1];
const tableHeadSize = [0.3, 1, 1, 0.5];
const tableHeader = ["파일버전", "코멘트", "파일이름", "생성일"];

export type edmsFileUploadModalProps = {
    style?: object;
    visible: boolean;
    onClose: () => void;
    dataidx?: number;
    file?: any;
};
interface FinaledmsFileUploadModalProps extends edmsFileUploadModalProps {}

export const EdmsFileUploadModal: React.FunctionComponent<
    FinaledmsFileUploadModalProps
> = props => {
    const dispatch = useDispatch();
    const fileSelector = useSelector((state: reducerState) => state.files);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [file, setFile] = useState<any | null>(null);
    const [fileUpload, setFileUpload] = useState<HTMLInputElement | null>(null);

    const [stage, setStage] = useState<string>("");
    const [docuNo, setDocuNo] = useState<number>(0);
    const [fileList, setFileList] = useState<any>({});
    const [history, setHistory] = useState<string>("");
    const [version, setVersion] = useState<string>("");
    const [fileName, setFileName] = useState<string>("");
    const [historyList, setHistoryList] = useState<any[]>([]);
    const [historyListKeys, setHistoryListKeys] = useState<any[]>([]);

    useEffect(() => {
        if (props.visible && props.file) {
            setFileList(props.file);
            dispatch(GetFilesHistory(props.file.file_no, props.file.docu_no));
        }
    }, [props.visible]);

    useEffect(() => {
        if (fileList != {} && fileSelector.files_list.length != 0) {
            let fversion: any;
            dispatch(GetFilesHistory(fileList.file_no, fileList.docu_no));

            setStage(fileList.stage);
            makeFversion(fversion);
        }
    }, [fileSelector.files_list]);

    useEffect(() => {
        if (fileSelector.files_histories.length != 0) {
            let _list = [];
            let fversion = 0;
            for (var f of fileSelector.files_histories) {
                // if (f.file_no == fileList.file_no) {
                fversion = f.fversion;
                _list.push({
                    fversion: "V" + f.fversion,
                    history: f.history,
                    file_name: f.file_name,
                    create_tm: moment(f.create_tm).format("YYYY-MM-DD"),
                });
                // }
            }
            makeFversion(fversion);
            setHistoryList([..._list]);
            setHistoryListKeys([...Object.keys(_list[0])]);
            setDocuNo(fileSelector.files_histories[0].docu_no);
        }
    }, [fileSelector.files_histories]);

    const makeFversion = (fversion: any) => {
        setVersion(fversion + 1);
    };

    useEffect(() => {
        setStage("");
        setFile(null);
        setHistory("");
        setFileName("");
    }, [fileSelector.new_version_file]);

    const onClose = () => {
        setStage("");
        setFile(null);
        setHistory("");
        setFileName("");

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
        await dispatch(NewVersionFile(file, fileList.file_code, version, history, stage, docuNo));
        setTimeout(() => {
            setIsLoading(false);
            ModalInfo("파일 업로드가 완료되었습니다.");
            props.onClose();
        }, 2000);
    };

    const createCustomEl = (idx: number, dataIdx?: number) => {
        if (idx == 1) {
            if (dataIdx == undefined) return true;
            return (
                <S.TableTd>
                    <div dangerouslySetInnerHTML={{ __html: historyList[dataIdx].history }} />
                </S.TableTd>
            );
        }
    };

    return (
        <S.Block open={props.visible ? true : false} onClose={props.onClose}>
            <S.Inner>
                <LoadingIndicatorComponent open={isLoading} style={{ zIndex: 1301 }} />
                <S.ModalHeader>
                    <S.HeaderTitle>{fileList.file_name} 업로드</S.HeaderTitle>
                    <S.ModalCloseBtn onClick={onClose}>
                        <Close style={{ fontSize: "1.6em" }} />
                    </S.ModalCloseBtn>
                </S.ModalHeader>

                <S.ModalContentWrap>
                    <S.ModalListBigBox>
                        <GridViewComponent
                            titles={tableHeader}
                            keys={historyListKeys}
                            fullData={historyList}
                            values={historyList}
                            keysWidth={tableHeadSize}
                            datatype={tableHeadType}
                            getCustomEl={createCustomEl}
                            headerClass="background-dark-sky-blue color-white align-center"
                            rowClass="background-color-white color-light-black"
                        />
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
