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
import { useState, useEffect, useContext, ChangeEvent } from "react"; // default hooks
//
// Module
import * as S from "./styled";
import { useLocations } from "hooks"; // locations hooks
import buildingSvg from "../../images/fontawsomeicon/building-solid.svg";
import userSvg from "../../images/fontawsomeicon/user-solid.svg";
import searchSvg from "../../images/fontawsomeicon/search-solid.svg";
import Close from "@material-ui/icons/Close";
import {
    TreeView,
    TreeViewItemClickEvent,
    TreeViewExpandChangeEvent,
    processTreeViewItems,
} from "@progress/kendo-react-treeview";
import { reducerState } from "../../common";
import { GetOrganizationChart } from "../../common/action";
import { OrganizationChartListComp } from "../organizationChartList";
//
export type organizationChartProps = {
    style?: object;
    children?: React.ReactNode;
    visible: boolean;
    company: string;
    onClose: () => void;
};
interface FinalorganizationChartProps extends organizationChartProps {}

export const OrganizationChartModal: React.FunctionComponent<
    FinalorganizationChartProps
> = props => {
    const dispatch = useDispatch();
    const { pushHistory } = useLocations();
    const dsSelector = useSelector((state: reducerState) => state.digitalsign);
    const userSelector = useSelector((state: reducerState) => state.user);
    const [treeData, setTreeData] = useState<object[]>([]);
    const [treeNameData, setTreeNameData] = useState<object[]>([]);
    const [searchVal, setSearchVal] = useState<string>("");

    const headsize = [0, 10, 15, 20, 5, 10, 10, 10, 5, 5, 5];

    useEffect(() => {
        if (userSelector.id) dispatch(GetOrganizationChart());
    }, []);

    useEffect(() => {
        getTreeData();
    }, [dsSelector.organization_chart, dsSelector.organization_chart_name, props.company]);

    useEffect(() => {
        getTreeData(searchVal);
    }, [searchVal]);

    const getTreeData = (searchVal: null | string = null) => {
        let is_expand = searchVal != null;
        let _list: any[] = [
            {
                text: props.company,
                expanded: is_expand,
                items: [],
            },
        ];
        let _allList: any[] = [
            {
                text: props.company,
                expanded: is_expand,
                items: [],
            },
        ];
        if (dsSelector.organization_chart.length > 0) {
            // make tree
            const currentCompany = 0;
            let _nameList: any[] = [];
            for (var org of dsSelector.organization_chart) {
                if (
                    searchVal &&
                    org.username.indexOf(searchVal) == -1 &&
                    org.groupname.indexOf(searchVal) == -1 &&
                    org.position.indexOf(searchVal) == -1
                )
                    continue;
                else if (props.company.indexOf(org.company) == -1) continue;
                let is_expand =
                    searchVal &&
                    (org.username.indexOf(searchVal) != -1 ||
                        org.groupname.indexOf(searchVal) != -1 ||
                        org.position.indexOf(searchVal) != -1);

                if (_nameList.indexOf(org.groupname) != -1) {
                    _list[currentCompany].items[_nameList.indexOf(org.groupname)].items.push({
                        text: `${org.username}`,
                        id: org.id,
                        position: org.position,
                        expanded: is_expand,
                    });
                } else {
                    _nameList.push(org.groupname);
                    _list[currentCompany].items.push({
                        text: org.groupname,
                        expanded: is_expand,
                        items: [{ text: `${org.username}`, id: org.id, position: org.position }],
                    });
                }
            }
            //
        }
        if (dsSelector.organization_chart_name.length > 0) {
            // make tree
            const currentCompany = 0;
            let _nameList: any[] = [];
            for (var org of dsSelector.organization_chart_name) {
                if (
                    searchVal &&
                    org.username.indexOf(searchVal) == -1 &&
                    org.groupname.indexOf(searchVal) == -1 &&
                    org.position.indexOf(searchVal) == -1
                )
                    continue;
                else if (props.company.indexOf(org.company) == -1) continue;

                let is_expand =
                    searchVal &&
                    (org.username.indexOf(searchVal) != -1 ||
                        org.groupname.indexOf(searchVal) != -1 ||
                        org.position.indexOf(searchVal) != -1);

                if (_nameList.indexOf(org.groupname) != -1) {
                    _allList[currentCompany].items.push({
                        text: `${org.username}`,
                        id: org.id,
                        position: org.position,
                        group: org.groupname,
                        expanded: is_expand,
                    });
                } else {
                    _nameList.push(org.groupname);
                    _allList[currentCompany].items.push({
                        text: `${org.username}`,
                        id: org.id,
                        position: org.position,
                        group: org.groupname,
                        expanded: is_expand,
                    });
                }
            }
            //
        }
        setTreeData([..._list]);
        setTreeNameData([..._allList]);
    };

    return (
        <S.wrapper>
            <S.Block>
                <S.TitleDiv>
                    조직도
                    <S.CloseBtnWrap>
                        <Close
                            style={{ fontSize: "1.6em", cursor: "pointer" }}
                            onClick={props.onClose}
                        />
                    </S.CloseBtnWrap>
                </S.TitleDiv>
                <S.SearchBar>
                    <S.SearchField
                        InputProps={{
                            disableUnderline: true,
                        }}
                        value={searchVal}
                        onChange={e => setSearchVal(e.target.value)}
                    />
                    <S.SearchBtn>
                        <S.SearchBtnImg src={searchSvg} />
                    </S.SearchBtn>
                </S.SearchBar>
                <OrganizationChartListComp departmentData={treeData} nameData={treeNameData} />
            </S.Block>
        </S.wrapper>
    );
};
