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
import { useSelector, useDispatch } from "react-redux"; // redux
import React, { useState, useEffect, ChangeEvent } from "react";
import { reducerState } from "../common";

import { CreateCategoryModalComp, EdmsProjectBase } from "../components";
import {
    GridViewComponent,
    ToastComponent,
    LoadingIndicatorComponent,
    ModalInfo,
} from "components";
import {
    GetEdmsCateStatusList,
    GetCategoryLevelList,
    GetCategoryProjects,
    GetCategoryManager,
    DeleteCategory,
    GetAllList,
} from "../common/action";
//styled
import * as S from "../styled/edmsProject.styled";
import * as docS from "../styled/edmsDocument.styled";
import * as s from "../styled/edmsDocumentActlist.styled";
//image
import folerIcon from "../images/fontawsomeicon/worklist_dep3.svg";
import trashIcon from "../images/edms/trash-white.svg";
import editIcon from "../images/edms/icon_edit_white.svg";

const tableHeadType = [0, 1, 1, 1, 1, 1, 1, 1, 1];
const tableHeadSize = [0.3, 0.5, 0.5, 2, 2, 0.8, 0.8, 0.8, 0.8];
const tableHeader = [
    "선택",
    "프로젝트",
    "분야",
    "카테고리 명",
    "카테고리 코드",
    "문서 개수",
    "파일 개수",
    "성과물 개수",
    "카테고라 진도율",
];
const ROW_COLORS = ["#E5E5E5", "#F5F5F5", "#FFF"];

