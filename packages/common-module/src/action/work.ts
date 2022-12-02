/******************************************************************************
 * Copyright (c) 2021. Moornmo Inc. Rights reserved.                          *
 * Data modelings and methods used are assets of Moornmo Inc.                 *
 * actions 
    * Example : example description.
 * last modify : jh.jeong
 ******************************************************************************/

export type workHistoryType = {
    accountMon : string;
    cIdx : number;
    cmdAmt : number;
    cmdAmtMonthly : number;
    cmdNo : string;
    cmdNoDaily : string;
    cmdNoMonthly : string;
    cmdType : string;
    cmdUnit : string;
    cmdUnitName : string;
    createBy : any;
    createTm : string;
    endDt : string;
    endMon : any;
    endTime : any;
    isClose : string;
    isDel : string;
    isFast : string;
    isNewLot : string;
    itemName : string;
    itemNo : number;
    itemNumber : string;
    itemSpec : string;
    jobType : string;
    lastModiBy : any;
    lastModiTm : any;
    lineNo : number;
    mchNo : number;
    memo: any;
    pcIdx: number;
    pdIdx: any;
    progName: string;
    progNo: number;
    progOrder: any;
    progressCode: string;
    regiDt: string;
    registerNm: any;
    startDt: string;
    startMon: any
    startTime: any
    status: string;
    userName: string;
    userNo: number;
}

export type badregistListObjectType = {
    id : number;
    text : string;
}

export enum perfStatDetailType {
    "정상" = 1,
    "미진행" = 0,
    "비정상" = -1
}

export type commandsDailyType = {
    cmdNo : string;
    lineNo : number;
    userNo : number;
    mchNo : number;
    progNo : number;
    cIdx : number;
    cmdAmt : number,
    cmdUnit : string,
    startDt : string;
    endDt : string;
    jobType : string;
}

import { FetchApiPost, FetchApiGet, FetchApiPut, FetchApiDelete } from "utils_ts/lib";
import actions from "./creator";

export const GET_BARCODE_LIST = "GET_BARCODE_LIST";
export const GetBarcodeList = actions(GET_BARCODE_LIST, async()=>{
    return {
        payload : [
            {
                product_name : "SWCH10A",
                product_id : "1703-001-0001",
                lot : "1703-001-0001",
                release_amount : 100,
                customer_lot : "170301-02"
            },{
                product_name : "SWCH10A-M201",
                product_id : "1703-001-0001",
                lot : "1703-001-0001",
                release_amount : 100,
                customer_lot : "170301-03"
            },{
                product_name : "SWCH10A",
                product_id : "1703-001-0001",
                lot : "1703-001-0001",
                release_amount : 100,
                customer_lot : "170301-04"
            },{
                product_name : "SWCH10A",
                product_id : "1703-001-0001",
                lot : "1703-001-0001",
                release_amount : 100,
                customer_lot : "170301-02"
            },{
                product_name : "SWCH10A",
                product_id : "1703-001-0001",
                lot : "1703-001-0001",
                release_amount : 100,
                customer_lot : "170301-03"
            },
        ]
    }
    // return await FetchApiPost("/api/v1/work/get_barcode_list");
});

