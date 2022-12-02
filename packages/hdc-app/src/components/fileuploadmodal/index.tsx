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
import { useLocations } from "hooks"; // locations hooks
import {
    ModalInfo,
    LoadingIndicatorComponent,
    GridViewComponent,
    gridViewChildrenType,
    ModalConfirm,
} from "components";
import moment from "moment";
import { Rnd } from "react-rnd";
import { useWindowDimensions } from "hooks";
//file drop
import { FileDropComp } from "../";
//
import * as S from "./styled";
import * as T from "../../styled/edmsProject.styled";
import fileUploadSvg from "../../images/edms/file-upload-solid.svg";
import trashSvg from "../../images/edms/trash.svg";
import exitSvg from "../../images/edms/times-solid-white.svg";
import { reducerState } from "../../common";
import {
    CollectFile,
    CollectFileExcel,
    CollectFileBuild,
    CollectFileBuildClear,
    GetExfile,
    GetWorkTmpBoxList,
    SetBuildResultClear,
    GetAllList,
    GetNativeFileList,
} from "../../common/action";
import { fileBuildResultType } from "../../common/reducer";

const tableHeadType = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
];
const tableHeadSize = [
    0.6, 0.6, 0.6, 0.4, 0.6, 0.6, 0.6, 0.4, 1.2, 0.4, 1.2, 0.4, 0.4, 0.4, 0.4, 0.6, 1.2, 1.8, 1.8,
    1.8, 1.8, 1.8, 1.8, 0.4, 0.4, 0.4,
];
const tableHeader = [
    "Project Type",
    "Discipline",
    "Area",
    "Index NO",
    "Index1",
    "Index2",
    "Index3",
    "파일타입",
    "파일이름",
    "Stage",
    "파일위치",
    "Revision",
    "Version",
    "작성자",
    "접근권한",
    "Doc No",
    "Doc Title",
    "Start",
    "IFA Issue",
    "IFA Approval",
    "AFC Issue",
    "AFC Approval",
    "As-Built Approval",
    "W/V (%)",
    "Plan (%)",
    "Actual (%)",
];

const stagecode = [
    "Start",
    "IFA Issue",
    "IFA Approval",
    "AFC Issue",
    "AFC Approval",
    "As-Built Approval",
];

export type fileUploadModalProps = {
    visible: boolean;
    onClose: () => void;
};

interface FinalfileUploadModalProps extends fileUploadModalProps {}

