/******************************************************************************
 * Copyright (c) 2021. Moornmo Inc. Rights reserved.                          *
 * Data modelings and methods used are assets of Moornmo Inc.                 *
 * * hooks :
    * useLocations 
    *
 * components : 
    * ConfirmButton
    * 
 * last modify : jh.jeong
 ******************************************************************************/
// Library
import React, { useState, useEffect } from "react";
import * as S from "./styled";
import buildingSvg from "../../images/fontawsomeicon/building-solid.svg";
import userSvg from "../../images/fontawsomeicon/user-solid.svg";
import { TreeViewExpandChangeEvent, TreeViewItemClickEvent, TreeView } from "@progress/kendo-react-treeview";

export type OrganizationChartListProps = {
    departmentData: any[] | null;
    nameData: any[] | null;
}
interface FinalOrganizationChartListProps extends OrganizationChartListProps { };

export const OrganizationChartListComp: React.FunctionComponent<FinalOrganizationChartListProps> = (props: FinalOrganizationChartListProps) => {
    const [tabIdx, setTabIdx] = useState<number>(0);
    const tabList = ["부서", "이름"];
    const [treeData, setTreeData] = useState<object[]>([]);
    const [treeNameData, setTreeNameData] = useState<object[]>([]);

    useEffect(() => {
        if (props.departmentData && props.nameData){
            setTreeData(props.departmentData);
            setTreeNameData(props.nameData);
        }
    },[props.departmentData])

    const onTreeItemClick = (event: TreeViewItemClickEvent) => {
        if(false) // 빨간색 선택부분 현재 주석. 후에 정보를 표시하기위해 사용할 예정
            event.item.selected = !event.item.selected;
    }
    const onTreeExpandChange = (event: TreeViewExpandChangeEvent) => {
        event.item.expanded = !event.item.expanded;
    }
    const getTreeItem = (props: any) => {
        let icon = userSvg;
        if (props.item.expanded != undefined){
            icon = buildingSvg;
            }
        return (
            <><S.TreeIcon src={icon} />{props.item.position} {props.item.text}</>
        );
    }

    if (!(props.departmentData && props.nameData!.length > 0))
        return (
            <div>표시할 데이터가 없습니다..</div>
        );

    return (
        <S.TableWrap>
            <S.TableTopMenu>
                <S.TableMenu 
                    TabIndicatorProps={{style : {backgroundColor : "#4B5964"}}} 
                    value={tabIdx} 
                    onChange={(e, value)=>setTabIdx(value)}
                    >
                    {tabList.map((val, idx)=>(
                        <S.BtnMenu key={idx} $selected={tabIdx == idx} label={val} />
                    ))}
                </S.TableMenu>
            </S.TableTopMenu>
                <S.TreeView>
                    <TreeView
                        data={tabIdx==0?treeData:treeNameData}
                        expandIcons={true}
                        onExpandChange={onTreeExpandChange}
                        onItemClick={onTreeItemClick}
                        item={getTreeItem}
                    />
                </S.TreeView>
        </S.TableWrap>
    );
};