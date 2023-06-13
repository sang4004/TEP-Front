/******************************************************************************
 * * hooks :
 *
 * components :
 *
 ******************************************************************************/
// Library
import React, { useState, useEffect, useRef } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core";
import styled from "styled-components";
//
// Module
//

type styleProps = {
    $selected?: boolean;
    $background?: string;
    $cellSelected?: boolean;
};

export type flowTableCompProps = {
    data: Array<Object>;
    style?: object;
    headStyle?: object;
    isCellSelect?: boolean;
    cellSelect?: (idx: number, row_idx: number) => void;
};
interface FinaltableProps extends flowTableCompProps {}

const useStyles = makeStyles({
    table: {
        minWidth: 650,
        borderCollapse: "inherit",
    },
});

export const FlowTableComponent: React.FunctionComponent<FinaltableProps> = (
    props: FinaltableProps
) => {
    const classes = useStyles();
    // TODO :: 수정을 위한 idIdx 재검토
    // const idIdx = Object.keys(props.data[0]).indexOf("id");
    const [selectedRowIdx, setSelectedRowIdx] = useState<number>(-1);
    const [selectedCellIdx, setSelectedCellIdx] = useState<number>(-1);
    const [headList, setHeadList] = useState<string[]>([]);
    const [bodyList, setBodyList] = useState<string[][]>([]);

    useEffect(() => {
        if (props.data && props.data.length > 0) {
            setHeadList([...Object.keys(props.data[0])]);
            var _list: string[][] = [];
            Object.values(props.data).map((raw, idx) => {
                var _values: string[] = [];
                Object.values(raw).map((value, val_idx) => {
                    _values.push(value);
                });
                _list.push(_values);
            });
            setBodyList([..._list]);
        }
    }, [props.data]);

    const onClickRow = (idx: number) => {
        if (props.isCellSelect) return;
        if (idx != selectedRowIdx) setSelectedRowIdx(idx);
        else setSelectedRowIdx(-1);
    };

    const onClickCell = (idx: number, row_idx: number) => {
        if (idx != selectedCellIdx || row_idx != selectedRowIdx) {
            setSelectedCellIdx(idx);
            setSelectedRowIdx(row_idx);
        } else {
            setSelectedCellIdx(-1);
            setSelectedRowIdx(-1);
        }
        if (props.cellSelect) props.cellSelect(idx, row_idx);
    };

    // TODO :: 테이블 내에 로우들에 대한 스타일을 컴포넌트 밖에서 설정 할 수 있도록 수정필요;
    const getFlowTable = (value: string, val_idx: number, row_idx: number) => {
        let splitVal = value.split(":");
        let selected = false;
        if (selectedCellIdx == val_idx && selectedRowIdx == row_idx)
            selected = true;
        if (splitVal.length == 1)
            return (
                <TableBodyCell
                    key={"tableCell" + val_idx}
                    align="center"
                    style={{ padding: "4px 10px" }}
                    onClick={() => onClickCell(val_idx, row_idx)}
                    $cellSelected={selected}
                >
                    {value}
                </TableBodyCell>
            );
        return (
            <TableBodyCell
                key={"tableCell" + val_idx}
                align="center"
                style={{ padding: "4px 10px" }}
                onClick={() => onClickCell(val_idx, row_idx)}
                $cellSelected={selected}
            >
                <TableRowValueDiv $background="#FFFFF5">
                    {splitVal[0]}
                </TableRowValueDiv>
                <TableRowValueDiv $background="#FDF6F7">
                    {splitVal[1]}
                </TableRowValueDiv>
            </TableBodyCell>
        );
    };
    if (headList.length == 0 && Object.keys(bodyList).length == 0)
        return <div>표시할 데이터가 없습니다..</div>;

    return (
        <TableContainer style={props.style} component={TableContainerPaper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHeadDiv>
                    <TableRow style={{ borderBottom: "1px solid #4e5d66" }}>
                        {headList.map((raw, idx) => {
                            return (
                                <TableHeadCell
                                    style={props.headStyle}
                                    align="center"
                                    key={idx}
                                >
                                    {raw}
                                </TableHeadCell>
                            );
                        })}
                    </TableRow>
                </TableHeadDiv>
                <TableBody>
                    {bodyList.map((row, idx) => (
                        <TableBodyRow
                            key={"tableRow" + idx}
                            $selected={
                                !props.isCellSelect && selectedRowIdx == idx
                            }
                            onClick={() => onClickRow(idx)}
                        >
                            {row.map((value, value_idx) => {
                                return getFlowTable(value, value_idx, idx);
                            })}
                        </TableBodyRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

const TableContainerPaper = styled(Paper)`
    margin: 20px 0;
    height: 100%;
    border-radius: 0;
    width: calc(100% - 2px);
`;

const TableHeadDiv = styled(TableHead)`
    background-color: #6b7f8b;
`;

const TableHeadCell = styled(TableCell)`
    color: white;
    font-weight: 500;
    white-space: break-spaces;
    padding: 0;
    line-height: 1.4em;
    padding: 5px 10px;
`;

const TableBodyRow = styled(TableRow)`
    background-color: ${(props: styleProps) =>
        props.$selected ? `#DAEDFF` : `transparent`};
`;

const TableBodyCell = styled(TableCell)`
    border-left: 1px solid #dfdfdf;
    border-right: 1px solid #dfdfdf;
    vertical-align: middle;
    width: fit-content;
    background-color: ${(props: styleProps) =>
        props.$cellSelected ? `#DAEDFF` : `transparent`};
    padding: 10px;
`;

const TableRowValueDiv = styled.div`
    background-color: ${(props: styleProps) => props.$background};
    border: 1px solid #dfdfdf;
    margin: 4px 0;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
