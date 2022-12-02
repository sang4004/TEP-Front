/******************************************************************************
 * Copyright (c) 2021. Moornmo Inc. Rights reserved.                          *
 * Data modelings and methods used are assets of Moornmo Inc.                 *
 * fileuploadmodal / index.tsx
 * hooks :
 *
 *
 * last modify : jh.jeong@ilts.co.kr
 ******************************************************************************/
// Library
import { useSelector, useDispatch } from "react-redux"; // redux
import React, { useState, useEffect, useContext } from "react"; // default hooks
//
// Module
import { useWindowDimensions } from "hooks"; // locations hooks
import NewWindow from "react-new-window";
import {
    ModalInfo,
    LoadingIndicatorComponent,
    GridViewComponent,
    ToastComponent,
} from "components";
import Close from "@material-ui/icons/Close";
// relative path
import * as S from "./styled";
import { domain } from "../../common/network";
import { FileDropComp } from "../";
import { getMoment } from "../../common/utils";
import { reducerState } from "../../common";
import {
    CollectFile,
    CollectFileExcel,
    GetExfileDcl,
    CollectFileBuildDcl,
    GetCountUploadEdms,
} from "../../common/action";

const moment = getMoment();

const THeader: string[] = ["카테고리", "문서번호", "문서명", "Area"];
const MSG_NONE_PROJECT_ALERT = "상단에 프로젝트를 선택해주세요";

export type excelUploadModalProps = {
    visible: boolean;
    onClose: () => void;
    interval: (_interval: NodeJS.Timeout) => void;
};

interface FinalexcelUploadModalProps extends excelUploadModalProps {}

