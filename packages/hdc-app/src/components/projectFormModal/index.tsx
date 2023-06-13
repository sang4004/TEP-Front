/******************************************************************************
 * appwrapper/index.tsx
 * hooks :
 * useLocations
 *
 ******************************************************************************/
// Library
import React, { useRef, useState, useEffect } from "react"; // default hooks
import { Editor, EditorTools } from "@progress/kendo-react-editor";
//
// Module
import * as S from "./styled";
import Close from "@material-ui/icons/Close";
import { useDispatch, useSelector } from "react-redux";
import { CreateProject, DeactiveModal, GetAllList } from "../../common/action";
import { LoadingIndicatorComponent, ModalInfo } from "components";
import { reducerState } from "../../common/store";
import { getMoment } from "../../common/utils";
import {
    DeactiveProjModal,
    GetEdmsProgProjectList,
    EditProject,
} from "../../common/action/project";

const moment = getMoment();

export type projectFromModalProps = {
    style?: object;
    visible: boolean;
    isEdit?: number;
    onClose: () => void;
    checkList?: number[];
};
interface FinalprojectFromModalProps extends projectFromModalProps {}

const {
    Bold,
    Strikethrough,
    Subscript,
    Superscript,
    AlignLeft,
    AlignCenter,
    AlignRight,
    AlignJustify,
    Indent,
    Outdent,
    OrderedList,
    UnorderedList,
    Undo,
    Redo,
    FontName,
    FormatBlock,
    InsertImage,
} = EditorTools;

