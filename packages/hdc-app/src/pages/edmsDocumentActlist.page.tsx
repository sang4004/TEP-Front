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
import * as S from "../styled/edmsDocumentActlist.styled";
import * as T from "../styled/edmsProject.styled";

import { useDispatch, useSelector } from "react-redux"; // redux
import {
    GridViewComponent,
    LoadingIndicatorComponent,
    gridViewChildrenType,
    ModalInfo,
} from "components";

import {
    TreeView,
    TreeViewItemClickEvent,
    TreeViewExpandChangeEvent,
} from "@progress/kendo-react-treeview";
import { EdmsProjectBase, FileUploadModalComp } from "../components";
import { reducerState } from "../common";
import React, { useState, useEffect, ChangeEvent } from "react";
import { useLocations } from "hooks";
import categorySvg from "../images/edms/worklist_dep3.svg";
import scategrorySvg from "../images/edms/worklist_dep4.svg";
import {
    GetDocumentList,
    GetCategoryProjects,
    GetEdmsCateStatusList,
    CreateListTmpBox,
} from "../common/action";
import { getZipFileByType } from "../common/utils";
import moment from "moment";

//Get Data
const tableHeadType = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
const tableHeadSize: number[] = [0.4, 0.4, 2.6, 1, 1, 1, 1, 1, 1, 0.6, 0.6, 0.6, 0.5];
const tableHeader: string[] = [
    "선택",
    "No",
    "문서 코드/제목",
    "실적파일수량",
    "Start",
    "IFA Issue (A)",
    "IFA_Approval",
    "AFC Approval(REV.0)",
    "As-Built",
    "W/V( % )",
    "Plan( % )",
    "Actual( % )",
    "Remark",
];

// const tableChildren: gridViewChildrenType = {
//     Start: [
//         { field: "Start.P", title: "P", headerClassName: `align-center` },
//         { field: "Start.A", title: "A", headerClassName: "align-center" },
//     ],
//     IFA_Issue: [
//         { field: "IFA_Issue.P", title: "P", headerClassName: "align-center" },
//         { field: "IFA_Issue.A", title: "A", headerClassName: "align-center" },
//     ],
//     IFA_Approve: [
//         { field: "IFA_Approve.P", title: "P", headerClassName: "align-center" },
//         { field: "IFA_Approve.A", title: "A", headerClassName: "align-center" },
//     ],
//     AFC_Approval: [
//         { field: "AFC_Approval.P", title: "P", headerClassName: "align-center" },
//         { field: "AFC_Approval.A", title: "A", headerClassName: "align-center" },
//     ],
//     As_Built: [
//         { field: "As_Built.P", title: "P", headerClassName: "align-center" },
//         { field: "As_Built.A", title: "A", headerClassName: "align-center" },
//     ],
// };

type CategoryProject = {
    PM_idx: number;
    create_by: string;
    create_tm: string;
    end_dt: Date;
    explan: string;
    is_use_approval: string;
    modify_by: string;
    modify_tm: Date;
    org_id: number;
    pproject_no: number;
    project_code: string;
    project_name: string;
    project_no: number;
    start_dt: Date;
    state: string;
};