const EdmsCategory = () => {
    const dispatch = useDispatch();
    const [projectTreeModalVisible, setProjectTreeModalVisible] = useState<boolean>(false);
    const cateSelector = useSelector((state: reducerState) => state.category);

    const [cateStatusListKeys, setCateStatusListKeys] = useState<any[]>([]);
    const [isEdit, setIsEdit] = useState<number>(-1);
    const [checked, setChecked] = useState<number[]>([]);
    const [checkedCate, setCheckedCate] = useState<number[]>([]);
    const [visibleToast, setVisibleToast] = useState<boolean>(false);
    const [cateList, setCateList] = useState<any>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [searchData, setSearchData] = useState<string>("");
    const [gridRowColors, setGridRowColors] = useState<any[]>([]);

    useEffect(() => {
        setIsLoading(true);
        dispatch(GetEdmsCateStatusList());
        dispatch(GetCategoryLevelList());
        dispatch(GetCategoryProjects());
        dispatch(GetCategoryManager());
    }, []);

    useEffect(() => {
        if (cateSelector.delete_category_data) dispatch(GetCategoryLevelList());
    }, [cateSelector.delete_category_data]);

    useEffect(() => {
        if (isEdit == 1) setProjectTreeModalVisible(true);
        else if (isEdit == 0) setProjectTreeModalVisible(true);
    }, [isEdit]);

    useEffect(() => {
        setChecked([]);
        setCheckedCate([]);
    }, [cateSelector.edit_category_data, cateSelector.delete_category_data]);

    useEffect(() => {
        if (cateSelector.edms_cate_status_list && cateSelector.edms_cate_status_list.length > 0) {
            let _cates = [];
            let color_list = [];
            for (var status of cateSelector.edms_cate_status_list) {
                _cates.push({
                    cate_no: status.cate_no,
                    project_name: status.project_name,
                    discipline_name: status.discipline_name,
                    level_cate_name: status.level_cate_name,
                    cate_code: status.cate_code,
                    docu_cnt: status.end_cnt,
                    file_cnt: status.file_cnt,
                    achieve_cnt: status.achieve_cnt,
                    rate: status.rate,
                });
                color_list.push({
                    backgroundColor: `${ROW_COLORS[status.dept % ROW_COLORS.length]}`,
                });
            }
            setCateList([..._cates]);
            setGridRowColors([...color_list]);
            setCateStatusListKeys([...Object.keys(_cates[0])]);
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
        } else if (cateSelector.edms_cate_status_list.length == 0) {
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
            setCateList([]);
        }
    }, [cateSelector.edms_cate_status_list]);

    const createCustomEl = (idx: number, dataidx?: number) => {
        if (idx === 0)
            return (
                <S.TableTd>
                    <S.TableCheckbox
                        checked={checked.indexOf(dataidx ? dataidx : idx) != -1}
                        onChange={e => onClickCheck(e, dataidx ? dataidx : idx)}
                    />
                </S.TableTd>
            );
        return null;
    };

    const onClickCheck = (e: ChangeEvent<any>, idx: number) => {
        // if (e.target.checked) checked.push(idx);
        // else checked.splice(checked.indexOf(idx), 1);
        setChecked([idx]);
        setCheckedCate([cateList[idx].cate_no]);
    };

    const onExpandChange = (e: any) => {
        e.item.opened = !e.item.opened;
    };

    const onClickAdd = () => {
        setIsEdit(0);
    };

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
            let res = confirm("선택한 카테고리를 삭제하시겠습니까?");
            if (res) {
                await dispatch(DeleteCategory(checkedCate));
                await dispatch(GetEdmsCateStatusList());
                await dispatch(GetAllList);
                ModalInfo("삭제를 완료했습니다.");
            }
        }
    };

    const onCloseModal = () => {
        setProjectTreeModalVisible(false);
        setIsEdit(-1);
    };

    const onSearch = () => {
        if (cateSelector.edms_cate_status_list.length > 0) {
            let _data = cateSelector.edms_cate_status_list;
            let searchDataList: any[] = [];
            for (var d of _data) {
                if (
                    d.cate_code.indexOf(searchData) != -1 ||
                    d.level_cate_name.indexOf(searchData) != -1
                ) {
                    searchDataList.push({
                        cate_no: d.cate_no,
                        project_name: d.project_name,
                        discipline_name: d.discipline_name,
                        level_cate_name: d.cate_name,
                        cate_code: d.cate_code,
                    });
                }
            }
            setCateList([...searchDataList]);
            setChecked([]);
            setCheckedCate([]);
        }
    };

    return (
        <>
            <ToastComponent
                text="체크박스 하나를 선택해주세요."
                close={() => setVisibleToast(false)}
                visible={visibleToast}
                type={"warning"}
                style={{ position: "absolute", bottom: 100, right: 100, alignItems: "center" }}
            />

            <CreateCategoryModalComp
                visible={projectTreeModalVisible}
                onClose={onCloseModal}
                isEdit={isEdit}
                checkList={checkedCate}
            />
            <EdmsProjectBase>
                {/*Body*/}
                <LoadingIndicatorComponent open={isLoading} style={{ zIndex: 1301 }} />
                <S.ContentContainer>
                    <S.WorkListContainer>
                        <S.StructureTable>
                            <S.StructureTableHead>
                                <S.FolderTitle>
                                    <img src={folerIcon} alt="" />
                                    카테고리 목록
                                </S.FolderTitle>
                                <S.CategoryAddButton onClick={onClickAdd}>
                                    새 카테고리 등록
                                </S.CategoryAddButton>
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
                                        placeholder="카테고리 or 코드 검색"
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

                            <S.WorkListTable>
                                <GridViewComponent
                                    fullData={cateList}
                                    titles={tableHeader}
                                    keys={cateStatusListKeys}
                                    values={cateList}
                                    keysWidth={tableHeadSize}
                                    rowClass="color-light-black"
                                    headerClass="background-dark-sky-blue color-white align-center"
                                    getCustomEl={createCustomEl}
                                    datatype={tableHeadType}
                                    // sortable
                                    // filterable
                                    groupable
                                    reorderable
                                    pageable
                                />
                            </S.WorkListTable>
                        </S.StructureTable>
                    </S.WorkListContainer>
                </S.ContentContainer>
            </EdmsProjectBase>
        </>
    );
};

export default EdmsCategory;
