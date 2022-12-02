/******************************************************************************
 * Copyright (c) 2021. Moornmo Inc. Rights reserved.                          *
 * Data modelings and methods used are assets of Moornmo Inc.                 *
 * appwrapper/index.tsx
 * hooks :
 * useLocations
 *
 * last modify : jh.jeong@ilts.co.kr
 ******************************************************************************/
// Library
import { useSelector, useDispatch } from "react-redux"; // redux
import { useState, useEffect } from "react"; // default hooks
//
// Module
// util
import * as S from "./styled";
import { SetActualRate, GetStageData } from "../../common/action";
import { reducerState } from "../../common";
import { LoadingIndicatorComponent, ModalInfo } from "components";
import { EdmsTreeViewComp } from "../";
// image
import Close from "@material-ui/icons/Close";
import workfolder from "../../images/edms/worklist_dep5.svg";
import searchIconSvg from "../../images/icon/search_icon.svg";
// library
//
export type edmsProjectWeightModalProps = {
    visible: boolean;
    onClose: () => void;
};

interface FinaledmsProjectWeightModalProps extends edmsProjectWeightModalProps {}

export const EdmsProjectWeightModal: React.FunctionComponent<
    FinaledmsProjectWeightModalProps
> = props => {
    const dispatch = useDispatch();
    const docuSelector = useSelector((state: reducerState) => state.document);
    // const pjSelector = useSelector((state: reducerState) => state.project);
    const pjsettingSelector = useSelector((state: reducerState) => state.projectsettings);

    // const [selectedProjNo, setSelectedProjNo] = useState<number>();
    const [selectedDisciplineNo, setSelectedDisciplineNo] = useState<number>();
    // const [selectedCateNo, setSelectedCateNo] = useState<number>();
    // const [selectedDocuNo, setSelectedDocuNo] = useState<number>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [selectedName, setSelectedName] = useState<string>("");
    const [searchData, setSearchData] = useState<string>("");
    const [finalSearch, setFinalSearch] = useState<string>("");

    const [stages, setStages] = useState<any[]>([]);
    const [stageValue, setStageValue] = useState<any[]>([]);

    useEffect(() => {
        if (docuSelector.stage_code_list && docuSelector.stage_code_list.length > 0) {
            setStages(docuSelector.stage_code_list);
            setStageValue([...docuSelector.stage_code_list.map((raw: any) => 0)]);
        }
    }, [docuSelector.stage_code_list]);

    useEffect(() => {
        if (pjsettingSelector.stage_data && pjsettingSelector.stage_data.length > 0) {
            setStageValue([...pjsettingSelector.stage_data.map((raw: any) => raw.actual_rate)]);
        }
    }, [pjsettingSelector.stage_data]);

    useEffect(() => {
        if (pjsettingSelector.update_stage == true) {
            setIsLoading(false);
            ModalInfo("할증률 수정이 완료되었습니다.");
            dispatch(GetStageData());
        }
    }, [pjsettingSelector.update_stage]);

    const setSelectedItems = (item: any) => {
        if (item) {
            setSelectedName("");
            if (item.fname && item.fname.length > 0 && item.type == "discipline") {
                // 일단 한개의 문서, 카테고리만 바꿀수있도록
                setSelectedName(item.fname.replace(/,/g, " > "));
            }
        }
    };

    const onClose = () => {
        props.onClose();
    };

    const onTreeItemClick = (event: any) => {
        //If category, show data, otherwise skip
        let projNo = -1;
        let disciplineNo = -1;
        // let cateNo = -1;
        // let docuNo = -1;
        switch (event.item.type) {
            case "project":
                projNo = event.item.project_no;
                break;
            case "discipline":
                disciplineNo = event.item.discipline_id;
                break;
            // case "pcategory":
            // case "category":
            //     cateNo = event.item.cate_no;
            //     break;
            // case "document":
            //     docuNo = event.item.docu_no;
            //     break;
            default:
                break;
        }
        // setSelectedProjNo(projNo);
        setSelectedDisciplineNo(disciplineNo);
        // setSelectedCateNo(cateNo);
        // setSelectedDocuNo(docuNo);
        let filtered: any[] = [];
        // 분야 선택시
        if (disciplineNo != -1) {
            setSelectedItems(event.item);
            let cateFiltered = pjsettingSelector.cate_list.filter(
                (raw: any) => raw.discipline_id == disciplineNo
            );
            // 카테고리 필터
            if (cateFiltered.length > 0) {
                let cate_no_list = cateFiltered.map((raw: any) => raw.cate_no);

                for (var cate of cate_no_list) {
                    filtered = pjsettingSelector.docu_list.filter(
                        (raw: any) => raw.cate_no == cate
                    );
                    if (filtered.length > 0) continue;
                }
                if (filtered.length > 0) {
                    dispatch(GetStageData(filtered[0].docu_no));
                } else {
                    setStageValue([...docuSelector.stage_code_list.map((raw: any) => 0)]);
                }
            } else {
                setStageValue([...docuSelector.stage_code_list.map((raw: any) => 0)]);
            }
        }
    };

    const onClickSearch = () => {
        //
        setIsLoading(true);
        setFinalSearch(searchData);
        setTimeout(() => {
            setIsLoading(false);
        }, 500);
    };

    const numberMaxLength = (e: any) => {
        if (e.target.value.length > 4) {
            e.target.value = e.target.value.slice(0, 4);
        }
    };

    const onClickConfirm = async () => {
        setIsLoading(true);
        await dispatch(
            SetActualRate(selectedDisciplineNo, [...stageValue.map(raw => parseFloat(raw))])
        );
    };

    return (
        <S.Block open={props.visible ? true : false} onClose={props.onClose}>
            <S.Inner>
                <LoadingIndicatorComponent open={isLoading} style={{ zIndex: 1301 }} />
                <S.Title>문서단계별 할증률</S.Title>
                <S.CloseBtn>
                    <Close style={{ fontSize: "1.6em" }} onClick={onClose} />
                </S.CloseBtn>
                <S.Content>
                    <S.TreeBlock>
                        <S.TreeInnerBox>
                            <EdmsTreeViewComp
                                onChangeTreeData={data => {}}
                                onTreeItemClick={onTreeItemClick}
                                searchData={finalSearch}
                                isCloseCategory={true}
                                isCloseDocument={true}
                            />
                        </S.TreeInnerBox>
                        <S.SearchBox>
                            <S.Searchbar>
                                <S.SearchField
                                    InputProps={{
                                        disableUnderline: true,
                                    }}
                                    type="text"
                                    value={searchData}
                                    onChange={e => setSearchData(e.target.value)}
                                    placeholder={"찾으시려는 문서를 입력해주세요"}
                                    onKeyDown={e => (e.key == "Enter" ? onClickSearch() : null)}
                                />
                                <S.SearchIcon onClick={onClickSearch} src={searchIconSvg} />
                            </S.Searchbar>
                        </S.SearchBox>
                    </S.TreeBlock>

                    <S.DetailBlock>
                        {selectedName && (
                            <S.SubTitle>
                                <S.TitleImg src={workfolder} />
                                <S.SubTitleDiv>{selectedName}</S.SubTitleDiv>
                            </S.SubTitle>
                        )}
                        {selectedName && (
                            <S.Seperator>
                                <hr />
                            </S.Seperator>
                        )}

                        {selectedName && (
                            <S.ContentDiv>
                                <S.InfoContainer>
                                    {stages.map((raw, idx) => {
                                        return (
                                            <S.ModalInputBox key={"stageInput" + idx}>
                                                <S.InputTitle>{stages[idx]}</S.InputTitle>
                                                <S.Input
                                                    type="number"
                                                    min="0"
                                                    max="1"
                                                    step="0.1"
                                                    value={stageValue[idx]}
                                                    onChange={e => {
                                                        stageValue[idx] = e.target.value;
                                                        setStageValue([...stageValue]);
                                                    }}
                                                    onInput={numberMaxLength}
                                                />
                                            </S.ModalInputBox>
                                        );
                                    })}
                                </S.InfoContainer>

                                <S.EndContainer>
                                    <S.CloseBtn2 onClick={onClose}>취소</S.CloseBtn2>
                                    <S.SaveBtn onClick={onClickConfirm}>확인</S.SaveBtn>
                                </S.EndContainer>
                            </S.ContentDiv>
                        )}
                    </S.DetailBlock>
                </S.Content>
            </S.Inner>
        </S.Block>
    );
};