export const ExcelUploadModalComp: React.FunctionComponent<FinalexcelUploadModalProps> = props => {
    const dispatch = useDispatch();
    const fileSelector = useSelector((state: reducerState) => state.files);
    const projSelector = useSelector((state: reducerState) => state.project);
    const { width, height } = useWindowDimensions();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [tableHeadType, setTableHeadType] = useState<number[]>([1, 1, 0, 1]);
    const [tableHeader, setTableHeader] = useState<string[]>(THeader);
    const [tableHeadSize, setTableHeadSize] = useState<number[]>([1.5, 2, 3, 1]);

    const [projList, setProjList] = useState<any[]>([]);
    const [projNo, setProjNo] = useState<any>(-1);

    const [fileInput, setFileInput] = useState<HTMLInputElement | null>(null);
    const [excelFileInput, setExcelFileInput] = useState<HTMLInputElement | null>(null);
    const [files, setFiles] = useState<any[]>([]);
    const [excelFile, setExcelFile] = useState<any>();
    const [exFileList, setexFileList] = useState<any[]>([]);
    const [isComplete, setIsComplete] = useState<boolean>(false);
    //drag
    const [isDragOver, setIsDragOver] = useState<boolean>(false);
    // TOAST
    const [visibleToast, setVisibleToast] = useState<boolean>(false);
    const [toastMsg, setToastMsg] = useState<string>(MSG_NONE_PROJECT_ALERT);
    //

    const stat: string[] = ["upload", "confirm"];

    useEffect(() => {
        if (fileSelector.collect_files && fileSelector.collect_files.length > 0) {
            setFiles([...fileSelector.collect_files]);
        }
    }, [fileSelector.collect_files]);

    useEffect(() => {
        if (fileSelector.collect_file_ex && props.visible) {
            setExcelFile(fileSelector.collect_file_ex);
            dispatch(GetExfileDcl(fileSelector.collect_file_ex, projNo));
        }
    }, [fileSelector.collect_file_ex]);

    useEffect(() => {
        if (fileSelector.exfile_list_dcl) {
            setIsLoading(false);
            let data = fileSelector.exfile_list_dcl;
            let _list = [];
            let headType = tableHeadType;
            let headSize = tableHeadSize;
            let header = tableHeader;
            for (var d of data) {
                let row: any = {
                    카테고리: d.sheet,
                    문서번호: d.docu_name,
                    문서명: d.file_name,
                    area: d.area,
                };
                for (var s of d.stage_list) {
                    //스테이지 정보를 가져와서 리스트의 키와 값들을 넣어줌
                    if (s.date) {
                        let stage = getStage(s.stage, s.type); // Issue or Approval
                        Object.assign(row, {
                            [stage]:
                                moment(s.date).format(`YYYY-MM-DD`) +
                                `${s.revs != -1 ? ` (REV.${s.revs})` : ``}`,
                        });
                        if (header.indexOf(stage) == -1) {
                            // 기존의 키값과 중복 방지
                            header.push(stage);
                            headSize.push(1.5);
                            headType.push(1);
                        }
                    }
                }
                _list.push(row);
            }
            setTableHeader(header);
            setTableHeadSize(headSize);
            setTableHeadType(headType);
            // Object.keys(_list[0]).map((raw, idx: number) => {
            //     if (!tableHeadType[idx]) tableHeadType.push(1);
            //     if (!tableHeadSize[idx]) tableHeadSize.push(1);
            // });
            setTableHeadType([...tableHeadType]);
            setTableHeadSize([...tableHeadSize]);
            setTableHeader([...tableHeader]);
            setexFileList([..._list]);
        }
    }, [fileSelector.exfile_list_dcl]);

    useEffect(() => {
        if (fileSelector.file_build_result_dcl && excelFile) {
            setTimeout(() => {
                setIsLoading(false);
                setIsComplete(true);
                setexFileList([...exFileList]);
            }, 2000);
        }
    }, [fileSelector.file_build_result_dcl]);

    useEffect(() => {
        if (projSelector.project_type_list && projSelector.project_type_list.length > 0) {
            setProjList([...projSelector.project_type_list]);
        }
    }, [projSelector.project_type_list]);

    const getStage = (stage: string, type: number) => {
        let title = stage;
        if (type == 1) title += ` Issue`;
        else if (type == 2) title += ` Approval`;
        return title;
    };

    const handleUploadClick = (event: any) => {
        var files = event.target.files;
        if (files) dispatch(CollectFile(files, projNo));
    };

    const handleExcelUploadClick = async (event: any) => {
        var file = event.target.files[0];
        if (file) {
            let res = await dispatch(CollectFileExcel(file, projNo));
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
            }, 30000);
        }
    };

    const handleFileDrop = async (dropFiles: FileList) => {
        if (projNo == -1) {
            setVisibleToast(true);
            setToastMsg(MSG_NONE_PROJECT_ALERT);
            return;
        }
        if (dropFiles.length > 0) {
            var file = dropFiles[0];
            let res = await dispatch(CollectFileExcel(file, projNo));
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
            }, 30000);
        }
    };

    const onClickExcelUploadFile = () => {
        if (projNo == -1) {
            setVisibleToast(true);
            setToastMsg(MSG_NONE_PROJECT_ALERT);
            return;
        }
        if (excelFileInput) excelFileInput.click();
    };

    const onClickComplete = async () => {
        // if (fileSelector.collect_file_ex == undefined || fileSelector.collect_file_ex.length == 0)
        //     return ModalInfo("엑셀파일을 첨부 해주세요.");
        // if (fileSelector.collect_files == undefined || fileSelector.collect_files.length == 0)
        //     return ModalInfo("파일을 업로드 해주세요.");
        if (projNo && projNo != -1) {
            setIsLoading(true);
            await dispatch(CollectFileBuildDcl(fileSelector.collect_file_ex, projNo));
            // drawing interval
            await dispatch(GetCountUploadEdms());
            let _interval = setInterval(() => {
                dispatch(GetCountUploadEdms());
            }, 1000);
            props.interval(_interval);
            onClose();
        } else {
            setVisibleToast(true);
            setToastMsg(MSG_NONE_PROJECT_ALERT);
        }
    };

    const onClickDeleteFile = (idx: number) => {
        if (files.length > idx && files[idx]) {
            files.splice(idx, 1);
            setFiles([...files]);
        }
    };

    const onClose = () => {
        setexFileList([]);
        setExcelFile({});
        setIsLoading(false);
        if (isComplete) ModalInfo("문서 기준 엑셀 업로드가 백그라운드로 진행될 예정입니다.");
        props.onClose();
    };

    if (props.visible == false) return <></>;
    return (
        <NewWindow
            onUnload={onClose}
            onOpen={window => {
                window.addEventListener(
                    "dragover",
                    function (e) {
                        e = e || event;
                        e.preventDefault();
                    },
                    false
                );
                window.addEventListener(
                    "drop",
                    function (e) {
                        e = e || event;
                        e.preventDefault();
                    },
                    false
                );
            }}
            center="parent"
            features={{ width: width * 0.6, height: height * 0.8 }}
            title="문서 기준 엑셀 업로드"
        >
            <S.Block>
                <S.Inner>
                    <ToastComponent
                        duration={2000}
                        text={toastMsg}
                        close={() => setVisibleToast(false)}
                        visible={visibleToast}
                        type={"warning"}
                        style={{
                            position: "absolute",
                            right: 50,
                            bottom: 100,
                            alignItems: "flex-end",
                        }}
                    />
                    <style>
                        {`
                            .k-grid td {
                                white-space : nowrap;
                            }
                        `}
                    </style>
                    <LoadingIndicatorComponent open={isLoading} style={{ zIndex: 1301 }} />
                    <S.Header>
                        <S.Title>문서 기준 엑셀 업로드</S.Title>
                        {/* <S.CloseBtn onClick={onClose}>
                            <Close style={{ color: "white", fontSize: "3em" }} />
                        </S.CloseBtn> */}
                    </S.Header>
                    <S.Body>
                        <FileDropComp
                            // onFrameDragEnter={(event) => console.log('onFrameDragEnter', event)}
                            // onFrameDragLeave={(event) => console.log('onFrameDragLeave', event)}
                            // onFrameDrop={(event) => console.log('onFrameDrop', event)}
                            onDragOver={event => {
                                setIsDragOver(true);
                                event.preventDefault();
                            }}
                            onDragLeave={event => {
                                setIsDragOver(false);
                                event.preventDefault();
                            }}
                            onDrop={files => {
                                if (files) handleFileDrop(files);
                            }}
                        >
                            <S.Wrapper>
                                <S.ProjectSelect
                                    value={projNo}
                                    onChange={e => {
                                        setProjNo(e.target.value);
                                    }}
                                >
                                    <S.ProjectSelectMenu value={-1}>
                                        프로젝트를 선택해주세요
                                    </S.ProjectSelectMenu>
                                    {projList &&
                                        projList.length > 0 &&
                                        projList.map((raw, idx) => {
                                            return (
                                                <S.ProjectSelectMenu value={raw.project_no}>
                                                    {raw.project_name}
                                                </S.ProjectSelectMenu>
                                            );
                                        })}
                                </S.ProjectSelect>

                                <S.GridViewWrap>
                                    <GridViewComponent
                                        titles={tableHeader}
                                        keys={tableHeader}
                                        values={Object.values(exFileList)}
                                        fullData={exFileList}
                                        keysWidth={tableHeadSize}
                                        datatype={tableHeadType}
                                        rowClass="background-color-white color-light-black"
                                        headerClass="background-dark-sky-blue color-white align-center"
                                        // keysWidthTotal={15}
                                    />
                                </S.GridViewWrap>
                            </S.Wrapper>
                            <S.UploadInner>
                                <input
                                    accept="*"
                                    id="contained-button-file"
                                    type="file"
                                    style={{ display: "none" }}
                                    onChange={handleExcelUploadClick}
                                    ref={ref => setExcelFileInput(ref)}
                                    onClick={(event: any) => {
                                        event.target.value = null;
                                    }}
                                />
                                <S.UploadWrapper>
                                    <S.UploadBtn onClick={onClickExcelUploadFile}>
                                        <img
                                            src={`${domain}/assets/images/edms/file-upload-solid.svg`}
                                        />{" "}
                                        엑셀 업로드
                                    </S.UploadBtn>
                                    <S.UploadList>
                                        <S.UploadListFristItem>엑셀 파일명</S.UploadListFristItem>
                                        <S.UploadListInner>
                                            {excelFile && (
                                                <S.UploadListItem>
                                                    <S.UploadListItemText>
                                                        <a
                                                            href={excelFile.url}
                                                            download={excelFile.filename}
                                                        >
                                                            {excelFile.filename}
                                                        </a>
                                                    </S.UploadListItemText>
                                                    <S.UploadListItemDeleteBtn>
                                                        <img
                                                            src={`${domain}/assets/images/edms/trash.svg`}
                                                        />
                                                    </S.UploadListItemDeleteBtn>
                                                </S.UploadListItem>
                                            )}
                                        </S.UploadListInner>
                                    </S.UploadList>
                                </S.UploadWrapper>
                                <input
                                    multiple
                                    accept="*"
                                    id="contained-button-file"
                                    type="file"
                                    style={{ display: "none" }}
                                    onChange={handleUploadClick}
                                    ref={ref => setFileInput(ref)}
                                />
                            </S.UploadInner>
                            <S.BtmBtns>
                                <S.BtmBtn onClick={onClose}>취소</S.BtmBtn>
                                <S.BtmBtn
                                    $type={!isComplete ? "upload" : "confirm"}
                                    onClick={onClickComplete}
                                >
                                    업로드
                                </S.BtmBtn>
                                {/* <S.BtmBtn
                            $type={isComplete ? "upload" : "confirm"}
                            onClick={() => {
                                props.onClose();
                                setFiles([]);
                                setExcelFile(null);
                                setIsComplete(false);
                            }}
                        >
                            완료
                        </S.BtmBtn> */}
                            </S.BtmBtns>
                        </FileDropComp>
                    </S.Body>
                </S.Inner>
            </S.Block>
        </NewWindow>
    );
};
