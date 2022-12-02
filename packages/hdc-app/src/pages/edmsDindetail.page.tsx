/******************************************************************************
 * Copyright (c) 2021. Moornmo Inc. Rights reserved.                          *
 * Data modelings and methods used are assets of Moornmo Inc.                 *
 * hooks :
 * useLocations
 * components :
 *
 * last modify : jh.jeong
 *

 ******************************************************************************/
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; // redux

import { useParams } from "react-router-dom";
import { useLocations } from "hooks";
import { reducerState } from "../common";
import { getZipFileByType, getMoment } from "../common/utils";

import {
    GetWorkDocuList,
    UploadDinAttachFiles,
    GetDinAttachFiles,
    DeleteDinAttachFile,
    ChangeNavTitle,
    WorkProcDetail,
} from "../common/action";
import { EdmsProjectBase } from "../components";
import { GridViewComponent } from "components";
import { EdmsDinDeployInfo } from "../components/edmsDinDeployInfo";

import trashSvg from "../images/edms/trash.svg";
import * as S from "../styled/edmsDindetail.styled";
const moment = getMoment();

const tableHeadSize = [0.6, 1, 1, 0.4, 0.4, 0.4, 0.4, 0.4];
const tableType = [1, 0, 0, 1, 1, 1, 1];
const tableHeader = [
    "카테고리",
    "문서코드",
    "문서제목",
    "문서타입",
    "문서단계",
    "생성일",
    "작성자",
    "담당자",
];

