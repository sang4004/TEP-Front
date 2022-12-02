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
import { Rnd } from "react-rnd";
import { useWindowDimensions } from "hooks";
import {
    DeactiveCateModal,
    CreateDocument,
    GetEdmsCateStatusList,
    EditDocument,
    GetDocuStageData,
    GetStageType,
    GetEdmsDocuMasterList,
} from "../../common/action";
import { LoadingIndicatorComponent, ModalInfo } from "components";
import { reducerState } from "../../common/store";
import { getMoment } from "../../common/utils";

const moment = getMoment();

export type edmsDocumentFormModalProps = {
    style?: object;
    EditData?: any;
    isEdit?: number;
    visible: boolean;
    onClose: () => void;
    checkList?: number[];
};
interface FinaledmsDocumentFormModalProps extends edmsDocumentFormModalProps {}

const {
    Bold,
    Strikethrough,
    Subscript,
    Superscript,
    AlignLeft,
    AlignCenter,
    AlignRight,
    AlignJustify,
    Indent,
    Outdent,
    OrderedList,
    UnorderedList,
    Undo,
    Redo,
    FontName,
    FormatBlock,
    InsertImage,
} = EditorTools;

export const EdmsDocumentFormModal: React.FunctionComponent<
    FinaledmsDocumentFormModalProps
