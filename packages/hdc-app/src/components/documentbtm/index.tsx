/******************************************************************************
 * Copyright (c) 2021. Moornmo Inc. Rights reserved.                          *
 * Data modelings and methods used are assets of Moornmo Inc.                 *
 * appwrapper/index.tsx
 * hooks :
 * useLocations
 *
 * last modify : jh.jeong@ilts.co.kr
 ******************************************************************************/
// Library
import { useSelector, useDispatch } from "react-redux"; // redux
import { useState, useEffect, useContext } from "react"; // default hooks
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { renderRoutes } from "react-router-config";
//
import { Html2PdfComponent } from "components";
// Module
import * as S from "./styled";

import { UploadAttachFile, DeleteAttachFile } from "../../common/action";
import { reducerState } from "../../common";
import ClipSvg from "../../images/fontawsomeicon/paperclip-solid.svg";
import Close from "@material-ui/icons/Close";
//

export type documentBtmProps = {
    onClickComplete: () => void;
};
interface FinaldocumentBtmProps extends documentBtmProps {}

export const DocumentBtmComponent: React.FunctionComponent<FinaldocumentBtmProps> = props => {
    const dispatch = useDispatch();
    const dsSelector = useSelector((state: reducerState) => state.digitalsign);

    const [fileNames, setFileNames] = useState<string[]>([]);
    const [fileInput, setFileInput] = useState<HTMLInputElement | null>(null);

    useEffect(() => {
        if (dsSelector.sign_files) {
            setFileNames([...dsSelector.sign_files]);
        }
    }, [dsSelector.sign_files]);

    const handleUploadClick = (event: any) => {
        var file = event.target.files[0];
        if (file) dispatch(UploadAttachFile(file, dsSelector.sign_data.id));
    };

    const onClickUploadFile = () => {
        if (fileInput) fileInput.click();
    };

    const onClickDeleteFile = (key: number, idx: number) => {
        fileNames.splice(idx, 1);
        setFileNames([...fileNames]);
        dispatch(DeleteAttachFile(key));
    };

    return (
        <S.EnterBottom>
            <dl>
                <dt>파일첨부</dt>
                <S.FileAdd>
                    <S.FileList>
                        {fileNames?.length > 0 &&
                            fileNames.map((raw: any, idx) => {
                                return (
                                    <div key={idx}>
                                        <S.FileClip src={ClipSvg} />
                                        <a href={raw.url} download={raw.filename}>
                                            {raw.filename.length > 150
                                                ? raw.filename.slice(0, 150)
                                                : raw.filename}
                                        </a>
                                        <Close
                                            fontSize="small"
                                            onClick={() => onClickDeleteFile(raw.id, idx)}
                                        />
                                    </div>
                                );
                            })}
                    </S.FileList>
                </S.FileAdd>
                <S.FileSelect>
                    <input
                        accept="*"
                        id="contained-button-file"
                        type="file"
                        style={{ display: "none" }}
                        onChange={handleUploadClick}
                        ref={ref => setFileInput(ref)}
                        onClick={(event: any) => {
                            event.target.value = null;
                        }}
                    />
                    <button onClick={() => onClickUploadFile()}>파일선택</button>
                </S.FileSelect>
            </dl>
            <S.CompleteBtn onClick={props.onClickComplete}>결재요청</S.CompleteBtn>
        </S.EnterBottom>
    );
};
