/******************************************************************************
 * appwrapper/index.tsx
 * hooks :
 * useLocations
 *
 ******************************************************************************/
// Library
import { useState, useEffect } from "react"; // default hooks
//
import { ModalInfo } from "components";
// Module
import * as S from "./styled";
//
import Close from "@material-ui/icons/Close";
import { Rnd } from "react-rnd";

export type allCommentSelectProps = {
    style?: object;
    children?: React.ReactNode;
    visible: boolean;
    docuCodeList: string[];
    docuDescList: string[];
    changeList: string[];
    dataIdx: number;
    nowType: string;
    onChangeSelectData: (value: string) => void;
    onClose: () => void;
};

const code_list = ["Code1", "Code2", "Code3", "Code4"];
const change_design_select_list = ["Y", "N"];

interface FinalallCommentSelectProps extends allCommentSelectProps {}

export const AllCommentSelectModal: React.FunctionComponent<FinalallCommentSelectProps> = props => {
    const [selectedDocuList, setSelectedDocuList] = useState<string[]>([]);
    const [selectedCodeList, setSelectedCodeList] = useState<string[]>([]);
    const [selectedChangeList, setSelectedChangeList] = useState<string[]>([]);

    const onClickConfirm = () => {
        if (props.nowType === "docu" && selectedDocuList.length == 0) {
            return ModalInfo("Document Number를 선택해 주세요.");
        } else if (props.nowType === "code" && selectedCodeList.length == 0) {
            return ModalInfo("검토결과를 선택해 주세요.");
        } else if (props.nowType === "change" && selectedChangeList.length == 0) {
            return ModalInfo("설계여부를 선택해 주세요.");
        }
        // value set
        let val: string;
        if (props.nowType == "docu") val = selectedDocuList[props.dataIdx];
        else if (props.nowType == "code") val = selectedCodeList[props.dataIdx];
        else val = selectedChangeList[props.dataIdx];
        //
        props.onChangeSelectData(val);
        props.onClose();
    };

    // Custom Element handlers
    const handleCodeChange = (e: any, dataIdx: number) => {
        selectedCodeList[dataIdx] = e.target.value;
        setSelectedCodeList([...selectedCodeList]);
    };

    const handleDocuChange = (e: any, dataIdx: number) => {
        selectedDocuList[dataIdx] = e.target.value;
        setSelectedDocuList([...selectedDocuList]);
    };

    const onHandleChangeDesign = (e: any, dataIdx: number) => {
        selectedChangeList[dataIdx] = e.target.value;
        setSelectedChangeList([...selectedChangeList]);
    };
    //

    const getTitle = () => {
        let title = "";
        switch (props.nowType) {
            case "docu":
                title = "Doc. No. 선택";
                break;
            case "code":
                title = "Code 선택";
                break;
            case "chang":
            default:
                title = "설계변경 여부 선택";
                break;
        }
        return title;
    };

    if (props.visible == false) return <></>;
    return (
        <Rnd
            default={{
                x: 100,
                y: 100,
                width: 360,
                height: 240,
            }}
            bounds="window"
            style={{ zIndex: 5 }}
        >
            <S.Block>
                <S.Inner>
                    <S.CloseBtn onClick={props.onClose}>
                        <Close style={{fontSize : "1.6em"}} />
                    </S.CloseBtn>
                    <S.TopTextBlock>
                        <S.TopBlock>
                            <S.TopBlockText1>{getTitle()}</S.TopBlockText1>
                        </S.TopBlock>
                        <S.MidBlock>
                            {props.nowType === "docu" && (
                                <S.SelectBox
                                    value={selectedDocuList[props.dataIdx]}
                                    onChange={e => handleDocuChange(e, props.dataIdx)}
                                    disableUnderline
                                    key={"DOCU_NO_SELECT_BOX" + props.dataIdx}
                                >
                                    {props.docuCodeList.map((raw, idx) => {
                                        return (
                                            <S.Item key={"DOCU_NO_SELECT_ITEM" + idx} value={raw}>
                                                {props.docuDescList[idx]} / {raw}
                                            </S.Item>
                                        );
                                    })}
                                </S.SelectBox>
                            )}

                            {props.nowType === "code" && (
                                <S.SelectBox
                                    value={selectedCodeList[props.dataIdx]}
                                    onChange={e => handleCodeChange(e, props.dataIdx)}
                                    disableUnderline
                                    key={"DOCU_CODE_SELECT_BOX" + props.dataIdx}
                                >
                                    {code_list.map((raw, idx) => {
                                        return (
                                            <S.Item key={"DOCU_CODE_SELECT_ITEM" + idx} value={raw}>
                                                {raw}
                                            </S.Item>
                                        );
                                    })}
                                </S.SelectBox>
                            )}

                            {props.nowType === "change" && (
                                <S.SelectBox
                                    value={selectedChangeList[props.dataIdx]}
                                    onChange={e => onHandleChangeDesign(e, props.dataIdx)}
                                    disableUnderline
                                    key={"CHANGE_DESIGN_SELECT_BOX" + props.dataIdx}
                                >
                                    {change_design_select_list.map((raw, idx) => {
                                        return (
                                            <S.Item
                                                key={"CHANGE_DESIGN_SELECT_ITEM" + idx}
                                                value={raw}
                                            >
                                                {raw}
                                            </S.Item>
                                        );
                                    })}
                                </S.SelectBox>
                            )}
                        </S.MidBlock>
                    </S.TopTextBlock>
                    <S.BtmBtn onClick={onClickConfirm}>확인</S.BtmBtn>
                </S.Inner>
            </S.Block>
        </Rnd>
    );
};
