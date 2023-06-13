/******************************************************************************
 * * hooks :
    *
 * components : 
    * 
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
import { makeStyles, TextField, Checkbox } from "@material-ui/core";
import styled from "styled-components";
//
// Module
//

type styleProps = {
	$selected ?: boolean;
	$background ?: string;
	$cellSelected ?: boolean;
}

export type flowTableCompProps = {
    headList : string[];
    bodyList : object;
	style ?: object;
	headStyle ?: object;
	isCellSelect ?: boolean;
	isMultiCellSelect ?: boolean;
	refresh ?: number;
	cellSelect ?: (idx : number, row_idx : number)=>void
}
interface FinaltableProps extends flowTableCompProps {};

const useStyles = makeStyles({
	table: {
    	minWidth: 650,
		borderCollapse : "inherit"
	},
});

export const FlowTableComponent : React.FunctionComponent<FinaltableProps> = ( props : FinaltableProps )=>{
    const classes = useStyles();
	const [selectedRowIdx, setSelectedRowIdx] = useState<number>(-1);
	const [selectedCellIdx, setSelectedCellIdx] = useState<number>(-1);
	const [selectedCellIdxList, setSelectedCellIdxList] = useState<number[]>([]);

	useEffect(() => {
		setSelectedRowIdx(-1);
		setSelectedCellIdx(-1);
		setSelectedCellIdxList([]);
	}, [ props.refresh ]);

	const onClickMultiCell = (idx : number, row_idx : number)=>{
		if(props.isMultiCellSelect){
			let find = selectedCellIdxList.indexOf(idx + (row_idx * 7));
			if(find != -1){
				selectedCellIdxList.splice(find,1);
			} else {
				selectedCellIdxList.push(idx + row_idx * 7);
			}
			setSelectedCellIdxList([...selectedCellIdxList]);
			if(props.cellSelect){
				props.cellSelect(idx, row_idx);
			}
		}
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

	const getFlowTable = (value : string , val_idx : number, row_idx : number)=>{
		let splitVal = value.split(":");
		let selected = false;
		
		if(val_idx == 0)
			selected = false;
		else if(selectedCellIdx == val_idx && selectedRowIdx == row_idx)
			selected = true;
		else if(props.isMultiCellSelect && selectedCellIdxList.indexOf(val_idx + row_idx * 7) != -1 )
			selected = true;
		
        if(splitVal.length == 1)
            return (
                <TableBodyCell 
                    key={"tableCell" + val_idx} 
                    align="center"
                    style={{padding : "4px 10px"}}
                    onClick={()=>props.isMultiCellSelect ? onClickMultiCell(val_idx, row_idx) : onClickCell(val_idx, row_idx)}
                    $cellSelected={selected}
                    >
                    <span>{value}</span>
                </TableBodyCell>    
            )
		return (
			<TableBodyCell 
				key={"tableCell" + val_idx} 
				align="center"
				style={{padding : "4px 10px"}}
				onClick={()=> props.isMultiCellSelect ? onClickMultiCell(val_idx, row_idx) : onClickCell(val_idx, row_idx)}
				$cellSelected={selected}
				>
				<TableRowValueDiv $background="#FFFFF5"><span>{splitVal[0]}</span></TableRowValueDiv>
				<TableRowValueDiv $background="#FDF6F7"><span>{splitVal[1]}</span></TableRowValueDiv>
			</TableBodyCell>
		)
	}
	if(props.headList.length == 0 && Object.keys(props.bodyList).length == 0)
		return (
			<div>표시할 데이터가 없습니다..</div>
		);
    
    const values = Object.values(props.bodyList);

	return (
		<TableContainer style={props.style} component={TableContainerPaper}>
			<Table className={classes.table} aria-label="simple table">
				<TableHeadDiv>
					<TableRow style={{borderBottom : "1px solid #4e5d66"}}>
					{props.headList.map((raw,idx)=>{
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
					{values.map((row : any, idx : number) => (
						<TableBodyRow 
							key={"tableRow"+idx}
							$selected={!props.isCellSelect && selectedRowIdx == idx}
							>
                            {row.map((raw : any, val_idx : number)=>{
                                return getFlowTable(raw, val_idx, idx);
                            })}
						</TableBodyRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
    );
};

const TableContainerPaper = styled(Paper)`
	margin : 20px 0;
	height : 100%;
	border-radius : 0;
	width : calc(100% - 2px);
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
	padding : 5px 10px;
`;

const TableBodyRow = styled(TableRow)`
	background-color : ${(props : styleProps) => props.$selected ? `#DAEDFF` : `transparent`};
`;

const TableBodyCell = styled(TableCell)`
	border-left : 1px solid #DFDFDF;
	border-right : 1px solid #DFDFDF;
	vertical-align : middle;
	width : fit-content;
	background-color : ${(props : styleProps) => props.$cellSelected ? `#DAEDFF` : `transparent`};
	padding : 10px;
	cursor : pointer;
`;

const TableRowValueDiv = styled.div`
	background-color : ${(props : styleProps)=> props.$background};
	border : 1px solid #DFDFDF;
	margin : 4px 0;
	height : 40px;
	display : flex;
	justify-content : center;
	align-items : center;
`;