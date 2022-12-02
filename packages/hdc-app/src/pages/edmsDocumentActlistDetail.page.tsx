import React, { useEffect, useState } from "react";
import {
    EdmsFileHistoryModal,
    EdmsProjectBase,
    FileCreateModalComp,
    EdmsFileUploadModal,
    EdmsDocuReviewModal,
    EdmsDocuReviewListModal,
} from "../components";
import { useDispatch, useSelector } from "react-redux";
import { GridViewComponent, ModalInfo } from "components";
import {
    CreateWorkTmpBox,
    GetDocumentDetail,
    GetFileList,
    ChangeNavTitle,
    SetNowProject,
    DocuComparison,
} from "../common/action";
import { reducerState } from "../common";
import { digitalTwinDomain } from "../common/network";
import { useLocations } from "hooks";

import moment from "moment";

import * as S from "../styled/edmsDocumentActlistDetail.styled";
import * as docS from "../styled/edmsDocument.styled";
import * as T from "../styled/edmsProject.styled";

const tableHeadType: number[] = [1, 0, 0, 1, 1, 1, 1, 1];
const tableHeadSize: number[] = [0.7, 1, 1.4, 0.3, 0.3, 0.7, 0.5, 0.5];
const tableHeader: string[] = [
    "파일 코드",
    "파일 명",
    "실제 파일 명",
    "파일 유형",
    "파일 버전",
    "생성일자",
    "상세보기",
    "업로드",
    // "확인",
];
type paramTypes = {
    cate_no?: string;
    docu_no?: string;
};

