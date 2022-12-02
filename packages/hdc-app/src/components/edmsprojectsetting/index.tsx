/******************************************************************************
 * Copyright (c) 2021. Moornmo Inc. Rights reserved.                          *
 * Data modelings and methods used are assets of Moornmo Inc.                 *
 * edmsprojectsetting/index.tsx
 * hooks :
 * useLocations
 * components :
 * GridComponent
 * LoadingIndicatorComponent
 * last modify : jh.jeong@ilts.co.kr
 * 항상 첫번째에는 id : Primary Key 필요
 ******************************************************************************/
// Library
import { useSelector, useDispatch } from "react-redux"; // redux
import { useState, useEffect } from "react"; // default hooks
//
// Module
// util
import * as S from "./styled";
import * as T from "../../styled/edmsProject.styled";
import { SetIndexData } from "../../common/action";
import { reducerState } from "../../common";
import { LoadingIndicatorComponent, GridViewComponent } from "components";
// image
import Close from "@material-ui/icons/Close";
// library
//
export type edmsProjectSettingModalProps = {
    visible: boolean;
    onClose: () => void;
    title: string;
    type: string | null;
    customElIdx: number[];
    customElId: any[];
};

type tableDefineObject = {
    header: string;
    headSize: number;
    headType: 0 | 1 | 2;
    editType?: "text" | "numeric" | "boolean" | "date" | false;
    customEl?: true | false;
};

const TABLE_DEFINE: { [key: string]: tableDefineObject } = {
    user_id: { header: "ID", headSize: 1, headType: 1, editType: false, customEl: false },
    userid: { header: "사용자아이디", headSize: 2, headType: 0, editType: "text", customEl: false },
    password: { header: "비밀번호", headSize: 2, headType: 0, editType: "text", customEl: false },
    email: { header: "이메일", headSize: 2, headType: 0, editType: "text", customEl: false },
    username: {
        header: "사용자이름",
        headSize: 1.5,
        headType: 1,
        editType: "text",
        customEl: false,
    },
    level: {
        header: "1:관리자,2:담당자,3:일반",
        headSize: 2,
        headType: 1,
        editType: "numeric",
        customEl: false,
    },
    company_id: {
        header: "회사명",
        headSize: 1,
        headType: 1,
        editType: "numeric",
        customEl: true,
    },
    position_name: {
        header: "직급",
        headSize: 1.5,
        headType: 1,
        editType: "text",
        customEl: false,
    },
    priority: { header: "순서", headSize: 1, headType: 1, editType: "numeric", customEl: false },
    project_no: {
        header: "프로젝트 No.(프로젝트타입)",
        headSize: 1,
        headType: 1,
        editType: "numeric",
        customEl: true,
    },
    project_type_no: {
        header: "프로젝트 No.(프로젝트타입)",
        headSize: 1,
        headType: 1,
        editType: "numeric",
        customEl: false,
    },
    project_name: { header: "이름", headSize: 1.5, headType: 0, editType: "text", customEl: false },
    project_code: { header: "코드", headSize: 2, headType: 1, editType: "text", customEl: false },
    explan: { header: "설명", headSize: 3, headType: 0, editType: "text", customEl: false },
    name: { header: "이름", headSize: 2, headType: 0, editType: "text", customEl: false },
    cate_no: { header: "No.", headSize: 1, headType: 1, editType: false, customEl: false },
    cate_code: { header: "항목코드", headSize: 2, headType: 0, editType: false, customEl: false },
    cate_name: { header: "이름", headSize: 2, headType: 0, editType: "text", customEl: false },
    discipline_id: {
        header: "분야",
        headSize: 1,
        headType: 1,
        editType: "numeric",
        customEl: true,
    },
    docu_no: { header: "문서 No.", headSize: 2, headType: 1, editType: false, customEl: false },
    docu_code: { header: "Doc. No.", headSize: 2, headType: 0, editType: "text", customEl: false },
    docu_subject: {
        header: "Doc. Title",
        headSize: 3,
        headType: 0,
        editType: "text",
        customEl: false,
    },
    area_id: {
        header: "구역아이디",
        headSize: 1,
        headType: 1,
        editType: "numeric",
        customEl: false,
    },
    id: { header: "아이디", headSize: 1, headType: 1, editType: false, customEl: false },
    stage_name: { header: "이름", headSize: 1.5, headType: 1, editType: "text", customEl: false },
};