export const GET_PACKING_LIST = "GET_PACKING_LIST";
export const GetPackingList = actions(GET_PACKING_LIST, async()=>{
    // return await FetchApiPost("/api/v1/work/get_packing_list");
    return {
        payload : [
            {
                id : 1,
                packing_lot_no : "1901-0001",
                input_lot_no : "1901-0001",
                product_id : "89325-4D010",
                product_name : "BH 디스턴스 TORX 볼트",
                size : "M20*1.5*90",
                label_issued_at : "2019-03-21",
                packing_amount : 1
            },{
                id : 2,
                packing_lot_no : "1901-0001",
                input_lot_no : "1901-0001",
                product_id : "89325-4D010",
                product_name : "BH 디스턴스 TORX 볼트",
                size : "M20*1.5*90",
                label_issued_at : "2019-03-21",
                packing_amount : 2
            },{
                id : 3,
                packing_lot_no : "1901-0001",
                input_lot_no : "1901-0001",
                product_id : "89325-4D010",
                product_name : "BH 디스턴스 TORX 볼트",
                size : "M20*1.5*90",
                label_issued_at : "2019-03-21",
                packing_amount : 3
            },{
                id : 4,
                packing_lot_no : "1901-0001",
                input_lot_no : "1901-0001",
                product_id : "89325-4D010",
                product_name : "BH 디스턴스 TORX 볼트",
                size : "M20*1.5*90",
                label_issued_at : "2019-03-21",
                packing_amount : 4
            },{
                id : 5,
                packing_lot_no : "1901-0001",
                input_lot_no : "1901-0001",
                product_id : "89325-4D010",
                product_name : "BH 디스턴스 TORX 볼트",
                size : "M20*1.5*90",
                label_issued_at : "2019-03-21",
                packing_amount : 5
            },
        ]
    }
});

export const GET_LABEL_PRINT_LIST = "GET_LABEL_PRINT_LIST";
export const GetLabelPrintList = actions(GET_LABEL_PRINT_LIST, async()=>{
    return {
        payload : [
            {
                id : 1,
                packing_date : "2019-03-21",
                product_id : "89325-4D010",
                product_name : "BH 디스턴스 TORX 볼트",
                size : "M20*1.5*90",
                total_packing_amount : 1,
                packing_lot_amount : 1000,
                label_issued_amount : 11,
            },
            {
                id : 2,
                packing_date : "2019-03-21",
                product_id : "89325-4D010",
                product_name : "BH 디스턴스 TORX 볼트",
                size : "M20*1.5*90",
                total_packing_amount : 2,
                packing_lot_amount : 3000,
                label_issued_amount : 10,
            },
            {
                id : 3,
                packing_date : "2019-03-21",
                product_id : "89325-4D010",
                product_name : "BH 디스턴스 TORX 볼트",
                size : "M20*1.5*90",
                total_packing_amount : 3,
                packing_lot_amount : 100,
                label_issued_amount : 0,
            },
            {
                id : 4,
                packing_date : "2019-03-21",
                product_id : "89325-4D010",
                product_name : "BH 디스턴스 TORX 볼트",
                size : "M20*1.5*90",
                total_packing_amount : 4,
                packing_lot_amount : 500,
                label_issued_amount : 33,
            },
            {
                id : 5,
                packing_date : "2019-03-21",
                product_id : "89325-4D010",
                product_name : "BH 디스턴스 TORX 볼트",
                size : "M20*1.5*90",
                total_packing_amount : 5,
                packing_lot_amount : 20,
                label_issued_amount : 123,
            },
            {
                id : 6,
                packing_date : "2019-03-21",
                product_id : "89325-4D010",
                product_name : "BH 디스턴스 TORX 볼트",
                size : "M20*1.5*90",
                total_packing_amount : 5,
                packing_lot_amount : 0,
                label_issued_amount : 100,
            },

        ]
    }
    // return await FetchApiPost("/api/v1/work/get_label_print_list");
});

