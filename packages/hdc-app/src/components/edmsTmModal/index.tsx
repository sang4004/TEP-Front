/******************************************************************************
 * Copyright (c) 2021. Moornmo Inc. Rights reserved.                          *
 * Data modelings and methods used are assets of Moornmo Inc.                 *
 * projecttreemodal/index.tsx
 * hooks :
 * useLocations
 *
 * last modify : jh.jeong@ilts.co.kr
 ******************************************************************************/
// React
import React, { useState, useEffect } from "react"; // default hooks
import { useDispatch, useSelector } from "react-redux";
//
import NewWindow from "react-new-window";
import { reducerState } from "../../common/store";
import {
    LoadingIndicatorComponent,
    GridViewComponent,
    ModalInfo,
    ToastComponent,
} from "components";
//
import * as S from "./styled";
import Close from "@material-ui/icons/Close";
import { domain } from "../../common/network";

import { getMoment, GetTRExpiredDefaultDay } from "../../common/utils";
import { CreateTm, GetTmCode, WorkCode, TrNoExamine } from "../../common/action";
import {
    EdmsTmFileSelectModal,
    EdmsTmpDocumentApprovalInfo,
    EdmsRefereceModal,
    EdmsTmEmailSendModal,
    TmReviewUploadModalComp,
} from "../../components";
import { FileDropComp } from "../";

const moment = getMoment();

export type edmsTmModalProps = {
    style?: object;
    visible: boolean;
    onClose: () => void;
    checkList: number[];
    state: string;
    workList?: any;
};
interface FinaledmsTmModalProps extends edmsTmModalProps {}

const tableHeadSize = [0.3, 0.3, 0.3, 0.6];
const tableHeadType = [1, 1, 1, 0];
const tableHeader = ["문서코드", "문서제목", "스테이지", "파일제목"];
const ISSUE_FOR_TYPE = [
    "For Reference",
    "For Review",
    "For Information",
    "For Approval",
    "For Construction",
    "For Final",
];

