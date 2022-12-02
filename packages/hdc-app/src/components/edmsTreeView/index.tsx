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
import { useState, useEffect } from "react"; // default hooks
//
// Module
// util
import { reducerState } from "../../common";
import { domain } from "../../common/network";
// image
// import categorySvg from "../../images/edms/worklist_dep3.svg";
// import searchSvg from "../../images/edms/worklist_dep4.svg";
// import workfolder from "../../images/edms/worklist_dep5.svg";
// import searchIconSvg from "../../images/icon/search_icon.svg";
// library
import {
    TreeView,
    TreeViewExpandChangeEvent,
    handleTreeViewCheckChange,
    processTreeViewItems,
    TreeViewItemClickEvent,
} from "@progress/kendo-react-treeview";

//type
import { TreeViewFiltered, AuthDataType, SelectItme } from "./contant";

//styled
import * as S from "./styled";

export type EdmsTreeViewProps = {
    onChangeTreeData: (data: any) => void;
    onTreeItemClick: (e: TreeViewItemClickEvent) => void;
    onChangeProjectData?: (
        project_list: any[],
        discipline_list: any[],
        cate_list: any[],
        docu_list: any[]
    ) => void;
    filtered?: TreeViewFiltered;
    searchData?: string;
    authData?: AuthDataType;
    docuData?: any;
    selectedItem?: string;
    selectedItems?: string[];
    is_checked?: boolean;
    checked?: string[];
    //검색 기능 여부
    isSearch?: boolean;
    isExapndOnClick?: boolean;
    onCheck?: (ids: any, checked?: any) => void;
    docuCode?: boolean;
    //  0 : dcl 문서, 1 : v/p, 2 : 전체 문서
    dataType?: "DCL" | "VP" | "ALL";
    // expand :  검색된 아이템 펼치기 | filtred : 검색된 아이템만 트리에 노출
    isCloseDisciplines?: boolean; // Discipline 블락
    isCloseDocument?: boolean; // 도큐먼트 블락
    isCloseCategory?: boolean; // 카테고리 블락
    isSelectItem?: SelectItme; // 선택 아이템 회색 백그라운드 컬러 추가
    isHeader?: boolean; // 선택 아이템을 표시하는 header
    selectedHeaderItem?: any; // selectedItems
    clearSeletedTreeItem?: (e: any) => void; // header close button event
    selectedManager?: object[]; // 담당자 데이터
    expand?: { ids: any; idFiled: string };
};

interface FinalEdmsTreeViewProps extends EdmsTreeViewProps {}

export interface TreeIdDataType {
    type: string;
    disc_no?: number;
    cate_no?: number;
    docu_no?: number;
}

