/******************************************************************************
 * * hooks :
    * useLocations 
    *
 * components : 
    * ConfirmButton
    * 
 * TODO :: Accordian to component need.
 ******************************************************************************/
// Library
import React, { useState, useEffect } from "react";
import * as S from "./styled";
// import searchIconSvg from "../../images/fontawsomeicon/search-icon.svg";
import { useLocations } from "hooks";
import { useSelector, useDispatch } from "react-redux";
import { reducerState } from "../../common";
import { GroupManageComp} from "../groupCRUD";
import { PositionManageComp} from "../positionCRUD";
import { EditGroup, EditPosition } from "../../common/action";
import { LoadingIndicatorComponent } from "components";

export type tableCompProps = {
    data: any[];
    companyList: any[];
    style?: object;
    headSize: Array<number>;
    onChangeTab: (company: string) => void;
}
interface FinaltableProps extends tableCompProps { };

const THEAD_LIST = [
    "부서",
    "직급",
    "이름",
    "연락처",
    "이메일"
]

export const AddressBookComponent: React.FunctionComponent<FinaltableProps> = (props: FinaltableProps) => {
    const dispatch = useDispatch();
    const userSelector = useSelector((state: reducerState) => state.user);
    const { pushHistory } = useLocations();
    const [selectedCompany, setSelectedCompany] = useState<number>(0);
    const [searchdata, setSearch] = useState<string>("");
    const [DATA, setData] = useState<any[]>([]);

    const [visibleGroup, setVisibleGroup] = useState<boolean>(false);
    const [visiblePos, setVisiblePos] = useState<boolean>(false);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { back } = useLocations();

    useEffect(() => {
        if (props.companyList && props.companyList.length > 0) {
            let company: any = props.companyList[selectedCompany];
            props.onChangeTab(company.company);
        }
    }, [selectedCompany, DATA]);

    useEffect(() => {
        if (props.data)
            onSearchData(searchdata?searchdata:"");                                          
    }, [props.data, searchdata]);                               
    
    const onSearchData = (value: string) => {
        setData(props.data.filter((object) => {
            return (object.name.toLowerCase().includes(value.toLowerCase()) ||
                object.tel.toLowerCase().includes(value.toLowerCase()) ||
                object.email.toLowerCase().includes(value.toLowerCase()) ||
                object.group.toLowerCase().includes(value.toLowerCase()) ||
                object.position.toLowerCase().includes(value.toLowerCase())
            );
        }));
    }

    const onCompleteGroup = (list : any[], new_list : any[], comp : number) => {
        setIsLoading(true);
        dispatch(EditGroup(list, new_list, comp));
        setTimeout(() => {
            setIsLoading(false);
            back();
        }, 2000);
    }

    const onCompletePos = (list : any[], new_list : any[]) => {
        setIsLoading(true);
        dispatch(EditPosition(list, new_list));
        setTimeout(() => {
            setIsLoading(false);
            back();
        }, 2000);
    }

    return (
        <S.TableWrap>
        <LoadingIndicatorComponent open={isLoading} />
            <GroupManageComp
                company = {props.companyList[selectedCompany]}
                visible = {visibleGroup}
                onClose = {()=>setVisibleGroup(false)}
                onComplete = {(list: any[], new_list: any[], company: number) => onCompleteGroup(list, new_list, company)}
            />
            <PositionManageComp
                visible = {visiblePos}
                onClose = {()=>setVisiblePos(false)}
                onComplete = {(list: any[], new_list: any[]) => onCompletePos(list, new_list)}
            />
            <S.TopMenuBlock>
                <S.TableMenu
                    TabIndicatorProps={{ style: { backgroundColor: "#4B5964" } }}
                    value={selectedCompany}
                    onChange={(e, value) => setSelectedCompany(value)}
                >
                    {props.companyList.map((row: any, idx: number) => (
                        <S.BtnMenu key={idx} $active={selectedCompany == row.company} label={row.company} />
                    ))}
                </S.TableMenu>
                <S.GroupBtnDiv>
                    <S.GroupBtn onClick={() => setVisibleGroup(true)}>부서관리하기</S.GroupBtn>
                    <S.GroupBtn onClick={() => setVisiblePos(true)}>직급관리하기</S.GroupBtn>
                </S.GroupBtnDiv>
            </S.TopMenuBlock>
            <S.TheadDiv>
                {THEAD_LIST.map((row, idx) => (
                    <S.Thead key={idx} $headSize={props.headSize[idx]}>
                        {THEAD_LIST[idx]}
                    </S.Thead>
                ))}
                <S.Searchdiv>
                    <S.SearchInput
                        placeholder={"주소록 검색"}
                        value={searchdata}
                        onChange={(e) => { setSearch(e.target.value) }}
                        InputProps={{
                            disableUnderline: true
                        }}
                    />
                </S.Searchdiv>
            </S.TheadDiv>
            <S.TableContainer style={props.style}>
                <S.BoardTable aria-label="simple table">
                    <colgroup>
                        {props.headSize.map((n, index) => (<col key={index} width={n + "%"} />))}
                    </colgroup>
                    <S.BoardBody>
                        {DATA.map((row: any, idx: number) => {
                            return(
                                <S.TableBodyRow key={"tableRow" + idx}>
                                {Object.values(row).map((value: any, val_idx: number) => {
                                    // comp, no 제외
                                    if (val_idx == 0 || val_idx == 1) return null;
                                    return (
                                        <S.TableBodyCell
                                            key={"tableCell" + val_idx}
                                            align="center"
                                            style={{ width: props.headSize[val_idx - 2] + "%" }}
                                        >
                                            {value}
                                        </S.TableBodyCell>
                                    );
                                })}
                                <S.TableBodyCell>
                                    <S.ToolEditBtn onClick={() => pushHistory("/userinfo/" + row.no)}>정보수정하기</S.ToolEditBtn>
                                </S.TableBodyCell>
                            </S.TableBodyRow>
                            );
                        })}
                    </S.BoardBody>
                </S.BoardTable>
            </S.TableContainer>
        </S.TableWrap>
    );
};
