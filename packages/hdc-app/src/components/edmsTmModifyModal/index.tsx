/******************************************************************************
 * projecttreemodal/index.tsx
 * hooks :
 * useLocations
 *
 ******************************************************************************/
// React
import React, { useState, useEffect } from "react"; // default hooks
import { useDispatch, useSelector } from "react-redux";
import { useLocations } from "hooks";
//
import NewWindow from "react-new-window";
import { reducerState } from "../../common/store";
import { LoadingIndicatorComponent, GridViewComponent, ModalInfo } from "components";
//
import * as S from "./styled";
import Close from "@material-ui/icons/Close";
import { domain } from "../../common/network";

import { getMoment } from "../../common/utils";
import { GetEdmsAddress, UpdateTrData, GetTmCode } from "../../common/action";
import {
    EdmsTmFileSelectModal,
    EdmsTmpDocumentApprovalInfo,
    EdmsRefereceModal,
    EdmsTmEmailSendModal,
} from "..";
import { TmReviewUploadModalComp } from "../workcomponents";

const moment = getMoment();

export type edmsTmModifyModalProps = {
    style?: object;
    visible: boolean;
    onClose: () => void;
    wp_idx: number;
    type: number; //0: 수정, 1: 뷰어
};
interface FinaledmsTmModifyModalProps extends edmsTmModifyModalProps {}

const tableHeadSize = [0.3, 0.3, 0.1, 0.3, 0.6];
const tableHeadType = [1, 1, 1, 1, 0];
const tableHeader = ["문서코드", "문서제목", "리비전", "파일코드", "파일제목"];

