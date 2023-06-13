/******************************************************************************
 * projecttreemodal/index.tsx
 * hooks :
 * useLocations
 *
 ******************************************************************************/
// Library
import React, { useState, useEffect, ChangeEvent } from "react"; // default hooks
import { useDispatch, useSelector } from "react-redux";
import {
    LoadingIndicatorComponent,
    ModalInfo,
    GridViewComponent,
    WebEditorComponent,
} from "components";
//
// Module
import * as S from "./styled";
import Close from "@material-ui/icons/Close";
import { reducerState } from "../../common/store";
import {
    CreateWorkProc,
    DeactiveWorkModal,
    WorkCode,
    DeleteTmpBox,
    GetProjectDetail,
    GetEdmsDocuMasterList,
    GetDocumentAuthUser,
    GetEdmsAddress,
    CreateTmDrn,
} from "../../common/action";
import { getMoment, GetTRExpiredDefaultDay } from "../../common/utils";
import { DocuDeployModal } from "./docuDeployModal";
import { EdmsTmpDocumentApprovalInfo } from "../../components";

const moment = getMoment();

const tableHeadSize = [0.4, 0.4, 0.6];
const tableHeadType = [1, 1, 0];
const tableHeader = ["문서제목", "파일코드", "파일제목"];
const DEFAULT_STAGES = [
    "Start",
    "IFA Issue",
    "IFA Approval",
    "AFC Issue",
    "AFC Approval",
    "As_Built",
];

export type edmsDocuPublishModalProps = {
    style?: object;
    visible: boolean;
    onClose: () => void;
    checkList: number[];
    state: string;
    wpType?: string;
    tmIdx?: number;
    title?: string;
};
interface FinaledmsDocuPublishModalProps extends edmsDocuPublishModalProps {}

export const EdmsDocuPublishModal: React.FunctionComponent<
    FinaledmsDocuPublishModalProps