> = props => {
    const { width, height } = useWindowDimensions();
    const dispatch = useDispatch();
    const userSelector = useSelector((state: reducerState) => state.user);
    const categorySelector = useSelector((state: reducerState) => state.category);
    const documentSelector = useSelector((state: reducerState) => state.document);
    const projSelector = useSelector((state: reducerState) => state.project);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [categoryList, setCategoryList] = useState<any[]>([]);

    const [docNo, setDocNo] = useState<number>(0);
    const [cateId, setCateId] = useState<number>(0);
    const [cateName, setCateName] = useState<string>("");
    const [code, setCode] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [docuType, setDocuType] = useState<string>("001");
    const [docuState, setDocuState] = useState<string>("");
    const [planDate, setPlanDate] = useState<Date>();
    const [realDate, setRealDate] = useState<Date>();
    const [stageList, setStageList] = useState<any[]>([]);
    const [planDates, setPlanDates] = useState<Date[]>([]);
    const [actualDates, setActualDates] = useState<Date[]>([]);

    useEffect(() => {
        dispatch(GetEdmsCateStatusList());
        dispatch(GetStageType());
    }, []);

    useEffect(() => {
        if (documentSelector.stage_type_list.length > 0) {
            setStageList([...documentSelector.stage_type_list]);
        }
    }, [documentSelector.stage_type_list]);

    useEffect(() => {
        if (props.isEdit == 1 && props.checkList) {
            if (props.checkList.length > 0) {
                props.checkList.map((val: number) => {
                    let _data: any = val;
                    dispatch(GetDocuStageData(_data.docu_no));
                    let findCate = categoryList.find((raw: any) => raw.cate_no == _data.cate_no);
                    setCateName(findCate != undefined ? findCate.display_cate_name : "");
                    setCateId(_data.cate_no);
                    setDocNo(_data.docu_no);
                    setCode(_data.docu_code);
                    setContent(_data.explan);
                    setTitle(_data.docu_subject);
                    setDocuState(_data.status);
                    setPlanDate(_data.plan_submit_dt);
                    setRealDate(_data.real_submit_dt);
                });
            }
        }
    }, [props.isEdit, props.checkList]);

    useEffect(() => {
        if (documentSelector.docu_stage_list && documentSelector.docu_stage_list.length > 0) {
            for (var stage of documentSelector.docu_stage_list) {
                planDates.push(stage.plan_dt);
                actualDates.push(stage.actual_dt);
            }
            setPlanDates([...planDates]);
            setActualDates([...actualDates]);
        }
    }, [documentSelector.docu_stage_list]);

    useEffect(() => {
        if (
            categorySelector.edms_cate_status_list &&
            categorySelector.edms_cate_status_list.length > 0
        ) {
            setCategoryList([...categorySelector.edms_cate_status_list]);
        }
    }, [categorySelector.edms_cate_status_list]);

    useEffect(() => {
        if (documentSelector.create_document_data) {
            dispatch(DeactiveCateModal());
            setTimeout(() => {
                setIsLoading(false);
                ModalInfo("문서 등록이 완료되었습니다.");
                props.onClose();
            }, 1000);
            setCateId(0);
            setCateName("");
            setCode("");
            setContent("");
            setTitle("");
            setDocuState("");
            setPlanDate(undefined);
            setRealDate(undefined);
            setPlanDates([]);
            setActualDates([]);
            dispatch(GetEdmsDocuMasterList());
        }
    }, [documentSelector.create_document_data]);

    useEffect(() => {
        if (documentSelector.edit_document_data) {
            dispatch(DeactiveCateModal());
            setTimeout(() => {
                setIsLoading(false);
                ModalInfo("문서 수정이 완료되었습니다.");
                props.onClose();
            }, 1000);
            setCateId(0);
            setCode("");
            setContent("");
            setTitle("");
            setDocuState("");
            setPlanDate(undefined);
            setRealDate(undefined);
            setPlanDates([]);
            setActualDates([]);
        }
    }, [documentSelector.edit_document_data]);

    const onClose = () => {
        props.onClose();
        setCateId(0);
        setCateName("");
        setCode("");
        setContent("");
        setTitle("");
        setDocuState("");
        setPlanDate(undefined);
        setRealDate(undefined);
        setPlanDates([]);
        setActualDates([]);
    };

    const onClickCreate = async () => {
        if (cateId == 0) return ModalInfo("카테고리를 선택해주세요.");
        if (code == "") return ModalInfo("문서코드를 입력해주세요.");
        if (title == "") return ModalInfo("문서제목을 입력해주세요.");
        setIsLoading(true);
        await dispatch(
            CreateDocument(
                cateId,
                code,
                title,
                docuType,
                content,
                docuState,
                planDate,
                realDate,
                planDates,
                actualDates
            )
        );
    };

    const onClickEdit = async () => {
        if (cateId == 0) return ModalInfo("카테고리를 선택해주세요.");
        if (code == "") return ModalInfo("문서코드를 입력해주세요.");
        if (title == "") return ModalInfo("문서제목을 입력해주세요.");
        setIsLoading(true);
        await dispatch(
            EditDocument(
                docNo,
                cateId,
                code,
                title,
                docuType,
                content,
                planDate,
                realDate,
                planDates,
                actualDates
            )
        );
    };
    if (props.visible == false) return <></>;
    return (
        <Rnd
            default={{
                x: 100,
                y: 100,
                width: width / 2,
                height: height / 1.4,
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
                            {props.isEdit ? "기존 문서 수정" : "새 문서 생성"}
                        </S.HeaderTitle>
                        <S.ModalCloseBtn onClick={onClose}>
                            <Close style={{ fontSize: "1.6em" }} />
                        </S.ModalCloseBtn>
                    </S.ModalHeader>

                    <S.ModalContentWrap>
                        <S.ModalInputWrap>
                            <S.ModalInputBox $boxType="long">
                                <S.InputTitle $boxType="wide">카테고리 선택</S.InputTitle>
                                <S.InputAutoComplete
                                    value={cateName}
                                    onChange={(e: any, newVal: any) => {
                                        setCateName(newVal);
                                        let cate = categoryList.find(
                                            raw => raw.display_cate_name === newVal
                                        );
                                        if (cate) setCateId(cate.cate_no);
                                    }}
                                    options={categoryList.map(raw => {
                                        return raw.display_cate_name;
                                    })}
                                    renderInput={params => (
                                        <S.TextFieldBlock
                                            {...params}
                                            InputProps={{
                                                ...params.InputProps,
                                                disableUnderline: true,
                                            }}
                                        />
                                    )}
                                />
                            </S.ModalInputBox>
                            <S.ModalInputBox $boxType="long">
                                <S.InputTitle $boxType="wide">문서코드</S.InputTitle>
                                <S.Input
                                    $boxType="wide"
                                    value={code}
                                    onChange={e => setCode(e.target.value)}
                                />
                            </S.ModalInputBox>
                            <S.ModalInputBox $boxType="long">
                                <S.InputTitle $boxType="wide">문서 제목</S.InputTitle>
                                <S.Input
                                    $boxType="wide"
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                />
                            </S.ModalInputBox>

                            <S.ModalInputBox>
                                <S.InputTitle>제출 예정일</S.InputTitle>
                                <S.Input
                                    type="date"
                                    value={moment(planDate).format("YYYY-MM-DD")}
                                    onChange={e => setPlanDate(moment(e.target.value).toDate())}
                                />
                            </S.ModalInputBox>

                            <S.ModalInputBox>
                                <S.InputTitle>실제 제출일</S.InputTitle>
                                <S.Input
                                    type="date"
                                    value={moment(realDate).format("YYYY-MM-DD")}
                                    onChange={e => setRealDate(moment(e.target.value).toDate())}
                                />
                            </S.ModalInputBox>
                            {stageList.map((raw, idx) => {
                                return (
                                    <>
                                        <S.ModalInputBox key={raw.stage_name + idx + "P"}>
                                            <S.InputTitle>{raw.stage_name}:P</S.InputTitle>
                                            <S.Input
                                                key={raw.stage_name + idx + "PI"}
                                                type="date"
                                                value={moment(planDates[idx]).format("YYYY-MM-DD")}
                                                onChange={e => {
                                                    let _planDates = planDates;
                                                    _planDates[idx] = moment(
                                                        e.target.value
                                                    ).toDate();
                                                    setPlanDates([..._planDates]);
                                                }}
                                            />
                                        </S.ModalInputBox>
                                        <S.ModalInputBox key={raw.stage_name + idx + "A"}>
                                            <S.InputTitle>{raw.stage_name}:A</S.InputTitle>
                                            <S.Input
                                                key={raw.stage_name + idx + "AI"}
                                                type="date"
                                                value={moment(actualDates[idx]).format(
                                                    "YYYY-MM-DD"
                                                )}
                                                onChange={e => {
                                                    let _actualDates = actualDates;
                                                    _actualDates[idx] = moment(
                                                        e.target.value
                                                    ).toDate();
                                                    setActualDates([..._actualDates]);
                                                }}
                                            />
                                        </S.ModalInputBox>
                                    </>
                                );
                            })}
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
