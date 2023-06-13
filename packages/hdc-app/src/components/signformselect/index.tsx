/******************************************************************************
 * appwrapper/index.tsx
 * hooks :
 * useLocations
 *
 ******************************************************************************/
// Library
import { useSelector, useDispatch } from "react-redux"; // redux
import { useState, useEffect, ChangeEvent } from "react"; // default hooks
import {
    TreeView,
    TreeViewItemClickEvent,
    TreeViewExpandChangeEvent,
    processTreeViewItems,
} from "@progress/kendo-react-treeview";
import MenuItem from "@material-ui/core/MenuItem";
import Chip from "@material-ui/core/Chip";
//
// Module
import * as S from "./styled";
import { useLocations } from "hooks"; // locations hooks
import Close from "@material-ui/icons/Close";
import fileSvg from "../../images/fontawsomeicon/file-alt-solid.svg";
import folderSvg from "../../images/fontawsomeicon/folder-solid.svg";
import searchIconSvg from "../../images/icon/search_icon.svg";
import { reducerState } from "../../common";
import { NewSign, GetDocumentCode } from "../../common/action";
import { SignFormRecverSelectComp } from "../signformrecver";
import { ModalInfo, LoadingIndicatorComponent } from "components";
//
export type signFormSelectProps = {
    style?: object;
    children?: React.ReactNode;
    visible: boolean;
    onClose: () => void;
};

interface FinalsignFormSelectProps extends signFormSelectProps {}

