/******************************************************************************
 * hooks :
 * useLocations
 * components :
 *
 *

 ******************************************************************************/
// import * as S from "../styled/edmsDetail.styled";
import projectGauge from "../images/fontawsomeicon/project_gauge.png";
import { useDispatch, useSelector } from "react-redux"; // redux
import {
    EdmsDocumentFormModal,
    ModelFileCreateModalComp,
    EdmsProjectBase,
    ModelElementViewComp,
} from "../components";
import { GridViewComponent } from "components";
import React, { useState, useEffect } from "react";

import { reducerState } from "../common";

import * as S from "../styled/edmsProject.styled";
import * as s from "../styled/edmsDocumentActlist.styled";
import { GetModelFileList } from "../common/action";
import moment from "moment";

const tableHeadSize: number[] = [0.15, 0.5, 0.3, 0.5, 1, 0.8, 0.3, 0.3];
const tableHeadType = [1, 1, 1, 0, 0, 1, 1, 1];
const tableHeader: string[] = ["No", "생성일", "작성자", "제목", "내용", "모델명", "상세보기", "태그보기"];

const EdmsModelManagePage = (props: any) => {
    const dispatch = useDispatch();
    const modelFileSelector = useSelector((state: reducerState) => state.modelfile);
    const projSelector = useSelector((state: reducerState) => state.project);
    const [projectTreeModalVisible, setProjectTreeModalVisible] = useState<boolean>(false);
    const [modelFileList, setModelFileList] = useState<any[]>([]);
    const [visibleModelElementView, setVisibleModelElementView] = useState<boolean>(false);
    const [ModalVisible, setModelModalVisible] = useState<boolean>(false);
    const [imodelId, setImodelId] = useState<number>(-1);

    useEffect(() => {
        dispatch(GetModelFileList(projSelector.now_project_no));
    }, [projSelector.now_project_no]);

    useEffect(() => {
        if (modelFileSelector.model_file_list && modelFileSelector.model_file_list.length > 0) {
            let _list = [];
            for (var modelfile of modelFileSelector.model_file_list) {
                _list.push({
                    no: _list.length + 1,
                    create_tm: moment(modelfile.create_tm).format("YYYY-MM-DD HH:mm"),
                    create_by: modelfile.create_by,
                    subject: modelfile.subject,
                    explan: modelfile.explan,
                    file_name: modelfile.original_file_name,
                    detail: null,
                    tag: null,
                });
            }
            setModelFileList([..._list]);
        } else if (
            modelFileSelector.model_file_list &&
            modelFileSelector.model_file_list.length == 0
        ) {
            setModelFileList([]);
        }
    }, [modelFileSelector.model_file_list, modelFileSelector]);

    const createCustomEl = (idx: number, dataIdx?: number) => {
        if (idx === 6) {
            if (dataIdx == undefined) return true;
            return (
                <S.TableTd>
                    <S.TableButtonDiv>
                        <S.TableButton onClick={() => onClickMove(dataIdx)}>보기</S.TableButton>
                    </S.TableButtonDiv>
                </S.TableTd>
            );
        } else if (idx === 7) {
            if (dataIdx == undefined) return true;
            return (
                <S.TableTd>
                    <S.TableButtonDiv>
                        <S.TableButton onClick={() => onClickTagView(dataIdx)}>보기</S.TableButton>
                    </S.TableButtonDiv>
                </S.TableTd>
            );
        }
        return null;
    };

    const onClickAdd = () => {
        setProjectTreeModalVisible(true);
    };

    const onCloseModal = () => {
        setProjectTreeModalVisible(false);
    };

    const onClickTagView = (idx: number) => {
        setVisibleModelElementView(true);
        setImodelId(modelFileSelector.model_file_list[idx].imodel_id);
    };

    const onClickMove = (idx: number) => {
        window.open(
            `http://tep-dt.moornmo.com/?imodel=${modelFileSelector.model_file_list[idx].repo_path}`,
            "1429893142534",
            "width=1080px,height=1528,toolbar=0,menubar=0,location=0,status=0,scrollbars=1,resizable=0,left=0,top=0"
        );
    };

    const onClickRow = (idx: number, selectedRow?: any) => {
        // imodel open
        // window.open("http://tep-dt.moornmo.com?imodel=" + selectedRow.repo_path);
    };

    return (
        <EdmsProjectBase>
            {/*Body*/}
            <ModelFileCreateModalComp
                visible={ModalVisible}
                onClose={() => setModelModalVisible(false)}
            />
            <ModelElementViewComp
                onClose={() => setVisibleModelElementView(false)}
                visible={visibleModelElementView}
                imodelId={imodelId}
            />
            <S.ContentContainer>
                <S.WorkListContainer>
                    <S.StructureTable>
                        <S.SelectTableHead>
                            <s.DocumentCreateBtn onClick={() => setModelModalVisible(true)}>
                                추가
                            </s.DocumentCreateBtn>
                        </S.SelectTableHead>
                        <S.WorkListTable>
                            {modelFileList.length > 0 && (
                                <GridViewComponent
                                    titles={tableHeader}
                                    keys={Object.keys(modelFileList[0])}
                                    values={Object.values(modelFileList)}
                                    fullData={modelFileList}
                                    keysWidth={tableHeadSize}
                                    rowClass="background-color-white color-light-black"
                                    headerClass="background-dark-sky-blue color-white align-center"
                                    onClickRow={onClickRow}
                                    getCustomEl={createCustomEl}
                                    datatype={tableHeadType}
                                />
                            )}
                        </S.WorkListTable>
                    </S.StructureTable>
                </S.WorkListContainer>
            </S.ContentContainer>
        </EdmsProjectBase>
    );
};

export default EdmsModelManagePage;