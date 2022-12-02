/******************************************************************************
 * Copyright (c) 2021. Moornmo Inc. Rights reserved.                          *
 * Data modelings and methods used are assets of Moornmo Inc.                 *
 * projecttreemodal/index.tsx
 * hooks :
 * useLocations
 *
 * last modify : jh.jeong@ilts.co.kr
 ******************************************************************************/
// React
import React, { useState, useEffect } from "react"; // default hooks
import { useDispatch, useSelector } from "react-redux";
//
import { useLocations } from "hooks";
import { reducerState } from "../../common/store";
import { LoadingIndicatorComponent, GridViewComponent, ModalInfo } from "components";
//

import * as S from "./styled";
import Close from "@material-ui/icons/Close";
import { GetUnreadWorks, UpdateSendRecvBox, GetCountPingEdms } from "../../common/action";

const tableHeader = ["No", "제목", "내용", ""];
const tableHeadType = [1, 1, 1, 1, ];
const tableHeadSize = [0.15, 0.6, 1, 0.2];

export type edmsAlarmModalProps = {
    style?: object;
    visible: boolean;
    onClose: () => void;
};
interface FinaledmsAlarmModalProps extends edmsAlarmModalProps {}

export const EdmsAlarmModal: React.FunctionComponent<FinaledmsAlarmModalProps> =
    props => {
        const dispatch = useDispatch();
        const { pushHistory } = useLocations();
        const workSelector = useSelector((state: reducerState) => state.work);

        const [isLoading, setIsLoading] = useState<boolean>(false);

        const [unreadWorks, setUnreadWorks] = useState<any[]>([]);
        const [workList, setWorkList] = useState<any[]>([]);
        const [workListKeys, setWorkListKeys] = useState<any[]>([]);
        const [unreadWsrIdx, setUnreadWsrIdx] = useState<any[]>([]);
        const [selectedWpType, setSelectedWpType] = useState<number>(0);

        useEffect(() => {
            if (props.visible) {
                setIsLoading(true);
                dispatch(GetUnreadWorks());
            }
        }, [props.visible]);

        useEffect(() => {
            if (workSelector.get_unread_works != undefined && workSelector.get_unread_works.length != 0) {
                let _list: any[] = [];
                let _unread_wsr_idx: any[] = [];
                let _unread_works = workSelector.get_unread_works;
                let now_type = get_wp_type(selectedWpType);

                for (let i = 0; i < _unread_works.length ; i++) {
                    if (_unread_works[i].unread_work.wp_type === now_type) {
                        _list.push({
                            No: i+1,
                            Subject: _unread_works[i].unread_work.subject,
                            Explan: _unread_works[i].unread_work.explan,
                            "": ""
                        });
                        _unread_wsr_idx.push(_unread_works[i].wsr_idx);
                    }
                }
                if (_list.length != 0) {
                    setWorkList(_list);
                    setUnreadWsrIdx(_unread_wsr_idx);
                    setWorkListKeys(Object.keys(_list[0]));
                    setUnreadWorks(workSelector.get_unread_works);
                } else {
                    setWorkList([]);
                    setUnreadWsrIdx([]);
                    setWorkListKeys([]);
                }
            } else {
                setWorkList([]);
                setUnreadWsrIdx([]);
                setWorkListKeys([]);
            }
            setIsLoading(false);
        }, [workSelector.get_unread_works, selectedWpType]);
       
        const onClose = () => {
            setSelectedWpType(0);
            props.onClose();
        };

        const updateSendRecvBox = (wsr_idx: number, wp_idx: number, wp_type: string) => {
            dispatch(UpdateSendRecvBox(wsr_idx));

            dispatch(GetCountPingEdms());
            if (wp_type === "DIN") pushHistory(`/edms/din/detail/${wp_idx}`);
            else if (wp_type === "DRN") pushHistory(`/edms/drn/detail/${wp_idx}`);
            else pushHistory(`/edms/tm/detail/${wp_idx}`);

            onClose();
        };

        const createCustomEl = (idx: number, dataIdx?: number) => {
            if (idx === 3) {
                if (dataIdx == undefined) return true;
                let  unreadWorkData = unreadWorks[dataIdx];
                return (
                    <S.TableTd style={{ justifyContent: "flex-start", textAlign: "center" }}>
                        <S.ApprovalBtn onClick={() => updateSendRecvBox(unreadWsrIdx[dataIdx], unreadWorkData.unread_work.wp_idx, unreadWorkData.unread_work.wp_type)}>
                            바로가기
                        </S.ApprovalBtn>
                    </S.TableTd>
                );
            }
            return null;
        };

        const get_wp_type = (idx: number) => {
            switch (idx) {
                case 0:
                    return "TR";
                case 1:
                    return "DRN";
                default:
                    return "";
            }
        };

        return (
            <S.Block open={props.visible ? true : false} onClose={onClose}>
                <S.Inner>
                    <style>
                        {` 
                        .k-grid table {
                            width : 100% !important;
                        }
                        .k-grid-container ::-webkit-scrollbar-thumb{
                            background-color: transparent !important;
                        }
                        
                        .k-grid-container ::-webkit-scrollbar{
                            background-color: transparent !important;
                        }
                        `}
                    </style>
                    <LoadingIndicatorComponent open={isLoading} style={{ zIndex: 1300 }} />
                    <S.ModalHeader>
                        <S.HeaderTitle>읽지 않은 업무절차</S.HeaderTitle>
                        <S.ModalCloseBtn onClick={onClose}>
                            <Close fontSize="large"/>
                        </S.ModalCloseBtn>
                    </S.ModalHeader>
                    <S.TabsBlock
                        style={{}}
                        value={selectedWpType}
                        onChange={(e, value) => setSelectedWpType(value)}
                        TabIndicatorProps={{ style: { backgroundColor: "#4B5964" } }}
                    >
                        <S.TabBlock
                            value={0}
                            label="TR"
                        />
                        <S.TabBlock 
                            value={1}
                            label="DRN" 
                        />
                    </S.TabsBlock>
                    <S.WorkListTable>
                        <GridViewComponent
                            titles={tableHeader}
                            fullData={workList}
                            keys={workListKeys}
                            values={workList}
                            datatype={tableHeadType}
                            keysWidth={tableHeadSize}
                            headerClass="background-dark-sky-blue color-white align-center"
                            getCustomEl={createCustomEl}
                            noRecordsMsg={"표시할 내용이 없습니다."}
                        />
                    </S.WorkListTable>
                   
                </S.Inner>
            </S.Block>
        );
    };

  




