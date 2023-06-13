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
    ToastComponent,
} from "components";
import { EdmsDocuManagerAdd, CustomGroupManage } from "../";
import NewWindow from "react-new-window";
//
// Module
import * as S from "./styled";
import Close from "@material-ui/icons/Close";
import { reducerState } from "../../common/store";
import {
    GetEdmsDocuMasterList,
    GetEdmsGroup,
    DeployTmDrn,
    DeployTmDrnClean,
    UpdateSendRecvBox,
    GetCountPingEdms,
} from "../../common/action";
import { getMoment, GetTRExpiredDefaultDay } from "../../common/utils";

const moment = getMoment();

const tableHeadSize = [0.3, 0.8, 0.2, 0.2];
const tableHeadType = [1, 0, 1, 1];
const tableHeader = ["문서코드", "문서제목", "회사", "담당자"];

export type edmsDrnDistributeModalProps = {
    style?: object;
    visible: boolean;
    onClose: () => void;
    wpIdxList: number[];
    title: string[];
    selectedWpIdxList: number[];
    unreadWorksData: any[];
};
interface FinaledmsDrnDistributeModalProps extends edmsDrnDistributeModalProps {}

export const EdmsDrnDistributeModal: React.FunctionComponent<
    FinaledmsDrnDistributeModalProps