export const GET_SELFINSPECT_LIST = "GET_SELFINSPECT_LIST";
export const GetSelfinspectList = actions(GET_SELFINSPECT_LIST, async()=>{
    return {
        payload : {
            inspect_list : [
                {
                    id : "1",
                    type : "길이",
                    inspect_size : "10-12",
                    n1 : { value : 10, flag : true},
                    n2 : { value : 10, flag : true},
                    n3 : { value : 10, flag : true},
                    n4 : { value : 10, flag : true},
                    n5 : { value : 10, flag : true},
                    result : 0
                },
                {
                    id : "2",
                    type : "높이",
                    inspect_size : "12:00-13:00",
                    n1 : { value : 11, flag : true},
                    n2 : { value : 11, flag : true},
                    n3 : { value : 11, flag : true},
                    n4 : { value : 11, flag : true},
                    n5 : { value : 11, flag : true},
                    result : 1
                },
                {
                    id : "3",
                    type : "폭",
                    inspect_size : "10-12",
                    n1 : { value : 12, flag : true},
                    n2 : { value : 12, flag : true},
                    n3 : { value : 14, flag : false},
                    n4 : { value : 12, flag : true},
                    n5 : { value : 12, flag : true},
                    result : 1
                },
                {
                    id : "4",
                    type : "각도",
                    inspect_size : "12:00-13:00",
                    n1 : { value : 13, flag : true},
                    n2 : { value : 13, flag : true},
                    n3 : { value : 13, flag : true},
                    n4 : { value : 13, flag : true},
                    n5 : { value : 13, flag : true},
                    result : 0
                },
            ],
            user_inspect_list : [
                {
                    id : 1,
                    inspect_type : "자주검사(초물)",
                    inspect_time : "08:30",
                    inspect_user : "이준수",
                    result : 0
                },
                {
                    id : 2,
                    inspect_type : "순회검사",
                    inspect_time : "11:10",
                    inspect_user : "이준수",
                    result : 1
                },
                {
                    id : 3,
                    inspect_type : "자주검사(초물)",
                    inspect_time : "13:22",
                    inspect_user : "이준수",
                    result : 1
                },
                {
                    id : 4,
                    inspect_type : "자순회검사",
                    inspect_time : "17:20",
                    inspect_user : "이준수",
                    result : 1
                },
            ],
            chart_data : {
                labels : ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],
                datasets : [
                    {
                        fill : false,
                        lineTension : 0,
                        label: "source 1",
                        data : [1, 30, 70, 40, 36, 34, 40, 44, 40, 36, 48, 50],
                        borderColor : "rgba(238,136,35,1)",
                        // fillColor : "rgba(238,136,35,1)",
                    },
                    {
                        fill : false,
                        lineTension : 0,
                        label: "source 2",
                        data : [30, 20, 80, 55, 50, 58, 40, 60, 54, 58, 40, 26],
                        borderColor : "rgba(138,193,187,1)",
                        // fillColor : "rgba(138,193,187,1)",
                    },
                    {
                        fill : false,
                        lineTension : 0,
                        label: "source 3",
                        data : [20, 40, 20, 25, 30, 60, 30, 28, 70, 30, 80, 90],
                        borderColor : "#E84A59",
                        // fillColor : "#E84A59",
                    },
                    {
                        fill : false,
                        lineTension : 0,
                        label: "source 4",
                        data : [20, 18, 15, 20, 18, 24, 10, 30, 28, 40, 50, 45],
                        borderColor : "#6085B0",
                        // fillColor : "#6085B0",
                    }
                ]
            }
        }
    }
    // return await FetchApiPost("/api/v1/work/get_selfinspect_list");
});

export const GET_EQUIPNOP_LIST = "GET_EQUIPNOP_LIST";
export const GetEquipnopList = actions(GET_EQUIPNOP_LIST, async()=>{
    return {
        payload : [
            {
                id : 1,
                product : "볼 스터드",
                nop_time : {
                    start : { day : 4, time : "09:30" },
                    end : { day : 4, time : "10:30" },
                },
                nop_time_total : 240,
                stop_type : 0,
                stop_reason : 0,
                memo : "비가동 분석 또한 단축된 ST에 준하여 보고 해야 함."
            },
            {
                id : 2,
                product : "볼 스터드",
                nop_time : {
                    start : { day : 4, time : "11:20" },
                    end : { day : 4, time : "11:50" },
                },
                nop_time_total : 240,
                stop_type : 1,
                stop_reason : 1,
                memo : "비가동 분석 또한 단축된 ST에 준하여 보고 해야 함."
            },
            {
                id : 3,
                product : "볼 스터드",
                nop_time : {
                    start : { day : 4, time : "12:30" },
                    end : { day : 4, time : "13:20" },
                },
                nop_time_total : 240,
                stop_type : 2,
                stop_reason : 2,
                memo : "비가동 분석 또한 단축된 ST에 준하여 보고 해야 함."
            },
        ]
    }
    // return await FetchApiPost("/api/v1/work/get_equipnop_list");
});