const EdmsDocumentActListPage = (props: any) => {
    const dispatch = useDispatch();
    const { pushHistory } = useLocations();
    const [projectTreeModalVisible, setProjectTreeModalVisible] = useState<boolean>(false);
    const documentSelector = useSelector((state: reducerState) => state.document);
    const cateSelector = useSelector((state: reducerState) => state.category);
    const projSelector = useSelector((state: reducerState) => state.project);

    const [formTree, setFormTree] = useState<any[]>([]);
    //TODO: SelectedTreeItem type -> something but any
    const [selectedTreeItems, setSelectedTreeItems] = useState<any>(null);
    const [selectedProject, setSelectedProject] = useState<string>("");
    const [selectedTeam, setSelectedTeam] = useState<string>("");
    const [documentList, setDocumentList] = useState<any[]>([]);
    const [projectList, setProjectList] = useState<any[]>([]);
    const [categoryList, setCategoryList] = useState<any[]>([]);
    const [projectNo, setProjectNo] = useState<number>(-1);
    const [selectedCateNo, setSelectedCateNo] = useState<number>(-1);
    const [fileUploadModalVisible, setFileUploadModalVisible] = useState<boolean>(false);
    const [serachData, setSearchData] = useState<string>("");
    const [check, setCheck] = useState<number[]>([]);
    const [downloadType, setDownloadType] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        dispatch(GetCategoryProjects());
    }, []);

    useEffect(() => {
        if (selectedCateNo !== -1) {
            dispatch(GetDocumentList(selectedCateNo));
        }
    }, [selectedCateNo]);

    useEffect(() => {
        if (documentSelector.document_list && documentSelector.document_list.length > 0) {
            const list: any[] = [...documentSelector.document_list];
            var temp: any[] = [];
            var sum: number = 1;
            for (var el of list) {
                let listvalues: string[] = Object.values(el);
                temp = [
                    ...temp,
                    {
                        id: el.docu_no,
                        no: sum,
                        docu: el.docu_code + `/` + el.docu_subject,
                        files: el.file_list,
                        Start: setStage(listvalues[18]),
                        IFA_Issue: setStage(listvalues[19]),
                        IFA_Approve: setStage(listvalues[20]),
                        AFC_Approval: setStage(listvalues[22]),
                        As_Built: setStage(listvalues[23]),
                        W_V: "10%",
                        Plan: "20%",
                        Actual: "30%",
                        Remark: "",
                    },
                ];
                sum = sum + 1;
            }
            setDocumentList(temp);
        }
    }, [documentSelector.document_list]);

    useEffect(() => {
        if (cateSelector.cate_proj_list && cateSelector.cate_proj_list.length > 0) {
            setProjectList([...cateSelector.cate_proj_list]);
        }
    }, [cateSelector.cate_proj_list]);

    useEffect(() => {
        if (cateSelector.edms_cate_status_list && cateSelector.edms_cate_status_list.length > 0) {
            setCategoryList([...cateSelector.edms_cate_status_list]);
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
        } else {
            setCategoryList([]);
            setFormTree([]);
            setIsLoading(false);
        }
    }, [cateSelector.edms_cate_status_list]);

    useEffect(() => {
        if (categoryList.length > 0 && projectList.length > 0) {
            makeTree();
        }
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, [categoryList, projectList]);

    useEffect(() => {
        if (projSelector.now_project_no !== undefined) {
            setIsLoading(true);
            setProjectNo(projSelector.now_project_no);
            dispatch(GetEdmsCateStatusList());
        }
    }, [projSelector.now_project_no]);

    useEffect(() => {
        if (selectedTreeItems) {
            let ids = selectedTreeItems.id;
            try {
                let root_id = ids.slice(0, 1);
                let child_id = ids.slice(2, 3);
                setSelectedProject(formTree[parseInt(root_id)].text);
                setSelectedTeam(formTree[parseInt(root_id)].items[parseInt(child_id)].text);
            } catch (err) {
                setSelectedProject("");
                setSelectedTeam("");
            }
        } else {
            setSelectedProject("");
            setSelectedTeam("");
        }
    }, [selectedTreeItems]);

    useEffect(() => {
        makeTree(serachData);
    }, [serachData]);

    const setStage = (stage: any) => {
        if (stage) {
            if (stage.action && stage.action != null)
                return { date: moment(stage.action).format(`YY-MM-DD`), flag: stage.flag };
            else if (stage.plan && stage.plan != null)
                return { date: moment(stage.plan).format(`YY-MM-DD`), flag: stage.flag };
            else return ``;
        }
    };

    const makeTree = (serachData: null | string = null) => {
        if (projectList.length != 0) {
            const choosenProject: CategoryProject = projectList.filter(
                pro => pro.project_no === projectNo
            )[0];

            let list: any[] = [];
            let nameList: any[] = [];
            for (let cate of categoryList) {
                let is_expand = serachData && cate.cate_name.indexOf(serachData) == -1;
                if (cate.pcate_no === 0) {
                    list.push({
                        text: cate.cate_name,
                        id: list.length,
                        type: "pcategory",
                        items: [],
                        expanded: true,
                        cate_no: cate.cate_no,
                        is_expand: is_expand,
                    });

                    nameList.push(cate.cate_name);
                }
            }

            for (let cate of categoryList) {
                if (list.length > 0 && cate.pcate_no != 0) {
                    const pcate = categoryList.filter(el => el.cate_no === cate.pcate_no)[0];
                    if (pcate.length != 0) {
                        try {
                            if (serachData && cate.cate_name.indexOf(serachData) == -1) continue;
                            let is_expand = serachData && cate.cate_name.indexOf(serachData) == -1;
                            const index = nameList.indexOf(pcate.cate_name);
                            list[index].items.push({
                                text: cate.cate_name,
                                id: list[index].id + "_" + list[index].items.length,
                                type: "category",
                                items: [],
                                expanded: true,
                                cate_no: cate.cate_no,
                                is_expand: is_expand,
                            });
                        } catch (err) {
                            setFormTree([]);
                        }
                    }
                }
            }
            setFormTree([...list]);
        } else {
            setFormTree([]);
        }
    };
    const onClickAdd = () => {
        setProjectTreeModalVisible(true);
    };

    const onCloseModal = () => {
        setProjectTreeModalVisible(false);
    };

    const onClickDownload = () => {
        window.location.href = "assets/files/성과물 일괄업로드 포맷.xlsx";
    };

    //TreeView Event Handler
    const onTreeExpandChange = (event: TreeViewExpandChangeEvent) => {
        event.item.expanded = !event.item.expanded;
    };

    const onTreeItemClick = (event: TreeViewItemClickEvent) => {
        //If category, show data, otherwise skip
        if (event.item.type === "category" || event.item.type === "pcategory") {
            setSelectedTreeItems(event.item);
            setSelectedCateNo(event.item.cate_no);
        } else {
            setSelectedTreeItems(null);
        }
    };

    const onClickCheck = (e: ChangeEvent<any>, idx: number) => {
        if (e.target.checked) check.push(idx);
        else check.splice(check.indexOf(idx), 1);
        setCheck([...check]);
    };

    const FileDownload = async () => {
        if (check.length > 0) {
            let ids = [];
            for (var l of check) {
                ids.push(documentList[l].id);
            }
            await getZipFileByType("document", "문서실적일괄다운로드", ids, downloadType ? 0 : 1);
        }
    };

    const createCustomEl = (idx: number, dataidx?: number) => {
        let data: any = {};
        if (dataidx != undefined) data = documentList[dataidx];

        if (idx === 0) {
            if (dataidx == undefined) return true;
            return (
                <T.TableTd>
                    <T.TableCheckbox
                        checked={check.indexOf(dataidx) != -1}
                        onChange={e => onClickCheck(e, dataidx)}
                    />
                </T.TableTd>
            );
        } else if (idx === 2) {
            if (dataidx == undefined) return true;
            let docu = [];
            if (data && data.docu) docu = data.docu.split(`/`);
            return (
                <T.TableTd style={{ color: "darkorange" }}>
                    <T.TableCode
                        onClick={() => {
                            onClickDetail(dataidx);
                        }}
                    >
                        {docu[0]}
                    </T.TableCode>
                    {docu[1]}
                </T.TableTd>
            );
        } else if (idx >= 4 && idx <= 8) {
            if (dataidx == undefined || data == undefined || Object.keys(data).length == 0)
                return true;
            let date_data = null;
            if (idx === 4) date_data = data.Start;
            else if (idx === 5) date_data = data.IFA_Issue;
            else if (idx === 6) date_data = data.IFA_Approve;
            else if (idx === 7) date_data = data.AFC_Approval;
            else if (idx === 8) date_data = data.As_Built;
            if (date_data)
                return (
                    <T.TableTd $dateType={date_data ? date_data.flag : null}>
                        <T.TableDate>{date_data ? date_data.date : ""}</T.TableDate>
                    </T.TableTd>
                );
            else return <T.TableTd></T.TableTd>;
        }
        return null;
    };

    const onClickDetail = (idx: number) => {
        pushHistory(
            `/edms/docuact/detail/${selectedCateNo}/${documentSelector.document_list[idx].docu_no}`
        );
    };

    const onClickTmpDocu = async () => {
        if (check.length == 0) ModalInfo("문서를 선택해주세요.");
        if (check.length > 0) {
            let _check: number[] = [];
            check.map(idx => {
                let _docu: any = documentSelector.document_list[idx];
                _check.push(_docu.docu_no);
            });
            dispatch(CreateListTmpBox(_check));
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
                ModalInfo("임시보관함 추가완료");
                pushHistory("/edms/tmpDocList");
            }, 1000);
        }
    };

    let depthIcon = ">";

    return (
        <>
            <LoadingIndicatorComponent open={isLoading} style={{ zIndex: 1301 }} />
            <EdmsProjectBase>
                <FileUploadModalComp
                    visible={fileUploadModalVisible}
                    onClose={() => setFileUploadModalVisible(false)}
                />
                <S.DocumentWorklistContainer>
                    <S.DocumentWorklistStruct>
                        <S.DocumentContentHeader>
                            <S.DocumentWorklistTitle>카테고리</S.DocumentWorklistTitle>
                        </S.DocumentContentHeader>
                        {/* Treeview */}
                        <S.TreeSearchDiv>
                            <input
                                type="text"
                                placeholder="작업항목 검색"
                                value={serachData}
                                onChange={e => setSearchData(e.target.value)}
                            />
                            <S.TreeSearchBtn>
                                <img src="assets/images/edms/search-solid.svg" />
                            </S.TreeSearchBtn>
                        </S.TreeSearchDiv>
                        <S.DocumentTreeList>
                            <TreeView
                                className="edms_document_treeview"
                                data={formTree}
                                expandIcons={true}
                                onItemClick={onTreeItemClick}
                                onExpandChange={onTreeExpandChange}
                                item={props => {
                                    switch (props.item.type) {
                                        case "project":
                                            return (
                                                <>
                                                    <S.TreeIcon src={categorySvg} />
                                                    {props.item.text}
                                                </>
                                            );
                                        case "pcategory":
                                            return (
                                                <>
                                                    <S.TreeIcon src={scategrorySvg} />
                                                    {props.item.text}
                                                </>
                                            );
                                        case "category":
                                            return (
                                                <>
                                                    <S.TreeIcon src={categorySvg} />
                                                    {props.item.text}
                                                </>
                                            );
                                        default:
                                            return <></>;
                                    }
                                }}
                            />
                        </S.DocumentTreeList>
                    </S.DocumentWorklistStruct>
                    <S.DoucmentWorklistTableBox>
                        <S.DocumentWorklistTableBoxHeader>
                            <S.DocumentWorklistTableFolderTitle>
                                {selectedTreeItems && (
                                    <>
                                        <img src="assets/images/edms/worklist_dep3.svg" alt="" />
                                        <p>{selectedTreeItems.text}</p>
                                        <S.DocumentWorklistBreadcrumb>
                                            {/* ex) 0_1_2 -> 
                                                root parent = formTree's 0th index;
                                                second parent = formTree's 0th index's 1th index;
                                             */}
                                            <S.DocumentWorklistDep>
                                                {selectedProject}
                                            </S.DocumentWorklistDep>
                                            <S.DocumentWorklistIcon>
                                                {depthIcon}
                                            </S.DocumentWorklistIcon>
                                            <S.DocumentWorklistDep>
                                                {selectedTeam}
                                            </S.DocumentWorklistDep>
                                        </S.DocumentWorklistBreadcrumb>
                                    </>
                                )}
                            </S.DocumentWorklistTableFolderTitle>
                            <S.FileCheckDiv>
                                <S.FileCheck
                                    checked={downloadType}
                                    onChange={() => {
                                        setDownloadType(!downloadType);
                                    }}
                                />
                                최신버전
                            </S.FileCheckDiv>
                            <S.FileDowloadBtn onClick={onClickTmpDocu}>
                                임시문서함추가
                            </S.FileDowloadBtn>
                            <S.FileDowloadBtn onClick={FileDownload}>일괄다운로드</S.FileDowloadBtn>
                            {/* <S.DocumentCreateBtn onClick={onClickDownload}>
                                일괄업로드 샘플파일
                            </S.DocumentCreateBtn> */}
                            <S.DocumentCreateBtn onClick={() => setFileUploadModalVisible(true)}>
                                문서 일괄 업로드
                            </S.DocumentCreateBtn>
                        </S.DocumentWorklistTableBoxHeader>
                        {/* Grid View Or Document Detail Clicked View */}
                        {/* Grid View */}
                        {/* --------------------------------------------------------- */}
                        <S.GridViewWrap>
                            <GridViewComponent
                                titles={tableHeader}
                                keys={Object.keys(documentList[0])}
                                values={Object.values(documentList)}
                                fullData={documentList}
                                keysWidth={tableHeadSize}
                                datatype={tableHeadType}
                                rowClass="background-color-white color-light-black"
                                headerClass="background-dark-sky-blue color-white align-center"
                                getCustomEl={createCustomEl}
                                // gridChildren={tableChildren}
                                keysWidthTotal={22}
                            />
                        </S.GridViewWrap>
                    </S.DoucmentWorklistTableBox>
                </S.DocumentWorklistContainer>
            </EdmsProjectBase>
        </>
    );
};

export default EdmsDocumentActListPage;
