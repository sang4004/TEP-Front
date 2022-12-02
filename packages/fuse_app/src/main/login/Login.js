import FuseAnimate from 'fuse/lib/core/FuseAnimate';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { Button } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CustomLoginTab from './tabs/CustomLoginTab';
import styled from "styled-components";

import { Login } from "common_module";

const useStyles = makeStyles(theme => ({
	root: {
		background: `linear-gradient(to left, ${theme.palette.primary.dark} 0%, ${darken(
			theme.palette.primary.dark,
			0.5
		)} 100%)`,
		// background : "white",
		color: theme.palette.primary.contrastText
	},
	leftSection: {
	},
	rightSection: {
		background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${darken(
			theme.palette.primary.dark,
			0.5
		)} 100%)`,
		color: theme.palette.primary.contrastText,
		padding: "20px 0"
	}
}));

function LoginComp() {
	const classes = useStyles();
	const numberPadValues = [1,2,3,4,5,6,7,8,9, "지우기", 0, "확인"];
	const [numbers, setNumbers] = useState("");

	const onClickPad = (val)=>{
		if(typeof val == "number"){
			setNumbers(numbers + val.toString());
		} else {
			if(val.indexOf("지우기") != -1){
				setNumbers(numbers.slice(0, numbers.length-2));
			} else {
				document.getElementById("login_submit").click();
			}
		}
	}
	return (
		<div
			className={clsx(
				classes.root,
				'flex flex-col flex-auto items-center justify-center flex-shrink-0 p-16 md:p-24 h-full'
			)}
			>
			<FuseAnimate animation="transition.expandIn">
				<div className="flex w-full h-full max-w-400 md:max-w-3xl rounded-12 shadow-2xl overflow-hidden">
					<Card
						className={clsx(
							classes.leftSection,
							'flex flex-col w-full max-w-sm items-center justify-center shadow-0'
						)}
						square
						>
						<CardContent className="flex flex-col items-center justify-center w-full py-96">
							<FuseAnimate delay={300}>
								<div className="flex items-center mb-32">
									<img className="logo-icon w-48" src="assets/images/logos/fuse.svg" alt="logo" />
									<div className="border-l-1 mr-4 w-1 h-40" />
									<div>
										<Typography className="text-24 font-800 logo-text" color="inherit">
											POP
										</Typography>
										<Typography
											className="text-16 tracking-widest -mt-8 font-700"
											color="textSecondary"
										>
											무른모
										</Typography>
									</div>
								</div>
							</FuseAnimate>

							<CustomLoginTab numberVal={numbers}></CustomLoginTab>
						</CardContent>
					</Card>

					<div
						className={clsx(classes.rightSection, 'hidden md:flex flex-1 items-center justify-center')}
						>
						<div className="w-full h-full">
							<FuseAnimate animation="transition.slideUpIn" delay={400}>
								<Typography variant="h3" color="inherit" className="font-800 leading-tight text-center">
									Welcome to the <br /> POP!
								</Typography>
							</FuseAnimate>
							<RightNumberPadDiv>
								{numberPadValues.map((raw,idx)=>{
									return (
										<NumberPadBtn
											key={idx} 
											onClick={()=>onClickPad(raw)}
											color={'primary'}
											>
											{raw}
										</NumberPadBtn>
									);
								})}
							</RightNumberPadDiv>
						</div>
					</div>
				</div>
			</FuseAnimate>
		</div>
	);
}

const RightNumberPadDiv = styled.div`
	display : flex;
	justify-content : center;
	align-items : center;
	flex-wrap : wrap;
	height : 100%;
	flex : 1;
	background-color : white;
	width : 100%;
	gap : 3em;
	padding-bottom : 100px;
`;

const NumberPadBtn = styled(Button)`
	width : 25%;
	background-color : #217BCE;
	color : white;
	height : 100px;
	border-radius : .4em;
	font-size : 2.2em;
	&:hover{
		background-color : #117BCE;
	}
`;

export default LoginComp;