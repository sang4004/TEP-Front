/******************************************************************************
 * Copyright (c) 2021. Moornmo Inc. Rights reserved.                          *
 * Data modelings and methods used are assets of Moornmo Inc.                 *
 * projecttreemodal/index.tsx
 * hooks :
 * useLocations
 *
 * last modify : jh.jeong@ilts.co.kr
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
    DeactiveDisciplineModal,
    GetDisciplineList,
    CreateDiscipline,
    EditDiscipline,
    GetAllList,
} from "../../common/action";
import { LoadingIndicatorComponent, ModalInfo } from "components";
import { reducerState } from "../../common/store";
import { getMoment } from "../../common/utils";
import { Rnd } from "react-rnd";
import { useWindowDimensions } from "hooks";
const moment = getMoment();

export type DisciplineModalProps = {
    style?: object;
    isEdit?: number;
    visible: boolean;
    onClose: () => void;
    checkList?: number[];
};
interface FinalDisciplineModalProps extends DisciplineModalProps {}

export const CreateDisciplineModalComp: React.FunctionComponent<
    FinalDisciplineModalProps
> = props => {
    const { width, height } = useWindowDimensions();
    const dispatch = useDispatch();
    const settingSelector = useSelector((state: reducerState) => state.projectsettings);
    const discSelector = useSelector((state: reducerState) => state.discipline);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [projectList, setProjectList] = useState<any[]>([]);
    const [projId, setProjId] = useState<number>(-1);
    const [disciplineList, setDisciplineList] = useState<any[]>([]);
    const [disciplineId, setDisciplineId] = useState<number>(-1);
    const [code, setCode] = useState<string>("");
    const [title, setTitle] = useState<string>("");
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
        if (props.checkList && props.isEdit == 1) {
            if (props.checkList.length > 0) {
                let val = props.checkList[0];
                let _data: any = discSelector.edms_discipline_list.find(
                    (raw: any) => raw.id == val
                );
                if (_data) {
                    setTitle(_data.name);
                    setCode(_data.code);
                    setIsVp(_data.is_vp);
                    setProjId(_data.project_no);
                    setDisciplineId(_data.id);
                }
            }
        }
    }, [props.checkList, props.isEdit]);

    useEffect(() => {
        if (discSelector.create_discipline_data) {
            dispatch(DeactiveDisciplineModal());
            dispatch(GetDisciplineList());
            dispatch(GetAllList());
            setTimeout(() => {
                setIsLoading(false);
                ModalInfo("분야 등록이 완료되었습니다.");
                onClose();
            }, 2000);
            setTitle("");
            setCode("");
            setDisciplineId(0);
        }
    }, [discSelector.create_discipline_data]);

    useEffect(() => {
        if (discSelector.edit_discipline_data && props.visible) {
            dispatch(DeactiveDisciplineModal());
            dispatch(GetDisciplineList());
            dispatch(GetAllList());
            setTimeout(() => {
                setIsLoading(false);
                ModalInfo("분야 수정이 완료되었습니다.");
                onClose();
            }, 2000);
        }
    }, [discSelector.edit_discipline_data]);

    const onClose = () => {
        props.onClose();
        setTitle("");
        setCode("");
        setDisciplineId(-1);
        setIsVp(0);
        setProjId(-1);
    };

    const onClickCreate = async () => {
        if (projId == -1) return ModalInfo("프로젝트 타입을 선택해 주세요.");
        if (title.length == 0) return ModalInfo("분야 명을 입력해주세요.");
        if (code.length == 0) return ModalInfo("코드를 입력해주세요.");

        setIsLoading(true);
        await dispatch(CreateDiscipline(projId, title, code, isVp));
    };

    const onClickEdit = async () => {
        if (title.length == 0) return ModalInfo("분야명을 입력해주세요.");
        if (code.length == 0) return ModalInfo("코드를 입력해주세요.");

        setIsLoading(true);
        await dispatch(EditDiscipline(disciplineId, title, code, isVp));
    };

    if (props.visible == false) return <></>;
    return (
        <Rnd
            default={{
                x: 100,
                y: 100,
                width: width / 3,
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
                        <S.HeaderTitle>{props.isEdit ? "분야 수정" : "분야 생성"}</S.HeaderTitle>
                        <S.ModalCloseBtn onClick={onClose}>
                            <Close style={{ fontSize: "1.6em" }} />
                        </S.ModalCloseBtn>
                    </S.ModalHeader>

                    <S.ModalContentWrap>
                        <S.ModalInputWrap>
                            <S.ModalInputBox $boxType="long">
                                <S.InputTitle>프로젝트 타입 :</S.InputTitle>
                                <S.InputSelect
                                    disableUnderline
                                    onChange={(e: any) => setProjId(e.target.value)}
                                    value={projId}
                                    disabled={props.isEdit == 1}
                                >
                                    <S.InputSelectItem value={-1}>
                                        프로젝트 타입 선택
                                    </S.InputSelectItem>
                                    {projectList.map((raw: any, idx: number) => (
                                        <S.InputSelectItem key={idx + raw} value={raw.project_no}>
                                            {raw.project_name}
                                        </S.InputSelectItem>
                                    ))}
                                </S.InputSelect>
                            </S.ModalInputBox>
                            {/* <S.ModalInputBox $boxType="long">
                                <S.InputTitle>분야 :</S.InputTitle>
                                <S.InputSelect
                                    disableUnderline
                                    onChange={(e: any) => setDisciplineId(e.target.value)}
                                    value={disciplineId}
                                >
                                    <S.InputSelectItem value={-1}>분야 선택</S.InputSelectItem>
                                    {disciplineList.map((raw: any, idx: number) => (
                                        <S.InputSelectItem key={idx + raw} value={raw.id}>
                                            {raw.name}
                                        </S.InputSelectItem>
                                    ))}
                                </S.InputSelect>
                            </S.ModalInputBox> */}
                            <S.ModalInputBox $boxType="long">
                                <S.InputTitle>분야명 :</S.InputTitle>
                                <S.Input value={title} onChange={e => setTitle(e.target.value)} />
                            </S.ModalInputBox>
                            <S.ModalInputBox $boxType="long">
                                <S.InputTitle>분야 코드 :</S.InputTitle>
                                <S.Input value={code} onChange={e => setCode(e.target.value)} />
                            </S.ModalInputBox>
                            <S.VpDiv>
                                <S.InputTitle>V/P 분야 :</S.InputTitle>
                                <S.CheckboxBlock
                                    checked={isVp == 1}
                                    color="primary"
                                    onChange={e => setIsVp(e.target.checked ? 1 : 0)}
                                />
                            </S.VpDiv>
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
