/******************************************************************************
 * fileuploadmodal / index.tsx
 * hooks :
 *
 *
 ******************************************************************************/
// Library
import { useSelector, useDispatch } from "react-redux"; // redux
import React, { useState, useEffect, useContext } from "react"; // default hooks
//
// Module
import { useLocations } from "hooks"; // locations hooks
import { domain } from "../../../common/network";
import NewWindow from "react-new-window";
import * as S from "./styled";
import Close from "@material-ui/icons/Close";
import { FileDropComp } from "../../";
import { reducerState } from "../../../common";
import { ReviewExfile, ReviewCommentFile } from "../../../common/action";
import { ModalInfo, LoadingIndicatorComponent, GridViewComponent } from "components";

const TABLE_HEAD_SIZE = [0.2, 0.8, 1.2, 0.4];

const TABLE_HEAD_SIZE_REVIEW = [0.3, 0.5, 1.4, 0.4, 1.4, 0.5, 0.7];

const TABLE_HEAD_SIZE_FIN = [0.5];

const TABLE_HEAD_TYPE = [1, 1, 1, 1];

const TABLE_HEAD_TYPE_REVIEW = [1, 1, 1, 1, 1, 1, 1, 1];

const TABLE_HEAD_TYPE_FIN = [1];

const TABLE_HEADER = ["No.", "Document Number", "DESCRIPTIONS", "Page/Sheet No."];

const TABLE_HEADER_REVIEW = [
    "Rev.",
    "검토결과",
    "Review Comment",
    "작성자",
    "Reply",
    "설계변경 해당유무 (Y/N)",
    "날짜",
];

const TABLE_HEADER_FIN = ["최종 완료"];

const ALL_COMMENT_LOCKED_COLUMNS = [true, true, true, true];

export type TmReviewUploadModalProps = {
    visible: boolean;
    onClose: () => void;
    onChangeData: (data: any[]) => void;
    onChangeFile: (filename: string) => void;
};

interface FinalTmReviewUploadModalProps extends TmReviewUploadModalProps {}

export const TmReviewUploadModalComp: React.FunctionComponent<
    FinalTmReviewUploadModalProps
