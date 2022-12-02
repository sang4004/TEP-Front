// import FuseSearch from 'fuse/lib/core/FuseSearch';
// import FuseShortcuts from 'fuse/lib/core/FuseShortcuts';
// import QuickPanelToggleButton from 'fuse_app/fuse-layouts/shared-components/quickPanel/QuickPanelToggleButton';
// import FullScreenToggle from '../../shared-components/FullScreenToggle';
import clsx from 'clsx';
import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import NavbarMobileToggleButton from '../../../fuse-layouts/shared-components/NavbarMobileToggleButton';
import { selectToolbarTheme } from '../../../store/fuse/settingsSlice';
import UserMenu from '../../shared-components/UserMenu';
import LanguageSwitcher from '../../shared-components/LanguageSwitcher';
import { useLocations } from "hooks"
import { Setworkcode } from "common_module";
import { getLang } from "utils_js/lib/lang";
import styled from "styled-components";
import { 
	Typography,
	AppBar, 
	Hidden, 
	makeStyles, 
	ThemeProvider, 
	Toolbar,
	Button
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	root: {
		
	}
}));

function ToolbarLayout1(props) {
	const config = useSelector(({ fuse }) => fuse.settings.current.layout.config);
	const toolbarTheme = useSelector(selectToolbarTheme);

	const classes = useStyles(props);
	const { path } = useLocations();

	return (
		<ThemeProvider theme={toolbarTheme}>
			<AppBar
				id="fuse-toolbar"
				className={clsx(classes.root, 'flex relative z-10 shadow-md ', props.className)}
				color="default"
				// style={{ backgroundColor: toolbarTheme.palette.background.paper }}
				>
				<Toolbar className="p-0 min-h-48 h-full">
					{config.navbar.display && config.navbar.position === 'left' && (
						<Hidden lgUp>
							<NavbarMobileToggleButton className="w-40 h-40 p-0 mx-0 sm:mx-8" />
						</Hidden>
					)}

					<div className="flex flex-1">
						<Hidden mdDown>
							<div></div>
							{/* <FuseShortcuts className="px-16" /> */}
						</Hidden>
					</div>

					<ToolbarTopDiv className="flex items-center px-16">
						<TopPathText>
							{getLang(path)}
						</TopPathText>
						<UserMenu />
					</ToolbarTopDiv>

					{config.navbar.display && config.navbar.position === 'right' && (
						<Hidden lgUp>
							<NavbarMobileToggleButton />
						</Hidden>
					)}
					<div className="toolbar-right-icon">
						<img src="assets/images/1x1_logo.png" />
					</div>
				</Toolbar>
			</AppBar>
		</ThemeProvider>
	);
}

const ToolbarTopDiv = styled.div`
	display : flex;
	justify-content: flex-end;
	align-items : center;
	width : 100%;
`;

const TopPathText = styled(Typography)`
	font-size : 1.7em;
	color : white;
	display : flex;
	justify-content : flex-start;
	flex : 1;
`;

const TopNumberBtnGroup = styled.div`
	display : flex;
	justify-content : flex-end;
	align-items : center;
	flex-direction : row;
	gap : 1em;
	flex : 5;
	overflow-x : auto;
	padding-right : 10px;
`;

const TopNumberBtn = styled(Button)`
	background-color : ${props=>props.selected ? `transparent` : `white`};
	color : ${props=>props.selected ? `white` : `black`};
	&:hover{
		background-color : ${props=>props.selected ? `transparent` : `white`};
	}
	border : 1px solid;
	border-radius : 0;
	font-weight : 400;
`;

export default React.memo(ToolbarLayout1);