const EdmsDocumentActListDetailPage = (props: paramTypes) => {
    const dispatch = useDispatch();
    const docuSelector = useSelector((state: reducerState) => state.document);
    const fileSelector = useSelector((state: reducerState) => state.files);
    const userSelector = useSelector((state: reducerState) => state.user);
    const workSelector = useSelector((state: reducerState) => state.work);

    const { back, pushHistory, path } = useLocations();
    // const { cate_no, docu_no } = useParams<paramTypes>();
    const [cate_no, setCate_no] = useState<any>();
    const [docu_no, setDocu_no] = useState<any>();
    const [documentDetail, setDocumentDetail] = useState<any>({});
    const [files, setFiles] = useState<any[]>([]);
    const [fileCreateModalVisible, setFileCreateModalVisible] = useState<boolean>(false);
    const [fileList, setFileList] = useState<any>([]);
    const [fileListKeys, setFileListKeys] = useState<any[]>([]);
    const [fileUploadModalVisible, setFileUploadModalVisible] = useState<boolean>(false);
    const [dataIdx, setDataIdx] = useState<number>(-1);
    const [fileHistoryModalVisible, setFileHistoryVisible] = useState<boolean>(false);
    const [block, setBlock] = useState<boolean>(false);
    const [reviewModalVisible, setReviewModalVisible] = useState<boolean>(false);
    const [reviewListModalVisible, setReviewListModalVisible] = useState<boolean>(false);
    const [isFile, setIsFile] = useState<boolean>(false);

    useEffect(() => {
        let _split = path?.split("/");
        if (_split && _split.length > 5) {
            setCate_no(_split[4]);
            setDocu_no(_split[5]);
            dispatch(GetDocumentDetail(_split[5]));
            dispatch(GetFileList(_split[5]));
        } else {
            back();
        }
        dispatch(ChangeNavTitle("EDMS - 기준정보 - 문서 실적 상세"));
    }, [path]);

    useEffect(() => {
        if (docuSelector.document_detail && Object.keys(docuSelector.document_detail).length > 0) {
            setDocumentDetail(docuSelector.document_detail);
            dispatch(SetNowProject(docuSelector.document_detail.project_no));
        }
    }, [docuSelector.document_detail]);

    useEffect(() => {
        if (fileSelector.file_list && fileSelector.file_list.length > 0) {
            setFiles([...fileSelector.file_list]);
        }
    }, [fileSelector.file_list]);

    useEffect(() => {
        if (fileSelector.create_file_data) {
            //Do Something
        }
    }, [fileSelector.create_file_data]);

    useEffect(() => {
        if (fileSelector.file_list && fileSelector.file_list.length > 0) {
            let _files = [];
            for (var file of fileSelector.file_list) {
                _files.push({
                    file_code: file.file_code,
                    file_name: file.file_name,
                    original_file_name: file.original_file_name,
                    file_type: get_file_type(file.file_type),
                    fversion: file.fversion,
                    create_tm: moment(file.create_tm).format(`YYYY-MM-DD`),
                    button : null,
                    docu_no: file.docu_no,
                    // root_path: file.root_path,
                });
            }
            setFileList([..._files]);
            setFileListKeys([...Object.keys(_files[0])]);
        }else{
            setFileList([]);
            setFileListKeys([]);
        }
    }, [fileSelector.file_list]);

    useEffect(() => {
        let list = [];
        let data: any = {};
        if (docuSelector.docu_comparison == true && documentDetail.docu_no != undefined) {
            Object.assign(data, { project_no: documentDetail.project_no });
            Object.assign(data, { docu_no: documentDetail.docu_no });
            Object.assign(data, { user_id: userSelector.edms_user_id });
            Object.assign(data, { create_by: documentDetail.create_by });
            list.push(data);
            dispatch(CreateWorkTmpBox(list));
            ModalInfo("임시보관함 추가완료");
            pushHistory("/edms/tmpDocList");
        } else if (docuSelector.docu_comparison == false && documentDetail.docu_no != undefined) {
            ModalInfo("이미 추가된 문서입니다.");
            setBlock(true);
        }
    }, [docuSelector.docu_comparison]);

    const onClickUploadFile = async () => {
        setFileCreateModalVisible(true);
    };

    const AddTmpBox = async () => {
        dispatch(DocuComparison(documentDetail.docu_no));
    };
    const onClickList = () => {
        pushHistory("/edms/docuact");
    };
    //Click Print Btn
    const onClickPrint = () => {
        let _exportEl = document.getElementById("excel_export");
        if (_exportEl) _exportEl.click();
    };

    const onClickMove = (idx: number) => {
        const file = fileSelector.file_list[idx];
        
        switch (fileList[idx].file_type) {
            case "도면":
                var pre = window.open(
                    `${digitalTwinDomain}?imodel=${file.repo_path}&file_no=${file.file_no}&user_id=${userSelector.edms_user_id}`,
                    "1429893142534",
                    "width=1080px,height=1528,toolbar=0,menubar=0,location=0,status=0,scrollbars=1,resizable=0,left=0,top=0"
                );
                break;
            case "PDF":
            case "문서":
            default:
                var pre = window.open(
                    `http://${window.location.host}/edms/pdfviewer/?file=${file.repo_path}`,
                    "1429893142534",
                    "width=1080px,height=1528,toolbar=0,menubar=0,location=0,status=0,scrollbars=1,resizable=0,left=0,top=0"
                );
                break;
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

    const onCloseFileCreateModal = async () => {
        setFileCreateModalVisible(false);
        await dispatch(GetFileList(docu_no));
    };

    const onClikcFileUploadvisible = async (idx: number) => {
        setFileUploadModalVisible(true);
        setDataIdx(idx);
    };

    const onCloseFileUploadModal = async () => {
        setFileUploadModalVisible(false);
    };

    const onClickFileHistroyvisible = async (idx: number) => {
        setFileHistoryVisible(true);
        setDataIdx(idx);
    };

    const onCloseFileHistoryModal = async () => {
        setFileHistoryVisible(false);
    };

    const onClickDocuReviewModal = async () => {
        setReviewModalVisible(true);
    };

    const onCloseDocuReviewModal = async () => {
        setReviewModalVisible(false);
    };

    const onClickDocuReviewListModal = async () => {
        setReviewListModalVisible(true);
    };

    const onCloseDocuReviewListModal = async () => {
        setReviewListModalVisible(false);
    };

    const onClickAdd = () => {
        // setProjectTreeModalVisible(true);
    };
    const createCustomEl = (idx: number, dataidx?: number) => {
        if (idx === 1) {
            if (dataidx == undefined) return true;
            return (
                <T.TableTd>
                    <T.TableCode onClick={()=> onClickMove(dataidx)}>
                        {fileList[dataidx] ? fileList[dataidx].file_name : ""}
                    </T.TableCode>
                </T.TableTd>
            );
        }
        if (idx === 6) {
            if (dataidx == undefined) return true;
            return (
                <T.TableTd>
                    <T.TableButtonDiv>
                        <T.TableButton onClick={() => onClickFileHistroyvisible(dataidx)}>
                            상세보기
                        </T.TableButton>
                    </T.TableButtonDiv>
                </T.TableTd>
            );
        }
        if (idx === 7) {
            if (dataidx == undefined) return true;
            return (
                <T.TableTd>
                    <T.TableButtonDiv>
                        <T.TableButton onClick={() => onClikcFileUploadvisible(dataidx)}>
                            업로드
                        </T.TableButton>
                    </T.TableButtonDiv>
                </T.TableTd>
            );
        }
        return null;
    };

    return (
        <EdmsProjectBase>
            <FileCreateModalComp
                visible={fileCreateModalVisible}
                onClose={onCloseFileCreateModal}
                cate_no={cate_no}
                docu_no={docu_no}
            />
            <EdmsFileUploadModal
                visible={fileUploadModalVisible}
                onClose={onCloseFileUploadModal}
                dataidx={dataIdx}
            />

            <EdmsFileHistoryModal
                visible={fileHistoryModalVisible}
                onClose={onCloseFileHistoryModal}
                dataidx={dataIdx}
            />
            <EdmsDocuReviewModal
                visible={reviewModalVisible}
                onClose={onCloseDocuReviewModal}
                dataidx={dataIdx}
                isFile={isFile}
            />
            <EdmsDocuReviewListModal
                visible={reviewListModalVisible}
                onClose={onCloseDocuReviewListModal}
                dataidx={dataIdx}
                isFile={isFile}
            />
            <S.ButtonHeaderWrapper>
                <S.FileToolBtnWrapper>
                    <S.FileUploadBtn onClick={AddTmpBox} disabled={block}>
                        내 보관함에 추가
                    </S.FileUploadBtn>
                    <S.FileUploadBtn onClick={onClickUploadFile}>파일등록</S.FileUploadBtn>
                </S.FileToolBtnWrapper>
                <S.FileToolBtnWrapper>
                    <S.FileToolBtn onClick={onClickList}>
                        <img src="assets/images/edms/list.svg" alt="" />
                        목록
                    </S.FileToolBtn>
                    <S.FileToolBtn onClick={onClickPrint}>
                        <img src="assets/images/edms/print.svg" alt="" />
                        출력
                    </S.FileToolBtn>
                </S.FileToolBtnWrapper>
            </S.ButtonHeaderWrapper>
            <S.DocumentTitle>{documentDetail.docu_code} 상세정보</S.DocumentTitle>
            <S.DocumentInfo>
                <S.DocumentInfoTitle>
                    <S.ButtonHeaderWrapper>
                        문서 정보
                        <S.FileToolBtnWrapper>
                            <docS.DocumentToolBtn onClick={onClickDocuReviewListModal}>
                                <img src="assets/images/edms/list.svg" alt="" />
                                문서 리뷰 목록
                            </docS.DocumentToolBtn>
                            <docS.DocumentToolBtn onClick={onClickDocuReviewModal}>
                                <img src="assets/images/edms/edit.svg" alt="" />
                                문서 리뷰 등록
                            </docS.DocumentToolBtn>
                        </S.FileToolBtnWrapper>
                    </S.ButtonHeaderWrapper>
                </S.DocumentInfoTitle>
                {/* row */}
                <S.DocumentInfoContent>
                    {/* each column */}
                    <S.DocumentInfoColumn>
                        {/* in each column, three row */}
                        <S.DocumentInfoColumnTitle>문서유형</S.DocumentInfoColumnTitle>
                        <S.DocumentInfoColumnContent>
                            {documentDetail.docu_type === null ? "-" : documentDetail.docu_type}
                        </S.DocumentInfoColumnContent>
                        <S.DocumentInfoColumnTitle>등록자</S.DocumentInfoColumnTitle>
                        <S.DocumentInfoColumnContent>
                            {documentDetail.create_by === null ? "-" : documentDetail.create_by}
                        </S.DocumentInfoColumnContent>
                        <S.DocumentInfoColumnTitle>문서코드</S.DocumentInfoColumnTitle>
                        <S.DocumentInfoColumnContent>
                            {documentDetail.docu_code === null ? "-" : documentDetail.docu_code}
                        </S.DocumentInfoColumnContent>
                    </S.DocumentInfoColumn>
                    <S.DocumentInfoColumn>
                        <S.DocumentInfoColumnTitle>제목</S.DocumentInfoColumnTitle>
                        <S.DocumentInfoColumnContent>
                            {documentDetail.docu_subject === null
                                ? "-"
                                : documentDetail.docu_subject}
                        </S.DocumentInfoColumnContent>
                        <S.DocumentInfoColumnTitle>수정일자</S.DocumentInfoColumnTitle>
                        <S.DocumentInfoColumnContent>
                            {documentDetail.modify_tm === null
                                ? "-"
                                : moment(documentDetail.modify_tm).format("YYYY-MM-DD")}
                        </S.DocumentInfoColumnContent>
                        <S.DocumentInfoColumnTitle>최종 리비젼</S.DocumentInfoColumnTitle>
                        <S.DocumentInfoColumnContent>
                            {documentDetail.revision === null ? "-" : documentDetail.revision}
                        </S.DocumentInfoColumnContent>
                    </S.DocumentInfoColumn>
                    <S.DocumentInfoColumn>
                        <S.DocumentInfoColumnTitle>설명</S.DocumentInfoColumnTitle>
                        <S.DocumentInfoColumnContent>
                            {documentDetail.explan === null ? "-" : documentDetail.explan}
                        </S.DocumentInfoColumnContent>
                        <S.DocumentInfoColumnTitle>등록일자</S.DocumentInfoColumnTitle>
                        <S.DocumentInfoColumnContent>
                            {documentDetail.create_tm === null
                                ? "-"
                                : moment(documentDetail.create_tm).format("YYYY-MM-DD")}
                        </S.DocumentInfoColumnContent>
                        <S.DocumentInfoColumnTitle></S.DocumentInfoColumnTitle>
                        <S.DocumentInfoColumnContent></S.DocumentInfoColumnContent>
                    </S.DocumentInfoColumn>
                </S.DocumentInfoContent>
            </S.DocumentInfo>
            <S.DocumentGrid>
                <GridViewComponent
                    titles={tableHeader}
                    keys={fileListKeys}
                    values={fileList}
                    fullData={fileList}
                    keysWidth={tableHeadSize}
                    rowClass="background-color-white color-light-black"
                    headerClass="background-dark-sky-blue color-white align-center"
                    getCustomEl={createCustomEl}
                    datatype={tableHeadType}
                    onClickRow={onClickMove}
                    excelFilename="파일리스트"
                />
            </S.DocumentGrid>
        </EdmsProjectBase>
    );
};

export default EdmsDocumentActListDetailPage;