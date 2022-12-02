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
import { LoadingIndicatorComponent, ModalInfo, ToastComponent } from "components";
import { EdmsTmpDocumentApprovalInfo, EdmsTmEmailSendModal } from "../../components";
//
import { getMoment, GetTRExpiredDefaultDay } from "../../common/utils";
import {
    TmReply,
    GetOriginalTmCode,
    GetTmCode,
    TmVersionFileList,
    TrNoExamine,
} from "../../common/action";

import * as S from "./styled";

import trashSvg from "../../images/edms/trash.svg";
import Close from "@material-ui/icons/Close";

const moment = getMoment();

export type edmsReplyTmModalProps = {
    style?: object;
    visible: boolean;
    onClose: () => void;
    checkList: number[];
    state: string;
    workList?: any;
    originalTm?: number;
    fileList: any[];
    wpIdx: number;
    docuNoList: any[];
    isReSend?: boolean;
};
interface FinaledmsReplyTmModalProps extends edmsReplyTmModalProps {}

export const EdmsReplyTmModal: React.FunctionComponent<FinaledmsReplyTmModalProps> = props => {
    const dispatch = useDispatch();

    const tmSelector = useSelector((state: reducerState) => state.tm);
    const userSelector = useSelector((state: reducerState) => state.user);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isFilesUpload, setIsFilesUpload] = useState<boolean>(false);
    const [TmpApprovalInfoVisible, setTmpApprovalInfoVisible] = useState<boolean>(false);

    const [endDate, setEndDate] = useState<Date>();
    const [originalTm, setOriginalTm] = useState<number>(-1);
    const [approverList, setApproverList] = useState<any[]>([]);
    const [approverIdList, setApproverIdList] = useState<any[]>([]);
    const [newTmCode, setNewTmCode] = useState<string>("");
    const [emailList, setEmailList] = useState<any[]>([]);
    const [emailIdList, setEmailIdList] = useState<any[]>([]);
    const [TmEmailSendVisible, setTmEmailSendVisible] = useState<boolean>(false);
    const [editTmNoType, setEditTmNoType] = useState<number>(0);
    const [visibleToast, setVisibleToast] = useState<boolean>(false);

    const [files, setFiles] = useState<any[]>([]);
    const [filesType, setFilesType] = useState<any[]>([]);
    const [fileUpload, setFileUpload] = useState<HTMLInputElement | null>(null);

    useEffect(() => {
        if (props.visible) {
            if (newTmCode == "") setIsLoading(true);
            dispatch(GetOriginalTmCode(props.originalTm));
            dispatch(TmVersionFileList(props.wpIdx, props.docuNoList[0]));
            if (props.originalTm) setOriginalTm(props.originalTm);
            //기한일자 설정
            setEndDate(GetTRExpiredDefaultDay());
        }
    }, [props.visible]);

    useEffect(() => {
        if (tmSelector.tm_version_file_list && tmSelector.tm_version_file_list.length > 0) {
            let companyName = "";
            if (userSelector.groupname) companyName = userSelector.groupname.split(" ")[0];
            let file_no = tmSelector.tm_version_file_list[0].file_no;

            dispatch(GetTmCode(true, companyName, file_no));
        }
    }, [tmSelector.tm_version_file_list]);

    useEffect(() => {
        let now_tm_code = tmSelector.tm_code;
        if (now_tm_code && now_tm_code.length > 0) {
            setNewTmCode(now_tm_code);
            setIsLoading(false);
        }
    }, [tmSelector.tm_code]);

    useEffect(() => {
        if (files.length != 0) setIsFilesUpload(true);
        else setIsFilesUpload(false);
    }, [files]);

    useEffect(() => {
        if (tmSelector.tr_no_examine) {
            setIsLoading(false);
            setEditTmNoType(0);
        } else if (tmSelector.tr_no_examine == false) {
            setIsLoading(false);
            setVisibleToast(true);
            setTimeout(() => {
                setVisibleToast(false);
            }, 2000);
        }
    }, [tmSelector.tr_no_examine]);

    const onClose = () => {
        setIsFilesUpload(false);

        props.onClose();
    };

    // 저장
    const onClickCreate = async () => {
        if (endDate == undefined) return ModalInfo("기한일자를 지정해 주세요.");
        else if (approverIdList.length == 0) return ModalInfo("결재자를 선택해 주세요.");

        setIsLoading(true);
        await dispatch(
            TmReply(
                files,
                endDate,
                approverIdList,
                originalTm,
                emailIdList,
                newTmCode,
                props.isReSend
            )
        );

        setTimeout(() => {
            setIsLoading(false);
            ModalInfo("등록이 완료되었습니다.");
            onClose();
        }, 1000);
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

    const approverDelete = (idx: number) => {
        approverList.splice(idx, 1);
        setApproverList([...approverList]);
    };

    const onCompleteEmailList = (list: any) => {
        let idList: any[] = [];

        for (let l of list) {
            idList.push(l.id);
        }

        setEmailList(list);
        setEmailIdList(idList);
    };

    const emailSendDelete = (idx: number) => {
        emailList.splice(idx, 1);
        setEmailList([...emailList]);
    };

    const onClickEditTmNoType = () => {
        if (editTmNoType == 0) {
            setEditTmNoType(1);
        } else {
            if (newTmCode != "") {
                setIsLoading(true);
                dispatch(TrNoExamine(newTmCode));
            } else {
                setVisibleToast(true);
                setTimeout(() => {
                    setVisibleToast(false);
                }, 2000);
            }
        }
    };

    if (props.visible == false) return <></>;
    return (
        <NewWindow
            title="TR 회신절차 진행"
            onUnload={props.onClose}
            features={{ width: 640, height: 540 }}
        >
            <S.Block>
                <ToastComponent
                    text={`중복된 TR.No. 입니다.`}
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
                    <EdmsTmpDocumentApprovalInfo
                        visible={TmpApprovalInfoVisible}
                        onClose={() => setTmpApprovalInfoVisible(false)}
                        onComplete={onCompleteApproverList}
                        approverList={approverList}
                    />

                    <EdmsTmEmailSendModal
                        visible={TmEmailSendVisible}
                        onClose={() => setTmEmailSendVisible(false)}
                        onComplete={onCompleteEmailList}
                        approverList={emailList}
                    />

                    <LoadingIndicatorComponent open={isLoading} style={{ zIndex: 1301 }} />
                    <S.ModalHeader>
                        <S.HeaderTitle>회신절차 진행</S.HeaderTitle>
                        <S.ModalCloseBtn onClick={onClose}>
                            <Close style={{ fontSize: "3em" }} />
                        </S.ModalCloseBtn>
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
                                        {newTmCode}
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
                                        value={newTmCode}
                                        onChange={e => setNewTmCode(e.target.value)}
                                    />
                                )}
                                {newTmCode != "" && (
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

                            <S.ModalInputBox>
                                <S.InputTitle>기한일자 :</S.InputTitle>
                                <S.InputDate
                                    value={moment(endDate).format("YYYY-MM-DD")}
                                    onChange={e => setEndDate(moment(e.target.value).toDate())}
                                    type="date"
                                />
                            </S.ModalInputBox>

                            <S.ModalInputBox>
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
                                <S.DocBtn
                                    $boxType="receiver"
                                    onClick={() => setTmpApprovalInfoVisible(true)}
                                >
                                    +
                                </S.DocBtn>
                            </S.ModalInputBox>
                            <S.ModalInputBox>
                                <S.InputTitle>메일 수신자 : </S.InputTitle>
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
                                    <S.EmptyBox>
                                        <S.DocBtn onClick={onClickUploadFlie}>+</S.DocBtn>
                                    </S.EmptyBox>
                                ) : (
                                    <S.UploadList>
                                        <S.UploadListFristItem>첨부된 파일</S.UploadListFristItem>
                                        <S.UploadListInner>
                                            {files.map((raw: any, idx) => {
                                                return (
                                                    <S.UploadListItem key={idx}>
                                                        <S.UploadListItemText>
                                                            <a>{raw.name}</a>
                                                        </S.UploadListItemText>
                                                        <S.UploadListItemDeleteBtn
                                                            onClick={() => onClickDeleteFile(idx)}
                                                        >
                                                            <img src={trashSvg} />
                                                        </S.UploadListItemDeleteBtn>
                                                    </S.UploadListItem>
                                                );
                                            })}
                                        </S.UploadListInner>
                                    </S.UploadList>
                                )}
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
};
