/******************************************************************************
 * Copyright (c) 2021. Moornmo Inc. Rights reserved.                          *
 * Data modelings and methods used are assets of Moornmo Inc.                 *
 * appwrapper/index.tsx
 * hooks :
    * useLocations 
    *
 * last modify : jh.jeong@ilts.co.kr
 ******************************************************************************/
// Library
import { useSelector, useDispatch } from "react-redux"; // redux
import { useState, useEffect, useContext, ChangeEvent, useRef } from "react"; // default hooks
//
// Module
import { useHover } from "hooks";
import * as S from "./styled";
import closeSvg from "../../images/fontawsomeicon/close-icon.svg";
import arrowBtnHoverSvg from "../../images/btn/arrow_gray_hover.svg";
import { reducerState } from "../../common";
import Draggable from "react-draggable";
//
export type PositionManageProps = {
    style?: object;
    children?: React.ReactNode;
    visible: boolean;
    onClose: () => void;
    onComplete: (list: object[], new_list: object[]) => void;
}

interface FinalPositionManageProps extends PositionManageProps { };

export const PositionManageComp: React.FunctionComponent<FinalPositionManageProps> = (props) => {
    const dispatch = useDispatch();
    const userSelector = useSelector((state: reducerState) => state.user);
    const orgSelector = useSelector((state: reducerState) => state.organization);
    const dsSelector = useSelector((state: reducerState) => state.digitalsign);

    const [approvalList, setApprovalList] = useState<any[]>([]);
    const [newPosList, setNewPosList] = useState<any[]>([]);

    useEffect(() => {
        if (userSelector.position_list) {
            let _list = userSelector.position_list;
            setApprovalList([..._list]);
        }
    }, [userSelector.position_list]);

    const onClickConfirm = async () => {
        props.onComplete([...approvalList.reverse()], [...newPosList]);
        approvalList.reverse();
        props.onClose();
    }

    const onClose = () => {
        props.onClose();
    }

    const addRow = () => {
        let id = -1 - newPosList.length;
        approvalList.push({ id: id, name: ""});
        newPosList.push({ id: id, name: ""});
        setApprovalList([...approvalList]);
        setNewPosList([...newPosList]);
    }

    const deleteRow = (idx: number) => {
        let id = approvalList[idx].id;
        approvalList.splice(idx, 1);
        newPosList.filter((obj: any) => obj.id != id);
        setApprovalList([...approvalList]);
        setNewPosList([...newPosList]);
    }

    const onChangePosition = (e: ChangeEvent<any>, idx: number) => {
        let value = { name: e.target.value };
        approvalList[idx] = Object.assign(approvalList[idx], value);
        let filtered = newPosList.filter((obj: any) => obj.id == approvalList[idx].id);
        if (filtered.length > 0)
            filtered[0] = Object.assign(filtered[0], value);
        setApprovalList([...approvalList]);
        setNewPosList([...newPosList]);
    }

    const onChangeOrder = (idx: number, stat: number) => {
        let no = idx + stat;
        if (no > -1 && no < approvalList.length) {
            if (stat > 0) {
                approvalList.splice(idx, 2, approvalList[no], approvalList[idx]);
            }
            else {
                approvalList.splice(idx - 1, 2, approvalList[idx], approvalList[no]);
            }
        }
        setApprovalList([...approvalList]);
    }

    const getLineRows = (raw: any, index: number) => {
        return (
            <S.BodyDetail key={index}>
                <S.TableCell $width={20}>
                    <S.SignNumberDiv>
                        <S.SignNumberMoveBtn src={arrowBtnHoverSvg} onClick={() => onChangeOrder(index, -1)} />
                        <S.SignNumberMoveBtn $dir src={arrowBtnHoverSvg} onClick={() => onChangeOrder(index, 1)} />
                    </S.SignNumberDiv>
                </S.TableCell>
                <S.TableCell $width={60}>
                    <S.NewPositionName
                        type={"text"}
                        value={raw.name}
                        InputProps={{
                            disableUnderline: true
                        }}
                        inputProps={{
                            style: { textAlign: "center" }
                        }}
                        onChange={(e) => onChangePosition(e, index)}
                    />
                </S.TableCell>
                <S.TableCell $width={20}>
                    <S.close onClick={() => deleteRow(index)}>삭제</S.close>
                </S.TableCell>
            </S.BodyDetail>
        );
    }

    return (
        <S.Block
            open={props.visible ? true : false}
            onClose={props.onClose}
        >
            <S.Inner>
                <S.Title>직급 수정하기</S.Title>
                <S.CloseBtn onClick={onClose}>
                    <img src={closeSvg} />
                </S.CloseBtn>
                <S.Content>
                    <S.DetailBlock>
                        <S.SubTitle>
                            <S.TableCell $width={20}>순서</S.TableCell>
                            <S.TableCell $width={60}>직급명</S.TableCell>
                            <S.TableCell $width={20}>삭제</S.TableCell>
                        </S.SubTitle>
                        <S.Seperator><hr /></S.Seperator>
                        <S.InfoContainer>
                            {approvalList.map((raw, idx) => (
                                getLineRows(raw, idx)
                            ))}
                        </S.InfoContainer>
                        <S.EndContainer>
                            <S.Btn onClick={addRow}>추가하기</S.Btn>
                            <S.Btn onClick={onClickConfirm}>확인</S.Btn>
                        </S.EndContainer>
                    </S.DetailBlock>
                </S.Content>
            </S.Inner>
        </S.Block>
    );
}