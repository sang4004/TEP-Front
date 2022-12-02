/******************************************************************************
 * Copyright (c) 2021. Moornmo Inc. Rights reserved.                          *
 * Data modelings and methods used are assets of Moornmo Inc.                 *
 * fileuploadmodal / index.tsx
 * hooks :
 *
 *
 * last modify : jh.jeong@ilts.co.kr
 ******************************************************************************/
// Library
import { useSelector, useDispatch } from "react-redux"; // redux
import React, { useState, useEffect } from "react"; // default hooks
//
// Module
import { ToastComponent, LoadingIndicatorComponent, ModalInfo } from "components";
import moment from "moment";
import { Rnd } from "react-rnd";
import { useWindowDimensions } from "hooks";

import exitSvg from "../../images/edms/times-solid-white.svg";
import * as S from "./styled";
import { reducerState } from "../../common";
import { UpdateDclData, GetWorkDclList } from "../../common/action";

export type EdmsDclModifyModalProps = {
    visible: boolean;
    onClose: () => void;
    data: any;
    stage: any[];
};

interface FinalEdmsDclModifyModalProps extends EdmsDclModifyModalProps {}

export const EdmsDclModifyModal: React.FunctionComponent<FinalEdmsDclModifyModalProps> = props => {
    const { width, height } = useWindowDimensions();
    const dispatch = useDispatch();
    const categorySelector = useSelector((state: reducerState) => state.category);
    const waSelector = useSelector((state: reducerState) => state.achieve);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [visibleToast, setVisibleToast] = useState<boolean>(false);
    const [visibleToastSecond, setVisibleToastSecond] = useState<boolean>(false);

    const [dclSubject, setDclSubject] = useState<string>("");
    const [dclDocuCode, setDclDocuCode] = useState<string>("");
    const [dclCategoryId, setDclCategoryId] = useState<number>(-1);
    const [cateRootList, setCateRootList] = useState<any[]>([]);
    const [wvRate, setWvRate] = useState<any>();
    const [planRate, setsPlanRate] = useState<any>();
    const [actualRate, setActualRate] = useState<any>();
    const [stageList, setStateList] = useState<any[]>([]);
    const [palnDataList, setPalnDataList] = useState<any[]>([]);

    useEffect(() => {
        if (props.data) {
            setDclSubject(props.data.docu_subject);
            setDclDocuCode(props.data.docu_code);
            setDclCategoryId(props.data.cate_no);
            setWvRate(props.data.wv_rate);
            setsPlanRate(props.data.plan_rate);
            setActualRate(props.data.actual_rate);
        }
    }, [props.data]);

    useEffect(() => {
        if (props.stage) {
            setPalnDataList([...props.stage.map(raw => raw.plan_dt)]);
            setStateList(props.stage);
        }
    }, [props.stage]);

    useEffect(() => {
        if (categorySelector.project_cate_list && categorySelector.project_cate_list.length > 0) {
            setCateRootList(categorySelector.project_cate_list);
        }
    }, [categorySelector.project_cate_list]);

    useEffect(() => {
        if (waSelector.update_dcl_data == true) {
            dispatch(GetWorkDclList(props.data.project_no));
            setTimeout(() => {
                setIsLoading(false);
                ModalInfo("수정이 완료되었습니다.");
                onClose();
            }, 2000);
        }
    }, [waSelector.update_dcl_data]);

    const onClose = () => {
        props.onClose();
    };

    const numberMaxLength = (e: any) => {
        if (e.target.value.length > 4) {
            e.target.value = e.target.value.slice(0, 4);
        }
    };

    const onClickModifyDcl = () => {
        if (dclSubject.length == 0) {
            setVisibleToastSecond(true);
            setTimeout(() => {
                setVisibleToastSecond(false);
            }, 2000);
        }
        if (dclDocuCode.length == 0) {
            setVisibleToastSecond(true);
            setTimeout(() => {
                setVisibleToastSecond(false);
            }, 2000);
        }
        if (parseInt(wvRate) > 1) {
            setVisibleToast(true);
            setTimeout(() => {
                setVisibleToast(false);
            }, 2000);
        }
        if (parseInt(planRate) > 1) {
            setVisibleToast(true);
            setTimeout(() => {
                setVisibleToast(false);
            }, 2000);
        }
        if (parseInt(actualRate) > 1) {
            setVisibleToast(true);
            setTimeout(() => {
                setVisibleToast(false);
            }, 2000);
        }
        setIsLoading(true);
        dispatch(
            UpdateDclData(
                props.data.docu_no,
                dclDocuCode,
                dclCategoryId,
                dclSubject,
                wvRate,
                planRate,
                actualRate,
                palnDataList
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
            <ToastComponent
                text="0 ~ 1 사이의 값만 입력해주세요."
                close={() => setVisibleToast(false)}
                visible={visibleToast}
                type={"warning"}
                style={{ position: "absolute", bottom: 100, right: 100, alignItems: "center" }}
            />
            <ToastComponent
                text="값을 입력해주세요."
                close={() => setVisibleToastSecond(false)}
                visible={visibleToastSecond}
                type={"warning"}
                style={{ position: "absolute", bottom: 100, right: 100, alignItems: "center" }}
            />
            <S.Block>
                <S.Inner>
                    <LoadingIndicatorComponent open={isLoading} style={{ zIndex: 1301 }} />
                    <S.Header className="drag-handle-element">
                        <S.Title>DCL 수정 {props.data.docu_code}</S.Title>
                        <S.CloseBtn onClick={onClose}>
                            <img src={exitSvg} />
                        </S.CloseBtn>
                    </S.Header>
                    <S.Body>
                        <S.DclInner>
                            <S.ModalInputBox $boxType="box">
                                <S.InputTitle>문서번호 :</S.InputTitle>
                                <S.Input
                                    value={dclDocuCode}
                                    onChange={e => setDclDocuCode(e.target.value)}
                                />
                            </S.ModalInputBox>
                            <S.ModalInputBox $boxType="box">
                                <S.InputTitle>카테고리 :</S.InputTitle>
                                <S.DclInputSelect
                                    disableUnderline
                                    value={dclCategoryId}
                                    onChange={(e: any) => setDclCategoryId(e.target.value)}
                                >
                                    {cateRootList.map((raw: any, idx: number) => (
                                        <S.DclInputSelectItem
                                            key={raw.level_cate_name + idx}
                                            value={raw.cate_no}
                                        >
                                            {raw.level_cate_name}
                                        </S.DclInputSelectItem>
                                    ))}
                                </S.DclInputSelect>
                            </S.ModalInputBox>
                            <S.ModalInputBox $boxType="subject">
                                <S.InputTitle>제목 :</S.InputTitle>
                                <S.Input
                                    value={dclSubject}
                                    onChange={e => setDclSubject(e.target.value)}
                                />
                            </S.ModalInputBox>
                            <S.ModalInputBox>
                                <S.InputTitle>W/V (%) :</S.InputTitle>
                                <S.Input
                                    type="number"
                                    min="0"
                                    max="1"
                                    step="0.1"
                                    value={wvRate}
                                    onChange={e => setWvRate(e.target.value)}
                                    onInput={numberMaxLength}
                                />
                            </S.ModalInputBox>
                            <S.ModalInputBox>
                                <S.InputTitle>Plan (%) :</S.InputTitle>
                                <S.Input
                                    type="number"
                                    min="0"
                                    max="1"
                                    step="0.1"
                                    value={planRate}
                                    onChange={e => setsPlanRate(e.target.value)}
                                    onInput={numberMaxLength}
                                />
                            </S.ModalInputBox>
                            <S.ModalInputBox>
                                <S.InputTitle>Actual (%) :</S.InputTitle>
                                <S.Input
                                    type="number"
                                    min="0"
                                    max="1"
                                    step="0.1"
                                    value={actualRate}
                                    onChange={e => setActualRate(e.target.value)}
                                    onInput={numberMaxLength}
                                />
                            </S.ModalInputBox>
                            {stageList.map((raw: any, idx: number) => {
                                return (
                                    <S.ModalInputBox $boxType="box" key={"stage" + idx}>
                                        <S.InputTitle>
                                            {raw.stage_code}{" "}
                                            {raw.stage_code == "As-Built"
                                                ? ""
                                                : raw.stage_type == "a"
                                                ? "Approval"
                                                : raw.stage_type == "i"
                                                ? "Issue"
                                                : ""}{" "}
                                            :
                                        </S.InputTitle>
                                        <S.InputDate
                                            value={moment(palnDataList[idx]).format("YYYY-MM-DD")}
                                            onChange={e => {
                                                palnDataList[idx] = moment(e.target.value).toDate();
                                                setPalnDataList([...palnDataList]);
                                            }}
                                            type="date"
                                        />
                                    </S.ModalInputBox>
                                );
                            })}
                        </S.DclInner>
                        <S.BtmBtns>
                            <S.BtmBtn onClick={onClose}>취소</S.BtmBtn>
                            <S.BtmBtn onClick={onClickModifyDcl}>완료</S.BtmBtn>
                        </S.BtmBtns>
                    </S.Body>
                </S.Inner>
            </S.Block>
        </Rnd>
    );
};