export const ProjectFromModalComp: React.FunctionComponent<FinalprojectFromModalProps> = props => {
    const dispatch = useDispatch();
    const editorRef = useRef(null);
    const projSelector = useSelector((state: reducerState) => state.project);
    const userSelector = useSelector((state: reducerState) => state.user);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [projectManagers, setProjectManagers] = useState<any[]>([]);

    const [projectList, setProjectList] = useState<any[]>([]);

    const [parentProjectNo, setParentProjectNo] = useState<number>(-1);
    const [code, setCode] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [partnerName, setPartnerName] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [projState, setProjState] = useState<number>(0);
    const [pmId, setPmId] = useState<number>(0);
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());
    const [projectNo, setProjectNo] = useState<number>(0);
    const [createBy, setCreateBy] = useState<string>("");
    const [partnerCompany, setPartnerCompany] = useState<string>("");

    useEffect(() => {
        if (projSelector.project_list) {
            setProjectList([...projSelector.project_list]);
        }
    }, [projSelector.project_list]);

    useEffect(() => {
        if (projSelector.project_manager_list && projSelector.project_manager_list.length > 0) {
            setProjectManagers([...projSelector.project_manager_list]);
        }
    }, [projSelector.project_manager_list]);

    useEffect(() => {
        if (projSelector.create_project_data) {
            dispatch(DeactiveProjModal());
            dispatch(GetEdmsProgProjectList());
            dispatch(GetAllList());
            setTimeout(() => {
                setIsLoading(false);
                ModalInfo("프로젝트 등록이 완료되었습니다.");
                props.onClose();
            }, 2000);
            setCode("");
            setTitle("");
            setPartnerName("");
            setContent("");
            setProjState(0);
            setPmId(0);
            setStartDate(new Date());
            setEndDate(new Date());
        }
    }, [projSelector.create_project_data]);

    useEffect(() => {
        if (projSelector.edit_project_data) {
            dispatch(DeactiveProjModal());
            dispatch(GetEdmsProgProjectList());
            dispatch(GetAllList());
            setTimeout(() => {
                setIsLoading(false);
                ModalInfo("프로젝트 수정이 완료되었습니다.");
                props.onClose();
            }, 2000);
        }
    }, [projSelector.edit_project_data]);

    useEffect(() => {
        if (props.checkList && props.isEdit == 1) {
            if (props.checkList.length > 0) {
                props.checkList.map((val: number) => {
                    let _data: any = projSelector.get_prog_project_list[val];
                    setCode(_data.project_code);
                    setTitle(_data.project_name);
                    setContent(_data.explan);
                    setProjState(_data.state);
                    setStartDate(_data.start_dt);
                    setEndDate(_data.end_dt);
                    setProjectNo(_data.project_no);
                    setParentProjectNo(_data.p_project_no);
                    setPmId(_data.pm);
                });
            }
        } else if (props.isEdit == 0) {
            let now = new Date();
            setCode("");
            setTitle("");
            setContent("");
            setProjState(0);
            setStartDate(new Date());
            setEndDate(new Date(now.setMonth(now.getMonth() + 1)));
            setProjectNo(0);
            setParentProjectNo(-1);
            setPmId(0);
        }
    }, [props.isEdit, props.checkList]);

    useEffect(() => {
        setCreateBy(userSelector.username);
    }, []);

    const onClose = () => {
        props.onClose();
    };

    const onClickCreate = async () => {
        if (title.length == 0) return ModalInfo("프로젝트 명을 입력해주세요.");
        if (code.length == 0) return ModalInfo("프로젝트 코드를 입력해주세요.");

        setIsLoading(true);
        await dispatch(
            CreateProject(
                code,
                title,
                content,
                pmId,
                projState,
                startDate,
                endDate,
                parentProjectNo,
                createBy,
                partnerCompany
            )
        );
    };

    const onClickEdit = async () => {
        if (title.length == 0) return ModalInfo("프로젝트 명을 입력해주세요.");
        if (code.length == 0) return ModalInfo("프로젝트 코드를 입력해주세요.");

        setIsLoading(true);
        await dispatch(
            EditProject(
                projectNo,
                code,
                title,
                content,
                pmId,
                projState,
                startDate,
                endDate,
                parentProjectNo,
                createBy,
                partnerCompany
            )
        );
    };

    return (
        <>
            <S.Block open={props.visible ? true : false} onClose={props.onClose}>
                <S.Inner>
                    <LoadingIndicatorComponent open={isLoading} style={{ zIndex: 1301 }} />
                    <S.ModalHeader>
                        <S.HeaderTitle>
                            {props.isEdit ? "프로젝트 수정" : "프로젝트 생성"}
                        </S.HeaderTitle>
                        <S.ModalCloseBtn onClick={onClose}>
                            <Close fontSize="large" />
                        </S.ModalCloseBtn>
                    </S.ModalHeader>

                    <S.ModalContentWrap>
                        <S.ModalInputWrap>
                            <S.ModalInputBox>
                                <S.InputTitle>최상위 프로젝트</S.InputTitle>
                                <S.InputSelect
                                    disableUnderline
                                    onChange={(e: any) => setParentProjectNo(e.target.value)}
                                    value={parentProjectNo}
                                >
                                    <S.InputSelectItem value={-1}>
                                        상위 프로젝트 선택
                                    </S.InputSelectItem>
                                    {projectList.map((raw, idx) => (
                                        <S.InputSelectItem key={idx} value={raw.project_no}>
                                            {raw.project_name}
                                        </S.InputSelectItem>
                                    ))}
                                </S.InputSelect>
                            </S.ModalInputBox>
                            <S.ModalInputBox>
                                <S.InputTitle>프로젝트 코드</S.InputTitle>
                                <S.Input value={code} onChange={e => setCode(e.target.value)} />
                            </S.ModalInputBox>

                            <S.ModalInputBox>
                                <S.InputTitle>프로젝트 명</S.InputTitle>
                                <S.Input value={title} onChange={e => setTitle(e.target.value)} />
                            </S.ModalInputBox>

                            <S.ModalInputBox>
                                <S.InputTitle>협력업체 명</S.InputTitle>
                                <S.Input
                                    value={partnerCompany}
                                    onChange={e => setPartnerCompany(e.target.value)}
                                />
                            </S.ModalInputBox>

                            <S.ModalInputBox $boxType={"wide"}>
                                <S.InputTitle $boxType={"wide"}>프로젝트 설명</S.InputTitle>
                                <Editor
                                    value={content}
                                    tools={[
                                        [Bold, Strikethrough],
                                        [Subscript, Superscript],
                                        [AlignLeft, AlignCenter, AlignRight, AlignJustify],
                                        [Indent, Outdent],
                                        [OrderedList, UnorderedList],
                                        FontName,
                                        FormatBlock,
                                        [Undo, Redo],
                                        [InsertImage],
                                    ]}
                                    ref={editorRef}
                                    defaultEditMode="div"
                                    onChange={event => {
                                        setContent(event.html);
                                    }}
                                    // onMount={onMount}
                                    style={{ width: "83.5%", height: "100%" }}
                                />
                            </S.ModalInputBox>

                            <S.ModalInputBox>
                                <S.InputTitle>진행중</S.InputTitle>
                                <S.InputSelect
                                    disableUnderline
                                    onChange={(e: any) => setProjState(e.target.value)}
                                    value={projState}
                                >
                                    <S.InputSelectItem value={0}>대기</S.InputSelectItem>
                                    <S.InputSelectItem value={1}>진행중</S.InputSelectItem>
                                    <S.InputSelectItem value={2}>완료</S.InputSelectItem>
                                </S.InputSelect>
                            </S.ModalInputBox>

                            <S.ModalInputBox>
                                <S.InputTitle>PM</S.InputTitle>
                                <S.InputSelect
                                    disableUnderline
                                    onChange={(e: any) => setPmId(e.target.value)}
                                    value={pmId}
                                >
                                    {projectManagers.map((raw: any, idx: number) => {
                                        return (
                                            <S.InputSelectItem key={idx} value={raw.id}>
                                                {raw.position} {raw.username}
                                            </S.InputSelectItem>
                                        );
                                    })}
                                </S.InputSelect>
                            </S.ModalInputBox>

                            <S.ModalInputBox>
                                <S.InputTitle>시작 일자</S.InputTitle>
                                <S.Input
                                    value={moment(startDate).format("YYYY-MM-DD")}
                                    type="date"
                                    onChange={e => setStartDate(moment(e.target.value).toDate())}
                                />
                            </S.ModalInputBox>

                            <S.ModalInputBox>
                                <S.InputTitle>종료 일자</S.InputTitle>
                                <S.Input
                                    value={moment(endDate).format("YYYY-MM-DD")}
                                    type="date"
                                    onChange={e => setEndDate(moment(e.target.value).toDate())}
                                />
                            </S.ModalInputBox>
                        </S.ModalInputWrap>

                        <S.ModalBtnContainer>
                            <S.CloseBtn onClick={onClose}>닫기</S.CloseBtn>
                            <S.SaveBtn onClick={props.isEdit ? onClickEdit : onClickCreate}>
                                저장
                            </S.SaveBtn>
                        </S.ModalBtnContainer>
                    </S.ModalContentWrap>
                </S.Inner>
            </S.Block>
        </>
    );
};
