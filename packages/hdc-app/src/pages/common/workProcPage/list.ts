import moment from "moment";

export const makeWorkProcList = (
    workPorcList: any[],
    assignList: any[],
    approvalInfoList: any[],
    myAssignList: any[],
    workTypeVal: number,
    type: string,
    wpIdx: string
) => {
    let sendListNowOrder: any[] = [];
    let sendList: any[] = [];
    let recvList: any[] = [];

    for (let i = 0; i < workPorcList.length; i++) {
        let wpValue = workPorcList[i];
        let assignValue = assignList[i];

        let _length = assignValue.length;
        let _wa_idx = myAssignList && myAssignList[i] ? myAssignList[i].wa_idx : null; // 결재할 아이디 wa_idx
        let _state =
            myAssignList && myAssignList[i]
                ? myAssignList[i].assign_state
                : assignValue[_length - 1].assign_state;
        let is_fin = assignValue[_length - 1].is_fin; // DRN 의 review 를 다달고 검토완료시 is_fin = 1
        let _is_approval = assignValue[_length - 1].is_approval;
        let late_date = moment(wpValue.due_date).diff(moment(), "days");
        let create_tm = moment(wpValue.create_tm).format("YYYY-MM-DD");
        let assign_date =
            wpValue.assign_date != null ? moment(wpValue.assign_date).format("YYYY-MM-DD") : null;

        let result = {
            wp_idx: wpValue.wp_idx,
            tm_code: wpValue.tm_code ? wpValue.tm_code : "",
            subject: wpValue.subject,
            due_date: late_date,
            now_approver:
                approvalInfoList.length != 0 && approvalInfoList[i].now_approver.length != 0
                    ? approvalInfoList[i].now_approver[0].username
                    : "",
            approver:
                approvalInfoList.length != 0 && approvalInfoList[i].last_approver.length != 0
                    ? approvalInfoList[i].last_approver[0].username
                    : "",
            assign_state: wpValue.assign_text,
        };

        if (workTypeVal == 1) {
            sendListNowOrder.push([wpValue.wp_idx, wpValue.original_tm_id]);
        } else if (workTypeVal == 2) {
            Object.assign(result, {
                create_tm: create_tm,
                assign_date: assign_date,
            });
            if (type == "tm") {
                Object.assign(result, {
                    check_wp_idx: wpValue.wp_idx,
                    is_fin_count: wpValue.is_fin_count + " / " + wpValue.is_fin_total_count,
                });
            }
            if (type != "din") {
                Object.assign(result, {
                    //결재상태 계산에 필요한 값들을 넣어두는 용도
                    now_order: [
                        approvalInfoList[i].now_approver,
                        _state,
                        _wa_idx,
                        _is_approval,
                        approvalInfoList[i].last_approver,
                        wpValue.original_tm_id,
                        wpValue.wp_code,
                        wpValue.comment,
                        wpValue.project_no,
                        is_fin,
                        wpValue.step,
                    ],
                });
            }
        }
        if (wpIdx != undefined && wpValue.wp_idx != wpIdx) continue;
        sendList.push(result);
        recvList.push(result);
    }
    return {
        sendList,
        recvList,
        sendListNowOrder,
    };
};

export const makeSendList = (sendList: any[], sendListNowOrder: any[]) => {
    let rootData: any[] = [];
    rootData = sendList.filter(
        (raw: any, idx: number) =>
            raw.wp_idx == sendListNowOrder[idx][0] && sendListNowOrder[idx][1] == 0
    );
    if (rootData.length != 0) {
        for (let list of rootData) {
            let subDataList: any[] = [];

            let root: any = list;
            let count: number = 0;
            let is_next: boolean = true;

            while (is_next) {
                let subData = sendListNowOrder.find(raw => raw[1] == root.wp_idx);

                if (subData != undefined) {
                    let data = sendList.find(raw => raw.wp_idx == subData[0]);

                    count++;
                    root = data;
                    subDataList.push(data);
                } else {
                    is_next = false;
                }
            }

            if (subDataList.length != 0) {
                subDataList.map((raw: any, count: number) => {
                    let subIdx = sendList.findIndex(subRaw => subRaw.wp_idx == raw.wp_idx);
                    sendList.splice(subIdx, 1);

                    let rootIdx = sendList.findIndex(rootRaw => rootRaw.wp_idx == list.wp_idx);
                    sendList.splice(rootIdx + count + 1, 0, raw);
                });
            }
        }
    }
    return {
        rootData,
        sendList,
    };
};

export const makeRecvList = (recvList: any[]) => {
    let rootData: any[] = [];
    rootData = recvList.filter(raw => raw.now_order[5] == 0);
    if (rootData.length != 0) {
        for (let list of rootData) {
            let subDataList: any[] = [];

            let root: any = list;
            let subData = true;
            while (subData != undefined) {
                subData = recvList.find(raw => raw.now_order[5] == root.wp_idx);

                if (subData != undefined) {
                    root = subData;
                    subDataList.push(subData);
                }
            }

            if (subDataList.length != 0) {
                subDataList.map((raw: any, count: number) => {
                    let subIdx = recvList.findIndex(subRaw => subRaw.wp_idx == raw.wp_idx);
                    recvList.splice(subIdx, 1);

                    let rootIdx = recvList.findIndex(rootRaw => rootRaw.wp_idx == list.wp_idx);
                    //반려일경우 코멘트유지
                    if (raw.now_order[7] != "" && raw.now_order[7] != undefined) {
                    } else raw.now_order[7] = true;
                    recvList.splice(rootIdx + count + 1, 0, raw);
                });
            }
        }
    }
    return recvList;
};

export const makeCheckedList = (checked: number[], workProcList: any[]) => {
    let list: any[] = [];
    let order: any[] = [];
    for (var wp_idx of checked) {
        let find_wp_idx = workProcList.findIndex((raw: any) => raw.wp_idx == wp_idx);
        if (find_wp_idx != -1) {
            order.push(workProcList[find_wp_idx].approvalState);
            list.push(workProcList[find_wp_idx].registerType);
        }
    }
    return {
        list,
        order,
    };
};

export const getPageIndex = (skip: number, pageSize: number) => {
    return Math.floor(skip / pageSize) + 1;
};
