/******************************************************************************
 * hooks :
 * useLocations
 * components :
 *
 *
 ******************************************************************************/
//react
import React, { useState, useEffect, ChangeEvent, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
//
// components
import {
    GridViewComponent,
    ToastComponent,
    LoadingIndicatorComponent,
    ModalInfo,
} from "components";
import { useElementPosition } from "hooks";
//
// inner components
import { reducerState } from "../common";
import {
    EdmsProjectBase,
    ProjectFromModalComp,
    EdmsUserManageComp,
    EdmsProjectWeightModal,
    EdmsAuthManageComp,
    EdmsProjectSettingComp,
    ExcelUploadModalComp,
    VpExcelUploadModalComp,
    VPISExcelUploadModalComp,
    FileUploadModalComp,
    EdmsDocuManageComp,
    EdmsMenuAuthorityModal,
    EdmsOfficialUserComp,
    PlantExcelUploadModalComp,
} from "../components";
import {
    GetEdmsProgProjectList,
    GetProjectManager,
    DeleteProject,
    SetNowProject,
    GetIndexData,
    GetProjectTypeList,
    GetProject,
    GetEdmsAddress,
    GetDiscipline,
    GetAllList,
} from "../common/action";
import { getExcelFileByType } from "../common/utils";
//
import moment from "moment";
//styled
import * as docS from "../styled/edmsDocument.styled";
import * as S from "../styled/project.styled";
//
//image
import AddIcon from "../images/edms/worklist_btn1.svg";
import EditIcon from "../images/edms/icon_edit_green.svg";
import DelIcon from "../images/edms/trash-white.svg";
//

const PROJECT_INDEXES = [
    "문서단계별 할증률",
    "조직 관리",
    // "권한 관리",
    // "유저 수정",
    "직급 수정",
    // "프로젝트 인덱스 수정",
    // "프로젝트 타입 인덱스 수정",
    // "분야 수정",
    // "구역 수정",
    // "항목 수정",
    // "문서 수정",
    "문서단계 수정",
    "문서 담당자 수정",
    // "메뉴 권한 수정",
    // "TM 채번 규칙 관리",
    "공문 담당자 관리",
];

const PROJECT_INDEXES_DESC = [
    "Actual Rate",
    "Company & Group & User",
    // "Authority",
    // "EDMS User Index",
    "Position Index",
    // "Project Index",
    // "Project Type Index",
    // "Discipline Index",
    // "Area Index",
    // "Category Index",
    // "Document Index",
    "Stage Index",
    "Document Manager Index",
    // "Menu Index",
    // "TM Code Index",
    "Offcial User Index",
];

const PROJECT_INDEXES_TYPE = [
    null,
    null,
    // null,
    // "users",
    "position",
    // "project",
    // "project_type",
    // "discipline",
    // "area",
    // "category",
    // "document",
    "stage_type",
    // "document_manager",
    null,
    // null,
    null,
];

const PROJECT_INDEXES_CUSTOM_IDX = [[], [], [], [], [2], [], [], [2], [], [1], [], [], [], []];

const PROJECT_INDEXES_CUSTOM_ID = [
    [],
    [],
    [],
    [],
    ["company_id"],
    [],
    [],
    // ["project_no"],
    [],
    // ["discipline_id"],
    [],
    [],
    [],
    [],
];

const TOAST_STYLE_BOTTOM = [100, 140, 180, 220, 260, 300, 340];

// 0 : grid, 1 : comp
const PROJECT_INDEXES_COMP = [
    1, 1,
    // 1,
    // 0,
    0,
    // 0,
    // 0,
    // 0,
    // 0,
    0,
    // 0,
    // 1,
    1, 1,
]; //, 1

const DOC_ACTION_LIST = [
    "문서 기준 엑셀 다운로드",
    "DCL 업로드",
    "VP Master List 엑셀 업로드",
    "VPIS 엑셀 업로드",
    "주기기 엑셀 업로드",
];

const ProjectPage = (props: any) => {
    const dispatch = useDispatch();
    const pjSelector = useSelector((state: reducerState) => state.project);
    const pjsettingSelector = useSelector((state: reducerState) => state.projectsettings);
    const fileSelector = useSelector((state: reducerState) => state.files);
    const userSelector = useSelector((state: reducerState) => state.user);

    const [projectFromVisible, setProjectFromVisible] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<number>(-1);
    const [visibleToast, setVisibleToast] = useState<boolean>(false);
    const [check, setCheck] = useState<number[]>([]);
    const [projList, setProjList] = useState<any>([]);
    const [projListKeys, setProjListKeys] = useState<any>([]);
    const [projTabVal, setProjTabVal] = useState<number>(1);
    const [gridType, setGridType] = useState<string | null>(null);
    const [visibleIndexPopup, setVisibleIndexPopup] = useState<number>(-1);
    const [visibleAuthManage, setVisibleAuthManage] = useState<boolean>(false);
    const [visibleDocuManage, setVisibleDocuManage] = useState<boolean>(false);
    const [visibleMenu, setVisibleMenu] = useState<boolean>(false);
    const [actionValue, setActionValue] = useState<number>(-1);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [fileUploadModalVisible, setFileUploadModalVisible] = useState<boolean>(false);
    // excel upload state
    const [excelUploadModalVisible, setExcelUploadModalVisible] = useState<boolean>(false);
    const [intervalDCL, setIntervalDCL] = useState<NodeJS.Timeout>();
    const [vpExcelUploadModalVisible, setVpExcelUploadModalVisible] = useState<boolean>(false);
    const [vpisExcelUploadModalVisible, setVpisExcelUploadModalVisible] = useState<boolean>(false);
    const [plantExcelUploadVisible, setPlantExcelUploadVisible] = useState<boolean>(false);

    const [intervalVP, setIntervalVP] = useState<NodeJS.Timeout>();
    const [intervalPlant, setIntervalPlant] = useState<NodeJS.Timeout>();
    //
    const [visibleOffcialUserVisble, setVisibleOffcialUserVisble] = useState<boolean>(false);
    const [dclToastList, setDclToastList] = useState<number[]>([]);
    const [countData, setCountData] = useState<{ id: number; total: number; count: number }[]>([]);

    const tableHeader = [
        "선택",
        "프로젝트 타입",
        "프로젝트 명",
        "담당자",
        "상태",
        "도큐먼트수",
        "성과물수",
        "시작일자",
        "종료일자",
        "W/V (%)",
        "Plan (%)",
        "Actual (%)",
    ];
    const tableHeadType = [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    const tableHeadSize = [0.3, 1.5, 1.2, 0.6, 0.6, 0.6, 0.6, 0.8, 0.8, 0.5, 0.5, 0.5];

    useEffect(() => {
        dispatch(GetEdmsProgProjectList());
        dispatch(GetProjectManager());
        dispatch(GetIndexData());
        dispatch(GetProjectTypeList());
        dispatch(GetEdmsAddress());
        dispatch(GetProject());
        dispatch(GetDiscipline());
    }, []);

    useEffect(() => {
        setCheck([]);
    }, [pjSelector.edit_project_data, pjSelector.delete_project_data]);

    useEffect(() => {
        if (isEdit == 1) setProjectFromVisible(true);
        else if (isEdit == 0) setProjectFromVisible(true);
        else setProjectFromVisible(false);
    }, [isEdit]);

    useEffect(() => {
        if (pjSelector.get_prog_project_list && pjSelector.get_prog_project_list.length > 0) {
            let _project = [];
            for (var project of pjSelector.get_prog_project_list) {
                _project.push({
                    project_no: project.project_no,
                    project_code: project.project_code,
                    project_name: project.project_name,
                    create_by: project.create_by,
                    status: project.status,
                    docu_cnt: project.docu_cnt,
                    file_cnt: project.file_cnt,
                    start_dt: project.start_dt
                        ? moment(project.start_dt).format("YYYY-MM-DD")
                        : null,
                    end_dt: project.end_dt ? moment(project.end_dt).format("YYYY-MM-DD") : null,
                    wv: `0.01`,
                    plan: `0.30`,
                    Actual: `0.30`,
                });
            }
            setProjList([..._project]);
            setProjListKeys([...Object.keys(_project[0])]);
        }
    }, [pjSelector.get_prog_project_list]);

    useEffect(() => {
        if (pjSelector.delete_project_data) dispatch(GetEdmsProgProjectList());
    }, [pjSelector.delete_project_data]);

    useEffect(() => {
        let count_upload = fileSelector.count_upload;
        let count_upload_ids: number[] = count_upload.map((raw: any) => raw.id);
        let now_ids = countData.map(raw => raw.id);

        if (count_upload_ids.length > 0) {
            setDclToastList([...count_upload_ids]);
            setCountData(count_upload);
        }
        if (count_upload_ids.length == 0 && now_ids.length > 0) {
            for (var id of now_ids) {
                let countidx = count_upload_ids.indexOf(id);
                let idx = dclToastList.indexOf(id);
                if (idx != -1) {
                    dclToastList.splice(idx, 1);
                }
                if (countidx == -1) {
                    now_ids.splice(countidx, 1);
                    setCountData(count_upload);
                }
            }
            if (dclToastList.length == 0 && now_ids.length == 0) {
                if (intervalDCL) clearInterval(intervalDCL);
                if (intervalVP) clearInterval(intervalVP);
            }
        }
    }, [fileSelector.count_upload]);

    const projectCreate = () => {
        setIsEdit(0);
    };

    const projectEdit = () => {
        if (check.length > 1 || check.length == 0) {
            setVisibleToast(true);
            return;
        }
        setProjectFromVisible(true);
        setIsEdit(1);
    };

    const projectDelect = () => {
        if (check.length > 0) {
            let _list: number[] = [];
            check.map((val: number) => {
                let _data: any = pjSelector.get_prog_project_list[val];
                _list.push(_data.project_no);
            });
            let res = confirm("프로젝트를 삭제하시겠습니까?");
            if (res) {
                dispatch(DeleteProject(_list));
                dispatch(GetAllList());
            }
        }
    };

    const onCloseProjectForm = () => {
        setProjectFromVisible(false);
        setIsEdit(-1);
    };

    const createCustomEl = (idx: number, dataidx?: number) => {
        if (idx === 0) {
            if (dataidx == undefined) return true;
            return (
                <S.TableTd>
                    <S.TableCheckbox
                        checked={check.indexOf(dataidx) != -1}
                        onChange={e => onClickCheck(e, dataidx)}
                    />
                </S.TableTd>
            );
        }
        return null;
    };

    const onClickCheck = (e: ChangeEvent<any>, idx: number) => {
        if (e.target.checked) check.push(idx);
        else check.splice(check.indexOf(idx), 1);
        setCheck([...check]);
    };

    const onClickRow = async (idx: number, selectedRow: any) => {
        await dispatch(SetNowProject(selectedRow.project_no));
    };

    const onClickIndexCard = (idx: number) => {
        if (PROJECT_INDEXES_COMP[idx] == 0) {
            //grid
            if (pjsettingSelector.index_data != undefined) {
                setGridType(PROJECT_INDEXES_TYPE[idx]);
                setVisibleIndexPopup(idx);
            }
        } else {
            setVisibleIndexPopup(idx);
        }
        // if (idx == 2) {
        //     setVisibleAuthManage(true);
        // }
        // else if (idx == 11) {
        //     setVisibleDocuManage(true);
        // }
        // else if (idx == 12) {
        //     setVisibleMenu(true);
        // }else
        if (idx == 4) {
            setVisibleDocuManage(true);
        } else if (idx == 5) {
            setVisibleOffcialUserVisble(true);
        }
    };

    const getContent = () => {
        if (projTabVal == 1) {
            return (
                <GridViewComponent
                    fullData={projList}
                    titles={tableHeader}
                    keys={projListKeys}
                    values={projList}
                    keysWidth={tableHeadSize}
                    rowClass="background-color-parent color-light-black"
                    headerClass="background-dark-sky-blue color-white align-center"
                    onClickRow={onClickRow}
                    getCustomEl={createCustomEl}
                    datatype={tableHeadType}
                    sortable
                    groupable
                    reorderable
                    gridStyle={{ height: "98%" }}
                />
            );
        } else if (projTabVal == 2) {
            if (
                [-1, ...PROJECT_INDEXES_COMP.map((raw, idx) => (raw != 0 ? idx : -1))].indexOf(
                    visibleIndexPopup
                ) == -1
            ) {
                return (
                    <EdmsProjectSettingComp
                        onClose={onClosePopup}
                        visible={gridType != null}
                        title={PROJECT_INDEXES[visibleIndexPopup]}
                        type={gridType}
                        customElIdx={PROJECT_INDEXES_CUSTOM_IDX[visibleIndexPopup]}
                        customElId={PROJECT_INDEXES_CUSTOM_ID[visibleIndexPopup]}
                    />
                );
            }
            return (
                <S.ProjectCardBlock>
                    {PROJECT_INDEXES.map((raw, idx) => {
                        return (
                            <S.ProjectCard
                                key={"Project_Index_Item" + idx}
                                onClick={onClickIndexCard.bind(this, idx)}
                            >
                                <S.ProjectCardMedia $index={idx} />
                                <S.ProjectCardContent>
                                    {raw}
                                    <h6>{PROJECT_INDEXES_DESC[idx]}</h6>
                                </S.ProjectCardContent>
                            </S.ProjectCard>
                        );
                    })}
                </S.ProjectCardBlock>
            );
        }
    };

    const onClosePopup = () => {
        setVisibleIndexPopup(-1);
        setGridType(null);
    };

    const onClickDownload = async () => {
        setIsLoading(true);
        await getExcelFileByType("document", { proj_no: pjSelector.now_project_no });
        setTimeout(() => {
            setIsLoading(false);
        }, 500);
    };

    const onChangeActionSelect = (e: any) => {
        setActionValue(-1);
        switch (e.target.value) {
            case 0:
                onClickDownload();
                return;
            case 1:
                setExcelUploadModalVisible(true);
                return;
            case 2:
                setVpExcelUploadModalVisible(true);
                return;
            case 3:
                setVpisExcelUploadModalVisible(true);
                // setFileUploadModalVisible(true);
                return;
            case 4:
                setPlantExcelUploadVisible(true);
                return;
            default:
                return;
        }
    };
    const ref = useRef(null);
    return (
        <>
            <ToastComponent
                text="체크박스 하나를 선택해주세요."
                close={() => setVisibleToast(false)}
                visible={visibleToast}
                type={"warning"}
                style={{ position: "absolute", bottom: 100, right: 100, alignItems: "center" }}
                duration={2000}
            />
            {dclToastList.map((raw, idx) => {
                return (
                    <ToastComponent
                        text={
                            fileSelector.count_upload.length > 0 &&
                            fileSelector.count_upload.map((data: any, idx: number) => {
                                if (data.id == raw) {
                                    return (
                                        Math.floor((data.count / data.total) * 100) +
                                        "% " +
                                        `(${data.count} / ${data.total} )`
                                    );
                                }
                            })
                        }
                        close={() => {}}
                        visible={true}
                        type={"warning"}
                        style={{
                            position: "absolute",
                            bottom: TOAST_STYLE_BOTTOM[idx],
                            right: 100,
                            alignItems: "center",
                        }}
                    />
                );
            })}
            <EdmsAuthManageComp
                visible={visibleAuthManage}
                onClose={() => setVisibleAuthManage(false)}
            />

            <EdmsDocuManageComp
                visible={visibleDocuManage}
                onClose={() => setVisibleDocuManage(false)}
            />

            <FileUploadModalComp
                visible={fileUploadModalVisible}
                onClose={() => setFileUploadModalVisible(false)}
            />

            <ExcelUploadModalComp
                visible={excelUploadModalVisible}
                onClose={() => setExcelUploadModalVisible(false)}
                interval={_interval => setIntervalDCL(_interval)}
            />

            <VpExcelUploadModalComp
                visible={vpExcelUploadModalVisible}
                onClose={() => setVpExcelUploadModalVisible(false)}
                interval={interval => setIntervalVP(interval)}
            />

            <VPISExcelUploadModalComp
                visible={vpisExcelUploadModalVisible}
                onClose={() => setVpisExcelUploadModalVisible(false)}
                interval={interval => setIntervalVP(interval)}
            />

            <PlantExcelUploadModalComp
                visible={plantExcelUploadVisible}
                onClose={() => setPlantExcelUploadVisible(false)}
                interval={interval => setIntervalPlant(interval)}
            />

            <ProjectFromModalComp
                visible={projectFromVisible}
                onClose={onCloseProjectForm}
                isEdit={isEdit}
                checkList={check}
            />

            <EdmsOfficialUserComp
                visible={visibleOffcialUserVisble}
                onClose={() => setVisibleOffcialUserVisble(false)}
            />

            <EdmsMenuAuthorityModal visible={visibleMenu} onClose={() => setVisibleMenu(false)} />

            <EdmsProjectWeightModal visible={visibleIndexPopup == 0} onClose={onClosePopup} />

            <EdmsUserManageComp visible={visibleIndexPopup == 1} onClose={onClosePopup} />

            {/* <EdmsTmRuleModal visible={visibleIndexPopup == 14} onClose={onClosePopup} /> */}

            <EdmsProjectBase>
                <LoadingIndicatorComponent open={isLoading} style={{ zIndex: 1301 }} />
                {/*Body*/}
                <S.ContentContainer>
                    <S.WorkListContainer>
                        <S.StructureTable>
                            <S.StructureTableHead>
                                <S.FolderTitle>
                                    <S.ProjectTabs
                                        value={projTabVal}
                                        onChange={(event, value) => setProjTabVal(value)}
                                        TabIndicatorProps={{
                                            style: { display: "none" },
                                        }}
                                    >
                                        <S.ProjectTab label={"프로젝트"} value={1} />
                                        {userSelector.edms_level == 1 && (
                                            <S.ProjectTab label={"프로젝트 설정"} value={2} />
                                        )}
                                        {/* <S.WorkProcTab label={"접수함"} value={3} /> */}
                                    </S.ProjectTabs>
                                    <S.ButtonDiv>
                                        <docS.SelectBox
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
                                        </docS.SelectBox>
                                        <docS.DocumentToolBtn onClick={projectCreate}>
                                            <img src={AddIcon} alt="AddIcon" />
                                            추가
                                        </docS.DocumentToolBtn>
                                        <docS.DocumentToolBtn onClick={projectEdit}>
                                            <img src={EditIcon} alt="EditIcon" />
                                            수정
                                        </docS.DocumentToolBtn>
                                        <docS.DocumentToolBtn onClick={projectDelect}>
                                            <img src={DelIcon} alt="DelIcon" />
                                            삭제
                                        </docS.DocumentToolBtn>
                                    </S.ButtonDiv>
                                </S.FolderTitle>
                            </S.StructureTableHead>
                            <S.WorkListTable
                                style={projTabVal == 2 ? { backgroundColor: "#F7F8F8" } : undefined}
                                $type={projTabVal}
                            >
                                {getContent()}
                            </S.WorkListTable>
                        </S.StructureTable>
                    </S.WorkListContainer>
                </S.ContentContainer>
            </EdmsProjectBase>
        </>
    );
};

export default ProjectPage;