export const GET_STOP_REASON = "GET_STOP_REASON";
export const GetStopReason = actions(GET_STOP_REASON, async()=>{
    return {
        payload : ["부주의", "긴급상황", "화장실"]
    }
    // return await FetchApiPost("/api/v1/work/get_stop_reason");
});

export const GET_STOP_TYPE = "GET_STOP_TYPE";
export const GetStopType = actions(GET_STOP_TYPE, async()=>{
    return {
        payload : ["금형 파손1", "금형 파손2", "금형 파손3"]
    }
    // return await FetchApiPost("/api/v1/work/get_stop_type");
});

export const GET_FLOW_CHART = "GET_FLOW_CHART";
export const GetFlowChart = actions(GET_FLOW_CHART, async()=>{
    return {
        payload : {
            flowchart : [
                {
                    "번호" : 1,
                    "LOT-NO" : "1703-001",
                    "발행자" : "이준수",
                    "기준 장입량" : "200,000",
                    "작업 수량" : "123,000",
                    "발행일자" : "19-03-15 18:30"
                },{
                    "번호" : 2,
                    "LOT-NO" : "1703-001",
                    "발행자" : "이준수",
                    "기준 장입량" : "200,000",
                    "작업 수량" : "123,000",
                    "발행일자" : "19-03-15 18:30"
                },{
                    "번호" : 3,
                    "LOT-NO" : "1703-001",
                    "발행자" : "이준수",
                    "기준 장입량" : "200,000",
                    "작업 수량" : "123,000",
                    "발행일자" : "19-03-15 18:30"
                },{
                    "번호" : 4,
                    "LOT-NO" : "1703-001",
                    "발행자" : "이준수",
                    "기준 장입량" : "200,000",
                    "작업 수량" : "123,000",
                    "발행일자" : "19-03-15 18:30"
                },{
                    "번호" : 5,
                    "LOT-NO" : "1703-001",
                    "발행자" : "이준수",
                    "기준 장입량" : "200,000",
                    "작업 수량" : "123,000",
                    "발행일자" : "19-03-15 18:30"
                },
            ]
        }
    }
    // return await FetchApiPost("/api/v1/work/get_flow_chart");
});

export const GET_MOLD_LIST = "GET_MOLD_LIST";
export const GetMoldList = actions(GET_MOLD_LIST, async()=>{
    return {
        payload : {
            info : [
                {
                    "번호" : 1,
                    "금형코드" : "#D1",
                    "금형관리번호" : "1703-001-0001",
                    "예상수명" : "200,000",
                    "현재 누적타수" : "123,000",
                    "등급" : "B"
                },
                {
                    "번호" : 2,
                    "금형코드" : "#D2",
                    "금형관리번호" : "1703-001-0001",
                    "예상수명" : "200,000",
                    "현재 누적타수" : "123,000",
                    "등급" : "B"
                },
                {
                    "번호" : 3,
                    "금형코드" : "#D3",
                    "금형관리번호" : "1703-001-0001",
                    "예상수명" : "200,000",
                    "현재 누적타수" : "123,000",
                    "등급" : "B"
                },
                {
                    "번호" : 4,
                    "금형코드" : "#D4",
                    "금형관리번호" : "1703-001-0001",
                    "예상수명" : "200,000",
                    "현재 누적타수" : "123,000",
                    "등급" : "B"
                },
                {
                    "번호" : 5,
                    "금형코드" : "#D5",
                    "금형관리번호" : "1703-001-0001",
                    "예상수명" : "200,000",
                    "현재 누적타수" : "123,000",
                    "등급" : "B"
                },
                {
                    "번호" : 6,
                    "금형코드" : "#D6",
                    "금형관리번호" : "1703-001-0001",
                    "예상수명" : "200,000",
                    "현재 누적타수" : "123,000",
                    "등급" : "B"
                },
            ]
        }
    }
    // return await FetchApiPost("/api/v1/work/get_mold_list");
});