> = props => {
    const dispatch = useDispatch();
    const workSelector = useSelector((state: reducerState) => state.work);
    const orgSelector = useSelector((state: reducerState) => state.organization);
    const userSelector = useSelector((state: reducerState) => state.user);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [workList, setWorkList] = useState<any[]>([]);

    const [relay, setRelay] = useState<string>("");
    const [endDate, setEndDate] = useState<Date>();
    const [gridList, setGridList] = useState<any[]>([]);
    const [gridListKeys, setGridListKeys] = useState<any[]>([]);
    //approval
    const [check, setCheck] = useState<string>("");
    const [comment, setComment] = useState<string>("");
    const [docuManagerList, setDocuManagerList] = useState<any[]>([]);
    const [docuManagerIdList, setDocuManagerIdList] = useState<any[]>([]);
    //mail group
    const [mailGroupList, setMailGroupList] = useState<any[]>([]);
    const [selectedMailGroupIds, setSelectedMailGroupIds] = useState<number[]>([]);
    //
    const [managerNameBooleanList, setManagerNameBooleanList] = useState<any[]>([]);
    const [docuManagerVisible, setDocuManagerVisible] = useState<boolean>(false);
    const [buttonCount, setButtonCount] = useState<any[]>([]);
    const [selectBtnIdx, setSelectBtnIdx] = useState<number>(-1);
    const [groupUserList, setGuoupUserList] = useState<any[]>([]);
    //toast
    const [visibleToast, setVisibleToast] = useState<boolean>(false);
    const [toastMsg, setToastMsg] = useState<string>("");

    useEffect(() => {
        dispatch(GetEdmsDocuMasterList());
        dispatch(GetEdmsGroup(userSelector.company, true));
        //기한일자 설정
        setEndDate(GetTRExpiredDefaultDay());
        //
        let count = window.localStorage.getItem("Company_Email_Count");
        if (count) {
            let button = count.length > 0 ? count.split(",") : [];
            setButtonCount(button);
        }
    }, []);

    useEffect(() => {
        let groups = orgSelector.edms_group;
        if (groups && groups.length > 0) {
            setMailGroupList([...groups]);
        }
    }, [orgSelector.edms_group]);

    useEffect(() => {
        if (props.title.length > 0) {
            setRelay(props.title[0]);
        }
    }, [props.title]);

    useEffect(() => {
        if (workSelector.work_docu_list && workSelector.work_docu_list.length > 0) {
            setWorkList(workSelector.work_docu_list);
        }
    }, [workSelector.work_docu_list]);

    useEffect(() => {
        if (workList && workList.length > 0) {
            let list = [];
            let name_list = [];

            for (var work of workList) {
                name_list.push(work.user_name != "" ? true : false);
                list.push({
                    docu_code: work.docu_code,
                    docu: work.docu_subject,
                    company: work.company,
                    username: work.user_name,
                });
            }
            setManagerNameBooleanList(name_list);
            setGridList([...list]);
            setGridListKeys([...Object.keys(list[0])]);
        }
    }, [workList]);

    useEffect(() => {
        if (workSelector.create_deploy != null) {
            dispatch(DeployTmDrnClean());
            if (workSelector.create_deploy) {
                const is_approve = check == "approve";
                setToastMsg(is_approve ? "접수 및 배포 완료" : "반려 처리 되었습니다");
                setVisibleToast(true);
                setTimeout(() => {
                    setIsLoading(false);
                    onClose();
                }, 1500);
            }
        }
    }, [workSelector.create_deploy]);

    const onClickCreate = async () => {
        const is_approve = check == "approve";
        if (is_approve && endDate == undefined) {
            setToastMsg("기한일자를 지정해주세요.");
            return setVisibleToast(true);
        }
        if (managerNameBooleanList.indexOf(false) != -1 && docuManagerList.length == 0) {
            setToastMsg("문서 담당자가 존재하지 않는 문서가 존재합니다.");
            return setVisibleToast(true);
        }

        if (props.selectedWpIdxList.length > 0) {
            dispatch(UpdateSendRecvBox(props.selectedWpIdxList));
            dispatch(GetCountPingEdms());
        }

        setIsLoading(true);
        for (var wp_idx of props.wpIdxList) {
            await dispatch(
                DeployTmDrn(
                    wp_idx,
                    endDate,
                    is_approve,
                    comment,
                    docuManagerIdList,
                    selectedMailGroupIds
                )
            );
        }
    };

    const onClose = () => {
        props.onClose();
    };

    const onClickRow = async (idx: number) => {
        setRelay(props.title[idx]);
    };

    const docuManagerDelete = (idx: number) => {
        docuManagerList.splice(idx, 1);
        docuManagerIdList.splice(idx, 1);

        setDocuManagerIdList([...docuManagerIdList]);
        setDocuManagerList([...docuManagerList]);
    };

    const onCompleteAddList = (list: any) => {
        let idList: any[] = [];

        for (let id of list) {
            idList.push(id.id);
        }

        setDocuManagerIdList(idList);
        setDocuManagerList(list);
    };

    const onClickMailGroup = (groupId: number) => {
        let findIdx = selectedMailGroupIds.indexOf(groupId);
        if (findIdx != -1) selectedMailGroupIds.splice(findIdx, 1);
        else selectedMailGroupIds.push(groupId);

        setSelectedMailGroupIds([...selectedMailGroupIds]);
    };

    if (props.visible == false) return <></>;
    return (
        <NewWindow
            title="접수 및 배포"
            onUnload={props.onClose}
            features={{ width: 720, height: 900 }}
        >
            <ToastComponent
                text={toastMsg}
                close={() => setVisibleToast(false)}
                visible={visibleToast}
                type={"warning"}
                style={{ position: "absolute", bottom: 100, right: 100, alignItems: "center" }}
                duration={2000}
            />
            <EdmsDocuManagerAdd
                visible={docuManagerVisible}
                onClose={() => setDocuManagerVisible(false)}
                onComplete={onCompleteAddList}
                addList={docuManagerList}
            />
            <S.Block>
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

                    <S.ModalHeader>
                        <S.HeaderTitle>접수및배포 진행</S.HeaderTitle>
                        <S.ModalCloseBtn onClick={onClose}>
                            <Close style={{ fontSize: "3em" }} />
                        </S.ModalCloseBtn>
                    </S.ModalHeader>

                    <S.ModalContentWrap>
                        <S.ModalInputWrap>
                            {props.title.length > 0 && (
                                <S.ModalInputBox>
                                    <S.InputTitle>(자동생성) 제 목 :</S.InputTitle>
                                    <S.Input value={relay} />
                                </S.ModalInputBox>
                            )}
                            <S.ModalInputBox $boxType={"box"}>
                                <S.GridViewWrap>
                                    <GridViewComponent
                                        fullData={gridList}
                                        titles={tableHeader}
                                        keys={gridListKeys}
                                        values={gridList}
                                        keysWidth={tableHeadSize}
                                        datatype={tableHeadType}
                                        onClickRow={onClickRow}
                                        rowClass="background-color-parent color-light-black"
                                        headerClass="background-dark-sky-blue color-white align-center"
                                    />
                                </S.GridViewWrap>
                            </S.ModalInputBox>
                            <S.ModalInputBox $boxType="half">
                                <S.InputTitle>접수 여부 선택 : </S.InputTitle>
                                <S.CheckboxBlockIn
                                    checked={check == "approve"}
                                    onChange={e => setCheck("approve")}
                                />
                                승인
                                <S.CheckboxBlockIn
                                    checked={check == "reject"}
                                    onChange={e => setCheck("reject")}
                                />
                                반려
                            </S.ModalInputBox>
                            <div style={{ display: check == "approve" ? "block" : "none" }}>
                                <S.ModalInputBox $boxType="half">
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
                                    <S.InputTitle>추가담당자 : </S.InputTitle>
                                    <S.DeployUserBlock>
                                        {docuManagerList.map((data: any, idx: number) => {
                                            return (
                                                <S.DocChip key={data.username}>
                                                    <S.ChipBlock
                                                        variant={"outlined"}
                                                        label={data.username}
                                                        onDelete={() => docuManagerDelete(idx)}
                                                    />
                                                </S.DocChip>
                                            );
                                        })}
                                    </S.DeployUserBlock>
                                    <S.DocBtn onClick={() => setDocuManagerVisible(true)}>
                                        +
                                    </S.DocBtn>
                                </S.ModalInputBox>
                                <S.ModalInputBox style={{flexWrap : "wrap"}}>
                                    <S.InputTitle>메일 그룹(선택) : </S.InputTitle>
                                    {mailGroupList.map((raw, idx) => {
                                        return (
                                            <S.ChipBlock
                                                style={
                                                    selectedMailGroupIds.indexOf(raw.id) != -1
                                                        ? { backgroundColor: "#FF9800" }
                                                        : {}
                                                }
                                                variant={"outlined"}
                                                label={raw.group_name}
                                                onClick={() => onClickMailGroup(raw.id)}
                                            />
                                        );
                                    })}
                                </S.ModalInputBox>
                            </div>
                            <div style={{ display: check == "reject" ? "block" : "none" }}>
                                <S.ModalInputBox $boxType="half-box">
                                    <S.InputTitle>반려사유를 입력해 주세요(선택사항)</S.InputTitle>
                                    <S.CommentInput
                                        InputProps={{
                                            disableUnderline: true,
                                            style: {
                                                height: "100%",
                                                border: "1px solid #999999",
                                                padding: "10px",
                                            },
                                            placeholder: "반려사유",
                                        }}
                                        variant="standard"
                                        value={comment}
                                        onChange={e => setComment(e.target.value)}
                                        type="text"
                                        inputProps={{ style: { height: "100%" } }}
                                        multiline
                                    />
                                </S.ModalInputBox>
                            </div>
                            <S.ButtonDiv>
                                <S.ModalBtnContainer>
                                    <S.CloseBtn onClick={onClose}>닫기</S.CloseBtn>
                                    <S.SaveBtn onClick={onClickCreate}>확인</S.SaveBtn>
                                </S.ModalBtnContainer>
                            </S.ButtonDiv>
                        </S.ModalInputWrap>
                    </S.ModalContentWrap>
                </S.Inner>
            </S.Block>
        </NewWindow>
    );
};
