/******************************************************************************
 * Copyright (c) 2021. Moornmo Inc. Rights reserved.                          *
 * Data modelings and methods used are assets of Moornmo Inc.                 *
 * hooks :
    * useLocations 
 * components : 
    * 
 * last modify : jh.jeong
 * 

 ******************************************************************************/
import React, { useState, useEffect, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { reducerState } from "../common";

import { EdmsDocumentFormModal, EdmsProjectBase, FileUploadModalComp } from "../components";
import { useLocations } from "hooks";
import {
    LoadingIndicatorComponent,
    GridViewComponent,
    ToastComponent,
    ModalInfo,
} from "components";
import { DeleteDocument, GetEdmsDocuMasterList, ChangeNavTitle } from "../common/action";
import { getExcelFileByType } from "../common/utils";

import * as S from "../styled/edmsProject.styled";
import * as docS from "../styled/edmsDocument.styled";
import * as s from "../styled/edmsDocumentActlist.styled";
//image
import folerIcon from "../images/fontawsomeicon/worklist_dep3.svg";
import trashIcon from "../images/edms/trash-white.svg";
import editIcon from "../images/edms/icon_edit_white.svg";

const tableHeadType = [0, 1, 1, 1, 0, 1, 1, 1, 1, 1];
const tableHeadSize = [0.4, 0.5, 0.5, 1, 2, 0.6, 0.6, 0.6, 0.6, 0.6];
const tableHeader = [
    "선택",
    "프로젝트",
    "분야",
    "문서 코드",
    "문서 제목",
    "리비전 코드",
    "문서 구분",
    "문서단계",
    "상태",
    "가중치",
];

const EdmsDocumentListPage = (props: any) => {
    const dispatch = useDispatch();
    const { pushHistory } = useLocations();
    const [projectTreeModalVisible, setProjectTreeModalVisible] = useState<boolean>(false);
    const docuSelector = useSelector((state: reducerState) => state.document);
    const projSelector = useSelector((state: reducerState) => state.project);
    const fileSelector = useSelector((state: reducerState) => state.files);
    const [checked, setChecked] = useState<number[]>([]);
    const [checkedDocu, setCheckedDocu] = useState<any[]>([]);
    const [editData, setEditData] = useState<any>();
    const [isEdit, setIsEdit] = useState<number>(-1);
    const [visibleToast, setVisibleToast] = useState<boolean>(false);
    const [docuList, setDocuList] = useState<any>([]);
    const [docuListKeys, setDocuListKeys] = useState<any[]>([]);
    const [searchData, setSearchData] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [fileUploadModalVisible, setFileUploadModalVisible] = useState<boolean>(false);

    useEffect(() => {
        setIsLoading(true);
        dispatch(GetEdmsDocuMasterList());
        dispatch(ChangeNavTitle("EDMS - 기준정보 - 문서"));
    }, []);

    useEffect(() => {
        dispatch(GetEdmsDocuMasterList());
        setChecked([]);
    }, [
        docuSelector.edit_document_data,
        docuSelector.delete_document_data,
        fileSelector.file_build_result,
    ]);

    useEffect(() => {
        if (docuSelector.edms_doc_master_list && docuSelector.edms_doc_master_list.length > 0) {
            let _docu = [];
            for (var docu of docuSelector.edms_doc_master_list) {
                _docu.push({
                    docu_no: docu.docu_no,
                    project_name: docu.project_name,
                    discipline_name: docu.discipline_name,
                    docu_code: docu.docu_code,
                    docu_subject: docu.docu_subject,
                    process_code: docu.process_code,
                    docu_type: docu.docu_type,
                    stage_code: docu.stage_code,
                    status: docu.status,
                    weight: docu.weight,
                });
            }
            setDocuList([..._docu]);
            setDocuListKeys([...Object.keys(_docu[0])]);
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
        } else if (docuSelector.edms_doc_master_list.length == 0) {
            setDocuList([]);
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
        }
    }, [docuSelector.edms_doc_master_list]);

    const onCheckChange = (selectItems: any) => {
        let docus = Object.keys(selectItems);
        let checked: number[] = [];
        let checkData: any[] = [];
        for (var docu of docus) {
            if (selectItems[docu] === true) {
                let data = docuSelector.edms_doc_master_list.find(
                    (raw: any) => raw.docu_no == docu
                );
                checked.push(parseInt(docu));
                checkData.push(data);
            }
        }
        setChecked([...checked]);
        setCheckedDocu([...checkData]);
    };

    // const onExpandChange = (e: any) => {
    //     e.item.opened = !e.item.opened;
    // };

    const onClickEdit = () => {
        if (checked.length > 1 || checked.length == 0) {
            setVisibleToast(true);
            setTimeout(() => {
                setVisibleToast(false);
            }, 2000);
            return;
        }
        setProjectTreeModalVisible(true);
        setIsEdit(1);
    };

    const onClickDel = async () => {
        if (checked.length > 0) {
            let _list: number[] = [];
            checkedDocu.map((val: any, idx: number) => {
                _list.push(val.docu_no);
            });
            let res = confirm("선택한 문서를 삭제하시겠습니까?");
            if (res) {
                await dispatch(DeleteDocument(_list));
                ModalInfo("삭제를 완료했습니다.");
            }
        }
    };

    const onClickAdd = () => {
        setProjectTreeModalVisible(true);
        setIsEdit(0);
    };

    const onClickDownload = async () => {
        setIsLoading(true);
        await getExcelFileByType("document", { proj_no: projSelector.now_project_no });
        setTimeout(() => {
            setIsLoading(false);
        }, 500);
    };

    const onCloseModal = () => {
        setProjectTreeModalVisible(false);
        setEditData({});
        setIsEdit(-1);
    };

    // const onClickMove = () => {
    //     pushHistory("/edms/category");
    // };

    const onClickDetail = (idx: number) => {
        pushHistory(
            `/edms/docuact/detail/${docuSelector.edms_doc_master_list[idx].cate_no}/${docuList[idx].docu_no}`
        );
    };

    // const onClickPrint = () => {
    //     let _exportEl = document.getElementById("excel_export");
    //     if (_exportEl) _exportEl.click();
    // };

    const onSearch = () => {
        if (docuSelector.edms_doc_master_list.length > 0) {
            let _data = docuSelector.edms_doc_master_list;
            let searchDataList: any[] = _data.filter(
                (raw: any) =>
                    raw.docu_subject.indexOf(searchData) != -1 ||
                    raw.docu_code.indexOf(searchData) != -1
            );
            setDocuList([...searchDataList]);
            setChecked([]);
            setCheckedDocu([]);
        }
    };

    // const onChangeActionSelect = (e: any) => {
    //     setActionValue(-1);
    //     switch (e.target.value) {
    //         case 0:
    //             onClickDownload();
    //             return;
    //         case 1:
    //             setExcelUploadModalVisible(true);
    //             return;
    //         case 2:
    //         default:
    //             setFileUploadModalVisible(true);
    //             return;
    //     }
    // };
    return (
        <>
            <LoadingIndicatorComponent open={isLoading} style={{ zIndex: 1301 }} />
            <ToastComponent
                text="하나의 문서를 선택해주세요."
                close={() => setVisibleToast(false)}
                visible={visibleToast}
                type={"warning"}
                style={{ position: "absolute", bottom: 100, right: 100, alignItems: "center" }}
            />
            <FileUploadModalComp
                visible={fileUploadModalVisible}
                onClose={() => setFileUploadModalVisible(false)}
            />

            {/* <ExcelUploadModalComp
                visible={excelUploadModalVisible}
                onClose={() => setExcelUploadModalVisible(false)}
            /> */}

            <EdmsDocumentFormModal
                visible={projectTreeModalVisible}
                onClose={onCloseModal}
                EditData={editData}
                isEdit={isEdit}
                checkList={checkedDocu}
            />
            <EdmsProjectBase>
                {/*Body*/}
                <S.ContentContainer>
                    <S.WorkListContainer>
                        <S.StructureTable>
                            <S.StructureTableHead>
                                <S.FolderTitle>
                                    <img src={folerIcon} alt="" />
                                    문서 목록
                                </S.FolderTitle>
                                {/* <docS.SelectBox
                                    value={actionValue}
                                    onChange={onChangeActionSelect}
                                    disableUnderline={true}
                                >
                                    <docS.SelectItem value={-1}>선택</docS.SelectItem>
                                    {DOC_ACTION_LIST.map((raw, idx) => {
                                        return (
                                            <docS.SelectItem
                                                key={"DOC_ACTION_SELECT" + idx}
                                                value={idx}
                                            >
                                                {raw}
                                            </docS.SelectItem>
                                        );
                                    })}
                                </docS.SelectBox> */}
                                {/* <docS.DocumentToolBtn onClick={onClickPrint}>
                                    <img src="assets/images/edms/print.svg" />
                                    출력
                                </docS.DocumentToolBtn> */}
                                <docS.DocumentToolBtn onClick={onClickAdd}>
                                    <img src="assets/images/edms/edit.svg" alt="" />
                                    등록
                                </docS.DocumentToolBtn>
                                <docS.DocumentToolBtn onClick={onClickEdit}>
                                    <img src={editIcon} alt="" />
                                    수정
                                </docS.DocumentToolBtn>
                                <docS.DocumentToolBtn onClick={onClickDel}>
                                    <img src={trashIcon} alt="" />
                                    삭제
                                </docS.DocumentToolBtn>
                                <s.SearchDiv>
                                    <input
                                        type="text"
                                        placeholder="검색"
                                        value={searchData}
                                        onChange={e => setSearchData(e.target.value)}
                                        onKeyUp={e => {
                                            if (e.key == `Enter`) onSearch();
                                        }}
                                    />
                                    <s.DocumentWorklistSearchBtn>
                                        <img
                                            src="assets/images/edms/search-solid.svg"
                                            onClick={onSearch}
                                        />
                                    </s.DocumentWorklistSearchBtn>
                                </s.SearchDiv>
                            </S.StructureTableHead>

                            <GridViewComponent
                                fullData={docuList}
                                titles={tableHeader}
                                keys={docuListKeys}
                                values={docuList}
                                keysWidth={tableHeadSize}
                                rowClass="background-color-white color-light-black"
                                headerClass="background-dark-sky-blue color-white align-center"
                                // getCustomEl={createCustomEl}
                                datatype={tableHeadType}
                                sortable
                                groupable
                                reorderable
                                pageable
                                gridStyle={{ height: "92%" }}
                                excelFilename="문서리스트"
                                isSelect
                                isSelectSingle
                                onChangeSelect={onCheckChange}
                                selectKey={"docu_no"}
                            />
                        </S.StructureTable>
                    </S.WorkListContainer>
                </S.ContentContainer>
            </EdmsProjectBase>
        </>
    );
};

export default EdmsDocumentListPage;
