/******************************************************************************
 * dropdown/index.tsx
 * hooks :
    * useLocations 
    *
 * last modify : 
 ******************************************************************************/
// Library
import { useSelector, useDispatch } from "react-redux"; // redux
import React, { useState, useEffect } from "react"; // default hooks
import { TreeView, TreeViewItemClickEvent, TreeViewExpandChangeEvent, processTreeViewItems } from "@progress/kendo-react-treeview";
import * as S from "./styled";
//
// Module
import { useLocations } from "hooks" // locations hooks
//
export type TreeViewProps = {
    style ?: object;
    // data : treeData[]; 
    searchbar : boolean;
    itemIcon ?: string;
    expandIcon ?: string;
}
interface FinalTreeViewProps extends TreeViewProps {};
//TODO :: Treeview data set need.
export const TreeViewComponent : React.FunctionComponent<FinalTreeViewProps> = ( props : FinalTreeViewProps )=>{
    const [formTree, setFormTree] = useState<any[]>([]);
    const [selectedItem, setSelectedItem] = useState<number>(-1);

    const onTreeItemClick = (event : TreeViewItemClickEvent) => {
        if(event.item.id != undefined){
            setSelectedItem(event.item.id);
            return;
        }
        event.item.selected = !event.item.selected;
    }

    const onTreeExpandChange = (event : TreeViewExpandChangeEvent) => {
        event.item.expanded = !event.item.expanded;
    }

    return (
            <TreeView 
                data={formTree}
                expandIcons={true}
                onExpandChange={onTreeExpandChange}
                onItemClick={onTreeItemClick}
                item={(_props) => {
                    let icon = props.itemIcon;
                    if(_props.item.expanded != undefined)
                        icon = props.expandIcon;
                    return (
                        <><S.TreeIcon src={icon}/>{_props.item.text} </>
                    );
                }}
                />
    );
}