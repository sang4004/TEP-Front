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
import * as S from "./styled";
import fileUploadSvg from "../../images/edms/file-upload-solid.svg";
import exitSvg from "../../images/edms/times-solid-white.svg";
import { reducerState } from "../../common";
import {
    ReviewExfile,
    ReviewCommentFile,
    CreateReviewExcel,
    GetTmDetailList,
    GetTmAllReview,
    SetTmReviewCommentTemp,
} from "../../common/action";
import { ModalInfo, LoadingIndicatorComponent, GridViewComponent } from "components";
import { FileDropComp } from "../";
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

export type reviewUploadModalProps = {
    visible: boolean;
    onClose: () => void;
    wp_idx: number;
};

interface FinalreviewUploadModalProps extends reviewUploadModalProps {}

export const ReviewUploadModalComp: React.FunctionComponent<
    FinalreviewUploadModalProps
> = props => {
    const dispatch = useDispatch();
    const fileSelector = useSelector((state: reducerState) => state.files);
    const projSelector = useSelector((state: reducerState) => state.project);
    const tmSelector = useSelector((state: reducerState) => state.tm);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [fileInput, setFileInput] = useState<HTMLInputElement | null>(null);
    const [exFiles, setExFiles] = useState<any[]>([]);
    const [exFileList, setexFileList] = useState<any[]>([]);
    const [exFileListKeys, setexFileListKeys] = useState<any[]>([]);

    //for grid
    const [tableHeadSize, setTableHeadSize] = useState<number[]>([]);
    const [tableHeadType, setTableHeadType] = useState<number[]>([]);
    const [tableHeader, setTableHeader] = useState<string[]>([]);
    //
    //drag comp
    const [isDragOver, setIsDragOver] = useState<boolean>(false);
    //

    useEffect(() => {
        if (fileSelector.review_comment_file) {
            setExFiles(fileSelector.review_comment_file);
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
                setIsLoading(false);
                setexFileList([..._list]);
                _list.sort((a, b) => Object.keys(b).length - Object.keys(a).length);
                setexFileListKeys([
                    ...Object.keys(_list[0]).filter(raw => raw.indexOf("attach") == -1),
                ]);
            }
        }
    }, [fileSelector.review_comment_list]);

    useEffect(() => {
        if (tmSelector.create_review_excel != undefined) {
            dispatch(GetTmDetailList(props.wp_idx));
            setTimeout(() => {
                ModalInfo("업로드에 성공했습니다.");
                setIsLoading(false);
                onClose();
                setexFileList([]);
                setExFiles([]);
            }, 2000);
        }
    }, [tmSelector.create_review_excel, tmSelector]);

    const handleExUploadClick = (event: any) => {
        var files = event.target.files;
        if (files) {
            dispatch(ReviewCommentFile(files, projSelector.now_project_no));
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
            }, 2000);
        }
    };

    const handleFileDrop = (dropFiles: FileList) => {
        if (dropFiles.length > 0) {
            var files = dropFiles;
            dispatch(ReviewCommentFile(files, projSelector.now_project_no));
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
            }, 2000);
        }
    };

    const onClickUploadExFile = () => {
        if (fileInput) fileInput.click();
    };

    const onClickComplete = async () => {
        if (exFiles.length == 0) return ModalInfo("엑셀파일을 업로드 해주세요.");
        await dispatch(CreateReviewExcel(exFileList, props.wp_idx));
        dispatch(SetTmReviewCommentTemp([], [])); // 임시데이터 삭제!

        setIsLoading(true);
        setTimeout(() => {
            dispatch(GetTmAllReview(props.wp_idx));
            setIsLoading(false);
        }, 5000);
    };

    const onClose = () => {
        props.onClose();
        setExFiles([]);
        setexFileList([]);
    };

    return (
        <>
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
            <S.Block open={props.visible} onClose={onClose}>
                <S.Inner>
                    <LoadingIndicatorComponent open={isLoading} style={{ zIndex: 1301 }} />
                    <S.Header>
                        <S.Title>TR 엑셀 업로드</S.Title>
                        <S.CloseBtn onClick={onClose}>
                            <img src={exitSvg} />
                        </S.CloseBtn>
                    </S.Header>
                    <S.Body>
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
                            <S.Wrapper>
                                <S.GridViewWrap>
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
                                    accept="*"
                                    id="contained-button-file"
                                    type="file"
                                    multiple
                                    style={{ display: "none" }}
                                    onChange={handleExUploadClick}
                                    ref={ref => setFileInput(ref)}
                                    onClick={(event: any) => {
                                        event.target.value = null;
                                    }}
                                />
                                <S.UploadWrapper>
                                    <S.UploadBtn onClick={onClickUploadExFile}>
                                        <img src={fileUploadSvg} />
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
        </>
    );
};