export const GET_BAD_STAT = "GET_BAD_STAT";
export const GetBadStat = actions(GET_BAD_STAT, async()=>{
    return {
        payload : {
            stat : [
                {
                    bad_fit_id : "B1703-001-01",
                    equipment : "FM-01",
                    process : "단조성형",
                    bad_code : "흠집 발생",
                    bad_amount : 1034,
                    register : "이준수"
                },
                {
                    bad_fit_id : "B1703-001-01",
                    equipment : "FM-02",
                    process : "단조성형",
                    bad_code : "기포 발생",
                    bad_amount : 100,
                    register : "이준수",
                },
                {
                    bad_fit_id : "B1703-001-01",
                    equipment : "FM-03",
                    process : "단조성형",
                    bad_code : "흑피 발생",
                    bad_amount : 403,
                    register : "이준수",
                },
            ]
        }
    }
    // return await FetchApiPost("/api/v1/work/get_bad_stat");
});

export const GET_BAD_REGIST_LIST = "GET_BAD_REGIST_LIST";
export const GetBadRegistList = actions(GET_BAD_REGIST_LIST, async()=>{
    return {
        payload : [
            {"id" : 1, "text" : "기포 발생"},
            {"id" : 2, "text" : "BURP 발생"},
            {"id" : 3, "text" : "길이 초과"},
            {"id" : 4, "text" : "녹 발생"},
            {"id" : 5, "text" : "흑피 발생"},
            {"id" : 6, "text" : "전원 불량"},
            {"id" : 7, "text" : "부식"},
            {"id" : 8, "text" : "외관 불량"},
            {"id" : 9, "text" : "크랙 발생"},
            {"id" : 10, "text" : "벤딩 발생"},
            {"id" : 11, "text" : "LEAK"},
            {"id" : 12, "text" : "PIN 휨"},
            {"id" : 13, "text" : "도금 불량"},
            {"id" : 14, "text" : "경도 불량"},
            {"id" : 15, "text" : "흠집 발생"},
            {"id" : 16, "text" : "동심도 불량"},
        ]
    }
    // return await FetchApiPost("/api/v1/work/get_bad_regist_list");
});

export const GET_PERF_STAT = "GET_PERF_STAT";
export const GetPerfStat = actions(GET_PERF_STAT, async()=>{
    return {
        payload : {
            simple : [{
                "금형출고" : 1,
                "비가동" : "3건"
            }],
            detail : [
                {"검사1" : 1, "검사2" : 1, "검사3" : 1, "검사4" : 1, "검사5" : 1, "검사6" : 1, "검사7" : -1, "검사8" : 0, "검사9" : 0, "검사10" : 0},
            ]
        }
    }
    // return await FetchApiPost("/api/v1/work/get_perf_stat");
});

