/******************************************************************************
 * projecttreemodal/index.tsx
 * hooks :
 * useLocations
 *
 ******************************************************************************/
// Library
import React, { useState, useEffect } from "react"; // default hooks
//image
import closeSvg from "../../images/edms/times-solid-white.svg";
//styled
import * as S from "./styled";
import * as T from "../../styled/edmsProject.styled";
// Module
import { useSelector, useDispatch } from "react-redux";
import { reducerState } from "../../common";
import { ModalInfo, LoadingIndicatorComponent, GridViewComponent } from "components";
import { EditStageCode, GetWorkTmpBoxList } from "../../common/action";

import moment from "moment";

const tableHeadType = [1, 1, 0, 1, 0, 1, 1, 1, 1];
const tableHeadSize = [0.6, 1.4, 1.4, 1, 1.8, 0.6, 0.8, 0.6, 0.4];
const tableHeader = [
    "프로젝트",
    "Doc.No",
    "문서",
    "파일코드",
    "파일이름",
    "파일타입",
    "최근 업무절차",
    "문서단계",
    "작성자",
];

export type edmsStageModalProps = {
    style?: object;
    visible: boolean;
    onClose: () => void;
    checkList: number[];
};
interface FinaledmsStageModalProps extends edmsStageModalProps {}

export const EdmsStageModal: React.FunctionComponent<FinaledmsStageModalProps> = props => {
    const fileSelector = useSelector((state: reducerState) => state.files);
    const workSelector = useSelector((state: reducerState) => state.work);
    const docuSelector = useSelector((state: reducerState) => state.document);

    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [workList, setWorkList] = useState<any[]>([]);
    const [gridList, setGridList] = useState<any[]>([]);
    const [gridListKeys, setGridListKeys] = useState<any[]>([]);
    const [stageCode, setStageCode] = useState<string>("");
    const [stageList, setStageList] = useState<any[]>([]);

    useEffect(() => {
        let _list: any[] = [];
        let file_stage_list: string[] = [];
        let stageList = docuSelector.stage_code_list;
        if (props.checkList.length > 0 && props.checkList != undefined) {
            props.checkList.map((val: number) => {
                let _data: any = fileSelector.native_file_list.find(
                    (raw: any) => raw.docu_no == val
                );
                if (props.checkList.length != 0 && _data) {
                    _list.push(_data);
                    file_stage_list.push(_data.stage);
                }
            });
            // stage filter
            let stageIdx = 0;
            let _stageList = [];
            for (var stage of file_stage_list) {
                var idx = stageList.indexOf(stage);
                stageIdx = stageIdx >= idx ? stageIdx : idx;
            }
            for (var i = stageIdx; i < stageList.length; i++) {
                _stageList.push(stageList[i]);
            }
            setStageList([..._stageList]);
            //
        }
        setWorkList([..._list]);
    }, [props.checkList, docuSelector.stage_code_list]);

    useEffect(() => {
        if (workList && workList.length > 0) {
            let list = [];

            for (var work of workList) {
                list.push({
                    proj_name: work.project_name,
                    cate_name: work.cate_name,
                    docu_subject: work.docu_subject,
                    file_code: work.file_code,
                    file_name: work.file_name,
                    file_type: work.file_type,
                    wptype: work.type,
                    status: { stage: work.stage, actual_dt: work.actual_dt },
                    create_by: work.create_by,
                });
            }
            setGridList([...list]);
            setGridListKeys([...Object.keys(list[0])]);
        }
    }, [workList]);

    useEffect(() => {
        if (workSelector.edit_stage_code == true) {
            dispatch(GetWorkTmpBoxList(false, true, 0, 20));
            setTimeout(() => {
                setIsLoading(false);
                ModalInfo("문서단계 수정이 완료되었습니다.");
                onClose();
            }, 2000);
        }
        setStageCode("");
    }, [workSelector.edit_stage_code]);

    const createCustomEl = (idx: number, dataIdx?: number) => {
        if (dataIdx != undefined && gridList.length <= dataIdx) return null;
        if (idx === 7) {
            if (dataIdx == undefined) return true;
            let data = gridList[dataIdx].status;
            return (
                <T.TableTd>
                    <S.StatusDiv>
                        <S.Stage>{data.stage}</S.Stage>
                        <S.ActualDate>
                            {data.actual_dt ? moment(data.actual_dt).format(`YYYY-MM-DD`) : ``}
                        </S.ActualDate>
                    </S.StatusDiv>
                </T.TableTd>
            );
        }

        return null;
    };

    const onClose = () => {
        props.onClose();
    };

    const onSave = () => {
        if (stageCode == "") return ModalInfo("문서단계를 선택해주세요.");
        setIsLoading(true);
        dispatch(EditStageCode(props.checkList, stageCode));
    };

    return (
        <S.Block open={props.visible ? true : false} onClose={props.onClose}>
            <S.Inner>
                <LoadingIndicatorComponent open={isLoading} style={{ zIndex: 1301 }} />
                <S.ModalHeader>
                    <S.HeaderTitle>문서단계 변경</S.HeaderTitle>
                    <S.ModalCloseBtn onClick={onClose}>
                        <img src={closeSvg} />
                    </S.ModalCloseBtn>
                </S.ModalHeader>

                <S.ModalContentWrap>
                    <S.ModalInputBox $boxType={"box"}>
                        <S.GridViewWrap>
                            <GridViewComponent
                                fullData={gridList}
                                titles={tableHeader}
                                keys={gridListKeys}
                                values={Object.values(gridList)}
                                keysWidth={tableHeadSize}
                                datatype={tableHeadType}
                                getCustomEl={createCustomEl}
                                rowClass="background-color-white color-light-black"
                                headerClass="background-dark-sky-blue color-white align-center"
                            />
                        </S.GridViewWrap>
                    </S.ModalInputBox>
                    <S.ModalInputBox>
                        <S.InputTitle>문서단계 선택</S.InputTitle>
                        <S.InputSelect
                            disableUnderline
                            value={stageCode}
                            onChange={(e: any) => setStageCode(e.target.value)}
                        >
                            {stageList.map((raw: any, idx: number) => {
                                return (
                                    <S.InputSelectItem key={idx} value={raw}>
                                        {raw}
                                    </S.InputSelectItem>
                                );
                            })}
                        </S.InputSelect>
                    </S.ModalInputBox>
                </S.ModalContentWrap>
                <S.ModalBtnContainer>
                    <S.CloseBtn onClick={onClose}>닫기</S.CloseBtn>
                    <S.SaveBtn onClick={onSave}>저장</S.SaveBtn>
                </S.ModalBtnContainer>
            </S.Inner>
        </S.Block>
    );
};