> = props => {
    const dispatch = useDispatch();
    const userSelector = useSelector((state: reducerState) => state.user);
    const workSelector = useSelector((state: reducerState) => state.work);
    const fileSelector = useSelector((state: reducerState) => state.files);
    const pjSelector = useSelector((state: reducerState) => state.project);
    const docSelector = useSelector((state: reducerState) => state.document);

    //수신자 리스트
    const [checkList, setCheckList] = useState<number[]>([]);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [docuDeployModalVisible, setDocuDeployModalVisible] = useState<boolean>(false);
    const [TmpApprovalInfoVisible, setTmpApprovalInfoVisible] = useState<boolean>(false);

    const [workList, setWorkList] = useState<any[]>([]);
    const [fileList, setfileList] = useState<any[]>([]);
    const [docuList, setDocuList] = useState<any[]>([]);
    const [receiverList, setReceiverList] = useState<any[]>([]);
    const [wtbIdxList, setWtbIdxList] = useState<number[]>([]);
    // const [receiverNameList, setReceiverNameList] = useState<any[]>([]);

    const [pmId, setPmId] = useState<number>(0);
    const [proNo, setProNo] = useState<number>(1);
    const [state, setState] = useState<string>("");
    const [relay, setRelay] = useState<string>("");
    const [endDate, setEndDate] = useState<Date>();
    const [proCode, setProCode] = useState<number>(0);
    const [stageNo, setStageNo] = useState<number>(0);
    const [content, setContent] = useState<string>("");
    const [gridList, setGridList] = useState<any[]>([]);
    const [revision, setRevision] = useState<number>(0);
    const [workCode, setWorkCode] = useState<string>("");
    const [createBy, setCreateBy] = useState<string>("");
    const [deployUsers, setDeployUsers] = useState<any[]>([]);
    const [gridListKeys, setGridListKeys] = useState<any[]>([]);
    const [approverList, setApproverList] = useState<any[]>([]);
    const [startDate, setStartDate] = useState<Date>(new Date());

    useEffect(() => {
        setCreateBy(userSelector.username);
        dispatch(GetEdmsDocuMasterList());
        dispatch(GetEdmsAddress());
    }, []);

    useEffect(() => {
        if (props.visible) {
            //기한일자 설정
            setEndDate(GetTRExpiredDefaultDay());
            //
        }
    }, [props.visible]);

    // 권한 없는 문서 관련 기능 추가시 사용
    // useEffect(() => {
    //     if (workSelector.document_auth_user != undefined) {
    //         let list: any[] = [];
    //         for (let user of workSelector.document_auth_user) {
    //             list.push(user.create_by);
    //         }
    //         setReceiverNameList(list);
    //         setReceiverList(workSelector.document_auth_user);
    //     }
    // }, [workSelector.document_auth_user]);
    //

    useEffect(() => {
        if (props.title != undefined) setRelay(props.title);
    }, [props.title]);

    useEffect(() => {
        if (pjSelector.now_project_no) {
            setProNo(pjSelector.now_project_no);
        }
        dispatch(GetProjectDetail(pjSelector.now_project_no));
    }, [pjSelector.now_project_no]);

    useEffect(() => {
        if (pjSelector.project_detail) {
            let _data: any = pjSelector.project_detail;

            setProCode(_data.project_code);
        }
    }, [pjSelector.project_detail]);

    useEffect(() => {
        if (docSelector.docu_manager_list && docSelector.docu_manager_list.length > 0) {
            setPmId(docSelector.docu_manager_list[0].id);
        }
    }, [docSelector.docu_manager_list]);

    useEffect(() => {
        if (props.state) {
            dispatch(WorkCode(props.state));
            setState(props.state);
        }
    }, [props.state]);

    useEffect(() => {
        setWorkCode(workSelector.work_code);
    }, [workSelector.work_code]);

    useEffect(() => {
        let _list: any[] = [];
        let _no: any[] = [];
        let _wtb: any[] = [];
        let _docu: any[] = [];
        if (props.checkList.length > 0) {
            props.checkList.map((val: number) => {
                let _data: any = workSelector.work_docu_list.find(
                    (raw: any) => raw.docu_no == val
                );

                if (props.checkList.length != 0 && _data) {
                    _list.push(_data);
                    _no.push({ file_no: _data.file_no, docu_no: _data.docu_no });
                    _wtb.push(_data.wtb_idx);
                    _docu.push(_data.docu_no);
                }
            });
        }
        setStageNo(0);
        setRevision(0);
        setDocuList(_docu);
        setfileList([..._no]);
        setWorkList([..._list]);
        setWtbIdxList([..._wtb]);
    }, [props.checkList]);

    useEffect(() => {
        if (workSelector.create_work_data) {
            dispatch(DeactiveWorkModal());
            dispatch(DeleteTmpBox(wtbIdxList));

            setPmId(0);
            setRelay("");
            setContent("");
            setCheckList([]);
            setDeployUsers([]);
            setApproverList([]);
            setStartDate(new Date());
        }
    }, [workSelector.create_work_data]);

    useEffect(() => {
        if (workList && workList.length > 0) {
            let list = [];

            for (var work of workList) {
                list.push({
                    docu: work.docu_subject,
                    file_code: work.file_code,
                    file_name: work.file_name,
                });
            }

            if (workList[0].auth == 0) dispatch(GetDocumentAuthUser(docuList));

            setGridList([...list]);
            setGridListKeys([...Object.keys(list[0])]);
        }
    }, [workList]);

    const onClickCreate = async () => {
        if (endDate == undefined) return ModalInfo("기한일자를 지정해주세요.");
        if (pmId === userSelector.id) return ModalInfo("다른 승인자를 선택해주세요.");
        if (approverList.length == 0) return ModalInfo("수신자를 선택해 주세요");

        setIsLoading(true);

        let series_no = 12345; // 임시값
        let approverId: any[] = [];
        let now = moment().format("YYYYMM");

        for (let idx of checkList) {
            if (receiverList[idx]) approverId.push(receiverList[idx].user_id);
        }

        if (props.tmIdx) {
            await dispatch(
                CreateTmDrn(
                    startDate,
                    content,
                    endDate,
                    createBy,
                    fileList,
                    [...approverList.map(raw => raw.id)],
                    props.tmIdx,
                    relay
                )
            );
        } else {
            await dispatch(
                CreateWorkProc(
                    state,
                    startDate,
                    proNo,
                    proCode,
                    series_no,
                    now,
                    relay,
                    content,
                    pmId,
                    endDate,
                    createBy,
                    fileList,
                    parseInt(workCode.split("-")[1]),
                    // [...deployUsers.map(raw => raw.id)],
                    [...approverList.map(raw => raw.id)],
                    stageNo,
                    approverId,
                    ""
                )
            );
        }

        setTimeout(() => {
            setIsLoading(false);
            ModalInfo("등록이 완료되었습니다.");
            onClose();
        }, 2000);
    };

    const onCompleteDeplyUsers = (list: any) => {
        setDeployUsers(list);
    };

    const approverDelete = (idx: number) => {
        approverList.splice(idx, 1);
        setApproverList([...approverList]);
    };

    const onCompleteApproverList = (list: any) => {
        setApproverList(list);
    };

    const onClose = () => {
        props.onClose();
    };

    // 권한 없는 문서 관련 기능 추가시 사용
    // const onChangedCheckList = (event: any) => {
    //     const value = event.target.value;
    //     setCheckList(value);
    // };

    // const renderValueCheckList = (selected: any) => {
    //     let _filtered = receiverList.filter((raw, idx) => selected.indexOf(idx) != -1);
    //     return _filtered.map(raw => raw.username ? raw.username : raw.create_by).join(",");
    // };
    //

    return (
        <S.Block open={props.visible ? true : false} onClose={onClose}>
            <S.Inner>
                <LoadingIndicatorComponent open={isLoading} style={{ zIndex: 1301 }} />
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
                <EdmsTmpDocumentApprovalInfo
                    visible={TmpApprovalInfoVisible}
                    onClose={() => setTmpApprovalInfoVisible(false)}
                    onComplete={onCompleteApproverList}
                    approverList={approverList}
                />
                <DocuDeployModal
                    onClose={() => setDocuDeployModalVisible(false)}
                    visible={docuDeployModalVisible}
                    onComplete={onCompleteDeplyUsers}
                    deployUsers={deployUsers}
                />
                <S.ModalHeader>
                    <S.HeaderTitle>업무절차 진행</S.HeaderTitle>
                    <S.ModalCloseBtn onClick={onClose}>
                        <Close style={{fontSize : "1.6em"}} />
                    </S.ModalCloseBtn>
                </S.ModalHeader>

                <S.ModalContentWrap>
                    <S.ModalInputWrap>
                        <S.ModalInputBox>
                            {props.tmIdx == undefined && (
                                <>
                                    <S.InputTitle>워크코드 :</S.InputTitle>
                                    <S.InputItem>{workCode}</S.InputItem>
                                </>
                            )}
                            <S.InputTitle>배포유형 :</S.InputTitle>
                            <S.InputItem>{props.state}</S.InputItem>
                        </S.ModalInputBox>
                        {props.tmIdx == undefined && (
                            <S.ModalInputBox>
                                <S.InputTitle>제 목 :</S.InputTitle>
                                <S.Input value={relay} onChange={e => setRelay(e.target.value)} />
                            </S.ModalInputBox>
                        )}
                        {props.tmIdx != undefined && (
                            <S.ModalInputBox>
                                <S.InputTitle>제 목 :</S.InputTitle>
                                <S.Input value={relay} />
                            </S.ModalInputBox>
                        )}
                        <S.ModalInputBox
                            $boxType={"long"}
                            style={{ position: "relative", height: "auto" }}
                        >
                            <S.InputTitle>수신자 : </S.InputTitle>
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
                            <S.DocBtn onClick={() => setTmpApprovalInfoVisible(true)}>+</S.DocBtn>
                        </S.ModalInputBox>
                        {/* 
                                권한 없는 문서에 권한 요청 수신자 선택 
                                지금은 해당 기능 사용하지 않음                                
                            */}

                        {/* {props.state == `DIN` && (
                                <S.ModalInputBox>
                                    <S.InputTitle>수신자 :</S.InputTitle>
                                    <S.InputSelect
                                        $boxType="receiver"
                                        disableUnderline
                                        onChange={onChangedCheckList}
                                        value={checkList}
                                        multiple
                                        renderValue={renderValueCheckList}
                                    >
                                        {receiverNameList.map((raw: any, idx: number) => {
                                            return (
                                                <S.InputSelectItem
                                                    key={"Recevier" + idx}
                                                    value={idx}
                                                >
                                                    <S.InputSelectIcon>
                                                        <S.InputSelectCheck
                                                            checked={checkList.indexOf(idx) != -1}
                                                        />
                                                    </S.InputSelectIcon>
                                                    <S.InputSelectItemText primary={raw} />
                                                </S.InputSelectItem>
                                            );
                                        })}
                                    </S.InputSelect>
                                </S.ModalInputBox>
                            )} */}
                        <S.ModalInputBox $boxType={"box"}>
                            <WebEditorComponent
                                onChangeContent={html => setContent(html)}
                                editdisabled={false}
                                toolDisabled={false}
                                content="설명을 입력해 주세요"
                            />
                        </S.ModalInputBox>
                        <S.ModalInputBox $boxType={"box"}>
                            <S.GridViewWrap>
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
                            </S.GridViewWrap>
                        </S.ModalInputBox>
                        {props.wpType && props.wpType === "TM" ? (
                            <></>
                        ) : (
                            <S.ModalInputBox>
                                <S.InputTitle>문서단계 :</S.InputTitle>
                                <S.InputSelect
                                    disableUnderline
                                    onChange={(e: any) => setStageNo(e.target.value)}
                                    value={stageNo}
                                >
                                    {DEFAULT_STAGES.map((raw: any, idx: number) => {
                                        return (
                                            <S.InputSelectItem
                                                key={"InputSelectItem" + idx}
                                                value={idx}
                                            >
                                                {raw}
                                            </S.InputSelectItem>
                                        );
                                    })}
                                </S.InputSelect>
                                <S.InputTitle>리비전 :</S.InputTitle>
                                <S.InputNumber
                                    type={"number"}
                                    InputProps={{
                                        disableUnderline: true,
                                        style: {
                                            width: "100%",
                                            height: "100%",
                                        },
                                        inputProps: {
                                            min: 0,
                                            max: stageNo == 3 || stageNo == 4 ? 100 : 0,
                                        },
                                    }}
                                    value={revision}
                                    onChange={e => {
                                        setRevision(parseInt(e.target.value));
                                    }}
                                />
                            </S.ModalInputBox>
                        )}
                        <S.ModalInputBox>
                            <S.InputTitle>적용일자 :</S.InputTitle>
                            <S.InputDate
                                value={moment(startDate).format("YYYY-MM-DD")}
                                onChange={e => setStartDate(moment(e.target.value).toDate())}
                                type="date"
                                style={{ marginRight: "20px" }}
                            />
                            <S.InputTitle>기한일자 :</S.InputTitle>
                            <S.InputDate
                                value={moment(endDate).format("YYYY-MM-DD")}
                                onChange={e => setEndDate(moment(e.target.value).toDate())}
                                type="date"
                            />
                        </S.ModalInputBox>
                        <S.ButtonDiv>
                            <S.ModalBtnContainer>
                                <S.CloseBtn onClick={onClose}>닫기</S.CloseBtn>
                                <S.SaveBtn onClick={onClickCreate}>저장</S.SaveBtn>
                            </S.ModalBtnContainer>
                        </S.ButtonDiv>
                    </S.ModalInputWrap>
                </S.ModalContentWrap>
            </S.Inner>
        </S.Block>
    );
};
