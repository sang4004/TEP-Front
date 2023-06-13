/******************************************************************************
 * modelelementview / index.tsx
 * hooks :
 *
 * desc : iModel Element View
 ******************************************************************************/
// Library
import { useSelector, useDispatch } from "react-redux"; // redux
import React, { useState, useEffect, useContext } from "react"; // default hooks
//
// Module
import { useLocations } from "hooks"; // locations hooks
import * as S from "./styled";
import trashSvg from "../../images/edms/trash.svg";
import exitSvg from "../../images/edms/times-solid-white.svg";
import { getMoment } from "../../common/utils";
import { reducerState } from "../../common";
import { GetModelElementList } from "../../common/action";
import { ModalInfo, LoadingIndicatorComponent, GridViewComponent } from "components";

const tableHeadType = [1, 1, 1,1,1,1,1,1];
const tableHeadSize: number[] = [0.5, 1, 0.5, 1, 0.5, 2, 0.5, 0.5];
const tableHeader: string[] = ["No", "생성일", "element_id", "class_name", "code_scope", "code_spec", "parent_id", "user_label"];

export type modelElementViewProps = {
    visible: boolean;
    onClose: () => void;
    imodelId : number;
};

interface FinalmodelElementViewProps extends modelElementViewProps {}

export const ModelElementViewComp: React.FunctionComponent<FinalmodelElementViewProps> = props => {
    const dispatch = useDispatch();
    const modelFileSelector = useSelector((state: reducerState) => state.modelfile);
    const { pushHistory } = useLocations();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [elementList, setElementList] = useState<any[]>([]);

    useEffect(() => {
        if(props.imodelId){
            dispatch(GetModelElementList(props.imodelId));
            setIsLoading(true);
        }
    }, [props.imodelId]);

    useEffect(() => {
        if(modelFileSelector.imodel_elements.length > 0){
            let _list = [];
            for(var element of modelFileSelector.imodel_elements){
                _list.push({
                    no : _list.length + 1,
                    create_tm : element.created_at,
                    element_id : element.element_id,
                    class_name : element.class_name,
                    code_scope : element.code_scope,
                    code_spec : element.code_spec,
                    parent_id : element.parent_id,
                    user_label : element.user_label
                });
            }
            setElementList([..._list]);
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
        } else {
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
            setElementList([]);
        }
    }, [modelFileSelector.imodel_elements]);

    const onClose = () => {
        props.onClose();
    };


    return (
        <S.Block open={props.visible} onClose={onClose}>
            <S.Inner>
                <LoadingIndicatorComponent open={isLoading} style={{ zIndex: 1301 }} />
                <S.Header>
                    <S.Title>iModel Element 목록</S.Title>
                    <S.CloseBtn onClick={onClose}>
                        <img src={exitSvg} />
                    </S.CloseBtn>
                </S.Header>
                <S.Body>
                    <S.Wrapper>
                        <S.GridViewWrap>
                            {elementList.length > 0 && (
                                <GridViewComponent
                                    titles={tableHeader}
                                    keys={Object.keys(elementList[0])}
                                    values={Object.values(elementList)}
                                    fullData={elementList}
                                    keysWidth={tableHeadSize}
                                    datatype={tableHeadType}
                                    rowClass="background-color-white color-light-black pre-tag"
                                    headerClass="background-dark-sky-blue color-white align-center"
                                    keysWidthTotal={11}
                                />
                            )}
                        </S.GridViewWrap>
                    </S.Wrapper>
                    <S.BtmBtns>
                        <S.BtmBtn onClick={onClose}>닫기</S.BtmBtn>
                    </S.BtmBtns>
                </S.Body>
            </S.Inner>
        </S.Block>
    );
};
