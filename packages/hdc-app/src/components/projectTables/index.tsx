/******************************************************************************
 * Copyright (c) 2021. Moornmo Inc. Rights reserved.                          *
 * Data modelings and methods used are assets of Moornmo Inc.                 *
 * appwrapper/index.tsx
 * hooks :
 * useLocations
 *
 * last modify : jh.jeong@ilts.co.kr
 ******************************************************************************/
// Module
import * as S from "./styled";
import React, { useState, useEffect } from "react";
import searchBtn from "../../images/fontawsomeicon/search-icon.svg";
import trashImg from "../../images/edms/trash.svg";
import editImg from "../../images/edms/pen-solid.svg";
import { getMoment } from "../../common/utils";
import { GridViewComponent } from "components";
import { useDispatch, useSelector } from "react-redux";
import { reducerState } from "../../common";
import { useLocations } from "hooks";
import { GetProjectDetail, ChangeNavTitle, WorkAchieve } from "../../common/action";

const moment = getMoment();

const tableHeadType = [0, 1, 1];
const tableHeadSize = [1.7, 0.4, 0.5];
const tableHeader = ["성과물 제목", "작성자", "작성일자"];

const tableHeadType1 = [1, 1, 1, 1, 1];
const tableHeadSize1 = [0.9, 0.4, 0.4, 0.8, 0.9];
const tableHeader1 = ["회사", "직급", "이름", "연락처", "이메일"];

export type projectTablesProps = {};
interface FinalprojectTablesProps extends projectTablesProps {}
export const ProjectTablesComponent: React.FunctionComponent<FinalprojectTablesProps> = props => {
    const pjSelector = useSelector((stata: reducerState) => stata.project);
    const orgSelector = useSelector((stata: reducerState) => stata.organization);
    const acSelector = useSelector((stata: reducerState) => stata.achieve);

    const { path } = useLocations();
    const dispatch = useDispatch();

    const [companyList, setCompanyList] = useState<any[]>([]);
    const [peopleList, setPeopleList] = useState<any[]>([]);
    const [peopleListKeys, setPeopleListKeys] = useState<any[]>([]);
    const [companyidx, setCompanyIdx] = useState<number>(1);
    const [searchData, setSearchData] = useState<string>("");
    const [achList, setAchList] = useState<any[]>([]);
    const [achListKeys, setAchListKeys] = useState<any[]>([]);

    useEffect(() => {
        dispatch(ChangeNavTitle("EDMS - 기준정보 - 프로젝트 상세"));
    }, [path]);

    useEffect(() => {
        dispatch(WorkAchieve(pjSelector.now_project_no));
    }, [pjSelector.now_project_no]);

    useEffect(() => {
        if (orgSelector.company_list) {
            setCompanyList(orgSelector.company_list);
        }
    }, [orgSelector.company_list]);

    useEffect(() => {
        if (acSelector.work_achieve_list && acSelector.work_achieve_list.length > 0) {
            let _list = [];
            for (var achieve of acSelector.work_achieve_list) {
                _list.push({
                    subject: achieve.file_name,
                    create_by: achieve.create_by,
                    create_tm: moment(achieve.create_tm).format(`YYYY-MM-DD`),
                });
            }
            setAchList([..._list]);
            setAchListKeys([...Object.keys(_list[0])]);
        } else if (acSelector.work_achieve_list && acSelector.work_achieve_list.length == 0) {
            setAchList([]);
        }
    }, [acSelector.work_achieve_list]);

    useEffect(() => {
        if (orgSelector.addressbook && orgSelector.addressbook.length > 0) {
            let filted: any[] = orgSelector.addressbook.filter((obj: any) => obj.oid == companyidx);
            let _list = [];
            for (var people of filted) {
                _list.push({
                    company: people.company,
                    position: people.position,
                    username: people.username,
                    phone_number: people.phone_number,
                    email: people.email,
                });
            }
            setPeopleList([..._list]);
            setPeopleListKeys([...Object.keys(_list[0])]);
        }
    }, [orgSelector.addressbook, companyidx]);

    const Search = (is_search: boolean) => {
        if (orgSelector.addressbook.length > 0 && searchData.length > 0) {
            let _data = orgSelector.addressbook;
            let _idx: number[] = [];
            for (var d of _data) {
                let _list: any[] = Object.values(d);
                if (_list.length > 0) _idx.push(_list[0]);
            }
            let searchObj: any[] = [];
            if (is_search) {
                for (var d of _data.filter((raw: any) => _idx.indexOf(raw.id) != -1)) {
                    let _list: any[] = Object.values(d);
                    let filterList = _data.filter((raw: any) => {
                        let _id = raw.id == _list[0];
                        return (
                            (_id && raw.company.includes(searchData)) ||
                            (_id && raw.position.includes(searchData)) ||
                            (_id && raw.username.includes(searchData)) ||
                            (_id && raw.phone_number.includes(searchData)) ||
                            (_id && raw.email.includes(searchData))
                        );
                    });
                    if (filterList.length == 0) _idx.splice(_idx.indexOf(_list[0]), 1);
                }
            }
            for (var d of _data) {
                let _list: any[] = Object.values(d);
                if (_idx.indexOf(_list[0]) != -1) {
                    searchObj.push(d);
                }
            }
            setPeopleList([...searchObj]);
        }
    };

    return (
        <>
            {/* Box1 */}
            <S.ProjectDetailBox $boxSize={49}>
                <S.ProjectDetailBoxHeader>
                    <S.ProjectDetailBoxTitle>프로젝트 성과물</S.ProjectDetailBoxTitle>
                </S.ProjectDetailBoxHeader>
                <S.ProjectOutputTable>
                    <GridViewComponent
                        titles={tableHeader}
                        keys={achListKeys}
                        values={achList}
                        fullData={achList}
                        keysWidth={tableHeadSize}
                        datatype={tableHeadType}
                        rowClass="background-color-white color-light-black"
                        headerClass="background-dark-sky-blue color-white align-center"
                    />
                </S.ProjectOutputTable>
            </S.ProjectDetailBox>

            {/* Box2 */}
            <S.ProjectDetailBox $boxSize={49}>
                <S.ProjectDetailBoxHeader>
                    <S.ProjectDetailBoxTitle>
                        <select
                            //value={companyidx}
                            onChange={(e: any) => setCompanyIdx(e.target.value)}
                        >
                            {companyList.map((raw: any) => {
                                return <option value={raw.id}>{raw.company}</option>;
                            })}
                        </select>
                    </S.ProjectDetailBoxTitle>
                    <S.SearchBoxWrap>
                        <S.SearchBoxInput
                            type="text"
                            placeholder="주소록 검색"
                            value={searchData}
                            onChange={e => setSearchData(e.target.value)}
                            onKeyUp={e => {
                                if (e.key == `Enter`) Search(true);
                            }}
                        />
                        <S.SearchBox>
                            <img src={searchBtn} onClick={() => Search(true)} />
                        </S.SearchBox>
                    </S.SearchBoxWrap>
                </S.ProjectDetailBoxHeader>

                    <S.ProjectAdrTableBody>
                        <GridViewComponent
                            titles={tableHeader1}
                            keys={peopleListKeys}
                            values={peopleList}
                            fullData={peopleList}
                            keysWidth={tableHeadSize1}
                            datatype={tableHeadType1}
                            rowClass="background-color-white color-light-black"
                            headerClass="background-dark-sky-blue color-white align-center"
                            reorderable
                        />
                    </S.ProjectAdrTableBody>
            </S.ProjectDetailBox>
        </>
    );
};
