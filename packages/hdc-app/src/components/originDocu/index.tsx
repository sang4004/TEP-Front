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
import { useState, useEffect, useContext, ChangeEvent } from "react"; // default hooks
import moment from "moment";
//
// Module
import * as S from "./styled";
import { reducerState } from "../../common";
import { PasswordCheck, UploadAttachFile } from "../../common/action";
import { ToastComponent } from "components";
//
import Close from "@material-ui/icons/Close";

export type OriginDocuProps = {
    type: number;
    visible: boolean;
    onClose: () => void;
    onComplete: (data: any, file: File[]) => void;
};

interface FinalOriginDocuProps extends OriginDocuProps {}

export const OriginDocument: React.FunctionComponent<FinalOriginDocuProps> = props => {
    const dispatch = useDispatch();
    const dsSelector = useSelector((state: reducerState) => state.digitalsign);
    const userSelector = useSelector((state: reducerState) => state.user);

    const [docNo, setDocNo] = useState<string>("");
    const [docTitle, setDocTitle] = useState<string>("");
    const [sender, setSender] = useState<string>("");
    const [reciver, setReciver] = useState<string>("");
    const [sendDate, setSendDate] = useState<Date>(new Date());
    const [recvDate, setRecvDate] = useState<Date>(new Date());
    const [fileText, setFileText] = useState<string>("");
    const [fileNames, setFileNames] = useState<File[]>([]);
    const [fileInput, setFileInput] = useState<HTMLInputElement | null>(null);

    useEffect(() => {
        let len = fileNames.length;
        if (len == 1) setFileText(fileNames[0].name);
        else if (len > 1) setFileText(fileNames[0].name + ` 외 ${len - 1}개`);
    }, [fileNames]);

    const onClickConfirm = async () => {
        let data: any = {};
        Object.assign(data, { no: docNo });
        Object.assign(data, { title: docTitle });
        Object.assign(data, { vendor: props.type == 0 || props.type == 2 ? sender : reciver });
        Object.assign(data, { date: props.type == 0 || props.type == 2 ? recvDate : sendDate });
        props.onComplete(data, fileNames);
        props.onClose();
    };

    const handleUploadClick = (event: any) => {
        var file = event.target.files;
        let _list = fileNames;
        if (file) {
            for (var f of file) _list.push(f);
        }
        setFileNames([..._list]);
    };

    const onClickUploadFile = () => {
        setFileNames([]);
        if (fileInput) fileInput.click();
    };

    return (
        <S.Block open={props.visible ? true : false} onClose={props.onClose}>
            <S.Inner>
                <S.CloseBtn onClick={props.onClose}>
                    <Close fontSize="large" />
                </S.CloseBtn>
                <S.Content>
                    <S.TitleDiv>
                        <S.title>기존 문서 추가</S.title>
                    </S.TitleDiv>
                    <S.Row>
                        <S.RowTitle>문 서 번 호</S.RowTitle>
                        <S.RowInput>
                            <S.Textfield
                                type={"text"}
                                value={docNo}
                                onChange={e => setDocNo(e.target.value)}
                                InputProps={{
                                    disableUnderline: true,
                                }}
                            />
                        </S.RowInput>
                    </S.Row>
                    <S.Row>
                        <S.RowTitle>문 서 제 목</S.RowTitle>
                        <S.RowInput>
                            <S.Textfield
                                type={"text"}
                                value={docTitle}
                                onChange={e => setDocTitle(e.target.value)}
                                InputProps={{
                                    disableUnderline: true,
                                }}
                            />
                        </S.RowInput>
                    </S.Row>
                    {(props.type == 0 || props.type == 2) && (
                        <S.Row>
                            <S.RowTitle>발 신 처</S.RowTitle>
                            <S.RowInput>
                                <S.Textfield
                                    type={"text"}
                                    value={sender}
                                    onChange={e => setSender(e.target.value)}
                                    InputProps={{
                                        disableUnderline: true,
                                    }}
                                />
                            </S.RowInput>
                        </S.Row>
                    )}
                    {props.type == 1 && (
                        <S.Row>
                            <S.RowTitle>수 신 처</S.RowTitle>
                            <S.RowInput>
                                <S.Textfield
                                    type={"text"}
                                    value={reciver}
                                    onChange={e => setReciver(e.target.value)}
                                    InputProps={{
                                        disableUnderline: true,
                                    }}
                                />
                            </S.RowInput>
                        </S.Row>
                    )}
                    {(props.type == 0 || props.type == 2) && (
                        <S.Row>
                            <S.RowTitle>수 신 일 자</S.RowTitle>
                            <S.RowInput>
                                <S.Date
                                    id="date-picker-inline"
                                    type="date"
                                    value={moment(recvDate).format("YYYY-MM-DD")}
                                    onChange={(e: any) => setRecvDate(e.target.value)}
                                    min="2017-01-01"
                                    max="2030-12-31"
                                />
                            </S.RowInput>
                        </S.Row>
                    )}
                    {props.type == 1 && (
                        <S.Row>
                            <S.RowTitle>발 신 일 자</S.RowTitle>
                            <S.RowInput>
                                <S.Date
                                    id="date-picker-inline"
                                    type="date"
                                    value={moment(sendDate).format("YYYY-MM-DD")}
                                    onChange={(e: any) => {
                                        console.log("event", e);
                                        setSendDate(e.target.value);
                                    }}
                                    min="2017-01-01"
                                    max="2030-12-31"
                                />
                            </S.RowInput>
                        </S.Row>
                    )}
                    <S.Row>
                        <S.RowTitle>파 일 첨 부</S.RowTitle>
                        <S.RowInput>
                            <S.Textfield
                                value={fileText}
                                InputProps={{
                                    readOnly: true,
                                    disableUnderline: true,
                                }}
                            />
                        </S.RowInput>
                        <S.FileAdd>
                            <input
                                multiple
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
                            <S.FileAddBtn onClick={() => onClickUploadFile()}>찾기</S.FileAddBtn>
                        </S.FileAdd>
                    </S.Row>
                </S.Content>
                <S.BtmBtn onClick={onClickConfirm}>확인</S.BtmBtn>
            </S.Inner>
        </S.Block>
    );
};