var treeIds: string[] = [];
var treeIdDatas: TreeIdDataType[] = [];
export const EdmsTreeViewComp: React.FunctionComponent<FinalEdmsTreeViewProps> = props => {
    const pjSelector = useSelector((state: reducerState) => state.projectsettings);

    const [treeData, setTreeData] = useState<any[]>([]);
    const [projectList, setProjectList] = useState<any[]>([]);
    const [documentList, setDocumentList] = useState<any[]>([]);
    const [categoryList, setCategoryList] = useState<any[]>([]);
    const [disciplineList, setDisciplineList] = useState<any[]>([]);
    const [selectedItemId, setSelectedItemId] = useState<string>("");
    const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);
    // const [selectedItems, setSelectedItems] = useState<any[]>([]);
    const [keyWord, setKeyWord] = useState<string>("");
    const [searchData, setSearchData] = useState<string>(props.searchData ? props.searchData : "");
    const [docuCode, setDocuCode] = useState<boolean>(false);
    const [check, setCheck] = useState({
        ids: props.checked ? props.checked : [],
        applyCheckIndeterminate: true,
        idFiled: "id",
    });
    const [selectedHeaderItem, setSelectedHeaderItem] = useState<any>();

    const [expand, setExpand] = useState<{ ids: any; idFiled: string }>({
        ids: [],
        idFiled: "id",
    });

    useEffect(() => {
        if (pjSelector.project_list) setProjectList(pjSelector.project_list);
        if (pjSelector.discipline_list) setDisciplineList(pjSelector.discipline_list);
        if (pjSelector.cate_list) setCategoryList(pjSelector.dcl_cate_list);
        if (pjSelector.docu_list) setDocumentList(pjSelector.docu_list);
    }, [
        pjSelector.project_list,
        pjSelector.cate_list,
        pjSelector.docu_list,
        pjSelector.discipline_list,
    ]);

    useEffect(() => {
        if (
            projectList.length > 0 &&
            disciplineList.length > 0 &&
            categoryList.length > 0 &&
            documentList.length > 0
        ) {
            makeTree();
        }
    }, [projectList, props.filtered]);

    useEffect(() => {
        if (props.isSearch && searchData === "") {
            let _expand = props.expand ? props.expand : { ids: [], idFiled: "id" };
            setExpand(_expand);
            makeTree();
        } else if (props.isSearch && searchData != "") makeTree(searchData);
        else if (props.authData) makeTree();
        else if (props.docuData) makeTree();
        else if (props.selectedManager) makeTree();
        if (props.selectedItem) setSelectedItemId(props.selectedItem);
        if (props.selectedItems) setSelectedItemIds(props.selectedItems);
        if (props.docuCode) setDocuCode(props.docuCode);
    }, [
        searchData,
        props.authData,
        props.selectedItem,
        props.selectedItems,
        props.docuData,
        props.docuCode,
        props.selectedManager,
    ]);

    useEffect(() => {
        if (props.expand && expand.ids.length == 0) {
            setExpand(props.expand);
        }
    }, [props.expand]);

    useEffect(() => {
        if (props.isSelectItem) {
            let _searchData = searchData == "" ? null : searchData;
            makeTree(_searchData);
        }
    }, [props.isSelectItem]);

    useEffect(() => {
        setSelectedHeaderItem(props.selectedHeaderItem);
    }, [props.selectedHeaderItem]);

    const makeTree = (searchData: null | string = null, _check?: any[]) => {
        if (projectList.length != 0) {
            let list: any[] = [];
            let _projectList: any[] = [];
            let _disciplineList: any[] = [];
            let _categoryList: any[] = [];
            let _documentList: any[] = [];
            //filtered
            let filterProjects: any[] = projectList;
            let filterDisciplines: any[] = [];
            let filterCates: any[] = [];
            let filterDocus: any[] = [];
            let visibleProject: boolean = true;
            let visibleDiscipline: boolean = true;
            let visibleCate: boolean = true;
            let visibleDocu: boolean = true;
            treeIdDatas = [];
            treeIds = [];

            if (props.dataType && props.dataType != "ALL") {
                let is_vp = props.dataType == "VP" ? 1 : 0;
                if (!props.isCloseDisciplines)
                    filterDisciplines = disciplineList.filter(raw => parseInt(raw.is_vp) == is_vp);
                if (!props.isCloseCategory)
                    filterCates = categoryList.filter(raw => parseInt(raw.is_vp) == is_vp);
                if (!props.isCloseDocument)
                    filterDocus = documentList.filter(raw => parseInt(raw.is_vp) == is_vp);
            } else {
                if (!props.isCloseDisciplines) filterDisciplines = [...disciplineList];
                if (!props.isCloseCategory) filterCates = [...categoryList];
                if (!props.isCloseDocument) filterDocus = [...documentList];
            }

            if (props.filtered) {
                if (props.filtered.project) {
                    let p = props.filtered.project;
                    filterProjects = projectList
                        .filter(raw => p.no.indexOf(raw.project_no) != -1)
                        .sort((a, b) => b.project_no - a.project_no);
                    visibleProject = props.filtered.project.visibile === false ? false : true;
                }
                if (props.filtered.discipline) {
                    let d = props.filtered.discipline;
                    filterDisciplines = filterDisciplines.filter(raw => d.no.indexOf(raw.id) != -1);
                    visibleDiscipline = props.filtered.discipline.visibile === false ? false : true;
                }
                if (props.filtered.cate) {
                    let c = props.filtered.cate;
                    filterCates = filterCates.filter(raw => c.no.indexOf(raw.cate_no) != -1);
                    visibleCate = props.filtered.cate.visibile === false ? false : true;
                }
                if (props.filtered.docu) {
                    let docu = props.filtered.docu;
                    filterDocus = filterDocus.filter(raw => docu.no.indexOf(raw.docu_no) != -1);
                    visibleDocu = props.filtered.docu.visibile === false ? false : true;
                }
            }

            let authData: any = null;
            if (props.authData) authData = props.authData;
            let docuData: any = null;
            if (props.docuData) docuData = props.docuData;

            // project start
            for (let pj of filterProjects) {
                if (visibleProject === false) break;
                let isSearched = searchData && pj.project_name.indexOf(searchData) != -1;
                let isAuth = authData != null && authData._projtype.indexOf(pj.project_no) != -1;

                list.push({
                    name: pj.project_name,
                    fname: pj.project_name,
                    code: pj.project_code,
                    id: list.length.toString(),
                    itemId: list.length.toString(),
                    type: "project",
                    items: [],
                    project_no: pj.project_no,
                    isSearched,
                    isAuth,
                    isSelect: getIsSelect("project", pj.project_no),
                });

                // discipline
                for (var discipline of filterDisciplines) {
                    if (visibleDiscipline === false) break;
                    let discObj = list[list.length - 1];

                    //
                    if (discipline.project_no == pj.project_no) {
                        //discipline 담당자 체크
                        let item_id = discObj.id + "_" + discObj.items.length;
                        isSearched = searchData && discipline.name.indexOf(searchData) != -1;
                        isAuth = authData != null && authData._dcl.indexOf(discipline.id) != -1;
                        discObj.items.push({
                            name:
                                discipline.is_vp == 1 ? "(VP)" + discipline.name : discipline.name,
                            fname: `${discObj.fname},${discipline.name}`,
                            id: item_id,
                            itemId: item_id,
                            type: "discipline",
                            items: [],
                            discipline_id: discipline.id,
                            isSearched,
                            isAuth,
                            isManager: getIsManager("discipline_id", discipline.id),
                            isSelect: getIsSelect("discipline", discipline.id),
                        });
                        treeIds.push(item_id);
                        treeIdDatas.push({
                            type: "discipline",
                            disc_no: discipline.id,
                        });
                        // category
                        for (let cate of filterCates) {
                            if (visibleCate === false) break;
                            let nowObj = discObj.items[discObj.items.length - 1];
                            //pcate start
                            if (
                                discipline.id === cate.discipline_id &&
                                pj.project_no === cate.project_no
                            ) {
                                let itemLength = nowObj.items.length;
                                let itemId = nowObj.id + "_" + itemLength;
                                if (cate.pcate_no === 0) {
                                    isSearched =
                                        searchData && cate.cate_name.indexOf(searchData) != -1;
                                    isAuth =
                                        authData != null &&
                                        authData._cate.indexOf(cate.cate_no) != -1;

                                    nowObj.items.push({
                                        name: cate.cate_name,
                                        fname: `${nowObj.fname},${cate.cate_name}`,
                                        id: itemId,
                                        itemId: itemId,
                                        type: "pcategory",
                                        items: [],
                                        cate_no: cate.cate_no,
                                        isSearched,
                                        isAuth,
                                        isManager: getIsManager("cate_no", cate.cate_no),
                                        isSelect: getIsSelect("pcategory", cate.cate_no),
                                    });
                                }
                                // child cate start
                                else if (cate.dept != 0) {
                                    if (itemLength == 0) continue;
                                    nowObj = nowObj.items[itemLength - 1];
                                    while (nowObj) {
                                        let _obj = nowObj.items.find(
                                            (el: any) => el.cate_no === cate.pcate_no
                                        );
                                        if (_obj) nowObj = _obj;
                                        else break;
                                    }
                                    itemLength = nowObj.items.length;
                                    itemId = nowObj.id + "_" + itemLength;
                                    isSearched =
                                        searchData && cate.cate_name.indexOf(searchData) != -1;
                                    isAuth =
                                        authData != null &&
                                        authData._cate.indexOf(cate.cate_no) != -1;
                                    nowObj.items.push({
                                        name: cate.cate_name,
                                        fname: `${nowObj.fname},${cate.cate_name}`,
                                        id: itemId,
                                        itemId: itemId,
                                        type: "category",
                                        items: [],
                                        cate_no: cate.cate_no,
                                        isSearched,
                                        isAuth,
                                        isSelect: getIsSelect("category", cate.cate_no),
                                    });
                                }
                                treeIds.push(itemId);
                                treeIdDatas.push({
                                    type: "category",
                                    cate_no: cate.cate_no,
                                });
                                // docu start
                                if (props.isCloseDocument == undefined) {
                                    for (let docu of filterDocus) {
                                        if (visibleDocu === false) break;

                                        let docuObj = nowObj.items[nowObj.items.length - 1];
                                        let docuItemId = docuObj.id + "_" + docuObj.items.length;
                                        if (cate.cate_no === docu.cate_no) {
                                            isSearched =
                                                searchData &&
                                                (docu.docu_subject.indexOf(searchData) != -1 ||
                                                    docu.docu_code.indexOf(searchData) != -1);
                                            isAuth =
                                                authData != null &&
                                                authData._docu.indexOf(docu.docu_no) != -1;
                                            let isManager =
                                                docuData != null &&
                                                docuData.indexOf(docu.docu_no) != -1;
                                            docuObj.items.push({
                                                name: docu.docu_subject,
                                                code: docu.docu_code,
                                                fname: `${docuObj.fname},${docu.docu_subject}`,
                                                id: docuItemId,
                                                itemId: docuItemId,
                                                type: "document",
                                                items: [],
                                                docu_no: docu.docu_no,
                                                isSearched,
                                                isAuth,
                                                isManager,
                                                isSelect: getIsSelect("document", docu.docu_no),
                                            });

                                            treeIds.push(docuItemId);
                                            treeIdDatas.push({
                                                type: "document",
                                                docu_no: docu.docu_no,
                                            });
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

            if (searchData) {
                list = makeSearchedTree(list);
            }
            setTreeData([...list]);
            props.onChangeTreeData([...list]);
            if (props.onChangeProjectData)
                props.onChangeProjectData(
                    _projectList,
                    _disciplineList,
                    _categoryList,
                    _documentList
                );
        } else {
            setTreeData([]);
        }
    };

    const onTreeExpandChange = (event: TreeViewExpandChangeEvent) => {
        let ids: any = expand.ids;
        const index = ids.indexOf(event.item.id);
        index === -1 ? ids.push(event.item.id) : ids.splice(index, 1);
        let obj: { ids: any; idFiled: string } = { ids: null, idFiled: "" };
        Object.assign(obj, { ids: ids, idFiled: "id" });
        setExpand(obj);
    };

    const onCheckChange = (event: TreeViewExpandChangeEvent) => {
        const settings = {
            checkChildren: true,
            checkParents: true,
        };
        let _treeData = handleTreeViewCheckChange(event, check, treeData, settings);
        setCheck(_treeData ? _treeData : []);
        if (props.onCheck) {
            let _datas = [];
            let ids = [];
            for (var id of _treeData.ids) {
                let idx = treeIds.indexOf(id);
                if (idx != -1) {
                    _datas.push(treeIdDatas[idx]);
                    ids.push(id);
                }
            }
            props.onCheck(_datas, ids);
        }
    };

    const onKeyPress = (e: any) => {
        if (e.key === "Enter" || e === "click") {
            setSearchData(keyWord);
        }
    };

    const onTreeItemClick = (event: TreeViewItemClickEvent) => {
        if (props.isExapndOnClick) {
            let ids: any = expand.ids;

            const index = ids.indexOf(event.item.id);
            index === -1 ? ids.push(event.item.id) : ids.splice(index, 1);
            let obj: { ids: any; idFiled: string } = { ids: null, idFiled: "" };
            Object.assign(obj, { ids: ids, idFiled: "id" });
            setExpand(obj);
        }
        props.onTreeItemClick(event);
    };

    const clearSeletedTreeItem = (event: any) => {
        if (props.clearSeletedTreeItem) {
            props.clearSeletedTreeItem(event);
            setSelectedHeaderItem(null);
        } else {
            setSelectedHeaderItem(null);
        }
    };

    const makeTreeIcon = (name: string, src: string, style: object) => {
        return (
            <>
                <S.TreeIcon src={`${src}/assets/images/edms/worklist_dep4.svg`} style={style} />
                {name}
            </>
        );
    };

    const makeSearchedTree = (list: any) => {
        let _expand: { ids: any; idFiled: string } = { ids: [], idFiled: "id" };
        let _treeIdDatas: TreeIdDataType[] = [];
        const findItems = (item: any): any => {
            if (item == undefined || item.items == undefined || item.items.length == 0) {
                return item.fname.indexOf(searchData) != -1 ? item : null;
            } else {
                return item.items
                    .map((raw: any) => {
                        let result = findItems(raw);
                        if (result === null || result.length == 0) {
                            return null;
                        } else {
                            raw.items = result;
                            return raw;
                        }
                    })
                    .filter((raw: any) => raw);
            }
        };

        const changeItems = (list: any[], depth: number[]) => {
            let items = list;
            let _depth = [...depth];
            _depth.push(0);
            if (items.length > 0) {
                for (var item of items) {
                    let id = _depth.join("_");
                    item.id = id;
                    item.itemId = id;
                    _expand.ids.push(item.id);
                    if (
                        ["discipline", "pcategory", "category", "document"].indexOf(item.type) != -1
                    ) {
                        let treeIdData: {
                            type: string;
                            disc_no?: number;
                            cate_no?: number;
                            docu_no?: number;
                        } = {
                            type: item.type,
                        };
                        if (treeIdData.type == "discipline") {
                            treeIdData.disc_no = item.discipline_id;
                        } else if (["category", "pcategory"].indexOf(treeIdData.type) != -1) {
                            treeIdData.type = "category";
                            treeIdData.cate_no = item.cate_no;
                        } else if (treeIdData.type == "document") {
                            treeIdData.docu_no = item.docu_no;
                        }
                        _treeIdDatas.push(treeIdData);
                    }
                    item.items = changeItems(item.items, _depth);
                    _depth[_depth.length - 1]++;
                }
                return items;
            } else {
                return [];
            }
        };
        list[0].items = findItems(list[0]);
        list = changeItems(list, []);
        treeIds = _expand.ids;
        treeIdDatas = _treeIdDatas;
        setExpand(_expand);
        return list;
    };

    const getIsSelect = (type: string, no: number) => {
        return props.isSelectItem?.selectType == type && props.isSelectItem?.selectedNo == no
            ? true
            : false;
    };

    const getIsManager = (type: string, id: number) => {
        if (props.selectedManager && props.selectedManager.length > 0) {
            let isManager = false;
            props.selectedManager.map((data: any) => {
                if (data[type] && data[type] == id) isManager = true;
            });
            return isManager;
        }
    };

    return (
        <>
            {props.isHeader && (
                <S.TreeViewHeader>
                    {selectedHeaderItem != null && (
                        <S.TreeViewHeaderWrap>
                            <div>
                                <img src="assets/images/edms/worklist_dep3.svg" alt="" />
                                <p>{selectedHeaderItem?.name}</p>
                            </div>
                            <button onClick={clearSeletedTreeItem}>
                                <span className="k-icon k-i-close k-icon-64 color-icon"></span>
                            </button>
                        </S.TreeViewHeaderWrap>
                    )}
                </S.TreeViewHeader>
            )}
            {props.isSearch && (
                <S.Searchbar>
                    <S.SearchField
                        value={keyWord}
                        placeholder={"분야 혹은 카테고리를 입력하세요."}
                        onChange={e => setKeyWord(e.target.value)}
                        onKeyPress={e => onKeyPress(e)}
                        InputProps={{
                            disableUnderline: true,
                        }}
                    />
                    <S.SearchIcon src={`${domain}/assets/images/search_icon.svg`} />
                </S.Searchbar>
            )}
            <TreeView
                className="edms_document_treeview"
                data={processTreeViewItems(treeData, { check: check, expand: expand })}
                expandIcons={true}
                onItemClick={onTreeItemClick}
                onExpandChange={onTreeExpandChange}
                checkboxes={props.is_checked}
                onCheckChange={onCheckChange}
                item={props => {
                    let name: string = props.item.name;
                    if (
                        props.item.id.toString() == selectedItemId ||
                        selectedItemIds.indexOf(props.item.id.toString()) != -1
                    )
                        return makeTreeIcon(name, domain, {
                            filter: "invert(47%) sepia(98%) saturate(1394%) hue-rotate(176deg) brightness(102%) contrast(105%)",
                        });
                    else if (props.item.isSearched) {
                        name = docuCode && props.item.type === "document" ? props.item.code : name;
                        return makeTreeIcon(name, domain, {});
                    } else if (props.item.isAuth || props.item.isManager)
                        return makeTreeIcon(name, domain, {});

                    switch (props.item.type) {
                        case "project":
                        case "discipline":
                        case "pcategory":
                        case "category":
                            return (
                                <div
                                    style={{
                                        display: "flex",
                                        background: props.item.isSelect == true ? "#ccc" : "",
                                        flexDirection: "row",
                                        padding: "3px 6px",
                                    }}
                                >
                                    <S.IconWrap>
                                        <S.TreeIcon
                                            src={`${domain}/assets/images/edms/worklist_dep3.svg`}
                                        />
                                    </S.IconWrap>
                                    <S.TreeItemText>{name}</S.TreeItemText>
                                </div>
                            );
                        case "document":
                            return (
                                <div
                                    style={{
                                        display: "flex",
                                        background: props.item.isSelect == true ? "#ccc" : "",
                                        flexDirection: "row",
                                        padding: "3px 6px",
                                    }}
                                >
                                    <S.IconWrap>
                                        <S.TreeIcon
                                            src={`${domain}/assets/images/edms/worklist_dep3.svg`}
                                        />
                                    </S.IconWrap>
                                    <S.TreeItemText>
                                        {docuCode == true ? props.item.code : name}
                                    </S.TreeItemText>
                                </div>
                            );
                        default:
                            return <></>;
                    }
                }}
            />
        </>
    );
};
