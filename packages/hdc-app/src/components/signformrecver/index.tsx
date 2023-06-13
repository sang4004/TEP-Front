/******************************************************************************
 * appwrapper/index.tsx
 * hooks :
 * useLocations
 *
 ******************************************************************************/
// Library
import { useSelector, useDispatch } from "react-redux"; // redux
import { useState, useEffect, useRef } from "react"; // default hooks
//
// Module
import * as S from "./styled";
import Close from "@material-ui/icons/Close";
import searchIconSvg from "../../images/icon/search_icon.svg";
import { TreeViewComp } from "../";
//
export type signFormRecverSelectProps = {
    style?: object;
    children?: React.ReactNode;
    visible: boolean;
    recvlist?: any[];
    selected?: number[];
    onClose: () => void;
    onComplete: (list: number[]) => void;
    title: string;
    singleItem?: boolean;
    singleComp?: boolean;
    customInput?: boolean;
    customInputVal?: boolean;
    onCustomInput?: (flag: boolean) => void;
    depth?: number;
};
type dataList = {
    id: number;
    name: string;
    part: string;
    company: string;
};

interface FinalsignFormRecverSelectProps extends signFormRecverSelectProps {}

export const SignFormRecverSelectComp: React.FunctionComponent<FinalsignFormRecverSelectProps> =
    props => {
        const [selectedId, setSelectedId] = useState<number[]>([]);

        const [searchVal, setSearchVal] = useState<string>("");
        const [treeData, setTreeData] = useState<object[]>([]);
        const [treeIds, setTreeIds] = useState<any[]>([]);

        const treeRef = useRef(null);

        useEffect(() => {
            getTreeData(searchVal);
        }, [searchVal]);

        useEffect(() => {
            if (props.recvlist) getTreeData();
        }, [props.recvlist]);

        useEffect(() => {
            if (props.selected) {
                setSelectedId([...props.selected]);
            }
            getTreeData(searchVal, props.selected);
        }, [props.selected]);

        const getTreeData = (searchVal: null | string = null, _selected : any = null) => {
            let _treeIds = [];
            if (props.recvlist) {
                let _list: any[] = [];
                let _nameList: any[] = [];
                let idx = 0;
                for (var org of props.recvlist) {
                    if (
                        searchVal &&
                        org.username.indexOf(searchVal) == -1 &&
                        org.part.indexOf(searchVal) == -1 &&
                        org.position.indexOf(searchVal) == -1
                    )
                        continue;
                    if (_list.filter(raw => raw.company == org.company).length > 0) continue;

                    let is_expand =
                        searchVal &&
                        (org.username.indexOf(searchVal) != -1 ||
                            org.part.indexOf(searchVal) != -1 ||
                            org.position.indexOf(searchVal) != -1);

                    if (_nameList.indexOf(org.company) == -1) {
                        _nameList.push(org.company);
                        _list.push({
                            // disabled : props.singleComp && newLastSelectedComp.length > 0 && newLastSelectedComp.indexOf(org.company) == -1,
                            text: org.company,
                            company: org.company,
                            isComp: true,
                            id: `${idx}`,
                            items: [],
                            expanded: is_expand,
                        });
                        idx += 1;
                    }
                }

                for (var _l of _list) {
                    let _partList: any[] = [];
                    let userIdx = 0;
                    for (var org of props.recvlist) {
                        let is_expand =
                            searchVal &&
                            (org.username.indexOf(searchVal) != -1 ||
                                org.part.indexOf(searchVal) != -1 ||
                                org.position.indexOf(searchVal) != -1);
                        if (
                            searchVal &&
                            org.username.indexOf(searchVal) == -1 &&
                            org.part.indexOf(searchVal) == -1 &&
                            org.position.indexOf(searchVal) == -1
                        )
                            continue;
                        if (org.company.indexOf(_l.text) == -1) continue;

                        let partIdx = _partList.indexOf(org.part);
                        if (partIdx != -1) {
                            _l.items[partIdx].items.push({
                                text: `${org.position} ${org.username}`,
                                company: org.company,
                                part: org.part,
                                itemid: org.id,
                                id: `${_nameList.indexOf(org.company)}_${partIdx}_${userIdx}`,
                                expanded: is_expand,
                            });
                        } else {
                            _partList.push(org.part);
                            partIdx = _partList.length - 1;
                            userIdx = 0;
                            _l.items.push({
                                id: `${_nameList.indexOf(org.company)}_${partIdx}`,
                                text: org.part,
                                part: org.part,
                                company: org.company,
                                isPart: true,
                                items: [
                                    {
                                        text: `${org.position} ${org.username}`,
                                        company: org.company,
                                        part: org.part,
                                        itemid: org.id,
                                        id: `${_nameList.indexOf(
                                            org.company
                                        )}_${partIdx}_${userIdx}`,
                                    },
                                ],
                                expanded: is_expand,
                            });
                        }
                        let selectIdx = _selected ? _selected.indexOf(org.id) : selectedId.indexOf(org.id);
                        if (selectIdx != -1)
                            _treeIds.push(
                                `${_nameList.indexOf(org.company)}_${partIdx}_${userIdx}`
                            );
                        userIdx += 1;
                    }
                }
                if (props.customInput) {
                    _list.push({ text: `직접입력`, id: `${idx}`, itemid: 0 });
                    if (props.customInputVal) _treeIds.push(`${idx}`);
                }
                setTreeData([..._list]);
                setTreeIds([..._treeIds]);
            }
        };

        const onClickConfirm = async () => {
            let _selectedId = selectedId.filter((raw, idx) => raw != null);
            //custom input
            if (props.customInput && props.onCustomInput) {
                props.onCustomInput(selectedId.indexOf(0) != -1);
            }

            props.onComplete([..._selectedId]);
            // setSelectedId([]);
            // setSearchVal("");
            props.onClose();
        };

        const onClose = () => {
            props.onClose();
        };

        const onChangeTreeIds = (ids: number[]) => {
            const combined = [...selectedId, ...ids];
            const deleted = selectedId.filter((id, idx)=>{
                return ids.indexOf(id) == -1
            });
            const unique = combined.filter((id, idx) => {
                return combined.indexOf(id) === idx;
            });

            const final = unique.filter((id,idx)=>{
                return deleted.indexOf(id) == -1;
            });
            setSelectedId(final);
        };

        return (
            <S.Block open={props.visible ? true : false} onClose={props.onClose}>
                <S.Inner>
                    <S.Title>{props.title}</S.Title>
                    <S.CloseBtn onClick={onClose}>
                        <Close fontSize="large"/>
                    </S.CloseBtn>
                    <S.Content>
                        <S.TreeBlock>
                            <S.SearchBox>
                                <S.Searchbar>
                                    <S.SearchField
                                        InputProps={{
                                            disableUnderline: true,
                                        }}
                                        placeholder={"이름/부서/직급 등"}
                                        onChange={e => setSearchVal(e.target.value)}
                                        value={searchVal}
                                    />
                                    <S.SearchIcon src={searchIconSvg} />
                                </S.Searchbar>
                            </S.SearchBox>
                            <S.TreeInnerBox>
                                <TreeViewComp
                                    treeRef={treeRef}
                                    data={treeData}
                                    treeIds={treeIds}
                                    onChangeTreeIds={(ids: number[]) => onChangeTreeIds(ids)}
                                    singleItem={props.singleItem}
                                    singleParent={props.singleComp}
                                    depth={props.depth}
                                />
                            </S.TreeInnerBox>
                        </S.TreeBlock>
                        <S.Btn onClick={onClickConfirm}>확인</S.Btn>
                    </S.Content>
                </S.Inner>
            </S.Block>
        );
    };
