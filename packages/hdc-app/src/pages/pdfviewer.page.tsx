/******************************************************************************
 * hooks :
 * useLocations
 * components :
 *
 *
 ******************************************************************************/
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { reducerState } from "../common";
import { useLocations } from "hooks";
import { domain } from "../common/network";
import {
    GetPdfData,
    SetPdfData,
    GetDocumentDetail,
    GetFileDetail,
    GetDocuAuthority,
    GetOtherPdfData,
} from "../common/action";
import React, { useState, useEffect } from "react";
import { LoadingIndicatorComponent } from "components";
// import {
//     PdfViewerComponent,
//     Toolbar,
//     Magnification,
//     Navigation,
//     LinkAnnotation,
//     BookmarkView,
//     ThumbnailView,
//     Print,
//     TextSelection,
//     Annotation,
//     TextSearch,
//     Inject,
//     FormFields,
//     PdfViewer,
// } from "@syncfusion/ej2-react-pdfviewer";
import { EdmsDocumentEditModal } from "../components";
import * as S from "../styled/pdfviewer.styled";
import { pdfViewerDomain } from "../common/network";
import { ModalError } from "components";

const PdfViewerPage = (props: any) => {
    // const license_key =
    //     "NDg5NzYzQDMxMzkyZTMyMmUzMEFnZHJvTi91cldMaWtmMFlyK1ZYUlk1eWgvT0NCV0F5WHRhWUwrQzJJUnc9";
    // const unlock_key = "@31392e322e30o4uBGlTl0FmtYRVrGi1aoi0+YJGONzcom8tgeS6y33c=";
    const dispatch = useDispatch();
    const { path, searchParam } = useLocations();
    const pdfSelector = useSelector((state: reducerState) => state.pdfdata);
    const userSelector = useSelector((state: reducerState) => state.user);
    const docuSelector = useSelector((state: reducerState) => state.document);
    const fileSelector = useSelector((state: reducerState) => state.files);
    const authoritySelector = useSelector((state: reducerState) => state.authority);
    const [url, setUrl] = useState<string>("");
    const [pdfViewerInstance, setPdfViewerInstance] = useState<HTMLElement | null>(null);
    const [annotationData, setAnnotationData] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [docucDetail, setDcoucDetail] = useState<any>({});
    const [docuEditModalVisible, setDocuEditModalVisible] = useState<boolean>(false);
    const [docuFileName, setDocuFileName] = useState<string>("");
    const [docuList, setDocuList] = useState<number[]>([]);
    const [docu_no, setDocuNo] = useState<number>();
    const [page_type, setPageType] = useState<number>();
    const [otherFileDetail, setOtherFileDetail] = useState<any>();
    const { file_no } = useParams<{ file_no: string }>();

    const loadPdfViewer = async (sid: string) => {
        let target = document.getElementById("pdfviewer-tag");
        var streamDocs = new (window as any).StreamDocs({
            element: target,
        });

        streamDocs.document
            .open({
                streamdocsId: sid,
            })
            .then((success: any) => {
                console.log(success, target);
                streamDocs.preference.set({
                    annotationAuthor: userSelector.username,
                });
                setPdfViewerInstance(target);
            })
            .catch((err: any) => console.log(err));
    };
    useEffect(() => {
        if (path) {
            let _page_type = Number(searchParam.get("page_type"));
            if (_page_type != undefined) {
                setPageType(_page_type);
            }
        }
    }, [path, searchParam]);

    useEffect(() => {
        if (page_type != undefined) {
            setIsLoading(true);
            dispatch(GetDocuAuthority());
            dispatch(GetFileDetail(file_no, page_type));
            setTimeout(() => {
                setIsLoading(false);
            }, 5000);
        }
    }, [page_type]);

    useEffect(() => {
        if (fileSelector.file_detail && fileSelector.file_detail != undefined) {
            setDocuFileName(fileSelector.file_detail.file.file_name);
            setDocuNo(fileSelector.file_detail.file.docu_no);
            let _filename = fileSelector.file_detail.file.file_name;
            let _repo = fileSelector.file_detail.file.repo_path;
            if (_repo.length > 1) {
                _repo = _repo.split(".");
                _repo.pop(); // extension 버리기
                _repo = _repo.join(".") + ".pdf";
                setUrl(
                    `${domain}/filedownload/edms/docuact/${encodeURIComponent(
                        _repo
                    )}?filename=${encodeURIComponent(_filename)}`
                );
                if (page_type == 0) {
                    dispatch(GetPdfData(file_no));
                } else if (page_type == 1) {
                    dispatch(GetOtherPdfData(file_no));
                }
            }
            if (fileSelector.file_detail.proc) {
                setOtherFileDetail(fileSelector.file_detail.proc);
            }
        }
    }, [fileSelector.file_detail]);

    useEffect(() => {
        if (docu_no && docu_no > 0) {
            dispatch(GetDocumentDetail(docu_no));
        }
    }, [docu_no]);

    useEffect(() => {
        if (authoritySelector.docu_authority && authoritySelector.docu_authority.length > 0) {
            let list: number[] = [];
            for (var d of authoritySelector.docu_authority) {
                list.push(d);
            }
            setDocuList([...list]);
        }
    }, [authoritySelector.docu_authority]);

    useEffect(() => {
        if (pdfSelector.pdf_data && pdfSelector.pdf_data != null) {
            loadPdfViewer(pdfSelector.pdf_data.sid);
            // let annot = pdfSelector.pdf_data.annotation;
            // if (annot) {
            //     setAnnotationData(annot);
            // }
        } else {
            if (fileSelector && fileSelector.file_detail) {
                ModalError(
                    `${fileSelector.file_detail.file.file_name}\n 파일을 로드할 수 없습니다.`
                );
                setIsLoading(false);
            }
        }
    }, [pdfSelector.pdf_data]);

    useEffect(() => {
        if (pdfViewerInstance != null) {
            setIsLoading(false);
            // // 1. annotation sync
            // setTimeout(() => {
            //     if (annotationData) pdfViewerInstance.importAnnotation(JSON.parse(annotationData));
            //     setIsLoading(false);
            // }, 300);
            // // 1분에 한번씩 로드 및 저장
            // let interval = setInterval(async () => {
            //     try {
            //         let annotation = await pdfViewerInstance.exportAnnotationsAsObject();
            //         await dispatch(SetPdfData(file_no, "", annotation));
            //         await dispatch(GetPdfData(file_no));
            //     } catch (err) {}
            // }, 60 * 1000);
            // //
            // // default annotation setting
            // pdfViewerInstance.freeTextSettings.fontColor = "#E81D61";
            // pdfViewerInstance.annotationSettings.author = userSelector.username;
            //
            // return () => clearInterval(interval);
        }
    }, [pdfViewerInstance, annotationData]);

    useEffect(() => {
        if (docuSelector.document_detail && docuSelector.document_detail != undefined) {
            setDcoucDetail(docuSelector.document_detail);
        }
    }, [docuSelector.document_detail]);

    const onAnnotationAdd = (data: any) => {
        console.log("ADD :: ", data);
    };

    const onUnselect = (data: any) => {
        console.log("unselect : ", data);
        // setAnnotationData(data);
    };

    const onClickSave = async () => {
        // pdfViewerInstance.annotationCollection => 현재 pdf annotation 데이터 리스트
        // if (pdfViewerInstance) {
        //     let annotation = null; //await pdfViewerInstance.exportAnnotationsAsObject();
        //     await dispatch(SetPdfData(file_no, "", annotation));
        // }
        window.open(url, "_blank");
    };

    const onClickLoad = async () => {
        if (pdfViewerInstance) {
            let annotation = null; // await pdfViewerInstance.exportAnnotationsAsObject();
            await dispatch(SetPdfData(file_no, "", annotation));
            setIsLoading(true);
            setTimeout(async () => {
                await dispatch(GetPdfData(file_no));
                setIsLoading(false);
            }, 800);
        }
    };

    const get_file_type = (file_type: string) => {
        switch (file_type) {
            case "001":
                return "도면";
            case "002":
                return "PDF";
            case "003":
                return "문서";
            default:
                return "파일이 없습니다.";
        }
    };
    return (
        <>
            <style>
                {`
                    #container, #container_mainContainer{
                        min-height: 0px !important;
                    }
                `}
            </style>

            {/* <EdmsDocumentEditModal
                visible={docuEditModalVisible}
                onClose={() => setDocuEditModalVisible(false)}
                docu_no={parseInt(docu_no)}
            /> */}

            <S.Block id="pdfviewer">
                <LoadingIndicatorComponent open={isLoading} />
                <S.BtnBlock>
                    <S.ButtonDiv>
                        <S.SaveButton onClick={onClickSave}>원본 저장</S.SaveButton>
                    </S.ButtonDiv>
                    {page_type != 1 && (
                        <S.ContentDiv>
                            <S.PdfInfoDiv width={15}>
                                <S.PdfTitleDiv>문서코드</S.PdfTitleDiv>
                                <S.PdfContentDiv>
                                    {docucDetail.docu_code === null ? "-" : docucDetail.docu_code}
                                </S.PdfContentDiv>
                            </S.PdfInfoDiv>
                            <S.PdfInfoDiv width={30}>
                                <S.PdfTitleDiv>문서제목</S.PdfTitleDiv>
                                <S.PdfContentDiv>
                                    {docucDetail.docu_subject === null
                                        ? "-"
                                        : docucDetail.docu_subject}
                                </S.PdfContentDiv>
                            </S.PdfInfoDiv>
                            <S.PdfInfoDiv width={35}>
                                <S.PdfTitleDiv>파일명</S.PdfTitleDiv>
                                <S.PdfContentDiv>
                                    {docuFileName === null ? "-" : docuFileName}
                                </S.PdfContentDiv>
                            </S.PdfInfoDiv>
                            <S.PdfInfoDiv width={10}>
                                <S.PdfTitleDiv>파일유형</S.PdfTitleDiv>
                                <S.PdfContentDiv textAlign="center">
                                    {docucDetail.docu_type === null
                                        ? "-"
                                        : get_file_type(docucDetail.docu_type)}
                                </S.PdfContentDiv>
                            </S.PdfInfoDiv>
                            <S.PdfInfoDiv width={10}>
                                <S.PdfTitleDiv>최종스테이지</S.PdfTitleDiv>
                                <S.PdfContentDiv textAlign="center">
                                    {docucDetail.stage_code === null ||
                                    docucDetail.stage_code === ""
                                        ? "-"
                                        : docucDetail.stage_code}
                                </S.PdfContentDiv>
                            </S.PdfInfoDiv>
                        </S.ContentDiv>
                    )}
                    {page_type == 1 && otherFileDetail && (
                        <S.ContentDiv>
                            <S.PdfInfoDiv width={30}>
                                <S.PdfTitleDiv>파일명</S.PdfTitleDiv>
                                <S.PdfContentDiv>
                                    {docuFileName === null ? "-" : docuFileName}
                                </S.PdfContentDiv>
                            </S.PdfInfoDiv>
                            <S.PdfInfoDiv width={30}>
                                <S.PdfTitleDiv>TR.NO</S.PdfTitleDiv>
                                <S.PdfContentDiv textAlign="center">
                                    {otherFileDetail.wp_code}
                                </S.PdfContentDiv>
                            </S.PdfInfoDiv>
                            <S.PdfInfoDiv width={30}>
                                <S.PdfTitleDiv>TR제목</S.PdfTitleDiv>
                                <S.PdfContentDiv textAlign="center">
                                    {otherFileDetail.subject}
                                </S.PdfContentDiv>
                            </S.PdfInfoDiv>
                            <S.PdfInfoDiv width={10}>
                                <S.PdfTitleDiv>파일유형</S.PdfTitleDiv>
                                <S.PdfContentDiv textAlign="center">
                                    {fileSelector.file_detail.file &&
                                    fileSelector.file_detail.file.file_ext === null
                                        ? "-"
                                        : fileSelector.file_detail.file.file_ext}
                                </S.PdfContentDiv>
                            </S.PdfInfoDiv>
                        </S.ContentDiv>
                    )}
                </S.BtnBlock>
                <iframe
                    id="pdfviewer-tag"
                    src={`${pdfViewerDomain}view/sd`}
                    style={{ width: "100%", height: "100%" }}
                />
                {/* <PdfViewerComponent
                    ref={scope => {
                        setPdfViewerInstance(scope);
                        // this.viewer = scope;
                    }}
                    id="container"
                    documentPath={url}
                    // serviceUrl="http://tep-ej2.moornmo.com/pdfviewer"
                    serviceUrl="http://localhost:62978/pdfviewer"
                    enableAnnotation
                    enableAnnotationToolbar
                    style={{ height: "100%", width: "100%" }}
                    annotationAdd={onAnnotationAdd}
                    annotationRemove={data => {
                        console.log("remove : ", data);
                    }}
                    annotationUnSelect={onUnselect}
                    annotationMove={data => {
                        console.log("move : ", data);
                    }}
                >
                    <Inject
                        services={[
                            Toolbar,
                            Magnification,
                            Navigation,
                            LinkAnnotation,
                            BookmarkView,
                            ThumbnailView,
                            Print,
                            TextSelection,
                            TextSearch,
                            Annotation,
                            FormFields,
                        ]}
                    />
                </PdfViewerComponent> */}
            </S.Block>
        </>
    );
};

export default PdfViewerPage;
