/******************************************************************************
 * projecttreemodal/index.tsx
 * hooks :
 * useLocations
 *
 ******************************************************************************/
// React
import React, { useState, useEffect, ChangeEvent } from "react"; // default hooks
import { useSelector, useDispatch } from "react-redux";
//
import { reducerState } from "../../common";
import { GridViewComponent } from "components";
import { digitalTwinDomain } from "../../common/network";
import { windowOpenByPopup, open3DModelFile } from "../../common/utils";
//
import closeSvg from "../../images/edms/times-solid-white.svg";

import * as S from "./styled";
import { GetFileReviewList, GetRevisionHisotory } from "../../common/action";
import moment from "moment";

const tableHeadType: number[] = [1, 1, 0, 1, 0];
const tableHeadSize: number[] = [0.5, 0.2, 1.4, 0.5, 1.4];
const tableHeader: string[] = ["작성자", "Code", "리뷰 내용", "작성일자", "답글"];

const tableHeadType1 = [1, 1, 0, 1, 1];
const tableHeadSize1 = [0.2, 0.5, 2, 0.5, 0.5];
const tableHeader1 = ["리비전", "스테이지", "파일이름", "상세보기", "리뷰보기"];

export type edmsRevisionHistoryProps = {
    style?: object;
    visible: boolean;
    onClose: () => void;
    docu_no: number;
};
interface FinaledmsRevisionHistoryProps extends edmsRevisionHistoryProps {}

export const EdmsRevisionHistoryModal: React.FunctionComponent<
    FinaledmsRevisionHistoryProps
> = props => {
    const dispatch = useDispatch();

    const workSelector = useSelector((state: reducerState) => state.work);
    const userSelector = useSelector((state: reducerState) => state.user);

    const [historyList, setHistoryList] = useState<any[]>([]);
    const [historyListKey, setHistoryListKey] = useState<any[]>([]);
    const [reviweList, setReviweList] = useState<any[]>([]);
    const [reviweListKey, setReviweListKey] = useState<any[]>([]);

    useEffect(() => {
        if (props.docu_no != -1) {
            dispatch(GetRevisionHisotory(props.docu_no));
        }
    }, [props.docu_no]);

    useEffect(() => {
        if (workSelector.revision_history.length > 0 && workSelector.revision_history) {
            let _list: any[] = [];
            for (var work of workSelector.revision_history) {
                _list.push({
                    revison: work.revision,
                    stage_name: work.stage_name,
                    file_name: work.file_name,
                    file_no: work.file_no,
                    wp_idx: work.wp_idx,
                });
            }
            setHistoryList([..._list]);
            setHistoryListKey([...Object.keys(_list[0])]);
        } else {
            setHistoryList([]);
            setHistoryListKey([]);
        }
    }, [workSelector.revision_history]);

    useEffect(() => {
        if (workSelector.file_reviwe_list && workSelector.file_reviwe_list.length > 0) {
            let _list: any[] = [];

            for (var fr of workSelector.file_reviwe_list) {
                _list.push({
                    create_by: fr.create_by,
                    contents: fr.contents,
                    code: fr.code + "Code",
                    reviwe_date: moment(fr.reviwe_date).format("YYYY-MM-DD"),
                    reply: fr.reply,
                });
            }
            setReviweListKey([...Object.keys(_list[0])]);
            setReviweList([..._list]);
        } else {
            setReviweListKey([]);
            setReviweList([]);
        }
    }, [workSelector.file_reviwe_list]);

    const onClose = () => {
        props.onClose();
    };

    const createHistoryCustomEl = (idx: number, dataIdx?: number) => {
        if (idx == 3) {
            if (dataIdx == undefined) return true;
            return (
                <S.TableTd>
                    <S.TableButtonDiv>
                        <S.TableButton
                            onClick={() => onClickPdfViewer(historyList[dataIdx].file_no)}
                        >
                            상세보기
                        </S.TableButton>
                    </S.TableButtonDiv>
                </S.TableTd>
            );
        }
        if (idx == 4) {
            if (dataIdx == undefined) return true;
            return (
                <S.TableTd>
                    <S.TableButtonDiv>
                        <S.TableButton
                            onClick={() =>
                                onClickReview(
                                    historyList[dataIdx].file_no,
                                    historyList[dataIdx].wp_idx
                                )
                            }
                        >
                            리뷰보기
                        </S.TableButton>
                    </S.TableButtonDiv>
                </S.TableTd>
            );
        }
    };

    const createCustomEl = (idx: number, dataIdx?: number) => {
        if (idx == 2) {
            if (dataIdx == undefined) return true;
            return (
                <S.TableTd>
                    <div dangerouslySetInnerHTML={reviweList[dataIdx].contents}></div>
                </S.TableTd>
            );
        }
        if (idx == 4) {
            if (dataIdx == undefined) return true;
            return (
                <S.TableTd>
                    <div dangerouslySetInnerHTML={reviweList[dataIdx].reply}></div>
                </S.TableTd>
            );
        }
    };

    const onClickPdfViewer = (file_no: number) => {
        let list: any[] = workSelector.revision_history;
        let file = list.find(raw => raw.file_no == file_no);
        if (get_file_type(file.file_type) === "도면" || file.file_type === "도면")
            open3DModelFile(file.repo_path, file_no, userSelector.edms_user_id);
        else
            windowOpenByPopup(
                `http://${window.location.host}/edms/pdfviewer/${file.file_no}?page_type=0`
            );
    };

    const onClickReview = (file_no: number, wp_idx: number) => {
        dispatch(GetFileReviewList(file_no, wp_idx));
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
                return "파일없음";
        }
    };

    return (
        <div>
            <S.Block open={props.visible ? true : false} onClose={props.onClose}>
                <S.Inner>
                    <S.ModalHeader>
                        <S.HeaderTitle>리비전 내역</S.HeaderTitle>
                        <S.ModalCloseBtn onClick={onClose}>
                            <img src={closeSvg} />
                        </S.ModalCloseBtn>
                    </S.ModalHeader>
                    <S.ModalContentWrap>
                        <S.ModalListBox>
                            <S.InnerContainerHeader>파일 리뷰 목록</S.InnerContainerHeader>
                            <S.ModalFileVersionList>
                                <GridViewComponent
                                    titles={tableHeader}
                                    keys={reviweListKey}
                                    values={reviweList}
                                    fullData={reviweList}
                                    keysWidth={tableHeadSize}
                                    rowClass="background-color-white color-light-black"
                                    headerClass="background-dark-sky-blue color-white align-center"
                                    datatype={tableHeadType}
                                    getCustomEl={createCustomEl}
                                    keysWidthTotal={6}
                                    noRecordsMsg={"표시할 내용이 없습니다."}
                                />
                            </S.ModalFileVersionList>
                        </S.ModalListBox>
                        <S.ModalHistoryListBox>
                            <GridViewComponent
                                titles={tableHeader1}
                                keys={historyListKey}
                                fullData={historyList}
                                values={historyList}
                                keysWidth={tableHeadSize1}
                                datatype={tableHeadType1}
                                getCustomEl={createHistoryCustomEl}
                                rowClass="background-color-white color-light-black"
                                headerClass="background-dark-sky-blue color-white align-center"
                                noRecordsMsg={"표시할 내용이 없습니다."}
                            />
                        </S.ModalHistoryListBox>
                    </S.ModalContentWrap>
                </S.Inner>
            </S.Block>
        </div>
    );
};
