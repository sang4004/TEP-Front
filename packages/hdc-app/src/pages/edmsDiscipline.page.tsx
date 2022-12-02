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

import { CreateDisciplineModalComp, EdmsProjectBase } from "../components";
import {
    GridViewComponent,
    ToastComponent,
    LoadingIndicatorComponent,
    ModalInfo,
} from "components";
import { GetDisciplineList, DeleteDiscipline, GetAllList } from "../common/action";
//styled
import * as S from "../styled/edmsProject.styled";
import * as docS from "../styled/edmsDocument.styled";
import * as s from "../styled/edmsDocumentActlist.styled";
//image
import folerIcon from "../images/fontawsomeicon/worklist_dep3.svg";
import trashIcon from "../images/edms/trash-white.svg";
import editIcon from "../images/edms/icon_edit_white.svg";

const tableHeadType = [0, 1, 1, 1, 1];
const tableHeadSize = [0.2, 0.5, 1, 1, 0.3];
const tableHeader = ["선택", "프로젝트", "분야", "코드", "VP 여부"];

const EdmsDisciplineListPage = () => {
    const dispatch = useDispatch();
    const [projectTreeModalVisible, setProjectTreeModalVisible] = useState<boolean>(false);
    const discSelector = useSelector((state: reducerState) => state.discipline);

    const [disciplineListKeys, setDisciplineListKeys] = useState<any[]>([]);
    const [isEdit, setIsEdit] = useState<number>(-1);
    const [checked, setChecked] = useState<number[]>([]);
    const [checkedDiscipline, setCheckedDiscipline] = useState<number[]>([]);
    const [visibleToast, setVisibleToast] = useState<boolean>(false);
    const [disciplineList, setDisciplineList] = useState<any>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [searchData, setSearchData] = useState<string>("");

    useEffect(() => {
        setIsLoading(true);
        dispatch(GetDisciplineList());
    }, []);

    useEffect(() => {
        if (discSelector.delete_discipline_data) dispatch(GetDisciplineList());
    }, [discSelector.delete_discipline_data]);

    useEffect(() => {
        if (isEdit == 1) setProjectTreeModalVisible(true);
        else if (isEdit == 0) setProjectTreeModalVisible(true);
    }, [isEdit]);

    useEffect(() => {
        setChecked([]);
        setCheckedDiscipline([]);
    }, [discSelector.edit_discipline_data, discSelector.delete_discipline_data]);

    useEffect(() => {
        if (discSelector.edms_discipline_list && discSelector.edms_discipline_list.length > 0) {
            let _disciplines = [];

            for (var discipline of discSelector.edms_discipline_list) {
                _disciplines.push({
                    discipline_id: discipline.id,
                    project_name: discipline.project_name,
                    discipline_name: discipline.name,
                    code: discipline.code,
                    isVp: discipline.is_vp,
                });
            }
            setDisciplineList([..._disciplines]);

            setDisciplineListKeys([...Object.keys(_disciplines[0])]);
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
        } else if (discSelector.edms_discipline_list.length == 0) {
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
            setDisciplineList([]);
        }
    }, [discSelector.edms_discipline_list]);

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
        setCheckedDiscipline([disciplineList[idx].discipline_id]);
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
            let res = confirm(`선택한 분야를 삭제하시겠습니까?`);
            if (res) {
                await dispatch(DeleteDiscipline(checkedDiscipline));
                dispatch(GetAllList());
                ModalInfo("삭제를 완료했습니다.");
            }
        }
    };

    const onCloseModal = () => {
        setProjectTreeModalVisible(false);
        setIsEdit(-1);
    };

    const onSearch = () => {
        if (discSelector.edms_discipline_list.length > 0) {
            let _data = discSelector.edms_discipline_list;
            let searchDataList: any[] = [];
            for (var d of _data) {
                if (d.code.indexOf(searchData) != -1 || d.name.indexOf(searchData) != -1) {
                    searchDataList.push({
                        discipline_id: d.id,
                        project_name: d.project_name,
                        discipline_name: d.name,
                        code: d.code,
                        isVp: d.is_vp,
                    });
                }
            }
            setDisciplineList([...searchDataList]);
            setChecked([]);
            setCheckedDiscipline([]);
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

            <CreateDisciplineModalComp
                visible={projectTreeModalVisible}
                onClose={onCloseModal}
                isEdit={isEdit}
                checkList={checkedDiscipline}
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
                                    분야 목록
                                </S.FolderTitle>
                                <S.CategoryAddButton onClick={onClickAdd}>
                                    새 분야 등록
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
                                        placeholder="코드 or 분야 검색"
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
                                    fullData={disciplineList}
                                    titles={tableHeader}
                                    keys={disciplineListKeys}
                                    values={disciplineList}
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

export default EdmsDisciplineListPage;
