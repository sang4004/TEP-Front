/******************************************************************************
 * hooks :
 * useLocations
 * components :
 *                                                                         455qq
 *

 ******************************************************************************/
import { useDispatch, useSelector } from "react-redux"; // redux
import React, { useState, useEffect } from "react";

import { EdmsTreeViewComp, EdmsDocuManageComp } from "../components";
import { GridViewComponent, LoadingIndicatorComponent } from "components";
//library
//image
//
//util
import * as S from "../styled/edmsDocumentManager.styled";

import { reducerState } from "../common";
import { EdmsDocumentManagerList } from "../common/action";
import moment from "moment";

const tableHeadType = [1, 1, 1, 1, 1, 1, 1, 1];
const tableHeadSize = [0.4, 0.4, 0.5, 0.7, 0.7, 0.6, 0.5, 0.5];
const tableHeader = [
    "Project",
    "Project Type",
    "Discipline",
    "Category",
    "Document",
    "회사",
    "그룹",
    "이름",
];

const EdmsDocumentManagerPage = (props: any) => {
    const dispatch = useDispatch();
    const pjSelector = useSelector((state: reducerState) => state.project);
    const nowDate = moment();

    // const [isLoading, setIsLoading] = useState<boolean>(false);
    const [managerList, setManagerList] = useState<any[]>([]);
    const [selectedTreeItems, setSelectedTreeItems] = useState<any>(null);
    const [selectedType, setSelectedType] = useState<string>("");
    const [selectedNo, setSelectedNo] = useState<number>(-1);
    const [visibleDocuManage, setVisibleDocuManage] = useState<boolean>(false);

    useEffect(() => {
        dispatch(EdmsDocumentManagerList());
    }, []);

    useEffect(() => {
        if ((selectedNo && selectedNo != -1) || selectedType == "ALL") {
            makeList();
        }
    }, [selectedNo, selectedType]);

    useEffect(() => {
        makeList();
    }, [pjSelector.docu_manager_page_list]);

    const makeList = () => {
        if (pjSelector.docu_manager_page_list && pjSelector.docu_manager_page_list.length > 0) {
            let data = pjSelector.docu_manager_page_list;
            if (selectedNo != -1) {
                data = data.filter((raw: any) => {
                    if (selectedType == "document") {
                        return raw.docu_no == selectedNo;
                    } else if (selectedType == "category" || selectedType == "pcategory") {
                        return raw.cate_no == selectedNo;
                    } else if (selectedType == "discipline") {
                        return raw.discipline_id == selectedNo;
                    } else if (selectedType == "project") {
                        return raw.project_type_no == selectedNo;
                    }
                });
            }

            let managerlist = [];

            if (data.length > 0) {
                for (var d of data) {
                    managerlist.push({
                        Project: d.project_name,
                        "Project Type": d.project_type_name,
                        Discipline: d.discipline_name,
                        Category: d.cate_name,
                        Document: d.docu_name,
                        회사: d.company_name,
                        그룹: d.group_name,
                        이름: d.user_name,
                    });
                }
                setManagerList([...managerlist]);
            } else {
                setManagerList([]);
            }
        } else if (
            pjSelector.edms_docu_manager_list &&
            pjSelector.edms_docu_manager_list.length == 0
        ) {
            setManagerList([]);
        }
    };

    const onTreeItemClick = (event: any) => {
        //If category, show data, otherwise skip
        setSelectedType(event.item.type);
        setSelectedTreeItems(event.item);
        if (event.item.type == "project") {
            setSelectedNo(event.item.project_no);
        } else if (event.item.type == "discipline") {
            setSelectedNo(event.item.discipline_id);
        } else if (event.item.type === "category" || event.item.type === "pcategory") {
            setSelectedNo(event.item.cate_no);
        } else if (event.item.type === "document") {
            setSelectedNo(event.item.docu_no);
        } else {
            setSelectedTreeItems(null);
        }
    };

    const openDocuManagerModal = () => {
        setVisibleDocuManage(true);
    };

    const clearSeletedTreeItem = (event: any) => {
        setSelectedTreeItems(null);
        setSelectedNo(-1);
        setSelectedType("ALL");
    };

    return (
        <>
            <EdmsDocuManageComp
                visible={visibleDocuManage}
                onClose={() => setVisibleDocuManage(false)}
            />
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
            {/* <LoadingIndicatorComponent open={isLoading} style={{ zIndex: 100 }} /> */}
            <S.DocumentWorklistContainer>
                <S.DocumentWorklistStruct>
                    <S.DocumentTreeList>
                        <S.DocumentTreeViewBlock>
                            <EdmsTreeViewComp
                                onChangeTreeData={data => {}}
                                onTreeItemClick={onTreeItemClick}
                                isHeader={true}
                                selectedHeaderItem={selectedTreeItems}
                                clearSeletedTreeItem={clearSeletedTreeItem}
                            />
                        </S.DocumentTreeViewBlock>
                    </S.DocumentTreeList>
                </S.DocumentWorklistStruct>
                <S.DoucmentAchievelistTableBox>
                    {/* <S.DocumentWorklistTableBoxHeader>
                        <S.DocumentManagerBtn
                            style={{ backgroundColor: "#FF9800" }}
                            onClick={openDocuManagerModal}
                        >
                            문서 담당자 수정
                        </S.DocumentManagerBtn>
                    </S.DocumentWorklistTableBoxHeader> */}
                    <S.GridViewWrap>
                        <GridViewComponent
                            fullData={managerList}
                            titles={tableHeader}
                            keys={tableHeader}
                            values={Object.values(managerList)}
                            keysWidth={tableHeadSize}
                            datatype={tableHeadType}
                            // rowClass="color-light-black"
                            headerClass="background-dark-sky-blue color-white align-center"
                            keysWidthTotal={6}
                            pageable={true}
                            excelFilename={`${nowDate.format("YYYY-MM-DD")}_문서담당자`}
                            isCustomBtn
                            customBtnText={["문서담당자 수정"]}
                            onClickCustomBtn={openDocuManagerModal}
                        />
                    </S.GridViewWrap>
                </S.DoucmentAchievelistTableBox>
            </S.DocumentWorklistContainer>
        </>
    );
};

export default EdmsDocumentManagerPage;
