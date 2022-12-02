/******************************************************************************
 * Copyright (c) 2021. Moornmo Inc. Rights reserved.                          *
 * Data modelings and methods used are assets of Moornmo Inc.                 *
 * hooks :
 * useLocations
 * components :
 *
 * last modify : jh.jeong
 *
 ******************************************************************************/
import React, { useState, useEffect, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocations } from "hooks";

import { LoadingIndicatorComponent } from "components";
import { EdmsPositionManageComp } from "../../components";

// util
import * as S from "./styled";

// image
import Close from "@material-ui/icons/Close";
import { GetEdmsAddress, GetEdmsUserDetail } from "../../common/action";
import { reducerState } from "../../common";

const tableHeader = ["회사", "부서", "직급", "이름", "이메일"];
const tableHeadSize = [15, 20, 15, 20, 30];

export type EdmsUserManageProps = {
    visible: boolean;
    onClose: () => void;
};

interface FinalEdmsUserManageProps extends EdmsUserManageProps {}

export const EdmsUserManageComp: React.FunctionComponent<FinalEdmsUserManageProps> = props => {
    const pjSelector = useSelector((state: reducerState) => state.project);

    const dispatch = useDispatch();
    const { back } = useLocations();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [selectedCompany, setSelectedCompany] = useState<number>(0);
    const [visiblePos, setVisiblePos] = useState<boolean>(false);
    const [userList, setUserList] = useState<any>([]);
    const [companyList, setCompanyList] = useState<any>([]);

    useEffect(() => {
        dispatch(GetEdmsUserDetail());
        dispatch(GetEdmsAddress());
    }, []);

    useEffect(() => {
        if (pjSelector.edms_company_list && pjSelector.edms_company_list.length > 0) {
            let list = [];
            for (var d of pjSelector.edms_company_list) {
                list.push({
                    id: d.id,
                    company: d.company_name,
                });
            }
            setCompanyList([...list]);
        }
    }, [pjSelector.edms_company_list]);

    useEffect(() => {
        if (
            pjSelector.edms_user_detail_list &&
            pjSelector.edms_user_detail_list.length > 0 &&
            companyList.length > 0 &&
            selectedCompany != -1
        ) {
            let _data = pjSelector.edms_user_detail_list.filter(
                (raw: any) => raw.company_id == companyList[selectedCompany].id
            );

            let list = [];
            for (var d of _data) {
                list.push({
                    company: d.company,
                    group: d.group,
                    position: d.position,
                    name: d.name,
                    email: d.email,
                });
            }
            if (list.length > 0) {
                setUserList([...list]);
            } else {
                setUserList([]);
            }
        }
    }, [selectedCompany, pjSelector.edms_user_detail_list]);

    const getRow = (raw: any, idx: number) => {
        return (
            <S.TableBodyCell key={idx} align="center" style={{ width: tableHeadSize[idx] + "%" }}>
                {raw}
            </S.TableBodyCell>
        );
    };

    const onCompletePos = (list: any[], new_list: any[]) => {
        setIsLoading(true);
        setTimeout(() => {
            // dispatch(EditPosition(list, new_list));
            setIsLoading(false);
            back();
        }, 2000);
    };

    // 모달 닫기
    const onClose = () => {
        props.onClose();
    };

    return (
        <S.Block open={props.visible} onClose={onClose}>
            <S.Inner>
                <LoadingIndicatorComponent open={isLoading} />

                <EdmsPositionManageComp
                    visible={visiblePos}
                    onClose={() => setVisiblePos(false)}
                    onComplete={(list: any[], new_list: any[]) => onCompletePos(list, new_list)}
                />

                <S.GroupBtnDiv>
                    <S.Title>조직관리</S.Title>
                    <S.GroupBtn onClick={() => setVisiblePos(true)}>설정</S.GroupBtn>
                    <S.CloseBtn>
                        <Close style={{ fontSize: "1.6em" }} onClick={onClose} />
                    </S.CloseBtn>
                </S.GroupBtnDiv>

                <S.Content>
                    <S.ContentDiv>
                        <S.TopMenuBlock>
                            <S.TableMenu
                                TabIndicatorProps={{ style: { backgroundColor: "#4B5964" } }}
                                value={selectedCompany}
                                onChange={(e, value) => setSelectedCompany(value)}
                            >
                                {companyList.map((row: any, idx: number) => (
                                    <S.BtnMenu
                                        $selectedCount={companyList.length}
                                        key={idx}
                                        //$active={selectedCompany == row.id}
                                        label={row.company}
                                    />
                                ))}
                            </S.TableMenu>
                        </S.TopMenuBlock>
                        <S.TheadDiv>
                            {tableHeader.map((row, idx) => (
                                <S.Thead key={idx} $headSize={tableHeadSize[idx]}>
                                    {row}
                                </S.Thead>
                            ))}
                        </S.TheadDiv>
                        <S.TableContainer>
                            <S.BoardTable aria-label="simple table">
                                <colgroup>
                                    {tableHeadSize.map((n, index) => (
                                        <col key={index} width={n + "%"} />
                                    ))}
                                </colgroup>
                                <S.BoardBody>
                                    {userList.map((row: any, idx: number) => {
                                        return (
                                            <S.TableBodyRow key={"tableRow" + idx}>
                                                {Object.values(row).map((raw: any, idx: number) =>
                                                    getRow(raw, idx)
                                                )}
                                            </S.TableBodyRow>
                                        );
                                    })}
                                </S.BoardBody>
                            </S.BoardTable>
                        </S.TableContainer>
                    </S.ContentDiv>
                </S.Content>
            </S.Inner>
        </S.Block>
    );
};
