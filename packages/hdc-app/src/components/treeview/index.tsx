import React, { useState, useEffect } from "react";
import * as ReactDOM from "react-dom";

import {
    TreeView,
    processTreeViewItems,
    handleTreeViewCheckChange,
    TreeViewExpandChangeEvent,
} from "@progress/kendo-react-treeview";

export type TreeViewCompProps = {
    data: any;
    treeRef: any;
    singleItem?: boolean;
    singleParent?: boolean;
    treeIds: any;
    onChangeTreeIds?: (ids: any[]) => void;
    depth?: number;
    selectedId?: number[];
    checkType?: boolean;
    onTreeItemClick?: (e: any) => void;
    item?: (e: any) => any;
};

var itemids: any[] = [];
var treeids: any[] = [];
export const TreeViewComp = (props: TreeViewCompProps) => {
    const [items, setItems] = useState<Array<any>>(props.data);
    const [expandedItems, setExpandedItems] = useState<boolean[]>([]);
    const [check, setCheck] = useState({
        ids: props.treeIds ? props.treeIds : [],
        applyCheckIndeterminate: true,
        idFiled: "id",
    });

    const [expand, setExpand] = useState<{ ids: any; idFiled: string }>({
        ids: [],
        idFiled: "id",
    });

    useEffect(() => {
        if (props.data) {
            setItems([...props.data]);
        }
    }, [props.data]);

    useEffect(() => {
        if (props.treeIds && check.ids) {
            let treeData = {
                applyCheckIndeterminate: true,
                idFiled: "id",
                ids: props.treeIds,
            };

            setCheck(treeData);
        }
    }, [props.treeIds]);
    useEffect(() => {
        if (props.onChangeTreeIds && check && check.ids) {
            itemids = [];
            findItemId(check.ids, items);
            props.onChangeTreeIds(itemids);
        }
    }, [check]);

    const findTreeId = (ids: number[], _items: any) => {
        let vals: any[] = Object.values(_items);
        if (vals.filter((raw: any, idx) => raw.items != undefined).length > 0) {
            for (var val of vals) {
                let _val: any = val;
                if (_val.items) findTreeId(ids, _val.items);
                else if (_val.itemid != undefined && ids.indexOf(_val.itemid) != -1) {
                    treeids.push(val.id);
                }
            }
        } else {
            for (var val of _items) {
                if (ids.indexOf(val.itemid) != -1) {
                    treeids.push(val.id);
                }
            }
        }
    };

    const findItemId = (ids: any[], _items: any) => {
        let vals: any[] = Object.values(_items);
        if (vals.filter((raw: any, idx) => raw.items != undefined).length > 0) {
            for (var val of vals) {
                let _val: any = val;
                if (_val.items) findItemId(ids, _val.items);
                else if (_val.itemid != undefined && ids.indexOf(_val.id) != -1) {
                    itemids.push(val.itemid);
                }
            }
        } else {
            for (var val of _items) {
                if (ids.indexOf(val.id) != -1) {
                    itemids.push(val.itemid);
                }
            }
        }
    };

    const singleParnetChange = (items: any, nowItem: any) => {
        let newItems: any[] = [];
        let parentIds: any[] = [];
        let nowItemSplit: any[] = [];
        nowItemSplit = nowItem.id.split("_");
        if (props.depth) {
            try {
                let nowItemId = -1;
                if (nowItemSplit.length == props.depth) {
                    nowItemId = nowItemSplit[props.depth - 1];
                    parentIds.push(nowItemSplit[0]);
                }
                for (var item of items) {
                    let isContinue = false;
                    let _split = item.split("_");
                    for (var i = 1; i < _split.length; i++) {
                        if (nowItemSplit[i] != _split[i]) isContinue = true;
                    }
                    if (nowItemSplit[0] != _split[0]) isContinue = false;
                    if (isContinue) continue;

                    parentIds.push(_split[0]);
                    newItems.push(item);
                }
            } catch (err) {
                console.log(err);
            }
        } else return items;
        return newItems;
    };

    const onTreeExpandChange = (event: TreeViewExpandChangeEvent) => {
        let ids = expand.ids;

        const index = ids.indexOf(event.item.id);
        index === -1 ? ids.push(event.item.id) : ids.splice(index, 1);
        let obj: { ids: any; idFiled: string } = { ids: null, idFiled: "" };
        Object.assign(obj, { ids: ids, idFiled: "id" });

        setExpand(obj);

        // event.item.expanded = !event.item.expanded;
    };

    const onCheckChange = (event: TreeViewExpandChangeEvent) => {
        const settings = {
            singleMode: !props.singleParent && props.singleItem,
            checkChildren: true,
            checkParents: true,
        };
        let treeData = handleTreeViewCheckChange(event, check, items, settings);
        if (!event.item.checked) {
            treeData.ids = singleParnetChange(treeData.ids, event.item);
        }
        setCheck(treeData);
    };

    return (
        <TreeView
            data={processTreeViewItems(items, { check: check, expand: expand })}
            checkboxes={props.checkType != false || props.checkType == undefined ? true : false}
            onCheckChange={onCheckChange}
            onItemClick={
                props.checkType != false || props.checkType == undefined
                    ? onCheckChange
                    : props.onTreeItemClick
            }
            onExpandChange={onTreeExpandChange}
            expandIcons={true}
            item={props.item != undefined ? props.item : props => <>{props.item.text} </>}
            ref={props.treeRef}
        />
    );
};
