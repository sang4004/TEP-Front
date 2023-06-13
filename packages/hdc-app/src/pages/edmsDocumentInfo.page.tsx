/******************************************************************************
 * hooks :
    * useLocations 
 * components : 
    * 
 * 

 ******************************************************************************/
import * as S from "../styled/edmsProject.styled";
import * as docS from "../styled/edmsDocument.styled";
import { useDispatch } from "react-redux"; // redux
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { EdmsDocumentFormModal, EdmsProjectBase } from "../components";
import { GridViewComponent } from "components";
//image
import editIcon from '../images/edms/edit.svg';
import listIcon from '../images/edms/list.svg';
import printIcon from '../images/edms/print.svg';
import delIcon from '../images/edms/trash-white.svg';

const tableHeadSize = [10, 30, 20, 20, 15, 15, 20, 20, 15, 20, 20, 20];
const tableHeader = ['순번', '문서번호', '리비젼', '문서명', '중요도', 'stage', '처리코드', '파일수', '상태', '제출예정일', '실제출일'];
const tableRow = [{
    id : 1,
    doc_id : "001",
    revision : "보령 LNG 탱크",
    doc_name : "설계도1",
    important : 5,
    stage : "DRN",
    code : "001-01",
    file : 20,
    status : '준비중',
    submitScheduleDt : '2021-06-21',
    submitDt : '2021-06-30' , 
}, 
{
    id : 2,
    doc_id : "002",
    revision : "보령 LNG 탱크",
    doc_name : "설계도2",
    important : 5,
    stage : "DRN",
    code : "001-01",
    file : 20,
    status : '준비중',
    submitScheduleDt : '2021-06-21',
    submitDt : '2021-06-30' , 
},
{
    id : 3,
    doc_id : "003",
    revision : "보령 LNG 탱크",
    doc_name : "설계도3",
    important : 5,
    stage : "DRN",
    code : "001-01",
    file : 20,
    status : '준비중',
    submitScheduleDt : '2021-06-21',
    submitDt : '2021-06-30' , 
},];
  
const EdmsDocumentInfoPage = (props : any)=> {
    const { user_id } = useParams<{user_id ?: string}>();
    const dispatch = useDispatch();
    const [projectTreeModalVisible, setProjectTreeModalVisible] = useState<boolean>(false);

    const onExpandChange = (e : any) => {
        e.item.opened = !e.item.opened;
    }

    const onClickAdd = ()=>{
        setProjectTreeModalVisible(true);
    }
    
    const onCloseModal = ()=>{
        setProjectTreeModalVisible(false);
    }

    return (
        <>
        <EdmsDocumentFormModal 
            visible={projectTreeModalVisible}
            onClose={onCloseModal}
            />
        <EdmsProjectBase style={{background: "linear-gradient(0, #F7F8F8 88%, #1A4A4A 88%)"}}>
            {/*Body*/}
            <docS.DocumentTopBtns style={{height : "6%"}}>
                <docS.DocumentFileAddBtn>파일등록</docS.DocumentFileAddBtn>
                <docS.DocumentToolBtns>
                    <docS.DocumentToolBtn><img src={listIcon}/>목록</docS.DocumentToolBtn>
                    <docS.DocumentToolBtn><img src={printIcon}/>출력</docS.DocumentToolBtn>
                    <docS.DocumentToolBtn><img src={editIcon}/>수정</docS.DocumentToolBtn>
                    <docS.DocumentToolBtn><img src={delIcon}/>삭제</docS.DocumentToolBtn>
                </docS.DocumentToolBtns>
            </docS.DocumentTopBtns>
            <S.ContentContainer style={{height : "82%", backgroundColor : "#F7F8F8"}}>
                <S.WorkListContainer>
                    <S.StructureTable>
                        <S.StructureTableHead>
                            <S.FolderTitle>
                                DIN TK-2021-001 상세 정보
                            </S.FolderTitle>
                        </S.StructureTableHead>

                        <S.WorkListTable>
                            <docS.DocumentInfoContainer>
                                <GridViewComponent
                                    titles={tableHeader} 
                                    keys={Object.keys(tableRow[0])} 
                                    values={Object.values(tableRow)} 
                                    keysWidth={tableHeadSize} 
                                    rowClass="background-sky-blue color-light-black"
                                    headerClass="background-color-dark-green color-white"
                                    />
                            </docS.DocumentInfoContainer>
                        </S.WorkListTable>

                    </S.StructureTable>  

                </S.WorkListContainer>

            </S.ContentContainer>
        </EdmsProjectBase>
        </>
    );
};

export default EdmsDocumentInfoPage;