export const EdmsTmModifyModal: React.FunctionComponent<FinaledmsTmModifyModalProps> = props => {
    const dispatch = useDispatch();

    const userSelector = useSelector((state: reducerState) => state.user);
    const fileSelector = useSelector((state: reducerState) => state.files);
    const workSelector = useSelector((state: reducerState) => state.work);
    const projectSelector = useSelector((state: reducerState) => state.project);
    const settingSelector = useSelector((state: reducerState) => state.projectsettings);
    const tmSelector = useSelector((state: reducerState) => state.tm);

    const { pushHistory } = useLocations();

    const [workList, setWorkList] = useState<any[]>([]);
    const [docuList, setDocuList] = useState<any[]>([]);
    const [gridList, setGridList] = useState<any[]>([]);
    const [companyList, setCompanyList] = useState<any[]>([]);
    const [gridListKeys, setGridListKeys] = useState<any[]>([]);
    const [emailList, setEmailList] = useState<any[]>([]);
    const [emailIdList, setEmailIdList] = useState<any[]>([]);
    const [approverList, setApproverList] = useState<any[]>([]);
    const [authDataList, setAuthDataList] = useState<any[]>([]);
    const [approverIdList, setApproverIdList] = useState<any[]>([]);
    const [selectedList, setSelectedLIst] = useState<any[]>([]);
    const [projectTypeList, setProjectTypeList] = useState<any[]>([]);
    const [stageList, setStageList] = useState<any[]>([]);

    const [tmNo, setTmNo] = useState<string>("");
    const [tmSubject, setTmSubject] = useState<string>("");
    const [sendCompany, setSendCompany] = useState<string>("");
    const [receiveCompany, setReceiveCompany] = useState<string>("수신처 선택");
    const [referenceCompanyList, setReferenceCompanyList] = useState<any[]>([]);
    const [referenceIdList, setReferenceIdList] = useState<number[]>([]);
    const [projectTypeNo, setProjectTypeNo] = useState<number>(-1);
    const [stageTypeId, setStageTypeId] = useState<number>(-1);
    const [projectTypeName, setProjectTypeName] = useState<string>("");
    const [stageTypeName, setStageTypeName] = useState<string>("");

    const [endDate, setEndDate] = useState<Date>(new Date());
    const [explan, setExplan] = useState<string>("");
    const [startDate, setStartDate] = useState<Date>(new Date());

    const [files, setFiles] = useState<any[]>([]);
    const [fileList, setFileList] = useState<any[]>([]);
    const [filesType, setFilesType] = useState<any[]>([]);
    const [fileUpload, setFileUpload] = useState<HTMLInputElement | null>(null);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isInputData, setIsInputData] = useState<boolean>(false);
    const [isFileSelect, setIsFileSelect] = useState<boolean>(false);
    const [isFilesUpload, setIsFilesUpload] = useState<boolean>(false);
    const [fileSelectModalVisible, setFileSelectModalVisible] = useState<boolean>(false);
    const [TmpApprovalInfoVisible, setTmpApprovalInfoVisible] = useState<boolean>(false);
    const [referenceVisible, setReferenceVisible] = useState<boolean>(false);
    const [TmEmailSendVisible, setTmEmailSendVisible] = useState<boolean>(false);

    // excel file upload datas
    const [reviewUpModalVisible, setReviewUpModalVisible] = useState<boolean>(false);
    const [exFileList, setExFileList] = useState<any[]>([]);
    const [exFileName, setExFileName] = useState<string>("(선택)엑셀파일을 올려주세요.");
    //modify
    const [trApproverId, setTrApproverId] = useState<number>(-1);
    const [userList, setUserList] = useState<any[]>([]);

    useEffect(() => {
        let companyName = userSelector.groupname ? userSelector.groupname.split(" ")[0] : "";
        setSendCompany(companyName);

        if (projectSelector.edms_user_list.length > 0) {
            dispatch(GetEdmsAddress());
        }
    }, [props.visible]);

    // tr proc 정보
    useEffect(() => {
        if (workSelector.tr_proc_data != undefined) {
            setEndDate(workSelector.tr_proc_data.due_date);
            setStartDate(workSelector.tr_proc_data.wp_date);
            setTmSubject(workSelector.tr_proc_data.subject);
            setExplan(workSelector.tr_proc_data.explan);
            setTrApproverId(workSelector.tr_proc_data.approver_id);
            setProjectTypeNo(workSelector.tr_proc_data.project_no);
            setStageTypeId(workSelector.tr_proc_data.stage_type_id);
        }
    }, [workSelector.tr_proc_data]);

    useEffect(() => {
        if (projectSelector.edms_user_list) setUserList(projectSelector.edms_user_list);
    }, [projectSelector.edms_user_list]);

    //스테이지
    useEffect(() => {
        if (settingSelector.stage_type_list) {
            setStageList(settingSelector.stage_type_list);
            if (props.type == 1 && stageTypeId) {
                let stage = settingSelector.stage_type_list.find(
                    (raw: any) => raw.id == stageTypeId
                );
                if (stage) setStageTypeName(stage.stage_name);
            }
        }
    }, [settingSelector.stage_type_list, stageTypeId]);

    //프로젝트
    useEffect(() => {
        if (settingSelector.project_list) {
            setProjectTypeList(settingSelector.project_list);
            if (props.type == 1 && projectTypeNo) {
                let project = settingSelector.project_list.find(
                    (raw: any) => raw.project_no == projectTypeNo
                );
                if (project) setProjectTypeName(project.project_name);
            }
        }
    }, [settingSelector.project_list, projectTypeNo]);

    // 수신처 찾기
    useEffect(() => {
        if (trApproverId != -1) {
            let approval_user = userList.find(raw => raw.user_id == trApproverId);
            let receive_comapny = companyList.find(raw => raw.id == approval_user.company_id);
            if (receive_comapny) setReceiveCompany(receive_comapny.name);
        }
    }, [trApproverId]);

    //tr.no, 참조처
    useEffect(() => {
        if (workSelector.work_tr_data != undefined) {
            setTmNo(workSelector.work_tr_data.tm_code);
            let cc_company_id = workSelector.work_tr_data.cc_company_id;

            if (cc_company_id != -1) {
                let _list: any[] = [];
                let company = companyList.find(raw => raw.id == cc_company_id);

                if (company != undefined) {
                    _list.push(company);
                    setReferenceCompanyList(_list);
                    setReferenceIdList(company.id);
                }
            }
        }
    }, [workSelector.work_tr_data]);

    //선택 파일
    useEffect(() => {
        if (workSelector.tr_docu_list.length > 0) {
            setWorkList(workSelector.tr_docu_list);
        }
    }, [workSelector.tr_docu_list]);

    //첨부파일
    useEffect(() => {
        if (workSelector.tm_attach_list.length > 0) {
            setFiles(workSelector.tm_attach_list);
        }
    }, [workSelector.tm_attach_list]);

    // 메일 수신자
    useEffect(() => {
        if (workSelector.mail_user_list.length > 0) {
            let id_list: any[] = [];
            for (var mail of workSelector.mail_user_list) {
                id_list.push({
                    id: mail.id,
                });
            }
            setEmailList(workSelector.mail_user_list);
            setEmailIdList(id_list);
        } else {
            setEmailIdList([-1]);
        }
    }, [workSelector.mail_user_list]);

    //결자재
    useEffect(() => {
        if (workSelector.tr_assign_list.length > 0) {
            let id_list: any[] = [];
            for (var approval of workSelector.tr_assign_list) {
                id_list.push({
                    id: approval.id,
                });
            }
            setApproverList(workSelector.tr_assign_list);
            setApproverIdList(id_list);
        }
    }, [workSelector.tr_assign_list]);

    useEffect(() => {
        if (projectSelector.filtered_company_list.length != 0) {
            let list: any[] = [];

            for (let company of projectSelector.filtered_company_list) {
                list.push({
                    id: company.id,
                    name: company.company_name,
                });
            }

            setCompanyList(list);
        }
    }, [projectSelector.filtered_company_list]);

    useEffect(() => {
        if (selectedList.length > 0) makeSelectList(selectedList);
    }, [selectedList]);

    // Mydocument에서 파일 미선택 TM 진행 -> 파일 선택
    useEffect(() => {
        if (workList && workList.length > 0) {
            let list: any[] = [];
            let flist: any[] = [];
            let dlist: any[] = [];

            for (var work of workList) {
                list.push({
                    docu_code: work.docu_code,
                    docu: work.docu_subject,
                    revision: work.revision,
                    file_code: work.file_code,
                    file_name: work.file_name,
                });
                flist.push(work.file_no);
                dlist.push(work.docu_no);
            }

            setIsFileSelect(true);
            setGridList([...list]);
            setFileList(flist);
            setDocuList(dlist);
            setGridListKeys([...Object.keys(list[0])]);
        }
    }, [workList]);

    useEffect(() => {
        if (files.length != 0) setIsFilesUpload(true);
        else setIsFilesUpload(false);
    }, [files]);

    useEffect(() => {
        if (isFileSelect || isFilesUpload) setIsInputData(true);
        else if (!isFileSelect || !isFilesUpload) setIsInputData(false);
    }, [isFileSelect, isFilesUpload]);

    useEffect(() => {
        if (workSelector.update_tr != false) {
            setTimeout(() => {
                setIsLoading(false);
                pushHistory(`/edms/workproc/tm`);
                ModalInfo("수정이 완료되었습니다.");
                onClose();
            }, 1000);
        }
    }, [workSelector.update_tr]);

    // TR.No 변경 api
    useEffect(() => {
        if (workSelector.tr_proc_data && props.type != 1) {
            if (fileList.length > 0) {
                dispatch(GetTmCode(false, receiveCompany, fileList[0]));
            } else if (projectTypeNo != -1 && stageTypeId != -1) {
                let stage_type = stageList.find(raw => raw.id == stageTypeId);
                dispatch(
                    GetTmCode(
                        false,
                        receiveCompany,
                        undefined,
                        projectTypeNo,
                        stage_type != undefined ? stage_type.stage_name : ""
                    )
                );
            }
        }
    }, [fileList, projectTypeNo, stageTypeId]);

    // TR.No 변경
    useEffect(() => {
        if (tmSelector.tm_code && tmSelector.tm_code != true) {
            setTmNo(tmSelector.tm_code);
        }
    }, [tmSelector.tm_code]);

    useEffect(() => {
        if (tmSelector.tm_project_no) setProjectTypeNo(tmSelector.tm_project_no);
    }, [tmSelector.tm_project_no]);

    useEffect(() => {
        if (tmSelector.tm_stage_type) {
            let stage = stageList.find(raw => raw.stage_name == tmSelector.tm_stage_type);
            if (stage) setStageTypeId(stage.id);
            else setStageTypeId(-1);
        }
    }, [tmSelector.tm_stage_type]);

    const makeSelectList = (data: any[]) => {
        let _list: any[] = [];
        let flist: any[] = [];
        let dlist: any[] = [];

        if (data.length > 0) {
            data.map((val: number) => {
                let _data: any = fileSelector.native_file_list.find(
                    (raw: any) => raw.docu_no == val
                );
                if (_data) {
                    _list.push(_data);
                    flist.push(_data.file_no);
                    dlist.push(_data.docu_no);
                }
            });
        }

        setFileList(flist);
        setDocuList(dlist);
        setWorkList([..._list]);
    };

    const onClose = () => {
        props.onClose();
    };

    // 수정
    const onClickModify = async () => {
        if (tmSubject == "") return ModalInfo("제목을 입력해 주세요.");
        // else if (gridList.length == 0) return ModalInfo("파일을 선택해 주세요.");
        else if (endDate == undefined) return ModalInfo("기한일자를 지정해주세요.");
        else if (approverIdList.length == 0) return ModalInfo("결재자를 선택해 주세요.");
        else if (receiveCompany === "수신처 선택") return ModalInfo("수신처를 선택해 주세요.");

        setIsLoading(true);
        dispatch(
            UpdateTrData(
                props.wp_idx,
                moment(startDate).format("YYYY-MM-DD"),
                moment(endDate).format("YYYY-MM-DD"),
                tmSubject,
                explan.replace(/(?:<p>|<\/p>)/gi, ""),
                referenceIdList[0] != undefined ? referenceIdList[0] : null,
                emailIdList,
                docuList,
                fileList,
                files,
                tmNo,
                stageTypeId,
                projectTypeNo
            )
        );
    };

    // 파일 업로드 및 삭제
    const onClickUploadFlie = () => {
        if (fileUpload) fileUpload.click();
    };

    const onClickFilesUpload = (event: any) => {
        var _files = event.target.files;

        for (var f of _files) {
            if (files.filter(obj => obj.name == f.name).length == 0) files.push(f);
            filesType.push(f.type);
        }

        setFiles([...files]);
        setFilesType([...filesType]);
    };

    const onClickDeleteFile = (idx: number) => {
        if (files.length > idx && files[idx]) {
            files.splice(idx, 1);
            setFiles([...files]);
        }
    };
    //

    const onCompleteApproverList = (list: any) => {
        let idList: any[] = [];

        for (let id of list) {
            idList.push(id.id);
        }

        setApproverIdList(idList);
        setApproverList(list);
    };

    const onCompleteEmailList = (list: any) => {
        let idList: any[] = [];

        for (let l of list) {
            idList.push(l.id);
        }

        setEmailList(list);
        setEmailIdList(idList);
    };

    const onCompletReferenceList = (list: number[]) => {
        let _list: any[] = [];

        for (var id of list) {
            let find = companyList.find(raw => raw.id == id);
            _list.push(find);
        }

        setReferenceIdList(list);
        setReferenceCompanyList(_list);
    };

    const commpanyDelete = (idx: number) => {
        referenceCompanyList.splice(idx, 1);
        setReferenceCompanyList([...referenceCompanyList]);
        setReferenceIdList([-1]);
    };

    const emailSendDelete = (idx: number) => {
        emailList.splice(idx, 1);
        emailIdList.splice(idx, 1);
        setEmailList([...emailList]);
        setEmailIdList([...emailIdList]);
    };

    // 파일 선택
    const onClickFileSelectModal = () => {
        setFileSelectModalVisible(true);
    };

    const onCloseFileSelectModal = () => {
        setFileSelectModalVisible(false);
    };
    //
    // 엑셀파일 업로드
    const onClickExcelFileSelect = () => {
        setReviewUpModalVisible(true);
    };

    const onCloseReviewModal = () => {
        setReviewUpModalVisible(false);
    };
    //

    const onClickReferenceModal = () => {
        setReferenceVisible(true);
    };

    if (props.visible)
        return (
            <NewWindow
                title="TR 업무절차"
                onUnload={props.onClose}
                features={{ width: 860, height: 1080 }}
            >
                <S.Block>
                    <S.Inner>
                        <style>
                            {` 
                        .k-grid table {
                            width : 100% !important;
                            margin : 0 -2px;
                        }
                        .k-grid-container ::-webkit-scrollbar-thumb{
                            background-color: transparent !important;
                        }
                        
                        .k-grid-container ::-webkit-scrollbar{
                            background-color: transparent !important;
                        }
                    `}
                        </style>
                        <EdmsTmFileSelectModal
                            visible={fileSelectModalVisible}
                            onClose={onCloseFileSelectModal}
                            authDataList={authDataList}
                            setWorkList={setSelectedLIst}
                        />
                        <EdmsTmpDocumentApprovalInfo
                            visible={TmpApprovalInfoVisible}
                            onClose={() => setTmpApprovalInfoVisible(false)}
                            onComplete={onCompleteApproverList}
                            approverList={approverList}
                        />
                        <EdmsRefereceModal
                            visible={referenceVisible}
                            onClose={() => setReferenceVisible(false)}
                            companyList={onCompletReferenceList}
                            receiveCompany={receiveCompany}
                        />
                        <EdmsTmEmailSendModal
                            visible={TmEmailSendVisible}
                            onClose={() => setTmEmailSendVisible(false)}
                            onComplete={onCompleteEmailList}
                            approverList={emailList}
                        />
                        <TmReviewUploadModalComp
                            visible={reviewUpModalVisible}
                            onClose={onCloseReviewModal}
                            onChangeData={setExFileList}
                            onChangeFile={setExFileName}
                        />
                        <LoadingIndicatorComponent open={isLoading} style={{ zIndex: 1301 }} />
                        <S.ModalHeader>
                            <S.HeaderTitle>TR 업무절차 진행</S.HeaderTitle>
                            {/* <S.ModalCloseBtn onClick={onClose}> */}
                            {/* <S.ModalCloseBtn onClick={onClose}>
                                <Close style={{ fontSize: "3em" }} />
                            </S.ModalCloseBtn> */}
                        </S.ModalHeader>
                        <S.ModalContentWrap>
                            <S.ModalInputWrap>
                                <S.ModalInputBox>
                                    {/* 도큐먼트 코드 */}
                                    <S.InputTitle>TR.No. :</S.InputTitle>
                                    <S.InputItem>{tmNo}</S.InputItem>
                                </S.ModalInputBox>

                                <S.ModalInputBox $boxType="box">
                                    <S.InputTitle>발신처 :</S.InputTitle>
                                    <S.FileTextFieldDiv
                                        inputProps={{
                                            disabled: true,
                                            style: {
                                                border: "1px solid #ccc",
                                                textAlign: "center",
                                                padding: "5%",
                                                borderRadius: "5px",
                                            },
                                        }}
                                        InputProps={{
                                            disableUnderline: true,
                                            disabled: true,
                                            style: { fontSize: "1.25em", color: "#000000" },
                                        }}
                                        type="text"
                                        name="SendCompany"
                                        value={sendCompany}
                                        variant="standard"
                                    />
                                </S.ModalInputBox>
                                {/* 회사선택 */}
                                <S.ModalInputBox $boxType="box">
                                    <S.InputTitle>수신처 :</S.InputTitle>
                                    <S.FileTextFieldDiv
                                        inputProps={{
                                            disabled: true,
                                            style: {
                                                border: "1px solid #ccc",
                                                textAlign: "center",
                                                padding: "5%",
                                                borderRadius: "5px",
                                            },
                                        }}
                                        InputProps={{
                                            disableUnderline: true,
                                            disabled: true,
                                            style: { fontSize: "1.25em", color: "#000000" },
                                        }}
                                        type="text"
                                        name="receiveCompany"
                                        value={receiveCompany}
                                        variant="standard"
                                    />
                                </S.ModalInputBox>

                                <S.ModalInputBox $boxType="box">
                                    <S.InputTitle>프로젝트 :</S.InputTitle>
                                    {props.type == 0 ? (
                                        <S.InputSelect
                                            disableUnderline
                                            value={projectTypeNo}
                                            onChange={(e: any) => setProjectTypeNo(e.target.value)}
                                        >
                                            <S.InputSelectItem value={-1}>
                                                프로젝트 선택
                                            </S.InputSelectItem>
                                            {projectTypeList.length == 0 ? (
                                                <S.InputSelectItem value={-2}>
                                                    프로젝트
                                                </S.InputSelectItem>
                                            ) : (
                                                projectTypeList.map((raw: any, idx: number) => (
                                                    <S.InputSelectItem
                                                        key={idx}
                                                        value={raw.project_no}
                                                    >
                                                        {raw.project_name}
                                                    </S.InputSelectItem>
                                                ))
                                            )}
                                        </S.InputSelect>
                                    ) : (
                                        <S.FileTextFieldDiv
                                            inputProps={{
                                                disabled: true,
                                                style: {
                                                    border: "1px solid #ccc",
                                                    textAlign: "center",
                                                    padding: "5%",
                                                    borderRadius: "5px",
                                                },
                                            }}
                                            InputProps={{
                                                disableUnderline: true,
                                                disabled: true,
                                                style: { fontSize: "1.25em", color: "#000000" },
                                            }}
                                            type="text"
                                            name="projectTypeName"
                                            value={projectTypeName}
                                            variant="standard"
                                        />
                                    )}
                                </S.ModalInputBox>
                                <S.ModalInputBox $boxType="box">
                                    <S.InputTitle>스테이지 :</S.InputTitle>
                                    {props.type == 0 ? (
                                        <S.InputSelect
                                            disableUnderline
                                            value={stageTypeId}
                                            onChange={(e: any) => setStageTypeId(e.target.value)}
                                        >
                                            <S.InputSelectItem value={-1}>
                                                스테이지 선택
                                            </S.InputSelectItem>
                                            {stageList.length == 0 ? (
                                                <S.InputSelectItem value={-1}>
                                                    스테이지
                                                </S.InputSelectItem>
                                            ) : (
                                                stageList.map((raw: any, idx: number) => (
                                                    <S.InputSelectItem key={idx} value={raw.id}>
                                                        {raw.stage_name}
                                                    </S.InputSelectItem>
                                                ))
                                            )}
                                        </S.InputSelect>
                                    ) : (
                                        <S.FileTextFieldDiv
                                            inputProps={{
                                                disabled: true,
                                                style: {
                                                    border: "1px solid #ccc",
                                                    textAlign: "center",
                                                    padding: "5%",
                                                    borderRadius: "5px",
                                                },
                                            }}
                                            InputProps={{
                                                disableUnderline: true,
                                                disabled: true,
                                                style: { fontSize: "1.25em", color: "#000000" },
                                            }}
                                            type="text"
                                            name="stageTypeName"
                                            value={stageTypeName}
                                            variant="standard"
                                        />
                                    )}
                                </S.ModalInputBox>

                                <S.ModalInputBox
                                    $boxType={"long"}
                                    style={{ position: "relative", height: "auto" }}
                                >
                                    <S.InputTitle>참조처 : </S.InputTitle>
                                    <S.DeployUserBlock>
                                        {referenceCompanyList.map((data: any, idx: number) => {
                                            return (
                                                <S.DocChip key={data.name}>
                                                    <S.ChipBlock
                                                        variant={"outlined"}
                                                        label={data.name}
                                                        onDelete={() => commpanyDelete(idx)}
                                                    />
                                                </S.DocChip>
                                            );
                                        })}
                                    </S.DeployUserBlock>
                                    {props.type == 0 && (
                                        <S.DocBtn
                                            $boxType="receiver"
                                            onClick={() => onClickReferenceModal()}
                                        >
                                            +
                                        </S.DocBtn>
                                    )}
                                </S.ModalInputBox>

                                <S.ModalInputBox $boxType="box">
                                    <S.InputTitle>적용일자 :</S.InputTitle>

                                    {props.type == 0 ? (
                                        <S.InputDate
                                            value={moment(startDate).format("YYYY-MM-DD")}
                                            onChange={e =>
                                                setStartDate(moment(e.target.value).toDate())
                                            }
                                            type="date"
                                        />
                                    ) : (
                                        <S.FileTextFieldDiv
                                            inputProps={{
                                                disabled: true,
                                                style: {
                                                    border: "1px solid #ccc",
                                                    textAlign: "center",
                                                    padding: "5%",
                                                    borderRadius: "5px",
                                                },
                                            }}
                                            InputProps={{
                                                disableUnderline: true,
                                                disabled: true,
                                                style: { fontSize: "1.25em", color: "#000000" },
                                            }}
                                            type="text"
                                            name="StartDate"
                                            value={moment(startDate).format("YYYY-MM-DD")}
                                            variant="standard"
                                        />
                                    )}
                                </S.ModalInputBox>
                                <S.ModalInputBox $boxType="box">
                                    <S.InputTitle>기한일자 :</S.InputTitle>

                                    {props.type == 0 ? (
                                        <S.InputDate
                                            value={moment(endDate).format("YYYY-MM-DD")}
                                            onChange={e =>
                                                setEndDate(moment(e.target.value).toDate())
                                            }
                                            type="date"
                                        />
                                    ) : (
                                        <S.FileTextFieldDiv
                                            inputProps={{
                                                disabled: true,
                                                style: {
                                                    border: "1px solid #ccc",
                                                    textAlign: "center",
                                                    padding: "5%",
                                                    borderRadius: "5px",
                                                },
                                            }}
                                            InputProps={{
                                                disableUnderline: true,
                                                disabled: true,
                                                style: { fontSize: "1.25em", color: "#000000" },
                                            }}
                                            type="text"
                                            name="EndDate"
                                            value={moment(endDate).format("YYYY-MM-DD")}
                                            variant="standard"
                                        />
                                    )}
                                </S.ModalInputBox>
                                <S.ModalInputBox
                                    $boxType={"long"}
                                    style={{ position: "relative", height: "auto" }}
                                >
                                    <S.InputTitle>결재자 : </S.InputTitle>
                                    <S.DeployUserBlock>
                                        {approverList.map((data: any, idx: number) => {
                                            return (
                                                <S.DocChip key={data.username}>
                                                    <S.ChipBlock
                                                        variant={"outlined"}
                                                        label={data.username}
                                                    />
                                                </S.DocChip>
                                            );
                                        })}
                                    </S.DeployUserBlock>
                                </S.ModalInputBox>
                                <S.ModalInputBox $boxType="subject">
                                    <S.InputTitle>제목 :</S.InputTitle>
                                    {props.type == 0 ? (
                                        <S.Input
                                            value={tmSubject}
                                            onChange={e => setTmSubject(e.target.value)}
                                        />
                                    ) : (
                                        <S.FileTextFieldDiv
                                            $heightType={true}
                                            inputProps={{
                                                disabled: true,
                                                style: {
                                                    border: "1px solid #ccc",
                                                    textAlign: "left",
                                                    padding: "10px",
                                                    borderRadius: "5px",
                                                },
                                            }}
                                            InputProps={{
                                                disableUnderline: true,
                                                disabled: true,
                                                style: { fontSize: "1.25em", color: "#000000" },
                                            }}
                                            type="text"
                                            name="TmSubject"
                                            value={tmSubject}
                                            variant="standard"
                                        />
                                    )}
                                </S.ModalInputBox>
                                <S.ModalInputBox $boxType="wide">
                                    {!isFileSelect ? (
                                        <>
                                            <S.InputTitle>파일선택 :</S.InputTitle>
                                            <S.EmptyBox>
                                                {props.type == 0 && (
                                                    <S.DocBtn onClick={onClickFileSelectModal}>
                                                        +
                                                    </S.DocBtn>
                                                )}
                                            </S.EmptyBox>
                                        </>
                                    ) : (
                                        <>
                                            <S.InputTitle>선택파일 :</S.InputTitle>
                                            <S.UploadList>
                                                <GridViewComponent
                                                    fullData={gridList}
                                                    titles={tableHeader}
                                                    keys={gridListKeys}
                                                    values={gridList}
                                                    keysWidth={tableHeadSize}
                                                    datatype={tableHeadType}
                                                    rowClass="background-color-parent color-light-black"
                                                    headerClass="background-dark-sky-blue color-white align-center"
                                                />
                                            </S.UploadList>
                                            {props.type == 0 && (
                                                <S.DocBtn
                                                    style={{
                                                        width: "6%",
                                                        display: "flex",
                                                        opacity: "0.6",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        color: "#ffffff",
                                                        fontSize: "2em",
                                                        fontWeight: 900,
                                                        backgroundColor: "#ccc",
                                                        border: "1px solid #ccc",
                                                        borderRadius: "3px",
                                                        transition: "opacity 0.5",
                                                        maxHeight: "48px",
                                                        minHeight: "36px",
                                                    }}
                                                    $boxType="reselect"
                                                    onClick={onClickFileSelectModal}
                                                >
                                                    +
                                                </S.DocBtn>
                                            )}
                                        </>
                                    )}
                                </S.ModalInputBox>
                                <S.ModalInputBox $boxType="wide">
                                    <S.InputTitle>리뷰엑셀파일 : </S.InputTitle>

                                    <S.UploadList
                                        style={{
                                            margin: "0 10px",
                                            width: "95%",
                                            border: "1px solid #ccc",
                                            maxHeight: "200px",
                                            overflowY: "auto",
                                            padding: "3px 5px",
                                            boxSizing: "border-box",
                                        }}
                                    >
                                        {exFileName}
                                    </S.UploadList>

                                    {props.type == 0 && (
                                        <S.DocBtn
                                            style={{
                                                width: "6%",
                                                display: "flex",
                                                opacity: "0.6",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                color: "#ffffff",
                                                fontSize: "2em",
                                                fontWeight: 900,
                                                backgroundColor: "#ccc",
                                                border: "1px solid #ccc",
                                                borderRadius: "3px",
                                                transition: "opacity 0.5",
                                                maxHeight: "48px",
                                                minHeight: "36px",
                                            }}
                                            $boxType="receiver"
                                            onClick={onClickExcelFileSelect}
                                        >
                                            {" "}
                                            +{" "}
                                        </S.DocBtn>
                                    )}
                                </S.ModalInputBox>
                                <S.ModalInputBox>
                                    <input
                                        multiple
                                        accept="*"
                                        id="contained-button-file"
                                        type="file"
                                        style={{ display: "none" }}
                                        onChange={onClickFilesUpload}
                                        ref={ref => setFileUpload(ref)}
                                    />
                                    <S.InputTitle>첨부파일 :</S.InputTitle>
                                    {!isFilesUpload ? (
                                        <S.EmptyBox
                                            style={{
                                                display: "flex",
                                                justifyContent: "flex-end",
                                                border: "1px solid #ccc",
                                                borderRadius: "5px",
                                                width: "100%",
                                                height: "40px",
                                                marginLeft: "1%",
                                                marginRight: "1%",
                                            }}
                                        >
                                            {props.type == 0 && (
                                                <S.DocBtn
                                                    style={{
                                                        width: "6%",
                                                        display: "flex",
                                                        opacity: "0.6",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        color: "#ffffff",
                                                        fontSize: "2em",
                                                        fontWeight: 900,
                                                        backgroundColor: "#ccc",
                                                        border: "1px solid #ccc",
                                                        borderRadius: "3px",
                                                        transition: "opacity 0.5",
                                                        maxHeight: "48px",
                                                        minHeight: "36px",
                                                    }}
                                                    $boxType="reselect"
                                                    onClick={onClickUploadFlie}
                                                >
                                                    +
                                                </S.DocBtn>
                                            )}
                                        </S.EmptyBox>
                                    ) : (
                                        <S.UploadList>
                                            <S.UploadListFristItem
                                                style={{
                                                    display: "flex",
                                                    backgroundColor: "#c4d6d6",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    fontSize: "1.2em",
                                                    color: "#333",
                                                    width: "100%",
                                                }}
                                            >
                                                첨부된 파일
                                            </S.UploadListFristItem>
                                            <S.UploadListInner
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "flex-start",
                                                    alignItems: "center",
                                                    flexDirection: "column",
                                                    minHeight: "2em",
                                                    maxHeight: "6em",
                                                    height: "fit-content",
                                                    overflowY: "auto",
                                                    width: "100%",
                                                }}
                                            >
                                                {files.length > 0 &&
                                                    files.map((raw: any, idx) => {
                                                        return (
                                                            <S.UploadListItem
                                                                key={idx}
                                                                style={{
                                                                    display: "flex",
                                                                    justifyContent: "space-between",
                                                                    alignItems: "center",
                                                                    hangingPunctuation:
                                                                        "fit-content",
                                                                    width: "100%",
                                                                    height: "100%",
                                                                }}
                                                            >
                                                                <S.UploadListItemText
                                                                    style={{
                                                                        flex: "1",
                                                                        display: "flex",
                                                                        justifyContent:
                                                                            "flex-start",
                                                                        paddingLeft: "20px",
                                                                        fontSize: "1.2em",
                                                                        color: "#333",
                                                                        height: "auto",
                                                                    }}
                                                                >
                                                                    <a>{raw.file_name}</a>
                                                                </S.UploadListItemText>
                                                                {/* <S.UploadListItemDeleteBtn
                                                                    onClick={() =>
                                                                        onClickDeleteFile(idx)
                                                                    }
                                                                >
                                                                    <img
                                                                        src={`${domain}/assets/images/edms/trash.svg`}
                                                                    />
                                                                </S.UploadListItemDeleteBtn> */}
                                                            </S.UploadListItem>
                                                        );
                                                    })}
                                            </S.UploadListInner>
                                        </S.UploadList>
                                    )}
                                </S.ModalInputBox>
                                <S.ModalInputBox
                                    $boxType={"long"}
                                    style={{ position: "relative", height: "auto" }}
                                >
                                    <S.InputTitle>메일 수신자: </S.InputTitle>
                                    <S.DeployUserBlock>
                                        {emailList.map((data: any, idx: number) => {
                                            return (
                                                <S.DocChip key={data.username}>
                                                    <S.ChipBlock
                                                        variant={"outlined"}
                                                        label={data.username}
                                                        onDelete={() => emailSendDelete(idx)}
                                                    />
                                                </S.DocChip>
                                            );
                                        })}
                                    </S.DeployUserBlock>
                                    {props.type == 0 && (
                                        <S.DocBtn
                                            $boxType="receiver"
                                            onClick={() => setTmEmailSendVisible(true)}
                                        >
                                            +
                                        </S.DocBtn>
                                    )}
                                </S.ModalInputBox>
                                <S.ModalInputBox $boxType="desc">
                                    <S.InputTitle>설명 :</S.InputTitle>
                                    {props.type == 0 ? (
                                        <S.Input
                                            value={explan}
                                            onChange={e => setExplan(e.target.value)}
                                        />
                                    ) : (
                                        <S.FileTextFieldDiv
                                            $heightType={true}
                                            inputProps={{
                                                disabled: true,
                                                style: {
                                                    border: "1px solid #ccc",
                                                    textAlign: "left",
                                                    padding: "10px",
                                                    borderRadius: "5px",
                                                },
                                            }}
                                            InputProps={{
                                                disableUnderline: true,
                                                disabled: true,
                                                style: { fontSize: "1.25em", color: "#000000" },
                                            }}
                                            type="text"
                                            name="Explan"
                                            value={explan}
                                            variant="standard"
                                        />
                                    )}
                                </S.ModalInputBox>
                            </S.ModalInputWrap>
                            <S.ButtonDiv>
                                <S.ModalBtnContainer>
                                    <S.CloseBtn onClick={onClose}>닫기</S.CloseBtn>
                                    {props.type == 0 && (
                                        <S.SaveBtn onClick={onClickModify}>수정</S.SaveBtn>
                                    )}
                                </S.ModalBtnContainer>
                            </S.ButtonDiv>
                        </S.ModalContentWrap>
                    </S.Inner>
                </S.Block>
            </NewWindow>
        );
    else return <></>;
};
