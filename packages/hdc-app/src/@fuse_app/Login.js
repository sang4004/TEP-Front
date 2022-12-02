import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CustomLoginTab from './CustomLoginTab';
import FuseAnimate from 'fuse/lib/core/FuseAnimate';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {makeStyles} from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';

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
		// padding: "20px 0"
	}
}));

const LoginComp = () =>{
	const classes = useStyles();
	return (
		<div
			className={clsx(
				classes.root,
				'flex flex-col flex-auto items-center justify-center flex-shrink-0 p-16 md:p-24 h-full'
			)}
			>
			<FuseAnimate animation="transition.expandIn">
				<div className="flex w-full h-full rounded-12 shadow-2xl overflow-hidden" style={{width : "50%"}}>
					<Card
						className={clsx(
							classes.leftSection,
							'flex flex-col w-full max-w-sm items-center justify-center shadow-0'
						)}
						square
						style={{ width : "100%"}}
						>
						<CardContent className="flex flex-col items-center justify-center w-full py-96">
							<FuseAnimate delay={300}>
								<div className="flex items-center mb-32">
									{/* <img className="logo-icon w-48" src="assets/images/logos/moornmo_1x1_logo.png" alt="logo" />
									<div className="border-l-1 mr-4 w-1 h-40" style={{ margin : "0 10px"}} /> */}
									<div>
										<Typography className="text-24 font-600 logo-text" color="inherit" style={{color : "#333333"}}>
											통영에코파워
										</Typography>
										{/* <Typography
											className="text-16 tracking-widest -mt-8 font-700"
											color="inherit"
											>
											현대산업개발
										</Typography> */}
									</div>
								</div>
							</FuseAnimate>
							<CustomLoginTab></CustomLoginTab>
							<div className="flex flex-col items-center justify-center pt-32 pb-24" style={{paddingTop : "32px"}}>
								<span className="font-medium">Don't have an account?</span>
								<Link className="font-medium" to="/regist">
									Create an account
								</Link>
							</div>
						</CardContent>
					</Card>

					<div
						className={clsx(classes.rightSection, 'md:flex flex-1 items-center justify-center')}
						>
						<div style={{ 
							width : "100%", 
							height : "100%", 
							backgroundImage : `url('assets/images/hdc/tep_bg.png')`,
							backgroundSize : "cover",
							backgroundPositionX : "center"
							}} 
							/>
					</div>
				</div>
			</FuseAnimate>
		</div>
	);
}

export default LoginComp;