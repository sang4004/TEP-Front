import { AnyAction } from "redux";
import {
    workHistoryType,
    badregistListObjectType,
	SET_WORK_CODE,
	GET_WORK_CODE,
	GET_WORK_STAT,
	GET_EQUIP_CODES,
	SET_EQUIP_CODES,
	GET_WORK_DATA,
	GET_MATERIAL_INFO,
	GET_MATERIAL_STAT,
	GET_PERF_INFO,
	GET_PERF_STAT,
	GET_BAD_REGIST_LIST,
	GET_BAD_STAT,
	GET_MOLD_LIST,
	GET_FLOW_CHART,
	GET_STOP_TYPE,
	GET_STOP_REASON,
	GET_EQUIPNOP_LIST,
	GET_SELFINSPECT_LIST,
	GET_LABEL_PRINT_LIST,
	GET_PACKING_LIST,
	GET_BARCODE_LIST,
    SET_WORK_STAT,
    GET_PROG_CODES,
    SET_PROG_CODE,
    GET_CMD_INFO,
    GET_WORK_FIX,
    GET_WORKER_LIST,
    SET_WORK_REGIST,
    DEL_WORK_REGIST
} from '../action';

export type workState = {
    isLoading : boolean;
    selectedCode : string;
// api developed
    lines : linesType[];
    lineCodes ?: string[];
    lineNms ?: string[];
    lineNos ?: number[];
    selectedLine ?: object;
    equipCodes : equipCodesType[];
    selectedEquipCode : number;
    progCodes : progCodesType[];
    selectedProgCode : number;
    cmdInfo ?: workHistoryType;
    cmdInfoErr ?: boolean;
    fixHistory ?: any;
    workers ?: workerType[];
    workhistory ?: workHistoryType[] | workHistoryType;
//
    workstat ?: object[];
    workinfo ?: object;
    matSmallInfo ?: object;
    matOriginInfo ?: object;
    matUsedInfo ?: object[];
    matNewInfo ?: object[];
    perfInfo ?: object;
    perfSmall ?: object[];
    perfLot ?: object[];
    perfStatSimple ?: object[];
    perfStatDetail ?: object[];
    badregistList ?: badregistListObjectType[];
    badregistStat ?: object[];
    moldList ?: object[];
    flowchartList ?: object[];
    stopTypeList ?: string[];
    stopReasonList ?: string[];
    equipNOPList ?: object[];
    selfInspectList ?: object[];
    selfInspectUserList ?: object[];
    selfInspectChartData ?: object;
    labelPrintList ?: object[];
    packingList ?: object[];
    barcodeList ?: object[];
}

const initialState : workState = {
    isLoading : false,
// api developed
    lines : [],
    lineCodes : [],
    lineNms : [],
    lineNos : [],
    selectedLine : undefined,
    selectedCode : "",
    equipCodes : [],
    selectedEquipCode : -1,
    cmdInfo : undefined,
    cmdInfoErr : false,
    workhistory : undefined,
//
    workstat : undefined,
    workinfo : undefined,
    matSmallInfo : undefined,
    matOriginInfo : undefined,
    perfInfo : undefined,
    perfSmall : undefined,
    perfLot : undefined,
    perfStatSimple : undefined,
    perfStatDetail : undefined,
    badregistList : undefined,
    badregistStat : undefined,
    moldList : undefined,
    flowchartList : undefined,
    stopTypeList : undefined,
    stopReasonList : undefined,
    equipNOPList : undefined,
    selfInspectList : undefined,
    selfInspectUserList : undefined,
    selfInspectChartData : undefined,
    labelPrintList : undefined,
    packingList : undefined,
    barcodeList : undefined,
    progCodes : [],
    selectedProgCode : -1
}

export type linesType = {
    lineNm : string;
    lineNo : number;
    lineCode : string;
}

export type equipCodesType = {
    itemModel : string;
    itemName : string;
    itemNo : number;
    itemNumber : string;
    itemSpec : string;
    lmIdx : number;
}

export type progCodesType = {
    isDel : string;
    isUse : string;
    itemNo : number;
    leadTime : number;
    leadTimeUnit : string;
    lossTime : number;
    optimunNum : number;
    perWt : number;
    perWtUnit : string;
    prodSetTime : number;
    progName : string;
    progNo : number;
    progOrder : number;
    progSpec : string;
    progTypeCode : string;
    progressCode : string;
    progressCodeName : string;
    progressTime : number;
    timeUnit : string;
    toolSetTime : number;
}

export type workerType = {
    luIdx : number;
    userNo : number;
    name : string;
    partCode : string;
    partLevelJob : string;
}

