/******************************************************************************
 * vpisexceluploadmodal/ index.tsx
 * hooks :
 *
 *
 * Description
 * VPIS 원본 파일을 업로드 하는 모달입니다.
 ******************************************************************************/
// Library
import { useSelector, useDispatch } from "react-redux"; // redux
import React, { useState, useEffect, useContext, useCallback } from "react"; // default hooks
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
import { FileDropComp } from "..";
import { reducerState } from "../../common";
import {
    CollectFileExcel,
    GetExfilePlant,
    CollectFileBuildPlant,
    GetCountUploadEdms,
} from "../../common/action";

const PLANT_EXCEL_UPLOAD_MODAL_CONSTANT = {
    GetTableInfo: () => {
        let THeader: string[] = [
            "Transmittal#",
            "Equipment",
            "MDL/MLI",
            "Customer Transmittal #",
            "Contract Due Date",
            "Issue Date",
            "File Name",
            "Title",
            "GE Document Rev.",
            "Document Issue",
            "For Contractual Review",
            "For Contractual Approval",
            "Status Issued",
            "Documentum Folder Link",
            "Customer Return XMTL #",
            "Review Result and Code #",
        ];
        let THeadSize: number[] = [
            1, 0.5, 0.6, 1, 0.8, 0.5, 3, 3, 0.4, 0.5, 0.3, 0.3, 0.5, 1.5, 1, 1,
        ];
        let THeadType: number[] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

        return {
            header: THeader,
            headSize: THeadSize,
            headType: THeadType,
        };
    },
    MSG_NONE_PROJECT_ALERT: "상단에 프로젝트를 선택해주세요",
};

export type PlantExcelUploadModalProps = {
    visible: boolean;
    onClose: () => void;
    interval: (_interval: NodeJS.Timeout) => void;
};

interface FinalPlantExcelUploadModalProps extends PlantExcelUploadModalProps {}

export const PlantExcelUploadModalComp: React.FunctionComponent<
    FinalPlantExcelUploadModalProps
> = props => {
    const dispatch = useDispatch();
    const fileSelector = useSelector((state: reducerState) => state.files);
    const projSelector = useSelector((state: reducerState) => state.project);
    const { width, height } = useWindowDimensions();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const tableInfo = PLANT_EXCEL_UPLOAD_MODAL_CONSTANT.GetTableInfo();
    const [tableHeadType, setTableHeadType] = useState<number[]>(tableInfo.headType);
    const [tableHeader, setTableHeader] = useState<string[]>(tableInfo.header);
    const [tableHeadSize, setTableHeadSize] = useState<number[]>(tableInfo.headSize);

    const [projList, setProjList] = useState<any[]>([]);
    const [projNo, setProjNo] = useState<any>(-1);

    const [excelFileInput, setExcelFileInput] = useState<HTMLInputElement | null>(null);
    const [excelFile, setExcelFile] = useState<any>();
    const [exFileList, setExFileList] = useState<any[]>([]);
    const [isComplete, setIsComplete] = useState<boolean>(false);
    // TOAST
    const [visibleToast, setVisibleToast] = useState<boolean>(false);
    const [toastMsg, setToastMsg] = useState<string>(
        PLANT_EXCEL_UPLOAD_MODAL_CONSTANT.MSG_NONE_PROJECT_ALERT
    );
    //
    useEffect(() => {
        if (fileSelector.collect_file_ex && props.visible) {
            setExcelFile(fileSelector.collect_file_ex);
            dispatch(GetExfilePlant(fileSelector.collect_file_ex, projNo));
        }
    }, [fileSelector.collect_file_ex]);

    useEffect(() => {
        if (fileSelector.exfile_list_plant) {
            setIsLoading(false);
            let data = fileSelector.exfile_list_plant;
            let tableInfo = PLANT_EXCEL_UPLOAD_MODAL_CONSTANT.GetTableInfo();
            setTableHeadType([...tableInfo.headType]);
            setTableHeadSize([...tableInfo.headSize]);
            setTableHeader([...tableInfo.header]);
            setExFileList([...data]);
        }
    }, [fileSelector.exfile_list_plant]);

    useEffect(() => {
        if (fileSelector.file_build_result_dcl && excelFile) {
            setTimeout(() => {
                setIsLoading(false);
                setIsComplete(true);
                setExFileList([...exFileList]);
            }, 2000);
        }
    }, [fileSelector.file_build_result_dcl]);

    useEffect(() => {
        if (projSelector.project_type_list && projSelector.project_type_list.length > 0) {
            setProjList([...projSelector.project_type_list]);
        }
    }, [projSelector.project_type_list]);

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
            setToastMsg(PLANT_EXCEL_UPLOAD_MODAL_CONSTANT.MSG_NONE_PROJECT_ALERT);
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
            setToastMsg(PLANT_EXCEL_UPLOAD_MODAL_CONSTANT.MSG_NONE_PROJECT_ALERT);
            return;
        }
        if (excelFileInput) excelFileInput.click();
    };

    const onClickComplete = async () => {
        if (projNo && projNo != -1) {
            setIsLoading(true);
            await dispatch(CollectFileBuildPlant(fileSelector.collect_file_ex, projNo));
            // drawing interval
            await dispatch(GetCountUploadEdms());
            let _interval = setInterval(() => {
                dispatch(GetCountUploadEdms());
            }, 1000);
            props.interval(_interval);
            onClose();
        } else {
            setVisibleToast(true);
            setToastMsg(PLANT_EXCEL_UPLOAD_MODAL_CONSTANT.MSG_NONE_PROJECT_ALERT);
        }
    };

    const onClose = () => {
        setExFileList([]);
        setExcelFile({});
        setIsLoading(false);
        if (isComplete) ModalInfo("주기기 엑셀 업로드가 백그라운드로 진행될 예정입니다.");
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
            title="주기기 엑셀 업로드"
        >
            <S.Block>
                <S.Inner $type="window">
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
                        <S.Title>주기기 엑셀 업로드</S.Title>
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
                                event.preventDefault();
                            }}
                            onDragLeave={event => {
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
                                        keys={
                                            exFileList.length > 0 ? Object.keys(exFileList[0]) : []
                                        }
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
                            </S.UploadInner>
                            <S.BtmBtns>
                                <S.BtmBtn onClick={onClose}>취소</S.BtmBtn>
                                <S.BtmBtn
                                    $type={!isComplete ? "upload" : "confirm"}
                                    onClick={onClickComplete}
                                >
                                    업로드
                                </S.BtmBtn>
                            </S.BtmBtns>
                        </FileDropComp>
                    </S.Body>
                </S.Inner>
            </S.Block>
        </NewWindow>
    );
};


