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
import React, { useEffect, useState } from "react"; // default hooks
//
// Module
import * as S from "./styled";
import { reducerState } from "../../common";
import { useDispatch, useSelector } from "react-redux";
import { useLocations } from "hooks";
import moment from "moment";

const theadSize = [6, 10, 10, 14, 50, 8];
const THEAD_TYPES = ["분류", "생성일", "기한일", "TR. No.", "제목", "발신자"];

export type edmsMainBtmCardProps = {
    title: string;
    style: object;
};

interface FinaledmsMainBtmCardProps extends edmsMainBtmCardProps {}

const MY_TASK_COUNT_PER_PAGE = 20;
export const EdmsUserMainBtmCardComponent: React.FunctionComponent<
    FinaledmsMainBtmCardProps
> = props => {
    const dispatch = useDispatch();
    const workSelector = useSelector((state: reducerState) => state.work);
    const [data, setData] = useState<any[]>([]);
    const [pageData, setPageData] = useState<any[]>([]);
    const { pushHistory } = useLocations();
    const [pageCount, setPageCount] = useState<number>(1);
    const [pageIdx, setPageIdx] = useState<number>(1);

    useEffect(() => {
        if (workSelector.main_my_task_list) {
            let _list = [];
            let count = Math.round(workSelector.main_my_task_list.length / MY_TASK_COUNT_PER_PAGE);
            let remainder = workSelector.main_my_task_list.length % MY_TASK_COUNT_PER_PAGE;
            for (var l of workSelector.main_my_task_list) {
                // let last_date = moment(l.due_date).diff(moment(), "days");
                _list.push({
                    wp_idx: l.wp_idx,
                    wp_type: l.wp_type,
                    subject: l.subject,
                    send: l.send,
                    // due_date: getExpiredDt(last_date),
                    due_date: l.due_date,
                    tm_code: l.tm_code,
                    create_tm: l.create_tm,
                });
            }
            setPageCount(remainder != 0 && remainder < 10 ? count + 1 : count);
            setPageIdx(1);
            setPageData([..._list.slice(0, MY_TASK_COUNT_PER_PAGE)]);
            setData([..._list]);
        }
    }, [workSelector.main_my_task_list]);

    // const getExpiredDt = (day: number) => {
    //     if (day != null && day > 0) {
    //         return "기한 " + day + "일 남음";
    //     } else {
    //         return "기한 " + day * -1 + "일 경과";
    //     }
    // };

    const onClickMove = (type: string, wp_idx: number) => {
        let path = "";
        switch (type) {
            case "DIN":
                path = "/edms/workproc/din";
                break;
            case "DRN":
                path = `/edms/drn/detail/${wp_idx}`;
                break;
            case "TR":
                path = `/edms/tm/detail/${wp_idx}`;
                break;
            default:
                path = "/edms/workproc/tm";
                break;
        }
        pushHistory(path);
    };

    const onChangePageIdx = (page: any) => {
        if (page == 0) return;
        let idx = page - 1;
        setPageData([
            ...data.slice(idx * MY_TASK_COUNT_PER_PAGE, idx * MY_TASK_COUNT_PER_PAGE + 20),
        ]);
        setPageIdx(page);
    };

    return (
        <S.Block style={props.style}>
            <style>
                {`
                    thead{
                        border-top : 1px solid #ccc;
                    }
                `}
            </style>
            <S.SectionBg>
                <table>
                    <thead>
                        <tr>
                            {THEAD_TYPES.map((raw, idx) => {
                                return (
                                    <S.HeadCell $cellSize={theadSize[idx]} key={raw}>
                                        {raw}
                                    </S.HeadCell>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 &&
                            pageData.map((raw, idx) => {
                                return (
                                    <tr
                                        key={props.title + raw.subject + idx}
                                        style={{ cursor: "pointer" }}
                                        onClick={() => onClickMove(raw.wp_type, raw.wp_idx)}
                                    >
                                        <S.BodyCell $cellSize={theadSize[0]}>
                                            {raw.wp_type}
                                        </S.BodyCell>
                                        <S.BodyCell $cellSize={theadSize[1]}>
                                            {raw.create_tm}
                                        </S.BodyCell>
                                        <S.BodyCell $cellSize={theadSize[2]}>
                                            {raw.due_date}
                                        </S.BodyCell>
                                        <S.BodyCell $cellSize={theadSize[3]}>
                                            {raw.tm_code}
                                        </S.BodyCell>
                                        <S.BodyCell $cellSize={theadSize[4]}>
                                            {raw.subject}
                                        </S.BodyCell>
                                        <S.BodyCell $cellSize={theadSize[5]}>{raw.send}</S.BodyCell>
                                    </tr>
                                );
                            })}
                        {data.length == 0 && <span>표시할 내용이 없습니다..</span>}
                    </tbody>
                </table>
                <S.TableFooter>
                    <S.pagingdiv>
                        <S.pagination
                            size={"medium"}
                            count={pageCount}
                            defaultPage={1}
                            boundaryCount={3}
                            onChange={(e: any, page: any) => onChangePageIdx(page)}
                            page={pageIdx}
                        />
                    </S.pagingdiv>
                </S.TableFooter>
            </S.SectionBg>
        </S.Block>
    );
};
