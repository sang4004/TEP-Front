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
import React, { useState, useEffect } from "react"; // default hooks
//image
import closeSvg from "../../images/edms/times-solid-white.svg";
//styled
import NewWindow from "react-new-window";
import * as S from "./styled";
// Module
import { useSelector, useDispatch } from "react-redux";
import { reducerState } from "../../common";
import { GridViewComponent, ToastComponent } from "components";
import { GetEdmsAddress } from "../../common/action";

export type edmsRefereceModalProps = {
    style?: object;
    visible: boolean;
    onClose: () => void;
    companyList: (list: number[]) => void;
    receiveCompany: string;
};
interface FinaledmsRefereceModalProps extends edmsRefereceModalProps {}

const tableHeadSize = [1];
const tableHeadType = [1];
const tableHeader = ["", "참조처"];

export const EdmsRefereceModal: React.FunctionComponent<FinaledmsRefereceModalProps> = props => {
    const dispatch = useDispatch();
    const pjSelector = useSelector((state: reducerState) => state.project);

    const [companyList, setCompanyList] = useState<any[]>([]);
    const [companyListKeys, setCompanyListKeys] = useState<any[]>([]);
    const [checked, setChecked] = useState<number[]>([]);
    const [visibleToast, setVisibleToast] = useState<boolean>(false);

    useEffect(() => {
        if (pjSelector.filtered_company_list.length == 0) dispatch(GetEdmsAddress());
    }, []);

    useEffect(() => {
        if (pjSelector.filtered_company_list && pjSelector.filtered_company_list.length > 0) {
            let list: any[] = [];
            for (var data of pjSelector.filtered_company_list) {
                if (props.receiveCompany != data.company_name) {
                    list.push({
                        id: data.id,
                        company: data.company_name,
                    });
                }
            }
            setCompanyList([...list]);
            setCompanyListKeys([...Object.keys(list[0])]);
        }
    }, [pjSelector.filtered_company_list, props.receiveCompany]);

    const onCheckChange = (selectItems: any) => {
        let idList = Object.keys(selectItems);
        let checked: number[] = [];
        for (var id of idList) if (selectItems[id] === true) checked.push(parseInt(id));
        setChecked([...checked]);
    };

    const onClose = () => {
        props.onClose();
        setChecked([]);
    };

    const onSave = () => {
        if (checked.length == 1) {
            props.companyList([...checked]);
            props.onClose();
            setChecked([]);
        } else {
            setVisibleToast(true);
        }
    };

    if (props.visible == false) return <></>;
    return (
        <NewWindow
            onUnload={onClose}
            center="parent"
            features={{ width: 600, height: 250 }}
            title="참조처 선택"
        >
            <ToastComponent
                text="하나 이상의 참조처를 선택해주세요."
                close={() => setVisibleToast(false)}
                visible={visibleToast}
                type={"warning"}
                style={{
                    position: "absolute",
                    right: 10,
                    bottom: 10,
                    alignItems: "flex-end",
                }}
                duration={2000}
            />
            <S.Block>
                <S.Inner>
                    <S.ModalHeader>
                        <S.HeaderTitle>참조처 선택</S.HeaderTitle>
                        <S.ModalCloseBtn onClick={onClose}>
                            <img src={closeSvg} />
                        </S.ModalCloseBtn>
                    </S.ModalHeader>

                    <S.ModalContentWrap>
                        <S.GridViewWrap>
                            <GridViewComponent
                                fullData={companyList}
                                titles={tableHeader}
                                keys={companyListKeys}
                                values={companyList}
                                keysWidth={tableHeadSize}
                                datatype={tableHeadType}
                                rowClass="background-color-parent color-light-black"
                                headerClass="background-dark-sky-blue color-white align-center"
                                isSelect
                                onChangeSelect={onCheckChange}
                                selectKey={"id"}
                                isSelectSingle
                            />
                        </S.GridViewWrap>
                    </S.ModalContentWrap>
                    <S.ModalBtnContainer>
                        <S.CloseBtn onClick={onClose}>닫기</S.CloseBtn>
                        <S.SaveBtn onClick={onSave}>저장</S.SaveBtn>
                    </S.ModalBtnContainer>
                </S.Inner>
            </S.Block>
        </NewWindow>
    );
};