export const work = (state:workState=initialState, {type, payload} : AnyAction)=>{
    switch(type){
        case SET_WORK_REGIST:
            return {
                ...state
            }
        case GET_WORKER_LIST :
            return {
                ...state,
                workers : payload.data
            }
        case GET_WORK_FIX : 
            return {
                ...state,
                workhistory : payload.data
            }
        case GET_CMD_INFO + "_LOADING" : 
            return {
                ...state,
                cmdInfoErr : false
            }
        case GET_CMD_INFO :
            return {
                ...state,
                cmdInfo : payload.data ? payload.data : undefined,
                workhistory : payload.data ? state.workhistory : undefined,
                cmdInfoErr : payload.data == false
            }
        case SET_PROG_CODE :
            return {
                ...state,
                selectedProgCode : payload
            }
        case GET_PROG_CODES : 
            return {
                ...state,
                progCodes : payload.data
            }
        case SET_WORK_CODE :
            let line = state.lines.filter((val : linesType, idx : number)=>{ return val.lineNo == payload });
            return {
                ...state,
                selectedCode : payload,
                selectedLine : line.length > 0 ? line[0] : state.selectedLine
            }
        case GET_WORK_CODE + "_LOADING" : 
            return {
                ...state,
                lines : [],
                lineCodes : [],
                lineNms : [],
                lineNos : [],
                selectedLine : undefined,
                selectedCode : "",
                equipCodes : [],
                selectedEquipCode : -1,
                cmdInfo : undefined,
                fixHistory : undefined,
            }
        case GET_WORK_CODE :
            let _codes = [...payload.data.map((raw:linesType,idx:any)=>raw.lineCode)];
            let _nms = [...payload.data.map((raw : linesType, idx : any)=>raw.lineNm)];
            let _nos = [...payload.data.map((raw : linesType, idx : any)=>raw.lineNo)];
            return {
                ...state,
                lines : payload.data,
                lineCodes : _codes,
                lineNms : _nms,
                lineNos : _nos,
                selectedLine : payload.data.length > 0 ? payload.data[0] : undefined
            }
        case GET_WORK_STAT + "_LOADING" : 
            return {
                ...state,
                isLoading : true
            }
        case GET_WORK_STAT :
            return {
                ...state,
                workstat : payload.data,
                isLoading : false
            }
        case SET_WORK_STAT : 
            return {
                ...state,
                workinfo : payload
            }
        case GET_EQUIP_CODES :
            return {
                ...state,
                equipCodes : payload.data
            }
        case SET_EQUIP_CODES :
            return {
                ...state,
                selectedEquipCode : payload
            }
        case GET_WORK_DATA :
            return {
                ...state,
                workhistory : payload.history
            }
        case GET_MATERIAL_INFO :
            return {
                ...state,
                matSmallInfo : payload.small_info,
                matOriginInfo : payload.origin_info
            }
        case GET_MATERIAL_STAT :
            return {
                ...state,
                matUsedInfo : payload.used_info,
                matNewInfo : payload.new_info
            }
        case GET_PERF_INFO :
            return {
                ...state,
                perfInfo : payload.perf_info,
                perfSmall : payload.perf_small,
                perfLot : payload.perf_lot
            }
        case GET_PERF_STAT :
            return {
                ...state,
                perfStatSimple : payload.simple,
                perfStatDetail : payload.detail
            }
        case GET_BAD_REGIST_LIST :
            return {
                ...state,
                badregistList : payload
            }
        case GET_BAD_STAT :
            return {
                ...state,
                badregistStat : payload.stat   
            }
        case GET_MOLD_LIST :
            return {
                ...state,
                moldList : payload.info   
            }
        case GET_FLOW_CHART :
            return {
                ...state,
                flowchartList : payload.flowchart
            }
        case GET_STOP_TYPE :
            return {
                ...state,
                stopTypeList : payload
            }
        case GET_STOP_REASON :
            return {
                ...state,
                stopReasonList : payload
            }
        case GET_EQUIPNOP_LIST :
            return {
                ...state,
                equipNOPList : payload
            }
        case GET_SELFINSPECT_LIST :
            return {
                ...state,
                selfInspectList : payload.inspect_list,
                selfInspectUserList : payload.user_inspect_list,
                selfInspectChartData : payload.chart_data
            }
        case GET_LABEL_PRINT_LIST :
            return {
                ...state,
                labelPrintList : payload
            }
        case GET_PACKING_LIST :
            return {
                ...state,
                packingList : payload
            }
        case GET_BARCODE_LIST :
            return {
                ...state,
                barcodeList : payload
            }
        default : 
            return state;
    }
}