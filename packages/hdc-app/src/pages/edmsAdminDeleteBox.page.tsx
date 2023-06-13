/******************************************************************************
 * hooks :
 * useLocations
 * components :
 *
 *

 ******************************************************************************/
import { useDispatch, useSelector } from "react-redux"; // redux
import React, { useState, useEffect } from "react";

import { GridViewComponent, LoadingIndicatorComponent, ModalInfo, ModalConfirm } from "components";
//library
//util
import { reducerState } from "../common";
import { GetDocumentManager, GetDeleteBoxList, RestoreMydocumentFiles } from "../common/action";
//
//image
import * as S from "../styled/edmsDeleteBox.styled";
import * as T from "../styled/edmsProject.styled";

import * as docS from "../styled/edmsDocument.styled";
import searchIconSvg from "../images/icon/search_icon.svg";
//

import moment from "moment";

let checkedDocuList: any[] = [];

const tableHeadType = [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1];
const tableHeadSize = [0.6, 0.4, 0.6, 1.2, 1, 1.4, 0.4, 1.8, 0.4, 0.5, 0.9, 0.4];
const tableHeader = [
    "삭제일",
    "프로젝트",
    "분야",
    "카테고리",
    "Doc.No",
    "문서",
    "Revision",
    "파일이름",
    "파일타입",
    "최근 업무절차",
    "문서단계",
    "작성자",
];