export const SignFormSelectComp: React.FunctionComponent<FinalsignFormSelectProps> = props => {
    const dispatch = useDispatch();
    const { pushHistory } = useLocations();
    const dsSelector = useSelector((state: reducerState) => state.digitalsign);
    const userSelector = useSelector((state: reducerState) => state.user);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [selectNumId, setSelectNumId] = useState<number>(-1);
    const [selectedItem, setSelectedItem] = useState<number>(-1);
    const [selectedCop, setSelectedCop] = useState<number>(-1);
    const [selectedVendor, setSelectedVendor] = useState<number>(-1);
    const [selectedBeneficiary, setSelectedBeneficiary] = useState<number>(-1);
    const [selectedRecvId, setSelectedRecvId] = useState<number>();
    const [selectedReferList, setSelectedReferList] = useState<number[]>([]);
    const [selectedReceiverId, setSelectedReceiverId] = useState<number[]>([]);
    const [selectedRegistList, setSelectedRegistList] = useState<number[]>([]);

    const [selectedTreeItems, setSelectedTreeItems] = useState<string[]>([]);

    const [searchKey, setSearchKey] = useState<string>("");
    const [formTree, setFormTree] = useState<any[]>([]);

    const [formTitle, setFormTitle] = useState<string>("");
    const [documentTitle, setDocumentTitle] = useState<string>("");
    const [documentId, setDocumentId] = useState<number>(0);
    const [documentNo, setDocumentNo] = useState<number>(0);
    const [documentCode, setDocumentCode] = useState<string>("");
    const [docCode, setDocCode] = useState<string>("");
    const [docCodeText, setDocCodeText] = useState<string>("");
    const [docCodeTextFlag, setDocCodeTextFlag] = useState<boolean>(false);
    const [copList, setCopList] = useState<object[]>([]);
    const [recvList, setRecvList] = useState<any[]>([]);
    const [onlyRecvList, setOnlyRecvList] = useState<any[]>([]);
    const [nowRefList, setNowRefList] = useState<object[]>([]);
    const [registList, setRegistList] = useState<object[]>([]);
    const [docIdCheck, setDocIdCheck] = useState<any[]>([]);

    const [RecvDirect, setRecvDirect] = useState<string>("");

    const [visibleFormRef, setVisibleFormRef] = useState<boolean>(false);
    const [visibleFormReceiver, setVisibleFormReceiver] = useState<boolean>(false);
    const [visibleFormRegist, setVisibleFormRegist] = useState<boolean>(false);
    const [visibleDocNo, setVisibleDocNo] = useState<boolean>(false);

    const [customRecvFlag, setCustomRecvFlag] = useState<boolean>(false);
    const [customRefFlag, setCustomRefFlag] = useState<boolean>(false);
    const [customRegistFlag, setCustomRegistFlag] = useState<boolean>(false);

    const [customRecv, setCustomRecv] = useState<string>("");
    const [customRef, setCustomRef] = useState<string>("");
    const [customRegist, setCustomRegist] = useState<string>("");

    const [isHead, setIsHead] = useState<number>(0);
    const [orgId, setOrgId] = useState<number>(0);

    useEffect(() => {
        if (dsSelector.sign_form_detail_list.length > 0 && selectedItem != undefined) {
            let detail = dsSelector.sign_form_detail_list.filter(
                (data: any, idx: number) => data.id == selectedItem
            );
            let item = dsSelector.sign_form_list.filter(
                (data: any, idx: number) => data.id == selectedItem
            );
            if (detail.length > 0 && item.length > 0) {
                if (item[0].ishead) setIsHead(1);
                else setIsHead(0);
                setOrgId(item[0].org_id);
                setFormTitle(detail[0].title);
                setSelectNumId(detail[0].select_num_id);
                // 기존 채번 기준만 해당 드롭박스들이 나오게끔 작업.
                if (detail[0].select_num_id == 1) {
                    let vendor = detail[0].vendor;
                    setCopList([...detail[0].cop]);
                    setSelectedCop(getIdxFromObjList(detail[0].cop, item[0].cop_type_id));
                } else {
                    setCopList([]);
                    setSelectedCop(0);
                }
                setSelectedVendor(item[0].org_id);
                let recv: object[] = detail[0].recv;
                let index = recv.findIndex((val: any, idx: number) => {
                    return val.id == 0;
                });
                setRecvDirect("직접입력");
                if (index == -1 && detail[0].select_num_id != 1)
                    recv.unshift({ id: 0, text: "직접입력" });
                let _refer: any[] = detail[0].refer.filter((obj: any) => obj.approved == 1);
                setOnlyRecvList([
                    ..._refer.filter(
                        raw => raw.priority == 1 || raw.position == "대표이사" || raw.sub_field == 1
                    ),
                ]);
                setRecvList([..._refer]);
                setNowRefList([..._refer]);
            }
        }
    }, [selectedItem]);

    useEffect(() => {
        if (selectedReceiverId.length > 0 && selectedCop != -1 && selectedItem != -1) {
            dispatch(
                GetDocumentCode(selectedItem, selectedReceiverId[0], selectedCop, selectedVendor)
            );
            SetRegistListWithRecvCompany();
        } else setVisibleDocNo(false);
    }, [selectedReceiverId, selectedCop, props.visible]);

    useEffect(() => {
        if (selectedReferList.length > 0) {
            SetRegistListWithRecvCompany();
        }
    }, [selectedReferList]);

    useEffect(() => {
        if (dsSelector.document_codes) {
            let _obj: any = dsSelector.document_codes;
            setDocCode(_obj.code);
            setDocCodeText(_obj.text);
            if (_obj.text && _obj.text.length > 0) setDocCodeTextFlag(true);
            setDocumentNo(_obj.document_no);
            setDocumentId(_obj.docId);
            setDocIdCheck(_obj.last_document);
            setVisibleDocNo(true);
        }
    }, [dsSelector.document_codes]);

    useEffect(() => {
        if (docCodeText)
            setDocumentCode(docCode + docCodeText + documentNo + `-` + documentId + "호");
        else setDocumentCode(docCode + documentNo + `-` + documentId + "호");
    }, [documentId, docCodeText]);

    useEffect(() => {
        setIsLoading(false);
        if (dsSelector.new_sign_id && dsSelector.new_sign_id != -1) pushHistory("/document/new");
    }, [dsSelector.new_sign_id]);

    useEffect(() => {
        if (dsSelector.sign_form_list.length > 0) {
            // make tree
            makeTree();
        }
    }, [dsSelector.sign_form_list]);

    useEffect(() => {
        makeTree(searchKey.length > 0 ? searchKey : undefined);
    }, [searchKey]);

    // useEffect(() => {
    //     // 수신처에 따른 참조자 만드는 코드 주석
    //     // setNowRefList(referList.filter((obj:any)=>obj.doc_group_id == selectedRecvId));
    //     // if (selectedRecvId == 0) {
    //     //     // setNowRefList([...referList]);
    //     //     setInputRecv(true);
    //     // } else setInputRecv(false);
    // }, [selectedRecvId]);

    useEffect(() => {
        let _list = recvList.filter((obj: any) => obj.id != 0);
        _list.unshift({ id: 0, text: RecvDirect });
    }, [RecvDirect]);

    const SetRegistListWithRecvCompany = () => {
        let selectedRecv = onlyRecvList.filter(
            (raw: any, idx) =>
                selectedReceiverId.indexOf(raw.id) != -1 || selectedReferList.indexOf(raw.id) != -1
        );
        let compList = selectedRecv.map((raw: any, idx) => raw.org_id);
        setRegistList([...recvList.filter((raw: any, idx) => compList.indexOf(raw.org_id) != -1)]);
    };

    const getRecvText = (id: number) => {
        let _list: any = recvList.filter((obj: any) => obj.id == id)[0];
        if (id == 0) return "직접입력";
        return _list ? _list.position + "  " + _list.username : "";
    };

    const onCompleteSelectLine = (list: number[]) => {
        setSelectedReferList(list);
    };

    const onCompleteSelectReceivers = (list: number[]) => {
        // 수신처 설정 관리
        setSelectedReceiverId(list);
    };

    const onCompleteSelectRegist = (list: number[]) => {
        // 수신처 설정 관리
        setSelectedRegistList([...list]);
    };

    const reset = (id?: number) => {
        setSelectedItem(id ? id : -1);
        setSelectedCop(-1);
        setSelectedVendor(-1);
        setSelectedBeneficiary(-1);
        setSelectedRecvId(-1);
        setSelectedReferList([]);
        setDocumentTitle("");
    };

    const getIdxFromObjList = (objList: object[], id: number) => {
        let index = objList.findIndex((val: any, idx: number) => {
            return val.id == id;
        });
        if (index == -1) return -1;
        return index + 1;
    };

    const makeTree = (_searchKey: any = undefined) => {
        let _list: any[] = [{ text: "공문", expanded: true, items: [] }];
        let _nameList: any[] = [];
        for (var form of dsSelector.sign_form_list) {
            if (
                _searchKey &&
                form.title.indexOf(_searchKey) == -1 &&
                form.company.indexOf(_searchKey) == -1
            )
                continue;

            if (_nameList.indexOf(form.company) != -1) {
                _list[0].items[_nameList.indexOf(form.company)].items.push({
                    text: form.title,
                    id: form.id,
                });
            } else {
                _nameList.push(form.company);
                _list[0].items.push({
                    text: form.company,
                    expanded: true,
                    items: [{ text: form.title, id: form.id }],
                });
            }
        }
        if (_list.length > 0) {
            setFormTree([..._list]);
        }
    };

    const onTreeItemClick = (event: TreeViewItemClickEvent) => {
        if (event.item.id != undefined) {
            //tree 단일 선택
            setSelectedTreeItems([event.itemHierarchicalIndex]);
            //
            reset(event.item.id);
            return;
        }
    };

    const onTreeExpandChange = (event: TreeViewExpandChangeEvent) => {
        event.item.expanded = !event.item.expanded;
    };

    const handleChange = (e: ChangeEvent<{ name?: string; value: any }>, type: string) => {
        if (type == "CharacteristicOfPlant") {
            setSelectedCop(parseInt(e.target.value));
        } else if (type == "vendor") {
            setSelectedVendor(parseInt(e.target.value));
        } else if (type == "beneficiary") {
            setSelectedBeneficiary(parseInt(e.target.value));
        }
    };

    const onChangeSearchInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSearchKey(e.target.value);
    };

    const onClickConfirm = async () => {
        let filtered = docIdCheck.filter((obj: any) => obj.document_id == documentId);
        let selectedRecv = recvList.filter(
            (raw: any) =>
                selectedReceiverId.indexOf(raw.id) != -1 || selectedReferList.indexOf(raw.id) != -1 // 수신, 참조 전부 무조건 접수되도록
        );
        let org_list: any = [];

        selectedRecv.map((raw: any) => {
            if (org_list.indexOf(raw.org_id) == -1) org_list.push(raw.org_id);
        });

        if (selectedRegistList.indexOf(0) == -1 && selectedRegistList.length < org_list.length) {
            return ModalInfo("각 수신처에 접수자를 선택해주세요.");
        }
        if (filtered.length == 0) {
            setIsLoading(true);
            await dispatch(
                NewSign(
                    selectedItem,
                    selectedCop,
                    selectedVendor,
                    selectedBeneficiary,
                    documentTitle,
                    selectedReceiverId,
                    selectedReferList,
                    selectedRegistList,
                    customRecvFlag ? customRecv : null,
                    customRefFlag ? customRef : null,
                    isHead,
                    orgId,
                    documentId,
                    documentCode,
                    customRegistFlag ? customRegist : null
                )
            );
            props.onClose();
        } else if (documentId == 0) {
            ModalInfo("잘못된 문서 번호입니다. 잠시 후에 다시 시도해주세요.");
            await dispatch(
                GetDocumentCode(selectedItem, selectedReceiverId[0], selectedCop, selectedVendor)
            );
        } else {
            ModalInfo("중복된 문서 번호 입니다.");
        }
    };

    const onClose = () => {
        props.onClose();
    };

    const onClickAddRefer = () => {
        setVisibleFormRef(true);
    };

    const handleDelete = (idx: number, type: number) => {
        if (type == 0) {
            if (selectedReceiverId[idx] == 0) setCustomRecvFlag(false);
            let _selectedReceiverId = [...selectedReceiverId];
            _selectedReceiverId.splice(idx, 1);

            setSelectedReceiverId([..._selectedReceiverId]);
        } else if (type == 1) {
            if (selectedReferList[idx] == 0) setCustomRefFlag(false);
            selectedReferList.splice(idx, 1);
            setSelectedReferList([...selectedReferList]);
        } else if (type == 2) {
            if (selectedRegistList[idx] == 0) setCustomRegistFlag(false);
            selectedRegistList.splice(selectedRegistList.indexOf(idx), 1);
            setSelectedRegistList([...selectedRegistList]);
        }
    };

    const deactive =
        selectedItem == -1 ||
        documentTitle.length == 0 ||
        (selectedReceiverId.length == 0 && customRecv.length == 0) ||
        (selectedRegistList.length == 0 && !customRecvFlag) ||
        (selectedCop == -1 && selectNumId == 1);

    return (
        <S.Block open={props.visible ? true : false} onClose={props.onClose}>
            {/* <Draggable> */}
            <S.Inner>
                <LoadingIndicatorComponent open={isLoading} style={{ zIndex: 10 }} />
                <SignFormRecverSelectComp
                    visible={visibleFormReceiver}
                    recvlist={onlyRecvList}
                    selected={selectedReceiverId}
                    onClose={() => setVisibleFormReceiver(false)}
                    onComplete={onCompleteSelectReceivers}
                    // singleComp
                    title="수신 선택"
                    customInput={userSelector.company != 4}
                    customInputVal={customRecvFlag}
                    onCustomInput={setCustomRecvFlag}
                />

                <SignFormRecverSelectComp
                    visible={visibleFormRef}
                    recvlist={nowRefList}
                    selected={selectedReferList}
                    onClose={() => setVisibleFormRef(false)}
                    onComplete={onCompleteSelectLine}
                    title="참조 선택"
                    customInput={userSelector.company != 4}
                    customInputVal={customRecvFlag}
                    onCustomInput={setCustomRefFlag}
                />

                <SignFormRecverSelectComp
                    visible={visibleFormRegist}
                    recvlist={registList}
                    selected={selectedRegistList}
                    onClose={() => setVisibleFormRegist(false)}
                    onComplete={onCompleteSelectRegist}
                    title="접수 선택"
                    singleItem
                    singleComp
                    customInput={userSelector.company != 4}
                    customInputVal={customRegistFlag}
                    onCustomInput={setCustomRegistFlag}
                    depth={3}
                />
                <S.Title>결재양식 선택</S.Title>
                <S.CloseBtn onClick={onClose}>
                    <Close fontSize="large" />
                </S.CloseBtn>
                <S.Content>
                    <S.TreeBlock>
                        <S.TreeInnerBox>
                            <TreeView
                                data={processTreeViewItems(formTree, { select: selectedTreeItems })}
                                expandIcons={true}
                                onExpandChange={onTreeExpandChange}
                                onItemClick={onTreeItemClick}
                                item={props => {
                                    let icon = fileSvg;
                                    if (props.item.expanded != undefined) icon = folderSvg;
                                    return (
                                        <>
                                            <S.TreeIcon src={icon} />
                                            {props.item.text}{" "}
                                        </>
                                    );
                                }}
                            />
                        </S.TreeInnerBox>
                        <S.SearchBox>
                            <S.Searchbar>
                                <S.SearchField
                                    InputProps={{
                                        disableUnderline: true,
                                    }}
                                    placeholder={"양식 제목을 입력하세요"}
                                    onChange={onChangeSearchInput}
                                    value={searchKey}
                                />
                                <S.SearchIcon src={searchIconSvg} />
                            </S.Searchbar>
                        </S.SearchBox>
                    </S.TreeBlock>
                    <S.DetailBlock>
                        <S.SubTitle>결재양식 상세</S.SubTitle>
                        <S.Seperator>
                            <hr />
                        </S.Seperator>
                        <S.InfoContainer $deactive={selectedItem == -1}>
                            <S.BodyInfo>
                                <S.BodyTitle>문서양식</S.BodyTitle>
                                <S.BodyInput>{formTitle}</S.BodyInput>
                            </S.BodyInfo>
                            <S.BodyInfo>
                                <S.BodyTitle>문서제목</S.BodyTitle>
                                <S.BodyTextfield
                                    value={documentTitle}
                                    placeholder={"문서 제목을 입력하세요."}
                                    onChange={e => setDocumentTitle(e.target.value)}
                                    InputProps={{
                                        disableUnderline: true,
                                    }}
                                />
                            </S.BodyInfo>
                            {copList.length != 0 && (
                                <S.BodyInfo>
                                    <S.BodyTitle>COP</S.BodyTitle>
                                    <S.BodyInput>
                                        <S.DropboxWrap
                                            value={selectedCop}
                                            onChange={e => {
                                                handleChange(e, "CharacteristicOfPlant");
                                            }}
                                            disableUnderline={true}
                                        >
                                            <MenuItem value={-1}>
                                                <em>None</em>
                                            </MenuItem>
                                            {copList.map((raw: any, idx: number) => {
                                                return (
                                                    <MenuItem key={idx} value={raw.id}>
                                                        {raw.text}
                                                    </MenuItem>
                                                );
                                            })}
                                        </S.DropboxWrap>
                                    </S.BodyInput>
                                </S.BodyInfo>
                            )}
                            <S.BodyInfo>
                                <S.DocTitle>수신</S.DocTitle>
                                <S.DocContent>
                                    {selectedReceiverId.map((id: number, idx: number) => {
                                        return (
                                            <S.DocChip key={idx}>
                                                <Chip
                                                    variant={"outlined"}
                                                    label={getRecvText(id)}
                                                    onDelete={() => handleDelete(idx, 0)}
                                                />
                                            </S.DocChip>
                                        );
                                    })}
                                    <S.DocBtn onClick={() => setVisibleFormReceiver(true)}>
                                        +
                                    </S.DocBtn>
                                </S.DocContent>
                            </S.BodyInfo>
                            {customRecvFlag && (
                                <S.BodyInfo>
                                    <S.DocTitle></S.DocTitle>
                                    <S.DocContent>
                                        <S.CustomInputField
                                            placeholder="수신 직접입력"
                                            InputProps={{ disableUnderline: true }}
                                            onChange={e => setCustomRecv(e.target.value)}
                                        />
                                    </S.DocContent>
                                </S.BodyInfo>
                            )}
                            <S.BodyInfo>
                                <S.DocTitle>참조</S.DocTitle>
                                <S.DocContent>
                                    {selectedReferList.map((id: number, idx: number) => {
                                        return (
                                            <S.DocChip key={idx}>
                                                <Chip
                                                    variant={"outlined"}
                                                    label={getRecvText(id)}
                                                    onDelete={() => handleDelete(idx, 1)}
                                                />
                                            </S.DocChip>
                                        );
                                    })}
                                    <S.DocBtn onClick={onClickAddRefer}>+</S.DocBtn>
                                </S.DocContent>
                            </S.BodyInfo>
                            {customRefFlag && (
                                <S.BodyInfo>
                                    <S.DocTitle></S.DocTitle>
                                    <S.DocContent>
                                        <S.CustomInputField
                                            placeholder="참조 직접입력"
                                            InputProps={{ disableUnderline: true }}
                                            onChange={e => setCustomRef(e.target.value)}
                                        />
                                    </S.DocContent>
                                </S.BodyInfo>
                            )}
                            <S.BodyInfo>
                                <S.DocTitle>접수</S.DocTitle>
                                <S.DocContent>
                                    {selectedRegistList.map((id: number, idx: number) => {
                                        return (
                                            <S.DocChip key={idx}>
                                                <Chip
                                                    variant={"outlined"}
                                                    label={getRecvText(id)}
                                                    onDelete={() => handleDelete(idx, 2)}
                                                />
                                            </S.DocChip>
                                        );
                                    })}
                                    <S.DocBtn onClick={() => setVisibleFormRegist(true)}>
                                        +
                                    </S.DocBtn>
                                </S.DocContent>
                            </S.BodyInfo>
                            {customRegistFlag && (
                                <S.BodyInfo>
                                    <S.DocTitle></S.DocTitle>
                                    <S.DocContent>
                                        <S.CustomInputField
                                            placeholder="접수 직접입력"
                                            InputProps={{ disableUnderline: true }}
                                            onChange={e => setCustomRegist(e.target.value)}
                                        />
                                    </S.DocContent>
                                </S.BodyInfo>
                            )}
                            {visibleDocNo && (
                                <S.BodyInfo>
                                    <S.BodyTitle>문서번호</S.BodyTitle>
                                    <S.DocNoContent>
                                        {docCode && (
                                            <S.DocNoTextfield
                                                style={{ marginLeft: 0 }}
                                                type={"text"}
                                                value={docCode}
                                                // onChange={(e)=>setDocCode(e.target.value)}
                                                InputProps={{
                                                    disableUnderline: true,
                                                    readOnly: true,
                                                    style: {
                                                        // width: "100px",
                                                        textAlign: "right",
                                                    },
                                                }}
                                            />
                                        )}
                                        {docCodeTextFlag && (
                                            <S.DocNoTextfield
                                                type={"text"}
                                                value={docCodeText}
                                                onChange={e => setDocCodeText(e.target.value)}
                                                InputProps={{
                                                    disableUnderline: true,
                                                    style: {
                                                        // width: "100px",
                                                        backgroundColor: "whitesmoke",
                                                    },
                                                }}
                                                style={{ textAlignLast: "auto" }}
                                            />
                                        )}
                                        {dsSelector.document_codes.document_no && (
                                            <S.DocNoTextfield
                                                type={"text"}
                                                value={documentNo + ` - `}
                                                onChange={e => {
                                                    if (!isNaN(parseInt(e.target.value)))
                                                        setDocumentNo(parseInt(e.target.value));
                                                    else setDocumentNo(0);
                                                }}
                                                InputProps={{
                                                    disableUnderline: true,
                                                    readOnly: false,
                                                    style: {},
                                                }}
                                                inputProps={{
                                                    style: {
                                                        textAlign: `center`,
                                                    },
                                                }}
                                            />
                                        )}
                                        <S.DocNoTextfield
                                            style={{ flex: "none" }}
                                            type={"number"}
                                            value={documentId}
                                            placeholder={"문서 번호를 입력하세요."}
                                            onChange={e => setDocumentId(parseInt(e.target.value))}
                                            InputProps={{
                                                disableUnderline: true,
                                                style: {
                                                    width: "54px",
                                                },
                                            }}
                                            inputProps={{
                                                style: { textAlign: `right`, width: `80px` },
                                                min: 1,
                                            }}
                                        />
                                        호
                                    </S.DocNoContent>
                                </S.BodyInfo>
                            )}
                        </S.InfoContainer>
                        <S.EndContainer $deactive={selectedItem == -1}>
                            <S.Btn
                                $deactive={deactive}
                                onClick={deactive ? undefined : onClickConfirm}
                            >
                                확인
                            </S.Btn>
                        </S.EndContainer>
                    </S.DetailBlock>
                </S.Content>
            </S.Inner>
            {/* </Draggable> */}
        </S.Block>
    );
};