export const GET_PERF_INFO = "GET_PERF_INFO";
export const GetPerfInfo = actions(GET_PERF_INFO, async(id : string)=>{
    return { 
        payload : {
            perf_info : {
                "BOX NO" : "1703-001-0001",
                "기준량" : { main : "5,000", option : "EA" },
                "기준단중" : { main : "25.30", option : "g" },
                "작업수량" : { main : "15,000", option : "EA" },
                "제품총중량" : { main : "30,000", option : "KG" },
                "박스중량" : { main : "10", option : "KG" },
                "총중량" : { main : "60,000", option : "KG" },
            },
            perf_small : [
                {
                    "총 계획 수량" : "250,000",
                    "총 생산 수량" : "290,000",
                    "달성율" : "80%",
                    "LOT 발생수" : "10.5",
                    "수량(중량)":  "1,034"
                },
                {
                    "총 계획 수량" : "250,000",
                    "총 생산 수량" : "290,000",
                    "달성율" : "70%",
                    "LOT 발생수" : "11.5",
                    "수량(중량)":  "1,134"
                },
            ],
            perf_lot : [
                {
                    "총 계획 수량" : "250,000",
                    "총 생산 수량" : "290,000",
                    "달성율" : "80%",
                    "총 작업시간" : "10.5",
                    "수량(중량)":  "1,034"
                },
                {
                    "총 계획 수량" : "250,000",
                    "총 생산 수량" : "290,000",
                    "달성율" : "70%",
                    "총 작업시간" : "11.5",
                    "수량(중량)":  "1,134"
                },
            ]
        }
    }
    // return await FetchApiPost("/api/v1/work/get_perf_info");
});

export const GET_MATERIAL_STAT = "GET_MATERIAL_STAT";
export const GetMaterialStat = actions(GET_MATERIAL_STAT, async(id : string)=>{
    return {
        payload : {
            new_info :[
                {
                    "번호" : "1",
                    "투입일시" : "03-28 12:24",
                    "LOT-NO" : "170301-02",
                    "품명(재질)" : "SWCH10A",
                    "규격" : "10.5",
                    "수량(중량)" : "1,034",
                },
                {
                    "번호" : "2",
                    "투입일시" : "03-28 12:24",
                    "LOT-NO" : "170301-02",
                    "품명(재질)" : "SWCH10A",
                    "규격" : "11.5",
                    "수량(중량)" : "1,034",
                },
                {
                    "번호" : "3",
                    "투입일시" : "03-28 12:24",
                    "LOT-NO" : "170301-02",
                    "품명(재질)" : "SWCH10A",
                    "규격" : "12.5",
                    "수량(중량)" : "1,034",
                },
            ],
            used_info : [
                {
                    "번호" : "4",
                    "투입일시" : "03-28 12:24",
                    "LOT-NO" : "170301-02",
                    "품명(재질)" : "SWCH10A",
                    "규격" : "14.5",
                    "수량(중량)" : "1,034",
                },{
                    "번호" : "5",
                    "투입일시" : "03-28 12:24",
                    "LOT-NO" : "170301-02",
                    "품명(재질)" : "SWCH10A",
                    "규격" : "15.5",
                    "수량(중량)" : "1,034",
                },{
                    "번호" : "6",
                    "투입일시" : "03-28 12:24",
                    "LOT-NO" : "170301-02",
                    "품명(재질)" : "SWCH10A",
                    "규격" : "16.5",
                    "수량(중량)" : "1,034",
                },
            ]
        }
    }
});

export const GET_MATERIAL_INFO = "GET_MATERIAL_INFO";
export const GetMaterialInfo = actions(GET_MATERIAL_INFO, async( id : string )=>{
    return {
        payload : {
            small_info : {
                "지시 번호" : "1703-001",
                "품명" : "STUD BALT",
                "품번" : "89325-4D010",
                "규격" : "M20*1.5*90",
                "공정" : "단조성형",
                "작업자명" : "이준수",
                "작업시간" : "10.5",
                "계획수량" : "25,000"
            },
            origin_info :{
                "재질" : "SWCH10A",
                "규격(1)" : "PASAIP",
                "규격(2)" : "23.4",
                "구입처" : "새아특수강",
                "HEAT NO" : "SA100837",
                "COIL NO" : "1344332-8761233",
                "입고중량" : {main : "1,200", option :"KG"}
            }
        }
    }
    // return await FetchApiPost("/api/v1/work/get_material_info");
});

