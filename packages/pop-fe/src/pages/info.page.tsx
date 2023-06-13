/******************************************************************************
 * hooks :
    * useLocations 
 * components : 
    * 
 ******************************************************************************/
//Library
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Typography, TextField } from "@material-ui/core";
import Button from '@material-ui/core/Button';
//
//Module
import { 
    TableComponent, 
    ModalBasic,
    DropdownComponent
} from "components";
import { 
    GetEmployee,
    CreateEmployee,
    UpdateEmployee,
    DeleteEmployee,
    employee_db,
} from "common_module";
import { reducerState } from "../common";
import { useInput } from "hooks";
import { getConstants, table2data } from "utils_ts/lib";
import { getcheckfromid } from "utils_js/lib";
//
export const InfoPage = ()=> {
    const userSelector = useSelector((state:reducerState)=>state.user);
    const empSelector = useSelector((state:reducerState)=>state.employee);
    const dispatch = useDispatch();
    const history = useHistory();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [empList, setEmpList] = useState<employee_db[]>([]);
    const [isEditTable, setIsEditTable] = useState<boolean>(false);
    //modal value
    const [onCreateModal, setOnCreateModal] = useState<boolean>(false);
    const nameInput = useInput("text", "이름", "ex 정주호");
    const emailInput = useInput("email", "이메일", "ex jh.jeong@ilts.co.kr");
    const [roleVal, setRoleVal] = useState<string>("");
    //
    useEffect(()=>{
        if(userSelector.id != null)
            dispatch(GetEmployee());
    }, []);

    useEffect(()=>{
        if(empSelector.list && empSelector.list.length > 0){
            setEmpList(empSelector.list);

        }
    }, [empSelector.list]);

    useEffect(()=>{
        if(empSelector.newEmployee){
            dispatch(GetEmployee()) 
        }
    }, [empSelector.newEmployee]);

    useEffect(()=>{
        if(empSelector.editEmployee){
            dispatch(GetEmployee());
        }
    }, [empSelector.editEmployee]);

    useEffect(()=>{
        if(empSelector.deleteEmployee){
            dispatch(GetEmployee());
        }
    }, [empSelector.deleteEmployee]);

    const onModal = ()=>{
        setOnCreateModal(true);
    }

    const onClickCancel = ()=>{
        setOnCreateModal(false);
    }

    const onClickCreateEmp = async () =>{
        setIsLoading(true);
        await dispatch(CreateEmployee(nameInput.value, emailInput.value, roleVal));
        setOnCreateModal(false);
        setIsLoading(false);
    }

    const onClickEdit = async ()=>{
        if(isEditTable){
            let res = table2data(document, Object.keys(empList[0]), empList, "EDIT");
            await dispatch(UpdateEmployee(res))
        }
        setIsEditTable(!isEditTable)
    }

    const onClickDelete = async ()=>{
        if(isEditTable){
            var ids = [];
            for(var i=0;i<empList.length;i++){
                let checked = getcheckfromid( document , "checked" + i.toString());
                if(checked)
                    ids.push(empList[i].id);
            }
            await dispatch(DeleteEmployee(ids));
        }
    }

    return (
        <InfoBlock className="main-page__container">
            <ModalBasic 
                isModalVisible={onCreateModal}
                title="사원 추가"
                onCancel={onClickCancel}
                onOk={onClickCreateEmp}
                >
                <ModalContentBlock>
                    {nameInput.inputEl}
                    {emailInput.inputEl}
                    <DropdownComponent 
                        default="직위" 
                        data={getConstants("EMPLOYEE_ROLE")}
                        onChange={(val)=>setRoleVal(val)}
                        />
                </ModalContentBlock>
            </ModalBasic>
            <Typography variant="subtitle1">
            사원 관리
            </Typography>
            <TableBlock>
                <BtnGroup>
                    <BtnStyle variant="contained" color="default" onClick={onModal}>추가</BtnStyle>
                    <BtnStyle variant="contained" color={isEditTable? "primary" : "secondary"} onClick={onClickEdit}>{isEditTable? "완료" : "수정"}</BtnStyle>
                    {isEditTable ? <BtnStyle  variant="contained" color={"secondary"} onClick={onClickDelete}>삭제</BtnStyle> : null}
                </BtnGroup>
                { empList.length > 0 && <TableComponent isEdit={isEditTable} data={empList} /> }
            </TableBlock>
        </InfoBlock>
    );
};

const InfoBlock = styled.div`
    width : 100%;
    height : 100%;
    display : flex;
    justify-content : flex-start;
    align-items : center;
    flex-direction : column;
    padding : 2em 0;
    gap : 2em;
`;

const TableBlock = styled.div`
    width : 100%;
    flex : 1;
    overflow-y : auto;
    display : flex;
    flex-direction : column;
`;

const BtnGroup = styled.div`
    width : 100%;
    display : flex;
    flex-direction : row;
`;

const BtnStyle = styled(Button)`
    max-width : 100px;
    margin : 0 0 1em 1em;
`;

const ModalContentBlock = styled.div`
    display : flex;
    justify-content : center;
    align-items : center;
    flex-direction : column;
    gap : 1em;
    height : 100%;
`;