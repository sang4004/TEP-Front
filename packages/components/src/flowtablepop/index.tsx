/******************************************************************************
 * Copyright (c) 2021. Moornmo Inc. Rights reserved.                          *
 * Data modelings and methods used are assets of Moornmo Inc.                 *
 * * hooks :
    *
 * components : 
    * 
 * last modify : jh.jeong
 ******************************************************************************/
// Library
import React, { useState, useEffect, useRef } from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from "@material-ui/core";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import styled from "styled-components";
//
// Module
 
//

type styleProps = {
	$selected ?: boolean;
	$background ?: string;
	$cellSelected ?: boolean;
	$stat ?: number;
}

enum perfStatDetailType {
    "정상" = 1,
    "미진행" = 0,
    "비정상" = -1
}

export type popFlowtableCompProps = {
    data : Array<Object>;
	style ?: object;
	headStyle ?: object;
	isCellSelect ?: boolean;
	cellSelect ?: (idx : number, row_idx : number)=>void
}
interface FinaltableProps extends popFlowtableCompProps {};

const useStyles = makeStyles({
	table: {
    	// minWidth: 650,
	},
});

export const FlowTablePOPComponent : React.FunctionComponent<FinaltableProps> = ( props : FinaltableProps )=>{
    const classes = useStyles();
	// TODO :: 수정을 위한 idIdx 재검토
	// const idIdx = Object.keys(props.data[0]).indexOf("id");
	const [selectedRowIdx, setSelectedRowIdx] = useState<number>(-1);
	const [selectedCellIdx, setSelectedCellIdx] = useState<number>(-1);

	const onClickRow = (idx : number)=>{
		if(props.isCellSelect) return;
		if(idx != selectedRowIdx)
			setSelectedRowIdx(idx);
		else
			setSelectedRowIdx(-1);
	}

	const onClickCell = (idx : number, row_idx : number)=>{
		if(idx != selectedCellIdx || row_idx != selectedRowIdx){
			setSelectedCellIdx(idx);
			setSelectedRowIdx(row_idx);
		}
		else {
			setSelectedCellIdx(-1);
			setSelectedRowIdx(-1);
		}
		if(props.cellSelect)
			props.cellSelect(idx, row_idx);
	}

	// TODO :: 테이블 내에 로우들에 대한 스타일을 컴포넌트 밖에서 설정 할 수 있도록 수정필요;
	const getFlowTable = (value : string , val_idx : number, row_idx : number)=>{
		let selected = false;
		if(selectedCellIdx == val_idx && selectedRowIdx == row_idx)
			selected = true;
		let statType = null;
		if(parseInt(value) != NaN){
			statType = perfStatDetailType[parseInt(value)];
		}

        return (
            <TableBodyCell 
                key={"tableCell" + val_idx} 
                align="center"
                onClick={()=>onClickCell(val_idx, row_idx)}
                $cellSelected={selected}
				$stat={parseInt(value)}
                >
                {statType != null ? 
				<StatTypeDiv>
					<StatTypeCircle $stat={parseInt(value)} />
					{statType}
				</StatTypeDiv> 
				: 
				value
				}
            </TableBodyCell>    
        );
	}
	if(!(props.data && props.data.length > 0))
		return (
			<div>표시할 데이터가 없습니다..</div>
		);

	return (
		<TableContainer style={props.style} component={TableContainerPaper}>
			<Table className={classes.table} aria-label="simple table">
				<TableHeadDiv>
					<TableRow style={{borderBottom : "1px solid #4e5d66"}}>
					{Object.keys(props.data[0]).map((raw,idx)=>{
						return (
							<TableHeadCell 
								style={props.headStyle} 
								align="center" 
								key={idx}
								>
								{raw}
							</TableHeadCell>
						)
					})}
					</TableRow>
				</TableHeadDiv>
				<TableBody>
					{props.data.map((row,idx) => (
						<TableBodyRow 
							key={"tableRow"+idx}
							$selected={!props.isCellSelect && selectedRowIdx == idx}
							onClick={()=>onClickRow(idx)}
							>
							{Object.values(row).map((value,val_idx)=>{
                                return getFlowTable(value, val_idx, idx);
							})}
						</TableBodyRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
    );
};

const TableContainerPaper = styled(Paper)`
	height : 100%;
	border-radius : 0;
	width : 100%;
`;

const TableHeadDiv = styled(TableHead)`
	background-color : #6B7F8B;
`;	

const TableHeadCell = styled(TableCell)`
	color : white;
	font-weight : 500;
	white-space : break-spaces;	
	padding : 0;
	line-height : 1.4em;
	padding : 10px 10px;
`;

const TableBodyRow = styled(TableRow)`
	background-color : ${(props : styleProps) => props.$selected ? `#DAEDFF` : `transparent`};
`;

const TableBodyCell = styled(TableCell)`
	border-left : 1px solid #DFDFDF;
	border-right : 1px solid #DFDFDF;
	vertical-align : middle;
	text-align : center;
	width : fit-content;
	/* background-color : ${(props : styleProps) => props.$cellSelected ? `#DAEDFF` : `transparent`}; */
	background-color : ${(props : styleProps) => props.$stat == 1 ? `#D7F7E0` : props.$stat == -1 ? `#FEDADA` : `#F7F7F7`};
	padding : 10px;
`;

const StatTypeDiv = styled.div`
	display : flex;
	justify-content : center;
	align-items : center;
`;

const StatTypeCircle = styled(FiberManualRecord)`
	font-size : 1.2em;
	color : ${(props : styleProps) => props.$stat == 1 ? `#0AD430` : props.$stat == -1 ? `#F91010` : `#A4A4A4`};
	margin-right : 3px;
`;