/******************************************************************************
 * Copyright (c) 2021. Moornmo Inc. Rights reserved.                          *
 * Data modelings and methods used are assets of Moornmo Inc.                 *
 * appwrapper/index.tsx
 * hooks :
    * useLocations 
    *
 * last modify : jh.jeong@ilts.co.kr
 ******************************************************************************/
// Module
import * as S from "./styled";
import { useState, useEffect } from "react"; // default hooks
import { useHistory } from "react-router-dom";
import { getMoment } from "../../common/utils";
const moment = getMoment();

const tableType = [10, 14, 8];
const tableData = [
    {
        project : 'TK-2019-001',
        projectNm : 'Test',
        progress : 20,
        document : 120,
        overall : 230,
        file : 240,
        review : 120,
        pm : '이순신',
        involveNum : 150,
        startDt : '2020-01-01',
        endDt : '2020-02-02'
    },
    {
        project : 'TK-2019-002',
        projectNm : '테스트 프로젝트명',
        progress : 20,
        document : 120,
        overall : 230,
        file : 240,
        review : 120,
        pm : '홍길동',
        involveNum : 150,
        startDt : '2020-01-01',
        endDt : '2020-02-02'
    },
    {
        project : 'TK-2019-003',
        projectNm : '프로젝트 A',
        progress : 20,
        document : 120,
        overall : 230,
        file : 240,
        review : 120,
        pm : '김철수',
        involveNum : 150,
        startDt : '2020-01-01',
        endDt : '2020-02-02'
    },
]

export type mainNewTableProps = {
    data: object[];
}
interface FinalmainNewTableProps extends mainNewTableProps {};

export const MainNewTableComponent : React.FunctionComponent<FinalmainNewTableProps> = ( props : FinalmainNewTableProps )=>{
    const history = useHistory();
    const [data, setData] = useState<object[]>([]);

    useEffect(() => {
        setData(props.data);
    }, [props.data]);

    return (
        <S.PresentTable>
            <S.TableHead>
                <S.TableTh $cellSize={tableType[1]}>프로젝트 코드</S.TableTh>
                <S.TableTh $cellSize={tableType[1]}>프로젝트 명</S.TableTh>
                <S.TableTh $cellSize={tableType[2]}>진행률</S.TableTh>
                <S.TableTh $cellSize={tableType[0]}>도큐먼트수</S.TableTh>
                <S.TableTh $cellSize={tableType[0]}>성과물수</S.TableTh>
                <S.TableTh $cellSize={tableType[0]}>첨부파일수</S.TableTh>
                <S.TableTh $cellSize={tableType[2]}>리뷰건수</S.TableTh>
                <S.TableTh $cellSize={tableType[0]}>PM</S.TableTh>
                <S.TableTh $cellSize={tableType[0]}>참여인원</S.TableTh>
                <S.TableTh $cellSize={tableType[0]}>시작일자</S.TableTh>
                <S.TableTh $cellSize={tableType[0]}>종료일자</S.TableTh>
            </S.TableHead>
            

            { data.length > 0 &&
            data.map((raw:any, idx) =>{
                return (
                    <S.TableRow key={raw.project_code} $rowIdx={idx+1}>
                        <S.TableTd $cellSize={tableType[1]} style={{cursor : "pointer", color: "#477EE9"}} >{raw.project_code}</S.TableTd>
                        <S.TableTd $justifyContent="flex-start" $cellSize={tableType[1]}>{raw.project_name}</S.TableTd>
                        <S.TableTd $cellSize={tableType[2]}>
                            <S.ProgressBarWrap variant="determinate" value={raw.progress}  />
                            <S.ProgressGauge style={{color : "#666"}} $percent={raw.progress}>{raw.progress}%</S.ProgressGauge>
                        </S.TableTd>
                        <S.TableTd $cellSize={tableType[0]}>{raw.docu_cnt}</S.TableTd>
                        <S.TableTd $cellSize={tableType[0]}>{raw.end_cnt}</S.TableTd>
                        <S.TableTd $cellSize={tableType[0]}>{raw.file_cnt}</S.TableTd>
                        <S.TableTd $cellSize={tableType[2]}>{raw.review}</S.TableTd>
                        <S.TableTd $cellSize={tableType[0]}>{raw.pm_name}</S.TableTd>
                        <S.TableTd $cellSize={tableType[0]}>{raw.involveNum}</S.TableTd>
                        <S.TableTd $cellSize={tableType[0]}>{raw.start_dt && moment(raw.start_dt).format("YYYY-MM-DD HH:mm")}</S.TableTd>
                        <S.TableTd $cellSize={tableType[0]}>{raw.end_dt && moment(raw.end_dt).format("YYYY-MM-DD HH:mm")}</S.TableTd>
                    </S.TableRow>
                )
            })}
        </S.PresentTable>
    );
}