export const GET_WORK_DATA = "GET_WORK_DATA";
export const GetWorkData = actions(GET_WORK_DATA, async(id : string)=>{
    return {
        payload : {
            info : {
                "지시번호" : "1703-001",
                "품명" : "STUD BALT",
                "품번" : "14325-DX003",
                "규격" : "2.5P*50M",
                "총계획수량" : "450,000",
                "계획일자" : "2019-03-14 ~ 2019-03-15",
            },
            history : {
                "date":[
                    "03/04(월)",
                    "03/05(화)",
                    "03/06(수)",
                    "03/07(목)",
                    "03/08(금)",
                    "03/09(토)",
                ],
                "day" : [
                    { price : "15,000", worker : "이준수" },
                    { price : "14,000", worker : "이준수" },
                    { price : "13,000", worker : "이준수" },
                    { price : "12,000", worker : "이준수" },
                    { price : "11,000", worker : "이준수" },
                    { price : "10,000", worker : "이준수" },
                ], 
                "night": [
                    { price : "16,000", worker : "이준수" },
                    { price : "17,000", worker : "이준수" },
                    { price : "18,000", worker : "이준수" },
                    { price : "19,000", worker : "이준수" },
                    { price : "20,000", worker : "이준수" },
                    { price : "21,000", worker : "이준수" },
                ],
                "day_info": [
                    {
                        "선택일자" : {main : "2019-03-04", option : "월"},
                        "작업자" : {main : "이준수", option : "icon:people"},
                        "지시수량" : {main : "15,000", option : "EA"},
                    },
                    {
                        "선택일자" : {main : "2019-03-05", option : "화"},
                        "작업자" : {main : "이준수", option : "icon:people"},
                        "지시수량" : {main : "14,000", option : "EA"},
                    },{
                        "선택일자" : {main : "2019-03-06", option : "수"},
                        "작업자" : {main : "이준수", option : "icon:people"},
                        "지시수량" : {main : "13,000", option : "EA"},
                    },{
                        "선택일자" : {main : "2019-03-07", option : "목"},
                        "작업자" : {main : "이준수", option : "icon:people"},
                        "지시수량" : {main : "12,000", option : "EA"},
                    },{
                        "선택일자" : {main : "2019-03-08", option : "금"},
                        "작업자" : {main : "이준수", option : "icon:people"},
                        "지시수량" : {main : "11,000", option : "EA"},
                    },{
                        "선택일자" : {main : "2019-03-09", option : "토"},
                        "작업자" : {main : "이준수", option : "icon:people"},
                        "지시수량" : {main : "10,000", option : "EA"},
                    }
                ],
                "night_info" : [
                    {
                        "선택일자" : {main : "2019-03-04", option : "월"},
                        "작업자" : {main : "이준수", option : "icon:people"},
                        "지시수량" : {main : "16,000", option : "EA"},
                    },
                    {
                        "선택일자" : {main : "2019-03-05", option : "화"},
                        "작업자" : {main : "이준수", option : "icon:people"},
                        "지시수량" : {main : "17,000", option : "EA"},
                    },{
                        "선택일자" : {main : "2019-03-06", option : "수"},
                        "작업자" : {main : "이준수", option : "icon:people"},
                        "지시수량" : {main : "18,000", option : "EA"},
                    },{
                        "선택일자" : {main : "2019-03-07", option : "목"},
                        "작업자" : {main : "이준수", option : "icon:people"},
                        "지시수량" : {main : "19,000", option : "EA"},
                    },{
                        "선택일자" : {main : "2019-03-08", option : "금"},
                        "작업자" : {main : "이준수", option : "icon:people"},
                        "지시수량" : {main : "20,000", option : "EA"},
                    },{
                        "선택일자" : {main : "2019-03-09", option : "토"},
                        "작업자" : {main : "이준수", option : "icon:people"},
                        "지시수량" : {main : "21,000", option : "EA"},
                    }
                ]
            }
        }
    };
    // return await FetchApiPost("/api/v1/work/get_work_data");
});

