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
import { Editor, EditorTools, EditorUtils } from "@progress/kendo-react-editor";
//
// Module
import * as S from "./styled";
import Close from "@material-ui/icons/Close";
import trashSvg from "../../images/edms/trash.svg";
import fileUploadSvg from "../../images/edms/file-upload-solid.svg";
import { useDispatch, useSelector } from "react-redux";
import {
    DeactiveCateModal,
    GetCategoryLevelList,
    GetEdmsDocuMasterList,
    GetDocumentDetail,
    CreateMyDocument,
    GetDocumentList,
} from "../../common/action";
import { LoadingIndicatorComponent, ModalInfo } from "components";
import { reducerState } from "../../common/store";
import { getMoment } from "../../common/utils";
const moment = getMoment();

export type edmsDocumentUploadModalProps = {
    visible: boolean;
    onClose: () => void;
};
interface FinaledmsDocumentUploadModalProps extends edmsDocumentUploadModalProps {}

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

export const EdmsDocumentUploadModal: React.FunctionComponent<FinaledmsDocumentUploadModalProps> =
    props => {
        const dispatch = useDispatch();
        const editorRef = React.createRef<Editor>();
        const userSelector = useSelector((state: reducerState) => state.user);
        const categorySelector = useSelector((state: reducerState) => state.category);
        const documentSelector = useSelector((state: reducerState) => state.document);
        const workSelector = useSelector((state: reducerState) => state.work);
        const settingSelector = useSelector((state: reducerState)=> state.projectsettings);

        const [categoryList, setCategoryList] = useState<any[]>([]);

        const [projList, setProjList] = useState<string[]>([]);
        const [workList, setWorkList] = useState<any[]>([]);

        const [rootCateList, setRootCateList] = useState<any[]>([]);
        const [subCateList, setSubCateList] = useState<any[]>([]);
        const [disciplineList, setDisciplineList] = useState<any[]>([]);

        const [projNo, setProjNo] = useState<number>(0);
        const [docuNo, setDocuNo] = useState<number>(0);
        const [disciplineId, setDisciplineId] = useState<number>(0);
        const [cateNo, setCateNo] = useState<number>(0);
        const [rootCateNo, setRootCateNo] = useState<number>(0);
        const [docuCode, setDocuCode] = useState<string>("");
        const [docuTitle, setDocuTitle] = useState<string>("");
        const [docuType, setDocuType] = useState<string>("001");
        const [docuState, setDocuState] = useState<number>(0);
        const [planDate, setPlanDate] = useState<Date>();
        const [realDate, setRealDate] = useState<Date>();
        const [stageList, setStageList] = useState<string[]>([]);
        const [planDates, setPlanDates] = useState<Date[]>([]);
        const [actualDates, setActualDates] = useState<Date[]>([]);
        const [stageCode, setStageCode] = useState<string>("");

        const [files, setFiles] = useState<any[]>([]);
        const [fileType, setFileType] = useState<any[]>([]);
        const [fileInput, setFileInput] = useState<HTMLInputElement | null>(null);
        const [version, setVersion] = useState<number>(1);

        const [hidden, setHidden] = useState<boolean>(true);
        const [isLoading, setIsLoading] = useState<boolean>(false);
        const [isCheckProj, setIsCheckPorj] = useState<boolean>(false);
        const [isCheckDiscipline, setIsCheckDiscipline] = useState<boolean>(false);
        const [isCheckSubCate, setIsCheckSubCate] = useState<boolean>(false);
        const [isCheckRootCate, setIsCheckRootCate] = useState<boolean>(false);

        // const [procCode, setProcCode] = useState<string>("001");
        // const [weight, setWeight] = useState<string>("");

        useEffect(() => {
            if (documentSelector.stage_code_list.length > 0) {
                setStageList([...documentSelector.stage_code_list]);
            }
        }, [documentSelector.stage_code_list]);

        useEffect(() => {
            if (settingSelector.project_list.length != 0) {
                setProjList(settingSelector.project_list);
            }
        }, [settingSelector.project_list]);

        useEffect(() => {
            if (documentSelector.create_document_data) {
                dispatch(DeactiveCateModal());
                dispatch(GetEdmsDocuMasterList());
                dispatch(
                    GetDocumentDetail(documentSelector.create_document_data.insert_document.docu_no)
                );
                setCateNo(0);
                setDisciplineId(0);
                setDocuCode("");
                setDocuTitle("");
                setDocuState(0);
                setPlanDate(new Date());
                setRealDate(new Date());
                let _planDates = [];
                let _actualDates = [];
                for (var i = 0; i < stageList.length; i++) {
                    _planDates.push(new Date());
                    _actualDates.push(new Date());
                }
                setPlanDates([..._planDates]);
                setActualDates([...actualDates]);
            }
        }, [documentSelector.create_document_data]);

        // Category List 불러오기
        useEffect(() => {
            if (categorySelector.cate_level_list && categorySelector.cate_level_list.length > 0) {
                setCategoryList([...categorySelector.cate_level_list]);
            }
        }, [categorySelector.cate_level_list]);

        useEffect(() => {
            if (categorySelector.discipline_list && categorySelector.discipline_list.length > 0) {
                setDisciplineList([...categorySelector.discipline_list]);
            }
        }, [categorySelector.discipline_list]);

        // Category Root분류
        useEffect(() => {
            let rootCate: any[] = [];
            categoryList.map((list: any) => {
                if (list.level == 1) rootCate.push(list);
            });
            setRootCateList(rootCate);
        }, [categoryList]);

        // 문서 등록시 이미 존재하는 문서 코드일 경우 생성 X
        useEffect(() => {
            let result = workSelector.create_my_document_data;
            if (result != undefined && isLoading) {
                setIsLoading(false);
                if (result.result) {
                    ModalInfo("문서가 생성되었습니다.");
                    onClose();
                } else {
                    ModalInfo("이미 존재하는 문서코드 입니다.");
                }
            }
        }, [workSelector.create_my_document_data]);

        //문서 선택 => 새 문서 추가 선택시 아래 hidden 해제
        //문서 선택 => 기존 문서 선택시 아래 hidden 유지 및 해당 문서 Docu_Code 출력
        useEffect(() => {
            if (docuNo != undefined && docuNo != 0) {
                workList.map((list: any) => {
                    if (docuNo == list.docu_no) {
                        setDocuCode(list.docu_code);
                    }
                });
            }
            if (docuNo == -1) {
                setHidden(false);
            } else {
                setHidden(true);
            }
        }, [docuNo]);

        // 프로젝트, 분야, 항목 선택했는지 체크
        // 체크 될 때마다 그 다음 표시될 항목 리스트 생성
        useEffect(() => {
            if (projNo != 0) {
                dispatch(GetCategoryLevelList(projNo));
                setIsCheckPorj(true);
                setIsCheckDiscipline(false);
                setIsCheckRootCate(false);
                setIsCheckSubCate(false);
            } else setIsCheckPorj(false);
        }, [projNo]);

        useEffect(() => {
            if (disciplineId != 0) {
                setIsCheckDiscipline(true);
                setIsCheckRootCate(false);
                setIsCheckSubCate(false);
            } else {
                setIsCheckDiscipline(false);
            }
        }, [disciplineId]);

        useEffect(() => {
            let subCate: any[] = [];
            categoryList.map((list: any) => {
                if (list.pcate_no == rootCateNo) {
                    subCate.push(list);
                }
            });
            setSubCateList(subCate);
            dispatch(GetDocumentList(rootCateNo));
        }, [rootCateNo]);

        useEffect(() => {
            if (rootCateNo != 0) setIsCheckRootCate(true);
            else setIsCheckRootCate(false);
        }, [subCateList]);

        useEffect(() => {
            if (cateNo != 0) {
                dispatch(GetDocumentList(cateNo));
                setIsCheckSubCate(true);
            } else {
                setIsCheckSubCate(false);
            }
        }, [cateNo]);

        useEffect(() => {
            let create_by = userSelector.username;
            let workList_Temp = [];
            if (documentSelector.document_list) {
                workList_Temp.push({ docu_no: -1, docu_code: "", docu_subject: "새 문서 추가" });
                documentSelector.document_list.map((list: any, current: number) => {
                    if (list.create_by == create_by) {
                        workList_Temp.push(list);
                    }
                });
                setWorkList(workList_Temp);
            }
        }, [documentSelector.document_list]);
        //

        const onClose = () => {
            setCateNo(0);
            setDisciplineId(0);
            setDocuCode("");
            setDocuTitle("");
            setStageCode("");
            setDocuState(0);
            setPlanDate(new Date());
            setRealDate(new Date());
            setPlanDates([]);
            setActualDates([]);
            setFiles([]);
            setProjNo(0);
            setDocuNo(0);
            setRootCateNo(0);
            props.onClose();
        };

        const onClickCreate = async () => {
            // Editor 내용 가져오기
            let content: string = "";
            if (editorRef.current) {
                const view = editorRef.current.view;
                if (view) content = EditorUtils.getHtml(view.state);
            }
            //

            let create_by = userSelector.username;
            // 문서 선택 X , 문서 선택 O
            if (docuNo == 0) {
                ModalInfo("문서를 선택해 주세요");
            } else if (docuNo != -1 && files.length == 0) {
                ModalInfo("파일을 업로드해 주세요");
            } else if (docuNo == -1 && docuCode == "") {
                ModalInfo("문서코드를 입력해 주세요");
            } else {
                setIsLoading(true);
                await dispatch(
                    CreateMyDocument(
                        create_by,
                        projNo,
                        disciplineId,
                        cateNo == 0 ? rootCateNo : cateNo, // 하위카테고리 선택 안했을 경우
                        docuType,
                        docuTitle,
                        content,
                        docuCode,
                        stageCode,
                        docuState,
                        planDate,
                        realDate,
                        planDates,
                        actualDates,
                        stageList,
                        files,
                        fileType,
                        "",
                        new Date(),
                        version,
                        docuNo
                    )
                );
            }
        };

        const onClickUploadFile = () => {
            if (fileInput) fileInput.click();
        };

        const onClickDeleteFile = (idx: number) => {
            if (files.length > idx && files[idx]) {
                files.splice(idx, 1);
                setFiles([...files]);
            }
        };

        const handleUploadClick = (event: any) => {
            var _files = event.target.files;
            if (_files.length > 1) {
                ModalInfo("파일을 한 개만 업로드해 주세요.");
            } else if (_files && files.length != 0) {
                ModalInfo("업로드된 파일이 있습니다.");
            } else {
                for (var f of _files) {
                    if (files.filter(obj => obj.name == f.name).length == 0) files.push(f);
                    fileType.push(f.type);
                }
                setFileType([...fileType]);
                setFiles([...files]);
            }
        };

        return (
            <>
                <S.Block open={props.visible ? true : false} onClose={props.onClose}>
                    <S.Inner>
                        <LoadingIndicatorComponent open={isLoading} />
                        <S.ModalHeader>
                            <S.HeaderTitle>새 문서 등록하기</S.HeaderTitle>
                            <S.ModalCloseBtn onClick={onClose}>
                                <Close fontSize="large"/>
                            </S.ModalCloseBtn>
                        </S.ModalHeader>

                        <S.ModalContentWrap>
                            <S.ModalInputWrap>
                                {projList.length == 0 ? (
                                    <S.ModalTopInputBox $boxType="many">
                                        <S.InputTitle>프로젝트 선택</S.InputTitle>
                                        <S.InputSelect disableUnderline value={projNo}>
                                            <S.InputSelectItem value={projNo}>
                                                <pre>프로젝트가 없습니다.</pre>
                                            </S.InputSelectItem>
                                        </S.InputSelect>
                                    </S.ModalTopInputBox>
                                ) : (
                                    <S.ModalTopInputBox $boxType="many">
                                        <S.InputTitle>프로젝트 선택</S.InputTitle>
                                        <S.InputSelect
                                            disableUnderline
                                            value={projNo}
                                            onChange={(e: any) => setProjNo(e.target.value)}
                                        >
                                            {projList.map((raw: any, idx: number) => {
                                                return (
                                                    <S.InputSelectItem
                                                        key={"projectSelect" + idx}
                                                        value={raw.project_no}
                                                    >
                                                        <pre>{raw.project_name}</pre>
                                                    </S.InputSelectItem>
                                                );
                                            })}
                                        </S.InputSelect>
                                    </S.ModalTopInputBox>
                                )}
                                <S.ModalTopInputBox
                                    $boxType="many"
                                    $is_CheckDiscipline={isCheckProj}
                                >
                                    <S.InputTopTitle $is_CheckProj={isCheckProj}>
                                        분야 선택
                                    </S.InputTopTitle>
                                    <S.InputTopSelect
                                        disableUnderline
                                        value={disciplineId}
                                        onChange={(e: any) => setDisciplineId(e.target.value)}
                                        $is_CheckProj={isCheckProj}
                                    >
                                        {disciplineList.map((raw: any, idx: number) => {
                                            return (
                                                <S.InputSelectItem
                                                    key={"disciplineSelect" + idx}
                                                    value={raw.id}
                                                >
                                                    <pre>{raw.name}</pre>
                                                </S.InputSelectItem>
                                            );
                                        })}
                                    </S.InputTopSelect>
                                </S.ModalTopInputBox>
                                <S.ModalTopInputBox
                                    $boxType="many"
                                    $is_CheckDiscipline={isCheckDiscipline}
                                >
                                    <S.InputTopTitle $is_CheckDiscipline={isCheckDiscipline}>
                                        카테고리 선택
                                    </S.InputTopTitle>
                                    <S.InputTopSelect
                                        disableUnderline
                                        value={rootCateNo}
                                        onChange={(e: any) => setRootCateNo(e.target.value)}
                                        $is_CheckDiscipline={isCheckDiscipline}
                                        // $is_Cate={true}
                                    >
                                        {rootCateList.map((raw: any, idx: number) => {
                                            return (
                                                <S.InputSelectItem
                                                    key={"cateSelect" + idx}
                                                    value={raw.cate_no}
                                                >
                                                    <pre>{raw.level_cate_name}</pre>
                                                </S.InputSelectItem>
                                            );
                                        })}
                                    </S.InputTopSelect>
                                    {/* <S.InputTopSelect
                                        disableUnderline
                                        value={cateNo}
                                        onChange={(e: any) => setCateNo(e.target.value)}
                                        $is_CheckRootCate={isCheckRootCate}
                                        $is_Cate={true}
                                    >
                                        {subCateList.map((raw: any, idx: number) => {
                                            return (
                                                <S.InputSelectItem
                                                    key={"subCateSelect" + idx}
                                                    value={raw.cate_no}
                                                >
                                                    <pre>{raw.level_cate_name}</pre>
                                                </S.InputSelectItem>
                                            );
                                        })}
                                    </S.InputTopSelect> */}
                                </S.ModalTopInputBox>
                                <S.ModalTopInputBox
                                    $boxType="many"
                                    $is_CheckSubCate={isCheckRootCate}
                                >
                                    <S.InputTopTitle $is_CheckSubCate={isCheckRootCate}>
                                        문서 선택
                                    </S.InputTopTitle>
                                    <S.InputTopSelect
                                        disableUnderline
                                        value={docuNo}
                                        onChange={(e: any) => setDocuNo(e.target.value)}
                                        $is_CheckSubCate={isCheckRootCate}
                                    >
                                        {workList.map((raw: any, idx: number) => {
                                            return (
                                                <S.InputSelectItem
                                                    key={"documentSelect" + idx}
                                                    value={raw.docu_no}
                                                >
                                                    <pre>{raw.docu_subject}</pre>
                                                </S.InputSelectItem>
                                            );
                                        })}
                                    </S.InputTopSelect>
                                </S.ModalTopInputBox>
                                {docuNo == -1 && (
                                    <S.ModalTopInputBox
                                        $boxType="wide"
                                        $is_CheckSubCate={isCheckRootCate}
                                    >
                                        <S.InputTopTitle $is_CheckSubCate={isCheckRootCate}>
                                            문서 제목
                                        </S.InputTopTitle>
                                        <S.Input
                                            value={docuTitle}
                                            onChange={e => setDocuTitle(e.target.value)}
                                            $is_CheckSubCate={isCheckRootCate}
                                        />
                                    </S.ModalTopInputBox>
                                )}
                                <S.ModalInputBox $boxType="editor">
                                    <S.InputTitle $boxType="wide">상세 설명</S.InputTitle>
                                    <Editor
                                        tools={[
                                            [Bold, Strikethrough],
                                            [Subscript, Superscript],
                                            [AlignLeft, AlignCenter, AlignRight, AlignJustify],
                                            [Indent, Outdent],
                                            [OrderedList, UnorderedList],
                                            FontName,
                                            FormatBlock,
                                            [Undo, Redo],
                                            [InsertImage],
                                        ]}
                                        ref={editorRef}
                                        defaultEditMode="div"
                                        style={{ width: "84%", height: "100%" }}
                                    />
                                </S.ModalInputBox>
                                <S.ModalInputBox>
                                    <S.InputTitle>문서코드</S.InputTitle>
                                    {docuNo != -1 ? (
                                        <S.Input
                                            disabled
                                            value={docuCode}
                                            onChange={e => setDocuCode(e.target.value)}
                                        />
                                    ) : (
                                        <S.Input
                                            value={docuCode}
                                            onChange={e => setDocuCode(e.target.value)}
                                        />
                                    )}
                                </S.ModalInputBox>
                                <S.ModalInputBox>
                                    <S.InputTitle>문서단계</S.InputTitle>
                                    <S.InputSelect
                                        disableUnderline
                                        value={stageCode}
                                        onChange={(e: any) => setStageCode(e.target.value)}
                                    >
                                        {documentSelector.stage_code_list &&
                                            documentSelector.stage_code_list.map(
                                                (raw: any, idx: number) => {
                                                    return (
                                                        <S.InputSelectItem
                                                            key={"stageCodeSelect" + idx}
                                                            value={raw}
                                                        >
                                                            {raw}
                                                        </S.InputSelectItem>
                                                    );
                                                }
                                            )}
                                    </S.InputSelect>
                                </S.ModalInputBox>
                                <S.ModalInputBox $is_hidden={hidden}>
                                    <S.InputTitle $is_hidden={hidden}>제출 예정일</S.InputTitle>
                                    <S.Input
                                        type="date"
                                        value={moment(planDate).format("YYYY-MM-DD")}
                                        onChange={e => setPlanDate(moment(e.target.value).toDate())}
                                        $is_hidden={hidden}
                                    />
                                </S.ModalInputBox>

                                <S.ModalInputBox $is_hidden={hidden}>
                                    <S.InputTitle $is_hidden={hidden}>실제 제출일</S.InputTitle>
                                    <S.Input
                                        type="date"
                                        value={moment(realDate).format("YYYY-MM-DD")}
                                        onChange={e => setRealDate(moment(e.target.value).toDate())}
                                        $is_hidden={hidden}
                                    />
                                </S.ModalInputBox>
                                {stageList.map((raw, idx) => {
                                    return (
                                        <>
                                            <S.ModalInputBox key={"stageList"+idx} $is_hidden={hidden}>
                                                <S.InputTitle $is_hidden={hidden}>
                                                    {raw}:P
                                                </S.InputTitle>
                                                <S.Input
                                                    type="date"
                                                    value={moment(planDates[idx]).format(
                                                        "YYYY-MM-DD"
                                                    )}
                                                    onChange={e => {
                                                        let _planDates = planDates;
                                                        _planDates[idx] = moment(
                                                            e.target.value
                                                        ).toDate();
                                                        setPlanDates([..._planDates]);
                                                    }}
                                                    $is_hidden={hidden}
                                                />
                                            </S.ModalInputBox>
                                            <S.ModalInputBox key={idx} $is_hidden={hidden}>
                                                <S.InputTitle $is_hidden={hidden}>
                                                    {raw}:A
                                                </S.InputTitle>
                                                <S.Input
                                                    type="date"
                                                    value={moment(actualDates[idx]).format(
                                                        "YYYY-MM-DD"
                                                    )}
                                                    onChange={e => {
                                                        let _actualDates = actualDates;
                                                        _actualDates[idx] = moment(
                                                            e.target.value
                                                        ).toDate();
                                                        setActualDates([..._actualDates]);
                                                    }}
                                                    $is_hidden={hidden}
                                                />
                                            </S.ModalInputBox>
                                        </>
                                    );
                                })}
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
                                        <S.UploadList>
                                            <S.UploadListFristItem>
                                                업로드된 파일
                                            </S.UploadListFristItem>
                                            <S.UploadListInner>
                                                {files.length > 0 ? (
                                                    files.map((raw: any, idx) => {
                                                        return (
                                                            <S.UploadListItem key={"files"+idx}>
                                                                <S.UploadListItemText>
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
                                                    })
                                                ) : (
                                                    <div style={{ margin: "5px" }}>
                                                        {" "}
                                                        업로드된 파일이 없습니다.
                                                    </div>
                                                )}
                                            </S.UploadListInner>
                                        </S.UploadList>
                                    </S.UploadWrapper>
                                </S.UploadInner>
                            </S.ModalInputWrap>
                            <S.ModalBtnContainer>
                                <S.CloseBtn onClick={onClose}>닫기</S.CloseBtn>
                                <S.SaveBtn onClick={onClickCreate}>저장</S.SaveBtn>
                            </S.ModalBtnContainer>
                        </S.ModalContentWrap>
                    </S.Inner>
                </S.Block>
            </>
        );
    };