> = props => {
    const dispatch = useDispatch();
    const fileSelector = useSelector((state: reducerState) => state.files);
    const projSelector = useSelector((state: reducerState) => state.project);
    const tmSelector = useSelector((state: reducerState) => state.tm);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [fileInput, setFileInput] = useState<HTMLInputElement | null>(null);
    const [exFile, setExFile] = useState<any[]>([]);
    const [exFileList, setexFileList] = useState<any[]>([]);
    const [exFileListKeys, setexFileListKeys] = useState<any[]>([]);

    //for grid
    const [tableHeadSize, setTableHeadSize] = useState<number[]>([]);
    const [tableHeadType, setTableHeadType] = useState<number[]>([]);
    const [tableHeader, setTableHeader] = useState<string[]>([]);
    //
    const [isDragOver, setIsDragOver] = useState<boolean>(false);

    useEffect(() => {
        if (fileSelector.review_comment_file) {
            setExFile(fileSelector.review_comment_file);
            dispatch(ReviewExfile(fileSelector.review_comment_file));
        }
    }, [fileSelector.review_comment_file]);

    useEffect(() => {
        if (fileSelector.review_comment_list) {
            let list: any = fileSelector.review_comment_list;
            let data = list.review_data;
            let _list = [];
            let _tableHeader = TABLE_HEADER;
            let _tableHeadType = TABLE_HEAD_TYPE;
            let _tableHeadSize = TABLE_HEAD_SIZE;
            let maxOrder = 1;
            if (data && data.length > 0) {
                for (var d of data) {
                    let reviewObj = {
                        No: d.No,
                        Document_Number: d.Document_Number,
                        Description: d.Description,
                        Page_Sheet_No: d.Page_Sheet_No,
                    };
                    let review_result = d["date0"];
                    let idx = 0;
                    while (review_result) {
                        Object.assign(reviewObj, {
                            ["rev" + idx]: d["rev" + idx],
                            ["result" + idx]: d["result" + idx],
                            ["review" + idx]: d["review" + idx],
                            ["create_by" + idx]: d["create_by" + idx],
                            ["reply" + idx]: d["reply" + idx],
                            ["change" + idx]: d["change" + idx],
                            ["date" + idx]: d["date" + idx],
                            ["review_attach" + idx]: d["review_attach" + idx],
                            ["reply_attach" + idx]: d["reply_attach" + idx],
                        });
                        idx += 1;
                        review_result = d["date" + idx];
                    }
                    Object.assign(reviewObj, { completion: d.completion });
                    _list.push(reviewObj);
                    if (maxOrder < idx) maxOrder = idx;
                }
                //grid setting
                for (var i = 0; i < maxOrder; i++) {
                    _tableHeader = [..._tableHeader, ...TABLE_HEADER_REVIEW];
                    _tableHeadType = [..._tableHeadType, ...TABLE_HEAD_TYPE_REVIEW];
                    _tableHeadSize = [..._tableHeadSize, ...TABLE_HEAD_SIZE_REVIEW];
                }
                _tableHeader = [..._tableHeader, ...TABLE_HEADER_FIN];
                _tableHeadType = [..._tableHeadType, ...TABLE_HEAD_TYPE_FIN];
                _tableHeadSize = [..._tableHeadSize, ...TABLE_HEAD_SIZE_FIN];
                setTableHeader([..._tableHeader]);
                setTableHeadType([..._tableHeadType]);
                setTableHeadSize([..._tableHeadSize]);
                //
                setexFileList([..._list]);
                _list.sort((a, b) => Object.keys(b).length - Object.keys(a).length);
                setexFileListKeys([
                    ...Object.keys(_list[0]).filter(raw => raw.indexOf("attach") == -1),
                ]);
                setIsLoading(false);
            }
        }
    }, [fileSelector.review_comment_list]);

    useEffect(() => {
        if (tmSelector.create_review_excel != undefined) {
            setTimeout(() => {
                ModalInfo("업로드에 성공했습니다.");
                setIsLoading(false);
                onClose();
                setexFileList([]);
                setExFile([]);
            }, 2000);
        }
    }, [tmSelector.create_review_excel, tmSelector]);

    const handleExUploadClick = (event: any) => {
        var files = event.target.files;
        if (files) {
            setIsLoading(true);
            let uploadName = Object.keys(files)
                .map(id => files[id].name)
                .join(", ");
            dispatch(ReviewCommentFile(files, projSelector.now_project_no));
            props.onChangeFile(uploadName);
            setTimeout(() => {
                setIsLoading(false);
            }, 2000);
        }
    };

    const onClickUploadExFile = () => {
        if (fileInput) fileInput.click();
    };

    const handleFileDrop = (dropFiles: FileList) => {
        if (dropFiles.length > 0) {
            let uploadName = Object.keys(dropFiles)
                .map((id, idx) => dropFiles[idx].name)
                .join(", ");
            dispatch(ReviewCommentFile(dropFiles, projSelector.now_project_no));
            props.onChangeFile(uploadName);
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
            }, 2000);
        }
    };

    const onClickComplete = async () => {
        if (exFile.length == 0) return ModalInfo("엑셀파일을 업로드 해주세요.");
        props.onChangeData(exFileList);
        props.onClose();
    };

    const onClose = () => {
        props.onClose();
        setExFile([]);
        setexFileList([]);
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
                        console.log("EEEEE", e);
                        e = e || event;
                        e.preventDefault();
                    },
                    false
                );
            }}
            center="parent"
            features={{ width: 800, height: 600 }}
            title="TR 엑셀 업로드"
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
                `}
            </style>
            <S.Block>
                <S.Inner>
                    <LoadingIndicatorComponent open={isLoading} style={{ zIndex: 1301 }} />
                    <S.Header>
                        <S.Title>TR 엑셀 업로드</S.Title>
                        <S.CloseBtn onClick={onClose}>
                            <Close style={{ color: "white", fontSize: "3em" }} />
                        </S.CloseBtn>
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
                                <S.GridViewWrap style={{ display: "flex" }}>
                                    <GridViewComponent
                                        titles={tableHeader}
                                        keys={exFileListKeys}
                                        values={exFileList}
                                        fullData={exFileList}
                                        keysWidth={tableHeadSize}
                                        keysWidthTotal={8}
                                        datatype={tableHeadType}
                                        headerClass="background-dark-sky-blue color-white align-center"
                                        rowClass="background-color-parent color-light-black"
                                        lockedColumns={ALL_COMMENT_LOCKED_COLUMNS}
                                        sortable={true}
                                        filterable={false}
                                    />
                                </S.GridViewWrap>
                            </S.Wrapper>
                            <S.UploadInner>
                                <input
                                    multiple
                                    accept="*"
                                    id="contained-button-file"
                                    type="file"
                                    style={{ display: "none" }}
                                    onChange={handleExUploadClick}
                                    ref={ref => setFileInput(ref)}
                                    onClick={(event: any) => {
                                        event.target.value = null;
                                    }}
                                />
                                <S.UploadWrapper>
                                    <S.UploadBtn onClick={onClickUploadExFile}>
                                        <img
                                            src={`${domain}/assets/images/edms/file-upload-solid.svg`}
                                        />
                                        업로드
                                    </S.UploadBtn>
                                </S.UploadWrapper>
                            </S.UploadInner>
                            <S.BtmBtns>
                                <S.BtmBtn onClick={onClose}>취소</S.BtmBtn>
                                <S.BtmBtn $type="upload" onClick={onClickComplete}>
                                    완료
                                </S.BtmBtn>
                            </S.BtmBtns>
                        </FileDropComp>
                    </S.Body>
                </S.Inner>
            </S.Block>
        </NewWindow>
    );
};
