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

export type tableCompProps = {
    data : Array<Object>;
	isEdit : boolean;
	style ?: object;
	tableStyle ?: object;
	headStyle ?: object;
	bodyCellStyle ?: object;
	isCellSelect ?: boolean;
	cellSelect ?: (idx : number, row_idx : number)=>void;
	rowSelect ?: (idx : number)=>void;
	exceptList ?: number[];
	headSize ?: number[];
	multiSelect ?: boolean;
}
interface FinaltableProps extends tableCompProps {};

const useStyles = makeStyles({
	table: {
    	minWidth: 650,
		paddingBottom : 0,
		borderCollapse : "inherit"
	},
});

export const TableComponent : React.FunctionComponent<FinaltableProps> = ( props : FinaltableProps )=>{
    const classes = useStyles();
	// TODO :: 수정을 위한 idIdx 재검토
	// const idIdx = Object.keys(props.data[0]).indexOf("id");
	const [selectedRowIdx, setSelectedRowIdx] = useState<number>(-1);
	const [selectedRowIdxList, setSelectedRowIdxList] = useState<number[]>([]);
	const [selectedCellIdx, setSelectedCellIdx] = useState<number>(-1);

	useEffect(() => {
		if(props.rowSelect)
			props.rowSelect(selectedRowIdx);

	}, [selectedRowIdx]);

	const onClickRow = (idx : number)=>{
		if(props.isCellSelect || props.isEdit) return;
		if(props.multiSelect){
			let _exist = selectedRowIdxList.indexOf(idx)
			if(_exist != -1){
				selectedRowIdxList.splice(_exist, 1);
				setSelectedRowIdxList([...selectedRowIdxList]);
			} else {
				setSelectedRowIdxList([...selectedRowIdxList, idx]);
			}
			return ;
		}
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

	if(!(props.data && props.data.length > 0))
		return (
			<div>표시할 데이터가 없습니다..</div>
		);

	return (
		<TableContainer style={props.style} component={TableContainerPaper}>
			<Table className={classes.table} aria-label="simple table" style={props.tableStyle}>
				<TableHeadDiv>
					<TableRow style={{borderBottom : "1px solid #4e5d66"}}>
					{ props.isEdit ? <TableCell /> : null }
					{Object.keys(props.data[0]).map((raw,idx)=>{
						return (
							<TableHeadCell 
								style={props.headStyle} 
								align="center" 
								key={idx}
								// width={props.headSize ? props.headSize[idx] : undefined}
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
							$selected={props.multiSelect ? selectedRowIdxList.indexOf(idx) != -1 : !props.isCellSelect && selectedRowIdx == idx}
							onClick={()=>onClickRow(idx)}
							>
							{props.isEdit ? 
								<TableBodyCell style={props.bodyCellStyle}>
									<Checkbox id={"checked"+idx.toString()} ></Checkbox>
								</TableBodyCell> 
							: null}
							{Object.values(row).map((value,val_idx)=>{
								if(props.isEdit){
									return (
										<TableBodyCell 
											key={"tableCell" + val_idx} 
											align="center"
											style={props.bodyCellStyle}
											>
											<TextField 
												id={value.toString() + idx.toString() + "EDIT"}
												autoFocus
												type="text"
												variant="outlined"
												defaultValue={value}
												required
												// disabled={idIdx == val_idx}
												disabled={val_idx == 0 || (props.exceptList && props.exceptList.indexOf(val_idx) != -1)}
												className="table-edit-input"
												InputProps={{
													style : {
														textAlign : "center",
														padding : "4px 0"
													}
												}}
												/>
										</TableBodyCell>
									)
								}
								return (
									<TableBodyCell 
										key={"tableCell" + val_idx} 
										align="center" 
										style={props.bodyCellStyle}
										>
										{typeof value == "number" ? value.toLocaleString() : value}
									</TableBodyCell>
								)
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
	padding-bottom : 0;
	&:last-child{
		padding-bottom : 0;
	}
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