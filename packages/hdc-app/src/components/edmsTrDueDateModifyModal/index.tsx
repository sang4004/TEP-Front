/******************************************************************************
 * projecttreemodal/index.tsx
 * hooks :
 * useLocations
 *
 ******************************************************************************/
// Library
import React, { useState, useEffect } from "react"; // default hooks
//image
import closeSvg from "../../images/edms/times-solid-white.svg";
//styled
import * as S from "./styled";
// Module
import { getMoment } from "../../common/utils";
import { useSelector, useDispatch } from "react-redux";
import { reducerState } from "../../common";
import { ModalInfo, LoadingIndicatorComponent } from "components";
import { WorkProcDetail, UpdateDueDate } from "../../common/action";

const moment = getMoment();

export type edmsTrDueDateModifyModalProps = {
    style?: object;
    visible: boolean;
    WorkProc: any;
    onClose: () => void;
};
interface FinaledmsTrDueDateModifyModalProps extends edmsTrDueDateModifyModalProps {}

export const EdmsTrDueDateModifyModal: React.FunctionComponent<
    FinaledmsTrDueDateModifyModalProps
> = props => {
    const dispatch = useDispatch();
    const workSelector = useSelector((state: reducerState) => state.work);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [endDate, setEndDate] = useState<Date>();
    const [wpIdx, setWpIdx] = useState<number>(-1);

    useEffect(() => {
        if (props.WorkProc) {
            setEndDate(props.WorkProc.due_date);
            setWpIdx(props.WorkProc.wp_idx);
        }
    }, [props.visible]);

    useEffect(() => {
        if (workSelector.update_due_date != undefined) {
            dispatch(WorkProcDetail(wpIdx, "TM"));
            if (workSelector.update_due_date) {
                setTimeout(() => {
                    setIsLoading(false);
                    ModalInfo("기한일자가 변경되었습니다.");
                    onClose();
                }, 1000);
            }
        }
    }, [workSelector.update_due_date]);

    const onClickSave = () => {
        setIsLoading(true);
        dispatch(UpdateDueDate(wpIdx, endDate));
    };

    const onClose = () => {
        props.onClose();
    };

    return (
        <S.Block open={props.visible ? true : false} onClose={props.onClose}>
            <S.Inner>
                <LoadingIndicatorComponent open={isLoading} style={{ zIndex: 1301 }} />
                <S.ModalHeader>
                    <S.HeaderTitle>TR기한날짜 변경</S.HeaderTitle>
                    <S.ModalCloseBtn onClick={onClose}>
                        <img src={closeSvg} />
                    </S.ModalCloseBtn>
                </S.ModalHeader>

                <S.ModalContentWrap>
                    <S.ModalInputBox>
                        <S.InputTitle>기한날짜</S.InputTitle>
                        <S.InputDate
                            value={moment(endDate).format("YYYY-MM-DD")}
                            onChange={e => setEndDate(moment(e.target.value).toDate())}
                            type="date"
                        />
                    </S.ModalInputBox>
                </S.ModalContentWrap>
                <S.ModalBtnContainer>
                    <S.CloseBtn onClick={onClose}>닫기</S.CloseBtn>
                    <S.SaveBtn onClick={onClickSave}>저장</S.SaveBtn>
                </S.ModalBtnContainer>
            </S.Inner>
        </S.Block>
    );
};
