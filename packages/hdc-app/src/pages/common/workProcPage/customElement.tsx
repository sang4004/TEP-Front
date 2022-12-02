import * as S from "../../../styled/edmsWorkProc.styled";

export const getRecvWpIdxEl = (workList: any[], dataIdx: number) => {
    if (workList[dataIdx]) {
        let data = workList[dataIdx];
        return (
            <S.TableTd
                style={{
                    justifyContent: "flex-start",
                    textAlign: "center",
                    background: "#fff",
                }}
            >
                {/* 
					data.now_order[7]에 값이 있는 데이터는 상위 데이터가 없는 데이터들 
					ex) ┖ 만 나오던 데이터 
				*/}
                {data.now_order &&
                data.now_order[5] > 0 &&
                data.now_order[7] != undefined && // 아래 비교하는 거랑 다른건가?
                data.now_order[7] ? (
                    <div style={{ fontWeight: 600, fontSize: "1em", color: "#333" }}>┖</div>
                ) : (
                    workList[dataIdx].wp_idx
                )}
            </S.TableTd>
        );
    } else return <S.TableTd />;
};

export const getSendWpIdxEl = (workList: any[], sendRootData: any[], dataIdx: number) => {
    if (workList[dataIdx]) {
        let data = workList[dataIdx];

        let is_original =
            sendRootData.filter(raw => raw.wp_idx == data.wp_idx).length != 0 ? true : false;

        return (
            <S.TableTd style={{ justifyContent: "flex-start", textAlign: "center" }}>
                {/* 
					original_tm일 경우에만 no => wp_idx  
				*/}
                {sendRootData.length != 0 && !is_original ? (
                    <div style={{ fontWeight: 600, fontSize: "1em", color: "#333" }}>┖</div>
                ) : (
                    workList[dataIdx].wp_idx
                )}
            </S.TableTd>
        );
    } else return <S.TableTd />;
};

export const getExpiredDtEl = (workList: any[], dataIdx: number) => {
    if (workList[dataIdx] != undefined && workList[dataIdx].due_date != undefined) {
        const dueDate = workList[dataIdx].due_date;
        let isOver = dueDate > 0;
        return (
            <S.TableTd style={{ background: "#fff" }}>
                <S.TableDate $isOver={isOver}>
                    {isOver ? "잔여 " + dueDate + "일" : dueDate * -1 + "일 경과"}
                </S.TableDate>
            </S.TableTd>
        );
    } else {
        return <S.TableTd></S.TableTd>;
    }
};

export const getReviewEl = (
    workList: any[],
    dataIdx: number,
    onClickFuc: (idx: number) => void
) => {
    const data = workList[dataIdx];
    if (data != undefined) {
        return (
            <S.TableTd style={{ textAlign: "center", background: "#fff" }}>
                <S.TableCode onClick={() => onClickFuc(data.wp_idx)}>
                    {data.is_fin_count}
                </S.TableCode>
            </S.TableTd>
        );
    } else {
        return <S.TableTd></S.TableTd>;
    }
};

export const getApprovalBtn = (
    tdStyle: object | undefined,
    btnStyle: object | undefined,
    btnText: string,
    workType: boolean,
    onClickFuc: (...arg: any) => void,
    onClickParam: any | null
) => {
    // 하나의 엘리먼트로 묶어서 처리하고, onclick 함수를 처리해주는 gateway 함수를 따로 만들어서 처리할것.
    return (
        <S.TableTd style={tdStyle}>
            <S.ApprovalBtn
                style={btnStyle}
                $workType={workType}
                onClick={() => {
                    onClickFuc(...onClickParam);
                }}
            >
                {btnText}
            </S.ApprovalBtn>
        </S.TableTd>
    );
};
