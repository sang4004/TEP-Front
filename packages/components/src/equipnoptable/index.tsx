/******************************************************************************
 * Copyright (c) 2021. Moornmo Inc. Rights reserved.                          *
 * Data modelings and methods used are assets of Moornmo Inc.                 *
 * equipnoptable/index.tsx
 * hooks :
 * useLocations
 *
 * last modify :
 ******************************************************************************/
// Library
import React, { useState, useEffect } from "react"; // default hooks
import styled from "styled-components";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
//
// Module

//

type styledProps = {
    $selected?: boolean;
    $background?: string;
    $cellSelected?: boolean;
    $paddingNone?: boolean;
};

export type equipnoptableProps = {
    data: Array<Object>;
    style?: object;
    headStyle?: object;
    exceptList?: number[];
    stopTypeList?: string[];
    stopReasonList?: string[];
    cbSelect?: (type: string, id: number, row_idx: number) => void;
    headObjList?: string[];
    headSize?: number[];
};
interface FinalequipnoptableProps extends equipnoptableProps {}

export const EquipnoptableComponent: React.FunctionComponent<
    FinalequipnoptableProps
> = (props) => {
    if (!(props.data && props.data.length > 0))
        return <div>표시할 데이터가 없습니다..</div>;

    const handleSelectVal = (type: string, event: any, row_idx: number) => {
        let val = parseInt(event.target.value);
        if (props.cbSelect) props.cbSelect(type, val, row_idx);
    };

    return (
        <TableContainer style={props.style} component={TableContainerPaper}>
            <Table
                style={{ borderCollapse: "inherit" }}
                aria-label="simple table"
            >
                <TableHeadDiv>
                    <TableRow style={{ borderBottom: "1px solid #4e5d66" }}>
                        {Object.keys(props.data[0]).map((raw, idx) => {
                            let val = Object.values(props.data[0])[idx];
                            if (
                                props.headObjList &&
                                props.headObjList.indexOf(raw) != -1
                            ) {
                                return (
                                    <TableHeadCell
                                        style={props.headStyle}
                                        align="center"
                                        key={idx}
                                        // width={props.headSize ? props.headSize[idx] : undefined}
                                        $paddingNone
                                    >
                                        <TableHeadObjGroupDiv>
                                            {raw}
                                        </TableHeadObjGroupDiv>
                                        <TableHeadObjGroupDiv>
                                            {Object.keys(val).map(
                                                (option, idx) => {
                                                    return (
                                                        <TableHeadObjDiv
                                                            key={idx}
                                                        >
                                                            {option}
                                                        </TableHeadObjDiv>
                                                    );
                                                }
                                            )}
                                        </TableHeadObjGroupDiv>
                                    </TableHeadCell>
                                );
                            }
                            return (
                                <TableHeadCell
                                    style={props.headStyle}
                                    align="center"
                                    key={idx}
                                    // width={props.headSize ? props.headSize[idx] : undefined}
                                >
                                    {raw}
                                </TableHeadCell>
                            );
                        })}
                    </TableRow>
                </TableHeadDiv>
                <TableBody>
                    {props.data.map((row, idx) => (
                        <>
                            <TableBodyRow key={"tableRow" + idx}>
                                {Object.values(row).map((value, val_idx) => {
                                    if (
                                        typeof value.indexOf == "function" &&
                                        value.indexOf("dropdown") != -1
                                    ) {
                                        let _list =
                                            value.indexOf("dropdown0") != -1
                                                ? props.stopTypeList
                                                : props.stopReasonList;
                                        return (
                                            <TableBodyCell
                                                key={"tableCell" + val_idx}
                                                align="center"
                                                style={{
                                                    padding: 0,
                                                    backgroundColor: "#EEF9FF",
                                                }}
                                            >
                                                <EquipNOPStopSelect
                                                    value={value.slice(
                                                        0,
                                                        value.indexOf(
                                                            "dropdown"
                                                        )
                                                    )}
                                                    onChange={(e) =>
                                                        handleSelectVal(
                                                            value.indexOf(
                                                                "dropdown0"
                                                            ) != -1
                                                                ? "type"
                                                                : "reason",
                                                            e,
                                                            idx
                                                        )
                                                    }
                                                    disableUnderline
                                                >
                                                    {_list &&
                                                        _list.map(
                                                            (
                                                                raw: string,
                                                                list_idx: number
                                                            ) => {
                                                                return (
                                                                    <MenuItem
                                                                        key={
                                                                            list_idx
                                                                        }
                                                                        value={
                                                                            list_idx
                                                                        }
                                                                    >
                                                                        {raw}
                                                                    </MenuItem>
                                                                );
                                                            }
                                                        )}
                                                </EquipNOPStopSelect>
                                            </TableBodyCell>
                                        );
                                    }

                                    if (
                                        props.headObjList &&
                                        props.headObjList.indexOf(
                                            Object.keys(row)[val_idx]
                                        ) != -1
                                    ) {
                                        return (
                                            <TableBodyCell
                                                key={"tableCell" + val_idx}
                                                align="center"
                                            >
                                                <TableBodyObjGroupDiv>
                                                    {Object.values(value).map(
                                                        (
                                                            raw: any,
                                                            val_obj_idx: any
                                                        ) => {
                                                            return (
                                                                <TableBodyObjDiv
                                                                    key={
                                                                        val_obj_idx
                                                                    }
                                                                >
                                                                    {raw}
                                                                </TableBodyObjDiv>
                                                            );
                                                        }
                                                    )}
                                                </TableBodyObjGroupDiv>
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
                            <TableBodyRow>
                                <TableBodyCell align="center">
                                    {Object.values(row)[0]}
                                </TableBodyCell>
                                <TableBodyCell align="center">
                                    메모
                                </TableBodyCell>
                                <TableBodyCell
                                    colSpan={Object.values(row).length - 2}
                                >
                                    <TableMemo
                                        InputProps={{
                                            disableUnderline: true,
                                            fullWidth: true,
                                        }}
                                    />
                                </TableBodyCell>
                            </TableBodyRow>
                        </>
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
    padding: ${(props: styledProps) => (props.$paddingNone ? `` : `5px 10px`)};
`;

const TableBodyRow = styled(TableRow)`
    background-color: ${(props: styledProps) =>
        props.$selected ? `#DAEDFF` : `transparent`};
`;

const TableBodyCell = styled(TableCell)`
    border-left: 1px solid #dfdfdf;
    border-right: 1px solid #dfdfdf;
    vertical-align: middle;
    width: fit-content;
    background-color: ${(props: styledProps) =>
        props.$cellSelected ? `#DAEDFF` : `transparent`};
    padding: 10px;
`;

const EquipNOPStopSelect = styled(Select)`
    background-color: #eef9ff;
    width: 100%;
`;

const TableHeadObjGroupDiv = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 50%;
`;

const TableHeadObjDiv = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #839cab;
    height: 100%;
`;

const TableBodyObjGroupDiv = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
`;

const TableBodyObjDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
`;

const TableMemo = styled(TextField)`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    text-align: center;
`;
