/******************************************************************************
 * hooks :
 * useLocations
 * components :
 *                                                                         455qq
 *

 ******************************************************************************/
import { useDispatch, useSelector } from "react-redux"; // redux
import React, { useState, useEffect } from "react";

import { EdmsTreeViewComp } from "../components";
import { GridViewComponent, LoadingIndicatorComponent, gridViewChildrenType } from "components";
//util
import * as S from "../styled/edmsTmpDocumentlist.styled";
import * as T from "../styled/edmsProject.styled";

import { reducerState } from "../common";
import { GetWorkReviewList } from "../common/action";

import moment from "moment";

const tableHeadType = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
const tableHeadSize = [0.2, 0.5, 0.5, 0.6, 0.8, 1.3, 0.3, 0.2, 0.4, 1.5, 0.4, 1.5, 0.2];
const tableHeader = [
    "No",
    "Project",
    "Project Type",
    "Discipline",
    "Document Number",
    "DESCRIPTION",
    "Page / Sheet No",
    "Rev",
    "검토결과(*Note)",
    "Review Comment",
    "작성자",
    "Reply",
    "설계변경(Y/N)",
];

const EdmsReviewListPage = (props: any) => {
    const dispatch = useDispatch();
    const waSelector = useSelector((state: reducerState) => state.achieve);
    const nowDate = moment();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [achieveList, setAchieveList] = useState<any[]>([]);

    const [selectedTreeItems, setSelectedTreeItems] = useState<any>(null);
    const [selectedType, setSelectedType] = useState<string>("");
    const [selectedNo, setSelectedNo] = useState<number>(-1);

    useEffect(() => {
        dispatch(GetWorkReviewList());
    }, []);

    useEffect(() => {
        if (selectedNo && selectedNo != -1) {
            makeList();
        }
    }, [selectedNo]);

    useEffect(() => {
        makeList();
    }, [waSelector.work_review_list]);

    const makeList = () => {
        setIsLoading(true);
        let _achievelist = [];
        if (waSelector.work_review_list && waSelector.work_review_list.length > 0) {
            let data = waSelector.work_review_list;
            if (selectedNo != -1) {
                data = data.filter((raw: any) => {
                    if (selectedType == "document") {
                        return raw.docu_no == selectedNo;
                    } else if (selectedType == "category" || selectedType == "pcategory") {
                        return raw.cate_no == selectedNo;
                    } else if (selectedType == "discipline") {
                        return raw.discipline_id == selectedNo;
                    } else if (selectedType == "project") {
                        return raw.project_no == selectedNo;
                    }
                });
            }
            if (data.length > 0) {
                let idx = 1;
                for (var review of data) {
                    _achievelist.push({
                        No: idx++,
                        Project: review.project_name,
                        "Project Type": review.projtypename,
                        Discipline: review.name,
                        "Document Number": review.docu_code,
                        DESCRIPTION: review.description,
                        "Page / Sheet No": review.page_sheet_no,
                        Rev: review.stage ? `${review.stage.revision}` : "1",
                        "검토결과(*Note)": `Code ${review.code}`,
                        Review_Comment: `${review.contents}`,
                        작성자: `${review.username}`,
                        Reply: `${review.reply}`,
                        "설계변경(Y/N)": `${review.is_change_design}`,
                    });
                }
                setAchieveList([..._achievelist]);
            } else {
                setAchieveList([]);
            }
        } else if (waSelector.work_review_list && waSelector.work_review_list.length == 0) {
            setAchieveList([]);
        }
        setTimeout(() => {
            setIsLoading(false);
        }, 300);
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

    const getCustomEl = (idx: number, dataidx?: number) => {
        if (idx == 9) {
            if (dataidx === undefined) return true;
            let reviewComment: string = "";

            if (achieveList[dataidx] && achieveList[dataidx].Review_Comment) {
                reviewComment = achieveList[dataidx].Review_Comment;
            }

            return (
                <T.TableTd>
                    {reviewComment != "" && reviewComment != "-" ? (
                        <div
                            style={{ textAlign: "center" }}
                            dangerouslySetInnerHTML={{ __html: reviewComment }}
                        />
                    ) : (
                        <div style={{ textAlign: "center" }}> - </div>
                    )}
                </T.TableTd>
            );
        } else if (idx == 11) {
            if (dataidx === undefined) return true;
            let replyComment: string = "";

            if (achieveList[dataidx] && achieveList[dataidx].Reply) {
                replyComment = achieveList[dataidx].Reply;
            }

            return (
                <T.TableTd>
                    {replyComment != "" && replyComment != "-" ? (
                        <div
                            style={{ textAlign: "center" }}
                            dangerouslySetInnerHTML={{ __html: replyComment }}
                        />
                    ) : (
                        <div style={{ textAlign: "center" }}> - </div>
                    )}
                </T.TableTd>
            );
        }
    };

    return (
        <>
            <style>
                {`
                     .k-grid table {
                         width : 80% !important;
                         margin : 0 -2px;
                     }
                     .k-grid td {
                         white-space : pre-wrap;
                     }
                 `}
            </style>
            <LoadingIndicatorComponent open={isLoading} style={{ zIndex: 100 }} />
            <S.DocumentWorklistContainer>
                <S.DocumentWorklistStruct>
                    <S.DocumentContentHeader>
                        <S.DocumentWorklistTableFolderTitle>
                            {selectedTreeItems && (
                                <div>
                                    <img src="assets/images/edms/worklist_dep3.svg" alt="" />
                                    <p>{selectedTreeItems.name}</p>
                                </div>
                            )}
                        </S.DocumentWorklistTableFolderTitle>
                    </S.DocumentContentHeader>
                    <S.DocumentTreeList>
                        <S.DocumentTreeViewBlock>
                            <EdmsTreeViewComp
                                onChangeTreeData={(data: any) => {}}
                                onTreeItemClick={onTreeItemClick}
                                // is_checked={true}
                                // onCheck={(ids : any)=>{console.log(ids)}}
                            />
                        </S.DocumentTreeViewBlock>
                    </S.DocumentTreeList>
                </S.DocumentWorklistStruct>
                <S.DoucmentAchievelistTableBox>
                    <S.DocumentWorklistTableBoxHeader></S.DocumentWorklistTableBoxHeader>
                    <S.GridViewWrap>
                        <GridViewComponent
                            fullData={achieveList}
                            titles={tableHeader}
                            keys={tableHeader}
                            values={Object.values(achieveList)}
                            keysWidth={tableHeadSize}
                            datatype={tableHeadType}
                            // rowClass="color-light-black"
                            headerClass="background-dark-sky-blue color-white align-center"
                            rowClass="background-color-white color-light-black"
                            keysWidthTotal={8}
                            pageable={true}
                            excelFilename={`${nowDate.format("YYYY-MM-DD")}_리뷰현황`}
                            getCustomEl={getCustomEl}
                        />
                    </S.GridViewWrap>
                </S.DoucmentAchievelistTableBox>
            </S.DocumentWorklistContainer>
        </>
    );
};

export default EdmsReviewListPage;
