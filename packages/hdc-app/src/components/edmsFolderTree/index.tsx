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
// util
import { reducerState } from "../../common";
import { domain } from "../../common/network";
// image
// library
import {
    TreeView,
    TreeViewExpandChangeEvent,
    processTreeViewItems,
    TreeViewItemClickEvent,
} from "@progress/kendo-react-treeview";

import { GetVpFolderList } from "../../common/action";

//type
import { TreeViewFiltered, SelectItme } from "./contant";

//styled
import * as S from "./styled";

export type EdmsFolderTreeProps = {
    onTreeItemClick: (e: TreeViewItemClickEvent) => void;
    projectNo: number;
    filtered?: TreeViewFiltered;
    selectedItem?: string;
    selectedItems?: string[];
    is_checked?: boolean;
    //검색 기능 여부
    isSearch?: boolean;
    isSelectItem?: SelectItme; // 선택 아이템 회색 백그라운드 컬러 추가
    isHeader?: boolean; // 선택 아이템을 표시하는 header
    selectedHeaderItem?: any; // selectedItems
    clearSeletedTreeItem?: (e: any) => void; // header close button event
    expand?: { ids: any; idFiled: string };
    folderTreeItem?: any;
};

interface FinalEdmsFolderTreeProps extends EdmsFolderTreeProps {}

export interface FolderTreeDataType {
    type: string;
}

var treeIds: string[] = [];
var treeIdDatas: FolderTreeDataType[] = [];
export const EdmsFolderTreeComp: React.FunctionComponent<FinalEdmsFolderTreeProps> = props => {
    const dispatch = useDispatch();
    const pjSelector = useSelector((state: reducerState) => state.projectsettings);
    const waSelector = useSelector((state: reducerState) => state.achieve);
    const [treeData, setTreeData] = useState<any[]>([]);
    const [projectList, setProjectList] = useState<any[]>([]);
    const [selectedItemId, setSelectedItemId] = useState<string>("");
    const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);
    const [keyWord, setKeyWord] = useState<string>("");
    const [searchData, setSearchData] = useState<string>("");
    const [docuCode, setDocuCode] = useState<boolean>(false);

    const [selectedHeaderItem, setSelectedHeaderItem] = useState<any>();
    const [expand, setExpand] = useState<{ ids: any; idFiled: string }>({
        ids: [],
        idFiled: "id",
    });
    useEffect(() => {
        dispatch(GetVpFolderList(props.projectNo));
    }, [props.projectNo]);

    useEffect(() => {
        if (pjSelector.project_list) setProjectList(pjSelector.project_list);
    }, [pjSelector.project_list]);

    useEffect(() => {
        if (projectList.length > 0 && waSelector.folder_list && waSelector.folder_list.length > 0) {
            makeTree();
        }
    }, [projectList, waSelector.folder_list]);

    useEffect(() => {
        if (props.isSearch && searchData === "") {
            let _expand = props.expand ? props.expand : { ids: [], idFiled: "id" };
            setExpand(_expand);
            makeTree();
        } else if (props.isSearch && searchData != "") makeTree(searchData);
        if (props.selectedItem) setSelectedItemId(props.selectedItem);
        if (props.selectedItems) setSelectedItemIds(props.selectedItems);
    }, [searchData, props.selectedItem, props.selectedItems]);

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
            //filtered
            let filterProjects: any[] = projectList;
            let visibleProject: boolean = true;
            treeIdDatas = [];
            treeIds = [];
            if (props.filtered) {
                if (props.filtered.project) {
                    let p = props.filtered.project;
                    filterProjects = projectList
                        .filter(raw => p.no.indexOf(raw.project_no) != -1)
                        .sort((a, b) => b.project_no - a.project_no);
                    visibleProject = props.filtered.project.visibile === false ? false : true;
                }
            }

            // project start
            for (let pj of filterProjects) {
                if (visibleProject === false) break;
                let isSearched = searchData && pj.project_name.indexOf(searchData) != -1;

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
                    isSelect: getIsSelect("project", pj.project_no),
                });

                if (props.projectNo != pj.project_no) return;
                let now_obj = list[list.length - 1];
                if (waSelector.folder_list && Object.keys(waSelector.folder_list).length > 0) {
                    let top_folders = Object.keys(waSelector.folder_list);

                    top_folders.map((k: string) => {
                        let item_id = `${now_obj.id}_${now_obj.items.length}`;
                        isSearched = searchData && k.indexOf(searchData) != -1;
                        let top_folder_item: any = {
                            id: item_id,
                            project_no: props.projectNo,
                            items: [],
                            name: k,
                            type: "folder",
                            isSearched,
                            isSelect: getIsSelect("folder", k),
                        };
                        let child_folder_items: any = Object.keys(waSelector.folder_list[k]);
                        child_folder_items.map((c: string, i: number) => {
                            isSearched = searchData && c.indexOf(searchData) != -1;
                            let child_folder_item = {
                                id: `${top_folder_item.id}_${i}`,
                                items: [],
                                name: c,
                                type: "folder",
                                isSearched,
                                isSelect: getIsSelect("folder", c),
                            };
                            top_folder_item.items.push(child_folder_item);
                        });
                        now_obj.items.push(top_folder_item);
                    });
                }

                let other_item = {
                    id: `${now_obj.id}_${now_obj.items.length}`,
                    type: "folder",
                    name: "other",
                    items: [],
                    isSearched: searchData && "other".indexOf(searchData) != -1,
                };
                now_obj.items.push(other_item);
            }
            if (searchData) {
                list = makeSearchedTree(list);
            }
            setTreeData([...list]);
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

    const onKeyPress = (e: any) => {
        if (e.key === "Enter" || e === "click") {
            setSearchData(keyWord);
        }
    };

    const onTreeItemClick = (event: TreeViewItemClickEvent) => {
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
        let _treeIdDatas: any[] = [];
        const findItems = (item: any): any => {
            if (item == undefined || item.items == undefined || item.items.length == 0) {
                return item.name.indexOf(searchData) != -1 ? item : null;
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

                    let treeIdData: {
                        type: string;
                        name: string;
                    } = {
                        type: item.type,
                        name: item.name,
                    };
                    _treeIdDatas.push(treeIdData);

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

    const getIsSelect = (type: string, value: number | string) => {
        let isSelect: boolean = false;
        if (props.isSelectItem?.selectType == type) {
            if (type == "project") {
                isSelect = props.isSelectItem?.selectedNo == value ? true : false;
            } else if (type == "folder") {
                isSelect = props.isSelectItem?.selectedFolder == value ? true : false;
            }
        }
        return isSelect;
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
                data={processTreeViewItems(treeData, { expand: expand })}
                expandIcons={true}
                onItemClick={onTreeItemClick}
                onExpandChange={onTreeExpandChange}
                checkboxes={props.is_checked}
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
                        return makeTreeIcon(name, domain, {});
                    } else if (props.item.isAuth || props.item.isManager)
                        return makeTreeIcon(name, domain, {});

                    return (
                        <div
                            style={{
                                display: "flex",
                                background: props.item.isSelect == true ? "#ccc" : "",
                                flexDirection: "row",
                                padding: "3px 6px",
                                width: "100%",
                                alignItems: "start",
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
                }}
            />
        </>
    );
};
