/******************************************************************************
 * GridNavigation/index.tsx
 * hooks :
    * useLocations 
    *
 * last modify : 
 ******************************************************************************/
// Library
import { useSelector, useDispatch } from "react-redux"; // redux
import React, { useState, useEffect } from "react"; // default hooks
import styled from "styled-components";
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Button, Typography, Grid, Icon } from '@material-ui/core';
//
// Module
import { useLocations } from "hooks" // locations hooks
import { LoadingIndicatorComponent } from "../loadingIndicator";
//

const useStyles = makeStyles(theme => ({
	navigation: {
		'& .list-item': {
			'&:hover': {
				backgroundColor: theme.palette.type === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0,0,0,.04)'
			},
			'&:focus:not(.active)': {
				backgroundColor: theme.palette.type === 'dark' ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0,0,0,.05)'
			}
		}
	},
	verticalNavigation: {
		'&.active-square-list': {
			'& .list-item, & .active.list-item': {
				width: '100%',
				borderRadius: '0'
			}
		},
		'&.dense': {
			'& .list-item': {
				paddingTop: 0,
				paddingBottom: 0,
				height: 32
			}
		}
	},
	horizontalNavigation: {
		'&.active-square-list': {
			'& .list-item': {
				borderRadius: '0'
			}
		},
		'& .list-item': {
			padding: '8px 12px 8px 12px',
			height: 40,
			minHeight: 40,
			'&.level-0': {
				height: 44,
				minHeight: 44
			},
			'& .list-item-text': {
				padding: '0 0 0 8px'
			}
		}
	},
	'@global': {
		'.popper-navigation-list': {
			'& .list-item': {
				padding: '8px 12px 8px 12px',
				height: 40,
				minHeight: 40,
				'& .list-item-text': {
					padding: '0 0 0 8px'
				}
			},
			'&.dense': {
				'& .list-item': {
					minHeight: 32,
					height: 32,
					'& .list-item-text': {
						padding: '0 0 0 8px'
					}
				}
			}
		}
	}
}));

type navigationType = {
    id : string,
    type : string,
    url : string,
	icon : string,
	title : string,
	necessary : string[]
}

export type GridNavigationProps = {
    style : object;
    navigation : navigationType[];
    active : boolean;
    className : string
}
interface FinalGridNavigationProps extends GridNavigationProps {};

type styledProps = {
	$isEnable : boolean;
};

export const GridNavigationComponent : React.FunctionComponent<FinalGridNavigationProps> = ( props )=>{
    const classes = useStyles(props);
	const workSelector = useSelector((state : any)=> state.work);
    const { navigation, active, className } = props;
	const { path, pushHistory } = useLocations();

	// const [isLoading, setIsLoading] = useState<boolean>(false);
    
	const onClickNav = (goPath : string)=>{
		pushHistory(goPath);
	}
	// useEffect(()=>{
	// 	setIsLoading(true);
	// }, [path]);

	// useEffect(()=>{
	// 	if(isLoading){
	// 		let navinfo = navigation.find((nav)=>{
	// 			return nav.url == path
	// 		});
	// 		if(navinfo){
	// 			let res = navinfo.necessary.map((raw,idx)=>{
	// 				let checked = getConfigByKey(workSelector, raw);
	// 				if(!(checked[0])) return false;
	// 				else return true;
	// 			});
	// 			if(res.indexOf(false) != -1)
	// 				return;
	// 			setTimeout(() => {
	// 				setIsLoading(false);
	// 			}, 500);
	// 		}
	// 	}
	// }, [workSelector]);

	return (
        <GridNavigationContainer
			className={clsx(
				classes.navigation,
				classes.verticalNavigation,
				`active-${active}-list`,
				className
			)}
			spacing={0}
			container
		    >
			{/* <LoadingIndicatorComponent style={{position : "absolute"}} open={isLoading}/> */}
			{navigation.map((nav, idx) => {
				const active = nav.url == path;
				return (
					<GridNavBtn 
						key={idx} 
						$isEnable={active}
						>
						<NavBtn onClick={()=>onClickNav(nav.url)}>
							<NavBtnIcon color={ active ? "secondary" : "disabled" }>
								{nav.icon}
							</NavBtnIcon>
							<NavBtnText className="text">{nav.title}</NavBtnText>
						</NavBtn>
					</GridNavBtn>
				);
			})}
		</GridNavigationContainer>
    );
}

const GridNavigationContainer = styled(Grid)`
    width : 100%;
    height : 100%;
    margin : 0;
    padding : 0;
`;


const GridNavBtn = styled(Grid)`
	min-height : 120px;
	display : flex;
	justify-content : center;
	align-items : center;
	background-color :${(props : styledProps )=>props.$isEnable ? "#1A4C73" : "#263137"} ;
	width : 50%;
	flex-direction : column;
	border : 1px solid #394041;
`;

const NavBtn = styled(Button)`
	display : flex;
	justify-content : center;
	align-items : center;
	width : 100%;
	height : 100%;
`;

const NavBtnIcon = styled(Icon)`
	position : absolute;
	top : 30px;
	font-size : 30px;
`;

const NavBtnText = styled(Typography)`
	padding-top : 30px;
	white-space : break-spaces;
	line-height : 1 !important;
`;