export const FileUploadModalComp: React.FunctionComponent<FinalfileUploadModalProps> = props => {
    const { width, height } = useWindowDimensions();
    const dispatch = useDispatch();
    const fileSelector = useSelector((state: reducerState) => state.files);
    const projSelector = useSelector((state: reducerState) => state.project);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [projList, setProjList] = useState<any>();

    const [fileInput, setFileInput] = useState<HTMLInputElement | null>(null);
    const [excelFileInput, setExcelFileInput] = useState<HTMLInputElement | null>(null);
    const [files, setFiles] = useState<any[]>([]);
    const [excelFile, setExcelFile] = useState<any>();
    const [exFileList, setexFileList] = useState<any[]>([]);
    const [errorList, setErrorList] = useState<string[]>([]);
    const [isComplete, setIsComplete] = useState<boolean>(false);

    const [tableChild, setTableChild] = useState<gridViewChildrenType>();
    const [isDragOver, setIsDragOver] = useState<boolean>(false);

    useEffect(() => {
        if (fileSelector.collect_files && fileSelector.collect_files.length > 0) {
            dispatch(CollectFileBuild(fileSelector.collect_file_ex, fileSelector.collect_files));
        }
    }, [fileSelector.collect_files]);

    useEffect(() => {
        if (fileSelector.collect_file_ex && props.visible) {
            setExcelFile(fileSelector.collect_file_ex);
            dispatch(GetExfile(fileSelector.collect_file_ex));
        }
    }, [fileSelector.collect_file_ex]);

    useEffect(() => {
        if (fileSelector.exfile_list) {
            let exfile: any = fileSelector.exfile_list;

            let data = exfile.exfile_data;
            let children: gridViewChildrenType = {};
            for (var s of stagecode) {
                Object.assign(children, {
                    [s]: [
                        { field: `${s} Plan`, title: "Plan", headerClassName: "align-center" },
                        {
                            field: `${s} Forecast`,
                            title: "Forecast",
                            headerClassName: "align-center",
                        },
                        {
                            field: `${s} Actual`,
                            title: "Actual",
                            headerClassName: "align-center",
                        },
                    ],
                });
            }
            setTableChild(children);
            let _list = [];
            for (var d of data) {
                _list.push({
                    "Project Type": d.project_type,
                    Discipline: d.discipline,
                    Area: d.area ? d.area : `no area`,
                    "Index NO": `A`,
                    Index1: d.cate[0] ? d.cate[0] : "",
                    Index2: d.cate[1] ? d.cate[1] : "",
                    Index3: d.cate[2] ? d.cate[2] : "",
                    파일타입: d.file_type,
                    파일이름: { file_name: d.file_name, file_stat: 0 },
                    Stage: d.now_stage,
                    Revision: d.revision,
                    Version: d.version,
                    작성자: d.creator,
                    접근권한: "",
                    "Doc No": d.docu_code,
                    "Doc Title": d.docu_title,
                    "Start Plan": moment(d.Start_P).format(`YYYY-MM-DD`),
                    "Start Forecast": moment(d.Start_F).format(`YYYY-MM-DD`),
                    "Start Actual": moment(d.Start_A).format(`YYYY-MM-DD`),

                    "IFA Issue Plan": moment(d.IFA_Issue_P).format(`YYYY-MM-DD`),
                    "IFA Issue Forecast": moment(d.IFA_Issue_F).format(`YYYY-MM-DD`),
                    "IFA Issue Actual": moment(d.IFA_Issue_A).format(`YYYY-MM-DD`),

                    "IFA Approval Plan": moment(d.IFA_Approval_P).format(`YYYY-MM-DD`),
                    "IFA Approval Forecast": moment(d.IFA_Approval_F).format(`YYYY-MM-DD`),
                    "IFA Approval Actual": moment(d.IFA_Approval_A).format(`YYYY-MM-DD`),

                    "AFC Issue Plan": moment(d.AFC_Issue_P).format(`YYYY-MM-DD`),
                    "AFC Issue Forecast": moment(d.AFC_Issue_F).format(`YYYY-MM-DD`),
                    "AFC Issue Actual": moment(d.AFC_Issue_A).format(`YYYY-MM-DD`),

                    "AFC Approval Plan": moment(d.AFC_Approval_P).format(`YYYY-MM-DD`),
                    "AFC Approval Forecast": moment(d.AFC_Approval_F).format(`YYYY-MM-DD`),
                    "AFC Approval Actual": moment(d.AFC_Approval_A).format(`YYYY-MM-DD`),

                    "As-Built Approval Plan": moment(d.As_Built_Approval_P).format(`YYYY-MM-DD`),
                    "As-Built Approval Forecast": moment(d.As_Built_Approval_F).format(
                        `YYYY-MM-DD`
                    ),
                    "As-Built Approval Actual": moment(d.As_Built_Approval_A).format(`YYYY-MM-DD`),
                    "W/V (%)": 0.01,
                    "Plan (%)": 0.3,
                    "Actual (%)": 0.3,
                });
            }
            setIsLoading(false);
            setexFileList([..._list]);
        }
    }, [fileSelector.exfile_list]);

    useEffect(() => {
        if (fileSelector.file_build_result && files.length > 0) {
            let result: fileBuildResultType = fileSelector.file_build_result;

            if (result.isConfirm) {
                // 파일업로드 확인을 눌렀을때
                let fileNames = result.files.map((raw: any) => raw.original_file_name);
                let fileText =
                    fileNames.length > 5
                        ? `${fileNames.slice(0, 5).join("\n")} 외 ${fileNames.length - 5} 건`
                        : `${fileNames.join("\n")}`;
                setTimeout(async () => {
                    setIsLoading(false);
                    ModalInfo(`${fileText}\n파일 업로드가 완료되었습니다.`);
                    setIsComplete(false);
                    await dispatch(GetWorkTmpBoxList(false, true, 0, 20));
                    dispatch(SetBuildResultClear());
                    await dispatch(GetAllList());
                    await dispatch(GetNativeFileList());
                    setexFileList([...exFileList]);
                }, 2000);
            } else {
                let filesResultText = "";
                result.resultList.map((raw, idx) => {
                    filesResultText += `${raw} : ${result.resultMessages[idx]}\n`;
                });
                filesResultText += "업로드를 진행 하시겠습니까?";
                ModalConfirm(filesResultText, (isConfirm: boolean) => {
                    if (isConfirm) {
                        dispatch(
                            CollectFileBuild(
                                fileSelector.collect_file_ex,
                                fileSelector.collect_files,
                                true
                            )
                        );
                    } else {
                        setIsComplete(false);
                        setIsLoading(false);
                        ModalInfo("취소 하였습니다.");
                        dispatch(CollectFileBuildClear());
                    }
                });
            }
        }
    }, [fileSelector.file_build_result]);

    useEffect(() => {
        if (projSelector.project_type_list && projSelector.project_type_list.length > 0) {
            let proj = projSelector.project_type_list.filter(
                (raw: any) => raw.project_no == projSelector.now_project_no
            );
            setProjList(proj[0]);
        }
    }, [projSelector.project_type_list, projSelector.now_project_no]);

    // const createCustomEl = (idx: number, dataIdx?: number) => {
    //     if (exFileList.length != 0) {
    //         if (dataIdx != undefined && exFileList.length <= dataIdx) return null;
    //         if (idx === 8) {
    //             if (dataIdx == undefined) return true;
    //             let data = exFileList[dataIdx].파일이름;
    //             return (
    //                 <T.TableTd style={{ color: data.file_stat == 0 ? "#000" : "#F00" }}>
    //                     {data.file_name}
    //                 </T.TableTd>
    //             );
    //         }
    //     }

    //     return null;
    // };

    const handleUploadClick = (event: any) => {
        var _files = event.target.files;
        if (_files) {
            for (var f of _files) {
                if (files.filter(obj => obj.name == f.name).length == 0) files.push(f);
            }
            setFiles([...files]);
        }
    };

    const handleExcelUploadClick = (event: any) => {
        var file = event.target.files[0];
        if (file) {
            dispatch(CollectFileExcel(file, projSelector.now_project_no));
            setIsLoading(true);
        }
    };

    const handleFileDrop = (dropFiles: FileList) => {
        if (dropFiles.length > 0) setFiles([...files, ...dropFiles]);
    };

    const onClickUploadFile = () => {
        if (fileInput) fileInput.click();
    };

    const onClickExcelUploadFile = () => {
        if (excelFileInput) excelFileInput.click();
    };

    const onClickComplete = async () => {
        if (!isComplete) {
            if (files.length == 0) return ModalInfo("파일을 첨부 해주세요.");
            setIsLoading(true);
            setIsComplete(true);
            await dispatch(CollectFile(files, projSelector.now_project_no));
        }
    };

    const onClickDeleteFile = (idx: number) => {
        if (files.length > idx && files[idx]) {
            files.splice(idx, 1);
            setFiles([...files]);
        }
    };

    const onClose = () => {
        props.onClose();
    };

    if (props.visible == false) return <></>;
    return (
        <Rnd
            default={{
                x: 100,
                y: 100,
                width: width / 2,
                height: height / 2,
            }}
            bounds="window"
            style={{ zIndex: 6 }}
            dragHandleClassName="drag-handle-element"
        >
            <style>
                {`
                    .k-grid table {
                        width : 100% !important;
                        margin : 0 -2px;
                    }
                    .k-grid td {
                        white-space : pre-wrap;
                    }
                    .ant-modal-confirm-content {
                        white-space : break-spaces;
                    }
                `}
            </style>
            <S.Block>
                <S.Inner>
                    <LoadingIndicatorComponent open={isLoading} style={{ zIndex: 1301 }} />
                    <S.Header className="drag-handle-element">
                        <S.Title>일괄 업로드</S.Title>
                        <S.CloseBtn onClick={onClose}>
                            <img src={exitSvg} />
                        </S.CloseBtn>
                    </S.Header>
                    <S.Body>
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
                                <FileDropComp
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
                                    <S.UploadList>
                                        <S.UploadListFristItem>파일명</S.UploadListFristItem>
                                        <S.UploadListInner>
                                            {files.length > 0 &&
                                                files.map((raw: any, idx) => {
                                                    let error = errorList.filter(
                                                        o => o == raw.name
                                                    );
                                                    return (
                                                        <S.UploadListItem key={idx}>
                                                            <S.UploadListItemText
                                                                $error={error.length}
                                                            >
                                                                <a>{raw.name}</a>
                                                            </S.UploadListItemText>
                                                            <S.UploadListItemDeleteBtn
                                                                onClick={() =>
                                                                    onClickDeleteFile(idx)
                                                                }
                                                            >
                                                                <img src={trashSvg} />
                                                            </S.UploadListItemDeleteBtn>
                                                        </S.UploadListItem>
                                                    );
                                                })}
                                        </S.UploadListInner>
                                    </S.UploadList>
                                </FileDropComp>
                            </S.UploadWrapper>
                        </S.UploadInner>
                        <S.BtmBtns>
                            <S.BtmBtn onClick={onClose}>취소</S.BtmBtn>
                            <S.BtmBtn onClick={onClickComplete}>업로드</S.BtmBtn>
                            <S.BtmBtn
                                onClick={() => {
                                    props.onClose();
                                    setFiles([]);
                                    setExcelFile(null);
                                    setIsComplete(false);
                                }}
                            >
                                완료
                            </S.BtmBtn>
                        </S.BtmBtns>
                    </S.Body>
                </S.Inner>
            </S.Block>
        </Rnd>
    );
};
