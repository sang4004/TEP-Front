/******************************************************************************
 * projecttreemodal/index.tsx
 * hooks :
 * useLocations
 *
 ******************************************************************************/
// Library
import React, { useState, useEffect } from "react"; // default hooks
//image
import closeSvg from "../../images/edms/times-solid-white.svg";
//styled
import * as S from "./styled";
// Module
import { useSelector, useDispatch } from "react-redux";
import { reducerState } from "../../common";
import { ModalInfo, LoadingIndicatorComponent } from "components";
import { GetEdmsAddress, GetTmCodeList, EditTmCode } from "../../common/action";

export type edmsTmRuleModalProps = {
    style?: object;
    visible: boolean;
    onClose: () => void;
};
interface FinaledmsTmRuleModalProps extends edmsTmRuleModalProps {}

export const EdmsTmRuleModal: React.FunctionComponent<FinaledmsTmRuleModalProps> = props => {
    const dispatch = useDispatch();
    const pjSelector = useSelector((state: reducerState) => state.project);
    const tmSelector = useSelector((state: reducerState) => state.tm);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [companyList, setCompanyList] = useState<any[]>([]);
    const [tmCodeList, setTmCodeList] = useState<any[]>([]);
    const [companyId, setCompanyId] = useState<number>(-1);
    const [startCode, setStartCode] = useState<any>("");
    const [midCode, setMidCode] = useState<any>("");
    const [lastCode, setLastCode] = useState<any>("");

    useEffect(() => {
        dispatch(GetEdmsAddress());
        dispatch(GetTmCodeList());
    }, []);

    useEffect(() => {
        if (pjSelector.edms_company_list) {
            setCompanyList(pjSelector.edms_company_list);
        }
    }, [pjSelector.edms_company_list]);

    useEffect(() => {
        if (tmSelector.tm_code_list) {
            setTmCodeList(tmSelector.tm_code_list);
        }
    }, [tmSelector.tm_code_list]);

    useEffect(() => {
        if (tmSelector.edit_tm_code_data) {
            dispatch(GetTmCodeList());
            setTimeout(() => {
                setIsLoading(false);
                ModalInfo("TR 채번 수정이 완료되었습니다.");
                props.onClose();
            }, 2000);
            setCompanyId(-1);
            setStartCode("");
            setMidCode("");
            setLastCode("");
        }
    }, [tmSelector.edit_tm_code_data]);

    const onClose = () => {
        props.onClose();
        setCompanyId(-1);
        setStartCode("");
        setMidCode("");
        setLastCode("");
    };

    const onChangeCode = (id: number) => {
        let filtered = tmCodeList.filter(raw => raw.company_id == id);

        if (filtered && filtered.length > 0) {
            setCompanyId(id);
            setStartCode(filtered.map(raw => raw.tm_code_start));
            setMidCode(filtered.map(raw => raw.tm_code_mid));
            setLastCode(filtered.map(raw => raw.tm_code_last));
        }
    };

    const onSave = () => {
        if (companyId == -1) return ModalInfo("회사를 선택하세요.");
        if (startCode.length == 0) return ModalInfo("첫 번째 코드를 입력하세요.");
        if (midCode.length == 0) return ModalInfo("두 번째 코드를 입력하세요.");
        if (lastCode.length == 0) return ModalInfo("세 번째 코드를 입력하세요.");

        setIsLoading(true);
        dispatch(EditTmCode(companyId, startCode, midCode, lastCode));
    };

    return (
        <S.Block open={props.visible ? true : false} onClose={props.onClose}>
            <S.Inner>
                <LoadingIndicatorComponent open={isLoading} style={{ zIndex: 1301 }} />
                <S.ModalHeader>
                    <S.HeaderTitle>TR 채번 규칙 관리</S.HeaderTitle>
                    <S.ModalCloseBtn onClick={onClose}>
                        <img src={closeSvg} />
                    </S.ModalCloseBtn>
                </S.ModalHeader>

                <S.ModalContentWrap>
                    <S.ModalInputBox>
                        <S.InputTitle>회사 선택</S.InputTitle>
                        <S.InputSelect
                            disableUnderline
                            onChange={(e: any) => onChangeCode(e.target.value)}
                        >
                            {companyList.map((raw: any, idx: number) => {
                                return (
                                    <S.InputSelectItem key={idx} value={raw.id}>
                                        {raw.company_name}
                                    </S.InputSelectItem>
                                );
                            })}
                        </S.InputSelect>
                    </S.ModalInputBox>
                    <S.ModalInputBox>
                        <S.InputTitle>채번 설정</S.InputTitle>
                        <S.Input
                            value={startCode}
                            onChange={(e: any) => setStartCode(e.target.value)}
                        ></S.Input>
                        <S.InputLineDiv>-</S.InputLineDiv>
                        <S.Input
                            $$boxType="wide"
                            value={midCode}
                            onChange={(e: any) => setMidCode(e.target.value)}
                        ></S.Input>
                        <S.InputLineDiv>-</S.InputLineDiv>
                        <S.InputText>자동분야</S.InputText>
                        <S.InputLineDiv>-</S.InputLineDiv>
                        <S.InputText>자동번호</S.InputText>
                        <S.InputLineDiv>-</S.InputLineDiv>
                        <S.Input
                            value={lastCode}
                            onChange={e => setLastCode(e.target.value)}
                        ></S.Input>
                    </S.ModalInputBox>
                </S.ModalContentWrap>
                <S.ModalBtnContainer>
                    <S.CloseBtn onClick={onClose}>닫기</S.CloseBtn>
                    <S.SaveBtn onClick={onSave}>저장</S.SaveBtn>
                </S.ModalBtnContainer>
            </S.Inner>
        </S.Block>
    );
};
