/******************************************************************************
 * hooks :
 * useLocations
 * components :
 *
 *

 ******************************************************************************/
import React, { useState, useEffect, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux"; // redux

import { reducerState } from "../../common";
import { LoadingIndicatorComponent, ModalInfo, ToastComponent } from "components";
import { TreeViewItemClickEvent, TreeViewExpandChangeEvent } from "@progress/kendo-react-treeview";
import NewWindow from "react-new-window";

import { EdmsTreeViewComp } from "../../components";
import { GetCategoryList } from "../../common/action";

import * as S from "./styled";
import Close from "@material-ui/icons/Close";

export type edmsTmFileSelectModalProps = {
    visible: boolean;
    onClose: () => void;
    setWorkList: any;
    authDataList: any;
};
interface FinaledmsTmFileSelectModalProps extends edmsTmFileSelectModalProps {}

export const EdmsTmFileSelectModal: React.FunctionComponent<
    FinaledmsTmFileSelectModalProps
> = props => {
    const dispatch = useDispatch();
    const fileSelector = useSelector((state: reducerState) => state.files);
    const cateSelector = useSelector((state: reducerState) => state.category);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Tree
    const [filtered, setFiltered] = useState<any>();
    const [checkDocu, setCheckDocu] = useState<any[]>([]);
    const [checkDocuTreeIDs, setCheckDocuTreeIDs] = useState<any[]>([]);
    const [docNoList, setDocNoList] = useState<any[]>([]);
    const [cateNoList, setCateNoList] = useState<any[]>([]);
    const [projectNoList, setProjectNoList] = useState<any[]>([]);
    const [workTmpBoxList, setWorkTmpBoxList] = useState<any[]>([]);
    const [visibleToast, setVisibleToast] = useState<boolean>(false);

    useEffect(() => {
        if (props.visible) {
            setIsLoading(true);
        }
    }, [props.visible]);

    useEffect(() => {
        if (props.visible && fileSelector.native_file_list.length != 0) {
            let _projtype: any[] = [];
            let _cate: any[] = [];
            let _docu: any[] = [];

            for (let list of fileSelector.native_file_list) {
                _projtype.push(list.project_no);
                _cate.push(list.cate_no);
                _docu.push(list.docu_no);
            }
            let temp = new Set(_cate);
            _cate = [...temp];
            setCateNoList(_cate);
            setDocNoList(_docu);
            setProjectNoList(_projtype);
            dispatch(GetCategoryList(_cate));
            setWorkTmpBoxList(fileSelector.native_file_list);
        }
    }, [props.visible]);

    useEffect(() => {
        if (cateSelector.cate_list != undefined) {
            let _dcl: any[] = [];
            let project = { visible: true, no: projectNoList };
            let discipline = { visible: true, no: _dcl };
            let cate = { visible: true, no: cateNoList };
            let docu = { visible: true, no: docNoList };

            for (let list of cateSelector.cate_list) {
                _dcl.push(list.discipline_id);
            }

            setFiltered({ project, discipline, cate, docu });
        }
    }, [cateSelector.cate_list]);

    useEffect(() => {
        if (filtered != undefined) {
            setIsLoading(false);
        }
    }, [filtered]);

    //TreeView Event Handler
    const onTreeExpandChange = (event: TreeViewExpandChangeEvent) => {
        event.item.expanded = !event.item.expanded;
    };

    const onTreeItemClick = (event: TreeViewItemClickEvent) => {
        onTreeExpandChange(event);
    };

    const onCheck = (ids: any, checked?: any) => {
        setCheckDocu(ids);
        if (checked) {
            setCheckDocuTreeIDs(checked);
        }
    };

    const onClickAdd = () => {
        let is_check: boolean = true;

        let firstFileProjectNo: number = -1;

        checkDocu.map((docu: any, idx: number) => {
            let file = workTmpBoxList.find((workTmp: any) => workTmp.docu_no == docu.docu_no);
            if (file != undefined) {
                if (firstFileProjectNo == -1) {
                    firstFileProjectNo = file.project_no;
                }
                if (firstFileProjectNo != -1 && firstFileProjectNo != file.project_no) {
                    is_check = false;
                    return setVisibleToast(true);
                }
            }
        });

        if (is_check) {
            setFiltered(undefined);
            props.setWorkList(checkDocu.map(raw => raw.docu_no));
            props.onClose();
        }
    };
    const onClose = () => {
        setFiltered(undefined);

        props.onClose();
    };
    if (props.visible == false) return <></>;
    return (
        <NewWindow
            onUnload={onClose}
            center="parent"
            features={{ width: 420, height: 600 }}
            title="TR 파일선택"
        >
            <ToastComponent
                text="서로 다른 프로젝트의 파일이 선택되었습니다."
                close={() => setVisibleToast(false)}
                visible={visibleToast}
                type={"warning"}
                style={{ position: "absolute", bottom: 50, right: 0, alignItems: "center" }}
                duration={3000}
            />
            <S.Block>
                <S.Inner>
                    <style>
                        {`
                            .k-grid table {
                                width : 80% !important;
                                margin : 0 -2px;
                            }
                            .k-grid td {
                                white-space : pre-wrap;
                            }
                        `}
                    </style>
                    <S.ModalHeader>
                        <S.HeaderTitle>파일선택</S.HeaderTitle>
                        <S.ModalCloseBtn onClick={onClose}>
                            <Close style={{ fontSize: "3em" }} />
                        </S.ModalCloseBtn>
                    </S.ModalHeader>
                    <LoadingIndicatorComponent open={isLoading} style={{ zIndex: 1301 }} />
                    <S.DocumentWorklistContainer>
                        <S.DocumentWorklistStruct>
                            <S.DocumentContentHeader>
                                <S.HeaderText>
                                    <S.HeaderTitle>파일 선택</S.HeaderTitle>
                                </S.HeaderText>
                            </S.DocumentContentHeader>
                            <S.DocumentTreeList>
                                {filtered != undefined ? (
                                    <EdmsTreeViewComp
                                        onChangeTreeData={data => {}}
                                        onTreeItemClick={onTreeItemClick}
                                        filtered={filtered}
                                        is_checked={true}
                                        isSearch={true}
                                        onCheck={onCheck}
                                        checked={checkDocuTreeIDs}
                                        docuCode={true}
                                        // searchData={searchData}
                                    />
                                ) : (
                                    <div
                                        style={{
                                            width: "100%",
                                            flex: 1,
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            fontSize: "1em",
                                            marginTop: "50%",
                                        }}
                                    >
                                        데이터 로딩중...
                                    </div>
                                )}
                            </S.DocumentTreeList>
                            <S.SaveBtn onClick={onClickAdd}>파일추가</S.SaveBtn>
                        </S.DocumentWorklistStruct>
                    </S.DocumentWorklistContainer>
                </S.Inner>
            </S.Block>
        </NewWindow>
    );
};
