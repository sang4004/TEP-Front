export default {
    // EDMS 유동적인 내비게이션 상수
    EDMS_DOCUMENT_INFO_NAV: {
        id: "projectInfo",
        title: "기준정보",
        type: "group",
        children: [
            {
                id: "projectstat",
                title: "프로젝트",
                sub: "기준정보 - 프로젝트",
                type: "item",
                url: "/edms/project",
            },
            {
                id: "discipline",
                title: "분야",
                sub: "기준정보 - 분야",
                type: "item",
                url: "/edms/discipline",
            },
            {
                id: "category",
                title: "카테고리",
                sub: "기준정보 - 카테고리",
                type: "item",
                url: "/edms/category",
            },
            {
                id: "document",
                title: "문서",
                sub: "기준정보 - 문서",
                type: "item",
                url: "/edms/document",
            },
            // {
            //     id: "documanager",
            //     title: "문서 담당자",
            //     sub: "기준정보 - 문서담당자",
            //     type: "item",
            //     url: "/edms/documanager",
            // },
            {
                id: "admindeletebox",
                title: "관리자 휴지통",
                sub: "문서관리 - 관리자 휴지통",
                type: "item",
                url: "/edms/admindeletebox",
            },
        ],
    },

    // only company admin
    EDMS_DOCUMENT_INFO_NAV_FOR_COMP_MNG: {
        id: "projectInfo",
        title: "기준정보",
        type: "group",
        children: [
            {
                id: "projectstat",
                title: "프로젝트",
                sub: "기준정보 - 프로젝트",
                type: "item",
                url: "/edms/project",
            },
            {
                id: "discipline",
                title: "분야",
                sub: "기준정보 - 분야",
                type: "item",
                url: "/edms/discipline",
            },
            {
                id: "category",
                title: "카테고리",
                sub: "기준정보 - 카테고리",
                type: "item",
                url: "/edms/category",
            },
            {
                id: "document",
                title: "문서",
                sub: "기준정보 - 문서",
                type: "item",
                url: "/edms/document",
            },
        ],
    },

    EDMS_DOCUMENT_MANAGE_NAV: {
        id: "mydocument",
        title: "문서관리",
        type: "group",
        children: [
            {
                id: "mytempdoc",
                title: "내문서",
                sub: "문서관리 - 내문서",
                type: "item",
                url: "/edms/tmpDocList",
            },
            // {
            //     id: "din",
            //     title: "문서접수",
            //     sub: "문서관리 - 문서접수",
            //     type: "item",
            //     url: "/edms/workproc/din",
            //     badge: {
            //         title: 0,
            //         bg: "rgb(3, 155, 228)",
            //         fg: "#FFFFFF",
            //     },
            // },
            {
                id: "drn",
                title: "문서회신",
                sub: "문서관리 - 문서회신",
                type: "item",
                url: "/edms/workproc/drn",
                badge: {
                    title: 0,
                    bg: "rgb(3, 155, 228)",
                    fg: "#FFFFFF",
                },
            },
            {
                id: "tm",
                title: "TR",
                sub: "문서관리 - TR",
                type: "item",
                url: "/edms/workproc/tm",
                badge: {
                    title: 0,
                    bg: "rgb(3, 155, 228)",
                    fg: "#FFFFFF",
                },
            },
            {
                id: "deletebox",
                title: "휴지통",
                sub: "문서관리 - 휴지통",
                type: "item",
                url: "/edms/deletebox",
            },
        ],
    },

    EDMS_PROJECT_TREND: {
        id: "myproject",
        title: "프로젝트 현황",
        type: "item",
        url: "/edms/pjtrend",
    },

    EDMS_OTHER_DOC: {
        id: "otherdocument",
        title: "첨부",
        type: "group",
        children: [
            {
                id: "other_document",
                title: "첨부 파일",
                sub: "첨부 파일",
                type: "item",
                url: "/edms/otherdocument",
            },
        ],
    },

    EDMS_TFT_LOG: {
        id: "log",
        title: "Log",
        type: "group",
        children: [
            {
                id: "tft_log",
                title: "TFT Log",
                sub: "TFT Log",
                type: "item",
                url: "/edms/log",
            },
        ],
    },
    //

    // past path black list
    PAST_PATH_BLACK_LIST: ["pdfviewer"],
};