export const EdmsTmModal: React.FunctionComponent<FinaledmsTmModalProps> = props => {
    const dispatch = useDispatch();

    const tmSelector = useSelector((state: reducerState) => state.tm);
    const userSelector = useSelector((state: reducerState) => state.user);
    const fileSelector = useSelector((state: reducerState) => state.files);
    const workSelector = useSelector((state: reducerState) => state.work);
    const projectSelector = useSelector((state: reducerState) => state.project);
    const settingSelector = useSelector((state: reducerState) => state.projectsettings);

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
    const [selectedList, setSelectedList] = useState<any[]>([]);
    const [projectTypeList, setProjectTypeList] = useState<any[]>([]);
    const [stageList, setStageList] = useState<any[]>([]);

    const [tmNo, setTmNo] = useState<string>("");
    const [editTmNoType, setEditTmNoType] = useState<number>(0);
    const [tmSubject, setTmSubject] = useState<string>("");
    const [sendCompany, setSendCompany] = useState<string>("");
    const [receiveCompany, setReceiveCompany] = useState<string>("수신처 선택");
    const [referenceCompanyList, setReferenceCompanyList] = useState<any[]>([]);
    const [referenceIdList, setReferenceIdList] = useState<number[]>([]);
    const [projectTypeNo, setProjectTypeNo] = useState<number>(-1);
    const [stageTypeId, setStageTypeId] = useState<number>(-1);
    const [forType, setForType] = useState<number>(0);

    const [endDate, setEndDate] = useState<Date>();
    const [explan, setExplan] = useState<string>("");
    const [workCode, setWorkCode] = useState<string>("");
    const [createBy, setCreateBy] = useState<string>("");
    const [seriesNo, setSeriesNo] = useState<number>(12345);
    const [approverId, setApproverId] = useState<number>(0);
    const [projectCode, setProjectCode] = useState<number>(0);
    const [startDate, setStartDate] = useState<Date>(new Date());

    const [files, setFiles] = useState<any[]>([]);
    const [fileList, setFileList] = useState<any[]>([]);
    const [fileUpload, setFileUpload] = useState<HTMLInputElement | null>(null);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isInputData, setIsInputData] = useState<boolean>(false);
    const [isFileSelect, setIsFileSelect] = useState<boolean>(false);
    const [isFilesUpload, setIsFilesUpload] = useState<boolean>(false);
    const [fileSelectModalVisible, setFileSelectModalVisible] = useState<boolean>(false);
    const [tmpApprovalInfoVisible, setTmpApprovalInfoVisible] = useState<boolean>(false);
    const [referenceVisible, setReferenceVisible] = useState<boolean>(false);
    const [TmEmailSendVisible, setTmEmailSendVisible] = useState<boolean>(false);
    const [recvCompanyTmId, setRecvCompanyTmId] = useState<number>(-1);
    // excel file upload datas
    const [reviewUpModalVisible, setReviewUpModalVisible] = useState<boolean>(false);
    const [exFileList, setExFileList] = useState<any[]>([]);
    const [exFileName, setExFileName] = useState<string>("(선택)엑셀파일을 올려주세요.");
    const [visibleToast, setVisibleToast] = useState<boolean>(false);
    const [visibleSecondToast, setVisibleSecondToast] = useState<boolean>(false);
    const [visibleThirdToast, setVisibleThirdToast] = useState<boolean>(false);
    const [visibleFourthToast, setVisibleFourthToast] = useState<boolean>(false);
    const [visibleFifthToast, setVisibleFifthToast] = useState<boolean>(false);
    const [toastText, setToastText] = useState<string>("");
    //
    const [isDragOver, setIsDragOver] = useState<boolean>(false);

    useEffect(() => {
        if (props.visible && sendCompany == "") {
            let companyName = userSelector.groupname ? userSelector.groupname.split(" ")[0] : "";
            setSendCompany(companyName);
            dispatch(WorkCode("TM"));
            setAuthDataList(props.workList);
            setCreateBy(userSelector.username);
            //기한일자 설정
            setEndDate(GetTRExpiredDefaultDay());
            //
        }
    }, [props.visible]);

    useEffect(() => {
        if (workSelector.work_code != undefined) {
            setWorkCode(workSelector.work_code);
        }
    }, [workSelector.work_code]);

    useEffect(() => {
        if (settingSelector.project_list) {
            setProjectTypeList(settingSelector.project_list);
        }
    }, [settingSelector.project_list]);

    useEffect(() => {
        if (settingSelector.stage_type_list) {
            setStageList(settingSelector.stage_type_list);
        }
    }, [settingSelector.stage_type_list]);

    useEffect(() => {
        if (receiveCompany != "수신처 선택") {
            let stage_type = stageList.find(raw => raw.id == stageTypeId);
            dispatch(
                GetTmCode(
                    false,
                    receiveCompany,
                    fileList.length > 0 ? fileList[0] : undefined,
                    projectTypeNo,
                    stage_type ? stage_type.stage_name : undefined
                )
            );
        }
    }, [receiveCompany]);

    useEffect(() => {
        if (receiveCompany != "수신처 선택" && fileList.length > 0) {
            dispatch(GetTmCode(false, receiveCompany, fileList[0]));
        }
    }, [fileList]);

    useEffect(() => {
        if (receiveCompany != "수신처 선택" && projectTypeNo != -1 && stageTypeId != -1) {
            let stage_type = stageList.find(raw => raw.id == stageTypeId);

            dispatch(
                GetTmCode(false, receiveCompany, undefined, projectTypeNo, stage_type.stage_name)
            );
        }
    }, [projectTypeNo, stageTypeId]);

    useEffect(() => {
        if (projectSelector.project_detail != undefined) {
            setProjectCode(projectSelector.project_detail.project_code);
        }
    }, [projectSelector.project_detail]);

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
        if (tmSelector.tm_user_id != undefined) {
            setRecvCompanyTmId(tmSelector.tm_user_id);
        }
    }, [tmSelector.tm_user_id]);

    useEffect(() => {
        if (
            tmSelector.tm_code &&
            tmSelector.tm_user_id != undefined &&
            tmSelector.tm_code != true
        ) {
            setTmNo(tmSelector.tm_code);
            setApproverId(tmSelector.tm_user_id);
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

    // Mydocument에서 파일 선택 후 TM 진행
    useEffect(() => {
        if (props.checkList.length > 0) makeSelectList(props.checkList);
    }, [props.checkList]);

    useEffect(() => {
        if (selectedList.length > 0) {
            let _selectedList: number[] = [];
            _selectedList.push(
                ...selectedList.filter(s => {
                    return s != undefined;
                })
            );
            _selectedList.push(...props.checkList);
            makeSelectList(_selectedList);
        }
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
                    stage_code: work.stage_code,
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
        if (tmSelector.tr_no_examine) {
            setIsLoading(false);
            setEditTmNoType(0);
        } else if (tmSelector.tr_no_examine == false) {
            setIsLoading(false);
            setVisibleFifthToast(true);
            setTimeout(() => {
                setVisibleFifthToast(false);
            }, 2000);
        }
    }, [tmSelector.tr_no_examine]);

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
        setGridList([]);
        setGridListKeys([]);
        setTimeout(() => {
            makeSelectList(props.checkList);
        }, 0);
        props.onClose();
    };

    // 저장
    const onClickCreate = async () => {
        if (tmSubject == "") {
            setVisibleThirdToast(true);
            setTimeout(() => {
                setVisibleThirdToast(false);
            }, 2000);
        }
        // else if (gridList.length == 0) {
        //     setToastText("파일을");
        //     setVisibleToast(true);
        //     setTimeout(() => {
        //         setVisibleToast(false);
        //     }, 2000);
        // }
        else if (endDate == undefined) {
            setToastText("기한일자를");
            setVisibleToast(true);
            setTimeout(() => {
                setVisibleToast(false);
            }, 2000);
        } else if (approverIdList.length == 0) {
            setToastText("결재자를");
            setVisibleToast(true);
            setTimeout(() => {
                setVisibleToast(false);
            }, 2000);
        } else if (receiveCompany === "수신처 선택") {
            setToastText("수신처를");
            setVisibleToast(true);
            setTimeout(() => {
                setVisibleToast(false);
            }, 2000);
        } else if (recvCompanyTmId == -1 || recvCompanyTmId == 0) {
            setVisibleSecondToast(true);
            setTimeout(() => {
                setVisibleSecondToast(false);
            }, 2000);
        } else if (projectTypeNo == -1) {
            setToastText("프로젝트를");
            setVisibleToast(true);
            setTimeout(() => {
                setVisibleToast(false);
            }, 2000);
        } else if (stageTypeId == -1) {
            setToastText("스테이지를");
            setVisibleToast(true);
            setTimeout(() => {
                setVisibleToast(false);
            }, 2000);
        } else {
            setIsLoading(true);
            let account_ym = moment().format("YYYYMM");

            await dispatch(
                CreateTm(
                    files,
                    startDate,
                    projectTypeNo,
                    seriesNo,
                    account_ym,
                    tmSubject,
                    explan.replace(/(?:<p>|<\/p>)/gi, ""),
                    approverId,
                    endDate,
                    createBy,
                    docuList,
                    parseInt(workCode.split("-")[1]),
                    tmNo,
                    approverIdList,
                    fileList,
                    recvCompanyTmId,
                    stageTypeId,
                    referenceIdList,
                    emailIdList,
                    exFileList,
                    forType
                )
            );
            setTimeout(() => {
                setIsLoading(false);
                ModalInfo("등록이 완료되었습니다.");
                onClose();
            }, 1000);
        }
    };

    // 파일 업로드 및 삭제
    const onClickUploadFlie = () => {
        if (fileUpload) fileUpload.click();
    };

    const onClickFilesUpload = (event: any) => {
        var _files = event.target.files;

        for (var f of _files) {
            if (files.filter(obj => obj.name == f.name).length == 0) files.push(f);
        }

        setFiles([...files]);
    };

    const handleFileDrop = async (dropFiles: FileList) => {
        if (dropFiles.length > 0) {
            setFiles([...files, ...dropFiles]);
        }
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
            let filtered = companyList.filter(raw => raw.id == id);
            _list.push(filtered);
        }

        setReferenceIdList(list);
        setReferenceCompanyList(_list);
    };

    const approverDelete = (idx: number) => {
        approverList.splice(idx, 1);
        approverIdList.splice(idx, 1);

        setApproverIdList([...approverIdList]);
        setApproverList([...approverList]);
    };

    const commpanyDelete = (idx: number) => {
        referenceCompanyList.splice(idx, 1);
        setReferenceCompanyList([...referenceCompanyList]);
    };

    const emailSendDelete = (idx: number) => {
        emailList.splice(idx, 1);
        emailIdList.splice(idx, 1);
        setEmailList([...emailList]);
        setEmailIdList([...emailIdList]);
    };

    // 파일 선택
    const onClickFileSelectModal = () => {
        if (fileSelectModalVisible) {
            setFileSelectModalVisible(false);
            setTimeout(() => {
                setFileSelectModalVisible(true);
            }, 0);
        } else {
            setFileSelectModalVisible(true);
        }
    };

    const onCloseFileSelectModal = () => {
        setFileSelectModalVisible(false);
    };
    //
    // 엑셀파일 업로드
    const onClickExcelFileSelect = () => {
        if (reviewUpModalVisible) {
            setReviewUpModalVisible(false);
            setTimeout(() => {
                setReviewUpModalVisible(true);
            }, 0);
        } else {
            setReviewUpModalVisible(true);
        }
    };

    const onCloseReviewModal = () => {
        setReviewUpModalVisible(false);
    };
    //

    const onClickApprovalInfo = () => {
        if (tmpApprovalInfoVisible) {
            setTmpApprovalInfoVisible(false);
            setTimeout(() => {
                setTmpApprovalInfoVisible(true);
            }, 0);
        } else {
            setTmpApprovalInfoVisible(true);
        }
    };

    const onClickReferenceModal = () => {
        if (receiveCompany === "수신처 선택") {
            setToastText("수신처를");
            setVisibleToast(true);
            setTimeout(() => {
                setVisibleToast(false);
            }, 2000);
        } else {
            if (referenceVisible) {
                setReferenceVisible(false);
                setTimeout(() => {
                    setReferenceVisible(true);
                }, 0);
            } else {
                setReferenceVisible(true);
            }
        }
    };

    const onClickEditTmNoType = () => {
        if (editTmNoType == 0) {
            setEditTmNoType(1);
        } else {
            if (tmNo != "") {
                setIsLoading(true);
                dispatch(TrNoExamine(tmNo));
            } else {
                setVisibleFourthToast(true);
                setTimeout(() => {
                    setVisibleFourthToast(false);
                }, 2000);
            }
        }
    };

    const attachFileHeight = Math.floor((files.length + 1) * 1.6) + "em";
    if (props.visible)
        return (
            <NewWindow
                title="TR 업무절차 생성"
                onUnload={props.onClose}
                onOpen={window => {
                    window.addEventListener(
                        "dragover",
                        function (e) {
                            e = e || event;
                            e.preventDefault();
                        },
                        false
                    );
                    window.addEventListener(
                        "drop",
                        function (e) {
                            e = e || event;
                            e.preventDefault();
                        },
                        false
                    );
                }}
                features={{ width: 860, height: 1080 }}
            >
                <S.Block>
                    <ToastComponent
                        text={`${toastText} 선택해 주세요.`}
                        close={() => setVisibleToast(false)}
                        visible={visibleToast}
                        type={"warning"}
                        style={{
                            position: "absolute",
                            bottom: 100,
                            right: 100,
                            alignItems: "center",
                        }}
                    />
                    {/* <ToastComponent
                        text="수신처에 해당 프로젝트 TR 담당자가 없습니다."
                        close={() => setVisibleSecondToast(false)}
                        visible={visibleSecondToast}
                        type={"warning"}
                        style={{
                            position: "absolute",
                            bottom: 100,
                            right: 100,
                            alignItems: "center",
                        }}
                    /> */}
                    <ToastComponent
                        text={`제목을 입력해 주세요.`}
                        close={() => setVisibleThirdToast(false)}
                        visible={visibleThirdToast}
                        type={"warning"}
                        style={{
                            position: "absolute",
                            bottom: 100,
                            right: 100,
                            alignItems: "center",
                        }}
                    />
                    <ToastComponent
                        text={`TR.No.를 입력해 주세요.`}
                        close={() => setVisibleFourthToast(false)}
                        visible={visibleFourthToast}
                        type={"warning"}
                        style={{
                            position: "absolute",
                            bottom: 100,
                            right: 100,
                            alignItems: "center",
                        }}
                    />
                    <ToastComponent
                        text={`중복된 TR.No. 입니다.`}
                        close={() => setVisibleFifthToast(false)}
                        visible={visibleFifthToast}
                        type={"warning"}
                        style={{
                            position: "absolute",
                            bottom: 100,
                            right: 100,
                            alignItems: "center",
                        }}
                    />
                    <S.Inner>
                        <style>
                            {` 
                        .k-grid table {
                            width : 100% !important;
                            margin : 0 -2px;
                        }
                        .k-grid-container ::-webkit-scrollbar-thumb{
                            background-color: #707070;
                            heigth: 20px;
                        }
                        
                        .k-grid-container ::-webkit-scrollbar{
                            background-color: transparent !important;
                        }
                        .file-drop {
                            height : ${attachFileHeight};
                        }
                        .file-drop-target { 
                            justify-content : flex-start !important;
                        }
                    `}
                        </style>
                        <EdmsTmFileSelectModal
                            visible={fileSelectModalVisible}
                            onClose={onCloseFileSelectModal}
                            authDataList={authDataList}
                            setWorkList={setSelectedList}
                        />
                        <EdmsTmpDocumentApprovalInfo
                            visible={tmpApprovalInfoVisible}
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
                                    {editTmNoType == 0 ? (
                                        <S.InputItem
                                            style={{
                                                flex: "1",
                                                paddingLeft: "10px",
                                                fontSize: "1.4em",
                                                whiteSpace: "nowrap",
                                                textAlign: "left",
                                            }}
                                        >
                                            {tmNo}
                                        </S.InputItem>
                                    ) : (
                                        <S.TmNoInput
                                            style={{
                                                flex: "1",
                                                textAlign: "left",
                                                fontSize: "1.4em",
                                                whiteSpace: "nowrap",
                                                margin: "0 1%",
                                                padding: "0 3%",
                                                boxSizing: "border-box",
                                                border: "1px solid #ccc",
                                                borderRadius: "5px",
                                                height: "100%",
                                            }}
                                            value={tmNo}
                                            onChange={e => setTmNo(e.target.value)}
                                        />
                                    )}
                                    {tmNo != "" && (
                                        <S.GroupBtn
                                            onClick={onClickEditTmNoType}
                                            style={{
                                                display: "flex",
                                                position: "relative",
                                                justifyContent: "center",
                                                right: "0px",
                                                margin: "0px",
                                                height: "100%",
                                                backgroundColor: "#ffffff",
                                                color: "black",
                                                border: "1px solid black",
                                                padding: "4px 8px",
                                                marginRight: "5px",
                                            }}
                                        >
                                            {editTmNoType == 0 ? "수정" : "완료"}
                                        </S.GroupBtn>
                                    )}
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
                                    <S.InputSelect
                                        disableUnderline
                                        value={receiveCompany}
                                        onChange={(e: any) => setReceiveCompany(e.target.value)}
                                        inputProps={{
                                            MenuProps: {
                                                disableScrollLock: true,
                                            },
                                        }}
                                    >
                                        <S.InputSelectItem value={receiveCompany}>
                                            수신처 선택
                                        </S.InputSelectItem>
                                        {companyList.length == 0 ? (
                                            <S.InputSelectItem value={1}>회사1</S.InputSelectItem>
                                        ) : (
                                            companyList.map((raw: any, idx: number) => (
                                                <S.InputSelectItem key={idx} value={raw.name}>
                                                    {raw.name}
                                                </S.InputSelectItem>
                                            ))
                                        )}
                                    </S.InputSelect>
                                </S.ModalInputBox>

                                <S.ModalInputBox $boxType="box">
                                    <S.InputTitle>프로젝트 :</S.InputTitle>
                                    <S.InputSelect
                                        disableUnderline
                                        value={projectTypeNo}
                                        onChange={(e: any) => setProjectTypeNo(e.target.value)}
                                        inputProps={{
                                            MenuProps: {
                                                disableScrollLock: true,
                                            },
                                        }}
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
                                                <S.InputSelectItem key={idx} value={raw.project_no}>
                                                    {raw.project_name}
                                                </S.InputSelectItem>
                                            ))
                                        )}
                                    </S.InputSelect>
                                </S.ModalInputBox>
                                <S.ModalInputBox $boxType="box">
                                    <S.InputTitle>스테이지 :</S.InputTitle>
                                    <S.InputSelect
                                        disableUnderline
                                        value={stageTypeId}
                                        onChange={(e: any) => setStageTypeId(e.target.value)}
                                        inputProps={{
                                            MenuProps: {
                                                disableScrollLock: true,
                                            },
                                        }}
                                    >
                                        <S.InputSelectItem value={-1}>
                                            스테이지 선택
                                        </S.InputSelectItem>
                                        {stageList.length == 0 ? (
                                            <S.InputSelectItem value={-1}>
                                                스테이지 선택
                                            </S.InputSelectItem>
                                        ) : (
                                            stageList.map((raw: any, idx: number) => (
                                                <S.InputSelectItem key={idx} value={raw.id}>
                                                    {raw.stage_name}
                                                </S.InputSelectItem>
                                            ))
                                        )}
                                    </S.InputSelect>
                                </S.ModalInputBox>

                                <S.ModalInputBox
                                    $boxType={"box"}
                                    style={{ position: "relative", height: "auto" }}
                                >
                                    <S.InputTitle>참조처 : </S.InputTitle>
                                    <S.DeployUserBlock>
                                        {referenceCompanyList.map((data: any, idx: number) => {
                                            return (
                                                <S.DocChip key={data[0].name}>
                                                    <S.ChipBlock
                                                        variant={"outlined"}
                                                        label={data[0].name}
                                                        onDelete={() => commpanyDelete(idx)}
                                                    />
                                                </S.DocChip>
                                            );
                                        })}
                                    </S.DeployUserBlock>
                                    <S.DocBtn $boxType="reference" onClick={onClickReferenceModal}>
                                        +
                                    </S.DocBtn>
                                </S.ModalInputBox>
                                <S.ModalInputBox $boxType="box">
                                    <S.InputTitle>Issue For :</S.InputTitle>

                                    <S.InputSelect
                                        disableUnderline
                                        value={forType}
                                        onChange={(e: any) => setForType(e.target.value)}
                                        inputProps={{
                                            MenuProps: {
                                                disableScrollLock: true,
                                            },
                                        }}
                                    >
                                        <S.InputSelectItem value={0}>미설정</S.InputSelectItem>
                                        {ISSUE_FOR_TYPE.map((raw: string, idx: number) => (
                                            <S.InputSelectItem key={idx} value={idx + 1}>
                                                {raw}
                                            </S.InputSelectItem>
                                        ))}
                                    </S.InputSelect>
                                </S.ModalInputBox>
                                <S.ModalInputBox $boxType="box">
                                    <S.InputTitle>적용일자 :</S.InputTitle>

                                    <S.InputDate
                                        value={moment(startDate).format("YYYY-MM-DD")}
                                        onChange={e =>
                                            setStartDate(moment(e.target.value).toDate())
                                        }
                                        type="date"
                                    />
                                </S.ModalInputBox>
                                <S.ModalInputBox $boxType="box">
                                    <S.InputTitle>기한일자 :</S.InputTitle>

                                    <S.InputDate
                                        value={moment(endDate).format("YYYY-MM-DD")}
                                        onChange={e => setEndDate(moment(e.target.value).toDate())}
                                        type="date"
                                    />
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
                                                        onDelete={() => approverDelete(idx)}
                                                    />
                                                </S.DocChip>
                                            );
                                        })}
                                    </S.DeployUserBlock>
                                    <S.DocBtn $boxType="receiver" onClick={onClickApprovalInfo}>
                                        +
                                    </S.DocBtn>
                                </S.ModalInputBox>
                                <S.ModalInputBox $boxType="subject">
                                    <S.InputTitle>제목 :</S.InputTitle>
                                    <S.Input
                                        value={tmSubject}
                                        onChange={e => setTmSubject(e.target.value)}
                                    />
                                </S.ModalInputBox>
                                <S.ModalInputBox $boxType="wide">
                                    {!isFileSelect ? (
                                        <>
                                            <S.InputTitle>파일선택 :</S.InputTitle>
                                            <S.EmptyBox>
                                                <S.DocBtn onClick={onClickFileSelectModal}>
                                                    +
                                                </S.DocBtn>
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
                                        }}
                                    >
                                        {exFileName}
                                    </S.UploadList>
                                    <S.DocBtn $boxType="receiver" onClick={onClickExcelFileSelect}>
                                        {" "}
                                        +{" "}
                                    </S.DocBtn>
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
                                                overflowY: "auto",
                                                width: "100%",
                                                height: attachFileHeight,
                                            }}
                                        >
                                            <FileDropComp
                                                // onFrameDragEnter={(event) => console.log('onFrameDragEnter', event)}
                                                // onFrameDragLeave={(event) => console.log('onFrameDragLeave', event)}
                                                // onFrameDrop={(event) => console.log('onFrameDrop', event)}
                                                onDragOver={event => {
                                                    setIsDragOver(true);
                                                    event.preventDefault();
                                                }}
                                                onDragLeave={event => {
                                                    setIsDragOver(false);
                                                    event.preventDefault();
                                                }}
                                                onDrop={files => {
                                                    if (files) handleFileDrop(files);
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
                                                                    height: "2em",
                                                                    width: "100%",
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
                                                                    }}
                                                                >
                                                                    <a>{raw.name}</a>
                                                                </S.UploadListItemText>
                                                                <S.UploadListItemDeleteBtn
                                                                    onClick={() =>
                                                                        onClickDeleteFile(idx)
                                                                    }
                                                                >
                                                                    <img
                                                                        src={`${domain}/assets/images/edms/trash.svg`}
                                                                    />
                                                                </S.UploadListItemDeleteBtn>
                                                            </S.UploadListItem>
                                                        );
                                                    })}
                                            </FileDropComp>
                                        </S.UploadListInner>
                                    </S.UploadList>
                                    <S.DocBtn onClick={onClickUploadFlie}>+</S.DocBtn>
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
                                    <S.DocBtn
                                        $boxType="receiver"
                                        onClick={() => setTmEmailSendVisible(true)}
                                    >
                                        +
                                    </S.DocBtn>
                                </S.ModalInputBox>
                                <S.ModalInputBox $boxType="desc">
                                    <S.InputTitle>설명 :</S.InputTitle>
                                    <S.Input
                                        value={explan}
                                        onChange={e => setExplan(e.target.value)}
                                    />
                                </S.ModalInputBox>
                            </S.ModalInputWrap>
                            <S.ButtonDiv>
                                <S.ModalBtnContainer>
                                    <S.CloseBtn onClick={onClose}>닫기</S.CloseBtn>
                                    <S.SaveBtn onClick={onClickCreate}>저장</S.SaveBtn>
                                </S.ModalBtnContainer>
                            </S.ButtonDiv>
                        </S.ModalContentWrap>
                    </S.Inner>
                </S.Block>
            </NewWindow>
        );
    else return <></>;
};
