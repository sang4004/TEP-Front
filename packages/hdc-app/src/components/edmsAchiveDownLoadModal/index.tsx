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
import React, { useState, useEffect, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux"; // redux
import Close from "@material-ui/icons/Close";

import { LoadingIndicatorComponent, ModalInfo } from "components";
import { reducerState } from "../../common";
import { GetDocuAuthority } from "../../common/action";
import { TreeViewItemClickEvent, TreeViewExpandChangeEvent } from "@progress/kendo-react-treeview";
import { generateZipDownloadURI } from "../../common/utils";

import { EdmsTreeViewComp, TreeIdDataType } from "../";

import * as S from "./styled";

export type edmsAchiveDownLoadModalProps = {
    visible: boolean;
    onClose: () => void;
    projectNo: number;
    type: "DCL" | "VP" | "ALL";
};
interface FinaledmsAchiveDownLoadModalProps extends edmsAchiveDownLoadModalProps {}

export const EdmsAchiveDownLoadModal: React.FunctionComponent<
    FinaledmsAchiveDownLoadModalProps
> = props => {
    const dispatch = useDispatch();
    const authSelector = useSelector((state: reducerState) => state.authority);
    const userSelector = useSelector((state: reducerState) => state.user);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Tree

    const [checkItem, setCheckItem] = useState<TreeIdDataType[]>([]);
    const [checkItemTreeIds, setCheckItemTreeIds] = useState<string[]>([]);
    const [keyWord, setKeyWord] = useState<string>("");
    const [searchData, setSearchData] = useState<string>("");
    const [authNoList, setAuthNoList] = useState<any>();

    useEffect(() => {
        dispatch(GetDocuAuthority());
        // setIsLoading(true);
    }, [props.visible]);

    useEffect(() => {
        if (authNoList != undefined) {
            setIsLoading(false);
        }
    }, [authNoList]);

    // TreeView Event Handler
    const onTreeExpandChange = (event: TreeViewExpandChangeEvent) => {
        // event.item.expanded = !event.item.expanded;
    };

    const onTreeItemClick = (event: TreeViewItemClickEvent) => {
        // onTreeExpandChange(event);
    };

    const onCheck = (ids: any, checked?: any) => {
        setCheckItem(ids);
        setCheckItemTreeIds(checked);
    };

    const onClickAdd = async () => {
        if (checkItemTreeIds.length > 0) {
            // discipline, category , document ????????? ?????? ???????????? ?????? ????????? ???????????? ????????????.
            let disc: { id: string; data: number }[] = [],
                cate: { id: string; data: number }[] = [],
                docu: { id: string; data: number }[] = [];
            checkItemTreeIds.map((raw, idx) => {
                let item = checkItem[idx];
                if (item) {
                    if (item.type == "discipline" && item.disc_no)
                        disc.push({ id: raw, data: item.disc_no });
                    else if ((item.type == "category" || item.type == "pcategory") && item.cate_no)
                        cate.push({ id: raw, data: item.cate_no });
                    else if (item.type == "document" && item.docu_no)
                        docu.push({ id: raw, data: item.docu_no });
                }
            });
            // ???????????? ????????????
            for (var c of cate) {
                docu = docu.filter(raw => raw.id.indexOf(c.id) != 0);
            }
            // ???????????? ????????????
            for (var d of disc) {
                cate = cate.filter(raw => raw.id.indexOf(d.id) != 0);
            }
            await generateZipDownloadURI(
                disc.map(raw => raw.data),
                cate.map(raw => raw.data),
                docu.map(raw => raw.data),
                userSelector.edms_user_id
            );
        } else {
            ModalInfo("????????? ???????????? ????????????.");
        }
    };
    const onClose = () => {
        props.onClose();
        setCheckItem([]);
        setCheckItemTreeIds([]);
        setAuthNoList(undefined);
    };

    return (
        <>
            <S.Block open={props.visible ? true : false} onClose={onClose}>
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
                        <S.HeaderTitle>????????????</S.HeaderTitle>
                        <S.ModalCloseBtn onClick={onClose}>
                            <Close style={{ fontSize: "1.6em" }} />
                        </S.ModalCloseBtn>
                    </S.ModalHeader>
                    <LoadingIndicatorComponent open={isLoading} style={{ zIndex: 1301 }} />
                    <S.DocumentWorklistContainer>
                        <S.DocumentWorklistStruct>
                            <S.DocumentTreeList>
                                {/* {authNoList != undefined ? ( */}
                                <EdmsTreeViewComp
                                    onChangeTreeData={data => {}}
                                    onTreeItemClick={onTreeItemClick}
                                    is_checked={true}
                                    onCheck={onCheck}
                                    checked={checkItemTreeIds}
                                    isSearch
                                    isExapndOnClick
                                    dataType={props.type}
                                />
                                {/* ) : (
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
                                        ????????? ?????? ????????? ???????????? ????????????.
                                    </div>
                                )} */}
                            </S.DocumentTreeList>
                        </S.DocumentWorklistStruct>
                    </S.DocumentWorklistContainer>
                    <S.DownLoadDiv>
                        <S.AlertText>?????????????????? ??????????????? ??????????????????.</S.AlertText>
                        <S.CancelBtn>??????</S.CancelBtn>
                        <S.SaveBtn onClick={onClickAdd}>?????? ????????????</S.SaveBtn>
                    </S.DownLoadDiv>
                </S.Inner>
            </S.Block>
        </>
    );
};