const EdmsDinDetailPage = (props: any) => {
    const dispatch = useDispatch();
    const { path, pushHistory } = useLocations();

    const workSelector = useSelector((state: reducerState) => state.work);
    const dinSelector = useSelector((state: reducerState) => state.din);

    const [visibleDeploy, setVisibleDeploy] = useState<boolean>(false);

    const [wpIdx, setWpIdx] = useState<number[]>([]);
    const [procDetail, setProcDetail] = useState<any>({});

    const [wpDate, setWpDate] = useState<string>("");
    const [dueDate, setDueDate] = useState<string>("");
    const [createTm, setCreateTm] = useState<string>("");

    const [files, setFiles] = useState<any[]>([]);
    const [fileInput, setFileInput] = useState<HTMLInputElement | null>(null);
    const [workDocuList, setWorkdocuList] = useState<any[]>([]);
    const [workDocuListKeys, setWorkDocuListKeys] = useState<any[]>([]);
    const [workDeploy, setWorkDeploy] = useState<any[]>([]);
    const [workDeployKey, setWorkDeployKey] = useState<any[]>([]);

    const { wp_idx } = useParams<{ wp_idx: string }>();
    const WpIdx = parseInt(wp_idx);

    useEffect(() => {
        if(path){
            dispatch(GetWorkDocuList([WpIdx]));
            dispatch(GetDinAttachFiles(WpIdx));
            dispatch(WorkProcDetail(WpIdx, "DIN"));
            setWorkDeploy([]);
    
            dispatch(ChangeNavTitle("EDMS - 문서관리 - DIN 상세"));
        }
    }, [path]);

    useEffect(() => {
        if (workSelector.work_proc_detail && workSelector.work_proc_detail != []) {
            setProcDetail(workSelector.work_proc_detail);
        }
    }, [workSelector.work_proc_detail]);

    useEffect(() => {
        if (
            procDetail != {} &&
            procDetail.wp_date != undefined &&
            procDetail.due_date != undefined &&
            procDetail.create_tm != undefined
        ) {
            setWpIdx(procDetail.wp_idx);
            setWpDate(moment(procDetail.wp_date).format("YYYY-MM-DD"));
            setDueDate(moment(procDetail.due_date).format("YYYY-MM-DD"));
            setCreateTm(moment(procDetail.create_tm).format("YYYY-MM-DD"));
        }
    }, [procDetail]);

    useEffect(() => {
        if (dinSelector.get_din_attach_files && dinSelector.get_din_attach_files.length > 0) {
            setFiles([...dinSelector.get_din_attach_files]);
        }
    }, [dinSelector.get_din_attach_files]);

    useEffect(() => {
        if (dinSelector.uploaded_attach_files && dinSelector.uploaded_attach_files.length > 0) {
            setFiles([...dinSelector.uploaded_attach_files]);
        }
    }, [dinSelector.uploaded_attach_files]);

    useEffect(() => {
        if (workSelector.work_deploy) {
            let values = [];

            for (var d of workSelector.work_deploy) {
                values.push({
                    is_read: d.is_read ? "읽음" : "읽기 전",
                    user_name: d.username,
                    chk_dt: d.check_date,
                });
            }
            setWorkDeploy(values);

            if (values.length > 0) setWorkDeployKey(Object.keys(values[0]));
        }
    }, [workSelector.work_deploy]);

    useEffect(() => {
        if (workSelector.work_docu_list && workSelector.work_docu_list.length > 0) {
            let _docus = [];

            for (var work of workSelector.work_docu_list) {
                _docus.push({
                    cate: work.cate_name,
                    docu_code: work.docu_code,
                    docu_subject: work.docu_subject,
                    docu_type: get_file_type(work.docu_type),
                    stage_code: work.stage_code,
                    create_tm: moment(work.create_tm).format("YYYY-MM-DD"),
                    create_by: work.create_by,
                    username: work.user_name,
                });
            }

            setWorkdocuList([..._docus]);
            setWorkDocuListKeys([...Object.keys(_docus[0])]);
        } else {
            setWorkdocuList([]);
            setWorkDocuListKeys([]);
        }
    }, [workSelector.work_docu_list]);

    const onCloseModal = () => {
        setVisibleDeploy(false);
    };

    const onClickMove = () => {
        pushHistory("/edms/workproc/din");
    };

    const onClickUploadFile = () => {
        if (fileInput) fileInput.click();
    };

    const handleUploadClick = async (event: any) => {
        var files = event.target.files;
        if (files) await dispatch(UploadDinAttachFiles(files, wpIdx));
    };

    const onClickDeleteFile = async (idx: number) => {
        if (files.length > idx && files[idx]) {
            await dispatch(DeleteDinAttachFile(files[idx].wat_idx));
            files.splice(idx, 1);
            setFiles([...files]);
        }
    };

    const onClickZipDownload = async () => {
        let ids = [procDetail.wp_idx];
        await getZipFileByType("work", "DIN압축", ids);
    };

    const onComplete = async (list: any[]) => {};

    const get_file_type = (file_type: string) => {
        switch (file_type) {
            case "001":
                return "도면";
            case "002":
                return "PDF";
            case "003":
                return "문서";
            default:
                return "파일이 없습니다.";
        }
    };

    return (
        <>
            <EdmsDinDeployInfo
                visible={visibleDeploy}
                onClose={onCloseModal}
                onComplete={onComplete}
            />
            <EdmsProjectBase>
                <S.Contents>
                    <S.TopDiv>
                        <S.DetailBtnWrap>DIN 상세</S.DetailBtnWrap>
                    </S.TopDiv>
                    <S.DetailContentWrap>
                        <S.DetailContentsHeader>
                            <S.DetailTitle>
                                {procDetail.wp_code === undefined ? "-" : procDetail.wp_code} /{" "}
                                {procDetail.subject === null ? "-" : procDetail.subject}
                            </S.DetailTitle>
                            <S.DinDetailBtnContainer>
                                <S.DinDetailBtn
                                    className="din_detail_btn_list"
                                    onClick={onClickMove}
                                >
                                    <img src="assets/images/edms/list.svg" alt="" />
                                    목록
                                </S.DinDetailBtn>
                                <S.DinDetailBtn className="din_detail_btn_print">
                                    <img src="assets/images/edms/print.svg" alt="" />
                                    출력
                                </S.DinDetailBtn>
                                <S.DinDetailBtn className="din_detail_btn_edit">
                                    <img src="assets/images/edms/edit.svg" alt="" />
                                    수정
                                </S.DinDetailBtn>
                                <S.DinDetailBtn className="din_detail_btn_del">
                                    <img src="assets/images/edms/trash-white.svg" alt="" />
                                    삭제
                                </S.DinDetailBtn>
                                <S.DinDetailBtn
                                    className="din_detail_btn_download"
                                    onClick={onClickZipDownload}
                                >
                                    <img src="assets/images/edms/download.svg" alt="" />
                                    ZIP 파일 다운로드
                                </S.DinDetailBtn>
                            </S.DinDetailBtnContainer>
                        </S.DetailContentsHeader>

                        {/* <DinApprovalBoxComp /> */}

                        <S.MiddleDiv>
                            <S.DinDetailCopyboxContainer>
                                <S.DinDetailInnerHeader>참조해주세요</S.DinDetailInnerHeader>
                                <S.DinDetailInnerContentsBox>
                                    <S.DinDetailInnerInfoList>
                                        <S.DinDetailInnerInfoListTitle>
                                            배포 타입 :
                                        </S.DinDetailInnerInfoListTitle>
                                        <S.DinDetailInnerInfoListDetailInfo>
                                            {procDetail.wp_type === null ? "-" : procDetail.wp_type}
                                        </S.DinDetailInnerInfoListDetailInfo>
                                    </S.DinDetailInnerInfoList>
                                    <S.DinDetailInnerInfoList>
                                        <S.DinDetailInnerInfoListTitle>
                                            작성일 :
                                        </S.DinDetailInnerInfoListTitle>
                                        <S.DinDetailInnerInfoListDetailInfo>
                                            {createTm === "" ? "-" : createTm}
                                        </S.DinDetailInnerInfoListDetailInfo>
                                    </S.DinDetailInnerInfoList>
                                    <S.DinDetailInnerInfoList>
                                        <S.DinDetailInnerInfoListTitle>
                                            시작일 :
                                        </S.DinDetailInnerInfoListTitle>
                                        <S.DinDetailInnerInfoListDetailInfo>
                                            {wpDate === "" ? "-" : wpDate}
                                        </S.DinDetailInnerInfoListDetailInfo>
                                    </S.DinDetailInnerInfoList>
                                    <S.DinDetailInnerInfoList>
                                        <S.DinDetailInnerInfoListTitle>
                                            종료일 :
                                        </S.DinDetailInnerInfoListTitle>
                                        <S.DinDetailInnerInfoListDetailInfo>
                                            {dueDate === "" ? "-" : dueDate}
                                        </S.DinDetailInnerInfoListDetailInfo>
                                    </S.DinDetailInnerInfoList>
                                    <S.DinDetailInnerInfoList>
                                        <S.DinDetailInnerInfoListTitle>
                                            요청자 :
                                        </S.DinDetailInnerInfoListTitle>
                                        <S.DinDetailInnerInfoListDetailInfo>
                                            {procDetail.create_by === null
                                                ? "-"
                                                : procDetail.create_by}
                                        </S.DinDetailInnerInfoListDetailInfo>
                                    </S.DinDetailInnerInfoList>
                                    <S.DinDetailInnerInfoList>
                                        <S.DinDetailInnerInfoListTitle>
                                            승인일 :
                                        </S.DinDetailInnerInfoListTitle>
                                        <S.DinDetailInnerInfoListDetailInfo>
                                            미승인 상태
                                        </S.DinDetailInnerInfoListDetailInfo>
                                    </S.DinDetailInnerInfoList>
                                    <S.DinDetailInnerInfoList>
                                        <S.DinDetailInnerInfoListTitle>
                                            상세내용 :
                                        </S.DinDetailInnerInfoListTitle>
                                        <S.DinDetailInnerInfoListDetailInfo>
                                            {procDetail.explan === "" ? (
                                                "-"
                                            ) : (
                                                <div
                                                    dangerouslySetInnerHTML={{
                                                        __html: procDetail.explan,
                                                    }}
                                                ></div>
                                            )}
                                        </S.DinDetailInnerInfoListDetailInfo>
                                    </S.DinDetailInnerInfoList>
                                </S.DinDetailInnerContentsBox>
                            </S.DinDetailCopyboxContainer>

                            <input
                                multiple
                                accept="*"
                                id="contained-button-file"
                                type="file"
                                style={{ display: "none" }}
                                onChange={handleUploadClick}
                                ref={ref => setFileInput(ref)}
                            />
                            <S.MiddleFileDiv>
                                <S.DinDetailCopyFileBox>
                                    <S.DinDetailInnerHeader>
                                        참조파일 - {files.length}
                                    </S.DinDetailInnerHeader>
                                    <S.DinDetailCopyFileBoxList>
                                        {files.length > 0 &&
                                            files.map((raw: any, idx) => {
                                                return (
                                                    <S.DinDetailCopyFileBoxListItem
                                                        key={raw.file_name}
                                                    >
                                                        <S.DinDetailCopyFileBoxListItemText>
                                                            {raw.file_name}
                                                        </S.DinDetailCopyFileBoxListItemText>
                                                        <S.UploadListItemDeleteBtn
                                                            onClick={() => onClickDeleteFile(idx)}
                                                        >
                                                            <img src={trashSvg} />
                                                        </S.UploadListItemDeleteBtn>
                                                    </S.DinDetailCopyFileBoxListItem>
                                                );
                                            })}
                                    </S.DinDetailCopyFileBoxList>
                                </S.DinDetailCopyFileBox>
                                <S.DinDetailCopyFileChooseBox>
                                    <S.DinDetailFileBox>
                                        <S.DinDetailFileChooseBtn onClick={onClickUploadFile}>
                                            <img src="assets/images/edms/download-black.svg" />
                                            파일 선택
                                        </S.DinDetailFileChooseBtn>
                                    </S.DinDetailFileBox>
                                </S.DinDetailCopyFileChooseBox>
                            </S.MiddleFileDiv>
                        </S.MiddleDiv>

                        <S.BottomDiv>
                            <S.DinDetailTargetDocuBox>
                                <S.DinDetailGridViewHeader>
                                    배포 대상 문서 목록
                                </S.DinDetailGridViewHeader>
                                <S.GridViewWrap>
                                    <GridViewComponent
                                        fullData={workDocuList}
                                        titles={tableHeader}
                                        datatype={tableType}
                                        keys={workDocuListKeys}
                                        values={workDocuList}
                                        keysWidth={tableHeadSize}
                                        rowClass="background-color-white color-light-black"
                                        headerClass="background-dark-sky-blue color-white align-center"
                                    />
                                </S.GridViewWrap>
                            </S.DinDetailTargetDocuBox>
                        </S.BottomDiv>
                    </S.DetailContentWrap>
                </S.Contents>
            </EdmsProjectBase>
        </>
    );
};

export default EdmsDinDetailPage;