export const SET_EQUIP_CODES = "SET_EQUIP_CODES";
export const SetEquipCodes = actions(SET_EQUIP_CODES, (itemNo : number)=>{
    return {payload : itemNo};
    // return await FetchApiPost("/api/v1/work/set_equip_codes");
});

export const GET_EQUIP_CODES = "GET_EQUIP_CODES";
export const GetEquipCodes = actions(GET_EQUIP_CODES, async(token : string, lineNo : number)=>{
    return await FetchApiGet(`/rest/v1/lines/${lineNo}/machines`, null, token);
});

export const GET_WORK_STAT = "GET_WORK_STAT";
export const GetWorkStat = actions(GET_WORK_STAT, async(token : string, cmdType : string, lineNo : string, mchNo ?: string, startDt ?: string, endDt ?: string, userNo ?: number )=>{
    let param = { 
        cmdType, 
        lineNo,
    }
    if(userNo) Object.assign(param, {userNo});
    if(endDt != undefined){
        Object.assign(param, { startDt : startDt, endDt : endDt });
        if(mchNo) Object.assign(param, { mchNo });
    } else {
        Object.assign(param, { accountMon : startDt });
    }
    
    return await FetchApiGet("/rest/v1/pop/commands/lines", param, token );
});

export const GET_WORK_CODE = "GET_WORK_CODE";
export const Getworkcode = actions(GET_WORK_CODE, async(token : string, id : string)=>{
    return await FetchApiGet(`/rest/v1/users/${id}/lines`, null, token);
});

export const SET_WORK_CODE = "SET_WORK_CODE";
export const Setworkcode = actions(SET_WORK_CODE, async(id : string)=>{
    return {payload : id };
    //return await FetchApiPost("/api/v1/work/set_work_code");
});

export const SET_WORK_STAT = "SET_WORK_STAT";
export const SetWorkStat = actions(SET_WORK_STAT, ( workstat : object)=>{
    return { payload : workstat };
})

export const GET_PROG_CODES = "GET_PROG_CODES";
export const GetProgCodes = actions(GET_PROG_CODES, async( token : string, itemNo : number )=>{
    return await FetchApiGet(`/rest/v1/items/${itemNo}/progs`, null , token);
})

export const SET_PROG_CODE = "SET_PROG_CODE";
export const SetProgCode = actions(SET_PROG_CODE, ( progNo : number )=>{
    return {payload : progNo}
});

export const GET_CMD_INFO = "GET_CMD_INFO";
export const GetCmdInfo = actions(GET_CMD_INFO, async(token : string, cmdNo : string)=>{
    return await FetchApiGet(`/rest/v1/commands/monthly/${cmdNo}`, null, token);
});

export const GET_WORK_FIX = "GET_WORK_FIX";
export const GetWorkFix = actions(GET_WORK_FIX, async(token : string, pcmdNo : string, lineNo : number, progNo : number, mchNo : number, startDt : string, endDt : string)=>{
    return await FetchApiGet("/rest/v1/pop/commands/daily", { pcmdNo, lineNo, progNo, mchNo, startDt, endDt }, token);
});

export const GET_WORKER_LIST = "GET_WORK_LIST";
export const GetWorkerList = actions(GET_WORKER_LIST, async(token : string, lineNo : number)=>{
    return await FetchApiGet(`/rest/v1/lines/${lineNo}/users`, null, token);
});

export const SET_WORK_REGIST = "SET_WORK_REGIST";
export const SetWorkRegist = actions(SET_WORK_REGIST, async( token : string , commandList : commandsDailyType[] )=>{
    return await FetchApiPost(`/rest/v1/pop/commands/daily`, commandList, token );
});

export const DEL_WORK_REGIST = "DEL_WORK_REGIST";
export const DelWorkRegist = actions(DEL_WORK_REGIST, async( token : string, delList : number[])=>{
    console.log(delList)
    return await FetchApiPost(`/rest/v1/commands/daily/delete`, delList, token);
});