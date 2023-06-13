/******************************************************************************
 * appwrapper/index.tsx
 * hooks :
    * useLocations 
    *
 ******************************************************************************/
// Library
import { useSelector, useDispatch } from "react-redux"; // redux
import { useState, useEffect, useContext, ChangeEvent, useRef } from "react"; // default hooks
//
// Module
import * as S from "./styled";
import Close from "@material-ui/icons/Close";
import arrowBtnHoverSvg from "../../images/btn/arrow_gray_hover.svg";
import { reducerState } from "../../common";
//
export type groupManageProps = {
    style?: object;
    children?: React.ReactNode;
    company : any;
    visible: boolean;
    onClose: () => void;
    onComplete: (list: object[], new_list: object[], comp : number) => void;
}

interface FinalgroupManageProps extends groupManageProps { };

export const GroupManageComp: React.FunctionComponent<FinalgroupManageProps> = (props) => {
    const dispatch = useDispatch();                                                                                                                                                                                            
    const userSelector = useSelector((state: reducerState) => state.user);
    const orgSelector = useSelector((state: reducerState) => state.organization);
    const dsSelector = useSelector((state: reducerState) => state.digitalsign);

    const [approvalList, setApprovalList] = useState<any[]>([]);
    const [newGroupList, setNewGroupList] = useState<any[]>([]);

    const [selectedCompany, setSelectedCompany] = useState<number>(0);

    useEffect(() => {
        if(props.company){
            let company = props.company;
            setSelectedCompany(company.id);
        }
    }, [props.company, props.visible]);

    useEffect(() => {
        if(orgSelector.group_list){
            let _list = orgSelector.group_list.filter((obj : any)=>obj.is_delete == 0);
            if(selectedCompany)
                setApprovalList([..._list.filter((obj : any)=>obj.group_id == selectedCompany)]);
            else setApprovalList([..._list]);
        }
    }, [orgSelector.group_list, selectedCompany]);

    const onClickConfirm = async () => {
        props.onComplete([...approvalList.reverse()], [...newGroupList], selectedCompany);
        approvalList.reverse();
        props.onClose();
    }

    const onClose = () => {
        props.onClose();
    }

    const addRow = () => {
        let id = -1 - newGroupList.length;
        approvalList.push({id : id, name : "", is_head : 0});
        newGroupList.push({id : id, name : "", is_head : 0});
        setApprovalList([...approvalList]);
        setNewGroupList([...newGroupList]);
    }

    const deleteRow = (idx : number) => {
        let id = approvalList[idx].id;
        approvalList.splice(idx, 1);
        newGroupList.filter((obj : any)=>obj.id != id);
        setApprovalList([...approvalList]);
        setNewGroupList([...newGroupList]);
    }

    const onChangeGroup = (e : ChangeEvent<any>, idx : number) => {
        let value = {name : e.target.value};
        approvalList[idx] = Object.assign(approvalList[idx], value);
        let filtered = newGroupList.filter((obj:any)=>obj.id==approvalList[idx].id);
        if(filtered.length > 0)
            filtered[0] = Object.assign(filtered[0], value);
        setApprovalList([...approvalList]);
        setNewGroupList([...newGroupList]);
    }

    const onChangeOrder = (idx : number, stat : number) =>{
        let no = idx + stat;
        if(no > -1 && no < approvalList.length){
            if(stat > 0){
                approvalList.splice(idx, 2, approvalList[no], approvalList[idx]);
            }
            else{
                approvalList.splice(idx -1, 2, approvalList[idx], approvalList[no]);
            }
        }
        setApprovalList([...approvalList]);
    }

    const onChangeDrop = (e : ChangeEvent<any>) => {
        setSelectedCompany(e.target.value);
    }

    const onChangeCheck = (e : ChangeEvent<any>, idx : number) => {
        let checked = e.target.checked;
        let value;
        if(checked)
            value = {is_head : 1};
        else
            value = {is_head : 0};
        approvalList[idx] = Object.assign(approvalList[idx], value);
        let filtered = newGroupList.filter((obj:any)=>obj.id==approvalList[idx].id);
        if(filtered.length > 0)
            filtered[0] = Object.assign(filtered[0], value);
        setApprovalList([...approvalList]);
        setNewGroupList([...newGroupList]);
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
                    <S.NewGroupName
                        type={"text"}
                        value={raw.name}
                        InputProps={{
                            disableUnderline : true
                        }}
                        inputProps={{
                            style : {textAlign : "center"}
                        }}
                        onChange={(e)=>onChangeGroup(e, index)}
                    />
                </S.TableCell>
                {selectedCompany == 4 && <S.TableCell $width={10}>
                        <S.Check onChange={(e)=>onChangeCheck(e, index)} checked={raw.is_head}/>
                </S.TableCell>}
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
                <S.Title>부서 수정하기</S.Title>
                    <S.InfoSelect
                        disableUnderline
                        value={selectedCompany}
                        onChange={(e) => onChangeDrop(e)}>
                        <S.InfoOption value={-1}>선택해주세요..</S.InfoOption>
                        {orgSelector.company_list.map((raw: any, idx: number) => {
                            return (
                                <S.InfoOption key={idx} value={raw.id}>{raw.company}</S.InfoOption>
                            );
                        })}
                    </S.InfoSelect>
                <S.CloseBtn onClick={onClose}>
                    <Close fontSize="large"/>
                </S.CloseBtn>
                <S.Content>
                    <S.DetailBlock>
                        <S.SubTitle>
                            <S.TableCell $width={20}>순서</S.TableCell>
                            <S.TableCell $width={60}>부서명</S.TableCell>
                            {selectedCompany == 4 && <S.TableCell $width={10}>현장대리인</S.TableCell>}
                            <S.TableCell $width={20}>삭제</S.TableCell>
                        </S.SubTitle>
                        <S.Seperator><hr /></S.Seperator>
                        <S.InfoContainer>
                            {approvalList.map((raw,idx)=>(
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