/******************************************************************************
 * appwrapper/index.tsx
 * hooks :
 * useLocations
 *
 ******************************************************************************/
// Library
import { useState, useEffect, useRef } from "react"; // default hooks
//
// Module
import * as S from "./styled";
import { ModalInfo } from "components";
//
export type CustomGroupManage = {
    type: string;
    submitData: (list: any[]) => void;
    datas: any[];
    selectIdx: number;
    onSelect: (idx: number) => void;
    btnContainerStyle?: any;
    numberContainerStyle?: any;
    buttonCount?: any[];
    editType?: number;
    modifyType?: boolean;
    toast?: (flag: boolean) => void;
};

interface FinalCustomGroupManage extends CustomGroupManage {}

export const CustomGroupManage = (
    props: FinalCustomGroupManage
): { numberDiv: React.ReactElement; btnDiv: React.ReactElement } => {
    const [buttonCount, setButtonCount] = useState<any[]>([]);
    const [editIdx, setEditIdx] = useState<number>(-1);
    const [editType, setEditType] = useState<number>(1);
    const [editText, setEditText] = useState<string>("");
    const [groupEditNameList, setEditGroupNameList] = useState<any[]>([]);
    const [groupNameList, setGroupNameList] = useState<any[]>([]);
    const [groupDelete, setGroupDelete] = useState<boolean>(false);
    const [groupCheckList, setGruopCheckList] = useState<any[]>([]);
    const [modifyType, setModifyType] = useState<boolean>(true);

    useEffect(() => {
        if (buttonCount.length > 0) {
            groupButtonSave();
            grouoNameSave();
        }
    }, [buttonCount]);

    useEffect(() => {
        if (props.editType != -1 && props.editType != undefined) {
            setEditType(props.editType);
            grouoNameSave();
        }
    }, [props.editType]);

    useEffect(() => {
        if (props.modifyType != undefined) {
            setModifyType(props.modifyType);
        }
    }, [props.modifyType]);

    useEffect(() => {
        if (props.buttonCount != undefined && props.buttonCount[0] != "null") {
            setButtonCount(props.buttonCount);
        }
    }, [props.buttonCount]);

    useEffect(() => {
        groupNameImport();
    }, [groupEditNameList]);

    //리스트 저장
    const groupSave = async () => {
        if (props.datas.length > 0) {
            let ids = props.datas;
            window.localStorage.setItem(
                "CUSTOM_GROUP_" + props.type + "_" + props.selectIdx,
                ids.join(",")
            );
            if (props.toast != undefined) {
                props.toast(true);
                setTimeout(() => {
                    if (props.toast != undefined) {
                        props.toast(false);
                    }
                }, 2000);
            }
        }
    };

    //리스트 불러오기
    const groupImport = async () => {
        let ids: any[];
        let data = window.localStorage.getItem(
            "CUSTOM_GROUP_" + props.type + "_" + props.selectIdx
        );
        if (data) {
            ids = data.length > 0 ? data.split(",") : [];
            props.submitData(ids);
        }
    };

    //chip Click
    const groupNumber = (id: number, idx: number) => {
        if (groupDelete == true) {
            // 리스트 안에 존재하지 않을 경우 푸쉬
            if (groupCheckList.indexOf(idx) == -1) {
                groupCheckList.push(idx);
                setGruopCheckList([...groupCheckList]);
            }
            //
            // 존재 할 경우 삭제
            else if (groupCheckList.indexOf(idx) != -1) {
                let index = groupCheckList.findIndex(raw => raw == idx);
                groupCheckList.splice(index, 1);
                setGruopCheckList([...groupCheckList]);
            }
            //
        } else {
            props.onSelect(id);
            //클릭
            if (groupCheckList.length == 0) {
                groupCheckList.push(idx);
                setGruopCheckList([...groupCheckList]);
                if (modifyType == false) {
                    let ids: any[];
                    let data = window.localStorage.getItem("CUSTOM_GROUP_" + props.type + "_" + id);
                    if (data) {
                        ids = data.length > 0 ? data.split(",") : [];
                        props.submitData(ids);
                    }
                }
            }
            // 빼기
            else if (groupCheckList.indexOf(idx) != -1) {
                props.onSelect(-1);
                groupCheckList.splice(0, 1);
                setGruopCheckList([...groupCheckList]);
                props.submitData([]);
            }
            // 다른 칩 클릭
            else if (groupCheckList.indexOf(idx) == -1 && groupCheckList.length > 0) {
                groupCheckList.splice(0, 1);
                groupCheckList.push(idx);
                setGruopCheckList([...groupCheckList]);
                if (modifyType == false) {
                    let ids: any[];
                    let data = window.localStorage.getItem("CUSTOM_GROUP_" + props.type + "_" + id);
                    if (data) {
                        ids = data.length > 0 ? data.split(",") : [];
                        props.submitData(ids);
                    }
                }
            }
        }
    };

    //메일 그룹 유저 버튼 생성
    const groupButtonCount = () => {
        groupNameList.push("그룹" + (buttonCount.length + 1));
        buttonCount.push(buttonCount.length + 1);
        setButtonCount([...buttonCount]);
        setGroupNameList([...groupNameList]);
    };

    // 그룹 버튼 갯수 저장
    const groupButtonSave = () => {
        let _list = buttonCount.map(raw => raw);
        if (_list.length > 0) {
            window.localStorage.setItem(props.type + "_Count", _list.join(","));
        } else if (_list.length == 0) {
            window.localStorage.setItem(props.type + "_Count", "null");
        }
    };

    //우클릭 이벤트
    const groupEdit = (event: any, idx: number, id: number) => {
        event.preventDefault();

        setEditType(1);
        props.onSelect(id);
        setEditIdx(idx);
        if (groupNameList[idx] != undefined && groupNameList[idx] != "") {
            setEditText(groupNameList[idx]);
        } else {
            setEditText("그룹" + id);
        }
    };

    //그룹명 저장
    const grouoNameSave = () => {
        for (let i = 0; i < buttonCount.length; i++) {
            if (i == editIdx) {
                groupEditNameList.push(editText);
            } else {
                groupEditNameList.push(groupNameList[i]);
            }
        }
        setEditGroupNameList([...groupEditNameList]);

        if (groupEditNameList.length > 0) {
            let _list = groupEditNameList.map(raw => raw);
            window.localStorage.setItem(props.type + "_GroupName", _list.join(","));
            setEditGroupNameList([]);
        } else if (groupEditNameList.length == 0) {
            window.localStorage.setItem(props.type + "_GroupName", "null");
            setEditGroupNameList([]);
        }
    };

    // 그룹명 넣기
    const groupNameImport = () => {
        let name = window.localStorage.getItem(props.type + "_GroupName");
        if (name) {
            let _list = name.length > 0 ? name.split(",") : [];
            if (_list[0] != "null") {
                setGroupNameList(_list);
            }
        }
    };

    // 그룹 삭제 기능
    const groupIdxDelete = () => {
        if (groupCheckList.length > 0) {
            for (var l of groupCheckList) {
                delete groupNameList[l];
                delete buttonCount[l];
            }

            let name_list = groupNameList.filter(raw => raw != undefined);
            let count_list = buttonCount.filter(raw => raw != undefined);

            setGroupNameList([...name_list]);
            setButtonCount([...count_list]);

            grouoNameSave();
            groupButtonSave();

            setEditIdx(-1);
            setGroupDelete(false);
            setGruopCheckList([]);
            props.onSelect(-1);
        } else {
            setGroupDelete(false);
        }
    };

    //삭제 버튼 Change
    const groupClick = () => {
        setGruopCheckList([]);
        setGroupDelete(true);
        setEditType(0);
    };

    return {
        numberDiv: (
            <S.ButtonDiv style={props.numberContainerStyle}>
                <S.ButtonDivTitle>그룹 :</S.ButtonDivTitle>
                {buttonCount.map((raw, idx) =>
                    editType == 1 && editIdx == idx ? (
                        <S.EditGroupName
                            value={editText}
                            onChange={e => setEditText(e.target.value)}
                            key={"Name" + raw}
                            InputProps={{
                                disableUnderline: true,
                            }}
                            inputProps={{
                                style: {
                                    border: "1px solid #aaaaaa",
                                    padding: "0px",
                                    display: "flex",
                                    justifyContent: "center",
                                    minHeight: "28px",
                                    minWidth: "80px",
                                    maxHeight: "28px",
                                    maxWidth: "80px",
                                    backgroundColor: "white",
                                    color: "black",
                                },
                                className: "GroupEdit",
                            }}
                        />
                    ) : (
                        <S.ChipDiv
                            style={{
                                width: "fit-content",
                            }}
                        >
                            <S.ChipBlock
                                onContextMenu={
                                    modifyType == true
                                        ? (e: any) => groupEdit(e, idx, raw)
                                        : undefined
                                }
                                key={"groupBtn" + raw}
                                className={`group${idx}`}
                                style={{
                                    backgroundColor:
                                        groupCheckList.indexOf(idx) != -1 ? "#FF9800" : "#ffffff",
                                }}
                                onClick={() => groupNumber(raw, idx)}
                                variant={"outlined"}
                                label={
                                    groupNameList.length > 0 && groupNameList[idx] != ""
                                        ? groupNameList[idx]
                                        : `그룹${raw}`
                                }
                            />
                        </S.ChipDiv>
                    )
                )}
                {modifyType == true && (
                    <S.SignNumberDiv>
                        <S.NumberButton onClick={() => groupButtonCount()}>+</S.NumberButton>
                        {groupDelete == false ? (
                            <S.GroupBtn
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
                                    padding: "8px 16px",
                                    marginLeft: "5px",
                                }}
                                onClick={groupClick}
                            >
                                그룹삭제
                            </S.GroupBtn>
                        ) : (
                            <S.GroupBtn
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
                                    padding: "8px 16px",
                                    marginLeft: "5px",
                                }}
                                onClick={groupIdxDelete}
                            >
                                선택완료
                            </S.GroupBtn>
                        )}
                    </S.SignNumberDiv>
                )}
            </S.ButtonDiv>
        ),
        btnDiv: (
            <S.ButtonContainer style={props.btnContainerStyle}>
                {props.selectIdx != -1 && (
                    <S.GroupDiv
                        style={{
                            display: "flex",
                        }}
                    >
                        <S.GroupBtn
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
                                padding: "8px 16px",
                                marginRight: "5px",
                            }}
                            onClick={() => groupImport()}
                        >
                            불러오기
                        </S.GroupBtn>
                        <S.GroupBtn
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
                                padding: "8px 16px",
                                marginRight: "5px",
                            }}
                            onClick={() => groupSave()}
                        >
                            그룹저장
                        </S.GroupBtn>
                    </S.GroupDiv>
                )}
            </S.ButtonContainer>
        ),
    };
};
