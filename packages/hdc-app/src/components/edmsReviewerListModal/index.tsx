/******************************************************************************
 * projecttreemodal/index.tsx
 * hooks :
 * useLocations
 *
 ******************************************************************************/
// Library
import React, { useState, useEffect } from "react"; // default hooks
import { useSelector, useDispatch } from "react-redux";
import { reducerState } from "../../common";
//image
import closeSvg from "../../images/edms/times-solid-white.svg";
//styled
import * as S from "./styled";
// Module
import { GridViewComponent } from "components";
import { ConfirmCompleteReview, GetWorkAssignUserList } from "../../common/action";

export type EdmsReviewerListModalProps = {
    style?: object;
    visible: boolean;
    onClose: () => void;
    isAdmin: boolean;
    wpIdx: number;
};
interface FinalEdmsReviewerListModalProps extends EdmsReviewerListModalProps {}

const tableHeadSize = [1, 1, 1];
const tableHeadType = [1, 1, 1];
const tableHeader = ["이름", "직급", "상태"];
const tableHeadSizeAdmin = [1, 1, 1, 1];
const tableHeadTypeAdmin = [1, 1, 1, 1];
const tableHeaderAdmin = ["이름", "직급", "상태", "강제완료"];

export const EdmsReviewerListModal: React.FunctionComponent<
    FinalEdmsReviewerListModalProps
> = props => {
    const dispatch = useDispatch();
    const workSelector = useSelector((state: reducerState) => state.work);

    const [assignUserList, setAssignUserList] = useState<any[]>([]);
    const [assignUserListKey, setAssignUserListKey] = useState<any[]>([]);
    const [headerVal, setHeaderVal] = useState<string[]>([]);
    const [headerSizeVal, setHeaderSizeVal] = useState<number[]>([]);
    const [headerTypeVal, setHeaderTypeVal] = useState<number[]>([]);

    useEffect(() => {
        if (workSelector.work_assign_user_list.length > 0) {
            let list = [];
            for (var assign of workSelector.work_assign_user_list) {
                list.push({
                    username: assign.username,
                    position : assign.position,
                    is_fin: assign.is_fin == 0 ? "미완료" : "완료",
                    fin_btn: true,
                });
            }
            setHeaderVal(props.isAdmin == false ? tableHeader : tableHeaderAdmin);
            setHeaderSizeVal(props.isAdmin == false ? tableHeadSize : tableHeadSizeAdmin);
            setHeaderTypeVal(props.isAdmin == false ? tableHeadType : tableHeadTypeAdmin);
            setAssignUserList([...list]);
            setAssignUserListKey([...Object.keys(list[0])]);
        }
    }, [workSelector.work_assign_user_list]);

    const onClose = () => {
        props.onClose();
    };

    const getCustomEl = (idx: number, dataIdx?: number) => {
        if (idx == 3) {
            if (dataIdx == undefined) return true;
            return (
                <S.TableTd>
                    {workSelector.work_assign_user_list[dataIdx].is_fin == 0 ? (
                        <S.FinBtn onClick={() => onClickConfirmReview(dataIdx)}>완료하기</S.FinBtn>
                    ) : (
                        ""
                    )}
                </S.TableTd>
            );
        }
        return null;
    };

    const onClickConfirmReview = async (idx: number) => {
        let isConfirm = confirm("완료하시겠습니까?");
        if (isConfirm) {
            await dispatch(
                ConfirmCompleteReview(props.wpIdx, workSelector.work_assign_user_list[idx].user_id)
            );
            await dispatch(GetWorkAssignUserList(props.wpIdx));
        }
    };

    return (
        <S.Block open={props.visible ? true : false} onClose={onClose}>
            <S.Inner>
                <S.ModalHeader>
                    <S.HeaderTitle>검토 현황</S.HeaderTitle>
                    <S.ModalCloseBtn onClick={onClose}>
                        <img src={closeSvg} />
                    </S.ModalCloseBtn>
                </S.ModalHeader>

                <S.Container>
                    <S.ModalContentWrap>
                        <S.GridViewWrap>
                            <GridViewComponent
                                fullData={assignUserList}
                                keys={assignUserListKey}
                                values={assignUserList}
                                titles={headerVal}
                                keysWidth={headerSizeVal}
                                keysWidthTotal={15}
                                datatype={headerTypeVal}
                                rowClass="background-color-white"
                                headerClass="background-dark-sky-blue color-white align-center"
                                getCustomEl={getCustomEl}
                            />
                        </S.GridViewWrap>
                    </S.ModalContentWrap>
                    <S.ModalBtnContainer>
                        <S.CloseBtn onClick={onClose}>닫기</S.CloseBtn>
                    </S.ModalBtnContainer>
                </S.Container>
            </S.Inner>
        </S.Block>
    );
};