interface FinaledmsProjectSettingModalProps extends edmsProjectSettingModalProps {}

export const EdmsProjectSettingComp: React.FunctionComponent<
    FinaledmsProjectSettingModalProps
> = props => {
    const dispatch = useDispatch();
    const pjsettingSelector = useSelector((state: reducerState) => state.projectsettings);
    const pjSelector = useSelector((state: reducerState) => state.project);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    //grid
    const [nowData, setNowData] = useState<any[]>([]);
    const [tableHeader, setTableHeader] = useState<string[]>([]);
    const [tableHeadSize, setTableHeadSize] = useState<number[]>([]);
    const [tableHeadType, setTableHeadType] = useState<number[]>([]);
    const [tableEditType, setTableEditType] = useState<any[]>([]);
    const [tableCustomEl, setTableCustomEl] = useState<any[]>([]);
    const [keysWidthTotal, setKeysWidthTotal] = useState<number>(0);
    //
    const [originData, setOriginData] = useState<any[]>([]);

    useEffect(() => {
        if (props.type == null) {
            setNowData([]);
        } else {
            let data = pjsettingSelector.index_data[props.type];
            let _tableHeader = [];
            let _tableHeadSize = [];
            let _tableHeadType = [];
            let _tableEditType = [];
            let _tableCustomEl = [];
            if (data != undefined && data.length > 0) {
                setNowData([...data]);
                setOriginData([...data]);
                let keys = Object.keys(data[0]);
                for (var key of keys) {
                    _tableHeader.push(TABLE_DEFINE[key].header);
                    _tableHeadSize.push(TABLE_DEFINE[key].headSize);
                    _tableHeadType.push(TABLE_DEFINE[key].headType);
                    _tableEditType.push(TABLE_DEFINE[key].editType);
                    _tableCustomEl.push(TABLE_DEFINE[key].customEl);
                }
                setTableHeader([..._tableHeader]);
                setTableHeadSize([..._tableHeadSize]);
                setTableHeadType([..._tableHeadType]);
                setTableEditType([..._tableEditType]);
                setTableCustomEl([..._tableCustomEl]);
                setKeysWidthTotal(keys.length + 15); // 보정치 추가
            }
        }
    }, [props.type]);

    const onClose = () => {
        setIsLoading(false);
        props.onClose();
    };

    const onClickAdd = () => {
        let obj = {};
        const lastItem = originData[originData.length - 1];
        for (var key of Object.keys(lastItem)) {
            if (key == Object.keys(lastItem)[0]) Object.assign(obj, { [key]: lastItem[key] + 1 });
            else Object.assign(obj, { [key]: lastItem[key] });
        }
        setOriginData([...originData, obj]);
    };

    const onChangedItem = (keyVal: any, data: any) => {
        let changedItem = originData.find((raw: any) => Object.values(raw)[0] == keyVal);
        let key = Object.keys(data)[0];
        let editType = TABLE_DEFINE[key].editType;
        if (editType == "numeric") data[key] = new Number(data[key]);
        Object.assign(changedItem, data);
        setOriginData([...originData]);
    };

    const onClickApply = async () => {
        setNowData([...originData]);
        await dispatch(SetIndexData(props.type, originData));
    };

    const onClickDelete = (data: any) => {
        let idx = originData.findIndex(
            raw => raw[Object.keys(raw)[0]] == data[Object.keys(data)[0]]
        );
        originData.splice(idx, 1);
        setOriginData([...originData]);
        setNowData([...originData]);
    };

    const createCustomEl = (idx: number, dataidx?: number) => {
        let findIdx = props.customElIdx.findIndex(raw => raw == idx);
        if (findIdx != -1) {
            if (props.customElId[findIdx] == "company_id") {
                if (dataidx === undefined) return true;
                let company_list = pjSelector.edms_company_list;
                return (
                    <T.TableTd key={"company" + dataidx}>
                        <T.TableInputSelect
                            disableUnderline
                            value={originData[dataidx].company_id}
                            onChange={e => {
                                originData[dataidx].company_id = e.target.value;
                                setOriginData([...originData]);
                            }}
                        >
                            {company_list.map((raw: any, idx: number) => (
                                <T.InputSelectItem key={idx} value={raw.id}>
                                    {raw.company_name}
                                </T.InputSelectItem>
                            ))}
                        </T.TableInputSelect>
                    </T.TableTd>
                );
            } else if (props.customElId[findIdx] == "project_no") {
                if (dataidx === undefined) return true;
                let project_type_list = pjSelector.project_type_list;
                return (
                    <T.TableTd key={"project" + dataidx}>
                        <T.TableInputSelect
                            disableUnderline
                            value={originData[dataidx].project_no}
                            onChange={e => {
                                originData[dataidx].project_no = e.target.value;
                                setOriginData([...originData]);
                            }}
                        >
                            {project_type_list.map((raw: any, idx: number) => (
                                <T.InputSelectItem key={idx} value={raw.project_no}>
                                    {raw.project_name}
                                </T.InputSelectItem>
                            ))}
                        </T.TableInputSelect>
                    </T.TableTd>
                );
            } else if (props.customElId[findIdx] == "discipline_id") {
                if (dataidx === undefined) return true;
                let discipline = pjSelector.discipline_list;
                return (
                    <T.TableTd key={"discipline" + dataidx}>
                        <T.TableInputSelect
                            disableUnderline
                            value={originData[dataidx].discipline_id}
                            onChange={e => {
                                originData[dataidx].discipline_id = e.target.value;
                                setOriginData([...originData]);
                            }}
                        >
                            {discipline.map((raw: any, idx: number) => (
                                <T.InputSelectItem key={idx} value={raw.id}>
                                    {raw.name}
                                </T.InputSelectItem>
                            ))}
                        </T.TableInputSelect>
                    </T.TableTd>
                );
            }
        }
    };

    return (
        <>
            <style>
                {`
                    .k-grid table {
                        width : 100% !important;
                        margin : 0 -2px;
                    }
                    .k-grid td {
                        white-space : pre-wrap;
                    }
                `}
            </style>
            <S.Block style={props.visible ? { display: "flex" } : { display: "none" }}>
                <S.Inner>
                    <LoadingIndicatorComponent open={isLoading} style={{ zIndex: 1301 }} />
                    <S.Title>{props.title}</S.Title>
                    <S.CloseBtn>
                        <Close style={{ fontSize: "1.6em" }} onClick={onClose} />
                    </S.CloseBtn>
                    <S.Content>
                        {nowData.length > 0 && (
                            <GridViewComponent
                                titles={tableHeader}
                                keys={Object.keys(nowData[0])}
                                values={Object.values(nowData)}
                                fullData={nowData}
                                keysWidth={tableHeadSize}
                                keysWidthTotal={keysWidthTotal}
                                datatype={tableHeadType}
                                rowClass="background-color-white color-light-black pre-tag"
                                headerClass="background-dark-sky-blue color-white align-center"
                                isEdit={true}
                                isAdd={true}
                                isSearch={true}
                                editKey={Object.keys(nowData[0])[0]}
                                editType={tableEditType}
                                onClickAdd={onClickAdd}
                                onClickApply={onClickApply}
                                onClickDel={onClickDelete}
                                onItemChanged={onChangedItem}
                                filterable={false}
                                sortable={true}
                                getCustomEl={
                                    tableCustomEl.indexOf(true) != -1 ? createCustomEl : undefined
                                }
                                noRecordsMsg={"표시할 내용이 없습니다."}
                            />
                        )}
                    </S.Content>
                </S.Inner>
            </S.Block>
        </>
    );
};
