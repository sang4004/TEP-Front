/******************************************************************************
 * appwrapper/index.tsx
 * hooks :
 * useLocations
 *
 ******************************************************************************/
// Library
import { useSelector, useDispatch } from "react-redux"; // redux
import { useState, useEffect } from "react"; // default hooks
//
// Module
import * as S from "./styled";
import { reducerState } from "../../common";
import { GetMainMyTaskList } from "../../common/action";
import { EdmsUserMainBtmCardComponent } from "../../components";
import moment, { Moment } from "moment";
import RightArrowSvg from "../../images/fontawsomeicon/chevron-right-solid.svg";

const WORK_TYPE = ["TR", "문서회신"];

const ALIGNMENT_TYPE = ["TR.No", "생성일"];

export type userMainBtmCardProps = {};

interface FinaluserMainBtmCardProps extends userMainBtmCardProps {}

export const UserMainBtmCardComponent: React.FunctionComponent<FinaluserMainBtmCardProps> = () => {
    const dispatch = useDispatch();
    const workSelector = useSelector((state: reducerState) => state.work);

    const [selectedType, setSelectedType] = useState<string>("TR");
    const [startDate, setStartDate] = useState<Date>(
        new Date(new Date().setMonth(new Date().getMonth() - 1))
    );
    const [endDate, setEndDate] = useState<Date>(new Date());
    const [searchKeyword, setSearchKeyword] = useState<string>("");
    const [orderType, setOrderType] = useState<string>("생성일");

    // useEffect(() => {
    //     dispatch(
    //         GetMainMyTaskList(
    //             null,
    //             moment(startDate).format("YYYY-MM-DD HH:mm:ss"),
    //             moment(endDate).format("YYYY-MM-DD HH:mm:ss"),
    //             null,
    //             null
    //         )
    //     );
    // }, []);

    useEffect(() => {
        onSearch();
    }, [selectedType, startDate, endDate, orderType]);

    const onSearch = () => {
        dispatch(
            GetMainMyTaskList(
                selectedType != "선택" ? selectedType : null,
                moment(startDate).format("YYYY-MM-DD HH:mm:ss"),
                moment(endDate).add(1, "day").format("YYYY-MM-DD HH:mm:ss"),
                searchKeyword != "" ? searchKeyword : null,
                orderType == "TR.NO" ? 1 : orderType == "생성일" ? 2 : null
            )
        );
    };

    const onChangeDate = (date: any, type: "start" | "end") => {
        if (type == "start") {
            setStartDate(date);
        } else if (type == "end") {
            setEndDate(date);
        }
    };

    return (
        <>
            <S.Block>
                <style>
                    {`
                    .k-grid td {
                        border-color : rgb(0 0 0 / 20%);
                    }
                `}
                </style>

                <S.BtmWrap>
                    {/* <S.HomeTitle>
                        <S.HomeTitleText>MyTask</S.HomeTitleText>
                    </S.HomeTitle> */}
                    <S.BigSearchDiv>
                        <S.SelectBoxDiv>
                            <S.ForomControler>
                                <S.FormType
                                    value={selectedType}
                                    onChange={(e: any) => setSelectedType(e.target.value)}
                                    disableUnderline={true}
                                    inputProps={<S.OutlinedInputDiv label="타입" />}
                                    style={{
                                        marginTop: "0px",
                                    }}
                                >
                                    {WORK_TYPE.map((val: string, idx: number) => {
                                        return (
                                            <S.MenuItemType key={idx} value={val}>
                                                {val}
                                            </S.MenuItemType>
                                        );
                                    })}
                                </S.FormType>
                            </S.ForomControler>
                            <S.ForomControler>
                                <S.FormType
                                    value={orderType}
                                    onChange={(e: any) => setOrderType(e.target.value)}
                                    disableUnderline={true}
                                    inputProps={<S.OutlinedInputDiv label="정렬" />}
                                    style={{
                                        marginTop: "0px",
                                    }}
                                >
                                    {ALIGNMENT_TYPE.map((val: string, idx: number) => {
                                        return (
                                            <S.MenuItemType key={idx} value={val}>
                                                {val}
                                            </S.MenuItemType>
                                        );
                                    })}
                                </S.FormType>
                            </S.ForomControler>
                        </S.SelectBoxDiv>
                        <S.SearchBar>
                            <S.SearchDateDiv>
                                <S.Date
                                    type="date"
                                    id="date-picker-inline"
                                    value={moment(startDate).format("YYYY-MM-DD")}
                                    min="2017-01-01"
                                    max="2030-12-31"
                                    onChange={(e: any) => onChangeDate(e.target.value, "start")}
                                />
                                ~
                                <S.Date
                                    type="date"
                                    id="date-picker-inline"
                                    value={moment(endDate).format("YYYY-MM-DD")}
                                    min="2017-01-01"
                                    max="2030-12-31"
                                    onChange={(e: any) => onChangeDate(e.target.value, "end")}
                                />
                            </S.SearchDateDiv>
                            <S.SearchText
                                value={searchKeyword}
                                onChange={e => setSearchKeyword(e.target.value)}
                                onKeyUp={e => {
                                    if (e.key == `Enter`) onSearch();
                                }}
                                InputProps={{
                                    disableUnderline: true,
                                }}
                            />
                            <S.SearchBtn onClick={() => onSearch()}>검색하기</S.SearchBtn>
                        </S.SearchBar>
                    </S.BigSearchDiv>
                    <EdmsUserMainBtmCardComponent style={{ flex: 1 }} title={"My Task"} />
                </S.BtmWrap>
            </S.Block>
        </>
    );
};