const EdmsAdminDeleteBoxPage = (props: any) => {
    const dispatch = useDispatch();
    const workSelector = useSelector((state: reducerState) => state.work);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [keyWord, setKeyWord] = useState<string>("");
    const [searchData, setSearchData] = useState<string>("");

    const [checked, setChecked] = useState<number[]>([]);
    const [workList, setWorkList] = useState<any[]>([]);
    const [workListKeys, setWorkListKeys] = useState<any[]>([]);
    const [deletedBoxList, setdeletedBoxList] = useState<any[]>([]);

    useEffect(() => {
        dispatch(GetDeleteBoxList("Admin"));
        dispatch(GetDocumentManager());
    }, []);

    useEffect(() => {
        makeList();
    }, [workSelector.delete_box_list, searchData]);

    const regExp = (searchData: string) => {
        var reg = /[\{\}\[\]\/" "?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
        //특수문자 검증
        if (reg.test(searchData)) {
            //특수문자 제거후 리턴
            return searchData.replace(reg, "");
        } else {
            //특수문자가 없으므로 본래 문자 리턴
            return searchData;
        }
    };

    const checkKoreanRegExp = (searchData: string) => {
        var reg = /[a-z0-9]|[ \[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"'\\]/g;

        if (reg.test(searchData)) {
            return searchData.replace(reg, "");
        } else {
            return searchData;
        }
    };

    const makeList = () => {
        setIsLoading(true);
        let _tmplist: any[] = [];

        if (workSelector.delete_box_list && workSelector.delete_box_list.length > 0) {
            let deleteBoxList: any[] = workSelector.delete_box_list;

            if (searchData != "") {
                let search_target: any[] = [];
                let search_result: any[] = [];

                let is_Korean = checkKoreanRegExp(searchData);

                deleteBoxList.map(deletedFile => {
                    search_target.push([
                        deletedFile.file_no,
                        deletedFile.docu_subject,
                        deletedFile.docu_code,
                        deletedFile.file_name,
                    ]);
                });

                search_target.map(target => {
                    for (let i = 1; i < 4; i++) {
                        if (is_Korean) {
                            if (
                                target[i] &&
                                checkKoreanRegExp(target[i]).indexOf(searchData) != -1
                            ) {
                                search_result.push(
                                    deleteBoxList.find(
                                        deletedFile => deletedFile.file_no == target[0]
                                    )
                                );
                            }
                        } else {
                            if (target[i] && target[i].indexOf(searchData) != -1) {
                                search_result.push(
                                    deleteBoxList.find(
                                        deletedFile => deletedFile.file_no == target[0]
                                    )
                                );
                            }
                        }
                    }
                });

                deleteBoxList = search_result;
            }

            if (deleteBoxList.length > 0) {
                for (var tmp of deleteBoxList) {
                    _tmplist.push({
                        docu_no: tmp.docu_no,
                        file_no: tmp.file_no,
                        no_list: {
                            docu_no: tmp.docu_no,
                            file_no: tmp.file_no,
                            cate_no: tmp.cate_no,
                            auth: tmp.auth,
                        },
                        create_tm: moment(tmp.create_tm).format("YYYY-MM-DD HH:mm:SS"),
                        proj_name: tmp.project_name,
                        discipline_name: tmp.disc_name,
                        cate_name: tmp.cate_name,
                        docu_code: tmp.docu_code,
                        docu_subject: tmp.docu_subject,
                        // file_code: tmp.file_code,
                        revision: tmp.fversion,
                        file_name: tmp.file_name,
                        file_type: tmp.file_type,
                        wptype: tmp.type,
                        status: {
                            stage: tmp.stage,
                            first_dt_name: tmp.first_dt_name,
                            first_dt: tmp.first_dt,
                        },
                        create_by: tmp.file_create_user_name,
                    });
                }
                setWorkList([..._tmplist]);
                setdeletedBoxList(deleteBoxList);

                let _keys = Object.keys(_tmplist[0]).filter(
                    (raw, idx) => idx != 0 && idx != 1 && idx != 2
                );
                setWorkListKeys(_keys);
            } else {
                setWorkList([]);
            }
        } else if (workSelector.delete_box_list && workSelector.delete_box_list.length == 0) {
            setWorkList([]);
        }
        setTimeout(() => {
            setIsLoading(false);
        }, 300);
        setChecked([]);
    };

    const createCustomEl = (idx: number, dataIdx?: number) => {
        if (workList.length != 0) {
            if (dataIdx != undefined && workList.length <= dataIdx) return null;
            if (idx === 9) {
                if (dataIdx == undefined) return true;
                let data = workList[dataIdx].wptype;
                return (
                    <T.TableTd>
                        <S.StatusDiv>
                            <S.wpType $wpType={data ? data : ``}>{data ? data : `임시`}</S.wpType>
                        </S.StatusDiv>
                    </T.TableTd>
                );
            } else if (idx === 10) {
                if (dataIdx == undefined) return true;
                let data = workList[dataIdx].status;
                return (
                    <T.TableTd>
                        <S.StatusDiv>
                            <S.Stage>{data.stage}</S.Stage>
                            <S.ActualDate>
                                {data.first_dt_name ? data.first_dt_name : ``}{" "}
                                {data.first_dt ? moment(data.actual_dt).format(`YYYY-MM-DD`) : ``}
                            </S.ActualDate>
                        </S.StatusDiv>
                    </T.TableTd>
                );
            }
        }

        return null;
    };

    const onCheckChange = (selectItems: any) => {
        let docus = Object.keys(selectItems);
        let checked: number[] = [];
        for (var docu of docus) if (selectItems[docu] === true) checked.push(parseInt(docu));
        setChecked([...checked]);
    };

    const onKeyPress = (e: any) => {
        if (e.key == "Enter" || e === "click") {
            setSearchData(keyWord);
        }
    };

    const confirmRestore = async (confirmText: string) => {
        setIsLoading(true);

        dispatch(RestoreMydocumentFiles(checkedDocuList, true));

        setTimeout(() => {
            dispatch(GetDeleteBoxList("Admin"));
            ModalInfo(`${confirmText}가 복원되었습니다.`);
            checkedDocuList = [];
            setIsLoading(false);
        }, 2000);
    };

    const onClickBtn = () => {
        if (checked && deletedBoxList.length != 0 && checked.length != 0) {
            checkedDocuList = [];

            checked.map(raw => {
                let checkedDocuments = deletedBoxList.find(fRaw => fRaw.file_no == raw);
                if (checkedDocuments) checkedDocuList.push(checkedDocuments);
            });
        }

        if (checkedDocuList.length == 0) return ModalInfo("파일을 한개 이상 선택해 주세요.");

        let confirmText: string = "";
        let checkedDocuNames: any[] = checkedDocuList.map(raw => raw.docu_subject);

        if (checkedDocuNames.length > 1)
            confirmText = `${checkedDocuNames[0]} 외 ` + `${checkedDocuNames.length - 1}건의 문서`;
        else confirmText = `${checkedDocuNames[0]} 문서`;

        ModalConfirm(`${confirmText}를 복원하시겠습니까?`, () => confirmRestore(confirmText));
    };

    return (
        <>
            <style>
                {`
                      .k-grid table {
                          width : 100% !important;
                      }
                      .k-grid td {
                          white-space : pre-wrap;
                      }
                  `}
            </style>
            <LoadingIndicatorComponent open={isLoading} style={{ zIndex: 100 }} />
            <S.DocumentWorklistContainer>
                <S.DoucmentWorklistTableBox>
                    <S.DocumentWorklistTableBoxHeader>
                        <S.Searchbar>
                            <S.SearchField
                                value={keyWord}
                                placeholder={"검색어를 입력하세요."}
                                onChange={e => setKeyWord(e.target.value)}
                                onKeyPress={e => onKeyPress(e)}
                                InputProps={{
                                    disableUnderline: true,
                                }}
                            />
                            <S.SearchIcon src={searchIconSvg} />
                        </S.Searchbar>
                        <S.Notice>영구 삭제 문서만 표시됩니다</S.Notice>
                        <S.FileToolBtnWrapper>
                            <docS.DocumentToolBtn
                                onClick={e => onClickBtn()}
                                style={{ backgroundColor: "#FF9800" }}
                            >
                                복원
                            </docS.DocumentToolBtn>
                        </S.FileToolBtnWrapper>
                    </S.DocumentWorklistTableBoxHeader>
                    <S.GridViewWrap>
                        <GridViewComponent
                            titles={tableHeader}
                            keys={workListKeys}
                            values={Object.values(workList)}
                            fullData={workList}
                            keysWidth={tableHeadSize}
                            datatype={tableHeadType}
                            rowClass="background-color-white color-light-black"
                            headerClass="background-dark-sky-blue color-white align-center"
                            getCustomEl={createCustomEl}
                            keysWidthTotal={10}
                            pageable={true}
                            isSelect
                            onChangeSelect={onCheckChange}
                            selectKey={"file_no"}
                        />
                    </S.GridViewWrap>
                </S.DoucmentWorklistTableBox>
            </S.DocumentWorklistContainer>
        </>
    );
};

export default EdmsAdminDeleteBoxPage;
