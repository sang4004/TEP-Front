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
import { useSelector, useDispatch } from "react-redux";
//
import { reducerState } from "../../common";
import { ModalInfo, ModalConfirm } from "components";
//
import trashIcon from "../../images/edms/trash-white.svg";
import { DeleteMydocumentFiles, GetWorkTmpBoxList } from "../../common/action";
import * as S from "../../styled/edmsTmpDocumentlist.styled";
import * as docS from "../../styled/edmsDocument.styled";
import { getAuthority } from "../../common/getauth";

let checkedDocuList: any[] = [];

export type edmsMydocuToolbarProps = {
    checked?: number[];
    selectedFunc?: number;
    skip?: number;

    // edmsTmpDocumentlist.page func
    handleChange?: any;
    onClickDocuUpload?: any;
    onClickDclDownload?: any;
    onClickFileUpload?: any;

    // edmsTmpDocumentlist.page setter
    setIsLoading?: any;

    // edmsTmpDocumentlist.page const data
    contextMenuItems?: any;
    //
};
interface FinaledmsMydocuToolbarProps extends edmsMydocuToolbarProps {}

export const EdmsMydocuToolbar: React.FunctionComponent<FinaledmsMydocuToolbarProps> = props => {
    const dispatch = useDispatch();
    const fileSelector = useSelector((state: reducerState) => state.files);
    const workSelector = useSelector((state: reducerState) => state.work);
    const userSelector = useSelector((state: reducerState) => state.user);

    const [contextMenu, setContextMenu] = useState<any[]>([]);
    const [workList, setWorkList] = useState<any[]>([]);

    useEffect(() => {
        if (props.contextMenuItems) {
            setContextMenu(props.contextMenuItems);
        }
    }, [props.contextMenuItems]);

    useEffect(() => {
        let _workList = fileSelector.native_file_list;
        setWorkList(_workList);
    }, [fileSelector.native_file_list]);

    const confirmDelete = async (result: boolean, confirmText: string) => {
        if (result) {
            props.setIsLoading(true);
            dispatch(DeleteMydocumentFiles(checkedDocuList));
            setTimeout(() => {
                dispatch(GetWorkTmpBoxList(false, false, props.skip));
                checkedDocuList = [];
                ModalInfo(`${confirmText}??? ?????????????????????.`);
                props.setIsLoading(false);
            }, 2000);
        }
    };

    const onClickDelete = async () => {
        if (props.checked && workList && props.checked.length != 0) {
            checkedDocuList = [];

            props.checked.map(raw => {
                let checkedDocuments = workList.find(fRaw => fRaw.docu_no == raw);
                if (checkedDocuments) checkedDocuList.push(checkedDocuments);
            });
        }

        if (checkedDocuList.length == 0) return ModalInfo("????????? ?????? ?????? ????????? ?????????.");
        if (checkedDocuList.find(raw => raw.file_auth == 0))
            return ModalInfo("?????? ????????? ?????? ??????(???)??? ????????????.");

        let confirmText: string = "";
        let checkedDocuNames: any[] = checkedDocuList.map(raw => raw.docu_subject);

        if (checkedDocuNames.length > 1)
            confirmText = `${checkedDocuNames[0]} ??? ` + `${checkedDocuNames.length - 1}?????? ??????`;
        else confirmText = `${checkedDocuNames[0]} ??????`;

        ModalConfirm(`${confirmText}??? ?????????????????????????`, (result: boolean) =>
            confirmDelete(result, confirmText)
        );
    };

    return (
        <>
            <S.DocumentWorklistTableFolderTitle></S.DocumentWorklistTableFolderTitle>

            <S.FileToolBtnWrapper>
                <S.FolderTitle>
                    <S.SelectBox
                        value={props.selectedFunc}
                        onChange={props.handleChange}
                        disableUnderline={true}
                    >
                        <S.Items value={-1}>??????</S.Items>
                        {contextMenu.map((val, idx) => {
                            return (
                                <S.Items value={idx} key={idx}>
                                    {val}
                                </S.Items>
                            );
                        })}
                    </S.SelectBox>
                </S.FolderTitle>
                {/* <docS.DocumentToolBtn
                    style={{ backgroundColor: "#FF9800" }}
                    onClick={props.onClickDclDownload}
                >
                    ?????? ?????? ?????? ????????????
                </docS.DocumentToolBtn> */}
                <docS.DocumentToolBtn
                    style={{ backgroundColor: "#FF9800" }}
                    onClick={props.onClickFileUpload}
                >
                    ???????????????
                </docS.DocumentToolBtn>
                {userSelector.edms_level == 1 && (
                    <docS.DocumentToolBtn onClick={props.onClickDocuUpload}>
                        <img src="assets/images/edms/edit.svg" alt="" />
                        ?????? ?????????
                    </docS.DocumentToolBtn>
                )}
                <docS.DocumentToolBtn $margin={true} onClick={onClickDelete}>
                    <img src={trashIcon} />
                    ??????
                </docS.DocumentToolBtn>
            </S.FileToolBtnWrapper>
        </>
    );
};
