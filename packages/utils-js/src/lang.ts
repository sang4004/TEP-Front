const lang = {
    "/login" : "로그인",
    "/info" : "정보 관리",    
    "/workstat" : "작업지시현황",    
    "/workregist" : "작업지시등록",    
    "/matpush" : "소재 투입",    
    "/pfregist" : "실적 등록",    
    "/badregist" : "불량 등록",    
    "/moldio" : "금형 입출고",    
    "/flowchart" : "공정이동표",    
    "/equipnop" : "설비 비가동",    
    "/selfinspect" : "자주 검사",    
    "/labelprint" : "라벨출력",
    "/packing" : "포장",
    "/shipment" : "출하등록",
    "/dashboard" : "상황실",
    "id" : "번호",
    "type" : "항목",
    "inspect_type" : "검사구분",
    "inspect_size" : "규격",
    "result" : "결과",
    "inspect_time" : "검사시각",
    "inspect_user" : "검사자",
    "packing_date" : "포장일자",
    "product_id" : "품번",
    "product_name" : "품명",
    "size" : "규격",
    "total_packing_amount" : "총 포장 수량",
    "packing_lot_amount" : "포장 LOT 수량",
    "label_issued_amount" : "라벨 발행 수량",
    "cancel" : "취소",
    "packing_lot_no" : "포장 LOT-NO",
    "input_lot_no" : "투입 LOT-NO",
    "label_issued_at" : "라벨 발행일자",
    "packing_amount" : "포장 수량",
    "lot" : "LOT",
    "release_amount" : "출고수량",
    "customer_lot" : "고객LOT",
    "register" : "등록자",
    "bad_fit_id" : "부적합식별표",
    "equipment" : "설비",
    "process" : "공정",
    "bad_code" : "불량코드",
    "bad_amount" : "불량수량",
    //work stat
    "cmdNo" : "작지번호\n(우선순위)",
    "regiDt" : "날짜",
    "itemName" : "품명",
    "itemNumber" : "품번",
    "itemSpec" : "규격",
    "progName" : "공정",
    "cmdAmt" : "지시수량",
    "totalWorkAmt" : "생산수량",
    "workRate" : "진행률",
    //
    // cmd info
    "regiDtRange" : "계획일자"
    //
}

export const getLang = (key:any)=>{
    if(lang[key])
        return lang[key]
    return key;
}