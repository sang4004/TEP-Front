/******************************************************************************
 * Copyright (c) 2021. Moornmo Inc. Rights reserved.                          *
 * Data modelings and methods used are assets of Moornmo Inc.                 *
 * projecttreemodal/index.tsx
 * hooks :
 * useLocations
 *
 * last modify : jh.jeong@ilts.co.kr
 ******************************************************************************/
// Library
import React, { useState, useEffect } from "react"; // default hooks
//image
import closeSvg from "../../images/edms/times-solid-white.svg";
//styled
import * as S from "./styled";
// Module
import { useSelector, useDispatch } from "react-redux";
import { GridViewComponent, ModalInfo } from "components";
import NewWindow from "react-new-window";

export type edmsTmAttachFileModalProps = {
    style?: object;
    visible: boolean;
    onClose: () => void;
    attachFiles: any[];
};
interface FinaledmsTmAttachFileModalProps extends edmsTmAttachFileModalProps {}

const tableHeadSize = [0.5, 1, 1.5];
const tableHeadType = [1, 1, 1];
const tableHeader = ["작성자", "파일 이름", "다운로드"];

export const EdmsTmAttachFileModal: React.FunctionComponent<
    FinaledmsTmAttachFileModalProps
> = props => {
    const dispatch = useDispatch();

    const [attachFileList, setAttachFileList] = useState<any[]>([]);
    const [attachFileKeys, setAttachFileKeys] = useState<string[]>([]);

    useEffect(() => {
        if (props.attachFiles && props.attachFiles.length > 0) {
            let list = [];
            for (var file of props.attachFiles) {
                list.push({
                    create_by: file.create_by,
                    file_name: file.file_name,
                    file_path: file.file_path,
                });
            }
            setAttachFileList([...list]);
            setAttachFileKeys([...Object.keys(list[0])]);
        } else {
            setAttachFileList([]);
            setAttachFileKeys([]);
        }
    }, [props.attachFiles]);

    const getCustomEl = (idx: number, dataidx?: number) => {
        if (idx === 2) {
            if (dataidx != undefined && attachFileList.length > 0) {
                if (attachFileList[dataidx].file_path == undefined) return;
                return (
                    <S.TableTd className="background-color-white">
                        <S.FileDownload href={attachFileList[dataidx].file_path} target="_blank">
                            {attachFileList[dataidx].file_name}
                        </S.FileDownload>
                    </S.TableTd>
                );
            } else {
                return true;
            }
        }
        return null;
    };
    const onClose = () => {
        props.onClose();
    };

    if (props.visible == false) return <></>;
    return (
        <NewWindow
            title="파일상세보기"
            onUnload={props.onClose}
            features={{ width: 600, height: 720 }}
        >
            <S.Block>
                <S.Inner>
                    <S.ModalHeader>
                        <S.HeaderTitle>첨부 파일</S.HeaderTitle>
                        <S.ModalCloseBtn onClick={onClose}>
                            <img src={closeSvg} />
                        </S.ModalCloseBtn>
                    </S.ModalHeader>

                    <S.ModalContentWrap>
                        <S.GridViewWrap>
                            <GridViewComponent
                                fullData={attachFileList}
                                titles={tableHeader}
                                keys={attachFileKeys}
                                values={attachFileList}
                                keysWidth={tableHeadSize}
                                datatype={tableHeadType}
                                rowClass="background-color-white"
                                headerClass="background-dark-sky-blue color-white align-center"
                                getCustomEl={getCustomEl}
                            />
                        </S.GridViewWrap>
                    </S.ModalContentWrap>
                    <S.ModalBtnContainer>
                        <S.CloseBtn onClick={onClose}>닫기</S.CloseBtn>
                    </S.ModalBtnContainer>
                </S.Inner>
            </S.Block>
        </NewWindow>
    );
};
