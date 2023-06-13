/******************************************************************************
 * * hooks :
 * useLocations
 *
 * components :
 * ConfirmButton
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

export type inspectTableCompProps = {
    data: Array<Object>;
    isEdit?: boolean;
    style?: object;
    headStyle?: object;
    isCellSelect?: boolean;
    cellSelect?: (idx: number, row_idx: number) => void;
    exceptList?: number[];
};
interface FinaltableProps extends inspectTableCompProps {}

const useStyles = makeStyles({
    table: {
        // minWidth: 650,
        paddingBottom: 0,
        borderCollapse: "inherit",
    },
});

export const InspectTableCompnent: React.FunctionComponent<FinaltableProps> = (
    props: FinaltableProps
) => {
    const classes = useStyles();

    const [selectedRowIdx, setSelectedRowIdx] = useState<number>(-1);
    const [selectedCellIdx, setSelectedCellIdx] = useState<number>(-1);

    const onClickRow = (idx: number) => {
        if (props.isCellSelect || props.isEdit) return;
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

    if (!(props.data && props.data.length > 0))
        return <div>표시할 데이터가 없습니다..</div>;

    return (
        <TableContainer style={props.style} component={TableContainerPaper}>
            <Table
                cellSpacing={0}
                cellPadding={0}
                className={classes.table}
                aria-label="simple table"
            >
                <TableHeadDiv>
                    <TableRow style={{ borderBottom: "1px solid #4e5d66" }}>
                        {Object.keys(props.data[0]).map((raw, idx) => {
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
                    {props.data.map((row, idx) => (
                        <TableBodyRow
                            key={"tableRow" + idx}
                            $selected={
                                !props.isCellSelect && selectedRowIdx == idx
                            }
                            onClick={() => onClickRow(idx)}
                        >
                            {Object.values(row).map((value, val_idx) => {
                                if (typeof value == "object") {
                                    return (
                                        <TableBodyCell
                                            key={"tableCell" + val_idx}
                                            align="center"
                                            $isFailed={!value["flag"]}
                                        >
                                            {value["value"]}
                                        </TableBodyCell>
                                    );
                                } else if (
                                    Object.keys(props.data[0])[val_idx].indexOf(
                                        "결과"
                                    ) != -1
                                ) {
                                    return (
                                        <TableBodyCell
                                            key={"tableCell" + val_idx}
                                            align="center"
                                            style={{
                                                width: "80px",
                                                height: "48px",
                                                padding: "10px",
                                            }}
                                            padding="none"
                                        >
                                            <TableBodyCellResultDiv
                                                $result={value}
                                            >
                                                {value ? "합격" : "불합"}
                                            </TableBodyCellResultDiv>
                                        </TableBodyCell>
                                    );
                                }
                                return (
                                    <TableBodyCell
                                        key={"tableCell" + val_idx}
                                        align="center"
                                    >
                                        {value}
                                    </TableBodyCell>
                                );
                            })}
                        </TableBodyRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

type styleProps = {
    $selected?: boolean;
    $background?: string;
    $cellSelected?: boolean;
    $isFailed?: boolean;
    $result?: boolean;
};

const TableContainerPaper = styled(Paper)`
    margin: 20px 0;
    height: max-content;
    border-radius: 0;
    padding-bottom: 0;
    &:last-child {
        padding-bottom: 0;
    }
`;

const TableHeadDiv = styled(TableHead)`
    background-color: #6b7f8b;
`;

const TableHeadCell = styled(TableCell)`
    color: white;
    font-weight: 500;
    white-space: break-spaces;
    line-height: 1.4em;
    padding: 5px 10px;
    height: 48px;
    font-size: 1.2em;
    font-weight: 400;
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
        props.$isFailed ? `#FEE4E5` : `transparent`};
    padding: 10px;
`;

const TableBodyCellResultDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${(props: styleProps) =>
        props.$result ? `#43CB61` : `#DE5E61`};
    width: 100%;
    color: white;
    height: 100%;
`;
