import {
    FetchApiPost,
    FetchApiGet,
    FetchApiDelete,
    FetchApiPostWithFile,
    FetchApiPostWithFiles,
} from "../network";
import actions from "common_module/lib/action/creator";

export const GET_DOCUMENT_REVIEW_CATEGORY_LIST = "GET_DOCUMENT_REVIEW_CATEGORY_LIST";
export const GetDocumentReviewCategoryList = actions(
    GET_DOCUMENT_REVIEW_CATEGORY_LIST,
    async (project_no: number) => {
        return {
            payload: [
                {
                    document_number : "TEP-ST-SP-0006-P"
                },
                {
                    document_number : "TEP-ST-SP-0009-P"
                },
                {
                    document_number : "TEP-ST-SP-0011-P"
                },
            ]
        }
    }
);

export const GET_DOCUMENT_REVIEW_LIST = "GET_DOCUMENT_REVIEW_LIST";
export const GetDocumentReviewList = actions(
    GET_DOCUMENT_REVIEW_LIST,
    async (document_number?: string) => {
        let payload : any[] = [];
        if(document_number === "TEP-ST-SP-0006-P"){
            payload.push( {
                No: 1,
                document_number: "TEP-ST-SP-0006-P",
                document_subject:
                    "Technical Specification for Aux. Boiler\n(보조 보일러 기술규격서)",
                review_comment: "공급범위에 SCR 및 관련 설비 필요시 공급으로 문구 추가요",
                create_by: "관리자",
                reply: "보조보일러는 SCR 설치 없이 NOx 보증치 40 ppm을 충분히 만족할 수 있기에 반영하지 않는게 일반적인 사항 입니다.",
                file_name: "Boiler File Name",
                create_tm: "2021-09-01",
            },
            {
                No: 2,
                document_number: "TEP-ST-SP-0006-P",
                document_subject:
                    "Technical Specification for Aux. Boiler\n(보조 보일러 기술규격서)",
                review_comment: "공급범위에 SCR 및 관련 설비 필요시 공급으로 문구 추가요",
                create_by: "관리자",
                reply: "보조보일러는 SCR 설치 없이 NOx 보증치 40 ppm을 충분히 만족할 수 있기에 반영하지 않는게 일반적인 사항 입니다.",
                file_name: "Boiler File Name",
                create_tm: "2021-09-01",
            }
            )
        }else if(document_number === "TEP-ST-SP-0009-P"){
            payload.push(
                {
                    No: 1,
                    document_number: "TEP-ST-SP-0009-P",
                    document_subject:
                        "Technical Specification for Aux. Boiler\n(보조 보일러 기술규격서)",
                    review_comment: "1.2.6 LNG 감압 스테이션\nFilter는 필요없는지?",
                    create_by: "관리자",
                    reply: "LNG Governor 에서의 Absolute Filter 후단에서 LNG 가 공급되므로, 별도의 Filter 는 불필요합니다. 단, 업체 설계 기준에 따라 적용 필요할 수 있으므로, 필요한 경우 적용하는 것으로 수정 하였습니다.",
                    file_name: "Boiler File Name",
                    create_tm: "2021-08-27",
                },
                {
                    No: 2,
                    document_number: "TEP-ST-SP-0009-P",
                    document_subject:
                        "Technical Specification for Aux. Boiler\n(보조 보일러 기술규격서)",
                    review_comment: "대기환경보전법, 시행령 및 관련 규칙 문구 추가요",
                    create_by: "관리자",
                    reply: "반영하였습니다.",
                    file_name: "Boiler File Name",
                    create_tm: "2021-08-28",
                },
                {
                    No: 3,
                    document_number: "TEP-ST-SP-0009-P",
                    document_subject:
                        "Technical Specification for Aux. Boiler\n(보조 보일러 기술규격서)",
                    review_comment:
                        "보조보일러 증기 유량이 확정되지 않는 상태임. 확정시 Update하여 반영 요",
                    create_by: "관리자",
                    reply: "보조증기 용량 계산서 기준으로 작성되었으며, 최종 확정시 Update 하겠습니다.",
                    file_name: "Boiler File Name",
                    create_tm: "2021-08-29",
                },
                {
                    No: 4,
                    document_number: "TEP-ST-SP-0009-P",
                    document_subject:
                        "Technical Specification for Aux. Boiler\n(보조 보일러 기술규격서)",
                    review_comment:
                        "'3.2.1 D) 보조보일러 드럼 통과시 증기순도: 0.2 ppm 이하\n-> 증기 순도가 의미하는게 무엇이며 0.2 ppm이하의 기준은?",
                    create_by: "관리자",
                    reply: "전체 용해된 고형물(Total Dissolved Solid)를 의미합니다. 이는 관련 Code(ABMA, NEMA)에서 규정하고 있습니다.",
                    file_name: "Boiler File Name",
                    create_tm: "2021-08-30",
                },
                {
                    No: 5,
                    document_number: "TEP-ST-SP-0009-P",
                    document_subject:
                        "Technical Specification for Aux. Boiler\n(보조 보일러 기술규격서)",
                    review_comment: "연료 공급압력: 77±3 bar(g) LNG 터미널 설계 담당자 확인할 것",
                    create_by: "관리자",
                    reply: "LNG 터미널 설계 담당자로부터 77.83 bar(g) 로 회신 받았으나, 실제 공급 압력의 변동성을 감안하여 기존 77±3 bar(g) 를 유지하도록 하겠습니다.",
                    file_name: "Boiler File Name",
                    create_tm: "2021-08-31",
                },
                {
                    No: 6,
                    document_number: "TEP-ST-SP-0009-P",
                    document_subject:
                        "Technical Specification for Aux. Boiler\n(보조 보일러 기술규격서)",
                    review_comment: "공급범위에 SCR 및 관련 설비 필요시 공급으로 문구 추가요",
                    create_by: "관리자",
                    reply: "보조보일러는 SCR 설치 없이 NOx 보증치 40 ppm을 충분히 만족할 수 있기에 반영하지 않는게 일반적인 사항 입니다.",
                    file_name: "Boiler File Name",
                    create_tm: "2021-09-01",
                },
            )
        }else if(document_number === "TEP-ST-SP-0011-P"){
            payload.push( 
            {
                No: 1,
                document_number: "TEP-ST-SP-0011-P",
                document_subject:
                    "Technical Specification for Aux. Boiler\n(보조 보일러 기술규격서)",
                review_comment: "공급범위에 SCR 및 관련 설비 필요시 공급으로 문구 추가요",
                create_by: "관리자",
                reply: "보조보일러는 SCR 설치 없이 NOx 보증치 40 ppm을 충분히 만족할 수 있기에 반영하지 않는게 일반적인 사항 입니다.",
                file_name: "Boiler File Name",
                create_tm: "2021-09-01",
            },
            {
                No: 2,
                document_number: "TEP-ST-SP-0011-P",
                document_subject:
                    "Technical Specification for Aux. Boiler\n(보조 보일러 기술규격서)",
                review_comment: "공급범위에 SCR 및 관련 설비 필요시 공급으로 문구 추가요",
                create_by: "관리자",
                reply: "보조보일러는 SCR 설치 없이 NOx 보증치 40 ppm을 충분히 만족할 수 있기에 반영하지 않는게 일반적인 사항 입니다.",
                file_name: "Boiler File Name",
                create_tm: "2021-09-01",
            },
            {
                No: 3,
                document_number: "TEP-ST-SP-0011-P",
                document_subject:
                    "Technical Specification for Aux. Boiler\n(보조 보일러 기술규격서)",
                review_comment: "공급범위에 SCR 및 관련 설비 필요시 공급으로 문구 추가요",
                create_by: "관리자",
                reply: "보조보일러는 SCR 설치 없이 NOx 보증치 40 ppm을 충분히 만족할 수 있기에 반영하지 않는게 일반적인 사항 입니다.",
                file_name: "Boiler File Name",
                create_tm: "2021-09-01",
            },
            {
                No: 4,
                document_number: "TEP-ST-SP-0011-P",
                document_subject:
                    "Technical Specification for Aux. Boiler\n(보조 보일러 기술규격서)",
                review_comment: "공급범위에 SCR 및 관련 설비 필요시 공급으로 문구 추가요",
                create_by: "관리자",
                reply: "보조보일러는 SCR 설치 없이 NOx 보증치 40 ppm을 충분히 만족할 수 있기에 반영하지 않는게 일반적인 사항 입니다.",
                file_name: "Boiler File Name",
                create_tm: "2021-09-01",
            },
           )
        }
        return {
            payload: payload
        };
        // return await FetchApiPostWithFiles("/api/v1/edms/work/din/upload_attach_files", files, {wp_idx});
    }
);
