/******************************************************************************
 * projecttreemodal/index.tsx
 * hooks :
 * useLocations
 *
 ******************************************************************************/
// Library
import React, { useRef, useState, useEffect } from "react"; // default hooks
import { Editor, EditorTools } from "@progress/kendo-react-editor";
//
// Module
import * as S from "./styled";
import Close from "@material-ui/icons/Close";
import { useDispatch, useSelector } from "react-redux";
import {
    DeactiveCateModal,
    GetEdmsCateStatusList,
    CreateCategory,
    EditCategory,
    GetAllList,
} from "../../common/action";
import { LoadingIndicatorComponent, ModalInfo } from "components";
import { reducerState } from "../../common/store";
import { getMoment } from "../../common/utils";
import { Rnd } from "react-rnd";
import { useWindowDimensions } from "hooks";
const moment = getMoment();

export type createCategoryModalProps = {
    style?: object;
    isEdit?: number;
    visible: boolean;
    onClose: () => void;
    checkList?: number[];
};
interface FinalcreateCategoryModalProps extends createCategoryModalProps {}

export const CreateCategoryModalComp: React.FunctionComponent<
    FinalcreateCategoryModalProps
> = props => {
    const { width, height } = useWindowDimensions();
    const dispatch = useDispatch();
    const settingSelector = useSelector((state: reducerState) => state.projectsettings);
    const categorySelector = useSelector((state: reducerState) => state.category);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [cateRootList, setCateRootList] = useState<any[]>([]);

    const [projectList, setProjectList] = useState<any[]>([]);
    const [projId, setProjId] = useState<number>(-1);
    const [disciplineList, setDisciplineList] = useState<any[]>([]);
    const [categoryList, setCategoryList] = useState<any[]>([]);
    const [disciplineId, setDisciplineId] = useState<number>(-1);
    const [cateNo, setCateNo] = useState<number>(0);
    const [cateCode, setCateCode] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [categoryId, setCategoryId] = useState<number>(0);
    const [cateName, setCateName] = useState<string>("선택안함");
    const [isVp, setIsVp] = useState<number>(0);

    useEffect(() => {
        if (settingSelector.project_list && settingSelector.project_list.length > 0) {
            setProjectList(settingSelector.project_list);
        }
    }, [settingSelector.project_list]);

    useEffect(() => {
        if (settingSelector.discipline_list && settingSelector.discipline_list.length > 0) {
            setDisciplineList(settingSelector.discipline_list);
        }
    }, [settingSelector.discipline_list]);

    useEffect(() => {
        if (categorySelector.cate_root_list && categorySelector.cate_root_list.length > 0) {
            setCateRootList([...categorySelector.cate_root_list]);
        }
    }, [categorySelector.cate_root_list]);

    useEffect(() => {
        if (projId != -1) {
            setCategoryList([...cateRootList.filter(raw => raw.project_no === projId)]);
        }
    }, [projId]);

    useEffect(() => {
        if (props.checkList && props.isEdit == 1) {
            if (props.checkList.length > 0) {
                let val = props.checkList[0];
                let _data: any = categorySelector.edms_cate_status_list.find(
                    (raw: any) => raw.cate_no == val
                );
                if (_data) {
                    setTitle(_data.cate_name);
                    setCateCode(_data.cate_code);
                    setCategoryId(_data.pcate_no);
                    setCateNo(_data.cate_no);
                    setIsVp(_data.is_vp);
                    setProjId(_data.project_no);
                    setDisciplineId(_data.discipline_id);
                }
            }
        }
    }, [props.checkList, props.isEdit]);

    useEffect(() => {
        if (categorySelector.create_category_data) {
            dispatch(DeactiveCateModal());
            setTimeout(() => {
                dispatch(GetEdmsCateStatusList());
                dispatch(GetAllList());
                setIsLoading(false);
                ModalInfo("카테고리 등록이 완료되었습니다.");
                onClose();
            }, 2000);
            setTitle("");
            setCateCode("");
            setCategoryId(0);
        }
    }, [categorySelector.create_category_data]);

    useEffect(() => {
        if (categorySelector.edit_category_data) {
            dispatch(DeactiveCateModal());
            dispatch(GetEdmsCateStatusList());
            dispatch(GetAllList());
            setTimeout(() => {
                setIsLoading(false);
                ModalInfo("카테고리 수정이 완료되었습니다.");
                onClose();
            }, 2000);
        }
    }, [categorySelector.edit_category_data]);

    const onClose = () => {
        props.onClose();
        setTitle("");
        setCateCode("");
        setCategoryId(-1);
        setCateName("");
        setCateNo(0);
        setIsVp(0);
        setProjId(-1);
        setDisciplineId(-1);
    };

    const onClickCreate = async () => {
        if (projId == -1) return ModalInfo("프로젝트 타입을 선택해주세요.");
        if (disciplineId == -1) return ModalInfo("분야를 선택해주세요.");
        if (title.length == 0) return ModalInfo("카테고리명을 입력해주세요.");
        if (cateCode.length == 0) return ModalInfo("카테고리 코드를 입력해주세요.");

        setIsLoading(true);
        await dispatch(CreateCategory(projId, categoryId, cateCode, title, isVp, disciplineId));
    };

    const onClickEdit = async () => {
        if (disciplineId == -1) return ModalInfo("분야를 선택해주세요.");
        if (title.length == 0) return ModalInfo("카테고리명을 입력해주세요.");
        if (cateCode.length == 0) return ModalInfo("카테고리 코드를 입력해주세요.");

        setIsLoading(true);
        await dispatch(EditCategory(cateNo, categoryId, cateCode, title, isVp, disciplineId));
    };

    if (props.visible == false) return <></>;
    return (
        <Rnd
            default={{
                x: 100,
                y: 100,
                width: width / 2,
                height: height / 2,
            }}
            bounds="window"
            style={{ zIndex: 6 }}
            dragHandleClassName="drag-handle-element"
        >
            <S.Block>
                <S.Inner>
                    <LoadingIndicatorComponent open={isLoading} style={{ zIndex: 1301 }} />
                    <S.ModalHeader className="drag-handle-element">
                        <S.HeaderTitle>
                            {props.isEdit ? "작업 카테고리 수정" : "작업 카테고리 생성"}
                        </S.HeaderTitle>
                        <S.ModalCloseBtn onClick={onClose}>
                            <Close style={{ fontSize: "1.6em" }} />
                        </S.ModalCloseBtn>
                    </S.ModalHeader>

                    <S.ModalContentWrap>
                        <S.ModalInputWrap>
                            {props.isEdit != 1 && (
                                <S.ModalInputBox $boxType="long">
                                    <S.InputTitle>프로젝트 타입 :</S.InputTitle>
                                    <S.InputSelect
                                        disableUnderline
                                        onChange={(e: any) => setProjId(e.target.value)}
                                        value={projId}
                                    >
                                        <S.InputSelectItem value={-1}>
                                            프로젝트 타입 선택
                                        </S.InputSelectItem>
                                        {projectList.map((raw: any, idx: number) => (
                                            <S.InputSelectItem
                                                key={idx + raw}
                                                value={raw.project_no}
                                            >
                                                {raw.project_name}
                                            </S.InputSelectItem>
                                        ))}
                                    </S.InputSelect>
                                </S.ModalInputBox>
                            )}
                            <S.ModalInputBox $boxType="long">
                                <S.InputTitle>분야 :</S.InputTitle>
                                <S.InputSelect
                                    disableUnderline
                                    onChange={(e: any) => setDisciplineId(e.target.value)}
                                    value={disciplineId}
                                    disabled={props.isEdit == 1}
                                >
                                    <S.InputSelectItem value={-1}>분야 선택</S.InputSelectItem>
                                    {disciplineList.map((raw: any, idx: number) => {
                                        if (raw.project_no === projId)
                                            return (
                                                <S.InputSelectItem key={idx + raw} value={raw.id}>
                                                    {raw.name}
                                                </S.InputSelectItem>
                                            );
                                        else return null;
                                    })}
                                </S.InputSelect>
                            </S.ModalInputBox>
                            <S.ModalInputBox $boxType="long">
                                <S.InputTitle>카테고리명 :</S.InputTitle>
                                <S.Input value={title} onChange={e => setTitle(e.target.value)} />
                            </S.ModalInputBox>
                            <S.ModalInputBox $boxType="long">
                                <S.InputTitle>카테고리 코드 :</S.InputTitle>
                                <S.Input
                                    value={cateCode}
                                    onChange={e => setCateCode(e.target.value)}
                                />
                            </S.ModalInputBox>
                            <S.ModalInputBox $boxType="long">
                                <S.InputTitle>상위 카테고리 :</S.InputTitle>
                                <S.InputAutoComplete
                                    value={cateName}
                                    onChange={(e: any, newVal: any) => {
                                        setCateName(newVal);
                                        let cate = categoryList.find(
                                            raw => raw.level_cate_name === newVal
                                        );
                                        if (cate) setCategoryId(cate.cate_no);
                                    }}
                                    options={categoryList.map(raw => {
                                        return raw.level_cate_name;
                                    })}
                                    renderInput={params => <S.TextFieldBlock {...params} />}
                                    disabled={props.isEdit == 1}
                                />
                                {/* <S.InputSelect
                                    disableUnderline
                                    onChange={(e: any) => setCategoryId(e.target.value)}
                                    value={categoryId}
                                >
                                    <S.InputSelectItem value={0}>
                                        선택안함
                                    </S.InputSelectItem>
                                    {cateRootList.map((raw: any, idx: number) => (
                                        <S.InputSelectItem key={raw} value={raw.cate_no}>
                                            {raw.level_cate_name}
                                        </S.InputSelectItem>
                                    ))}
                                </S.InputSelect> */}
                            </S.ModalInputBox>
                            <S.ModalInputBox $boxType="long">
                                <S.InputTitle>V/P 카테고리 여부 :</S.InputTitle>
                                <S.CheckboxBlock
                                    checked={isVp == 1}
                                    color="primary"
                                    onChange={e => setIsVp(e.target.checked ? 1 : 0)}
                                />
                            </S.ModalInputBox>
                        </S.ModalInputWrap>

                        <S.ModalBtnContainer>
                            <S.BtnDiv>
                                <S.CloseBtn onClick={onClose}>닫기</S.CloseBtn>
                                <S.SaveBtn onClick={props.isEdit ? onClickEdit : onClickCreate}>
                                    저장
                                </S.SaveBtn>
                            </S.BtnDiv>
                        </S.ModalBtnContainer>
                    </S.ModalContentWrap>
                </S.Inner>
            </S.Block>
        </Rnd>
    );
};
